import React from "react";
import { css } from "@emotion/core";
import { Router } from "next/dist/client/router";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./button";
import NextLink from "next/link";
import theme from "../utils/theme";
import useConfig from "../utils/use-config";
import SanityLink from "./sanity-link";
import useCheckout from "../utils/use-checkout";
import { allowScrolling } from "../utils/scrolling";
import Cart from "./cart";
import { useCart } from "./cart/hooks";
import Link from "./link";

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
	right: 0;
	bottom: 0;
	top: 0;
	transition: all 0.3s ease-in-out;
	transform: translateY(${visible ? "0" : "-100vh"});
	transform-origin: top center;
	overflow: hidden;
	display: flex;
	justify-content: center;
	padding-top: 5rem;

	& > ul {
		margin: 2rem 0 0 0;
		padding: 0;
		width: 100%;
		list-style: none;
		text-align: center;

		li {
			margin: 1rem;
			font-size: 1.8rem;
			display: inline-block;

			:nth-of-type(-n + 2) {
				display: block;
				font-size: 3rem;
				margin-bottom: 2rem;
			}
		}
	}
`;

const cartButton = css`
	position: relative;

	span {
		font-size: 1rem;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.3em;
		height: 1.3em;
		transform: translate(0, -10%);
		padding-left: 0.8em;
	}
`;

type Props = {
	className?: string;
};

const Header: React.FC<Props> = (props) => {
	const { className } = props;
	const config = useConfig();
	const [showNavigation, setShowNavigation] = React.useState(false);
	const [, setShowCart] = useCart();

	const toggleCart = (state: boolean) => () => setShowCart(state);

	const toggleNavigation = () =>
		setShowNavigation((current) => {
			allowScrolling(current);
			return !current;
		});

	const checkout = useCheckout();

	const itemsInCart =
		(checkout &&
			(checkout.checkout.lineItems.length === 0
				? null
				: checkout.checkout.lineItems.length > 99
				? "99+"
				: checkout.checkout.lineItems.length)) ||
		null;

	React.useEffect(() => {
		const handleRouteChange = () => {
			setShowNavigation(false);
			allowScrolling(true);
		};

		Router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			Router.events.off("routeChangeStart", handleRouteChange);
		};
	}, []);

	return (
		<header className={className} css={container}>
			<Cart />
			<section css={header}>
				<Button onClick={toggleNavigation}>
					{showNavigation ? "Lukk" : "Meny"}
				</Button>
				<NextLink href="/">
					<a>
						<img src="/logo.svg" css={logo} />
					</a>
				</NextLink>
				<Button css={cartButton} onClick={toggleCart(true)}>
					<FaShoppingCart />
					<span>{itemsInCart}</span>
				</Button>
			</section>
			<nav css={navigation(showNavigation)}>
				<ul>
					<li>
						<Link href="/butikk">Butikk</Link>
					</li>
					<li>
						<Link href="/blogg">Blogg</Link>
					</li>
					{config.navigation.map((link) => {
						return (
							<li key={link._key}>
								<SanityLink link={link} />
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
