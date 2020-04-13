import React from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { SanityTextArea } from "../../sanity/models";
import { css } from "@emotion/core";

const wrapper = css`
	max-width: 1000px;
	padding: 2rem;
	margin: 0 auto;
`;

type Props = {
	content: SanityTextArea;
};

const TextArea: React.FC<Props> = (props) => {
	return (
		<article css={wrapper}>
			<BlockContentToReact blocks={props.content.text} />
		</article>
	);
};

export default TextArea;
