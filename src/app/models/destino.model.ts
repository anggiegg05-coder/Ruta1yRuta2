export type Categoria = 'naturaleza' | 'historia' | 'cultura' | 'aventura' | 'religion';

export interface Destino {
  id: string;
  nombre: string;
  departamento: string;
  ciudad: string;
  categoria: Categoria;
  wikiTitulo?: string;
  descripcion?: string;
  imagen?: string;
  lat?: number; 
  lon?: number; 
}

export interface WikiResumen {
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string; width: number; height: number };
  coordinates?: { lat: number; lon: number };
  content_urls?: { mobile: { page: string } };
}