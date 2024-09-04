// FormInternationalDebate.tsx
import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import { Button, Combobox, FileInput, Input, Label, Select, Textarea, RadioGroup, Separator } from '~/components/ui';
import { LuCheck, LuChevronDown, LuLoader2, LuLockKeyhole, LuUnlockKeyhole, LuX } from "@qwikest/icons/lucide";
import { usePostNationalDebate } from "~/routes/debates/nationals";
import styles from "./form.css?inline";

interface FormInternationalDebateProps {
    onSubmitCompleted?: () => void;
    tags: { id: string, name: string }[];
    countries: { name: string, flag: string }[];
}

export default component$<FormInternationalDebateProps>(({ onSubmitCompleted, tags, countries }) => {
    useStyles$(styles);

    const isLoading = useSignal(false);
    const title = useSignal('');
    const description = useSignal('');
    const file_example = useSignal<any>('https://images.unsplash.com/photo-1724963475892-a3274091955e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const display = useSignal<string[]>([]);
    const participatingCountries = useSignal<string[]>([]);
    const selectedCountries = useSignal<string[]>([]);

    const action = usePostNationalDebate();

    return (
        <Form
            action={action}
            onSubmitCompleted$={() => {
                isLoading.value = false;
                !action.value?.failed && onSubmitCompleted && onSubmitCompleted();
            }}
        >
            <input type="hidden" name="type" value="international" />
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

            <Separator orientation="horizontal" class="mb-4" />

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label>Participating Countries</Label>
                <RadioGroup.Root>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item name="size" value="default" id="r1" checked />
                        <Label for="r1">Include</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item name="size" value="comfortable" id="r2" />
                        <Label for="r2">Exclude</Label>
                    </div>
                </RadioGroup.Root>
                <Combobox.Root
                    class="combobox-root"
                    multiple
                    removeOnBackspace
                    bind:displayValue={participatingCountries}
                    bind:value={selectedCountries}
                >
                    <Combobox.Control class="combobox-control combobox-multiple">
                        <div class="combobox-pill-container">
                            {participatingCountries.value.map((country) => (
                                <span class="combobox-pill" key={country}>
                                    {country}
                                    <span
                                        onPointerDown$={() => {
                                            participatingCountries.value = participatingCountries.value.filter(
                                                (selectedCountry) => selectedCountry !== country,
                                            );
                                        }}
                                    >
                                        <LuX aria-hidden="true" />
                                    </span>
                                </span>
                            ))}
                        </div>
                        <Combobox.Input class="combobox-input" />
                        <Combobox.Trigger class="combobox-trigger">
                            <LuChevronDown class="combobox-icon" />
                        </Combobox.Trigger>
                    </Combobox.Control>
                    <Combobox.Popover class="combobox-popover select-max-height">
                        {countries.map((country) => (
                            <Combobox.Item value={country.name} class="combobox-item" key={country.name}>
                                <Combobox.ItemLabel class="text-lg">{`${country.flag} ${country.name}`}</Combobox.ItemLabel>
                                <Combobox.ItemIndicator>
                                    <LuCheck />
                                </Combobox.ItemIndicator>
                            </Combobox.Item>
                        ))}
                    </Combobox.Popover>
                </Combobox.Root>
            </div>

            <RadioGroup.Root class="mb-4">
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

            <div class="mb-4">
                <Input name="image_url" type="text" bind:value={file_example} />
            </div>

            <div class="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label for="description">Tags</Label>
                <Select.Root bind:displayValue={display} multiple class="select" name="tags">
                    <Select.Trigger class="select-trigger">
                        <Select.DisplayValue>{display.value.join(', ')}</Select.DisplayValue>
                    </Select.Trigger>
                    <Select.Popover class="select-popover select-max-height">
                        {tags.map((tag) => (
                            <Select.Item value={tag.id} class="select-item" key={tag.id}>
                                <Select.ItemLabel>{tag.name}</Select.ItemLabel>
                                <Select.ItemIndicator><LuCheck /></Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Popover>
                </Select.Root>
            </div>

            <input type="hidden" name="creator_id" value="2" />
            {display.value.map((item, index) => (
                <input type="hidden" name={`tags.${index}`} value={item}></input>
            ))}
            {selectedCountries.value.map((item, index) => (
                <input type="hidden" name={`countries.${index}`} value={item}></input>
            ))}

            <Button type="submit" class="modal-save w-full" onClick$={() => isLoading.value = true} disabled={isLoading.value}>
                {isLoading.value && <LuLoader2 class="mr-2 h-5 w-5 animate-spin" />}
                {isLoading.value ? <span>Creating Debate</span> : <span>Create Debate</span>}
            </Button>
        </Form>
    );
});
