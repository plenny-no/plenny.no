import React from "react";
import { AppProps } from "next/app";
import { CheckoutProvider } from "../utils/use-checkout";

import "normalize.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../global-styles.css";
import { CartProvider } from "../components/cart/hooks";

const App: React.FC<AppProps> = (props) => {
	const { Component, pageProps } = props;

	return (
		<CheckoutProvider
			accessToken="edf3edbd59b382c441dae46c8a8aee90"
			domain="plenny-no.myshopify.com"
		>
			<CartProvider>
				<Component {...pageProps} />
			</CartProvider>
		</CheckoutProvider>
	);
};

export default App;
