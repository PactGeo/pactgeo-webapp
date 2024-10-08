import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from '@builder.io/qwik-city';
import { Button, Separator } from '~/components/ui';
import CardDebate from "~/components/cards/CardDebate";
import EmptyDebates from "~/components/EmptyState/EmptyDebates";
import FormInternationalDebate from "~/components/forms/FormInternationalDebate";
import Modal from '~/components/modal/modal';
import { useSession } from "~/routes/plugin@auth";
import TableDebates from "~/components/table/TableDebates";

import countries from "~/data/countries";
import { LuPlusCircle } from "@qwikest/icons/lucide";

interface ListInternationalDebatesProps {
    title: string;
    debates: any[];
    tags: { id: string, name: string }[];
}

export default component$<ListInternationalDebatesProps>(({ debates, tags, title }) => {
    console.log('ListInternationalDebatesProps: ', debates)
    const nav = useNavigate();
    const session = useSession();
    
    const viewMode = useSignal('cards');
    const isOpenModal = useSignal(false);
    
    const onClickExpandModal = $(() => nav('/debates/new'))
    const onSubmitCompleted = $(() => isOpenModal.value = false)
    const onClickAction = $(() => isOpenModal.value = !isOpenModal.value)

    return (
        <div>
            <div class="flex justify-between items-center">
                <h1 class="text-4xl font-bold text-gray-900 text-center my-4">{title}</h1>
                {debates.length > 0 && (
                    <Button
                        class="new-debate-button"
                        onClick$={() => isOpenModal.value = true}
                    >
                        <LuPlusCircle class="text-4xl mr-2" />
                        Start a New International Debate
                    </Button>
                )}
            </div>
            {debates.length === 0 && <EmptyDebates onClickAction={onClickAction} />}
            {viewMode.value === 'table' && (
                <TableDebates
                    debates={debates.map(d => ({ id: d.id, title: d.title, creator_name: session.value?.user?.name ?? '', created_at: d.created_at, comments_count: d.comments_count, last_comment_at: d.last_comment_at, tags: ['tag1', 'tag2'] }))}
                />
            )}
            {viewMode.value === 'cards' && (
                <ul class="grid justify-center grid-cols-[1fr_1fr] md:grid-cols-[repeat(3,1fr)] gap-4">
                    {debates.map((debate) => (
                        <li key={`debate-${debate.id}`}>
                            <CardDebate
                                title={debate.title}
                                description={debate.description}
                                images={debate.images}
                                creator_username={debate.creator_username}
                                created_at={debate.created_at}
                                comments_count={debate.comments_count}
                                last_comment_at={debate.last_comment_at}
                                tags={debate.tags}
                                countries_involved={debate.countries_involved}
                                slug={debate.slug}
                            />
                        </li>
                    ))}
                </ul>
            )}
            {session.value?.user ? (
                <Modal
                    description="Create a new debate to discuss a key challenge for the community"
                    isOpen={isOpenModal}
                    onClickExpand={onClickExpandModal}
                    title="New International Debate"
                >
                    <FormInternationalDebate
                        countries={countries}
                        onSubmitCompleted={onSubmitCompleted}
                        tags={tags}
                    />
                </Modal>
            ) : (
                <Modal
                    trigger="New"
                    title="You must log in"
                    description="You must log in to create a new debate"
                >
                    <button>Log in</button>
                </Modal>
            )}
        </div>
    );
});

export const head: DocumentHead = {
    title: "Welcome to Qwik",
    meta: [
        {
            name: "description",
            content: "Qwik site description",
        },
    ],
};