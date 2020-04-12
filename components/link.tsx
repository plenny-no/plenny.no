import React from "react";
import NextLink from "next/link";
import { css } from "@emotion/core";
import theme from "../utils/theme";

const link = css`
	color: black;
	font-weight: bold;
	text-decoration: none;
	position: relative;

	::after {
		content: "";
		position: absolute;
		z-index: -1;
		bottom: 0;
		left: -0.25em;
		right: -0.25em;
		height: 0.125em;
		background-color: ${theme.firebrick};
	}
`;

type Props = {
	to: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const Link: React.FC<Props> = (props) => {
	const { to, children, ...rest } = props;

	if (/^(https?|tel|mailto):/.test(to)) {
		return (
			<a css={link} href={to} {...rest}>
				{children}
			</a>
		);
	}

	return (
		<NextLink href={to} passHref>
			<a css={link} {...rest}>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;
