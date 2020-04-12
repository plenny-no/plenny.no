import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

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
					<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
					<link
						href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap"
						rel="stylesheet"
					/>
					<meta name="msapplication-TileColor" content="#00aba9" />
					<meta name="theme-color" content="#fbf6ff" />
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
