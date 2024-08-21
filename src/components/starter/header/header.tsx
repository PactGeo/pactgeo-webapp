import { component$ } from "@builder.io/qwik";
import { useSession, useSignOut } from '~/routes/plugin@auth';
import { QwikLogo } from "../icons/qwik";
import { Avatar } from "~/components/ui/avatar/avatar";
import { Popover } from "@qwik-ui/headless";
import styles from "./header.module.css";

interface LoggedInMenuProps {
  name?: string,
  email?: string;
  image?: string;
}

export const LoggedInMenu = component$<LoggedInMenuProps>((props) => {
  const signOut = useSignOut()
  return (
    <nav class="flex items-center space-x-4">
      <a href="/communities">Comunidades</a>
      <a href="/debates">Debates</a>
      <Popover.Root>
        <Popover.Trigger>
          {props.image
            ? (
              <Avatar.Root>
                <Avatar.Image src={props.image} alt={props.name} />
                <Avatar.Fallback>{props.name}</Avatar.Fallback>
              </Avatar.Root> 
            )
            : null
          }
        </Popover.Trigger>
        <Popover.Panel>
          <div>Mi perfil</div>
          <button onClick$={() => signOut.submit({ redirectTo: "/" })}>Cerrar sesion</button>
        </Popover.Panel>
      </Popover.Root>
    </nav>
  );
});

export const LoggedOutMenu = component$(() => {
  return (
    <div class="flex items-center space-x-4">
      <a href="/login" class="text-white hover:text-indigo-700 p-2 rounded">Iniciar Sesión</a>
      <a href="/register" class="text-white bg-indigo-600 text-white hover:bg-indigo-700 p-2 rounded">Registrarse</a>
    </div>
  );
});

export default component$(() => {
  const session = useSession();

  return (
    <header class={styles.header}>
      <div class={["py-4 px-8", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="qwik">
            <QwikLogo height={50} width={143} />
          </a>
        </div>
        {session.value?.user
          ? <LoggedInMenu
              name={session.value.user.name ?? ''}
              email={session.value.user.email ?? ''}
              image={session.value.user.image ?? ''}
            />
          : <LoggedOutMenu />
        }
      </div>
    </header>
  );
});
