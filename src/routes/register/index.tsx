import { component$ } from '@builder.io/qwik';

import SocialLoginButtons from '~/components/SocialLoginButtons';

export default component$(() => {
  return (
    <main>
      <section class="p-4">
        <div class="flex items-center justify-center">
          <div class="bg-white shadow-lg rounded-lg max-w-md w-96 p-6 space-y-4">
            <header class="text-center">
              <h1 class="text-2xl font-bold">Registrarse</h1>
            </header>
            <SocialLoginButtons />
            {/* <div class="flex items-center my-4">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="mx-4 text-gray-400">o</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>
            <SignInForm /> */}
          </div>
        </div>
      </section>
    </main>
  );
});