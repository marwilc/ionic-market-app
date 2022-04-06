export enum HomeSegmentsEnum {
    GROCERIES,
    PHARMACY,
    IN_STORE_CODE,
    VIDEO,
    MUSIC,
}

export interface ISegment {
    id: number;
    name: string;
    router: string;
}

export interface ITab {
    name: string;
    icon: string;
    badge?: number;
}

export interface ISlide {
    image: string;
    route: string;
    title?: string;
    subtitle?: string;
}
