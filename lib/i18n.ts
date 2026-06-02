export type Language = 'en' | 'es';

const en = {
  // ── Navbar / Menu overlay ─────────────────────────────────────────────────
  close: 'Close',
  getStarted: 'get started',
  menuItems: ['Home', 'About', 'Services', 'Packages', 'Events', 'Results', 'Blog', 'Merchandise', 'Contact'],
  policyItems: ['Privacy Policy', 'Terms of Use', 'Client Agreement'],
  latestEvents: 'Latest Events',
  cooldownMarquee: 'Cooldown Event · Charleston SC · Register Now · ',
  shopNow: 'Shop Now',
  merchandiseLabel: 'Merchandise',

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroDescRight: "Charleston's premier destination for elite fitness, bringing high-performance coaching and results-driven training to South Carolina.",
  heroDescLeft: 'personal training built around your goals, strength level, schedule, and long-term fitness',
  heroHeadline1: 'WHERE EFFORT',
  heroHeadline2: 'BECOMES',
  heroHeadline3: 'TRANSFORMATION',
  yearsLabel: 'years of clients',
  sessionsLabel: 'clients served',

  // ── About hero ───────────────────────────────────────────────────────────
  aboutHeroDesc: 'Body By Brad is built on discipline, community, and a results-driven approach to coaching, training, and lasting transformation.',
  aboutHeroL1: 'MORE THAN',
  aboutHeroL2: 'A COACH.',
  aboutBioParagraphs: [
    'After playing football at The Citadel and graduating in 2019, I stepped into Corporate America with ambition and a full head of steam. It didn’t take long to realize that the traditional path wasn’t where I was meant to be.',
    'I walked away from the desk job, earned my ISSA certification, and built what would become Body By Brad — a fitness and lifestyle brand rooted in energy, community, and intentional movement.',
    'Since then, I’ve had the opportunity to inspire thousands of people through high-energy workouts, unforgettable events, online coaching, and a mindset built around consistency, confidence, and showing up for yourself. Known for my motivating coaching style, contagious energy, and fire playlists, my goal has always been to make fitness something people genuinely look forward to.',
    'Whether you’re training with me in a group class, joining a community run, following an online program, or working one-on-one, my focus is the same: helping people build strength, confidence, discipline, and routines that actually last.',
    'Fitness changed my life — and now I’m here to help others change theirs. Come redefine your routine with me!',
  ],
  aboutBioName: 'Coach Brad',
  aboutBioRole: 'Founder & Head Coach',

  // ── Who We Are ───────────────────────────────────────────────────────────
  whoLabel: 'WHO WE ARE',
  whoLine1: 'THE MAN',
  whoLine2: 'BEHIND THE',
  whoLine3: 'MOVEMENT',
  whoTagline: "From elite collegiate athletics to building one of Charleston's premier fitness communities.",
  whoBio1: "After playing football at The Citadel and graduating in 2019, I dove into Corporate America with a head full of steam. Shortly after joining that world I realized that it was not my calling. I quickly dumped my desk job and found my new home in fitness. I got my personal training certification with ISSA, and Body By Brad was born.",
  whoBio2: "Since then, I have been fortunate enough to curate an incredible following and inspire thousands of people through my energy, positive mindset, and fire playlists. Whether it's through my group fitness classes, events, online programming, or one on one training, I devote myself to tailoring clients' fitness needs and helping them reach (and exceed!) their goals. Come put in the work with me!",

  // ── Services ─────────────────────────────────────────────────────────────
  servicesTitle: 'Fitness Events',
  servicesHighlights: 'Upcoming Events',
  servicesJourney: 'Join an event',
  servicesSlides: [
    { heading: 'High-energy group bootcamps that build community, burn calories, and push limits.', cta: 'View Upcoming Classes' },
    { heading: "Charleston's legendary Cooldown events — fitness, fun, and good vibes all in one.", cta: 'See Event Schedule' },
    { heading: 'Outdoor pop-up sessions and community challenges open to all fitness levels.', cta: 'Join the Community' },
  ],

  // ── Featured ─────────────────────────────────────────────────────────────
  featuredHeadingL1: 'Gear up. Train hard.',
  featuredHeadingL2: 'Look the part.',
  featuredDesc: 'Premium fitness apparel and exclusive events — everything you need to represent the BBB movement.',
  eventsCardTitleL1: "Charleston's",
  eventsCardTitleL2: 'cooldown',
  eventsCardTitleL3: 'events',
  eventsCardDesc: 'Join the community for our legendary Cooldown events — fitness, fun, and good vibes in the heart of Charleston.',
  eventsCardBtn: 'View Events',
  merchCardTitleL1: 'Wear the',
  merchCardTitleL2: 'BBB brand',
  merchCardDesc: 'Represent the movement. Official Body By Brad apparel — built for the gym, made for the streets.',
  merchCardBtn: 'Shop Merch',

  // ── Merch Section ────────────────────────────────────────────────────────
  newDropsHeading: 'New Drops',
  newDropsDesc: "Stand out with our latest collection—bold designs, premium fabrics, and street-ready fits. Once they're gone, they're gone. Don't miss out!",
  shopNowBtn: 'Shop Now',
  addToCart: 'Add to Cart',
  newBadge: 'New',
  merchItemDescs: [
    'A sleek, minimalist hoodie with dark tones and subtle reflective accents for an effortless street vibe.',
    'Urban Phantom – A bold, oversized hoodie with edgy graphics and a stealthy aesthetic inspired by city nights.',
    'A statement piece with vibrant neon details and rebellious street art influences for a standout look.',
  ],

  // ── BMI ──────────────────────────────────────────────────────────────────
  healthTools: 'Health Tools',
  bmiHeadingL1: 'Know your',
  bmiHeadingL2: 'numbers.',
  bmiDesc: 'Use our BMI calculator to understand your body composition and take the first step toward your fitness goals.',
  heightLabel: 'Height',
  weightLabel: 'Weight',
  feetLabel: 'Feet',
  inchesLabel: 'Inches',
  calculateBtn: 'Calculate BMI',
  yourBMI: 'Your BMI',
  bmiPlaceholder: 'Enter your details and\ncalculate your BMI',
  bookSession: 'Book a session ↗',
  scaleUnder: 'Under',
  scaleNormal: 'Normal',
  scaleOver: 'Over',
  scaleObese: 'Obese',
  bmiUnderweightLabel: 'Underweight',
  bmiUnderweightTip: "You may benefit from increasing caloric intake and strength training. Let's build a plan together.",
  bmiNormalLabel: 'Normal weight',
  bmiNormalTip: "You're in a healthy range. Keep up the great work — let's push even further.",
  bmiOverweightLabel: 'Overweight',
  bmiOverweightTip: 'Small lifestyle adjustments can make a big difference. Ready to level up?',
  bmiObeseLabel: 'Obese',
  bmiObeseTip: "A structured program can get you back on track. Let's get started today.",

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonialsL1: 'WHAT THEY',
  testimonialsL2: 'ARE SAYING',

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faqLabel: 'FAQ',
  faqHeadingL1: 'Frequently',
  faqHeadingL2: 'Asked',
  faqSubtitle: 'Find answers to common questions',
  faqItems: [
    { q: 'What types of training do you offer?', a: "I offer one-on-one personal training, high-energy group fitness classes, and fully structured online coaching programs. Whether you want to train in person in Charleston or from anywhere in the world, there's a plan built for you." },
    { q: 'How do I get started?', a: "Getting started is simple — reach out through the contact form or DM me on Instagram. We'll schedule a quick call to talk about your goals, current fitness level, and which program is the best fit for you." },
    { q: 'Do I need any equipment for online coaching?', a: "Not necessarily. Programs are tailored to what you have available — whether that's a full gym, a set of dumbbells, or just your bodyweight. I'll build around your setup." },
    { q: 'How quickly will I see results?', a: "Most clients notice real changes within 4–8 weeks when they're consistent with training and nutrition. Results vary depending on your starting point, goals, and commitment — but I'll be checking in every step of the way to make sure you're on track." },
    { q: 'What are the Cooldown events?', a: "Cooldown events are community fitness experiences I host in Charleston — think group workouts, great music, and good people. They're open to all fitness levels and a great way to experience the BBB community before committing to a program." },
    { q: 'What is your cancellation policy?', a: 'For in-person sessions, I ask for at least 24 hours notice for cancellations. Online coaching is billed monthly and can be paused or cancelled before the next billing cycle with no hidden fees.' },
  ],

  // ── Transformation ───────────────────────────────────────────────────────
  transformLabel: 'Real Results',
  transformL1: 'Real',
  transformL2: 'Transformations',
  transformDesc: 'Every physique you see was built through consistency, coaching, and commitment — real clients, real results.',
  transformStats: [
    { value: '500+', label: 'Clients Transformed' },
    { value: '8+', label: 'Years of Experience' },
    { value: '98%', label: 'Client Retention' },
  ],

  // ── CTA ──────────────────────────────────────────────────────────────────
  ctaLabel: 'Body By Brad',
  ctaL1: 'Join The',
  ctaL2: 'Movement',
  ctaDesc: "Train harder. Live better. Build the physique you’ve always wanted with Charleston’s elite coach.",
  ctaBtn: 'Book a Free Call',

  // ── Contact ──────────────────────────────────────────────────────────────
  contactHeroDesc: "A record of defining moments that reflect Body By Brad's pursuit of excellence and transformation.",
  contactHeroL1: 'STAY CONNECTED',
  contactHeroL2: 'WITH BRAD',
  contactDetailsTitle: 'CONTACT DETAILS',
  contactStudioLabel: 'STUDIO ADDRESS',
  contactStudioAddress: ['HYLO West Ashley', '466 Savannah Hwy', 'Charleston, SC 29407', 'United States'],
  contactPhoneLabel: 'PHONE',
  contactPhoneNumber: '+1 (843) 555-0149',
  contactPhoneNote: 'Available during training hours',
  contactEmailLabel: 'EMAIL',
  contactEmailValue: 'bodybybradfitness@gmail.com',
  contactFormHeadingL1: 'GET IN TOUCH',
  contactFormHeadingL2: '',
  contactFormSubtitle: 'Send us a message and our team will get back to you shortly.',
  contactFormPersonalLabel: 'PERSONAL INFO',
  contactFormCoachingLabel: 'COACHING',
  contactFormFullName: 'Full Name',
  contactFormFullNamePh: 'Full Name*',
  contactFormEmail: 'Email',
  contactFormEmailPh: 'example@gmail.com*',
  contactFormPhone: 'Phone',
  contactFormPhonePh: '+1 234 567 8900',
  contactFormAgeGroup: 'Age Group',
  contactFormAgeGroupOptions: ['Select…', '18–24', '25–34', '35–44', '45–54', '55+'],
  contactFormCoachingType: 'Type of Coaching',
  contactFormCoachingTypeOptions: ['Select…', 'Personal Training', 'Group Fitness', 'Online Coaching', 'Event Booking'],
  contactFormExperience: 'Experience Level',
  contactFormExperienceOptions: ['Select…', 'Beginner', 'Intermediate', 'Advanced'],
  contactFormMessage: 'Message',
  contactFormMessagePh: 'Type here…',
  contactFormSubmit: 'Submit',

  // ── Blog ─────────────────────────────────────────────────────────────────
  blogLabel: 'Blog & News',
  blogHeadingL1: 'TAKE THE FIRST STEP',
  blogHeadingL2: 'TO STRENGTH',
  blogMoreNews: 'More News',
};

const es: typeof en = {
  // ── Navbar / Menu overlay ─────────────────────────────────────────────────
  close: 'Cerrar',
  getStarted: 'comenzar',
  menuItems: ['Inicio', 'Nosotros', 'Servicios', 'Paquetes', 'Eventos', 'Resultados', 'Blog', 'Merch', 'Contacto'],
  policyItems: ['Política de Privacidad', 'Términos de Uso', 'Acuerdo del Cliente'],
  latestEvents: 'Últimos Eventos',
  cooldownMarquee: 'Evento Cooldown · Charleston SC · Regístrate · ',
  shopNow: 'Comprar Ahora',
  merchandiseLabel: 'Merch',

  // ── Hero ─────────────────────────────────────────────────────────────────
  heroDescRight: 'El destino premier de Charleston para el fitness de élite, con coaching de alto rendimiento y entrenamiento orientado a resultados en Carolina del Sur.',
  heroDescLeft: 'entrenamiento personalizado diseñado en torno a tus metas, nivel de fuerza, horario y bienestar a largo plazo',
  heroHeadline1: 'DONDE EL ESFUERZO',
  heroHeadline2: 'SE CONVIERTE EN',
  heroHeadline3: 'TRANSFORMACIÓN',
  yearsLabel: 'años de clientes',
  sessionsLabel: 'clientes atendidos',

  // ── About hero ───────────────────────────────────────────────────────────
  aboutHeroDesc: 'Body By Brad se construye sobre disciplina, comunidad y un enfoque orientado a resultados en coaching, entrenamiento y transformación duradera.',
  aboutHeroL1: 'MÁS QUE UN',
  aboutHeroL2: 'COACH DE FITNESS',
  aboutBioParagraphs: [
    'Después de jugar fútbol americano en The Citadel y graduarme en 2019, di el salto al mundo corporativo con ambición y todo el ímpetu. No tardé mucho en darme cuenta de que el camino tradicional no era para mí.',
    'Dejé el trabajo de escritorio, obtuve mi certificación ISSA y construí lo que se convertiría en Body By Brad — una marca de fitness y estilo de vida basada en energía, comunidad y movimiento intencional.',
    'Desde entonces, he tenido la oportunidad de inspirar a miles de personas a través de entrenamientos llenos de energía, eventos inolvidables, coaching en línea y una mentalidad basada en la constancia, la confianza y estar presente para uno mismo. Conocido por mi estilo motivador, mi energía contagiosa y mis playlists con fuego, mi meta siempre ha sido que el fitness sea algo que la gente espere con ganas.',
    'Ya sea entrenando conmigo en una clase grupal, uniéndote a una corrida comunitaria, siguiendo un programa en línea o trabajando uno a uno, mi enfoque es el mismo: ayudar a la gente a construir fuerza, confianza, disciplina y rutinas que realmente perduren.',
    'El fitness cambió mi vida — y ahora estoy aquí para ayudar a otros a cambiar la suya. ¡Ven a redefinir tu rutina conmigo!',
  ],
  aboutBioName: 'Coach Brad',
  aboutBioRole: 'Fundador y Coach Principal',

  // ── Who We Are ───────────────────────────────────────────────────────────
  whoLabel: 'QUIÉNES SOMOS',
  whoLine1: 'EL HOMBRE',
  whoLine2: 'DETRÁS DEL',
  whoLine3: 'MOVIMIENTO',
  whoTagline: 'Del atletismo universitario de élite a construir una de las principales comunidades fitness de Charleston.',
  whoBio1: 'Después de jugar fútbol americano en The Citadel y graduarme en 2019, me sumergí en el mundo corporativo con muchas energías. Poco después me di cuenta de que ese no era mi camino. Dejé mi trabajo de escritorio y encontré mi nuevo hogar en el fitness. Obtuve mi certificación de entrenador personal con ISSA, y así nació Body By Brad.',
  whoBio2: 'Desde entonces, he tenido la fortuna de reunir una comunidad increíble e inspirar a miles de personas con mi energía, mentalidad positiva y playlists de fuego. Ya sea a través de mis clases grupales, eventos, programas en línea o entrenamiento personal, me dedico a adaptar las necesidades físicas de mis clientes y ayudarles a alcanzar (¡y superar!) sus metas. ¡Ven a entrenar conmigo!',

  // ── Services ─────────────────────────────────────────────────────────────
  servicesTitle: 'Eventos de Fitness',
  servicesHighlights: 'Próximos Eventos',
  servicesJourney: 'Únete a un evento',
  servicesSlides: [
    { heading: 'Coaching personalizado diseñado alrededor de tu cuerpo, tus metas y tu horario.', cta: 'Explorar Entrenamiento Personal' },
    { heading: 'Clases grupales de alta energía que construyen comunidad real y superan todos los límites.', cta: 'Ver Clases Grupales' },
    { heading: 'Programación online estructurada entregada directo a tu teléfono, desde cualquier lugar del mundo.', cta: 'Obtener Mi Programa' },
  ],

  // ── Featured ─────────────────────────────────────────────────────────────
  featuredHeadingL1: 'Equípate. Entrena duro.',
  featuredHeadingL2: 'Luce el papel.',
  featuredDesc: 'Ropa fitness premium y eventos exclusivos — todo lo que necesitas para representar el movimiento BBB.',
  eventsCardTitleL1: 'Eventos',
  eventsCardTitleL2: 'Cooldown',
  eventsCardTitleL3: 'Charleston',
  eventsCardDesc: 'Únete a la comunidad en nuestros legendarios eventos Cooldown — fitness, diversión y buena vibra en el corazón de Charleston.',
  eventsCardBtn: 'Ver Eventos',
  merchCardTitleL1: 'Viste la',
  merchCardTitleL2: 'marca BBB',
  merchCardDesc: 'Representa el movimiento. Ropa oficial Body By Brad — hecha para el gimnasio, diseñada para la calle.',
  merchCardBtn: 'Ver Merch',

  // ── Merch Section ────────────────────────────────────────────────────────
  newDropsHeading: 'Nuevos Lanzamientos',
  newDropsDesc: 'Destácate con nuestra última colección: diseños atrevidos, telas premium y looks listos para la calle. ¡Una vez que se agoten, no hay más!',
  shopNowBtn: 'Comprar Ahora',
  addToCart: 'Agregar al Carrito',
  newBadge: 'Nuevo',
  merchItemDescs: [
    'Una hoodie minimalista y elegante con tonos oscuros y acentos refractivos sutiles para un estilo urbano sin esfuerzo.',
    'Urban Phantom – Una hoodie oversized atrevida con gráficos audaces y una estética sigilosa inspirada en las noches de la ciudad.',
    'Una pieza icónica con detalles de neón vibrantes e influencias del arte callejero rebelde para un look que destaca.',
  ],

  // ── BMI ──────────────────────────────────────────────────────────────────
  healthTools: 'Herramientas de Salud',
  bmiHeadingL1: 'Conoce tus',
  bmiHeadingL2: 'números.',
  bmiDesc: 'Usa nuestra calculadora de IMC para entender tu composición corporal y dar el primer paso hacia tus metas fitness.',
  heightLabel: 'Estatura',
  weightLabel: 'Peso',
  feetLabel: 'Pies',
  inchesLabel: 'Pulgadas',
  calculateBtn: 'Calcular IMC',
  yourBMI: 'Tu IMC',
  bmiPlaceholder: 'Ingresa tus datos y\ncalcula tu IMC',
  bookSession: 'Reservar sesión ↗',
  scaleUnder: 'Bajo',
  scaleNormal: 'Normal',
  scaleOver: 'Sobre',
  scaleObese: 'Obeso',
  bmiUnderweightLabel: 'Bajo peso',
  bmiUnderweightTip: 'Puedes beneficiarte de aumentar la ingesta calórica y el entrenamiento de fuerza. Construyamos un plan juntos.',
  bmiNormalLabel: 'Peso normal',
  bmiNormalTip: '¡Estás en un rango saludable! Sigue así — vamos a ir aún más lejos.',
  bmiOverweightLabel: 'Sobrepeso',
  bmiOverweightTip: 'Pequeños ajustes en el estilo de vida pueden hacer una gran diferencia. ¿Listo para subir de nivel?',
  bmiObeseLabel: 'Obesidad',
  bmiObeseTip: 'Un programa estructurado puede ponerte de nuevo en camino. Empecemos hoy.',

  // ── Testimonials ─────────────────────────────────────────────────────────
  testimonialsL1: 'LO QUE DICEN',
  testimonialsL2: 'NUESTROS CLIENTES',

  // ── FAQ ──────────────────────────────────────────────────────────────────
  faqLabel: 'PREGUNTAS',
  faqHeadingL1: 'Preguntas',
  faqHeadingL2: 'Frecuentes',
  faqSubtitle: 'Encuentra respuestas a preguntas comunes',
  faqItems: [
    { q: '¿Qué tipos de entrenamiento ofreces?', a: 'Ofrezco entrenamiento personal uno a uno, clases de fitness grupal de alta energía y programas de coaching online completamente estructurados. Ya sea que quieras entrenar en persona en Charleston o desde cualquier parte del mundo, hay un plan diseñado para ti.' },
    { q: '¿Cómo puedo empezar?', a: 'Empezar es sencillo — contáctame a través del formulario de contacto o por DM en Instagram. Agendaremos una llamada rápida para hablar sobre tus metas, tu nivel de condición física actual y qué programa se adapta mejor a ti.' },
    { q: '¿Necesito equipamiento para el coaching online?', a: 'No necesariamente. Los programas se adaptan a lo que tienes disponible — ya sea un gimnasio completo, mancuernas o simplemente tu peso corporal. Construiré el programa según tu configuración.' },
    { q: '¿Qué tan rápido veré resultados?', a: 'La mayoría de los clientes notan cambios reales en 4 a 8 semanas cuando son constantes con el entrenamiento y la nutrición. Los resultados varían según tu punto de partida, metas y compromiso — pero estaré revisando tu progreso en cada paso del camino.' },
    { q: '¿Qué son los eventos Cooldown?', a: 'Los eventos Cooldown son experiencias fitness comunitarias que organizo en Charleston — piensa en entrenamientos grupales, buena música y gente increíble. Están abiertos a todos los niveles de condición física y son una excelente manera de conocer la comunidad BBB antes de comprometerte con un programa.' },
    { q: '¿Cuál es tu política de cancelación?', a: 'Para sesiones en persona, pido al menos 24 horas de aviso para cancelaciones. El coaching online se factura mensualmente y puede pausarse o cancelarse antes del siguiente ciclo de facturación sin cargos ocultos.' },
  ],

  // ── Transformation ───────────────────────────────────────────────────────
  transformLabel: 'Resultados Reales',
  transformL1: 'Trans-',
  transformL2: 'formaciones Reales',
  transformDesc: 'Cada físico que ves fue construido con constancia, coaching y compromiso — clientes reales, resultados reales.',
  transformStats: [
    { value: '500+', label: 'Clientes Transformados' },
    { value: '8+', label: 'Años de Experiencia' },
    { value: '98%', label: 'Retención de Clientes' },
  ],

  // ── CTA ──────────────────────────────────────────────────────────────────
  ctaLabel: 'Body By Brad',
  ctaL1: 'Únete Al',
  ctaL2: 'Movimiento',
  ctaDesc: 'Entrena más duro. Vive mejor. Construye el físico que siempre quisiste con el entrenador élite de Charleston.',
  ctaBtn: 'Reserva una Llamada',

  // ── Contact ──────────────────────────────────────────────────────────────
  contactHeroDesc: 'Un registro de momentos definitorios que reflejan la búsqueda de excelencia y transformación de Body By Brad.',
  contactHeroL1: 'MANTENTE CONECTADO',
  contactHeroL2: 'CON BRAD',
  contactDetailsTitle: 'DATOS DE CONTACTO',
  contactStudioLabel: 'DIRECCIÓN DEL ESTUDIO',
  contactStudioAddress: ['HYLO West Ashley', '466 Savannah Hwy', 'Charleston, SC 29407', 'Estados Unidos'],
  contactPhoneLabel: 'TELÉFONO',
  contactPhoneNumber: '+1 (843) 555-0149',
  contactPhoneNote: 'Disponible durante horario de entrenamiento',
  contactEmailLabel: 'CORREO',
  contactEmailValue: 'bodybybradfitness@gmail.com',
  contactFormHeadingL1: 'CONTÁCTANOS',
  contactFormHeadingL2: '',
  contactFormSubtitle: 'Envíanos un mensaje y nuestro equipo te responderá pronto.',
  contactFormPersonalLabel: 'INFO PERSONAL',
  contactFormCoachingLabel: 'COACHING',
  contactFormFullName: 'Nombre Completo',
  contactFormFullNamePh: 'Nombre Completo*',
  contactFormEmail: 'Correo',
  contactFormEmailPh: 'ejemplo@gmail.com*',
  contactFormPhone: 'Teléfono',
  contactFormPhonePh: '+1 234 567 8900',
  contactFormAgeGroup: 'Grupo de Edad',
  contactFormAgeGroupOptions: ['Selecciona…', '18–24', '25–34', '35–44', '45–54', '55+'],
  contactFormCoachingType: 'Tipo de Coaching',
  contactFormCoachingTypeOptions: ['Selecciona…', 'Entrenamiento Personal', 'Clases Grupales', 'Coaching Online', 'Reserva de Evento'],
  contactFormExperience: 'Nivel de Experiencia',
  contactFormExperienceOptions: ['Selecciona…', 'Principiante', 'Intermedio', 'Avanzado'],
  contactFormMessage: 'Mensaje',
  contactFormMessagePh: 'Escribe aquí…',
  contactFormSubmit: 'Enviar',

  // ── Blog ─────────────────────────────────────────────────────────────────
  blogLabel: 'Blog y Noticias',
  blogHeadingL1: 'DA EL PRIMER PASO',
  blogHeadingL2: 'HACIA LA FUERZA',
  blogMoreNews: 'Más Noticias',
};

export const translations = { en, es };
export type Translations = typeof en;
