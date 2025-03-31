import { IBasket, BasketInfo } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export abstract class Basket extends Component<BasketInfo> {
    protected _basketListElement: HTMLUListElement;
    protected _basketButtonElement: HTMLButtonElement;
    protected _totalSumElement: HTMLSpanElement;

    constructor(protected readonly container: HTMLElement, _handlers?: Partial<IBasket>) {
        super(container);

        this._basketListElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this._basketButtonElement = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this._totalSumElement = ensureElement<HTMLSpanElement>('.basket__price', this.container);
        
        if (_handlers.onBuy) {
            this._basketButtonElement.addEventListener('click', _handlers.onBuy);
        }
    }

    public clear() {
        this._basketListElement.innerHTML = null;
    }

    set isDisabled(isDisabled: boolean) {
        this.setDisabled(this._basketButtonElement, isDisabled);
    }

    set totalSum(totalSum: string) {
        this.setText(this._totalSumElement, `${totalSum} синапсов`);
    }

    set items(items: HTMLElement[]) {
        this._basketListElement.replaceChildren(...items);
    }
}