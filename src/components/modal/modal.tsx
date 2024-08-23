import { component$, Slot, useSignal, useStyles$ } from "@builder.io/qwik";
import styles from "./modal.css?inline";
import { Modal } from '~/components/ui';

interface ModalProps {
    trigger: string;
    title?: string;
    description?: string;
    showFooter?: boolean;
    onClose?: () => void;
}

export default component$<ModalProps>((props) => {
    useStyles$(styles);
    const show = useSignal(false);
    return (
        <Modal.Root bind:show={show}>
            <Modal.Trigger class="modal-trigger">{props.trigger}</Modal.Trigger>
            <Modal.Panel class="modal-panel">
                <button class="modal-close-button" aria-label="Close" onClick$={() => show.value = !show.value}>
                    &times;
                </button>
                {props.title && <Modal.Title class="modal-title">{props.title}</Modal.Title>}
                {props.description && (
                    <Modal.Description class="modal-description">
                        {props.description}
                    </Modal.Description>
                )}
                <Slot />
            </Modal.Panel>
        </Modal.Root>
    );
});

