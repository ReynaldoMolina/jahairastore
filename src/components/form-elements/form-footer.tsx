import { useRouter } from 'next/navigation';
import { CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';

interface FormFooterProps {
  label?: string;
  isPending?: boolean;
  isNew?: boolean;
}

export function FormCardFooter({
  label,
  isPending = false,
  isNew = false,
}: FormFooterProps) {
  const router = useRouter();

  return (
    <CardFooter className="border-t justify-end gap-3 flex-col-reverse sm:flex-row">
      <Button
        type="button"
        variant="secondary"
        className="w-full sm:w-fit"
        onClick={() => router.back()}
      >
        Cancelar
      </Button>
      <Button type="submit" disabled={isPending} className="w-full sm:w-23">
        {isPending ? <Spinner /> : label ? label : isNew ? 'Crear' : 'Guardar'}
      </Button>
    </CardFooter>
  );
}
