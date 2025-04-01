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

    set catalog(catalog: ProductItem[]) {
        this.__catalog = { total: catalog.length, items: catalog } as ProductList;
        this.events.emit('catalog:set');
    }

    get catalog(): ProductItem[] {
        return this.__catalog.items;
    }

    get basket(): ProductItem[] {
        return this.__basket.items;
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

    getCatalogProductItemById(id: number | string): ProductItem | undefined {
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
        if (!this.user.address.length) {
			errorList.push('Заполните адрес доставки');
			isValid = false;
		}
		if (!this.user.payment.length) {
			errorList.push('Выберите тип оплаты');
			isValid = false;
		}
        return { isValid: isValid, errorList: errorList };
    }

    private __countDigits(data: string) {
        let count: number = 0;
        for(let i = 0; i < data.length; i++) {
            if ('0' <= data[i] && data[i] <= '9') count ++;
        }
        return count;
    }

    validateContactsInfo(): FormInfo {
        let isValid = true;
        const errorList: string[] = [];
        // TODO: proper validation of email and phone
        if (! this.user.email.length) {
            errorList.push('Заполните поле email');
            isValid = false;
        } else if (this.user.email.length < 3 || !this.user.email.includes('@')) {
            errorList.push('Некорректный email');
            isValid = false;
        }
        if (! this.user.phone.length) {
            errorList.push('Заполните номер телефона');
            isValid = false;
        } else if (this.__countDigits(this.user.phone) != 11 || ! /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(this.user.phone)) {
            errorList.push('Некорректный номер телефона');
            isValid = false;
        }
        console.log(isValid, errorList);
        return { isValid: isValid, errorList: errorList };
    }
}