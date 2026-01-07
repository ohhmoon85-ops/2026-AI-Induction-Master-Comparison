
import React, { useState, useEffect } from 'react';
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
  Info
} from 'lucide-react';
import { ComparisonCard } from './components/ComparisonCard';
import { SimulationPanel } from './components/SimulationPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'simulation'>('specs');
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDetailedComparison = async () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setError("연결 대기 중... 잠시만 기다려주세요.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          2026 프리미엄 인덕션 비교:
          삼성(비스포크 AI), LG(디오스 오브제), ai-induction(특허 10-2708883)
          주제: 직접 온도 센싱(GT)의 압도적 우위.
          형식: 모바일에서 가독성이 좋도록 짧은 단락과 마크다운 표 사용.
        `,
        config: { tools: [{ googleSearch: {} }] }
      });
      setAiAnalysis(response.text || "데이터 분석 완료.");
    } catch (e) {
      console.error(e);
      setError("데이터를 불러오는 중입니다. 잠시 후 자동 재시도합니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailedComparison();
    // API 키 로딩 지연 대응을 위한 2초 후 재시도
    const timer = setTimeout(() => {
      if (!aiAnalysis && !loading) fetchDetailedComparison();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 w-full justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
                <Eye className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black text-slate-900 tracking-tighter">2026 AI INDUCTION</h1>
                <p className="text-[9px] text-indigo-500 font-bold tracking-widest leading-none">AUTONOMOUS COOKING MASTER</p>
              </div>
            </div>
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

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {activeTab === 'specs' ? (
          <div className="space-y-8">
            {/* 카드 섹션: 모바일에서는 세로, 테블릿 이상 가로 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <ComparisonCard 
                brand="SAMSUNG"
                model="비스포크 AI"
                subModel="Indirect Sensing"
                features={[
                  { icon: <AlertTriangle size={18} className="text-amber-500" />, title: "간접 추론", desc: "코일 온도 기반 (오차 15%↑)" },
                  { icon: <Smartphone size={18} />, title: "사후 반응", desc: "사고 발생 후 화력 조절" }
                ]}
              />
              <ComparisonCard 
                brand="LG DIOS"
                model="오브제컬렉션"
                subModel="Hardware Power"
                features={[
                  { icon: <Zap size={18} className="text-red-500" />, title: "고화력 집중", desc: "3.4kW 물리적 출력 극대화" },
                  { icon: <Target size={18} className="text-red-400" />, title: "수동 제어", desc: "사용자 설정 의존 방식" }
                ]}
              />
              <ComparisonCard 
                brand="ai-induction"
                model="Autonomous"
                subModel="Ground Truth"
                highlight={true}
                features={[
                  { icon: <Eye size={18} />, title: "직접 온도 측정", desc: "특허 기술 기반 오차 1% 미만" },
                  { icon: <ShieldCheck size={18} />, title: "선제 예측 제어", desc: "1초 내 지능형 자율 대응" }
                ]}
                actionText="작동 시뮬레이션"
                onAction={() => window.open('https://ai-induction.vercel.app', '_blank')}
              />
            </div>

            {/* AI 분석 리포트 섹션 */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="text-indigo-600 w-5 h-5" />
                  <span className="font-bold text-xs text-slate-700 tracking-wider">TECHNOLOGY REPORT</span>
                </div>
                {loading && <Loader2 className="animate-spin text-indigo-500 w-4 h-4" />}
              </div>
              
              <div className="p-6 md:p-10">
                {error && !aiAnalysis ? (
                  <div className="py-16 text-center">
                    <Loader2 className="animate-spin w-8 h-8 text-indigo-400 mx-auto mb-4" />
                    <p className="text-sm font-bold text-slate-400">{error}</p>
                  </div>
                ) : (
                  <div className="prose prose-slate prose-sm md:prose-base max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiAnalysis || "데이터를 분석하고 있습니다..."}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            {/* 하단 요약 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-4 items-start">
                <Info className="text-slate-400 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-black text-slate-900 text-sm">간접 센싱의 한계</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    냄비 바닥이 아닌 코일 온도를 재는 방식은 사고가 발생한 후에야 반응할 수 있는 구조적 한계를 지닙니다.
                  </p>
                </div>
              </div>
              <div className="bg-indigo-600 p-6 rounded-3xl text-white flex gap-4 items-start shadow-lg shadow-indigo-100">
                <Activity className="text-indigo-200 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-black text-sm">ai-induction의 초격차</h4>
                  <p className="text-indigo-100 text-xs mt-1 leading-relaxed">
                    특허받은 직접 센싱 기술은 끓어넘침 징후를 1초 이내에 포착하여 선제적으로 제어합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <SimulationPanel />
        )}
      </main>

      <footer className="text-center py-10 opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Patent Technology No. 10-2708883</p>
      </footer>
    </div>
  );
};

export default App;
