import { AndroidActivityResultEventData, Page } from '@nativescript/core';
import { IStripeStandardBackendAPI, IStripeStandardConfig, StripeStandardAddress, StripeStandardBillingAddressFields, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardPaymentMethodType, StripeStandardShippingAddressField, StripeStandardShippingMethod } from './common';
import { Address } from '../';
export { IStripeStandardBackendAPI, StripeStandardAddress, StripeStandardBillingAddressFields, StripeStandardPaymentListener, StripeStandardPaymentMethod, StripeStandardShippingAddressField, StripeStandardShippingMethod, StripeStandardPaymentMethodType };
export declare class StripeStandardConfig implements IStripeStandardConfig {
    backendAPI: IStripeStandardBackendAPI;
    publishableKey: string;
    appleMerchantID: string;
    companyName: string;
    requiredBillingAddressFields: StripeStandardBillingAddressFields;
    requiredShippingAddressFields: StripeStandardShippingAddressField[];
    allowedPaymentMethodTypes: StripeStandardPaymentMethodType[];
    createCardSources: any;
    enableCardScanning: boolean;
    stripeAccountId: string;
    private static _instance;
    private _paymentConfigurationInitiated;
    get native(): com.stripe.android.PaymentSessionConfig;
    get nativeBuilder(): com.stripe.android.PaymentSessionConfig.Builder;
    initPaymentConfiguration(): void;
    static get shared(): StripeStandardConfig;
}
export declare class StripeStandardCustomerSession {
    native: com.stripe.android.CustomerSession;
    getInstance(shouldPrefetchEphemeralKey?: boolean): Promise<void>;
    private static get context();
}
export declare class StripeStandardPaymentSession {
    native: com.stripe.android.PaymentSession;
    selectedPaymentMethod: StripeStandardPaymentMethod;
    selectedShippingMethod: StripeStandardShippingMethod;
    shippingAddress: StripeStandardAddress;
    loading: boolean;
    paymentInProgress: boolean;
    _data: com.stripe.android.PaymentSessionData;
    customerSession: StripeStandardCustomerSession;
    listener: StripeStandardPaymentListener;
    currency: string;
    private _activityResultListener;
    private _callback;
    constructor(_page: Page, amount: number, currency: string, listener: StripeStandardPaymentListener, prefilledAddress?: Address);
    private build;
    _resultListener(args: AndroidActivityResultEventData): void;
    get amount(): number;
    get isPaymentReady(): boolean;
    requestPayment(): void;
    presentPaymentMethods(): void;
    presentShipping(): void;
}
