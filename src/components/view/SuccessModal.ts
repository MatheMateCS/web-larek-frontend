import { IEvents } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Success } from "./abstracts/OrderSuccess";

export class SuccessModal extends Success {
    constructor(events: IEvents) {
        super(cloneTemplate<HTMLDivElement>('#success'), {
            onClick: () => events.emit('success:ok')
        });
    }
}