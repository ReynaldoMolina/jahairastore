import { Page, Text, View, Document, Image } from '@react-pdf/renderer';
import { styles } from './style';

export default function ReceiptPdf({ receipt }) {
  const totalQuantity = receipt.detail.reduce(
    (sum, item) => sum + item.Cantidad,
    0
  );
  const generalTotal = receipt.detail.reduce(
    (sum, item) => sum + item.Precio_venta * item.Cantidad,
    0
  );
  const nombre = receipt.Id_cliente === 0 ? '' : ` ${receipt.Nombre}`;

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
                  >{`${receipt.Nombre} ${receipt.Apellido}`}</Text>
                </View>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel}>Fecha:</Text>
                  <Text style={styles.orderInfoText}>{receipt.Fecha}</Text>
                </View>
              </View>
              <View style={styles.orderInfo2}>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel2}>Recibo:</Text>
                  <Text style={styles.orderInfoText}>{receipt.Id}</Text>
                </View>
                <View style={styles.orderInfoContainer}>
                  <Text style={styles.orderInfoLabel2}>Pedido:</Text>
                  <Text style={styles.orderInfoText}>{receipt.Id_pedido}</Text>
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableRowNameH}>Producto</Text>
                <Text style={styles.tableRowDataH}>Precio</Text>
                <Text style={styles.tableRowCantH}>Cant</Text>
                <Text style={styles.tableRowDataH}>Subtotal</Text>
              </View>
              {receipt.detail.map((detail) => (
                <View key={detail.Id_detalle} style={styles.tableRow}>
                  <Text style={styles.tableRowName}>{detail.Nombre}</Text>
                  <Text style={styles.tableRowData}>
                    ${detail.Precio_venta.toFixed(2)}
                  </Text>
                  <Text style={styles.tableRowCant}>{detail.Cantidad}</Text>
                  <Text style={styles.tableRowData}>
                    ${(detail.Precio_venta * detail.Cantidad).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View style={styles.tableFooter}>
                <Text style={styles.tableRowNameH}></Text>
                <Text style={styles.tableRowDataH}>Total</Text>
                <Text style={styles.tableRowCantH}>{totalQuantity}</Text>
                <Text style={styles.tableRowDataH}>
                  ${generalTotal.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.tableSaldo}>
              <View style={styles.orderSaldoContainer}>
                <Text style={styles.saldoLabel}>Abono:</Text>
                <Text style={styles.saldo}>${receipt.Abono.toFixed(2)}</Text>
              </View>
              <View style={styles.orderSaldoContainer}>
                <Text style={styles.saldoLabel}>Saldo:</Text>
                <Text style={styles.saldo}>${receipt.Saldo.toFixed(2)}</Text>
              </View>
              <Text style={styles.note}>*El total no incluye el envío</Text>
            </View>

            <View style={styles.footerGap}></View>

            <View>
              <Text style={styles.footer}>"Jahaira Store:</Text>
              <Text style={styles.footer}>
                Elegancia y Tendencias de Shein a tu alcance"
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
}
