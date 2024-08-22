import { component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from "~/routes/layout";
import {
  SfButton,
  SfIconFacebook,
  SfIconInstagram,
  SfIconPinterest,
  SfIconTwitter,
  SfIconYoutube,
  SfLink,
  SfListItem,
} from 'qwik-storefront-ui';
import { QwikLogo } from '~/components/starter/icons/qwik';

const categories = [
  {
    label: 'How to buy',
    subcategories: [
      {
        subcategoryLabel: 'Conflictos internacionales',
        link: '/payment-methods',
      },
      {
        subcategoryLabel: 'Politicas Exteriores',
        link: '/order',
      },
      {
        subcategoryLabel: 'Relaciones de Poder',
        link: '/purchase',
      },
      {
        subcategoryLabel: 'Recursos Naturales y Economia Mundial',
        link: '/track',
      },
      {
        subcategoryLabel: 'Returns',
        link: '/returns',
      },
    ],
  },
  {
    label: 'Help',
    subcategories: [
      {
        subcategoryLabel: 'Help centers',
        link: '/help',
      },
      {
        subcategoryLabel: 'Security & fraud',
        link: '/security',
      },
      {
        subcategoryLabel: 'Feedback',
        link: '/feedback',
      },
      {
        subcategoryLabel: 'Contact',
        link: '/contact',
      },
    ],
  },
  {
    label: 'Services',
    subcategories: [
      {
        subcategoryLabel: 'Gift cards',
        link: '/gift',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '/order',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '/purchase',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '/track',
      },
    ],
  },
  {
    label: 'About',
    subcategories: [
      {
        subcategoryLabel: 'About us',
        link: '/about',
      },
      {
        subcategoryLabel: 'Order pickup',
        link: '/order',
      },
      {
        subcategoryLabel: 'Purchase status',
        link: '/purchase',
      },
      {
        subcategoryLabel: 'Track orders',
        link: '/track',
      },
      {
        subcategoryLabel: 'Returns',
        link: '/returns',
      },
    ],
  },
];
const socialMedia = [
  {
    label: 'Facebook',
    link: '/facebook',
    icon: () => <SfIconFacebook />,
  },
  {
    label: 'Twitter',
    link: '/twitter',
    icon: () => <SfIconTwitter />,
  },
  {
    label: 'Instagram',
    link: '/instagram',
    icon: () => <SfIconInstagram />,
  },
  {
    label: 'Pinterest',
    link: '/pinterest',
    icon: () => <SfIconPinterest />,
  },
  {
    label: 'Youtube',
    link: '/youtube',
    icon: () => <SfIconYoutube />,
  },
];
const bottomLinks = [
  {
    label: 'Terms',
    link: '/terms-of-service',
  },
  {
    label: 'Privacy policy',
    link: '/privacy-policy',
  },
];
export default component$(() => {
  const serverTime = useServerTimeLoader();
  const dateObject = new Date(serverTime.value.date)
  const currentYear = dateObject.getFullYear()
  return (
    <footer class="pt-10 bg-neutral-100 mt-auto">
      <div class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(4,1fr)] px-4 md:px-6 pb-10 max-w-[1536px] mx-auto">
        {categories.map(({ label, subcategories }) => (
          <div class="grid grid-cols xs:pb-4" key={label}>
            <div class="ml-4 text-lg font-medium leading-7 text-neutral-900 font-body">
              {label}
            </div>
            {subcategories?.map(({ subcategoryLabel, link }) => (
              <SfListItem
                class="py-2 !bg-transparent typography-text-sm font-body"
                key={subcategoryLabel}
              >
                <SfLink
                  class="no-underline text-neutral-600 hover:underline hover:!text-neutral-900 active:underline active:!text-neutral-900"
                  variant="secondary"
                  href={link}
                >
                  {subcategoryLabel}
                </SfLink>
              </SfListItem>
            ))}
          </div>
        ))}
      </div>
      <hr />
      <div class="bg-neutral-900 justify-end px-4 py-10 md:flex md:py-6 max-w-[1536px] mx-auto">
        <div class="flex justify-center py-2 gap-x-4 md:self-start">
          {socialMedia.map(({ icon: Icon, label, link }) => (
            <SfButton
              key={label}
              square
              as="a"
              variant="tertiary"
              class="text-white active:text-white hover:text-white hover:!bg-neutral-500 active:bg-transparent"
              href={link}
              aria-label={`Go to ${label} page`}
            >
              <Icon />
            </SfButton>
          ))}
        </div>
        <div class="flex items-center justify-center gap-6 py-2 my-4 md:ml-auto md:my-0">
          {bottomLinks.map(({ label, link }) => (
            <SfLink
              key={label}
              variant="secondary"
              class="text-white no-underline typography-text-sm active:text-white active:underline hover:text-white hover:underline"
              href={link}
            >
              {label}
            </SfLink>
          ))}
        </div>
        <p class="flex items-center justify-center py-2 leading-5 text-center typography-text-sm text-white/50 font-body md:ml-6">
          <span>Made with <QwikLogo height={25} width={70} /> by SC</span>
          <span>@{currentYear} Geocovenant</span>
        </p>
      </div>
    </footer>
  );
});

