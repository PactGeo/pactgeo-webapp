import { component$, useSignal } from "@builder.io/qwik";
import { cn } from "@qwik-ui/utils";
import { Button } from "~/components/ui";

interface ListTagsProps {
    tags: { id: string, name: string }[];
}

export default component$<ListTagsProps>(({ tags }) => {
    const selectedTag = useSignal('all')

    return (
        <div class="mb-2">
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
    );
});