import { $, component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { LuChevronLeft, LuChevronRight } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui";
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
            if (scrollContainer.value) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
                isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 60;
                isAtStart.value = scrollLeft <= 60;
            }
        }
    });

    const handleScrollLeft = $(() => {
        if (scrollContainer.value) {
            scrollContainer.value.scrollBy({ left: -200, behavior: 'smooth' });
            if (scrollContainer.value) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
                isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 60;
                isAtStart.value = scrollLeft <= 60;
            }
        }
    });


    return (
        <div class="flex mb-2">
            {!isAtStart.value && (
                <div
                    class="flex items-center p-3 ml-2 bg-gradient-to-r rounded-full cursor-pointer hover:bg-slate-200"
                    onClick$={handleScrollLeft}
                >
                    <LuChevronLeft />
                </div>
            )}
            <div
                class="flex items-center space-x-2 overflow-x-auto hide-scroll-bar"
                ref={scrollContainer}
            >
                <Button
                    class={cn(
                        "bg-gray-100 text-black rounded-md px-4 py-2 m-1 flex-shrink-0 hover:bg-gray-200 focus:outline-none",
                        selectedTag.value === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
                    )}
                    size="sm"
                    key="all"
                    onClick$={() => selectedTag.value = 'all'} 
                >
                    All
                </Button>
                {tags.map((tag) => (
                    <Button
                        class={cn(
                            "bg-gray-100 text-black rounded-md px-4 py-2 m-1 flex-shrink-0 hover:bg-gray-200 focus:outline-none",
                            selectedTag.value === tag.name ? 'bg-black text-white' : 'bg-gray-100 text-black hover:bg-gray-200'
                        )}
                        size="sm"
                        key={tag.id}
                        onClick$={() => selectedTag.value = tag.name} 
                    >
                        {tag.name}
                    </Button>
                ))}
            </div>
            {!isAtEnd.value && (
                <div
                    class="flex items-center p-3 mr-2 bg-gradient-to-l rounded-full cursor-pointer hover:bg-slate-200"
                    onClick$={handleScrollRight}
                >
                    <LuChevronRight />
                </div>
            )}
        </div>
    );
});
