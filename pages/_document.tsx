import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import IntercomScripts from "../utils/intercom-scripts";

class CustomDocument extends Document {
	render() {
		return (
			<Html lang="nb">
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#b22222" />
					<meta name="msapplication-TileColor" content="#da532c" />
					<meta name="theme-color" content="#ffffff" />
					<script src="https://wchat.freshchat.com/js/widget.js" />
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-700.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-700.woff2"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-700italic.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-700italic.woff2"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-italic.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-italic.woff2"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-regular.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/montserrat-v14-latin-regular.woff2"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/baloo-thambi-2-v1-latin-700.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/baloo-thambi-2-v1-latin-700.woff2"
						as="font"
						crossOrigin=""
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<IntercomScripts appId="wgq0tvgl" />
				</body>
			</Html>
		);
	}
}
export default CustomDocument;
