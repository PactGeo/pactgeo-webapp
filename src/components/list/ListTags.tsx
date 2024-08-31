import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { LuChevronLeft, LuChevronRight } from "@qwikest/icons/lucide";
import styles from "./list-tags.css?inline";

interface ListTagsProps {
    tags: { id: string, name: string }[];
}

export default component$<ListTagsProps>(({ tags }) => {
    useStyles$(styles);

    const selectedTag = useSignal('all');
    const scrollContainer = useSignal<Element>();
    const isAtStart = useSignal(true);
    const isAtEnd = useSignal(false);

    const handleScrollRight = $(() => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollBy({ left: 200, behavior: 'smooth' });
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
            isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 60;
            isAtStart.value = scrollLeft <= 60;
        }
    });

    const handleScrollLeft = $(() => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' });
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
            isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 60;
            isAtStart.value = scrollLeft <= 60;
        }
    });

    return (
        <div class="flex mb-2">
            {!isAtStart.value && (
                <div
                    class="scroll-button scroll-button-left"
                    onClick$={handleScrollLeft}
                >
                    <LuChevronLeft />
                </div>
            )}
            <div
                class="list-tags-container hide-scroll-bar"
                ref={scrollContainer}
            >
                <button
                    class={`button-tag ${selectedTag.value === 'all' ? 'active' : ''}`}
                    onClick$={() => selectedTag.value = 'all'}
                >
                    All
                </button>
                {tags.map((tag) => (
                    <button
                        class={`button-tag ${selectedTag.value === tag.name ? 'active' : ''}`}
                        key={tag.id}
                        onClick$={() => selectedTag.value = tag.name}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
            {!isAtEnd.value && (
                <div
                    class="scroll-button scroll-button-right"
                    onClick$={handleScrollRight}
                >
                    <LuChevronRight />
                </div>
            )}
        </div>
    );
});
