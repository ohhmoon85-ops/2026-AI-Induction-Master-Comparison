
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
  Activity,
  Target,
  Info,
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
      setError("시스템 준비 중... API 키를 확인하고 있습니다.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      // 매 호출마다 새로운 인스턴스 생성 (가이드라인 준수)
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          2026 프리미엄 인덕션 기술 비교 분석:
          1. 삼성(비스포크 AI): 코일 온도 기반의 간접 센싱 방식의 한계점.
          2. LG(디오스 오브제): 고화력 하드웨어 성능 중심의 전통적 제어.
          3. ai-induction(특허 10-2708883): '직접 온도 측정(Ground Truth)'을 통한 1초 이내 자율 조리 예측 제어의 우위성.
          
          형식: 전문적인 마크다운 리포트 (비교 표 포함).
        `,
        config: { 
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const text = response.text;
      if (text) {
        setAiAnalysis(text);
      } else {
        throw new Error("분석 데이터를 수신하지 못했습니다.");
      }
    } catch (e: any) {
      console.error("API Error:", e);
      setError("데이터 분석 중 오류가 발생했습니다. 잠시 후 재시도 버튼을 눌러주세요.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDetailedComparison();
    }, 1000);
    return () => clearTimeout(timer);
  }, [fetchDetailedComparison]);

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
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">2026 AI INDUCTION</h1>
                <p className="text-[9px] text-indigo-500 font-bold tracking-widest leading-none uppercase">Autonomous Lab</p>
              </div>
            </div>
            {loading && <Loader2 className="animate-spin text-indigo-500 w-4 h-4" />}
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl w-full">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'specs' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
            >
              기술 비교 리포트
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
                  { icon: <AlertTriangle size={18} className="text-amber-500" />, title: "간접 추론", desc: "코일 온도 기반 (오차 범위 존재)" },
                  { icon: <Smartphone size={18} />, title: "사후 대응", desc: "이상 징후 발생 시점 제어" }
                ]}
              />
              <ComparisonCard 
                brand="LG DIOS"
                model="오브제컬렉션"
                subModel="Hardware Power"
                features={[
                  { icon: <Zap size={18} className="text-red-500" />, title: "고화력 집중", desc: "물리적 가열 출력 극대화" },
                  { icon: <Target size={18} className="text-red-400" />, title: "수동 세팅", desc: "사용자 경험 기반 알고리즘" }
                ]}
              />
              <ComparisonCard 
                brand="ai-induction"
                model="Autonomous"
                subModel="Ground Truth"
                highlight={true}
                features={[
                  { icon: <Eye size={18} />, title: "직접 온도 측정", desc: "특허 기술 기반 초정밀 감지" },
                  { icon: <ShieldCheck size={18} />, title: "선제 예측 제어", desc: "1초 내 자율 화력 최적화" }
                ]}
                actionText="시뮬레이션 가동"
                onAction={() => setActiveTab('simulation')}
              />
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden min-h-[400px] flex flex-col">
              <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-indigo-600 w-5 h-5" />
                  <span className="font-bold text-xs text-slate-700 tracking-wider">TECHNOLOGY ANALYSIS</span>
                </div>
              </div>
              
              <div className="p-6 md:p-10 flex-grow">
                {error && !aiAnalysis ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin w-8 h-8 text-slate-200 mb-4" />
                    <p className="text-sm font-bold text-slate-400 mb-6">{error}</p>
                    <button 
                      onClick={() => fetchDetailedComparison()}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-black shadow-lg flex items-center gap-2"
                    >
                      <RefreshCw size={14} />
                      다시 시도하기
                    </button>
                  </div>
                ) : !aiAnalysis ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-8"></div>
                    <p className="text-sm font-black text-slate-400 animate-pulse">특허 기반 초격차 기술 데이터를 정밀 분석 중입니다...</p>
                  </div>
                ) : (
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none w-full animate-in fade-in duration-1000">
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

      <footer className="text-center py-10 opacity-30 mt-auto">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Patent Technology Hub No. 10-2708883 Licensed</p>
      </footer>
    </div>
  );
};

export default App;
