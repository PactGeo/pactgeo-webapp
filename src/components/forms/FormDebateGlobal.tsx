import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import { Button, Combobox, FileInput, Input, Label, Textarea } from '~/components/ui';
import { LuCheck, LuChevronDown, LuLoader2, LuX } from "@qwikest/icons/lucide";
import { usePostDebate } from "~/routes/debates/global";
import styles from "./form.css?inline";

interface FormDebateGlobalProps {
    onSubmitCompleted?: () => void;
}

export default component$<FormDebateGlobalProps>(({ onSubmitCompleted }) => {
    useStyles$(styles);
    
    const isLoading = useSignal(false);
    const title = useSignal('');
    const description = useSignal('');
    const file = useSignal<any>('');

    const file_example = useSignal<any>('https://res.cloudinary.com/demo/image/upload/w_400/sample.jpg');
    
    const action = usePostDebate();
    
    // const tags = useGetTags()
    
    return (
        <Form
            action={action}
            onSubmitCompleted$={() => {
                isLoading.value = false
                !action.value?.failed && onSubmitCompleted && onSubmitCompleted()
            }}
        >
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label for="title">Title</Label>
                <Input
                    autofocus
                    bind:value={title}
                    error={action.value?.fieldErrors?.title}
                    id="title"
                    maxLength={100}
                    name="title"
                    placeholder="Describe a key challenge for the community"
                    type="text"
                />
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label for="description">Description</Label>
                <Textarea
                    class="overflow-hidden h-auto"
                    name="description"
                    placeholder="Provide details about the problem or proposal"
                    maxLength={5000}
                    bind:value={description}
                    error={action.value?.fieldErrors?.description}
                />
            </div>

            {/* <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <FileInput
                    name="file"
                    id="file"
                    // @ts-ignore
                    bind:value={file}
                    label="Imagen/Video"
                />
            </div> */}

            <div>
                <Input name="image_url" type="text" bind:value={file_example} />
            </div>

            <div>
                <Input type="hidden" name="type" value="global" />
            </div>

            {/* {selected.value.map((item, index) => (
                <input type="hidden" name={`tags.${index}`} value={item}></input>
            ))}

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Combobox.Root
                    class="combobox-root"
                    multiple
                    removeOnBackspace
                    bind:displayValue={displayValues}
                    bind:value={selected}
                    
                >
                    <Combobox.Label class="combobox-label">Tags</Combobox.Label>
                    <Combobox.Control class="combobox-control combobox-multiple">
                        <div class="combobox-pill-container">
                            {displayValues.value.map((item) => (
                                <span class="combobox-pill" key={item}>
                                    {item}
                                    <span
                                        onPointerDown$={() => {
                                            selected.value = selected.value?.filter(
                                                (selectedItem) => selectedItem !== item,
                                            );
                                            inputRef.value?.focus();
                                        }}
                                    >
                                        <LuX aria-hidden="true" />
                                    </span>
                                </span>
                            ))}
                            {displayValues.value.length > 4 && (
                                <button
                                    class="combobox-clear combobox-pill"
                                    onClick$={() => {
                                        selected.value = [];
                                        inputRef.value?.focus();
                                    }}
                                >
                                    clear all
                                </button>
                            )}
                        </div>
                        <Combobox.Input class="combobox-input" ref={inputRef} />
                        <Combobox.Trigger class="combobox-trigger">
                            <LuChevronDown class="combobox-icon" />
                        </Combobox.Trigger>
                    </Combobox.Control>
                    <Combobox.Popover class="combobox-popover" gutter={8}>
                        {tags.value.map((tag) => (
                            <Combobox.Item key={tag.id} class="combobox-item">
                                <Combobox.ItemLabel>{tag.name}</Combobox.ItemLabel>
                                <Combobox.ItemIndicator>
                                    <LuCheck />
                                </Combobox.ItemIndicator>
                            </Combobox.Item>
                        ))}
                    </Combobox.Popover>
                </Combobox.Root>
            </div> */}

            <input type="hidden" name="creator_id" value="2" />
            <input type="hidden" name="community_id" value="1" />

            <Button type="submit" class="modal-save w-full" onClick$={() => isLoading.value = true} disabled={isLoading.value}>
                {isLoading.value && <LuLoader2 class="mr-2 h-5 w-5 animate-spin" />}
                {isLoading.value ? <span>Creating Debate</span> : <span>Create Debate</span>}
            </Button>
        </Form>
    );
});