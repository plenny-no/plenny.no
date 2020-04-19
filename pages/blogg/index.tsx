import React from "react";
import { GetStaticProps } from "next";
import { fetchConfig, fetchArticlePreviews } from "../../sanity/queries";
import { SanityConfig, SanityArticle } from "../../sanity/models";
import Layout from "../../components/layout";
import { css } from "@emotion/core";
import ArticlePreview from "../../components/article-preview";

const header = css`
	margin: 2rem auto 0 auto;
	max-width: 1000px;
	padding: 0 2rem;
`;

type Props = {
	articles: SanityArticle[];
	config: SanityConfig;
};

const Blog: React.FC<Props> = (props) => {
	const { articles, config } = props;

	return (
		<Layout config={config} title="Blogg">
			<h1 css={header}>Blogg</h1>
			{articles.map((article) => (
				<ArticlePreview key={article._id} article={article} />
			))}
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async () => {
	const config = await fetchConfig();
	const articles = await fetchArticlePreviews();

	return { props: { articles, config } };
};

export default Blog;
