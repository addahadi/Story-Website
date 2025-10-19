import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* Brand / About */}
        <div>
          <h3 className="text-xl font-bold text-white">StoryGen</h3>
          <p className="mt-4 text-gray-400">
            Instantly generate unique and engaging stories with the power of AI.
            Save time, focus on creativity, and let your imagination flow.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>

          <ul className="mt-4 space-y-3">
            <li>
              <HashLink
                smooth
                to="#features"
                className="hover:text-white transition"
              >
                Features
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="#how-it-works"
                className="hover:text-white transition"
              >
                How It Works
              </HashLink>
            </li>
            <li>
              <HashLink
                smooth
                to="#faq"
                className="hover:text-white transition"
              >
                FAQ
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white">Connect</h4>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href="mailto:hello@storygen.com"
                className="hover:text-white transition"
              >
                hello@storygen.com
              </a>
            </li>
            <li className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-white transition">
                🌐
              </a>
              <a href="#" className="hover:text-white transition">
                🐦
              </a>
              <a href="#" className="hover:text-white transition">
                📘
              </a>
              <a href="#" className="hover:text-white transition">
                📸
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} StoryGen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
