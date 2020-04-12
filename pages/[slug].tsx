import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import sanity from "../sanity";
import { SanityConfig, SanityPage } from "../sanity/models";
import Head from "next/head";
import { css } from "@emotion/core";
import Section from "../components/sections";

const space = css`
	height: 4rem;
`;

type Props = {
	page: SanityPage;
};

const Page: React.FC<Props> = (props) => {
	const { page } = props;

	return (
		<>
			<Head>
				<title>{page.title} | Plenny.no</title>
			</Head>
			<div css={space} />
			{(page.sections || []).map((section) => (
				<Section key={section._key} section={section} />
			))}
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = await sanity.fetch<Pick<SanityPage, "slug">[]>(
		`*[_type == "page"] {slug}`
	);
	const paths = pages.map((page) => ({ params: { slug: page.slug.current } }));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
	params,
}) => {
	const config = await sanity.fetch<SanityConfig>(
		`
		*[_id in ["global-config", "drafts.global-config"]]
		| order(_updatedAt desc)
		[0]
		`
	);
	const page = await sanity.fetch<SanityPage>(
		`
		*[_type == "page" && slug.current == "${params?.slug}"]
		| order(_updatedAt desc)
		[0]
		`
	);
	return { props: { page, config } };
};

export default Page;
