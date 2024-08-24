import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const community_name = useLocation().params.community_name
    return (
        <div>
            Comunidad: {community_name}
        </div>
    );
});
