import React from "react";
import { AppProps } from "next/app";

import "normalize.css";
import "../global-styles.css";

const App = (props: AppProps) => {
	const { Component, pageProps } = props;

	return (
		<>
			<Component {...pageProps} />
		</>
	);
};

export default App;
