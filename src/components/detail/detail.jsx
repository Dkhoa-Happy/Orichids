import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Orichids } from "@/Shared/listOfOrchids";
import { ThemeContext } from "@/ThemeContext";

export default function Detail() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { theme, toggle, dark } = useContext(ThemeContext);
  const orchid = Orichids.find((obj) => obj.Id === id);

  if (!orchid) {
    return <div>Orchid not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-gradient-to-b from-purple-100 to-white">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="relative">
          <img
            src={orchid.image}
            alt={orchid.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
            {orchid.name}
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {orchid.name}
          </h2>
          <p className="text-gray-600 mb-4">Origin: {orchid.origin}</p>
          <p className="text-gray-700 mb-6">Color: {orchid.color}</p>
          <p className="text-gray-700 mb-6">{orchid.details}</p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>View Video</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] w-[90vw] max-h-[90vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-lg">
                  {orchid.name} Video
                </DialogTitle>
              </DialogHeader>
              <div
                className="flex-grow relative overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={orchid.iframe}
                  title={`${orchid.name} Video`}
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
