# Unidades de medida usadas en CSS

**Miguel Angel Davila Sanchez** : **22100177**

**Css** utiliza una variedad de unidades de medida para definir el tamaño, el espacio, y otros aspectos visuales de los elementos en una página web. Estas unidades se  clasifican en 3 categorias que son:

## Unidades Absolutas:
Son fijas y no cambian de tamaño según el contexto del elemento:

| Unidad | Descripción                                      |
|--------|--------------------------------------------------|
| px     | Píxeles: La unidad base en la mayoría de los diseños web. |
| pt     | Puntos: Comúnmente usados en impresión, 1 punto es igual a 1/72 de pulgada. |
| cm     | Centímetros: Usualmente se usan en contextos de impresión más que en web. |
| mm     | Milímetros: También más usado en impresión. |
| in     | Pulgadas: Predominantemente para impresión. |

### Unidades Relativas:
Estas unidades se escalan relativas a otros valores, como el tamaño de fuente del elemento padre o las dimensiones del viewport:

| Unidad | Descripción                                         |
|--------|-----------------------------------------------------|
| em     | Relativo al tamaño de fuente del elemento. Ejemplo: si la fuente es de 16px, 1em equivale a 16px. |
| rem    | Relativo al tamaño de fuente del elemento raíz (usualmente el <html>). |
| vw     | Viewport width: 1% del ancho del viewport. |
| vh     | Viewport height: 1% de la altura del viewport. |
| %      | Porcentaje: Relativo al tamaño del elemento contenedor. |

## Unidades de escalado
Útiles para diseñar interfaces que se ajustan automáticamente al tamaño del dispositivo:

| Unidad | Descripción                                                  |
|--------|--------------------------------------------------------------|
| vmin   | 1% de la dimensión más pequeña del viewport (ancho o alto). |
| vmax   | 1% de la dimensión más grande del viewport.                  |
