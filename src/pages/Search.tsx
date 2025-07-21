import { useEffect, useState } from "react";
import { Search as SearchIconLucide } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { searchContent } from "../services/tmdb";
import type { Recommendation } from "../helper";
import ContentCard from "../components/content/content-card";
import { Skeleton } from "../ui/skeleton";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [results, setResults] = useState<Recommendation[]>([]); // Placeholder for movie results
  const [isLoading, setIsLoading] = useState(false);

  // Debounce the query param for searching
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch or filter movies when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    searchContent(debouncedQuery)
      .then((res) => {
        if (res && Array.isArray(res)) {
          setResults(res);
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        setResults([]);
        console.error("Error fetching search results:", error);
      })
      .finally(() => setIsLoading(false));
  }, [debouncedQuery]);

  return (
    <div className="mt-24">
      <div className="my-6 sm:my-8 px-4 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4">
          Search Results for "{debouncedQuery}"
        </h1>
        <SearchIconLucide className="h-16 w-16 text-[#8585ad] mx-auto mb-4" />
        {debouncedQuery ? (
          isLoading ? (
            <SearchResultsSkeleton query={debouncedQuery} />
          ) : results.length === 0 ? (
            <p className="text-[#8585ad] text-base sm:text-lg">
              No results found for "{debouncedQuery}". Try a different search
              term.
            </p>
          ) : (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
              {results.map((item) => (
                <ContentCard
                  key={`${item.id}-${item.media_type}`}
                  item={item}
                />
              ))}
            </div>
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
function SearchResultsSkeleton({ query }: { query: string }) {
  return (
    <div className="my-6 sm:my-8 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary">
        Searching for: "{query}"
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton className="h-48 sm:h-56 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-4 w-3/4 mt-2 rounded-md bg-muted/50" />
            <Skeleton className="h-3 w-1/2 mt-1 rounded-md bg-muted/50" />
            <Skeleton className="h-3 w-2/3 mt-1 rounded-md bg-muted/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
