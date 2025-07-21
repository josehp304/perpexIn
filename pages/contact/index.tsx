import { useEffect, useRef, useState } from "react";
import { Curve } from "@/components";
import { Herocontact, Form, FAQ, Socials } from "@/container";

// Contact Options Component
const ContactOptions = () => {
  const [showBranches, setShowBranches] = useState(false);

  const branches = [
    {
      name: "PERPEX",
      address: "Al Rahaba Arcade, Chalappuram, Calicut, Kerala - 673002",
      phone: "+91 9745100036",
      email: "info@perpex.in",
      hours: "Mon-Sat: 10am - 6pm"
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "919745100036"; // PERPEX WhatsApp number
    const message = "Hello! I would like to get in touch with PERPEX.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleGoogleMapClick = () => {
    // PERPEX location in Calicut
    const mapsUrl = "https://maps.google.com/maps?q=Al+Rahaba+Arcade+Chalappuram+Calicut+Kerala+673002";
    window.open(mapsUrl, "_blank");
  };

  const handleContactClick = (type: string, contact: string) => {
    if (type === 'email') {
      window.location.href = `mailto:${contact}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${contact}`;
    }
  };

  const handleSocialClick = (platform: string | number) => {
    const urls = {
      instagram: "https://instagram.com/perpex.in", // Update with actual handle
      linkedin: "https://linkedin.com/company/perpex" // Update with actual handle
    } as const;
    if (typeof platform === 'string') {
      window.open(urls[platform as keyof typeof urls], "_blank");
    }
  };

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the best way to connect with us. We&apos;re here to help!
          </p>
        </div>

        {/* Main Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* WhatsApp Button */}
          <div
            onClick={handleWhatsAppClick}
            className="bg-white hover:bg-gray-50 text-gray-800 p-6 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">WhatsApp</h3>
            <p className="text-center text-sm opacity-90">Quick Chat</p>
          </div>

          {/* Google Map Button */}
          <div
            onClick={handleGoogleMapClick}
            className="bg-white hover:bg-gray-50 text-gray-800 p-6 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Google Map</h3>
            <p className="text-center text-sm opacity-90">Find Location</p>
          </div>

          {/* Multiple Branch Details Button */}
          <div
            onClick={() => setShowBranches(!showBranches)}
            className="bg-white hover:bg-gray-50 text-gray-800 p-6 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Branch Details</h3>
            <p className="text-center text-sm opacity-90">View All Locations</p>
          </div>

          {/* General Contact Button */}
          <div
            onClick={() => handleContactClick('email', 'info@perpex.in')}
            className="bg-white hover:bg-gray-50 text-gray-800 p-6 rounded-xl shadow-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Contact Us</h3>
            <p className="text-center text-sm opacity-90">Get in Touch</p>
          </div>
        </div>

        {/* Branch Details Section */}
        {showBranches && (
          <div className="mb-12 bg-white rounded-xl shadow-lg p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Branch Locations</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {branches.map((branch, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{branch.name}</h4>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      {branch.address}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      {branch.phone}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      {branch.email}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                      {branch.hours}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Google Maps and Contact Info Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Find Us Here</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Google Maps Embed */}
            <div className="relative">
              <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://maps.google.com/maps?q=Al%20Rahaba%20Arcade%20Chalappuram%20Calicut%20Kerala&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                  className="w-full h-80 rounded-lg"
                ></iframe>
              </div>
              <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2">
                <button
                  onClick={handleGoogleMapClick}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>View Larger Map</span>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-lg font-semibold text-gray-800">+91 97451 00036</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-lg font-semibold text-gray-800">info@perpex.in</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="text-lg font-semibold text-gray-800">Al Rahaba Arcade, Chalappuram, Calicut, Kerala - 673002</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleContactClick('phone', '+919745100036')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>Call Now</span>
                </button>
                
                <button
                  onClick={() => handleContactClick('email', 'info@perpex.in')}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>Email Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Contact() {
  const containerRef = useRef(null);
  const locomotiveScrollRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      if (containerRef.current) {
        locomotiveScrollRef.current = new LocomotiveScroll({
          el: containerRef.current,
        } as any);
      }
    })();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
        locomotiveScrollRef.current = null;
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef}>
      <Curve backgroundColor={"#f1f1f1"}>
        <Herocontact />
        <Form />
        
        {/* Contact Options Section */}
        <ContactOptions />
        
        <div className="mb-20">
          <Socials />
        </div>
        <div className="mb-20">
          <FAQ />
        </div>
      </Curve>
    </div>
  );
}