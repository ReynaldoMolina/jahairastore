import { Button } from '@/components/ui/button';
import { UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { productSchema } from '../validation/product';
import { Spinner } from '@/components/ui/spinner';
import { uploadProductImage } from '@/server-actions/product-image';

interface UploadImageProps {
  form: UseFormReturn<z.infer<typeof productSchema>>;
  productId: number;
}

export function UploadImage({ form, productId }: UploadImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const triggerInput = () => inputRef.current?.click();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const url = await uploadProductImage(file, productId);
      form.setValue('imagenUrl', url);
      toast.success('Imagen subida correctamente.');
    } catch (error) {
      console.error('Error de red:', error);
      toast.error('Error al subir imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      onClick={triggerInput}
      disabled={loading || !productId}
    >
      <input
        id="image"
        ref={inputRef}
        name="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {loading ? <Spinner /> : <UploadIcon />}
    </Button>
  );
}
