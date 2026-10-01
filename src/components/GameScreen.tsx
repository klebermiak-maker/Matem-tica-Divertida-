import React, { useState, useEffect } from 'react';
import { DifficultyLevel, LevelInfo, MathQuestion, MascotAccessory, Operation } from '../types';
import { generateQuestionPool } from '../utils/mathGenerator';
import { sounds } from '../utils/audio';
import { MascotTico } from './MascotTico';
import { MaterialDouradoModal } from './MaterialDourado';
import { Scratchpad } from './Scratchpad';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Star,
  Trophy,
  RotateCcw,
  Flame,
  Volume2,
} from 'lucide-react';

interface GameScreenProps {
  level?: LevelInfo;
  customMode?: {
    operation: Operation;
    difficulty: DifficultyLevel;
    questionsCount?: number;
    title: string;
  };
  accessories: MascotAccessory[];
  onFinishLevel: (stars: number, coins: number, correctCount: number, totalCount: number) => void;
  onExit: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  level,
  customMode,
  accessories,
  onFinishLevel,
  onExit,
}) => {
  const op = level ? level.operation : customMode?.operation || 'addition';
  const diff = level ? level.difficulty : customMode?.difficulty || 1;
  const totalQuestions = level ? level.questionsTotal : customMode?.questionsCount || 10;

  // Pre-generate shuffled, diverse, non-repeating question pool
  const [questionPool, setQuestionPool] = useState<MathQuestion[]>(() =>
    generateQuestionPool(op, diff, totalQuestions)
  );
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentQuestion = questionPool[questionIndex] || questionPool[0];

  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [inputMode, setInputMode] = useState<'keypad' | 'choices'>('keypad');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Tools state
  const [showMaterialDourado, setShowMaterialDourado] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Victory modal state
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);

  // Mascot dynamic messages
  const [mascotMood, setMascotMood] = useState<'happy' | 'thinking' | 'celebrating' | 'encourage'>('happy');
  const [mascotMsg, setMascotMsg] = useState('Digite o resultado do cálculo no teclado abaixo!');

  // Handle typing digits
  const handleInputDigit = (digit: string) => {
    if (isAnswerChecked) return;
    sounds.playClick();
    if (typedAnswer.length >= 7) return; // Prevent excessive length
    setTypedAnswer((prev) => prev + digit);
  };

  const handleBackspace = () => {
    if (isAnswerChecked) return;
    sounds.playClick();
    setTypedAnswer((prev) => prev.slice(0, -1));
  };

  const handleClearInput = () => {
    if (isAnswerChecked) return;
    sounds.playClick();
    setTypedAnswer('');
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if modifier keys pressed or modal open
      if (e.ctrlKey || e.metaKey || e.altKey || showMaterialDourado || isCompleted) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleInputDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Delete' || e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleClearInput();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!isAnswerChecked) {
          handleConfirmAnswer();
        } else {
          handleProceed();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedAnswer, isAnswerChecked, showMaterialDourado, isCompleted]);

  // Advance to next question in the pool
  const loadNextQuestion = () => {
    setTypedAnswer('');
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setIsCorrect(null);
    setShowHint(false);
    setMascotMood('happy');
    setMascotMsg('Vamos para o próximo desafio!');
    setQuestionIndex((prev) => prev + 1);
  };

  const handleSelectAnswer = (ans: number) => {
    if (isAnswerChecked) return;
    sounds.playClick();
    setSelectedAnswer(ans);
    setTypedAnswer(String(ans));
  };

  const handleConfirmAnswer = () => {
    const numericInput = inputMode === 'keypad' ? parseInt(typedAnswer, 10) : selectedAnswer;

    if (numericInput === null || isNaN(numericInput as number) || isAnswerChecked) {
      sounds.playIncorrect();
      setMascotMood('thinking');
      setMascotMsg('Digite ou escolha uma resposta antes de confirmar!');
      return;
    }

    setIsAnswerChecked(true);
    const correct = numericInput === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setCorrectAnswersCount((c) => c + 1);
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      setMascotMood('celebrating');

      if (newStreak >= 3) {
        setMascotMsg(`Sensacional! Sequência de ${newStreak} acertos seguidos! 🔥`);
      } else {
        setMascotMsg('Excelente! Você calculou e acertou em cheio! ⭐');
      }
    } else {
      sounds.playIncorrect();
      setCurrentStreak(0);
      setMascotMood('encourage');
      setMascotMsg('Não se preocupe! Veja a explicação abaixo para aprender e acertar a próxima!');
    }
  };

  const handleProceed = () => {
    sounds.playClick();
    if (questionIndex + 1 < totalQuestions) {
      loadNextQuestion();
    } else {
      // Calculate final score
      const finalCorrect = correctAnswersCount;
      const accuracy = finalCorrect / totalQuestions;

      let stars = 1;
      if (accuracy >= 0.8) stars = 3;
      else if (accuracy >= 0.6) stars = 2;

      const coins = finalCorrect * 5 + stars * 5;

      setEarnedStars(stars);
      setEarnedCoins(coins);
      setIsCompleted(true);
      sounds.playFanfare();

      // Launch cheerful confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Safe fallback
      }

      onFinishLevel(stars, coins, finalCorrect, totalQuestions);
    }
  };

  const titleText = level ? `Fase ${level.id}: ${level.title}` : customMode?.title || 'Treino Especial';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top Bar HUD */}
      <div className="bg-white rounded-2xl border-2 border-amber-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sounds.playClick();
              onExit();
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
          <div>
            <h2 className="font-fun text-sm sm:text-base font-bold text-slate-900">{titleText}</h2>
            <div className="text-xs text-slate-500">
              Questão <strong className="text-amber-600 font-bold">{questionIndex + 1}</strong> de{' '}
              {totalQuestions}
            </div>
          </div>
        </div>

        {/* Action Tools & Streak */}
        <div className="flex items-center gap-2">
          {currentStreak > 1 && (
            <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2.5 py-1 rounded-xl text-xs font-bold animate-bounce-gentle">
              <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-600" />
              <span>{currentStreak}x Foco!</span>
            </div>
          )}

          {/* Material Dourado button */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowMaterialDourado(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            title="Abrir Material Dourado para visualizar os números"
          >
            <span>🪵</span>
            <span className="hidden sm:inline">Material Dourado</span>
          </button>

          {/* Scratchpad button */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowScratchpad(true);
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100/80 hover:bg-indigo-200 text-indigo-900 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            title="Abrir lousa para armar a continha"
          >
            <span>📝</span>
            <span className="hidden sm:inline">Rascunho</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-1.5 flex-wrap px-4">
        {totalQuestions <= 12 ? (
          Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === questionIndex
                  ? 'w-7 bg-amber-500 shadow-xs'
                  : idx < questionIndex
                  ? 'w-3.5 bg-emerald-500'
                  : 'w-2 bg-slate-200'
              }`}
            />
          ))
        ) : (
          <div className="w-full max-w-md bg-slate-100 rounded-full h-3 p-0.5 border border-slate-200">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((questionIndex + 1) / totalQuestions) * 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Main Question Arena */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Mascot companion bar */}
        <MascotTico
          mood={mascotMood}
          message={mascotMsg}
          size="sm"
          accessories={accessories}
          className="border-b border-amber-100 pb-4"
        />

        {/* The Math Prompt */}
        <div className="text-center py-4 space-y-3">
          {currentQuestion.isWordProblem ? (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 max-w-xl mx-auto">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                Probleminha do Cotidiano
              </span>
              <p className="font-fun text-lg sm:text-xl font-bold text-slate-800 mt-2 leading-relaxed">
                {currentQuestion.promptText}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Resolva o Cálculo
              </span>
              <div className="font-fun text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-wider">
                {currentQuestion.num1.toLocaleString('pt-BR')} {currentQuestion.symbol}{' '}
                {currentQuestion.num2.toLocaleString('pt-BR')} = ?
              </div>
            </div>
          )}

          {/* Visual contextual dots/emojis if present */}
          {currentQuestion.visualGroup && !currentQuestion.isWordProblem && (
            <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2 max-w-md mx-auto">
              {Array.from({
                length: Math.min(
                  currentQuestion.visualGroup.itemsCount,
                  currentQuestion.operation === 'multiplication' ? 36 : 24
                ),
              }).map((_, i) => (
                <span key={i} className="text-xl sm:text-2xl drop-shadow-xs animate-pop">
                  {currentQuestion.visualGroup?.icon}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Mode Switcher: Teclado vs Alternativas */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => {
                sounds.playClick();
                setInputMode('keypad');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                inputMode === 'keypad'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ⌨️ Inserir com Teclado
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setInputMode('choices');
              }}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                inputMode === 'choices'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🎲 Múltipla Escolha
            </button>
          </div>
        </div>

        {/* INPUT MODE: Direct Result Keypad Input */}
        {inputMode === 'keypad' && (
          <div className="max-w-md mx-auto space-y-4">
            {/* Value Display Box */}
            <div
              className={`p-4 sm:p-5 rounded-3xl border-4 text-center transition-all ${
                isAnswerChecked
                  ? isCorrect
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-md'
                    : 'border-rose-400 bg-rose-50/50 shadow-md'
                  : 'border-amber-300 bg-amber-50/30 shadow-inner'
              }`}
            >
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                {isAnswerChecked ? 'Resultado Inserido' : 'Digite o Resultado'}
              </span>
              <div className="font-fun text-4xl sm:text-5xl font-extrabold text-slate-900 min-h-[58px] flex items-center justify-center gap-1.5 select-none">
                {typedAnswer ? (
                  <span className="tracking-wider">
                    {parseInt(typedAnswer, 10).toLocaleString('pt-BR')}
                  </span>
                ) : (
                  <span className="text-slate-300 text-3xl font-normal">Digite aqui...</span>
                )}
                {!isAnswerChecked && (
                  <span className="w-1 h-9 bg-amber-500 rounded-full animate-pulse inline-block" />
                )}
              </div>
            </div>

            {/* Virtual Keypad */}
            {!isAnswerChecked && (
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-xs sm:max-w-sm mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => handleInputDigit(digit)}
                      className="py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/70 font-fun text-2xl sm:text-3xl font-extrabold text-slate-800 shadow-xs active:scale-95 transition-all cursor-pointer select-none"
                    >
                      {digit}
                    </button>
                  ))}
                  <button
                    onClick={handleBackspace}
                    title="Apagar último dígito"
                    className="py-3.5 sm:py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 font-fun text-xs sm:text-sm font-bold text-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1 select-none"
                  >
                    <span>⌫</span>
                    <span>Apagar</span>
                  </button>
                  <button
                    onClick={() => handleInputDigit('0')}
                    className="py-3.5 sm:py-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50/70 font-fun text-2xl sm:text-3xl font-extrabold text-slate-800 shadow-xs active:scale-95 transition-all cursor-pointer select-none"
                  >
                    0
                  </button>
                  <button
                    onClick={handleClearInput}
                    title="Limpar resultado digitado"
                    className="py-3.5 sm:py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 font-fun text-xs sm:text-sm font-bold text-slate-700 active:scale-95 transition-all cursor-pointer select-none"
                  >
                    Limpar
                  </button>
                </div>
                <p className="text-[11px] text-center text-slate-400">
                  Dica: Você também pode usar o teclado numérico do computador e pressionar <strong>Enter</strong>!
                </p>
              </div>
            )}
          </div>
        )}

        {/* INPUT MODE: Multiple Choice (Alternativas) */}
        {inputMode === 'choices' && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              let btnStyle =
                'bg-white border-2 border-slate-200 text-slate-800 hover:border-amber-400 hover:bg-amber-50/50';

              if (isAnswerChecked) {
                if (opt === currentQuestion.answer) {
                  btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-md scale-102';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 border-2 border-rose-600 text-white opacity-90';
                } else {
                  btnStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500 border-2 border-amber-600 text-white shadow-md scale-102';
              }

              return (
                <button
                  key={opt}
                  disabled={isAnswerChecked}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`py-4 sm:py-5 px-4 rounded-2xl font-fun text-2xl sm:text-3xl font-extrabold transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span>{opt.toLocaleString('pt-BR')}</span>
                  {isAnswerChecked && opt === currentQuestion.answer && (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  )}
                  {isAnswerChecked && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Hint button */}
        {!isAnswerChecked && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Esconder Dica' : 'Preciso de uma Dica!'}</span>
            </button>
          </div>
        )}

        {showHint && !isAnswerChecked && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center max-w-md mx-auto text-xs sm:text-sm text-amber-900 font-medium animate-pop">
            💡 <strong>Dica do Tico:</strong> {currentQuestion.hint}
          </div>
        )}

        {/* Feedback Explanation Card after checking */}
        {isAnswerChecked && (
          <div
            className={`rounded-2xl p-4 sm:p-5 border-2 text-center max-w-lg mx-auto space-y-2 animate-pop ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-center gap-2 font-fun text-lg font-bold">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Muito Bem! Resposta Correta!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span>Não foi dessa vez, mas veja a resposta:</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Button: Confirm or Continue */}
        <div className="flex justify-center pt-2">
          {!isAnswerChecked ? (
            <button
              disabled={inputMode === 'keypad' ? typedAnswer.trim() === '' : selectedAnswer === null}
              onClick={handleConfirmAnswer}
              className={`px-8 py-3.5 rounded-2xl font-fun text-base font-bold transition-all shadow-md ${
                (inputMode === 'keypad' ? typedAnswer.trim() !== '' : selectedAnswer !== null)
                  ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer hover:scale-105 active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={handleProceed}
              className="px-8 py-3.5 rounded-2xl font-fun text-base font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              {questionIndex + 1 < totalQuestions ? 'Próxima Pergunta →' : 'Ver Resultado da Fase 🏆'}
            </button>
          )}
        </div>
      </div>

      {/* Modals & Tools */}
      {showMaterialDourado && (
        <MaterialDouradoModal
          question={currentQuestion}
          onClose={() => setShowMaterialDourado(false)}
        />
      )}

      {showScratchpad && <Scratchpad onClose={() => setShowScratchpad(false)} />}

      {/* Level Completed Victory Modal */}
      {isCompleted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-pop">
          <div className="bg-white rounded-3xl max-w-md w-full border-4 border-amber-400 shadow-2xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
              🏆
            </div>

            <div className="space-y-1">
              <h3 className="font-fun text-2xl font-extrabold text-slate-900">
                Fase Concluída com Sucesso!
              </h3>
              <p className="text-xs text-slate-500">
                Você mandou muito bem nas quatro operações!
              </p>
            </div>

            {/* Stars Won */}
            <div className="flex items-center justify-center gap-2 py-2">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-10 h-10 transition-transform ${
                    s <= earnedStars
                      ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow-md'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>

            {/* Rewards Breakdown */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-xl p-2.5 border border-amber-100">
                <span className="text-slate-500">Acertos</span>
                <p className="font-fun text-lg font-bold text-emerald-600">
                  {correctAnswersCount} / {totalQuestions}
                </p>
              </div>
              <div className="bg-white rounded-xl p-2.5 border border-amber-100">
                <span className="text-slate-500">Moedas Ganhas</span>
                <p className="font-fun text-lg font-bold text-amber-600 flex items-center justify-center gap-1">
                  <span>+{earnedCoins}</span>
                  <span className="text-sm">🪙</span>
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onExit();
                }}
                className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-fun font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                Voltar à Trilha
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  // Reset level with a freshly generated and shuffled question pool
                  const freshPool = generateQuestionPool(op, diff, totalQuestions);
                  setQuestionPool(freshPool);
                  setIsCompleted(false);
                  setQuestionIndex(0);
                  setCorrectAnswersCount(0);
                  setCurrentStreak(0);
                  setIsAnswerChecked(false);
                  setSelectedAnswer(null);
                  setShowHint(false);
                  setMascotMood('happy');
                  setMascotMsg('Nova rodada com questões fresquinhas e alternativas embaralhadas!');
                }}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-white font-fun font-bold text-sm rounded-xl transition-colors cursor-pointer shadow-md"
              >
                Jogar Novamente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
