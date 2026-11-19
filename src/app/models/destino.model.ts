// Categorías permitidas para los destinos
export type Categoria = 'naturaleza' | 'historia' | 'cultura' | 'aventura' | 'religion';

// Datos de un destino que escribimos en destinos.json
export interface Destino {
  id: string;
  nombre: string;
  departamento: string;
  ciudad: string;
  categoria: Categoria;
  wikiTitulo: string;
}

// Parte de la respuesta de Wikipedia que vamos a usar
export interface WikiResumen {
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string; width: number; height: number };
  coordinates?: { lat: number; lon: number };
  content_urls?: { mobile: { page: string } };
}