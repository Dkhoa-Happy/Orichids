/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

function Modal1({ orichidId, trigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orchid, setOrchid] = useState(null); // Orchid data fetched from API
  const [rating, setRating] = useState(0); // Rating value
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Log orichidId to see if it's correctly passed
  console.log("orichidId:", orichidId);

  const baseURL = "https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids";

  // Fetch orchid data when the modal is opened
  const fetchOrchidData = () => {
    if (!orichidId) {
      console.error("No orichidId provided");
      return;
    }

    setLoading(true);
    fetch(`${baseURL}/${orichidId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orchid data");
        }
        return response.json();
      })
      .then((data) => {
        setOrchid(data);
        setRating(data.rating || 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  const handleOpen = () => {
    setIsModalOpen(true);
    fetchOrchidData();
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div onClick={handleOpen}>{trigger}</div>
        </DialogTrigger>

        <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {orchid ? orchid.name : "Loading..."}
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <p className="mt-4 text-lg text-gray-500">Loading...</p>
          ) : error ? (
            <p className="mt-4 text-lg text-red-500">Error: {error}</p>
          ) : orchid ? (
            <div className="space-y-3 mt-4">
              <p className="text-lg font-semibold">Your Rating:</p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => setRating(index + 1)}
                    className={`cursor-pointer text-2xl ${
                      index < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg mt-4">
                Special: {orchid.isSpecial ? "Yes" : "No"}
              </p>
              <p className="text-lg">Color: {orchid.color}</p>
              <p className="text-lg">Origin: {orchid.origin}</p>
              <p className="text-lg">Category: {orchid.category}</p>
            </div>
          ) : (
            <p className="mt-4 text-lg text-gray-500">No data available</p>
          )}

          <DialogClose asChild>
            <Button
              onClick={handleClose}
              className="mt-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Modal1;
