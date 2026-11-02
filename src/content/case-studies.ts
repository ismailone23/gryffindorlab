// Real client projects, one per service. Leave a field "" and it is not rendered;
// the whole section stays hidden until at least one field has text.
import type { ServiceSlug } from "./services";

export type CaseStudyData = {
  client: string;
  challenge: string;
  approach: string;
  result: string;
};

const empty: CaseStudyData = {
  client: "",
  challenge: "",
  approach: "",
  result: "",
};

export const caseStudies: Record<ServiceSlug, CaseStudyData> = {
  // Written from what the live app does; add real outcomes or numbers only when you have them.
  "web-design": {
    client: "CareWell, a healthcare booking platform (our own build)",
    challenge:
      "Booking a doctor often means phone calls, paper notes and records kept in different places. CareWell needed one place where patients find a doctor and book a visit, doctors manage their time, and health records stay with the patient.",
    approach:
      "We built separate patient and doctor workspaces behind one sign-in. Patients search by name, specialty or location and book open times. Doctors set weekly hours in the Asia/Dhaka time zone, review appointment requests and work through a serial-ordered queue. An AI assistant helps patients choose a specialty and book or ask for a new time. Prescriptions and care plans appear in the patient's health records.",
    result:
      "A live platform with doctor search, booking, availability, a daily patient queue, an AI booking assistant and health records. You can try it at carewell-lemon.vercel.app.",
  },
  // Draft from the public channel; confirm the details and add real results (views, watch time) if you have them.
  "video-editing": {
    client: "Nahin Munker Sajin, a Bengali YouTube channel",
    challenge:
      "Explainers on economics, history and technology run long and carry a lot of information. Each video had to stay clear and easy to follow for a general Bengali-speaking audience.",
    approach:
      "We edited each video around its script, using maps, graphics and on-screen text to support the narration, and kept the pacing steady from start to finish.",
    result:
      "A growing catalogue of published explainers, including the videos shown above on semiconductors, Singapore and the arms trade. You can watch them on the channel.",
  },
  // Draft from the artwork shown above; confirm the details and add real results if you have them.
  design: {
    client: "Bangla lettering and poster series (portfolio work)",
    challenge:
      "Bangla display lettering has to read clearly at poster size while still looking hand-made and distinct.",
    approach:
      "We drew the letterforms by hand, paired them with a strong single-colour background and a bold ink illustration, and tested them as full posters.",
    result:
      "A set of finished Bangla lettering posters, shown in the work above.",
  },
  // TODO: real client project
  branding: { ...empty },
  // TODO: real client project
  animation: { ...empty },
  // Draft from the artwork shown above; confirm the details and add real results if you have them.
  illustration: {
    client: "Character and editorial illustration series (portfolio work)",
    challenge:
      "Illustrations for stories and articles need a consistent look, so a set of pieces feels like it was made by one hand.",
    approach:
      "We kept line, colour palette and level of detail steady across the series, and worked from rough sketches to full colour so the direction was agreed early.",
    result:
      "A series of finished illustrations, from forest scenes to book-filled interiors, shown in the work above.",
  },
};
