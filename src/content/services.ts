// Copy for every /case-studies/[slug] page. One template renders all of them.
// shortcut: turnaround, revision and pricing wording is generic; confirm with the studio.

export type ServiceSlug =
  | "web-design"
  | "video-editing"
  | "design"
  | "branding"
  | "animation"
  | "illustration";

export type Service = {
  slug: ServiceSlug;
  name: string; // "Video Editing": used in titles and breadcrumbs
  h1: string;
  description: string; // meta description, 140-160 chars
  image: string;
  imageAlt: string;
  intro: string[];
  included: { title: string; text: string }[];
  process: [string, string, string, string, string]; // Brief, Plan, Make, Review, Launch
  tools: string[];
  audience: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
  gallery?: { src: string; alt: string; width: number; height: number }[];
  projects?: {
    name: string;
    href: string;
    summary: string;
    shots: { src: string; alt: string; caption: string }[];
  }[];
  videos?: { id: string; title: string }[]; // YouTube embeds
};

export const services: Record<ServiceSlug, Service> = {
  "web-design": {
    slug: "web-design",
    name: "Website Development",
    h1: "Website Development in Bangladesh",
    description:
      "Website development and web design in Dhaka, Bangladesh. Fast responsive sites, APIs and cloud deploys for clients worldwide. Book a free call with us.",
    image: "/work/tile-web.jpg",
    imageAlt:
      "CareWell health platform shown in two browser windows: the landing page and the doctor availability screen",
    intro: [
      "We design and build websites and web apps. That means the layout, the code behind it, the content setup and the hosting, handled by one team.",
      "It suits businesses that need a site that loads fast, looks right on a phone and is easy to update. If you are searching for a web design agency in Bangladesh that also writes the code, that is what we do.",
      "Gryffindorlab is a creative studio based in Dhaka, Bangladesh. We work with clients in Bangladesh and around the world, mostly over video calls and shared project boards.",
      "Every project starts with the goal, not the technology. A restaurant needs menus and bookings. A software company needs a clear product page and a fast sign-up. We pick the simplest build that does the job, and we say so when a smaller option is enough.",
      "After launch we stay available. Sites need updates, new pages and the occasional fix, and we can support you with a simple monthly arrangement or one-off changes. Many clients searching for web design in Dhaka come to us for exactly that kind of long-term help.",
      "We keep code tidy and documented. If your own developers take over later, they can read what we wrote and carry on without starting again.",
    ],
    included: [
      {
        title: "Responsive design",
        text: "Layouts planned for phones first, then tablets and desktops.",
      },
      {
        title: "Front-end build",
        text: "Clean, accessible pages that load quickly on slow connections.",
      },
      {
        title: "APIs and databases",
        text: "Back-end routes, data models and integrations with the tools you already use.",
      },
      {
        title: "LLM integrations",
        text: "Chat, search or summary features powered by language models, where they actually help.",
      },
      {
        title: "CMS setup",
        text: "An editor your team can use to change text, images and pages without a developer.",
      },
      {
        title: "CI/CD and cloud deploys",
        text: "Automatic builds and releases, so updates go live safely.",
      },
      {
        title: "Performance and SEO setup",
        text: "Fast pages, proper metadata, sitemaps and structured data from day one.",
      },
    ],
    process: [
      "We learn what the site must do, who uses it and which pages you need.",
      "We agree on pages, features, timeline and price in writing, then sketch the structure.",
      "We design the key screens, then build. You can open a live preview as it grows.",
      "You test the preview on your own devices and send feedback. We fix and refine.",
      "We deploy to your domain, check speed and SEO, and hand over access and notes.",
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Figma",
      "Vercel and cloud hosting",
      "GitHub Actions",
    ],
    audience: [
      {
        title: "Startups",
        text: "A launch site or product app that can grow with the company.",
      },
      {
        title: "Local businesses",
        text: "A clear site with services, contact details and a map, found on Google.",
      },
      {
        title: "E-commerce sellers",
        text: "A fast store front with product pages and simple checkout.",
      },
      {
        title: "Agencies and teams",
        text: "An extra build partner for client projects.",
      },
    ],
    faqs: [
      {
        q: "How much does a website cost?",
        a: "It depends on pages, features and integrations. We give a fixed quote after the first call, before any work starts.",
      },
      {
        q: "How long does a website take?",
        a: "A small site usually takes a few weeks. Larger apps take longer. We confirm the timeline in writing during planning.",
      },
      {
        q: "How many revisions do I get?",
        a: "Feedback rounds are included at each review stage. We agree the number in the plan so there are no surprises.",
      },
      {
        q: "Will I own the code and the site?",
        a: "Yes. At launch you receive the source code, hosting access and short notes on how to update the site.",
      },
      {
        q: "Do you work with international clients?",
        a: "Yes. We are in Dhaka and work with clients worldwide, using video calls and shared boards across time zones.",
      },
    ],
    related: ["design", "branding", "video-editing"],
    projects: [
      {
        name: "CareWell",
        href: "https://carewell.ismailh.dev",
        summary:
          "A healthcare platform where patients find doctors and book visits, and doctors manage their hours, queue and prescriptions. Lab tests and medicines are priced in the clinic's own list, and the assistant can answer what a test or medicine costs. The API runs on our own VPS with Docker and automatic HTTPS, and the web app is on Vercel.",
        shots: [
          {
            src: "/work/carewell-patient-side.webp",
            alt: "CareWell patient screens: the landing page and the doctor search with specialties and open times",
            caption:
              "For patients: a clear landing page, then search by name, specialty or location and book an open time.",
          },
          {
            src: "/work/carewell-doctor-side.webp",
            alt: "CareWell doctor screens: weekly hours and public profile, and today's patient queue",
            caption:
              "For doctors: set weekly hours in the clinic time zone, then work through today's queue in serial order.",
          },
          {
            src: "/work/carewell-prescriptions.webp",
            alt: "CareWell prescription writing screen next to an issued prescription ready to print",
            caption:
              "Prescriptions: write complaints, findings, diagnosis, tests and medicines in one screen, then print or save a clean PDF.",
          },
          {
            src: "/work/carewell-ai-assistant.webp",
            alt: "CareWell AI assistant chat where a patient types fever for 3 days and gets a suggested specialty",
            caption:
              "AI assistant: patients describe what they need in plain words, and it suggests a specialty and helps them book or ask for a new time. It handles bookings and prices only, not medical advice.",
          },
          {
            src: "/work/carewell-architecture.webp",
            alt: "CareWell production architecture: browser to Vercel, then Caddy, the API, Postgres and Redis on one Oracle VM in Docker",
            caption:
              "Architecture: the web app runs on Vercel and talks to a Dockerised API, Postgres and Redis behind Caddy with automatic HTTPS, all on one 1 GB Oracle VM.",
          },
          {
            src: "/work/carewell-ops.webp",
            alt: "Terminal on the CareWell server showing healthy Docker containers, a 200 health check, memory use and passing tests",
            caption:
              "In production: healthy containers, a 190 ms health check, memory use on the small VM and passing tests. The API shuts down gracefully, so deploys never cut a request in half.",
          },
        ],
      },
      {
        name: "Innovation Cauldron Foundation",
        href: "https://www.innovationcauldron.org",
        summary:
          "A website for a national non-profit research and innovation foundation in Bangladesh. We handled the design, the build and the SEO setup.",
        shots: [
          {
            src: "/work/icf-home-about.webp",
            alt: "Innovation Cauldron Foundation homepage and about page",
            caption:
              "Homepage and about: the foundation's purpose, two clear actions, and its status and focus at a glance.",
          },
          {
            src: "/work/icf-events-membership.webp",
            alt: "Innovation Cauldron Foundation events page and membership page",
            caption:
              "Events and membership: date, venue and registration for the flagship event, and four ways to join.",
          },
        ],
      },
    ],
  },

  "video-editing": {
    slug: "video-editing",
    name: "Video Editing",
    h1: "Video Editing Services in Bangladesh",
    description:
      "Video editing services in Bangladesh for brands, YouTubers and businesses. Clean cuts, colour, sound and captions from Dhaka. Book a free call with us.",
    image: "/work/tile-video.jpg",
    imageAlt:
      "Thumbnail of the Luxembourg video edited by Gryffindorlab, a green valley with village houses",
    intro: [
      "We turn raw footage into videos that are clear, well paced and ready to publish. You send the clips. We deliver the finished edit.",
      "Our video editing services in Bangladesh suit brands, creators and teams that shoot good footage but have no time to cut it. We edit ads, social clips, interviews, product videos and long-form content.",
      "Gryffindorlab is a creative studio in Dhaka, Bangladesh. We work with clients worldwide and share drafts online so you can review from anywhere.",
      "Good editing is mostly decisions: what to keep, what to cut and when to let a moment breathe. We watch all of your footage first, then build a version that gets to the point and still sounds like you.",
      "We can match an existing style, such as your channel's pacing, fonts and colours, or help you set one. For regular work, a repeatable template saves time and keeps every upload looking consistent.",
      "Large files are fine. We use cloud folders and compressed review links, so you can watch drafts on a phone without downloading gigabytes.",
      "Turnaround matters when you publish on a schedule. For ongoing work we set a fixed weekly rhythm: you upload footage on one day and receive drafts on an agreed day, so your calendar stays predictable and nothing waits in a queue without you knowing.",
    ],
    included: [
      {
        title: "Cutting and pacing",
        text: "Tight edits that keep viewers watching and remove dead air.",
      },
      {
        title: "Colour correction and grading",
        text: "Matched shots and a consistent look across the whole video.",
      },
      {
        title: "Sound clean-up and mixing",
        text: "Clear voices, balanced music and reduced background noise.",
      },
      {
        title: "Captions and subtitles",
        text: "Accurate on-screen text for social feeds and accessibility.",
      },
      {
        title: "Titles and graphics",
        text: "Lower thirds, end cards and simple motion graphics.",
      },
      {
        title: "Multi-format exports",
        text: "Versions for YouTube, Instagram, TikTok and websites, in the right sizes.",
      },
    ],
    process: [
      "You share the goal, the audience and the footage, plus any videos you like.",
      "We agree on length, style, number of videos and delivery date in writing.",
      "We assemble a rough cut, then refine pacing, colour, sound and text.",
      "You watch a draft with timestamped notes. We apply the changes.",
      "We export in the formats you need and send the files with the project folder if you want it.",
    ],
    tools: [
      "Adobe Premiere Pro",
      "DaVinci Resolve",
      "After Effects",
      "Audition",
      "Descript",
      "Frame.io or shared review links",
    ],
    audience: [
      {
        title: "Content creators",
        text: "Regular edits for YouTube, Reels and Shorts, without doing it all yourself.",
      },
      {
        title: "Businesses and brands",
        text: "Product, promo and company videos with a polished finish.",
      },
      {
        title: "Course makers and coaches",
        text: "Clean lessons, webinars and talks with captions.",
      },
      {
        title: "Agencies and production teams",
        text: "Extra edit capacity when the schedule is full.",
      },
    ],
    faqs: [
      {
        q: "How do you price video editing?",
        a: "By length, complexity and number of videos. We quote per project or as a monthly package after seeing your footage.",
      },
      {
        q: "How fast can you deliver?",
        a: "Short social edits can be quick. Longer videos take more time. We agree a delivery date before we start.",
      },
      {
        q: "How many revisions are included?",
        a: "Revision rounds are set in the plan. Notes with timestamps keep each round fast.",
      },
      {
        q: "What files do I receive?",
        a: "Finished videos in the formats you need, such as MP4, plus caption files on request. Project files can be shared if agreed.",
      },
      {
        q: "Can you work with international clients?",
        a: "Yes. We are based in Dhaka and work with clients worldwide. Files move through cloud folders and review links.",
      },
    ],
    related: ["animation", "design", "web-design"],
    videos: [
      {
        id: "6lCQbjz35zw",
        title:
          "মাত্র ৬ লাখ মানুষের দেশ লুক্সেমবার্গ কীভাবে পৃথিবীর অন্যতম ধনী দেশ হলো?",
      },
      {
        id: "wpMV_lWbv2Y",
        title: "তেল-গ্যাস ছাড়াই সিঙ্গাপুর কীভাবে এত ধনী হলো?",
      },
      {
        id: "O2NH5wgz5uw",
        title: "Arms Trade Explained: অস্ত্র ব্যবসার ট্রিলিয়ন ডলারের খেলা",
      },
    ],
  },

  design: {
    slug: "design",
    name: "Graphic Design",
    h1: "Graphic Design Services in Bangladesh",
    description:
      "Graphic design services in Bangladesh: social posts, print layouts, pitch decks and marketing assets from a Dhaka creative studio. Book a free call with us.",
    image: "/work/tile-design.jpg",
    imageAlt: "Orange Bangla display lettering on a light patterned background",
    intro: [
      "We design the everyday things a business needs to look sharp: social posts, brochures, flyers, packaging layouts, reports and pitch decks.",
      "Our graphic design services in Bangladesh are for teams that want consistent, clear work without hiring a full in-house designer. We follow your brand, or help you build one first.",
      "Gryffindorlab is a creative studio in Dhaka, Bangladesh. We work with clients worldwide and keep communication simple and quick.",
      "Design is about making information easy to take in. We pay attention to spacing, type size and contrast so that a poster reads from across a room and a social post reads in a second on a phone.",
      "If you already have a brand guide, we follow it closely. If you don't, we can set simple rules first, such as colours, fonts and logo use, so each new piece feels connected to the last.",
      "Print work needs care. We check bleed, margins and colour mode, and we are happy to talk to your printer directly so that what you approve is what you get.",
      "Speed matters too. Many of our clients need a week of social posts or a deck by Friday. We plan around your deadline, tell you early if something won't fit, and suggest a smaller scope instead of delivering rushed work.",
      "Consistency saves money. When posts, decks and print pieces share one look, each new job is faster, and your audience starts to recognise you without reading the name. That is the real return on good design.",
    ],
    included: [
      {
        title: "Social media graphics",
        text: "Posts, carousels, stories and ad creatives in your brand style.",
      },
      {
        title: "Print layouts",
        text: "Brochures, flyers, posters, menus and packaging, prepared for the printer.",
      },
      {
        title: "Pitch decks and presentations",
        text: "Slides that explain your idea clearly and look professional.",
      },
      {
        title: "Reports and documents",
        text: "Readable layouts for proposals, one-pagers and company profiles.",
      },
      {
        title: "Editable templates",
        text: "Reusable files so your team can make small updates on its own.",
      },
      {
        title: "Print and web export",
        text: "Files at the right size, colour mode and resolution.",
      },
    ],
    process: [
      "You tell us what the piece is for, who sees it and where it will appear.",
      "We confirm the list of designs, sizes, timeline and price in writing.",
      "We create layouts, choose type and colour, and build the full set.",
      "You review the drafts and send changes. We refine until it is right.",
      "We send print-ready and web-ready files, plus editable sources if agreed.",
    ],
    tools: [
      "Figma",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Canva for team templates",
    ],
    audience: [
      {
        title: "Small and local businesses",
        text: "Menus, signs, flyers and social posts that look consistent.",
      },
      {
        title: "Startups",
        text: "Pitch decks and marketing assets for fundraising and launch.",
      },
      {
        title: "E-commerce sellers",
        text: "Product graphics, banners and packaging inserts.",
      },
      {
        title: "Events and organisations",
        text: "Posters, programmes and promo material on a deadline.",
      },
    ],
    faqs: [
      {
        q: "How do you price graphic design?",
        a: "By piece or by package. We quote after you describe what you need, and share the price before work begins.",
      },
      {
        q: "How long does a design take?",
        a: "A single graphic can be quick. A full set or a deck takes longer. We agree dates in the plan.",
      },
      {
        q: "How many revisions are included?",
        a: "Revision rounds are included and agreed up front. Clear feedback keeps rounds short.",
      },
      {
        q: "Which file formats will I get?",
        a: "PDF, PNG and JPG as standard, with SVG, AI, PSD or Figma files when needed and agreed.",
      },
      {
        q: "Do you work with clients outside Bangladesh?",
        a: "Yes. We work from Dhaka with clients worldwide and handle everything online.",
      },
    ],
    related: ["branding", "illustration", "web-design"],
    gallery: [
      {
        src: "/work/bangla-type-poster.webp",
        alt: "Orange poster with black hand-drawn Bangla lettering and an ink splash figure",
        width: 883,
        height: 1400,
      },
      {
        src: "/work/bangla-lettering.webp",
        alt: "Orange Bangla display lettering on a light patterned background",
        width: 1400,
        height: 831,
      },
      {
        src: "/work/doodle-illustration.webp",
        alt: "Colourful doodle poster full of planets, buildings, scientists and school items",
        width: 1322,
        height: 1400,
      },
      {
        src: "/work/book-layout.webp",
        alt: "Open book spread with colourful abstract graphics and a Thank you page",
        width: 1400,
        height: 911,
      },
    ],
  },

  branding: {
    slug: "branding",
    name: "Branding",
    h1: "Branding and Logo Design in Bangladesh",
    description:
      "Branding and logo design services in Bangladesh. Logos, identity systems and brand guidelines from a creative studio in Dhaka. Book a free call with us.",
    image: "/work/tile-branding.jpg",
    imageAlt: "Open book spread with colourful abstract graphics",
    intro: [
      "A brand is how people recognise and remember you. We create the logo, colours, type and rules that make your business look like one clear thing everywhere.",
      "Our branding services in Bangladesh are for new businesses that need an identity, and established ones that look dated or inconsistent. Logo design in Bangladesh is often rushed. We start with who you are and who you serve.",
      "Gryffindorlab is a creative studio in Dhaka, Bangladesh, working with clients worldwide.",
      "We begin with questions. What do you sell, who buys it and why should they pick you? The answers shape the logo, not the other way round. A good identity should still make sense in five years.",
      "We test logos where they will actually live: a small social avatar, a shop sign, an invoice, a website header. A mark that only looks good large is not finished.",
      "Brand work does not end with a logo file. We deliver guidelines that explain how to use colour, type and spacing, so your team and suppliers can apply the brand without calling us each time.",
      "We work in plain language and show our thinking. Each direction comes with a short explanation of why it fits, so feedback can be about the business goals and not only personal taste.",
      "A brand also needs to be easy to run. We keep the system small: one main logo, a short colour list and two fonts. That way your team can use it correctly every day, on invoices, social posts and signs.",
    ],
    included: [
      {
        title: "Logo design",
        text: "A main logo and simple variations for light, dark, small and wide spaces.",
      },
      {
        title: "Colour and type",
        text: "A chosen palette and fonts that fit your audience and work on screen and in print.",
      },
      {
        title: "Identity system",
        text: "Icons, patterns, image style and layout rules that tie everything together.",
      },
      {
        title: "Brand guidelines",
        text: "A short, practical document showing how to use the brand correctly.",
      },
      {
        title: "Stationery and social kits",
        text: "Business cards, letterheads, profile images and covers.",
      },
      {
        title: "Logo file pack",
        text: "All formats you need for web, print and social media.",
      },
    ],
    process: [
      "We ask about your business, customers, competitors and the feeling you want.",
      "We agree on what the brand package includes, the timeline and the price.",
      "We explore directions, then develop the strongest into a full identity.",
      "You review the direction, we refine the logo and system together.",
      "We deliver the file pack and guidelines, and set up your first applications.",
    ],
    tools: [
      "Adobe Illustrator",
      "Figma",
      "Adobe Photoshop",
      "Adobe InDesign",
      "Miro for early research",
    ],
    audience: [
      {
        title: "New businesses",
        text: "A first identity that looks credible from the first day.",
      },
      {
        title: "Rebrands",
        text: "Established companies that need a cleaner, more consistent look.",
      },
      {
        title: "Fashion, food and lifestyle brands",
        text: "Identities that work on packaging, menus and social media.",
      },
      {
        title: "Creators and personal brands",
        text: "A recognisable look across channels.",
      },
    ],
    faqs: [
      {
        q: "How much does branding cost?",
        a: "It depends on how much you need, from a logo alone to a full identity. We share a fixed quote after the first call.",
      },
      {
        q: "How long does a branding project take?",
        a: "Usually several weeks, depending on scope and how quickly feedback arrives. We set milestones in the plan.",
      },
      {
        q: "How many logo concepts and revisions do I get?",
        a: "We agree the number of concepts and revision rounds before starting, so the process stays focused.",
      },
      {
        q: "What files will I receive?",
        a: "Logos in SVG, PNG, PDF and editable source files, plus a guidelines document.",
      },
      {
        q: "Can you work with clients outside Bangladesh?",
        a: "Yes. We are in Dhaka and work online with clients worldwide.",
      },
    ],
    related: ["design", "web-design", "illustration"],
  },

  animation: {
    slug: "animation",
    name: "Animation",
    h1: "Animation and Motion Graphics in Bangladesh",
    description:
      "Animation and motion graphics in Bangladesh: logo animation, explainers and social motion from a Dhaka studio for global clients. Book a free call with us.",
    image: "/work/tile-animation.jpg",
    imageAlt:
      "Illustration of a boy beside a lantern-carrying robot, in a cartoon animation style",
    intro: [
      "We make animation that explains things quickly and holds attention. That includes motion graphics, animated logos, explainer videos and short social clips.",
      "Our motion graphics and animation services in Bangladesh help teams with an idea that is hard to show with a still image or plain footage. Movement makes products, processes and stories easier to follow.",
      "Gryffindorlab is a creative studio in Dhaka, Bangladesh. We work with clients worldwide.",
      "Animation takes planning. Before we move anything, we agree on the message, the length and the visual style. A short script and storyboard save a lot of rework, because changes are cheap on paper and costly after animation.",
      "We keep motion simple and purposeful. Each movement should guide the eye or explain a step. Heavy effects that distract from the message are left out.",
      "Animated pieces often need to work in many places at once: a website, a pitch, social feeds. We plan sizes and file types early so the same work can be reused.",
      "We also work with what you already have. Existing logos, icons and brand colours can be animated directly, which keeps costs down and keeps the result consistent with your other materials.",
      "We also think about sound. Even a short logo animation feels better with a clean sound effect, and an explainer needs balanced music and voice. We include simple sound design so the finished piece feels complete.",
    ],
    included: [
      {
        title: "Motion graphics",
        text: "Animated text, shapes and data for ads, intros and social media.",
      },
      {
        title: "Logo animation",
        text: "Short logo reveals for videos, presentations and websites.",
      },
      {
        title: "Explainer videos",
        text: "Script-to-screen animated videos that explain a product or idea.",
      },
      {
        title: "Storyboards",
        text: "Frame-by-frame plans you approve before animation begins.",
      },
      {
        title: "Sound and voice-over sync",
        text: "Timing matched to music, effects and narration.",
      },
      {
        title: "Web-ready exports",
        text: "Video, GIF or lightweight formats sized for each channel.",
      },
    ],
    process: [
      "You describe the message, the audience and where the animation will appear.",
      "We write or refine the script, agree on length and style, and draw a storyboard.",
      "We design the frames, animate them, and add music and sound.",
      "You review a draft animation. We adjust timing, visuals and text.",
      "We export the final files and share them in the formats you chose.",
    ],
    tools: [
      "Adobe After Effects",
      "Adobe Illustrator",
      "Blender",
      "Lottie",
      "Adobe Premiere Pro",
      "Audition",
    ],
    audience: [
      {
        title: "Startups and software products",
        text: "Short explainers that show how the product works.",
      },
      {
        title: "Marketing teams",
        text: "Animated ads and social clips that stand out in the feed.",
      },
      {
        title: "Educators and course makers",
        text: "Visuals that make hard topics simple.",
      },
      {
        title: "Video creators",
        text: "Intros, lower thirds and transitions with a custom look.",
      },
    ],
    faqs: [
      {
        q: "How is animation priced?",
        a: "By length, style and complexity. We quote after reviewing the idea and the script, before starting.",
      },
      {
        q: "How long does an animation take?",
        a: "A short logo reveal is quick. An explainer takes longer because of scripting, storyboards and animation. We set dates in the plan.",
      },
      {
        q: "How many revisions can I request?",
        a: "Changes are easiest at storyboard stage. We agree revision rounds up front for each phase.",
      },
      {
        q: "What formats will I get?",
        a: "MP4 as standard, plus GIF, WebM or Lottie where it suits the use. Source files can be added if agreed.",
      },
      {
        q: "Do you work with international clients?",
        a: "Yes. We work from Dhaka with clients worldwide and share work through online review links.",
      },
    ],
    related: ["video-editing", "illustration", "branding"],
    videos: [
      {
        id: "jY_HhkcANP0",
        title:
          "প্রথম বিশ্বযুদ্ধ কীভাবে শুরু হলো? দুটো গুলি থেকে গোটা ইউরোপে যুদ্ধ",
      },
      {
        id: "__NHgbN9CRM",
        title:
          "The Rise of Japan: জাপান কীভাবে ইউরোপের বাইরে প্রথম শিল্পোন্নত দেশ হলো?",
      },
      {
        id: "4RLPr8NOPpo",
        title: "Silicon Valley কীভাবে প্রযুক্তিকে নিয়ন্ত্রণ করছে!",
      },
    ],
  },

  illustration: {
    slug: "illustration",
    name: "Illustration",
    h1: "Illustration Services in Bangladesh",
    description:
      "Custom illustration services in Bangladesh: editorial art, product visuals and icon sets. Creative studio in Dhaka for global clients. Book a free call with us.",
    image: "/work/tile-gultu.jpg",
    imageAlt:
      "Illustration of a child with a backpack and a small red fox standing in a misty forest",
    intro: [
      "We create original illustrations that give your content a clear, distinct look. They can explain an idea, support a story or make a product feel friendly.",
      "Our illustration services in Bangladesh suit publishers, brands and product teams that want art made for them, not stock images everyone else has used.",
      "Gryffindorlab is a creative studio in Dhaka, Bangladesh. We work with clients worldwide.",
      "Illustration lets you show things a camera cannot, like an idea, a process or a mood. It also helps a brand stand out when most competitors use the same stock photos and icons.",
      "We start with rough sketches so you can steer the direction early. Once the composition and style are agreed, we move to colour and detail, which keeps the number of big changes low.",
      "We care about consistency. If you need ten pieces, they should look like the same hand made them, with matching line weight, colour and level of detail.",
      "Rights are clear from the start. We agree where the artwork can be used, such as print, web or packaging, and put it in writing, so you can publish with confidence.",
      "We can adapt a style over time. If your first set works well, we can extend it with new scenes, seasonal variations or extra icons, without changing the look your audience already knows.",
      "Illustration also works well beside your other creative work. The same artwork can appear on a website, in a video intro, on packaging and in social posts. We plan for that reuse early, so each piece is drawn with space for text and a clean crop for small screens. Good briefs help too: tell us the feeling, the audience and where it will appear, and we handle the rest.",
    ],
    included: [
      {
        title: "Editorial illustration",
        text: "Images for articles, newsletters, reports and book pages.",
      },
      {
        title: "Product and website art",
        text: "Hero images, spot illustrations and empty-state graphics.",
      },
      {
        title: "Custom icon sets",
        text: "Matching icons in one consistent style.",
      },
      {
        title: "Character design",
        text: "Mascots and characters for brands, apps and stories.",
      },
      {
        title: "Social and marketing art",
        text: "Illustrations sized for posts, banners and campaigns.",
      },
      {
        title: "Layered source files",
        text: "Editable files so your team can adapt the artwork later.",
      },
    ],
    process: [
      "You share the subject, the audience, and examples of styles you like.",
      "We agree on the number of pieces, style, size and timeline.",
      "We sketch, then you pick a direction before we move to full colour.",
      "You review the finished art with clear notes. We refine details.",
      "We deliver final files in the formats you need, with usage notes.",
    ],
    tools: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Procreate",
      "Figma",
      "Affinity Designer",
    ],
    audience: [
      {
        title: "Publishers and writers",
        text: "Cover and article art that fits the story.",
      },
      {
        title: "Brands and agencies",
        text: "A custom visual style for campaigns and websites.",
      },
      {
        title: "Software and app teams",
        text: "Friendly illustrations for onboarding, help pages and marketing.",
      },
      {
        title: "Educators",
        text: "Clear visuals for books, slides and courses.",
      },
    ],
    faqs: [
      {
        q: "How do you price illustration?",
        a: "By number of pieces, detail and use. We quote after you explain the project and share references.",
      },
      {
        q: "How long does an illustration take?",
        a: "A single piece takes a few days to a couple of weeks. Sets take longer. We confirm timing in the plan.",
      },
      {
        q: "How many revisions are included?",
        a: "We include sketch-stage and final-stage revision rounds, agreed before we begin.",
      },
      {
        q: "What files will I receive?",
        a: "PNG and JPG for general use, SVG or PDF for vector work, and layered source files when agreed.",
      },
      {
        q: "Do you work with clients outside Bangladesh?",
        a: "Yes. We work from Dhaka with clients worldwide, fully online.",
      },
    ],
    related: ["design", "animation", "branding"],
    gallery: [
      {
        src: "/work/girl-in-saree.webp",
        alt: "Flat-style illustration of a woman in a red saree framed by green leaves",
        width: 1400,
        height: 976,
      },
      {
        src: "/work/gultu.webp",
        alt: "Illustration of a child with a backpack and a small red fox standing in a misty forest",
        width: 1050,
        height: 1400,
      },
      {
        src: "/work/misir-ali.webp",
        alt: "Illustration of a man in a light shirt surrounded by floating books and stacks of old books",
        width: 1400,
        height: 1097,
      },
      {
        src: "/work/feluda.webp",
        alt: "Illustration of a crowd of men in blue and maroon tones with a detective in the centre",
        width: 1400,
        height: 997,
      },
      {
        src: "/work/sky-of-fantasy.webp",
        alt: "Digital painting of a figure rising from a night sea in glowing teal swirls",
        width: 1239,
        height: 1400,
      },
      {
        src: "/work/lantern-robot.webp",
        alt: "Illustration of a boy walking beside a lantern-carrying robot in a dark forest at night",
        width: 984,
        height: 1400,
      },
    ],
  },
};

export const serviceSlugs = Object.keys(services) as ServiceSlug[];
