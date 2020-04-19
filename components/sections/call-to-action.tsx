import React from "react";
import { css } from "@emotion/core";
import { SanityCallToAction } from "../../sanity/models";
import SanityLink from "../sanity-link";
import PortableText from "../portable-text";
import Picture from "../picture";

const wrapper = (alignment: SanityCallToAction["imageAlignment"]) => css`
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 2rem;
	align-items: center;
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem;

	@media screen and (min-width: 750px) {
		grid-template-columns: 1fr 1fr;
	}

	& > picture {
		@media screen and (min-width: 750px) {
			grid-row: ${alignment === "right" ? 0 : 1};
		}
	}

	& > section {
		@media screen and (min-width: 750px) {
			grid-row: ${alignment === "right" ? 1 : 0};
		}
	}
`;

type Props = {
	content: SanityCallToAction;
};

const CallToAction: React.FC<Props> = (props) => {
	const { content } = props;

	return (
		<article css={wrapper(content.imageAlignment)}>
			<Picture
				image={content.image.asset}
				widths={[360, 400, 500]}
				aspectRatio={1}
				alt={content.image.alt}
				caption={content.image.caption}
			/>
			<section>
				<h1>{content.title}</h1>
				<PortableText blocks={content.text} />
				{content.link && <SanityLink link={content.link} />}
			</section>
		</article>
	);
};

export default CallToAction;
