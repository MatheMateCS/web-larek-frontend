import { IEvents, ContactsInfo } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Form } from "./Form";

export class ContactsModal extends Form<ContactsInfo> {
    constructor(events: IEvents) {
        super(cloneTemplate<HTMLFormElement>('#contacts'), {
            onInput: (field, value) => events.emit('contacts:change', field === 'email' ? { email: value } : { phone: value }),
            onSubmit: () => events.emit('contacts:submit')
        });
    }
}