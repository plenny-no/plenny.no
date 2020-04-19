import { css } from "@emotion/core";
import React from "react";
import { urlFor } from "../sanity";
import { SanityImageAsset, SanityReference } from "../sanity/utils";

const wrapper = (aspectRatio: number) => css`
	width: 100%;
	margin: 0;

	& > section#plenny-image-conteiner {
		position: relative;
		width: 100%;
		padding: calc(100% / ${aspectRatio}) 0 0 0;

		img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}

	& > figcaption {
		text-align: center;
		font-size: 0.85rem;
		color: #666;
		display: block;
	}
`;

export const lqipBackground = (src: string) => css`
	background: url("${src}") no-repeat;
	background-size: cover;
`;

type Props = {
	image: SanityReference<SanityImageAsset>;
	widths: [number, ...number[]];
	aspectRatio: number;
	alt: string;
	caption?: string;
	className?: string;
};

const Picture: React.FC<Props> = (props) => {
	const { widths, aspectRatio, alt, caption, className } = props;
	const src = urlFor(props.image);

	const maxWidth = widths.splice(-1)[0];

	const lqip =
		props.image._type === "sanity.imageAsset"
			? props.image.metadata.lqip
			: null;

	return (
		<figure css={wrapper(aspectRatio)} className={className}>
			<section id="plenny-image-conteiner">
				<picture>
					{widths.map((width, index) => {
						const image = src
							.fit("min")
							.width(width)
							.height(Math.round(width / aspectRatio));

						return (
							<React.Fragment key={index}>
								<source
									srcSet={image.format("webp").url() || ""}
									type="image/webp"
									media={`(max-width: ${width}px)`}
								/>
								<source
									srcSet={image.url() || ""}
									media={`(max-width: ${width}px)`}
								/>
							</React.Fragment>
						);
					})}
					<source
						srcSet={
							src
								.fit("min")
								.width(maxWidth)
								.height(Math.round(maxWidth / aspectRatio))
								.format("webp")
								.url() || ""
						}
						type="image/webp"
						media={`(min-width: ${maxWidth}px)`}
					/>
					<source
						srcSet={
							src
								.fit("min")
								.width(maxWidth)
								.height(Math.round(maxWidth / aspectRatio))
								.url() || ""
						}
						media={`(min-width: ${maxWidth}px)`}
					/>

					<img
						src={
							src
								.fit("min")
								.width(maxWidth)
								.height(Math.round(maxWidth / aspectRatio))
								.url() || ""
						}
						alt={alt}
						css={lqip && lqipBackground(lqip)}
					/>
				</picture>
			</section>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
};

export default Picture;
