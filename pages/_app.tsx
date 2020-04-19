import React from "react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { CheckoutProvider } from "../utils/use-checkout";
import { CartProvider } from "../components/cart/hooks";

import "normalize.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../global-styles.css";

const App: React.FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	return (
		<CheckoutProvider
			accessToken="edf3edbd59b382c441dae46c8a8aee90"
			domain="plenny-no.myshopify.com"
		>
			<CartProvider>
				<DefaultSeo
					titleTemplate="%s | plenny.no"
					canonical="https://plenny.no"
					description="Plennyshake er en vegansk 🌱og laktose-fri 🥛shake proppfull av vitaminer og mineraler 💪som inneholder alle næringstroffene du trenger i løpet av en dag."
					openGraph={{
						type: "website",
						locale: "nb_NO",
						url: "https//plenny.no",
						site_name: "plenny.no", // eslint-disable-line @typescript-eslint/camelcase
					}}
				/>
				<Component {...pageProps} />
			</CartProvider>
		</CheckoutProvider>
	);
};

export default App;
