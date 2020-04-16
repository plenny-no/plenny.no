const body =
	typeof window !== "undefined" ? document.querySelector("body") : null;

export function allowScrolling(allow: boolean) {
	if (body) {
		body.style.overflow = allow ? "initial" : "hidden";
	}
}
