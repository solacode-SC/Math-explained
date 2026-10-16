import React, { useState, useEffect, useRef } from 'react';
import './styles/variables.css';
import './styles/grid.css';
import './styles/animations.css';

import { SceneProgress, SceneMeta } from './components/SceneProgress';
import { ChapterBar } from './components/ChapterBar';
import { DesktopIcon } from './components/DesktopIcon';

import { IntroScene } from './scenes/IntroScene';
import { CurveScene } from './scenes/CurveScene';
import { TangentScene } from './scenes/TangentScene';
import { SecantScene } from './scenes/SecantScene';
import { DerivativeScene } from './scenes/DerivativeScene';
import { RealExampleScene } from './scenes/RealExampleScene';
import { ExperimentScene } from './scenes/ExperimentScene';
import { ConclusionScene } from './scenes/ConclusionScene';

const SCENES: SceneMeta[] = [
  { id: 'intro', number: '01', title: 'المقدمة: لغة التغيّر', shortTitle: 'المقدمة' },
  { id: 'curve', number: '02', title: 'المنحنى والدالة', shortTitle: 'المنحنى' },
  { id: 'tangent', number: '03', title: 'خط المماس اللحظي', shortTitle: 'المماس' },
  { id: 'secant', number: '04', title: 'من القاطع إلى المماس', shortTitle: 'القاطع' },
  { id: 'derivative', number: '05', title: 'المشتق وميل المماس', shortTitle: 'المشتق' },
  { id: 'real', number: '06', title: 'مثال واقعي: حركة السيارة', shortTitle: 'السيارة' },
  { id: 'experiment', number: '07', title: 'المختبر التفاعلي الحي', shortTitle: 'المختبر' },
  { id: 'conclusion', number: '08', title: 'الخاتمة: فلسفة التغيّر', shortTitle: 'الخاتمة' },
];

export const App: React.FC = () => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [sceneProgress, setSceneProgress] = useState<number>(0); // 0 to 1
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Global interactive point position
  const [pointX, setPointX] = useState<number>(1.2);

  // Web Audio Context for retro sound effects
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playRetroSound = (type: 'click' | 'chime' | 'warp') => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'chime') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'warp') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.25);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {}
  };

  // Video playback timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      const intervalMs = 60;
      timer = setInterval(() => {
        setSceneProgress((prev) => {
          const next = prev + 0.004;
          if (next >= 1) {
            // Move to next scene
            setCurrentSceneIndex((s) => {
              if (s < SCENES.length - 1) {
                playRetroSound('warp');
                return s + 1;
              } else {
                setIsPlaying(false);
                return s;
              }
            });
            return 0;
          }
          return next;
        });
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, soundEnabled]);

  // Handle scene navigation
  const goToScene = (index: number) => {
    playRetroSound('click');
    setCurrentSceneIndex(index);
    setSceneProgress(0);
  };

  const handleNext = () => {
    if (currentSceneIndex < SCENES.length - 1) {
      goToScene(currentSceneIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      goToScene(currentSceneIndex - 1);
    }
  };

  const handleReset = () => {
    playRetroSound('chime');
    setCurrentSceneIndex(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    playRetroSound('click');
    setIsPlaying(!isPlaying);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) playRetroSound('chime');
  };

  return (
    <div
      dir="rtl"
      className="graph-paper-bg paper-texture"
      style={{
        minHeight: '100vh',
        width: '100%',
        color: 'var(--ink-dark)',
        fontFamily: 'var(--font-arabic-primary)',
        paddingBottom: '90px',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Top Timeline Navigation Scrubber */}
      <SceneProgress
        scenes={SCENES}
        currentScene={currentSceneIndex}
        onSelectScene={goToScene}
        progressPercent={sceneProgress * 100}
      />

      {/* Floating Retro Desktop Sidebar Icons (Left/Right) */}
      <div
        style={{
          position: 'fixed',
          top: '74px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 80,
          pointerEvents: 'auto',
        }}
        className="hide-on-mobile"
      >
        <DesktopIcon
          icon="⚡"
          label="المشتق"
          sublabel="DERIV.EXE"
          active={currentSceneIndex === 0}
          onClick={() => goToScene(0)}
        />
        <DesktopIcon
          icon="📈"
          label="المنحنى"
          sublabel="CURVE.DAT"
          active={currentSceneIndex === 1}
          onClick={() => goToScene(1)}
        />
        <DesktopIcon
          icon="🧭"
          label="المماس"
          sublabel="TANGENT.SYS"
          active={currentSceneIndex === 2}
          onClick={() => goToScene(2)}
        />
        <DesktopIcon
          icon="📐"
          label="القاطع"
          sublabel="SECANT.LIB"
          active={currentSceneIndex === 3}
          onClick={() => goToScene(3)}
        />
      </div>

      <div
        style={{
          position: 'fixed',
          top: '74px',
          left: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 80,
          pointerEvents: 'auto',
        }}
        className="hide-on-mobile"
      >
        <DesktopIcon
          icon="🚗"
          label="السيارة"
          sublabel="VELOCITY"
          active={currentSceneIndex === 5}
          onClick={() => goToScene(5)}
        />
        <DesktopIcon
          icon="🧪"
          label="المختبر"
          sublabel="LAB.EXE"
          active={currentSceneIndex === 6}
          onClick={() => goToScene(6)}
        />
        <a href="index.html" style={{ textDecoration: 'none' }}>
          <DesktopIcon
            icon="🏠"
            label="الرئيسية"
            sublabel="HOME"
          />
        </a>
      </div>

      {/* Main Cinematic Stage */}
      <main
        style={{
          paddingTop: '80px',
          minHeight: 'calc(100vh - 170px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentSceneIndex === 0 && (
          <IntroScene progress={sceneProgress} onStart={() => goToScene(1)} />
        )}
        {currentSceneIndex === 1 && (
          <CurveScene
            currentX={pointX}
            onPointChange={setPointX}
            progress={sceneProgress}
          />
        )}
        {currentSceneIndex === 2 && (
          <TangentScene
            currentX={pointX}
            onPointChange={setPointX}
            progress={sceneProgress}
          />
        )}
        {currentSceneIndex === 3 && (
          <SecantScene
            currentX={pointX}
            onPointChange={setPointX}
            progress={sceneProgress}
          />
        )}
        {currentSceneIndex === 4 && (
          <DerivativeScene
            currentX={pointX}
            onPointChange={setPointX}
            progress={sceneProgress}
          />
        )}
        {currentSceneIndex === 5 && (
          <RealExampleScene progress={sceneProgress} />
        )}
        {currentSceneIndex === 6 && <ExperimentScene />}
        {currentSceneIndex === 7 && (
          <ConclusionScene onRestart={handleReset} />
        )}
      </main>

      {/* Bottom Educational Chapter & Timeline Control Bar */}
      <ChapterBar
        currentScene={currentSceneIndex}
        totalScenes={SCENES.length}
        sceneTitle={SCENES[currentSceneIndex].title}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />
    </div>
  );
};

