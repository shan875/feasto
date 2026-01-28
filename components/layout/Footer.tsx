import Link from "next/link";
import Image from "next/image";
// 1. Updated Imports: Removed Facebook, Added Github
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  // 2. Configuration for Social Links
  const socialLinks = [
    { icon: Github, href: "https://github.com/dashboard", label: "GitHub" }, // Added GitHub
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/mhdshan____/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammed-shan-s-63760a333/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12">
        
        {/* Column 1: Brand & Description */}
        <div className="space-y-4">
          <Link href="/" className="inline-block">
             <Image 
               src="/images/logo121.png"
               alt="Lumina Eats"
               width={120}
               height={40}
               className="h-8 w-auto object-contain"
             />
          </Link>

          <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
            Delivering happiness one meal at a time. Premium ingredients, trusted chefs, and lightning-fast delivery.
          </p>
        </div>
        
        {/* Column 2: Company Links */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">Company</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/about" className="hover:text-brand transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-brand transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-brand transition-colors">Contact Support</Link></li>
            <li><Link href="/partner" className="hover:text-brand transition-colors">Partner with us</Link></li>
          </ul>
        </div>

        {/* Column 3: Legal Links */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">Legal</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
            <li><Link href="/cookies" className="hover:text-brand transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* Column 4: Social Media */}
        <div>
          <h4 className="font-bold mb-4 text-gray-900">Follow Us</h4>
          <div className="flex gap-3">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2.5 bg-white rounded-full border border-gray-200 hover:border-brand hover:bg-brand hover:text-white transition-all duration-300 shadow-sm"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <p className="text-center md:text-left">© 2026 Lumina Eats Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="cursor-pointer hover:text-brand transition-colors">Privacy</Link>
          <Link href="/security" className="cursor-pointer hover:text-brand transition-colors">Security</Link>
          <Link href="/sitemap" className="cursor-pointer hover:text-brand transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}