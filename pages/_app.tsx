import React from "react";
import { AppProps } from "next/app";
import { css } from "@emotion/core";
import Header from "../components/header";
// import initLiveChat from "../utils/live-chat";

import "normalize.css";
import "../global-styles.css";

const wrapper = css`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const main = css`
	flex: 1;

	max-width: 800px;
	margin: 0 auto;
	padding: 0 1rem;
`;

const footer = css`
	min-height: 200px;
	background: firebrick;
	color: floralwhite;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const App: React.FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	return (
		<div css={wrapper}>
			<Header />
			<main css={main}>
				<Component {...pageProps} />
			</main>
			<footer css={footer}>PLENNY ANS</footer>
		</div>
	);
};

export default App;
