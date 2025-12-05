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
import { userSettingsSchema } from '../validation/user-settings';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSettingsFormType } from '@/types/types';
import { stateDefault } from '@/server-actions/stateMessage';
import { useServerActionFeedback } from '../../../hooks/use-server-status';
import { FormCardFooter } from '../../form-elements/form-footer';
import { ChangeTheme } from '../../change-theme';
import { FormSelect } from '../../form-elements/form-select';
import { updateUserSettings } from '@/server-actions/user-settings';

interface UserSettingsForm {
  userData: UserSettingsFormType;
}

export function UserSettingsForm({ userData }: UserSettingsForm) {
  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      menuPosition: userData.menuPosition,
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateUserSettings,
    stateDefault
  );

  function onSubmit(values: z.infer<typeof userSettingsSchema>) {
    startTransition(() => {
      formAction({ id: userData.id, values: values as UserSettingsFormType });
    });
  }

  useServerActionFeedback(state, { hardReload: true });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-xl w-full">
      <Card>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <FieldLegend className="userData-[variant=legend]:text-sm font-semibold">
                Configuración de cuenta
              </FieldLegend>
              <FieldDescription>
                Haz ajustes a tu cuenta de usuario.
              </FieldDescription>
            </FieldSet>
            <FieldSet>
              <ChangeTheme />
              <FormSelect
                control={form.control}
                name="menuPosition"
                label="Posicion del menú (teléfono)"
                description="Para cambiar la posición del menú se recargará la página"
                options={[
                  {
                    value: 'bottom',
                    label: 'Abajo',
                  },
                  {
                    value: 'left',
                    label: 'Izquierda',
                  },
                ]}
              />
            </FieldSet>
          </FieldGroup>
        </CardContent>
        <FormCardFooter isPending={isPending} />
      </Card>
    </form>
  );
}
