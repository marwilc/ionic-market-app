import { appRoutes } from '@config/app.config';
import { ITab } from '@core/models/mock.model';

export const TABS: ITab[] = [
    {
        name: appRoutes.home,
        icon: 'home-outline',
    },
    {
        name: appRoutes.account,
        icon: 'person-outline',
    },
    {
        name: appRoutes.cart,
        icon: 'cart-outline',
    },
    {
        name: appRoutes.menu,
        icon: 'menu-outline',
    },
];
