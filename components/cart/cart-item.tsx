import React from "react";
import { CheckoutLineItem } from "shopify-buy";
import { css } from "@emotion/core";
import { numberFotmatter } from "../../utils/helpers";
import QuantityControl from "./quantity-control";

const wrapper = (isRemoving: boolean) => css`
	display: grid;
	grid-template-columns: 1fr auto;
	opacity: ${isRemoving ? 0.6 : 1};

	& > header {
		display: flex;
		flex-direction: column;

		h2 {
			margin: 0;
			font-size: 1rem;
			font-weight: normal;
			margin-bottom: 0.125rem;
			word-wrap: break-word;
			word-break: break-all;
		}

		h3 {
			margin: 0;
			font-size: 0.85rem;
			line-height: 1;
			word-wrap: break-word;
			word-break: break-all;
		}

		span {
			flex: 1;
			display: flex;
			align-items: flex-end;
			margin-top: 0.5rem;
			font-size: 0.85rem;
			color: #444;
		}
	}

	& > section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		& > button {
			padding: 0;
			border: 0;
			background: none;
			text-decoration: underline;
			font-size: 0.85rem;
			align-self: flex-end;
			padding: 0.5rem 0 0 1rem;
			margin-top: 1rem;
			cursor: pointer;
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

	const handleRemove = () => {
		setIsRemoving(true);
		removeItem();
	};

	return (
		<article css={wrapper(isRemoving)}>
			<header>
				<h2>{item.title}</h2>
				<h3>{item.variant?.title}</h3>
				<span>{price && numberFotmatter(price)} kr per stykk</span>
			</header>
			<section>
				<QuantityControl
					quantity={item.quantity}
					updateQuantity={updateQuanity}
				/>
				<button onClick={handleRemove} disabled={isRemoving}>
					fjern
				</button>
			</section>
		</article>
	);
};

export default CartItem;
