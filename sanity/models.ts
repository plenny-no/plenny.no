import { SanityObject, SanityDocument, SanityObjectArray } from "./utils";
import { SanityAsset } from "@sanity/image-url/lib/types/types";

export type SanityInternalLink = SanityObject<
	"internalLink",
	{
		title: string;
		url:
			| SanityDocument<"page", { slug: { current: string } }>
			| SanityDocument<"frontPage", {}>;
	}
>;

export type SanityExternalLink = SanityObject<
	"externalLink",
	{
		title: string;
		url: string;
	}
>;

export type SanityIllustration = SanityObject<
	"illustration",
	{
		alt: string;
		caption?: string;
		asset: SanityAsset;
	}
>;

export type SanityBlockContent = SanityObjectArray<
	SanityObject<"block", object>
>;

export type SanityCallToAction = SanityObject<
	"callToAction",
	{
		title: string;
		text: SanityBlockContent;
		link?: SanityInternalLink;
		image: SanityIllustration;
		imageAlignment: "right" | "left";
	}
>;

export type SanityTextArea = SanityObject<
	"textArea",
	{
		text: SanityBlockContent;
	}
>;

export type SanitySection = SanityCallToAction | SanityTextArea;

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		hero: SanityIllustration;
		sections: SanityObjectArray<SanitySection>;
	}
>;

export type SanityPage = SanityDocument<
	"frontPage",
	{
		title: string;
		slug: { current: string };
		sections: SanityObjectArray<SanitySection>;
	}
>;
export type SanityConfig = {
	navigation: SanityObjectArray<SanityInternalLink | SanityExternalLink>;
	footer: SanityObject<
		"footer",
		{
			twitter?: string;
			facebook?: string;
			instagram?: string;
			links?: SanityObjectArray<SanityInternalLink | SanityExternalLink>;
		}
	>;
};
