import { TMDB_BASE_URL } from "../constant/apiUrl";
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
