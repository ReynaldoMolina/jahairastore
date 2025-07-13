import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { formatNumber } from '@/app/lib/formatNumber';

export default function ReceiptPdf({ register, formName }) {
  const isPedido = formName === 'pedidos';
  const totalQuantity = register.detail.reduce(
    (sum, item) => sum + item.Cantidad,
    0
  );

  const generalTotal = register.detail.reduce((sum, item) => {
    let itemTotal = item.Precio_venta * item.Cantidad;
    if (!isPedido) {
      itemTotal *= item.Cambio_dolar;
    }
    return sum + itemTotal;
  }, 0);

  const nombre = register.Id_cliente === 0 ? '' : ` ${register.Nombre}`;
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
                  >{`${register.Nombre} ${register.Apellido}`}</Text>
                </View>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel}>Fecha:</Text>
                  <Text style={styles.orderInfoText}>{register.Fecha}</Text>
                </View>
              </View>
              {isPedido && (
                <View style={styles.orderInfo2}>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Recibo:</Text>
                    <Text style={styles.orderInfoText}>{register.Id}</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Pedido:</Text>
                    <Text style={styles.orderInfoText}>
                      {register.Id_pedido}
                    </Text>
                  </View>
                </View>
              )}
              {!isPedido && (
                <View style={styles.orderInfo2}>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Venta:</Text>
                    <Text style={styles.orderInfoText}>{register.Id}</Text>
                  </View>
                  <View style={styles.orderInfoContainer}>
                    <Text style={styles.orderInfoLabel2}>Tipo:</Text>
                    <Text style={styles.orderInfoText}>
                      {register.Credito === true ? 'Crédito' : 'Contado'}
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
                  subtotal = 0;
                if (isPedido) {
                  precio = formatNumber(detail.Precio_venta);
                  subtotal = formatNumber(
                    detail.Precio_venta * detail.Cantidad
                  );
                } else {
                  precio = formatNumber(
                    detail.Precio_venta * detail.Cambio_dolar
                  );
                  subtotal = formatNumber(
                    detail.Precio_venta * detail.Cantidad * detail.Cambio_dolar
                  );
                }

                return (
                  <View key={detail.Id_detalle} style={styles.tableRow}>
                    <Text style={styles.tableRowName}>{detail.Nombre}</Text>
                    <Text style={styles.tableRowData}>
                      {currency}
                      {precio}
                    </Text>
                    <Text style={styles.tableRowCant}>{detail.Cantidad}</Text>
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
                  {formatNumber(register.Abono)}
                </Text>
              </View>
              <View style={styles.orderSaldoContainer}>
                <Text style={styles.saldoLabel}>Saldo:</Text>
                <Text style={styles.saldo}>
                  {currency}
                  {isPedido
                    ? formatNumber(register.Saldo)
                    : formatNumber(generalTotal - register.Abono)}
                </Text>
              </View>
              <Text style={styles.note}>*El total no incluye el envío</Text>
            </View>

            <View style={styles.footerGap}></View>

            <View>
              <Text style={styles.footer}>"{register.Nombre_empresa}:</Text>
              <Text style={styles.footer}>{register.Eslogan}"</Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
