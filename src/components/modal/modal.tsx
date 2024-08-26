import { component$, Slot, useSignal, useStyles$, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./modal.css?inline";
import { Modal, Separator } from '~/components/ui';
import { LuMaximize2, LuX } from "@qwikest/icons/lucide";

interface ModalProps {
    trigger: string;
    title?: string;
    description?: string;
    showFooter?: boolean;
    onClose?: () => void;
    onClickExpand?: () => void;
}

export default component$<ModalProps>((props) => {
    useStyles$(styles);
    const show = useSignal(false);
    return (
        <Modal.Root bind:show={show}>
            <Modal.Trigger class="modal-trigger">{props.trigger}</Modal.Trigger>
            <Modal.Panel class="modal-panel pt-2">
                <div class="flex justify-start items-center gap-2 py-2">
                    <Modal.Close><LuX class="text-2xl" /></Modal.Close>
                    {props.onClickExpand && <Modal.Close onClick$={props.onClickExpand}><LuMaximize2 class="text-xl" /></Modal.Close>}
                </div>
                <Separator orientation="horizontal" class="mb-2" />
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

