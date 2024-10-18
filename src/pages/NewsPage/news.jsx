import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, CalendarDays, Mail } from "lucide-react";

export default function News() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Featured News */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Featured Story
          </h2>
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-full w-full object-cover md:w-48"
                  src="https://th.bing.com/th/id/R.c356131edbf7a27f77c8d2f219ac3907?rik=eriF8p16gl%2b%2bzw&pid=ImgRaw&r=0&sres=1&sresct=1"
                  alt="Rare Orchid Discovery"
                />
              </div>
              <CardContent className="p-8">
                <CardTitle className="text-xl font-semibold text-purple-800 mb-2">
                  Rare Orchid Species Discovered in Amazon Rainforest
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  Scientists have uncovered a new species of orchid deep in the
                  Amazon rainforest. This discovery highlights the importance of
                  biodiversity conservation...
                </p>
                <Button
                  variant="outline"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Recent Articles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Recent Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Top 5 Orchid Care Tips for Beginners",
                date: "May 15, 2023",
                img: "https://i.pinimg.com/736x/ae/16/ab/ae16ab2f6645a2df376ef23bd2651bc7.jpg",
              },
              {
                title: "The History and Symbolism of Orchids",
                date: "May 10, 2023",
                img: "https://th.bing.com/th/id/OIP.IczYrJ_Apxv3quSQGJQbBQHaE9?w=287&h=192&c=7&r=0&o=5&pid=1.7",
              },
              {
                title: "Orchid Exhibitions Around the World",
                date: "May 5, 2023",
                img: "https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/videos/video/preview_image_UZhH4qP9_223b36706ee38c647ac3478dbc033496.jpeg",
              },
            ].map((article, index) => (
              <Card key={index}>
                <img
                  className="w-full h-48 object-cover"
                  src={article.img} // Corrected the image URL
                  alt={article.title}
                />
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-semibold text-purple-800 mb-2">
                    {article.title}
                  </CardTitle>
                  <div className="flex items-center text-gray-500 text-sm">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {article.date}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-12">
          <Card className="bg-purple-100">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0 md:mr-8">
                  <h2 className="text-2xl font-semibold text-purple-800 mb-2">
                    Stay Updated
                  </h2>
                  <p className="text-purple-600">
                    Subscribe to our newsletter for the latest orchid news and
                    care tips.
                  </p>
                </div>
                <form className="flex w-full md:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mr-2 flex-grow md:flex-grow-0"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Subscribe
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Orchid of the Month */}
        <section>
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">
            Orchid of the Month
          </h2>
          <Card>
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-full w-full object-cover md:w-48"
                  src="https://d454f65f6x7sd.cloudfront.net/wp-content/uploads/2019/10/01-pink-phalaenopsis-feature.jpg" // Updated the image URL
                  alt="Phalaenopsis Orchid"
                />
              </div>
              <CardContent className="p-8">
                <CardTitle className="text-xl font-semibold text-purple-800 mb-2">
                  Phalaenopsis: The Moth Orchid
                </CardTitle>
                <p className="text-gray-600 mb-4">
                  Known for its elegant, wing-shaped flowers, the Phalaenopsis
                  is one of the most popular orchid genera. These orchids are
                  perfect for beginners due to their adaptability and
                  long-lasting blooms...
                </p>
                <Button
                  variant="outline"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
