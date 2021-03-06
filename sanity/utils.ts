import { SanityImageObject } from "@sanity/image-url/lib/types/types";

export function draftsDeduplicate<T extends SanityDocument>(documents: T[]) {
	const exlude: string[] = [];

	documents.forEach((document) => {
		if (document._id.startsWith("drafts.")) {
			exlude.push(document._id.replace("drafts.", ""));
		}
	});

	return documents.filter((document) => {
		if (!exlude.includes(document._id)) return true;
		return false;
	});
}

export type SanityObject<T extends string, O extends object> = { _type: T } & O;

// NB: Only use this when all elements within the array are sanity object (i.e.
// not docuements, arrays ect)
export type SanityObjectArray<O extends SanityObject<string, object>> = ({
	_key: string;
} & O)[];

export type SanityReference<T extends SanityObject<string, object>> =
	| T
	| SanityObject<"reference", { _ref: string }>;

export type SanityDereference<T> = {
	[K in keyof T]: T[K] extends SanityReference<infer R>
		? R
		: T[K] extends (infer U)[]
		? SanityDereference<U>[]
		: T[K] extends object
		? SanityDereference<T[K]>
		: T[K];
};

export type SanityUnknown = SanityObject<string, {}>;

export type SanityDocument<T extends string = string, R = {}> = R & {
	_id: string;
	_rev: string;
	_type: T;
	_createdAt: string;
	_updatedAt: string;
};

export type SanityImage = SanityObject<"image", SanityImageObject>;

export type SanityImagePaletteSwatch = SanityObject<
	"sanity.imagePaletteSwatch",
	{
		background: string;
		foreground: string;
		population: number;
		title: string;
	}
>;

export type SanityImageAsset = SanityDocument<
	"sanity.imageAsset",
	{
		assetId: string;
		extension: string;
		metadata: SanityObject<
			"sanity.imageMetadata",
			{
				dimensions: SanityObject<
					"sanity.imageDimensions",
					{
						aspectRatio: number;
						height: number;
						width: number;
					}
				>;
				hasAlpha: boolean;
				isOpaque: boolean;
				lqip: string;
				palette: SanityObject<
					"sanity.imagePalette",
					{
						darkMuted: SanityImagePaletteSwatch;
						darkVibrant: SanityImagePaletteSwatch;
						dominant: SanityImagePaletteSwatch;
						lightMuted: SanityImagePaletteSwatch;
						lightVibrant: SanityImagePaletteSwatch;
						muted: SanityImagePaletteSwatch;
						vibrant: SanityImagePaletteSwatch;
					}
				>;
			}
		>;
		mimeType: string;
		originalFilename: string;
		path: string;
		sha1hash: string;
		size: number;
		uploadId: string;
		url: string;
	}
>;

export type SanitySlug = SanityObject<"slug", { current: string }>;

export type SanityBlockContent = SanityObject<"block", object>;
