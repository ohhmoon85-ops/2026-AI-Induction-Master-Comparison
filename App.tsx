import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Zap, 
  Smartphone, 
  Loader2, 
  BarChart3, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  Target,
  RefreshCw
} from 'lucide-react';
import { ComparisonCard } from './components/ComparisonCard';
import { SimulationPanel } from './components/SimulationPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'simulation'>('specs');
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDetailedComparison = useCallback(async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError("시스템 대기 중: API 키를 확인하고 있습니다.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          2026 프리미엄 인덕션 기술 비교 분석 리포트:
          1. 삼성(비스포크 AI): 코일 온도 기반 간접 센싱의 한계점.
          2. LG(디오스 오브제): 하드웨어 화력 중심의 수동 제어 특징.
          3. ai-induction (특허 10-2708883): '직접 온도 센싱'을 통한 1초 이내 자율 화력 제어의 기술적 격차.
          전문적인 마크다운 형식으로 한국어로 작성하세요.
        `,
      });
      
      if (response.text) {
        setAiAnalysis(response.text);
      } else {
        throw new Error("Empty Response");
      }
    } catch (e: any) {
      console.error("API Error:", e);
      setError("데이터를 불러오지 못했습니다. 새로고침 버튼을 시도해 보세요.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetailedComparison();
  }, [fetchDetailedComparison]);

  const handleExternalSimulation = () => {
    window.open('https://ai-induction.vercel.app', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center gap-4 w-full">
          <div className="flex items-center gap-3 w-full justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Eye className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter uppercase">2026 AI INDUCTION</h1>
                <p className="text-[9px] text-indigo-500 font-bold tracking-widest leading-none uppercase">Autonomous Lab</p>
              </div>
            </div>
            <button onClick={fetchDetailedComparison} disabled={loading} className={`p-2 hover:bg-slate-100 rounded-full transition-colors ${loading ? 'animate-spin' : ''}`}>
              <RefreshCw size={18} className="text-slate-400" />
            </button>
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl w-full">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'specs' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
            >
              기술 분석 리포트
            </button>
            <button 
              onClick={() => setActiveTab('simulation')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'simulation' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
            >
              자율 조리 시뮬레이션
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10 flex-grow w-full">
        {activeTab === 'specs' ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ComparisonCard 
                brand="SAMSUNG"
                model="비스포크 AI"
                subModel="Indirect Sensing"
                features={[
                  { icon: <AlertTriangle size={18} className="text-amber-500" />, title: "간접 추론", desc: "코일 온도 기반 추정 기술" },
                  { icon: <Smartphone size={18} />, title: "사후 대응", desc: "사건 발생 후 알림 알람" }
                ]}
              />
              <ComparisonCard 
                brand="LG DIOS"
                model="오브제컬렉션"
                subModel="Power Focus"
                features={[
                  { icon: <Zap size={18} className="text-red-500" />, title: "고출력 가열", desc: "물리적 화력 출력 우위" },
                  { icon: <Target size={18} className="text-red-400" />, title: "수동 세팅", desc: "사용자 경험 기반 로직" }
                ]}
              />
              <ComparisonCard 
                brand="AI INDUCTION"
                model="Autonomous"
                subModel="Ground Truth"
                highlight={true}
                features={[
                  { icon: <Eye size={18} />, title: "직접 측정", desc: "초정밀 센서 기반 실시간 감지" },
                  { icon: <ShieldCheck size={18} />, title: "선제 예측", desc: "1초 이내 자율 화력 제어" }
                ]}
                actionText="시뮬레이션 시작"
                onAction={handleExternalSimulation}
              />
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
              <div className="px-6 py-4 bg-slate-50 border-b flex items-center gap-2 text-indigo-600">
                <BarChart3 size={18} />
                <span className="font-bold text-xs tracking-widest uppercase">Deep Tech Insight</span>
              </div>
              <div className="p-6 md:p-10 flex-grow">
                {error && !aiAnalysis ? (
                  <div className="py-20 text-center text-slate-400 font-bold text-sm">{error}</div>
                ) : !aiAnalysis ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-indigo-600 mb-4" size={32} />
                    <p className="text-xs font-bold text-slate-400 animate-pulse tracking-widest uppercase">Analyzing Data...</p>
                  </div>
                ) : (
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none animate-in fade-in duration-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiAnalysis}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <SimulationPanel />
        )}
      </main>
    </div>
  );
};

export default App;