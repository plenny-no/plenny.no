import React from "react";
import Header from "./header";
import { css } from "@emotion/core";

const wrapper = css`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const main = css`
	flex: 1;
`;

const footer = css`
	min-height: 200px;
	background: firebrick;
	color: floralwhite;
	display: flex;
	justify-content: center;
	align-items: center;
`;

type Props = {};

const Layout: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<div css={wrapper}>
			<Header />
			<main css={main}>{children}</main>
			<footer css={footer}>PLENNY ANS</footer>
		</div>
	);
};

export default Layout;
