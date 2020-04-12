import React from "react";
import Head from "next/head";
import Hero from "../components/hero";
import useSWR from "swr";
import { urlFor } from "../sanity";
import { SanityFrontPage } from "../sanity/models";
import Section from "../components/sections";

const Home = () => {
	const { data, error } = useSWR<SanityFrontPage>(`
		*[_id in ["global-front-page", "drafts.global-front-page"]]
		| order(_updatedAt desc)
		[0]
	`);

	if (error) {
		return <div>Søren klype</div>;
	}

	if (!data) {
		return <div>laster...</div>;
	}

	const image = urlFor(data.hero).url() || "";

	return (
		<>
			<Head>
				<title>Hjem | Plenny.no</title>
			</Head>
			<Hero image={image} />
			{data.sections.map((section) => (
				<Section key={section._key} section={section} />
			))}
		</>
	);
};

export default Home;
