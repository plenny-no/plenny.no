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
import Slider from "react-slick";

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

		@media screen and (min-width: 500px) {
			border-radius: 0.25rem;
		}
	}
`;

const slider = css`
	max-width: 500px;
	width: 100%;

	.slick-dots {
		position: relative;
		bottom: 0;
		li {
			width: 50px;
			height: 50px;

			img {
				border-radius: 0.125rem;
			}
		}

		li:not(.slick-active) {
			opacity: 0.6;
		}
	}
`;

type Props = {
	config: SanityConfig;
	product: SanityProduct;
};

const Butikk: React.FC<Props> = (props) => {
	const { config, product } = props;

	const images = (product.images || []).map((image) => ({
		key: image._key,
		caption: image.caption,
		alt: image.alt,
		regular: {
			main: urlFor(image).format("webp").maxWidth(500).url() || "",
			fallback: urlFor(image).maxWidth(500).url() || "",
		},
		preview: {
			main: urlFor(image).format("webp").maxWidth(50).url() || "",
			fallback: urlFor(image).maxWidth(50).url() || "",
		},
	}));

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dotsClass: "slick-dots",
		customPaging(i: number) {
			return (
				<a>
					<picture>
						<source
							srcSet={`${images[i]?.preview.main} 1x`}
							type="image/webp"
						/>
						<img src={images[i]?.preview.fallback} alt={images[i]?.alt} />
					</picture>
				</a>
			);
		},
	};

	return (
		<ConfigProvider value={config}>
			<Layout>
				<article css={wrapper}>
					<h1>{product.title}</h1>
					<Slider css={slider} {...settings}>
						{images.map((image) => (
							<div key={image.key}>
								<picture>
									<source
										srcSet={`${image.regular.main} 1x`}
										type="image/webp"
									/>
									<img src={image.regular.fallback} alt={image?.alt} />
								</picture>
							</div>
						))}
					</Slider>
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
