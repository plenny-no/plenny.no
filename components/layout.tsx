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
	z-index: 10;
`;

const main = css`
	flex: 1;
	margin-top: 4rem;
	background-color: white;
`;

const footer = css`
	min-height: 200px;
	background: ${theme.firebrick};
	color: floralwhite;
	display: flex;
	justify-content: center;
	align-items: center;
`;

type Props = {
	title: string;
	config: SanityConfig;
};

const Layout: React.FC<Props> = (props) => {
	const { title, config, children } = props;

	return (
		<ConfigProvider value={config}>
			<Head>
				<title>{title} | Plenny.no</title>
			</Head>
			<div css={wrapper}>
				<Header css={header} />
				<main css={main}>{children}</main>
				<footer css={footer}>PLENNY ANS</footer>
			</div>
		</ConfigProvider>
	);
};

export default Layout;
