
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
  onSearch?: (query: string) => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

export function SearchInput({ className, onSearch, onBlur, autoFocus }: SearchInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <div className="relative flex items-center bg-black/50 border border-white/30 rounded-sm overflow-hidden backdrop-blur-sm">
        <Search className="absolute left-3 h-4 w-4 text-white/70" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={onBlur}
          autoFocus={autoFocus}
          placeholder="Titles, people, genres"
          className="w-full bg-transparent text-white placeholder:text-white/70 pl-10 pr-10 py-2 text-sm focus:outline-none"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="absolute right-1 h-6 w-6 text-white/70 hover:text-white"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  );
}
