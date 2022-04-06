export const appRoutes: AppRoutes = {
    auth: 'auth',
    register: 'sign-in',
    login: 'login',
    home: 'home',
    account: 'account',
    cart: 'cart',
    menu: 'menu',
};

export interface AppRoutes {
    auth: string;
    register: string;
    login: string;
    home: string;
    account: string;
    cart: string;
    menu: string;
}
export interface Config {
    appInfo: AppInfo;
    routes?: AppRoutes;
}

export const appInfo: AppInfo = {
    countryPhoneCode: '58',
    phoneNumber: '',
    localNumber: '',
    email: 'market.dev@gmail.com',
    instagram: 'market',
    facebook: 'market',
    RIF: '',
    companyName: 'Market C.A.',
    address: 'Venezuela, Carabobo',
    appBuild: null,
    webViewMinVersionSupport: 85,
    bsCurrencySymbol: 'BsS',
    iva: 0.16,
};

export interface AppInfo {
    phoneNumber: string;
    localNumber: string;
    email: string;
    instagram: string;
    facebook: string;
    RIF: string;
    countryPhoneCode: string;
    companyName: string;
    address: string;
    appBuild: string;
    webViewMinVersionSupport: number;
    bsCurrencySymbol: string;
    iva: number;
}
