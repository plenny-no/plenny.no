import React from "react";
import NumberInput from "../number-input";

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

	const handleIncrease = () =>
		lazyUpdateQuantity(Math.min((_quantity || 1) + 1, 99));
	const handleDecrease = () =>
		lazyUpdateQuantity(Math.max((_quantity || 1) - 1, 1));
	const handleChange = (newQuantity: number) => _setQuantity(newQuantity);
	const handleBlur = async () => {
		if (_quantity !== quantity) {
			const newQuantity = isNaN(_quantity)
				? 1
				: Math.max(Math.min(_quantity || 1, 99), 1);
			setIsUpdating(true);
			_setQuantity(newQuantity);
			await updateQuantity(newQuantity);
			setIsUpdating(false);
		}
	};

	return (
		<NumberInput
			value={_quantity}
			max={99}
			min={1}
			disabled={isUpdating}
			onIncrease={handleIncrease}
			onDecrease={handleDecrease}
			onChange={handleChange}
			onBlur={handleBlur}
		/>
	);
};

export default QuantityControl;
