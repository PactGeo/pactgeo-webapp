import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
 
// The function passed to routeLoader$ is invoked on the server eagerly before any component is rendered and is responsible for loading data.
export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});
 
export default component$(() => {
  const loc = useLocation();
  return (
    <section class="section bright">
      <p>Hello {loc.params.username}!</p>
    </section>
  );
});