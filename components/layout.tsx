import React from "react";
import Header from "./header";
import { css } from "@emotion/core";
import Head from "next/head";
import { SanityConfig } from "../sanity/models";
import { ConfigProvider } from "../utils/use-config";
import theme from "../utils/theme";

const wrapper = css`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const header = css`
	z-index: 1;
`;

const main = css`
	flex: 1;
`;

const footer = css`
	min-height: 200px;
	background: ${theme.firebrick};
	color: floralwhite;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const space = css`
	height: 4rem;
`;

type Props = {
	title: string;
	config: SanityConfig;
	noSpace?: boolean;
};

const Layout: React.FC<Props> = (props) => {
	const { title, config, noSpace, children } = props;

	const spacer = noSpace ? null : <div css={space} />;

	return (
		<ConfigProvider value={config}>
			<Head>
				<title>{title} | Plenny.no</title>
			</Head>
			<div css={wrapper}>
				<Header css={header} />
				{spacer}
				<main css={main}>{children}</main>
				<footer css={footer}>PLENNY ANS</footer>
			</div>
		</ConfigProvider>
	);
};

export default Layout;
