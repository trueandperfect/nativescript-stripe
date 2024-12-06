import { Configuration } from ".";
export declare class PaymentSheet {
    #private;
    static _init(context: any): void;
    static presentWithSetupIntent(setupIntent: string, config?: Configuration): Promise<unknown>;
    static presentWithPaymentIntent(paymentIntent: string, config?: Configuration): Promise<unknown>;
}
