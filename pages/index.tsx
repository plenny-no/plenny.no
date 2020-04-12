import React from "react";
import Head from "next/head";
import Hero from "../components/hero";
import sanity, { urlFor } from "../sanity";
import { SanityFrontPage, SanityConfig } from "../sanity/models";
import Section from "../components/sections";
import { GetStaticProps } from "next";

type Props = {
	frontPage: SanityFrontPage;
};

const Home: React.FC<Props> = (props) => {
	const { frontPage } = props;

	const image = urlFor(frontPage.hero).url() || "";

	return (
		<>
			<Head>
				<title>Hjem | Plenny.no</title>
			</Head>
			<Hero image={image} alt={frontPage.hero.alt} />
			{frontPage.sections.map((section) => (
				<Section key={section._key} section={section} />
			))}
		</>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const config = await sanity.fetch<SanityConfig>(
		`
		*[_id in ["global-config", "drafts.global-config"]]
		| order(_updatedAt desc)
		[0]
		`
	);

	const frontPage = await sanity.fetch<SanityFrontPage>(
		`
		*[_id in ["global-front-page", "drafts.global-front-page"]]
		| order(_updatedAt desc)
		[0]
		`
	);

	return {
		props: {
			config,
			frontPage,
		},
	};
};

export default Home;
