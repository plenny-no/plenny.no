import React from "react";
import { CheckoutLineItem } from "shopify-buy";
import { css } from "@emotion/core";

const wrapper = css`
	display: flex;
	flex-direction: column;
	justify-content: center;

	& > header {
		font-weight: bold;
		margin-bottom: 0.5rem;
	}

	& > section {
		display: flex;
		justify-content: space-between;

		& > label {
			font-size: 0.625rem;
			text-transform: uppercase;
			text-align: center;
			color: gray;

			:first-of-type {
				text-align: left;
			}

			:last-of-type {
				text-align: right;
			}

			& > div {
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

const numberFotmatter = Intl.NumberFormat("nb-NO").format;

type Props = {
	item: CheckoutLineItem;
	updateQuanity: (quanity: number) => Promise<void>;
	removeItem?: () => Promise<void>;
};

const CartItem: React.FC<Props> = (props) => {
	const { item, updateQuanity } = props;
	const [_quantity, _setQuantity] = React.useState(item.quantity);

	React.useEffect(() => _setQuantity(item.quantity), [item]);

	const name = item.variant
		? `${item.title} - ${item.variant.title}`
		: item.title;
	const price = item.variant ? parseInt(item.variant.priceV2.amount, 10) : null;
	const totalPrice = price ? price * item.quantity : null;

	return (
		<article css={wrapper}>
			<header>{name}</header>
			<section>
				<label>
					Pris <div>{price && numberFotmatter(price)}</div>
				</label>
				<label>
					Antall
					<div>
						<button>-</button>
						{_quantity}
						<button
							onClick={() => {
								_setQuantity((current) => current + 1);
							}}
						>
							+
						</button>
					</div>
				</label>
				<label>
					Totalt
					<div>{totalPrice && numberFotmatter(totalPrice)}</div>
				</label>
			</section>
			<footer>
				<button>fjern</button>
			</footer>
		</article>
	);
};

export default CartItem;
