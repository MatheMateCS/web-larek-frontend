import { IClickable, Category, ProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export abstract class Card<Context> extends Component<ProductItem & Context> {
    private __categoryElement: HTMLSpanElement;
    private __titleElement: HTMLHeadingElement;
    private __imageElement: HTMLImageElement;
    private __priceElement: HTMLSpanElement;

    constructor(container: HTMLElement) {
        super(container);

        this.__categoryElement = ensureElement<HTMLSpanElement>('.card__category', this.container);
        this.__titleElement = ensureElement<HTMLHeadingElement>('.card__title', this.container);
        this.__imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.__priceElement = ensureElement<HTMLSpanElement>('.card__price', this.container);
    }

    set category(category: Category) {
        this.setText(this.__categoryElement, category);
        let modifier: string;
        switch (category) {
            case 'софт-скил': {
                modifier = 'soft'
                break;
            }
            case 'хард-скил': {
                modifier = 'hard'
                break;
            }
            case 'другое': {
                modifier = 'other'
                break;
            }
            case 'дополнительное': {
                modifier = 'additional'
                break;
            }
            case 'кнопка': {
                modifier = 'button'
                break;
            }
        }
        this.__categoryElement.classList.add('card__category', `card__category_${modifier}`);
    }

    set title(title: string) {
        this.setText(this.__titleElement, title);
    }

    set image(src: string) {
        this.setImage(this.__imageElement, src);
    }

    set price(price: string) {
        const text = price ? `${price} синапсов` : 'Бесценно';
        this.setText(this.__priceElement, text);
    }
}