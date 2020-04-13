import React from "react";
import Head from "next/head";
import { css } from "@emotion/core";
import { SanityConfig } from "../sanity/models";
import { GetStaticProps } from "next";
import { ConfigProvider } from "../utils/use-config";
import { fetchConfig } from "../sanity/queries";

const space = css`
	height: 4rem;
`;

type Props = {
	config: SanityConfig;
};

const FourOhFour: React.FC<Props> = (props) => (
	<ConfigProvider value={props.config}>
		<Head>
			<title>404 | Plenny.no</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div css={space} />
		<h1
			css={css`
				font-family: baloo-thambi2;
				font-size: 2rem;
			`}
		>
			Siden du prøvde å gå til finnes ikke... enda!
		</h1>

		<p>
			Denne siden er under konstruksjon 🏗, så kom tilbake senere, kanskje den
			finnes da!
		</p>
	</ConfigProvider>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
	const config = await fetchConfig();

	return {
		props: {
			config,
		},
	};
};

export default FourOhFour;
