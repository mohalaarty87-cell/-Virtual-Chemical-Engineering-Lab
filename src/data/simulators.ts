import { CategoryMeta, CategoryType, SimulatorItem } from '../types';

export const CATEGORIES_META: Record<CategoryType, CategoryMeta> = {
  reactor: {
    id: 'reactor',
    title_ar: 'تصميم المفاعلات الكيمياوية',
    title_en: 'Reactor Design',
    subtitle_ar: 'محاكيات المفاعلات الكيمياوية وأنماط الجريان والحركية',
    subtitle_en: 'Chemical reactor simulators, flow patterns & kinetics',
    iconName: 'Atom',
    colorClass: 'from-amber-500 to-rose-600',
    gradient: 'linear-gradient(135deg, #ef4444, #f59e0b)',
  },
  transfer: {
    id: 'transfer',
    title_ar: 'معدات انتقال الكتلة والحرارة',
    title_en: 'Mass & Heat Transfer Equipment',
    subtitle_ar: 'الأبراج والمبادلات ووحدات التقطير والفصل',
    subtitle_en: 'Columns, exchangers, distillation & separation units',
    iconName: 'Flame',
    colorClass: 'from-cyan-500 to-indigo-600',
    gradient: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
  },
  phenomena: {
    id: 'phenomena',
    title_ar: 'ظواهر انتقال الكتلة',
    title_en: 'Mass Transfer Phenomena',
    subtitle_ar: 'الانتشار الجزيئي والنظريات الحركية والطبقات الحدية',
    subtitle_en: 'Molecular diffusion, kinetic models & boundary layers',
    iconName: 'Activity',
    colorClass: 'from-emerald-500 to-teal-600',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
  },
  control: {
    id: 'control',
    title_ar: 'مختبر السيطرة على العمليات',
    title_en: 'Process Control Lab',
    subtitle_ar: 'المتحكمات الصناعية والحلقات الديناميكية والاستجابة',
    subtitle_en: 'Industrial controllers, dynamic loops & system responses',
    iconName: 'Sliders',
    colorClass: 'from-violet-500 to-fuchsia-600',
    gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  },
};

export const INITIAL_SIMULATORS: SimulatorItem[] = [
  // ================= REACTORS (7) =================
  {
    id: 'jacketed-batch-reactor',
    category: 'reactor',
    title_ar: 'المفاعل الدفعي بقميص',
title_en: 'Jacketed Batch Reactor',
  desc_ar: 'تفاعلات متتالية طاردة للحرارة A → B → C، والزمن المثالي لإيقاف الدفعة، والتحكم المتتالي، والانفلات الحراري وصمام الأمان.',
  desc_en: 'Consecutive exothermic reactions A → B → C, optimal batch stop time, cascade control, thermal runaway and safety relief valve.',
  url: '/simulations/02.html',
    iconName: 'FlaskConical',
    badge: '3D Simulation',
    tags: ['A → B → C', 'Thermal Runaway', 'Cascade Control', 'Safety Valve'],
    equation: 'dCA/dt = -k1·CA,  dCB/dt = k1·CA - k2·CB',
    equationDescription_ar: 'حركية التفاعلات المتتالية مع موازنة الطاقة في الخزان والقميص التبريدي.',
    equationDescription_en: 'Consecutive reaction kinetics coupled with energy balance on tank and jacket.',
    keyParameters: [
      { name_ar: 'درجة حرارة القميص', name_en: 'Jacket Temp', unit: '°C', typicalRange: '15 - 90' },
      { name_ar: 'سرعة التحريك', name_en: 'Agitator Speed', unit: 'rpm', typicalRange: '100 - 600' },
      { name_ar: 'حرارة التفاعل', name_en: 'Heat of Reaction ΔH', unit: 'kJ/mol', typicalRange: '-80' }
    ]
  },
  {
    id: 'cstr',
    category: 'reactor',
    title_ar: 'المفاعل الخزاني المستمر ذو الخلاط',
    title_en: 'Continuous Stirred-Tank Reactor (CSTR)',
    desc_ar: 'خلط تام، وتحويل A + B → C، مع المناطق الميتة والجريان المختصر وتوزيع التراكيز والإنتاجية.',
    desc_en: 'Perfect mixing, conversion A + B → C, with dead zones, short-circuiting, concentration profiles and productivity.',
    url: '/simulations/02.html',
    iconName: 'RefreshCw',
    badge: '3D Simulation',
    tags: ['CSTR', 'Perfect Mixing', 'Dead Zones', 'Conversion'],
    equation: 'V = FA0 · XA / (-rA)',
    equationDescription_ar: 'معادلة تصميم CSTR القياسية لربط حجم المفاعل بمعدل التدفق ونسبة التحويل.',
    equationDescription_en: 'Standard CSTR design equation relating reactor volume to flow rate and conversion.',
    keyParameters: [
      { name_ar: 'معدل التغذية الحجمي', name_en: 'Volumetric Feed Rate', unit: 'L/min', typicalRange: '1 - 20' },
      { name_ar: 'تركيز التغذية CA0', name_en: 'Feed Concentration', unit: 'mol/L', typicalRange: '0.1 - 2.0' },
      { name_ar: 'حجم المفاعل V', name_en: 'Reactor Volume', unit: 'L', typicalRange: '5 - 50' }
    ]
  },
  {
    id: 'exothermic-cstr-multiple-states',
    category: 'reactor',
    title_ar: 'المفاعل الخزاني الناشر للحرارة: اتزان متعدد وسيطرة',
    title_en: 'Exothermic CSTR: Multiple Steady States',
    desc_ar: 'ثلاث حالات اتزان، مخطط van Heerden والتفرع ومستوى الطور، والانفلات الحراري والتذبذب المستمر.',
    desc_en: 'Three steady states, van Heerden diagram, bifurcation and phase plane, runaway and sustained oscillations.',
    url: '/simulations/03.html',
    iconName: 'Flame',
    badge: '3D Simulation',
    tags: ['van Heerden', 'Bifurcation', 'Multiple States', 'Runaway'],
    equation: 'Qg(T) = (-ΔH)·V·k0·e^(-E/RT)·CA = Qr(T)',
    equationDescription_ar: 'تطابق منحنى توليد الحرارة مع خط إزالة الحرارة لتحديد نقاط الاتزان المستقرة وغير المستقرة.',
    equationDescription_en: 'Heat generation curve intersecting heat removal line for stable and unstable states.',
    keyParameters: [
      { name_ar: 'حرارة التغذية T0', name_en: 'Inlet Temperature', unit: 'K', typicalRange: '290 - 350' },
      { name_ar: 'معامل انتقال الحرارة UA', name_en: 'Overall UA', unit: 'W/K', typicalRange: '50 - 500' }
    ]
  },
  {
    id: 'plug-flow-reactor',
    category: 'reactor',
    title_ar: 'المفاعل الأنبوبي',
    title_en: 'Plug Flow Reactor (PFR)',
    desc_ar: 'تناقص التركيز على طول الأنبوب، ومقارنة بالمفاعل الخزاني، وأثر الجريان الطباقي وتغير السرعة مع القطر.',
    desc_en: 'Concentration decay along the tube length, comparison with CSTR, laminar flow effects and velocity profiles.',
    url: '/simulations/04.html',
    iconName: 'GitCommit',
    badge: '3D Simulation',
    tags: ['PFR', 'Axial Profile', 'Conversion vs Length', 'Flow Velocity'],
    equation: 'V = FA0 ∫ (dX / -rA) from 0 to X',
    equationDescription_ar: 'تكامل الحجم اللازم لتحقيق تحويل معين على طول المفاعل الأنبوبي.',
    equationDescription_en: 'Differential volume integral to determine reactor length for target conversion.',
    keyParameters: [
      { name_ar: 'طول الأنبوب L', name_en: 'Tube Length', unit: 'm', typicalRange: '1 - 10' },
      { name_ar: 'قطر الأنبوب D', name_en: 'Tube Diameter', unit: 'cm', typicalRange: '2 - 15' }
    ]
  },
  {
    id: 'packed-bed-catalytic-reactor',
    category: 'reactor',
    title_ar: 'مفاعل الحشوة المحفزة',
title_en: 'Packed Bed Catalytic Reactor (PBR)',
  desc_ar: 'هبوط الضغط بمعادلة إرغن وأثره في التحويل، مع قطر الحبيبة وتدفق الغاز وكتلة العامل المساعد.',
  desc_en: 'Pressure drop via Ergun equation and its effect on conversion, with pellet diameter and gas velocity.',
  url: '/simulations/03.html',
    iconName: 'Boxes',
    badge: '3D Simulation',
    tags: ['Ergun Equation', 'Pressure Drop', 'Catalyst Pellets', 'Effectiveness'],
    equation: 'ΔP/L = 150·(1-ε)²·μ·u / (ε³·dp²) + 1.75·(1-ε)·ρ·u² / (ε³·dp)',
    equationDescription_ar: 'معادلة إرغن لحساب هبوط الضغط عبر الحشوة الثابتة للغازات والسوائل.',
    equationDescription_en: 'Ergun equation for frictional pressure drop in fixed-bed catalytic flow.',
    keyParameters: [
      { name_ar: 'قطر الحبيبة dp', name_en: 'Pellet Diameter', unit: 'mm', typicalRange: '1 - 8' },
      { name_ar: 'مسامية الحشوة ε', name_en: 'Bed Porosity', unit: '-', typicalRange: '0.35 - 0.50' }
    ]
  },
  {
    id: 'fluidized-bed-reactor',
    category: 'reactor',
    title_ar: 'مفاعل الطبقة المميعة',
    title_en: 'Fluidized Bed Reactor',
    desc_ar: 'من الطبقة الثابتة إلى المميعة والفقاعية والمضطربة، مع الإعصارات وسرعة التمييع الصغرى Umf.',
    desc_en: 'From fixed bed to minimum fluidization, bubbling and turbulent regimes, cyclones and elutriation.',
    url: '/simulations/06.html',
    iconName: 'Wind',
    badge: '3D Simulation',
    tags: ['Umf', 'Bubbling Bed', 'Cyclones', 'Fluidization'],
    equation: 'Umf = dp²·(ρs - ρg)·g·ε_mf³ / (150·μ·(1 - ε_mf))',
    equationDescription_ar: 'معادلة سرعة التمييع الصغرى لبدء طفو الجسيمات الصلبة في تيار الغاز.',
    equationDescription_en: 'Minimum fluidization velocity equation balancing gravity and drag forces.',
    keyParameters: [
      { name_ar: 'سرعة الغاز السطحية', name_en: 'Superficial Gas Velocity', unit: 'm/s', typicalRange: '0.05 - 1.2' },
      { name_ar: 'كثافة الحبيبات ρs', name_en: 'Particle Density', unit: 'kg/m³', typicalRange: '1200 - 2600' }
    ]
  },
  {
    id: 'residence-time-distribution',
    category: 'reactor',
    title_ar: 'توزيع زمن المكوث (RTD)',
title_en: 'Residence Time Distribution (RTD)',
  desc_ar: 'حقن نبضة متتبع وقياس E(t) للخزان والخزانات المتتالية والتشتت المحوري ونموذج الجريان الطباقي.',
  desc_en: 'Tracer pulse injection and E(t) measurement for tanks, tanks-in-series, dispersion and non-ideal flow.',
  url: '/simulations/10.html',
    iconName: 'LineChart',
    badge: '3D Simulation',
    tags: ['E(t) Curve', 'Tanks-in-Series', 'Dispersion Number', 'Mean Residence Time'],
    equation: 'E(t) = C(t) / ∫ C(t)dt,  tm = ∫ t·E(t)dt',
    equationDescription_ar: 'دالة توزيع أعمار الجزيئات الخارجة وحساب متوسط زمن المكوث والانحراف المعياري.',
    equationDescription_en: 'Normalized exit-age distribution function and mean residence time calculation.',
    keyParameters: [
      { name_ar: 'عدد الخزانات N', name_en: 'Tanks in Series N', unit: '-', typicalRange: '1 - 10' },
      { name_ar: 'رقم التشتت Pe', name_en: 'Peclet Number', unit: '-', typicalRange: '2 - 100' }
    ]
  },

  // ================= MASS & HEAT TRANSFER (10) =================
  {
    id: 'tray-distillation-column',
    category: 'transfer',
    title_ar: 'برج التقطير ذو الصواني',
    title_en: 'Tray Distillation Column',
    desc_ar: 'صواني وسدود، ونسبة الارتجاع R وتركيز كل صينية، وظاهرة الغمر وطريقة مكيب-ثيلي McCabe-Thiele.',
    desc_en: 'Trays and weirs, reflux ratio and tray compositions, flooding phenomenon and McCabe-Thiele analysis.',
    url: '/simulations/08.html',
    iconName: 'Layers',
    badge: '3D Simulation',
    tags: ['McCabe-Thiele', 'Reflux Ratio', 'Tray Efficiency', 'Flooding'],
    equation: 'y = (R / (R + 1))·x + (xD / (R + 1))',
    equationDescription_ar: 'معادلة خط التشغيل لقسم التثريج (Rectifying Section Operating Line).',
    equationDescription_en: 'Rectifying section operating line in binary vapor-liquid distillation.',
    keyParameters: [
      { name_ar: 'نسبة الارتجاع R', name_en: 'Reflux Ratio', unit: '-', typicalRange: '1.2 - 5.0' },
      { name_ar: 'عدد الصواني الفعلية', name_en: 'Actual Tray Count', unit: '-', typicalRange: '8 - 40' }
    ]
  },
  {
    id: 'packed-absorption-column',
    category: 'transfer',
    title_ar: 'برج الامتصاص المحشو',
    title_en: 'Packed Absorption Column',
    desc_ar: 'أربعة أنواع حشوة، ونسبة L/G والاسترداد، مع ظاهرة الغمر وتوزيع السائل غير المتجانس.',
    desc_en: 'Four packing types (Raschig, Pall, Berl, Mellapak), L/G ratio, gas recovery, flooding and maldistribution.',
    url: '/simulations/09.html',
    iconName: 'Filter',
    badge: '3D Simulation',
    tags: ['Absorption', 'Packing Types', 'HTU / NTU', 'L/G Ratio'],
    equation: 'Z = HTU_OG · NTU_OG',
    equationDescription_ar: 'ارتفاع الحشوة المحسوب من جداء ارتفاع وحدة الانتقال بعدد وحدات الانتقال.',
    equationDescription_en: 'Total packed height from Height of Transfer Unit times Number of Transfer Units.',
    keyParameters: [
      { name_ar: 'نسبة السائل إلى الغاز L/G', name_en: 'L/G Ratio', unit: 'kg/kg', typicalRange: '1.5 - 6.0' },
      { name_ar: 'عامل الحشوة Fp', name_en: 'Packing Factor', unit: 'm⁻¹', typicalRange: '60 - 300' }
    ]
  },
  {
    id: 'liquid-liquid-extraction-column',
    category: 'transfer',
    title_ar: 'عمود الاستخلاص سائل–سائل',
    title_en: 'Liquid–Liquid Extraction Column (RDC)',
    desc_ar: 'عمود قرص دوّار بتيارين متعاكسين: تشكل القطرات، ونسبة الاحتجاز، ومخطط الاتزان الثلاثي والغمر.',
    desc_en: 'Rotating disc contactor (RDC) with counter-current streams: droplet breakup, holdup and ternary tie-lines.',
    url: '/simulations/10.html',
    iconName: 'Droplet',
    badge: '3D Simulation',
    tags: ['RDC', 'Ternary Diagram', 'Dispersed Phase', 'Holdup'],
    equation: 'K_d = y_solute_extract / x_solute_raffinate',
    equationDescription_ar: 'معامل التوزيع بين طوري المستخلص والرافينايت في الاتزان السائل-السائل.',
    equationDescription_en: 'Solute distribution coefficient between extract and raffinate equilibrium phases.',
    keyParameters: [
      { name_ar: 'سرعة دوران الأقراص', name_en: 'Rotor Speed', unit: 'rpm', typicalRange: '150 - 800' },
      { name_ar: 'تدفق المذيب المستخلص', name_en: 'Solvent Feed Rate', unit: 'L/h', typicalRange: '10 - 100' }
    ]
  },
  {
    id: 'rotary-dryer',
    category: 'transfer',
    title_ar: 'المجفف الدوار',
    title_en: 'Rotary Dryer',
    desc_ar: 'رفّاعات داخلية تسكب المادة ستائر عبر تيار الغاز الساخن، مع رطوبة المنتج ودرجة حرارة الغاز وزمن البقاء.',
    desc_en: 'Internal lifters cascading solid curtains through hot gas, moisture content and exhaust thermal balance.',
    url: 'https://claude.ai/artifact/M8wpdSMpFigYc8QwUwYGBr',
    iconName: 'Sun',
    badge: '3D Simulation',
    tags: ['Drying Kinetics', 'Internal Lifters', 'Moisture Content', 'Psychrometry'],
    equation: 'Q = m_solids · Cp_s · ΔT + m_evap · λ_water',
    equationDescription_ar: 'موازنة الطاقة الكلية لتسخين المادة الصلبة وتبخير الرطوبة بالحمل الحراري.',
    equationDescription_en: 'Overall thermal balance for heating solid material and evaporating moisture.',
    keyParameters: [
      { name_ar: 'حرارة الهواء الساخن', name_en: 'Hot Air Inlet Temp', unit: '°C', typicalRange: '120 - 300' },
      { name_ar: 'سرعة دوران الأسطوانة', name_en: 'Drum Speed', unit: 'rpm', typicalRange: '2 - 8' }
    ]
  },
  {
    id: 'cooling-tower',
    category: 'transfer',
    title_ar: 'برج التبريد',
    title_en: 'Cooling Tower',
    desc_ar: 'طريقة ميركل ومخطط الإنثالبي، وتحديد المدى والاقتراب، وأثر التكلس وسرعة الهواء.',
    desc_en: 'Merkel integral method and enthalpy driving force, Range and Approach calculation, scaling and drift.',
    url: 'https://claude.ai/artifact/B7EjGyTQ789qFFM97iTABu',
    iconName: 'Snowflake',
    badge: '3D Simulation',
    tags: ['Merkel Method', 'Approach & Range', 'Wet Bulb Temp', 'Evaporative Cooling'],
    equation: 'Ka·V / L = ∫ (Cw·dT / (h_s - h)) from T2 to T1',
    equationDescription_ar: 'تكامل ميركل المميز لبرج التبريد بربط تغير درجة حرارة الماء بقوة الدفع الإنثالبية.',
    equationDescription_en: 'Merkel equation integrating enthalpy difference driving force for evaporative cooling.',
    keyParameters: [
      { name_ar: 'درجة حرارة البصيلة الرطبة Twb', name_en: 'Wet-Bulb Temp', unit: '°C', typicalRange: '18 - 28' },
      { name_ar: 'معدل تدفق ماء التبريد', name_en: 'Water Flow Rate', unit: 'm³/h', typicalRange: '50 - 500' }
    ]
  },
  {
    id: 'shell-and-tube-heat-exchanger',
    category: 'transfer',
    title_ar: 'المبادل الحراري ذو الغلاف والأنابيب',
    title_en: 'Shell-and-Tube Heat Exchanger',
    desc_ar: 'مبادل نمط 1–2 مع الفعالية ε وNTU ومعامل التصحيح F للوغارتم فرق درجات الحرارة LMTD، وأثر التلوث.',
    desc_en: '1-2 pass shell-and-tube exchanger with ε-NTU method, LMTD correction factor F, and fouling resistance.',
    url: 'https://claude.ai/artifact/YAhcjEnKZazf9m9k4CpAzt',
    iconName: 'Cpu',
    badge: '3D Simulation',
    tags: ['1-2 Exchanger', 'LMTD & F Factor', 'ε-NTU Method', 'Fouling'],
    equation: 'Q = U · A · F · LMTD',
    equationDescription_ar: 'معدل انتقال الحرارة بمعامل التصحيح الهندسي لتدفق الأنابيب المتعددة.',
    equationDescription_en: 'Heat transfer rate with multipass geometric correction factor F and LMTD.',
    keyParameters: [
      { name_ar: 'معامل انتقال الحرارة الإجمالي U', name_en: 'Overall U', unit: 'W/m²·K', typicalRange: '200 - 1200' },
      { name_ar: 'مقاومة التلوث Fouling Rf', name_en: 'Fouling Factor', unit: 'm²·K/W', typicalRange: '0.0001 - 0.0005' }
    ]
  },
  {
    id: 'triple-effect-evaporator',
    category: 'transfer',
    title_ar: 'المبخر ثلاثي التأثير',
    title_en: 'Triple-Effect Evaporator',
    desc_ar: 'تغذية أمامية بمساحات متساوية، واقتصاد البخار، ومقارنة بعدد التأثيرات من 1 إلى 5 وتوفير الطاقة.',
    desc_en: 'Forward-feed arrangement with equal heating areas, steam economy, boiling point elevation (BPE), 1-5 effects.',
    url: 'https://claude.ai/artifact/GfaAQeNBjh6NsjgGqVvFKx',
    iconName: 'Zap',
    badge: '3D Simulation',
    tags: ['Steam Economy', 'Forward Feed', 'BPE', 'Energy Optimization'],
    equation: 'Economy = Total Vapor Evaporated / Boiler Steam Supplied',
    equationDescription_ar: 'اقتصاد البخار كمقياس لكفاءة الاستفادة المتعددة من الطاقة الحرارية.',
    equationDescription_en: 'Steam economy metric expressing kilograms of water evaporated per kilogram fresh steam.',
    keyParameters: [
      { name_ar: 'ضغط بخار الغلاية', name_en: 'Steam Pressure', unit: 'bar', typicalRange: '2 - 6' },
      { name_ar: 'ضغط التأثير الأخير (الفراغ)', name_en: 'Final Stage Vacuum', unit: 'kPa', typicalRange: '10 - 25' }
    ]
  },
  {
    id: 'flash-drum',
    category: 'transfer',
    title_ar: 'خزان الوميض',
    title_en: 'Flash Drum (VLE)',
    desc_ar: 'وميض أديباتي لخليط ثلاثي: حساب نسبة التبخر V/F وتركيب الطورين بمعادلة رشيفورد-رايس Rachford-Rice.',
    desc_en: 'Adiabatic flash for ternary hydrocarbon mixture: Rachford-Rice equation, vapor fraction, and phase split.',
    url: '/simulations/09.html',
    iconName: 'Gauge',
    badge: '3D Simulation',
    tags: ['Rachford-Rice', 'VLE Flash', 'Phase Split', 'Ternary Mix'],
    equation: '∑ [zi·(Ki - 1) / (1 + (V/F)·(Ki - 1))] = 0',
    equationDescription_ar: 'معادلة رشيفورد-رايس لحساب الكسر البخاري V/F بالاتزان الديناميكي الحراري.',
    equationDescription_en: 'Rachford-Rice objective function solved for vapor fraction V/F in equilibrium flash.',
    keyParameters: [
      { name_ar: 'ضغط الوعاء P', name_en: 'Drum Pressure', unit: 'bar', typicalRange: '1 - 15' },
      { name_ar: 'حرارة التغذية T_feed', name_en: 'Feed Temp', unit: '°C', typicalRange: '40 - 160' }
    ]
  },
  {
    id: 'continuous-cooling-crystallizer',
    category: 'transfer',
    title_ar: 'المبلور التبريدي المستمر',
    title_en: 'Continuous Cooling Crystallizer',
    desc_ar: 'نموذج MSMPR لنترات البوتاسيوم، والنمو والتنوّي الأولي والثانوي، وتوزيع أحجام البلورات CSD.',
    desc_en: 'MSMPR model for potassium nitrate, crystal growth and nucleation, crystal size distribution (CSD).',
    url: 'https://claude.ai/artifact/BiVgJe8AQhvBns1DmD8rWm',
    iconName: 'Sparkles',
    badge: '3D Simulation',
    tags: ['MSMPR', 'Crystal Size CSD', 'Supersaturation', 'Nucleation Rate'],
    equation: 'n(L) = n0 · exp(-L / (G·τ))',
    equationDescription_ar: 'معادلة الكثافة العددية السكانية للبلورات حسب حجمها L في نموذج MSMPR.',
    equationDescription_en: 'Population density distribution as function of characteristic crystal length L.',
    keyParameters: [
      { name_ar: 'معدل التبريد dT/dt', name_en: 'Cooling Rate', unit: '°C/min', typicalRange: '0.2 - 2.0' },
      { name_ar: 'زمن المكوث τ', name_en: 'Residence Time', unit: 'h', typicalRange: '0.5 - 3.0' }
    ]
  },
  {
    id: 'reverse-osmosis-unit',
    category: 'transfer',
    title_ar: 'وحدة التناضح العكسي (RO)',
    title_en: 'Reverse Osmosis Unit (RO)',
    desc_ar: 'أغشية حلزونية وألياف مجوفة، وظاهرة استقطاب التركيز، واسترجاع الطاقة وتدفق الماء العذب.',
    desc_en: 'Spiral-wound and hollow-fiber membrane modules, concentration polarization, recovery ratio and flux.',
    url: 'https://claude.ai/artifact/TeUoc5bqBn7Ytynsgs8zsh',
    iconName: 'Waves',
    badge: '3D Simulation',
    tags: ['Membranes', 'Osmotic Pressure', 'Concentration Polarization', 'Salt Rejection'],
    equation: 'Jw = A·(ΔP - Δπ),  Js = B·(Cf - Cp)',
    equationDescription_ar: 'تدفق الماء والمذاب عبر الغشاء شبه المنفذ بفعل فرق الضغط الهيدروليكي والأسموزي.',
    equationDescription_en: 'Water flux Jw and solute flux Js governed by net driving pressure and concentration delta.',
    keyParameters: [
      { name_ar: 'ضغط التغذية P_feed', name_en: 'Operating Pressure', unit: 'bar', typicalRange: '20 - 70' },
      { name_ar: 'نسبة الاسترجاع Recovery', name_en: 'Recovery Ratio', unit: '%', typicalRange: '40 - 85' }
    ]
  },

  // ================= MASS TRANSFER PHENOMENA (7) =================
  {
    id: 'molecular-diffusion-fick-law',
    category: 'phenomena',
    title_ar: 'الانتشار الجزيئي وقانون فيك',
    title_en: "Molecular Diffusion and Fick's Law",
    desc_ar: 'غازان يلتقيان بعد رفع الحاجز الفاصل، ومنحنى التركيز يتسطح تدريجياً مع الزمن والمسافة.',
    desc_en: 'Two gases interdiffusing upon barrier removal, concentration profile flattening over space and time.',
    url: '/simulations/01.html',
    iconName: 'MoveHorizontal',
    badge: '3D Simulation',
    tags: ["Fick's 1st & 2nd Law", 'Diffusivity DAB', 'Transient Gradient'],
    equation: 'JA = -DAB · (dCA / dz),  ∂CA/∂t = DAB · (∂²CA/∂z²)',
    equationDescription_ar: 'قانونا فيك الأول والثاني للانتشار الجزيئي المستقر وغير المستقر في وسط ثنائي.',
    equationDescription_en: 'Fick first and second laws of steady and transient molecular diffusion.',
    keyParameters: [
      { name_ar: 'معامل الانتشار DAB', name_en: 'Diffusivity DAB', unit: 'm²/s', typicalRange: '1e-5 - 5e-5' },
      { name_ar: 'طول الخلية L', name_en: 'Diffusion Cell Length', unit: 'cm', typicalRange: '5 - 30' }
    ]
  },
  {
    id: 'diffusion-through-stagnant-gas',
    category: 'phenomena',
    title_ar: 'الانتشار عبر غاز ساكن (أنبوب ستيفان)',
    title_en: 'Diffusion Through Stagnant Gas (Stefan Tube)',
    desc_ar: 'تبخر سائل متطاير عبر هواء ساكن غير ذائب، ومقارنة مع الانتشار المتعاكس المتساوي EMCD.',
    desc_en: 'Volatile liquid evaporation through stagnant column of air, comparison with equimolar counter-diffusion.',
    url: '/simulations/07.html',
    iconName: 'TestTube2',
    badge: '3D Simulation',
    tags: ['Stefan Tube', 'Stagnant Gas', 'Log Mean Pressure', 'NB = 0'],
    equation: 'NA = (P·DAB / (R·T·z)) · ln((P - pA2) / (P - pA1))',
    equationDescription_ar: 'معادلة تدفق الانتشار في غاز راكد بالاعتماد على لوغاريتم فرق الضغط الجزئي.',
    equationDescription_en: 'Stefan steady-state evaporation flux through stagnant gas film.',
    keyParameters: [
      { name_ar: 'مسافة مسار الانتشار z', name_en: 'Diffusion Path z', unit: 'mm', typicalRange: '5 - 50' },
      { name_ar: 'ضغط البخار المشبع pA1', name_en: 'Vapor Pressure', unit: 'kPa', typicalRange: '2 - 40' }
    ]
  },
  {
    id: 'two-film-theory',
    category: 'phenomena',
    title_ar: 'نظرية الغشاءين لـ ويتمان',
    title_en: "Whitman's Two-Film Theory",
    desc_ar: 'غشاء الغاز وغشاء السائل عند السطح البيني، والمقاومة المتحكمة، ومخطط التشغيل والاتزان لـ هنري.',
    desc_en: 'Gas film and liquid film at interface, controlling mass transfer resistance and Henry law equilibrium.',
    url: '/simulations/06.html',
    iconName: 'SplitSquareVertical',
    badge: '3D Simulation',
    tags: ['Two-Film Model', 'kG and kL', 'Interface Flux', 'Henry Constant'],
    equation: '1 / K_L = (1 / k_L) + (1 / (H · k_G))',
    equationDescription_ar: 'المقاومة الكلية لانتقال الكتلة كمجموع مقلوب معاملي الغشاءين.',
    equationDescription_en: 'Overall mass transfer resistance as the sum of liquid-side and gas-side film resistances.',
    keyParameters: [
      { name_ar: 'معامل غشاء السائل kL', name_en: 'Liquid Film Coeff kL', unit: 'm/s', typicalRange: '1e-4 - 1e-3' },
      { name_ar: 'ثابت هنري H', name_en: 'Henry Constant', unit: 'bar·m³/mol', typicalRange: '0.01 - 10' }
    ]
  },
  {
    id: 'penetration-surface-renewal',
    category: 'phenomena',
    title_ar: 'نظرية الاختراق وتجديد السطح',
    title_en: 'Penetration and Surface Renewal',
    desc_ar: 'نموذجا هيغبي Higbie ودانكويرتس Danckwerts مقابل نظرية الغشاء، واعتماد k_L على جذر معامل الانتشار √D.',
    desc_en: 'Higbie and Danckwerts unsteady contact models vs film theory, and k_L proportional to √D.',
    url: 'https://claude.ai/artifact/JuQbquAC6zDZqcGv7SQFCs',
    iconName: 'TimerReset',
    badge: '3D Simulation',
    tags: ['Higbie', 'Danckwerts', 'kL ~ √D', 'Surface Renewal Rate s'],
    equation: 'kL_Higbie = 2 · √(DAB / (π · tc)),  kL_Danckwerts = √(DAB · s)',
    equationDescription_ar: 'معاملا انتقال الكتلة لنظريتي الاختراق (زمن تلامس tc) وتجديد السطح (معدل s).',
    equationDescription_en: 'Mass transfer coefficients expressing square-root dependence on molecular diffusivity.',
    keyParameters: [
      { name_ar: 'زمن تلامس العنصر tc', name_en: 'Contact Time tc', unit: 's', typicalRange: '0.01 - 1.0' },
      { name_ar: 'معدل تجديد السطح s', name_en: 'Renewal Rate s', unit: 's⁻¹', typicalRange: '1 - 50' }
    ]
  },
  {
    id: 'catalyst-pellet-diffusion-reaction',
    category: 'phenomena',
    title_ar: 'الانتشار والتفاعل داخل حبيبة محفز',
    title_en: 'Diffusion and Reaction in Catalyst Pellet',
    desc_ar: 'مسالك متعرجة ومواقع محفزة نشطة، ومعامل ثيلي Thiele Modulus وعامل الفعالية الداخلي η.',
    desc_en: 'Tortuous pore diffusion and active sites, Thiele modulus, concentration profile inside pellet and effectiveness η.',
    url: '/simulations/04.html',
    iconName: 'Target',
    badge: '3D Simulation',
    tags: ['Thiele Modulus Φ', 'Effectiveness Factor η', 'Pore Diffusion', 'Internal Resistance'],
    equation: 'Φ = R · √(k / Deff),  η = (3 / Φ) · (1/tanh(Φ) - 1/Φ)',
    equationDescription_ar: 'معامل ثيلي وعامل الفعالية لحبيبة كروية لمقارنة معدل التفاعل بالانتشار داخل المسام.',
    equationDescription_en: 'Thiele modulus and spherical effectiveness factor determining pore diffusion limitation.',
    keyParameters: [
      { name_ar: 'نصف قطر الحبيبة R', name_en: 'Pellet Radius R', unit: 'mm', typicalRange: '0.5 - 5.0' },
      { name_ar: 'الانتشار الفعال Deff', name_en: 'Effective Diffusivity', unit: 'm²/s', typicalRange: '1e-7 - 1e-5' }
    ]
  },
  {
    id: 'unsteady-diffusion-solid',
    category: 'phenomena',
    title_ar: 'الانتشار غير المستقر في جسم صلب',
    title_en: 'Unsteady Diffusion in a Solid',
    desc_ar: 'أشكال هندسية متعددة: لوح مستوٍ، أسطوانة، كرة، وجسم نصف لانهائي، مع تعمق المذاب بمرور الزمن.',
    desc_en: 'Multiple geometries: slab, cylinder, sphere and semi-infinite medium with transient solute penetration profiles.',
    url: 'https://claude.ai/artifact/SNemwbUh6gfxvXGihpaXqn',
    iconName: 'Box',
    badge: '3D Simulation',
    tags: ['Transient Diffusion', 'Fourier Number', 'Error Function erf', 'Solid Leaching'],
    equation: '(C(x,t) - Cs) / (C0 - Cs) = erf(x / (2·√(D·t)))',
    equationDescription_ar: 'حل دالة الخطأ (Error Function) للتغلغل غير المستقر في وسط نصف لانهائي.',
    equationDescription_en: 'Analytical solution using complementary error function for transient penetration.',
    keyParameters: [
      { name_ar: 'زمن الانتشار t', name_en: 'Elapsed Time', unit: 'min', typicalRange: '1 - 120' },
      { name_ar: 'معامل الانتشار في الصلب', name_en: 'Solid Diffusivity', unit: 'm²/s', typicalRange: '1e-9 - 1e-12' }
    ]
  },
  {
    id: 'concentration-boundary-layer',
    category: 'phenomena',
    title_ar: 'طبقة التركيز الحدية',
    title_en: 'Concentration Boundary Layer',
    desc_ar: 'جريان مائع فوق لوح يذوب: تطور الطبقتين الهيدروديناميكية والتركيزية، وأعداد رينولدز وشميت وشيروود.',
    desc_en: 'Fluid flow over dissolving surface: growth of hydrodynamic & concentration boundary layers, Re, Sc, Sh.',
    url: 'https://claude.ai/artifact/RdqPewhQgGPVHaCfqg9dvs',
    iconName: 'ActivitySquare',
    badge: '3D Simulation',
    tags: ['Schmidt Number', 'Sherwood Number', 'Boundary Layer δc', 'Analogies'],
    equation: 'δc / δ = Sc^(-1/3),  Sh = 0.664 · Re^(1/2) · Sc^(1/3)',
    equationDescription_ar: 'نسبة سماكة الطبقتين الحدية التركيزية والهيدروديناميكية، وعلاقة شيروود للصفائح.',
    equationDescription_en: 'Concentration to velocity boundary layer thickness ratio and laminar Sherwood correlation.',
    keyParameters: [
      { name_ar: 'سرعة المائع الحرة U∞', name_en: 'Free-stream Velocity', unit: 'm/s', typicalRange: '0.1 - 2.5' },
      { name_ar: 'رقم شميت Sc', name_en: 'Schmidt Number Sc', unit: '-', typicalRange: '0.6 - 1500' }
    ]
  },

  // ================= PROCESS CONTROL LAB (7) =================
  {
    id: 'two-stirred-tanks-series-conductivity',
    category: 'control',
    title_ar: 'الخزانان المقلّبان على التوالي (التوصيلية)',
    title_en: 'Two Stirred Tanks in Series (Conductivity)',
    desc_ar: 'إحداث قفزة في التركيز من الماء النقي إلى محلول ملح: معايرة المجسات، قاعدة 63%، طريقة كالدويل، والزمن الميت.',
    desc_en: 'Step input from water to salt solution: probe calibration, 63% time constant rule, Caldwell method and dead time.',
    url: 'https://claude.ai/artifact/RrrkUb2JwWr2HN89AW2oDZ',
    iconName: 'Network',
    badge: '3D Simulation',
    tags: ['Step Response', 'Time Constant τ', 'Caldwell Method', 'Conductivity Probe'],
    equation: 'G(s) = Kp / ((τ1·s + 1)·(τ2·s + 1))',
    equationDescription_ar: 'دالة التحويل لخزانين غير متفاعلين من الرتبة الثانية بعد تطبيق دخل خطوي.',
    equationDescription_en: 'Transfer function for two non-interacting first-order capacity tanks in series.',
    keyParameters: [
      { name_ar: 'ثابت زمن الخزان الأول τ1', name_en: 'Time Constant τ1', unit: 's', typicalRange: '15 - 90' },
      { name_ar: 'ثابت زمن الخزان الثاني τ2', name_en: 'Time Constant τ2', unit: 's', typicalRange: '15 - 90' }
    ]
  },
  {
    id: 'two-stirred-tank-heater-series',
    category: 'control',
    title_ar: 'مسخن الخزانين على التوالي',
    title_en: 'Two Stirred Tank Heater in Series',
    desc_ar: 'خزانان مقلَّبان ومسخّن حراري: خطوة في طاقة التسخين، وطريقتا كالدويل ومنحنى رد فعل العملية PRC.',
    desc_en: 'Two stirred heated tanks: heater power step input, process reaction curve (PRC) and Caldwell identification.',
    url: 'https://claude.ai/artifact/LgEMfx9C6S9ZpmwxQTD5aS',
    iconName: 'ThermometerSnowflake',
    badge: '3D Simulation',
    tags: ['Thermal Dynamics', 'Process Reaction Curve', 'Energy Balance', 'Dead Time θ'],
    equation: 'm·Cp·(dT1/dt) = F·Cp·(Tin - T1) + Q_heater',
    equationDescription_ar: 'موازنة الطاقة التفاضلية لتغير درجة حرارة المائع في الخزان الساخن.',
    equationDescription_en: 'Transient energy balance describing dynamic temperature rise under power step.',
    keyParameters: [
      { name_ar: 'قدرة السخان Q', name_en: 'Heater Power', unit: 'kW', typicalRange: '1.0 - 5.0' },
      { name_ar: 'معدل تدفق الماء F', name_en: 'Water Flow Rate', unit: 'L/min', typicalRange: '2 - 12' }
    ]
  },
  {
    id: 'second-order-system-u-tube-manometer',
    category: 'control',
    title_ar: 'نظام الرتبة الثانية: مانومتر U',
    title_en: 'Second-Order System: U-Tube Manometer',
    desc_ar: 'عمود زئبق أو ماء يتذبذب بعد خطوة في فرق الضغط: حساب التجاوز Overshoot ونسبة الاضمحلال والدورة الطبيعية.',
    desc_en: 'Mercury/fluid oscillating after differential pressure step: overshoot, decay ratio, period and damping factor ζ.',
    url: 'https://claude.ai/artifact/TbNTF7WUQnvBd1rai6Wuff',
    iconName: 'GaugeCircle',
    badge: '3D Simulation',
    tags: ['Damping Ratio ζ', 'Overshoot Mp', 'Decay Ratio', 'Natural Frequency ωn'],
    equation: 'd²h/dt² + (2·ζ·ωn)·(dh/dt) + ωn²·h = (ΔP / ρ·L)',
    equationDescription_ar: 'معادلة الحركة التذبذبية للمائع في أنبوب المانومتر على شكل U كنظام رتبة ثانية غير مخمد كلياً.',
    equationDescription_en: 'Second-order underdamped equation of motion for liquid column oscillation.',
    keyParameters: [
      { name_ar: 'معامل التخميد ζ', name_en: 'Damping Ratio ζ', unit: '-', typicalRange: '0.1 - 0.7' },
      { name_ar: 'التردد الطبيعي ωn', name_en: 'Natural Frequency', unit: 'rad/s', typicalRange: '2.0 - 10.0' }
    ]
  },
  {
    id: 'feedback-first-order-tank',
    category: 'control',
    title_ar: 'التغذية الراجعة لخزان رتبة أولى',
    title_en: 'Feedback Control on a First-Order Tank',
    desc_ar: 'صمام تحكم ضغطي ومتحكم بمستوى السائل: تأثير التحكم النسبي P والإزاحة Offset والتحكم التكاملي PI.',
    desc_en: 'Control valve and tank liquid level controller: Proportional P offset, PI zero offset, and valve non-linearity.',
    url: 'https://claude.ai/artifact/Qx6vfyqzRXDV3G4gu5hqFK',
    iconName: 'RotateCcw',
    badge: '3D Simulation',
    tags: ['Level Control', 'P & PI Control', 'Offset Elimination', 'Valve Characteristics'],
    equation: 'u(t) = u0 + Kc·e(t) + (Kc / τI) ∫ e(t)dt',
    equationDescription_ar: 'معادلة المتحكم النسبي التكاملي (PI Controller) لإلغاء الانحراف الدائم في مستوى الخزان.',
    equationDescription_en: 'PI control law eliminating steady-state offset in liquid level regulation.',
    keyParameters: [
      { name_ar: 'كسب المتحكم Kc', name_en: 'Controller Gain Kc', unit: '-', typicalRange: '0.5 - 10.0' },
      { name_ar: 'زمن التكامل τI', name_en: 'Integral Time τI', unit: 's', typicalRange: '10 - 200' }
    ]
  },
  {
    id: 'pct-m3-pressure-control-unit',
    category: 'control',
    title_ar: 'وحدة السيطرة على الضغط PCT-M3',
    title_en: 'PCT-M3 Pressure Control Unit',
    desc_ar: 'التحكم بضغط خزان هواء مضغوط: ضبط متحكمات P وPI وPID استجابة لإشارات خطوية ومنحدرة وموجات جيبية.',
    desc_en: 'Pneumatic air tank pressure regulation: P, PI, and PID parameter tuning under step, ramp, and sinusoidal inputs.',
    url: 'https://claude.ai/artifact/DVzKBRH1xUmynPY2Jc28Bh',
    iconName: 'TachometerAlt',
    badge: '3D Simulation',
    tags: ['PCT-M3 Trainer', 'Pressure Loop', 'Ziegler-Nichols', 'Pneumatic Actuator'],
    equation: 'P(s) / U(s) = Kp · e^(-θ·s) / (τ·s + 1)',
    equationDescription_ar: 'نموذج الرتبة الأولى مع الزمن الميت (FOPDT) لضغط خزان الهواء والمشغل الهوائي.',
    equationDescription_en: 'First-order plus dead-time model approximating industrial pneumatic vessel dynamics.',
    keyParameters: [
      { name_ar: 'نقطة الضبط المرغوبة SP', name_en: 'Setpoint Pressure', unit: 'bar', typicalRange: '0.5 - 4.0' },
      { name_ar: 'زمن المشتقة τD', name_en: 'Derivative Time τD', unit: 's', typicalRange: '0 - 15' }
    ]
  },
  {
    id: 'pct-m4-temperature-control-unit',
    category: 'control',
    title_ar: 'السيطرة على الحرارة PCT-M4',
    title_en: 'Temperature Control PCT-M4',
    desc_ar: 'ساق معدنية يسخّنها عنصر بلتييه مع ثلاثة مجسات حرارية دقيقة PRT ومروحة تبريد لإحداث اضطرابات خارجية.',
    desc_en: 'Metal rod heated by Peltier element with three PRT RTD sensors, feedback loop and disturbance fan.',
    url: 'https://claude.ai/artifact/K8KEKM9RZxcu8g99SGg2t7',
    iconName: 'Thermometer',
    badge: '3D Simulation',
    tags: ['PCT-M4 Trainer', 'Peltier Element', 'PRT Sensors', 'Disturbance Rejection'],
    equation: 'T(x,t) = T_env + (Q_in / G_loss) · [1 - exp(-t/τ)]',
    equationDescription_ar: 'الاستجابة الحرارية للساق المعدنية مع تشتت الحرارة عبر الحمل والإشعاع.',
    equationDescription_en: 'Transient heat distribution along heated rod subject to convective disturbance.',
    keyParameters: [
      { name_ar: 'موقع المجس المختار', name_en: 'Selected PRT Sensor', unit: '#', typicalRange: '1, 2, or 3' },
      { name_ar: 'شدة اضطراب المروحة', name_en: 'Fan Disturbance', unit: '%', typicalRange: '0 - 100' }
    ]
  },
  {
    id: 'rt-578-trainer-four-loops',
    category: 'control',
    title_ar: 'جهاز RT 578: أربع حلقات صناعية',
    title_en: 'RT 578 Trainer: Four Industrial Loops',
    desc_ar: 'حلقة تحكم PID صناعية متكاملة على جهاز تدريبي شامل: التحكم بالمستوى والتدفق والضغط ودرجة الحرارة.',
    desc_en: 'Complete industrial PID trainer system featuring four core physical loops: Level, Flow, Pressure and Temperature.',
    url: 'https://claude.ai/artifact/LsTFbhdW2m3wDrVFUmGZaT',
    iconName: 'SlidersHorizontal',
    badge: '3D Simulation',
    tags: ['RT 578', 'Multi-Loop Control', 'Level & Flow', 'Industrial PID Bench'],
    equation: 'u(t) = Kc · [ e(t) + (1/τI) ∫ e dt + τD · (de/dt) ]',
    equationDescription_ar: 'معادلة المتحكم التناسبي التكاملي التفاضلي (PID) الصناعي الكامل مع ترشيح المشتقة.',
    equationDescription_en: 'Complete industrial 3-term PID algorithm governing process variables.',
    keyParameters: [
      { name_ar: 'الحلقة المختارة', name_en: 'Active Control Loop', unit: '-', typicalRange: 'Level/Flow/Press/Temp' },
      { name_ar: 'زمن الدورة التشغيلية', name_en: 'Sampling Time', unit: 'ms', typicalRange: '50 - 500' }
    ]
  }
];
