import React from "react";

const CartContext = React.createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CartProvider: React.FC = (props) => {
	const { children } = props;
	const cartState = React.useState(false);

	return (
		<CartContext.Provider value={cartState}>{children}</CartContext.Provider>
	);
};

export function useCart() {
	const context = React.useContext(CartContext);

	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}

	return context;
}
