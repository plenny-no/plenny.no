import React from "react";
import { AppProps } from "next/app";

import "normalize.css";
import "../global-styles.css";
import Header from "../components/header";

const App: React.FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	return (
		<>
			<Header />
			<main>
				<Component {...pageProps} />
			</main>
			<footer>PLENNY ANS</footer>
		</>
	);
};

export default App;
