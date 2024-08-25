import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city';
import { Separator } from '~/components/ui';
import ListDebates from "~/components/list/ListDebates";

export const useGetGlobalDebates = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/debates', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    return (await response.json()) as Array<{
        id: string;
        title: string;
        description: string;
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        comments_count: number;
        creator_id: number;
        community_id: number;
        created_at: string;
        updated_at: string;
        last_comment_at: string;
        language: string;
        min_characters_per_comment: number;
        max_characters_per_comment: number
    }>;
});

export const useGetInternationalDebates = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/debates', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    return (await response.json()) as Array<{
        id: string;
        title: string;
        description: string;
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        comments_count: number;
        creator_id: number;
        community_id: number;
        created_at: string;
        updated_at: string;
        last_comment_at: string;
        language: string;
        min_characters_per_comment: number;
        max_characters_per_comment: number
    }>;
});

export const useGetNationalDebates = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/debates', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    return (await response.json()) as Array<{
        id: string;
        title: string;
        description: string;
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        comments_count: number;
        creator_id: number;
        community_id: number;
        created_at: string;
        updated_at: string;
        last_comment_at: string;
        language: string;
        min_characters_per_comment: number;
        max_characters_per_comment: number
    }>;
});

export const useGetLocalDebates = routeLoader$(async () => {
    const response = await fetch('http://localhost:8000/debates', {
        headers: {
            Accept: 'application/json',
            Authorization: 'Basic c2ViYToxMjM0NTY='
        },
    });
    return (await response.json()) as Array<{
        id: string;
        title: string;
        description: string;
        views_count: number;
        likes_count: number;
        dislikes_count: number;
        comments_count: number;
        creator_id: number;
        community_id: number;
        created_at: string;
        updated_at: string;
        last_comment_at: string;
        language: string;
        min_characters_per_comment: number;
        max_characters_per_comment: number
    }>;
});

export const usePostDebate = routeAction$(
    async (debate) => {
        console.log('DEBATE', debate);
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
        level: z.string().optional(),
    })
);

export default component$(() => {
    const globalDebates = useGetGlobalDebates();
    const internationalDebates = useGetInternationalDebates();
    const nationalDebates = useGetNationalDebates();
    const localDebates = useGetLocalDebates();

    return (
        <>
            <div class="container">
                <ListDebates
                    title="Global Debates"
                    debates={globalDebates.value}
                />
                <Separator orientation="horizontal" class="separator-top my-6" />
                <ListDebates
                    title="International Debates"
                    debates={internationalDebates.value}
                />
                <Separator orientation="horizontal" class="separator-top my-6" />
                <ListDebates
                    title="National Debates"
                    debates={nationalDebates.value}
                />
                <Separator orientation="horizontal" class="separator-top my-6" />
                <ListDebates
                    title="Local Debates"
                    debates={localDebates.value}
                />
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};