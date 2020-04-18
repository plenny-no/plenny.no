import React from "react";
import { css } from "@emotion/core";

const wrapper = css`
	width: 100%;
	margin: 0;

	& img {
		width: 100%;
		border-radius: 0.25rem;
	}

	& > figcaption {
		text-align: center;
		font-size: 0.85rem;
		color: #666;
		display: block;
	}
`;

type Props = {
	src: string;
	alt: string;
	caption?: string;
	className?: string;
};

const Pricutre: React.FC<Props> = (props) => {
	const { src, alt, caption, className, children } = props;

	return (
		<figure css={wrapper} className={className}>
			<picture>
				{children}
				<img src={src} alt={alt} />
			</picture>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
};

export default Pricutre;
