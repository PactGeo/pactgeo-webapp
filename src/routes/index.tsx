import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city';
import { Separator } from '~/components/ui';
import CardDebate from "~/components/cards/CardDebate";
import FormDebate from "~/components/forms/FormDebate";
import Modal from '~/components/modal/modal';
import { useSession } from "./plugin@auth";

export const useGetDebates = routeLoader$(async () => {
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
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }).min(10, { message: "Must be 10 or more characters long" }).max(100, { message: "Must be 100 or fewer characters long" }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }).max(5000, { message: "Must be 5000 or fewer characters long" }),
    level: z.string().optional(),
  })
);

export default component$(() => {
  const getDebates = useGetDebates();
  const postDebate = usePostDebate();
  const session = useSession();
  const debates = getDebates.value;

  return (
    <>
      <div class="container">
        <div class="flex justify-between items-end">
          <h1>Debates</h1>
          {session.value?.user ? (
            <Modal
              trigger="New"
              title="New Debate"
              description="Share the most important challenge facing your community."
            >
              <FormDebate
                action={postDebate}
              />
            </Modal>
          ):(
            <Modal
              trigger="New"
              title="Debes iniciar sesion"
              description="Debes iniciar sesion para crear un nuevo debate"
            >
              <button>Iniciar sesion</button>
            </Modal>
          )}
        </div>
        <Separator orientation="horizontal" class="separator-top my-2" />
        {debates.length === 0 && <p>No debates found</p>}
        <ul>
          {debates.map((debate) => (
            <li key={`debate-${debate.id}`}>
              <CardDebate debate={debate}/>
            </li>
          ))}
        </ul>
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