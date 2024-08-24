import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const slug = useLocation().params.slug
    return (
        <div>
            slug: {slug}
        </div>
    );
});
