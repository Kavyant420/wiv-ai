import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ContentGrid } from "@/components/ContentGrid";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      
      <main className="relative -mt-32 z-20">
        <ContentGrid category={activeCategory} />
      </main>
      
      {/* Footer */}
      <footer className="bg-background/95 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-16 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white/60">
            <div className="space-y-4">
              <div className="text-netflix-red text-2xl font-black">
                PIKUFLIX
              </div>
              <p className="text-sm leading-relaxed">
                Questions? Call 1-844-505-2993
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Jobs</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Terms of Use</a></li>
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Cookie Preferences</a></li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-white font-medium">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Gift Cards</a></li>
                <li><a href="#" className="hover:underline">Media Center</a></li>
                <li><a href="#" className="hover:underline">Investor Relations</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
              <p>&copy; 2024 PikuFlix, Inc.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white/60">Audio Description</a>
                <a href="#" className="hover:text-white/60">Investor Relations</a>
                <a href="#" className="hover:text-white/60">Legal Notices</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
