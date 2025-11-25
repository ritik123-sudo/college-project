import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto mt-20 text-center">
      <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
        Manage your business with <span className="text-blue-600">Superpowers</span>
      </h1>
      <p className="text-xl text-slate-600 mb-10">
        BizGenius AI brings Enterprise-level Analytics, Forecasting, and Automation 
        to your small business.
      </p>
      
      <div className="flex justify-center gap-4">
        <Link 
          href="/dashboard" 
          className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          Launch Dashboard <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
}