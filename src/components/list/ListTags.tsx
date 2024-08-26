import { component$, useSignal, useStyles$ } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { LuChevronRightCircle } from "@qwikest/icons/lucide";
import { Button } from "~/components/ui";
import styles from "./list-tags.css?inline";

interface ListTagsProps {
    tags: { id: string, name: string }[];
}

export default component$<ListTagsProps>(({ tags }) => {
    useStyles$(styles);

    const selectedTag = useSignal('all');

    return (
        <div class="relative mb-2">
            <div class="">
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
            <div class="absolute right-0 top-0 h-full flex items-center bg-gradient-to-l from-white to-transparent">
                <LuChevronRightCircle />
            </div>
        </div>
    );
});
