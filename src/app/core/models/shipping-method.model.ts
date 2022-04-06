export interface ShippingMethod {
    name: string;
    description: string;
    type: ShippingType;
}

export enum ShippingType {
    DELIVERY = 'delivery',
    PICKUP = 'pickup',
    FREE = 'free',
    PROGRAMMED = 'programmed',
}

export interface ShippingTime {
    date: string;
    price: number;
    time: string;
    tip: number;
    type: ShippingType;
}

export interface ShippingTimeOps {
    name: string;
    description: string;
    type: ShippingType;
    price: number;
    total: number;
    hours?: number;
}

export interface ShippingDay {
    label: string;
    date: Date;
    type: ShippingType;
}
