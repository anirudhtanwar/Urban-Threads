import React from "react";

interface Suggestion {
  id: string;
  name: string;
  image?: string;
  price?: number;
  category?: string;
}

interface SearchSuggestionsProps {
  suggestions: Suggestion[];
  loading: boolean;
  searchTerm: string;
  onClose: () => void;
  onSelectSuggestion?: (suggestion: Suggestion) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  suggestions,
  loading,
  searchTerm,
  onClose,
  onSelectSuggestion,
}) => {
  if (!searchTerm) return null;

  return (
    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-72 overflow-y-auto">
      {loading ? (
        <div className="p-4 text-gray-500 text-center">Loading...</div>
      ) : suggestions.length === 0 ? (
        <div className="p-4 text-gray-500 text-center">No products found.</div>
      ) : (
        <ul>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onMouseDown={(e) => {
                e.preventDefault();
                if (onSelectSuggestion) onSelectSuggestion(suggestion);
                onClose();
              }}
            >
              {suggestion.image && (
                <img
                  src={suggestion.image}
                  alt={suggestion.name}
                  className="w-10 h-10 object-cover rounded mr-3 border"
                />
              )}
              <div className="flex-1">
                <div className="font-medium text-sm">{suggestion.name}</div>
                {suggestion.category && (
                  <div className="text-xs text-gray-500">{suggestion.category}</div>
                )}
              </div>
              {typeof suggestion.price === "number" && (
                <div className="ml-2 text-sm font-semibold text-gray-700">${suggestion.price.toFixed(2)}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
