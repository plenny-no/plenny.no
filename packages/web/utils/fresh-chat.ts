type InitProps = {
	token: string;
	host: string;
	locale?: string;
};

declare global {
	interface Window {
		fcWidget: {
			init: (props: InitProps) => void;
		};
	}
}

export {};
