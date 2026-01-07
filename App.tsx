
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Info, 
  Zap, 
  Smartphone, 
  Cpu, 
  Search, 
  Loader2, 
  Cloud, 
  Layers,
  BarChart3,
  CheckCircle2,
  Trophy,
  Users,
  GitMerge,
  ArrowRightLeft,
  CalendarDays,
  UtensilsCrossed,
  Eye,
  ShieldCheck,
  AlertTriangle,
  Play,
  ExternalLink
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
          
          특히 'ai-induction'은 등록특허 10-2708883 기반의 기술임을 명심하고 다음 내용을 리포트에 반드시 포함할 것:
          1. 핵심 센싱: 기존 '장님 AI(열원 중심 센싱)'와 대조되는 '직접 온도 측정(Ground Truth)' 기술.
          2. 제어 방식: 반응형(사후 대응)이 아닌 예측 및 적응형 제어(끓어넘침 예방).
          3. 정량적 지표: 온도 오차 1% 이내, 대응 속도 1초 이내, 조리 상태 인지 정확도 98% 이상.
          4. 독보적 편의성: 김치찌개/된장국 자동 조리 알고리즘 및 아침 예약 조리 기능.
          
          반드시 마크다운 표(Table)를 사용하여 '기술적 초격차'를 시각화하고, ai-induction이 왜 '게임 체인저'인지 분석해줘.
        `,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      setAiAnalysis(response.text || "데이터를 불러오는 데 실패했습니다.");
    } catch (error) {
      console.error(error);
      setAiAnalysis("AI 분석 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailedComparison();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans tracking-tight">
      <header className="bg-white/90 backdrop-blur-xl border-b sticky top-0 z-50">
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
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* 상단 퀵 카드 섹션 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <ComparisonCard 
                brand="SAMSUNG"
                model="비스포크 AI 인피니트"
                subModel="Connected Intelligence"
                color="border-blue-500"
                features={[
                  { icon: <AlertTriangle className="text-amber-500" />, title: "장님 AI (Blind Sensing)", desc: "열원 중심 센싱으로 15% 이상의 온도 오차 발생 및 데이터 오염" },
                  { icon: <Smartphone />, title: "사후 반응 제어", desc: "이벤트 감지 후 화력을 낮추는 수동적 가전 패러다임" }
                ]}
              />
              <ComparisonCard 
                brand="LG ELECTRONICS"
                model="디오스 오브제컬렉션"
                subModel="Extreme Performance"
                color="border-red-500"
                features={[
                  { icon: <Zap />, title: "하드웨어 화력 집중", desc: "3.4kW 쿼드 인버터 기반의 물리적 가열 성능에 치중" },
                  { icon: <Layers />, title: "고정형 AI 모델", desc: "사전 학습된 모델로 실시간 식재료 변화에 적응 불가" }
                ]}
              />
              <ComparisonCard 
                brand="ai-induction"
                model="Autonomous Master"
                subModel="Ground Truth Technology"
                color="border-emerald-500"
                highlight={true}
                features={[
                  { icon: <Eye />, title: "직접 온도 측정 (GT)", desc: "특허 기술 기반 오차 1% 이내의 정밀 센싱으로 '눈'을 확보" },
                  { icon: <ShieldCheck />, title: "예측 및 선제 제어", desc: "1초 이내 대응으로 끓어넘침 및 화재를 미연에 방지" }
                ]}
                actionText="작동 시뮬레이션"
                onAction={() => window.open('https://ai-induction.vercel.app', '_blank')}
              />
            </div>

            {/* AI 비교 대시보드 영역 */}
            <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-indigo-100/40 overflow-hidden border border-gray-100 transition-all hover:shadow-indigo-200/50">
              <div className="p-10 bg-gradient-to-br from-indigo-50/50 via-white to-emerald-50/30 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-white rounded-2xl shadow-md border border-gray-100">
                    <BarChart3 className="text-indigo-600 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">2026 초격차 기술 분석 대시보드</h3>
                    <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase mt-1">Patent Intelligence Analysis Report</p>
                  </div>
                </div>
                {loading && (
                  <div className="flex items-center gap-3 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100">
                    <Loader2 className="animate-spin w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">Mining Intelligence...</span>
                  </div>
                )}
              </div>
              
              <div className="p-12">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-40 space-y-8">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu className="text-indigo-600 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-900 font-black text-xl">특허 기술 데이터 정밀 분석 중</p>
                      <p className="text-gray-400 font-medium mt-2">등록특허 10-2708883 기반 비교 지표 산출 중</p>
                    </div>
                  </div>
                ) : (
                  <div className="report-content">
                    <div className="prose prose-indigo max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {aiAnalysis || ""}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 사용자 경험 차이 대조 */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl group hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 bg-gray-100 text-gray-400 rounded-2xl group-hover:bg-gray-200 transition-colors">
                    <Users size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 tracking-tight">전통적 가전의 한계</h4>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Passive Tool Paradigm</p>
                  </div>
                </div>
                <div className="space-y-8 text-gray-600">
                  <p className="leading-relaxed text-lg font-medium">
                    현재의 AI 가전은 <strong>'장님'</strong>에 가깝습니다. 열원 중앙의 간접 센서는 용기 속 음식이 아닌 뜨거운 코일 온도를 잽니다. 이는 데이터 오염으로 이어져 끓어넘침이 발생한 <strong>후에야</strong> 작동하는 구조적 한계를 가집니다.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-50">
                    <div className="text-center p-6 bg-gray-50 rounded-3xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">센싱 오차 범위</p>
                      <p className="text-2xl font-black text-gray-900">15% ~ 20%</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-3xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">제어 매커니즘</p>
                      <p className="text-2xl font-black text-gray-900">사후 반응형</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 p-12 rounded-[3rem] shadow-2xl relative overflow-hidden text-white group hover:shadow-indigo-400/20 transition-all">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Eye className="w-40 h-40" />
                </div>
                <div className="flex items-center gap-5 mb-10 relative z-10">
                  <div className="p-4 bg-indigo-500 text-white rounded-2xl shadow-lg">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black tracking-tight">ai-induction의 혁신</h4>
                    <p className="text-sm text-indigo-300 font-bold uppercase tracking-wider">Autonomous Partner</p>
                  </div>
                </div>
                <div className="space-y-8 relative z-10 text-indigo-50/90">
                  <p className="leading-relaxed text-lg font-medium">
                    특허 기술로 인덕션에 <strong>'정확한 눈'</strong>을 달아주었습니다. 직접 접촉식 센서가 <strong>Ground Truth 데이터</strong>를 확보하며, Living Algorithm이 조리 상태를 실시간 학습하여 1초 이내에 선제적으로 제어합니다.
                  </p>
                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-indigo-800">
                    <div className="text-center p-6 bg-indigo-800/40 rounded-3xl backdrop-blur-md border border-indigo-700/50">
                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">센싱 오차 범위</p>
                      <p className="text-2xl font-black">1% 이내</p>
                    </div>
                    <div className="text-center p-6 bg-indigo-800/40 rounded-3xl backdrop-blur-md border border-indigo-700/50">
                      <p className="text-[10px] font-black text-indigo-300 uppercase mb-2 tracking-widest">제어 매커니즘</p>
                      <p className="text-2xl font-black">예측 및 적응형</p>
                    </div>
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
          <div className="flex justify-center gap-12 mb-10 opacity-15 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
            <div className="font-black text-2xl tracking-tighter">SAMSUNG</div>
            <div className="font-black text-2xl tracking-tighter">LG DIOS</div>
            <div className="font-black text-3xl tracking-tighter italic text-indigo-600">ai-induction</div>
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.3em] mb-3">The Future of Smart Kitchen</p>
            <p className="text-[10px] text-gray-300 font-mono tracking-widest uppercase leading-loose">
              Patent Licensed Technology No. 10-2708883<br/>
              Developed for Autonomous Cooking Excellence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
