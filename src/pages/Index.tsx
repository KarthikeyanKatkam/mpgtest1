
import { ArrowRight, Shield, Zap, Globe, CreditCard, Smartphone, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Maya Payments Gateway</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-10">
              <Link to="/documentation" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Documentation
              </Link>
              <Link to="/api-reference" className="text-base font-medium text-gray-500 hover:text-gray-900">
                API Reference
              </Link>
              <Link to="/support" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Support
              </Link>
              <Link to="/contact" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Link
                to="/auth"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/auth"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Next-gen payment</span>{' '}
                  <span className="block text-blue-600 xl:inline">infrastructure</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Accept payments, send invoices, and manage your business finances with Maya Payments Gateway. 
                  Built for the future with support for traditional payments and cryptocurrency.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/auth"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/contact"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Schedule Demo
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-br from-blue-500 to-purple-600 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">₹</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to accept payments
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              From traditional payment methods to cutting-edge cryptocurrency, we've got you covered.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Multiple Payment Methods</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Accept UPI, NEFT, RTGS, IMPS, SWIFT, Cards (Visa, RuPay, Amex, Mastercard), and Cryptocurrency payments.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Enterprise Security</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Bank-grade security with end-to-end encryption, fraud prevention, and compliance certifications.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Lightning Fast</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Process payments in seconds with our high-performance infrastructure and real-time notifications.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Globe className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Global Coverage</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Accept payments from customers worldwide with support for 20+ currencies and local payment methods.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that fits your business needs
            </p>
          </div>

          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {/* Business Basic */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Business Basic</h3>
                <p className="mt-4 text-sm text-gray-500">Perfect for small businesses getting started</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">₹2,999</span>
                  <span className="text-base font-medium text-gray-500">/mo + 1.8% fee</span>
                </p>
                <Link
                  to="/auth"
                  className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">3,000 API calls</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">₹2 Cr transaction volume</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">3,000 auto / 1,000 manual invoices</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">4 crypto networks / 4 tokens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Business</h3>
                <p className="mt-4 text-sm text-gray-500">For growing businesses</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">₹9,999</span>
                  <span className="text-base font-medium text-gray-500">/mo + 1.8% fee</span>
                </p>
                <Link
                  to="/auth"
                  className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">9,000 API calls</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">₹10 Cr transaction volume</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">7,000 auto / 1,700 manual invoices</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">15 crypto networks / 8 tokens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Business Pro */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ring-1 ring-blue-500 ring-opacity-50">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Business Pro
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Popular
                  </span>
                </h3>
                <p className="mt-4 text-sm text-gray-500">For established businesses</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">₹24,999</span>
                  <span className="text-base font-medium text-gray-500">/mo + 1.8% fee</span>
                </p>
                <Link
                  to="/auth"
                  className="mt-8 block w-full bg-blue-600 border border-blue-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-blue-700"
                >
                  Get started
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">15,000 API calls</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">₹30-40 Cr transaction volume</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">19,000 auto / 4,000 manual invoices</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">20 crypto networks / 12 tokens</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Enterprise */}
            <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Enterprise</h3>
                <p className="mt-4 text-sm text-gray-500">For large organizations</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                </p>
                <Link
                  to="/contact"
                  className="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                >
                  Contact sales
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-xs font-medium text-gray-900 tracking-wide uppercase">What's included</h4>
                <ul className="mt-6 space-y-4">
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Unlimited API calls</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Unlimited transaction volume</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">Unlimited invoices</span>
                  </li>
                  <li className="flex space-x-3">
                    <span className="text-sm text-gray-500">All crypto networks</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Start accepting payments today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of businesses already using Maya Payments Gateway to grow their revenue.
          </p>
          <Link
            to="/auth"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Get started free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="ml-3 text-xl font-bold text-white">Maya Payments Gateway</span>
              </div>
              <p className="text-gray-400 text-base">
                Next-generation payment infrastructure by Maya Exchange. Built for the future of digital payments.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Product
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link to="/documentation" className="text-base text-gray-400 hover:text-white">Documentation</Link></li>
                    <li><Link to="/api-reference" className="text-base text-gray-400 hover:text-white">API Reference</Link></li>
                    <li><Link to="/status" className="text-base text-gray-400 hover:text-white">Status</Link></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link to="/support" className="text-base text-gray-400 hover:text-white">Help Center</Link></li>
                    <li><Link to="/contact" className="text-base text-gray-400 hover:text-white">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li><Link to="/about" className="text-base text-gray-400 hover:text-white">About</Link></li>
                    <li><Link to="/privacy-policy" className="text-base text-gray-400 hover:text-white">Privacy</Link></li>
                    <li><Link to="/terms-of-service" className="text-base text-gray-400 hover:text-white">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              &copy; 2024 Maya Exchange. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
