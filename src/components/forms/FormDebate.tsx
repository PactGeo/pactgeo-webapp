import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { Form } from '@builder.io/qwik-city';
import styles from "./form.css?inline";
import { Input, Label, RadioGroup, Select, Textarea } from '~/components/ui';

interface FormDebateProps {
    action: any;
}

export default component$<FormDebateProps>((props) => {
    useStyles$(styles);
    const level_options = ['Mundial', 'Continental', 'Nacional', 'Provincial', 'Local'];
    const community_options = ['Community 1', 'Community 2', 'Community 3'];
    const title = useSignal('');
    const description = useSignal('');

    return (
        <Form action={props.action}>
            <div class="switch-container">
                <Label for="public">Public</Label>
                <input
                    type="checkbox"
                    role="switch"
                    name="public"
                />
            </div>

            <div class="input-group">
                <Label for="title">Title</Label>
                <input type="text" id="title" name="title" maxLength={100} placeholder="Title" bind:value={title} />
                <span class="char-counter">{title.value.length}/100</span>
            </div>

            <div class="input-group">
                <Label for="description">Description</Label>
                <Textarea name="description" placeholder="Description" maxLength={5000} bind:value={description} />
                <span class="char-counter">{description.value.length}/5000</span>
            </div>

            <div class="input-group">
                <Label for="file">Image/Video</Label>
                <input type="file" name="file" id="file" accept="image/*,video/*" />
            </div>


            <Select.Root>
                <Select.Label>Nivel Geográfico</Select.Label>
                <Select.Trigger>
                    <Select.DisplayValue placeholder="Select an option" />
                </Select.Trigger>
                <Select.Popover gutter={8}>
                    {level_options.map((level) => (
                    <Select.Item key={level}>
                        <Select.ItemLabel>{level}</Select.ItemLabel>
                        <Select.ItemIndicator>
                        <LuCheck />
                        </Select.ItemIndicator>
                    </Select.Item>
                    ))}
                </Select.Popover>
            </Select.Root>

            <Select.Root class="select">
                <Select.Label>Selecciona la comunidad</Select.Label>
                <Select.Trigger class="select-trigger">
                    <Select.DisplayValue placeholder="Select an option" />
                </Select.Trigger>
                <Select.Popover class="select-popover">
                    {community_options.map((community) => (
                        <Select.Item class="select-item" key={community}>
                            <Select.ItemLabel>{community}</Select.ItemLabel>
                            <Select.ItemIndicator>
                            <LuCheck />
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Popover>
            </Select.Root>

            <div class="input-group-inline">
                <Input type="number" min="1" placeholder="Min Characters" />
                <Input type="number" max="1000" placeholder="Max Characters" />
            </div>

            <input type="hidden" name="creator_id" value="1" />
            <button type="submit" class="modal-save">Create Debate</button>
        </Form>
    );
});

const LuCheck = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-check"
    >
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);
