import React from "react";
import { css } from "@emotion/core";
import theme from "../utils/theme";
import { urlFor } from "../sanity";
import { SanityReference, SanityImageAsset } from "../sanity/utils";

const hero = css`
	height: 80vh;
	width: 100%;
	background-color: ${theme.safron};

	picture > img {
		width: 100%;
		height: 100%;
		border-radius: 0;
		object-fit: cover;
		object-position: 50% 0%;
	}
`;

type Props = {
	image: SanityReference<SanityImageAsset>;
	alt: string;
};

const Hero: React.FC<Props> = (props) => {
	const { image, alt } = props;

	const imageUrl = urlFor(image).format("webp").url() || "";
	const fallbackImageUrl = urlFor(image).url() || "";

	return (
		<article css={hero}>
			<picture>
				<source srcSet={imageUrl} type="image/webp" />
				<img src={fallbackImageUrl} alt={alt} />
			</picture>
		</article>
	);
};

export default Hero;
