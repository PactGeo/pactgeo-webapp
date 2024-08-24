import { component$, useComputed$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import countries from "~/data/countries";
import { Button, Combobox, Input, Label, RadioGroup, Select, Separator, Textarea } from '~/components/ui';
import { LuLockKeyhole, LuUnlockKeyhole, LuCheck, LuChevronDown, LuCamera, LuX } from "@qwikest/icons/lucide";
import styles from "./form.css?inline";

interface FormDebateProps {
    action: any;
}

export default component$<FormDebateProps>((props) => {
    useStyles$(styles);
    const level_options = ['Mundial', 'International', 'Nacional', 'Provincial', 'Local'];
    
    const title = useSignal('');
    const description = useSignal('');
    const file = useSignal('');
    
    const selectedLevel = useSignal<string>('Mundial');
    const selectedCommunity = useSignal<string>('');
    
    const selected = useSignal<string[]>([]);
    const displayValues = useSignal<string[]>([]);
    const inputRef = useSignal<HTMLInputElement>();

    const community_options = useSignal<string[]>([]);
    const community_title = useSignal<string>('Worldwide');

    useTask$(({ track }) => {
        track(() => selectedLevel.value);
        const value = selectedLevel.value;
        if(value === "Mundial") {
            community_options.value = [];
            community_title.value = "Worldwide";
        }
        if(value === "International") {
            community_options.value = countries.map((country) => `${country.flag} ${country.name}`);
            community_title.value = "Countries";
        }
        if(value === "Nacional") {
            community_options.value = countries.map((country) => `${country.flag} ${country.name}`);
            community_title.value = "Countries";
        }
    });
    
    return (
        <Form action={props.action}>
            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label for="title">Title</Label>
                {/* <Input type="text" name="title" id="title" placeholder="Title" maxLength={100} bind:value={title} error={props.action.value?.fieldErrors?.title} /> */}
                <Input 
                    type="text" 
                    name="title" 
                    id="title" 
                    placeholder="Title" 
                    maxLength={100} 
                    bind:value={title} 
                    error={props.action.value?.fieldErrors?.title} 
                />
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label for="description">Description</Label>
                <Textarea
                    name="description"
                    placeholder="Description"
                    maxLength={5000}
                    bind:value={description}
                    error={props.action.value?.fieldErrors?.description}
                />
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="file">Imagen/Video</Label>
                <div class="flex items-center justify-center w-full">
                    <label for="file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <LuCamera />
                        <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Arrastra y suelta el archivo o haz clic</span></p>
                    </div>
                    <Input name="file" id="file" type="file" class="hidden" accept="image/*,video/*" bind:value={file} />
                    </label>
                </div>
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Select.Root
                    bind:value={selectedLevel}
                >
                    <Select.Label>Geographic Level</Select.Label>
                    <Select.Trigger>
                        <Select.DisplayValue placeholder="Select an option" />
                    </Select.Trigger>
                    <Select.Popover gutter={8}>
                        {level_options.map((level) => (
                            <Select.Item key={level}>
                                <Select.ItemLabel>{level}</Select.ItemLabel>
                                <Select.ItemIndicator>
                                    <LuCheck class="h-4 w-4" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Popover>
                </Select.Root>
                <input type="hidden" name="level" value={selectedLevel.value} />
            </div>

            {selectedLevel.value === "International" && (
                <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <RadioGroup.Root>
                        <div class="flex items-center space-x-2 mb-2">
                            <RadioGroup.Item name="public" value="true" id="public" />
                            <Label for="public" class="font-bold">Listar los paises que participan</Label>
                        </div>
                        <div class="flex items-center space-x-2 mb-2">
                            <RadioGroup.Item name="public" value="false" id="private" />
                            <Label for="public" class="font-bold">Listar los paises excluidos</Label>
                        </div>
                    </RadioGroup.Root>
                </div>
            )}

            {selectedLevel.value !== "Mundial" && selectedLevel.value !== "International" && (
                <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Combobox.Root class="combobox-root">
                        <Combobox.Label class="combobox-label">{community_title.value}</Combobox.Label>
                        <Combobox.Control class="combobox-control">
                            <Combobox.Input class="combobox-input" />
                            <Combobox.Trigger class="combobox-trigger">
                                <LuChevronDown class="combobox-icon" />
                            </Combobox.Trigger>
                        </Combobox.Control>
                        <Combobox.Popover class="combobox-popover combobox-max-height" gutter={8}>
                            {community_options.value.map((community) => (
                                <Combobox.Item key={community} class="combobox-item">
                                    <Combobox.ItemLabel>{community}</Combobox.ItemLabel>
                                    <Combobox.ItemIndicator>
                                        <LuCheck />
                                    </Combobox.ItemIndicator>
                                </Combobox.Item>
                            ))}
                        </Combobox.Popover>
                    </Combobox.Root>
                </div>
            )}

            {selectedLevel.value !== "Mundial" && (
                <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Combobox.Root
                        bind:displayValue={displayValues}
                        bind:value={selected}
                        class="combobox-root"
                        multiple
                        removeOnBackspace
                        name="points_of_view"
                    >
                        <Combobox.Label class="combobox-label">Countries</Combobox.Label>
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
                            {community_options.value.map((community) => (
                                <Combobox.Item key={community} class="combobox-item">
                                <Combobox.ItemLabel>{community}</Combobox.ItemLabel>
                                <Combobox.ItemIndicator>
                                    <LuCheck />
                                </Combobox.ItemIndicator>
                                </Combobox.Item>
                            ))}
                        </Combobox.Popover>
                    </Combobox.Root>
                </div>
            )}

            {selectedLevel.value !== "Mundial" && (
                <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                    <Separator orientation="horizontal" class="separator-top my-2" />
                    <RadioGroup.Root>
                        <div class="flex items-center space-x-2 mb-2">
                            <RadioGroup.Item name="public" value="true" id="public" />
                            <div style={{ fontSize: "24px" }}><LuUnlockKeyhole /></div>
                            <div class="flex flex-col">
                                <Label for="public" class="font-bold">Public</Label>
                                <span class="text-gray-600">Anyone can see this debate. You choose who has a say.</span>
                            </div>
                        </div>
                        <div class="flex items-center space-x-2 mb-2">
                            <RadioGroup.Item name="public" value="false" id="private" />
                            <div style={{ fontSize: "24px" }}><LuLockKeyhole /></div>
                            <div class="flex flex-col">
                                <Label for="private" class="font-bold">Private</Label>
                                <span class="text-gray-600">You choose who can see and say to this debate.</span>
                            </div>
                        </div>
                    </RadioGroup.Root>
                </div>
            )}

            <input type="hidden" name="creator_id" value="1" />
            <Button type="submit" class="modal-save w-full">
                {/* <LuLoader2 class="mr-2 h-5 w-5 animate-spin" /> */}
                Create Debate
            </Button>
        </Form>
    );
});