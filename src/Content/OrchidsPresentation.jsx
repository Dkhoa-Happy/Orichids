import { useContext, useState, useEffect } from "react";
import Modal1 from "../components/Modal/modal";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useSearch from "@/CustomHook/useSearch";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton từ shadcn/ui

export default function OrichidsPresentation() {
  const { theme } = useContext(ThemeContext);
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State để quản lý skeleton loading

  // Fetch dữ liệu từ API
  const fetchAPI = () => {
    setIsLoading(true); // Bắt đầu quá trình load
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data);
        setIsLoading(false); // Tắt loading khi load xong
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Tắt loading khi có lỗi
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // Định nghĩa hàm tìm kiếm cho orchids
  const searchFunction = (searchQuery) => {
    return new Promise((resolve) => {
      const filteredOrichids = apiData.filter((orichid) =>
        orichid.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      resolve(filteredOrichids);
    });
  };

  // Sử dụng hook useSearch
  const { query, setQuery, results, handleSearch } = useSearch(searchFunction);

  // Gọi handleSearch khi query hoặc apiData thay đổi
  useEffect(() => {
    handleSearch(query);
  }, [query, apiData]);

  return (
    <div className="container mx-auto p-8 max-w-screen-lg">
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

      {/* Skeleton loading */}
      {isLoading ? (
        <div className="flex flex-wrap justify-around gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="column flex flex-1 justify-center max-w-[calc(25%-1.5rem)] p-4"
            >
              {/* Sử dụng Skeleton từ shadcn/ui */}
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-center text-3xl text-pink-500">No orchids found</p>
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
