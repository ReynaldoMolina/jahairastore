'use client';

import { useState } from 'react';
import { Copy, Download, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { SaleById } from '@/types/types';
import Link from 'next/link';

interface SaleOptions {
  sale: SaleById;
}

export function SaleOptions({ sale }: SaleOptions) {
  const [loading, setLoading] = useState<'copy' | 'download' | null>(null);

  const fetchImage = async () => {
    const res = await fetch(`/api/recibos/venta?id_venta=${sale.id}`);
    if (!res.ok) throw new Error('Failed to fetch image.');
    return res.blob();
  };

  const handleCopy = async () => {
    setLoading('copy');
    try {
      const blob = await fetchImage();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      toast.info('Imagen copiada.');
    } catch (err) {
      console.error(err);
      toast.error('Hubo un error al copiar la imagen al portapapeles.');
    } finally {
      setLoading(null);
    }
  };

  const handleDownload = async () => {
    setLoading('download');
    try {
      const blob = await fetchImage();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Venta ${sale.id} - ${sale.nombreCliente}.png`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error(err);
      toast.error('Error al descargar el recibo.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Eye />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Ver</ItemTitle>
          <ItemDescription>Ver el recibo como imagen.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`/api/recibos/venta?id_venta=${sale.id}`}
              target="_blank"
            >
              Ver
            </Link>
          </Button>
        </ItemActions>
      </Item>

      <Item variant="outline">
        <ItemMedia variant="icon">
          <Copy />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Copiar</ItemTitle>
          <ItemDescription>Copia el recibo al portapapeles.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={loading !== null}
            className="min-w-20"
          >
            {loading === 'copy' ? <Spinner /> : 'Copiar'}
          </Button>
        </ItemActions>
      </Item>

      <WhatsAppButton
        message={`Hola ${sale.nombreCliente}, aquí está tu recibo.`}
        phoneNumber={sale.telefono}
      />

      <Item variant="outline">
        <ItemMedia variant="icon">
          <Download />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Descargar</ItemTitle>
          <ItemDescription>Descarga el recibo como imagen.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={loading !== null}
            className="min-w-20"
          >
            {loading === 'download' ? <Spinner /> : 'Descargar'}
          </Button>
        </ItemActions>
      </Item>
    </>
  );
}

interface WhatsAppButton {
  message: string;
  phoneNumber: string;
}

function WhatsAppButton({ message, phoneNumber }: WhatsAppButton) {
  const encodedMessage = encodeURIComponent(message);
  const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
  const whatsAppUrl = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodedMessage}`;

  return (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <MessageCircle />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Enviar</ItemTitle>
        <ItemDescription>
          {phoneNumber
            ? 'Abre la conversación en WhatsApp y pega el recibo.'
            : 'Necesitas agregar un número de teléfono.'}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        {!phoneNumber ? (
          <Button variant="outline" size="sm" disabled>
            Abrir
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled={!phoneNumber} asChild>
            <Link href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
              Abrir
            </Link>
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}
