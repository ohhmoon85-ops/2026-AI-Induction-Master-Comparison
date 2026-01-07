
import React from 'react';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ComparisonCardProps {
  brand: string;
  model: string;
  subModel: string;
  features: Feature[];
  actionText?: string;
  onAction?: () => void;
  highlight?: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  brand, model, subModel, features, actionText, onAction, highlight 
}) => {
  return (
    <div className={`flex flex-col bg-white rounded-3xl p-6 border-2 transition-all ${highlight ? 'border-indigo-600 shadow-xl shadow-indigo-100 ring-2 ring-indigo-50' : 'border-slate-100 hover:border-slate-300 shadow-sm'}`}>
      <div className="mb-5">
        <span className={`text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full ${highlight ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
          {brand}
        </span>
        <h2 className="text-xl font-black text-slate-900 mt-3 tracking-tighter">{model}</h2>
        <p className={`text-[9px] font-bold uppercase tracking-widest ${highlight ? 'text-indigo-500' : 'text-slate-400'}`}>{subModel}</p>
      </div>
      
      <div className="space-y-4 flex-grow">
        {features.map((f, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className={`p-2.5 rounded-xl ${highlight ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'} shrink-0`}>
              {f.icon}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs tracking-tight">{f.title}</h4>
              <p className="text-[10px] md:text-xs text-slate-500 mt-0.5 leading-snug">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {actionText && onAction ? (
        <button 
          onClick={onAction}
          className="mt-8 flex items-center justify-center w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs gap-2 hover:bg-indigo-700 transition-all shadow-md active:scale-95 border-b-4 border-indigo-800"
        >
          <ExternalLink size={16} />
          {actionText}
        </button>
      ) : (
        <div className="mt-8 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-[9px] font-black uppercase">
             <CheckCircle2 size={12} className="text-slate-300" />
             Legacy Tech
          </div>
        </div>
      )}
    </div>
  );
};
