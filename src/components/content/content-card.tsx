"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Skeleton } from '../../ui/skeleton';

interface ContentCardProps {
  item: any;
  variant?: 'default' | 'searchResult';
}

export const ContentCard = ({ item, variant = 'default' }: ContentCardProps) => {
  if (!item || !item.id) {
    const cardClasses = variant === 'searchResult'
      ? "w-full overflow-hidden shadow-lg bg-card border-border flex flex-col justify-between"
      : "w-44 sm:w-52 md:w-60 flex-shrink-0 overflow-hidden shadow-lg bg-card border-border flex flex-col justify-between";
    const imageSkeletonHeight = variant === 'searchResult' ? "h-48 sm:h-56" : "h-56 sm:h-64 md:h-80";
    const titleSkeletonClasses = variant === 'searchResult' ? "h-4 w-3/4" : "h-5 w-3/4";
    const contentPadding = variant === 'searchResult' ? "p-2" : "p-3";
    const footerPadding = variant === 'searchResult' ? "p-2 pt-1" : "p-3 pt-0";
    return (
      <Card className={cardClasses}>
        <CardHeader className="p-0 relative">
          <Skeleton className={`${imageSkeletonHeight} w-full`} />
        </CardHeader>
        <CardContent className={`${contentPadding} space-y-1 flex-grow`}>
          <Skeleton className={titleSkeletonClasses} />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
        <CardFooter className={footerPadding}>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    );
  }

  const { title, posterUrl, genre, media_type, id } = item;
  const displayPosterUrl = (posterUrl && posterUrl.startsWith('http')) ? posterUrl : `https://placehold.co/${variant === 'searchResult' ? '240x320' : '240x320'}.png?text=${encodeURIComponent(title || "No Poster")}`;
  const detailUrl = `/media/${media_type}/${id}`;
  const cardClasses = variant === 'searchResult'
    ? "w-full overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 bg-card border-border group flex flex-col justify-between"
    : "w-44 sm:w-52 md:w-60 flex-shrink-0 overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/30 bg-card border-border group flex flex-col justify-between";
  const imageClasses = variant === 'searchResult'
    ? "object-cover w-full h-48 sm:h-56 rounded-lg"
    : "object-cover w-full h-56 sm:h-64 md:h-80 rounded-lg";
  const titleClasses = variant === 'searchResult'
    ? "text-sm font-semibold truncate text-foreground"
    : "text-md font-semibold truncate text-foreground";
  const contentPadding = variant === 'searchResult' ? "p-2" : "p-3";
  const footerPadding = variant === 'searchResult' ? "p-2 pt-1" : "p-3 pt-2";

  return (
    <Card className={cardClasses}>
      <Link to={detailUrl}>
        <CardHeader className="p-0 relative">
          <img
            src={displayPosterUrl}
            alt={title || "Content Poster"}
            width={240}
            height={variant === 'searchResult' ? 224 : 320}
            className={imageClasses}
            data-ai-hint={media_type === 'movie' ? "movie poster" : "tv series poster"}
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/${variant === 'searchResult' ? '240x320' : '240x320'}.png?text=${encodeURIComponent(title || "Error")}`;
            }}
          />
        </CardHeader>
        <CardContent className={`${contentPadding} space-y-1`}>
          <CardTitle className={titleClasses} title={title}>
            {title || "Untitled Content"}
          </CardTitle>
          <Badge variant="secondary" className="mt-1 text-xs">
            {genre || "N/A"}
          </Badge>
        </CardContent>
      </Link>
      <CardFooter className={`${footerPadding} mt-auto`}>
        <Button className="w-full transition-all duration-200 ease-in-out" size="sm">
          Add to My List
        </Button>
      </CardFooter>
    </Card>
  );
};

