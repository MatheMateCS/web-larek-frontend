import { IEvents } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Basket } from "./Basket";

export class BasketModal extends Basket { 
    constructor(protected events: IEvents) {
        super(cloneTemplate<HTMLDivElement>('#basket'), {
            onBuy: () => events.emit('busket:buy')
        });
    }
}