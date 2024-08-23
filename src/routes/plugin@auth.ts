import { QwikAuth$ } from "@auth/qwik";
import GitHub from "@auth/qwik/providers/github";

export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  () => ({
    providers: [GitHub],
    callbacks: {
      async session(objeto) {
        // console.log('objeto', objeto)
        return objeto.session
      },
      async signIn(objeto) {
        // console.log('objeto', objeto)
        return true
      }
    }
  }),
);
