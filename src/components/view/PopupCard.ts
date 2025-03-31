import { IEvents, ProductItem } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class PopupCard extends Card<ProductItem> {
    private __descriptionElement: HTMLParagraphElement;
    private __buttonElement: HTMLButtonElement;

    constructor(events: IEvents) {
        super(cloneTemplate<HTMLDivElement>('#card-preview'));

        this.__buttonElement = this.container.querySelector<HTMLButtonElement>('.card__button');
        this.__buttonElement.addEventListener('click', () => events.emit('catalogCard:addToBasket', { id: this.id }));
        this.__descriptionElement = ensureElement<HTMLParagraphElement>('.card__text', this.container);
    }

    set id(id: string) {
        this.container.dataset.id = id || '';
    }

    get id() {
        return this.container.dataset.id || '';
    }

    set description(description: string) {
        this.setText(this.__descriptionElement, description);
    }

    set disableButton(isDisable: boolean) {
        this.setDisabled(this.__buttonElement, isDisable);
    }
}