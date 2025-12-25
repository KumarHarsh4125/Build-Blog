import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Logo width="auto" />
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Empowering storytellers and readers with a modern, high-performance blogging platform built on top of the best-in-class technologies.
            </p>
            <div className="flex space-x-4">
              {/* Social placeholders could go here */}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h3>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'API Reference', 'Developer Hub'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary transition-colors duration-200">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Support</h3>
            <ul className="space-y-4">
              {['Account', 'Help Center', 'Contact Us', 'Status Page'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary transition-colors duration-200">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Connect</h3>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm w-full focus:ring-1 focus:ring-primary outline-none"
                />
                <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Blog&Build. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
