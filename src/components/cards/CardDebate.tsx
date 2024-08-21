import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./card-debate.css?inline";

interface CardDebateProps {
    title: string;
    description: string;
    views_count: number;
    likes_count: number;
    dislikes_count: number;
    comments_count: number;
    creator_id: number;
    community_id: number;
    created_at: string;
    updated_at: string;
    last_comment_at: string;
    language: string;
    min_characters_per_comment: number;
    max_characters_per_comment: number;
}

export default component$<CardDebateProps>((props) => {
    useStyles$(styles);

    return (
        <div class="card-debate">
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <div class="metrics">
                <span><EyeIcon /> {props.views_count}K views</span>
                <span><ThumbsUpIcon /> {props.likes_count} likes</span>
                <span><ThumbsDownIcon /> {props.dislikes_count} dislikes</span>
                <span><MessageSquareIcon /> {props.comments_count} comments</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div class="details">
                    <h2>Details</h2>
                    <ul>
                        <li><UserIcon /> Created by {props.creator_id}</li>
                        <li><UsersIcon /> Community: {props.community_id}</li>
                        <li><CalendarIcon /> Created on {props.created_at}</li>
                        <li><CalendarIcon /> Last comment on {props.last_comment_at}</li>
                        <li><GlobeIcon /> Language: {props.language}</li>
                        <li><TagIcon /> Tags: environment, plastic, sustainability</li>
                        <li>Min Character Limit for Comments: {props.min_characters_per_comment} characters</li>
                        <li>Max Character Limit for Comments: {props.max_characters_per_comment} characters</li>
                    </ul>
                </div>
                <div class="points-of-view">
                    <h2>Points of View</h2>
                    <ul>
                        <li><LeafIcon />Ban single-use plastics to protect the environment</li>
                        <li><BriefcaseIcon />Maintain current policies to support businesses</li>
                    </ul>
                </div>
            </div>
            <div class="join-button">Unirse al Debate</div>
        </div>
    );
});

// Icon components using emojis
export const EyeIcon = component$(() => <>👁️</>);
export const ThumbsUpIcon = component$(() => <>👍</>);
export const ThumbsDownIcon = component$(() => <>👎</>);
export const MessageSquareIcon = component$(() => <>💬</>);
export const UserIcon = component$(() => <>👤</>);
export const UsersIcon = component$(() => <>👥</>);
export const CalendarIcon = component$(() => <>📅</>);
export const GlobeIcon = component$(() => <>🌐</>);
export const TagIcon = component$(() => <>🏷️</>);
export const LeafIcon = component$(() => <>🍃</>);
export const BriefcaseIcon = component$(() => <>💼</>);
