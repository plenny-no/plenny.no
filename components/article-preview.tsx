import React from "react";
import { css } from "@emotion/core";
import { SanityArticle } from "../sanity/models";
import { urlFor } from "../sanity";
import Pricutre from "./picture";
import Link from "./link";
import PortableText from "./portable-text";
import { nb } from "date-fns/locale";
import formatRelative from "date-fns/formatRelative";
import { useInterval } from "../utils/use-interval";

const wrapper = css`
	display: grid;
	grid-template-columns: 1fr;
	grid-column-gap: 2rem;
	grid-row-gap: 2rem;
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem;

	@media screen and (min-width: 750px) {
		grid-template-columns: 1fr 1fr;
	}

	& > section {
		h1 {
			margin: 0;
		}

		span {
			font-size: 0.75rem;
			color: #666;
			display: block;
			margin-top: -0.3em;
		}

		a {
			float: right;
		}
	}
`;

type Props = {
	article: SanityArticle;
};

const ArticlePreview: React.FC<Props> = (props) => {
	const { article } = props;
	const [date, setDate] = React.useState<string>(
		formatRelative(new Date(article._createdAt), new Date(), {
			locale: nb,
		})
	);

	useInterval(
		() =>
			setDate(
				formatRelative(new Date(article._createdAt), new Date(), {
					locale: nb,
				})
			),
		10 * 60 * 1000
	);

	const imageUrl =
		urlFor(article.image).format("webp").maxWidth(500).url() || "";
	const fallbackImageUrl = urlFor(article.image).maxWidth(500).url() || "";

	return (
		<article css={wrapper}>
			<Pricutre
				src={fallbackImageUrl}
				alt={article.image.alt}
				caption={article.image.caption}
			>
				<source srcSet={`${imageUrl} 1x`} type="image/webp" />
			</Pricutre>
			<section>
				<h1>{article.title}</h1>
				<span>{date}</span>
				<PortableText blocks={article.blurb} />
				<Link href="/blogg/[slug]" as={`/blogg/${article.slug.current}`}>
					Les mer
				</Link>
			</section>
		</article>
	);
};

export default ArticlePreview;
