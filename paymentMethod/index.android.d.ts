import { CardBrand, IPaymentMethodAddress, IPaymentMethodCard, IPaymentMethodCardChecks, IPaymentMethodCardNetworks, IPaymentMethodCardWallet, IPaymentMethodCardWalletAmexExpressCheckout, IPaymentMethodCardWalletApplePay, IPaymentMethodCardWalletGooglePay, IPaymentMethodCardWalletMasterpass, IPaymentMethodCardWalletSamsungPay, IPaymentMethodCardWalletVisaCheckout, IPaymentMethodThreeDSecureUsage, PaymentMethodCardCheckResult, PaymentMethodCardWalletType } from '../common';
export declare class PaymentMethodCardChecks implements IPaymentMethodCardChecks {
    readonly addressLine1Check: PaymentMethodCardCheckResult;
    readonly addressPostalCodeCheck: PaymentMethodCardCheckResult;
    readonly cvcCheck: PaymentMethodCardCheckResult;
    constructor(checks: com.stripe.android.model.PaymentMethod.Card.Checks);
    static fromNative(checks: com.stripe.android.model.PaymentMethod.Card.Checks): PaymentMethodCardChecks;
}
export declare class PaymentMethodCardNetworks implements IPaymentMethodCardNetworks {
    readonly available: string[];
    readonly preferred: string;
    private constructor();
    static fromNative(networks: com.stripe.android.model.PaymentMethod.Card.Networks): PaymentMethodCardNetworks;
}
export declare class PaymentMethodThreeDSecureUsage implements IPaymentMethodThreeDSecureUsage {
    readonly supported: boolean;
    private constructor();
    static fromNative(usage: com.stripe.android.model.PaymentMethod.Card.ThreeDSecureUsage): PaymentMethodThreeDSecureUsage;
}
export declare class PaymentMethodAddress implements IPaymentMethodAddress {
    readonly city: string;
    readonly country: string;
    readonly line1: string;
    readonly line2: string;
    readonly postalCode: string;
    readonly state: string;
    readonly android: any;
    private constructor();
    static fromNative(address: com.stripe.android.model.Address): PaymentMethodAddress;
}
export declare class PaymentMethodCardWalletMasterpass implements IPaymentMethodCardWalletMasterpass {
    readonly billingAddress: PaymentMethodAddress;
    readonly email: string;
    readonly name: string;
    readonly shippingAddress: PaymentMethodAddress;
    readonly android: com.stripe.android.model.wallets.Wallet.MasterpassWallet;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.MasterpassWallet): PaymentMethodCardWalletMasterpass;
}
export declare class PaymentMethodCardWalletAmexExpressCheckout implements IPaymentMethodCardWalletAmexExpressCheckout {
    readonly dynamicLast4: string;
    readonly android: any;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.AmexExpressCheckoutWallet): PaymentMethodCardWalletAmexExpressCheckout;
}
export declare class PaymentMethodCardWalletVisaCheckout implements IPaymentMethodCardWalletVisaCheckout {
    readonly billingAddress: PaymentMethodAddress;
    readonly email: string;
    readonly name: string;
    readonly shippingAddress: PaymentMethodAddress;
    readonly dynamicLast4: string;
    readonly android: any;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.VisaCheckoutWallet): PaymentMethodCardWalletVisaCheckout;
}
export declare class PaymentMethodCardWalletApplePay implements IPaymentMethodCardWalletApplePay {
    readonly dynamicLast4: string;
    readonly android: any;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.ApplePayWallet): PaymentMethodCardWalletApplePay;
}
export declare class PaymentMethodCardWalletGooglePay implements IPaymentMethodCardWalletGooglePay {
    readonly dynamicLast4: string;
    readonly android: any;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.GooglePayWallet): PaymentMethodCardWalletGooglePay;
}
export declare class PaymentMethodCardWalletSamsungPay implements IPaymentMethodCardWalletSamsungPay {
    readonly dynamicLast4: string;
    readonly android: any;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet.SamsungPayWallet): PaymentMethodCardWalletSamsungPay;
}
export declare class PaymentMethodCardWallet implements IPaymentMethodCardWallet {
    readonly masterpass: PaymentMethodCardWalletMasterpass;
    readonly type: PaymentMethodCardWalletType;
    readonly visaCheckout: PaymentMethodCardWalletVisaCheckout;
    readonly amex: PaymentMethodCardWalletAmexExpressCheckout;
    readonly applePay: PaymentMethodCardWalletApplePay;
    readonly googlePay: PaymentMethodCardWalletGooglePay;
    readonly samsungPay: PaymentMethodCardWalletSamsungPay;
    private constructor();
    static fromNative(wallet: com.stripe.android.model.wallets.Wallet): PaymentMethodCardWallet;
}
export declare class PaymentMethodCard implements IPaymentMethodCard {
    readonly brand: CardBrand;
    readonly checks: PaymentMethodCardChecks;
    readonly country: string;
    readonly expMonth: number;
    readonly expYear: number;
    readonly fingerprint: string;
    readonly funding: string;
    readonly last4: string;
    readonly networks: PaymentMethodCardNetworks;
    readonly threeDSecureUsage: PaymentMethodThreeDSecureUsage;
    readonly wallet: PaymentMethodCardWallet;
    private constructor();
    static fromNative(paymentCard: com.stripe.android.model.PaymentMethod.Card): PaymentMethodCard;
}
