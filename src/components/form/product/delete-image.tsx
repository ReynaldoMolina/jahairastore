import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { productSchema } from '../validation/product';
import { Spinner } from '@/components/ui/spinner';
import { deleteProductImage } from '@/server-actions/product-image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Props {
  form: UseFormReturn<z.infer<typeof productSchema>>;
  productId: number;
}

export function DeleteImage({ form, productId }: Props) {
  const { imagenUrl } = form.watch();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      await deleteProductImage(`${productId}.webp`);
      form.setValue('imagenUrl', '');
      toast.success('Imagen eliminada correctamente.');
    } catch (error) {
      console.error('Error de red:', error);
      toast.error('Error al eliminar imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          type="button"
          disabled={loading || !imagenUrl}
        >
          {loading ? <Spinner /> : <Trash />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se va a eliminar la imagen del
            producto.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
