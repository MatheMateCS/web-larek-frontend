import { IModal, ModalInfo } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "./Component";

export abstract class Modal extends Component<ModalInfo> {
    protected _closeButtonElement: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, 
                protected _handlers?: Partial<IModal>) {
        super(container);
        
        this._closeButtonElement = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButtonElement.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this._content.addEventListener('click', evt => evt.stopPropagation());
    }

    set content(content: HTMLElement) {
        this._content.replaceChildren(content);
    }

    public open() {
        this.container.classList.add('modal_active');
        this._handlers?.onOpen();
    }

    public close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this._handlers?.onClose();
    }

    render(content: ModalInfo): HTMLElement {
        super.render(content);
        this.open();
        return this.container;
    }
}