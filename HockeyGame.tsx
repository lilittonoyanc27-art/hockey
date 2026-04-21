import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  User, 
  ChevronRight, 
  RotateCcw, 
  Play, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flag
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Types ---

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: string;
  translation: string;
}

// --- Data ---

const HOCKEY_QUESTIONS: Question[] = [
  { id: 1, text: "¿___ vienes a mi casa?", options: ["Cuando", "Cuánto"], correct: "Cuando", translation: "Ե՞րբ ես գալիս իմ տուն:" },
  { id: 2, text: "¿___ dinero tienes?", options: ["Cuando", "Cuánto"], correct: "Cuánto", translation: "Որքա՞ն փող ունես:" },
  { id: 3, text: "¿___ años tienes?", options: ["Cuando", "Cuántos"], correct: "Cuántos", translation: "Քանի՞ տարեկան ես:" },
  { id: 4, text: "¿___ termina la clase?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ է ավարտվում դասը:" },
  { id: 5, text: "¿___ pan quieres?", options: ["Cuando", "Cuánto"], correct: "Cuánto", translation: "Որքա՞ն հաց ես ուզում:" },
  { id: 6, text: "¿___ personas hay aquí?", options: ["Cuando", "Cuántas"], correct: "Cuántas", translation: "Քանի՞ հոգի կա այստեղ:" },
  { id: 7, text: "¿___ es tu cumpleaños?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ է քո ծննդյան օրը:" },
  { id: 8, text: "¿___ cuesta este libro?", options: ["Cuando", "Cuánto"], correct: "Cuánto", translation: "Ինչքա՞ն արժե այս գիրքը:" },
  { id: 9, text: "¿___ libros has leído?", options: ["Cuándo", "Cuántos"], correct: "Cuántos", translation: "Քանի՞ գիրք ես կարդացել:" },
  { id: 10, text: "___ llueve, me quedo en casa.", options: ["Cuando", "Cuánto"], correct: "Cuando", translation: "Երբ անձրևում է, ես մնում եմ տանը:" },
  { id: 11, text: "¿___ vas de vacaciones?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ ես գնում արձակուրդ:" },
  { id: 12, text: "¿___ leche queda?", options: ["Cuándo", "Cuánta"], correct: "Cuánta", translation: "Որքա՞ն կաթ է մնացել:" },
  { id: 13, text: "¿___ amigos tienes?", options: ["Cuándo", "Cuántos"], correct: "Cuántos", translation: "Քանի՞ ընկեր ունես:" },
  { id: 14, text: "¿___ sale el tren?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ է մեկնում գնացքը:" },
  { id: 15, text: "¿___ manzanas quieres?", options: ["Cuándo", "Cuántas"], correct: "Cuántas", translation: "Քանի՞ խնձոր ես ուզում:" },
  { id: 16, text: "¿___ empieza la película?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ է սկսվում ֆիլմը:" },
  { id: 17, text: "No sé ___ tiempo tardaré.", options: ["cuando", "cuánto"], correct: "cuánto", translation: "Չգիտեմ որքան ժամանակ կտևի:" },
  { id: 18, text: "Ella vendrá ___ pueda.", options: ["cuando", "cuánto"], correct: "cuando", translation: "Նա կգա, երբ կարողանա:" },
  { id: 19, text: "¿___ agua bebes al día?", options: ["Cuándo", "Cuánta"], correct: "Cuánta", translation: "Որքա՞ն ջուր ես խմում օրական:" },
  { id: 20, text: "¿___ quieres comer?", options: ["Cuándo", "Cuánto"], correct: "Cuándo", translation: "Ե՞րբ ես ուզում ուտել:" },
];

// --- Components ---

const HockeyRink = ({ 
  isScoring, 
  isMissing, 
  onComplete 
}: { 
  isScoring: boolean, 
  isMissing: boolean,
  onComplete: () => void 
}) => {
  useEffect(() => {
    if (isScoring || isMissing) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isScoring, isMissing, onComplete]);

  return (
    <div className="relative w-full h-48 bg-blue-100 rounded-xl border-4 border-blue-300 overflow-hidden shadow-inner flex items-center justify-center">
      {/* Ice Markings */}
      <div className="absolute inset-x-0 h-1 bg-red-400 top-1/2 -translate-y-1/2 opacity-30" />
      <div className="absolute inset-y-0 w-1 bg-red-400 left-1/2 -translate-x-1/2 opacity-30" />
      <div className="absolute w-20 h-20 border-2 border-red-400 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      
      {/* Goal */}
      <div className="absolute right-4 w-4 bg-stone-800 h-24 rounded-sm flex flex-col justify-between p-1">
        <div className="h-1/3 bg-stone-300 w-full" />
        <div className="h-1/3 bg-stone-300 w-full" />
      </div>

      {/* Puck */}
      <motion.div 
        className="w-4 h-4 bg-stone-900 rounded-full absolute left-12"
        initial={{ x: 0, opacity: 1 }}
        animate={isScoring ? { 
          x: 400, 
          y: [0, -20, 20, -10, 0],
          transition: { duration: 1, ease: "easeOut" }
        } : isMissing ? {
          x: 300,
          y: -100,
          opacity: 0,
          transition: { duration: 1 }
        } : { x: 0 }}
      />

      {/* Goalkeeper */}
      <motion.div 
        className="absolute right-12 w-10 h-16 bg-red-500 rounded-lg flex flex-col items-center justify-center border-2 border-red-800"
        initial={{ y: 0 }}
        animate={isMissing ? { 
          y: [-40, 0, -40, 0],
          transition: { duration: 0.5, repeat: 2 } 
        } : { y: 0 }}
      >
        <div className="w-6 h-6 bg-stone-200 rounded-full mb-1" />
        <div className="text-[8px] text-white font-bold">GK</div>
      </motion.div>

      {/* Score Text Overlay */}
      <AnimatePresence>
        {isScoring && (
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1.5, rotate: 0 }}
            exit={{ scale: 0 }}
            className="absolute font-black text-rose-600 text-4xl italic z-20"
          >
            GOOOAL!!!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function HockeyGame() {
  const [view, setView] = useState<'intro' | 'play' | 'result'>('intro');
  const [player1, setPlayer1] = useState('Գոռ');
  const [player2, setPlayer2] = useState('Գայանե');
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [currentTurn, setCurrentTurn] = useState(0); // 0 to 19
  const [gameState, setGameState] = useState<'answering' | 'scoring' | 'missing'>('answering');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const isPlayer1Turn = currentTurn % 2 === 0;
  const currentPlayer = isPlayer1Turn ? player1 : player2;

  const handleStart = () => {
    setScores({ p1: 0, p2: 0 });
    setCurrentTurn(0);
    setView('play');
    setGameState('answering');
  };

  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    const correct = HOCKEY_QUESTIONS[currentTurn].correct;
    
    if (option === correct) {
      setGameState('scoring');
      if (isPlayer1Turn) setScores(s => ({ ...s, p1: s.p1 + 1 }));
      else setScores(s => ({ ...s, p2: s.p2 + 1 }));
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setGameState('missing');
    }
  };

  const nextTurn = () => {
    setSelectedOption(null);
    if (currentTurn < HOCKEY_QUESTIONS.length - 1) {
      setCurrentTurn(c => c + 1);
      setGameState('answering');
    } else {
      setView('result');
    }
  };

  const winner = scores.p1 > scores.p2 ? player1 : scores.p2 > scores.p1 ? player2 : "Ոչ-ոքի";

  return (
    <div className="min-h-screen bg-sky-50 text-stone-800 font-sans selection:bg-blue-200">
      <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen flex flex-col items-center">
        
        {/* Header */}
        <header className="w-full border-b-4 border-blue-200 pb-4 mb-8 flex justify-between items-end">
           <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-lg text-white">
               <Flag size={24} />
             </div>
             <div>
               <h1 className="text-2xl font-black uppercase tracking-tight text-blue-900 leading-none">Hockey Battle</h1>
               <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Spanish Quiz Arena</p>
             </div>
           </div>
           <div className="flex gap-4">
              <div className={`px-4 py-2 rounded-lg border-2 transition-all ${isPlayer1Turn && view === 'play' ? 'bg-blue-600 border-blue-700 text-white scale-110' : 'bg-white border-stone-200 text-stone-400'}`}>
                <p className="text-[10px] uppercase font-bold text-center">Gor</p>
                <p className="text-xl font-black text-center leading-none">{scores.p1}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg border-2 transition-all ${!isPlayer1Turn && view === 'play' ? 'bg-pink-600 border-pink-700 text-white scale-110' : 'bg-white border-stone-200 text-stone-400'}`}>
                <p className="text-[10px] uppercase font-bold text-center">Gayane</p>
                <p className="text-xl font-black text-center leading-none">{scores.p2}</p>
              </div>
           </div>
        </header>

        <main className="w-full flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            
            {view === 'intro' && (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center space-y-8"
              >
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto border-8 border-white shadow-xl">
                   <Trophy className="w-16 h-16 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-4xl font-black text-blue-900 uppercase italic">Մեծ Մրցաշար</h2>
                  <p className="text-stone-500 font-medium">Գոռն ընդդեմ Գայանեի: Ո՞վ ավելի լավ գիտի Cuando և Cuanto բառերը:</p>
                </div>
                
                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                   <div className="flex items-center gap-2 p-4 bg-white rounded-xl border-2 border-stone-100 shadow-sm">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold italic">G</div>
                      <input 
                        value={player1} 
                        onChange={(e) => setPlayer1(e.target.value)}
                        className="flex-1 font-bold outline-none bg-transparent"
                      />
                   </div>
                   <div className="flex items-center gap-2 p-4 bg-white rounded-xl border-2 border-stone-100 shadow-sm">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold italic">G</div>
                      <input 
                        value={player2} 
                        onChange={(e) => setPlayer2(e.target.value)}
                        className="flex-1 font-bold outline-none bg-transparent"
                      />
                   </div>
                </div>

                <button 
                  onClick={handleStart}
                  className="bg-blue-600 text-white w-full max-w-xs py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  Սկսել Խաղը <Play size={20} />
                </button>
              </motion.div>
            )}

            {view === 'play' && (
              <motion.div 
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full space-y-8"
              >
                {/* Arena Visual */}
                <HockeyRink 
                  isScoring={gameState === 'scoring'} 
                  isMissing={gameState === 'missing'} 
                  onComplete={nextTurn}
                />

                {/* Score HUD */}
                <div className="flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-blue-50) shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${isPlayer1Turn ? 'bg-blue-500' : 'bg-pink-500'}`}>
                         {currentPlayer[0]}
                      </div>
                      <p className="font-black text-stone-700 uppercase tracking-tight">{currentPlayer}-ի հերթն է</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Question</p>
                      <p className="text-xs font-black text-blue-600 italic">#{currentTurn + 1} / 20</p>
                   </div>
                </div>

                {/* Question Card */}
                <div className="bg-white p-8 md:p-12 rounded-3xl border-4 border-white shadow-2xl space-y-8 text-center relative overflow-hidden">
                   <HelpCircle className="absolute -top-4 -right-4 w-24 h-24 text-stone-50 opacity-50" />
                   
                   <div className="space-y-4">
                     <p className="text-3xl md:text-5xl font-black text-stone-900 leading-tight">
                       {HOCKEY_QUESTIONS[currentTurn].text}
                     </p>
                     <p className="text-xl font-medium text-blue-500 italic">
                       {HOCKEY_QUESTIONS[currentTurn].translation}
                     </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {HOCKEY_QUESTIONS[currentTurn].options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          disabled={gameState !== 'answering'}
                          className={`
                            group relative p-6 rounded-2xl border-b-4 text-2xl font-black transition-all
                            ${selectedOption === opt 
                              ? (opt === HOCKEY_QUESTIONS[currentTurn].correct ? 'bg-green-500 border-green-700 text-emerald-950 translate-y-1' : 'bg-rose-500 border-rose-700 text-rose-950 translate-y-1')
                              : (selectedOption && opt === HOCKEY_QUESTIONS[currentTurn].correct ? 'bg-green-100 border-green-300 text-green-700' : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:-translate-y-1')
                            }
                          `}
                        >
                           {opt}
                        </button>
                      ))}
                   </div>
                </div>
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12 w-full max-w-lg"
              >
                <div className="space-y-4">
                  <div className="inline-block bg-yellow-400 p-8 rounded-full shadow-2xl border-8 border-white animate-bounce">
                    <Trophy className="w-20 h-20 text-white" />
                  </div>
                  <h2 className="text-6xl font-black uppercase italic text-yellow-600 tracking-tighter">Champion!</h2>
                  <p className="text-4xl font-black text-blue-900">{winner}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl border-4 border-stone-100 shadow-xl space-y-6">
                   <div className="flex justify-between items-center pb-4 border-b">
                      <span className="font-bold text-stone-400 uppercase tracking-widest">{player1}</span>
                      <span className="text-2xl font-black text-blue-600">{scores.p1}</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="font-bold text-stone-400 uppercase tracking-widest">{player2}</span>
                      <span className="text-2xl font-black text-pink-600">{scores.p2}</span>
                   </div>
                </div>

                <button 
                  onClick={() => setView('intro')}
                  className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg flex items-center justify-center gap-2 mx-auto"
                >
                  <RotateCcw size={20} /> Նորից խաղալ
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Footer Area */}
        <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-stone-300">
           Armenian Hockey Tournament // Season 2026
        </div>

      </div>
    </div>
  );
}
