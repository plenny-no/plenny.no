import React from "react";
import { css } from "@emotion/core";
import { SanityConfig } from "../sanity/models";
import { GetStaticProps } from "next";
import { fetchConfig } from "../sanity/queries";
import Layout from "../components/layout";

type Props = {
	config: SanityConfig;
};

const FourOhFour: React.FC<Props> = (props) => (
	<Layout config={props.config} title="404">
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
	</Layout>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
	const config = await fetchConfig();

	return {
		props: {
			config,
		},
	};
};

export default FourOhFour;
