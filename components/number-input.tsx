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

		:disabled {
			border-color: lightgray;
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

		:disabled {
			border-color: lightgray;
		}
	}
`;

type Props = {
	value: number;
	max: number;
	min: number;
	disabled?: boolean;
	onChange: (number: number) => any;
	onBlur: () => any;
	onIncrease: () => any;
	onDecrease: () => any;
};

const NumberInput: React.FC<Props> = (props) => {
	const {
		value,
		max,
		min,
		disabled,
		onChange,
		onBlur,
		onIncrease,
		onDecrease,
	} = props;

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		onChange(parseInt(evt.target.value));
	};

	return (
		<div css={wrapper}>
			<button disabled={disabled || value <= min} onClick={onDecrease}>
				-
			</button>
			<input
				type="number"
				pattern="[0-9]*"
				value={value || ""}
				disabled={disabled}
				onChange={handleChange}
				onBlur={onBlur}
			/>
			<button disabled={disabled || value >= max} onClick={onIncrease}>
				+
			</button>
		</div>
	);
};

export default NumberInput;
