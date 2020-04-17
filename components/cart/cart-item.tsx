import React from "react";
import { CheckoutLineItem } from "shopify-buy";
import { FaTimes } from "react-icons/fa";
import { css, keyframes } from "@emotion/core";
import { numberFotmatter } from "../../utils/helpers";
import QuantityControl from "../quantity-control";

const bounceOut = keyframes`
	2% {
		transform: scale(1.2);
	}

	10% {
		transform: scale(0);
		opacity: 0;
	}

	100% {
		transform: scale(0);
		opacity: 0;
	}
`;

const wrapper = (isRemoving: boolean) => css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border: 1px solid lightgray;
	border-radius: 0.25rem;
	box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
	padding: 0.5rem 1rem;
	animation: ${isRemoving ? bounceOut : ""} 6s;

	& > header {
		display: flex;

		h2 {
			flex: 1;
			margin: 0;
			font-size: 1rem;
			font-weight: normal;
		}

		button {
			border: none;
			margin: none;
			background: none;
			align-self: flex-start;
			margin-right: -1rem;
			margin-top: -0.5rem;
			padding: 0.5rem;
			font-size: 0.85rem;
		}
	}

	& > h3 {
		margin: 0;
		font-size: 0.85rem;
	}

	& > section {
		margin-top: 0.75rem;
		display: flex;
		justify-content: space-between;

		div {
			font-size: 0.625rem;
			text-transform: uppercase;
			text-align: center;
			color: gray;

			:first-of-type {
				text-align: left;
			}

			:last-of-type {
				text-align: right;

				div {
					font-weight: bold;
				}
			}

			div {
				font-size: 1rem;
				color: initial;
			}
		}
	}

	& > footer {
		display: flex;
		justify-content: flex-end;

		& > button {
			border: none;
			background: none;
			text-decoration: underline;
			cursor: pointer;
			font-size: 0.85rem;
			padding: 0.5rem;
			padding-right: 0;
		}
	}
`;

type Props = {
	item: CheckoutLineItem;
	updateQuanity: (quanity: number) => Promise<any>;
	removeItem: () => Promise<any>;
};

const CartItem: React.FC<Props> = (props) => {
	const { item, updateQuanity, removeItem } = props;
	const [isRemoving, setIsRemoving] = React.useState(false);
	const price = item.variant ? parseInt(item.variant.priceV2.amount, 10) : null;
	const totalPrice = price ? price * item.quantity : null;

	const handleRemove = () => {
		setIsRemoving(true);
		removeItem();
	};

	return (
		<article css={wrapper(isRemoving)}>
			<header>
				<h2>{item.title}</h2>
				<button onClick={handleRemove} disabled={isRemoving}>
					<FaTimes />
				</button>
			</header>
			<h3>{item.variant?.title}</h3>
			<section>
				<div>
					Pris <div>{price && numberFotmatter(price)}</div>
				</div>
				<div>
					Antall
					<QuantityControl
						quantity={item.quantity}
						updateQuantity={updateQuanity}
					/>
				</div>
				<div>
					Totalt
					<div>{totalPrice && numberFotmatter(totalPrice)}</div>
				</div>
			</section>
		</article>
	);
};

export default CartItem;
