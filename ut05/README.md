# UT05 · Inventario de red del aula en XML, XSD y JSON

Ejercicio de la unidad 5 del módulo 0373 Lenguajes de marcas (ASIR 1).
Se ha creado el inventario de los equipos de red del aula en dos formatos y se ha validado el XML con un esquema XSD.

> Los datos (IP, MAC, modelos y fechas) son de ejemplo.

## Ficheros

| Fichero | Contenido |
|---|---|
| `inventario.xml` | Inventario de 6 equipos: router, switch, punto de acceso, dos servidores e impresora |
| `inventario.xsd` | Esquema que valida el XML |
| `inventario.json` | Los mismos datos en JSON |

## Validación

```bash
xmllint --noout --schema inventario.xsd inventario.xml
# inventario.xml validates
```

El esquema comprueba:

- **IP** con `xs:pattern`: cuatro números de 0 a 255 separados por puntos.
- **MAC** con `xs:pattern`: seis parejas hexadecimales separadas por `:`.
- **Fecha de compra** con `xs:date` (formato AAAA-MM-DD).
- **Tipo de equipo** con una enumeración (router, switch, punto_acceso, servidor, impresora).
- **Identificador, IP y MAC únicos** con `xs:unique`.
- **Al menos cinco equipos** con `minOccurs="5"`.

## Atributos y elementos

Se han puesto como **atributos** los datos que identifican o clasifican el equipo (`id`, `tipo`, `marca`) y los datos generales del inventario (`aula`, `actualizado`).
Se han puesto como **elementos** los datos propios de cada equipo (nombre, modelo, IP, MAC, ubicación, fecha de compra y puertos), ya que son el contenido principal y algunos pueden ser opcionales.

## Comparativa XML frente a JSON

| Aspecto | XML | JSON |
|---|---|---|
| Tamaño (formateado / minificado) | 2128 / 1875 bytes | 1669 / 1392 bytes |
| Tipos de datos | Todo es texto, salvo que se use un XSD | Números, textos, booleanos, listas y objetos |
| Validación | XSD con patrones para IP y MAC | Necesita JSON Schema |
| Lectura desde programas | Necesita un analizador XML | Se lee directamente (`JSON.parse`, `json.load`) |

## Formato para la herramienta de monitorización

Para exportar el inventario a una herramienta de monitorización se usaría **JSON**.
Herramientas como Zabbix, Grafana o Prometheus trabajan con APIs REST que intercambian JSON, el fichero ocupa menos y se procesa más fácilmente desde scripts.
XML sería preferible solo si la herramienta exigiera un esquema estricto o si se quisiera validar el inventario antes de enviarlo.
