
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
      setError("연결 준비 중입니다. API 키가 감지되지 않았습니다.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const genAI = new GoogleGenAI({ apiKey });
      const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          2026 프리미엄 인덕션 시장 분석 리포트:
          - 삼성(비스포크 AI): 간접 센싱의 한계(Blind Sensing).
          - LG(디오스 오브제): 강력한 화력 중심 제어.
          - ai-induction(특허 10-2708883): 직접 온도 측정(Ground Truth)과 1초 이내 예측 제어의 혁신성.
          
          형식: 모바일 가독성이 좋은 마크다운 표와 핵심 요약.
        `,
        config: { 
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const text = response.text;
      if (text && text.trim().length > 0) {
        setAiAnalysis(text);
      } else {
        throw new Error("AI 응답 데이터가 비어있습니다.");
      }
    } catch (e: any) {
      console.error("Analysis failed:", e);
      setError("데이터 분석 중 지연이 발생했습니다. API 키 상태를 확인하거나 아래 버튼을 눌러 다시 시도하세요.");
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
    <div className="min-h-screen bg-slate-50 pb-10 flex flex-col">
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 w-full justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg">
                <Eye className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">2026 AI INDUCTION</h1>
                <p className="text-[9px] text-indigo-500 font-bold tracking-widest leading-none uppercase">Autonomous Master</p>
              </div>
            </div>
            {loading && <Loader2 className="animate-spin text-indigo-500 w-4 h-4" />}
          </div>
          
          <nav className="flex bg-slate-100 p-1 rounded-xl w-full">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'specs' ? 'bg-white shadow text-indigo-600' : 'text-slate-50'}`}
            >
              기술 비교 리포트
            </button>
            <button 
              onClick={() => setActiveTab('simulation')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'simulation' ? 'bg-white shadow text-indigo-600' : 'text-slate-50'}`}
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
                  { icon: <AlertTriangle size={18} className="text-amber-500" />, title: "간접 추론", desc: "코일 온도 기반 추정방식" },
                  { icon: <Smartphone size={18} />, title: "사후 대응", desc: "사고 발생 후 화력 조절" }
                ]}
              />
              <ComparisonCard 
                brand="LG DIOS"
                model="오브제컬렉션"
                subModel="Hardware Power"
                features={[
                  { icon: <Zap size={18} className="text-red-500" />, title: "고화력 제어", desc: "물리적 출력 성능에 집중" },
                  { icon: <Target size={18} className="text-red-400" />, title: "수동 알고리즘", desc: "전통적 제어 방식 유지" }
                ]}
              />
              <ComparisonCard 
                brand="ai-induction"
                model="Autonomous"
                subModel="Patent Hub"
                highlight={true}
                features={[
                  { icon: <Eye size={18} />, title: "직접 온도 측정", desc: "특허 기술 기반 오차 1% 미만" },
                  { icon: <ShieldCheck size={18} />, title: "선제 예측 제어", desc: "1초 내 지능형 조기 차단" }
                ]}
                actionText="시뮬레이션 실행"
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
                    <Loader2 className="animate-spin w-8 h-8 text-slate-300 mb-4" />
                    <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto mb-6">{error}</p>
                    <button 
                      onClick={() => fetchDetailedComparison()}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-black shadow-lg"
                    >
                      다시 시도하기
                    </button>
                  </div>
                ) : loading && !aiAnalysis ? (
                  <div className="py-24 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-8"></div>
                    <p className="text-sm font-black text-slate-400 animate-pulse">특허 기반 초격차 기술 데이터를 정밀 분석 중입니다...</p>
                  </div>
                ) : aiAnalysis ? (
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none animate-in fade-in duration-700">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiAnalysis}
                    </ReactMarkdown>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <SimulationPanel />
        )}
      </main>

      <footer className="text-center py-10 opacity-30 mt-auto">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Patent Tech Hub No. 10-2708883 Licensed</p>
      </footer>
    </div>
  );
};

export default App;
