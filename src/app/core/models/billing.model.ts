import { Address } from './address.model';

export interface Billing extends Address {
    optionalRequirement: string;
    sendInvoice: boolean;
}
