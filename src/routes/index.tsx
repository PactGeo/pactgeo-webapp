import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$, routeAction$, Form } from '@builder.io/qwik-city';
import CardDebate from "~/components/cards/CardDebate";
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

  const title = useSignal('')
  const description = useSignal('')
  return (
    <>
      <div class="container">
        <h1>Debates</h1>
        <Modal
          trigger="Nuevo debate"
          title="Crear Debate"
          description="Comparte el desafío más importante que enfrenta tu comunidad. Este es el lugar para iniciar conversaciones y encontrar soluciones juntos. Tu opinión cuenta y puede hacer la diferencia."
        >
          <Form action={postDebate}>
            <div class="input-group">
              <input type="text" name="title" maxLength={100} placeholder="Title" bind:value={title} />
              <span class="char-counter">{title.value.length}/100</span>
            </div>
            <input type="file" accept="image/*,video/*" />
            <div class="input-group">
              <input type="textarea" name="description" maxLength={100} placeholder="Description" bind:value={description} /><br />
              <span class="char-counter">{description.value.length}/5000</span>
            </div>
            <input type="radio" name="public" value="true" /> Public <br />
            <input type="radio" name="public" value="false" /> Private <br />
            <label for="level">Nivel Geográfico</label>
            <select id="level">
                <option value="world">Mundial</option>
                <option value="continent">Continente</option>
                <option value="country">País</option>
                <option value="city">Ciudad</option>
            </select>
            <select name="community_id">
              <option value="1">Community 1</option>
              <option value="2">Community 2</option>
              <option value="3">Community 3</option>
            </select>
            <input type="number" min="1" placeholder="Min Characters" />
            <input type="number" max="1000" placeholder="Max Characters" />
            <input type="hidden" name="creator_id" value="1" />
            <button type="submit" class="text-black">Create Debate</button>
          </Form>
        </Modal>
        {debates.length === 0 && <p>No debates found</p>}
        <ul>
          {debates.map((debate) => (
            <li key={`debate-${debate.id}`}>
              <CardDebate
                title={debate.title}
                description={debate.description}
                views_count={debate.views_count}
                likes_count={debate.likes_count}
                dislikes_count={debate.dislikes_count}
                comments_count={debate.comments_count}
                creator_id={debate.creator_id}
                community_id={debate.community_id}
                created_at={debate.created_at}
                updated_at={debate.updated_at}
                last_comment_at={debate.last_comment_at}
                language={debate.language}
                min_characters_per_comment={debate.min_characters_per_comment}
                max_characters_per_comment={debate.max_characters_per_comment}
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