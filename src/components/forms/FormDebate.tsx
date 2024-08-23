import { component$, useComputed$, useSignal, useStyles$, useTask$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import continents from "~/data/continents.json";
import countries from "~/data/countries.json";
import { Button, Combobox, Input, Label, RadioGroup, Select, Separator, Textarea } from '~/components/ui';
import { LuLockKeyhole, LuUnlockKeyhole, LuCheck, LuChevronDown, LuCamera, LuX } from "@qwikest/icons/lucide";
import styles from "./form.css?inline";

interface FormDebateProps {
    action: any;
}

export default component$<FormDebateProps>((props) => {
    useStyles$(styles);
    const level_options = ['Mundial', 'Continental', 'Nacional', 'Provincial', 'Local'];
    
    const title = useSignal('');
    const description = useSignal('');
    
    const selectedLevel = useSignal<string>('Mundial');
    const selectedCommunity = useSignal<string>('');
    
    const selected = useSignal<string[]>([]);
    const displayValues = useSignal<string[]>([]);
    const inputRef = useSignal<HTMLInputElement>();

    const community_options = useSignal<string[]>([]);

    useTask$(({ track }) => {
        track(() => selectedLevel.value);
        const value = selectedLevel.value;
        if(value === "Mundial") {
            community_options.value = continents.map((continent) => continent.name);
        }
        if(value === "Nacional") {
            community_options.value = countries.map((country) => country.name);
        }
    });
    
    return (
        <Form action={props.action}>
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="Title" maxLength={100} bind:value={title} />
                <div class="flex justify-end">
                    <p class="text-xs text-muted-foreground">{title.value.length}/100</p>
                </div>
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="description">Description</Label>
                <Textarea name="description" placeholder="Description" maxLength={5000} bind:value={description} />
                <div class="flex justify-end">
                    <p class="text-xs text-muted-foreground">{description.value.length}/5000</p>
                </div>
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="file">Imagen/Video</Label>
                <div class="flex items-center justify-center w-full">
                    <label for="file" class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <LuCamera />
                        <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Arrastra y suelta el archivo o haz clic</span></p>
                    </div>
                    <Input id="file" type="file" class="hidden" accept="image/*,video/*" />
                    </label>
                </div>
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Select.Root
                    bind:value={selectedLevel}
                    name="level"
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
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Select.Root
                    bind:value={selectedCommunity}
                    disabled={selectedLevel.value === "Mundial" || selectedLevel.value === ""}
                    name="community"
                >
                    <Select.Label>Community</Select.Label>
                    <Select.Trigger>
                        <Select.DisplayValue placeholder="Select an option" />
                    </Select.Trigger>
                    <Select.Popover gutter={8}>
                        {community_options.value.map((community) => (
                            <Select.Item key={community}>
                                <Select.ItemLabel>{community}</Select.ItemLabel>
                                <Select.ItemIndicator>
                                    <LuCheck class="h-4 w-4" />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Popover>
                </Select.Root>
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Combobox.Root
                    bind:displayValue={displayValues}
                    bind:value={selected}
                    class="combobox-root"
                    disabled={!selectedCommunity.value}
                    multiple
                    removeOnBackspace
                    name="points_of_view"
                >
                    <Combobox.Label class="combobox-label">Points of Views</Combobox.Label>
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
                    <RadioGroup.Item disabled name="public" value="false" id="private" />
                    <div style={{ fontSize: "24px" }}><LuLockKeyhole /></div>
                    <div class="flex flex-col">
                        <Label for="private" class="font-bold">Private</Label>
                        <span class="text-gray-600">You choose who can see and say to this debate.</span>
                    </div>
                </div>
            </RadioGroup.Root>

            <input type="hidden" name="creator_id" value="1" />
            <Button type="submit" class="modal-save w-full">
                {/* <LuLoader2 class="mr-2 h-5 w-5 animate-spin" /> */}
                Create Debate
            </Button>
        </Form>
    );
});