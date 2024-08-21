import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { Modal } from "@qwik-ui/headless";
import styles from "./modal.css?inline";

interface ModalProps {
    trigger: string;
    title?: string;
    description?: string;
    showFooter?: boolean;
    onClose?: () => void;
    onSave?: () => void;
}

export default component$<ModalProps>((props) => {
    useStyles$(styles);

    return (
        <Modal.Root>
            <Modal.Trigger class="modal-trigger">{props.trigger}</Modal.Trigger>
            <Modal.Panel class="modal-panel">
                <button class="modal-close-button" aria-label="Close" onClick$={props.onClose}>
                    &times;
                </button>
                {props.title && <Modal.Title>{props.title}</Modal.Title>}
                {props.description && (
                    <Modal.Description>
                        {props.description}
                    </Modal.Description>
                )}
                <Slot />
                {props.showFooter && (
                    <footer>
                        <Modal.Close class="modal-close" onClick$={props.onClose}>Cancel</Modal.Close>
                        <Modal.Close class="modal-close" onClick$={props.onSave}>Save Changes</Modal.Close>
                    </footer>
                )}
            </Modal.Panel>
        </Modal.Root>
    );
});
