/* eslint-disable */

export default function () {
	const w = window;
	const ic = w.Intercom;
	window.intercomSettings = {
		app_id: "wgq0tvgl",
	};
	if (typeof ic === "function") {
		ic("reattach_activator");
		ic("update", w.intercomSettings);
	} else {
		const d = document;
		var i = function () {
			i.c(arguments);
		};
		i.q = [];
		i.c = function (args) {
			i.q.push(args);
		};
		w.Intercom = i;
		const l = function () {
			const s = d.createElement("script");
			s.type = "text/javascript";
			s.async = true;
			s.src = "https://widget.intercom.io/widget/wgq0tvgl";
			const x = d.getElementsByTagName("script")[0];
			x.parentNode.insertBefore(s, x);
		};
		if (w.attachEvent) {
			w.attachEvent("onload", l);
		} else {
			w.addEventListener("load", l, false);
		}
	}
}
