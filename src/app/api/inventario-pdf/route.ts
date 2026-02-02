import { getProductsPdf } from '@/fetch-data/product';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { categorias, ubicacion } = await req.json();

  const products = await getProductsPdf(categorias, ubicacion);

  return NextResponse.json(products);
}
