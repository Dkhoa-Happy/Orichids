import { useContext } from "react";
import Modal1 from "../components/Modal/modal";
import { ThemeContext } from "../ThemeContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function OrichidsPresentation({ orichids }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="container mx-auto flex flex-wrap justify-around p-8 gap-6 max-w-screen-lg">
      {orichids.map((orichid, index) => (
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
              {/* Badge "Special" nằm trên hình ảnh */}
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
            <p className="info text-lg text-gray-600 mb-2">{orichid.origin}</p>
            <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded mt-4">
              <Link to={`detail/${orichid.Id}`}>Detail</Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
