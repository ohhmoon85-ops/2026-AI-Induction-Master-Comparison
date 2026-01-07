
import React from 'react';
import { ChevronRight, ExternalLink, Play, CheckCircle2 } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface ComparisonCardProps {
  brand: string;
  model: string;
  subModel: string;
  color: string;
  features: Feature[];
  actionText?: string;
  onAction?: () => void;
  highlight?: boolean;
}

export const ComparisonCard: React.FC<ComparisonCardProps> = ({ 
  brand, model, subModel, color, features, actionText, onAction, highlight 
}) => {
  return (
    <div className={`flex flex-col bg-white rounded-[2.5rem] p-10 border-2 transition-all duration-500 shadow-xl hover:shadow-2xl hover:-translate-y-1 ${highlight ? 'border-indigo-600 ring-8 ring-indigo-50' : 'border-gray-100'}`}>
      <div className="mb-10">
        <span className={`text-[10px] font-black tracking-[0.25em] uppercase px-4 py-1.5 rounded-full ${highlight ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-gray-100 text-gray-500'}`}>
          {brand}
        </span>
        <h2 className="text-3xl font-black text-gray-900 mt-5 tracking-tighter leading-none">{model}</h2>
        <p className={`text-xs font-bold mt-2 uppercase tracking-widest ${highlight ? 'text-indigo-400' : 'text-gray-400'}`}>{subModel}</p>
      </div>
      
      <div className="space-y-10 flex-grow">
        {features.map((f, idx) => (
          <div key={idx} className="flex gap-5 items-start group">
            <div className={`p-4 rounded-2xl transition-colors duration-300 ${highlight ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'} shrink-0 shadow-sm`}>
              {f.icon}
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-base tracking-tight">{f.title}</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-medium">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {actionText && onAction ? (
        <button 
          onClick={onAction}
          className="mt-12 flex items-center justify-center w-full py-5 bg-indigo-600 text-white rounded-[1.75rem] font-black gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 transform active:scale-[0.98]"
        >
          <ExternalLink size={20} className="text-indigo-200" />
          {actionText}
        </button>
      ) : (
        <div className="mt-12 p-6 bg-gray-50 rounded-[1.75rem] border border-gray-100/50">
          <p className="text-[10px] text-gray-400 font-black uppercase text-center mb-2 tracking-widest">Core Philosophy</p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-bold">
             <CheckCircle2 size={14} className="text-gray-300" />
             전통적 가열 도구 지향
          </div>
        </div>
      )}
    </div>
  );
};
