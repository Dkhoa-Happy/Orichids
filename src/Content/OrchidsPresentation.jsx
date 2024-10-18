import { useContext, useState, useEffect } from "react";
import Modal1 from "../components/Modal/modal";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useSearch from "@/CustomHook/useSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function OrichidsPresentation({ orichids }) {
  const { theme } = useContext(ThemeContext);

  // Define a search function for orchids
  const searchFunction = (searchQuery) => {
    return new Promise((resolve) => {
      const filteredOrichids = orichids.filter((orichid) =>
        orichid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      resolve(filteredOrichids);
    });
  };

  // Use the useSearch hook
  const { query, setQuery, results, handleSearch } = useSearch(searchFunction);

  // Call handleSearch when query changes
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <div className="container mx-auto p-8 max-w-screen-lg">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for orchids..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10" // Add padding to the left for the icon
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      {/* If no results found, show "no orchids found" */}
      {results.length === 0 ? (
        <p className="text-center text-3xl text-pink-500">No orichids found</p>
      ) : (
        <div className="flex flex-wrap justify-around gap-6">
          {results.map((orichid, index) => (
            <div
              className="column flex flex-1 justify-center max-w-[calc(25%-1.5rem)] p-4"
              key={index}
            >
              <div
                className={`card bg-white rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-between h-full w-[270px] ${
                  theme.backgroundColor && theme.color
                    ? ""
                    : "bg-gray-100 text-black"
                }`}
                style={{
                  backgroundColor: theme.backgroundColor,
                  color: theme.color,
                }}
              >
                <div className="relative w-full h-[200px] max-w-[250px] mb-4">
                  {orichid.isSpecial && (
                    <span className="absolute inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                      Special
                    </span>
                  )}
                  <Modal1
                    orichid={orichid}
                    trigger={
                      <img
                        src={orichid.image}
                        alt={orichid.name}
                        className="w-[250px] h-[200px] rounded-lg object-cover"
                      />
                    }
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {orichid.name}
                </h3>
                <p className="info text-lg text-gray-600 mb-2">
                  {orichid.origin}
                </p>
                <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
                  <Link to={`detail/${orichid.Id}`}>Detail</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
