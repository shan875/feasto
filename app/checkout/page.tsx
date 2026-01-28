"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ArrowRight,    // <--- Added (Fixes the crash)
  MapPin, 
  Clock, 
  CreditCard, 
  CheckCircle, 
  Plus, 
  ChevronRight, 
  Wallet, 
  Banknote,
  Briefcase      // <--- Added (For "Work" address icon)
} from "lucide-react";
import AddressModal from "@/components/checkout/AddressModal"; 

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart, addresses, selectedAddressId, selectAddress, paymentMethod, setPaymentMethod } = useCartStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentAddress = addresses.find(addr => addr.id === selectedAddressId);
  
  const subtotal = getCartTotal();
  const gst = subtotal * 0.05;
  const deliveryFee = 40;
  const platformFee = 5;
  const grandTotal = subtotal + gst + deliveryFee + platformFee;

  const handlePlaceOrder = () => {
    if (!currentAddress) {
        alert("Please select a delivery address");
        return;
    }
    setIsProcessing(true);
    setTimeout(() => {
        clearCart();
        router.push("/order-success");
    }, 2000);
  };

  if (!mounted) return null; // Prevent hydration errors

  if (items.length === 0) {
     return (
        <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
            <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-gray-400" size={32} />
                </div>
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">Cart is Empty</h2>
                <p className="text-gray-500 mb-6">Add some delicious food to checkout.</p>
                <Link href="/" className="px-8 py-3 bg-brand text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all">
                    Browse Restaurants
                </Link>
            </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32 md:pb-12">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
             <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <h1 className="text-xl font-heading font-bold text-gray-900">Checkout</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Address & Payment */}
        <div className="md:col-span-7 space-y-6">
          
          {/* 1. Address Section */}
          <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex justify-between items-start mb-4">
                 <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                   <MapPin size={20} className="text-brand" /> Delivery Address
                 </h2>
                 <button 
                    onClick={() => setShowAddressModal(true)} 
                    className="text-brand font-bold text-xs md:text-sm uppercase tracking-wide hover:bg-brand/5 px-3 py-1 rounded-full transition-colors"
                 >
                    {currentAddress ? "Change" : "Add New"}
                 </button>
             </div>

             {currentAddress ? (
                 <div className="p-4 border border-brand/30 bg-orange-50/50 rounded-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 bg-brand text-white text-[10px] px-2 py-1 rounded-bl-lg font-bold">SELECTED</div>
                   <div className="flex items-start gap-3">
                      <div className="mt-1 bg-white p-2 rounded-full shadow-sm text-gray-700">
                          {currentAddress.type === 'Home' && <MapPin size={18} />}
                          {currentAddress.type === 'Work' && <Briefcase size={18} />} 
                          {currentAddress.type === 'Other' && <MapPin size={18} />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            {currentAddress.type} 
                            <span className="text-gray-400 font-normal text-xs">({currentAddress.name})</span>
                        </h3>
                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                          {currentAddress.flat}, {currentAddress.area}, {currentAddress.city} - {currentAddress.pincode}
                        </p>
                        <p className="text-gray-500 text-sm mt-1 font-medium">Phone: {currentAddress.phone}</p>
                      </div>
                   </div>
                   <div className="mt-3 flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/80 px-3 py-1.5 rounded-lg w-fit border border-gray-100 shadow-sm">
                      <Clock size={12} className="text-green-600" /> 30-35 mins delivery
                   </div>
                 </div>
             ) : (
                 <button 
                    onClick={() => setShowAddressModal(true)}
                    className="w-full py-8 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-brand hover:text-brand hover:bg-brand/5 transition-all gap-2"
                 >
                    <Plus size={24} />
                    <span className="font-bold">Add Address to Proceed</span>
                 </button>
             )}
          </section>

          {/* 2. Payment Method */}
          <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
             <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
               <CreditCard size={20} className="text-brand" /> Payment Method
             </h2>
             <div className="space-y-3">
               
               {/* UPI Option */}
               <div 
                  onClick={() => setPaymentMethod('UPI')}
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'UPI' ? 'border-brand bg-brand/5 shadow-sm ring-1 ring-brand' : 'border-gray-200 hover:border-gray-300'
                  }`}
               >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'UPI' ? 'border-brand' : 'border-gray-300'}`}>
                      {paymentMethod === 'UPI' && <div className="w-2.5 h-2.5 bg-brand rounded-full" />}
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <div className="bg-gray-100 p-1.5 rounded-lg"><Wallet size={16} className="text-gray-600"/></div>
                         <span className="font-bold text-gray-900">UPI</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-9">Google Pay, PhonePe, Paytm</p>
                  </div>
               </div>

               {/* COD Option */}
               <div 
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'COD' ? 'border-brand bg-brand/5 shadow-sm ring-1 ring-brand' : 'border-gray-200 hover:border-gray-300'
                  }`}
               >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-brand' : 'border-gray-300'}`}>
                      {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 bg-brand rounded-full" />}
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center gap-2">
                         <div className="bg-gray-100 p-1.5 rounded-lg"><Banknote size={16} className="text-gray-600"/></div>
                         <span className="font-bold text-gray-900">Cash on Delivery</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 ml-9">Pay cash to delivery partner</p>
                  </div>
               </div>

             </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Order Summary (Sticky) */}
        <div className="md:col-span-5">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
             <h2 className="text-lg font-bold mb-4 text-gray-900">Order Summary</h2>
             
             {/* Item List */}
             <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
               {items.map((item) => (
                 <div key={item.id} className="flex justify-between items-start text-sm group">
                    <div className="flex items-start gap-3">
                        <div className="bg-gray-50 border border-gray-200 text-gray-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded flex-shrink-0 mt-0.5">
                            {item.quantity}
                        </div>
                        <div>
                             <span className="text-gray-800 font-medium leading-tight block">{item.name}</span>
                             <span className="text-xs text-gray-400">Standard Portion</span>
                        </div>
                    </div>
                    <span className="font-bold text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                 </div>
               ))}
             </div>

             {/* Bill Details */}
             <div className="border-t border-dashed border-gray-200 pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-600">
                   <span>Item Total</span>
                   <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span className="flex items-center gap-1">Delivery Fee <span className="bg-gray-100 text-[10px] px-1 rounded">2.5km</span></span>
                   <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>Platform Fee</span>
                   <span>{formatPrice(platformFee)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>GST (5%)</span>
                   <span>{formatPrice(gst)}</span>
                </div>
             </div>

             <div className="border-t-2 border-gray-100 mt-4 pt-4 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">TO PAY</span>
                <span className="font-black text-xl text-gray-900">{formatPrice(grandTotal)}</span>
             </div>

             {/* Desktop Place Order Button */}
             <button 
               onClick={handlePlaceOrder}
               disabled={isProcessing || !currentAddress}
               className="w-full mt-6 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-black hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed hidden md:flex items-center justify-center gap-2 group"
             >
               {isProcessing ? (
                 <>Processing...</>
               ) : (
                 <>Place Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
               )}
             </button>
          </div>
        </div>

        {/* Mobile Sticky Footer Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 md:hidden z-30 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            <button 
               onClick={handlePlaceOrder}
               disabled={isProcessing || !currentAddress}
               className="w-full py-3.5 bg-brand text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-between px-6 active:scale-95 transition-transform disabled:bg-gray-300"
            >
               <span className="flex flex-col items-start leading-none">
                   <span className="text-[10px] font-medium opacity-80 uppercase">Total</span>
                   <span>{formatPrice(grandTotal)}</span>
               </span>
               <span className="flex items-center gap-2">
                   {isProcessing ? "Processing" : "Place Order"} <ChevronRight size={20} />
               </span>
            </button>
        </div>

      </main>

      {/* Address Modal */}
      <AddressModal isOpen={showAddressModal} onClose={() => setShowAddressModal(false)} />
    </div>
  );
}