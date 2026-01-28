"use client";

import { useState } from "react";
import { X, Home, Briefcase, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddressModal({ isOpen, onClose }: AddressModalProps) {
  const addAddress = useCartStore((state) => state.addAddress);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    flat: "",
    area: "",
    city: "",
    pincode: "",
    type: "Home" as "Home" | "Work" | "Other",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.flat || !formData.phone) return; // Basic validation
    
    addAddress(formData);
    onClose();
    // Reset form
    setFormData({
      name: "",
      phone: "",
      flat: "",
      area: "",
      city: "",
      pincode: "",
      type: "Home",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <h3 className="text-xl font-heading font-bold text-gray-900">Add New Address</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="input-field"
                      value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Phone</label>
                    <input required type="tel" placeholder="9876543210" className="input-field"
                      value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Flat / House No / Floor</label>
                  <input required type="text" placeholder="Apt 4B, Blue Ridge" className="input-field"
                    value={formData.flat} onChange={(e) => setFormData({...formData, flat: e.target.value})}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Area / Street</label>
                  <input required type="text" placeholder="Near Main Park" className="input-field"
                    value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">City</label>
                    <input required type="text" placeholder="New York" className="input-field"
                      value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Pincode</label>
                    <input required type="text" placeholder="10001" className="input-field"
                      value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                    />
                  </div>
                </div>

                {/* Address Type Selector */}
                <div className="pt-2">
                  <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Save As</label>
                  <div className="flex gap-3">
                    {[ 
                      { label: "Home", icon: Home }, 
                      { label: "Work", icon: Briefcase }, 
                      { label: "Other", icon: MapPin } 
                    ].map((type) => (
                      <button
                        key={type.label}
                        type="button"
                        onClick={() => setFormData({...formData, type: type.label as any})}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                          formData.type === type.label 
                            ? "border-brand bg-brand/10 text-brand font-bold" 
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <type.icon size={16} />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 mt-4 bg-brand text-white rounded-xl font-bold text-lg shadow-lg shadow-brand/20 hover:bg-brand-dark transition-all active:scale-[0.98]"
                >
                  Save Address
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}