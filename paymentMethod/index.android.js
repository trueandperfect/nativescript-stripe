import { GetBrand, PaymentMethodCardWalletType, toPaymentMethodCardChecks } from '../common';
export class PaymentMethodCardChecks {
    constructor(checks) {
        this.addressLine1Check = toPaymentMethodCardChecks(checks.addressLine1Check);
        this.addressPostalCodeCheck = toPaymentMethodCardChecks(checks.addressPostalCodeCheck);
        this.cvcCheck = toPaymentMethodCardChecks(checks.cvcCheck);
    }
    static fromNative(checks) {
        return new PaymentMethodCardChecks(checks);
    }
}
export class PaymentMethodCardNetworks {
    constructor(networks) {
        const available = networks.getAvailable().toArray();
        this.available = [];
        for (let i = 0; i < available.length; i++) {
            this.available.push(available[i]);
        }
        this.preferred = networks.getPreferred();
    }
    static fromNative(networks) {
        return new PaymentMethodCardNetworks(networks);
    }
}
export class PaymentMethodThreeDSecureUsage {
    constructor(usage) {
        this.supported = usage.component1();
    }
    static fromNative(usage) {
        return new PaymentMethodThreeDSecureUsage(usage);
    }
}
export class PaymentMethodAddress {
    constructor(address) {
        this.city = address.getCity();
        this.country = address.getCountry();
        this.line1 = address.getLine1();
        this.line2 = address.getLine2();
        this.postalCode = address.getPostalCode();
        this.state = address.getState();
        this.android = address;
    }
    static fromNative(address) {
        return new PaymentMethodAddress(address);
    }
}
export class PaymentMethodCardWalletMasterpass {
    constructor(wallet) {
        this.billingAddress = PaymentMethodAddress.fromNative(wallet.getBillingAddress());
        this.email = wallet.getEmail();
        this.name = wallet.getName();
        this.shippingAddress = PaymentMethodAddress.fromNative(wallet.getShippingAddress());
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletMasterpass(wallet);
    }
}
export class PaymentMethodCardWalletAmexExpressCheckout {
    constructor(wallet) {
        this.dynamicLast4 = wallet.getDynamicLast4();
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletAmexExpressCheckout(wallet);
    }
}
export class PaymentMethodCardWalletVisaCheckout {
    constructor(wallet) {
        this.billingAddress = PaymentMethodAddress.fromNative(wallet.getBillingAddress());
        this.email = wallet.getEmail();
        this.name = wallet.getName();
        this.shippingAddress = PaymentMethodAddress.fromNative(wallet.getShippingAddress());
        this.dynamicLast4 = wallet.getDynamicLast4();
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletVisaCheckout(wallet);
    }
}
export class PaymentMethodCardWalletApplePay {
    constructor(wallet) {
        this.dynamicLast4 = wallet.getDynamicLast4();
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletApplePay(wallet);
    }
}
export class PaymentMethodCardWalletGooglePay {
    constructor(wallet) {
        this.dynamicLast4 = wallet.getDynamicLast4();
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletGooglePay(wallet);
    }
}
export class PaymentMethodCardWalletSamsungPay {
    constructor(wallet) {
        this.dynamicLast4 = wallet.getDynamicLast4();
        this.android = wallet;
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWalletSamsungPay(wallet);
    }
}
export class PaymentMethodCardWallet {
    constructor(wallet) {
        if (wallet instanceof com.stripe.android.model.wallets.Wallet.AmexExpressCheckoutWallet) {
            this.type = PaymentMethodCardWalletType.AmexExpressCheckout;
            this.amex = PaymentMethodCardWalletAmexExpressCheckout.fromNative(wallet);
        }
        else if (wallet instanceof com.stripe.android.model.wallets.Wallet.ApplePayWallet) {
            this.type = PaymentMethodCardWalletType.ApplePay;
            this.applePay = PaymentMethodCardWalletApplePay.fromNative(wallet);
        }
        else if (wallet instanceof com.stripe.android.model.wallets.Wallet.MasterpassWallet) {
            this.type = PaymentMethodCardWalletType.Masterpass;
            this.masterpass = PaymentMethodCardWalletMasterpass.fromNative(wallet);
        }
        else if (wallet instanceof com.stripe.android.model.wallets.Wallet.VisaCheckoutWallet) {
            this.type = PaymentMethodCardWalletType.VisaCheckout;
            this.visaCheckout = PaymentMethodCardWalletVisaCheckout.fromNative(wallet);
        }
        else if (wallet instanceof com.stripe.android.model.wallets.Wallet.GooglePayWallet) {
            this.type = PaymentMethodCardWalletType.GooglePay;
            this.googlePay = PaymentMethodCardWalletGooglePay.fromNative(wallet);
        }
        else if (wallet instanceof com.stripe.android.model.wallets.Wallet.SamsungPayWallet) {
            this.type = PaymentMethodCardWalletType.SamsungPay;
            this.samsungPay = PaymentMethodCardWalletSamsungPay.fromNative(wallet);
        }
    }
    static fromNative(wallet) {
        return new PaymentMethodCardWallet(wallet);
    }
}
export class PaymentMethodCard {
    constructor(paymentCard) {
        console.log(paymentCard.brand);
        this.brand = GetBrand(paymentCard.brand);
        this.checks = PaymentMethodCardChecks.fromNative(paymentCard.checks);
        this.country = paymentCard.country;
        this.expMonth = paymentCard.expiryMonth.intValue();
        this.expYear = paymentCard.expiryYear.intValue();
        this.fingerprint = paymentCard.fingerprint;
        this.funding = paymentCard.funding;
        this.last4 = paymentCard.last4;
        this.threeDSecureUsage = PaymentMethodThreeDSecureUsage.fromNative(paymentCard.threeDSecureUsage);
        this.wallet = PaymentMethodCardWallet.fromNative(paymentCard.wallet);
    }
    static fromNative(paymentCard) {
        return new PaymentMethodCard(paymentCard);
    }
}
//# sourceMappingURL=index.android.js.map