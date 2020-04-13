import { SanityImageObject } from "@sanity/image-url/lib/types/types";

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

export type SanitySlug = SanityObject<"slug", { current: string }>;

export type SanityBlockContent = SanityObject<"block", object>;
