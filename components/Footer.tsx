import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { footerItems, footernavbarItems } from "@/constants";
import { TextHoverEffectDemo } from "@/data/data";

const navigation = {
  services: [
    { name: "PerpeX Institute", href: "#" },
    { name: "SaleX", href: "#" },
    { name: "MarketriX", href: "#" },
    { name: "PlaceX", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  quickLinks: [
    { name: "Placements", href: "#" },
    { name: "Corporate Training", href: "#" },
    { name: "Student Stories", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Legal Terms", href: "https://legislative.gov.in/legal-glossary/" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white min-h-screen flex flex-col px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col justify-between py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          {/* Left - Brand & Contact */}
          <div className="space-y-6">
            <Link href="/" className="block w-fit">
              <div className="flex items-center space-x-3">
                <Image
                  src="/navbar.webp"
                  alt="perpex logo"
                  width={260}
                  height={260}
                  className="rounded-lg"
                />
                <div className="text-xl font-bold">
                  <span className="text-white">Kerala&#39;s #1 Practical Business School</span>
      
                </div>
              </div>
            </Link>
            
            <div className="space-y-2">
              <h2 className="text-lg font-bold font-FoundersGrotesk text-white uppercase leading-tight">
                *PERPETUAL EXCELLENCE.
              </h2>
              <h3 className="text-sm font-semibold font-FoundersGrotesk text-blue-500 uppercase">
                #PERPEX
              </h3>
            </div>
            
            <p className="text-gray-400 text-sm max-w-sm">
              Delivering perpetual excellence.
            </p>

            {/* Contact Info - Compact */}
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-300">📞 </span>
                <a
                  href="https://wa.me/919745100036"
                  target="_blank"
                  className="text-green-400 hover:text-green-300 font-medium"
                >
                  +91 97451 00036
                </a>
                <span className="text-gray-500 mx-2">•</span>
                <a
                  href="https://wa.me/919745100046"
                  target="_blank"
                  className="text-green-400 hover:text-green-300"
                >
                  97451 00046
                </a>
              </div>

              <div className="text-xs space-y-1">
                <a href="mailto:Support@perpexbschool.in" className="text-blue-400 hover:text-blue-300 block">
                  Support@perpexbschool.in
                </a>
                <a href="mailto:Admissions@perpexbschool.in" className="text-blue-400 hover:text-blue-300 block">
                  Admissions@perpexbschool.in
                </a>
              </div>
              
             

              <div>
                <span className="text-gray-300">📍 </span>
                <a 
                  href="https://maps.app.goo.gl/hawzhUzsAsMGhQMG9"
                  target="_blank"
                  className="text-gray-400 hover:text-white"
                >
                  Al Rahaba Arcade, Chalappuram, Calicut
                </a>
              </div>

              <div>
                <span className="text-gray-300">📧 </span>
                <h1>For B2B Enquiries: </h1>
                <a href="mailto:info@perpex.in" className="text-blue-400 hover:text-blue-300">
                  info@perpex.in
                </a>
              </div>

              
            </div>

            {/* Social Icons - Compact */}
            <div className="flex items-center space-x-3">
              {footerItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
                >
                  <span className="text-xs font-bold">{item.title.charAt(0)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle - Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Visit Our Corporate Office</h3>
            <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15650.234567890123!2d75.7810!3d11.2588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba659b4d2ec1c3d%3A0x12345!2sChalappuram%2C%20Kozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                className="grayscale hover:grayscale-0 transition-all duration-300 filter brightness-90"
              ></iframe>
            </div>
            <a 
              href="https://maps.app.goo.gl/hawzhUzsAsMGhQMG9"
              target="_blank"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              📍 Get Directions
            </a>
          </div>

          {/* Right - Links */}
          <div className="grid grid-cols-2 gap-6">
            {/* Services & Company */}
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
                <ul className="space-y-2">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
                <ul className="space-y-2">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links & Legal */}
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
                <ul className="space-y-2">
                  {navigation.quickLinks.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
                <ul className="space-y-2">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-gray-400 hover:text-white transition-colors text-xs">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom - Copyright & Text Effect */}
        <div className="mt-6 space-y-4">
          <div className="border-t border-gray-800 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} PerpeX Insights. All rights reserved.
              </p>
              <p className="text-gray-600 text-xs">
                Crafted with excellence in Kerala, India
              </p>
            </div>
          </div>

          {/* Text Hover Effect - Compact */}
          <div className="w-full">
            <TextHoverEffectDemo />
          </div>
        </div>
      </div>
    </footer>
  );
}