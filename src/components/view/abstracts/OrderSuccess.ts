import { ISuccess, SuccessInfo } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "./Component";

export abstract class Success extends Component<SuccessInfo> {
    private __descriptionElement: HTMLParagraphElement;
    private __closeButtonElement: HTMLButtonElement;

    constructor(_container: HTMLElement, _handlers?: Partial<ISuccess>) {
        super(_container);
        this.__descriptionElement = ensureElement<HTMLParagraphElement>('.order-success__description', this.container);
        this.__closeButtonElement = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
        this.__closeButtonElement.addEventListener('click', _handlers?.onClick);
    }

    set totalSum(totalSum: number) {
        this.setText(this.__descriptionElement, `Списано ${totalSum} синапсов`);
    }
}