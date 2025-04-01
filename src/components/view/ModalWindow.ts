import { IEvents } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Modal } from "./abstracts/Modal";

export class ModalWindow extends Modal {
    constructor(events: IEvents) {
        super(ensureElement<HTMLDivElement>('#modal-container'), {
            onOpen: () => events.emit('modal:open'),
            onClose: () => events.emit('modal:close')
        });
    }
}