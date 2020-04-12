import React from "react";
import { css } from "@emotion/core";
import { Router } from "next/dist/client/router";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./button";
import Link from "./link";
import Logo from "./logo.svg";
import theme from "../utils/theme";

const container = css`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 4rem;
`;

const header = css`
	position: relative;
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	padding: 1rem;
	color: firebrick;
	font-weight: bold;
	background: transparent;
	z-index: 10;
`;

const logo = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 3rem;
`;

const navigation = (visible: boolean) => css`
	background-color: ${theme.safron};
	position: fixed;
	width: 100%;
	left: 0;
	height: 100vh;
	bottom: ${visible ? "0vh" : "100vh"};
	transition: bottom 0.3s ease-in-out;
	display: flex;
	justify-content: center;
	align-items: center;

	& > ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		text-align: center;

		li {
			margin: 1em;
			font-size: 1.8rem;
		}
	}
`;

const Header: React.FC = () => {
	const [isOpen, setOpen] = React.useState(false);
	const toggleOpen = () => setOpen((current) => !current);

	React.useEffect(() => {
		const handleRouteChange = () => {
			setOpen(false);
		};

		Router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			Router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	return (
		<header css={container}>
			<section css={header}>
				<Button onClick={toggleOpen}>{isOpen ? "Lukk" : "Meny"}</Button>
				<Logo css={logo} />
				<Button>
					<FaShoppingCart />
				</Button>
			</section>
			<nav css={navigation(isOpen)}>
				<ul>
					<li>
						<Link to="/store">Butikk</Link>
					</li>
					<li>
						<Link to="/what">Hva er Plenny Shake?</Link>
					</li>
					<li>
						<Link to="/blog">Blogg</Link>
					</li>
					<li>
						<Link to="/about">Om Oss</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
