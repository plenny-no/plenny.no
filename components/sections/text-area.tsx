import React from "react";
import { SanityTextArea } from "../../sanity/models";
import { css } from "@emotion/core";
import PortableText from "../portable-text";

const wrapper = css`
	max-width: 1000px;
	padding: 1rem;
	margin: 0 auto;

	& > * {
		margin: 1rem 0;
	}

	@media screen and (min-width: 500px) {
		padding: 2rem;
	}
`;

type Props = {
	content: SanityTextArea;
};

const TextArea: React.FC<Props> = (props) => {
	return (
		<article css={wrapper}>
			<PortableText blocks={props.content.text} />
		</article>
	);
};

export default TextArea;
