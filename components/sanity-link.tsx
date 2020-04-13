import React from "react";
import { SanityExternalLink, SanityInternalLink } from "../sanity/models";
import Link from "./link";

type Props = {
	link: SanityInternalLink | SanityExternalLink;
};

const SanityLink: React.FC<Props> = (props) => {
	const { link } = props;
	switch (link._type) {
		case "internalLink":
			return link.url._type === "page" ? (
				<Link href="[slug]" as={link.url.slug.current}>
					{link.title}
				</Link>
			) : (
				<Link href="/">{link.title}</Link>
			);
		case "externalLink":
			return <Link href={link.url}>{link.title}</Link>;
	}
};

export default SanityLink;
