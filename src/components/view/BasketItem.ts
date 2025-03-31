import { IBasketItem, BasketItemInfo } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export abstract class BasketItem<T> extends Component<BasketItemInfo & T> {
    private __orderNumberElement: HTMLSpanElement;
    private __titleElement: HTMLSpanElement;
    private __priceElement: HTMLSpanElement;
    private __removeButtonElement: HTMLButtonElement;

    constructor(container: HTMLLIElement, _handlers?: Partial<IBasketItem>) {
        super(container);

        this.__orderNumberElement = ensureElement<HTMLSpanElement>('.basket__item-index', this.container);
        this.__titleElement = ensureElement<HTMLSpanElement>('.card__title', this.container);
        this.__priceElement = ensureElement<HTMLSpanElement>('.card__price', this.container);
        this.__removeButtonElement = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
        
        if (_handlers.onRemove) {
            this.__removeButtonElement.addEventListener('click', _handlers.onRemove);
        }
    }

    set title(title: string) {
        this.setText(this.__titleElement, title);
    }

    set price(price: string) {
        const text = (price)? `${price} синапсов` : 'Бесценно';
        this.setText(this.__priceElement, text);
    }

    set orderNumber(orderNumber: string) {
        this.setText(this.__orderNumberElement, orderNumber);
    }
}