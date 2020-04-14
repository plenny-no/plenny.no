import sanity from ".";
import {
	SanityConfig,
	SanityFrontPage,
	SanityPage,
	SanityStore,
	SanityProduct,
} from "./models";

const sectionsQuery = `
	sections[] {
		...,
		_type == "callToAction" => {
			...,
			link {
				...,
				url->
			},
			image {
				...,
				asset->
			}
		},
		_type == "advertisement" => {
			...,
			products[]-> {
				...,
				images[] {
					...,
					asset->
				},
				variants[]->
			}
		},
		_type == "productList" => {
			...,
			products[]-> {
				...,
				images[] {
					...,
					asset->
				},
				variants[]->
			}
		}
	}
`;

export async function fetchConfig() {
	return await sanity.fetch<SanityConfig>(
		`
		*[_id in ["global-config", "drafts.global-config"]]
		| order(_updatedAt desc)
		[0] {
			...,
			footer {
				...,
				links[] {
					...,
					_type == "internalLink" => {
						...,
						url->
					}
				}
			},
			navigation[] {
				...,
				_type == "internalLink" => {
					...,
					url->
				}
			}
		}
		`
	);
}

export async function fetchFrontPage() {
	return await sanity.fetch<SanityFrontPage>(
		`
		*[_id in ["global-front-page", "drafts.global-front-page"]]
		| order(_updatedAt desc)
		[0] {
			...,
			hero {
				...,
				asset->
			},
			${sectionsQuery}
		}
		`
	);
}

export async function fetchPagePaths() {
	return await sanity.fetch<Pick<SanityPage, "slug">[]>(
		`*[_type == "page"] {slug}`
	);
}

export async function fetchPage(slug: string) {
	return await sanity.fetch<SanityPage>(
		`
		*[_type == "page" && slug.current == "${slug}"]
		| order(_updatedAt desc)
		[0] {
			...,
			${sectionsQuery}
		}
		`
	);
}

export async function fetchStore() {
	return await sanity.fetch<SanityStore>(
		`
		*[_id in ["global-store", "drafts.global-store"]]
		| order(_updatedAt desc)
		[0] {
			...,
			${sectionsQuery}
		}
		`
	);
}

export async function fetchProductPaths() {
	return await sanity.fetch<Pick<SanityProduct, "slug">[]>(
		`*[_type == "product" && deleted != true] { slug }`
	);
}

export async function fetchProduct(slug: string) {
	return await sanity.fetch<SanityProduct>(
		`*[_type == "product" && slug.current == "${slug}"]
		| order(_updatedAt desc)
		[0]`
	);
}
