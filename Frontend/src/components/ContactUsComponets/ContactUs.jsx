import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-blue-500 font-semibold tracking-wide uppercase text-sm">Contact Us</h2>
                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    We're here to help
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
                    We're always happy to hear from you. Fill out the form below or use one of the other contact methods to get in touch.
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Contact Form */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:col-span-2">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-gray-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email address"
                                    className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-gray-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter your phone number"
                                className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-gray-50"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                            <textarea
                                id="message"
                                rows="5"
                                placeholder="How can we help you today?"
                                className="block w-full border-gray-200 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-3 border bg-gray-50 resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                                Send Message
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">
                            We'll get back to you within 24 hours. Your data is safe with us.
                        </p>
                    </form>
                </div>

                {/* Right Column: Contact Info & Map */}
                <div className="space-y-6">

                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h3>
                        <div className="space-y-6">

                            {/* Email Item */}
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-100 text-pink-500">
                                        <Mail size={18} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Email</p>
                                    <p className="text-sm font-semibold text-gray-900 break-all">support@growfinix.in</p>
                                </div>
                            </div>

                            {/* Phone Item */}
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-500">
                                        <Phone size={18} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p className="text-sm font-semibold text-gray-900">+91 123 456 7890</p>
                                </div>
                            </div>

                            {/* Address Item */}
                            <div className="flex items-start">
                                <div className="shrink-0">
                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-500">
                                        <MapPin size={18} />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Address</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Ausa, District Latur,<br />
                                        Maharashtra, India
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Location Map Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Our Location</h3>
                        <div className="rounded-xl overflow-hidden bg-gray-200 h-64 border border-gray-100">
                            <iframe
                                src="https://maps.google.com/maps?q=Ausa,Latur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0"
                                title="Ausa Latur Map"
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;