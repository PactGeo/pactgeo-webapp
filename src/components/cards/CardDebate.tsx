import { $, component$, useComputed$, useStylesScoped$ } from "@builder.io/qwik";
import { LuCalendar, LuMessageSquare, LuUser, LuTag } from '@qwikest/icons/lucide';
import styles from "./card-debate.css?inline";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { getFlagByName, timeAgo } from "~/utils";
import { Tooltip } from "@qwik-ui/headless";
// import {Cloudinary} from "@cloudinary/url-gen";

interface CardDebateProps {
    title: string;
    description: string;
    images: string;
    creator_username: string;
    created_at: string;
    comments_count: number;
    last_comment_at: string;
    tags: string[];
    slug: string;
    countries_involved?: string[];
}

export default component$<CardDebateProps>(({ title, description, images, creator_username, created_at, comments_count, last_comment_at, tags, countries_involved, slug }) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const onClickUsername = $((username: string) => nav(`/profile/${username}`))
    
    // const cld = new Cloudinary({
    //     cloud: {
    //         cloudName: 'dpyuro6gf'
    //     }
    // });
    // const myImage = cld.image('_DSC0346_jknwxs');
    const myImage = images?.[0]

    return (
        <Link href={`/debates/${slug}`}>
            <div class="border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
                <div class="mb-2">
                    {myImage && (
                        <Image
                            alt={title}
                            class="w-full h-48 object-cover rounded-t-lg"
                            src={myImage}
                            // src={myImage.toURL()}
                            height="576"
                            width="864"
                        />
                    )}
                    <h2 class="mt-2 px-2 text-xl font-semibold text-gray-800">{title}</h2>
                    <p class="px-2 text-gray-600 my-2 text-sm">{description}</p>
                </div>
                <div class="my-2 px-2 flex flex-wrap gap-2">
                    {countries_involved?.map((country) => (
                        <span key={country} class="text-lg">
                            <Tooltip.Root gutter={4} flip>
                                <Tooltip.Trigger>
                                    {getFlagByName(country)}
                                </Tooltip.Trigger>
                                <Tooltip.Panel class="tooltip-panel">{country}</Tooltip.Panel>
                            </Tooltip.Root>
                        </span>
                    ))}
                </div>
                <div class="my-2 px-2 flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span key={tag} class="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                            <LuTag class="inline-block mr-1" /> {tag}
                        </span>
                    ))}
                </div>
                <div class="px-2 my-2 flex justify-between items-center text-gray-500 text-sm">
                    <div>
                        <div onClick$={() => onClickUsername(creator_username)}>
                            <span class="flex items-center">
                                <LuUser class="mr-1" />
                                {creator_username}
                            </span>
                        </div>
                        <span class="flex items-center mt-1">
                            <LuCalendar class="mr-1" />
                            {timeAgo(new Date(created_at))}
                        </span>
                    </div>
                    <div class="text-right">
                        <span class="flex items-center">
                            <LuMessageSquare class="mr-1" />
                            {comments_count ?? 0} comments
                        </span>
                        {last_comment_at && <span class="flex items-center mt-1">
                            <LuCalendar class="mr-1" />
                            Last comment: {timeAgo(new Date(last_comment_at))}
                        </span>}
                    </div>
                </div>
            </div>
        </Link>
    );
});
