import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { LuBriefcase, LuCalendar, LuMapPin, LuPencil } from "@qwikest/icons/lucide";
import { Avatar, Badge, Button, Input, Label, Progress, Tabs, Textarea } from "~/components/ui";

export default component$(() => {
    const username = useLocation().params.username
    const isEditing = useSignal(false)
    return (
        <main class="container mx-auto px-6 py-8">
            <div class="flex flex-col lg:flex-row gap-8">
                <div class="lg:w-1/3">
                    <div class="bg-card rounded-lg p-6 shadow-md">
                        <div class="flex flex-col items-center space-y-4">
                            <Avatar.Root class="w-32 h-32">
                                <Avatar.Image src="/placeholder.svg?height=128&width=128" alt="@usuario" />
                                <Avatar.Fallback>UN</Avatar.Fallback>
                            </Avatar.Root>
                            <h2 class="text-2xl font-bold">{username}</h2>
                            <Badge>Analista Senior</Badge>
                            {isEditing.value ? (
                                <Button onClick$={() => isEditing.value = false}>Guardar Cambios</Button>
                            ) : (
                                <Button onClick$={() => isEditing.value = true}>
                                    <LuPencil class="mr-2 h-4 w-4" />
                                    Editar Perfil
                                </Button>
                            )}
                        </div>
                        <div class="mt-6 space-y-4">
                            <div class="flex items-center space-x-2">
                                <LuCalendar class="h-5 w-5 opacity-70" />
                                <span>{isEditing.value ? <Input type="date" defaultValue="1990-01-01" /> : "01/01/1990"}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <LuBriefcase class="h-5 w-5 opacity-70" />
                                <span>{isEditing ? <Input defaultValue="Analista Geopolítico" /> : "Analista Geopolítico"}</span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <LuMapPin class="h-5 w-5 opacity-70" />
                                <span>{isEditing ? <Input placeholder="Tu ubicación" /> : "Madrid, España"}</span>
                            </div>
                        </div>
                        <div class="mt-6">
                            <Label for="biografia">Biografía</Label>
                            {isEditing ? (
                                <Textarea id="biografia" placeholder="Cuéntanos sobre ti..." class="mt-2" />
                            ) : (
                                <p class="mt-2 text-muted-foreground">
                                    Analista geopolítico especializado en relaciones internacionales y conflictos regionales.
                                    Apasionado por entender las dinámicas globales y su impacto en la política local.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div class="lg:w-2/3">
                    <Tabs.Root class="w-full">
                        <Tabs.List class="grid w-full grid-cols-2">
                            <Tabs.Tab value="actividad">Actividad</Tabs.Tab>
                            <Tabs.Tab value="debates">Debates</Tabs.Tab>
                            <Tabs.Tab value="comunidades">Comunidades</Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel class="mt-6">
                            <h3 class="text-xl font-semibold mb-4">Resumen de Actividad</h3>
                            <div class="space-y-6">
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span>Debates Participados</span>
                                        <span>45 / 100</span>
                                    </div>
                                    <Progress value={45} />
                                </div>
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span>Comunidades Activas</span>
                                        <span>3 / 5</span>
                                    </div>
                                    <Progress value={60} />
                                </div>
                                <div>
                                    <div class="flex justify-between mb-2">
                                        <span>Reputación</span>
                                        <span>750 pts</span>
                                    </div>
                                    <Progress value={75} />
                                </div>
                            </div>
                        </Tabs.Panel>
                        <Tabs.Panel class="mt-6">
                            <h3 class="text-xl font-semibold mb-4">Debates Recientes</h3>
                            <ul class="space-y-4">
                                {['Impacto de la política energética en las relaciones internacionales',
                                    'El papel de las organizaciones internacionales en conflictos regionales',
                                    'Desafíos geopolíticos del cambio climático'].map((debate, index) => (
                                        <li key={index} class="bg-card rounded-lg p-4 shadow-sm">
                                            <h4 class="font-medium">{debate}</h4>
                                            <p class="text-sm text-muted-foreground mt-2">Participado el {new Date().toLocaleDateString()}</p>
                                        </li>
                                    ))}
                            </ul>
                        </Tabs.Panel>
                        <Tabs.Panel class="mt-6">
                            <h3 class="text-xl font-semibold mb-4">Mis Comunidades</h3>
                            <ul class="space-y-4">
                                {['Analistas de Política Internacional',
                                    'Estudios de Seguridad Global',
                                    'Economía Política Internacional'].map((comunidad, index) => (
                                        <li key={index} class="bg-card rounded-lg p-4 shadow-sm">
                                            <h4 class="font-medium">{comunidad}</h4>
                                            <p class="text-sm text-muted-foreground mt-2">Miembro desde {new Date().toLocaleDateString()}</p>
                                        </li>
                                    ))}
                            </ul>
                        </Tabs.Panel>
                    </Tabs.Root>
                </div>
            </div>
        </main>
    )
});
