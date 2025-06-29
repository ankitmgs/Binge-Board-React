
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import ContentCard  from "./content-card";

interface ContentCarouselProps {
  items: any[];
  isUpcomingSection?: boolean;
}

export function ContentCarousel({ items, isUpcomingSection = false }: ContentCarouselProps) {  
  return (
    <div>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4 px-4">
          {items.map((item) => (
            <ContentCard
              key={`${item.id}-${item.media_type}`} // More robust key
              item={item}
              isUpcomingSection={isUpcomingSection}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
