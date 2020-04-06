declare global {
	interface Window {
		__lc?: {
			license?: number;
		};
	}
}

export default function initLiveChat(license: number) {
	window.__lc = window.__lc || {};
	window.__lc.license = license;

	const lc = document.createElement("script");

	lc.type = "text/javascript";
	lc.async = true;
	lc.src = "https://cdn.livechatinc.com/tracking.js";
	const s = document.getElementsByTagName("script")[0];
	if (s.parentNode) s.parentNode.insertBefore(lc, s);
}
