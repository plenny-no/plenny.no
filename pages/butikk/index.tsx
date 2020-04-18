import React from "react";
import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { fetchConfig, fetchStore } from "../../sanity/queries";
import { SanityConfig, SanityStore } from "../../sanity/models";
import Section from "../../components/sections";

type Props = {
	config: SanityConfig;
	store: SanityStore;
};

const Butikk: React.FC<Props> = (props) => {
	const { config, store } = props;
	return (
		<Layout config={config} title="Butikk">
			{store.sections.map((section) => (
				<Section key={section._key} section={section} />
			))}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const config = await fetchConfig();
	const store = await fetchStore();

	return {
		props: {
			config,
			store,
		},
	};
};

export default Butikk;
