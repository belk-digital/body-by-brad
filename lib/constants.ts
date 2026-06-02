import type { PosState, TestimonialItem } from './types';

export const logoUrl =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_200/v1779060049/Gemini_Generated_Image_xb9w0txb9w0txb9ww-removebg-preview_u9i0kp.png';

export const heroBackgroundUrl =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1920/v1779681529/Gemini_Generated_Image_yj1702yj1702yj179_mcmh8e.png';

export const heroModelUrl =
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1200/v1779680306/Untitled_-_May_25_2026_at_09.06.33_qw0wai.png';

export const stairSteps = Array.from({ length: 9 });

export const latestEventImages = [
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780318163/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_l4z9fv.jpg',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780318162/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_1_n6ofkx.jpg',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780318161/anyone_else_feeling_the_post_bridge_run_blues_1_ckfhx4.jpg',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780311283/Photo_Apr_28_2026_7_45_53_PM_slhtpk.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780311282/Photo_Apr_28_2026_6_50_48_PM_dpg8o8.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1780311653/608315322_17953619883051106_8749987046411868448_n_gfvmne.jpg',
];

export const bradImagePool = [
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_2_zimcoc.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378588/New_Project_7_z0buwe.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_4_jikyyg.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378588/New_Project_3_yd6ba6.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_1_svqowp.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_6_kckuio.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_ecmghv.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1779378587/New_Project_5_v1vfcy.webp',
  'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_800/v1778894870/Untitled_flr1cs.png',
];

export const mainMenuItems = [
  'About',
  'Services',
  'Packages',
  'Events',
  'Results',
  'Blog',
  'Merchandise',
  'Contact',
];

export const socialMenuItems = ['Instagram', 'YouTube', 'X', 'Facebook'];

export const policyMenuItems = [
  'Privacy Policy',
  'Terms of Use',
];

export const STAGGER = 0.035;

export const merchItems = [
  {
    name: 'Shadow Drip',
    description:
      'A sleek, minimalist hoodie with dark tones and subtle reflective accents for an effortless street vibe.',
    price: 89,
    originalPrice: 129,
    image:
      'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
  },
  {
    name: 'Urban Phantom',
    description:
      'Urban Phantom – A bold, oversized hoodie with edgy graphics and a stealthy aesthetic inspired by city nights.',
    price: 89,
    originalPrice: 129,
    image:
      'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
  },
  {
    name: 'Neon Rebellion',
    description:
      'A statement piece with vibrant neon details and rebellious street art influences for a standout look.',
    price: 89,
    originalPrice: 129,
    image:
      'https://res.cloudinary.com/dgrrovta3/image/upload/v1779364141/IMG_2932_1_xphbar.webp',
  },
];

export const serviceSlides = [
  {
    image: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1200/v1780311283/Photo_Apr_28_2026_7_45_53_PM_slhtpk.webp',
    heading:
      'High-energy group bootcamps that build community, burn calories, and push limits.',
    cta: 'View Upcoming Events',
    tagline: 'Move together',
    href: '/events',
  },
  {
    image: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1200/v1780318163/singles_couples_run_sponsored_by_good_views_tequila___Big_thank_you_to_saltymikesdeckbar_l4z9fv.jpg',
    heading:
      "Charleston's legendary Cooldown events — fitness, fun, and good vibes all in one.",
    cta: 'See Event Schedule',
    tagline: 'Train anywhere',
    href: '/events#register',
  },
  {
    image: 'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1200/v1780311282/Photo_Apr_28_2026_6_50_48_PM_dpg8o8.webp',
    heading:
      'Outdoor pop-up sessions and community challenges open to all fitness levels.',
    cta: 'Join the Community',
    tagline: 'Built for results',
    href: '/register',
  },
];

export const faqData = [
  {
    q: 'What types of training do you offer?',
    a: 'I offer one-on-one personal training, high-energy group fitness classes, and fully structured online coaching programs. Whether you want to train in person in Charleston or from anywhere in the world, there\'s a plan built for you.',
  },
  {
    q: 'How do I get started?',
    a: "Getting started is simple — reach out through the contact form or DM me on Instagram. We'll schedule a quick call to talk about your goals, current fitness level, and which program is the best fit for you.",
  },
  {
    q: 'Do I need any equipment for online coaching?',
    a: "Not necessarily. Programs are tailored to what you have available — whether that's a full gym, a set of dumbbells, or just your bodyweight. I'll build around your setup.",
  },
  {
    q: 'How quickly will I see results?',
    a: "Most clients notice real changes within 4–8 weeks when they're consistent with training and nutrition. Results vary depending on your starting point, goals, and commitment — but I'll be checking in every step of the way to make sure you're on track.",
  },
  {
    q: 'What are the Cooldown events?',
    a: 'Cooldown events are community fitness experiences I host in Charleston — think group workouts, great music, and good people. They\'re open to all fitness levels and a great way to experience the BBB community before committing to a program.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'For in-person sessions, I ask for at least 24 hours notice for cancellations. Online coaching is billed monthly and can be paused or cancelled before the next billing cycle with no hidden fees.',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    quote:
      'BRAD! You are a literal magician. I am wearing HIGH SCHOOL JEANS today 👀 which were my absolute fav and I couldn\'t wear them last year and now they fit perfectly. 🌟',
    sender: 'Rachel',
    reactions: ['🤍', '🏋️'],
    tapback: '❤️',
  },
  {
    id: 2,
    quote: 'These workouts are kicking my ass!',
    sender: 'Mike',
    reactions: ['🔥', '💪'],
    tapback: '🔥',
  },
  {
    id: 3,
    quote:
      'Thanks to your accountability and coaching I went in to get a new suit for my 1 year anniversary. In May I was a 37.5 inch true waist with a 40 inch chest … today, I was a 33 inch true waist with a 44 inch chest!',
    sender: 'James',
    reactions: ['🙌', '👏'],
    tapback: '🏆',
  },
  {
    id: 4,
    quote:
      'FYI today I put on my belt for the first time in 3 months. Not only did I move up 3 notches but now I am using a fresh 4th one!',
    sender: 'Derek',
    reactions: ['💪', '🎉'],
    tapback: '💪',
  },
  {
    id: 5,
    quote:
      'Love you. This program has changed my mental health and confidence so much already!',
    sender: 'Sarah',
    reactions: ['❤️', '🙏'],
    tapback: '❤️',
  },
];

export const CARD_POSITIONS = [
  { top: '8vh', left: '5%' },
  { top: '4vh', right: '5%' },
  { top: '34vh', left: '41%' },
  { top: '56vh', right: '5%' },
  { top: '52vh', left: '5%' },
] as const;

export const POS: Record<string, PosState> = {
  MAIN: { left: 28, top: 3, width: 46, height: 90, radius: 14, opacity: 1 },
  PREV: { left: 17, top: 3, width: 21, height: 19, radius: 10, opacity: 1 },
  NEXT: { left: 76, top: 79, width: 9, height: 19, radius: 10, opacity: 1 },
  GONE_BEFORE: { left: 78, top: 83, width: 9, height: 19, radius: 10, opacity: 0 },
  BELOW: { left: 28, top: 100, width: 46, height: 90, radius: 14, opacity: 1 },
};
