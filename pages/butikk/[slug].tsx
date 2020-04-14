import React from "react";
import Layout from "../../components/layout";
import { GetStaticProps, GetStaticPaths } from "next";
import {
	fetchConfig,
	fetchProduct,
	fetchProductPaths,
} from "../../sanity/queries";
import { SanityConfig, SanityProduct } from "../../sanity/models";
import { ConfigProvider } from "../../utils/use-config";
import TextArea from "../../components/sections/text-area";
import { urlFor } from "../../sanity";
import { css } from "@emotion/core";

const wrapper = css`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > h1 {
		padding: 1rem;
		text-align: center;
	}

	& > article {
		padding: 1rem;
		max-width: 800px;
	}

	& img {
		padding: 0;
		width: 100%;
		max-width: 500px;
		height: auto;
	}
`;

type Props = {
	config: SanityConfig;
	product: SanityProduct;
};

const Butikk: React.FC<Props> = (props) => {
	const { config, product } = props;

	const imageUrl =
		urlFor(product.images[0]).format("webp").maxWidth(500).url() || "";
	const fallbackImageUrl = urlFor(product.images[0]).maxWidth(500).url() || "";

	return (
		<ConfigProvider value={config}>
			<Layout>
				<article css={wrapper}>
					<h1>{product.title}</h1>
					<picture>
						<source srcSet={`${imageUrl} 1x`} type="image/webp" />
						<img src={fallbackImageUrl} alt={product.images[0]?.alt} />
					</picture>
					{product.description && <TextArea content={product.description} />}
				</article>
			</Layout>
		</ConfigProvider>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const products = await fetchProductPaths();
	const paths = products.map((product) => ({
		params: { slug: product.slug.current },
	}));

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({
	params,
}) => {
	const slug = params?.slug;

	if (!slug) {
		throw new Error(`Cannot find product with slug "${slug}"`);
	}

	const config = await fetchConfig();
	const product = await fetchProduct(slug);

	return {
		props: {
			config,
			product,
		},
	};
};

export default Butikk;
