import React from "react";
import { css } from "@emotion/core";
import BlockContentToReact from "@sanity/block-content-to-react";
import Link from "../link";
import { SanityCallToAction } from "../../sanity/models";
import { urlFor } from "../../sanity";

const wrapper = (alignment: SanityCallToAction["imageAlignment"]) => css`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 2rem;
	align-items: center;
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem;

	@media screen and (max-width: 750px) {
		grid-template-columns: 1fr;
	}

	& > img {
		width: 100%;
		height: auto;
		grid-row: ${alignment === "right" ? 0 : 1};
	}

	& > section {
		grid-row: ${alignment === "right" ? 1 : 0};
	}
`;

type Props = {
	content: SanityCallToAction;
};

const CallToAction: React.FC<Props> = (props) => {
	const { content } = props;

	const imageUrl = urlFor(content.image).maxWidth(500).url() || "";

	return (
		<article css={wrapper(content.imageAlignment)}>
			<img src={imageUrl} alt={content.image.alt} />
			<section>
				<h1>{content.title}</h1>
				<BlockContentToReact blocks={content.text} />
				{content.link && (
					<Link to={content.link.url}>{content.link.title}</Link>
				)}
			</section>
		</article>
	);
};

export default CallToAction;
