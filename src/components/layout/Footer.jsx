import React from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import { LocationArrow, LogoFacebook } from '@gravity-ui/icons';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0D02] border-t border-[#1C210E] pt-16 pb-8 text-[#A4A896]/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">

          <div className="col-span-1 md:col-span-6 flex flex-col space-y-5">
            <h2 className="text-white font-black text-2xl tracking-wider select-none">
              NextGen Fashion
            </h2>
            <p className="text-[#A4A896]/80 text-[15px] leading-relaxed max-w-sm">
              Premium fashion for the modern individual.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-5 pt-2">
              <a
                href="https://facebook.com/mahmudulhasanzb"
                className="text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-250 flex items-center justify-center"
                aria-label="Facebook"
              >
                <LogoFacebook className="h-6 w-6 fill-current" />
              </a>
              <a
                href="#"
                className="text-[#A4A896]/60 hover:text-[#D4FF00] transition-colors duration-250"
                aria-label="Chat"
              >
                <MessageSquare className="h-5 w-5 stroke-[1.8]" />
              </a>
            </div>
          </div>

          {/* Right Side: Columns */}
          <div className="col-span-1 md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Platform */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Support
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Shipping Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Column 3: Contact*/}
            <div className="col-span-2 sm:col-span-1 flex flex-col space-y-4">
              <h3 className="text-white font-extrabold text-[12px] tracking-widest uppercase select-none">
                Contact
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="email:hello@nextgen.com"
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    hello@nextgen.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+8801726000816"
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    +8801726000816
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.app.goo.gl/t9zQ5P45678901234"
                    className="hover:text-white transition-colors duration-200 flex items-center gap-2"
                  >
                    <LocationArrow className="h-4 w-4" />
                    Dhaka, Bangladesh
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1C210E]/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#A4A896]/45">
          <p className="select-none">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-[#A4A896] font-semibold italic transition-colors duration-250 hover:cursor-pointer">
              NextGen Fashion
            </span>
            . All rights reserved.
          </p>
          <p className="text-[#A4A896]/45 select-none">
            Developed by{' '}
            <Link
              href="https://www.linkedin.com/in/mahmudulhasanzb/"
              target="_blank"
              className="text-[#A4A896] font-semibold italic transition-colors duration-250 hover:text-[#D4FF00] hover:cursor-pointer"
            >
              Mahmudul Hasan{' '}
              <span className="animate-pulse text-[#00FF37]">&gt;</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
