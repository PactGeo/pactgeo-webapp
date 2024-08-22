import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$ } from '@builder.io/qwik-city';
import { Separator } from '~/components/ui';
import CardDebate from "~/components/cards/CardDebate";
import FormDebate from "~/components/forms/FormDebate";
import Modal from '~/components/modal/modal';

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

export const usePostDebate = routeAction$(async (props) => {
  console.log('DEBATE', props);
  // const response = await fetch('http://localhost:8000/debates', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: 'Basic c2ViYToxMjM0NTY='
  //   },
  //   body: JSON.stringify(props),
  // });
  // return (await response.json());
});

export default component$(() => {
  const getDebates = useGetDebates();
  const postDebate = usePostDebate();
  const debates = getDebates.value;
  console.log('debates', debates)

  return (
    <>
      <div class="container">
        <div class="flex justify-between items-end">
          <h1>Debates</h1>
          <Modal
            trigger="Nuevo debate"
            title="Crear Debate"
            description="Comparte el desafío más importante que enfrenta tu comunidad. Este es el lugar para iniciar conversaciones y encontrar soluciones juntos. Tu opinión cuenta y puede hacer la diferencia."
          >
            <FormDebate
              action={postDebate}
            />
          </Modal>
        </div>
        <Separator orientation="horizontal" class="separator-top" />
        {debates.length === 0 && <p>No debates found</p>}
        <ul>
          {debates.map((debate) => (
            <li key={`debate-${debate.id}`}>
              <CardDebate
                comments_count={debate.comments_count}
                community_id={debate.community_id}
                created_at={debate.created_at}
                creator_id={debate.creator_id}
                description={debate.description}
                dislikes_count={debate.dislikes_count}
                language={debate.language}
                last_comment_at={debate.last_comment_at}
                likes_count={debate.likes_count}
                max_characters_per_comment={debate.max_characters_per_comment}
                min_characters_per_comment={debate.min_characters_per_comment}
                title={debate.title}
                updated_at={debate.updated_at}
                views_count={debate.views_count}
              />
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