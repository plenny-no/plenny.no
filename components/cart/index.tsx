import React from "react";
import useCheckout from "../../utils/use-checkout";
import Drawer from "@material-ui/core/SwipeableDrawer";
import { css } from "@emotion/core";
import Button from "../button";
import { FaTimes } from "react-icons/fa";
import { useCart } from "./hooks";
import CartItem from "./cart-item";
import { numberFotmatter } from "../../utils/helpers";
import theme from "../../utils/theme";

const wrapper = css`
	height: 100%;
	flex: 1;
	display: flex;
	flex-direction: column;

	& > header {
		position: relative;

		button {
			position: absolute;
			right: 0;
			top: 5px;
			font-size: 1.2rem;
			padding: 0.5em 0.7em;
			color: initial;
		}

		h1 {
			margin: 0;
			padding: 0.5rem;
			width: 100%;
			text-align: center;
			font-size: 1.5rem;
			color: firebrick;
		}

		p {
			margin: 1rem;
			font-size: 0.85rem;
			text-align: center;
			font-weight: bold;
			background: ${theme.safron};
			padding: 0.5rem 0;
			margin: 0;
		}
	}

	& > article {
		flex: 1;
		width: calc(100vw - 30px);
		max-width: 500px;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;

		& > p {
			margin: 1rem;
			font-size: 0.85rem;
			text-align: center;
			font-weight: bold;
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		ul {
			margin: 1rem;
			list-style: none;
			padding: 0;

			li {
				margin-bottom: 1rem;
				padding-bottom: 1rem;
				:not(:last-of-type) {
					border-bottom: 1px solid #ddd;
				}
			}
		}
	}

	& > footer {
		box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 0.5rem 1rem;

		div {
			font-size: 0.65rem;
			text-transform: uppercase;
			color: darkgray;
			margin-top: 0.5rem;
		}

		h2 {
			margin: 0 0 0.5rem 0;
			font-size: 1.125rem;
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
			cursor: pointer;
		}
	}
`;

const disabledLink = css`
	cursor: not-allowed !important;
`;

type Props = {};

export const Cart: React.FC<Props> = () => {
	const checkout = useCheckout();
	const [isOpen, setOpen] = useCart();
	const toggleOpen = (state: boolean) => () => setOpen(state);

	const totalPrice = parseInt(checkout?.checkout.totalPriceV2.amount || "0");
	const canCheckout =
		checkout?.checkout.ready && checkout.checkout.lineItems.length > 0;

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
					<p>
						{totalPrice < 800
							? `${800 - totalPrice} kr igjen til gratis frakt`
							: "Hurra! Du får gratis frakt :)"}
					</p>
				</header>
				<article>
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
						Totalt <span>{numberFotmatter(totalPrice)},-</span>
					</h2>
					<a
						href={checkout && canCheckout ? checkout.checkout.webUrl : "#"}
						css={canCheckout ? null : disabledLink}
					>
						Gå til kassen
					</a>
					{totalPrice < 800 && (
						<div>Frakt kommer i tillegg, beregnes i kassen</div>
					)}
				</footer>
			</div>
		</Drawer>
	);
};

export default Cart;
