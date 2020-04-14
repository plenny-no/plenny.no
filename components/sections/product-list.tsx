import { css } from "@emotion/core";
import React from "react";
import { SanityProductList } from "../../sanity/models";
import ProductPreview from "../product-preview";

const wrapper = css`
	max-width: 1000px;
	padding: 2rem;
	margin: 0 auto;

	& > h1 {
		text-align: center;
	}

	& > ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		justify-content: center;
		grid-row-gap: 1rem;
		grid-column-gap: 2rem;

		@media screen and (min-width: 500px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (min-width: 750px) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
`;

type Props = {
	content: SanityProductList;
};

const ProductList: React.FC<Props> = (props) => {
	const { content } = props;

	return (
		<article css={wrapper}>
			{content.header && <h1>{content.header}</h1>}
			<ul>
				{content.products.map((product) => (
					<li key={product._id}>
						<ProductPreview product={product} />
					</li>
				))}
			</ul>
		</article>
	);
};

export default ProductList;
