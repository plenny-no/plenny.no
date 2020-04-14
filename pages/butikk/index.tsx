import React from "react";
import Layout from "../../components/layout";
import { GetStaticProps } from "next";
import { fetchConfig, fetchStore } from "../../sanity/queries";
import { SanityConfig, SanityStore } from "../../sanity/models";
import { ConfigProvider } from "../../utils/use-config";
import Section from "../../components/sections";

type Props = {
	config: SanityConfig;
	store: SanityStore;
};

const Butikk: React.FC<Props> = (props) => {
	const { config, store } = props;
	return (
		<ConfigProvider value={config}>
			<Layout>
				{store.sections.map((section) => (
					<Section key={section._key} section={section} />
				))}
			</Layout>
		</ConfigProvider>
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
