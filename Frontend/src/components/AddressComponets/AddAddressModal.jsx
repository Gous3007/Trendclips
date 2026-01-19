import React, { useState } from 'react';
import { X, MapPin, Home, Briefcase, ChevronDown } from 'lucide-react';

// --- ALL INDIA STATES & UTs LIST ---
const INDIAN_STATES = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

const AddAddressModal = ({ isOpen, onClose, onSave }) => {
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email:'',
        pincode: '',
        flat: '',
        area: '',
        landmark: '',
        state: '',
        district: '',
        tehsil: '',
        city: '',
        isDefault: false,
        type: 'Home'
    });

    if (!isOpen) return null;

    // Generic Change Handler for all inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-0 md:p-4">
            {/* Modal Container */}
            <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">

                {/* --- Header --- */}
                <div className="bg-white px-6 py-4 flex justify-between items-center border-b sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Add Delivery Address</h2>
                        <p className="text-xs text-gray-500">Please fill in accurate details</p>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* --- Form Body (Scrollable) --- */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 bg-gray-50">
                    <form id="addressForm" onSubmit={handleSubmit} className="space-y-6">

                        {/* Location Section */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-sm font-bold text-blue-600 mb-4 flex items-center gap-2">
                                <MapPin size={16} /> LOCATION DETAILS
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* State Select (Only Dropdown) */}
                                <div className="relative">
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">State</label>
                                    <div className="relative">
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                                        >
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map((state, index) => (
                                                <option key={index} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* District Input (Manual) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter District"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* Tehsil Input (Manual) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tehsil / Taluka</label>
                                    <input
                                        type="text"
                                        name="tehsil"
                                        value={formData.tehsil}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Tehsil"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>

                                {/* City/Town Input (Manual) */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Village / Town</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter Village/Town"
                                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Personal Info Section */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-sm font-bold text-blue-600 mb-4">CONTACT INFO</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2 text-gray-500 font-medium">+91</span>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                value={formData.mobile}
                                                onChange={handleChange}
                                                required
                                                maxLength="10"
                                                className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            required
                                            maxLength="6"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Specifics */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-sm font-bold text-blue-600 mb-4">ADDRESS DETAILS</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Flat, House no., Building, Company</label>
                                    <input
                                        type="text"
                                        name="flat"
                                        value={formData.flat}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Area, Street, Sector</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark (Optional)</label>
                                    <input
                                        type="text"
                                        name="landmark"
                                        value={formData.landmark}
                                        onChange={handleChange}
                                        placeholder="E.g. Near Apollo Hospital"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address Type & Default */}
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Address Type</label>
                            <div className="flex gap-4 mb-4">
                                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.type === 'Home' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="type" value="Home" checked={formData.type === 'Home'} onChange={handleChange} className="hidden" />
                                    <Home size={18} />
                                    <div className="text-left">
                                        <span className="block font-bold text-sm">Home</span>
                                        <span className="block text-[10px] opacity-70">All day delivery</span>
                                    </div>
                                </label>
                                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${formData.type === 'Work' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                                    <input type="radio" name="type" value="Work" checked={formData.type === 'Work'} onChange={handleChange} className="hidden" />
                                    <Briefcase size={18} />
                                    <div className="text-left">
                                        <span className="block font-bold text-sm">Work</span>
                                        <span className="block text-[10px] opacity-70">10 AM - 5 PM</span>
                                    </div>
                                </label>
                            </div>

                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 checked:bg-blue-600 checked:border-blue-600 transition-all" />
                                    <svg className="absolute w-3.5 h-3.5 text-white left-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Make this my default address</span>
                            </label>
                        </div>

                    </form>
                </div>

                {/* --- Footer (Sticky) --- */}
                <div className="p-4 border-t bg-white flex justify-end gap-3 sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 md:flex-none px-6 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition-transform"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="addressForm"
                        className="flex-1 md:flex-none px-8 py-3 text-sm font-bold text-white bg-yellow-500 rounded-lg shadow-md hover:bg-yellow-600 active:scale-95 transition-transform flex items-center justify-center gap-2"
                    >
                        Save Address
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddAddressModal;