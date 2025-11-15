import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { formatNumber, formatDateShort } from '@/lib/formatters';
import { getPedidoReceiptPdf } from '@/fetch-data/receipts';
import { loadFonts } from '@/lib/load-fonts';
import { sanitizeFilename } from '@/lib/sanitize-filename';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const idRecibo = searchParams.get('id_recibo') || undefined;

  const register = await getPedidoReceiptPdf(idRecibo);

  if (!register) return new Response('Invoice not found', { status: 404 });

  const totalQuantity = register.detail.reduce((sum, i) => sum + i.cantidad, 0);

  const generalTotal = register.detail.reduce((sum, i) => {
    let itemTotal = i.precioVenta * i.cantidad;
    return sum + itemTotal;
  }, 0);

  const nombre = register.idCliente === 1 ? '' : ` ${register.nombreCliente}`;

  const { regularFontData, boldFontData } = await loadFonts();

  const sanitizedClientName = sanitizeFilename(register.nombreCliente);
  const filename = `recibo-${idRecibo}-pedido-${register.idPedido}-${sanitizedClientName}.png`;

  const BASE_FIXED_HEIGHT = 600;
  const ROW_HEIGHT = 30;
  const dynamicContentHeight = register.detail.length * ROW_HEIGHT;
  const calculatedHeight = BASE_FIXED_HEIGHT + dynamicContentHeight;
  const finalHeight = Math.max(1000, calculatedHeight);

  return new ImageResponse(
    (
      <div
        style={{
          width: '800px',
          height: `${finalHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          fontFamily: 'times',
          color: '#000',
          padding: '25px 25px',
        }}
      >
        {/* Logo */}
        <div tw="flex justify-center">
          <img
            src="https://jahairastore.vercel.app/store-logo.png"
            width="130"
            height="130"
            alt="Logo"
          />
        </div>

        <h1 tw="mx-auto font-bold text-[22px]">
          ¡Gracias por tu compra {nombre}!
        </h1>

        {/* Info Section */}
        <div tw="flex mb-5 text-[20px]">
          {/* 👇 Left column */}
          <div tw="flex flex-col w-72/100">
            <div tw="flex mb-2">
              <span tw="font-bold w-22">Nombre:</span>
              {register.nombreCliente} {register.apellidoCliente}
            </div>
            <div tw="flex">
              <span tw="font-bold w-22">Fecha:</span>
              {formatDateShort(register.fecha)}
            </div>
          </div>

          {/* 👇 Right column */}
          <div tw="flex flex-col">
            <div tw="flex mb-2">
              <span tw="font-bold w-20">Recibo:</span> {register.id}
            </div>
            <div tw="flex">
              <span tw="font-bold w-20">Pedido:</span> {register.idPedido}
            </div>
          </div>
        </div>

        {/* Table */}
        <div tw="flex flex-col text-[18px]">
          {/* Header */}
          <div tw="flex font-bold bg-neutral-100 py-1.5 px-1">
            <div tw="flex-1">Producto</div>
            <div tw="w-23 justify-end">Precio</div>
            <div tw="w-13 justify-end">Cant</div>
            <div tw="w-27 justify-end">Subtotal</div>
          </div>

          {/* Rows */}
          {register.detail.map((d) => {
            return (
              <div key={d.id} tw="flex py-1.5 px-1 border-b-neutral-200 border">
                <div tw="flex-1">{d.nombreProducto}</div>
                <div tw="flex w-23 justify-end">
                  ${formatNumber(d.precioVenta)}
                </div>
                <div tw="flex w-13 justify-end">{d.cantidad}</div>
                <div tw="flex w-27 justify-end">
                  ${formatNumber(d.precioVenta * d.cantidad)}
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div tw="flex font-bold bg-neutral-100 py-1.5 px-1">
            <div tw="flex-1"></div>
            <div tw="flex w-23 justify-end">Total</div>
            <div tw="flex w-13 justify-end">{totalQuantity}</div>
            <div tw="flex w-27 justify-end">${formatNumber(generalTotal)}</div>
          </div>
        </div>

        {/* Abono / Saldo */}
        <div tw="flex flex-col items-end mt-5 text-[20px] ">
          <div tw="flex mb-2">
            <span tw="font-bold">Abono:</span>
            <span tw="flex w-37 justify-end">
              ${formatNumber(register.abono)}
            </span>
          </div>
          <div tw="flex">
            <span tw="font-bold">Saldo:</span>
            <span tw="flex w-37 justify-end">
              ${formatNumber(register.saldo)}
            </span>
          </div>
          <div tw="text-[12px] text-neutral-500 mt-3">
            *El total no incluye el envío
          </div>
        </div>

        <div tw="flex-1" />

        {/* Footer */}
        <div tw="flex items-center flex-col text-neutral-500 text-[20px]">
          <span>{register.nombreEmpresa}</span>
          <span>“{register.eslogan}”</span>
        </div>
      </div>
    ),
    {
      width: 800,
      height: finalHeight,
      fonts: [
        {
          name: 'times',
          data: regularFontData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'times',
          data: boldFontData,
          style: 'normal',
          weight: 700,
        },
      ],
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `inline; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    }
  );
}
