import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  const productId = formData.get('productId') as string;

  if (!file || !productId) {
    return NextResponse.json(
      { error: 'Imagen o productId faltante' },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Optimization
  const optimizedImage = await sharp(buffer)
    .resize({
      width: 400,
      height: 400,
      fit: 'inside',
    })
    .webp({ quality: 80 })
    .toBuffer();

  const fileName = `products/${productId}.webp`;

  const { error } = await supabase.storage
    .from('store')
    .upload(fileName, optimizedImage, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from('store').getPublicUrl(fileName);

  return NextResponse.json({
    url: data.publicUrl,
  });
}
