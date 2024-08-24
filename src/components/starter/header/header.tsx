import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useSession, useSignOut } from '~/routes/plugin@auth';
import { QwikLogo } from "../icons/qwik";
import { Avatar } from "~/components/ui/avatar/avatar";
import { Popover } from "@qwik-ui/headless";
import styles from "./header.css?inline";
import { Button } from "~/components/ui";
import { Link, useNavigate } from "@builder.io/qwik-city";

interface LoggedInMenuProps {
  name?: string,
  email?: string;
  image?: string;
}

export const LoggedInMenu = component$<LoggedInMenuProps>((props) => {
  const signOut = useSignOut()
  const navItems = [
    { label: 'Communities', href: '/communities' },
    { label: 'Debates', href: '/debates' },
  ];
  const nav = useNavigate();
  return (
    <nav class="flex flex-row flex-nowrap">
      {navItems.map((navItem) => (
        <Link
          href={navItem.href}
          key={navItem.label}
        >
          <Button
            aria-label={navItem.label}
            class="mr-2 -ml-0.5 text-white bg-transparent hover:bg-purple-700 active:bg-purple-800 active:text-white transition-colors duration-300 ease-in-out"
            look="link"
          >
            {navItem.label}
          </Button>
        </Link>
      ))}
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
  const navItems = [
    { label: 'Login', href: '/login' },
    { label: 'Sign Up', href: '/register' },
  ];
  const nav = useNavigate();
  return (
    <nav class="flex flex-row flex-nowrap">
      {navItems.map((navItem) => (
        <Button
          aria-label={navItem.label}
          class="text-white hover:bg-indigo-500 p-2 rounded"
          key={navItem.label}
          look="link"
          onClick$={() => nav(navItem.href)}
        >
          {navItem.label}
        </Button>
      ))}
    </nav>
  );
});

export default component$(() => {
  useStylesScoped$(styles);
  const session = useSession();

  return (
    <div class="w-full h-full bg-neutral-50">
      <header class="flex justify-center w-full text-white border-0 bg-primary-700 h-14 md:h-20 border-neutral-200">
        <div class="flex items-center flex-row flex-nowrap justify-start h-full max-w-[1536px] w-full px-4 md:px-10">
          <a href="/" aria-label="SF Homepage" class="inline-block text-white mr-auto">
            <QwikLogo height={50} width={143} />
          </a>

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
    </div>
  );
});
