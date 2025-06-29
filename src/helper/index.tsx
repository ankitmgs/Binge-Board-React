import { TMDB_BACKDROP_BASE_URL, TMDB_IMAGE_BASE_URL } from "../constant/apiUrl";




let movieGenreMap: Map<number, string> | null = null;
let tvGenreMap: Map<number, string> | null = null;

export interface Recommendation {
  id: string; // TMDB ID, or generated ID for hardcoded items, or IMDb ID
  title: string;
  posterUrl: string;
  backdropUrl?: string;
  overview?: string;
  genre: string; // Primary genre name
  genre_ids: number[]; // All genre IDs for this item (might be empty for IMDb data)
  media_type: 'movie' | 'tv'; // To distinguish for filtering and API calls
  popularity?: number; // TMDB popularity score
  original_language?: string;
  release_date?: string; // For movies, e.g., "2023-10-26"
  first_air_date?: string; // For TV shows, e.g., "2023-10-26"
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export const getInitials = (name?: string | null, email?: string | null): string => {
  if (name) {
    const names = name.split(' ').filter(Boolean);
    if (names.length === 0) return email ? email[0].toUpperCase() : 'U';
    if (names.length === 1) return names[0][0]?.toUpperCase() || 'U';
    return (names[0][0] + (names[names.length - 1][0] || '')).toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return 'U';
};


function getGenreMap(mediaType: 'movie' | 'tv'): Map<number, string> {
  if (mediaType === 'movie') {
    return movieGenreMap || new Map();
  }
  return tvGenreMap || new Map();
}

export function mapTmdbItemToRecommendation(
  item: any,
  resolvedMediaType?: 'movie' | 'tv'
): Recommendation | null {
  const mediaType = resolvedMediaType || item.media_type;

  if (mediaType !== 'movie' && mediaType !== 'tv') {
    return null;
  }
   // Ensure items without poster paths are filtered out
  if (!item.poster_path) {
    // console.warn(`[mapTmdbItemToRecommendation] Item "${item.title || item.name}" (ID: ${item.id}) has no poster_path. Filtering out.`);
    return null;
  }


  if (mediaType === 'movie' && !movieGenreMap) {
      console.warn("[TMDB Service - mapTmdbItemToRecommendation] Movie genre map not initialized. Results might be incomplete.");
  }
  if (mediaType === 'tv' && !tvGenreMap) {
      console.warn("[TMDB Service - mapTmdbItemToRecommendation] TV genre map not initialized. Results might be incomplete.");
  }

  const currentGenreMap = getGenreMap(mediaType);
  const title = mediaType === 'movie' ? item.title || item.original_title : item.name || item.original_name;

  if (!item.id || !title) {
    return null;
  }

  const posterUrl = `${TMDB_IMAGE_BASE_URL}${item.poster_path}`;
  const backdropUrl = item.backdrop_path
    ? `${TMDB_BACKDROP_BASE_URL}${item.backdrop_path}`
    : `https://placehold.co/1280x720.png?text=${encodeURIComponent(title || 'No Backdrop')}`;


  let genreIds = item.genre_ids || [];
  if (item.genres && item.genres.length > 0 && genreIds.length === 0) {
      genreIds = item.genres.map((g: TmdbGenre) => g.id);
  }

  let genreName = 'N/A';
  if (genreIds.length > 0) {
    genreName = currentGenreMap.get(genreIds[0]) || 'N/A';
  } else if (item.genres && item.genres.length > 0) {
    genreName = item.genres[0].name || 'N/A';
  }


  return {
    id: item.id.toString(),
    title,
    posterUrl,
    backdropUrl: backdropUrl,
    overview: item.overview || '',
    genre: genreName,
    genre_ids: genreIds,
    media_type: mediaType,
    popularity: item.popularity,
    original_language: item.original_language,
    release_date: item.release_date,
    first_air_date: item.first_air_date,
  };
}