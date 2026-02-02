'use client';

import { PDFViewer } from '@react-pdf/renderer';
import { CatalagoProductos } from './inventory-options/catalogo';

export function CatalogoEditor() {
  return (
    <PDFViewer className="w-full h-100">
      <CatalagoProductos
        products={[
          {
            nombre:
              'test 1 klasjdf lkafsdh lkjasfh alkshfd lakfh kljadsfh ljkasdf',
            precioVenta: 150,
            precioVentaPorMayor: 100,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: false,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
          {
            nombre: 'test 1',
            precioVenta: 100,
            precioVentaPorMayor: 150,
            precioEnDolares: true,
            cambioDolar: 37,
            imagenUrl: '',
          },
        ]}
      />
    </PDFViewer>
  );
}
