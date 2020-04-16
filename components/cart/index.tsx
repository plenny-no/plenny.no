import React from "react";
import useCheckout from "../../utils/use-checkout";
import Drawer from "@material-ui/core/SwipeableDrawer";
import { css } from "@emotion/core";
import Button from "../button";
import { FaTimes } from "react-icons/fa";
import { useCart } from "./hooks";
import CartItem from "./cart-item";

const cart = css`
	width: 85vw;
	max-width: 500px;
`;

const closeButton = css`
	align-self: flex-start;
	font-size: 1.5rem;
`;

const content = css`
	list-style: none;
	padding: 0;
	margin: 1rem;

	& > li {
		margin-bottom: 1rem;
		border-bottom: 1px solid #eee;
	}
`;

type Props = {};

export const Cart: React.FC<Props> = () => {
	const checkout = useCheckout();
	const [isOpen, setOpen] = useCart();
	const toggleOpen = (state: boolean) => () => setOpen(state);

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onOpen={toggleOpen(true)}
			onClose={toggleOpen(false)}
		>
			<Button css={closeButton} onClick={toggleOpen(false)}>
				<FaTimes />
			</Button>
			<article css={cart}>
				{(!checkout || checkout.checkout.lineItems.length === 0) && (
					<p>Du har ingen varer i handlekurven enda.</p>
				)}
				<ul css={content}>
					{checkout &&
						checkout.checkout.lineItems.map((item) => (
							<li key={item.id}>
								<CartItem
									item={item}
									updateQuanity={(q: number) =>
										checkout.updateLineItems([{ id: item.id, quantity: q }])
									}
								/>
							</li>
						))}
				</ul>
			</article>
		</Drawer>
	);
};

export default Cart;
