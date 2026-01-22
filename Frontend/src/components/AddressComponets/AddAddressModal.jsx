import React, { useEffect, useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

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

const AddAddressModal = ({ isOpen, onClose, onSave, editData }) => {

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        pincode: "",
        flat: "",
        area: "",
        landmark: "",
        state: "",
        district: "",
        tehsil: "",
        city: "",
        isDefault: false,
        type: "Home",
    });

    // Form State
    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || "",
                mobile: editData.mobile || "",
                email: editData.email || "",
                pincode: editData.pincode || "",
                flat: editData.flat || "",
                area: editData.area || "",
                landmark: editData.landmark || "",
                state: editData.state || "",
                district: editData.district || "",
                tehsil: editData.tehsil || "",
                city: editData.city || "",
                isDefault: editData.isDefault || false,
                type: editData.addressType || "Home",
            });
        }
    }, [editData]);

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

    // Reusable Input Styles matching Amazon
    const inputClasses = "w-full px-3 py-2 bg-white border border-gray-400 rounded-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.1)_inset] focus:border-[#e77600] focus:ring-[3px] focus:ring-[#fbd8b4] outline-none transition-all text-sm text-gray-900 placeholder-gray-500";
    const labelClasses = "block text-sm font-bold text-gray-900 mb-1";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] p-0 md:p-4">

            {/* Modal Container */}
            <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-lg shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-2 duration-200">

                {/* --- Header --- */}
                <div className="bg-[#f0f2f2] px-6 py-4 flex justify-between items-center border-b border-[#d5d9d9] sticky top-0 z-10">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-tight">
                            {editData ? "Edit your address" : "Add a new address"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* --- Form Body (Scrollable) --- */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white">
                    <form id="addressForm" onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">

                        {/* Country (Static for visual context) */}
                        <div className="mb-2">
                            <label className={labelClasses}>Country/Region</label>
                            <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-sm text-sm font-bold text-gray-600 shadow-inner">
                                India
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Full name (First and Last name)</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Mobile number</label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        required
                                        maxLength="10"
                                        placeholder="10-digit mobile number without prefixes"
                                        className={inputClasses}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">May be used to assist delivery</p>
                            </div>

                            <div>
                                <label className={labelClasses}>Email (Optional)</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="space-y-4">
                            <div>
                                <label className={labelClasses}>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                    maxLength="6"
                                    placeholder="6 digits [0-9] PIN code"
                                    className={`${inputClasses} w-1/2`}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Flat, House no., Building, Company, Apartment</label>
                                <input
                                    type="text"
                                    name="flat"
                                    value={formData.flat}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Area, Street, Sector, Village</label>
                                <input
                                    type="text"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    required
                                    className={inputClasses}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Landmark</label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={formData.landmark}
                                    onChange={handleChange}
                                    placeholder="E.g. near Apollo Hospital"
                                    className={inputClasses}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Town/City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                    />
                                </div>
                                <div className="relative">
                                    <label className={labelClasses}>State</label>
                                    <div className="relative">
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            required
                                            className={`${inputClasses} appearance-none cursor-pointer bg-gray-50`}
                                        >
                                            <option value="">Select State</option>
                                            {INDIAN_STATES.map((state, index) => (
                                                <option key={index} value={state}>{state}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-2 top-2.5 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>District</label>
                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Tehsil / Taluka</label>
                                    <input
                                        type="text"
                                        name="tehsil"
                                        value={formData.tehsil}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Default & Type */}
                        <div className="pt-2">
                            <label className="flex items-start gap-2 cursor-pointer mb-6 group">
                                <div className="relative flex items-center pt-0.5">
                                    <input
                                        type="checkbox"
                                        name="isDefault"
                                        checked={formData.isDefault}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <span className="text-sm text-gray-900 font-medium">Make this my default address</span>
                                </div>
                            </label>

                            <h3 className="text-sm font-bold text-gray-900 mb-2">Address Type</h3>
                            <div className="flex gap-4">
                                {["Home", "Work"].map((type) => (
                                    <label
                                        key={type}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all
                                            ${formData.type === type
                                                ? 'bg-[#FDF8E3] border-orange-500 shadow-sm'
                                                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                            }
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={formData.type === type}
                                            onChange={handleChange}
                                            className="accent-orange-600 w-4 h-4"
                                        />
                                        <span className="text-sm font-bold text-gray-800">
                                            {type} {type === 'Home' ? '(7 am – 9 pm delivery)' : '(10 am – 5 pm delivery)'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* --- Footer --- */}
                <div className="p-4 border-t border-[#d5d9d9] bg-gray-50 flex justify-end gap-3 sticky bottom-0 z-10">
                    <button
                        type="button"
                        onClick={onClose}
                        className="hidden md:block px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="addressForm"
                        className="w-full md:w-auto px-6 py-2.5 text-sm font-medium text-gray-900 bg-[#FFD814] border border-[#FCD200] rounded-lg shadow-sm hover:bg-[#F7CA00] active:border-[#F0B800]"
                    >
                        {editData ? "Update address" : "Add address"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddAddressModal;