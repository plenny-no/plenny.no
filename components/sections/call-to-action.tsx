import React from "react";
import { css } from "@emotion/core";
import BlockContentToReact from "@sanity/block-content-to-react";
import Link from "../link";
import { SanityCallToAction } from "../../sanity/models";
import { urlFor } from "../../sanity";

const wrapper = (alignment: SanityCallToAction["imageAlignment"]) => css`
	display: flex;
	flex-direction: ${alignment === "right" ? "row-reverse" : "row"};
	max-width: 1000px;
	margin: 0 auto;
	justify-content: space-between;
	padding: 2rem;

	& > * {
		flex: 1;
	}

	@media (max-width: 750px) {
		flex-direction: column;
	}
`;

const image = css`
	width: 100%;
	height: auto;
`;

const text = (alignment: SanityCallToAction["imageAlignment"]) => css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	@media (min-width: 750px) {
		padding: ${alignment === "right" ? "0 2rem 0 0" : "0 0 0 2rem"};
	}

	& > h2 {
		font-size: 2rem;
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
			<div>
				<img css={image} src={imageUrl} />
			</div>
			<section css={text(content.imageAlignment)}>
				<h2>{content.title}</h2>
				<BlockContentToReact blocks={content.text} />
				{content.link && (
					<Link to={content.link.url}>{content.link.title}</Link>
				)}
			</section>
		</article>
	);
};

export default CallToAction;
