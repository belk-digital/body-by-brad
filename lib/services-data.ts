export type ServiceBenefit = {
  iconName: string;
  title: string;
  desc: string;
};

export type ServiceStep = {
  number: string;
  title: string;
  desc: string;
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  title: string;
  titleLines: [string, string];
  tagline: string;
  accentLabel: string;
  shortDesc: string;
  heroDesc: string;
  heroImage: string;
  iconName: string;
  benefits: ServiceBenefit[];
  included: string[];
  process: ServiceStep[];
  faq: ServiceFaq[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const SERVICES_DATA: Service[] = [
  {
    slug: 'online-fitness-training',
    title: 'ONLINE FITNESS TRAINING',
    titleLines: ['ONLINE FITNESS', 'TRAINING'],
    tagline: 'Train Smarter. From Anywhere.',
    accentLabel: 'ONLINE PROGRAM',
    shortDesc:
      'Train smarter from anywhere with fully custom programs delivered to your phone, built around your schedule and goals.',
    heroDesc:
      "Get a fully custom fitness program built specifically for you — delivered straight to your phone. Whether you're traveling, working late, or just prefer training on your own terms, this program moves with you.",
    heroImage:
      'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Dumbbell',
    benefits: [
      {
        iconName: 'Zap',
        title: 'Train Anywhere',
        desc: 'Your program adapts to any gym, equipment, or location — no excuses, no disruptions.',
      },
      {
        iconName: 'Calendar',
        title: 'Built Around Your Schedule',
        desc: 'Programs designed around your availability, not the other way around.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Real, Measurable Results',
        desc: "Structured progression means you're always moving forward — tracked week by week.",
      },
    ],
    included: [
      'Fully custom workout programming',
      'Detailed exercise library with video demonstrations',
      'Weekly program adjustments based on progress',
      'Nutrition guidance and calorie targets',
      'Direct messaging access to Brad',
      'Monthly progress reviews',
    ],
    process: [
      {
        number: '01',
        title: 'Fitness Assessment',
        desc: 'We start with a detailed intake covering your goals, schedule, equipment, and fitness history.',
      },
      {
        number: '02',
        title: 'Custom Program Built',
        desc: 'Brad builds a periodized training program tailored to exactly what you need.',
      },
      {
        number: '03',
        title: 'Start Training',
        desc: 'Access your program on your phone. New weeks unlock automatically.',
      },
      {
        number: '04',
        title: 'Weekly Review',
        desc: 'Regular check-ins ensure your program evolves as you do.',
      },
    ],
    faq: [
      {
        q: 'Do I need a gym membership?',
        a: "Not necessarily. Programs are built around whatever equipment you have access to — from a full gym to just a set of dumbbells or bodyweight.",
      },
      {
        q: 'How is this different from a generic fitness app?',
        a: "Every program is built from scratch for you specifically — your goals, your body, your schedule. There's nothing generic about it.",
      },
      {
        q: 'Can I message Brad if I have questions?',
        a: 'Yes. Direct messaging access is included so you can ask questions, report how workouts felt, or flag any issues.',
      },
      {
        q: 'How often does my program change?',
        a: 'Programs are reviewed and updated weekly based on your logged workouts and check-in feedback. Nothing stays stale.',
      },
    ],
    seo: {
      title: 'Online Fitness Training | Body By Brad Charleston SC',
      description:
        'Get a custom online fitness training program built for your goals, schedule, and equipment — delivered to your phone. Expert coaching from Brad in Charleston, SC.',
      keywords: [
        'online fitness training',
        'custom workout program',
        'online personal trainer',
        'fitness coaching',
        'Charleston SC fitness trainer',
        'remote personal training',
      ],
    },
  },
  {
    slug: 'elite-personal-training',
    title: 'ELITE PERSONAL TRAINING',
    titleLines: ['ELITE PERSONAL', 'TRAINING'],
    tagline: 'The Highest Level of 1-on-1 Coaching.',
    accentLabel: 'IN-PERSON COACHING',
    shortDesc:
      'The highest level of 1-on-1 coaching — fully personalized programming, daily support, and concierge-level attention.',
    heroDesc:
      "This is the flagship experience. Elite Personal Training is fully immersive 1-on-1 coaching designed for those who are serious about results and want the best possible support to get there.",
    heroImage:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Trophy',
    benefits: [
      {
        iconName: 'Award',
        title: 'True 1-on-1 Attention',
        desc: 'Every session is 100% focused on you — form, intensity, and adjustments in real time.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Fastest Path to Results',
        desc: 'Direct coaching, real-time feedback, and personalized programming accelerate progress.',
      },
      {
        iconName: 'MessageCircle',
        title: 'Daily Coach Access',
        desc: 'Direct messaging with Brad so no question goes unanswered and no momentum is lost.',
      },
    ],
    included: [
      'In-person training sessions (frequency based on package)',
      'Fully custom periodized programming',
      'Daily communication with Brad',
      'Comprehensive nutrition coaching and meal planning',
      'Lifestyle and recovery guidance',
      'Monthly body composition assessments',
      'Priority scheduling and session flexibility',
    ],
    process: [
      {
        number: '01',
        title: 'Initial Consultation',
        desc: 'A deep-dive consultation to understand your goals, lifestyle, history, and what success looks like.',
      },
      {
        number: '02',
        title: 'Program Design',
        desc: 'Brad builds your complete training and nutrition roadmap from the ground up.',
      },
      {
        number: '03',
        title: 'Training Begins',
        desc: 'Sessions are scheduled around your life. Every workout is coached, adjusted, and optimized.',
      },
      {
        number: '04',
        title: 'Ongoing Optimization',
        desc: 'Regular assessments and program updates keep you progressing every single month.',
      },
    ],
    faq: [
      {
        q: 'Where do training sessions take place?',
        a: 'Sessions take place at a private gym facility in Charleston, SC. Details are shared after enrollment.',
      },
      {
        q: 'How many sessions per week?',
        a: "This depends on your chosen package. We'll determine the ideal training frequency during your consultation based on your schedule and goals.",
      },
      {
        q: 'Is nutrition coaching included?',
        a: 'Yes. Elite Personal Training includes comprehensive nutrition coaching — not just calorie counts, but a full approach to how you eat, recover, and fuel performance.',
      },
      {
        q: 'Is this right for beginners?',
        a: "Absolutely. Elite Training is designed to meet you where you are and take you where you want to go — regardless of starting point.",
      },
    ],
    seo: {
      title: 'Elite Personal Training Charleston SC | Body By Brad',
      description:
        'Experience the highest level of 1-on-1 personal training in Charleston, SC. Fully custom programming, daily coach access, and concierge-level attention. Book with Brad today.',
      keywords: [
        'personal trainer Charleston SC',
        'elite personal training',
        '1-on-1 coaching Charleston',
        'personal training near me',
        'private personal trainer Charleston',
        'fitness coach Charleston SC',
      ],
    },
  },
  {
    slug: 'at-home-training',
    title: 'AT HOME TRAINING',
    titleLines: ['AT HOME', 'TRAINING'],
    tagline: 'No Gym. No Problem. No Excuses.',
    accentLabel: 'HOME PROGRAM',
    shortDesc:
      'No gym, no problem. Get a complete training experience designed around your home setup, schedule, and equipment.',
    heroDesc:
      "You don't need a gym to get in the best shape of your life. At Home Training delivers a complete, professional fitness program built specifically for your space, your equipment, and your schedule.",
    heroImage:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Home',
    benefits: [
      {
        iconName: 'Home',
        title: 'Train in Your Own Space',
        desc: 'No commute, no wait times, no intimidating gym floor — just pure results.',
      },
      {
        iconName: 'Clock',
        title: 'Save Time',
        desc: 'Eliminate travel and train whenever it fits — morning, lunch, or late night.',
      },
      {
        iconName: 'Dumbbell',
        title: 'Equipment-Optional',
        desc: 'Programs work with whatever you have — kettlebells, dumbbells, bands, or just bodyweight.',
      },
    ],
    included: [
      'Home-optimized custom workout plans',
      'Equipment assessment and recommendations',
      'Video demonstrations for every exercise',
      'Progressions for all fitness levels',
      'Nutrition guidance and meal ideas',
      'Weekly check-ins and program adjustments',
    ],
    process: [
      {
        number: '01',
        title: 'Home Assessment',
        desc: "Tell Brad what equipment you have (or don't) and your available space.",
      },
      {
        number: '02',
        title: 'Program Creation',
        desc: "A custom program is built to maximize what's available in your home setup.",
      },
      {
        number: '03',
        title: 'Start Training',
        desc: 'Access your program on your phone. Video demos ensure perfect form on every movement.',
      },
      {
        number: '04',
        title: 'Weekly Adjustments',
        desc: 'Your program evolves as you get stronger, fitter, and more capable.',
      },
    ],
    faq: [
      {
        q: 'What if I only have bodyweight?',
        a: "Bodyweight training is incredibly effective and Brad has built life-changing programs using zero equipment. Limitations breed creativity.",
      },
      {
        q: 'Will I actually get results training at home?',
        a: "Yes — consistently. Results come from the quality of the program and your consistency, not the location. Many of Brad's best-performing clients train exclusively at home.",
      },
      {
        q: 'What equipment should I invest in?',
        a: "A set of adjustable dumbbells and resistance bands cover 90% of what you need. Brad will give specific recommendations based on your goals and budget.",
      },
      {
        q: 'Can I transition to gym training later?',
        a: "Absolutely. The program evolves with you. If you get gym access down the road, your programming will transition seamlessly.",
      },
    ],
    seo: {
      title: 'At Home Training Programs | Body By Brad Charleston SC',
      description:
        'Custom at-home workout programs built for your space, equipment, and schedule. No gym required. Expert fitness coaching from Brad in Charleston, SC.',
      keywords: [
        'at home workout program',
        'home personal training',
        'home fitness coach',
        'no gym workout program',
        'bodyweight training program',
        'work out at home Charleston SC',
      ],
    },
  },
  {
    slug: 'weight-loss',
    title: 'WEIGHT LOSS',
    titleLines: ['WEIGHT', 'LOSS'],
    tagline: 'Sustainable Results. Expert Guidance.',
    accentLabel: 'TRANSFORMATION PROGRAM',
    shortDesc:
      'Transform your body and health with our expert-guided weight loss programs tailored specifically to your goals.',
    heroDesc:
      "Weight loss done right — not crash diets, not punishing workouts, but a smart, sustainable strategy built around your body, your lifestyle, and your goals. Real results that actually last.",
    heroImage:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Target',
    benefits: [
      {
        iconName: 'Target',
        title: 'Goal-Focused Strategy',
        desc: 'Every detail of your program is calibrated to your specific weight loss target and timeline.',
      },
      {
        iconName: 'Heart',
        title: 'Sustainable Approach',
        desc: "No crash diets or extreme restrictions — a lifestyle shift that keeps the weight off for good.",
      },
      {
        iconName: 'TrendingUp',
        title: 'Proven Results',
        desc: "Hundreds of clients have transformed their bodies with Brad's evidence-based approach.",
      },
    ],
    included: [
      'Custom calorie and macro targets',
      'Meal planning guidance and smart food swaps',
      'Fat-loss focused training program',
      'Weekly weigh-ins and measurement tracking',
      'Progress photo analysis',
      'Mindset and habit coaching',
      'Plateau-busting program adjustments',
    ],
    process: [
      {
        number: '01',
        title: 'Body Analysis',
        desc: 'Starting measurements, body composition, and a complete picture of where you are today.',
      },
      {
        number: '02',
        title: 'Custom Strategy',
        desc: 'A targeted plan combining the right calorie deficit, training approach, and nutrition strategy.',
      },
      {
        number: '03',
        title: 'Consistent Execution',
        desc: 'Weekly check-ins keep you accountable and on track. Brad adjusts when needed.',
      },
      {
        number: '04',
        title: 'Results & Maintenance',
        desc: 'Hit your goal, then build the habits to keep the weight off long-term.',
      },
    ],
    faq: [
      {
        q: 'How quickly will I lose weight?',
        a: 'Most clients see noticeable changes within 4–6 weeks. A healthy, sustainable rate is 1–2 lbs per week — anything faster typically sacrifices muscle and long-term results.',
      },
      {
        q: 'Do I have to follow a strict diet?',
        a: "No strict diets here. Brad uses flexible nutrition strategies that fit your food preferences and lifestyle, so you can stay consistent without feeling deprived.",
      },
      {
        q: 'What if I hit a plateau?',
        a: "Plateaus are normal and Brad has seen them all. When progress stalls, the program gets adjusted — whether that's calories, training, recovery, or all three.",
      },
      {
        q: 'Is this program for men and women?',
        a: "Yes. Programs are built around your individual physiology, goals, and preferences — gender-specific nuances are always accounted for.",
      },
    ],
    seo: {
      title: 'Weight Loss Programs Charleston SC | Body By Brad',
      description:
        'Expert-guided weight loss programs in Charleston, SC. Custom nutrition plans, proven training strategies, and results that last. Start your transformation with Brad today.',
      keywords: [
        'weight loss program Charleston SC',
        'weight loss coach Charleston',
        'fat loss program',
        'personal trainer weight loss',
        'weight loss transformation',
        'body transformation coach Charleston',
      ],
    },
  },
  {
    slug: 'online-coaching',
    title: 'ONLINE COACHING',
    titleLines: ['ONLINE', 'COACHING'],
    tagline: 'Structure. Accountability. Results.',
    accentLabel: 'REMOTE COACHING',
    shortDesc:
      'Experience the structure and accountability of our dynamic digital coaching programs from anywhere in the world.',
    heroDesc:
      "Online coaching brings the full BBB experience to wherever you are. Get structured programming, consistent accountability, and real coaching — from Charleston to anywhere on the planet.",
    heroImage:
      'https://images.unsplash.com/photo-1581009137042-c552e485697a?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Smartphone',
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Coach in Your Pocket',
        desc: 'Access your program, log workouts, and message Brad from your phone — anytime.',
      },
      {
        iconName: 'Users',
        title: 'Real Accountability',
        desc: 'Regular check-ins and progress reviews keep you consistent when motivation dips.',
      },
      {
        iconName: 'Calendar',
        title: 'Structured Programming',
        desc: 'Professionally periodized plans that build on each other month after month.',
      },
    ],
    included: [
      'Monthly custom training programs',
      'Bi-weekly or weekly check-ins',
      'Unlimited messaging with Brad',
      'Nutrition guidance and targets',
      'Form video reviews',
      'Monthly progress assessments',
      'Priority response times',
    ],
    process: [
      {
        number: '01',
        title: 'Discovery Call',
        desc: 'A quick call to align on goals, schedule, training history, and expectations.',
      },
      {
        number: '02',
        title: 'Program Setup',
        desc: 'Your first month of programming is built and delivered before day one.',
      },
      {
        number: '03',
        title: 'Begin Coaching',
        desc: 'Start training and connect with Brad for feedback, questions, and support.',
      },
      {
        number: '04',
        title: 'Monthly Reviews',
        desc: 'At the end of each month, progress is assessed and the next block is optimized.',
      },
    ],
    faq: [
      {
        q: 'How is online coaching different from online training?',
        a: "Online coaching is more comprehensive — it includes regular coach communication, accountability check-ins, form reviews, and ongoing program management. It's a full coaching relationship, not just a program delivery.",
      },
      {
        q: 'How often do we communicate?',
        a: 'At minimum, weekly check-ins via app or video call. But you also have unlimited messaging access, so Brad is reachable whenever you need him.',
      },
      {
        q: 'Can I train at any gym?',
        a: "Yes. Your program is built for whatever gym or equipment you have access to. Just let Brad know your setup.",
      },
      {
        q: "What time zone is Brad in?",
        a: "Brad is based in Charleston, SC (Eastern Time). Response times are typically same-day during business hours.",
      },
    ],
    seo: {
      title: 'Online Coaching Programs | Body By Brad Charleston SC',
      description:
        'Online fitness coaching with real accountability, custom programming, and direct access to Brad. Train from anywhere in the world with expert guidance from Charleston, SC.',
      keywords: [
        'online fitness coaching',
        'remote personal training',
        'online coach',
        'virtual fitness coach',
        'online workout program',
        'fitness accountability coach',
      ],
    },
  },
  {
    slug: 'fitness-classes',
    title: 'FITNESS CLASSES',
    titleLines: ['FITNESS', 'CLASSES'],
    tagline: 'Community Energy. Real Results.',
    accentLabel: 'GROUP TRAINING',
    shortDesc:
      'Our body fitness classes combine strength training, dynamic movements, and community energy built around real results.',
    heroDesc:
      "High-energy group fitness classes that bring the community together. Whether you're a beginner or a seasoned athlete, classes are designed to push every person in the room to their next level.",
    heroImage:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1920&q=85',
    iconName: 'Flame',
    benefits: [
      {
        iconName: 'Flame',
        title: 'High-Energy Sessions',
        desc: 'Every class is designed to push you — expect sweat, intensity, and results.',
      },
      {
        iconName: 'Users',
        title: 'Community Driven',
        desc: 'Train alongside motivated people who push each other further than solo training ever could.',
      },
      {
        iconName: 'Zap',
        title: 'Endless Variety',
        desc: 'Rotating formats keep classes fresh — strength, conditioning, circuits, and more.',
      },
    ],
    included: [
      'Weekly class schedule (multiple time slots)',
      'Strength and conditioning formats',
      'Cardio and circuit training classes',
      'All fitness levels welcome',
      'Coach-led every single session',
      'Community group chat access',
      'Progress tracking within class',
    ],
    process: [
      {
        number: '01',
        title: 'Pick a Class',
        desc: 'Browse the weekly schedule and choose the time and format that works for you.',
      },
      {
        number: '02',
        title: 'Show Up',
        desc: 'Arrive ready to work. Brad and the community will take care of the rest.',
      },
      {
        number: '03',
        title: 'Push Hard',
        desc: 'Every class is coached to ensure proper form and maximum effort for every participant.',
      },
      {
        number: '04',
        title: 'See Results',
        desc: 'Consistent class attendance builds the habit, the community, and the body you want.',
      },
    ],
    faq: [
      {
        q: 'What fitness level do I need?',
        a: "All levels are welcome. Classes are scaled so beginners and advanced athletes can train side-by-side and both get an effective, challenging workout.",
      },
      {
        q: 'How many people are in each class?',
        a: "Classes are intentionally kept small to ensure quality coaching and a true community feel — not a crowded gym floor.",
      },
      {
        q: 'Where are classes held?',
        a: "Classes take place in Charleston, SC. Exact location details are shared after registration.",
      },
      {
        q: 'Can I try a class before committing?',
        a: "Yes — reach out through the contact page to ask about drop-in options or a first-class experience.",
      },
    ],
    seo: {
      title: 'Fitness Classes Charleston SC | Body By Brad Group Training',
      description:
        'High-energy group fitness classes in Charleston, SC. Strength training, conditioning, and community-driven workouts coached by Brad. All fitness levels welcome.',
      keywords: [
        'fitness classes Charleston SC',
        'group fitness classes Charleston',
        'bootcamp classes Charleston',
        'strength training classes',
        'group workout Charleston',
        'fitness community Charleston SC',
      ],
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES_DATA.map((s) => s.slug);
}
