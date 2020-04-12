import React from "react";
import { css } from "@emotion/core";
import BlockContentToReact from "@sanity/block-content-to-react";
import Link from "../link";
import { SanityCallToAction } from "../../sanity/models";
import { urlFor } from "../../sanity";

const wrapper = css`
	display: flex;
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

const text = css`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;

	@media (min-width: 750px) {
		padding-left: 2rem;
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
		<article css={wrapper}>
			<div>
				<img css={image} src={imageUrl} />
			</div>
			<section css={text}>
				<h2>{content.title}</h2>
				<BlockContentToReact blocks={content.text} />
				<Link to={content.link.url}>{content.link.title}</Link>
			</section>
		</article>
	);
};

export default CallToAction;
