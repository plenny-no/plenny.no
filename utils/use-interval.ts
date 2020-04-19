import React from "react";

export function useInterval(callback: () => any, delay: number | null) {
	const savedCallback = React.useRef<() => any>();

	React.useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	React.useEffect(() => {
		const tick = () => {
			if (savedCallback.current) {
				savedCallback.current();
			}
		};

		if (delay === null) return;

		const id = setInterval(tick, delay);
		return () => clearInterval(id);
	}, [delay]);
}
