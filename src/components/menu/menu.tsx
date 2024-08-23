import { component$, useStyles$ } from "@builder.io/qwik";
import { useContent, useLocation } from "@builder.io/qwik-city";
import styles from "./menu.css?inline";

export default component$(() => {
    const { menu } = useContent();
    const { url } = useLocation();
    useStyles$(styles);
    return (
        <nav class="menu">
            {menu
                ? menu.items?.map((item, index) => (
                    <div key={index}>
                        <h5>{item.text}</h5>
                        <ul>
                            {item.items?.map((item, subIndex) => (
                                <li key={`item-${index}-${subIndex}`}>
                                    <a
                                        href={item.href}
                                        class={{
                                            'is-active': url.pathname === item.href,
                                        }}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
                : null}
        </nav>
    );
});
