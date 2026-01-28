# Invertir precio_en_dolares producto

UPDATE producto
SET precio_en_dolares = NOT precio_en_dolares

# Convertir precio venta y costo producto

update public.producto
set costo = round((costo \* cambio_dolar)::numeric, 2)

update public.producto
set precio_venta = round((precio_venta \* cambio_dolar)::numeric, 2)

# Convertir costo compra_detalle

update public.compra_detalle
set costo = round((costo \* cambio_dolar)::numeric, 4)

# Convertir costo y precio_venta, precio_venta_por_mayor venta_detalle

update public.venta_detalle
set costo = round((costo \* cambio_dolar)::numeric, 4)

update public.venta_detalle
set precio_venta = round((precio_venta \* cambio_dolar)::numeric, 2)

update public.venta_detalle
set precio_venta_por_mayor = round((precio_venta_por_mayor \* cambio_dolar)::numeric, 2)

# Convertir gasto

update public.gasto
set gasto = round((gasto \* cambio_dolar)::numeric, 2)

# Invertir enDolares gasto

UPDATE gasto
SET en_dolares = NOT en_dolares
