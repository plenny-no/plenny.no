import sanity from ".";
import { SanityConfig, SanityFrontPage, SanityPage } from "./models";

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
		*[_id == "global-front-page"]
		| order(_updatedAt desc)
		[0] {
			...,
			hero {
				...,
				asset->
			},
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
				}
			}
		}
		`
	);
}

export async function fetchPage(slug: string) {
	return await sanity.fetch<SanityPage>(
		`
		*[_type == "page" && slug.current == "${slug}"]
		| order(_updatedAt desc)
		[0] {
			...,
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
				}
			}
		}
		`
	);
}
