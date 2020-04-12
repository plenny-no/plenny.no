import React from "react";
import useSWR from "swr";
import { urlFor } from "../sanity";
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
};

const Hero: React.FC<Props> = (props) => {
	const { image } = props;
	return (
		<article css={hero}>
			<img src={image} alt="Plenny koser seg med dyrene på marken" />
		</article>
	);
};

export default Hero;
