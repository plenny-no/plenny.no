import React from "react";
import { css } from "@emotion/core";

type Props = {
	primary?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const regularButton = css`
	border: 0;
	background: unset;
	cursor: pointer;
	padding: 0.5em;
	color: firebrick;
	text-transform: uppercase;
	font-weight: bold;
	padding: 0.5em 1em;

	:focus,
	:hover {
		outline: solid;
	}
`;

const primaryButton = css`
	${regularButton}

	border: 2px solid firebrick;

	:focus,
	:hover {
		background-color: firebrick;
		color: bisque;
	}
`;

const Button: React.FC<Props> = (props) => {
	const { children, primary, ...rest } = props;
	return (
		<button {...rest} css={primary ? primaryButton : regularButton}>
			{children}
		</button>
	);
};

export default Button;
