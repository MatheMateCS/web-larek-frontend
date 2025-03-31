import { CatalogCardInfo, IEvents } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Card } from "./Card";

export class CatalogCard extends Card<CatalogCardInfo> {
    constructor(events: IEvents) {
        super(cloneTemplate<HTMLButtonElement>('#card-catalog'), {
			onClick: () => events.emit('catalogCard:click', { id: this.id }),
		});
    }

    set id(id: string) {
        this.container.dataset.id = id || '';
    }

    get id() {
        return this.container.dataset.id || '';
    }
}