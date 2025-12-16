import { BookOpen } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-8 border-t border-slate-800/50 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 text-slate-500 text-sm">
          <span className="flex items-center gap-1">
            <BookOpen size={14} /> 技術文檔
          </span>
          <span className="flex items-center gap-1">GitHub Repo</span>
          <span className="flex items-center gap-1">API Status</span>
        </div>
        <p className="text-slate-600 text-xs">
          © 2024 SyncWatch Platform Assistant. Designed for real-time
          collaboration.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
