import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sparkles, 
  Check, 
  Zap,
  ShieldCheck,
  Lock,
  Download,
  AlertTriangle,
  Flame,
  Activity,
  HeartPulse,
  BatteryCharging,
  CalendarCheck,
  Star,
  Quote,
  BookOpen
} from 'lucide-react';

interface UpsellRFEFProps {
  onAccept: () => void;
  onDecline: () => void;
}

const TESTIMONIALS = [
  {
    name: "Lucas D.",
    role: "Milieu relayeur (24 ans)",
    club: "Régional 1 - Île-de-France",
    image: "/testimonials/lucas.webp",
    fallback: "https://i.ibb.co/67V6Jyf0/20260105-163433-2335539-3103-scaled.webp",
    rating: 5,
    text: "Après mes 10 semaines de PrépA'Foot, j'étais une machine en août. Mais c'est Match-Ready 365 qui a véritablement sauvé ma saison : d'habitude je claquais aux ischios fin octobre. Cette année, 26 matchs joués, 0 blessure et je finis les matchs en sprintant à la 92e.",
    highlight: "26 matchs joués, 0 blessure"
  },
  {
    name: "Kévin M.",
    role: "Ailier percutant (22 ans)",
    club: "National 3 - Auvergne-Rhône-Alpes",
    image: "/testimonials/kevin.webp",
    fallback: "https://i.ibb.co/wxNWYxf/images.jpg",
    rating: 5,
    text: "Le micro-dosing de 15 minutes le mercredi matin est redoutable. Aucun mal de jambes pour le dimanche, et mon temps au 30m n'a pas bougé d'un centième entre septembre et avril. Franchement indispensable.",
    highlight: "Explosivité intacte sur 9 mois"
  },
  {
    name: "Stéphane B.",
    role: "Entraîneur principal & Préparateur physique",
    club: "Séniors R2 - Nouvelle-Aquitaine",
    image: "/testimonials/stephane.webp",
    fallback: "https://i.ibb.co/jZ6c6xj9/Leo-Conde-treinador-vitoria-1024x731.webp",
    rating: 5,
    text: "J'ai recommandé le pack à mes 18 joueurs de champ. La différence sur les deuxièmes mi-temps est flagrante face aux équipes qui s'effondrent physiquement. Zéro lésion musculaire sur toute la phase aller. Le protocole 48h post-match est calibré au millimètre.",
    highlight: "Zéro lésion musculaire sur la phase aller"
  },
  {
    name: "Yassine T.",
    role: "Latéral droit (19 ans)",
    club: "U19 Nationaux - Grand Est",
    image: "/testimonials/yassine.webp",
    fallback: "https://i.ibb.co/RGd9FBHV/pexels-photo-37926706.avif",
    rating: 5,
    text: "Avec le rythme cours + entraînements + matchs le dimanche, j'avais souvent les jambes en coton dès le mardi. La routine de récupération et le renforcement des adducteurs m'ont permis de garder ma place de titulaire toute la saison sans baisse de régime.",
    highlight: "Titulaire indiscutable toute la saison"
  },
  {
    name: "Thomas L.",
    role: "Défenseur central (27 ans)",
    club: "Régional 2 - Bretagne",
    image: "/testimonials/thomas.webp",
    fallback: "https://i.ibb.co/wFZ0qfGm/pexels-photo-39423323.avif",
    rating: 5,
    text: "Le meilleur investissement de ma carrière amateur. Pour 17,94€, ça m'a évité les 3 ou 4 séances de kiné habituelles de fin d'année. Dès le mardi matin, mes courbatures ont disparu et je suis prêt à renvoyer du lourd.",
    highlight: "Courbatures effacées dès le mardi"
  }
];

const PRODUCT_PAGE_SAMPLES = [
  { url: "https://i.ibb.co/CCyZ57N/Screenshot-20260922-115814-Adobe-Acrobat.jpg", alt: "Extrait page 1" },
  { url: "https://i.ibb.co/xK0KVK00/Screenshot-20260922-115826-Adobe-Acrobat.jpg", alt: "Extrait page 2" },
  { url: "https://i.ibb.co/k2gmFg8g/Screenshot-20260922-115832-Adobe-Acrobat.jpg", alt: "Extrait page 3" },
  { url: "https://i.ibb.co/tMz1JRq8/Screenshot-20260922-115840-Adobe-Acrobat.jpg", alt: "Extrait page 4" },
  { url: "https://i.ibb.co/5g2ZNkVp/Screenshot-20260922-115847-Adobe-Acrobat.jpg", alt: "Extrait page 5" },
  { url: "https://i.ibb.co/hRyqD5km/Screenshot-20260922-115854-Adobe-Acrobat.jpg", alt: "Extrait page 6" }
];

export default function UpsellRFEF({ onAccept, onDecline }: UpsellRFEFProps) {
  const [secondsLeft, setSecondsLeft] = useState(1500); // 25:00 countdown

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 1500 : prev - 1));
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
    <div id="upsell-page" className="relative min-h-screen bg-white text-slate-900 antialiased overflow-x-clip font-sans pb-20 selection:bg-emerald-500 selection:text-white">
      
      {/* Background subtle light pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.06),rgba(255,255,255,1))] pointer-events-none"></div>

      {/* ================= 1. BANNIÈRE D'URGENCE SUPÉRIEURE AVEC TEMPORISATEUR (ROUGE COMPACTE) ================= */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-1.5 px-3 shadow-md sticky top-0 z-50 border-b border-red-500">
        <div className="max-w-4xl mx-auto flex flex-row items-center justify-center gap-2 sm:gap-3 text-center">
          <div className="flex items-center gap-1.5 font-black tracking-wide text-[11px] sm:text-xs uppercase text-white">
            <span className="text-xs sm:text-sm select-none animate-pulse">⚠️</span>
            <span>ATTENTION : COMMANDE EN COURS DE FINALISATION !</span>
          </div>
          <div className="flex items-center gap-1 bg-black/75 text-red-200 border border-red-400/40 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black font-mono tracking-wider shadow-inner">
            <Clock className="h-3 w-3 text-red-400 animate-pulse" />
            <span>⏱️ {formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 relative z-10 space-y-8">
        
        {/* ================= BARRE DE PROGRESSION DU CHECKOUT (85%) ================= */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden text-slate-900">
          
          {/* Header section with step badge and clear title */}
          <div className="flex flex-col items-center text-center space-y-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 font-black text-[11px] sm:text-xs uppercase tracking-widest font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              ÉTAPE 2 SUR 4
            </div>
            
            <h2 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight text-slate-950 leading-snug">
              PLUS QU'UNE DERNIÈRE ÉTAPE POUR FINALISER VOTRE ACCÈS
            </h2>
            
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Votre commande principale est déjà réservée et confirmée.
            </p>
          </div>

          {/* Progress gauge header */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono font-bold tracking-wider mb-2">
            <span className="text-slate-500 uppercase">État de votre commande</span>
            <span className="text-emerald-800 font-black tracking-widest bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-300 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              85% TERMINÉ
            </span>
          </div>
          
          {/* Progress bar with glowing gradient and active shine tip */}
          <div className="relative bg-slate-100 h-4 sm:h-5 rounded-full overflow-hidden border border-slate-300/80 p-0.5 shadow-inner">
            <div 
              className="relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.5)] flex items-center justify-end pr-1"
              style={{ width: '85%' }}
            >
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-pulse"></span>
            </div>
          </div>

          {/* Milestones tracker */}
          <div className="grid grid-cols-3 text-[10px] sm:text-xs text-center font-bold uppercase tracking-wider pt-3.5 border-t border-slate-100 mt-3.5 gap-1">
            <span className="text-emerald-700 flex items-center justify-center gap-1 font-extrabold">
              ● 1. GUIDE RÉSERVÉ
            </span>
            <span className="text-emerald-600 flex items-center justify-center gap-1 font-extrabold animate-pulse">
              ● 2. OFFRE EXCLUSIVE
            </span>
            <span className="text-slate-400 flex items-center justify-center gap-1">
              ● 3. ACCÈS IMMÉDIAT
            </span>
          </div>
        </div>
        
        {/* ================= 2. TITRE CHOC (HEADLINE) & SOUS-TITRE ================= */}
        <div className="text-center space-y-4 pt-2">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full text-emerald-800 text-xs font-black tracking-widest uppercase">
            <Flame className="h-3.5 w-3.5 text-emerald-600" />
            <span>ACCÈS EXCLUSIF RÉSERVÉ AUX MEMBRES PRÉPA'FOOT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase text-slate-950">
            ATTENDS ! NE FERME PAS CETTE PAGE... <br />
            COMMENT GARDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-600">100% DE TA CONDITION PHYSIQUE</span> PENDANT TOUS LES 9 MOIS DE COMPÉTITION ?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Tu as sécurisé ta pré-saison. Découvre maintenant le protocole <strong>In-Season & Match-Ready</strong> pour maintenir ta vitesse, ta puissance et éliminer les blessures musculaires du premier au dernier match de championnat.
          </p>

          {/* Image de présentation Match-Ready 365 */}
          <div className="pt-2 max-w-lg sm:max-w-xl mx-auto flex justify-center">
            <div className="relative group w-full flex justify-center">
              <img 
                src="https://i.ibb.co/YTfvXyN0/Chat-GPT-Image-22-de-set-de-2026-11-52-28.png" 
                alt="Match-Ready 365 In-Season & Match-Ready Protocol" 
                referrerPolicy="no-referrer"
                className="w-full max-h-[460px] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] transform hover:scale-[1.02] transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
        </div>

        {/* ================= 3. L'ACCROCHE ET LA TRANSITION (LE PONT) ================= */}
        <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base shadow-lg">
          <p className="font-bold text-slate-950 text-base sm:text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span>Félicitations pour avoir sécurisé PrépA'Foot 10 Semaines !</span>
          </p>
          <p>
            Ton programme de pré-saison est en route vers ta boîte e-mail. Grâce à ces 10 semaines, tu vas arriver au premier entraînement collectif plus affûté, puissant et endurant que <strong>95% des joueurs du vestiaire</strong>.
          </p>
          <p className="text-slate-900 font-semibold">
            Mais en tant que préparateur physique, je dois te mettre en garde contre le piège fatal :
          </p>
          <div className="border-l-4 border-emerald-500 pl-4 py-2 italic text-emerald-950 font-medium bg-emerald-50 rounded-r-lg">
            « À quoi bon construire un moteur de Formule 1 en pré-saison si tu perds 40% de ta puissance au bout de 4 journées de championnat ou si tes ischio-jambiers lâchent fin octobre ? »
          </div>
          <p>
            La réalité du football en saison est brutale : avec les matchs du week-end, les séances tactiques et la fatigue accumulée, <strong>80% des joueurs régressent physiquement dès novembre</strong>. Leurs jambes deviennent lourdes à la 70e minute, les adducteurs sifflent et les sprints manquent d'explosivité.
          </p>
          <p>
            Ce n'est pas de leur faute : personne ne leur a appris à <em>doser</em> et <em>entretenir</em> leur condition en compétition.
          </p>
        </div>

        {/* ================= 4. PRÉSENTATION DU PRODUIT & BÉNÉFICES CLÉS ================= */}
        <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden text-slate-900">
          
          <div className="text-center space-y-2 pb-3 border-b border-slate-200">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-800 font-black">
              LE PROTOCOLE DE COMPÉTITION IN-SEASON
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              MATCH-READY 365 : LE SYSTÈME DE MAINTIEN & RÉCUPÉRATION DE SAISON
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Le manuel d'entretien physique ultra-ciblé (15-20 min 2x/semaine) pour voler sur le terrain chaque week-end.
            </p>
          </div>

          {/* Bullet points d'impact */}
          <div className="space-y-4 pt-2">
            
            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 font-black text-xs">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-950 uppercase tracking-tight">
                  Le Micro-Dosing de Puissance & Vitesse (15 min chrono)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Comment stimuler tes fibres rapides et maintenir ton explosivité maximale en 2 courtes routines hebdomadaires sans jamais accumuler de fatigue résiduelle avant le match.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 font-black text-xs">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-950 uppercase tracking-tight">
                  Protocole Récupération Express 48h Post-Match
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  La séquence exacte (nutrition, sommeil, mobilité active et drainage) pour effacer les courbatures et retrouver des jambes légères dès le mardi, même après 90 minutes intenses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 font-black text-xs">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-950 uppercase tracking-tight">
                  Le Bouclier Anti-Blessures (Ischios & Adducteurs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Les exercices excentriques et le renforcement du tronc utilisés en Ligue 1 pour blinder les zones les plus vulnérables des footballeurs et traverser la saison sans pépin.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
              <div className="h-7 w-7 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 font-black text-xs">
                ✓
              </div>
              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-slate-950 uppercase tracking-tight">
                  Gestion des Semaines à 2 Matchs (Mercredi - Dimanche)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  L'ajustement tactique de tes charges de travail lors des semaines de coupe ou de matchs en retard pour performer sans risquer le claquage.
                </p>
              </div>
            </div>

          </div>

          {/* ================= ÉCHANTILLONS VISUELS DU GUIDE (DÉFILEMENT INFINI) ================= */}
          <div className="pt-2 pb-1 space-y-3">
            
            {/* Header with Title and Direct Value */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-black tracking-widest uppercase mb-1">
                  <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                  <span>APERÇU DIRECT DU GUIDE NUMÉRIQUE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
                  FEUILLETTE UN APERÇU DE TES FICHES TERRAIN
                </h3>
              </div>

              {/* Status indicator for infinite flow */}
              <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Défilement continu • Survoler pour figer</span>
              </div>
            </div>

            {/* Product Samples infinite horizontal scrolling track */}
            <div className="relative overflow-hidden w-full py-2">
              {/* Fade gradients on edges for seamless look */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

              <div className="animate-marquee flex gap-4 w-max hover:[animation-play-state:paused] active:[animation-play-state:paused]">
                {[...PRODUCT_PAGE_SAMPLES, ...PRODUCT_PAGE_SAMPLES].map((sample, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 w-[200px] sm:w-[240px] bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <img 
                      src={sample.url} 
                      alt={sample.alt} 
                      referrerPolicy="no-referrer"
                      loading="lazy" 
                      className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================= TÉMOIGNAGES AVEC DÉFILEMENT LATÉRAL INFINI ET FLUIDE ================= */}
          <div className="pt-2 pb-1 space-y-3">
            
            {/* Header with Title and Social Proof */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-800 text-[11px] font-black tracking-widest uppercase mb-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>RETOUR D'EXPÉRIENCE DU TERRAIN</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
                  ILS ONT VOLÉ SUR LE TERRAIN SUR 9 MOIS
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">4.9/5</span>
                  <span className="text-xs text-slate-500 font-medium">• 142 joueurs et coachs accompagnés</span>
                </div>
              </div>

              {/* Status indicator for infinite flow */}
              <div className="inline-flex items-center gap-2 self-start sm:self-auto bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Défilement continu • Survoler pour figer</span>
              </div>
            </div>

            {/* Testimonials infinite horizontal scrolling track */}
            <div className="relative overflow-hidden w-full py-2">
              {/* Fade gradients on edges for seamless look */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10"></div>

              <div className="animate-marquee flex gap-4 w-max hover:[animation-play-state:paused] active:[animation-play-state:paused]">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] bg-slate-50 border border-slate-200/90 hover:border-emerald-400 hover:bg-white rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-full">
                          Avis vérifié
                        </span>
                      </div>

                      <div className="relative">
                        <Quote className="h-4 w-4 text-emerald-600/30 absolute -top-1 -left-1" />
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic pl-3">
                          "{t.text}"
                        </p>
                      </div>

                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1 text-[11px] font-bold text-emerald-900">
                        ⚡ Résultat clé : {t.highlight}
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 pt-4 mt-3 border-t border-slate-200/80">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-emerald-500/60 ring-offset-2 ring-offset-white flex-shrink-0 shadow-md bg-slate-100 relative group-hover:ring-emerald-500 transition-all">
                        <img 
                          src={t.image} 
                          alt={t.name}
                          onError={(e) => {
                            if (t.fallback && e.currentTarget.src !== t.fallback) {
                              e.currentTarget.src = t.fallback;
                            }
                          }}
                          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-300" 
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {t.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate font-medium">
                          {t.role}
                        </p>
                        <p className="text-[10px] font-semibold text-emerald-700 truncate">
                          {t.club}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hint message */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
              <span>💡 Les avis défilent en continu. Touchez ou survolez une carte pour l'arrêter et la lire.</span>
            </div>
          </div>

          {/* ================= 5. L'OFFRE EXCLUSIVE (FOMO / RARETÉ) ================= */}
          <div className="bg-emerald-50/70 border-2 border-emerald-300 rounded-xl p-5 text-center space-y-3 shadow-sm">
            <span className="text-[11px] sm:text-xs text-emerald-900 font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-emerald-700" />
              OFFRE UNIQUE DE MISE À NIVEAU • RÉSERVÉE À CETTE PAGE
            </span>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto">
              Ce programme n'est proposé qu'ici aux acquéreurs de <strong>PrépA'Foot 10 Semaines</strong>. Dès que cette page sera fermée, cette opportunité disparaîtra et le protocole retournera à son tarif officiel.
            </p>
            
            <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4">
              <span className="text-red-600 line-through decoration-red-600 decoration-2 text-xl sm:text-2xl md:text-3xl font-bold font-mono">67 €</span>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-emerald-600 font-mono tracking-tight">17,94 €</span>
            </div>
            <span className="text-[11px] text-slate-500 uppercase font-mono block font-medium">
              Paiement unique • Accès immédiat dans ta boîte e-mail
            </span>
          </div>

          {/* ================= 6. APPELS À L'ACTION (CTA) ================= */}
          <div className="space-y-4 pt-2">

            {/* HOTMART Funnel Widget Container */}
            <div id="hotmart-sales-funnel" className="w-full flex justify-center items-center min-h-[60px]"></div>

          </div>

          {/* ================= 7. GARANTIE ET RÉASSURANCE ================= */}
          <div className="pt-5 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>GARANTIE INCONDITIONNELLE 100% SATISFAIT OU REMBOURSÉ (30 JOURS)</span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 text-center max-w-lg mx-auto leading-relaxed">
              Mets en application les routines de <em>Match-Ready 365</em> lors de tes premières semaines de compétition. Si tu ne constates pas un maintien spectaculaire de ton explosivité et une récupération ultra-rapide entre les matchs, envoie un simple e-mail sous 30 jours pour un remboursement complet et immédiat.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-5 text-[10px] font-mono text-slate-500 uppercase tracking-widest pt-2">
              <span className="flex items-center gap-1 text-slate-600">
                <Lock className="h-3 w-3 text-emerald-600" /> SSL Sécurisé 256-Bit
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <Download className="h-3 w-3 text-emerald-600" /> Téléchargement Immédiat
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
