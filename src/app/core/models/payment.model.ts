export interface PaymentMethod {
    name: string;
    description: string;
    type: PaymentType;
}

export enum PaymentType {
    MULTI_PAYMENT = 'multipayment',
    SINGLE_PAYMENT = 'singlepayment',
}
