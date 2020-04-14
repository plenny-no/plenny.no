import React from "react";
import { SanityAdvertisement } from "../../sanity/models";
import { css } from "@emotion/core";
import ProductPreview from "../product-preview";

const wrapper = (numProducts: number) => css`
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
		grid-row-gap: 0.5rem;

		@media screen and (min-width: 600px) {
			grid-column-gap: 2rem;
			grid-template-columns: repeat(6, 1fr);
			grid-template-areas: ${numProducts === 1
				? `". p1 p1 p1 p1 ."`
				: numProducts === 2
				? `"p1 p1 p1 p2 p2 p2"`
				: `"p1 p1 p1 p1 p1 p1" "p2 p2 p2 p3 p3 p3"`};
		}

		@media screen and (min-width: 700px) {
			grid-column-gap: 2rem;
			grid-template-columns: repeat(6, 1fr);
			grid-template-areas: ${numProducts === 1
				? `". p1 p1 p1 p1 ."`
				: numProducts === 2
				? `"p1 p1 p1 p2 p2 p2"`
				: `". p1 p1 p1 p1 ." "p2 p2 p2 p3 p3 p3"`};
		}

		@media screen and (min-width: 850px) {
			grid-column-gap: 2rem;
			grid-template-columns: repeat(6, 1fr);
			grid-template-areas: ${numProducts === 1
				? `". p1 p1 p1 p1 ."`
				: numProducts === 2
				? `"p1 p1 p1 p2 p2 p2"`
				: `"p1 p1 p1 p1 p2 p2" "p1 p1 p1 p1 p3 p3"`};
		}
	}
`;

type Props = {
	content: SanityAdvertisement;
};

const Advertisement: React.FC<Props> = (props) => {
	const { content } = props;

	return (
		<article css={wrapper(content.products.slice(0, 3).length)}>
			{content.header && <h1>{content.header}</h1>}
			<ul>
				{content.products.slice(0, 3).map((product, i) => (
					<li
						key={product._id}
						css={css`
							@media screen and (min-width: 600px) {
								grid-area: ${`p${i + 1}`};
							}
						`}
					>
						<ProductPreview product={product} />
					</li>
				))}
			</ul>
		</article>
	);
};

export default Advertisement;
