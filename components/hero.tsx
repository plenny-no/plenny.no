import React from "react";
import { css } from "@emotion/core";
import theme from "../utils/theme";

const hero = css`
	height: 80vh;
	width: 100%;
	background-color: ${theme.safron};
	display: flex;
	padding-top: 4rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 0%;
	}
`;

type Props = {
	image: string;
	alt: string;
};

const Hero: React.FC<Props> = (props) => {
	const { image, alt } = props;
	return (
		<article css={hero}>
			<img src={image} alt={alt} />
		</article>
	);
};

export default Hero;
