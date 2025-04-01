import { IEvents, PopupCardInfo } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Card } from "./Card";

export class PopupCard extends Card<PopupCardInfo> {
    private __descriptionElement: HTMLParagraphElement;

    constructor(events: IEvents) {
        super(cloneTemplate<HTMLDivElement>('#card-preview'), {
			onClick: () => events.emit('catalogCard:addToBasket', { id: this.id }),
		});

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

    set isDisabled(isDisable: boolean) {
        this.setDisabled(this._buttonElement, isDisable);
    }
}