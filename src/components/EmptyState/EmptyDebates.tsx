import { component$ } from "@builder.io/qwik";
import { LuList } from "@qwikest/icons/lucide";
import { Button } from '~/components/ui';

export default component$(() => {
    return (
        <div class="w-full max-w-md mx-auto">
            <div class="flex flex-col items-center justify-center space-y-4 text-center p-6">
                <div class="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <LuList class="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 class="text-lg font-semibold">No hay debates en la lista</h3>
                <p class="text-sm text-muted-foreground">
                    Parece que nadie ha creado ningún debate para esta comunidad. ¿Por qué no empiezas agregando uno?
                </p>
                <Button>
                    Agregar nuevo debate
                </Button>
            </div>
        </div>
    )
})