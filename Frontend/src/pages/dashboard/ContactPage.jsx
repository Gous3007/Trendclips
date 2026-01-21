import React, { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";
import {
    Search,
    MessageSquare,
    User,
    Clock,
    Send,
    CheckCircle,
    Inbox,
    Filter
} from "lucide-react";

const ContactPage = () => {
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [reply, setReply] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All"); // All, New, Replied
    const [loading, setLoading] = useState(false);

    // 📥 Fetch contacts
    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await api.get("/api/admin/contacts");
            // Sorting: Newest first
            const sortedData = res.data.data.sort((a, b) =>
                new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now())
            );
            setContacts(sortedData);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // 👀 Mark as read
    const openMessage = async (contact) => {
        setSelected(contact);
        setReply(contact.reply || "");

        // Sirf UI update karein taaki instant feel ho, background me API call karein
        if (contact.status === "New") {
            const updatedContacts = contacts.map(c =>
                c._id === contact._id ? { ...c, status: "Read" } : c
            );
            setContacts(updatedContacts);

            // Silent API Call
            await api.put(`/api/admin/contacts/read/${contact._id}`);
        }
    };

    // 💬 Reply
    const sendReply = async () => {
        if (!reply.trim()) return;
        try {
            await api.put(`/api/admin/contacts/reply/${selected._id}`, { reply });

            // Update local state
            const updatedContacts = contacts.map(c =>
                c._id === selected._id ? { ...c, status: "Replied", reply } : c
            );
            setContacts(updatedContacts);
            setSelected({ ...selected, status: "Replied", reply });
            alert("Reply sent successfully!");
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    // 🔍 Filtering Logic (Frontend Search for speed)
    const filteredContacts = useMemo(() => {
        return contacts.filter(c => {
            const matchesSearch = c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === "All" ? true : c.status === filterStatus;
            return matchesSearch && matchesFilter;
        });
    }, [contacts, searchTerm, filterStatus]);

    return (
        <div className="flex h-screen bg-[#0B0F19] text-gray-100 overflow-hidden font-sans">

            {/* 👈 LEFT SIDEBAR: LIST */}
            <div className="w-1/3 min-w-[350px] border-r border-gray-800 flex flex-col bg-gray-900/50">

                {/* Header & Search */}
                <div className="p-4 border-b border-gray-800">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Inbox className="text-blue-500" /> Inbox
                            <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                                {contacts.length}
                            </span>
                        </h2>
                    </div>

                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-2.5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search emails or names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-gray-200 placeholder-gray-500"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mt-4 text-sm">
                        {["All", "New", "Replied"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-3 py-1.5 rounded-md transition-colors ${filterStatus === status
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Contact List (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {loading ? (
                        <p className="text-center py-10 text-gray-500">Loading messages...</p>
                    ) : filteredContacts.length === 0 ? (
                        <p className="text-center py-10 text-gray-500">No messages found</p>
                    ) : (
                        filteredContacts.map((c) => (
                            <div
                                key={c._id}
                                onClick={() => openMessage(c)}
                                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-all relative group ${selected?._id === c._id ? "bg-gray-800 border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className={`font-semibold text-sm ${c.status === "New" ? "text-white" : "text-gray-300"}`}>
                                        {c.fullName}
                                    </h4>
                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(c.createdAt || Date.now()).toLocaleDateString()}
                                    </span>
                                </div>

                                <p className="text-xs text-gray-400 truncate w-[90%] mb-2">
                                    {c.message}
                                </p>

                                <div className="flex justify-between items-center">
                                    {/* Status Badges */}
                                    {c.status === "New" ? (
                                        <span className="flex items-center gap-1 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div> New
                                        </span>
                                    ) : c.status === "Replied" ? (
                                        <span className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">
                                            <CheckCircle size={10} /> Replied
                                        </span>
                                    ) : (
                                        <span className="text-[10px] text-gray-500">Read</span>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* 👉 RIGHT MAIN: MESSAGE DETAIL */}
            <div className="flex-1 bg-[#0B0F19] flex flex-col h-full">
                {!selected ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                            <MessageSquare size={40} className="text-gray-600" />
                        </div>
                        <p className="text-lg font-medium">Select a message to view details</p>
                    </div>
                ) : (
                    <>
                        {/* Detail Header */}
                        <div className="p-6 border-b border-gray-800 flex justify-between items-start bg-gray-900/30">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg">
                                    {selected.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selected.fullName}</h2>
                                    <p className="text-sm text-blue-400">{selected.email}</p>
                                    <p className="text-xs text-gray-500 mt-1">{selected.phone || "No phone provided"}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs border ${selected.status === "Replied"
                                        ? "border-green-500/30 bg-green-500/10 text-green-400"
                                        : "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                    }`}>
                                    {selected.status}
                                </span>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(selected.createdAt || Date.now()).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Message Body (Scrollable) */}
                        <div className="flex-1 p-8 overflow-y-auto">
                            <div className="max-w-3xl">
                                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">Customer Message</label>
                                <div className="bg-gray-800 p-6 rounded-2xl rounded-tl-none border border-gray-700 text-gray-200 leading-relaxed shadow-sm">
                                    {selected.message}
                                </div>
                            </div>

                            {/* Show previous reply if exists */}
                            {selected.status === "Replied" && selected.reply && (
                                <div className="max-w-3xl ml-auto mt-8">
                                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block text-right">Your Reply</label>
                                    <div className="bg-blue-900/20 p-6 rounded-2xl rounded-tr-none border border-blue-500/30 text-blue-100 leading-relaxed">
                                        {selected.reply}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reply Box */}
                        <div className="p-6 bg-gray-900 border-t border-gray-800">
                            <div className="relative">
                                <textarea
                                    rows="4"
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply here..."
                                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 pr-12 text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none transition-all"
                                />
                                <button
                                    onClick={sendReply}
                                    disabled={!reply.trim() || selected.status === "Replied"}
                                    className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-500/20"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Reply sends an email to the customer automatically.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ContactPage;