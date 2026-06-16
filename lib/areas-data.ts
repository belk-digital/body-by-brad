export type AreaBenefit = {
  iconName: string;
  title: string;
  desc: string;
};

export type AreaStep = {
  number: string;
  title: string;
  desc: string;
};

export type AreaFaq = {
  q: string;
  a: string;
};

export type AreaData = {
  slug: string;
  name: string;
  sub: string;
  distance: string;
  inPerson: boolean;
  desc: string;
  tagline: string;
  heroImage: string;
  overview: string;
  benefits: AreaBenefit[];
  included: string[];
  process: AreaStep[];
  faq: AreaFaq[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

const HERO_IN_PERSON =
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=85';
const HERO_ONLINE =
  'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=1920&q=85';

const INCLUDED_COMMON: string[] = [
  'Custom program built around your schedule and goals',
  'Weekly progress check-ins with Brad',
  'Unlimited text and messaging support',
  'Nutrition guidance and meal structure',
  'Accountability tracking and milestone reviews',
  'Access to BBB Cooldown community events',
];

const PROCESS_COMMON: AreaStep[] = [
  {
    number: '01',
    title: 'Reach Out',
    desc: 'Message Brad through the contact page or on Instagram to talk goals, schedule, and what you need.',
  },
  {
    number: '02',
    title: 'Intake Call',
    desc: 'Brad learns your training history, lifestyle, and goals to build a plan specifically for you.',
  },
  {
    number: '03',
    title: 'Start Training',
    desc: 'Your program launches. In-person sessions begin or your online plan lands on your phone — ready to go.',
  },
  {
    number: '04',
    title: 'Track & Grow',
    desc: 'Brad adjusts your program weekly based on your progress. Results compound. You keep moving forward.',
  },
];

export const AREAS_DATA: AreaData[] = [
  {
    slug: 'charleston',
    name: 'Charleston',
    sub: 'Downtown & Peninsula',
    distance: 'Home Base',
    inPerson: true,
    desc: "Brad's primary training location. All services — elite 1-on-1, group classes, and full online coaching — are available.",
    tagline: 'Personal Training in the Heart of Charleston',
    heroImage: HERO_IN_PERSON,
    overview:
      "Charleston is Brad's home base — where Body By Brad was built and where every service is fully available. From one-on-one elite sessions on the Peninsula to group Cooldown events at Marion Square, this is where the BBB experience runs deepest. Whether you want to train at your gym, at home, or outdoors, Brad knows Charleston and trains here every day.",
    benefits: [
      {
        iconName: 'MapPin',
        title: "Brad's Home Base",
        desc: "Charleston is Brad's primary training zone — you get maximum availability, flexible scheduling, and the full range of BBB services.",
      },
      {
        iconName: 'Users',
        title: 'Group Classes Available',
        desc: 'Charleston residents have full access to BBB group fitness classes and community Cooldown events — unique to downtown and Peninsula clients.',
      },
      {
        iconName: 'Target',
        title: 'Every Service, One Trainer',
        desc: '1-on-1 elite training, at-home sessions, group classes, and online coaching — all available without limitations in Charleston.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'What neighborhoods in Charleston do you train in?',
        a: 'Brad trains clients across the entire Peninsula and greater Downtown Charleston — from the French Quarter and Harleston Village to Wagener Terrace, North Central, and everywhere in between.',
      },
      {
        q: 'Do you train at specific gyms or facilities in Charleston?',
        a: 'Brad works with clients at their preferred gym, at home, or in outdoor locations like Hampton Park and Marion Square. He adapts to your environment.',
      },
      {
        q: 'Can I join the BBB group fitness classes?',
        a: 'Yes. Group classes and community Cooldown events are primarily available to Charleston-area clients. Check the Events page or message Brad directly for upcoming dates.',
      },
      {
        q: 'How quickly can I get started in Charleston?',
        a: 'Brad typically has availability within 1–2 weeks for new Charleston clients. Reach out through the contact page or DM on Instagram to check current openings.',
      },
      {
        q: 'Is online coaching available for Charleston residents?',
        a: 'Absolutely. Even if you live in Charleston, online coaching is a great option if you prefer maximum flexibility or travel frequently. Same quality programming, delivered to your phone.',
      },
    ],
    seo: {
      title: 'Personal Trainer Charleston SC | Body By Brad',
      description:
        'Looking for a personal trainer in Charleston, SC? Body By Brad offers elite 1-on-1 training, group fitness, and online coaching across Downtown Charleston and the Peninsula.',
      keywords: [
        'personal trainer Charleston SC',
        'personal trainer downtown Charleston',
        'fitness trainer Charleston Peninsula',
        'body by brad Charleston',
        '1-on-1 training Charleston SC',
        'group fitness Charleston',
        'online coaching Charleston SC',
      ],
    },
  },
  {
    slug: 'mount-pleasant',
    name: 'Mount Pleasant',
    sub: 'East Cooper',
    distance: '7 mi',
    inPerson: true,
    desc: "One of Charleston's fastest-growing communities. In-person sessions and online coaching both available.",
    tagline: 'Personal Training in Mount Pleasant, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Mount Pleasant is one of Brad's most active training zones outside of downtown. Just across the Ravenel Bridge, East Cooper clients get full in-person access with the same elite BBB programming and accountability. Whether you're near Towne Centre, I'On, or Old Village, Brad travels to you or works at your gym.",
    benefits: [
      {
        iconName: 'Dumbbell',
        title: 'In-Person Access',
        desc: "Brad makes regular trips to Mount Pleasant for in-person sessions — at your gym, your home, or a preferred outdoor location.",
      },
      {
        iconName: 'Calendar',
        title: 'Flexible Scheduling',
        desc: "Mount Pleasant's proximity to downtown means Brad can accommodate early morning, lunchtime, and evening sessions with ease.",
      },
      {
        iconName: 'TrendingUp',
        title: 'Full Online Option',
        desc: 'Prefer to train on your own schedule? The complete online coaching program gives Mount Pleasant clients 24/7 access to their custom plan.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you travel to Mount Pleasant for in-person sessions?',
        a: "Yes. Brad regularly travels to Mount Pleasant for in-person training. Sessions can be held at your gym, your home, or an outdoor location of your choice.",
      },
      {
        q: 'Which areas of Mount Pleasant do you serve?',
        a: "Brad serves all of Mount Pleasant including Towne Centre, I'On, Old Village, Park West, Rivertowne, and surrounding neighborhoods.",
      },
      {
        q: 'Is there a travel fee for Mount Pleasant sessions?',
        a: 'There is no separate travel fee for Mount Pleasant clients. All session costs are included in your package. Contact Brad for current package pricing.',
      },
      {
        q: 'Can I switch between in-person and online coaching?',
        a: 'Yes. Many Mount Pleasant clients do a hybrid approach — in-person sessions a few times per week with online programming for the rest. Brad structures what works best for your schedule.',
      },
      {
        q: 'How do I get started with a personal trainer in Mount Pleasant?',
        a: 'Reach out through the contact page or send a DM on Instagram. Brad will schedule a quick intro call to learn your goals and get your plan started.',
      },
    ],
    seo: {
      title: 'Personal Trainer Mount Pleasant SC | Body By Brad',
      description:
        "Body By Brad offers personal training and online coaching in Mount Pleasant, SC. Serving East Cooper clients across Towne Centre, Old Village, and I'On.",
      keywords: [
        'personal trainer Mount Pleasant SC',
        'personal trainer East Cooper',
        'fitness trainer Mount Pleasant',
        'body by brad Mount Pleasant',
        'in-person training Mount Pleasant SC',
        'online coaching Mount Pleasant',
        'gym trainer East Cooper SC',
      ],
    },
  },
  {
    slug: 'north-charleston',
    name: 'North Charleston',
    sub: 'Greater Charleston',
    distance: '5 mi',
    inPerson: true,
    desc: 'In-person training and all online programs fully available to North Charleston residents.',
    tagline: 'Top Personal Trainer in North Charleston, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "North Charleston sits just minutes from Brad's home base — making it one of the easiest service zones for in-person training. Residents across North Charleston get full access to BBB's in-person sessions and every online coaching program. From Mixson to Park Circle and beyond, Brad brings personal training to your neighborhood.",
    benefits: [
      {
        iconName: 'Clock',
        title: 'Close to Home Base',
        desc: "At just 5 miles out, North Charleston clients benefit from Brad's fastest response times and most flexible scheduling availability.",
      },
      {
        iconName: 'Dumbbell',
        title: 'In-Person Training',
        desc: 'Full in-person access — at your preferred gym, your home, or any outdoor location in North Charleston.',
      },
      {
        iconName: 'Smartphone',
        title: 'Online Coaching Available',
        desc: "Prefer remote training? North Charleston clients have full access to Brad's online coaching program with custom programming and weekly check-ins.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training in North Charleston?',
        a: "Yes. North Charleston is one of Brad's primary in-person service zones. He travels there regularly for gym, home, and outdoor sessions.",
      },
      {
        q: 'Which North Charleston neighborhoods do you serve?',
        a: 'Brad serves all of North Charleston including Park Circle, Mixson, Wando Crossing, Dorchester Road corridor, and surrounding areas.',
      },
      {
        q: 'Is online coaching available for North Charleston clients?',
        a: "Yes. The full online coaching program is available to anyone in North Charleston. It's a great option if your schedule changes frequently or if you prefer training at your own pace.",
      },
      {
        q: 'What types of training do you offer in North Charleston?',
        a: 'Brad offers 1-on-1 personal training, at-home training, and complete online coaching in North Charleston. Group classes are primarily hosted in downtown Charleston.',
      },
      {
        q: 'How do I book a session in North Charleston?',
        a: "Message Brad through the contact page or DM him on Instagram @bradnboujee_. He'll respond quickly to set up an intro call and get your program started.",
      },
    ],
    seo: {
      title: 'Personal Trainer North Charleston SC | Body By Brad',
      description:
        'Get personal training in North Charleston, SC with Body By Brad. In-person sessions and online coaching available across Park Circle, Mixson, and surrounding areas.',
      keywords: [
        'personal trainer North Charleston SC',
        'fitness trainer North Charleston',
        'body by brad North Charleston',
        'personal trainer Park Circle SC',
        'in-person training North Charleston',
        'online coaching North Charleston SC',
        'gym trainer North Charleston',
      ],
    },
  },
  {
    slug: 'west-ashley',
    name: 'West Ashley',
    sub: 'West of the Ashley River',
    distance: '5 mi',
    inPerson: true,
    desc: 'Just across the Ashley River from downtown. In-person sessions and online coaching available.',
    tagline: 'Personal Training in West Ashley, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "West Ashley is just minutes from downtown Charleston, making it a natural extension of Brad's primary training zone. Residents throughout West Ashley get full access to in-person sessions and every BBB online program. Whether you prefer to train at your gym or at home, Brad brings elite coaching right to your side of the river.",
    benefits: [
      {
        iconName: 'MapPin',
        title: 'Minutes from Downtown',
        desc: "West Ashley's proximity to Charleston means Brad can schedule sessions here with the same flexibility and availability as downtown clients.",
      },
      {
        iconName: 'Home',
        title: 'Home & Gym Sessions',
        desc: 'In-person training is available at your home gym, preferred fitness center, or any suitable outdoor space in West Ashley.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Online Coaching Option',
        desc: 'West Ashley clients can opt for fully remote coaching — same custom programming and accountability delivered entirely through their phone.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you travel to West Ashley for in-person training?',
        a: "Yes. West Ashley is one of Brad's regular in-person service zones. He travels there for gym, home, and outdoor sessions.",
      },
      {
        q: 'Which areas of West Ashley do you serve?',
        a: 'Brad serves clients throughout West Ashley including Avondale, Byrnes Downs, South Windermere, Bees Ferry, and surrounding neighborhoods.',
      },
      {
        q: 'Can I do at-home training in West Ashley?',
        a: "Absolutely. At-home training is one of the most popular options for West Ashley clients. Brad brings the expertise — you just need the space.",
      },
      {
        q: 'Is online coaching a good option for West Ashley residents?',
        a: "Yes. Online coaching is perfect if you prefer to train on your own schedule or have a home gym setup. Brad builds a custom plan delivered to your phone with full support.",
      },
      {
        q: 'How do I book a personal trainer in West Ashley?',
        a: "Contact Brad through the contact page or send a DM on Instagram. He'll reach out quickly to schedule a short intro call and get your program started.",
      },
    ],
    seo: {
      title: 'Personal Trainer West Ashley SC | Body By Brad',
      description:
        'Body By Brad offers personal training and online coaching in West Ashley, SC. In-person sessions and custom online programs for residents across the Ashley River area.',
      keywords: [
        'personal trainer West Ashley SC',
        'fitness trainer West Ashley Charleston',
        'body by brad West Ashley',
        'personal trainer Avondale SC',
        'in-person training West Ashley',
        'online coaching West Ashley SC',
        'at-home trainer West Ashley',
      ],
    },
  },
  {
    slug: 'james-island',
    name: 'James Island',
    sub: 'Greater Charleston',
    distance: '6 mi',
    inPerson: true,
    desc: 'In-person and online programs fully available to James Island residents and surrounding areas.',
    tagline: 'Personal Trainer Serving James Island, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "James Island sits just 6 miles from downtown Charleston — close enough for Brad to make regular in-person visits and offer the same elite training he delivers everywhere else. Whether you train at a local gym or prefer sessions at home, James Island residents have full access to every BBB program and service.",
    benefits: [
      {
        iconName: 'Dumbbell',
        title: 'In-Person Access',
        desc: "James Island's short distance from Brad's base makes regular in-person sessions easy to schedule and maintain.",
      },
      {
        iconName: 'Target',
        title: 'Goal-Driven Programming',
        desc: 'Whether your goal is fat loss, strength, or athletic performance — Brad builds the program around you, not a template.',
      },
      {
        iconName: 'Smartphone',
        title: 'Online Option Available',
        desc: 'Prefer to train on your own time? The full BBB online coaching program is available to every James Island resident.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you train clients on James Island in person?',
        a: 'Yes. James Island is a regular in-person zone for Brad. He trains clients at local gyms, at home, and in outdoor settings on the island.',
      },
      {
        q: 'Which parts of James Island do you serve?',
        a: 'Brad serves all of James Island including Fort Johnson, Riverland Terrace, McLeod Plantation area, and surrounding neighborhoods all the way to Folly Road.',
      },
      {
        q: 'Is there a travel fee for James Island?',
        a: 'No separate travel fees for James Island. All costs are included in your training package. Reach out to Brad for current pricing options.',
      },
      {
        q: 'What if I prefer to train at home on James Island?',
        a: 'At-home training is fully available on James Island. Brad will assess your space and equipment, then design a program that works perfectly in your environment.',
      },
      {
        q: "Can I train online even though I'm close to Charleston?",
        a: 'Absolutely. Many James Island clients choose online coaching for the scheduling flexibility it offers. Same quality as in-person — delivered remotely.',
      },
    ],
    seo: {
      title: 'Personal Trainer James Island SC | Body By Brad',
      description:
        'Body By Brad provides personal training and online coaching on James Island, SC. In-person and remote options for all James Island residents.',
      keywords: [
        'personal trainer James Island SC',
        'fitness trainer James Island Charleston',
        'body by brad James Island',
        'in-person training James Island SC',
        'online coaching James Island',
        'at-home trainer James Island SC',
        'gym trainer James Island',
      ],
    },
  },
  {
    slug: 'daniel-island',
    name: 'Daniel Island',
    sub: 'Berkeley County',
    distance: '9 mi',
    inPerson: true,
    desc: 'In-person training sessions and complete online coaching programs available.',
    tagline: 'Personal Training on Daniel Island, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Daniel Island is one of the Lowcountry's most established planned communities — and a regular stop on Brad's in-person training route. Residents have access to both in-person sessions and the full BBB online coaching program. Whether you train at a community gym or prefer at-home sessions, Brad brings the same elite standard to every session.",
    benefits: [
      {
        iconName: 'Award',
        title: 'Elite Standard Delivered',
        desc: "Daniel Island clients receive the same championship-level programming that drives results for BBB clients across the Lowcountry.",
      },
      {
        iconName: 'Home',
        title: 'Home & Gym Ready',
        desc: 'Brad trains clients at home, at community gyms on Daniel Island, or at any preferred facility — no restrictions.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Measurable Progress',
        desc: 'Weekly check-ins, body composition tracking, and milestone reviews ensure your progress stays on track and your program stays sharp.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training on Daniel Island?',
        a: 'Yes. Brad regularly travels to Daniel Island for in-person sessions. He can train you at your home, a community gym, or an outdoor location on the island.',
      },
      {
        q: 'Which parts of Daniel Island do you serve?',
        a: "Brad serves all of Daniel Island — from the town center to residential neighborhoods near the Daniel Island Club and along the waterfront.",
      },
      {
        q: 'Can I train at a gym on Daniel Island?',
        a: 'Yes. Brad is happy to work at the gym of your choice on Daniel Island. He adapts to any facility and equipment setup.',
      },
      {
        q: 'Is online coaching available for Daniel Island residents?',
        a: 'Absolutely. The full BBB online coaching program is available to Daniel Island clients who prefer remote programming with weekly check-ins.',
      },
      {
        q: 'How do I get started with a personal trainer on Daniel Island?',
        a: "Reach out through the contact page or DM Brad on Instagram @bradnboujee_. He'll schedule a quick call to understand your goals and get your program launched.",
      },
    ],
    seo: {
      title: 'Personal Trainer Daniel Island SC | Body By Brad',
      description:
        'Body By Brad offers personal training and online coaching on Daniel Island, SC. In-person and remote sessions available for all Daniel Island residents.',
      keywords: [
        'personal trainer Daniel Island SC',
        'fitness trainer Daniel Island Charleston',
        'body by brad Daniel Island',
        'in-person training Daniel Island SC',
        'online coaching Daniel Island',
        'gym trainer Daniel Island',
        'personal trainer Berkeley County SC',
      ],
    },
  },
  {
    slug: 'johns-island',
    name: 'Johns Island',
    sub: 'Greater Charleston',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and full online coaching available to Johns Island residents.',
    tagline: 'Personal Training Built for Johns Island, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Johns Island is one of the Lowcountry's fastest-growing communities, and Brad serves it with full in-person training and complete online coaching. At 12 miles from downtown, Johns Island clients get all the benefits of elite BBB programming without the commute — Brad comes to you. Every service, every level of support, fully available.",
    benefits: [
      {
        iconName: 'MapPin',
        title: 'Brad Comes to You',
        desc: 'No need to commute. Brad travels to Johns Island for in-person sessions at your home, gym, or preferred training spot.',
      },
      {
        iconName: 'Dumbbell',
        title: 'Full In-Person Access',
        desc: "Johns Island residents have complete access to Brad's elite 1-on-1 training — weight loss, strength, performance, or any goal.",
      },
      {
        iconName: 'Smartphone',
        title: 'Online Coaching Available',
        desc: "Can't always meet in person? The BBB online program keeps your training running no matter your schedule.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you travel to Johns Island for in-person training?',
        a: 'Yes. Brad travels to Johns Island for in-person sessions. He can meet at your home, a local gym, or an outdoor location that works for you.',
      },
      {
        q: 'Which areas of Johns Island do you cover?',
        a: 'Brad covers all of Johns Island including Kiawah River, Stonoview, Rushland Landing, and other residential communities across the island.',
      },
      {
        q: 'Is there an additional charge for traveling to Johns Island?',
        a: 'No extra travel fees for Johns Island. Your package price covers everything. Contact Brad for current package rates.',
      },
      {
        q: 'Can I train at home on Johns Island?',
        a: "Yes. At-home training is fully available. Brad designs a program tailored to your space and equipment — whether that's a full home gym or just bodyweight.",
      },
      {
        q: 'What if I want to switch to online coaching later?',
        a: "No problem. Many Johns Island clients start in-person and transition to online coaching as their schedule evolves. Brad keeps your programming seamless throughout.",
      },
    ],
    seo: {
      title: 'Personal Trainer Johns Island SC | Body By Brad',
      description:
        'Body By Brad provides elite in-person personal training and online coaching on Johns Island, SC. Custom programs for weight loss, strength, and athletic performance.',
      keywords: [
        'personal trainer Johns Island SC',
        'fitness trainer Johns Island Charleston',
        'body by brad Johns Island',
        'in-person training Johns Island SC',
        'online coaching Johns Island',
        'at-home trainer Johns Island SC',
        'personal trainer Kiawah River SC',
      ],
    },
  },
  {
    slug: 'summerville',
    name: 'Summerville',
    sub: 'Dorchester County',
    distance: '24 mi',
    inPerson: true,
    desc: 'In-person training by arrangement. Full online coaching programs available to all Summerville residents.',
    tagline: 'Personal Trainer Serving Summerville, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Summerville sits at the edge of Brad's in-person radius at 24 miles from downtown — but that doesn't mean Summerville residents miss out. Brad schedules in-person sessions by arrangement for Summerville clients, and the full BBB online coaching program is available without restriction. Elite coaching is within reach, wherever you are in Dorchester County.",
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Full Online Program',
        desc: 'Summerville clients get the complete BBB online coaching experience — custom programming, check-ins, and direct access to Brad from anywhere.',
      },
      {
        iconName: 'Dumbbell',
        title: 'In-Person by Arrangement',
        desc: 'Brad schedules in-person sessions to Summerville for motivated clients. Reach out to discuss availability and scheduling options.',
      },
      {
        iconName: 'MessageCircle',
        title: 'Unlimited Support',
        desc: "Distance doesn't reduce the quality of coaching. Summerville clients get the same level of communication, support, and accountability as any in-person client.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training in Summerville?',
        a: "Yes, by arrangement. Summerville is at the outer edge of Brad's in-person radius. Reach out to discuss scheduling and how to set up in-person sessions.",
      },
      {
        q: 'Is online coaching a good fit for Summerville residents?',
        a: "Absolutely. Online coaching is the primary option for Summerville clients and delivers the same elite results as in-person training — fully customized, with weekly check-ins and constant support.",
      },
      {
        q: 'Which parts of Summerville do you serve?',
        a: 'Brad serves all of Summerville including Nexton, Carnes Crossroads, Historic Summerville, and surrounding communities in Dorchester County.',
      },
      {
        q: 'What is the cost for a personal trainer in Summerville?',
        a: 'Pricing depends on the program you choose. Check the Packages page for current rates or message Brad directly for options.',
      },
      {
        q: "How does online coaching work if I'm in Summerville?",
        a: "Brad builds your custom program and delivers it to your phone. You train on your schedule. Each week, you check in with progress updates and Brad adjusts the program to keep results coming.",
      },
    ],
    seo: {
      title: 'Personal Trainer Summerville SC | Body By Brad',
      description:
        'Body By Brad offers personal training and online coaching in Summerville, SC. Custom programs for Dorchester County residents — in-person sessions available by arrangement.',
      keywords: [
        'personal trainer Summerville SC',
        'fitness trainer Summerville SC',
        'body by brad Summerville',
        'online personal training Summerville SC',
        'online coaching Summerville SC',
        'personal trainer Nexton SC',
        'personal trainer Dorchester County SC',
      ],
    },
  },
  {
    slug: 'goose-creek',
    name: 'Goose Creek',
    sub: 'Berkeley County',
    distance: '18 mi',
    inPerson: false,
    desc: 'Complete online coaching and remote training programs available to Goose Creek residents.',
    tagline: 'Online Personal Training for Goose Creek, SC',
    heroImage: HERO_ONLINE,
    overview:
      "Goose Creek residents have full access to the complete BBB online coaching program — the same custom programming, weekly check-ins, and direct access to Brad that drives results for clients across the Lowcountry. Distance doesn't limit the quality of your coaching. Wherever you train in Goose Creek, your program adapts to you.",
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Train From Anywhere',
        desc: "Your custom BBB program lives on your phone — train at any gym in Goose Creek, at home, or wherever works for your schedule.",
      },
      {
        iconName: 'MessageCircle',
        title: 'Unlimited Direct Access',
        desc: "Unlimited messaging with Brad means you're never stuck without support. Questions, form checks, and adjustments — always answered.",
      },
      {
        iconName: 'TrendingUp',
        title: 'Real Results, Remotely',
        desc: "Many of BBB's biggest client transformations happened entirely through online coaching. Distance doesn't limit what's possible.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training in Goose Creek?',
        a: "Goose Creek is currently served through online coaching only. If you're interested in exploring in-person options, reach out — Brad will discuss what may be possible.",
      },
      {
        q: 'How does online coaching work for Goose Creek residents?',
        a: "Brad builds a fully custom program based on your goals, schedule, and equipment. It's delivered to your phone, updated weekly, and backed by unlimited support and check-ins.",
      },
      {
        q: 'Can I use any gym in Goose Creek with my online program?',
        a: 'Yes. Brad designs programs around the equipment available to you — whether that\'s a full commercial gym, a home gym, or basic equipment. Your plan works wherever you train.',
      },
      {
        q: 'Is online coaching as effective as training in person?',
        a: 'For most clients, yes. The key drivers of results — custom programming, consistency, accountability, and regular adjustments — are all fully available through online coaching.',
      },
      {
        q: 'How do I get started with online coaching in Goose Creek?',
        a: "Reach out through the contact page or DM Brad on Instagram @bradnboujee_. He'll schedule a quick call, learn your goals, and get your program started within days.",
      },
    ],
    seo: {
      title: 'Online Personal Trainer Goose Creek SC | Body By Brad',
      description:
        'Body By Brad offers elite online personal training and coaching for Goose Creek, SC residents. Custom programs, weekly check-ins, and unlimited support — delivered to your phone.',
      keywords: [
        'personal trainer Goose Creek SC',
        'online personal trainer Goose Creek',
        'fitness trainer Goose Creek SC',
        'body by brad Goose Creek',
        'online coaching Goose Creek SC',
        'remote personal training Goose Creek',
        'personal trainer Berkeley County SC',
      ],
    },
  },
  {
    slug: 'hanahan',
    name: 'Hanahan',
    sub: 'Berkeley County',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and full online programs available to Hanahan residents.',
    tagline: 'Personal Training in Hanahan, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Hanahan is a close and convenient in-person service zone for Brad — sitting just 12 miles from downtown Charleston in Berkeley County. Hanahan residents have full access to in-person sessions and every BBB online program. Whether you prefer training at a local gym or working from home, Brad adapts to your environment and your schedule.",
    benefits: [
      {
        iconName: 'Dumbbell',
        title: 'In-Person Training',
        desc: "Brad makes regular in-person trips to Hanahan — at your gym, at your home, or in an outdoor setting that works for you.",
      },
      {
        iconName: 'Target',
        title: 'Personalized Goals',
        desc: "Every Hanahan client gets a 100% custom program. No generic templates — just a plan built around your specific goals and schedule.",
      },
      {
        iconName: 'Smartphone',
        title: 'Online Coaching Too',
        desc: 'The full BBB online coaching program is available to Hanahan clients who prefer remote training with maximum scheduling flexibility.',
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training in Hanahan?',
        a: "Yes. Hanahan is within Brad's regular in-person service zone. He trains clients at local gyms, at home, and at outdoor locations throughout the area.",
      },
      {
        q: 'Which areas of Hanahan do you serve?',
        a: "Brad serves all of Hanahan, Berkeley County. If you're near Yeamans Hall or any of the surrounding neighborhoods, you're within the service area.",
      },
      {
        q: 'Can I train at home in Hanahan?',
        a: "Yes. At-home training is a popular option for Hanahan clients. Brad assesses your space, designs a program around your available equipment, and shows up ready to train.",
      },
      {
        q: 'Is online coaching available for Hanahan residents?',
        a: "Absolutely. Online coaching gives Hanahan clients full access to custom programming, weekly check-ins, and unlimited messaging — delivered entirely through their phone.",
      },
      {
        q: 'How do I book a personal trainer in Hanahan?',
        a: "Contact Brad through the website or send a DM on Instagram @bradnboujee_. He'll respond quickly to schedule an intro call and get your program started.",
      },
    ],
    seo: {
      title: 'Personal Trainer Hanahan SC | Body By Brad',
      description:
        'Body By Brad provides personal training and online coaching in Hanahan, SC. In-person sessions and custom remote programs for Berkeley County residents.',
      keywords: [
        'personal trainer Hanahan SC',
        'fitness trainer Hanahan SC',
        'body by brad Hanahan',
        'in-person training Hanahan SC',
        'online coaching Hanahan SC',
        'at-home trainer Hanahan',
        'personal trainer Berkeley County SC',
      ],
    },
  },
  {
    slug: 'isle-of-palms',
    name: 'Isle of Palms',
    sub: 'Barrier Islands',
    distance: '18 mi',
    inPerson: false,
    desc: 'Online coaching and complete remote training programs available to IOP residents.',
    tagline: 'Online Personal Training for Isle of Palms, SC',
    heroImage: HERO_ONLINE,
    overview:
      "Isle of Palms residents get full access to the BBB online coaching experience — custom programming, weekly check-ins, and direct access to Brad, delivered entirely through their phone. Whether you have a home gym on the island or prefer working out at a mainland facility, Brad builds a plan around your life and keeps you accountable every week.",
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Train On Your Terms',
        desc: 'IOP residents enjoy the full BBB online program — your custom plan, on your schedule, at any gym or home setup available to you.',
      },
      {
        iconName: 'Heart',
        title: 'Full Accountability',
        desc: 'Weekly check-ins and unlimited messaging ensure you never fall off track — Brad monitors every aspect of your progress.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Proven Remote Results',
        desc: "The BBB online program delivers the same transformations as in-person training. Distance is not a barrier when the programming is right.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training on Isle of Palms?',
        a: "Isle of Palms is currently served through online coaching. If you're interested in discussing in-person options, reach out and Brad will do his best to accommodate.",
      },
      {
        q: 'How does the online program work for IOP residents?',
        a: "Brad builds a 100% custom program delivered to your phone. You train on your schedule, check in each week with progress updates, and Brad adjusts your plan accordingly.",
      },
      {
        q: 'What if I only have access to a small home gym on IOP?',
        a: "No problem. Brad designs programs around whatever equipment you have — from a full commercial gym to a set of dumbbells and a pull-up bar at home.",
      },
      {
        q: 'Can I use a gym on the mainland with my IOP online program?',
        a: 'Yes. Many IOP clients train at mainland gyms or a combination of home and gym. Brad builds your program to fit however you prefer to train.',
      },
      {
        q: 'How do I sign up for online coaching as an IOP resident?',
        a: "Reach out through the contact page or DM Brad on Instagram @bradnboujee_. He'll get an intro call scheduled and have your program ready within days.",
      },
    ],
    seo: {
      title: 'Online Personal Trainer Isle of Palms SC | Body By Brad',
      description:
        'Body By Brad offers elite online personal training and coaching for Isle of Palms residents. Custom programs, weekly check-ins, and real results — delivered to your phone.',
      keywords: [
        'personal trainer Isle of Palms SC',
        'online personal trainer IOP SC',
        'fitness trainer Isle of Palms',
        'body by brad Isle of Palms',
        'online coaching Isle of Palms SC',
        'remote personal training IOP',
        'personal trainer barrier islands SC',
      ],
    },
  },
  {
    slug: 'sullivans-island',
    name: "Sullivan's Island",
    sub: 'Barrier Islands',
    distance: '15 mi',
    inPerson: false,
    desc: 'Full online coaching and remote program delivery available.',
    tagline: "Online Coaching for Sullivan's Island, SC",
    heroImage: HERO_ONLINE,
    overview:
      "Sullivan's Island residents get full access to the BBB online coaching program — elite custom programming, weekly accountability check-ins, and direct access to Brad, delivered straight to your phone. No commute required, no compromise on quality. Brad builds your program around your island lifestyle, available equipment, and personal goals.",
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Elite Coaching, Delivered',
        desc: "Sullivan's Island clients get the full BBB experience remotely — custom programming that matches your lifestyle and available training space.",
      },
      {
        iconName: 'MessageCircle',
        title: 'Always Connected',
        desc: "Unlimited messaging means Brad is reachable whenever you have questions, need form guidance, or want to discuss your progress.",
      },
      {
        iconName: 'Zap',
        title: 'Efficient Programming',
        desc: "Brad builds programs designed for real results with real schedules. No wasted sessions, no filler — just intentional training that works.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: "Do you offer in-person training on Sullivan's Island?",
        a: "Sullivan's Island is currently served through online coaching. If you're interested in exploring in-person options, contact Brad to discuss what might be possible.",
      },
      {
        q: "How does online coaching work for Sullivan's Island residents?",
        a: "Brad builds a fully custom program, delivers it to your phone, and keeps you accountable through weekly check-ins and unlimited messaging. You train when and where it suits you.",
      },
      {
        q: "What equipment do I need on Sullivan's Island?",
        a: "Brad designs your program around whatever equipment you have available — whether that's a full home gym, access to a mainland gym, or minimal equipment at home.",
      },
      {
        q: 'Is online coaching as effective as training in person?',
        a: "For most clients, yes. The BBB online program delivers the same custom programming, accountability, and progression that drives results in-person — just remotely.",
      },
      {
        q: "How do I get started with a personal trainer on Sullivan's Island?",
        a: "Reach out through the contact page or DM Brad on Instagram @bradnboujee_. He'll schedule a quick call, learn your goals, and get your program started within days.",
      },
    ],
    seo: {
      title: "Online Personal Trainer Sullivan's Island SC | Body By Brad",
      description:
        "Body By Brad offers elite online personal training for Sullivan's Island, SC. Custom coaching programs, weekly check-ins, and real results delivered to your phone.",
      keywords: [
        "personal trainer Sullivan's Island SC",
        "online personal trainer Sullivan's Island",
        "fitness trainer Sullivan's Island SC",
        "body by brad Sullivan's Island",
        "online coaching Sullivan's Island SC",
        'remote personal training barrier islands SC',
        'personal trainer barrier islands SC',
      ],
    },
  },
  {
    slug: 'folly-beach',
    name: 'Folly Beach',
    sub: 'Greater Charleston',
    distance: '12 mi',
    inPerson: true,
    desc: 'In-person training and online coaching available to Folly Beach residents.',
    tagline: 'Personal Training at Folly Beach, SC',
    heroImage: HERO_IN_PERSON,
    overview:
      "Folly Beach is more than just a surf town — it's one of Brad's in-person training zones and the host of legendary BBB Cooldown outdoor events. Folly Beach residents have full access to in-person sessions and the complete online coaching program. Brad brings elite training to the island, right where you live.",
    benefits: [
      {
        iconName: 'MapPin',
        title: 'In-Person on the Island',
        desc: 'Brad travels to Folly Beach for in-person training sessions — at your gym, home, or even outdoors for beach workouts.',
      },
      {
        iconName: 'Users',
        title: 'BBB Cooldown Events',
        desc: "Folly Beach is one of the primary hosts for the legendary BBB Cooldown outdoor community events — a major perk for island residents.",
      },
      {
        iconName: 'Smartphone',
        title: 'Online Coaching Available',
        desc: "Full online coaching is available to all Folly Beach residents who prefer training on their own schedule with Brad's custom programming.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training on Folly Beach?',
        a: "Yes. Folly Beach is within Brad's in-person service area. He trains clients on the island at gyms, at home, and outdoors.",
      },
      {
        q: 'Are the BBB Cooldown events held at Folly Beach?',
        a: "Yes. Folly Beach is one of the primary locations for BBB Cooldown outdoor community events. Follow @bradnboujee_ on Instagram for the latest event dates.",
      },
      {
        q: 'Can we do outdoor training sessions on Folly Beach?',
        a: "Absolutely. Outdoor sessions are a big part of Brad's training style and Folly Beach is a great environment for them. Ask about outdoor session options when you reach out.",
      },
      {
        q: "Is online coaching available if I'm a Folly Beach resident?",
        a: "Yes. The full BBB online coaching program is available to Folly Beach residents. Great option for clients with flexible or seasonal schedules.",
      },
      {
        q: 'How do I book a personal trainer on Folly Beach?',
        a: "Message Brad through the contact page or on Instagram @bradnboujee_. He'll get back to you quickly to schedule an intro call and start building your program.",
      },
    ],
    seo: {
      title: 'Personal Trainer Folly Beach SC | Body By Brad',
      description:
        'Body By Brad offers personal training and online coaching at Folly Beach, SC. In-person sessions, outdoor training, and BBB Cooldown events for Folly Beach residents.',
      keywords: [
        'personal trainer Folly Beach SC',
        'fitness trainer Folly Beach Charleston',
        'body by brad Folly Beach',
        'in-person training Folly Beach SC',
        'outdoor personal training Folly Beach',
        'online coaching Folly Beach SC',
        'personal trainer James Island Folly Beach',
      ],
    },
  },
  {
    slug: 'ladson',
    name: 'Ladson',
    sub: 'Berkeley & Dorchester',
    distance: '20 mi',
    inPerson: false,
    desc: 'Full online coaching and remote training programs available.',
    tagline: 'Online Personal Training for Ladson, SC',
    heroImage: HERO_ONLINE,
    overview:
      "Ladson residents have full access to Brad's online coaching program — custom programming, weekly check-ins, and unlimited support delivered entirely through their phone. Whether you train at a local gym, at home, or across both, Brad builds a plan around your life and keeps your results moving forward every week.",
    benefits: [
      {
        iconName: 'Smartphone',
        title: 'Full Online Program',
        desc: 'The complete BBB coaching experience is available to Ladson clients — custom programming, accountability, and results, delivered remotely.',
      },
      {
        iconName: 'Clock',
        title: 'Train On Your Schedule',
        desc: 'Online coaching gives Ladson clients maximum flexibility — train when you want, where you want, with a program built specifically for you.',
      },
      {
        iconName: 'TrendingUp',
        title: 'Proven Results',
        desc: "Distance hasn't held back BBB's online clients. The same system that drives results in-person works just as powerfully through remote coaching.",
      },
    ],
    included: INCLUDED_COMMON,
    process: PROCESS_COMMON,
    faq: [
      {
        q: 'Do you offer in-person training in Ladson?',
        a: "Ladson is currently served through online coaching only. If you'd like to discuss in-person options, reach out to Brad and he'll see what can be arranged.",
      },
      {
        q: 'How does online coaching work for Ladson residents?',
        a: "Brad builds a custom program tailored to your goals, equipment, and schedule. It's delivered to your phone, updated weekly, and backed by unlimited support.",
      },
      {
        q: 'Which gyms in Ladson can I use with an online program?',
        a: 'Any gym you have access to. Brad designs your program around the specific equipment available at your gym or home — no facility restrictions.',
      },
      {
        q: 'Is online coaching affordable for Ladson residents?',
        a: 'Online coaching starts at competitive rates with no travel add-ons. Check the Packages page for current pricing or message Brad directly for options.',
      },
      {
        q: 'How quickly can I start my online program in Ladson?',
        a: "Brad typically has your program ready within a few days of your intake call. Reach out through the contact page or on Instagram to get started quickly.",
      },
    ],
    seo: {
      title: 'Online Personal Trainer Ladson SC | Body By Brad',
      description:
        'Body By Brad offers elite online personal training and coaching for Ladson, SC. Custom programs for Berkeley and Dorchester County residents — train anywhere, anytime.',
      keywords: [
        'personal trainer Ladson SC',
        'online personal trainer Ladson SC',
        'fitness trainer Ladson SC',
        'body by brad Ladson',
        'online coaching Ladson SC',
        'remote personal training Ladson',
        'personal trainer Dorchester County SC',
      ],
    },
  },
];

export function getAreaBySlug(slug: string): AreaData | undefined {
  return AREAS_DATA.find((a) => a.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return AREAS_DATA.map((a) => a.slug);
}
