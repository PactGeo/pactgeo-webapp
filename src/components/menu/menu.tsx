import { component$, useStyles$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import styles from './menu.css?inline';
import { LuFlag, LuGlobe, LuGlobe2, LuHome, LuLandmark, LuMap, LuMapPin, LuMessageCircle, LuMessageSquare, LuThumbsUp } from '@qwikest/icons/lucide';
import { cn } from '@qwik-ui/utils';
import { Separator } from '~/components/ui';

interface MenuProps {
    class?: string;
}

export default component$<MenuProps>((props) => {
    useStyles$(styles);
    const { url } = useLocation();

    const menuItems = [
        { name: 'Home', path: '/', icon: <LuHome /> }
    ];

    const menuItems2 = [
        { name: 'Global', path: '/debates/global/', icon: <LuGlobe /> },
        { name: 'International', path: '/debates/international/', icon: <LuGlobe2 /> },
        { name: 'Nationals', path: '/debates/nationals/', icon: <LuFlag /> },
        { name: 'SubNationals', path: '/debates/subnationals/', icon: <LuMap /> },
        { name: 'Locales', path: '/debates/locales/', icon: <LuLandmark /> },
    ]

    const menuItems3 = [
        { name: 'America', path: '/continents/america/', icon: <LuHome /> },
        { name: 'Argentina', path: '/countries/argentina/', icon: <LuHome /> },
        { name: 'Buenos Aires', path: '/countries/argentina/buenos-aires/', icon: <LuHome /> },
        { name: 'Miramar', path: '/countries/argentina/buenos-aires/miramar/', icon: <LuHome /> },
    ]
    
    const menuItems4 = [
        { name: 'Mis Debates', path: '/mis-debates/', icon: <LuMessageSquare /> },
        { name: 'Mis Comentarios', path: '/mis-comentarios/', icon: <LuMessageCircle /> },
        { name: 'Mis Votos', path: '/mis-votos/', icon: <LuThumbsUp /> },
    ]

    return (
        <nav class={cn('bg-white w-64 shadow-lg h-full overflow-y-auto sticky top-20', props.class)}>
            <ul class='m-2 pl-0'>
                {menuItems.map(item => (
                    <li
                        key={item.path}
                        class={cn(
                            'p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-lg',
                            url.pathname === item.path ? 'bg-gray-300 font-extrabold' : ''
                        )}
                    >
                        <Link href={item.path} class="flex gap-2 items-center text-slate-500 rounded-lg">
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Separator orientation="horizontal" class="separator-top my-2" />
            <h3 class='m-2 text-lg text-gray-700 font-bold'>
                Debates
            </h3>
            <ul class='m-2 pl-0'>
                {menuItems2.map(item => (
                    <li
                        key={item.path}
                        class={cn(
                            'p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-lg',
                            url.pathname === item.path ? 'bg-gray-300 font-extrabold' : ''
                        )}
                    >
                        <Link href={item.path} class="flex gap-2 items-center text-slate-500 rounded-lg">
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Separator orientation="horizontal" class="separator-top my-2" />
            <h3 class='m-2 text-lg text-gray-700 font-bold'>
                Mis Comunidades
            </h3>
            <ul class='m-2 pl-0'>
                {menuItems3.map(item => (
                    <li
                        key={item.path}
                        class={cn(
                            'p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-lg',
                            url.pathname === item.path ? 'bg-gray-300 font-extrabold' : ''
                        )}
                    >
                        <Link href={item.path} class="flex gap-2 items-center text-slate-500 rounded-lg">
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Separator orientation="horizontal" class="separator-top my-2" />
            <h3 class='m-2 text-lg text-gray-700 font-bold'>
                Mis Aportes
            </h3>
            <ul class='m-2 pl-0'>
                {menuItems4.map(item => (
                    <li
                        key={item.path}
                        class={cn(
                            'p-2 text-lg text-gray-700 hover:bg-gray-100 rounded-lg',
                            url.pathname === item.path ? 'bg-gray-300 font-extrabold' : ''
                        )}
                    >
                        <Link href={item.path} class="flex gap-2 items-center text-slate-500 rounded-lg">
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
});
