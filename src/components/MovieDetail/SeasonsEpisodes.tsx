import { useEffect, useState } from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Loader2 } from "lucide-react";
import { format, parseISO, isValid } from "date-fns";

interface SeasonsEpisodesProps {
  showId: string;
  seasons: any[];
  getTvSeasonEpisodes: (id: string, seasonNumber: number) => Promise<any>;
}

const SeasonsEpisodes = ({ showId, seasons, getTvSeasonEpisodes }: SeasonsEpisodesProps) => {
  const [selectedSeasonData, setSelectedSeasonData] = useState<{
    season_number: string;
    name: string;
  } | null>(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState<any[]>([]);
  const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(false);
  const [episodesError, setEpisodesError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSeasonData?.season_number && showId) {
      setIsLoadingEpisodes(true);
      setEpisodesError(null);
      setSeasonEpisodes([]);
      getTvSeasonEpisodes(showId, parseInt(selectedSeasonData.season_number, 10))
        .then((episodes) => {
          setSeasonEpisodes(episodes?.episodes || []);
        })
        .catch(() => {
          setEpisodesError("Could not load episodes for this season.");
        })
        .finally(() => setIsLoadingEpisodes(false));
    } else {
      setSeasonEpisodes([]);
    }
  }, [selectedSeasonData, showId, getTvSeasonEpisodes]);

  function formatDateToReadable(dateString: string = ""): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }

  return (
    <div className="mt-8 sm:mt-12">
      <div data-orientation="horizontal" role="none" className="shrink-0 bg-[#414158] h-[1px] w-full my-6 sm:my-8" />
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#9174e7]">Seasons &amp; Episodes</h2>
      <div className="space-y-6">
        <div>
          <Label htmlFor="season-select-detail" className="text-base font-medium mb-2 block">Select a Season</Label>
          <Select
            value={selectedSeasonData?.season_number || ""}
            onValueChange={(value) => {
              const season = seasons.find((s) => s.season_number.toString() === value);
              setSelectedSeasonData(season ? { season_number: season.season_number.toString(), name: season.name } : null);
            }}
          >
            <SelectTrigger id="season-select-detail" className="w-full md:w-1/2 lg:w-1/3 bg-[#262239] border-[#414158] hover:border-primary/50 focus:border-primary focus:ring-primary">
              <SelectValue placeholder="Choose a season" />
            </SelectTrigger>
            <SelectContent className="bg-[#262239] border-[#414158]">
              {seasons.map((season) => (
                <SelectItem
                  key={season.id}
                  value={season.season_number.toString()}
                  className="hover:bg-[#719df4] focus:bg-[#719df4] hover:text-black"
                >
                  {season.name} (Season {season.season_number}) - {season.episode_count} episodes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedSeasonData && (
          <div className="mt-4">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[#9174e7e6]/90">
              Episodes for {selectedSeasonData.name || `Season ${selectedSeasonData.season_number}`}
            </h3>
            {isLoadingEpisodes ? (
              <div className="flex items-center text-[#8585ad]">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading episodes...
              </div>
            ) : episodesError ? (
              <p className="text-destructive">{episodesError}</p>
            ) : seasonEpisodes.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {seasonEpisodes.map((episode) => (
                  <AccordionItem value={`episode-${episode.id}`} key={episode.id}>
                    <AccordionTrigger className="text-left hover:bg-[#3d3d5280]/50 px-3 py-3 rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                        <span className="font-medium text-foreground">
                          Ep {episode.episode_number}: {episode.name}
                        </span>
                        {episode.air_date && isValid(parseISO(episode.air_date)) && (
                          <span className="text-xs text-[#8585ad] mt-1 sm:mt-0 sm:ml-4">
                            Aired: {format(parseISO(episode.air_date), "MMM d, yyyy")}
                          </span>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 py-3 bg-[#3d3d5280]/30 rounded-b-md">
                      <p className="text-sm text-[#8585ad] leading-relaxed">
                        {episode.overview || "No overview available for this episode."}
                      </p>
                      {episode.runtime !== null && episode.runtime > 0 && (
                        <p className="text-xs text-[#8585ad] mt-2">Runtime: {episode.runtime}m</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-[#8585ad]">No episodes found for this season.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonsEpisodes;
