import React from "react";
import { css } from "@emotion/core";
import { SanityProduct } from "../sanity/models";
import { urlFor } from "../sanity";

const articleWrapper = css`
	display: flex;
	flex-direction: column;
	text-align: center;

	& img {
		width: 100%;
		height: auto;
	}

	& > h2 {
		margin: 0.25rem 0 0.125rem 0;
		font-weight: normal;
	}

	& > h3 {
		margin: 0;
		font-size: 1rem;
		font-weight: normal;
		::after {
			content: ",-";
		}
	}
`;

type Props = {
	product: SanityProduct;
};

const ProductPreview: React.FC<Props> = (props) => {
	const {
		product: { defaultPrice, title, images = [] },
	} = props;

	const imageUrl = urlFor(images[0]).format("webp").maxWidth(500).url() || "";
	const fallbackImageUrl = urlFor(images[0]).maxWidth(500).url() || "";

	return (
		<article css={articleWrapper}>
			<picture>
				<source srcSet={`${imageUrl} 1x`} type="image/webp" />
				<img src={fallbackImageUrl} alt={images[0]?.alt} />
			</picture>
			<h2>{title}</h2>
			<h3>{defaultPrice}</h3>
		</article>
	);
};

export default ProductPreview;
