
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Flame, 
  Loader2, 
  ShieldCheck, 
  Activity,
  BarChart3,
  Eye,
  Info
} from 'lucide-react';

interface CookState {
  progress: number;
  status: string;
  temp: number;
  action: string;
  intensity: number; 
}

export const SimulationPanel: React.FC = () => {
  const [cookingTask, setCookingTask] = useState<'stew' | 'steak' | 'fish' | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isProcessingReport, setIsProcessingReport] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const [samsungState, setSamsungState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });
  const [lgState, setLgState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });
  const [vercelState, setVercelState] = useState<CookState>({ progress: 0, status: '대기', temp: 20, action: '-', intensity: 0 });

  const fetchReport = useCallback(async (task: string) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      setResult("보고서 생성 실패: 시스템에서 API 키를 찾을 수 없습니다.");
      return;
    }

    setIsProcessingReport(true);
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          시뮬레이션 분석 리포트: '${task}' 조리 결과 비교.
          ai-induction(특허 10-2708883)의 '직접 온도 센싱' 기술이 삼성/LG의 간접 방식 대비 갖는 1초 이내 제어의 안전성을 숫자로 강조해줘.
          형식: 모바일 가독성이 좋은 마크다운 요약.
        `,
      });
      setResult(response.text || "분석 완료 데이터가 없습니다.");
    } catch (e) {
      console.error(e);
      setResult("보고서를 생성하는 도중 장애가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsProcessingReport(false);
    }
  }, []);

  const startSimulation = (task: 'stew' | 'steak' | 'fish') => {
    setCookingTask(task);
    setIsSimulating(true);
    setResult(null);
    
    const taskNames = { stew: '찌개 자율 조리', steak: '스테이크 시어링', fish: '생선 튀김' };

    // Reset states
    const reset = { progress: 0, status: '가동 중', temp: 20, action: '초기화', intensity: 20 };
    setSamsungState(reset);
    setLgState(reset);
    setVercelState(reset);

    setTimeout(() => {
      setSamsungState({ progress: 20, status: '예열', temp: 50, action: '간접 온도 추론 시작', intensity: 40 });
      setLgState({ progress: 25, status: '가동', temp: 70, action: '고화력 출력 집중', intensity: 90 });
      setVercelState({ progress: 15, status: '동기화', temp: 30, action: 'GT 센서 영점 조정', intensity: 30 });
    }, 1000);

    setTimeout(() => {
      setSamsungState({ progress: 60, status: '임계점 도달', temp: 98, action: '넘침 징후 사후 감지', intensity: 30 });
      setLgState({ progress: 70, status: '연속 가열', temp: 100, action: '온도 유지를 위한 강제 제어', intensity: 70 });
      setVercelState({ progress: 75, status: '자율 제어', temp: 99, action: '직접 센서로 넘침 선제 예측', intensity: 50 });
    }, 3000);

    setTimeout(() => {
      const finish = (brand: string) => ({ progress: 100, status: '완료', temp: 20, action: `${brand} 조리 종료`, intensity: 0 });
      setSamsungState(finish('Samsung'));
      setLgState(finish('LG'));
      setVercelState(finish('ai-induction'));
      setIsSimulating(false);
      fetchReport(taskNames[task]);
    }, 6000);
  };

  const VirtualBurner = ({ state, brand, colorClass, icon: Icon }: { state: CookState, brand: string, colorClass: string, icon: any }) => (
    <div className="flex-1 flex flex-col items-center bg-slate-900 p-5 rounded-[2rem] border border-slate-800 relative overflow-hidden min-w-[280px]">
      <div className={`absolute inset-0 opacity-10 transition-all duration-1000 ${colorClass}`} style={{ transform: `scale(${1 + state.intensity / 100})` }}></div>
      <span className="text-[9px] font-black tracking-widest text-slate-500 mb-3 uppercase z-10">{brand}</span>
      <div className="relative w-28 h-28 md:w-32 md:h-32 mb-4 flex items-center justify-center z-10">
        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-1000 shadow-2xl ${state.intensity > 0 ? 'bg-gradient-to-br from-red-600 to-orange-400' : 'bg-slate-800'}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="absolute -bottom-1 bg-black/80 px-2 py-0.5 rounded-full border border-white/10">
          <span className="text-white font-mono font-bold text-[9px]">{state.temp}°C</span>
        </div>
      </div>
      <div className="w-full space-y-2 z-10 text-center">
        <h5 className="text-white font-bold text-[11px] truncate">{state.status}</h5>
        <p className="text-[9px] text-slate-400 h-6 leading-tight italic">{state.action}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Eye className="text-emerald-600" />
              Autonomous Lab
            </h3>
            <p className="text-slate-500 text-xs mt-1">실시간 예측 제어 성능 시뮬레이션</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => startSimulation('stew')} disabled={isSimulating} className="flex-1 min-w-[100px] px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold hover:bg-slate-200 disabled:opacity-50">찌개</button>
            <button onClick={() => startSimulation('steak')} disabled={isSimulating} className="flex-1 min-w-[100px] px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold hover:bg-slate-200 disabled:opacity-50">스테이크</button>
            <button onClick={() => startSimulation('fish')} disabled={isSimulating} className="flex-1 min-w-[100px] px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold hover:bg-slate-200 disabled:opacity-50">튀김</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-2">
          <VirtualBurner state={samsungState} brand="SAMSUNG AI" colorClass="bg-blue-500" icon={Info} />
          <VirtualBurner state={lgState} brand="LG DIOS" colorClass="bg-red-500" icon={Flame} />
          <VirtualBurner state={vercelState} brand="ai-induction" colorClass="bg-emerald-500" icon={ShieldCheck} />
        </div>

        {isSimulating && (
          <div className="mt-6 flex items-center justify-center gap-2 py-2 bg-slate-50 rounded-xl">
            <Loader2 className="animate-spin text-emerald-500" size={14} />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Simulating...</span>
          </div>
        )}
      </div>

      {isProcessingReport && (
        <div className="py-16 bg-white rounded-3xl border border-slate-100 flex flex-col items-center animate-pulse">
          <Activity className="w-10 h-10 text-indigo-500 mb-4" />
          <h4 className="font-black text-slate-900 text-sm">특허 기반 분석 보고서 생성 중</h4>
        </div>
      )}

      {result && (
        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
             <BarChart3 className="text-indigo-600 w-5 h-5" />
             <h4 className="font-black text-lg">Simulation Result</h4>
          </div>
          <div className="prose prose-slate prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result}
            </ReactMarkdown>
          </div>
          <button 
            onClick={() => setResult(null)} 
            className="mt-8 w-full py-3 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
          >
            결과 닫기
          </button>
        </div>
      )}
    </div>
  );
};
