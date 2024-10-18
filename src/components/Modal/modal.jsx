/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Modal1({ orichid, trigger }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(orichid?.rating || 0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Hàm để cập nhật đánh giá sao
  const handleRatingClick = (index) => {
    setRating(index);
  };

  return (
    <div>
      {/* Trigger element */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <span onClick={showModal}>{trigger}</span>
        </DialogTrigger>

        <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {orichid ? orichid.name : "Detail"}
            </DialogTitle>
          </DialogHeader>

          {orichid ? (
            <div className="space-y-3 mt-4">
              <p className="text-lg font-semibold">Your Rating:</p>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    onClick={() => handleRatingClick(index + 1)}
                    className={`cursor-pointer text-2xl ${
                      index < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg mt-4">
                Special: {orichid.isSpecial ? "Yes" : "No"}
              </p>
              <p className="text-lg">Color: {orichid.color}</p>
              <p className="text-lg">Origin: {orichid.origin}</p>
              <p className="text-lg">Category: {orichid.category}</p>
            </div>
          ) : (
            <p className="mt-4 text-lg text-gray-500">No data available</p>
          )}

          <DialogClose asChild>
            <Button
              onClick={handleClose}
              className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
