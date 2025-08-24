import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Maximize, Volume2, VolumeX, Settings, SkipForward } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: string;
    title: string;
    type: "movie" | "tv";
    season?: number;
    episode?: number;
  } | null;
}

export function VideoModal({ isOpen, onClose, content }: VideoModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Hide controls after 3 seconds of inactivity
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "f":
        case "F":
          setIsFullscreen(!isFullscreen);
          break;
        case "m":
        case "M":
          setIsMuted(!isMuted);
          break;
        case " ":
          e.preventDefault();
          // Toggle play/pause
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, isFullscreen, isMuted, onClose]);

  const handleMouseMove = () => {
    setShowControls(true);
    setTimeout(() => setShowControls(false), 3000);
  };

  if (!isOpen || !content) return null;

  const videoSrc = content.type === "movie" 
    ? `https://embed.su/embed/movie/${content.id}`
    : `https://vidsrc.to/embed/tv/${content.id}/${content.season}/${content.episode}`;

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-all duration-300 ${
        isFullscreen ? "p-0" : "p-4"
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* Video Container */}
      <div className={`relative w-full h-full ${isFullscreen ? "" : "max-w-7xl max-h-[90vh] rounded-xl overflow-hidden"} bg-black`}>
        
        {/* Video Player */}
        <iframe
          src={videoSrc}
          title={content.title}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-presentation"
        /><div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}>
          
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white truncate">
                  {content.title}
                  {content.type === "tv" && (
                    <span className="ml-2 text-foreground-muted">
                      S{content.season}E{content.episode}
                    </span>
                  )}
                </h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              {content.type === "tv" && (
                <Button
                  variant="brand"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <SkipForward className="h-4 w-4" />
                  <span>Next Episode</span>
                </Button>
              )}
            </div>
          </div>

          {/* Loading State */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                <span className="text-white font-medium">Loading video...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 transition-opacity duration-300 ${
        showControls ? "opacity-100" : "opacity-0"
      }`}>
        <div className="text-xs text-white/80 space-y-1">
          <div><kbd className="bg-white/20 px-1 rounded">ESC</kbd> Close</div>
          <div><kbd className="bg-white/20 px-1 rounded">F</kbd> Fullscreen</div>
          <div><kbd className="bg-white/20 px-1 rounded">M</kbd> Mute</div>
          <div><kbd className="bg-white/20 px-1 rounded">Space</kbd> Play/Pause</div>
        </div>
      </div>
    </div>
  );
}
