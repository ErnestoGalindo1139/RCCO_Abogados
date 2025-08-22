// src/data/blogData.ts
export type Post = {
  id: string;
  slug: string; // clave de ruta
  title: string;
  excerpt: string;
  cover: string;
  date: string; // ISO
  readTime: string; // "7 min"
  tag?: string;
  content?: string; // markdown
};

export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'checklist-constituir-sapi',
    title: 'Checklist para constituir tu S.A.P.I. sin errores',
    excerpt:
      'Pasos y documentos clave para constituir una S.A.P.I. en México sin tropiezos y con estatutos listos para inversionistas.',
    cover:
      'https://derechomexicano.com.mx/wp-content/uploads/2020/10/bufete-de-abogados.jpg',
    date: '2025-08-05',
    readTime: '7 min',
    tag: 'Societario',
    content: `> **TL;DR**
> - La **S.A.P.I.** ofrece flexibilidad para pactos entre socios e inversión.
> - Prepara estatutos con **drag/tag along**, **vesting** y **no competencia**.
> - Agenda con tu notaría y alista **RFC**, **domicilio** y **identificaciones**.

## ¿Por qué una S.A.P.I.?
La **Sociedad Anónima Promotora de Inversión (S.A.P.I.)** permite pactar derechos especiales entre socios, ideal para startups y negocios que planean rondas de inversión.

![Constitución de sociedad](https://images.unsplash.com/photo-1554224155-8d04cb21cd6c)

## Documentos indispensables
1. **Proyecto de estatutos sociales** con cláusulas de gobierno corporativo.
2. **Acta constitutiva** ante notaría (citas y costos varían por estado).
3. **RFC** y alta en el SAT.
4. **Comprobante de domicilio fiscal** (vigente).
5. **Identificaciones** de socios y, si aplica, poderes notariales.
6. **Comprobación de aportaciones** (efectivo, especie o trabajo con lineamientos claros).

## Cláusulas críticas en los estatutos
- **Drag along / Tag along**: protege tanto a mayoría como a minorías ante una venta.
- **Vesting de fundadores** (ej. 4 años con 1 de cliff) para alinear permanencia.
- **No competencia y no solicitación**: evita fuga de clientes/equipo.
- **Preferencias líquidas** y **prorrata** en futuras rondas.
- **Mecanismos de resolución de disputas** (mediación/arbitraje).

> 💡 **Tip legal**: define qué decisiones requieren **mayorías calificadas** (p.ej. emisión de acciones, endeudamiento, cambio de objeto social).

## Flujo resumido
1. Termina el borrador de estatutos.
2. Agenda con notaría → firma acta.
3. Tramita **RFC** y **e.firma**.
4. Abre cuenta bancaria y registra **libro de acciones**.
5. Ajusta políticas internas (firmas mancomunadas, poderes, etc.).

## Conclusión
La S.A.P.I. acelera la inversión y profesionaliza la empresa, **si** estatutos y acuerdos de socios están bien blindados desde el día uno.`,
  },
  {
    id: '2',
    slug: 'contratos-mercantiles-b2b',
    title: 'Contratos mercantiles: cómo blindar tus acuerdos B2B',
    excerpt:
      'Elementos esenciales, errores comunes y buenas prácticas para contratos entre empresas que sí se cumplen.',
    cover:
      'https://static.vecteezy.com/system/resources/previews/002/921/775/non_2x/lawyers-and-judge-people-cartoon-character-vector.jpg',
    date: '2025-07-28',
    readTime: '6 min',
    tag: 'Mercantil',
    content: `> **TL;DR**
> - Define **objeto**, **alcance**, **entregables**, **pagos** y **penalidades**.
> - Incluye **confidencialidad** y **propiedad intelectual**.
> - Fija **jurisdicción** y preferiblemente **arbitraje** para controversias.

## Por qué fallan los contratos entre empresas
La mayoría de disputas vienen de alcances ambiguos, hitos de pago mal definidos o la ausencia de penalidades.

![Firma de contrato](https://images.unsplash.com/photo-1554224154-22dec7ec8818)

## Plantilla mínima (y efectiva)
- **Objeto y alcance**: qué harás y qué no harás.
- **Entregables y criterios de aceptación** (medibles).
- **Precio, hitos y forma de pago** (con calendario).
- **Garantías y limitación de responsabilidad**.
- **Confidencialidad** (NDA) y **propiedad intelectual** (quién es dueño de qué).
- **Término y terminación anticipada** (con causales).
- **Penalidades por incumplimiento** (reales y proporcionales).
- **Jurisdicción** y mecanismo de solución de controversias (**mediación/arbitraje**).

## Errores comunes (evítalos)
1. Usar plantillas genéricas de internet sin adaptar al caso.
2. No detallar entregables ni criterios de aceptación.
3. Omitir penalidades y garantías.
4. No prever **fuerza mayor** y ajustes por cambios pedidos por el cliente.

> 🧭 **Oportunidad**: Un contrato claro **acelera ventas**, reduce back-and-forth y **evita litigios** costosos.

## Checklist rápido antes de firmar
- [ ] Alcance y límites cerrados.
- [ ] Cronograma e hitos con aceptación.
- [ ] Pagos y penalidades claras.
- [ ] Confidencialidad + PI.
- [ ] Vías de resolución de conflictos.`,
  },
  {
    id: '3',
    slug: 'pld-guia-pymes',
    title: 'Prevención de Lavado de Dinero: guía práctica para pymes',
    excerpt:
      'Quiénes deben cumplir, obligaciones clave (KYC, avisos, políticas) y sanciones por incumplimiento en México.',
    cover: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    date: '2025-08-10',
    readTime: '7 min',
    tag: 'PLD',
    content: `> **TL;DR**
> - No solo bancos: **inmobiliarias, notarías, joyerías y despachos** tienen obligaciones PLD.
> - Implementa **KYC**, **avisos a la UIF**, **manuales internos** y **conserva documentos 5 años**.
> - Las multas pueden superar los **$5 millones MXN**.

## ¿Quiénes están obligados?
Además del sector financiero, caen en **actividades vulnerables**: **inmobiliarias, notarios, joyeros, comercio de vehículos, outsourcing** y **servicios profesionales** en ciertos supuestos.

![PLD en negocios](https://images.unsplash.com/photo-1521790797524-b2497295b8a0)

## Obligaciones básicas
1. **Identificación de clientes (KYC)**  
   INE/Pasaporte, comprobante de domicilio, **RFC** y conocimiento del origen de recursos.
2. **Avisos a la UIF**  
   Reportes de **operaciones relevantes, inusuales o internas preocupantes** por arriba de umbrales.
3. **Políticas y manuales internos**  
   Roles, procedimientos, matrices de riesgo y capacitación periódica.
4. **Conservación de documentos**  
   Guarda expedientes **mínimo 5 años**.
5. **Oficial de Cumplimiento** (si aplica) y auditorías internas.

## Señales de alerta (red flags)
- Pagos en efectivo cercanos a umbrales.
- Clientes renuentes a proporcionar datos.
- Operaciones sin justificación económica.

> 🧩 **Tip práctico**: digitaliza expedientes y crea **checklists** de KYC por tipo de cliente. Reducen errores y aceleran auditorías.

## Sanciones
Multas desde **$15,000** hasta **>$5,000,000 MXN**, suspensión de actividades y, en casos graves, responsabilidades penales.

## Conclusión
Un programa PLD proporcional al riesgo **evita sanciones** y te hace más confiable ante bancos y socios.`,
  },
  {
    id: '4',
    slug: 'deducciones-fiscales-2025',
    title: 'Deducciones fiscales 2025 que sí puedes aprovechar',
    excerpt:
      'Qué gastos son deducibles, requisitos del SAT y errores frecuentes al intentar deducir “de todo”.',
    cover:
      'https://liquidcapitalcorp.com/wp-content/uploads/2016/10/tax-deductions.png',
    date: '2025-08-12',
    readTime: '8 min',
    tag: 'Fiscal',
    content: `> **TL;DR**
> - Deducible = **indispensable + CFDI válido + pagado correctamente**.
> - Ordena **viáticos, arrendamientos, inversiones** y **honorarios**.
> - Evita mezclar gastos personales: es foco rojo en revisiones.

## Gastos deducibles frecuentes
- **Sueldos y salarios** (CFDI, nómina timbrada y cuotas).
- **Honorarios profesionales** con CFDI y contrato.
- **Arrendamiento** de inmuebles.
- **Inversiones**: equipo de cómputo, mobiliario, maquinaria (depreciación).
- **Viáticos** comprobados con CFDI y relación de viaje.
- **Servicios**: telecomunicaciones, plataformas SaaS, contabilidad.

![Deducciones 2025](https://images.unsplash.com/photo-1526304640581-d334cdbbf45e)

## Requisitos del SAT
1. **CFDI** emitido correctamente (uso de CFDI, método/forma de pago).
2. Que el gasto sea **estrictamente indispensable** para la actividad.
3. Registro en **contabilidad** y conciliación bancaria.
4. **Pago** a través de medios autorizados cuando aplique (transferencia, tarjeta).

## Errores comunes
- Cargar gastos personales a la empresa.
- No conservar **soporte de viáticos** (itinerario, objetivos, comprobantes).
- Contratos verbales sin evidencia para **honorarios/servicios**.
- No calcular depreciaciones.

> 🎯 **Oportunidad**: un cierre contable mensual con checklists reduce diferencias y evita ajustes dolorosos en anual.

## Conclusión
Deducir bien no es “gastar por gastar”: es **documentar y registrar** lo indispensable, con soporte perfecto. Ahorra impuestos **sin** poner en riesgo la operación.`,
  },
];
