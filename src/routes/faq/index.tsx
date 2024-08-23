import { component$ } from '@builder.io/qwik';
import { Accordion } from '~/components/ui';

export default component$(() => {
    const accordionItems = [
        {
            id: 'acc-1',
            summary: 'Where is my order?',
            details:
                'We will inform you about the expected delivery time of your order in checkout and in your order confirmation email.',
        },
        {
            id: 'acc-2',
            summary: 'What if an item is out of stock?',
            details:
                "If an item you're interested in is sold out, you can register to be notified when your size is back in stock.",
        },
        {
            id: 'acc-3',
            summary: 'How do I cancel my order?',
            details:
                "If you made a mistake or simply changed your mind after placing an order, there's no need to fuss. As long as your parcel has yet to be picked and packed in our warehouse, you'll have the option to cancel.",
        },
    ];
    return (
        <Accordion.Root class="w-full">
            {accordionItems.map((item) => (
                <Accordion.Item>
                    <Accordion.Trigger>{item.summary}</Accordion.Trigger>
                    <Accordion.Content>{item.details}</Accordion.Content>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
});
