var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _PaymentSheet_paymentSheet, _PaymentSheet_resolve, _PaymentSheet_reject, _PaymentSheet_getConfig;
import { Color, Utils } from "@nativescript/core";
export class PaymentSheet {
    static _init(context) {
        __classPrivateFieldSet(this, _a, new com.stripe.android.paymentsheet.PaymentSheet(context, new com.stripe.android.paymentsheet.PaymentSheetResultCallback({
            onPaymentSheetResult(result) {
                if (result instanceof com.stripe.android.paymentsheet.PaymentSheetResult.Completed) {
                    __classPrivateFieldGet(PaymentSheet, _a, "f", _PaymentSheet_resolve).call(PaymentSheet);
                }
                else if (result instanceof com.stripe.android.paymentsheet.PaymentSheetResult.Failed) {
                    const error = new Error(result.getError?.().getMessage?.());
                    error.native = result.getError();
                    __classPrivateFieldGet(PaymentSheet, _a, "f", _PaymentSheet_reject).call(PaymentSheet, error);
                }
                else if (result instanceof com.stripe.android.paymentsheet.PaymentSheetResult.Canceled) {
                    __classPrivateFieldGet(PaymentSheet, _a, "f", _PaymentSheet_reject).call(PaymentSheet, new Error('canceled'));
                }
                else {
                    __classPrivateFieldGet(PaymentSheet, _a, "f", _PaymentSheet_reject).call(PaymentSheet, new Error('unknown'));
                }
                __classPrivateFieldSet(PaymentSheet, _a, undefined, "f", _PaymentSheet_reject);
                __classPrivateFieldSet(PaymentSheet, _a, undefined, "f", _PaymentSheet_resolve);
            }
        })), "f", _PaymentSheet_paymentSheet);
    }
    static presentWithSetupIntent(setupIntent, config) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _a, resolve, "f", _PaymentSheet_resolve);
            __classPrivateFieldSet(this, _a, reject, "f", _PaymentSheet_reject);
            if (config) {
                __classPrivateFieldGet(this, _a, "f", _PaymentSheet_paymentSheet).presentWithSetupIntent(setupIntent, __classPrivateFieldGet(this, _a, "m", _PaymentSheet_getConfig).call(this, config).build());
            }
            else {
                __classPrivateFieldGet(this, _a, "f", _PaymentSheet_paymentSheet).presentWithSetupIntent(setupIntent);
            }
        });
    }
    static presentWithPaymentIntent(paymentIntent, config) {
        return new Promise((resolve, reject) => {
            __classPrivateFieldSet(this, _a, resolve, "f", _PaymentSheet_resolve);
            __classPrivateFieldSet(this, _a, reject, "f", _PaymentSheet_reject);
            if (config) {
                __classPrivateFieldGet(this, _a, "f", _PaymentSheet_paymentSheet).presentWithPaymentIntent(paymentIntent, __classPrivateFieldGet(this, _a, "m", _PaymentSheet_getConfig).call(this, config).build());
            }
            else {
                __classPrivateFieldGet(this, _a, "f", _PaymentSheet_paymentSheet).presentWithPaymentIntent(paymentIntent);
            }
        });
    }
}
_a = PaymentSheet, _PaymentSheet_getConfig = function _PaymentSheet_getConfig(config) {
    const application = Utils.android.getApplication();
    const nativeConfig = new com.stripe.android.paymentsheet.PaymentSheet.Configuration.Builder(config.merchantDisplayName ?? application.getApplicationInfo().loadLabel(application.getPackageManager()).toString());
    if (config.customerConfig) {
        const customerConfiguration = new com.stripe.android.paymentsheet.PaymentSheet.CustomerConfiguration(config.customerConfig.id, config.customerConfig.ephemeralKey);
        nativeConfig.customer(customerConfiguration);
    }
    nativeConfig.allowsDelayedPaymentMethods(config.allowsDelayedPaymentMethods ?? false);
    if (config.googlePayConfig) {
        const googlePay = new com.stripe.android.paymentsheet.PaymentSheet.GooglePayConfiguration(config.googlePayConfig.environment === 'prod' ?
            com.stripe.android.paymentsheet.PaymentSheet.GooglePayConfiguration.Environment.Production :
            com.stripe.android.paymentsheet.PaymentSheet.GooglePayConfiguration.Environment.Test, config.googlePayConfig.countryCode, config.googlePayConfig.currencyCode ?? '');
        nativeConfig.googlePay(googlePay);
    }
    if (config.primaryButtonColor) {
        if (config.primaryButtonColor instanceof Color) {
            nativeConfig.primaryButtonColor(android.content.res.ColorStateList.valueOf(config.primaryButtonColor.android));
        }
        else if (typeof config.primaryButtonColor === 'string') {
            nativeConfig.primaryButtonColor(android.content.res.ColorStateList.valueOf(new Color(config.primaryButtonColor).android));
        }
    }
    if (config.defaultBillingDetails) {
        const billing = new com.stripe.android.paymentsheet.PaymentSheet.BillingDetails.Builder();
        if (config.defaultBillingDetails.email) {
            billing.email(config.defaultBillingDetails.email);
        }
        if (config.defaultBillingDetails.name) {
            billing.name(config.defaultBillingDetails.name);
        }
        if (config.defaultBillingDetails.phone) {
            billing.phone(config.defaultBillingDetails.phone);
        }
        if (config.defaultBillingDetails.address) {
            const address = new com.stripe.android.paymentsheet.PaymentSheet.Address.Builder();
            if (config.defaultBillingDetails.address.city) {
                address.city(config.defaultBillingDetails.address.city);
            }
            if (config.defaultBillingDetails.address.country) {
                address.country(config.defaultBillingDetails.address.country);
            }
            if (config.defaultBillingDetails.address.line1) {
                address.line1(config.defaultBillingDetails.address.line1);
            }
            if (config.defaultBillingDetails.address.line2) {
                address.line2(config.defaultBillingDetails.address.line2);
            }
            if (config.defaultBillingDetails.address.postalCode) {
                address.line2(config.defaultBillingDetails.address.postalCode);
            }
            if (config.defaultBillingDetails.address.state) {
                address.line2(config.defaultBillingDetails.address.state);
            }
            billing.address(address.build());
        }
        nativeConfig.defaultBillingDetails(billing.build());
    }
    return nativeConfig;
};
_PaymentSheet_paymentSheet = { value: void 0 };
_PaymentSheet_resolve = { value: void 0 };
_PaymentSheet_reject = { value: void 0 };
//# sourceMappingURL=index.android.js.map