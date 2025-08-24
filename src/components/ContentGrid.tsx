import { useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import { ChevronRight } from "lucide-react";

interface Content {
  id: string;
  title: string;
  type: "movie" | "tv";
  year: string;
  rating: string;
  genre: string[];
  poster: string;
  overview: string;
  duration?: string;
  seasons?: number;
}

interface ContentRowProps {
  title: string;
  items: Content[];
}

function ContentRow({ title, items }: ContentRowProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-4 lg:px-16">
        <h2 className="text-white text-xl font-semibold hover:text-white/80 cursor-pointer transition-colors">
          {title}
        </h2>
        <button className="text-netflix-red text-sm font-medium flex items-center hover:text-netflix-red-hover transition-colors">
          Explore All
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
      
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide px-4 lg:px-16 pb-4">
        {items.map((item, index) => (
          <div key={item.id} className="flex-none w-48 lg:w-64">
            <ContentCard content={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface ContentGridProps {
  category: string;
}

export function ContentGrid({ category }: ContentGridProps) {
  // Mock data for Netflix-style content rows
  const mockContent: Content[] = [
    {
      id: "1",
      title: "The Dark Knight",
      type: "movie",
      year: "2008",
      rating: "9.0",
      genre: ["Action", "Crime", "Drama"],
      poster: "",
      overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
      duration: "2h 32min"
    },
    {
      id: "2",
      title: "Breaking Bad",
      type: "tv",
      year: "2008",
      rating: "9.5",
      genre: ["Crime", "Drama", "Thriller"],
      poster: "",
      overview: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.",
      seasons: 5
    },
    {
      id: "3",
      title: "Inception",
      type: "movie",
      year: "2010",
      rating: "8.8",
      genre: ["Action", "Sci-Fi", "Thriller"],
      poster: "",
      overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
      duration: "2h 28min"
    },
    {
      id: "4",
      title: "Stranger Things",
      type: "tv",
      year: "2016",
      rating: "8.7",
      genre: ["Drama", "Fantasy", "Horror"],
      poster: "",
      overview: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
      seasons: 4
    },
    {
      id: "5",
      title: "The Godfather",
      type: "movie",
      year: "1972",
      rating: "9.2",
      genre: ["Crime", "Drama"],
      poster: "",
      overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      duration: "2h 55min"
    },
    {
      id: "6",
      title: "Game of Thrones",
      type: "tv",
      year: "2011",
      rating: "9.3",
      genre: ["Action", "Adventure", "Drama"],
      poster: "",
      overview: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
      seasons: 8
    }
  ];

  const contentRows = [
    { title: "Trending Now", items: mockContent },
    { title: "Popular on PikuFlix", items: mockContent.slice().reverse() },
    { title: "TV Shows", items: mockContent.filter(item => item.type === "tv") },
    { title: "Movies", items: mockContent.filter(item => item.type === "movie") },
    { title: "My List", items: mockContent.slice(0, 3) },
    { title: "Continue Watching", items: mockContent.slice(1, 4) },
  ];

  return (
    <div className="space-y-12 pb-20">
      {contentRows.map((row, index) => (
        <ContentRow key={index} title={row.title} items={row.items} />
      ))}
    </div>
  );
              }
