import React from "react";
import { SanityAdvertisement } from "../../sanity/models";
import { css } from "@emotion/core";

const wrapper = css`
	max-width: 1000px;
	padding: 2rem;
	margin: 0 auto;
`;

type Props = {
	content: SanityAdvertisement;
};

const Advertisement: React.FC<Props> = (props) => {
	const { content } = props;

	return (
		<article css={wrapper}>
			{content.header && <h1>{content.header}</h1>}
			<ul>
				{content.products.map((product) => (
					<li key={product._id}>
						{product.title} - {product.defaultPrice},-
					</li>
				))}
			</ul>
		</article>
	);
};

export default Advertisement;
