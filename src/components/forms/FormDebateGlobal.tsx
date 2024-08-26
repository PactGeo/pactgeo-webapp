import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import { Button, Combobox, FileInput, Input, Label, Textarea } from '~/components/ui';
import { LuCheck, LuChevronDown, LuLoader2, LuX } from "@qwikest/icons/lucide";
import { usePostDebate } from "~/routes/debates/global";
import styles from "./form.css?inline";

export default component$(() => {
    useStyles$(styles);
    
    const isLoading = useSignal(false);
    const title = useSignal('');
    const description = useSignal('');
    const file = useSignal<any>('');
    
    const action = usePostDebate();
    
    const displayValues = useSignal<string[]>([]);
    const selected = useSignal<string[]>([]);
    
    const inputRef = useSignal<HTMLInputElement>();
    
    // const tags = useGetTags()
    
    return (
        <Form
            action={action}
            onSubmitCompleted$={() => {
                isLoading.value = false
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
                    value={action.formData?.get('title')}
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

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <FileInput
                    name="file"
                    id="file"
                    // @ts-ignore
                    bind:value={file}
                    label="Imagen/Video"
                />
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

            <input type="hidden" name="creator_id" value="1" />
            <input type="hidden" name="community_id" value="1" />

            <Button type="submit" class="modal-save w-full" onClick$={() => isLoading.value = true}>
                {isLoading.value && <LuLoader2 class="mr-2 h-5 w-5 animate-spin" />}
                {isLoading.value ? <span>Creating Debate</span> : <span>Create Debate</span>}
            </Button>
        </Form>
    );
});