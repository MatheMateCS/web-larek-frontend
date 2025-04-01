import { IForm, FormInfo } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "./Component";

export abstract class Form<T> extends Component<FormInfo> {
    private __submitButtonElement: HTMLButtonElement;
    private __errorElement: HTMLSpanElement;

    constructor(protected _container: HTMLFormElement, 
                protected _handlers?: Partial<IForm<T>>) {
        super(_container);

        this.__submitButtonElement = ensureElement<HTMLButtonElement>('button[type=submit]', this._container);
        this.__errorElement = ensureElement<HTMLSpanElement>('.form__errors', this._container);

        if (_handlers?.onInput) {
            this._container.addEventListener('input', this.onInputChange);
        }

        if (_handlers?.onSubmit) {
            this._container.addEventListener('submit', this.submitHandler);
        }

    }

    private onInputChange = (e: KeyboardEvent) => {
        const inputElement = e.target as HTMLInputElement;
        this._handlers.onInput(
            inputElement.name as keyof T,
            inputElement.value,
            inputElement.validationMessage
        );
    }

    private submitHandler = (e: SubmitEvent) => {
        e.preventDefault();
        this._handlers.onSubmit();
    }

    public reset(): void {
        this._container.reset();
    }

    set isValid(validity: boolean) {
        this.setDisabled(this.__submitButtonElement, !validity);
    }

    set errorList(errorList: string[]) {
        this.setText(this.__errorElement, errorList.join('; '));
    }
}