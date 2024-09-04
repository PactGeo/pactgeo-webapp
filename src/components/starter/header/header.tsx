import { component$, useStyles$, useStylesScoped$ } from "@builder.io/qwik";
import { useSession, useSignOut } from '~/routes/plugin@auth';
import { Avatar } from "~/components/ui/avatar/avatar";
import styles from "./header.css?inline";
import { Button, Popover } from "~/components/ui";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { ThemeSwitch } from "~/components/ThemeSwitch/ThemeSwitch";
import Logo from '~/media/icons/logo.svg?jsx';
interface LoggedInMenuProps {
  name?: string,
  email?: string;
  image?: string;
}

export const LoggedInMenu = component$<LoggedInMenuProps>((props) => {
  useStyles$(styles);
  const signOut = useSignOut()
  const navItems = [
    { label: 'Communities', href: '/communities' },
  ];
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
      <Popover.Root flip={false}>
        <Popover.Trigger class="popover-trigger">
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
        <Popover.Panel class="popover-panel popover-animation">
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
    <div class="w-full h-full container-header">
      <header class="flex justify-center w-full text-white border-0 bg-primary-700 h-14 md:h-20 border-neutral-200">
        <div class="flex items-center flex-row flex-nowrap justify-start h-full w-full px-4 md:px-10">
          <a href="/" aria-label="SF Homepage" class="inline-block text-white mr-auto">
            <Logo style={{ width: '64px', height: '64px'}} />
          </a>

          <ThemeSwitch />

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
