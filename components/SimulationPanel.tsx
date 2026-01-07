
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Flame, 
  Loader2, 
  ShieldCheck, 
  Sparkles, 
  Utensils, 
  CheckCircle2, 
  Waves, 
  Zap,
  Activity,
  Cpu,
  Fish,
  ShieldAlert,
  Settings,
  BarChart3,
  Coffee,
  CalendarCheck,
  Eye,
  Microscope
} from 'lucide-react';

interface CookState {
  progress: number;
  status: string;
  temp: number;
  action: string;
  intensity: number; // 0 to 100
}

export const SimulationPanel: React.FC = () => {
  const [cookingTask, setCookingTask] = useState<'stew' | 'steak' | 'fish' | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isProcessingReport, setIsProcessingReport] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [samsungState, setSamsungState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });
  const [lgState, setLgState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });
  const [vercelState, setVercelState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });

  const resetStates = () => {
    const defaultState = { progress: 0, status: '준비 중', temp: 20, action: '시스템 체크', intensity: 0 };
    setSamsungState(defaultState);
    setLgState(defaultState);
    setVercelState(defaultState);
    setResult(null);
  };

  const startSimulation = (task: 'stew' | 'steak' | 'fish') => {
    setCookingTask(task);
    setIsSimulating(true);
    resetStates();

    setTimeout(() => {
      setSamsungState({ progress: 20, status: '예열', temp: 50, action: '이벤트 감지 모드 대기', intensity: 40 });
      setLgState({ progress: 25, status: '고화력 가동', temp: 70, action: '전력 집중 모드', intensity: 90 });
      setVercelState({ progress: 15, status: '데이터 동기화', temp: 30, action: '직접 온도 센서 영점 조정', intensity: 30 });
    }, 1500);

    setTimeout(() => {
      if (task === 'stew') {
        setSamsungState({ progress: 60, status: '끓음 발생', temp: 98, action: '넘침 확인 후 화력 차단(반응형)', intensity: 30 });
        setLgState({ progress: 70, status: '연속 가열', temp: 100, action: '고화력 유지로 진한 국물 구현', intensity: 70 });
        setVercelState({ progress: 75, status: '자율 조리', temp: 99, action: '끓어넘침 임박 예측(0.9s 대응)', intensity: 50 });
      } else if (task === 'steak') {
        setSamsungState({ progress: 75, status: '온도 유지', temp: 215, action: '간접 추론 방식으로 화력 보정', intensity: 80 });
        setLgState({ progress: 80, status: '초고온 시어링', temp: 245, action: '열 손실 복원 속도 가속화', intensity: 100 });
        setVercelState({ progress: 85, status: '적응형 제어', temp: 235, action: 'Living Algorithm 실시간 학습 중', intensity: 90 });
      } else if (task === 'fish') {
        setSamsungState({ progress: 65, status: '유온 감지', temp: 175, action: '기름 튐 주의 알림 발송', intensity: 60 });
        setLgState({ progress: 80, status: '균일 가열', temp: 185, action: '바닥면 전체 균일 열전달', intensity: 85 });
        setVercelState({ progress: 82, status: '정밀 프라이', temp: 181, action: 'Ground Truth 유온 실시간 보정', intensity: 75 });
      }
    }, 4500);

    setTimeout(() => {
      const finish = (brand: string) => ({ progress: 100, status: '조리 완료', temp: 20, action: `${brand} 프로세스 종료`, intensity: 0 });
      setSamsungState(finish('Samsung'));
      setLgState(finish('LG'));
      setVercelState(finish('ai-induction'));
      setIsSimulating(false);
      fetchReport(task);
    }, 8500);
  };

  const fetchReport = async (task: 'stew' | 'steak' | 'fish') => {
    setIsProcessingReport(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const taskName = task === 'stew' ? '김치찌개/된장국 자율 조리' : task === 'steak' ? '스테이크' : '생선 튀김';
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `
          2026년형 삼성, LG, ai-induction의 '${taskName}' 조리 시뮬레이션 기술 분석 리포트를 작성해줘.
          
          'ai-induction'은 등록특허 10-2708883 기반의 '직접 온도 센싱' 기술이 탑재된 모델로 분석할 것:
          1. [핵심 기술 대조표]: 센싱 오차(1% vs 15%), 대응 속도(1초 내 vs 5초 이상), 제어 방식(예측 vs 반응).
          2. [K-푸드 지능]: 김치찌개/된장국 조리 시 Living Algorithm이 어떻게 식재료를 인지하고 자율 조리를 완결하는지.
          3. [아침 가사 혁신]: 예약 조리 기능을 통해 기존 인덕션이 넘지 못한 '무인 조리' 영역을 어떻게 개척했는지.
          4. 결론: ai-induction의 98% 정확도와 에너지 20% 절감 효과 강조.
        `,
      });
      setResult(response.text || "");
    } catch (e) {
      setResult("보고서 생성 중 오류가 발생했습니다.");
    } finally {
      setIsProcessingReport(false);
    }
  };

  const VirtualBurner = ({ state, brand, colorClass, icon: Icon }: { state: CookState, brand: string, colorClass: string, icon: any }) => (
    <div className="flex-1 flex flex-col items-center bg-gray-950 p-6 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl relative overflow-hidden">
      <div 
        className={`absolute inset-0 opacity-20 transition-all duration-1000 ${colorClass}`}
        style={{ transform: `scale(${1 + state.intensity / 150})`, filter: `blur(${40 - state.intensity / 3}px)` }}
      ></div>
      <span className="text-[10px] font-black tracking-widest text-gray-500 mb-4 uppercase z-10">{brand}</span>
      <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
        <div className={`absolute inset-0 rounded-full border-2 border-gray-800 transition-all duration-700 ${state.intensity > 0 ? 'border-dashed animate-spin-slow border-gray-600' : ''}`}></div>
        <div 
          className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-1000 shadow-2xl z-10 ${state.intensity > 0 ? 'bg-gradient-to-br from-red-600 to-orange-400' : 'bg-gray-800'}`}
          style={{ boxShadow: state.intensity > 0 ? `0 0 ${state.intensity / 1.5}px ${state.intensity / 3}px rgba(239, 68, 68, 0.6)` : 'none' }}
        >
          {state.progress === 100 ? (
            <CheckCircle2 size={40} className="text-white animate-bounce" />
          ) : (
            <Icon size={40} className={`text-white ${state.intensity > 60 ? 'animate-pulse' : ''}`} />
          )}
        </div>
        <div className="absolute -bottom-2 bg-black/80 px-3 py-1 rounded-full border border-white/20 z-20">
          <span className="text-white font-mono font-bold text-xs">{state.temp > 20 ? state.temp : '--'}°C</span>
        </div>
      </div>
      <div className="w-full space-y-3 z-10 text-center">
        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-1000 ease-out ${colorClass}`} style={{ width: `${state.progress}%` }} />
        </div>
        <h5 className="text-white font-bold text-sm truncate">{state.status}</h5>
        <p className="text-[10px] text-gray-400 h-8 leading-tight italic">{state.action}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Microscope className="w-32 h-32 animate-spin-slow" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
          <div>
            <h3 className="text-3xl font-black text-gray-900 flex items-center gap-2">
              <Eye className="text-emerald-600" />
              Autonomous Simulation Lab
            </h3>
            <p className="text-gray-500 mt-2 font-medium">특허 10-2708883 기반의 실시간 예측 제어 알고리즘을 테스트합니다.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => startSimulation('stew')}
              disabled={isSimulating}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${cookingTask === 'stew' ? 'bg-orange-600 text-white shadow-lg shadow-orange-100' : 'bg-gray-100 text-gray-600 hover:bg-orange-50'}`}
            >
              <Utensils size={18} />
              찌개 자율 조리 (K-Food)
            </button>
            <button 
              onClick={() => startSimulation('steak')}
              disabled={isSimulating}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${cookingTask === 'steak' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-gray-100 text-gray-600 hover:bg-indigo-50'}`}
            >
              <Zap size={18} />
              스테이크 (Predictive Control)
            </button>
            <button 
              onClick={() => startSimulation('fish')}
              disabled={isSimulating}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${cookingTask === 'fish' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' : 'bg-gray-100 text-gray-600 hover:bg-emerald-50'}`}
            >
              <Fish size={18} />
              생선 튀김 (Ground Truth Fry)
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative z-10">
          <VirtualBurner state={samsungState} brand="SAMSUNG AI" colorClass="bg-blue-500" icon={ShieldCheck} />
          <VirtualBurner state={lgState} brand="LG DIOS" colorClass="bg-red-500" icon={Flame} />
          <VirtualBurner state={vercelState} brand="ai-induction" colorClass="bg-emerald-500" icon={CalendarCheck} />
        </div>

        {isSimulating && (
          <div className="mt-8 flex items-center justify-center gap-4 py-4 bg-gray-50 rounded-2xl border border-gray-200">
            <Loader2 className="animate-spin text-emerald-500" size={18} />
            <span className="text-sm font-bold text-gray-500 animate-pulse tracking-tight">Living Algorithm이 용기 특성과 조리 상태를 실시간 학습 중...</span>
          </div>
        )}
      </div>

      {isProcessingReport && (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
          <Activity className="w-16 h-16 animate-bounce text-emerald-500 mb-6" />
          <h4 className="text-xl font-black text-gray-900">특허 기술 기반 초정밀 분석 중</h4>
          <p className="text-gray-400 font-medium mt-2">대응 속도 및 인지 정확도 데이터를 산출하고 있습니다.</p>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-100 animate-in slide-in-from-bottom-10 duration-700 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-red-500 to-emerald-500"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                <BarChart3 size={32} />
              </div>
              <div>
                <h4 className="text-3xl font-black text-gray-900 tracking-tight">Technical Patent Report</h4>
                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-1">Ground Truth vs Indirect Sensing</p>
              </div>
            </div>
            <div className="flex gap-2">
                <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                    <p className="text-[10px] font-black text-emerald-400 uppercase">Response Time</p>
                    <p className="text-sm font-bold text-emerald-600 uppercase">&lt; 1.0s</p>
                </div>
                <div className="px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Accuracy</p>
                    <p className="text-sm font-bold text-gray-900 uppercase">98%+</p>
                </div>
            </div>
          </div>

          <div className="prose prose-indigo max-w-none text-gray-700 report-md-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result}
            </ReactMarkdown>
          </div>

          <div className="mt-16 flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 rounded-3xl border border-gray-100 gap-6">
            <div className="flex items-center gap-4">
                <Microscope className="text-indigo-500 w-8 h-8" />
                <div>
                    <p className="font-black text-gray-900">Measurable Excellence</p>
                    <p className="text-xs text-gray-500">이 시뮬레이션은 특허청 등록 기술인 '직접 온도 제어'의 성능을 숫자로 증명하는 과정입니다.</p>
                </div>
            </div>
            <button 
              onClick={() => setResult(null)} 
              className="px-6 py-3 bg-white border-2 border-gray-200 text-gray-400 rounded-xl text-sm font-black hover:bg-gray-100 hover:text-gray-600 transition-all shadow-sm"
            >
              시뮬레이션 데이터 폐기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
