import { dateToIso, formatDateShort, formatNumber } from '@/lib/formatters';
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

  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 3,
    paddingLeft: 7,
    marginTop: 15,
    marginBottom: 10,
    borderLeft: '2px solid #9e7c2f',
    color: '#333',
  },

  card: {
    width: '30%',
    gap: 1,
  },

  imageContainer: {
    width: '100%',
    height: 145,
    marginBottom: 6,
    border: '1px solid #e5e5e5',
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
    fontSize: 12,
    fontWeight: 'bold',
  },

  wholesale: {
    fontSize: 10,
    color: '#555',
  },

  name: {
    fontSize: 9,
    marginTop: 2,
    color: '#737373',
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
    categoria: string;
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

  // Agrupamos los productos por el campo 'categoria'
  const groupedProducts = products.reduce((acc, product) => {
    const cat = product.categoria || 'Sin Categoría';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  const categories = Object.keys(groupedProducts);

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

        {/* RENDER POR CATEGORÍAS */}
        {categories.map((cat) => (
          <View key={cat} wrap={true}>
            {/* Subtítulo de Categoría */}
            <Text style={styles.categoryTitle}>{cat}</Text>

            {/* Grid de productos de esta categoría */}
            <View style={styles.grid}>
              {groupedProducts[cat].map((p, i) => (
                <View key={i} style={styles.card} wrap={false}>
                  <View style={styles.imageContainer}>
                    {p.imagenUrl ? (
                      <Image
                        style={styles.image}
                        src={encodeURI(p.imagenUrl)}
                      />
                    ) : (
                      <Text style={styles.placeholderText}>Sin imagen</Text>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Text style={styles.price}>
                      {formatPrice(
                        p.precioVenta,
                        p.precioEnDolares,
                        p.cambioDolar
                      )}
                    </Text>
                    {p.precioVentaPorMayor > 0 && (
                      <Text style={styles.wholesale}>
                        P/mayor:{' '}
                        {formatPrice(
                          p.precioVentaPorMayor,
                          p.precioEnDolares,
                          p.cambioDolar
                        )}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.name}>{p.nombre}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}

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
