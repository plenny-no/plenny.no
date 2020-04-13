import React from "react";
import Head from "next/head";
import Hero from "../components/hero";
import { urlFor } from "../sanity";
import { fetchConfig, fetchFrontPage } from "../sanity/queries";
import Section from "../components/sections";
import { GetStaticProps } from "next";
import { ConfigProvider } from "../utils/use-config";
import { SanityFrontPage, SanityConfig } from "../sanity/models";
import Layout from "../components/layout";

type Props = {
	frontPage: SanityFrontPage;
	config: SanityConfig;
};

const Home: React.FC<Props> = (props) => {
	const { frontPage, config } = props;

	const image = urlFor(frontPage.hero).url() || "";

	return (
		<ConfigProvider value={config}>
			<Layout>
				<Head>
					<title>Hjem | Plenny.no</title>
				</Head>
				<Hero image={image} alt={frontPage.hero.alt} />
				{frontPage.sections.map((section) => (
					<Section key={section._key} section={section} />
				))}
			</Layout>
		</ConfigProvider>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const config = await fetchConfig();
	const frontPage = await fetchFrontPage();

	return {
		props: {
			config,
			frontPage,
		},
	};
};

export default Home;
