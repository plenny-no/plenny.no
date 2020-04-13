import React from "react";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const hero = css`
	height: 80vh;
	width: 100%;
	background-color: ${theme.safron};
	padding-top: 4rem;

	picture > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 0%;
	}
`;

type Props = {
	image: SanityImageSource;
	alt: string;
};

const Hero: React.FC<Props> = (props) => {
	const { image, alt } = props;

	const imageUrl = urlFor(image).format("webp").maxWidth(500).url() || "";
	const fallbackImageUrl = urlFor(image).maxWidth(50).url() || "";

	return (
		<article css={hero}>
			<picture>
				<source srcSet={`${imageUrl} 1x`} type="image/webp" />
				<img src={fallbackImageUrl} alt={alt} />
			</picture>
		</article>
	);
};

export default Hero;
