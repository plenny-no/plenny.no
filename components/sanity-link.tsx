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
			return <InternalLink link={link} />;
		case "externalLink":
			return <Link href={link.url}>{link.title}</Link>;
	}
};

const InternalLink: React.FC<{ link: SanityInternalLink }> = (props) => {
	const { link } = props;
	switch (link.url._type) {
		case "frontPage":
			return <Link href="/">{link.title}</Link>;
		case "store":
			return <Link href="/butikk">{link.title}</Link>;
		case "page":
			return (
				<Link href="/[slug]" as={link.url.slug.current}>
					{link.title}
				</Link>
			);
		case "article":
			return (
				<Link href="/blogg/[slug]" as={`/blogg/${link.url.slug.current}`}>
					{link.title}
				</Link>
			);
	}
};

export default SanityLink;
