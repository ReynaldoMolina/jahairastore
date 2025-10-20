import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('recibo');
  const phoneNumber = searchParams.get('numero');

  const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN!;
  const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID!;

  const imageUrl = `https://jahairastore.vercel.app/api/og?recibo=${id}`;

  const res = await fetch(
    `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phoneNumber,
        type: 'image',
        image: {
          link: imageUrl,
          caption: `🧾 Recibo ${id} - ¡Gracias por tu compra!`,
        },
      }),
    }
  );

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
