export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  author: { name: string; title: string };
  body: BlogBlock[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cooper-river-bridge-run-training-guide',
    title: "How to Train for the Cooper River Bridge Run: A Charleston Coach's Guide",
    category: 'TRAINING',
    excerpt:
      "Charleston's biggest running event crosses the Arthur Ravenel Jr. Bridge every spring. Here's the training approach Coach Brad uses to get clients race-ready.",
    datePublished: '2026-01-14',
    dateModified: '2026-01-14',
    readTime: '7 min read',
    heroImage:
      'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1600/v1780318161/anyone_else_feeling_the_post_bridge_run_blues_3_wii1rg.jpg',
    heroImageAlt: 'Runners crossing the Arthur Ravenel Jr. Bridge during the Cooper River Bridge Run in Charleston SC',
    author: { name: 'Coach Brad', title: 'ISSA Certified Personal Trainer' },
    body: [
      {
        type: 'p',
        text:
          "Every spring, tens of thousands of runners line up in Mount Pleasant and finish on Meeting Street in downtown Charleston. The Cooper River Bridge Run is a 10K that climbs and descends the Arthur Ravenel Jr. Bridge, and it's routinely counted among the largest timed 10Ks in the country — which makes it, by a wide margin, Charleston's biggest running event. If you've signed up, or you're thinking about it, here's how I coach clients through it.",
      },
      {
        type: 'h2',
        text: 'Why the Bridge Changes Everything',
      },
      {
        type: 'p',
        text:
          "Most 10Ks are flat. This one isn't. The Ravenel Bridge climb sits in the first half of the course, which means you hit real elevation gain before your legs have settled into a rhythm — and then you have to control your pace on the way down without letting gravity wreck your knees. Training on flat ground alone will leave you underprepared for both. If you have access to any kind of incline — a bridge, a parking garage ramp, even a treadmill set to 4–6% — that's where race-specific fitness actually gets built.",
      },
      {
        type: 'h2',
        text: 'An 8-Week Framework',
      },
      {
        type: 'list',
        items: [
          'Weeks 1–2 (Base): 3 easy runs per week at a conversational pace, building total weekly mileage gradually. Add one weighted incline walk or stair session.',
          'Weeks 3–5 (Build): Introduce one interval session per week (e.g. 6–8 x 400m at a hard-but-controlled effort) and one hill-repeat session. Keep the third run easy.',
          'Weeks 6–7 (Peak): Longest training run of the block, plus a race-pace tempo run that includes at least one simulated incline. This is where bridge-specific pacing gets rehearsed.',
          "Week 8 (Taper): Cut volume by roughly 40–50%, keep intensity short and sharp, prioritize sleep and hydration. Your legs should feel restless by race day — that's the point.",
        ],
      },
      {
        type: 'h2',
        text: "Don't Skip the Strength Work",
      },
      {
        type: 'p',
        text:
          "The two muscle groups that take the most abuse on the bridge are your calves (the climb) and your quads (the descent, absorbing impact). Two short strength sessions a week — calf raises, step-ups, split squats, and core work — do more to bridge-proof your legs than extra easy miles ever will. This is exactly the kind of programming we build into BBB's online coaching and in-person sessions leading into race season.",
      },
      {
        type: 'h2',
        text: 'Race Week',
      },
      {
        type: 'list',
        items: [
          'Cut training volume significantly — your fitness is already built, this week is about arriving fresh.',
          "Don't try anything new on race day: same shoes, same breakfast, same warmup you've used in training.",
          'Walk or jog the start corral early — the Bridge Run\'s field is enormous, and getting boxed in at the gun will throw off your pacing plan.',
          'Hold back on the climb. The bridge rewards patience — plenty of runners blow up on the descent because they spent too much on the way up.',
        ],
      },
      {
        type: 'h2',
        text: 'Train With People, Not Just a Plan',
      },
      {
        type: 'p',
        text:
          "Brad founded Let's Run Charleston (also known as the Cooldown Run Club) for exactly this reason — training alone gets hard to stick with, especially once the interval sessions start. It's a weekly, all-paces community run through Charleston, and it's a low-pressure way to log miles alongside people training for the same race. Check the events calendar for the next group run, or if you want a structured plan built around your current fitness and your race date, that's exactly what BBB's online coaching and 1-on-1 training are built for.",
      },
    ],
    seo: {
      title: 'Cooper River Bridge Run Training Guide | Body By Brad Charleston',
      description:
        "Training for Charleston's biggest running event? Coach Brad breaks down an 8-week Cooper River Bridge Run training plan — pacing, strength work, and race-day tips.",
      keywords: [
        'Cooper River Bridge Run training',
        'biggest running event in Charleston',
        'Charleston SC running events',
        'Bridge Run training plan',
        'Charleston 10K training',
        "Let's Run Charleston",
      ],
    },
  },
  {
    slug: 'how-to-choose-a-personal-trainer-in-charleston-sc',
    title: 'How to Choose the Best Personal Trainer in Charleston, SC',
    category: 'COACHING',
    excerpt:
      "Charleston has no shortage of personal trainers. Here's what actually separates a good one from a business card with a certification on it.",
    datePublished: '2026-01-28',
    dateModified: '2026-01-28',
    readTime: '6 min read',
    heroImage:
      'https://res.cloudinary.com/dgrrovta3/image/upload/f_auto,q_auto,w_1600/v1779139531/IMG_3076_zziehi.jpg',
    heroImageAlt: 'Personal trainer coaching a client through a strength session in Charleston SC',
    author: { name: 'Coach Brad', title: 'ISSA Certified Personal Trainer' },
    body: [
      {
        type: 'p',
        text:
          "Search \"personal trainer Charleston SC\" and you'll get pages of results — big-box gym trainers, independent coaches, online-only programs. Price and proximity are easy to compare. What actually predicts whether you get results is harder to see from a website. Here's what I'd tell a friend to check before signing up with anyone, including me.",
      },
      {
        type: 'h2',
        text: 'Check the Certification — Then Look Past It',
      },
      {
        type: 'p',
        text:
          "A real certification (ISSA, NASM, ACE, or similar) is table stakes, not a differentiator — it tells you someone passed an exam, not that they're good at coaching. Ask what they've done since getting certified: continuing education, a specialization (weight loss, strength, sport-specific), years actually training clients. A trainer who's been coaching in Charleston for years has seen more real bodies, real injuries, and real plateaus than a certification alone can teach.",
      },
      {
        type: 'h2',
        text: 'Match the Format to Your Actual Life',
      },
      {
        type: 'list',
        items: [
          'In-person training: best if you want hands-on form correction and a fixed schedule keeps you accountable.',
          'At-home training: right if you have some equipment (or none) and want zero commute time.',
          'Online coaching: the best fit if you travel often, work irregular hours, or already know how to train but need programming and accountability.',
        ],
      },
      {
        type: 'p',
        text:
          "The \"best\" trainer for someone else might be the wrong fit for you if the format doesn't match your actual week. Ask any trainer you're considering to walk you through what a typical week looks like in their program before you commit.",
      },
      {
        type: 'h2',
        text: 'Ask How They Handle Weeks 3 Through 12',
      },
      {
        type: 'p',
        text:
          "Anyone can write a good first workout. What separates a strong coach is what happens when motivation dips or progress stalls — usually somewhere between week 3 and week 12. Ask directly: how often do we check in? What happens if I miss a week? How does my program change as I get stronger? Vague answers here are a bigger red flag than any credential gap.",
      },
      {
        type: 'h2',
        text: 'Take the Free Call Before You Judge the Instagram',
      },
      {
        type: 'p',
        text:
          "Social media is a highlight reel, not a coaching sample. Almost every legitimate trainer in Charleston — BBB included — offers a free intro call. Use it. Ask about their approach to your specific goal, how they'd structure your first month, and what they need from you. A trainer who listens more than they pitch on that call is usually the one worth training with.",
      },
      {
        type: 'p',
        text:
          "If you want to see how this looks in practice, book a free 15-minute discovery call with Brad — ISSA certified, Charleston-based, and running programs for 1-on-1 training, at-home coaching, and fully remote online coaching depending on what actually fits your week.",
      },
    ],
    seo: {
      title: 'How to Choose a Personal Trainer in Charleston, SC | Body By Brad',
      description:
        "Searching for the best personal trainer in Charleston, SC? Here's what to actually look for — certifications, coaching style, accountability — from ISSA-certified coach Brad.",
      keywords: [
        'top fitness trainer in Charleston South Carolina',
        'best personal trainer Charleston SC',
        'personal trainer near me Charleston',
        'how to choose a personal trainer',
        'ISSA certified trainer Charleston',
      ],
    },
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
