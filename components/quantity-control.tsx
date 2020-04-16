import React from "react";
import { css } from "@emotion/core";

const wrapper = css`
	& > button {
		border: none;
		background: none;
		border-top: 1px solid gray;
		border-bottom: 1px solid gray;
		padding: 0.2rem 0.8rem;
		line-height: inherit;
		cursor: pointer;
		touch-action: manipulation;

		:first-of-type {
			border-left: 1px solid gray;
			border-top-left-radius: 0.225rem;
			border-bottom-left-radius: 0.225rem;
		}

		:last-of-type {
			border-right: 1px solid gray;
			border-top-right-radius: 0.225rem;
			border-bottom-right-radius: 0.225rem;
		}
	}

	& > input {
		text-align: center;
		line-height: inherit;
		border: 1px solid gray;
		border-radius: 0;
		appearance: none;
		padding: 0.2rem 0.5rem;
		width: 3rem;

		::-webkit-inner-spin-button,
		::-webkit-outer-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
`;

type Props = {
	quantity: number;
	updateQuantity: (newQuantity: number) => Promise<any>;
};

const QuantityControl: React.FC<Props> = (props) => {
	const { quantity, updateQuantity } = props;
	const [_quantity, _setQuantity] = React.useState(quantity);
	const [isUpdating, setIsUpdating] = React.useState(false);
	const [timeoutHandler, setTimeoutHandler] = React.useState<
		number | undefined
	>(undefined);

	React.useEffect(() => _setQuantity(quantity), [quantity, _setQuantity]);

	React.useEffect(
		() => () => {
			if (typeof window !== "undefined") {
				window.clearTimeout(timeoutHandler);
			}
		},
		[timeoutHandler]
	);

	const lazyUpdateQuantity = React.useCallback(
		(newQuantity: number) => {
			if (typeof window !== "undefined") {
				window.clearTimeout(timeoutHandler);
				_setQuantity(newQuantity);
				setTimeoutHandler(
					window.setTimeout(async () => {
						setIsUpdating(true);
						await updateQuantity(newQuantity);
						setIsUpdating(false);
					}, 500)
				);
			}
		},
		[setTimeoutHandler, updateQuantity, _setQuantity, timeoutHandler]
	);

	const handleBlur = async () => {
		if (_quantity !== quantity) {
			setIsUpdating(true);
			await updateQuantity(_quantity);
			setIsUpdating(false);
		}
	};

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const newQuantity = parseInt(evt.target.value, 10);
		_setQuantity(newQuantity < 1 ? 1 : newQuantity);
	};

	return (
		<div css={wrapper}>
			<button
				disabled={isUpdating}
				onClick={() => lazyUpdateQuantity(_quantity - 1)}
			>
				-
			</button>
			<input
				type="number"
				pattern="[0-9]*"
				value={_quantity}
				disabled={isUpdating}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<button
				disabled={isUpdating}
				onClick={() => lazyUpdateQuantity(_quantity + 1)}
			>
				+
			</button>
		</div>
	);
};

export default QuantityControl;
