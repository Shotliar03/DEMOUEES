export interface Article {
  id: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: 'cultivo-arroz',
    title: 'Guía de Cultivo de Arroz en El Salvador',
    category: 'Arroz',
    image: 'https://picsum.photos/seed/rice-field/800/600',
    excerpt: 'El arroz es un pilar de la dieta salvadoreña. Aprende las mejores épocas de siembra y manejo de agua.',
    content: `
# Cultivo de Arroz en El Salvador

El cultivo de arroz (*Oryza sativa*) es fundamental para la seguridad alimentaria en El Salvador. Se cultiva principalmente en zonas con buena disponibilidad de agua.

## 1. Épocas de Siembra
En El Salvador, la siembra se realiza mayoritariamente en la época lluviosa (mayo a octubre). En zonas con riego, se puede cultivar durante todo el año.

## 2. Preparación del Suelo
El suelo debe estar bien nivelado para un manejo eficiente del agua. Se recomienda el uso de fangueo en sistemas de riego por inundación.

## 3. Variedades Recomendadas
- **CENTA A-8**: Muy popular por su resistencia y rendimiento.
- **CENTA A-5**: Adaptada a diferentes condiciones climáticas.

## 4. Manejo de Plagas
Es vital monitorear el "vaneo del grano" y ataques de insectos como la *Sogata*. El uso de control biológico es altamente recomendado.

## 5. Cosecha
Se realiza cuando el grano tiene entre un 20% y 22% de humedad, generalmente 120-140 días después de la siembra.
    `
  },
  {
    id: 'cultivo-frijol',
    title: 'Producción de Frijol Rojo: Tradición y Técnica',
    category: 'Frijoles',
    image: 'https://picsum.photos/seed/beans/800/600',
    excerpt: 'El frijol rojo de seda es el más cotizado. Conoce cómo proteger tu cosecha de la sequía y plagas.',
    content: `
# Cultivo de Frijol en El Salvador

El frijol (*Phaseolus vulgaris*) es la principal fuente de proteína para los salvadoreños.

## 1. Ciclos de Cultivo
- **Siembra de Primera**: Mayo-Junio (Zonas altas).
- **Siembra de Postrera**: Agosto-Septiembre (La más importante para el mercado nacional).
- **Siembra de Apante**: Noviembre-Diciembre (En zonas con humedad residual).

## 2. Selección de Semilla
Se recomienda el uso de semilla certificada como:
- **CENTA San Andrés**
- **CENTA Pipil**
- **CENTA Costeño 2**

## 3. Fertilización
El frijol responde bien al fósforo. Es ideal aplicar fertilizante al momento de la siembra a un lado de la semilla.

## 4. Control de Enfermedades
El Mosaico Dorado es una de las mayores amenazas. Se controla combatiendo la mosca blanca y usando variedades resistentes.

## 5. Almacenamiento
Para evitar el gorgojo, se recomienda el uso de silos metálicos o bolsas herméticas.
    `
  },
  {
    id: 'cultivo-maiz',
    title: 'Maíz: El Grano Sagrado de Cuscatlán',
    category: 'Maíz',
    image: 'https://picsum.photos/seed/corn/800/600',
    excerpt: 'Desde la milpa tradicional hasta sistemas tecnificados. Maximiza tu rendimiento de grano blanco.',
    content: `
# Cultivo de Maíz en El Salvador

El maíz (*Zea mays*) es el cultivo con mayor superficie sembrada en el país.

## 1. Preparación del Terreno
La labranza mínima es recomendada para conservar la humedad y evitar la erosión en laderas.

## 2. Densidad de Siembra
Se recomienda una densidad de aproximadamente 50,000 a 60,000 plantas por manzana para obtener rendimientos óptimos.

## 3. Híbridos y Variedades
- **Híbridos (H-59, HE-103)**: Para mayores rendimientos en zonas bajas y medias.
- **Variedades (CENTA Pasaquina)**: Más resistentes a condiciones de sequía.

## 4. Control de Malezas
Los primeros 30 días son críticos. El maíz debe estar libre de competencia para un buen desarrollo inicial.

## 5. Fertilización Nitrogenada
Se realiza generalmente en dos etapas: a la siembra y a los 25-30 días después de germinado (cuando la planta tiene "rodillera").
    `
  }
];
