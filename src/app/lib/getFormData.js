export function getClientFormData(formData) {
  let Telefono = formData.get('Telefono').trim();
  if (Telefono === '+505') Telefono = '';

  return {
    Nombre: formData.get('Nombre').trim(),
    Apellido: formData.get('Apellido').trim(),
    Telefono,
    Municipio: formData.get('Municipio').trim(),
    Departamento: formData.get('Departamento').trim(),
    Pais: formData.get('Pais').trim(),
    Direccion: formData.get('Direccion').trim(),
  }
}

export function getProviderFormData(formData) {
  let Telefono = formData.get('Telefono').trim();
  if (Telefono === '+505') Telefono = '';

  return {
    Nombre_empresa: formData.get('Nombre_empresa').trim(),
    Nombre_contacto: formData.get('Nombre_contacto').trim(),
    Telefono,
    Departamento: formData.get('Departamento').trim(),
    Municipio: formData.get('Municipio').trim(),
    Pais: formData.get('Pais').trim(),
    Direccion: formData.get('Direccion').trim(),
  }

}

export function getReceiptFormData(formData) {
  return {
    Id_pedido: Number(formData.get('Id_pedido')),
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha').trim(),
    Abono: Number(formData.get('Abono')),
    Saldo: Number(formData.get('Saldo')),
    Concepto: formData.get('Concepto').trim(),
  }
}

export function getWebsiteFormData(formData) {
  return {
    Nombre: formData.get('Nombre').trim(),
    Precio: Number(formData.get('Precio')),
    Imagen: formData.get('Imagen').trim(),
  }
}

export function getProductFormData(formData) {
  return {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Nombre: formData.get('Nombre').trim(),
    Descripcion: formData.get('Descripcion').trim(),
    Precio_compra: Number(formData.get('Precio_compra')),
    Precio_venta: Number(formData.get('Precio_venta')),
    Id_categoria: Number(formData.get('Id_categoria')),
    Fecha: formData.get('Fecha'),
    Id_shein: formData.get('Id_shein').trim(),
    Inventario: formData.get('Inventario') === 'on' ? true : false,
    Cambio_dolar: Number(formData.get('Cambio_dolar')) || null,
  }
}

export function getOrderFormData(formData) {
  return {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Peso: Number(formData.get('Peso') ?? 0),
    Cambio_dolar: Number(formData.get('Cambio_dolar') ?? 37),
    Precio_libra: Number(formData.get('Precio_libra') ?? 3),
  }
}

export function getPurchaseFormData(formData) {
  return {
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha')
  };
}

export function getExpenseFormData(formData) {
  return {
    Id_compra: Number(formData.get('Id_compra')),
    Id_proveedor: Number(formData.get('Id_proveedor')),
    Fecha: formData.get('Fecha'),
    Gasto: Number(formData.get('Gasto')),
    Concepto: formData.get('Concepto').trim(),
    Cambio_dolar: Number(formData.get('Cambio_dolar')),
  }
}

export function getSaleFormData(formData) {
  return {
    Id_cliente: Number(formData.get('Id_cliente')),
    Fecha: formData.get('Fecha'),
    Abono: Number(formData.get('Abono')),
    Credito: formData.get('Credito') === 'on' ? true : false,
  };
}