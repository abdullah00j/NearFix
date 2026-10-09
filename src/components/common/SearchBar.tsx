import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder: string;
  shortcutEnable: boolean;
}
function SearchBar({ placeholder, shortcutEnable }: SearchBarProps) {
  return (
    <div className="mr-4 w-full min-w-0">
      <div className="group mx-auto flex items-center rounded-lg border border-line bg-panel-soft px-4 py-1 shadow-md  duration-200 focus-within:border-primary focus-within:border-[1.5px]">
        {/* Search Icon */}
        <Search
          size={15}
          className="mr-2 text-[var(--muted)] transition-all group-focus-within:text-primary"
        />

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-[var(--text)] outline-none placeholder:italic placeholder:text-[var(--muted)]"
        />

        {/* Shortcut */}
        {shortcutEnable && (
          <div className="ml-4 flex items-center gap-2 text-[var(--muted)]">
            <span className="text-sm">[Option+S]</span>

            {/* Optional logo/icon */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
