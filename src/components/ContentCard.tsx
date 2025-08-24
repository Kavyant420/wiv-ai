import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";

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

interface ContentCardProps {
  content: Content;
}

export function ContentCard({ content }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = () => {
    console.log("Playing:", content.title);
  };

  return (
    <div
      className="group relative cursor-pointer transition-transform duration-300 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className={`relative bg-surface rounded overflow-hidden transition-all duration-300 ${
        isHovered ? 'scale-150 z-50' : 'scale-100'
      }`}>
        
        {/* Poster/Thumbnail */}
        <div className="relative aspect-video">
          {content.poster ? (
            <img
              src={content.poster}
              alt={content.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white/60">
                <div className="text-4xl mb-2">
                  {content.type === "movie" ? "🎬" : "📺"}
                </div>
                <p className="text-xs font-medium px-2">{content.title}</p>
              </div>
            </div>
          )}
          
          {/* Hover Overlay */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Button
                variant="play"
                size="icon"
                onClick={handlePlay}
                className="w-12 h-12 rounded-full"
              >
                <Play className="h-5 w-5 ml-0.5 fill-current" />
              </Button>
            </div>
          )}
        </div>

        {/* Expanded Info (only shown on hover) */}
        {isHovered && (
          <div className="bg-surface p-4 space-y-3">
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="play"
                size="icon"
                onClick={handlePlay}
                className="w-8 h-8 rounded-full"
              >
                <Play className="h-3 w-3 fill-current" />
              </Button>
              
              <Button
                variant="netflix-outline"
                size="icon"
                className="w-8 h-8 rounded-full border-2 border-white/60 hover:border-white"
              >
                <Plus className="h-3 w-3" />
              </Button>
              
              <Button
                variant="netflix-outline"
                size="icon"
                className="w-8 h-8 rounded-full border-2 border-white/60 hover:border-white"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              
              <div className="flex-1" />
              
              <Button
                variant="netflix-outline"
                size="icon"
                className="w-8 h-8 rounded-full border-2 border-white/60 hover:border-white"
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>

            {/* Content Info */}
            <div className="space-y-2">
              <h3 className="text-white font-semibold text-sm line-clamp-1">
                {content.title}
              </h3>
              
              <div className="flex items-center space-x-2 text-xs text-white/80">
                <span className="text-green-400 font-semibold">
                  {Math.floor(parseFloat(content.rating) * 10)}% Match
                </span>
                <span className="border border-white/40 px-1 text-xs">
                  {content.type === "movie" ? "HD" : "HD"}
                </span>
                <span>{content.year}</span>
                {content.type === "tv" && (
                  <span>{content.seasons} Season{content.seasons !== 1 ? 's' : ''}</span>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1 text-xs text-white/60">
                {content.genre.slice(0, 3).map((genre, index) => (
                  <span key={index}>
                    {genre}
                    {index < Math.min(content.genre.length, 3) - 1 && ' • '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
