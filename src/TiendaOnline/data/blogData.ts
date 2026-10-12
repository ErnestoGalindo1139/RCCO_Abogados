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
  // Reemplaza el objeto con id 5 dentro de POSTS por este bloque.
  {
    id: '5',
    slug: 'uso-efectivo-compraventa-inmuebles',
    title:
      'Uso de efectivo en compraventas inmobiliarias: la ley y el criterio del SAT.',
    excerpt:
      'La semana pasada llegó a mi oficina un amigo desarrollador, comentándome que iba a llevar a cabo una operación de compraventa de un inmueble por la cantidad de $4´000,000.00 M.N. (cuatro millones de pesos 00/100 Moneda Nacional), que de esa operación recibiría $900,000.00 M.N. (novecientas mil pesos 00/100 Moneda Nacional) en efectivo, me preguntó si con las reformas y la publicación de las nuevas reglas en materia de Prevención de Lavado de Dinero había restricciones al uso de efectivo en operaciones inmobiliarias, le comenté que en el análisis de fondo, la restricción esencial permanece inalterada, sin embargo, había que considerar ciertos detalles que las reformas aclararon como las siguientes:',
    cover:
      'https://images.mediotiempo.com/qWSOD7_K7FdLL8xpUtbOmtfhlws=/345x194/uploads/media/2026/07/13/limite-efectivo-puedes-pagar-inmueble.jpg',
    date: '2026-10-09',
    readTime: '7 min',
    tag: 'Prevención de Lavado de Dinero',
    content: `
## EL USO DE EFECTIVO SE ENCUENTRA COMPLETAMENTE PROHIBIDO EN COMPRAVENTAS DONDE EL VALOR DE OPERACIÓN SEA IGUAL O SUPERIOR A 8,025 UMA ($941,412.75 M.N. (NOVECIENTOS CUARENTA Y UN MIL CUATROCIENTOS DOCE PESOS 74/100 MONEDA NACIONAL).

La semana pasada llegó a mi oficina un amigo desarrollador, comentándome que iba a llevar a cabo una operación de compraventa de un inmueble por la cantidad de $4´000,000.00 M.N. (cuatro millones de pesos 00/100 Moneda Nacional), que de esa operación recibiría $900,000.00 M.N. (novecientas mil pesos 00/100 Moneda Nacional) en efectivo, me preguntó si con las reformas y la publicación de las nuevas reglas en materia de Prevención de Lavado de Dinero había restricciones al uso de efectivo en operaciones inmobiliarias, le comenté que en el análisis de fondo, la restricción esencial permanece inalterada, sin embargo, había que considerar ciertos detalles que las reformas aclararon como las siguientes:

- Se confirma que los pagos en efectivo, aun cuando su liquidación se efectúe mediante una entidad financiera como el depósito directo en ventanilla a la cuenta del vendedor, se considerarán legalmente como uso de efectivo. Esta precisión ratifica que el medio material de pago es el que define la naturaleza de la operación,

- Que conforme a la modificación del artículo 6 del Reglamento de la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita (LFPIORPI), las contribuciones generadas forman parte del valor del acto para determinar la restricción. Así, en inmuebles comerciales gravados con IVA, dicho impuesto debe sumarse al importe de la operación para verificar el umbral de 8,025 UMA.

- Se establece explícitamente la prohibición de realizar consignaciones de pago, ya sean judiciales o extrajudiciales, en efectivo respecto de los actos señalados en el artículo 32 de la Ley

Tales modificaciones, no afectaban la operación.

No obstante lo comentado con el cliente, hay un punto que llamó bastante mi atención, la manera en cómo está redactada la modificación del último párrafo del artículo 6 del Reglamento:

Para determinar el monto de los actos u operaciones a que se refiere el artículo 32 de la Ley, deberán considerarse las contribuciones y demás accesorios que en dicho acto u operación se generen.

Dispone que, para determinar el monto de los actos u operaciones sujetos a la restricción del uso de efectivo, deben incluirse las contribuciones correspondientes. Esta precisión, lejos de ser superflua, implica confirmar algo que ya nos venía diciendo la ley y el reglamento, que el pago en efectivo queda totalmente prohibido cuando el valor de la operación —al sumar las contribuciones y accesorios— alcance o supere los umbrales previstos en las fracciones del artículo 32 de la Ley; en consecuencia, no podrá liquidarse monto alguno en efectivo, ni siquiera de forma parcial, cuando la operación sea por montos iguales o mayores 8,025 veces el valor diario de la UMA.

Pongámoslo en contexto, imaginemos que un desarrollador vende un local comercial a un precio menor de 8,025 veces el valor diario de la UMA, supongamos, a $940,0000.00 M.N. (novecientos cuarenta mil pesos 00/100 Moneda Nacional), a ese local, al ser un inmueble comercial, le sumamos el IVA, $150,400.00 M.N. (ciento cincuenta mil cuatrocientos pesos 00/100 Moneda Nacional), lo cual da un valor total de la operación de $1´090,400.00 M.N. (un millón noventa mil cuatrocientos pesos 00/100 Moneda Nacional), al alcanzar y rebasar el umbral el artículo 32 fracción I de la ley, en esta operación queda completamente prohibido el uso de efectivo, incluso, parcialmente.

Esta interpretación no es nueva, es reiterativa y la vuelvo a sacar a la luz, porque se nos olvida en ocasiones como abogados el verdadero espíritu de la ley cuando la autoridad publica sus criterios. Por mucho tiempo se ha pensado, que en la enajenación de inmuebles se puede recibir efectivo en tanto no se reciba igual o más de ocho mil veinticinco veces el valor diario de la UMA ($941,412.75 M.N. al día de hoy), pero esto no es conforme a la ley, ni su reglamento faculta a eso, sino que lo hace la autoridad por medio de sus criterios, por lo cual, la redacción del artículo 6 del reglamento no está de más, es confirmativa de un criterio que ya se establecía en la ley.

Es que cuando nosotros leemos el artículo 32 de la ley, poniendo especial atención a la fracción I, este dice a la letra lo siguiente:

Capítulo IV

Del Uso de Efectivo y Metales

Artículo 32. Queda prohibido dar cumplimiento a obligaciones y, en general, liquidar o pagar, así como aceptar la liquidación o el pago, de actos u operaciones mediante el uso de monedas y billetes, en moneda nacional o divisas y Metales Preciosos, aun cuando la liquidación o el pago se realice en efectivo por conducto de una Entidad Financiera, en los supuestos siguientes:

- Constitución o transmisión de derechos reales sobre bienes inmuebles por un valor igual o superior al equivalente a ocho mil veinticinco veces el valor diario de la UMA, al día en que se realice el pago o se cumpla la obligación;

Parafraseando este artículo, podemos decir que: queda estrictamente prohibido pagar, liquidar o recibir pagos en efectivo —ya sea en moneda nacional, divisas extranjeras o metales preciosos— para la compraventa o constitución de derechos sobre bienes inmuebles, si el importe de la operación alcanza o supera las 8,025 UMA al momento de realizar la transacción. Esta restricción aplica de manera idéntica aunque el dinero se entregue en ventanilla bancaria a través de una entidad financiera. Hasta aquí no da cabida a que tal prohibición sea parcial, sino que es tajante y total, “prohibido dar cumplimiento”.

La primera conclusión que sacamos hasta aquí, es que la ley, prohibe pagar total o parcialmente operaciones de compraventa (y constitución de otros derechos reales) sobre inmuebles cuando alcance o supere el valor de las 8,025 UMA.

Por otro lado, los criterios del SAT se fundamentan en que “Se podrán dar o aceptar para cubrir las obligaciones de pago, monedas y billetes, en moneda nacional o divisas, así como Metales Preciosos hasta por debajo del monto máximo que establece en cada uno de los supuestos del artículo 32 de la Ley, ya sea que este monto se cubra en una o varias exhibiciones, en términos de lo señalado en el artículo 42, fracción I, del Reglamento.”, pero la interpretación del artículo 42 fracción I del reglamento es incorrecta, cito a la letra el artículo:

Art. 42. Las prohibiciones de uso de monedas y billetes, en moneda nacional o divisas y Metales Preciosos, establecidas en el Capítulo IV de la Ley, deberán ser observadas en los términos establecidos en la Ley cuando:

I. Se dé cumplimiento a la obligación, se liquide, se pague, se consigne o se acepte el pago o liquidación de un acto u operación individual, ya sea en una o más exhibiciones, o

II. Se dé cumplimiento a la obligación, se liquide, se pague, se consigne o se acepte el pago o la liquidación de un conjunto de actos u operaciones, y una sola persona aporte recursos para pagarlos o liquidarlos

Lo que nos dice dicho artículo es que las restricciones al uso de efectivo deben acatarse tanto si se cubre una sola operación —ya sea en una sola exhibición o mediante abonos fraccionados—, como si se tratase de varias operaciones distintas cuyos recursos provengan de una misma persona y rebasen conjuntamente los topes legales permitidos, a mi consideración refuerza la primera de las conclusiones, que el efectivo se prohibe total o parcialmente cuando se alcanzan los umbrales de restricción del artículo 32 en una operación, y que los pagos parciales computan para el efectivo, y que no importa si estos son menores que las 8,025 UMA.

Hasta aquí la conclusión número dos es que, si la operación es a plazos o pagos fraccionados, también se consideran los pagos parciales restringidos si la operación no permite el pago en efectivo por alcanzar el umbral.

Mis conclusiones consolidadas son las siguientes:

- En una operación inmobiliaria solo se permite total o parcialmente efectivo cuando el valor de la operación es inferior a 8,025 UMA.

- Cuando la operación -contando contribuciones y accesorios- alcanza o supera 8,025 UMA no se puede pagar ni un peso en efectivo, queda completamente restringido el uso de efectivo.

- Si la operación se paga en fracciones o parcialmente, pero sabemos que el valor de operación alcanzará libre o con contribuciones y accesorios el monto de 8,025 UMA, se deben restringir en esos pagos parciales o fraccionados el uso de efectivo.

En este tenor, solo se permite el efectivo cuando la operación inmobiliaria es inferior (al día de hoy) a $941,412.75 M.N. (considerando contribuciones y accesorios en el conteo), es decir, solo permite prácticamente, en terrenos, inmuebles de interés social o locales comerciales económicos. Ahora, habría de considerar si el ISAI (impuesto municipal sobre adquisición de inmuebles) y pagos de registro público entran en el conteo global de la operación, en sentido literal si.

Entonces ¿que sostiene que se permitan pagos parciales en efectivo en operaciones compraventas (constitución de otros derechos reales) sobre inmuebles que alcanzan o superan el monto de 8,025 UMA? simplemente un par de criterios del SAT publicados en el portal de PLD (https://sppld.sat.gob.mx/pld/interiores/preguntas.html), los cuales dicen:

“8.- ¿Cuando la operación exceda del monto permitido para operaciones en efectivo, se pueden pagar una parte en efectivo y la otra con tarjeta de débito, crédito o cheque?

[Ver respuesta]

“Sí, se podrá pagar en moneda nacional o divisas y Metales Preciosos el monto por debajo del límite establecido de la restricción y el remanente a través de otro medio de pago.”

Cito literalmente el recuadro de la consulta:

> “32

> “II

> “¿Se puede aceptar para el cumplimiento de las obligaciones de pago monedas y billetes o Metales Preciosos, siempre y cuando la suma del pago recibido en una o varias exhibiciones sea menor a la cantidad máxima que establece la Ley?

> “Se podrán dar o aceptar para cubrir las obligaciones de pago, monedas y billetes, en moneda nacional o divisas, así como Metales Preciosos hasta por debajo del monto máximo que establece en cada uno de los supuestos del artículo 32 de la Ley, ya sea que este monto se cubra en una o varias exhibiciones, en términos de lo señalado en el artículo 42, fracción I, del Reglamento.”

Tales criterios resultan técnicamente erróneos, aun cuando admito que son convenientes tanto para el Sujeto Obligado como para el cliente o usuario de Actividades Vulnerables. Sin embargo, vale la pena tener en cuenta este escenario, ya que la autoridad válidamente puede modificarlos cuando exista una imperante necesidad de interés público. Dicha variación interpretativa no sería infundada ni arbitraria, pues el propio orden jurídico reconoce la facultad revisora del Estado en aras del interés colectivo; no obstante, la autoridad se encuentra jurídicamente impedida para aplicar el nuevo criterio de manera retroactiva.  

Lo anterior encuentra sustento en el principio de confianza legítima, el cual —conforme a la jurisprudencia de la Segunda Sala de la Suprema Corte de Justicia de la Nación (Tesis 2a./J. 103/2018 y 2a. XXXVIII/2017)— constituye una manifestación directa de la seguridad jurídica y de la interdicción de la arbitrariedad tuteladas en los artículos 14 y 16 constitucionales. En términos de dicho criterio jurisdiccional, la seguridad jurídica descansa en la premisa elemental de que el gobernado debe "saber a qué atenerse" respecto de la conducta estatal, protegiendo las expectativas razonablemente inducidas por la propia autoridad a través de sus actos u omisiones persistentes en el tiempo. Por tanto, si los particulares ajustaron su actuar y estructuraron sus operaciones conforme a las posturas administrativas emitidas previamente por el órgano regulador, un cambio intempestivo o retroactivo vulneraría la estabilidad jurídica y rompería la expectativa inducida, rigiendo además el principio de irrevocabilidad unilateral de los actos administrativos favorables. En consecuencia, cualquier rectificación de criterio por razones de orden público únicamente puede surtir efectos hacia el futuro (ex nunc).

En tanto la autoridad no modifique su criterio, lo prudente —y lo que en la práctica va a seguir ocurriendo— es operar bajo la interpretación más laxa que el propio SAT ha publicado, precisamente porque es esa postura la que hoy genera la expectativa legítima que discutimos. Pero esto no debe confundirse con seguridad jurídica absoluta: quien estructura sus operaciones asumiendo que el criterio permanecerá intacto para siempre, está construyendo sobre una base que la autoridad puede modificar en cualquier momento, sin que ello constituya, por sí mismo, un acto arbitrario.

De ahí que, para quienes intervienen en este tipo de operaciones —notarios, desarrolladores, oficiales de cumplimiento—, valga la pena adoptar, desde ahora, algunas prácticas mínimas:

- Documentar expresamente, dentro del expediente de la operación, el criterio vigente al momento en que se recibió el pago —incluyendo, de ser posible, una captura o copia del criterio publicado en el portal del SAT—, de manera que quede acreditada la buena fe y la conformidad con la postura oficial vigente en esa fecha.

- Precisar, en cada operación, si el monto de referencia para el umbral del artículo 32 incluye o no contribuciones, dejando constancia del desglose (precio base, IVA, y en su caso ISAI), en lugar de manejar únicamente una cifra global.

- Ante la duda sobre partidas específicas —como el propio ISAI, que aquí dejamos abierta—, no asumir un criterio propio: lo conducente es plantear una consulta formal ante el SAT o la UIF, cuya respuesta, además de resolver el caso concreto, se sumaría como un nuevo elemento de esa misma confianza legítima si más adelante la autoridad pretendiera variar su postura.

Al final, el ejercicio no es distinto del que hacemos con cualquier criterio administrativo: aprovecharlo mientras esté vigente, sin perder de vista que su origen no está en la ley, sino en una interpretación de la autoridad —y que, como toda interpretación, puede corregirse.

Autor: Lic. Joel Gibrán Osuna Laveaga.

## BIBLIOGRAFÍA Y FUENTES DE CONSULTA

### I. Legislación y Reglamentos

- Congreso General de los Estados Unidos Mexicanos. (2012). Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita. Diario Oficial de la Federación, 17 de octubre de 2012 (con sus reformas y adiciones). Artículos 32, fracción I, y 33.

- Presidencia de la República. (2013). Reglamento de la Ley Federal para la Prevención e Identificación de Operaciones con Recursos de Procedencia Ilícita. Diario Oficial de la Federación, 16 de agosto de 2013 (con sus reformas y adiciones). Artículos 6, último párrafo, y 42, fracciones I y II.

### II. Criterios Administrativos e Institucionales

- Servicio de Administración Tributaria (SAT) & Unidad de Inteligencia Financiera (UIF). (s. f.). Preguntas Frecuentes y Criterios de la Autoridad en materia de Prevención de Lavado de Dinero. Sistema del Portal de Prevención de Lavado de Dinero (SPPLD), Secretaría de Hacienda y Crédito Público. Recuperado de: https://sppld.sat.gob.mx/pld/interiores/preguntas.html (Preguntas 8 y 32, fracción II).

### III. Jurisprudencia del Poder Judicial de la Federación

- Suprema Corte de Justicia de la Nación. Segunda Sala. (2017). Tesis 2a. XXXVIII/2017 (10a.), Semanario Judicial de la Federación, Décima Época, Materia Administrativa, Tesis Aislada, Registro digital: 2013882. Rubro: CONFIANZA LEGÍTIMA. SU APLICACIÓN EN EL ORDEN JURÍDICO MEXICANO RESPECTO DE ACTOS ADMINISTRATIVOS.

- Suprema Corte de Justicia de la Nación. Segunda Sala. (2018). Tesis 2a./J. 103/2018 (10a.), Gaceta del Semanario Judicial de la Federación, Décima Época, Libro 59, Tomo I, página 847, Materia Constitucional, Jurisprudencia, Registro digital: 2018050. Rubro: CONFIANZA LEGÍTIMA. CONSTITUYE UNA MANIFESTACIÓN DEL DERECHO A LA SEGURIDAD JURÍDICA, EN SU FACETA DE INTERDICCIÓN DE LA ARBITRARIEDAD.
`,
  },
  {
    id: '1',
    slug: 'distintivo-hecho-en-mexico',
    title:
      'El distintivo “Hecho en México”: entre el posicionamiento estratégico y la responsabilidad jurídica',
    excerpt:
      'Análisis jurídico y estratégico del sello “Hecho en México”, su marco normativo, obligaciones y utilidad empresarial.',
    cover:
      'https://iphonegr.reforma.com/libre/online07/imagetransformer2/ImageTransformer.aspx?img=https://img.gruporeforma.com/imagenes/960x640/6/936/5935487.jpg&imagencompleta=1',
    date: '2025-02-17',
    readTime: '10 min',
    // tag: 'Propiedad Industrial',
    content: `

Autoría: Liz Lascarez Calderón.  
Abogada Corporativa en RCCO Abogados.

En un contexto global caracterizado por una creciente competencia económica y una demanda cada vez mayor por productos con valor agregado, la trazabilidad del origen y la sostenibilidad en los procesos productivos se han convertido en factores estratégicos clave para el posicionamiento comercial. En este escenario, el relanzamiento de la marca "Hecho en México" y su versión internacional "Made in Mexico" —regulada por el Acuerdo publicado en el Diario Oficial de la Federación el 17 de febrero de 2025— representa un esfuerzo institucional por fortalecer la competitividad de los productos mexicanos en los mercados nacionales e internacionales.

No obstante, más allá de su dimensión comercial o promocional, esta certificación implica una serie de obligaciones jurídicas que deben ser entendidas y cumplidas por los actores económicos que pretendan utilizarla. Este artículo tiene como propósito analizar el marco legal que regula el uso de la marca "Hecho en México", destacar sus principales implicaciones jurídicas, y explicar por qué constituye no solo un distintivo de calidad, sino un instrumento normativo con efectos legales, comerciales y reputacionales de gran relevancia para las empresas mexicanas.

## Marco normativo aplicable

La marca “Hecho en México” se regula principalmente por el Acuerdo que establece las disposiciones para su uso. Este acuerdo establece las bases para solicitar, utilizar, renovar o revocar el distintivo, y encuentra sustento en la Ley Federal de Protección a la Propiedad Industrial, particularmente en lo relativo a las marcas de certificación.

Adicionalmente, el uso del sello está relacionado con políticas públicas de impulso a la economía nacional, promoción de exportaciones y cumplimiento de los Objetivos de Desarrollo Sostenible (ODS). El distintivo “Hecho en México” está registrado por la Secretaría de Economía ante el Instituto Mexicano de la Propiedad Industrial (IMPI), lo que le otorga una naturaleza jurídica protegida, tanto frente al mal uso como ante intentos de imitación o uso no autorizado.

## Implicaciones jurídicas clave

Para el sector empresarial, el uso del sello “Hecho en México” conlleva una herramienta valiosa para reforzar la identidad de marca, generar confianza en el consumidor y mejorar su posicionamiento comercial. Sin embargo, esta ventaja estratégica viene acompañada de una serie de responsabilidades jurídicas que deben ser atendidas con seriedad. El marco normativo vigente impone condiciones específicas que regulan tanto la forma en que puede utilizarse el distintivo como los compromisos que adquiere quien lo ostenta.

// Entre las principales obligaciones destacan el respeto al Manual de Identidad Gráfica, que impide modificar el diseño del sello o darle mayor protagonismo que a la marca propia; el uso exclusivo del distintivo para los productos expresamente autorizados, sin posibilidad de extenderlo a otros sin nueva solicitud; y la prohibición absoluta de ceder o sublicenciar su uso, incluso entre empresas relacionadas. Además, se exige un compromiso comprobable con la manufactura nacional y con prácticas sostenibles alineadas con los Objetivos de Desarrollo Sostenible (ODS). También es obligatoria la renovación del permiso cada cinco años, iniciando el trámite con al menos seis meses de anticipación, y el retiro inmediato del sello en caso de revocación o vencimiento del permiso, conforme a lo dispuesto en el Acuerdo.

El uso indebido del distintivo puede generar consecuencias legales, según lo dispuesto por los artículos 387, 388, 389 y 402 de la Ley Federal de Protección a la Propiedad Industrial, como sanciones por infracción administrativa y acciones legales por competencia desleal, afectación a derechos de propiedad industrial y responsabilidad contractual, así como consecuencias penales.

## Aplicación práctica y utilidad empresarial

En la práctica, el distintivo “Hecho en México” funciona como un sello de valor y confianza para el consumidor final, y como una herramienta diferenciadora para las empresas que buscan fortalecer su presencia en mercados nacionales e internacionales. Sectores como la agroindustria, los textiles, el diseño industrial, las manufacturas especializadas y las tecnologías emergentes pueden beneficiarse especialmente de este reconocimiento oficial.

Además, su valor jurídico como marca de certificación puede ser decisivo en procesos de exportación, licitaciones públicas y alianzas estratégicas, ya que ofrece una garantía institucional sobre el origen, la calidad y el cumplimiento normativo del producto.

No obstante, para que esta ventaja se materialice, es indispensable que las empresas cumplan con todos los requisitos legales y técnicos establecidos por la autoridad competente, y que evalúen el uso del distintivo como una decisión estratégica y jurídica a la vez.

## Conclusión

El distintivo “Hecho en México” no debe entenderse únicamente como una herramienta de marketing o identidad visual, sino como un instrumento jurídico complejo que exige cumplimiento normativo y genera derechos y obligaciones tanto para los titulares como para la autoridad.

Para el sector empresarial, representa una oportunidad para elevar su competitividad, reforzar su reputación y acceder a nuevos mercados. Sin embargo, también implica asumir responsabilidades legales concretas, cuyo desconocimiento puede acarrear riesgos significativos.

En RCCO Abogados asesoramos a empresas de distintos sectores en el proceso de obtención, cumplimiento y protección legal del uso del distintivo “Hecho en México”, así como en cualquier asunto relacionado con propiedad industrial y certificaciones normativas.

## Bibliografía

- Diario Oficial de la Federación. (2025, 17 de febrero). Acuerdo por el que se dan a conocer las marcas de certificación HECHO EN MÉXICO y MADE IN MEXICO y se expiden sus reglas de uso. Diario Oficial de la Federación. https://www.dof.gob.mx. 
- Congreso de los Estados Unidos Mexicanos. (2020). Ley Federal de Protección a la Propiedad Industrial. Diario Oficial de la Federación, 1 de julio de 2020. https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPI_010720.pdf. 
- Congreso de los Estados Unidos Mexicanos. (1993). Ley de Comercio Exterior. Diario Oficial de la Federación. Última reforma publicada el 1 de diciembre de 2020. Recuperado de https://www.diputados.gob.mx/LeyesBiblio/pdf/243_011220.pdf
- Gobierno de México. (2020). Tratado entre México, Estados Unidos y Canadá (T-MEC). Capítulos 4 y 11. Publicado en el Diario Oficial de la Federación. Recuperado de https://www.gob.mx/cms/uploads/attachment/file/541367/T-MEC-TEXTO-INTEGRO.pdf
  `,
  },
  {
    id: '2',
    slug: 'semana-planeacion-patrimonial',
    title: 'Semana de la Planeación Patrimonial para la Sucesión Efectiva',
    excerpt:
      'Reflexión jurídica y humana sobre la importancia de organizar la herencia y los instrumentos legales para lograr una sucesión efectiva.',
    cover: 'img/blogPlaneacion.jpg',
    date: '2025-09-15',
    readTime: '12 min',
    // tag: 'Planeación Patrimonial',
    content: `
Heredar con orden: una decisión que no puede posponerse

Autor: Joel Gibrán Osuna Laveaga.  
Abogado Corporativo en RCCO Abogados.

Hay decisiones difíciles y otras que, además, son necesarias. La planeación de la sucesión patrimonial forma parte de estas últimas. Más allá del aspecto legal, organizar la herencia implica reflexionar sobre la responsabilidad familiar, el merecimiento, el afecto y el legado que se quiere dejar.

El titular de los bienes, muchas veces cabeza de familia o empresario, se enfrenta al dilema de cómo distribuir su patrimonio. Este no es un ejercicio puramente económico, sino también emocional, ya que involucra decisiones sobre quién merece qué y por qué.

Planificar con tiempo permite evitar conflictos futuros, garantizar el cumplimiento de deberes legales hacia dependientes y conservar el equilibrio familiar. El objetivo es claro: lograr una sucesión efectiva, ordenada y jurídica. 

Pero, ¿Cuál es la importancia de planificar la sucesión? La planificación de la sucesión patrimonial conlleva tomar decisiones informadas acerca de cómo y a quién se asignarán los bienes después del fallecimiento del titular. Además, posibilita atender primero a aquellos con los que se tiene una obligación legal, como los hijos menores de edad, el cónyuge o los padres.

Una vez cubiertas esas necesidades básicas, se puede pensar en otros destinatarios: familiares, amigos o incluso instituciones de beneficencia. Lo importante es que el reparto se haga conforme a la voluntad del titular y dentro del marco legal.

Entre los beneficios de planificar la sucesión destacan: la designación libre de beneficiarios, la claridad en las instrucciones, la simplificación de trámites, la prevención de conflictos familiares y el aprovechamiento de beneficios fiscales.

Además, organizar la sucesión permite tener certeza jurídica sobre el destino de los bienes y evita la doble tributación en ciertos casos. 

Cada una de estas herramientas ofrece ventajas particulares dependiendo del contexto personal y familiar del titular, así como del tipo de patrimonio que se pretenda organizar. A continuación, se describen los principales instrumentos jurídicos disponibles para llevar a cabo una planeación sucesoria efectiva, resaltando sus características, beneficios y posibles limitaciones.

La legislación mexicana ofrece diversos instrumentos jurídicos para diseñar un plan de sucesión que responda a las necesidades particulares del titular. La selección dependerá de factores como el tipo de bienes, el número de beneficiarios, los objetivos patrimoniales y las cargas familiares existentes.

Algunos bienes no forman parte del caudal hereditario tradicional. Un claro ejemplo son las cuentas bancarias, que conforme al artículo 93 de la Ley de Instituciones de Crédito, permiten la designación directa de beneficiarios, los cuales pueden modificarse en cualquier momento.

De igual forma, los seguros de vida permiten al titular designar a familiares o terceros como beneficiarios. Esta herramienta es clave para asegurar el sustento de quienes dependen económicamente del asegurado.

En el caso de las Afore, la ley distingue entre beneficiarios legales (cónyuge, hijos o padres) y beneficiarios designados. Es importante mantener actualizada esta información para evitar problemas al momento de reclamar los recursos.

Asimismo, existen figuras jurídicas como la donación entre ascendientes y descendientes que permite transferir bienes en vida y con ello, ahorrar impuestos o trámites posteriores. Sin embargo, cuando los beneficiarios son menores de edad o incapaces, es necesario considerar limitaciones jurídicas y autorizaciones judiciales.

Una figura útil dentro de este esquema es la donación de nuda propiedad con reserva de usufructo vitalicio. En este caso, los padres pueden donar el inmueble a sus hijos, pero conservar el derecho de uso y disfrute mientras vivan. Al fallecer, la propiedad se consolida sin necesidad de juicio sucesorio.

Esta figura evita conflictos y garantiza estabilidad para el titular. La desventaja es que los donantes ya no pueden vender el bien sin la intervención de los donatarios o sin revocar judicialmente la donación.

Además de las donaciones en vida, existen otras decisiones legales que, aunque no implican una transmisión inmediata de bienes, sí impactan directamente en la forma en que estos se repartirán en el futuro. Una de ellas es la elección del régimen patrimonial al contraer matrimonio, la cual tiene consecuencias relevantes en la titularidad, disposición y sucesión de los bienes adquiridos durante la vida conyugal.

Definir el régimen patrimonial del matrimonio también forma parte de la planeación sucesoria. Al casarse, los cónyuges pueden optar por la sociedad conyugal o la separación de bienes.

El régimen de separación absoluta permite identificar con claridad a los titulares de cada bien, lo cual facilita la distribución post mortem. Esto evita la necesidad de abrir doble juicio sucesorio en caso de fallecimiento de ambos cónyuges.

Además, el contenido de las capitulaciones matrimoniales puede personalizarse para establecer reglas específicas sobre el destino de los bienes, especialmente si se tienen hijos de distintas relaciones o empresas familiares.

Una vez definidas las bases del régimen patrimonial y las reglas particulares en las capitulaciones matrimoniales, es posible explorar otras figuras legales que permiten estructurar con mayor precisión el destino y aprovechamiento de los bienes. En este sentido, cuando el objetivo no solo es ordenar la sucesión, sino también asegurar estabilidad económica durante la vida del titular, existen mecanismos jurídicos como el contrato de renta vitalicia, que ofrecen alternativas patrimoniales con beneficios inmediatos.

El contrato de renta vitalicia es una figura poco utilizada pero altamente efectiva para quienes desean transformar un bien inmueble en una fuente de ingresos periódicos de por vida.

Por ejemplo, un propietario de un inmueble puede transferirlo a cambio de una renta mensual. Incluso puede establecerse que, en caso de fallecimiento, dicha renta pase a su cónyuge u otra persona.

Este contrato es ideal para adultos mayores que desean mantener estabilidad económica. La principal desventaja radica en la solvencia del deudor, ya que si esta falla, el pago de la renta puede interrumpirse.

No obstante, cuando el interés principal no es recibir una renta durante la vida, sino asegurar que los bienes se administren y distribuyan de forma ordenada después del fallecimiento, existen mecanismos más adecuados. Uno de los más eficaces en este sentido es el fideicomiso con fines testamentarios, el cual permite al titular establecer instrucciones claras sobre el destino de su patrimonio, evitando así juicios sucesorios y brindando mayor certeza a los beneficiarios.

El fideicomiso testamentario permite al titular de los bienes transferirlos a una institución fiduciaria para que, una vez fallecido, sean administrados y distribuidos conforme a sus instrucciones.

Este esquema evita la apertura de un juicio sucesorio y garantiza el cumplimiento de la voluntad del fideicomitente, incluso si los beneficiarios son menores de edad o presentan condiciones especiales.

El principal inconveniente es el costo de constitución y administración, por lo que se recomienda su uso en estructuras patrimoniales de mediana o alta complejidad.

Para quienes buscan una solución más sencilla y accesible, especialmente en patrimonios menos complejos o con una estructura familiar clara, existen opciones tradicionales que siguen siendo igual de válidas y funcionales. En este contexto, el testamento se mantiene como la herramienta jurídica por excelencia para disponer del patrimonio conforme a la voluntad del testador.

El testamento sigue siendo la figura más tradicional en la planeación sucesoria. Permite disponer libremente de los bienes, ya sea mediante herencia (universalidad) o legados (bienes específicos).

Este acto debe formalizarse ante notario y puede ser modificado en cualquier momento mientras el testador mantenga su capacidad jurídica. Es un acto individual y no puede ser conjunto.

En comparación con otras figuras, el testamento sí requiere juicio sucesorio para surtir efectos, lo que puede generar costos y demoras. Sin embargo, sigue siendo una herramienta indispensable, especialmente cuando se tiene un patrimonio moderado y no se desea constituir fideicomisos.

En conclusión, podemos decir que planear es un acto de responsabilidad. Planificar la sucesión patrimonial es una forma de cuidar lo construido y proteger a quienes se quedan. Implica organizar, decidir y formalizar con responsabilidad, para garantizar que el patrimonio cumpla su función más importante: trascender en beneficio de los seres queridos o las causas que más nos importan.

En esta Semana de la Planeación Patrimonial para la Sucesión Efectiva, le invitamos a iniciar o actualizar su estrategia patrimonial con base en sus objetivos personales, familiares y fiscales. Nuestro equipo está listo para acompañarle en este proceso, brindándole asesoría legal especializada y soluciones a la medida.
  `,
  },
  {
    id: '3',
    slug: 'planeacion-sucesoria-empresa-familiar',
    title:
      'Planeación Sucesoria en la Empresa Familiar: Claves para una Transición Ordenada',
    excerpt:
      'Cómo preparar la sucesión directiva y patrimonial en la empresa familiar, garantizando continuidad, armonía y solidez jurídica.',
    cover:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop',
    date: '2025-09-22',
    readTime: '14 min',
    // tag: 'Empresas Familiares',
    content: `
Autoría: 

Joel Gibrán Osuna Laveaga y Liz Lascarez Calderón.

Abogados Corporativos en RCCO Abogados.

En toda empresa familiar, eventualmente llega el momento de enfrentar la sucesión del liderazgo. El socio fundador, quien durante años ha sido el principal motor del negocio, debe ceder el mando a la siguiente generación. Esta etapa representa un punto de inflexión en la vida corporativa de la organización, implicando no solo una reestructura interna, sino también un rediseño estratégico que marcará el futuro de la empresa. Sin embargo, este proceso no puede improvisarse ni dejarse al azar. Como principio básico, debe tenerse claro que no se puede ceder lo que no está en orden.

La planeación sucesoria debe abordarse desde dos vertientes complementarias: la sucesión del mando y la sucesión patrimonial. La primera se refiere a la transferencia de la dirección y el control de la empresa, que puede realizarse hacia un órgano colegiado, un consejo familiar, un director general o una combinación de estos elementos mediante la implementación de un gobierno corporativo. Esta estructura dependerá del tamaño, complejidad y grado de institucionalización de la organización. La segunda vertiente abarca la planificación de los beneficios económicos derivados de la persona moral, como dividendos y utilidades anticipadas, bonos, derechos preferenciales y otros mecanismos de reparto patrimonial.

En el caso particular de las empresas familiares, el reto de la sucesión directiva suele ser mayor, ya que muchas de estas organizaciones carecen de institucionalización y las decisiones estratégicas suelen estar concentradas en una sola persona, que generalmente es el fundador o dueño principal. En estos casos, la transición debe iniciar con un proceso de institucionalización, precedido por un diagnóstico profundo que permita conocer el verdadero estado de salud de la empresa. Esta evaluación no solo debe revelar si se tiene un patrimonio consolidado, sino también si existen problemas estructurales o financieros que puedan heredarse como pasivos, lo que en ciertos escenarios podría justificar incluso la enajenación o liquidación de parte del negocio.

Para ello, en RCCO Abogados, se ha desarrollado una metodología especializada que inicia con la auditoría legal, operativa y patrimonial de la empresa. Esta evaluación contempla diez ejes fundamentales: situación societaria, contratos vigentes, aspectos laborales, propiedad intelectual, juicios y contingencias legales, cumplimiento normativo y gubernamental, cumplimiento en materia de prevención de lavado de dinero, obligaciones fiscales, políticas internas y estructura patrimonial legal. Este diagnóstico integral permite trazar un plan de mejora y actualización, así como diseñar una estrategia sucesoria acorde a la realidad de la empresa y de la familia.

Una vez identificado el estado actual, es momento de preparar la sucesión. El proceso de planeación debe incluir un plan de transición que abarque aspectos legales, financieros, operativos y humanos, estableciendo un cronograma que defina claramente cada etapa: desde la capacitación del sucesor hasta la implementación de nuevos procesos y la delegación efectiva de funciones. Para ello, es indispensable definir los objetivos que la familia y el fundador desean alcanzar con la sucesión. Preguntas tales como: ¿se busca continuar con la operación o cederla? ¿se pretende proteger a ciertos miembros de la familia? ¿Es deseable una optimización fiscal en la transmisión patrimonial? ¿Se quiere dividir el negocio o mantenerlo íntegro? son esenciales para orientar el proceso.

Definir el perfil del sucesor también es crítico. No todas las personas están preparadas para liderar una empresa, y el hecho de pertenecer a la familia no garantiza la idoneidad para asumir ese rol. El próximo líder debe contar con habilidades de liderazgo, conocimiento del giro empresarial, visión estratégica, y valores alineados con la cultura organizacional. Si no existe un perfil adecuado dentro de la familia, puede considerarse a un integrante clave de la empresa; si el perfil existe pero requiere fortalecimiento, lo más recomendable es una sucesión paulatina, que puede extenderse de cinco a diez años, durante los cuales el sucesor será capacitado y asumirá responsabilidades progresivamente.

Otro aspecto determinante es el análisis de la estructura societaria. Es frecuente que las empresas familiares estén integradas por múltiples sociedades, algunas de ellas con estructuras complejas o poco claras. En muchos casos, el poder moral está en manos del fundador, pero el control legal de los activos y decisiones recae en terceros, lo cual puede generar tensiones o vacíos de poder. Por ello, es fundamental revisar y actualizar los estatutos sociales, protocolos y acuerdos familiares, incluyendo cláusulas como derechos de preferencia, venta forzosa de acciones, restricciones a terceros, cláusulas post-mortem, entre otras figuras que refuercen la continuidad empresarial.

Con los elementos anteriores definidos, se procede a diseñar el plan ejecutivo de transición. Este documento establece cómo se llevará a cabo la sucesión en términos prácticos: cronogramas, responsables, asignación de recursos, métricas de éxito y formalización legal. Uno de los ejes centrales de este plan es el desarrollo del sucesor, a través de mentoría y capacitación. La mentoría efectiva implica que el líder actual comparta su experiencia, visión y cultura empresarial con el sucesor, mediante sesiones regulares, participación conjunta en decisiones clave y la delegación progresiva de funciones. Por otro lado, la capacitación formal puede incluir estudios especializados, diplomados, participación en asociaciones empresariales, rotación por áreas clave y, en algunos casos, estudios de posgrado especializados. 

Además de las habilidades técnicas, la formación del sucesor debe enfocarse en el desarrollo de cualidades humanas esenciales para liderar en un entorno complejo: inteligencia emocional, capacidad de comunicación, gestión de conflictos, resiliencia, visión estratégica, ética y compromiso social. Estos atributos son fundamentales para preservar la cohesión familiar, la moral interna y la reputación corporativa.

Una vez iniciada la implementación del plan, la comunicación del cambio se convierte en una pieza clave del proceso. Informar oportunamente a los involucrados —sucesores, directivos, consejo de administración, asesores y colaboradores clave— ayuda a mantener la transparencia, prevenir conflictos y asegurar una transición armónica. La forma, el momento y el contenido de esta comunicación deben cuidarse con detalle, procurando espacios de diálogo que permitan resolver dudas, construir consenso y fortalecer la confianza.

Finalmente, la selección e implementación de instrumentos legales debe alinearse con los objetivos establecidos. Entre las herramientas más utilizadas destacan los fideicomisos de control accionario, la donación de la nuda propiedad de las acciones, la reforma de estatutos sociales, la integración de órganos de gobierno corporativo, la redacción de protocolos familiares y la conformación de un comité de seguimiento que supervise la ejecución del plan y su actualización periódica.

En conclusión, la sucesión empresarial en la empresa familiar requiere una visión estratégica, acompañada de orden, planificación y herramientas jurídicas adecuadas. El éxito del proceso depende de la capacidad de anticiparse, de evaluar con objetividad el estado actual del negocio, y de diseñar una hoja de ruta que garantice la continuidad operativa y la armonía familiar. En RCCO Abogados, acompañamos a nuestros clientes en cada paso del proceso sucesorio, asegurando que el legado construido a lo largo de generaciones pueda proyectarse hacia el futuro con estabilidad y solidez.
  `,
  },
  {
    id: '4',
    slug: 'sucesion-patrimonial-empresa-familiar',
    title:
      'Sucesión patrimonial en la empresa familiar: claves para asegurar la continuidad del legado',
    excerpt:
      'Un plan integral de sucesión con instrumentos legales, protocolos familiares y gobierno corporativo asegura la permanencia del negocio y del legado familiar.',
    cover:
      'https://www.shouplegal.com/wp-content/uploads/2024/02/Business-Succession-Planning.jpg',
    date: '2025-09-29',
    readTime: '13 min',
    // tag: 'Sucesión Empresarial',
    content: `
Joel Gibrán Osuna Laveaga y Liz Lascarez Calderón.

Abogados Corporativos en RCCO Abogados.

El factor decisivo entre una sucesión patrimonial exitosa en la empresa familiar y una fallida es el orden, acompañado de la anticipación necesaria para diseñar la mejor ruta hacia la continuidad operativa del negocio. En este sentido, se identificaron diversos elementos que deben integrarse en el diseño de un plan ejecutivo de transición, entre ellos: la mentoría efectiva, la capacitación, el desarrollo de habilidades socioemocionales, la comunicación del cambio y, de manera especial, la selección de instrumentos legales adecuados.

Cada instrumento jurídico cumple una función específica. El fideicomiso de control accionario sobre voto, por ejemplo, permite determinar quiénes serán los beneficiarios de los derechos económicos de las acciones, tanto en vida como después del fallecimiento del accionista fideicomitente. Además, posibilita separar los derechos económicos de los corporativos, destinando solo estos últimos (como el derecho de voto) al fideicomiso.

Otro recurso fundamental es la actualización de la estructura societaria y de los estatutos sociales. En las grandes empresas familiares, donde pueden coexistir múltiples sociedades, resulta indispensable analizar la estructura accionaria de cada una, su interrelación y los mecanismos de control de hecho y de derecho. A partir de este diagnóstico, se podrán definir estrategias patrimoniales de sucesión, que van desde la reestructuración del grupo bajo una “holding” o tenedora de acciones, hasta la consolidación de sociedades a través de un fideicomiso de control accionario.

Si bien el Gobierno Corporativo no constituye en sí mismo una herramienta legal, su implementación se apoya en diversos instrumentos jurídicos y organizacionales. Su finalidad es establecer un marco de principios familiares y empresariales que garanticen decisiones efectivas, transparentes y coherentes con los intereses de todas las partes. Entre sus componentes destacan el consejo de administración, el consejo externo de consultores, las políticas integrales, el código de ética, el consejo familiar y el comité de seguimiento. Este esquema fomenta la confianza, atrae talento, reduce conflictos, facilita el acceso a financiamiento y asegura la sostenibilidad a largo plazo.

De manera complementaria, la actualización de protocolos, políticas y reglamentos familiares y directivos constituye la columna vertebral de la gobernanza familiar. Estos documentos fijan valores, definen roles, establecen procesos de toma de decisiones y delinean mecanismos de resolución de conflictos. Su proceso de renovación suele dividirse en cuatro fases: diagnóstico, diseño, implementación y comunicación.

Dentro del marco legal también destaca la designación del comité de seguimiento, órgano encargado de supervisar y evaluar la ejecución del plan de sucesión, garantizar el cumplimiento de acuerdos y mediar en los conflictos que pudieran surgir.

Ahora bien, el reto radica en formalizar estas decisiones en documentos legales que brinden certeza jurídica. Entre los más relevantes se encuentran:

- **Pacto de socios o accionistas**: regula la relación entre socios, incluyendo cláusulas de sucesión.  
- **Protocolo familiar**: establece normas y principios entre familia y empresa para prevenir conflictos.  
- **Testamento empresarial**: extensión del testamento personal que regula la participación en la empresa.  
- **Fideicomiso empresarial**: transfiere la gestión de la empresa a un fiduciario en beneficio de los herederos.  
- **Plan de sucesión**: detalla pasos, cronograma e identificación de sucesores.  
- **Estatutos sociales**: incorporan cláusulas de sucesión de directivos y transmisión de acciones.  
- **Contratos de compraventa de acciones con cláusulas de sucesión**: activados en caso de fallecimiento o incapacidad de un socio.  

Cabe destacar que no solo debe contemplarse la sucesión del fundador o dueño, sino también la del socio capitalista, cuya participación consiste en aportar recursos financieros sin intervenir en la gestión diaria. En estos casos, los instrumentos legales permiten una transición ordenada que preserve el capital y la relación con la empresa.

Finalmente, toda estrategia de sucesión debe complementarse con un **Plan Económico de Transición**, entendido como el conjunto de acciones que permiten transferir el patrimonio del socio capitalista originario a su heredero. Un ejemplo típico es la migración paulatina de un empresario que inició como persona física con actividad empresarial y que, para fortalecer el negocio familiar, transformó su esquema a una Sociedad Anónima.

La sucesión patrimonial en la empresa familiar requiere mucho más que buena voluntad: demanda orden, anticipación y el uso adecuado de herramientas legales y organizacionales. Un plan integral de transición —sustentado en instrumentos jurídicos, protocolos familiares, gobierno corporativo y estrategias económicas— garantiza la continuidad operativa, reduce conflictos y asegura la permanencia del legado empresarial a lo largo de generaciones.
  `,
  },
];
