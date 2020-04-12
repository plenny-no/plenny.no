import React from "react";
import Head from "next/head";
import { css } from "@emotion/core";
import sanity from "../sanity";
import { SanityConfig } from "../sanity/models";
import { GetStaticProps } from "next";

const space = css`
	height: 4rem;
`;

const FourOhFour = () => (
	<>
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
	</>
);

export const getStaticProps: GetStaticProps = async () => {
	const config = await sanity.fetch<SanityConfig>(
		`
		*[_id in ["global-config", "drafts.global-config"]]
		| order(_updatedAt desc)
		[0]
		`
	);

	return {
		props: {
			config,
		},
	};
};

export default FourOhFour;
