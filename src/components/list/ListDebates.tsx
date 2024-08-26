import { $, component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { useNavigate } from '@builder.io/qwik-city';
import { Button, Separator } from '~/components/ui';
import CardDebate from "~/components/cards/CardDebate";
import EmptyDebates from "~/components/EmptyState/EmptyDebates";
import FormDebateGlobal from "~/components/forms/FormDebateGlobal";
import Modal from '~/components/modal/modal';
import { useSession } from "~/routes/plugin@auth";
import TableDebates from "~/components/table/TableDebates";
import { LuLayoutGrid, LuTable } from "@qwikest/icons/lucide";
import { Tooltip } from "@qwik-ui/headless";
import { cn } from "@qwik-ui/utils";

interface ListDebatesProps {
    title: string;
    debates: any[];
}

export default component$<ListDebatesProps>(({ title, debates }) => {
    const nav = useNavigate();
    const onClickExpand = $(() => nav('/debates/new'))

    const viewMode = useSignal('cards');
    const session = useSession();

    return (
        <div>
            <div class="flex justify-between items-end">
                <h1 class="text-4xl font-bold text-gray-900 text-center mt-4">{title}</h1>
                <div class="flex items-center gap-2">
                    <Tooltip.Root gutter={4} flip>
                        <Tooltip.Trigger onClick$={() => viewMode.value = 'table'} class={cn('mr-2', viewMode.value === 'table' ? 'text-red-600' : '')}>
                            <LuTable />
                        </Tooltip.Trigger>
                        <Tooltip.Panel class="tooltip-panel">Table</Tooltip.Panel>
                    </Tooltip.Root>
                    <Tooltip.Root gutter={4} flip>
                        <Tooltip.Trigger onClick$={() => viewMode.value = 'cards'} class={cn('mr-4', viewMode.value === 'cards' ? 'text-red-600' : '')}><LuLayoutGrid /></Tooltip.Trigger>
                        <Tooltip.Panel class="tooltip-panel">Cards</Tooltip.Panel>
                    </Tooltip.Root>
                    {session.value?.user ? (
                        <Modal
                            description="Share the most important challenge facing your community."
                            onClickExpand={onClickExpand}
                            title="New Debate"
                            trigger="New"
                        >
                            <FormDebateGlobal />
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
            </div>
            <Separator orientation="horizontal" class="mb-2" />
            {debates.length === 0 && <EmptyDebates />}
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
                                creator_name={session.value?.user?.name ?? ''}
                                created_at={debate.created_at}
                                comments_count={debate.comments_count}
                                last_comment_at={debate.last_comment_at}
                                tags={['tag1', 'tag2']}
                            />
                        </li>
                    ))}
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