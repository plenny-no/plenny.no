import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import {
	fetchConfig,
	fetchArticlePaths,
	fetchArticle,
} from "../../sanity/queries";
import { SanityConfig, SanityArticle } from "../../sanity/models";
import Layout from "../../components/layout";
import TextArea from "../../components/sections/text-area";
import { css } from "@emotion/core";

const header = css`
	margin: 2rem auto 0 auto;
	max-width: 1000px;
	padding: 0 2rem;
`;

type Props = {
	article: SanityArticle;
	config: SanityConfig;
};

const Blog: React.FC<Props> = (props) => {
	const { article, config } = props;

	return (
		<Layout config={config} title={article.title}>
			<h1 css={header}>{article.title}</h1>
			<TextArea content={article.content} />
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const articles = await fetchArticlePaths();
	const paths = articles.map((article) => ({
		params: { slug: article.slug.current },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
	params,
}) => {
	const slug = params?.slug;

	if (!slug) {
		throw new Error(`Cannot find article with slug "${slug}"`);
	}

	const config = await fetchConfig();
	const article = await fetchArticle(slug);

	return { props: { article, config } };
};

export default Blog;
