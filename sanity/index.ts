import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
	SanityClient,
	SanityImageSource,
} from "@sanity/image-url/lib/types/types";

export const sanity = sanityClient({
	projectId: "bxtjfvg8",
	dataset: "production",
	useCdn: true,
});

const builder = imageUrlBuilder(sanity as SanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export default sanity;
