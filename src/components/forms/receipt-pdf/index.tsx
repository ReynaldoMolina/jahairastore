import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { formatNumber } from '@/lib/formatters';
import { formatDateShort } from '@/lib/get-date';

interface ReceiptPdf {
  register: any;
  formName: 'pedido' | 'venta';
}

export default function ReceiptPdf({ register, formName }: ReceiptPdf) {
  const isPedido = formName === 'pedido';
  const totalQuantity = register.detail.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );

  const generalTotal = register.detail.reduce((sum, item) => {
    let itemTotal = item.precioVenta * item.cantidad;
    if (!isPedido) {
      itemTotal *= item.cambioDolar;
    }
    return sum + itemTotal;
  }, 0);

  const nombre = register.idCliente === 1 ? '' : ` ${register.nombreCliente}`;
  const currency = isPedido ? '$' : 'C$';

  return (
    <>
      <Document style={styles.document}>
        <Page size={{ width: 612, height: 612 }} style={styles.page}>
          <View style={styles.section}>
            <View style={styles.logo}>
              <Image src="/store-logo.png" style={styles.logoimg} />
            </View>

            <Text
              style={styles.title}
            >{`¡Gracias por tu compra${nombre}!`}</Text>

            <View style={styles.orderData}>
              <View style={styles.orderInfo}>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel}>Nombre:</Text>
                  <Text
                    style={styles.orderInfoText}
                  >{`${register.nombreCliente} ${register.apellidoCliente}`}</Text>
                </View>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel}>Fecha:</Text>
                  <Text style={styles.orderInfoText}>
                    {formatDateShort(register.fecha)}
                  </Text>
                </View>
              </View>
              {isPedido && (
                <View style={styles.orderInfo2}>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Recibo:</Text>
                    <Text style={styles.orderInfoText}>{register.id}</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Pedido:</Text>
                    <Text style={styles.orderInfoText}>
                      {register.idPedido}
                    </Text>
                  </View>
                </View>
              )}
              {!isPedido && (
                <View style={styles.orderInfo2}>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Venta:</Text>
                    <Text style={styles.orderInfoText}>{register.id}</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Tipo:</Text>
                    <Text style={styles.orderInfoText}>
                      {register.credito === true ? 'Crédito' : 'Contado'}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableRowNameH}>Producto</Text>
                <Text style={styles.tableRowDataH}>Precio</Text>
                <Text style={styles.tableRowCantH}>Cant</Text>
                <Text style={styles.tableRowDataH}>Subtotal</Text>
              </View>
              {register.detail.map((detail) => {
                let precio,
                  subtotal = '';
                if (isPedido) {
                  precio = formatNumber(detail.precioVenta);
                  subtotal = formatNumber(detail.precioVenta * detail.cantidad);
                } else {
                  precio = formatNumber(
                    detail.precioVenta * detail.cambioDolar
                  );
                  subtotal = formatNumber(
                    detail.precioVenta * detail.cantidad * detail.cambioDolar
                  );
                }

                return (
                  <View key={detail.id} style={styles.tableRow}>
                    <Text style={styles.tableRowName}>{detail.nombre}</Text>
                    <Text style={styles.tableRowData}>
                      {currency}
                      {precio}
                    </Text>
                    <Text style={styles.tableRowCant}>{detail.cantidad}</Text>
                    <Text style={styles.tableRowData}>
                      {currency}
                      {subtotal}
                    </Text>
                  </View>
                );
              })}
              <View style={styles.tableFooter}>
                <Text style={styles.tableRowNameH}></Text>
                <Text style={styles.tableRowDataH}>Total</Text>
                <Text style={styles.tableRowCantH}>{totalQuantity}</Text>
                <Text style={styles.tableRowDataH}>
                  {currency}
                  {formatNumber(generalTotal)}
                </Text>
              </View>
            </View>

            <View style={styles.tableSaldo}>
              <View style={styles.orderSaldoContainer}>
                <Text style={styles.saldoLabel}>Abono:</Text>
                <Text style={styles.saldo}>
                  {currency}
                  {formatNumber(register.abono)}
                </Text>
              </View>
              <View style={styles.orderSaldoContainer}>
                <Text style={styles.saldoLabel}>Saldo:</Text>
                <Text style={styles.saldo}>
                  {currency}
                  {formatNumber(register.saldo)}
                </Text>
              </View>
              {isPedido && (
                <Text style={styles.note}>*El total no incluye el envío</Text>
              )}
            </View>

            <View style={styles.footerGap}></View>

            <View>
              <Text style={styles.footer}>{`"${register.nombreEmpresa}:`}</Text>
              <Text style={styles.footer}>{`${register.eslogan}"`}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
