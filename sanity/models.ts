import {
	SanityObject,
	SanityDocument,
	SanityObjectArray,
	SanitySlug,
	SanityReference,
	SanityImageAsset,
} from "./utils";

export type SanityInternalLink = SanityObject<
	"internalLink",
	{
		title: string;
		url:
			| SanityDocument<"page", { slug: { current: string } }>
			| SanityDocument<"frontPage", {}>
			| SanityDocument<"store", {}>
			| SanityDocument<"article", { slug: { current: string } }>;
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
		asset: SanityImageAsset;
	}
>;

export type SanityProduct = SanityDocument<
	"product",
	{
		title: string;
		description: SanityTextArea;
		images: SanityObjectArray<SanityIllustration>;
		variants: SanityObjectArray<SanityVariant>;
		productId: string;
		storefrontId: string;
		defaultPrice: string;
		vendor?: string;
		slug: SanitySlug;
		deleted: boolean;
	}
>;

export type SanityVariant = SanityDocument<
	"variant",
	{
		title: string;
		sku: string;
		product: SanityReference<SanityProduct>;
		variantId: string;
		storefrontId: string;
		price: string;
		compareAtPrice?: string;
		inventoryQuantity?: number;
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

export type SanityAdvertisement = SanityObject<
	"advertisement",
	{
		header?: string;
		products: SanityProduct[];
	}
>;

export type SanityProductList = SanityObject<
	"productList",
	{
		header?: string;
		products: SanityProduct[];
	}
>;

export type SanityTextArea = SanityObject<
	"textArea",
	{
		text: SanityBlockContent;
	}
>;

export type SanitySection =
	| SanityCallToAction
	| SanityTextArea
	| SanityAdvertisement
	| SanityProductList;

export type SanityFrontPage = SanityDocument<
	"frontPage",
	{
		hero: SanityIllustration;
		sections: SanityObjectArray<SanitySection>;
	}
>;

export type SanityPage = SanityDocument<
	"page",
	{
		title: string;
		slug: { current: string };
		sections: SanityObjectArray<SanitySection>;
	}
>;

export type SanityArticle = SanityDocument<
	"article",
	{
		title: string;
		slug: { current: string };
		blurb: SanityBlockContent;
		image: SanityIllustration;
		content: SanityTextArea;
	}
>;

export type SanityStore = SanityDocument<
	"store",
	{
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

export type SanityDataTable = SanityObject<
	"dataTable",
	{
		columnHeader?: boolean;
		rowHeader?: boolean;
		data?: {
			rows?: SanityObjectArray<
				SanityObject<
					"row",
					{
						cells?: string[];
					}
				>
			>;
		};
	}
>;
