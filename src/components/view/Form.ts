import { IForm, FormInfo } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "./Component";

export abstract class Form<Subject> extends Component<FormInfo> {
    private __submitButtonElement: HTMLButtonElement;
    private __errorElement: HTMLSpanElement;

    constructor(protected _container: HTMLFormElement, 
                protected _handlers?: Partial<IForm<Subject>>) {
        super(_container);

        this.__submitButtonElement = ensureElement<HTMLButtonElement>('button[type=submit]', this._container);
        this.__errorElement = ensureElement<HTMLSpanElement>('.form__errors', this._container);

        if (this._handlers?.onInput) {
            this._container.addEventListener('input', this._onInputChange);
        }

        if (this._handlers?.onSubmit) {
            this._container.addEventListener('submit', this._onSubmit);
        }

    }

    private _onInputChange(e: KeyboardEvent): void {
        const inputElement = e.target as HTMLInputElement;
        this._handlers.onInput(
            inputElement.name as keyof Subject,
            inputElement.value,
            inputElement.validationMessage
        );
    }

    private _onSubmit(e: SubmitEvent): void {
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