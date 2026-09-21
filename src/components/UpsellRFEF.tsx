import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  Check, 
  Zap,
  ShieldCheck,
  Lock,
  Download
} from 'lucide-react';
const PACK_SAISON_IMG = "https://i.ibb.co/Fk9XwFQW/Chat-GPT-Image-21-de-set-de-2026-14-25-21.png";

interface UpsellRFEFProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function UpsellRFEF({ onAccept, onDecline }: UpsellRFEFProps) {
  const [secondsLeft, setSecondsLeft] = useState(1511); // 25:11 countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 1511 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Load Hotmart Sales Funnel script and initialize widget
  useEffect(() => {
    let checkInterval: any = null;

    const mountHotmart = () => {
      const container = document.getElementById('hotmart-sales-funnel');
      const checkoutElements = (window as any).checkoutElements;
      
      if (checkoutElements && container) {
        try {
          if (!container.querySelector('iframe')) {
            checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
          }
          return true;
        } catch (err) {
          console.error("Erreur lors de l'initialisation du widget Hotmart :", err);
        }
      }
      return false;
    };

    if (!mountHotmart()) {
      let script = document.querySelector('script[src="https://checkout.hotmart.com/lib/hotmart-checkout-elements.js"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
        script.async = true;
        document.body.appendChild(script);
      }
      script.addEventListener('load', () => mountHotmart());

      checkInterval = setInterval(() => {
        if (mountHotmart()) {
          clearInterval(checkInterval);
        }
      }, 150);
    }

    const timeout = setTimeout(() => {
      if (checkInterval) clearInterval(checkInterval);
    }, 8000);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="upsell-page" className="relative min-h-screen bg-white text-slate-900 antialiased overflow-x-clip font-sans pb-16 selection:bg-emerald-500 selection:text-white">
      
      {/* Soccer field line pattern overlay */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      {/* Subtle athletic green glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* ================= 1 & 2. HIGH URGENCY HEADER TICKER WITH DYNAMIC TIMER ================= */}
      <div className="bg-slate-950 text-white py-2 px-3 shadow-md sticky top-0 z-50 border-b border-emerald-500/40">
        <div className="max-w-4xl mx-auto flex flex-row items-center justify-center gap-3 sm:gap-4 text-center">
          <div className="flex items-center gap-1.5 font-black tracking-wider text-xs sm:text-sm uppercase text-white">
            <span className="text-emerald-400 text-sm sm:text-base select-none animate-pulse">🔥</span>
            <span>OFFRE SPÉCIALE AUJOURD’HUI SEULEMENT !</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-400/30 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-black font-mono tracking-wider text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 animate-pulse" />
            <span>{formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* ================= 3 & 4. STEP PROGRESS BAR CARD (ÉTAPE 2 SUR 4, 85%) ================= */}
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden max-w-3xl mx-auto text-slate-900">
          <div className="text-center">
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-wide leading-snug uppercase text-slate-900">
              ÉTAPE 2 SUR 4 : <span className="text-emerald-600">PLUS QU’UNE ÉTAPE !</span> VOTRE COMMANDE PRINCIPALE EST DÉJÀ RÉSERVÉE
            </h2>
          </div>
          
          <div className="flex items-center justify-between gap-4 mt-6 max-w-2xl mx-auto">
            <div className="relative flex-1 bg-slate-100 h-4.5 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-lime-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                style={{ width: '85%' }}
              />
            </div>
            <span className="text-emerald-700 text-sm sm:text-base font-black tracking-widest whitespace-nowrap uppercase">
              85 % TERMINÉ
            </span>
          </div>
        </div>
        
        {/* ================= 5 & 6. HEADLINE & SUBTITLE ================= */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-emerald-800 to-slate-950">
              PRÉPAREZ VOS JOUEURS
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-lime-600 to-emerald-600">
              COMME DES ATHLÈTES !
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Un pack pratique d’exercices pour développer la vitesse, l’endurance, l’explosivité, l’agilité et les qualités physiques essentielles du footballeur.
          </p>
        </div>

        {/* ================= 7, 8, 9, 10, 11, 12. HERO CARD WITH MOCKUP & CONTENTS ================= */}
        <div className="flex flex-col gap-6 bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden items-center max-w-3xl mx-auto">
          
          {/* 7. Product Mockup Visual */}
          <div className="w-full flex flex-col items-center justify-center">
            <div className="relative group overflow-hidden rounded-2xl bg-slate-950 p-2 border-2 border-slate-800 shadow-[0_20px_35px_rgba(0,0,0,0.25)] w-full max-w-[560px] flex items-center justify-center">
              <img 
                src={PACK_SAISON_IMG}
                alt="Préparation Physique Football – Pack Saison" 
                className="w-full h-auto max-h-[520px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.02] block"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 8 & 9. "CE QUE VOUS RECEVEZ INSTANTANÉMENT PAR E-MAIL :" & Content Items */}
          <div className="w-full space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 uppercase flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0" />
              <span>CE QUE VOUS RECEVEZ INSTANTANÉMENT PAR E-MAIL :</span>
            </h3>

            <div className="space-y-4">
              {/* Item 1: Préparation de début de saison */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5 font-black text-xs font-mono">
                  01
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                    PRÉPARATION DE DÉBUT DE SAISON
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Un programme structuré sur 5 semaines avec 3 séances par semaine pour remettre progressivement les joueurs en condition physique et établir une base de travail adaptée.
                  </p>
                </div>
              </div>

              {/* Item 2: VMA, Puissance aérobie & Renforcement */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5 font-black text-xs font-mono">
                  02
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                    VMA, PUISSANCE AÉROBIE & RENFORCEMENT
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Des séances progressives pour travailler la VMA, la puissance aérobie, l’endurance, l’explosivité et le renforcement musculaire à travers différents formats d’entraînement.
                  </p>
                </div>
              </div>

              {/* Item 3: Travail avec ballon & Phases de la saison */}
              <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-colors">
                <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-700 flex-shrink-0 mt-0.5 font-black text-xs font-mono">
                  03
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-tight">
                    TRAVAIL AVEC BALLON & PHASES DE LA SAISON
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Des séances intégrant le ballon, le Fartlek, les changements de direction et le travail d’endurance, avec une organisation adaptée aux différentes phases de la saison.
                  </p>
                </div>
              </div>

              {/* 10. Phrase Récapitulative */}
              <div className="bg-emerald-50/80 border border-emerald-300 rounded-xl p-3.5 flex items-center gap-3">
                <Zap className="h-5 w-5 text-emerald-700 flex-shrink-0" />
                <p className="text-xs sm:text-sm font-bold text-emerald-950 uppercase">
                  UN PACK COMPLET DE PRÉPARATION PHYSIQUE POUR PLANIFIER ET STRUCTURER LE TRAVAIL PHYSIQUE DE VOS JOUEURS AU FIL DE LA SAISON.
                </p>
              </div>
            </div>

            {/* 11 & 12. Bloc Prix & Mention Paiement Unique */}
            <div className="pt-6 border-t border-slate-200 flex flex-col items-center justify-center gap-4 text-center bg-slate-50/70 p-4 rounded-xl border border-slate-200">
              <div className="flex flex-col items-center justify-center gap-1.5 bg-white border-2 border-emerald-500 px-4 sm:px-8 py-5 rounded-2xl w-full max-w-lg shadow-[0_0_25px_rgba(16,185,129,0.18)]">
                <span className="text-[11px] sm:text-xs text-emerald-800 uppercase tracking-widest font-black">
                  PACK COMPLET DE PRÉPARATION PHYSIQUE
                </span>
                <span className="text-[10px] sm:text-[11px] text-slate-600 uppercase tracking-wider font-extrabold">
                  PACK SAISON • PROGRAMMATION COMPLÈTE
                </span>
                <span className="text-xs text-emerald-700 uppercase tracking-widest font-black mt-1">
                  OFFRE SPÉCIALE :
                </span>
                <div className="flex items-center justify-center text-slate-950 font-['Montserrat','Arial_Black',sans-serif] py-1 whitespace-nowrap">
                  <span className="text-5xl sm:text-6xl md:text-7xl font-[900] tracking-tight leading-none text-emerald-600">
                    12,48 €
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-mono tracking-wider text-center font-medium">
                  Paiement unique • Accès et téléchargement immédiats
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* ================= 13, 14, 15. HIGH-CONVERSION OFFER INTERACTIVE CARD (CTA & TRUST) ================= */}
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-2xl relative text-white">
          
          <div className="space-y-2 pt-2">
            <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              AJOUTEZ CE PACK À VOTRE COMMANDE MAINTENANT
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Cliquez ci-dessous pour ajouter ce pack exclusif à votre commande. Le paiement de 12,48 € sera traité de manière sécurisée.
            </p>
          </div>

          {/* 13. Hotmart Funnel CTA Container */}
          <div className="max-w-md mx-auto space-y-4">
            
            {/* HOTMART - Sales Funnel Widget Container (hooks Hotmart iframe seamlessly if active) */}
            <div id="hotmart-sales-funnel" className="w-full flex justify-center items-center min-h-[50px]"></div>

            {/* 14. Texte explicatif sous le bouton */}
            <p className="text-[11px] sm:text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Cliquez ci-dessus pour ajouter ce pack exclusif à votre commande. Le paiement de 12,48 € sera traité de manière sécurisée.
            </p>

            {/* Upsell Decline Link (Logical Funnel step) */}
            <div className="pt-2">
              <button
                id="cta-upsell-decline"
                onClick={onDecline}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-normal transition-colors cursor-pointer block mx-auto py-1"
              >
                Non merci, je refuse cette offre unique et je poursuis sans le Pack Préparation Physique
              </button>
            </div>
          </div>

          {/* 15. Bloc de confiance en bas : SSL / Garantie / Téléchargement numérique */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Lock className="h-3.5 w-3.5 text-emerald-400" />
              <span>SSL SÉCURISÉ</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>7 JOURS DE GARANTIE</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Download className="h-3.5 w-3.5 text-emerald-400" />
              <span>TÉLÉCHARGEMENT NUMÉRIQUE IMMÉDIAT</span>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
