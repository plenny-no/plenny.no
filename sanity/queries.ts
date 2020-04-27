import sanity from ".";
import {
	SanityConfig,
	SanityFrontPage,
	SanityPage,
	SanityStore,
	SanityProduct,
	SanityArticle,
} from "./models";
import { draftsDeduplicate } from "./utils";

const textAreaSection = `
	{
		...,
		text[] {
			...,
			_type == "illustration" => {
				...,
				content {
					...,
					asset->
				}
			},
			markDefs[] {
				...,
				_type == "internalLink" => {
					...,
					url->
				}
			}
		}
	}
`;

const callToActionSection = `
	{
		...,
		link {
			...,
			url->
		},
		image {
			...,
			asset->
		}
	}
`;

const advertisementSection = `
	{
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
`;

const productListSection = `
	{
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
`;

const sectionsQuery = `
	sections[] {
		...,
		_type == "textArea" => ${textAreaSection},
		_type == "callToAction" => ${callToActionSection},
		_type == "advertisement" => ${advertisementSection},
		_type == "productList" => ${productListSection}
	}
`;

export async function fetchArticlePaths() {
	return await sanity(false).fetch<Pick<SanityArticle, "slug">[]>(
		`*[_type == "article"] {slug}`
	);
}

export async function fetchArticle(slug: string, preview = false) {
	return await sanity(preview).fetch<SanityArticle>(
		`
		*[_type == "article" && slug.current == "${slug}"]
		| order(_updatedAt desc)
		[0] {
			...,
			image {
				...,
				asset->
			},
			content ${textAreaSection}
		}
		`
	);
}

export async function fetchArticlePreviews(preview = false) {
	return await sanity(preview)
		.fetch<SanityArticle[]>(
			`*[_type == "article"]
		| order(_createdAt desc) {
			...,
			image {
				...,
				asset->
			},
			content ${textAreaSection}
		}`
		)
		.then(draftsDeduplicate);
}

export async function fetchConfig(preview = false) {
	return await sanity(preview).fetch<SanityConfig>(
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

export async function fetchFrontPage(preview = false) {
	return await sanity(preview).fetch<SanityFrontPage>(
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
	return await sanity(false).fetch<Pick<SanityPage, "slug">[]>(
		`*[_type == "page"] {slug}`
	);
}

export async function fetchPage(slug: string, preview = false) {
	return await sanity(preview).fetch<SanityPage>(
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

export async function fetchStore(preview = false) {
	return await sanity(preview).fetch<SanityStore>(
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
	return await sanity(false).fetch<Pick<SanityProduct, "slug">[]>(
		`*[_type == "product" && deleted != true] { slug }`
	);
}

export async function fetchProduct(slug: string, preview = false) {
	return await sanity(preview).fetch<SanityProduct>(
		`*[_type == "product" && slug.current == "${slug}"]
		| order(_updatedAt desc)
		[0] {
			...,
			images[] {
				...,
				asset->
			},
			variants[]->
		}`
	);
}
