import { IClickable, IEvents, ProductItem } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Card } from "./Card";

export class CatalogCard extends Card<ProductItem> {
    constructor(events: IEvents) {
        super(cloneTemplate<HTMLButtonElement>('#card-catalog'));
        this.container.addEventListener('click', () => events.emit('catalogCard:click', { id: this.id }));
    }

    set id(id: string) {
        this.container.dataset.id = id || '';
    }

    get id() {
        return this.container.dataset.id || '';
    }
}