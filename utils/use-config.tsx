import React from "react";
import { SanityConfig } from "../sanity/models";

const ConfigContext = React.createContext<SanityConfig | undefined>(undefined);

type Props = {
	value: SanityConfig;
};

export const ConfigProvider: React.FC<Props> = (props) => {
	const { children, value } = props;

	return (
		<ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
	);
};

export default function useConfig() {
	const context = React.useContext(ConfigContext);

	if (context === undefined) {
		throw new Error("useConfig must be used within a ConfigProvider");
	}

	return context;
}
