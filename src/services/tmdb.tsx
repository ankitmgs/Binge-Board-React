import {
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  TMDB_PROVIDER_LOGO_BASE_URL,
} from "../constant/apiUrl";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
import axios from "axios";
import { mapTmdbItemToRecommendation, type Recommendation } from "../helper";

export const getHollywoodMovies = async (): Promise<any> => {
  try {
    const payload = {
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_original_language: "en",
    };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/discover/movie?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "movie"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Hollywood movies:", error);
    return { error: true, message: "Error fetching Hollywood movies." };
  }
};

export const getBollyWoodMovies = async (): Promise<any> => {
  try {
    const payload = {
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_original_language: "hi",
    };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/discover/movie?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "movie"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Bollywood movies:", error);
    return { error: true, message: "Error fetching Bollywood movies." };
  }
};
export const getWebSeries = async (): Promise<any> => {
  try {
    const payload = { language: "en-US", page: "1" };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/trending/tv/week?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "tv"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Bollywood movies:", error);
    return { error: true, message: "Error fetching Bollywood movies." };
  }
};

export const getAnimeSeries = async (): Promise<any> => {
  try {
    const payload = {
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_genres: "16",
      with_keywords: "210024",
    };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/discover/tv?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "tv"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Bollywood movies:", error);
    return { error: true, message: "Error fetching Bollywood movies." };
  }
};

export const getAnimatedMovies = async (): Promise<any> => {
  try {
    const payload = {
      language: "en-US",
      page: "1",
      sort_by: "popularity.desc",
      with_genres: "16",
    };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/discover/movie?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "movie"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Bollywood movies:", error);
    return { error: true, message: "Error fetching Bollywood movies." };
  }
};
export const getNowPlayingMovies = async (): Promise<any> => {
  try {
    const payload = {
      language: "en-US",
      page: "1",
      region: "US",
    };
    const queryParams = new URLSearchParams({
      ...payload,
      api_key: TMDB_API_KEY,
    }).toString();
    const url = `${TMDB_BASE_URL}/movie/now_playing?${queryParams}`;

    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    if (!result.data || !Array.isArray(result.data.results)) {
      console.error("TMDB API returned unexpected data:", result.data);
      return { error: true, message: "TMDB API returned unexpected data." };
    }
    return result.data.results
      .map((item: any) => mapTmdbItemToRecommendation(item, "movie"))
      .filter(Boolean) as Recommendation[];
  } catch (error: any) {
    console.error("Error fetching Now Playing movies:", error);
    return { error: true, message: "Error fetching Now Playing movies." };
  }
};

export const getMediaDetails = async (
  mediaType: "movie" | "tv",
  id: string
): Promise<any> => {
  try {
    const url = `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}`;
    const result = await axios.get(url);
    if (result.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    return result.data;
  } catch (error: any) {
    console.error("Error fetching media details:", error);
    return { error: true, message: "Error fetching media details." };
  }
};

export const getMediaImages = async (
  mediaType: "movie" | "tv",
  id: string
): Promise<any> => {
  try {
    const url = `${TMDB_BASE_URL}/${mediaType}/${id}/images?api_key=${TMDB_API_KEY}`;

    const result = await axios.get(url);
    if (result?.status !== 200) {
      console.error("TMDB API error:", result.status, result.statusText);
      return { error: true, message: `TMDB API error: ${result.statusText}` };
    }
    return result?.data;
  } catch (error: any) {
    console.error("Error fetching media images:", error);
    return { error: true, message: "Error fetching media images." };
  }
};

export async function getMediaCredits(
  id: string,
  mediaType: "movie" | "tv"
): Promise<any | null> {
  try {
    let endpoint = "";
    if (mediaType === "tv") {
      endpoint = `tv/${id}/aggregate_credits`;
    } else {
      endpoint = `movie/${id}/credits`;
    }
    const url = `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;
    const response = await axios.get(url);
    if (!response || !response.data) {
      console.warn(
        `[TMDB Service - Credits] No data received for ${mediaType}/${id}.`
      );
      return { id: parseInt(id, 10), cast: [] };
    }
    const data = response.data;
    if (!Array.isArray(data.cast)) {
      console.warn(
        `[TMDB Service - Credits] Cast data is not an array for ${mediaType}/${id}. Data received:`,
        data
      );
      return { id: parseInt(id, 10), cast: [] };
    }
    const castWithFullProfileUrls = data.cast.map((member: any) => ({
      id: member.id,
      name: member.name,
      character:
        mediaType === "tv"
          ? member.roles && member.roles[0]
            ? member.roles[0].character
            : "N/A"
          : member.character,
      profile_path: member.profile_path
        ? `${TMDB_IMAGE_BASE_URL}${member.profile_path}`
        : null,
      order:
        member.order !== undefined
          ? member.order
          : member.roles && member.roles[0]
          ? member.roles[0].order
          : 999,
      total_episode_count:
        mediaType === "tv" ? member.total_episode_count : undefined,
    }));
    return { id: parseInt(id, 10), cast: castWithFullProfileUrls as any[] };
  } catch (error: any) {
    console.error(
      `[TMDB Service - Credits] Error fetching credits for ${mediaType}/${id}:`,
      error
    );
    return { id: parseInt(id, 10), cast: [] };
  }
}

export async function getWatchProviders(
  id: string,
  mediaType: "movie" | "tv"
): Promise<any | null> {
  const endpoint = `${mediaType}/${id}/watch/providers`;
  const result = await axios.get(
    `${TMDB_BASE_URL}/${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (result && result.data && result.data.results && result.data.results.IN) {
    const inProviders = result.data.results.IN;

    const processProviderList = (providers?: any[]): any[] | undefined => {
      if (!providers || !Array.isArray(providers)) return undefined;
      return providers
        .map((p) => ({
          ...p,
          logo_path: p.logo_path
            ? `${TMDB_PROVIDER_LOGO_BASE_URL}${p.logo_path}`
            : null,
        }))
        .sort((a, b) => a.display_priority - b.display_priority);
    };

    return {
      link:
        inProviders.link ||
        `https://www.themoviedb.org/${mediaType}/${id}/watch?locale=IN`,
      flatrate: processProviderList(inProviders.flatrate),
      rent: processProviderList(inProviders.rent),
      ads: processProviderList(inProviders.ads),
    };
  }
  return null;
}

export const getTvSeasonEpisodes = async (
  tvId: string,
  seasonNumber: number
): Promise<any | null> => {
  try {
    const url = `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`;
    const response = await axios.get(url);
    if (!response || !response.data) {
      console.warn(
        `[TMDB Service - TV Season Episodes] No data received for TV ID ${tvId}, Season ${seasonNumber}.`
      );
      return null;
    }
    return response.data;
  } catch (error: any) {
    console.error(
      `[TMDB Service - TV Season Episodes] Error fetching episodes for TV ID ${tvId}, Season ${seasonNumber}:`,
      error
    );
    return null;
  }
};

export const searchContent = async (
  query: string,
  page: number = 1
): Promise<Recommendation[] | null> => {
  try {
    if (!query || !query.trim()) {
      console.warn("[TMDB Service - Search] Empty or invalid query provided.");
      return null;
    }

    const url = `${TMDB_BASE_URL}/search/multi`;
    const params = {
      api_key: TMDB_API_KEY,
      language: "en-US",
      query: query.trim(),
      page: page.toString(),
    };

    const response = await axios.get(url, { params });

    const results = response?.data?.results;
    if (!Array.isArray(results)) {
      console.warn(
        `[TMDB Service - Search] No valid results array for query: "${query}"`
      );
      return null;
    }

    const mappedResults = results
      .map((item) => mapTmdbItemToRecommendation(item, item.media_type))
      .filter(Boolean)
      .sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      ) as Recommendation[];

    return mappedResults;
  } catch (error: any) {
    console.error(
      `[TMDB Service - Search] Error during search for query: "${query}"`,
      error
    );
    return null;
  }
};
