var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _PaymentSheet_getConfig;
import { Color, Frame } from "@nativescript/core";
export class PaymentSheet {
    static _init(context) { }
    static presentWithSetupIntent(setupIntent, config) {
        return new Promise((resolve, reject) => {
            const rootVC = this.findTopViewController(Frame.topmost().currentPage.ios) || this._rootViewController;
            TNSStripe.presentWithSetupIntent(setupIntent, __classPrivateFieldGet(this, _a, "m", _PaymentSheet_getConfig).call(this, config), rootVC, (status, error) => {
                switch (status) {
                    case "completed":
                        resolve();
                        break;
                    case "cancelled":
                        reject(new Error('cancelled'));
                        break;
                    case "error":
                        const err = new Error(error.localizedDescription);
                        err.native = error;
                        reject(err);
                        break;
                    default:
                        reject(new Error('unknown'));
                        break;
                }
            });
        });
    }
    static presentWithPaymentIntent(paymentIntent, config) {
        return new Promise((resolve, reject) => {
            const rootVC = this.findTopViewController(Frame.topmost().currentPage.ios) || this._rootViewController;
            TNSStripe.presentWithPaymentIntent(paymentIntent, __classPrivateFieldGet(this, _a, "m", _PaymentSheet_getConfig).call(this, config), rootVC, (status, error) => {
                switch (status) {
                    case "completed":
                        resolve();
                        break;
                    case "cancelled":
                        reject(new Error('cancelled'));
                        break;
                    case "error":
                        const err = new Error(error.localizedDescription);
                        err.native = error;
                        reject(err);
                        break;
                    default:
                        reject(new Error('unknown'));
                        break;
                }
            });
        });
    }
    static get _rootViewController() {
        const keyWindow = UIApplication.sharedApplication.keyWindow;
        return keyWindow != null ? keyWindow.rootViewController : undefined;
    }
    static findTopViewController(root) {
        const presented = root.presentedViewController;
        if (presented != null) {
            return this.findTopViewController(presented);
        }
        if (root instanceof UISplitViewController) {
            const last = root.viewControllers.lastObject;
            if (last == null) {
                return root;
            }
            return this.findTopViewController(last);
        }
        else if (root instanceof UINavigationController) {
            const top = root.topViewController;
            if (top == null) {
                return root;
            }
            return this.findTopViewController(top);
        }
        else if (root instanceof UITabBarController) {
            const selected = root.selectedViewController;
            if (selected == null) {
                return root;
            }
            return this.findTopViewController(selected);
        }
        else {
            return root;
        }
    }
}
_a = PaymentSheet, _PaymentSheet_getConfig = function _PaymentSheet_getConfig(config) {
    let cfg = config || null;
    if (cfg.primaryButtonColor) {
        if (cfg.primaryButtonColor instanceof Color) {
            cfg.primaryButtonColor = cfg.primaryButtonColor.ios;
        }
        else if (typeof config.primaryButtonColor === 'string') {
            cfg.primaryButtonColor = new Color(config.primaryButtonColor).ios;
        }
    }
    return cfg;
};
//# sourceMappingURL=index.ios.js.map