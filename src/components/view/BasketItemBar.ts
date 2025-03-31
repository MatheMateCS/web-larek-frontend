import { IEvents, BasketItemBarInfo } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { BasketItem } from "./BasketItem";

export class BasketItemBar extends BasketItem<BasketItemBarInfo> {
    constructor(events: IEvents) {
        super(cloneTemplate<HTMLLIElement>('#card-basket'), {
            onRemove: () => events.emit('basketItem:remove', { id: this.id })
        });
    }

    set id(id: string) {
        this.container.dataset.id = id || '';
    }

    get id() {
        return this.container.dataset.id || '';
    }
}