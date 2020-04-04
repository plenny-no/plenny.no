import React from "react";
import { css } from "@emotion/core";
import Button from "./button";
import Link from "./link";

const header = css`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	color: firebrick;
	font-weight: bold;
	background-color: bisque;
	z-index: 1;
`;

const logo = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-family: baloo-thambi2;
	font-size: 1.8rem;
`;

const navigation = (visible: boolean) => css`
	background-color: bisque;
	position: absolute;
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

	return (
		<header>
			<section css={header}>
				<Button onClick={toggleOpen}>{isOpen ? "Lukk" : "Meny"}</Button>
				<span css={logo}>Plenny</span>
				<Button>🛒</Button>
			</section>
			<nav css={navigation(isOpen)}>
				<ul>
					<li>
						<Link href="/">Butikk</Link>
					</li>
					<li>
						<Link href="/">Hva er Plenny Shake?</Link>
					</li>
					<li>
						<Link href="/">Blogg</Link>
					</li>
					<li>
						<Link href="/">Om Oss</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
