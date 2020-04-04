import React from "react";
import NextLink from "next/link";
import { css } from "@emotion/core";

const link = css`
	color: black;
	font-weight: bold;
	text-decoration: none;
`;

type Props = {
	href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

const Link: React.FC<Props> = (props) => {
	const { href, children, ...rest } = props;
	return (
		<NextLink href={href}>
			<a css={link} {...rest}>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;
