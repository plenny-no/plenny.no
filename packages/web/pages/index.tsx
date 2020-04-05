import React from "react";
import Head from "next/head";
import { css } from "@emotion/core";

const Home = () => (
	<>
		<Head>
			<title>Hjem | Plenny.no</title>
		</Head>
		<h1
			css={css`
				font-family: baloo-thambi2;
				font-size: 2rem;
			`}
		>
			👋 Velkommen til plenny.no!
		</h1>

		<p>Her kommer det en fresh nettbutikk om ikke lenge ✨</p>
	</>
);

export default Home;
