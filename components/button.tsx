import React from "react";
import { css } from "@emotion/core";
import theme from "../utils/theme";

type Props = {
	primary?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const regularButton = css`
	border: 0;
	background: unset;
	cursor: pointer;
	color: ${theme.firebrick};
	text-transform: uppercase;
	font-weight: bold;
	padding: 0.75em 1em;
	border-radius: 0.25rem;

	:disabled {
		cursor: not-allowed;
	}
`;

const primaryButton = css`
	${regularButton}
	background: ${theme.firebrick};
	color: white;
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
