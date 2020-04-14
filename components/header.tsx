import React from "react";
import { css } from "@emotion/core";
import { Router } from "next/dist/client/router";
import { FaShoppingCart } from "react-icons/fa";
import Button from "./button";
import NextLink from "next/link";
import theme from "../utils/theme";
import useConfig from "../utils/use-config";
import SanityLink from "./sanity-link";

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

type Props = {
	className?: string;
};

const Header: React.FC<Props> = (props) => {
	const { className } = props;
	const [isOpen, setOpen] = React.useState(false);
	const toggleOpen = () => setOpen((current) => !current);
	const config = useConfig();

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
		<header className={className} css={container}>
			<section css={header}>
				<Button onClick={toggleOpen}>{isOpen ? "Lukk" : "Meny"}</Button>
				<NextLink href="/">
					<a>
						<img src="/logo.svg" css={logo} />
					</a>
				</NextLink>
				<Button>
					<FaShoppingCart />
				</Button>
			</section>
			<nav css={navigation(isOpen)}>
				<ul>
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
