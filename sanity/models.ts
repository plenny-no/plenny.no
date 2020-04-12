/**
 *
 * UTILITIES
 *
 */

export type SupportedLanguages = "en";
export type DefaultLagnguage = "no";
export type Locale<T> = { [L in DefaultLagnguage]: T } &
	{
		[L in SupportedLanguages]: T | undefined;
	};

export type SanityObject<T extends string, O extends object> = { _type: T } & O;

// NB: Only use this when all elements within the array are sanity object (i.e.
// not docuements, arrays ect)
export type SanityObjectArray<O extends SanityObject<string, object>> = ({
	_key: string;
} & O)[];

export type SanityReference = SanityObject<"reference", { _ref: string }>;

export type SanityUnknown = SanityObject<string, {}>;

export type SanityDocument<T extends string = string, R = {}> = R & {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
};

export type SanityImage = SanityObject<
	"image",
	{
		asset: SanityReference;
	}
>;

export type SanitySlug = SanityObject<"slug", { _current: string }>;

export type SanityBlockContent = SanityObject<"block", object>;

/**
 *
 * TYPES
 *
 */

export type SanityIllustration = SanityObject<
	"illustration",
	{
		alt: string;
		caption: string;
		asset: SanityReference;
	}
>;

export type SanityLink = SanityObject<
	"link",
	{
		title: string;
		url: string;
	}
>;

/**
 *
 * SECTIONS
 *
 */

export type SanityCallToAction = SanityObject<
	"callToAction",
	{
		title: string;
		text: SanityObjectArray<SanityBlockContent>;
		image: SanityReference;
		link?: SanityLink;
		imageAlignment: "left" | "right";
	}
>;

export type SanityTextArea = SanityObject<
	"textArea",
	{
		text: SanityObjectArray<SanityBlockContent>;
	}
>;

export type SanitySection = SanityCallToAction | SanityTextArea;

/**
 *
 * DOCUMENTS
 *
 */

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

export type SanityProduct = SanityDocument<
	"product",
	{
		title: string;
		description: SanityTextArea;
		images: SanityObjectArray<SanityIllustration>;
		variants: SanityObjectArray<SanityReference>;
		productId: string;
		defaultPrice: number;
		vendor?: string;
		handle: SanitySlug;
		deleted: boolean;
	}
>;

export type SanityVariant = SanityDocument<
	"variant",
	{
		title: string;
		sku: string;
		product: SanityReference;
		variantId: string;
		price: number;
		compareAtPrice: number;
		inventoryQuantity: number;
	}
>;
