
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Zap, 
  Smartphone, 
  Cpu, 
  Loader2, 
  BarChart3, 
  Users, 
  Eye, 
  ShieldCheck, 
  AlertTriangle, 
  Activity,
  Target
} from 'lucide-react';
import { ComparisonCard } from './components/ComparisonCard';
import { SimulationPanel } from './components/SimulationPanel';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'specs' | 'simulation'>('specs');
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const fetchDetailedComparison = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `
          2026년형 프리미엄 인덕션 시장의 3대 주자인 삼성, LG, 그리고 'ai-induction'을 비교 분석해줘.
          
          'ai-induction'은 등록특허 10-2708883 기반의 기술임을 명심하고 다음 내용을 리포트에 반드시 포함할 것:
          1. 핵심 센싱: 기존 '장님 AI(열원 중심 센싱)'와 대조되는 '직접 온도 측정(Ground Truth)' 기술.
          2. 제어 방식: 반응형(사후 대응)이 아닌 예측 및 적응형 제어(끓어넘침 예방).
          3. 정량적 지표: 온도 오차 1% 이내, 대응 속도 1초 이내, 조리 상태 인지 정확도 98% 이상.
          4. 독보적 편의성: 김치찌개/된장국 자동 조리 알고리즘 및 아침 예약 조리 기능.
          
          반드시 마크다운 표(Table)를 사용하여 기술적 우위를 가독성 있게 작성해줘.
        `,
        config: { tools: [{ googleSearch: {} }] }
      });
      setAiAnalysis(response.text || "데이터를 불러오는 데 실패했습니다.");
    } catch (error) {
      console.error(error);
      setAiAnalysis("AI 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDetailedComparison(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans tracking-tight text-gray-900 pb-20">
      <header className="bg-white/95 backdrop-blur-xl border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-indigo-200 shadow-xl">
              <Eye className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-indigo-600 tracking-tighter">
                2026 AI INDUCTION MASTER
              </h1>
              <p className="text-[10px] text-indigo-500 font-bold tracking-[0.25em] uppercase">The Autonomous Kitchen Paradigm</p>
            </div>
          </div>
          
          <nav className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'specs' ? 'bg-white shadow-lg text-indigo-600 ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
            >
              기술 비교 리포트
            </button>
            <button 
              onClick={() => setActiveTab('simulation')}
              className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === 'simulation' ? 'bg-white shadow-lg text-indigo-600 ring-1 ring-gray-200' : 'text-gray-500 hover:text-gray-900'}`}
            >
              자율 조리 시뮬레이션
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'specs' ? (
          <div className="space-y-16 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ComparisonCard 
                brand="SAMSUNG"
                model="비스포크 AI 인피니트"
                subModel="Indirect Sensing Model"
                features={[
                  { icon: <AlertTriangle className="text-amber-500" />, title: "장님 AI (Blind Sensing)", desc: "열원 코일 온도 기반 간접 추론으로 15% 이상 심각한 온도 오차 발생" },
                  { icon: <Smartphone />, title: "사후 대응 매커니즘", desc: "이미 넘친 후나 사고 발생 후에야 작동하는 수동적 제어" }
                ]}
              />
              <ComparisonCard 
                brand="LG ELECTRONICS"
                model="디오스 오브제컬렉션"
                subModel="Hardware Focused Model"
                features={[
                  { icon: <Zap className="text-red-500" />, title: "물리적 출력 집중", desc: "3.4kW 쿼드 인버터 등 단순 화력 증대 및 하드웨어 성능에 치중" },
                  { icon: <Target className="text-red-400" />, title: "정적 알고리즘", desc: "실시간 조리 환경 변화(식재료 상태)를 인지하지 못하는 한계" }
                ]}
              />
              <ComparisonCard 
                brand="ai-induction"
                model="Autonomous Master"
                subModel="Ground Truth Technology"
                highlight={true}
                features={[
                  { icon: <Eye />, title: "직접 온도 측정 (GT)", desc: "특허 기술 기반 오차 1% 미만으로 음식의 실제 온도를 완벽 감지" },
                  { icon: <ShieldCheck />, title: "예측형 선제 제어", desc: "1초 이내 지능형 대응으로 끓어넘침 및 화재를 원천 차단" }
                ]}
                actionText="작동 시뮬레이션"
                onAction={() => window.open('https://ai-induction.vercel.app', '_blank')}
              />
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-indigo-100/40 overflow-hidden border border-gray-100">
              <div className="p-10 bg-gradient-to-br from-indigo-50/50 via-white to-emerald-50/30 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                    <BarChart3 className="text-indigo-600 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">2026 초격차 기술 분석 리포트</h3>
                    <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">Patent Intelligence Analytics</p>
                  </div>
                </div>
                {loading && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Mining...</span>
                  </div>
                )}
              </div>
              
              <div className="p-12">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-40 space-y-8">
                    <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-gray-900 font-black text-xl">특허 기반 데이터 정밀 분석 중</p>
                  </div>
                ) : (
                  <div className="report-content prose prose-indigo max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {aiAnalysis || ""}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl">
                <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 bg-gray-100 text-gray-400 rounded-2xl">
                    <Users size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">전통적 가전의 한계</h4>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Indirect 추론 패러다임</p>
                  </div>
                </div>
                <p className="leading-relaxed text-lg font-medium text-gray-600 mb-8">
                  현재의 AI 인덕션은 <strong>'장님'</strong>에 가깝습니다. 용기가 아닌 열원 코일의 온도를 재서 내용을 추측합니다. 이는 15% 이상의 오차를 유발하며, 사고가 <strong>난 후에야</strong> 반응하는 구조적 결함을 가집니다.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                  <div className="text-center p-6 bg-gray-50 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">온도 오차</p>
                    <p className="text-2xl font-black text-gray-900">15% ~ 20%</p>
                  </div>
                  <div className="text-center p-6 bg-gray-50 rounded-3xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">대응 속도</p>
                    <p className="text-2xl font-black text-gray-900">5초 이상</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Eye className="w-40 h-40" />
                </div>
                <div className="flex items-center gap-5 mb-10 relative z-10">
                  <div className="p-4 bg-indigo-500 text-white rounded-2xl shadow-lg">
                    <Activity size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight">ai-induction의 혁신</h4>
                    <p className="text-sm text-indigo-300 font-bold uppercase tracking-wider">Ground Truth 패러다임</p>
                  </div>
                </div>
                <p className="leading-relaxed text-lg font-medium text-indigo-50/90 mb-8">
                  특허 기술로 인덕션에 <strong>'정확한 눈'</strong>을 달았습니다. 직접 접촉 센서로 <strong>음식의 실제 온도</strong>를 감지하며, Living Algorithm이 사고 징후를 예측하여 <strong>1초 이내</strong>에 선제적으로 제어합니다.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-indigo-800">
                  <div className="text-center p-6 bg-indigo-800/40 rounded-3xl backdrop-blur-md border border-indigo-700/50">
                    <p className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">온도 오차</p>
                    <p className="text-2xl font-black">1% 이내</p>
                  </div>
                  <div className="text-center p-6 bg-indigo-800/40 rounded-3xl backdrop-blur-md border border-indigo-700/50">
                    <p className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">대응 속도</p>
                    <p className="text-2xl font-black">1초 이내</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <SimulationPanel />
        )}
      </main>

      <footer className="bg-white border-t py-20 mt-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-12 mb-10 opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
            <div className="font-black text-2xl">SAMSUNG</div>
            <div className="font-black text-2xl">LG DIOS</div>
            <div className="font-black text-3xl italic text-indigo-600 tracking-tighter">ai-induction</div>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em]">Patent Technology Hub No. 10-2708883</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
