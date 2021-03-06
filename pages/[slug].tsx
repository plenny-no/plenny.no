import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Section from "../components/sections";
import { fetchConfig, fetchPage, fetchPagePaths } from "../sanity/queries";
import { SanityPage, SanityConfig } from "../sanity/models";
import Layout from "../components/layout";

type Props = {
	page: SanityPage;
	config: SanityConfig;
};

const Page: React.FC<Props> = (props) => {
	const { page, config } = props;

	return (
		<Layout config={config} title={page.title}>
			{(page.sections || []).map((section) => (
				<Section key={section._key} section={section} />
			))}
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await fetchPagePaths();
	const paths = pages.map((page) => ({
		params: { slug: page.slug.current },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
	params,
}) => {
	const slug = params?.slug;

	if (!slug) {
		throw new Error(`Cannot find page with slug "${slug}"`);
	}

	const config = await fetchConfig();
	const page = await fetchPage(slug);

	return { props: { page, config } };
};

export default Page;
