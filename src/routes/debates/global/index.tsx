import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city';
import ListGlobalDebates from "~/components/list/ListGlobalDebates";
import ListTags from "~/components/list/ListTags";

export const useGetGlobalDebates = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/debates?debate_type=GLOBAL', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    console.log('=====================================================================================')
    // console.log('response: ', response)
    return (await response.json()) as Array<{
        id: string;
        type: string;
        title: string;
        slug: string;
        description: string;
        image_url: string;
        public: boolean;
        status: string;
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        last_comment_at: string;
        language: string;
        creator_id: number;
        creator_username: string;
        created_at: string;
        updated_at: string;
    }>;
});

export const usePostDebate = routeAction$(
    async (debate) => {
        console.log('usePostDebate: ', debate)
        const response = await fetch('http://localhost:8000/debates', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic c2ViYToxMjM0NTY='
            },
            body: JSON.stringify(debate),
        });
        return (await response.json());
    },
    zod$({
        public: z.string().optional(),
        title: z
            .string()
            .min(5, { message: "Title must be at least 5 characters long" })
            .max(100, { message: "Title must be 100 characters or less" }),
        description: z.string({
            required_error: "Description is required",
            invalid_type_error: "Description must be a string",
        }).max(5000, { message: "Must be 5000 or fewer characters long" }),
        creator_id: z.string(),
        community_id: z.string(),
        image_url: z.string(),
        type: z.string(),
        tags: z.array(z.string()).optional(),
        status: z.string(),
    })
);

export const useGetTags = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/tags', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    return (await response.json()) as Array<{
        id: string;
        name: string;
    }>;
});

export default component$(() => {
    const globalDebates = useGetGlobalDebates();
    // console.log('globalDebates', globalDebates.value)
    const tags = useGetTags();
    return (
        <div>
            <ListTags tags={tags.value} />
            <ListGlobalDebates
                tags={tags.value}
                title="Global Debates"
                debates={globalDebates.value}
            />
        </div>
    );
});

export const head: DocumentHead = {
    title: "Global Debate",
    meta: [
        {
            name: "description",
            content: "Global Debate description",
        },
    ],
};