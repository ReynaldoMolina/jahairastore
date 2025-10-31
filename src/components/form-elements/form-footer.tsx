import { useRouter } from 'next/navigation';
import { CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

interface FormFooterProps {
  isNew: boolean;
  label?: string;
  isPending?: boolean;
}

export function FormCardFooter({
  isNew = false,
  label,
  isPending = false,
}: FormFooterProps) {
  const router = useRouter();

  return (
    <CardFooter className="border-t justify-end gap-3">
      <Button type="button" variant="secondary" onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit" disabled={isPending} className="w-23">
        {isPending ? <Spinner /> : label ? label : isNew ? 'Crear' : 'Guardar'}
      </Button>
    </CardFooter>
  );
}
