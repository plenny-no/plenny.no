import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import sanity from "../sanity";
import Head from "next/head";
import { css } from "@emotion/core";
import Section from "../components/sections";
import { ConfigProvider } from "../utils/use-config";
import { fetchConfig, fetchPage } from "../sanity/queries";
import { SanityPage, SanityConfig } from "../sanity/models";
import Layout from "../components/layout";

const space = css`
	height: 4rem;
`;

type Props = {
	page: SanityPage;
	config: SanityConfig;
};

const Page: React.FC<Props> = (props) => {
	const { page, config } = props;

	return (
		<ConfigProvider value={config}>
			<Head>
				<title>{page.title} | Plenny.no</title>
			</Head>
			<Layout>
				<div css={space} />
				{(page.sections || []).map((section) => (
					<Section key={section._key} section={section} />
				))}
			</Layout>
		</ConfigProvider>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await sanity.fetch<Pick<SanityPage, "slug">[]>(
		`*[_type == "page"] {slug}`
	);
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
