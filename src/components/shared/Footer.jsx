const Footer = () => (
  <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Logo & About */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            VenTech.
          </span>
        </div>
        <p className="text-sm leading-relaxed max-w-xs">
          Discover, sell, and manage products seamlessly. Your ultimate multi-vendor marketplace.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2">
        <h6 className="font-semibold text-gray-900 dark:text-white mb-2">Navigation</h6>
        <a href="/" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Home</a>
        <a href="/categories" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Categories</a>
        <a href="/contact" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Contact</a>
        <a href="/login" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Login</a>
        <a href="/register" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Register</a>
      </div>

      {/* Company */}
      <div className="flex flex-col gap-2">
        <h6 className="font-semibold text-gray-900 dark:text-white mb-2">Company</h6>
        <a href="/about" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">About Us</a>
        <a href="/terms" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Terms & Conditions</a>
        <a href="/privacy" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">Privacy Policy</a>
      </div>

      {/* Connect / Social */}
      <div className="flex flex-col gap-2">
        <h6 className="font-semibold text-gray-900 dark:text-white mb-2">Connect</h6>
        <a href="mailto:info@ventech.com" className="hover:text-pink-500 dark:hover:text-yellow-400 transition">info@ventech.com</a>
        <div className="flex gap-4 mt-2">
          {/* Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-6 h-6 fill-pink-500 dark:fill-yellow-400" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
          </a>
          {/* Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-6 h-6 fill-pink-500 dark:fill-yellow-400" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.936 0 .39.045.765.127 1.124C7.728 8.816 4.1 6.884 1.671 3.965c-.427.734-.666 1.584-.666 2.491 0 1.72.875 3.234 2.209 4.122a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0 0 24 4.557z"/>
            </svg>
          </a>
          {/* Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
            <svg className="w-6 h-6 fill-pink-500 dark:fill-yellow-400" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.378c-.98.98-1.247 2.092-1.306 3.373C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.326 2.393 1.306 3.373.98.98 2.092 1.247 3.373 1.306C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.326 3.373-1.306.98-.98 1.247-2.092 1.306-3.373.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.326-2.393-1.306-3.373-.98-.98-2.092-1.247-3.373-1.306C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    {/* Footer Bottom */}
    <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} VenderTech. All rights reserved.
    </div>
  </footer>
);

export default Footer;
