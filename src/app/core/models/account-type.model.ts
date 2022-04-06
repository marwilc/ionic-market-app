export interface AccountType {
    id: number;
    name: string;
    image: string;
    type: AccountEnum;
}

export enum AccountEnum {
    ZELLE = 'zelle',
    PAYPAL = 'paypal',
    CASH = 'cash',
    TRANSFER_BANK = 'transfer_bank',
}

export interface AccountPayment {
    mail?: string;
    name?: string;
    description?: string;
    identityDocument?: string;
    accountNumber?: string;
    image: string;
    type: AccountEnum;
    paymentData?: any;
}
