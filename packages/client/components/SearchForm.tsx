import React from "react";
import { Form } from "react-router";
import { Search } from "lucide-react";

function SearchForm({ query, url }: { query: string; url: string }) {
  return (
    <form action={url} className="search-form">
      <input
        type="text"
        name="query"
        placeholder="search blogs"
        id="query"
        defaultValue={query}
        className="search-input"
      />
      <div className="flex gap-2">
        <button>
          <Search className="search-btn" />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
