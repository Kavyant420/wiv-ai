import { Button } from "@/components/ui/button";
import { Play, Info, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  const featuredContent = {
    title: "Stranger Things",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.",
    logo: null, // Would be the show logo
    backdrop: null, // Would be the backdrop image
    year: "2016",
    rating: "TV-14",
    seasons: "4 Seasons",
    genres: ["Sci-Fi", "Horror", "Drama"]
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {/* This would be a video or large backdrop image */}
        <div className="w-full h-full bg-gradient-to-r from-red-900/30 via-purple-900/30 to-blue-900/30 flex items-center justify-center">
          <div className="text-6xl text-white/20">📺</div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full px-4 lg:px-16">
        <div className="max-w-lg space-y-6">
          {/* Show Logo or Title */}
          <div className="space-y-2">
            {featuredContent.logo ? (
              <img 
                src={featuredContent.logo} 
                alt={featuredContent.title}
                className="h-20 w-auto"
              />
            ) : (
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                {featuredContent.title}
              </h1>
            )}
          </div>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-white text-sm">
            <span className="font-semibold text-green-400">{featuredContent.rating}</span>
            <span>{featuredContent.year}</span>
            <span>{featuredContent.seasons}</span>
            <div className="flex space-x-2">
              {featuredContent.genres.map((genre, index) => (
                <span key={index} className="text-white/80">
                  {genre}{index < featuredContent.genres.length - 1 && ' •'}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed max-w-md">
            {featuredContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="play" size="lg" className="text-black font-bold">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
            
            <Button variant="netflix-secondary" size="lg">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
<div className="flex items-center space-x-4 text-white text-sm">
            <span className="font-semibold text-green-400">{featuredContent.rating}</span>
            <span>{featuredContent.year}</span>
            <span>{featuredContent.seasons}</span>
            <div className="flex space-x-2">
              {featuredContent.genres.map((genre, index) => (
                <span key={index} className="text-white/80">
                  {genre}{index < featuredContent.genres.length - 1 && ' •'}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-white text-lg leading-relaxed max-w-md">
            {featuredContent.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="play" size="lg" className="text-black font-bold">
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play
            </Button>
            
            <Button variant="netflix-secondary" size="lg">
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Audio Toggle */}
      <div className="absolute bottom-6 right-6 z-10">
        <Button
          variant="netflix-outline"
          size="icon"
          onClick={() => setIsMuted(!isMuted)}
          className="rounded-full border-2"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Age Rating Badge */}
      <div className="absolute bottom-6 left-4 lg:left-16 z-10">
        <div className="bg-surface-elevated/80 border border-white/30 rounded px-2 py-1 text-white text-xs font-bold backdrop-blur-sm">
          {featuredContent.rating}
        </div>
      </div>
    </section>
  );
}
