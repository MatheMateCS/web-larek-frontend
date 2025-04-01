import { IEvents, OrderInfo } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Form } from "./abstracts/Form";

export class OrderModal extends Form<OrderInfo> {
    private __onlineTypeButtonElement: HTMLButtonElement;
    private __cashTypeButtonElement: HTMLButtonElement;

    constructor(events: IEvents) {
        super(cloneTemplate<HTMLFormElement>('#order'), {
			onInput: (field, value) =>
				events.emit('order:change', { address: value }),
			onSubmit: () => events.emit('order:submit'),
		});


        this.__onlineTypeButtonElement = ensureElement<HTMLButtonElement>('button[name=card]', this.container);
        this.__cashTypeButtonElement = ensureElement<HTMLButtonElement>('button[name=cash]', this.container);

        this.toggleClass(this.__onlineTypeButtonElement, 'button_alt-active');

        this.__onlineTypeButtonElement.addEventListener('click', () => {
            this.toggleClass(this.__onlineTypeButtonElement, 'button_alt-active', true);
            this.toggleClass(this.__cashTypeButtonElement, 'button_alt-active', false);
            events.emit('order:change', { payment: 'online' });
        });

        this.__cashTypeButtonElement.addEventListener('click', () => {
            this.toggleClass(this.__cashTypeButtonElement, 'button_alt-active', true);
            this.toggleClass(this.__onlineTypeButtonElement, 'button_alt-active', false);
            events.emit('order:change', { payment: 'cash' });
        });
    }
}