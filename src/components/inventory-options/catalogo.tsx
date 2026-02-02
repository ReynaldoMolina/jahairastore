import {
  dateIsoToDate,
  dateToIso,
  formatDate,
  formatDateShort,
  formatNumber,
} from '@/lib/formatters';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  titleBox: {
    flexDirection: 'column',
  },

  title: {
    fontSize: 28,
    fontFamily: 'Times-Roman',
  },

  subtitle: {
    fontSize: 12,
    color: '#9e7c2f',
    marginTop: 4,
  },

  logo: {
    width: 90,
    height: 60,
    objectFit: 'contain',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 25,
    justifyContent: 'space-evenly',
  },

  card: {
    width: '30%',
    gap: 1,
  },

  imageContainer: {
    width: '100%',
    height: 145,
    marginBottom: 6,
    border: '1px solid #f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 15,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },

  placeholderText: {
    fontSize: 9,
    color: '#999',
  },

  price: {
    fontSize: 11,
    fontWeight: 'bold',
  },

  wholesale: {
    fontSize: 10,
    color: '#555',
  },

  name: {
    fontSize: 10,
    marginTop: 2,
    color: '#555',
  },

  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
  },
});

interface Props {
  products: {
    nombre: string;
    precioVenta: number;
    precioVentaPorMayor: number;
    precioEnDolares: boolean;
    cambioDolar: number;
    imagenUrl: string | null;
  }[];
}

const formatPrice = (precio: number, enDolares: boolean, cambio: number) => {
  if (enDolares) {
    const convertido = precio / cambio;
    return `$ ${formatNumber(convertido)}`;
  }

  return `C$ ${formatNumber(precio)}`;
};

export function CatalagoProductos({ products }: Props) {
  const fechaDate = new Date();
  const fecha = formatDateShort(dateToIso(fechaDate));

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header} fixed>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Jahaira Store</Text>
            <Text style={styles.subtitle}>Catálogo de productos</Text>
          </View>

          <Image style={styles.logo} src="/store-logo.png" />
        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {products.map((p, i) => (
            <View key={i} style={styles.card} wrap={false}>
              {/* IMAGEN O PLACEHOLDER */}
              <View style={styles.imageContainer}>
                {p.imagenUrl ? (
                  <Image style={styles.image} src={p.imagenUrl} />
                ) : (
                  <Text style={styles.placeholderText}>Sin imagen</Text>
                )}
              </View>

              {/* PRECIO */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.price}>
                  {formatPrice(p.precioVenta, p.precioEnDolares, p.cambioDolar)}
                </Text>

                {/* PRECIO POR MAYOR */}
                <Text style={styles.wholesale}>
                  P/mayor:{' '}
                  {formatPrice(
                    p.precioVentaPorMayor,
                    p.precioEnDolares,
                    p.cambioDolar
                  )}
                </Text>
              </View>

              {/* NOMBRE */}
              <Text style={styles.name}>{p.nombre}</Text>
            </View>
          ))}
        </View>

        {/* FOOTER */}
        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages} • Impreso: ${fecha}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
