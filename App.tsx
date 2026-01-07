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
      setError("API 키를 로드하는 중입니다...");
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
          1. 삼성(비스포크 AI): 코일 온도 기반 간접 센싱의 원리와 한계.
          2. LG(디오스 오브제): 고화력 출력 중심의 하드웨어 제어.
          3. ai-induction(특허 10-2708883): 직접 온도 측정(Ground Truth) 기반의 1초 이내 자율 제어 기술력.
          한국어로 전문적으로 작성해주세요.
        `,
      });
      
      if (response.text) {
        setAiAnalysis(response.text);
      } else {
        throw new Error("분석 데이터가 비어 있습니다.");
      }
    } catch (e: any) {
      console.error("Gemini API Error:", e);
      setError("데이터를 불러오지 못했습니다. 새로고침 버튼을 눌러주세요.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDetailedComparison();
  }, [fetchDetailedComparison]);

  const handleStartSimulation = () => {
    // 외부 URL로 연결
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
            {loading ? <Loader2 className="animate-spin text-indigo-500 w-5 h-5" /> : (
              <button onClick={fetchDetailedComparison} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <RefreshCw size={18} />
              </button>
            )}
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
                  { icon: <AlertTriangle size={18} className="text-amber-500" />, title: "간접 추론", desc: "코일 온도 기반 추정" },
                  { icon: <Smartphone size={18} />, title: "앱 연동", desc: "사후 알림 중심 제어" }
                ]}
              />
              <ComparisonCard 
                brand="LG DIOS"
                model="오브제컬렉션"
                subModel="Hardware Focused"
                features={[
                  { icon: <Zap size={18} className="text-red-500" />, title: "고출력 가열", desc: "강력한 물리 화력" },
                  { icon: <Target size={18} className="text-red-400" />, title: "수동 제어", desc: "사용자 세팅 알고리즘" }
                ]}
              />
              <ComparisonCard 
                brand="AI INDUCTION"
                model="Autonomous"
                subModel="GT Sensors"
                highlight={true}
                features={[
                  { icon: <Eye size={18} />, title: "직접 측정", desc: "1초 내 초정밀 온도 측정" },
                  { icon: <ShieldCheck size={18} />, title: "자율 조리", desc: "선제적 예측 및 자동 제어" }
                ]}
                actionText="시뮬레이션 시작"
                onAction={handleStartSimulation}
              />
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[400px]">
              <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-600">
                  <BarChart3 size={18} />
                  <span className="font-bold text-xs tracking-widest uppercase">Technology Analysis</span>
                </div>
              </div>
              
              <div className="p-6 md:p-10">
                {error ? (
                  <div className="py-20 text-center">
                    <p className="text-sm font-bold text-slate-400">{error}</p>
                  </div>
                ) : !aiAnalysis ? (
                  <div className="py-20 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-widest">Generating Insight...</p>
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