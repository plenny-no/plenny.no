import React from "react";
import { AppProps } from "next/app";
import { css } from "@emotion/core";
import Header from "../components/header";
import useSwr from "swr";

import "normalize.css";
import "../global-styles.css";
import { ConfigProvider } from "../utils/use-config";
import { GetServerSideProps } from "next";
import sanity from "../sanity";

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

const App: React.FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	const { data, error } = useSwr(
		pageProps.config
			? null
			: `*[_id in ["global-config", "drafts.global-config"]]
			| order(_updatedAt desc)
			[0]`,
		{
			fetcher: (query: string) => sanity.fetch(query),
		}
	);

	const config = pageProps.config ? pageProps.config : data;

	if (error) return <div>Hjelp! Her gikk noe fryktelig galt...</div>;
	if (!config) return null;

	return (
		<ConfigProvider value={config}>
			<div css={wrapper}>
				<Header />
				<main css={main}>
					<Component {...pageProps} />
				</main>
				<footer css={footer}>PLENNY ANS</footer>
			</div>
		</ConfigProvider>
	);
};

export default App;
