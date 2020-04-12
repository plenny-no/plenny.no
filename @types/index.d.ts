declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.gif";

declare module "@sanity/block-content-to-react" {
	import React from "react";
	import { SanityObjectArray, SanityBlockContent } from "../sanity/models";

	const content: React.FC<{
		blocks: SanityObjectArray<SanityBlockContent>;
	}>;

	export default content;
}
