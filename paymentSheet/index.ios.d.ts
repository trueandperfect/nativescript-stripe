import { Configuration } from ".";
export declare class PaymentSheet {
    #private;
    static _init(context: any): void;
    static presentWithSetupIntent(setupIntent: string, config?: Configuration): Promise<void>;
    static presentWithPaymentIntent(paymentIntent: string, config?: Configuration): Promise<void>;
    private static get _rootViewController();
    private static findTopViewController;
}
