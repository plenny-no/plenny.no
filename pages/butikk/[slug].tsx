import React from "react";
import Layout from "../../components/layout";
import { GetStaticProps, GetStaticPaths } from "next";
import {
	fetchConfig,
	fetchProduct,
	fetchProductPaths,
} from "../../sanity/queries";
import { SanityConfig, SanityProduct } from "../../sanity/models";
import TextArea from "../../components/sections/text-area";
import { css } from "@emotion/core";
import Slider from "react-slick";
import useCheckout from "../../utils/use-checkout";
import Button from "../../components/button";
import NumberInput from "../../components/number-input";
import { numberFotmatter } from "../../utils/helpers";
import { useCart } from "../../components/cart/hooks";
import Picture from "../../components/picture";

const wrapper = css`
	display: flex;
	flex-direction: column;
	align-items: center;

	.slick-list {
		margin-bottom: 0.75rem;
	}

	& > h1 {
		padding: 1rem;
		text-align: center;
	}

	& > div {
		width: 100%;

		@media screen and (min-width: 1000px) {
			display: grid;
			grid-template-columns: 1fr auto;
			align-items: start;
			grid-column-gap: 3rem;
			justify-items: end;
			max-width: 1000px;
			padding: 0 2rem;
			justify-items: start;

			& > *:first-of-type {
				margin: 0;
			}

			& > section {
				border-radius: 0.25rem;
			}
		}

		& > section {
			width: 100%;
			margin: 2rem auto 0 auto;
			padding: 2rem 1rem;
			background: #f9c22e;
			display: flex;
			flex-direction: column;
			align-items: center;

			& > * {
				max-width: 500px;
				width: 100%;
			}

			p {
				margin: 0;
				text-align: center;

				:nth-of-type(1) {
					font-size: 1rem;
				}

				:nth-of-type(2) {
					text-align: right;
					margin-bottom: 0.5rem;
					font-size: 1.25rem;

					span {
						font-weight: bold;
					}
				}

				:nth-of-type(3) {
					margin: 0.25rem 0;
					opacity: 0.7;
					font-size: 0.85rem;
				}
			}
			ul {
				background: white;
				border-radius: 0.25rem;
				padding: 1rem;
				list-style: none;
				margin-bottom: 1rem;

				li {
					display: grid;
					grid-template-columns: 1fr auto;
					grid-column-gap: 0.5rem;

					:not(:last-of-type) {
						border-bottom: 1px solid #ddd;
						padding-bottom: 0.85rem;
						margin-bottom: 0.85rem;
					}

					span {
						word-wrap: break-word;
						word-break: break-all;
					}
				}
			}
		}
	}
`;

const slider = css`
	max-width: 500px;
	width: 100%;
	margin: 0 auto;

	.slick-slide img {
		@media screen and (max-width: 500px) {
			border-radius: 0;
		}
	}

	.slick-dots {
		position: relative;
		bottom: 0;
		li {
			width: 50px;
			height: 50px;
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

	const resetQuantities = () => {
		const obj: { [key: string]: number } = {};
		product.variants.forEach((variant) => (obj[variant.storefrontId] = 0));
		return obj;
	};

	const checkout = useCheckout();
	const [, openCart] = useCart();
	const [addingToCart, setAddingToCart] = React.useState(false);
	const [quantities, setQuantities] = React.useState<{ [key: string]: number }>(
		resetQuantities
	);
	const setQuantity = (id: string, quantity: number) =>
		setQuantities((current) => ({ ...current, [id]: quantity }));

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
					<Picture
						image={product.images[i].asset}
						widths={[50]}
						aspectRatio={1}
						alt={product.images[i].alt}
					/>
				</a>
			);
		},
	};

	const totalPrice = product.variants.reduce(
		(acc, curr) =>
			acc + parseInt(curr.price, 10) * quantities[curr.storefrontId],
		0
	);

	const addToCart = async () => {
		if (checkout) {
			setAddingToCart(true);
			await checkout.addLineItems(
				product.variants
					.map((variant) => ({
						quantity: quantities[variant.storefrontId] || 0,
						variantId: variant.storefrontId,
					}))
					.filter((item) => item.quantity > 0)
			);
			setQuantities(resetQuantities());
			setAddingToCart(false);
			openCart(true);
		}
	};

	return (
		<Layout config={config} title={product.title}>
			<article css={wrapper}>
				<h1>{product.title}</h1>
				<div>
					<Slider css={slider} {...settings}>
						{(product.images || []).map((image) => (
							<Picture
								key={image._key}
								image={image.asset}
								widths={[340, 400, 500]}
								aspectRatio={1}
								alt={image.alt}
							/>
						))}
					</Slider>
					<section>
						<p>Velg det du vil ha (ta gjerne fire, ta åtte, ta alle)</p>
						<ul>
							{product.variants.map((variant) => {
								const value = quantities[variant.storefrontId];
								const handleChange = (quantity: number) =>
									setQuantity(variant.storefrontId, quantity);
								const handleBlur = () => {
									if (isNaN(value)) {
										setQuantity(variant.storefrontId, 0);
									} else if (value > 99) {
										setQuantity(variant.storefrontId, 99);
									} else if (value < 0) {
										setQuantity(variant.storefrontId, 0);
									}
								};
								const handleIncrease = () =>
									setQuantity(variant.storefrontId, value + 1);
								const handleDecrease = () =>
									setQuantity(variant.storefrontId, value - 1);
								return (
									<li key={variant._id}>
										<span>{variant.title}</span>
										<NumberInput
											value={value}
											min={0}
											max={99}
											onBlur={handleBlur}
											onChange={handleChange}
											onIncrease={handleIncrease}
											onDecrease={handleDecrease}
											disabled={addingToCart}
										/>
									</li>
								);
							})}
						</ul>
						<p>
							Totalt:{" "}
							<span>
								{numberFotmatter(totalPrice)}
								,-
							</span>
						</p>
						<p>PS: Alle ordre over 800 får gratis frakt ;)</p>
						<Button
							primary
							disabled={checkout === null || totalPrice <= 0 || addingToCart}
							onClick={addToCart}
						>
							Legg i handlekurven
						</Button>
					</section>
				</div>
				{product.description && <TextArea content={product.description} />}
			</article>
		</Layout>
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
