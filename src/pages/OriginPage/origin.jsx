import Modal1 from "@/components/Modal/modal";
import { Button } from "@/components/ui/button";
import { Orichids } from "@/Shared/listOfOrchids";
import { ThemeContext } from "@/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Origin = () => {
  const orichidList = Orichids.filter((obj) => obj.isSpecial === true);
  const { theme } = useContext(ThemeContext);
  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";
  const [apiData, setApiData] = useState([]);

  // Fetch data từ API khi component được render
  const fetchAPI = () => {
    fetch(baseURL)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="container mx-auto flex flex-wrap justify-around p-8 gap-6 max-w-screen-lg bg-cover bg-center bg-no-repeat min-h-screen">
      {orichidList.map((orichid) => (
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
              orichid={orichid}
              trigger={
                <img
                  src={orichid.image}
                  alt={orichid.name}
                  className="w-full h-[200px] max-w-[250px] rounded-lg mb-4 object-cover"
                />
              }
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {orichid.name}
            </h3>
            <p className="info text-lg text-gray-600 mb-2">{orichid.origin}</p>
            <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
              <Link to={`/detail/${orichid.Id}`}>Detail</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Origin;
