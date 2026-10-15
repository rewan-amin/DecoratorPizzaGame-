import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Play,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Code2,
  Layers,
  GitBranch,
  Award,
  BookOpen,
  Utensils,
  Plus,
  Trash2,
  Eye,
  Terminal,
  Lightbulb,
  ArrowRight,
  Star,
  Smile,
  Frown,
  Meh,
  Cpu,
  Check,
  RefreshCw,
  ShoppingBag,
  Zap,
  Music
} from 'lucide-react';

// ============================================================================
// COZY PIZZERIA BACKGROUND MUSIC SYNTHESIZER (100% Offline Cozy Chiptune/Acoustic)
// ============================================================================
class CozyPizzaMusic {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.08;
    this.timer = null;
    this.step = 0;
    this.gainNode = null;
    this.filterNode = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.setValueAtTime(1400, this.ctx.currentTime);
        this.gainNode.connect(this.filterNode);
        this.filterNode.connect(this.ctx.destination);
      }
    }
  }

  playNote(freq, type, duration, delay = 0, vol = 0.12) {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = type;
      const startTime = this.ctx.currentTime + delay;
      osc.frequency.setValueAtTime(freq, startTime);

      noteGain.gain.setValueAtTime(0.0001, startTime);
      noteGain.gain.exponentialRampToValueAtTime(vol, startTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {}
  }

  start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;

    const notes = {
      C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
    };

    const beatLen = 0.28; // ~107 BPM

    const score = [
      // Bar 1: C
      { bass: notes.C3, chord: [notes.E4, notes.G4], melody: notes.G4 },
      { chord: [notes.E4, notes.G4], melody: notes.E4 },
      { bass: notes.G2, chord: [notes.E4, notes.G4], melody: notes.G4 },
      { chord: [notes.E4, notes.C5], melody: notes.C5 },
      // Bar 2: G
      { bass: notes.G2, chord: [notes.D4, notes.B4], melody: notes.B4 },
      { chord: [notes.D4, notes.B4], melody: notes.G4 },
      { bass: notes.D3, chord: [notes.D4, notes.G4], melody: notes.D5 },
      { chord: [notes.D4, notes.B4], melody: notes.B4 },
      // Bar 3: Am
      { bass: notes.A2, chord: [notes.C4, notes.E4], melody: notes.C5 },
      { chord: [notes.C4, notes.E4], melody: notes.A4 },
      { bass: notes.E3, chord: [notes.C4, notes.E4], melody: notes.C5 },
      { chord: [notes.C4, notes.A4], melody: notes.E5 },
      // Bar 4: F
      { bass: notes.F2, chord: [notes.C4, notes.F4], melody: notes.D5 },
      { chord: [notes.C4, notes.A4], melody: notes.C5 },
      { bass: notes.C3, chord: [notes.C4, notes.F4], melody: notes.A4 },
      { chord: [notes.A3, notes.F4], melody: notes.F4 },
      // Bar 5: C
      { bass: notes.C3, chord: [notes.E4, notes.G4], melody: notes.G4 },
      { chord: [notes.E4, notes.G4], melody: notes.E4 },
      { bass: notes.G2, chord: [notes.E4, notes.G4], melody: notes.G4 },
      { chord: [notes.E4, notes.C5], melody: notes.C5 },
      // Bar 6: Dm
      { bass: notes.D3, chord: [notes.F4, notes.A4], melody: notes.F4 },
      { chord: [notes.F4, notes.A4], melody: notes.D4 },
      { bass: notes.A2, chord: [notes.F4, notes.A4], melody: notes.F4 },
      { chord: [notes.D4, notes.A4], melody: notes.A4 },
      // Bar 7: G7
      { bass: notes.G2, chord: [notes.F4, notes.B4], melody: notes.B4 },
      { chord: [notes.F4, notes.B4], melody: notes.A4 },
      { bass: notes.D3, chord: [notes.F4, notes.B4], melody: notes.G4 },
      { chord: [notes.F4, notes.D5], melody: notes.B4 },
      // Bar 8: C (Resolution)
      { bass: notes.C3, chord: [notes.E4, notes.G4], melody: notes.C5 },
      { chord: [notes.E4, notes.G4], melody: notes.E5 },
      { bass: notes.G2, chord: [notes.E4, notes.G4], melody: notes.C5 },
      { chord: [notes.E4, notes.C5], melody: null },
    ];

    const tick = () => {
      if (!this.isPlaying) return;
      const stepData = score[this.step % score.length];

      if (stepData.bass) {
        this.playNote(stepData.bass, 'triangle', beatLen * 1.5, 0, 0.15);
      }

      if (stepData.chord) {
        stepData.chord.forEach((freq) => {
          this.playNote(freq, 'sine', beatLen * 0.85, 0.01, 0.05);
        });
      }

      if (stepData.melody) {
        this.playNote(stepData.melody, 'triangle', beatLen * 0.95, 0.005, 0.14);
        this.playNote(stepData.melody * 2, 'sine', beatLen * 0.5, 0.01, 0.03);
      }

      this.step++;
      this.timer = setTimeout(tick, beatLen * 1000);
    };

    tick();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

const bgm = new CozyPizzaMusic();

// ============================================================================
// WEB AUDIO SYNTHESIZER (100% Offline Cozy Game Sound Effects)
// ============================================================================
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.12, delay = 0, vol = 0.12) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);

      gain.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration);
    } catch (e) {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  }

  pop() {
    this.playTone(520, 'triangle', 0.08, 0, 0.15);
    this.playTone(680, 'sine', 0.09, 0.04, 0.12);
  }

  click() {
    this.playTone(440, 'sine', 0.06, 0, 0.1);
  }

  success() {
    this.playTone(523.25, 'triangle', 0.12, 0, 0.15); // C5
    this.playTone(659.25, 'triangle', 0.12, 0.1, 0.15); // E5
    this.playTone(783.99, 'triangle', 0.15, 0.2, 0.15); // G5
    this.playTone(1046.5, 'sine', 0.3, 0.3, 0.18); // C6
  }

  cashRegister() {
    this.playTone(880, 'sine', 0.08, 0, 0.14);
    this.playTone(1760, 'triangle', 0.25, 0.08, 0.16);
  }

  error() {
    this.playTone(240, 'sawtooth', 0.18, 0, 0.12);
    this.playTone(180, 'sawtooth', 0.25, 0.15, 0.14);
  }

  step() {
    this.playTone(600, 'sine', 0.07, 0, 0.09);
  }
}

const sfx = new SoundEffects();

// ============================================================================
// PREDEFINED GAME & PATTERN DATA
// ============================================================================
const LEGACY_PIZZAS = [
  {
    id: 'basic',
    name: 'BasicPizza',
    displayName: 'Basic Pizza',
    price: 8.0,
    desc: 'Classic hand-tossed crust & signature tomato sauce',
    classCode: 'class BasicPizza implements Pizza',
    color: '#F59E0B',
    toppings: []
  },
  {
    id: 'margherita',
    name: 'Margherita',
    displayName: 'Margherita',
    price: 10.0,
    desc: 'Tomato sauce, fresh mozzarella & sweet basil leaves',
    classCode: 'class Margherita implements Pizza',
    color: '#EF4444',
    toppings: ['cheese', 'basil']
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni',
    displayName: 'Pepperoni',
    price: 12.0,
    desc: 'Tomato sauce, mozzarella & crispy pepperoni slices',
    classCode: 'class Pepperoni implements Pizza',
    color: '#DC2626',
    toppings: ['cheese', 'pepperoni']
  }
];

const TOPPING_DECORATORS = [
  {
    id: 'mushroom',
    name: 'Mushrooms',
    className: 'MushroomDecorator',
    price: 1.5,
    color: '#D6C7B2',
    borderColor: '#785A46',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-700',
    descAdd: 'Mushrooms'
  },
  {
    id: 'cheese',
    name: 'Extra Cheese',
    className: 'CheeseDecorator',
    price: 2.0,
    color: '#FDE047',
    borderColor: '#CA8A04',
    badgeBg: 'bg-yellow-100 text-yellow-900 border-yellow-600',
    descAdd: 'Extra Cheese'
  },
  {
    id: 'basil',
    name: 'Fresh Basil',
    className: 'BasilDecorator',
    price: 1.0,
    color: '#22C55E',
    borderColor: '#15803D',
    badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-700',
    descAdd: 'Fresh Basil'
  },
  {
    id: 'olive',
    name: 'Black Olives',
    className: 'OliveDecorator',
    price: 1.25,
    color: '#334155',
    borderColor: '#0F172A',
    badgeBg: 'bg-slate-200 text-slate-900 border-slate-700',
    descAdd: 'Black Olives'
  },
  {
    id: 'pepper',
    name: 'Spicy Peppers',
    className: 'SpicyPepperDecorator',
    price: 1.5,
    color: '#EF4444',
    borderColor: '#991B1B',
    badgeBg: 'bg-red-100 text-red-900 border-red-700',
    descAdd: 'Spicy Peppers'
  }
];

const UML_CLASSES = {
  Pizza: {
    title: 'Pizza',
    stereotype: '<<interface>>',
    role: 'Component Interface',
    color: 'bg-amber-100 border-[#4A2C2A]',
    fields: [],
    methods: ['+ getDescription(): String', '+ getCost(): double'],
    explanation:
      'Defines the common contract for both base pizzas AND decorated pizzas. Because decorators also implement Pizza, the cashier or customer code never needs to know whether a pizza is plain or wrapped in 5 toppings!',
    relationships: [
      'Implemented by Concrete Components (BasicPizza, Margherita)',
      'Implemented by Abstract Decorator (PizzaDecorator)'
    ]
  },
  BasicPizza: {
    title: 'BasicPizza / Margherita',
    stereotype: 'Concrete Component',
    role: 'Core Object to be Wrapped',
    color: 'bg-orange-100 border-[#4A2C2A]',
    fields: [],
    methods: ['+ getDescription(): String', '+ getCost(): double'],
    explanation:
      'The innermost foundational object! It provides the starting description (e.g., "Margherita Pizza") and base cost ($10.00). It sits at the center of the wrapper chain and terminates recursive delegation calls.',
    relationships: ['Implements the Pizza interface directly']
  },
  PizzaDecorator: {
    title: 'PizzaDecorator',
    stereotype: '<<abstract>>',
    role: 'Abstract Decorator',
    color: 'bg-sky-100 border-[#4A2C2A]',
    fields: ['# pizza: Pizza'],
    methods: [
      '+ PizzaDecorator(pizza: Pizza)',
      '+ getDescription(): String',
      '+ getCost(): double'
    ],
    explanation:
      'The secret sauce of the Decorator Pattern! It BOTH implements Pizza (IS-A Pizza) AND holds a protected reference `protected Pizza pizza` (HAS-A Pizza). Its methods simply delegate work to `pizza.getDescription()` and `pizza.getCost()`.',
    relationships: [
      'Implements Pizza (IS-A relationship)',
      'Composes / wraps a Pizza reference (HAS-A relationship)',
      'Extended by all Concrete Topping Decorators'
    ]
  },
  MushroomDecorator: {
    title: 'MushroomDecorator',
    stereotype: 'Concrete Decorator',
    role: 'Dynamic Wrapper #1',
    color: 'bg-emerald-100 border-[#4A2C2A]',
    fields: [],
    methods: [
      '+ MushroomDecorator(p: Pizza)',
      '+ getDescription(): String',
      '+ getCost(): double'
    ],
    explanation:
      'Wraps any Pizza object and adds mushroom behavior! It calls `super.getDescription()` (which asks the wrapped pizza for its description) and appends `", Mushrooms"`, and calls `super.getCost() + 1.50`.',
    relationships: ['Extends PizzaDecorator']
  },
  CheeseDecorator: {
    title: 'CheeseDecorator',
    stereotype: 'Concrete Decorator',
    role: 'Dynamic Wrapper #2',
    color: 'bg-yellow-100 border-[#4A2C2A]',
    fields: [],
    methods: [
      '+ CheeseDecorator(p: Pizza)',
      '+ getDescription(): String',
      '+ getCost(): double'
    ],
    explanation:
      'Another concrete wrapper! Because it accepts any `Pizza` in its constructor, it can wrap a `BasicPizza`, a `Margherita`, or even a `MushroomDecorator` (or another `CheeseDecorator` for double cheese!).',
    relationships: ['Extends PizzaDecorator']
  }
};

const TRACE_STEPS = [
  {
    step: 0,
    title: '1. Object Instantiation (Wrapping in Memory)',
    direction: 'init',
    activeLayer: 'all',
    codeLine: 'Pizza order = new CheeseDecorator(new MushroomDecorator(new Margherita()));',
    thought:
      'First, `new Margherita()` is created at the core. Then `MushroomDecorator` wraps it. Finally, `CheeseDecorator` wraps the `MushroomDecorator` on the outside!',
    callStack: ['order -> CheeseDecorator( MushroomDecorator( Margherita ) )'],
    returnVal: 'Ready to call order.getCost() & order.getDescription()'
  },
  {
    step: 1,
    title: '2. Caller invokes order.getCost() on outermost wrapper',
    direction: 'inward',
    activeLayer: 'cheese',
    codeLine: 'CheeseDecorator.getCost() -> calls super.getCost() + 2.00',
    thought:
      'The cashier calls `order.getCost()`. Since `CheeseDecorator` is on the outside, it runs first. Before it can add `$2.00`, it must find out what the inner wrapped pizza costs via `super.getCost()` (which delegates to `pizza.getCost()`).',
    callStack: ['CheeseDecorator.getCost() [waiting for inner pizza + $2.00]'],
    returnVal: 'Waiting...'
  },
  {
    step: 2,
    title: '3. Delegation travels inward to MushroomDecorator',
    direction: 'inward',
    activeLayer: 'mushroom',
    codeLine: 'MushroomDecorator.getCost() -> calls super.getCost() + 1.50',
    thought:
      '`MushroomDecorator` receives the delegated call! Before it can add `$1.50` for mushrooms, it ALSO delegates inward to its own wrapped `pizza` reference (`Margherita`).',
    callStack: [
      'CheeseDecorator.getCost() [waiting + $2.00]',
      '  ↳ MushroomDecorator.getCost() [waiting + $1.50]'
    ],
    returnVal: 'Waiting...'
  },
  {
    step: 3,
    title: '4. Core Concrete Component (Margherita) reached!',
    direction: 'base',
    activeLayer: 'margherita',
    codeLine: 'Margherita.getCost() -> returns 10.00 ("Margherita")',
    thought:
      'We hit the center of the nesting doll! `Margherita` is a Concrete Component, not a decorator—it has no inner pizza to call. It immediately returns base cost `$10.00` and `"Margherita"`.',
    callStack: [
      'CheeseDecorator.getCost() [waiting + $2.00]',
      '  ↳ MushroomDecorator.getCost() [waiting + $1.50]',
      '    ↳ Margherita.getCost() ===> $10.00'
    ],
    returnVal: '$10.00 ("Margherita")'
  },
  {
    step: 4,
    title: '5. MushroomDecorator adds its behavior & returns outward',
    direction: 'outward',
    activeLayer: 'mushroom',
    codeLine: 'return 10.00 + 1.50; // $11.50 ("Margherita, Mushrooms")',
    thought:
      '`MushroomDecorator` receives `$10.00` from `super.getCost()`, adds its own `$1.50` price (and `", Mushrooms"`), and returns `$11.50` outward to `CheeseDecorator`!',
    callStack: [
      'CheeseDecorator.getCost() [waiting + $2.00]',
      '  ↳ MushroomDecorator.getCost() ===> $10.00 + $1.50 = $11.50'
    ],
    returnVal: '$11.50 ("Margherita, Mushrooms")'
  },
  {
    step: 5,
    title: '6. CheeseDecorator finishes & returns final total!',
    direction: 'outward',
    activeLayer: 'cheese',
    codeLine: 'return 11.50 + 2.00; // $13.50 ("Margherita, Mushrooms, Extra Cheese")',
    thought:
      '`CheeseDecorator` receives `$11.50` from `super.getCost()`, adds `$2.00` (and `", Extra Cheese"`), and returns the final result `$13.50` to the register!',
    callStack: [
      'CheeseDecorator.getCost() ===> $11.50 + $2.00 = $13.50 (COMPLETE!)'
    ],
    returnVal: '$13.50 ("Margherita, Mushrooms, Extra Cheese")'
  }
];

// ============================================================================
// CUSTOM LAYERED SVG COMPONENTS (GOOD PIZZA, GREAT PIZZA ART STYLE)
// ============================================================================

// Expressive Customer Character (Grandma Nonna / Cozy Patron inspired by reference image)
const CustomerSVG = ({ mood = 'happy', characterType = 'nonna' }) => {
  return (
    <svg
      viewBox="0 0 280 310"
      className="w-full h-full drop-shadow-md select-none transition-transform duration-500"
    >
      {/* Floating Mood Aura / Stars when delighted */}
      {mood === 'delighted' && (
        <g className="animate-bounce">
          <path
            d="M40 50 L45 62 L58 64 L48 72 L51 85 L40 78 L29 85 L32 72 L22 64 L35 62 Z"
            fill="#FACC15"
            stroke="#4A2C2A"
            strokeWidth="3"
          />
          <path
            d="M240 45 L244 55 L255 57 L247 64 L249 75 L240 69 L231 75 L233 64 L225 57 L236 55 Z"
            fill="#FACC15"
            stroke="#4A2C2A"
            strokeWidth="3"
          />
          <circle cx="65" cy="30" r="6" fill="#F472B6" stroke="#4A2C2A" strokeWidth="2.5" />
          <circle cx="215" cy="28" r="6" fill="#34D399" stroke="#4A2C2A" strokeWidth="2.5" />
        </g>
      )}

      {/* Confused Question Marks */}
      {mood === 'confused' && (
        <g className="animate-pulse">
          <text
            x="32"
            y="75"
            fontSize="38"
            fontWeight="900"
            fill="#EF4444"
            stroke="#4A2C2A"
            strokeWidth="2"
          >
            ?
          </text>
          <text
            x="230"
            y="70"
            fontSize="32"
            fontWeight="900"
            fill="#F59E0B"
            stroke="#4A2C2A"
            strokeWidth="2"
          >
            ?
          </text>
        </g>
      )}

      {/* Back Hair Puff (Fluffy white/silver curls like the reference image) */}
      <path
        d="M55 155 C20 155, 25 105, 55 95 C45 55, 95 30, 140 35 C185 30, 235 55, 225 95 C255 105, 260 155, 225 155 Z"
        fill={characterType === 'nonna' ? '#F8FAFC' : '#78350F'}
        stroke="#4A2C2A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Coat / Shoulders */}
      <path
        d="M35 310 C40 225, 75 195, 140 195 C205 195, 240 225, 245 310 Z"
        fill={characterType === 'nonna' ? '#C8B29B' : '#3B82F6'}
        stroke="#4A2C2A"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Coat Seam Details */}
      <line x1="140" y1="225" x2="140" y2="310" stroke="#4A2C2A" strokeWidth="4" />
      <line x1="78" y1="255" x2="88" y2="310" stroke="#4A2C2A" strokeWidth="4" />
      <line x1="202" y1="255" x2="192" y2="310" stroke="#4A2C2A" strokeWidth="4" />

      {/* Fluffy Yellow Fur Collar (Direct nod to reference screenshot!) */}
      <path
        d="M68 185 C50 205, 62 245, 92 255 L112 290 L125 245 L140 255 L155 245 L168 290 L188 255 C218 245, 230 205, 212 185 C195 165, 85 165, 68 185 Z"
        fill={characterType === 'nonna' ? '#FDE047' : '#FCD34D'}
        stroke="#4A2C2A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Neck & Face */}
      <rect
        x="118"
        y="160"
        width="44"
        height="45"
        rx="15"
        fill="#FDE2D2"
        stroke="#4A2C2A"
        strokeWidth="4.5"
      />
      <path
        d="M90 100 C90 62, 190 62, 190 100 C190 155, 182 185, 140 185 C98 185, 90 155, 90 100 Z"
        fill="#FDE2D2"
        stroke="#4A2C2A"
        strokeWidth="5"
      />

      {/* Rosy Cheeks */}
      <ellipse
        cx="108"
        cy="135"
        rx="11"
        ry="7"
        fill={mood === 'sad' ? '#CBD5E1' : '#FCA5A5'}
        opacity="0.75"
      />
      <ellipse
        cx="172"
        cy="135"
        rx="11"
        ry="7"
        fill={mood === 'sad' ? '#CBD5E1' : '#FCA5A5'}
        opacity="0.75"
      />

      {/* Front Hair Sweeps */}
      <path
        d="M140 52 C110 52, 88 80, 82 115 C70 118, 60 132, 72 145 C84 140, 92 128, 95 112 C110 92, 128 78, 140 72 C152 78, 170 92, 185 112 C188 128, 196 140, 208 145 C220 132, 210 118, 198 115 C192 80, 170 52, 140 52 Z"
        fill={characterType === 'nonna' ? '#F8FAFC' : '#78350F'}
        stroke="#4A2C2A"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Eyebrows */}
      {mood === 'sad' ? (
        <>
          <path d="M108 102 L125 96" stroke="#4A2C2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M172 102 L155 96" stroke="#4A2C2A" strokeWidth="4" strokeLinecap="round" />
        </>
      ) : mood === 'confused' ? (
        <>
          <path d="M108 94 L125 98" stroke="#4A2C2A" strokeWidth="4" strokeLinecap="round" />
          <path d="M155 90 Q164 84 173 92" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M108 96 Q117 90 125 95" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M155 95 Q163 90 172 96" stroke="#4A2C2A" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* Eyes */}
      {mood === 'delighted' ? (
        <>
          <path d="M110 114 Q118 104 126 114" stroke="#4A2C2A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M154 114 Q162 104 170 114" stroke="#4A2C2A" strokeWidth="4.5" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="118" cy="113" r="5" fill="#4A2C2A" />
          <circle cx="162" cy="113" r="5" fill="#4A2C2A" />
          <circle cx="116" cy="111" r="1.8" fill="#FFFFFF" />
          <circle cx="160" cy="111" r="1.8" fill="#FFFFFF" />
        </>
      )}

      {/* Cute Button Nose */}
      <ellipse
        cx="140"
        cy="126"
        rx="7"
        ry="9"
        fill="#F4B8A4"
        stroke="#4A2C2A"
        strokeWidth="4"
      />

      {/* Mouth Expressions */}
      {mood === 'happy' && (
        <path
          d="M128 148 Q140 160 152 148"
          stroke="#4A2C2A"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {mood === 'delighted' && (
        <path
          d="M124 145 Q140 168 156 145 Z"
          fill="#EF4444"
          stroke="#4A2C2A"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {mood === 'waiting' && (
        <path
          d="M132 150 Q140 153 148 150"
          stroke="#4A2C2A"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {mood === 'confused' && (
        <circle
          cx="140"
          cy="152"
          r="6"
          fill="#4A2C2A"
        />
      )}
      {mood === 'sad' && (
        <path
          d="M126 158 Q140 144 154 158"
          stroke="#4A2C2A"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
};

// Layered Interactive Pizza Visualizer SVG
const PizzaVisualizerSVG = ({ baseId = 'margherita', decorators = [], size = 250 }) => {
  // Compute active toppings from base + decorators
  const baseObj = LEGACY_PIZZAS.find((p) => p.id === baseId) || LEGACY_PIZZAS[1];
  const hasBaseCheese = baseObj.toppings.includes('cheese');
  const hasBaseBasil = baseObj.toppings.includes('basil');
  const hasBasePepperoni = baseObj.toppings.includes('pepperoni');

  const mushroomCount = decorators.filter((d) => d.id === 'mushroom').length;
  const extraCheeseCount = decorators.filter((d) => d.id === 'cheese').length;
  const basilCount = decorators.filter((d) => d.id === 'basil').length + (hasBaseBasil ? 1 : 0);
  const oliveCount = decorators.filter((d) => d.id === 'olive').length;
  const pepperCount = decorators.filter((d) => d.id === 'pepper').length;

  // Coordinates around the pizza for toppings
  const ringCoords = [
    { x: 100, y: 60, r: -15 },
    { x: 145, y: 78, r: 25 },
    { x: 150, y: 128, r: 65 },
    { x: 112, y: 152, r: 120 },
    { x: 65, y: 135, r: -75 },
    { x: 62, y: 85, r: -40 },
    { x: 105, y: 105, r: 10 }
  ];

  const innerRingCoords = [
    { x: 82, y: 75, r: 20 },
    { x: 128, y: 68, r: -35 },
    { x: 138, y: 108, r: 45 },
    { x: 125, y: 142, r: -20 },
    { x: 85, y: 140, r: 15 },
    { x: 70, y: 108, r: -60 },
    { x: 108, y: 92, r: 5 }
  ];

  return (
    <svg
      viewBox="0 0 210 210"
      style={{ width: size, height: size }}
      className="drop-shadow-lg select-none transition-all duration-300"
    >
      {/* Wooden Pizza Peel / Pan */}
      <circle
        cx="105"
        cy="105"
        r="100"
        fill="#D97706"
        stroke="#4A2C2A"
        strokeWidth="5"
      />
      <circle
        cx="105"
        cy="105"
        r="92"
        fill="#B45309"
        stroke="#4A2C2A"
        strokeWidth="3"
        strokeDasharray="8 6"
      />

      {/* Golden Baked Pizza Crust */}
      <circle
        cx="105"
        cy="105"
        r="86"
        fill="#F59E0B"
        stroke="#4A2C2A"
        strokeWidth="5"
      />
      {/* Inner Crust Highlight */}
      <circle
        cx="105"
        cy="105"
        r="76"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="2"
      />

      {/* Rich Tomato Sauce Layer */}
      <circle
        cx="105"
        cy="105"
        r="72"
        fill="#DC2626"
        stroke="#4A2C2A"
        strokeWidth="4"
      />

      {/* Base Mozzarella Cheese Layer */}
      {hasBaseCheese && (
        <path
          d="M105 38 C135 36, 168 58, 170 98 C173 135, 148 168, 108 172 C68 174, 38 145, 40 105 C38 65, 70 40, 105 38 Z"
          fill="#FEF08A"
          stroke="#4A2C2A"
          strokeWidth="3.5"
        />
      )}

      {/* Extra Cheese Decorator Layer (Golden Melted Blobs) */}
      {extraCheeseCount > 0 && (
        <g className="animate-fadeIn">
          <circle cx="80" cy="78" r="18" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="132" cy="82" r="19" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="128" cy="130" r="20" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="78" cy="128" r="18" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="105" cy="105" r="22" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          {extraCheeseCount > 1 && (
            <>
              <circle cx="105" cy="60" r="14" fill="#FACC15" stroke="#4A2C2A" strokeWidth="2.5" />
              <circle cx="150" cy="106" r="14" fill="#FACC15" stroke="#4A2C2A" strokeWidth="2.5" />
              <circle cx="105" cy="150" r="14" fill="#FACC15" stroke="#4A2C2A" strokeWidth="2.5" />
              <circle cx="60" cy="106" r="14" fill="#FACC15" stroke="#4A2C2A" strokeWidth="2.5" />
            </>
          )}
        </g>
      )}

      {/* Pizza Slice Guide Lines */}
      <g opacity="0.22" stroke="#4A2C2A" strokeWidth="2">
        <line x1="105" y1="22" x2="105" y2="188" />
        <line x1="22" y1="105" x2="188" y2="105" />
        <line x1="46" y1="46" x2="164" y2="164" />
        <line x1="164" y1="46" x2="46" y2="164" />
      </g>

      {/* Base Pepperoni Slices */}
      {hasBasePepperoni &&
        innerRingCoords.map((pt, i) => (
          <g key={`pep-${i}`} transform={`translate(${pt.x}, ${pt.y})`}>
            <circle cx="0" cy="0" r="12" fill="#B91C1C" stroke="#4A2C2A" strokeWidth="3" />
            <circle cx="-4" cy="-3" r="2" fill="#FCA5A5" />
            <circle cx="4" cy="2" r="2.2" fill="#FCA5A5" />
            <circle cx="-1" cy="5" r="1.5" fill="#FCA5A5" />
          </g>
        ))}

      {/* Mushroom Decorator Slices */}
      {mushroomCount > 0 &&
        ringCoords.map((pt, i) => (
          <g
            key={`mush-${i}`}
            transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.r}) scale(${
              mushroomCount > 1 ? 1.15 : 1
            })`}
          >
            {/* Mushroom Cap + Stem */}
            <path
              d="M-11 0 C-11 -10, 11 -10, 11 0 L5 0 L5 9 L-5 9 L-5 0 Z"
              fill="#E7DDD3"
              stroke="#4A2C2A"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M-7 -2 Q0 -7 7 -2" stroke="#A89078" strokeWidth="2" fill="none" />
          </g>
        ))}

      {/* Black Olive Decorator Rings */}
      {oliveCount > 0 &&
        innerRingCoords.slice(0, 6).map((pt, i) => (
          <g key={`olive-${i}`} transform={`translate(${pt.x + 6}, ${pt.y - 5})`}>
            <circle cx="0" cy="0" r="8" fill="#1E293B" stroke="#4A2C2A" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="3" fill="#FEF08A" stroke="#4A2C2A" strokeWidth="1.5" />
          </g>
        ))}

      {/* Spicy Red/Green Peppers Decorator */}
      {pepperCount > 0 &&
        ringCoords.slice(0, 6).map((pt, i) => (
          <g
            key={`pepper-${i}`}
            transform={`translate(${pt.x - 8}, ${pt.y + 8}) rotate(${pt.r + 45})`}
          >
            <path
              d="M-9 -3 Q0 -9 9 -3 Q4 4 -9 -3 Z"
              fill="#EF4444"
              stroke="#4A2C2A"
              strokeWidth="2.5"
            />
            <circle cx="0" cy="-3" r="1.5" fill="#FDE047" />
          </g>
        ))}

      {/* Fresh Basil Leaves (Base Margherita or BasilDecorator) */}
      {basilCount > 0 &&
        [
          { x: 88, y: 88, r: -25 },
          { x: 125, y: 90, r: 35 },
          { x: 105, y: 126, r: 80 },
          ...(basilCount > 1
            ? [
                { x: 75, y: 112, r: -65 },
                { x: 132, y: 118, r: 15 },
                { x: 105, y: 68, r: 5 }
              ]
            : [])
        ].map((pt, i) => (
          <g key={`basil-${i}`} transform={`translate(${pt.x}, ${pt.y}) rotate(${pt.r})`}>
            <path
              d="M-10 0 Q0 -10 10 0 Q0 10 -10 0 Z"
              fill="#22C55E"
              stroke="#4A2C2A"
              strokeWidth="2.8"
            />
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#14532D" strokeWidth="1.8" />
          </g>
        ))}
    </svg>
  );
};

// Cozy Counter Props: Eggplant Plant + Cash Register + POS Tablet Stand
const EggplantPotSVG = ({ onClick }) => (
  <svg
    onClick={onClick}
    viewBox="0 0 130 165"
    className="w-24 h-32 md:w-28 md:h-36 cursor-pointer hover:scale-105 transition-transform select-none drop-shadow"
    title="Click the lucky shop eggplant!"
  >
    {/* Leaves */}
    <path
      d="M65 82 C35 65, 20 35, 38 22 C55 25, 65 55, 65 82 Z"
      fill="#65A30D"
      stroke="#4A2C2A"
      strokeWidth="4"
    />
    <path
      d="M65 82 C95 65, 110 35, 92 22 C75 25, 65 55, 65 82 Z"
      fill="#84CC16"
      stroke="#4A2C2A"
      strokeWidth="4"
    />
    <path
      d="M65 85 C65 50, 50 15, 65 8 C80 15, 65 50, 65 85 Z"
      fill="#4D7C0F"
      stroke="#4A2C2A"
      strokeWidth="4"
    />
    {/* Cute Hanging Eggplants (Just like Good Pizza Great Pizza!) */}
    <ellipse
      cx="48"
      cy="75"
      rx="13"
      ry="22"
      transform="rotate(14 48 75)"
      fill="#5B21B6"
      stroke="#4A2C2A"
      strokeWidth="4"
    />
    <ellipse
      cx="82"
      cy="72"
      rx="13"
      ry="21"
      transform="rotate(-14 82 72)"
      fill="#6D28D9"
      stroke="#4A2C2A"
      strokeWidth="4"
    />
    {/* Terracotta Pot */}
    <polygon
      points="36,102 94,102 86,158 44,158"
      fill="#9A6B56"
      stroke="#4A2C2A"
      strokeWidth="4.5"
      strokeLinejoin="round"
    />
    <rect
      x="30"
      y="90"
      width="70"
      height="15"
      rx="4"
      fill="#B07D66"
      stroke="#4A2C2A"
      strokeWidth="4.5"
    />
  </svg>
);

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
export default function App() {
  // Core Game State
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState(1);
  const [score, setScore] = useState(120.0);
  const [satisfaction, setSatisfaction] = useState(100);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [customerMood, setCustomerMood] = useState('happy');
  const [eggplantClicks, setEggplantClicks] = useState(0);

  // Level 1 State
  const [lvl1Step, setLvl1Step] = useState('greeting'); // 'greeting' | 'what_asked' | 'pos_open' | 'limitation_found'
  const [selectedLegacyPizza, setSelectedLegacyPizza] = useState(null);

  // Level 2 State
  const [lvl2Outcome, setLvl2Outcome] = useState(null); // null | 'A' | 'B' | 'C'
  const [lvl2Attempts, setLvl2Attempts] = useState(0);

  // Level 3 State (Tablet Learning Hub)
  const [lvl3Tab, setLvl3Tab] = useState('overview'); // 'overview' | 'uml' | 'code' | 'ready'
  const [selectedUmlClass, setSelectedUmlClass] = useState('PizzaDecorator');
  const [traceStep, setTraceStep] = useState(0);
  const [isAutoPlayingTrace, setIsAutoPlayingTrace] = useState(false);

  // Level 4 State (Coding Challenge)
  const [codeBlanks, setCodeBlanks] = useState({
    blank1: '',
    blank2: '',
    blank3: '',
    blank4: ''
  });
  const [activeBlankSlot, setActiveBlankSlot] = useState('blank1');
  const [conceptAnswer, setConceptAnswer] = useState(null);
  const [lvl4Feedback, setLvl4Feedback] = useState(null);
  const [lvl4Success, setLvl4Success] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Level 5 State (Live Pizza Shop Simulator)
  const [simBasePizza, setSimBasePizza] = useState('margherita');
  const [simDecorators, setSimDecorators] = useState([]);
  const [customerOrderIndex, setCustomerOrderIndex] = useState(0);
  const [orderServedState, setOrderServedState] = useState(null); // null | 'wrong' | 'success'

  // Customer Orders for Level 5 (Main order + optional bonus orders)
  const CUSTOMER_ORDERS = [
    {
      id: 1,
      customerName: 'Nonna Rosa',
      characterType: 'nonna',
      dialogue:
        '"Hi again dear! Now that you upgraded your POS with the Decorator Pattern, can I get a Margherita pizza wrapped with extra Mushrooms, please?"',
      requiredBase: 'margherita',
      requiredToppings: ['mushroom'],
      tip: 6.5
    },
    {
      id: 2,
      customerName: 'Chef Marco (Bonus Customer)',
      characterType: 'marco',
      dialogue:
        '"Bellissimo! I heard your decorators can stack dynamically at runtime! Could I get a Pepperoni pizza wrapped with Mushrooms AND Extra Cheese?"',
      requiredBase: 'pepperoni',
      requiredToppings: ['mushroom', 'cheese'],
      tip: 10.0
    }
  ];

  // Auto-play Execution Trace Timer in Level 3
  useEffect(() => {
    if (!isAutoPlayingTrace) return;
    const timer = setInterval(() => {
      setTraceStep((prev) => {
        if (prev >= TRACE_STEPS.length - 1) {
          setIsAutoPlayingTrace(false);
          return prev;
        }
        sfx.step();
        return prev + 1;
      });
    }, 2200);
    return () => clearInterval(timer);
  }, [isAutoPlayingTrace]);

  // Toggle sound helper
  const toggleSound = () => {
    sfx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) sfx.pop();
  };

  // Toggle background music helper
  const toggleMusic = () => {
    const isNowPlaying = bgm.toggle();
    setMusicEnabled(isNowPlaying);
  };

  // Cleanup music when component unmounts
  useEffect(() => {
    return () => {
      bgm.stop();
    };
  }, []);

  // Navigate to a level
  const goToLevel = (lvl) => {
    sfx.click();
    setCurrentLevel(lvl);
    if (lvl > maxUnlockedLevel) setMaxUnlockedLevel(lvl);
    if (lvl === 1) {
      setCustomerMood('happy');
    } else if (lvl === 5) {
      setCustomerMood('happy');
      setOrderServedState(null);
    }
  };

  // Unlock & Advance helper
  const unlockAndAdvance = (nextLvl, rewardCash = 0, satDelta = 0) => {
    sfx.success();
    if (rewardCash > 0) setScore((prev) => +(prev + rewardCash).toFixed(2));
    if (satDelta !== 0) {
      setSatisfaction((prev) => Math.max(0, Math.min(100, prev + satDelta)));
    }
    if (nextLvl > maxUnlockedLevel) setMaxUnlockedLevel(nextLvl);
    setCurrentLevel(nextLvl);
  };

  // Reset full game
  const resetFullGame = () => {
    sfx.pop();
    setCurrentLevel(1);
    setMaxUnlockedLevel(1);
    setScore(120.0);
    setSatisfaction(100);
    setCustomerMood('happy');
    setLvl1Step('greeting');
    setSelectedLegacyPizza(null);
    setLvl2Outcome(null);
    setLvl2Attempts(0);
    setLvl3Tab('overview');
    setTraceStep(0);
    setCodeBlanks({ blank1: '', blank2: '', blank3: '', blank4: '' });
    setActiveBlankSlot('blank1');
    setConceptAnswer(null);
    setLvl4Feedback(null);
    setLvl4Success(false);
    setSimBasePizza('margherita');
    setSimDecorators([]);
    setCustomerOrderIndex(0);
    setOrderServedState(null);
  };

  // ============================================================================
  // LEVEL 4 VALIDATION LOGIC
  // ============================================================================
  const EXPECTED_BLANKS = {
    blank1: 'PizzaDecorator',
    blank2: 'Pizza',
    blank3: 'super(pizza)',
    blank4: 'super.getDescription()'
  };

  const handleSelectCodeToken = (token) => {
    sfx.pop();
    setLvl4Feedback(null);
    const updated = { ...codeBlanks, [activeBlankSlot]: token };
    setCodeBlanks(updated);

    // Auto-advance to next empty slot
    const slots = ['blank1', 'blank2', 'blank3', 'blank4'];
    const nextEmpty = slots.find((s) => !updated[s]);
    if (nextEmpty) setActiveBlankSlot(nextEmpty);
  };

  const validateLevel4 = () => {
    const b1Ok = codeBlanks.blank1 === EXPECTED_BLANKS.blank1;
    const b2Ok = codeBlanks.blank2 === EXPECTED_BLANKS.blank2;
    const b3Ok = codeBlanks.blank3 === EXPECTED_BLANKS.blank3;
    const b4Ok = codeBlanks.blank4 === EXPECTED_BLANKS.blank4;
    const conceptOk = conceptAnswer === 'delegate';

    if (b1Ok && b2Ok && b3Ok && b4Ok && conceptOk) {
      sfx.cashRegister();
      setLvl4Success(true);
      setLvl4Feedback({
        type: 'success',
        title: 'Compilation Succeeded! All Tests Passed!',
        message:
          'Spot on! MushroomDecorator extends PizzaDecorator, passes the wrapped Pizza reference to super(pizza), and calls super.getDescription() to delegate inward before appending ", Mushrooms".'
      });
      if (maxUnlockedLevel < 5) {
        setScore((s) => +(s + 75).toFixed(2));
        setSatisfaction((sat) => Math.min(100, sat + 10));
        setMaxUnlockedLevel(5);
      }
    } else {
      sfx.error();
      let errorHints = [];
      if (!b1Ok)
        errorHints.push(
          'Slot [1]: Concrete decorators must inherit from the abstract decorator class (`PizzaDecorator`).'
        );
      if (!b2Ok)
        errorHints.push(
          'Slot [2]: The constructor parameter must accept the general `Pizza` interface so it can wrap ANY pizza or topping!'
        );
      if (!b3Ok)
        errorHints.push(
          'Slot [3]: Pass the `pizza` reference up to `PizzaDecorator` using `super(pizza)`.'
        );
      if (!b4Ok)
        errorHints.push(
          'Slot [4]: Call `super.getDescription()` to ask the parent decorator (and its wrapped pizza) for the description so far.'
        );
      if (!conceptOk)
        errorHints.push(
          'Conceptual Check: Remember that `super.getDescription()` invokes `PizzaDecorator.getDescription()`, which delegates to the wrapped `pizza.getDescription()` object!'
        );

      setLvl4Feedback({
        type: 'error',
        title: 'Almost there! Check these details:',
        details: errorHints
      });
    }
  };

  // ============================================================================
  // LEVEL 5 SIMULATOR HELPERS
  // ============================================================================
  const currentBaseObj =
    LEGACY_PIZZAS.find((p) => p.id === simBasePizza) || LEGACY_PIZZAS[1];

  const simTotalCost =
    currentBaseObj.price +
    simDecorators.reduce((sum, item) => sum + item.price, 0);

  const simDescription = [
    currentBaseObj.displayName,
    ...simDecorators.map((d) => d.descAdd)
  ].join(', ');

  // Build dynamic Java instantiation string e.g. new CheeseDecorator(new MushroomDecorator(new Margherita()))
  const buildJavaWrapperCode = () => {
    let inner = `new ${currentBaseObj.name}()`;
    simDecorators.forEach((dec) => {
      inner = `new ${dec.className}(${inner})`;
    });
    return `Pizza order = ${inner};`;
  };

  const addToppingDecorator = (topping) => {
    if (simDecorators.length >= 6) return;
    sfx.pop();
    setOrderServedState(null);
    setSimDecorators((prev) => [
      ...prev,
      { ...topping, instanceId: `${topping.id}-${Date.now()}-${Math.random()}` }
    ]);
  };

  const removeToppingAt = (index) => {
    sfx.click();
    setOrderServedState(null);
    setSimDecorators((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleServePizza = () => {
    const activeOrder = CUSTOMER_ORDERS[customerOrderIndex];
    const baseMatches = simBasePizza === activeOrder.requiredBase;
    const hasAllRequiredToppings = activeOrder.requiredToppings.every((reqId) =>
      simDecorators.some((d) => d.id === reqId)
    );

    if (baseMatches && hasAllRequiredToppings) {
      sfx.cashRegister();
      setCustomerMood('delighted');
      setOrderServedState('success');
      setScore((prev) => +(prev + simTotalCost + activeOrder.tip).toFixed(2));
      setSatisfaction(100);
      if (maxUnlockedLevel < 6) setMaxUnlockedLevel(6);
    } else {
      sfx.error();
      setCustomerMood('confused');
      setOrderServedState('wrong');
    }
  };

  // ============================================================================
  // RENDER TOP HUD BAR (GOOD PIZZA, GREAT PIZZA STYLE)
  // ============================================================================
  const renderTopHUD = () => {
    const LEVEL_NAMES = [
      { id: 1, short: '1. Order' },
      { id: 2, short: '2. Design' },
      { id: 3, short: '3. Learn' },
      { id: 4, short: '4. Code' },
      { id: 5, short: '5. Kitchen' },
      { id: 6, short: '6. Summary' }
    ];

    return (
      <header className="w-full bg-[#5B3733] border-b-4 border-[#4A2C2A] px-3 py-2 text-[#FFF8E7] shadow-md z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Shop Brand & Day */}
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDE047] border-3 border-[#4A2C2A] flex items-center justify-center shadow-inner">
              <Utensils className="w-5 h-5 text-[#4A2C2A]" />
            </div>
            <div className="bg-[#3E2422] border-2 border-[#4A2C2A] rounded-lg px-3 py-1 flex items-center gap-2">
              <span className="text-amber-300 font-black tracking-wide text-sm md:text-base">
                EduPlay Pizza
              </span>
              <span className="text-xs bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded border border-amber-400/30 font-bold">
                DAY 1 • 12:00 PM
              </span>
            </div>

            {/* Satisfaction Badge */}
            <div className="bg-[#3E2422] border-2 border-[#4A2C2A] rounded-lg px-3 py-1 flex items-center gap-1.5">
              {satisfaction >= 80 ? (
                <Smile className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
              ) : satisfaction >= 40 ? (
                <Meh className="w-5 h-5 text-amber-400" />
              ) : (
                <Frown className="w-5 h-5 text-red-400" />
              )}
              <span
                className={`font-black text-sm ${
                  satisfaction >= 80
                    ? 'text-emerald-300'
                    : satisfaction >= 40
                    ? 'text-amber-300'
                    : 'text-red-400'
                }`}
              >
                {satisfaction}%
              </span>
            </div>

            {/* Cash Counter */}
            <div className="bg-[#FFF8E7] text-[#4A2C2A] border-2 border-[#4A2C2A] rounded-lg px-3 py-1 flex items-center gap-1.5 font-black text-sm shadow-sm">
              <span className="bg-emerald-500 text-white px-1.5 py-0.2 rounded text-xs border border-[#4A2C2A]">
                $
              </span>
              <span>{score.toFixed(2)}</span>
            </div>
          </div>

          {/* Center/Right: Level Stepper & Controls */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {LEVEL_NAMES.map((lvl) => {
              const isCurrent = currentLevel === lvl.id;
              const isUnlocked = lvl.id <= maxUnlockedLevel;
              return (
                <button
                  key={lvl.id}
                  onClick={() => goToLevel(lvl.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black border-2 border-[#4A2C2A] transition-all flex items-center gap-1 whitespace-nowrap ${
                    isCurrent
                      ? 'bg-[#FACC15] text-[#4A2C2A] -translate-y-0.5 shadow-[0_2px_0_#4A2C2A]'
                      : isUnlocked
                      ? 'bg-[#FFF8E7] text-[#4A2C2A] hover:bg-amber-100'
                      : 'bg-[#462926] text-amber-100/70 hover:bg-[#52312E] hover:text-white'
                  }`}
                  title="Click to jump to any level (Demo Mode Active)"
                >
                  {lvl.id < maxUnlockedLevel && (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  )}
                  <span>{lvl.short}</span>
                </button>
              );
            })}

            {/* Background Music Toggle */}
            <button
              onClick={toggleMusic}
              className={`ml-1.5 px-2 py-1.5 rounded-lg border-2 border-[#4A2C2A] transition-all flex items-center gap-1.5 text-xs font-black active:translate-y-0.5 ${
                musicEnabled
                  ? 'bg-emerald-400 text-[#4A2C2A] shadow-[0_2px_0_#4A2C2A]'
                  : 'bg-[#FFF8E7] text-[#4A2C2A] hover:bg-amber-100 opacity-90'
              }`}
              title={musicEnabled ? 'Pause Cozy Background Music' : 'Play Cozy Background Music'}
            >
              <Music className={`w-4 h-4 ${musicEnabled ? 'animate-bounce text-[#4A2C2A]' : ''}`} />
              <span className="hidden sm:inline">{musicEnabled ? 'Music: ON 🎵' : 'Music: OFF'}</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="ml-1 p-1.5 rounded-lg bg-[#FFF8E7] text-[#4A2C2A] border-2 border-[#4A2C2A] hover:bg-amber-100 active:translate-y-0.5"
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>
    );
  };

  // ============================================================================
  // LEVEL 1: THE CUSTOMER'S REQUEST (COUNTER VIEW + RIGID LEGACY POS)
  // ============================================================================
  const renderLevel1 = () => {
    return (
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Main Counter Stage */}
        <div className="relative rounded-3xl border-4 border-[#4A2C2A] overflow-hidden shadow-2xl bg-[#FCE7D2] min-h-[560px] flex flex-col justify-between">
          {/* Background Shop Wall, Windows & Checkered Dining Area */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Warm Yellow Wallpaper */}
            <div className="absolute inset-0 bg-[#FDE68A]" />
            {/* Left & Right Wallpaper Panels */}
            <div className="absolute inset-y-0 left-0 w-24 bg-[#F59E0B]/30 border-r-4 border-[#4A2C2A]" />
            <div className="absolute inset-y-0 right-0 w-24 bg-[#F59E0B]/30 border-l-4 border-[#4A2C2A]" />

            {/* Shop Window Center */}
            <div className="absolute top-0 left-24 right-24 h-60 bg-[#FEF3C7] border-b-4 border-[#4A2C2A] flex justify-around items-start pt-4">
              {/* Hanging Cozy Lights */}
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-[#4A2C2A]" />
                <div className="w-10 h-5 rounded-t-full bg-[#F59E0B] border-3 border-[#4A2C2A]" />
                <div className="w-4 h-2 rounded-b-full bg-yellow-200" />
              </div>
              <div className="px-5 py-2 rounded-2xl bg-red-100 border-3 border-[#4A2C2A] rotate-[-2deg] shadow-sm mt-2 hidden sm:block">
                <p className="text-xs font-black text-[#4A2C2A] tracking-widest uppercase">
                  🍕 Fresh Brick-Oven Pizza • Legacy POS v1.0
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-1 h-8 bg-[#4A2C2A]" />
                <div className="w-10 h-5 rounded-t-full bg-[#F59E0B] border-3 border-[#4A2C2A]" />
                <div className="w-4 h-2 rounded-b-full bg-yellow-200" />
              </div>
            </div>

            {/* Perspective Checkered Dining Floor */}
            <div
              className="absolute left-0 right-0 bottom-28 h-48 border-t-4 border-[#4A2C2A]"
              style={{
                backgroundImage:
                  'conic-gradient(#FECDD3 90deg, #FFF1F2 90deg 180deg, #FECDD3 180deg 270deg, #FFF1F2 270deg)',
                backgroundSize: '48px 48px'
              }}
            />

            {/* Cozy Red Dining Tables in Background */}
            <div className="absolute bottom-36 left-1/3 hidden md:flex items-end gap-2">
              <div className="w-6 h-16 bg-[#78350F] border-2 border-[#4A2C2A] rounded-t" />
              <div className="w-28 h-12 bg-[#F87171] border-3 border-[#4A2C2A] rounded-lg shadow flex flex-col items-center">
                <div className="w-5 h-5 -mt-4 rounded-full bg-emerald-500 border-2 border-[#4A2C2A]" />
              </div>
              <div className="w-6 h-16 bg-[#78350F] border-2 border-[#4A2C2A] rounded-t" />
            </div>
          </div>

          {/* Interactive Scene Content: Customer + Speech Bubble + Legacy POS */}
          <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 md:p-6 items-end">
            {/* Left Column: Customer Character at Counter */}
            <div className="lg:col-span-5 flex flex-col items-center justify-end relative pt-4">
              <div className="w-56 h-60 md:w-64 md:h-68 -mb-6 z-10">
                <CustomerSVG mood={customerMood} characterType="nonna" />
              </div>
              <div className="bg-[#4A2C2A] text-[#FFF8E7] text-xs font-black px-3 py-1 rounded-full z-20 mb-2 shadow">
                Nonna Rosa • Regular Patron
              </div>
            </div>

            {/* Right Column: Pastel Speech Bubble & Legacy POS Menu */}
            <div className="lg:col-span-7 flex flex-col justify-center gap-4 z-20 pb-4">
              {/* Speech Bubble (Styled like Good Pizza Great Pizza!) */}
              <div className="relative bg-[#FFD6E0] border-4 border-[#4A2C2A] rounded-3xl p-5 md:p-6 shadow-[0_6px_0_#4A2C2A]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-[#4A2C2A] text-[#FFD6E0] px-2.5 py-0.5 rounded-full">
                    Level 1 • Customer Order
                  </span>
                  <span className="text-xs font-bold text-[#4A2C2A]/80">Order #101</span>
                </div>

                <p className="text-lg md:text-2xl font-black text-[#4A2C2A] leading-snug">
                  {lvl1Step === 'what_asked'
                    ? '"Oh, sorry dear! I want a classic Margherita pizza, and please add extra Mushrooms on top!"'
                    : '"Hi! I\'d like a Margherita pizza with extra mushrooms, please!"'}
                </p>

                {/* Okay / What? Tactile Cartoon Buttons */}
                {lvl1Step === 'greeting' || lvl1Step === 'what_asked' ? (
                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => {
                        sfx.pop();
                        setLvl1Step('pos_open');
                      }}
                      className="px-7 py-3 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-lg border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                    >
                      <span>Okay! (Open POS Menu)</span>
                      <ChevronRight className="w-5 h-5 stroke-[3]" />
                    </button>

                    {lvl1Step === 'greeting' && (
                      <button
                        onClick={() => {
                          sfx.click();
                          setCustomerMood('waiting');
                          setLvl1Step('what_asked');
                        }}
                        className="px-6 py-3 rounded-2xl bg-[#FFF8E7] hover:bg-amber-50 text-[#4A2C2A] font-black text-lg border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] active:translate-y-1 active:shadow-none transition-all"
                      >
                        What?
                      </button>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Legacy Hardcoded POS Register Drawer (Revealed when player clicks Okay) */}
              {(lvl1Step === 'pos_open' || lvl1Step === 'limitation_found') && (
                <div className="bg-[#FFF8E7] border-4 border-[#4A2C2A] rounded-3xl p-5 shadow-[0_6px_0_#4A2C2A] animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-[#4A2C2A]/20">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-red-600" />
                      <h3 className="font-black text-[#4A2C2A] text-base md:text-lg">
                        Legacy POS Register (Predefined Classes Only)
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-red-100 text-red-800 border-2 border-red-800 px-2.5 py-0.5 rounded-full">
                      No Topping Customizer Found!
                    </span>
                  </div>

                  <p className="text-sm font-bold text-[#4A2C2A]/80 mb-3">
                    Try selecting <span className="underline">Margherita</span> or adding{' '}
                    <span className="underline">+ Mushrooms</span> to fulfill Nonna Rosa&apos;s order:
                  </p>

                  {/* 3 Rigid Pizza Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {LEGACY_PIZZAS.map((pizza) => {
                      const isSelected = selectedLegacyPizza === pizza.id;
                      return (
                        <button
                          key={pizza.id}
                          onClick={() => {
                            sfx.error();
                            setSelectedLegacyPizza(pizza.id);
                            setCustomerMood('confused');
                            setLvl1Step('limitation_found');
                          }}
                          className={`p-3 rounded-2xl border-3 border-[#4A2C2A] text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-200 shadow-inner translate-y-0.5'
                              : 'bg-white hover:bg-amber-50 shadow-[0_3px_0_#4A2C2A]'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-black text-[#4A2C2A] text-base">
                                {pizza.displayName}
                              </span>
                              <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg border border-[#4A2C2A] text-xs">
                                ${pizza.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-xs text-[#4A2C2A]/80 font-medium mt-1">
                              {pizza.desc}
                            </p>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-[#4A2C2A]/15 flex items-center justify-between text-[11px] font-mono text-[#4A2C2A]/70">
                            <span>new {pizza.name}()</span>
                            <span className="text-red-600 font-bold">Fixed</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Disabled / Missing Add Toppings Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-red-50 border-3 border-dashed border-red-400 rounded-2xl p-3">
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                      <div className="text-xs md:text-sm text-[#4A2C2A]">
                        <span className="font-black text-red-700">
                          Employee Realization:
                        </span>{' '}
                        {lvl1Step === 'limitation_found'
                          ? 'Wait... our codebase only has hardcoded classes (`BasicPizza`, `Margherita`, `Pepperoni`). There is NO method or wrapper to dynamically add Mushrooms!'
                          : 'Click any pizza above or attempt to add mushrooms to inspect the system limitation.'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        sfx.error();
                        setCustomerMood('confused');
                        setLvl1Step('limitation_found');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gray-200 text-gray-600 border-2 border-gray-500 font-black text-xs flex items-center gap-1.5 hover:bg-red-100 hover:text-red-800 hover:border-red-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Try &quot;+ Extra Mushrooms&quot;</span>
                    </button>
                  </div>

                  {/* Advance to Level 2 Button once limitation is discovered */}
                  {lvl1Step === 'limitation_found' && (
                    <div className="mt-4 pt-3 border-t-2 border-[#4A2C2A]/20 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                      <div className="text-xs font-bold text-[#4A2C2A] bg-amber-100 px-3 py-1.5 rounded-xl border-2 border-[#4A2C2A]">
                        💡 Architectural Problem Found: Hardcoded classes cannot be customized at runtime!
                      </div>
                      <button
                        onClick={() => unlockAndAdvance(2, 0, 0)}
                        className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-[#4A2C2A] font-black text-base border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
                      >
                        <span>Level 2: Choose Your Solution</span>
                        <ArrowRight className="w-5 h-5 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Foreground Counter Surface with Vintage Register, Eggplant Pot & POS Tablet */}
          <div className="relative z-20 h-28 bg-[#E5E0D8] border-t-4 border-[#4A2C2A] px-6 flex items-end justify-between shadow-inner">
            {/* Left: Vintage Cash Register */}
            <div className="flex items-end gap-4 -mb-1">
              <div className="w-28 h-24 bg-[#6D4C41] border-4 border-[#4A2C2A] rounded-t-2xl p-2 flex flex-col justify-between shadow-md">
                <div className="bg-[#1E293B] border-2 border-[#4A2C2A] rounded px-2 py-1 text-right font-mono text-xs text-emerald-400 font-bold">
                  {selectedLegacyPizza
                    ? `$${LEGACY_PIZZAS.find((p) => p.id === selectedLegacyPizza)?.price.toFixed(2)}`
                    : '$0.00'}
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
                    <div key={k} className="h-2 bg-amber-200 rounded-sm border border-[#4A2C2A]" />
                  ))}
                </div>
              </div>
              {/* Parmesan Shaker */}
              <div className="w-8 h-14 bg-amber-100 border-3 border-[#4A2C2A] rounded-t-lg hidden sm:flex flex-col overflow-hidden">
                <div className="h-3 bg-slate-300 border-b-2 border-[#4A2C2A]" />
                <div className="flex-1 bg-yellow-300/70 mt-2" />
              </div>
            </div>

            {/* Center-Right: Lucky Eggplant Plant & Interactive POS Tablet */}
            <div className="flex items-end gap-4 -mb-1">
              <div className="relative">
                <EggplantPotSVG
                  onClick={() => {
                    sfx.pop();
                    setEggplantClicks((c) => c + 1);
                  }}
                />
                {eggplantClicks > 0 && (
                  <span className="absolute -top-2 right-0 bg-purple-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-[#4A2C2A] animate-bounce">
                    🍆 +{eggplantClicks}
                  </span>
                )}
              </div>

              {/* Pink Cat-Ear POS Tablet on Counter (Direct nod to reference image!) */}
              <div
                onClick={() => {
                  sfx.pop();
                  setLvl1Step('pos_open');
                }}
                className="w-28 h-32 bg-pink-200 border-4 border-[#4A2C2A] rounded-t-2xl p-2 cursor-pointer hover:-translate-y-1 transition-transform shadow-md flex flex-col justify-between"
                title="POS Tablet"
              >
                <div className="flex-1 bg-sky-100 border-2 border-[#4A2C2A] rounded-lg flex flex-col items-center justify-center p-1 text-center">
                  <Code2 className="w-6 h-6 text-[#4A2C2A]" />
                  <span className="text-[10px] font-black text-[#4A2C2A] leading-tight mt-1">
                    POS Terminal
                  </span>
                </div>
                <div className="w-3 h-3 rounded-full bg-white border-2 border-[#4A2C2A] mx-auto mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // LEVEL 2: CHOOSE YOUR SOLUTION (ARCHITECTURAL DECISION & OUTCOMES)
  // ============================================================================
  const renderLevel2 = () => {
    const handleChoice = (choice) => {
      setLvl2Attempts((a) => a + 1);
      setLvl2Outcome(choice);

      if (choice === 'A') {
        sfx.error();
        setSatisfaction(0);
        setCustomerMood('sad');
      } else if (choice === 'B') {
        sfx.error();
        setSatisfaction((prev) => Math.max(25, prev - 20));
        setCustomerMood('confused');
      } else if (choice === 'C') {
        sfx.cashRegister();
        setSatisfaction(100);
        setCustomerMood('delighted');
        if (maxUnlockedLevel < 3) {
          setScore((prev) => +(prev + 50).toFixed(2));
          setMaxUnlockedLevel(3);
        }
      }
    };

    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="rounded-3xl border-4 border-[#4A2C2A] bg-[#FFF8E7] shadow-2xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#FFD6E0] border-b-4 border-[#4A2C2A] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-[#FFF8E7] border-4 border-[#4A2C2A] overflow-hidden shrink-0 shadow">
                <CustomerSVG
                  mood={
                    lvl2Outcome === 'A'
                      ? 'sad'
                      : lvl2Outcome === 'B'
                      ? 'confused'
                      : lvl2Outcome === 'C'
                      ? 'delighted'
                      : 'waiting'
                  }
                />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
                  Level 2 • Architectural Decision
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-[#4A2C2A] mt-1">
                  How would you solve this problem?
                </h2>
                <p className="text-sm font-bold text-[#4A2C2A]/80">
                  Nonna Rosa wants a Margherita with extra mushrooms, and future customers will want dozens of topping combinations!
                </p>
              </div>
            </div>
          </div>

          {/* 3 Interactive Solution Cards */}
          <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Choice A */}
            <div
              onClick={() => handleChoice('A')}
              className={`cursor-pointer rounded-3xl border-4 border-[#4A2C2A] p-5 flex flex-col justify-between transition-all ${
                lvl2Outcome === 'A'
                  ? 'bg-red-100 ring-4 ring-red-400 -translate-y-1'
                  : 'bg-white hover:bg-amber-50 hover:-translate-y-1 shadow-[0_6px_0_#4A2C2A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-red-200 border-3 border-[#4A2C2A] font-black text-xl text-[#4A2C2A] flex items-center justify-center">
                    A
                  </span>
                  <span className="text-xs font-black uppercase text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-300">
                    Zero Effort
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#4A2C2A] mb-2">
                  Tell the customer that customization is not supported.
                </h3>
                <p className="text-sm text-[#4A2C2A]/80 font-medium">
                  Keep the hardcoded 3-class system as-is and refuse any special topping requests.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20">
                <div className="bg-slate-100 rounded-xl p-2.5 font-mono text-xs text-slate-700 border border-slate-300">
                  throw new UnsupportedToppingException(&quot;No mushrooms allowed!&quot;);
                </div>
              </div>
            </div>

            {/* Choice B */}
            <div
              onClick={() => handleChoice('B')}
              className={`cursor-pointer rounded-3xl border-4 border-[#4A2C2A] p-5 flex flex-col justify-between transition-all ${
                lvl2Outcome === 'B'
                  ? 'bg-amber-100 ring-4 ring-amber-400 -translate-y-1'
                  : 'bg-white hover:bg-amber-50 hover:-translate-y-1 shadow-[0_6px_0_#4A2C2A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-amber-200 border-3 border-[#4A2C2A] font-black text-xl text-[#4A2C2A] flex items-center justify-center">
                    B
                  </span>
                  <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                    Brute-Force Inheritance
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#4A2C2A] mb-2">
                  Create a separate class for every possible pizza combination.
                </h3>
                <p className="text-sm text-[#4A2C2A]/80 font-medium">
                  Subclass `MargheritaWithMushrooms`, `MargheritaWithCheese`, `MargheritaWithMushroomsAndCheese`, etc.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20">
                <div className="bg-slate-100 rounded-xl p-2.5 font-mono text-xs text-slate-700 border border-slate-300">
                  class MargheritaWithMushrooms extends Margherita &#123; ... &#125;
                </div>
              </div>
            </div>

            {/* Choice C */}
            <div
              onClick={() => handleChoice('C')}
              className={`cursor-pointer rounded-3xl border-4 border-[#4A2C2A] p-5 flex flex-col justify-between transition-all ${
                lvl2Outcome === 'C'
                  ? 'bg-emerald-100 ring-4 ring-emerald-400 -translate-y-1'
                  : 'bg-white hover:bg-amber-50 hover:-translate-y-1 shadow-[0_6px_0_#4A2C2A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-300 border-3 border-[#4A2C2A] font-black text-xl text-[#4A2C2A] flex items-center justify-center">
                    C
                  </span>
                  <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                    Composition & Wrapping
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#4A2C2A] mb-2">
                  Redesign the system to support dynamically adding toppings using the Decorator Pattern.
                </h3>
                <p className="text-sm text-[#4A2C2A]/80 font-medium">
                  Wrap any base `Pizza` object inside topping decorators at runtime without altering existing classes.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20">
                <div className="bg-slate-100 rounded-xl p-2.5 font-mono text-xs text-emerald-800 font-bold border border-emerald-300">
                  new MushroomDecorator(new Margherita());
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Outcome Panel */}
          {lvl2Outcome === 'A' && (
            <div className="mx-5 md:mx-8 mb-8 p-6 rounded-3xl bg-red-100 border-4 border-[#4A2C2A] shadow-lg animate-fadeIn">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-red-500 text-white border-3 border-[#4A2C2A] shrink-0">
                    <Frown className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase bg-red-600 text-white px-2.5 py-0.5 rounded-full">
                      GAME OVER • Customer Satisfaction Dropped to 0%!
                    </span>
                    <h4 className="text-xl font-black text-[#4A2C2A] mt-1">
                      Nonna Rosa walked out of the shop!
                    </h4>
                    <p className="text-sm text-[#4A2C2A]/90 font-medium mt-1">
                      In real-world software, telling users &quot;our system can&apos;t handle custom combinations&quot; drives customers straight to competitors. Software architecture must evolve to support flexible features!
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    sfx.pop();
                    setSatisfaction(80);
                    setCustomerMood('waiting');
                    setLvl2Outcome(null);
                  }}
                  className="px-6 py-3 rounded-2xl bg-[#FBBF24] hover:bg-[#F59E0B] text-[#4A2C2A] font-black border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] flex items-center gap-2 shrink-0"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Retry Decision</span>
                </button>
              </div>
            </div>
          )}

          {lvl2Outcome === 'B' && (
            <div className="mx-5 md:mx-8 mb-8 p-6 rounded-3xl bg-amber-100 border-4 border-[#4A2C2A] shadow-lg animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-400 text-[#4A2C2A] border-3 border-[#4A2C2A] shrink-0">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-black uppercase bg-amber-800 text-white px-2.5 py-0.5 rounded-full">
                    Architecture Smell • Combinatorial Class Explosion!
                  </span>
                  <h4 className="text-xl font-black text-[#4A2C2A] mt-1">
                    Wait! With just 3 bases and 5 toppings, you&apos;d need 96+ classes!
                  </h4>
                  <p className="text-sm text-[#4A2C2A]/90 font-medium mt-1">
                    Creating a separate subclass for every combination causes <strong>Class Explosion</strong>. What happens when a customer wants <em>double</em> mushrooms? Or when the price of mushrooms changes from $1.50 to $1.75? You would have to edit 50 different subclasses!
                  </p>

                  {/* Visual Class Explosion Flood */}
                  <div className="mt-3 p-3 bg-white/90 rounded-2xl border-2 border-[#4A2C2A] flex flex-wrap gap-1.5 max-h-28 overflow-y-auto font-mono text-[11px]">
                    {[
                      'MargheritaWithMushrooms',
                      'MargheritaWithCheese',
                      'MargheritaWithMushroomsAndCheese',
                      'MargheritaWithMushroomsAndOlives',
                      'MargheritaWithDoubleMushrooms',
                      'PepperoniWithMushrooms',
                      'PepperoniWithMushroomsAndBasil',
                      'BasicWithMushroomsAndCheeseAndOlives',
                      'MargheritaWithEverythingExceptOlives',
                      '... +87 more unmaintainable classes!'
                    ].map((cls, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-300 font-bold"
                      >
                        class {cls}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900">
                      💡 Hint: Instead of static inheritance, how can we compose objects dynamically?
                    </span>
                    <button
                      onClick={() => {
                        sfx.pop();
                        setLvl2Outcome(null);
                      }}
                      className="px-5 py-2 rounded-xl bg-white hover:bg-amber-50 text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A]"
                    >
                      Reconsider Options
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {lvl2Outcome === 'C' && (
            <div className="mx-5 md:mx-8 mb-8 p-6 rounded-3xl bg-emerald-100 border-4 border-[#4A2C2A] shadow-lg animate-fadeIn">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-emerald-400 text-[#4A2C2A] border-3 border-[#4A2C2A] shrink-0">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black uppercase bg-emerald-800 text-white px-2.5 py-0.5 rounded-full">
                        Excellent Architecture Choice! +$50.00 Reward
                      </span>
                      <span className="text-xs font-black text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-700">
                        Open-Closed Principle Preserved
                      </span>
                    </div>
                    <h4 className="text-xl font-black text-[#4A2C2A] mt-1.5">
                      Dynamic Wrapping with the Decorator Pattern!
                    </h4>
                    <p className="text-sm text-[#4A2C2A]/90 font-medium mt-1">
                      By treating each topping as a <strong>Decorator wrapper</strong> that implements the `Pizza` interface, we can wrap a `Margherita` inside a `MushroomDecorator` (and wrap that inside a `CheeseDecorator`!) at runtime without modifying the original `Margherita` class.
                    </p>
                    <div className="mt-2.5 p-2.5 rounded-xl bg-white/80 border-2 border-[#4A2C2A]/30 text-xs text-[#4A2C2A]">
                      <strong>⚖️ Engineering Nuance:</strong> Is the Decorator Pattern the <em>only</em> way to model customization? No! If toppings are just flat numbers on a database receipt, a simple `List&lt;Topping&gt;` property works fine. However, the <strong>Decorator Pattern shines</strong> when each layer needs to dynamically wrap and alter behavior, method calls, rendering, or pricing rules polymorphically while conforming to the exact same `Pizza` interface!
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => unlockAndAdvance(3, 0, 0)}
                  className="w-full lg:w-auto px-7 py-4 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-base border-4 border-[#4A2C2A] shadow-[0_5px_0_#4A2C2A] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Open POS Tablet Training (Level 3)</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // LEVEL 3: LEARN THE DECORATOR PATTERN (IN-WORLD POS TABLET INTERFACE)
  // ============================================================================
  const renderLevel3 = () => {
    const activeUml = UML_CLASSES[selectedUmlClass];
    const currentTrace = TRACE_STEPS[traceStep];

    return (
      <div className="w-full max-w-6xl mx-auto">
        {/* Cute POS Pink/Cream Tablet Frame with Cat Ears (Inspired by reference screenshot) */}
        <div className="relative rounded-[2.5rem] bg-[#F4B8C8] border-4 border-[#4A2C2A] p-3 md:p-5 shadow-[0_10px_0_#4A2C2A]">
          {/* Tablet Top Camera Dot & Speaker */}
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <div className="w-3 h-3 rounded-full bg-[#4A2C2A]" />
            <div className="w-16 h-2 rounded-full bg-[#4A2C2A]/40" />
            <span className="text-[11px] font-black uppercase tracking-wider text-[#4A2C2A] bg-white/70 px-2.5 py-0.5 rounded-full border border-[#4A2C2A]">
              EduPlay POS Tablet OS • Pattern Academy
            </span>
          </div>

          {/* Inner Tablet Screen */}
          <div className="bg-[#FFF8E7] border-4 border-[#4A2C2A] rounded-3xl overflow-hidden min-h-[540px] flex flex-col">
            {/* Tablet Navigation Tabs */}
            <div className="bg-[#4A2C2A] p-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'overview', label: '1. Overview', icon: BookOpen },
                  { id: 'uml', label: '2. UML Diagram', icon: GitBranch },
                  { id: 'code', label: '3. Code & Execution Trace', icon: Code2 },
                  { id: 'ready', label: '4. Your Turn', icon: Zap }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const active = lvl3Tab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        sfx.click();
                        setLvl3Tab(tab.id);
                      }}
                      className={`px-4 py-2 rounded-2xl font-black text-xs md:text-sm flex items-center gap-2 transition-all border-2 ${
                        active
                          ? 'bg-[#FACC15] text-[#4A2C2A] border-[#4A2C2A] shadow-[0_3px_0_#000]'
                          : 'bg-[#633B37] text-[#FFF8E7] border-transparent hover:bg-[#7A4944]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <span className="text-xs font-bold text-amber-200 px-3 hidden xl:inline">
                Explore all tabs to master wrapping & delegation!
              </span>
            </div>

            {/* TAB 1: OVERVIEW */}
            {lvl3Tab === 'overview' && (
              <div className="p-5 md:p-7 flex-1 flex flex-col justify-between gap-6 animate-fadeIn">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Card 1: The Purpose & Wrapping Analogy */}
                  <div className="bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A]">
                    <span className="text-xs font-black uppercase bg-amber-200 text-[#4A2C2A] px-2.5 py-1 rounded-full border border-[#4A2C2A]">
                      Core Concept #1 • What is Wrapping?
                    </span>
                    <h3 className="text-xl font-black text-[#4A2C2A] mt-2">
                      Russian Nesting Dolls for Objects!
                    </h3>
                    <p className="text-sm text-[#4A2C2A]/90 font-medium mt-2 leading-relaxed">
                      Instead of baking toppings permanently into 100 rigid subclasses, the{' '}
                      <span className="bg-yellow-200 px-1.5 py-0.5 rounded font-black">
                        Decorator Pattern
                      </span>{' '}
                      lets us start with a plain <code className="font-bold">Margherita</code> object and dynamically <strong>wrap</strong> it inside a <code className="font-bold">MushroomDecorator</code> object at runtime.
                    </p>

                    {/* Visual Concentric Doll Diagram */}
                    <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-3 border-[#4A2C2A] flex flex-col items-center">
                      <div className="w-full max-w-md rounded-2xl bg-yellow-200 border-3 border-[#4A2C2A] p-3 text-center shadow-sm">
                        <span className="text-xs font-black text-[#4A2C2A]">
                          Outer Wrapper: CheeseDecorator (+$2.00)
                        </span>
                        <div className="mt-2 rounded-xl bg-emerald-200 border-3 border-[#4A2C2A] p-3">
                          <span className="text-xs font-black text-[#4A2C2A]">
                            Middle Wrapper: MushroomDecorator (+$1.50)
                          </span>
                          <div className="mt-2 rounded-lg bg-orange-300 border-3 border-[#4A2C2A] p-2.5">
                            <span className="text-xs font-black text-[#4A2C2A]">
                              Core Component: Margherita ($10.00)
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-[#4A2C2A] mt-2">
                        Every layer looks like a <code className="underline">Pizza</code> from the outside!
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Inheritance vs Composition & Dual Relationship */}
                  <div className="bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A] flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-black uppercase bg-sky-200 text-[#4A2C2A] px-2.5 py-1 rounded-full border border-[#4A2C2A]">
                        Core Concept #2 • Inheritance vs. Composition
                      </span>
                      <h3 className="text-xl font-black text-[#4A2C2A] mt-2">
                        Why does PizzaDecorator BOTH implement AND hold a Pizza?
                      </h3>
                      <p className="text-sm text-[#4A2C2A]/90 font-medium mt-2 leading-relaxed">
                        Beginners often ask: <em>&quot;Why does PizzaDecorator implement Pizza AND also store a `protected Pizza pizza` variable inside it?&quot;</em>
                      </p>

                      <div className="mt-3 space-y-2.5">
                        <div className="p-3 rounded-2xl bg-emerald-50 border-2 border-[#4A2C2A]">
                          <p className="text-xs md:text-sm text-[#4A2C2A]">
                            <span className="font-black bg-emerald-300 px-1.5 py-0.5 rounded border border-[#4A2C2A]">
                              1. IS-A (Implements Pizza):
                            </span>{' '}
                            So a wrapped pizza can stand in for a normal `Pizza` anywhere in the shop (or be wrapped again by another topping!).
                          </p>
                        </div>

                        <div className="p-3 rounded-2xl bg-sky-50 border-2 border-[#4A2C2A]">
                          <p className="text-xs md:text-sm text-[#4A2C2A]">
                            <span className="font-black bg-sky-300 px-1.5 py-0.5 rounded border border-[#4A2C2A]">
                              2. HAS-A (Composition Reference):
                            </span>{' '}
                            `protected Pizza pizza;` holds the inner object being wrapped so the decorator can <strong>delegate</strong> calculation calls inward before adding its own price & description!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#4A2C2A]/70">
                        Next: See how these relationships look in UML!
                      </span>
                      <button
                        onClick={() => {
                          sfx.pop();
                          setLvl3Tab('uml');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center gap-1.5"
                      >
                        <span>Explore UML Diagram</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE UML DIAGRAM */}
            {lvl3Tab === 'uml' && (
              <div className="p-5 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                {/* Left 7 Cols: Interactive Clickable UML Diagram Canvas */}
                <div className="lg:col-span-7 bg-white rounded-3xl border-4 border-[#4A2C2A] p-4 relative flex flex-col justify-between shadow-inner">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black bg-[#4A2C2A] text-white px-3 py-1 rounded-full">
                      Click any UML Class Box to Inspect It
                    </span>
                    <div className="flex items-center gap-3 text-[11px] font-bold text-[#4A2C2A]">
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-3 h-0.5 border-b-2 border-dashed border-[#4A2C2A]" />{' '}
                        implements
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="inline-block w-3 h-0.5 bg-[#4A2C2A]" /> extends
                      </span>
                      <span className="flex items-center gap-1 text-sky-800">
                        ◆ has-a (wraps)
                      </span>
                    </div>
                  </div>

                  {/* Interactive SVG + HTML UML Layout */}
                  <div className="my-auto py-2 flex flex-col items-center gap-6 relative">
                    {/* Top Row: Pizza Interface */}
                    <div className="relative z-10 w-64">
                      <button
                        onClick={() => {
                          sfx.pop();
                          setSelectedUmlClass('Pizza');
                        }}
                        className={`w-full rounded-2xl border-3 border-[#4A2C2A] text-left overflow-hidden transition-all ${
                          selectedUmlClass === 'Pizza'
                            ? 'ring-4 ring-amber-400 -translate-y-1 shadow-[0_5px_0_#4A2C2A]'
                            : 'shadow-[0_3px_0_#4A2C2A] hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="bg-amber-200 px-3 py-1.5 border-b-2 border-[#4A2C2A] text-center">
                          <div className="text-[10px] font-mono font-bold text-[#4A2C2A]/80">
                            &lt;&lt;interface&gt;&gt;
                          </div>
                          <div className="font-black text-sm text-[#4A2C2A]">Pizza</div>
                        </div>
                        <div className="bg-amber-50 p-2 font-mono text-[11px] text-[#4A2C2A] space-y-0.5">
                          <div>+ getDescription(): String</div>
                          <div>+ getCost(): double</div>
                        </div>
                      </button>
                    </div>

                    {/* Relationship Connector Lines (SVG) */}
                    <div className="w-full flex items-center justify-around px-6 -my-4">
                      <div className="flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-[#4A2C2A]" />
                        <div className="h-7 border-l-3 border-dashed border-[#4A2C2A]" />
                        <span className="text-[10px] font-black bg-orange-100 px-1.5 rounded border border-[#4A2C2A]">
                          implements
                        </span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-[#4A2C2A]" />
                        <div className="h-7 border-l-3 border-dashed border-[#4A2C2A]" />
                        <span className="text-[10px] font-black bg-sky-100 px-1.5 rounded border border-[#4A2C2A]">
                          implements + ◆ wraps Pizza
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: BasicPizza & PizzaDecorator */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full px-2 z-10">
                      {/* Concrete Component */}
                      <button
                        onClick={() => {
                          sfx.pop();
                          setSelectedUmlClass('BasicPizza');
                        }}
                        className={`rounded-2xl border-3 border-[#4A2C2A] text-left overflow-hidden transition-all ${
                          selectedUmlClass === 'BasicPizza'
                            ? 'ring-4 ring-orange-400 -translate-y-1 shadow-[0_5px_0_#4A2C2A]'
                            : 'shadow-[0_3px_0_#4A2C2A] hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="bg-orange-200 px-3 py-1.5 border-b-2 border-[#4A2C2A] text-center">
                          <div className="text-[10px] font-bold text-[#4A2C2A]/80">
                            Concrete Component
                          </div>
                          <div className="font-black text-sm text-[#4A2C2A]">
                            BasicPizza / Margherita
                          </div>
                        </div>
                        <div className="bg-orange-50 p-2 font-mono text-[11px] text-[#4A2C2A] space-y-0.5">
                          <div>+ getDescription(): String</div>
                          <div>+ getCost(): double</div>
                        </div>
                      </button>

                      {/* Abstract Decorator */}
                      <button
                        onClick={() => {
                          sfx.pop();
                          setSelectedUmlClass('PizzaDecorator');
                        }}
                        className={`rounded-2xl border-3 border-[#4A2C2A] text-left overflow-hidden transition-all ${
                          selectedUmlClass === 'PizzaDecorator'
                            ? 'ring-4 ring-sky-400 -translate-y-1 shadow-[0_5px_0_#4A2C2A]'
                            : 'shadow-[0_3px_0_#4A2C2A] hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="bg-sky-200 px-3 py-1.5 border-b-2 border-[#4A2C2A] text-center">
                          <div className="text-[10px] font-mono font-bold text-[#4A2C2A]/80">
                            &lt;&lt;abstract&gt;&gt; Decorator
                          </div>
                          <div className="font-black text-sm text-[#4A2C2A]">PizzaDecorator</div>
                        </div>
                        <div className="bg-sky-50 p-2 font-mono text-[11px] text-[#4A2C2A] space-y-0.5">
                          <div className="font-bold text-sky-900 bg-sky-200/60 px-1 rounded">
                            # pizza: Pizza (◆ wrapped)
                          </div>
                          <div>+ getDescription(): String</div>
                          <div>+ getCost(): double</div>
                        </div>
                      </button>
                    </div>

                    {/* Extends Arrow under PizzaDecorator */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 -my-4">
                      <div />
                      <div className="flex flex-col items-center">
                        <div className="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[11px] border-b-[#4A2C2A]" />
                        <div className="h-6 border-l-3 border-[#4A2C2A]" />
                        <span className="text-[10px] font-black bg-emerald-100 px-1.5 rounded border border-[#4A2C2A]">
                          extends
                        </span>
                      </div>
                    </div>

                    {/* Bottom Row: Concrete Decorators */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-2 z-10">
                      <button
                        onClick={() => {
                          sfx.pop();
                          setSelectedUmlClass('MushroomDecorator');
                        }}
                        className={`rounded-2xl border-3 border-[#4A2C2A] text-left overflow-hidden transition-all ${
                          selectedUmlClass === 'MushroomDecorator'
                            ? 'ring-4 ring-emerald-400 -translate-y-1 shadow-[0_5px_0_#4A2C2A]'
                            : 'shadow-[0_3px_0_#4A2C2A] hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="bg-emerald-200 px-3 py-1.5 border-b-2 border-[#4A2C2A] text-center">
                          <div className="text-[10px] font-bold text-[#4A2C2A]/80">
                            Concrete Decorator
                          </div>
                          <div className="font-black text-sm text-[#4A2C2A]">
                            MushroomDecorator
                          </div>
                        </div>
                        <div className="bg-emerald-50 p-2 font-mono text-[11px] text-[#4A2C2A]">
                          <div>+ getDescription() (+Mushrooms)</div>
                          <div>+ getCost() (+$1.50)</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          sfx.pop();
                          setSelectedUmlClass('CheeseDecorator');
                        }}
                        className={`rounded-2xl border-3 border-[#4A2C2A] text-left overflow-hidden transition-all ${
                          selectedUmlClass === 'CheeseDecorator'
                            ? 'ring-4 ring-yellow-400 -translate-y-1 shadow-[0_5px_0_#4A2C2A]'
                            : 'shadow-[0_3px_0_#4A2C2A] hover:-translate-y-0.5'
                        }`}
                      >
                        <div className="bg-yellow-200 px-3 py-1.5 border-b-2 border-[#4A2C2A] text-center">
                          <div className="text-[10px] font-bold text-[#4A2C2A]/80">
                            Concrete Decorator
                          </div>
                          <div className="font-black text-sm text-[#4A2C2A]">CheeseDecorator</div>
                        </div>
                        <div className="bg-yellow-50 p-2 font-mono text-[11px] text-[#4A2C2A]">
                          <div>+ getDescription() (+Cheese)</div>
                          <div>+ getCost() (+$2.00)</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: Inspector Panel for Selected Class */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
                        UML Class Inspector
                      </span>
                      <span className="text-xs font-mono font-bold text-[#4A2C2A]/70">
                        {activeUml.stereotype}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-[#4A2C2A] mt-3">
                      {activeUml.title}
                    </h3>
                    <div className="inline-block mt-1 text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-100 border border-[#4A2C2A] text-[#4A2C2A]">
                      Pattern Role: {activeUml.role}
                    </div>

                    <p className="text-sm text-[#4A2C2A]/90 font-medium mt-4 leading-relaxed bg-[#FFF8E7] p-3.5 rounded-2xl border-2 border-[#4A2C2A]">
                      {activeUml.explanation}
                    </p>

                    <div className="mt-4">
                      <h4 className="text-xs font-black uppercase text-[#4A2C2A]/70 mb-2">
                        UML Relationships:
                      </h4>
                      <ul className="space-y-1.5">
                        {activeUml.relationships.map((rel, i) => (
                          <li
                            key={i}
                            className="text-xs font-bold text-[#4A2C2A] flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-[#4A2C2A]/30"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{rel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20 flex justify-end">
                    <button
                      onClick={() => {
                        sfx.pop();
                        setLvl3Tab('code');
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center gap-1.5"
                    >
                      <span>Next: Java Code & Execution Trace</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: JAVA CODE & INTERACTIVE VISUAL EXECUTION TRACE */}
            {lvl3Tab === 'code' && (
              <div className="p-5 md:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                {/* Left 6 Cols: Annotated Java Implementation */}
                <div className="lg:col-span-6 bg-[#1E293B] text-slate-100 rounded-3xl border-4 border-[#4A2C2A] p-4 flex flex-col justify-between shadow-lg">
                  <div>
                    <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono font-bold text-amber-300 ml-1">
                          DecoratorPatternPizza.java
                        </span>
                      </div>
                      <span className="text-[11px] bg-slate-800 text-sky-300 px-2 py-0.5 rounded font-mono">
                        Java OOP Reference
                      </span>
                    </div>

                    <pre className="font-mono text-[11px] md:text-xs leading-relaxed overflow-x-auto space-y-2">
                      <div className="p-2 rounded-lg bg-slate-800/90 border-l-4 border-amber-400">
                        <span className="text-slate-400">// 1. Component Interface</span>
                        {'\n'}
                        <span className="text-pink-400">public interface</span>{' '}
                        <span className="text-amber-300">Pizza</span> &#123;{'\n'}
                        {'  '}String <span className="text-sky-300">getDescription</span>();{'\n'}
                        {'  '}
                        <span className="text-pink-400">double</span>{' '}
                        <span className="text-sky-300">getCost</span>();{'\n'}&#125;
                      </div>

                      <div className="p-2 rounded-lg bg-slate-800/90 border-l-4 border-orange-400">
                        <span className="text-slate-400">// 2. Concrete Component (Core Base)</span>
                        {'\n'}
                        <span className="text-pink-400">public class</span>{' '}
                        <span className="text-amber-300">Margherita</span>{' '}
                        <span className="text-pink-400">implements</span> Pizza &#123;{'\n'}
                        {'  '}
                        <span className="text-pink-400">public</span> String getDescription() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-emerald-300">&quot;Margherita&quot;</span>; &#125;
                        {'\n'}
                        {'  '}
                        <span className="text-pink-400">public double</span> getCost() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-purple-300">10.00</span>; &#125;{'\n'}&#125;
                      </div>

                      <div className="p-2 rounded-lg bg-slate-800/90 border-l-4 border-sky-400">
                        <span className="text-slate-400">
                          // 3. Abstract Decorator (Wraps a Pizza reference!)
                        </span>
                        {'\n'}
                        <span className="text-pink-400">public abstract class</span>{' '}
                        <span className="text-amber-300">PizzaDecorator</span>{' '}
                        <span className="text-pink-400">implements</span> Pizza &#123;{'\n'}
                        {'  '}
                        <span className="text-pink-400">protected</span> Pizza{' '}
                        <span className="text-yellow-300 font-bold">pizza</span>;{' '}
                        <span className="text-slate-400">// Wrapped object</span>
                        {'\n'}
                        {'  '}
                        <span className="text-pink-400">public</span> PizzaDecorator(Pizza pizza)
                        &#123; <span className="text-pink-400">this</span>.pizza = pizza; &#125;
                        {'\n'}
                        {'  '}
                        <span className="text-pink-400">public</span> String getDescription() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-yellow-300 font-bold">pizza.getDescription()</span>;
                        &#125;{'\n'}
                        {'  '}
                        <span className="text-pink-400">public double</span> getCost() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-yellow-300 font-bold">pizza.getCost()</span>; &#125;
                        {'\n'}&#125;
                      </div>

                      <div className="p-2 rounded-lg bg-slate-800/90 border-l-4 border-emerald-400">
                        <span className="text-slate-400">
                          // 4. Concrete Decorator (Delegates via super + adds topping)
                        </span>
                        {'\n'}
                        <span className="text-pink-400">public class</span>{' '}
                        <span className="text-amber-300">MushroomDecorator</span>{' '}
                        <span className="text-pink-400">extends</span> PizzaDecorator &#123;{'\n'}
                        {'  '}
                        <span className="text-pink-400">public</span> MushroomDecorator(Pizza p)
                        &#123; <span className="text-pink-400">super</span>(p); &#125;{'\n'}
                        {'  '}
                        <span className="text-pink-400">public</span> String getDescription() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-emerald-300">
                          super.getDescription() + &quot;, Mushrooms&quot;
                        </span>
                        ; &#125;{'\n'}
                        {'  '}
                        <span className="text-pink-400">public double</span> getCost() &#123;{' '}
                        <span className="text-pink-400">return</span>{' '}
                        <span className="text-emerald-300">super.getCost() + 1.50</span>; &#125;
                        {'\n'}&#125;
                      </div>
                    </pre>
                  </div>
                </div>

                {/* Right 6 Cols: Interactive Visual Execution Trace Player */}
                <div className="lg:col-span-6 bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 flex flex-col justify-between shadow-[0_4px_0_#4A2C2A]">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-black uppercase bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
                        Visual Execution Trace
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            sfx.step();
                            setIsAutoPlayingTrace(false);
                            setTraceStep(0);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#4A2C2A] font-black text-xs border-2 border-[#4A2C2A]"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            sfx.step();
                            setIsAutoPlayingTrace(false);
                            setTraceStep((s) => (s + 1) % TRACE_STEPS.length);
                          }}
                          className="px-3 py-1 rounded-lg bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-xs border-2 border-[#4A2C2A] flex items-center gap-1"
                        >
                          <span>Step ({traceStep + 1}/6)</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            sfx.pop();
                            if (traceStep >= TRACE_STEPS.length - 1) setTraceStep(0);
                            setIsAutoPlayingTrace((p) => !p);
                          }}
                          className={`px-3 py-1 rounded-lg font-black text-xs border-2 border-[#4A2C2A] flex items-center gap-1 ${
                            isAutoPlayingTrace
                              ? 'bg-red-200 text-red-900'
                              : 'bg-emerald-300 text-[#4A2C2A]'
                          }`}
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>{isAutoPlayingTrace ? 'Pause' : 'Auto-Play'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Visual Chain Diagram: Margherita -> MushroomDecorator -> CheeseDecorator */}
                    <div className="grid grid-cols-3 gap-2 my-3 p-3 rounded-2xl bg-[#FFF8E7] border-3 border-[#4A2C2A]">
                      {/* Node 1: Margherita */}
                      <div
                        className={`p-2.5 rounded-xl border-3 border-[#4A2C2A] text-center transition-all ${
                          currentTrace.activeLayer === 'margherita' ||
                          currentTrace.activeLayer === 'all'
                            ? 'bg-orange-300 scale-105 shadow-md ring-2 ring-[#4A2C2A]'
                            : 'bg-orange-100 opacity-75'
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase text-[#4A2C2A]/70">
                          1. Inner Core
                        </div>
                        <div className="font-black text-xs md:text-sm text-[#4A2C2A]">
                          Margherita
                        </div>
                        <div className="text-xs font-mono font-bold text-orange-950 mt-1">
                          $10.00
                        </div>
                      </div>

                      {/* Node 2: MushroomDecorator */}
                      <div
                        className={`p-2.5 rounded-xl border-3 border-[#4A2C2A] text-center transition-all ${
                          currentTrace.activeLayer === 'mushroom' ||
                          currentTrace.activeLayer === 'all'
                            ? 'bg-emerald-300 scale-105 shadow-md ring-2 ring-[#4A2C2A]'
                            : 'bg-emerald-100 opacity-75'
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase text-[#4A2C2A]/70">
                          2. Wraps Core
                        </div>
                        <div className="font-black text-xs md:text-sm text-[#4A2C2A]">
                          MushroomDec
                        </div>
                        <div className="text-xs font-mono font-bold text-emerald-950 mt-1">
                          +$1.50
                        </div>
                      </div>

                      {/* Node 3: CheeseDecorator */}
                      <div
                        className={`p-2.5 rounded-xl border-3 border-[#4A2C2A] text-center transition-all ${
                          currentTrace.activeLayer === 'cheese' ||
                          currentTrace.activeLayer === 'all'
                            ? 'bg-yellow-300 scale-105 shadow-md ring-2 ring-[#4A2C2A]'
                            : 'bg-yellow-100 opacity-75'
                        }`}
                      >
                        <div className="text-[10px] font-black uppercase text-[#4A2C2A]/70">
                          3. Outer Wrapper
                        </div>
                        <div className="font-black text-xs md:text-sm text-[#4A2C2A]">
                          CheeseDec
                        </div>
                        <div className="text-xs font-mono font-bold text-yellow-950 mt-1">
                          +$2.00
                        </div>
                      </div>
                    </div>

                    {/* Current Trace Step Details */}
                    <div className="p-4 rounded-2xl bg-sky-50 border-3 border-[#4A2C2A]">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm text-[#4A2C2A]">
                          {currentTrace.title}
                        </span>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-[#4A2C2A] ${
                            currentTrace.direction === 'inward'
                              ? 'bg-amber-200 text-amber-900'
                              : currentTrace.direction === 'outward'
                              ? 'bg-emerald-300 text-emerald-950'
                              : 'bg-purple-200 text-purple-900'
                          }`}
                        >
                          {currentTrace.direction === 'inward'
                            ? '⬅ Delegating Inward'
                            : currentTrace.direction === 'outward'
                            ? '➡ Returning Outward'
                            : '● Core Reached'}
                        </span>
                      </div>

                      <div className="mt-2 p-2 rounded-lg bg-[#1E293B] text-amber-300 font-mono text-xs">
                        {currentTrace.codeLine}
                      </div>

                      <p className="text-xs md:text-sm text-[#4A2C2A] font-medium mt-2.5 leading-relaxed">
                        {currentTrace.thought}
                      </p>

                      {/* Live Call Stack Box */}
                      <div className="mt-3 p-2.5 rounded-xl bg-white border-2 border-[#4A2C2A] font-mono text-[11px] space-y-1">
                        <div className="text-[10px] font-sans font-black uppercase text-[#4A2C2A]/60">
                          Active Call Stack & Return Accumulator:
                        </div>
                        {currentTrace.callStack.map((line, i) => (
                          <div key={i} className="text-[#4A2C2A] font-bold">
                            {line}
                          </div>
                        ))}
                        <div className="pt-1 border-t border-[#4A2C2A]/20 text-emerald-700 font-black">
                          Result: {currentTrace.returnVal}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-dashed border-[#4A2C2A]/20 flex justify-end">
                    <button
                      onClick={() => unlockAndAdvance(4, 0, 0)}
                      className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center gap-1.5"
                    >
                      <span>Ready for Level 4: Complete the Code!</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: YOUR TURN TRANSITION */}
            {lvl3Tab === 'ready' && (
              <div className="p-8 flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto animate-fadeIn">
                <div className="w-20 h-20 rounded-3xl bg-[#FACC15] border-4 border-[#4A2C2A] flex items-center justify-center shadow-[0_5px_0_#4A2C2A] mb-4">
                  <Code2 className="w-10 h-10 text-[#4A2C2A]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#4A2C2A]">
                  Ready to Implement MushroomDecorator?
                </h3>
                <p className="text-sm md:text-base text-[#4A2C2A]/80 font-medium mt-2">
                  You&apos;ve seen how `PizzaDecorator` holds a reference to a `Pizza` object and how concrete decorators wrap it. Now let&apos;s write `MushroomDecorator.java` so Nonna Rosa can finally get her pizza!
                </p>
                <button
                  onClick={() => unlockAndAdvance(4, 0, 0)}
                  className="mt-6 px-8 py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-[#4A2C2A] font-black text-lg border-4 border-[#4A2C2A] shadow-[0_5px_0_#4A2C2A] flex items-center gap-2"
                >
                  <span>Start Level 4 Coding Challenge</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // LEVEL 4: YOUR TURN — COMPLETE THE CODE (HANDS-ON CODING CHALLENGE)
  // ============================================================================
  const renderLevel4 = () => {
    const TOKEN_BANK = [
      'PizzaDecorator',
      'Pizza',
      'super(pizza)',
      'super.getDescription()',
      'BasicPizza',
      'this.getCost()',
      'new Pizza()'
    ];

    const renderSlotButton = (slotKey, numberLabel, placeholder) => {
      const val = codeBlanks[slotKey];
      const isSelected = activeBlankSlot === slotKey;
      return (
        <button
          onClick={() => {
            sfx.click();
            setActiveBlankSlot(slotKey);
          }}
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 mx-1 rounded-lg font-mono text-xs md:text-sm font-black border-2 transition-all ${
            val
              ? 'bg-amber-300 text-[#4A2C2A] border-[#4A2C2A] shadow-sm'
              : isSelected
              ? 'bg-sky-400/30 text-sky-200 border-sky-400 animate-pulse'
              : 'bg-slate-800 text-slate-400 border-slate-600 hover:border-slate-400'
          }`}
        >
          <span className="text-[10px] bg-[#4A2C2A] text-white px-1 rounded">
            {numberLabel}
          </span>
          <span>{val || placeholder}</span>
        </button>
      );
    };

    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="rounded-[2.5rem] bg-[#F4B8C8] border-4 border-[#4A2C2A] p-3 md:p-5 shadow-[0_10px_0_#4A2C2A]">
          <div className="bg-[#FFF8E7] border-4 border-[#4A2C2A] rounded-3xl p-5 md:p-7">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b-4 border-[#4A2C2A]">
              <div>
                <span className="text-xs font-black uppercase bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
                  Level 4 • Hands-On Coding Challenge
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-[#4A2C2A] mt-1">
                  Complete MushroomDecorator.java
                </h2>
                <p className="text-sm font-bold text-[#4A2C2A]/80">
                  Click a numbered slot `[1] - [4]` in the editor, then click a code chip below to fill it in!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sfx.pop();
                    setShowHint((h) => !h);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-200 hover:bg-amber-300 text-[#4A2C2A] font-black text-xs border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center gap-1.5"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
                <button
                  onClick={() => {
                    sfx.click();
                    setCodeBlanks({ blank1: '', blank2: '', blank3: '', blank4: '' });
                    setActiveBlankSlot('blank1');
                    setConceptAnswer(null);
                    setLvl4Feedback(null);
                    setLvl4Success(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-[#4A2C2A] font-black text-xs border-3 border-[#4A2C2A]"
                >
                  Clear Slots
                </button>
              </div>
            </div>

            {/* Contextual Hint Drawer */}
            {showHint && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-100 border-3 border-[#4A2C2A] text-xs md:text-sm text-[#4A2C2A] space-y-1 animate-fadeIn">
                <div className="font-black flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span>Quick Chef Hints:</span>
                </div>
                <p>
                  • <strong>Slot [1]:</strong> Every topping decorator extends our abstract decorator (`PizzaDecorator`).
                </p>
                <p>
                  • <strong>Slot [2] & [3]:</strong> The constructor accepts any `Pizza` interface and passes it to `super(pizza)`.
                </p>
                <p>
                  • <strong>Slot [4]:</strong> Call `super.getDescription()` so `PizzaDecorator` asks the wrapped pizza for its description first!
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 7 Cols: Interactive Code Editor + Token Bank */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="bg-[#1E293B] text-slate-100 rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-lg font-mono text-xs md:text-sm leading-loose">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700 text-xs text-slate-400">
                    <span>MushroomDecorator.java</span>
                    <span className="text-amber-300">
                      Editing Slot: [{activeBlankSlot.replace('blank', '')}]
                    </span>
                  </div>

                  <div>
                    <span className="text-pink-400">public class</span>{' '}
                    <span className="text-amber-300">MushroomDecorator</span>{' '}
                    <span className="text-pink-400">extends</span>
                    {renderSlotButton('blank1', '1', 'choose superclass')} &#123;
                  </div>

                  <div className="pl-4 mt-2">
                    <span className="text-pink-400">public</span> MushroomDecorator(
                    {renderSlotButton('blank2', '2', 'type')} pizza) &#123;
                    <div className="pl-4">
                      {renderSlotButton('blank3', '3', 'pass to parent')};
                    </div>
                    &#125;
                  </div>

                  <div className="pl-4 mt-2">
                    <span className="text-sky-300">@Override</span>
                    <div>
                      <span className="text-pink-400">public</span> String getDescription() &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-400">return</span>
                      {renderSlotButton('blank4', '4', 'delegate description')} +{' '}
                      <span className="text-emerald-300">&quot;, Mushrooms&quot;</span>;
                    </div>
                    &#125;
                  </div>

                  <div className="pl-4 mt-2">
                    <span className="text-sky-300">@Override</span>
                    <div>
                      <span className="text-pink-400">public double</span> getCost() &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-pink-400">return</span>{' '}
                      <span className="text-amber-200">super.getCost()</span> +{' '}
                      <span className="text-purple-300">1.50</span>;
                    </div>
                    &#125;
                  </div>

                  <div>&#125;</div>
                </div>

                {/* Selectable Code Chip Bank */}
                <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-4">
                  <div className="text-xs font-black uppercase text-[#4A2C2A]/70 mb-2.5">
                    Click a Code Block to insert into Slot [{activeBlankSlot.replace('blank', '')}]:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TOKEN_BANK.map((token) => {
                      const isUsed = Object.values(codeBlanks).includes(token);
                      return (
                        <button
                          key={token}
                          onClick={() => handleSelectCodeToken(token)}
                          className={`px-3.5 py-2 rounded-xl font-mono text-xs md:text-sm font-black border-3 border-[#4A2C2A] transition-all ${
                            isUsed
                              ? 'bg-amber-200 text-[#4A2C2A]'
                              : 'bg-[#FFF8E7] hover:bg-[#FACC15] text-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] active:translate-y-0.5'
                          }`}
                        >
                          {token}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Conceptual Question + Validation Button */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A]">
                <div>
                  <span className="text-xs font-black uppercase bg-purple-200 text-[#4A2C2A] px-3 py-1 rounded-full border border-[#4A2C2A]">
                    Part 2 • Inheritance vs. Delegation Check
                  </span>
                  <h3 className="text-lg font-black text-[#4A2C2A] mt-2.5">
                    In `MushroomDecorator`, what does `super.getDescription()` actually do?
                  </h3>
                  <p className="text-xs text-[#4A2C2A]/80 font-medium mt-1">
                    Distinguish the inheritance call (`super`) from composition delegation (`pizza`):
                  </p>

                  <div className="mt-3 space-y-2.5">
                    {[
                      {
                        id: 'hardcoded',
                        text: 'It directly calls Margherita.getDescription() because MushroomDecorator inherits from Margherita.'
                      },
                      {
                        id: 'delegate',
                        text: 'It calls PizzaDecorator.getDescription() in the superclass, which then delegates to the wrapped `pizza.getDescription()` object reference.'
                      },
                      {
                        id: 'loop',
                        text: 'It creates a brand new Pizza instance in memory every time getCost() is called.'
                      }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sfx.click();
                          setConceptAnswer(opt.id);
                          setLvl4Feedback(null);
                        }}
                        className={`w-full p-3 rounded-2xl border-3 border-[#4A2C2A] text-left text-xs md:text-sm font-bold transition-all flex items-start gap-2.5 ${
                          conceptAnswer === opt.id
                            ? 'bg-emerald-200 shadow-inner'
                            : 'bg-[#FFF8E7] hover:bg-amber-50'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 border-[#4A2C2A] shrink-0 mt-0.5 flex items-center justify-center ${
                            conceptAnswer === opt.id ? 'bg-[#4A2C2A] text-white' : 'bg-white'
                          }`}
                        >
                          {conceptAnswer === opt.id && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-[#4A2C2A]">{opt.text}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Validate & Run Button */}
                <div className="mt-5 pt-4 border-t-2 border-dashed border-[#4A2C2A]/20">
                  <button
                    onClick={validateLevel4}
                    className="w-full py-3.5 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-base border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Compile & Verify Solution</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Banner */}
            {lvl4Feedback && (
              <div
                className={`mt-6 p-5 rounded-3xl border-4 border-[#4A2C2A] animate-fadeIn ${
                  lvl4Feedback.type === 'success' ? 'bg-emerald-100' : 'bg-red-100'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    {lvl4Feedback.type === 'success' ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-8 h-8 text-red-600 shrink-0" />
                    )}
                    <div>
                      <h4 className="font-black text-lg text-[#4A2C2A]">
                        {lvl4Feedback.title}
                      </h4>
                      {lvl4Feedback.message && (
                        <p className="text-sm text-[#4A2C2A] font-medium mt-1">
                          {lvl4Feedback.message}
                        </p>
                      )}
                      {lvl4Feedback.details && (
                        <ul className="mt-1.5 space-y-1 text-xs md:text-sm font-bold text-red-900 list-disc list-inside">
                          {lvl4Feedback.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {lvl4Success && (
                    <button
                      onClick={() => unlockAndAdvance(5, 0, 0)}
                      className="px-7 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-[#4A2C2A] font-black text-base border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] flex items-center gap-2 shrink-0"
                    >
                      <span>Return to Pizza Shop (Level 5)</span>
                      <ArrowRight className="w-5 h-5 stroke-[3]" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // LEVEL 5: RETURN TO THE PIZZA SHOP (LIVE DECORATOR SIMULATOR)
  // ============================================================================
  const renderLevel5 = () => {
    const activeOrder = CUSTOMER_ORDERS[customerOrderIndex];

    return (
      <div className="w-full max-w-6xl mx-auto space-y-5">
        {/* Top Scene: Customer & Order Bubble at the Upgraded Counter */}
        <div className="rounded-3xl border-4 border-[#4A2C2A] bg-[#FDE68A] p-4 md:p-6 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">
            {/* Customer Portrait */}
            <div className="lg:col-span-3 flex flex-col items-center">
              <div className="w-40 h-44 bg-[#FFF8E7] rounded-3xl border-4 border-[#4A2C2A] p-2 shadow-md">
                <CustomerSVG
                  mood={customerMood}
                  characterType={activeOrder.characterType}
                />
              </div>
              <span className="mt-2 bg-[#4A2C2A] text-[#FFF8E7] text-xs font-black px-3 py-1 rounded-full">
                {activeOrder.customerName}
              </span>
            </div>

            {/* Speech Bubble + Order Status */}
            <div className="lg:col-span-9 flex flex-col gap-3">
              <div className="bg-[#FFD6E0] border-4 border-[#4A2C2A] rounded-3xl p-5 shadow-[0_5px_0_#4A2C2A]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-black uppercase bg-[#4A2C2A] text-[#FFD6E0] px-3 py-0.5 rounded-full">
                    Level 5 • Upgraded Decorator POS v2.0
                  </span>
                  <span className="text-xs font-black text-emerald-900 bg-emerald-200 px-2.5 py-0.5 rounded-full border border-[#4A2C2A]">
                    Target: {activeOrder.requiredBase.toUpperCase()} +{' '}
                    {activeOrder.requiredToppings.map((t) => t.toUpperCase()).join(' + ')}
                  </span>
                </div>
                <p className="text-base md:text-xl font-black text-[#4A2C2A]">
                  {activeOrder.dialogue}
                </p>
              </div>

              {/* Validation Feedback Banner */}
              {orderServedState === 'wrong' && (
                <div className="p-3.5 rounded-2xl bg-red-100 border-3 border-[#4A2C2A] flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5 text-xs md:text-sm font-bold text-red-900">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>
                      Hmm, that doesn&apos;t quite match the order! Make sure you select{' '}
                      <strong>{activeOrder.requiredBase}</strong> as the base Concrete Component and wrap it with{' '}
                      <strong>{activeOrder.requiredToppings.join(' & ')}</strong>!
                    </span>
                  </div>
                </div>
              )}

              {orderServedState === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-100 border-4 border-[#4A2C2A] flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-400 border-2 border-[#4A2C2A]">
                      <Sparkles className="w-6 h-6 text-[#4A2C2A]" />
                    </div>
                    <div>
                      <h4 className="font-black text-base md:text-lg text-[#4A2C2A]">
                        Order Fulfilled Dynamically! (+${(simTotalCost + activeOrder.tip).toFixed(2)} with Tip!)
                      </h4>
                      <p className="text-xs font-bold text-[#4A2C2A]/80">
                        You wrapped the base pizza object in topping decorators at runtime without modifying any existing classes!
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {customerOrderIndex === 0 && (
                      <button
                        onClick={() => {
                          sfx.pop();
                          setCustomerOrderIndex(1);
                          setSimBasePizza('pepperoni');
                          setSimDecorators([]);
                          setOrderServedState(null);
                          setCustomerMood('happy');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-amber-300 hover:bg-amber-400 text-[#4A2C2A] font-black text-xs border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A]"
                      >
                        Try Bonus Order (Chef Marco)
                      </button>
                    )}
                    <button
                      onClick={() => unlockAndAdvance(6, 0, 0)}
                      className="px-5 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center gap-1.5"
                    >
                      <span>View Graduation Summary (Level 6)</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main 3-Column Kitchen & Decorator Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Column 1 (4 Cols): Base Component & Topping Decorators Controls */}
          <div className="lg:col-span-4 bg-[#FFF8E7] rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-xl flex flex-col justify-between gap-4">
            <div>
              {/* Step 1: Select Base Concrete Component */}
              <div className="mb-5">
                <span className="text-xs font-black uppercase bg-orange-200 text-[#4A2C2A] px-2.5 py-0.5 rounded-full border border-[#4A2C2A]">
                  Step 1 • Concrete Component (Base)
                </span>
                <div className="grid grid-cols-1 gap-2 mt-2.5">
                  {LEGACY_PIZZAS.map((base) => {
                    const active = simBasePizza === base.id;
                    return (
                      <button
                        key={base.id}
                        onClick={() => {
                          sfx.click();
                          setSimBasePizza(base.id);
                          setOrderServedState(null);
                        }}
                        className={`p-3 rounded-2xl border-3 border-[#4A2C2A] flex items-center justify-between transition-all ${
                          active
                            ? 'bg-orange-200 shadow-inner font-black'
                            : 'bg-white hover:bg-amber-50 shadow-[0_3px_0_#4A2C2A]'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-black text-sm text-[#4A2C2A]">
                            {base.displayName}{' '}
                            <span className="font-mono text-xs font-normal opacity-75">
                              (new {base.name}())
                            </span>
                          </div>
                          <div className="text-[11px] text-[#4A2C2A]/70">{base.desc}</div>
                        </div>
                        <span className="font-black text-xs bg-white px-2.5 py-1 rounded-lg border-2 border-[#4A2C2A]">
                          ${base.price.toFixed(2)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Wrap with Concrete Decorators */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase bg-emerald-200 text-[#4A2C2A] px-2.5 py-0.5 rounded-full border border-[#4A2C2A]">
                    Step 2 • Wrap with Topping Decorators
                  </span>
                  <span className="text-[11px] font-bold text-[#4A2C2A]/70">
                    {simDecorators.length}/6 Wrappers
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 mt-2.5">
                  {TOPPING_DECORATORS.map((top) => (
                    <button
                      key={top.id}
                      onClick={() => addToppingDecorator(top)}
                      disabled={simDecorators.length >= 6}
                      className="p-2.5 rounded-2xl bg-white hover:bg-emerald-50 disabled:opacity-50 border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] active:translate-y-0.5 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-xl border-2 border-[#4A2C2A] flex items-center justify-center"
                          style={{ backgroundColor: top.color }}
                        >
                          <Plus className="w-4 h-4 text-[#4A2C2A] stroke-[3]" />
                        </div>
                        <div className="text-left">
                          <div className="font-black text-xs md:text-sm text-[#4A2C2A]">
                            + {top.name}
                          </div>
                          <div className="font-mono text-[10px] text-[#4A2C2A]/70">
                            wraps in {top.className}
                          </div>
                        </div>
                      </div>
                      <span className="font-black text-xs text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-lg border border-[#4A2C2A]">
                        +${top.price.toFixed(2)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {simDecorators.length > 0 && (
              <button
                onClick={() => {
                  sfx.click();
                  setSimDecorators([]);
                  setOrderServedState(null);
                }}
                className="w-full py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-900 font-black text-xs border-2 border-[#4A2C2A] flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Unwrap All Toppings (Reset to Base Pizza)</span>
              </button>
            )}
          </div>

          {/* Column 2 (4 Cols): Live Pizza Visualizer & Order Receipt */}
          <div className="lg:col-span-4 bg-[#FFF8E7] rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-xl flex flex-col items-center justify-between">
            <div className="w-full flex items-center justify-between">
              <span className="text-xs font-black uppercase bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
                Live Cutting Board
              </span>
              <span className="text-xs font-bold text-[#4A2C2A]/70">
                Real-Time SVG Layers
              </span>
            </div>

            {/* Layered SVG Pizza */}
            <div className="my-2">
              <PizzaVisualizerSVG
                baseId={simBasePizza}
                decorators={simDecorators}
                size={230}
              />
            </div>

            {/* Active Topping Pills (Click to remove individual wrapper) */}
            <div className="w-full">
              <div className="text-[11px] font-black uppercase text-[#4A2C2A]/70 mb-1.5">
                Applied Wrapper Layers (Click to unwrap/remove):
              </div>
              {simDecorators.length === 0 ? (
                <div className="p-2.5 rounded-xl bg-amber-100/60 border-2 border-dashed border-[#4A2C2A]/30 text-center text-xs font-bold text-[#4A2C2A]/60">
                  No decorators applied yet — just plain {currentBaseObj.displayName}.
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1">
                  {simDecorators.map((dec, idx) => (
                    <button
                      key={dec.instanceId}
                      onClick={() => removeToppingAt(idx)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border-2 border-[#4A2C2A] flex items-center gap-1 hover:bg-red-200 transition-colors ${dec.badgeBg}`}
                      title="Click to unwrap this decorator"
                    >
                      <span>
                        #{idx + 1} {dec.name}
                      </span>
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Receipt & Serve Button */}
            <div className="w-full mt-4 pt-3 border-t-3 border-dashed border-[#4A2C2A]">
              <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-3 mb-3 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-[#4A2C2A]">
                  <span>Base: {currentBaseObj.displayName}</span>
                  <span>${currentBaseObj.price.toFixed(2)}</span>
                </div>
                {simDecorators.map((d, idx) => (
                  <div
                    key={d.instanceId}
                    className="flex justify-between text-[#4A2C2A]/80 font-medium pl-2"
                  >
                    <span>
                      ↳ wrapped in {d.className} (#{idx + 1})
                    </span>
                    <span>+${d.price.toFixed(2)}</span>
                  </div>
                ))}
                <div className="pt-1.5 border-t border-[#4A2C2A]/20 flex justify-between font-black text-base text-[#4A2C2A]">
                  <span>Total (order.getCost()):</span>
                  <span className="text-emerald-700">${simTotalCost.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleServePizza}
                className="w-full py-3.5 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-base border-4 border-[#4A2C2A] shadow-[0_4px_0_#4A2C2A] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Serve Pizza to {activeOrder.customerName}!</span>
              </button>
            </div>
          </div>

          {/* Column 3 (4 Cols): Under-the-Hood Object Wrapper Visualizer */}
          <div className="lg:col-span-4 bg-[#1E293B] text-slate-100 rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                    Under-the-Hood Object Wrapper
                  </span>
                </div>
                <span className="text-[10px] bg-slate-800 text-emerald-300 px-2 py-0.5 rounded font-mono">
                  Pattern Simulation
                </span>
              </div>

              {/* Live Java Code Instantiation */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-400 mb-1">
                  1. Live Java Object Instantiation:
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border-2 border-slate-700 font-mono text-xs text-emerald-300 break-words leading-relaxed">
                  {buildJavaWrapperCode()}
                </div>
              </div>

              {/* Visual Nested Wrapper Rings */}
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-400 mb-2">
                  2. Memory Wrapping Hierarchy (Outermost → Innermost):
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/90 border-2 border-slate-700 space-y-2 max-h-56 overflow-y-auto">
                  {[...simDecorators].reverse().map((dec, revIdx) => {
                    const actualIdx = simDecorators.length - revIdx;
                    return (
                      <div
                        key={dec.instanceId}
                        style={{ marginLeft: `${revIdx * 10}px` }}
                        className="p-2 rounded-xl bg-slate-800 border-l-4 border-emerald-400 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between text-emerald-300 font-bold">
                          <span>
                            Wrapper #{actualIdx}: {dec.className}
                          </span>
                          <span>+${dec.price.toFixed(2)}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          holds `pizza` reference to inner object ↓
                        </div>
                      </div>
                    );
                  })}

                  {/* Innermost Core Concrete Component */}
                  <div
                    style={{ marginLeft: `${simDecorators.length * 10}px` }}
                    className="p-2.5 rounded-xl bg-orange-950/80 border-2 border-orange-400 text-xs font-mono"
                  >
                    <div className="flex items-center justify-between text-orange-300 font-bold">
                      <span>Core: new {currentBaseObj.name}()</span>
                      <span>${currentBaseObj.price.toFixed(2)}</span>
                    </div>
                    <div className="text-[10px] text-orange-200/70">
                      Concrete Component (Base case)
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Output of Delegated Calls */}
              <div className="p-3 rounded-2xl bg-slate-900 border-2 border-slate-700 font-mono text-xs space-y-1.5">
                <div className="text-slate-400 text-[10px]">
                  // Delegated Method Outputs:
                </div>
                <div>
                  <span className="text-sky-300">order.getDescription()</span>
                  <div className="text-amber-300 font-bold">&quot;{simDescription}&quot;</div>
                </div>
                <div className="pt-1 border-t border-slate-800">
                  <span className="text-sky-300">order.getCost()</span>
                  <div className="text-emerald-400 font-bold">${simTotalCost.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>Simulation Note:</strong> This interactive panel models how Java Decorator objects wrap each other in memory and calculate descriptions & prices via recursive delegation.
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // LEVEL 6: RESULTS & LEARNING SUMMARY
  // ============================================================================
  const renderLevel6 = () => {
    const MASTERED_CONCEPTS = [
      {
        title: 'Component Interface (Pizza)',
        desc: 'Defines `getDescription()` and `getCost()` so plain pizzas and wrapped pizzas are treated identically.'
      },
      {
        title: 'Concrete Component (Margherita)',
        desc: 'The foundational base pizza object that can be dynamically wrapped at runtime.'
      },
      {
        title: 'Abstract Decorator (PizzaDecorator)',
        desc: 'Implements `Pizza` (IS-A) AND holds a `protected Pizza pizza` reference (HAS-A) to delegate calls inward.'
      },
      {
        title: 'Concrete Decorators (Mushrooms, Cheese)',
        desc: 'Extend `PizzaDecorator`, call `super.getDescription()` / `super.getCost()`, and add their own behavior.'
      },
      {
        title: 'Composition Over Inheritance',
        desc: 'Prevents combinatorial class explosion by stacking wrappers dynamically at runtime instead of creating 100+ subclasses.'
      }
    ];

    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="rounded-3xl border-4 border-[#4A2C2A] bg-[#FFF8E7] shadow-2xl overflow-hidden p-6 md:p-8">
          {/* Top Hero Celebration */}
          <div className="bg-[#FFD6E0] border-4 border-[#4A2C2A] rounded-3xl p-6 text-center shadow-[0_6px_0_#4A2C2A] relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-[#FACC15] border-4 border-[#4A2C2A] mx-auto flex items-center justify-center shadow-[0_4px_0_#4A2C2A] mb-3">
              <Award className="w-11 h-11 text-[#4A2C2A]" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider bg-[#4A2C2A] text-[#FFF8E7] px-3 py-1 rounded-full">
              Level 6 • Shift Complete & Graduation Summary
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#4A2C2A] mt-2">
              You Mastered the Decorator Pattern!
            </h2>
            <p className="text-sm md:text-base font-bold text-[#4A2C2A]/80 max-w-2xl mx-auto mt-1">
              EduPlay Pizza Co. is thriving! Nonna Rosa got her custom Margherita with Mushrooms, and your codebase remains clean, extensible, and open for future toppings.
            </p>

            {/* Score & Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-3 shadow-sm">
                <div className="text-xs font-black text-[#4A2C2A]/70 uppercase">
                  Total Shop Cash
                </div>
                <div className="text-2xl font-black text-emerald-700 mt-0.5">
                  ${score.toFixed(2)}
                </div>
              </div>
              <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-3 shadow-sm">
                <div className="text-xs font-black text-[#4A2C2A]/70 uppercase">
                  Satisfaction
                </div>
                <div className="text-2xl font-black text-amber-600 mt-0.5">
                  {satisfaction}%
                </div>
              </div>
              <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-3 shadow-sm">
                <div className="text-xs font-black text-[#4A2C2A]/70 uppercase">
                  Levels Completed
                </div>
                <div className="text-2xl font-black text-[#4A2C2A] mt-0.5">6 / 6</div>
              </div>
              <div className="bg-white rounded-2xl border-3 border-[#4A2C2A] p-3 shadow-sm">
                <div className="text-xs font-black text-[#4A2C2A]/70 uppercase">
                  Design Rank
                </div>
                <div className="text-lg font-black text-purple-700 mt-1">
                  Master Architect
                </div>
              </div>
            </div>
          </div>

          {/* Concepts Mastered & Pattern Cheat Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            {/* Left 7 Cols: Concepts Mastered */}
            <div className="lg:col-span-7 bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A]">
              <h3 className="text-lg font-black text-[#4A2C2A] flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>OOP & Decorator Concepts Mastered</span>
              </h3>
              <div className="space-y-2.5">
                {MASTERED_CONCEPTS.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[#FFF8E7] border-2 border-[#4A2C2A] flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-400 border-2 border-[#4A2C2A] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <div className="font-black text-sm text-[#4A2C2A]">{c.title}</div>
                      <div className="text-xs text-[#4A2C2A]/80 font-medium mt-0.5">
                        {c.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Quick Exam Cheat Sheet & Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              <div className="bg-sky-100 rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A]">
                <span className="text-xs font-black uppercase bg-[#4A2C2A] text-white px-2.5 py-0.5 rounded-full">
                  Takeaway Cheat Sheet
                </span>
                <h3 className="text-lg font-black text-[#4A2C2A] mt-2">
                  When to Use the Decorator Pattern?
                </h3>
                <ul className="mt-2.5 space-y-2 text-xs md:text-sm font-medium text-[#4A2C2A]">
                  <li>
                    ✅ <strong>Use it when:</strong> You need to add responsibilities or behaviors to individual objects dynamically and transparently at runtime without affecting other objects.
                  </li>
                  <li>
                    ✅ <strong>Use it when:</strong> Extending behavior via subclassing is impractical and leads to an explosion of combinations (e.g., Java I/O Streams: `new BufferedReader(new FileReader(...))`).
                  </li>
                  <li>
                    ⚖️ <strong>Trade-off to remember:</strong> It creates many small wrapper objects in memory and can make debugging long wrapper chains slightly trickier.
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-3xl border-4 border-[#4A2C2A] p-5 shadow-[0_4px_0_#4A2C2A] space-y-3">
                <button
                  onClick={() => goToLevel(5)}
                  className="w-full py-3 rounded-2xl bg-emerald-300 hover:bg-emerald-400 text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center justify-center gap-2"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Return to Pizza Sandbox (Level 5)</span>
                </button>

                <button
                  onClick={resetFullGame}
                  className="w-full py-3 rounded-2xl bg-[#FACC15] hover:bg-[#F59E0B] text-[#4A2C2A] font-black text-sm border-3 border-[#4A2C2A] shadow-[0_3px_0_#4A2C2A] flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again from Level 1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // MAIN GAME SHELL RENDER
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#3E2422] text-[#4A2C2A] flex flex-col font-sans selection:bg-amber-300">
      {/* Top Game HUD */}
      {renderTopHUD()}

      {/* Main Level Stage */}
      <main className="flex-1 p-3 sm:p-5 md:p-6 flex items-center justify-center">
        {currentLevel === 1 && renderLevel1()}
        {currentLevel === 2 && renderLevel2()}
        {currentLevel === 3 && renderLevel3()}
        {currentLevel === 4 && renderLevel4()}
        {currentLevel === 5 && renderLevel5()}
        {currentLevel === 6 && renderLevel6()}
      </main>

      {/* Subtle Bottom Footer with Quick Level Jump Info */}
      <footer className="px-4 py-2 bg-[#2B1817] border-t-2 border-[#4A2C2A] text-amber-100/70 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-black text-amber-300">EduPlay</span>
          <span>• Interactive OOP Design Pattern Game Prototype (Decorator Pattern)</span>
        </div>
        <div className="flex items-center gap-3">
          <span>
            Current Stage: <strong className="text-white">Level {currentLevel} of 6</strong>
          </span>
          <span className="hidden sm:inline text-amber-300/80">
            (Tip: Use the top HUD buttons to jump between any level during your demo!)
          </span>
        </div>
      </footer>
    </div>
  );
}