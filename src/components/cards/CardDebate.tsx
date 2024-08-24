import { component$, useStyles$ } from "@builder.io/qwik";
import { LuEye, LuThumbsUp, LuThumbsDown, LuMessageSquare, LuUser, LuUsers, LuCalendar, LuGlobe, LuTag, LuLeaf, LuBriefcase } from '@qwikest/icons/lucide';
import styles from "./card-debate.css?inline";

interface CardDebateProps {
    debate: {
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
        image_url?: string;
    };
}

export default component$<CardDebateProps>(({ debate }) => {
    useStyles$(styles);

    return (
        <div class="card-debate">
            {debate.image_url && (
                <div class="image-container">
                    <img src={debate.image_url} alt="Debate Image" class="debate-image" />
                </div>
            )}
            <div class="content">
                <div class="header">
                    <h1 class="title">{debate.title}</h1>
                    <p class="description">{debate.description}</p>
                    <div class="metrics">
                        <span><LuEye class="icon" /> {debate.views_count}K views</span>
                        <span><LuThumbsUp class="icon" /> {debate.likes_count} likes</span>
                        <span><LuThumbsDown class="icon" /> {debate.dislikes_count} dislikes</span>
                        <span><LuMessageSquare class="icon" /> {debate.comments_count} comments</span>
                    </div>
                </div>
                <div class="details-and-view">
                    <div class="details">
                        <h2>Details</h2>
                        <ul>
                            <li><LuUser class="icon" /> Created by {debate.creator_id}</li>
                            <li><LuUsers class="icon" /> Community: {debate.community_id}</li>
                            <li><LuCalendar class="icon" /> Created on {debate.created_at}</li>
                            <li><LuCalendar class="icon" /> Last comment on {debate.last_comment_at}</li>
                            <li><LuGlobe class="icon" /> Language: {debate.language}</li>
                            <li><LuTag class="icon" /> Tags: environment, plastic, sustainability</li>
                            <li>Min Character Limit for Comments: {debate.min_characters_per_comment} characters</li>
                            <li>Max Character Limit for Comments: {debate.max_characters_per_comment} characters</li>
                        </ul>
                    </div>
                    <div class="points-of-view">
                        <h2>Points of View</h2>
                        <ul>
                            <li><LuLeaf class="icon" /> Ban single-use plastics to protect the environment</li>
                            <li><LuBriefcase class="icon" /> Maintain current policies to support businesses</li>
                        </ul>
                    </div>
                </div>
                <div class="join-button">Unirse al Debate</div>
            </div>
        </div>
    );
});
