import { FormInfo, IEvents, ProductItem, ProductList, UserInfo } from "../../types";

export class ApplicationState {
    private __catalog: ProductList;
    private __basket: ProductList;
    private __user: UserInfo;

    constructor(private events: IEvents) {
        this.__basket = { total: 0, items: [] };
        this.__catalog = { total: 0, items: [] };
        this.__user = { payment: 'Онлайн', address: '', email: '', phone: ''};
    }

    set catalog(catalog: ProductList) {
        this.__catalog = catalog;
        this.events.emit('catalog:set');
    }

    get catalog(): ProductList {
        return this.__catalog;
    }

    get basket(): ProductList {
        return this.__basket;
    }

    get basketTotalSum(): number {
        return this.__basket.items.reduce((acc, item) => acc + item.price , 0);
    }

    set user(userInfo: UserInfo) {
        this.__user = userInfo;
    }

    get user(): UserInfo {
        return this.__user;
    }

    getCatalogProductItemById(id: string): ProductItem {
        return this.__catalog.items.find((item) => item.id === String(id));
    }

    addToBusket(product: ProductItem): void {
        if (! this.__basket.items.some((item) => item.id === product.id)) {
            this.__basket.items.push(product);
            this.__basket.total += 1;
            this.events.emit('basket:change');
        }
    }

    removeFromBasketById(id: string): void {
        const index = this.__basket.items.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.__basket.items.splice(index, 1);
        }
        this.events.emit('basket:change');
    }

    clearBasket(): void {
        this.__basket = { total: 0, items: [] };
    }

    resetUser(): void {
        this.__user = { payment: 'Онлайн', address: '', email: '', phone: ''};
    }

    validateOrderInfo(): FormInfo {
        let isValid = true;
        const errorList: string[] = [];
        // TODO: proper validation of address and payment
        return { isValid, errorList };
    }

    validateContactsInfo(): FormInfo {
        let isValid = true;
        const errorList: string[] = [];
        // TODO: proper validation of email and phone
        return { isValid, errorList };
    }
}