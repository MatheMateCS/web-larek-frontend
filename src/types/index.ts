// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте

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

export type BasketInfo = {
    totalSum: string | number,
    isDisabled: boolean
    items: HTMLElement[],
};

export interface IBasket {
    onBuy(): void;
}

export type BasketItemInfo = {
    title: string,
    price: string | number | null,
    index: number | string
};

export interface IBasketItem {
    onRemove(): void;
};

export type Category = 'софт-скил' 
                    | 'другое' 
                    | 'дополнительное' 
                    | 'кнопка' 
                    | 'хард-скил';

export interface ICard {
    onClick(): void;
}

export type CardInfo = {
    category: Category,
    title: string
    image: string,
    price: number | null
}

export type FormInfo = {
    isValid: boolean;
    errorList: string[];
}

export interface IForm<T> {
    onSubmit(): void;
    onInput(field: keyof T, value: string, message: string): void;
};

export type ModalInfo = {
    content: HTMLElement;
}

export interface IModal {
    onOpen(): void;
    onClose(): void;
}

export type SuccessInfo = {
    totalSum: number;
}

export interface ISuccess {
    onClick(): void;
};

export type PopupCardInfo = {
    id: string,
    description: string,
    isDisabled: boolean
} & CardInfo;

export type CatalogCardInfo = {
    id: string
} & CardInfo;

export type ContactsInfo = {
    email: string,
    phone: string
}

export type OrderInfo = {
    payment: string,
    address: string
}

export type BasketItemBarInfo = {
    id: string
} & BasketItemInfo;

/**
 * Типы для работы с сервером (API) и моделью (Model)
 */
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type ProductList = { // GET Product List
    total: number,
    items: ProductItem[]
}

export type ProductItem = {
    id: string,
    description: string,
    image: string,
    title: string
    category: Category,
    price: number | null
}

export type Order = { // POST Order
    id: string,
    total: number
}

export type UserInfo = OrderInfo & ContactsInfo;

export type PostOrderData = UserInfo & { total: number, items: string[] }