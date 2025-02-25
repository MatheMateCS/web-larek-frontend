// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте

/**
 * Типы для работы с сервером
 */

// export type ApiListResponse<Type> = {
//     total: number,
//     items: Type[]
// };

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type Category = 'софт-скил' 
                    | 'другое' 
                    | 'дополнительное' 
                    | 'кнопка' 
                    | 'хард-скил';

export type ProductItem = {
    id: string,
    description: string,
    image: string,
    title: string
    category: Category,
    price: number | null
}

export type ProductList = { // GET Product List
    total: number,
    items: ProductItem[]
}

export type Order = { // POST Order
    id: string,
    total: number
}

export type ErrorResponse = {
    error: string
}

export type GetProductItemResponse = ProductList | ErrorResponse; // GET Product Item

/**
 * Типы, связанные с моделью (Model)
 */

export type PaymentType = 'Онлайн' | 'При получении'

export type UserInfo = {
    payment: PaymentType,
    address: string,
    email: string,
    phone: string
}

export type OrderInfo = UserInfo & ProductList

export interface IUser {
    __info: UserInfo;

    constructor(): void;
    setPaymentType(payment: PaymentType): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setPhone(phone: string): void;
    resetAll(): void;
} 

export interface IProductCollection {
    __amount: number;
    __items: ProductItem[];

    getItems(): ProductItem[];
    isEmpty(): boolean;
}

export interface ICatalog extends IProductCollection {
    constructor(products?: ProductList): void;
    refill(products: ProductList): void;
}

export interface IBusket extends IProductCollection {
    constructor(): void;
    add(): void;
    remove(id: string): void;
    clear(): void;
    calcTotalSum(): number;
}

/**
 * Типы, связанные с брокером событий (Presenter)
 */
export type EventName = string | RegExp;

export type Subscriber = Function;

export type EmitterEvent = {
    eventName: EventName,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}


/**
 * Типы, связанные с представлением (View)
 */

export interface IView {
    _content: HTMLElement;

    constructor(content: HTMLElement): void;
    render(data?: object): HTMLElement;
}

export type BuyButtonState = 'disabled' | 'already' | 'able';

export interface ICard extends IView {
    _data: ProductItem;

    setProduct(data: ProductItem): void;    
}

export interface IBusketItem extends ICard {
    onRemove(): void;
}

export interface IModal extends IView {
    onOpen(): void;
    onClose(): void;
}

export type FormError = 'address' | 'email' | 'phone'

export interface IForm {
    __isValid: boolean;
    _content: HTMLElement;
    _errors: FormError[];
    
    checkValidity(): boolean;
    getErrors(): FormError[];
}

export interface IModalForm extends IModal {
    form: IForm;
}