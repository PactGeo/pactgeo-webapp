import { $, component$, useComputed$, useStylesScoped$ } from "@builder.io/qwik";
import { LuCalendar, LuMessageSquare, LuUser, LuTag } from '@qwikest/icons/lucide';
import styles from "./card-debate.css?inline";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { timeAgo } from "~/utils";

interface CardDebateProps {
    title: string;
    description: string;
    image: string;
    creator_username: string;
    created_at: string;
    comments_count: number;
    last_comment_at: string;
    tags: string[];
}

export default component$<CardDebateProps>(({ title, description, image, creator_username, created_at, comments_count, last_comment_at, tags }) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const onClickUsername = $((username: string) => nav(`/profile/${username}`))
    
    return (
        <Link href="/debates/title-slugged">
            <div class="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow bg-white">
                <div class="mb-4">
                    <h2 class="text-xl font-semibold text-gray-800">{title}</h2>
                    {image && (
                        <Image
                            alt={title}
                            class="w-full h-48 object-cover mt-4 rounded-lg"
                            src={image}
                            height="576"
                            width="864"
                        />
                    )}
                    <p class="text-gray-600 mt-2 text-sm">{description}</p>
                </div>
                <div class="flex justify-between items-center text-gray-500 text-sm">
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
                        <span class="flex items-center mt-1">
                            <LuCalendar class="mr-1" />
                            Last comment: {timeAgo(new Date(last_comment_at))}
                        </span>
                    </div>
                </div>
                <div class="mt-4 flex flex-wrap gap-2">
                    {tags?.map((tag) => (
                        <span key={tag} class="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                            <LuTag class="inline-block mr-1" /> {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
});
