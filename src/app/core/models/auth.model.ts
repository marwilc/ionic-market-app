export interface Login {
    usernameOrEmail: string;
    password: string;
}

export interface Register {
    firstName: string;
    lastName: string;
    username?: string;
    mail: string;
    password: string;
}
