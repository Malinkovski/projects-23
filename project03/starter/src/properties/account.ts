export interface UserProps{
    id: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    rememberPassword: boolean;
    confirmPassword: string;
    biography: string;
    phoneNumber: string;
    livingAddress: string;
    profilePicture: string;
    token: string;
    cart: any[]; //ids and quantity
    favorites: string[]; //ids
    news: boolean;
}