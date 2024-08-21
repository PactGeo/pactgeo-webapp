import { component$, useSignal } from '@builder.io/qwik';
import RegisterForm from './RegisterForm';
import SocialRegisterButtons from './SocialRegisterButtons';

export default component$(() => {
  const showForm = useSignal(false);

  return (
    <div class="flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-lg max-w-md w-full p-6 space-y-4">
        <header class="text-center">
          <button class="absolute left-4 top-4 text-gray-500 hover:text-gray-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m6 0l-6 6m6-6l-6-6" />
            </svg>
          </button>
          <h1 class="text-2xl font-bold">Registrarse</h1>
          <p class="mt-2">¿Prefieres <a href="/login" class="text-blue-500 hover:underline">iniciar sesión</a>?</p>
        </header>
        <SocialRegisterButtons />
        {/* <div class="flex items-center my-4">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-gray-400">o</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>
        {!showForm.value ? (
          <button
            onClick$={() => (showForm.value = true)}
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrarse con email
          </button>
        ) : (
          <RegisterForm />
        )} */}
        <div class="text-center text-sm text-gray-500">
          <p>
            Al elegir registrarte, estás aceptando nuestros{' '}
            <a href="/terms-of-service" class="text-blue-500 hover:underline">
              Términos de servicio
            </a>
            . Descubre cómo procesamos los datos personales y utilizamos cookies y tecnologías similares en nuestra{' '}
            <a href="/privacy-policy" class="text-blue-500 hover:underline">
              Política de privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
});
