import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CheckCircle, Users, Target, ArrowRight } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 bg-gradient-to-b from-purple-100 to-white">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Company Introduction */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src="https://i.pinimg.com/564x/ed/e9/f8/ede9f845bc3487687866c4876cf2f2ac.jpg"
                  alt="Company"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Our Story
                </h2>
                <p className="text-gray-600">
                  Founded in 2023, our company has been at the forefront of
                  innovation in the tech industry. We're passionate about
                  creating solutions that make a difference in people's lives
                  and businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Dang Khoa", role: "CEO" },
              { name: "Dang Khoa", role: "CTO" },
              { name: "Dang Khoa", role: "Lead Developer" },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <img
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                    src="public\images\khoa.jpg"
                    alt={member.name}
                  />
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              We strive to deliver innovative solutions that empower businesses
              and individuals to achieve their full potential in the digital
              world.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <CheckCircle className="h-6 w-6" />, text: "Quality" },
                { icon: <Users className="h-6 w-6" />, text: "Collaboration" },
                { icon: <Target className="h-6 w-6" />, text: "Innovation" },
              ].map((value, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {value.icon}
                  <span className="text-gray-700">{value.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
            <p className="mb-6">
              We're always looking for talented individuals to join our team. If
              you're passionate about technology and innovation, we'd love to
              hear from you.
            </p>
            <Button variant="secondary" className="group">
              View Careers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
