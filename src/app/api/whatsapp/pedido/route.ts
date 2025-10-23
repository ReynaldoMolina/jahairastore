import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber, nombreCliente, reciboId } = await req.json();

    if (!phoneNumber || !nombreCliente || !reciboId) {
      return NextResponse.json(
        { error: 'Faltan campos: phoneNumber, nombreCliente o reciboId' },
        { status: 400 }
      );
    }

    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
    const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

    const imageUrl = `https://jahairastore.vercel.app/api/whatsapp?recibo=${reciboId}`;

    const response = await fetch(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: 'recibo',
            language: {
              code: 'es',
            },
            components: [
              {
                type: 'header',
                parameters: [
                  {
                    type: 'image',
                    image: {
                      link: imageUrl,
                    },
                  },
                ],
              },
              // {
              //   type: 'body',
              //   parameters: [
              //     {
              //       type: 'number',
              //       text: nombreCliente, // esto va en {{1}}
              //     },
              //   ],
              // },
            ],
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al enviar mensaje', details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error interno', details: String(error) },
      { status: 500 }
    );
  }
}
