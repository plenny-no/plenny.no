declare namespace ShopifyBuy {
	export type Maybe<T> = T | null;

	export function buildClient(config: Config): Client;

	export type Client = {
		checkout: ShopifyBuy.CheckoutResource;
	};

	export type Config = {
		domain: string;
		storefrontAccessToken: string;
	};

	export type CheckoutResource = {
		fetch(id: string): Promise<Checkout>;

		create(input?: {
			email?: string;
			lineItems?: CheckoutLineItemInput[];
			shippingAddress?: MailingAddressInput;
			note?: string;
			customAttributes?: AttributeInput[];
			presentmentCurrencyCode?: CurrencyCode;
		}): Promise<Checkout>;

		updateAttributes(
			checkoutId: string,
			input: {
				allowPartialAddresses?: boolean;
				customAttributes: AttributeInput[];
				note: string;
			}
		): Promise<Checkout>;

		updateEmail(checkoutId: string, email: string): Promise<Checkout>;

		addLineItems(
			checkoutId: string,
			lineItems: CheckoutLineItemInput[]
		): Promise<Checkout>;

		addDiscount(checkoutId: string, discountCode: string): Promise<Checkout>;

		removeDiscount(checkoutId: string): Promise<Checkout>;

		addGiftCards(
			checkoutId: string,
			giftCardCodes: string[]
		): Promise<Checkout>;

		removeGiftCard(
			checkoutId: string,
			appliedGiftCardId: string
		): Promise<Checkout>;

		removeLineItems(
			checkoutId: string,
			lineItemIds: string[]
		): Promise<Checkout>;

		replaceLineItems(
			checkoutId: string,
			lineItems: CheckoutLineItemInput
		): Promise<Checkout>;

		updateLineItems(
			checkoutId: string,
			lineItems: CheckoutLineItemInput
		): Promise<Checkout>;

		updateShippingAddress(
			checkoutId: string,
			shippingAddress: MailingAddressInput
		): Promise<Checkout>;
	};

	export type Checkout = {
		appliedGiftCards: AppliedGiftCard[];
		completedAt?: Maybe<Date | null>;
		createdAt: Date;
		currencyCode: CurrencyCode;
		customAttributes: Attribute;
		discountApplications: DiscountApplication[];
		email?: Maybe<string | null>;
		id: string;
		lineItems: CheckoutLineItem[];
		lineItemsSubtotalPrice: MoneyV2;
		note?: Maybe<string>;
		paymentDueV2: MoneyV2;
		ready: boolean;
		requiresShipping: boolean;
		shippingDiscountAllocations: DiscountApplication[];
		subtotalPriceV2: MoneyV2;
		taxExempt: boolean;
		taxesIncluded: boolean;
		totalPriceV2: MoneyV2;
		totalTaxV2: MoneyV2;
		updatedAt: Date;
		webUrl: string;
	};

	export type ProductVariant = {
		availableForSale: boolean;
		compareAtPriceV2: MoneyV2;
		id: string;
		presentmentPrices: ProductVariantPricePair[];
		priceV2: MoneyV2;
		product: {
			id: string;
			handle: string;
		};
		requiresShipping: boolean;
		selectedOptions: SelectedOption[];
		sku?: Maybe<string>;
		title: string;
		unitPrice?: Maybe<MoneyV2 | null>;
		unitPriceMeasurement?: Maybe<UnitPriceMeasurement>;
		weight?: Maybe<number>;
	};

	export type CheckoutLineItemInput = {
		customAttributes?: AttributeInput[];
		quantity: number;
		variantId: string;
	};

	export type UnitPriceMeasurement = {
		measuredType?: Maybe<"VOLUME" | "WEIGHT" | "LENGTH" | "AREA">;
		quantityUnit?: Maybe<
			"ML" | "CL" | "L" | "M3" | "MG" | "G" | "KG" | "MM" | "CM" | "M" | "M2"
		>;
		quantityValue?: Maybe<number>;
		referenceUnit?: Maybe<
			"ML" | "CL" | "L" | "M3" | "MG" | "G" | "KG" | "MM" | "CM" | "M" | "M2"
		>;
		referenceValue?: Maybe<number>;
	};

	export type SelectedOption = {
		[key: string]: string;
	};

	export type ProductVariantPricePair = {
		compareAtPrice?: Maybe<MoneyV2 | null>;
		price: MoneyV2;
	};

	export type AvailableShippingRates = {
		ready: boolean;
		shippingRates?: Maybe<ShippingRate[]>;
	};

	export type ShippingRate = {
		handle: string;
		priceV2: MoneyV2;
		title: string;
	};

	export type CheckoutLineItem = {
		customAttributes: Attribute[];
		discountAllocations: DiscountAllocation[];
		id: string;
		quantity: number;
		title: string;
		variant?: Maybe<ProductVariant>;
	};

	export type DiscountAllocation = {
		allocatedAmount: MoneyV2;
		discountApplication: DiscountApplication;
	};

	export type DiscountApplication = {
		allocationMethod: "ACROSS" | "EACH" | "ONE";
		targetSelection: "ALL" | "ENTITLED" | "EXPLICIT";
		targetType: "LINE_ITEM" | "SHIPPING_LINE";
		value: MoneyV2 | PricingPercentageValue;
	};

	export type PricingPercentageValue = {
		percentage: number;
	};

	export type AppliedGiftCard = {
		id: string;
		amountUsedV2: MoneyV2;
		balanceV2: MoneyV2;
		lastCharacters: string;
		presentmentAmountUsed: MoneyV2;
	};

	export type MoneyV2 = {
		amount: string;
		currencyCode: CurrencyCode;
	};

	export type LineItem = {
		compare_at_price: string;
		grams: number;
		id: string | number;
		image: Image;
		line_price: string;
		price: string;
		product_id: string | number;
		quantity: number;
		title: string;
		variant_id: string | number;
		variant_title: string;
	};

	export type Item = {
		variant: ProductVariant;
		quantity: number;
	};

	export type MailingAddressInput = {
		address1?: Maybe<string>;
		address2?: Maybe<string>;
		city?: Maybe<string>;
		company?: Maybe<string>;
		country?: Maybe<string>;
		firstName?: Maybe<string>;
		lastName?: Maybe<string>;
		phone?: Maybe<string>;
		province?: Maybe<string>;
		zip?: Maybe<string>;
	};

	export type AttributeInput = {
		key?: Maybe<string>;
		value?: Maybe<string>;
		id?: Maybe<string | number>;
		quantity?: Maybe<number>;
		variantId?: Maybe<string>;
	};

	export type Attribute = {
		[key: string]: string;
	};

	let NO_IMAGE_URI: string;

	export type CurrencyCode =
		| "ZMW"
		| "AFN"
		| "ALL"
		| "AMD"
		| "ANG"
		| "AOA"
		| "ARS"
		| "AUD"
		| "AWG"
		| "AZN"
		| "BAM"
		| "BBD"
		| "BDT"
		| "BGN"
		| "BHD"
		| "BIF"
		| "BMD"
		| "BND"
		| "BOB"
		| "BRL"
		| "BSD"
		| "BTN"
		| "BWP"
		| "AED"
		| "BZD"
		| "CAD"
		| "CDF"
		| "CHF"
		| "CLP"
		| "CNY"
		| "COP"
		| "CRC"
		| "CVE"
		| "CZK"
		| "DJF"
		| "DKK"
		| "DOP"
		| "DZD"
		| "EGP"
		| "ETB"
		| "EUR"
		| "FJD"
		| "FKP"
		| "GBP"
		| "GEL"
		| "GHS"
		| "GIP"
		| "GMD"
		| "GNF"
		| "GTQ"
		| "GYD"
		| "HKD"
		| "HNL"
		| "HRK"
		| "HTG"
		| "HUF"
		| "IDR"
		| "ILS"
		| "INR"
		| "IQD"
		| "IRR"
		| "ISK"
		| "JEP"
		| "JMD"
		| "JOD"
		| "JPY"
		| "KES"
		| "KGS"
		| "KHR"
		| "KMF"
		| "KRW"
		| "KWD"
		| "KYD"
		| "KZT"
		| "LAK"
		| "LBP"
		| "LKR"
		| "LRD"
		| "LSL"
		| "LTL"
		| "LVL"
		| "LYD"
		| "MAD"
		| "MDL"
		| "MGA"
		| "MKD"
		| "MMK"
		| "MNT"
		| "MOP"
		| "MUR"
		| "MVR"
		| "MWK"
		| "MXN"
		| "MYR"
		| "MZN"
		| "NAD"
		| "NGN"
		| "NIO"
		| "NOK"
		| "NPR"
		| "NZD"
		| "OMR"
		| "PAB"
		| "PEN"
		| "PGK"
		| "PHP"
		| "PKR"
		| "PLN"
		| "PYG"
		| "QAR"
		| "RON"
		| "RSD"
		| "RUB"
		| "RWF"
		| "SAR"
		| "SBD"
		| "SCR"
		| "SDG"
		| "SEK"
		| "SGD"
		| "SHP"
		| "SLL"
		| "SRD"
		| "SSP"
		| "STD"
		| "SYP"
		| "SZL"
		| "THB"
		| "TJS"
		| "TMT"
		| "TND"
		| "TOP"
		| "TRY"
		| "TTD"
		| "TWD"
		| "TZS"
		| "UAH"
		| "UGX"
		| "USD"
		| "UYU"
		| "UZS"
		| "VEF"
		| "VND"
		| "VUV"
		| "WST"
		| "XAF"
		| "XCD"
		| "XOF"
		| "XPF"
		| "YER"
		| "ZAR";
}

declare module "shopify-buy" {
	export = ShopifyBuy;
}
