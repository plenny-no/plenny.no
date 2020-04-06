import React from "react";
import NextLink from "next/link";
import { css } from "@emotion/core";

const link = css`
	color: black;
	font-weight: bold;
	text-decoration: none;

	:focus {
		outline: dotted;
		outline-color: firebrick;
	}
	:hover {
		border-bottom: 0.1em solid firebrick;
	}
`;

type Props = {
	to: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const Link: React.FC<Props> = (props) => {
	const { to, children, ...rest } = props;
	return (
		<NextLink href={to} passHref>
			<a css={link} {...rest}>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;
