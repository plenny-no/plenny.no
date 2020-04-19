import React from "react";
import Hero from "../components/hero";
import { fetchConfig, fetchFrontPage } from "../sanity/queries";
import Section from "../components/sections";
import { GetStaticProps } from "next";
import { SanityFrontPage, SanityConfig } from "../sanity/models";
import Layout from "../components/layout";

type Props = {
	frontPage: SanityFrontPage;
	config: SanityConfig;
};

const Home: React.FC<Props> = (props) => {
	const { frontPage, config } = props;

	return (
		<Layout title="Hjem" config={config} noSpace>
			<Hero image={frontPage.hero.asset} alt={frontPage.hero.alt} />
			{frontPage.sections.map((section) => (
				<Section key={section._key} section={section} />
			))}
		</Layout>
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
