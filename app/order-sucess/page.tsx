import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl text-center max-w-md w-full">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
           <CheckCircle size={48} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">
           Your food is being prepared. <br/> Estimated delivery time: <span className="font-bold text-gray-900">35 mins</span>
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-8 text-left">
           <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Order ID</span>
              <span className="font-mono font-bold">#ORD-{Math.floor(Math.random() * 100000)}</span>
           </div>
           <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount Paid</span>
              <span className="font-bold text-green-600">Paid via Cash</span>
           </div>
        </div>

        <Link href="/" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all">
           <Home size={20} /> Back to Home
        </Link>
      </div>
    </div>
  );
}