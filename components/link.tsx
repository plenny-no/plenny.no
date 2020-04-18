import React from "react";
import NextLink, { LinkProps } from "next/link";
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

type Props = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
	LinkProps;

const Link: React.FC<Props> = (props) => {
	const {
		href,
		as,
		replace,
		scroll,
		shallow,
		passHref,
		prefetch,
		children,
		...rest
	} = props;

	const url = typeof href === "string" ? href : href.href || "";

	if (/^(https?|tel|mailto):/.test(url)) {
		return (
			<a
				css={link}
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				{...rest}
			>
				{children}
			</a>
		);
	}

	return (
		<NextLink
			href={href}
			as={as}
			replace={replace}
			scroll={scroll}
			shallow={shallow}
			passHref={passHref || true}
			prefetch={prefetch}
		>
			<a css={link} {...rest}>
				{children}
			</a>
		</NextLink>
	);
};

export default Link;
