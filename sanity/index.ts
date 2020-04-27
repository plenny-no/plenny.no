import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {
	SanityClient,
	SanityImageSource,
} from "@sanity/image-url/lib/types/types";

const options = {
	projectId: "bxtjfvg8",
	dataset: "production",
	useCdn: false,
};

const client = sanityClient(options);
const previewClient = sanityClient({
	...options,
	token: process.env.SANITY_TOKEN,
});

const builder = imageUrlBuilder(
	sanityClient({
		...options,
		useCdn: true,
	}) as SanityClient
);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export default (preview = false) => (preview ? previewClient : client);
