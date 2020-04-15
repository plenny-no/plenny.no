import React from "react";
import Client from "shopify-buy";

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => any ? P : never;

function createCheckout(
	client: Client.Client,
	checkoutId: string,
	checkout: Client.Checkout,
	updateCheckout: (newCheckout: Client.Checkout) => void
) {
	return {
		checkout,
		updateAttributes: (
			...input: OmitFirstArg<typeof client.checkout.updateAttributes>
		) =>
			client.checkout
				.updateAttributes(checkoutId, ...input)
				.then(updateCheckout),
		updateEmail: (...input: OmitFirstArg<typeof client.checkout.updateEmail>) =>
			client.checkout.updateEmail(checkoutId, ...input).then(updateCheckout),
		addLineItems: (
			...input: OmitFirstArg<typeof client.checkout.addLineItems>
		) =>
			client.checkout.addLineItems(checkoutId, ...input).then(updateCheckout),
		addDiscount: (...input: OmitFirstArg<typeof client.checkout.addDiscount>) =>
			client.checkout.addDiscount(checkoutId, ...input).then(updateCheckout),
		removeDiscount: () =>
			client.checkout.removeDiscount(checkoutId).then(updateCheckout),
		addGiftCards: (
			...input: OmitFirstArg<typeof client.checkout.addGiftCards>
		) =>
			client.checkout.addGiftCards(checkoutId, ...input).then(updateCheckout),
		removeGiftCard: (
			...input: OmitFirstArg<typeof client.checkout.removeGiftCard>
		) =>
			client.checkout.removeGiftCard(checkoutId, ...input).then(updateCheckout),
		removeLineItems: (
			...input: OmitFirstArg<typeof client.checkout.removeLineItems>
		) =>
			client.checkout
				.removeLineItems(checkoutId, ...input)
				.then(updateCheckout),
		replaceLineItems: (
			...input: OmitFirstArg<typeof client.checkout.replaceLineItems>
		) =>
			client.checkout
				.replaceLineItems(checkoutId, ...input)
				.then(updateCheckout),
		updateLineItems: (
			...input: OmitFirstArg<typeof client.checkout.updateLineItems>
		) =>
			client.checkout
				.updateLineItems(checkoutId, ...input)
				.then(updateCheckout),
		updateShippingAddress: (
			...input: OmitFirstArg<typeof client.checkout.updateShippingAddress>
		) =>
			client.checkout
				.updateShippingAddress(checkoutId, ...input)
				.then(updateCheckout),
	};
}

const CheckoutContext = React.createContext<
	ReturnType<typeof createCheckout> | null | undefined
>(undefined);

type Props = {
	domain: string;
	accessToken: string;
};

export const CheckoutProvider: React.FC<Props> = (props) => {
	const { children, domain, accessToken } = props;
	const [checkout, setCheckout] = React.useState<Client.Checkout | null>(null);

	const client = Client.buildClient({
		domain,
		storefrontAccessToken: accessToken,
	});

	React.useEffect(() => {
		if (typeof window !== "undefined") {
			const storedCheckout = localStorage.getItem("checkout");
			if (storedCheckout) {
				client.checkout.fetch(storedCheckout).then((oldCheckout) => {
					if (oldCheckout.completedAt) {
						// The checkout is completed. Create a fresh one
						client.checkout.create().then((newCheckout) => {
							setCheckout(newCheckout);
							localStorage.setItem("checkout", newCheckout.id);
						});
					} else {
						setCheckout(oldCheckout);
					}
				});
			} else {
				client.checkout.create().then((newCheckout) => {
					setCheckout(newCheckout);
					localStorage.setItem("checkout", newCheckout.id);
				});
			}
		}
	}, []);

	const value =
		checkout && createCheckout(client, checkout.id, checkout, setCheckout);

	return (
		<CheckoutContext.Provider value={value}>
			{children}
		</CheckoutContext.Provider>
	);
};

export default function useCheckout() {
	const context = React.useContext(CheckoutContext);

	if (context === undefined) {
		throw new Error("useCheckout must be used within a CheckoutProvider");
	}

	return context;
}
