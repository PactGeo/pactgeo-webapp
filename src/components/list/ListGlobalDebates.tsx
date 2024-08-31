import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from '@builder.io/qwik-city';
import CardDebate from "~/components/cards/CardDebate";
import EmptyDebates from "~/components/EmptyState/EmptyDebates";
import FormDebateGlobal from "~/components/forms/FormDebateGlobal";
import Modal from '~/components/modal/modal';
import { useSession } from "~/routes/plugin@auth";
import TableDebates from "~/components/table/TableDebates";
import { Button } from "~/components/ui";
import { LuPlusCircle } from "@qwikest/icons/lucide";

interface ListGlobalDebates {
    title: string;
    debates: any[];
    tags: { id: string, name: string }[];
}

export default component$<ListGlobalDebates>(({ debates, tags, title }) => {
    console.log('ListDebatesProps: ', debates)
    const nav = useNavigate();
    
    const viewMode = useSignal('cards');
    const isOpenModal = useSignal(false);
    
    const session = useSession();
    
    const onClickAction = $(() => isOpenModal.value = !isOpenModal.value)
    const onClickExpand = $(() => nav('/debates/new'))
    const onSubmitCompleted = $(() => isOpenModal.value = false)

    return (
        <div>
            <div class="flex justify-between items-end">
                <h1 class="text-4xl font-bold text-gray-900 text-center my-4">{title}</h1>
                <div>
                    {/* {debates.length > 0 && (
                        <div class="flex  items-center gap-1">
                            <Tooltip.Root gutter={4} flip>
                                <Tooltip.Trigger
                                    onClick$={() => viewMode.value = 'cards'}
                                    class={cn('flex gap-1 mr-4', viewMode.value === 'cards' ? 'text-gray-700' : '')}
                                >
                                    <LuLayoutGrid /> Card
                                </Tooltip.Trigger>
                                <Tooltip.Panel class="tooltip-panel">Cards view</Tooltip.Panel>
                            </Tooltip.Root>
                            <Tooltip.Root gutter={4} flip>
                                <Tooltip.Trigger
                                    onClick$={() => viewMode.value = 'table'}
                                    class={cn('flex gap-1 mr-2', viewMode.value === 'table' ? 'text-gray-700' : '')}
                                >
                                    <LuTable /> Table
                                </Tooltip.Trigger>
                                <Tooltip.Panel class="tooltip-panel">Table view</Tooltip.Panel>
                            </Tooltip.Root>
                        </div>
                    )} */}
                    {session.value?.user ? (
                        <Modal
                            description="Share the most important challenge facing your community."
                            isOpen={isOpenModal}
                            onClickExpand={onClickExpand}
                            title="New Debate"
                        >
                            <FormDebateGlobal
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
                            <Button>Log in</Button>
                        </Modal>
                    )}
                </div>
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
                                image={debate.image_url}
                                creator_username={debate.creator_username}
                                created_at={debate.created_at}
                                comments_count={debate.comments_count}
                                last_comment_at={debate.last_comment_at}
                                tags={debate.tags}
                            />
                        </li>
                    ))}
                    <li key="new" class="flex justify-center items-center">
                        <Button
                            class="new-debate-button"
                            onClick$={() => isOpenModal.value = true}
                        >
                            <LuPlusCircle class="text-4xl mr-2" />
                            Start a New Global Debate
                        </Button>
                    </li>
                </ul>
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