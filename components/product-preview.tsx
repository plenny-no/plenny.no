import React from "react";
import { css } from "@emotion/core";
import { SanityProduct } from "../sanity/models";
import NextLink from "next/link";
import Picture from "./picture";

const articleWrapper = css`
	display: flex;
	flex-direction: column;
	text-align: center;

	& a {
		text-decoration: none;
		color: inherit;
	}

	& h2 {
		margin: 0.25rem 0 0.125rem 0;
		font-weight: normal;
	}

	& h3 {
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
		product: { defaultPrice, title, images = [], slug },
	} = props;

	return (
		<article css={articleWrapper}>
			<NextLink href="/butikk/[slug]" as={`/butikk/${slug.current}`}>
				<a>
					<Picture
						image={images[0].asset}
						widths={[340, 400, 500]}
						aspectRatio={1}
						alt={images[0]?.alt || ""}
						caption={images[0]?.caption}
					/>
					<h2>{title}</h2>
					<h3>{defaultPrice}</h3>
				</a>
			</NextLink>
		</article>
	);
};

export default ProductPreview;
