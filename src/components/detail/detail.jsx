import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import { ThemeContext } from "@/ThemeContext";

export default function Detail() {
  const { id } = useParams(); // Get the ID from the URL, note the lowercase 'id'
  const [orchid, setOrchid] = useState(null); // State to hold the orchid data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [open, setOpen] = useState(false);

  const baseURL = `https://66c6a2a88b2c10445bc73c2d.mockapi.io/Orichids/${id}`;
  const { theme } = useContext(ThemeContext); // Use the theme context if needed

  // Fetch orchid details from the API based on the ID from the URL
  const fetchOrchidDetails = () => {
    setLoading(true); // Start loading
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orchid details");
        }
        return response.json();
      })
      .then((data) => {
        setOrchid(data); // Set the fetched orchid data
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        setError(error.message); // Set error message
        setLoading(false); // Stop loading
      });
  };

  // Fetch the data when the component mounts or when the ID changes
  useEffect(() => {
    fetchOrchidDetails();
  }, [id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
          {/* Skeleton for the image */}
          <Skeleton className="w-full h-64" />

          <div className="p-6">
            {/* Skeleton for the title */}
            <Skeleton className="h-6 w-48 mb-4" />

            {/* Skeleton for the origin text */}
            <Skeleton className="h-4 w-24 mb-2" />

            {/* Skeleton for the color text */}
            <Skeleton className="h-4 w-32 mb-2" />

            {/* Skeleton for the details text */}
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  // If orchid is not found
  if (!orchid) {
    return <div className="text-center">Orchid not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 bg-gradient-to-b from-purple-100 to-white">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
        <div className="relative">
          <img
            src={orchid.image || orchid.imageUrl} // Use API image URL
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

          {/* Video Dialog */}
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
