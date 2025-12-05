'use client';

import { startTransition, useActionState } from 'react';
import { Card, CardContent } from '../../ui/card';
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '../../ui/field';
import { useForm } from 'react-hook-form';
import { appSettingsSchema } from '../validation/app-settings';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../../form-elements/form-input';
import { FormTextArea } from '../../form-elements/form-text-area';
import { AppSettingsFormType, UserSettingsFormType } from '@/types/types';
import { updateSettings } from '@/server-actions/app-settings';
import { stateDefault } from '@/server-actions/stateMessage';
import { useServerActionFeedback } from '../../../hooks/use-server-status';
import { FormCardFooter } from '../../form-elements/form-footer';
import LogoutForm from '../login/logout-form';
import { isDemo } from '@/middleware';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { UserSettingsForm } from './user-settings';

interface AppSettingsForm {
  appData: AppSettingsFormType;
  userData: UserSettingsFormType;
}

export function AppSettingsForm({ appData, userData }: AppSettingsForm) {
  const form = useForm<z.infer<typeof appSettingsSchema>>({
    resolver: zodResolver(appSettingsSchema),
    defaultValues: {
      nombreEmpresa: appData.nombreEmpresa,
      eslogan: appData.eslogan,
      mensaje: appData.mensaje ?? '',
      porHacer: appData.porHacer,
      cambioDolar: appData.cambioDolar,
      envioMaritimo: appData.envioMaritimo,
      envioAereo: appData.envioAereo,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateSettings,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof appSettingsSchema>) {
    startTransition(() => {
      formAction({ values: values as AppSettingsFormType });
    });
  }

  useServerActionFeedback(state);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="negocio">
        <TabsList className="w-full md:w-fit">
          <TabsTrigger value="negocio">Negocio</TabsTrigger>
          <TabsTrigger value="precios">Precios</TabsTrigger>
          <TabsTrigger value="cuenta">Mi cuenta</TabsTrigger>
          <TabsTrigger value="logout">Sesión</TabsTrigger>
        </TabsList>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:max-w-xl w-full"
        >
          <TabsContent value="negocio">
            <Card>
              <CardContent>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend className="appData-[variant=legend]:text-sm font-semibold">
                      Información del negocio
                    </FieldLegend>
                    <FieldDescription>
                      Mantén actualizados los datos de tu negocio.
                    </FieldDescription>
                    <FormInput
                      control={form.control}
                      name="nombreEmpresa"
                      label="Nombre del negocio"
                    />
                    <FormInput
                      control={form.control}
                      name="eslogan"
                      label="Eslogan"
                      description="Aparecerá también en los recibos."
                    />
                    <FormInput
                      control={form.control}
                      name="mensaje"
                      label="Mensaje motivacional"
                      description="Aparecerá en la página de Inicio."
                    />
                    <FormTextArea
                      control={form.control}
                      name="porHacer"
                      label="Por hacer"
                      description="Mejoras, arreglos de errores, etc., puedes escribirlos aquí."
                    />
                  </FieldSet>
                </FieldGroup>
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </TabsContent>
          <TabsContent value="precios">
            <Card>
              <CardContent>
                <FieldGroup>
                  <FieldSet>
                    <FieldLegend className="appData-[variant=legend]:text-sm font-semibold">
                      Precios de envío
                    </FieldLegend>
                    <FieldDescription>
                      Se aplicarán solo a los nuevos registros.
                    </FieldDescription>
                    <FormInput
                      control={form.control}
                      name="cambioDolar"
                      label="Cambio USD"
                      textAddon="C$"
                    />
                    <div className="inline-flex gap-6">
                      <FormInput
                        control={form.control}
                        name="envioMaritimo"
                        label="Envío marítimo"
                        textAddon="$"
                      />
                      <FormInput
                        control={form.control}
                        name="envioAereo"
                        label="Envío aéreo"
                        textAddon="$"
                      />
                    </div>
                  </FieldSet>
                </FieldGroup>
              </CardContent>
              <FormCardFooter isPending={isPending} />
            </Card>
          </TabsContent>
        </form>
        <TabsContent value="cuenta">
          <UserSettingsForm userData={userData} />
        </TabsContent>
        <TabsContent value="logout">
          {!isDemo && (
            <Card className="md:max-w-xl w-full">
              <CardContent>
                <LogoutForm />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
