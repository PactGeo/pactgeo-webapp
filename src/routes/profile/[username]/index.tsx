import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
    const username = useLocation().params.username
    return (
        <div>
            username: {username}
        </div>
    );
});
