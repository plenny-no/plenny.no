import React from "react";
import BlockContentToReact from "@sanity/block-content-to-react";
import { SanityObjectArray, SanityBlockContent } from "../sanity/utils";
import Link from "./link";
import Picture from "./picture";
import { SanityInternalLink } from "../sanity/models";
import { css } from "@emotion/core";
import DataTable from "./data-table";

const serializers = {
	marks: {
		internalLink: ({ children, mark }: any) => {
			switch ((mark.url as SanityInternalLink["url"])._type) {
				case "frontPage":
					return <Link href="/">{children}</Link>;
				case "store":
					return <Link href="/butikk">{children}</Link>;
				case "page":
					return (
						<Link href="/[slug]" as={mark.url.slug.current}>
							{children}
						</Link>
					);
				default:
					// TODO: Log error
					return <span>{children}</span>;
			}
		},
		externalLink: ({ children, mark }: any) => (
			<Link href={mark.url}>{children}</Link>
		),
	},
	types: {
		illustration: (props: any) => {
			const {
				node: { content: image },
			} = props;

			return (
				<Picture
					css={css`
						max-width: 500px;
						margin: 0 auto;
					`}
					image={image}
					widths={[340, 400, 500]}
					aspectRatio={1}
					alt={image.alt}
					caption={image.caption}
				/>
			);
		},
		dataTable: (props: any) => {
			const {
				node: { content },
			} = props;

			return <DataTable content={content} />;
		},
	},
};

type Props = {
	blocks: SanityObjectArray<SanityBlockContent>;
};

const PortableText: React.FC<Props> = (props) => {
	const { blocks } = props;

	return (
		<BlockContentToReact
			css={css`
				& > * {
					margin-top: 1rem;
					margin-bottom: 1rem;
				}
			`}
			blocks={blocks}
			serializers={serializers}
		/>
	);
};

export default PortableText;
