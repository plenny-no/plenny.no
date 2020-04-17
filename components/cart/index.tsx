import React from "react";
import useCheckout from "../../utils/use-checkout";
import Drawer from "@material-ui/core/SwipeableDrawer";
import { css } from "@emotion/core";
import Button from "../button";
import { FaTimes } from "react-icons/fa";
import { useCart } from "./hooks";
import CartItem from "./cart-item";
import { numberFotmatter } from "../../utils/helpers";

const wrapper = css`
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;

	& > header {
		position: relative;
		border-bottom: 1px solid lightgray;
		box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);

		button {
			position: absolute;
			left: 0;
			top: 0;
			font-size: 1.2rem;
			padding: 0.5em 0.7em;
			color: initial;
		}

		h1 {
			margin: 0;
			padding: 1rem 0;
			width: 100%;
			text-align: center;
			font-size: 1.5rem;
			color: firebrick;
		}
	}

	& > article {
		flex: 1;
		width: calc(100vw - 30px);
		max-width: 500px;
		overflow-y: auto;
		overflow-x: hidden;

		& > p {
			margin: 1rem;
			font-size: 0.85rem;
			text-align: center;
			font-weight: bold;
		}

		ul {
			margin: 1rem;
			list-style: none;
			padding: 0;

			li {
				margin-bottom: 1rem;
			}
		}
	}

	& > footer {
		border-top: 1px solid lightgray;
		box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;

		div {
			font-size: 0.65rem;
			text-transform: uppercase;
			color: darkgray;
			margin-bottom: 0.5rem;
		}

		h2 {
			margin: 0 0 0.5rem 0;
			font-size: 1.25rem;
		}

		a {
			padding: 1rem 2rem;
			background: firebrick;
			color: white;
			border-radius: 0.3rem;
			border: none;
			width: 100%;
			text-transform: uppercase;
			font-size: 1rem;
			text-align: center;
			text-decoration: none;
		}
	}
`;

type Props = {};

export const Cart: React.FC<Props> = () => {
	const checkout = useCheckout();
	const [isOpen, setOpen] = useCart();
	const toggleOpen = (state: boolean) => () => setOpen(state);

	const totalPrice = parseInt(checkout?.checkout.totalPriceV2.amount || "0");

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onOpen={toggleOpen(true)}
			onClose={toggleOpen(false)}
		>
			<div css={wrapper}>
				<header>
					<Button onClick={toggleOpen(false)}>
						<FaTimes />
					</Button>
					<h1>Handlekurv</h1>
				</header>
				<article>
					<p>
						{totalPrice < 800
							? `${800 - totalPrice} kr igjen til gratis frakt`
							: "Hurra! Du får gratis frakt :)"}
					</p>
					{(!checkout || checkout.checkout.lineItems.length === 0) && (
						<p>Du har ingen varer i handlekurven :(</p>
					)}
					<ul>
						{checkout &&
							checkout.checkout.lineItems.map((item) => (
								<li key={item.id}>
									<CartItem
										item={item}
										updateQuanity={(q: number) =>
											checkout.updateLineItems([{ id: item.id, quantity: q }])
										}
										removeItem={() => checkout.removeLineItems([item.id])}
									/>
								</li>
							))}
					</ul>
				</article>
				<footer>
					<h2>
						Totalt: <span>{numberFotmatter(totalPrice)},-</span>
					</h2>
					{totalPrice < 800 && (
						<div>Frakt kommer i tillegg, beregnes i kassen</div>
					)}
					<a href={checkout?.checkout.webUrl || "#"}>Gå til kassen</a>
				</footer>
			</div>
		</Drawer>
	);
};

export default Cart;
