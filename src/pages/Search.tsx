import { useEffect, useState } from "react";
import { Search as SearchIconLucide } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState([]); // Placeholder for movie results

  // Debounce the query param for searching
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      console.log(`Searching for: ${query}`);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch or filter movies when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }
    // TODO: Replace with your real API call or filtering logic
    // Example: fetchMovies(debouncedQuery).then(setResults);
    // For now, just simulate no results
    setResults([]);
  }, [debouncedQuery]);

  return (
    <div className="mt-24">
      <div className="my-6 sm:my-8 px-4 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          Search Results for "{debouncedQuery}"
        </h1>
        <SearchIconLucide className="h-16 w-16 text-[#8585ad] mx-auto mb-4" />
        {debouncedQuery ? (
          results.length === 0 ? (
            <p className="text-[#8585ad] text-base sm:text-lg">
              No results found for "{debouncedQuery}". Try a different search term.
            </p>
          ) : (
            <div>{/* Render your movie results here */}</div>
          )
        ) : (
          <p className="text-[#8585ad] text-base sm:text-lg">
            Type in the search box above to find movies or shows.
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
