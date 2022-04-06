import { HomeSegmentsEnum, ISegment } from '@core/models/mock.model';

export const CART_SEGMENTS: ISegment[] = [
    {
        id: HomeSegmentsEnum.GROCERIES,
        name: 'general.groceries',
        router: '',
    },
    {
        id: HomeSegmentsEnum.PHARMACY,
        name: 'general.pharmacy',
        router: '',
    },
    {
        id: HomeSegmentsEnum.IN_STORE_CODE,
        name: 'general.inStoreCode',
        router: '',
    },
    {
        id: HomeSegmentsEnum.VIDEO,
        name: 'general.video',
        router: '',
    },
    {
        id: HomeSegmentsEnum.MUSIC,
        name: 'general.music',
        router: '',
    },
];
