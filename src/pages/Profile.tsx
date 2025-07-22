import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import BackgroundImage from "../assets/default.png";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "../helper";
import { Edit, FilePlus2, FilterIcon, ListX, PlusCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

const Profile = () => {
  return (
    <main className="mt-16 pb-8">
      <div
        className="h-48 md:h-60 w-full bg-muted bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
        data-ai-hint="banner abstract"
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-background/70 hover:bg-background text-foreground z-10"
          title="Edit Profile (Cover, Avatar, Bio)"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </div>
      <div className="container mx-auto px-4">
        <div className="bg-card p-4 sm:p-6 rounded-lg shadow-xl relative -mt-10 md:-mt-16 mx-auto max-w-4xl border border-border/30">
          <Link to="/settings">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 h-8 w-8 text-muted-foreground hover:text-primary z-20"
              title="Go to Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-background shadow-md -mt-12 sm:-mt-16 flex-shrink-0">
              <AvatarImage
                src={undefined}
                alt="User Avatar"
                data-ai-hint="profile avatar"
                className="object-cover"
              />
              <AvatarFallback email="tempoe">
                {/* Initials here */}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left pt-4 sm:pt-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center sm:text-left">
                {/* Display name or email */}
              </h1>
              <p className="text-sm text-muted-foreground mt-1 break-words line-clamp-3 text-center sm:text-left">
                {/* Bio here */}
              </p>
            </div>
          </div>

          {/* Lists Management Section */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                My Lists
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  title="Import List"
                  className="h-10 w-10"
                >
                  <FilePlus2 className="h-5 w-5" />
                </Button>
                <Button size="default" className="h-10">
                  <PlusCircle className="mr-2 h-5 w-5" /> Create New List
                </Button>
              </div>
            </div>
            <div className="mb-6">
              <Label htmlFor="genre-filter-my-list" className="text-sm font-medium">
                Filter by Genre (across all lists)
              </Label>
              <Select>
                <SelectTrigger id="genre-filter-my-list" className="w-full md:w-1/2 mt-1">
                  <FilterIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All My List Genres</SelectItem>
                  <SelectItem value="test">"test"</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-center py-16 border-2 border-dashed border-muted rounded-lg">
              <ListX className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground mx-auto mb-6" />
              <p className="text-muted-foreground text-xl sm:text-2xl font-medium mb-3">
                {/* No lists message */}
              </p>
              <p className="text-muted-foreground text-sm sm:text-base mb-8">
                {/* Start organizing message */}
              </p>
              <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" /> Create Your First List
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
