import React from "react";
import Head from "next/head";
import { css } from "@emotion/core";

const FourOhFour = () => (
	<>
		<Head>
			<title>404 | Plenny.no</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<h1
			css={css`
				font-family: baloo-thambi2;
				font-size: 2rem;
			`}
		>
			Siden du prøvde å gå til finnes ikke... enda!
		</h1>

		<p>
			Denne siden er under konstruksjon 🏗, så kom tilbake senere, kanskje den
			finnes da!
		</p>
	</>
);

export default FourOhFour;
