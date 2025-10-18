import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { formatNumber } from '@/lib/formatters';
import { getPedidoReceiptPdf } from '@/fetch-data/receipt';
import { formatDateShort } from '@/lib/get-date';

export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const register = await getPedidoReceiptPdf(id);
  if (!register) return new Response('Invoice not found', { status: 404 });

  const totalQuantity = register.detail.reduce((sum, i) => sum + i.cantidad, 0);

  const generalTotal = register.detail.reduce((sum, i) => {
    let itemTotal = i.precioVenta * i.cantidad;
    return sum + itemTotal;
  }, 0);

  const nombre = register.idCliente === 0 ? '' : ` ${register.nombre}`;
  const currency = '$';

  return new ImageResponse(
    (
      <div
        style={{
          width: '800px',
          height: '1000px',
          display: 'flex',
          flexDirection: 'column',
          background: 'white',
          fontFamily: 'cursive',
          color: '#000',
          padding: '15px 25px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="http://localhost:3000/store-logo.png"
            width="150"
            height="150"
            alt="Logo"
          />
        </div>

        <h1
          style={{
            display: 'flex',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            width: '100%',
          }}
        >
          ¡Gracias por tu compra {nombre}!
        </h1>

        {/* Info Section */}
        <div
          style={{
            display: 'flex',
            marginBottom: 10,
            fontSize: 14,
          }}
        >
          {/* 👇 Left column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              width: '73%',
            }}
          >
            <div style={{ display: 'flex', gap: 4, fontSize: 18 }}>
              <b style={{ width: 80 }}>Nombre:</b>
              <span>
                {register.nombre} {register.apellido}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4, fontSize: 18 }}>
              <b style={{ width: 80 }}>Fecha:</b>
              <span>{formatDateShort(register.fecha)}</span>
            </div>
          </div>

          {/* 👇 Right column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', gap: 4, fontSize: 18 }}>
              <b style={{ width: 70 }}>Recibo:</b> <span>{register.id}</span>
            </div>
            <div style={{ display: 'flex', gap: 4, fontSize: 18 }}>
              <b style={{ width: 70 }}>Pedido:</b>{' '}
              <span>{register.idPedido}</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column', // 👈 Needed for multiple rows
            fontSize: 16,
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              fontWeight: 'bold',
              background: '#f3f3f3',
              padding: '5px 2px',
            }}
          >
            <div style={{ flex: 1 }}>Producto</div>
            <div style={{ width: 90, justifyContent: 'flex-end' }}>Precio</div>
            <div style={{ width: 50, justifyContent: 'flex-end' }}>Cant</div>
            <div style={{ width: 90, justifyContent: 'flex-end' }}>
              Subtotal
            </div>
          </div>

          {/* Rows */}
          {register.detail.map((d) => {
            return (
              <div
                key={d.id}
                style={{
                  display: 'flex',
                  padding: '4px 2px',
                  borderBottom: '1px solid gainsboro',
                }}
              >
                <div style={{ flex: 1 }}>{d.producto}</div>
                <div
                  style={{
                    display: 'flex',
                    width: 90,
                    justifyContent: 'flex-end',
                  }}
                >
                  {currency}
                  {formatNumber(d.precioVenta)}
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: 50,
                    justifyContent: 'flex-end',
                  }}
                >
                  {d.cantidad}
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: 90,
                    justifyContent: 'flex-end',
                  }}
                >
                  {currency}
                  {formatNumber(d.precioVenta * d.cantidad)}
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              fontWeight: 'bold',
              background: '#f3f3f3',
              padding: '5px 2px',
            }}
          >
            <div style={{ flex: 1 }}></div>
            <div
              style={{ display: 'flex', width: 90, justifyContent: 'flex-end' }}
            >
              Total
            </div>
            <div
              style={{ display: 'flex', width: 50, justifyContent: 'flex-end' }}
            >
              {totalQuantity}
            </div>
            <div
              style={{ display: 'flex', width: 90, justifyContent: 'flex-end' }}
            >
              {currency}
              {formatNumber(generalTotal)}
            </div>
          </div>
        </div>

        {/* Abono / Saldo */}
        <div
          style={{
            marginTop: 10,
            fontSize: 18,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 4,
          }}
        >
          <div style={{ display: 'flex', gap: 4 }}>
            <b>Abono:</b>
            <span style={{ width: 139, justifyContent: 'flex-end' }}>
              {currency}
              {formatNumber(register.abono)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <b>Saldo:</b>
            <span style={{ width: 139, justifyContent: 'flex-end' }}>
              {currency}
              {formatNumber(register.saldo)}
            </span>
          </div>
          <div style={{ fontSize: 10, color: 'gray' }}>
            *El total no incluye el envío
          </div>
        </div>

        <div style={{ flexGrow: 1 }} />

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            color: 'gray',
            fontSize: 18,
          }}
        >
          <span>{register.nombreEmpresa}</span>
          <span>“{register.eslogan}”</span>
        </div>
      </div>
    ),
    { width: 800, height: 1000 }
  );
}
