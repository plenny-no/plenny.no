import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
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
				</body>
			</Html>
		);
	}
}
export default CustomDocument;
