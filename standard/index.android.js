import { Application, Utils } from '@nativescript/core';
import { StripeStandardPaymentMethodType } from './common';
import { GetBrand } from '../common';
export { StripeStandardPaymentMethodType };
export class StripeStandardConfig {
    constructor() {
        this.requiredBillingAddressFields = 0 /* StripeStandardBillingAddressFields.None */;
        this.allowedPaymentMethodTypes = [StripeStandardPaymentMethodType.Card];
        this.enableCardScanning = false;
        this._paymentConfigurationInitiated = false;
    }
    get native() {
        // getter gives client a chance to set properties before using.
        return this.nativeBuilder.build();
    }
    get nativeBuilder() {
        this.initPaymentConfiguration();
        const shippingRequired = this.requiredShippingAddressFields && this.requiredShippingAddressFields.length !== 0;
        const optionalFields = [];
        if (shippingRequired) {
            if (this.requiredShippingAddressFields.indexOf("address" /* StripeStandardShippingAddressField.PostalAddress */) < 0) {
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.Line1);
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.Line2);
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.City);
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.State);
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.PostalCode);
            }
            if (this.requiredShippingAddressFields.indexOf("phone" /* StripeStandardShippingAddressField.Phone */) < 0) {
                optionalFields.unshift(com.stripe.android.view.ShippingInfoWidget.CustomizableShippingField.Phone);
            }
        }
        return new com.stripe.android.PaymentSessionConfig.Builder().setShippingInfoRequired(shippingRequired).setShippingMethodsRequired(shippingRequired).setOptionalShippingInfoFields(optionalFields);
    }
    initPaymentConfiguration() {
        if (!this.publishableKey)
            throw new Error('publishableKey must be set');
        if (this._paymentConfigurationInitiated)
            return;
        com.stripe.android.PaymentConfiguration.init(Utils.ad.getApplicationContext(), this.publishableKey, this.stripeAccountId || null);
        this._paymentConfigurationInitiated = true;
    }
    static get shared() {
        if (!this._instance) {
            this._instance = new StripeStandardConfig();
        }
        return this._instance;
    }
}
export class StripeStandardCustomerSession {
    async getInstance(shouldPrefetchEphemeralKey = true) {
        try {
            StripeStandardConfig.shared.initPaymentConfiguration();
            const ephemeralKey = await createKeyProvider();
            com.stripe.android.CustomerSession.initCustomerSession(StripeStandardCustomerSession.context, ephemeralKey, shouldPrefetchEphemeralKey ?? false);
            this.native = com.stripe.android.CustomerSession.getInstance();
        }
        catch (e) {
            console.error('getInstance customer session', e);
        }
    }
    static get context() {
        return Utils.android.getApplicationContext();
    }
}
// async function createKeyProvider(): com.stripe.android.EphemeralKeyProvider {
// 	return new com.stripe.android.EphemeralKeyProvider({
// 		createEphemeralKey(apiVersion: string, keyUpdateListener: com.stripe.android.EphemeralKeyUpdateListener): void {
// 			StripeStandardConfig.shared.backendAPI
// 				.createCustomerKey(apiVersion)
// 				.then((key) => {
// 					keyUpdateListener.onKeyUpdate(JSON.stringify(key));
// 				})
// 				.catch((e) => {
// 					keyUpdateListener.onKeyUpdateFailure(500, JSON.stringify(e));
// 				});
// 		},
// 	});
// }
async function createKeyProvider() {
    const ephemeralKey = await StripeStandardConfig.shared.backendAPI.createCustomerKey();
    return new com.stripe.android.EphemeralKeyProvider({
        createEphemeralKey(apiVersion, keyUpdateListener) {
            if (ephemeralKey.error) {
                keyUpdateListener.onKeyUpdateFailure(500, JSON.stringify(ephemeralKey.error));
            }
            else {
                keyUpdateListener.onKeyUpdate(JSON.stringify(ephemeralKey));
            }
        },
    });
}
export class StripeStandardPaymentSession {
    constructor(_page, amount, currency, listener, prefilledAddress) {
        this.customerSession = new StripeStandardCustomerSession();
        this.listener = listener;
        // show the loader while getting the ephemeralKey
        const paymentData = {
            isReadyToCharge: false,
            paymentMethod: null,
            shippingInfo: null,
            shippingAddress: null,
        };
        listener.onPaymentDataChanged(paymentData);
        this.build(_page, amount, currency, listener, prefilledAddress);
    }
    async build(_page, amount, currency, listener, prefilledAddress) {
        await this.customerSession.getInstance();
        const builder = StripeStandardConfig.shared.nativeBuilder;
        if (prefilledAddress) {
            const address = prefilledAddress.android;
            const info = new com.stripe.android.model.ShippingInformation(address.build(), prefilledAddress.name, prefilledAddress.phone);
            builder.setPrepopulatedShippingInfo(info);
        }
        const allowPaymentMethodTypes = new java.util.ArrayList();
        StripeStandardConfig.shared.allowedPaymentMethodTypes.forEach((type) => {
            switch (type) {
                case StripeStandardPaymentMethodType.Card:
                    allowPaymentMethodTypes.add(com.stripe.android.model.PaymentMethod.Type.Card);
                    break;
                case StripeStandardPaymentMethodType.Fpx:
                    allowPaymentMethodTypes.add(com.stripe.android.model.PaymentMethod.Type.Fpx);
                    break;
            }
        });
        builder.setPaymentMethodTypes(allowPaymentMethodTypes);
        com.github.triniwiz.stripe.Stripe.setShippingMethodsFactory(builder, Application.android.foregroundActivity || Application.android.startActivity);
        com.github.triniwiz.stripe.Stripe.setShippingInformationValidator(builder, Application.android.foregroundActivity || Application.android.startActivity);
        const config = builder.build();
        this.native = new com.stripe.android.PaymentSession(Application.android.foregroundActivity, config);
        this.native.init(createPaymentSessionListener(this, listener));
        this.native.setCartTotal(amount);
        this._activityResultListener = this._resultListener.bind(this);
        Application.android.on(Application.android.activityResultEvent, this._activityResultListener);
    }
    _resultListener(args) {
        if (args.intent) {
            this.native.handlePaymentData(args.requestCode, args.resultCode, args.intent);
        }
    }
    get amount() {
        const data = this._data;
        if (!data) {
            return 0;
        }
        return data.getCartTotal() + (data.getShippingMethod() ? data.getShippingMethod().getAmount() : 0);
    }
    get isPaymentReady() {
        if (!this._data) {
            return false;
        }
        return this._data.isPaymentReadyToCharge();
    }
    requestPayment() {
        setTimeout(() => {
            this.paymentInProgress = true;
            const data = this._data;
            const shippingMethod = data?.getShippingMethod();
            const shippingCost = shippingMethod ? shippingMethod.getAmount() : 0;
            const id = data?.getPaymentMethod()?.id;
            if (!id) {
                console.warn('Payment method undefined!');
                this.listener.onError(500, 'Payment method undefined!');
                this.paymentInProgress = false;
                return;
            }
            StripeStandardConfig.shared.backendAPI
                .capturePayment(id, data.getCartTotal() + shippingCost, createShippingMethod(shippingMethod), createAddress(data?.getShippingInformation()))
                .then((res) => {
                // 3DS Failed/Cancelled Authentication && if the use close the 3DS authentication window
                if (res?.status == 'canceled' || res?.native?.lastPaymentError != null) {
                    this.paymentInProgress = false;
                    this.listener.onUserCancelled();
                    return;
                }
                this.paymentInProgress = false;
                this.listener.onPaymentSuccess();
                this.native.onCompleted();
            })
                .catch((e) => {
                this.listener.onError(100, e);
                this.paymentInProgress = false;
            });
        });
    }
    presentPaymentMethods() {
        this.native.presentPaymentMethodSelection(null);
    }
    presentShipping() {
        let lastActivity;
        const activityCreatedListener = function (args) {
            lastActivity = args.activity;
        };
        const activityDestroyedListener = function (args) {
            if (args.activity === lastActivity) {
                Application.android.unregisterBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_METHODS_ACTION);
                Application.android.unregisterBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_VALIDATOR_ACTION);
                Application.android.unregisterBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_VALIDATOR_ERROR_ACTION);
                Application.android.off('activityCreated', activityCreatedListener);
                Application.android.off('activityDestroyed', activityDestroyedListener);
                lastActivity = undefined;
            }
        };
        Application.android.on('activityCreated', activityCreatedListener);
        Application.android.on('activityDestroyed', activityDestroyedListener);
        Application.android.registerBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_METHODS_ACTION, (ctx, intent) => {
            const info = intent.getSerializableExtra('shippingInfo');
            if (info) {
                const data = this.listener.provideShippingMethods({
                    name: info.getName(),
                    line1: info.getLine1(),
                    line2: info.getLine2(),
                    city: info.getCity(),
                    state: info.getState(),
                    postalCode: info.getPostalCode(),
                    country: info.getCountry(),
                    phone: info.getPhone(),
                    email: info.getEmail(),
                });
                const methods = data.shippingMethods;
                const array = new java.util.ArrayList();
                for (let i = 0; i < methods.length; i++) {
                    const method = methods[i];
                    array.add(JSON.stringify({
                        label: method.label,
                        identifier: method.identifier,
                        amount: method.amount,
                        currency: method.currency,
                        detail: method.detail,
                    }));
                }
                const intent = new android.content.Intent(com.github.triniwiz.stripe.Stripe.UPDATE_SHIPPING_METHODS_ACTION);
                intent.putStringArrayListExtra('shippingMethods', array);
                (Application.android.foregroundActivity || Application.android.startActivity).sendBroadcast(intent);
            }
        });
        Application.android.registerBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_VALIDATOR_ACTION, (ctx, intent) => {
            const info = intent.getSerializableExtra('shippingInfo');
            if (info) {
                const data = this.listener.provideShippingInformationValidation({
                    name: info.getName(),
                    line1: info.getLine1(),
                    line2: info.getLine2(),
                    city: info.getCity(),
                    state: info.getState(),
                    postalCode: info.getPostalCode(),
                    country: info.getCountry(),
                    phone: info.getPhone(),
                    email: info.getEmail(),
                });
                const intent = new android.content.Intent(com.github.triniwiz.stripe.Stripe.UPDATE_SHIPPING_INFO_VALIDATOR_ACTION);
                intent.putExtra('shippingValidation', data);
                (Application.android.foregroundActivity || Application.android.startActivity).sendBroadcast(intent);
            }
        });
        Application.android.registerBroadcastReceiver(com.github.triniwiz.stripe.Stripe.SHIPPING_INFO_VALIDATOR_ERROR_ACTION, (ctx, intent) => {
            const info = intent.getSerializableExtra('shippingInfo');
            if (info) {
                const data = this.listener.provideShippingInformationValidationErrorMessage({
                    name: info.getName(),
                    line1: info.getLine1(),
                    line2: info.getLine2(),
                    city: info.getCity(),
                    state: info.getState(),
                    postalCode: info.getPostalCode(),
                    country: info.getCountry(),
                    phone: info.getPhone(),
                    email: info.getEmail(),
                });
                const intent = new android.content.Intent(com.github.triniwiz.stripe.Stripe.UPDATE_SHIPPING_INFO_VALIDATOR_ERROR_ACTION);
                intent.putExtra('shippingValidationErrorMessage', data);
                (Application.android.foregroundActivity || Application.android.startActivity).sendBroadcast(intent);
            }
        });
        this.native.presentShippingFlow();
    }
}
function createPaymentSessionListener(parent, listener) {
    return new com.stripe.android.PaymentSession.PaymentSessionListener({
        onPaymentSessionDataChanged: (sessionData) => {
            if (parent.paymentInProgress)
                return;
            parent.customerSession.native.retrieveCurrentCustomer(new com.stripe.android.CustomerSession.CustomerRetrievalListener({
                onCustomerRetrieved(_customer) {
                    parent._data = sessionData;
                    parent.selectedPaymentMethod = createPaymentMethod(sessionData.getPaymentMethod());
                    parent.selectedShippingMethod = createShippingMethod(sessionData.getShippingMethod());
                    parent.shippingAddress = createAddress(sessionData.getShippingInformation());
                    const paymentData = {
                        isReadyToCharge: sessionData.isPaymentReadyToCharge(),
                        paymentMethod: parent.selectedPaymentMethod,
                        shippingInfo: parent.selectedShippingMethod,
                        shippingAddress: parent.shippingAddress,
                    };
                    listener.onPaymentDataChanged(paymentData);
                },
                onError(errorCode, errorMessage) {
                    listener.onError(errorCode, errorMessage);
                },
            }));
        },
        onCommunicatingStateChanged: (isCommunicating) => {
            parent.loading = isCommunicating;
            listener.onCommunicatingStateChanged(isCommunicating);
        },
        onError: (code, message) => {
            listener.onError(code, message);
        },
    });
}
function createPaymentMethod(paymentMethod) {
    if (!paymentMethod)
        return undefined;
    const type = paymentMethod.type;
    if (type === com.stripe.android.model.PaymentMethod.Type.Fpx) {
        const fpx = paymentMethod.fpx; // fpx
        const pmId = paymentMethod.id; // id
        if (fpx)
            return createPaymentMethodFromFpx(fpx, pmId);
    }
    else if (type === com.stripe.android.model.PaymentMethod.Type.Card) {
        const pmCard = paymentMethod.card; // card
        const pmId = paymentMethod.id; // id
        if (pmCard)
            return createPaymentMethodFromCard(pmCard, pmId);
    }
    return { label: 'Error (103)', image: undefined, templateImage: undefined };
}
function createPaymentMethodFromFpx(fpx, stripeID) {
    const bank = com.stripe.android.view.FpxBank.get(fpx.bank);
    return {
        label: bank.getDisplayName(),
        image: getBitmapFromResource(bank.getBrandIconResId()),
        templateImage: undefined,
        type: StripeStandardPaymentMethodType.Fpx,
        stripeID,
        brand: bank.getCode(),
    };
}
function createPaymentMethodFromCard(card, stripeID) {
    const brand = card.brand; // brand
    const last4 = card.last4; // last4
    return {
        label: `${GetBrand(brand)} ...${last4}`,
        image: getBitmapFromResource(brand.getIcon()),
        templateImage: undefined,
        type: StripeStandardPaymentMethodType.Card,
        stripeID,
        brand: GetBrand(brand),
    };
}
function getBitmapFromResource(resID) {
    const image = Application.android.foregroundActivity.getResources().getDrawable(resID, null);
    if (image instanceof android.graphics.Bitmap) {
        return image;
    }
    const bitmap = android.graphics.Bitmap.createBitmap(image.getIntrinsicWidth(), image.getIntrinsicHeight(), android.graphics.Bitmap.Config.ARGB_8888);
    const canvas = new android.graphics.Canvas(bitmap);
    image.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
    image.draw(canvas);
    return bitmap;
}
function createShippingMethod(shipping) {
    if (!shipping)
        return undefined;
    return {
        amount: shipping.getAmount(),
        detail: shipping.getDetail(),
        label: shipping.getLabel(),
        identifier: shipping.getIdentifier(),
        currency: shipping.getCurrency()?.getCurrencyCode(),
    };
}
function createAddress(info) {
    if (!info)
        return undefined;
    const address = info.getAddress();
    if (!address)
        return undefined;
    return {
        name: info.getName(),
        line1: address.getLine1(),
        line2: address.getLine2(),
        city: address.getCity(),
        state: address.getState(),
        postalCode: address.getPostalCode(),
        country: address.getCountry(),
        phone: info.getPhone(),
        email: undefined,
    };
}
function createAdShippingMethod(method, currency) {
    return new com.stripe.android.model.ShippingMethod(method.label, method.identifier, method.amount, currency, method.detail);
}
//# sourceMappingURL=index.android.js.map