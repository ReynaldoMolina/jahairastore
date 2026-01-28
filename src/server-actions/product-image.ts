'use server';

import { supabase } from '@/lib/supabase';
import sharp from 'sharp';

export async function uploadProductImage(file: File, productId: number) {
  if (!file || !productId) throw new Error('Imagen o productId faltante');

  const buffer = Buffer.from(await file.arrayBuffer());

  const optimizedImage = await sharp(buffer)
    .resize({
      width: 400,
      height: 400,
      fit: 'inside',
    })
    .webp({ quality: 80 })
    .toBuffer();

  const fileName = `${productId}.webp`;

  const { error } = await supabase.storage
    .from('store')
    .upload(fileName, optimizedImage, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from('store').getPublicUrl(fileName);
  const publicUrl = `${data.publicUrl}?v=${Date.now()}`;

  return publicUrl;
}

export async function deleteProductImage(fileName: string) {
  const { error } = await supabase.storage.from('store').remove([fileName]);

  if (error) {
    throw new Error('Error eliminando imagen: ' + error.message);
  }

  return true;
}
