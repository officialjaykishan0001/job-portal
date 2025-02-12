import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-2xl font-bold text-white">JobPortal</h2>
                        <p className="mt-2 text-gray-400">
                            Your gateway to the best job opportunities. Find your dream job today!
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                            <li><a href="/jobs" className="hover:text-blue-400">Browse Jobs</a></li>
                            <li><a href="/companies" className="hover:text-blue-400">Companies</a></li>
                            <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
                            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white">Follow Us</h3>
                        <div className="mt-3 flex justify-center md:justify-start space-x-4">
                            <a href="#" className="hover:text-blue-400 text-2xl"><Facebook /></a>
                            <a href="#" className="hover:text-blue-400 text-2xl"><Twitter /></a>
                            <a href="#" className="hover:text-blue-400 text-2xl"><Linkedin /></a>
                            <a href="#" className="hover:text-blue-400 text-2xl"><Instagram /></a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm">
                    <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
