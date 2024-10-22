import Modal1 from "@/components/Modal/modal";
import { Button } from "@/components/ui/button";
import useSearch from "@/CustomHook/useSearch";
import { ThemeContext } from "@/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Origin = () => {
  const { theme } = useContext(ThemeContext);
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Define searchFunction before using useSearch
  const searchFunction = (searchQuery) => {
    return new Promise((resolve) => {
      const filteredOrichids = apiData.filter((orichid) =>
        orichid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      resolve(filteredOrichids);
    });
  };

  // Use searchFunction in useSearch
  const { query, setQuery, results, handleSearch } = useSearch(searchFunction);

  // Fetch data from API when the component is rendered, filtering for isSpecial orchids
  const fetchAPI = () => {
    setIsLoading(true); // Start loading
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        const specialOrchids = data.filter((orichid) => orichid.isSpecial);
        setApiData(specialOrchids);
        setIsLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Stop loading if an error occurs
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Call handleSearch when query or apiData changes
  useEffect(() => {
    handleSearch(query);
  }, [query, apiData]);

  return (
    <div className="container mx-auto p-8 max-w-screen-lg min-h-screen">
      {/* Search Input */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full max-w-sm items-center space-x-2 mb-6"
      >
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search for orchids..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>

      <div className="flex flex-wrap justify-around gap-6">
        {/* If loading, show skeletons */}
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                className="column flex flex-1 justify-center max-w-[calc(25%-1.5rem)] p-4"
                key={index}
              >
                <div className="space-y-4">
                  <Skeleton className="w-[250px] h-[200px] rounded-lg" />
                  <Skeleton className="h-6 w-[200px] rounded-lg" />
                  <Skeleton className="h-4 w-[150px] rounded-lg" />
                  <Skeleton className="h-10 w-[100px] rounded-lg" />
                </div>
              </div>
            ))
          : // Display the orchid results after loading
            results.map((orichid) => (
              <div
                className="column flex flex-1 justify-center max-w-[calc(25%-1.5rem)] p-4"
                key={orichid.Id}
              >
                <div
                  className={`card bg-white text-center rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl flex flex-col items-center justify-between h-full w-[270px] ${
                    theme.backgroundColor && theme.color
                      ? ""
                      : "bg-gray-100 text-black"
                  }`}
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.color,
                  }}
                >
                  <Modal1
                    orichidId={orichid.Id}
                    trigger={
                      <img
                        src={orichid.image}
                        alt={orichid.name}
                        className="w-[250px] h-[200px] rounded-lg object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/250x200";
                        }}
                      />
                    }
                  />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {orichid.name}
                  </h3>
                  <p className="info text-lg text-gray-600 mb-2">
                    {orichid.origin}
                  </p>
                  <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
                    <Link to={`/detail/${orichid.Id}`}>Detail</Link>
                  </Button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Origin;
