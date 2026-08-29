import type {
  Collaborator,
  ContactCategory,
  SocialLink,
  StoryChapter,
} from "@/lib/types";

export const site = {
  name: "Lammoth",
  tagline: "Brandywine Blasphemy",
  /** Set this to the production domain before deploying. */
  url: "https://lammoth.com",
  description:
    "Official home of Lammoth, an atmospheric black metal and blackgaze project from Asheville. Listen to the album Onward, explore the archives, and follow the journey.",
  location: "Asheville",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Archives", href: "/archives" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Only platforms with a verified official presence appear here. Lammoth has no
 * confirmed Spotify or Apple Music profile, so neither is listed. Add them here
 * if and when official links exist.
 */
export const socials: SocialLink[] = [
  {
    label: "Bandcamp",
    url: "https://lammothofficial.bandcamp.com",
    note: "Full catalogue, streaming and direct support",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/lammoth.official/",
    note: "Artwork, process and announcements",
  },
  {
    label: "Bluesky",
    url: "https://bsky.app/profile/lammoth.bsky.social",
    note: "Notes from the road",
  },
  {
    label: "Ampwall",
    url: "https://ampwall.com/a/lammoth",
    note: "An alternative home for the catalogue",
  },
];

/** The Onward story section. Original editorial writing, no quoted source text. */
export const onwardChapters: StoryChapter[] = [
  {
    numeral: "I",
    title: "The Beginning",
    body: "It starts in a yard, with a half starved animal and a load that is not its own. Nothing about the opening suggests an adventure. That is the point of it.",
    artwork: "/art/onward.jpg",
    artworkAlt: "The laden pony from the Onward cover artwork, standing in a meadow.",
  },
  {
    numeral: "II",
    title: "The Road",
    body: "Weight is carried east. The record is at its most open here, letting distortion break into daylight rather than closing the sky over the listener.",
    artwork: "/art/tales-of-treachery.jpg",
    artworkAlt: "A night blue landscape standing in for the long road east.",
  },
  {
    numeral: "III",
    title: "The Journey",
    body: "Things thin out. A fox crosses the path on business of its own and is gone in under a minute. The album lets small moments stay small.",
    artwork: "/art/weeping-of-the-ainur.jpg",
    artworkAlt: "A dim forest brook, standing in for the quiet middle of the journey.",
  },
  {
    numeral: "IV",
    title: "The Final Parting",
    body: "The load comes off. What follows is not a victory, and the record does not pretend otherwise. It simply stops asking the animal to carry anything.",
    artwork: "/art/nightshade-of-mirkwood.jpg",
    artworkAlt: "A dense dark wood, standing in for the close of the journey.",
  },
];

export const statement = "Every journey leaves something behind.";

/**
 * About copy. Written from verified public information only: the project is a
 * solo effort (Lammoth is credited with all instruments across the catalogue),
 * based in Asheville, working in atmospheric black metal and adjacent forms.
 * No biography, history or achievement has been invented.
 */
export const about = {
  intro:
    "Lammoth is a solo project working in atmospheric black metal, blackgaze and electronic music, based in Asheville.",
  portrait: {
    src: "/images/lammoth-portrait.jpg",
    alt: "Lammoth photographed outdoors, standing against a dense wall of green foliage in a black battle vest and cap.",
  },
  artist: [
    "Across the catalogue the credits stay short. Lammoth writes the music and lyrics, plays the instruments, and handles the mixing. Outside help arrives only where it is genuinely needed: mastering, additional sound design, cover artwork.",
    "That shape has held from the first single in 2024 through to Onward. It is a project run at a scale where one person can keep hold of every decision.",
  ],
  project: [
    "The work sits in the overlap between extreme metal and something gentler. Tremolo guitar and harsh vocals share space with chiptune, shoegaze texture and long passages of near quiet.",
    "The subject matter tends toward the small and the overlooked. Onward spends its full running time on a pack animal rather than a hero, and treats that as the more interesting story.",
  ],
  world: [
    "The catalogue draws openly on fantasy literature, but not for its battles. What carries over is the sense of distance, of weather, and of journeys that cost the people making them.",
    "Each release brings its own landscape. A cavern, a forest brook, a moonlit stair, an open meadow. The music is written to sit inside those places rather than describe them.",
  ],
  /** Genres listed on official releases only. */
  genres: [
    "Atmospheric Black Metal",
    "Black Metal",
    "Blackgaze",
    "Electronic",
    "Experimental",
    "Extreme Metal",
  ],
};

/** Verified from official release credits only. */
export const collaborators: Collaborator[] = [
  {
    name: "Angel Marcloid",
    role: "Mastering, Angel Hair Audio (Onward, Tales of Treachery)",
    url: "https://angelhairaudio.com",
  },
  {
    name: "Jacob Kuddes",
    role: "Cover artwork (Onward)",
    url: "https://www.jacobkuddes.com",
  },
  { name: "Ramza Illustration", role: "Cover art (Tales of Treachery)" },
  { name: "Seth Hutchinson", role: "Additional sound effects (Onward)" },
  {
    name: "Gonemage",
    role: "Split release, writing and performance (Aetherfrost Caverns)",
  },
  { name: "Galimgim", role: "Mastering and performance (Aetherfrost Caverns)" },
  { name: "Aeggnyth", role: "Additional vocals (Aetherfrost Caverns)" },
];

export const contactCategories: ContactCategory[] = [
  {
    value: "general",
    label: "General Inquiries",
    description: "Questions about the music, the releases or the project.",
  },
  {
    value: "press",
    label: "Press",
    description: "Interviews, reviews, premieres and features.",
  },
  {
    value: "booking",
    label: "Booking",
    description: "Live performances and appearances.",
  },
  {
    value: "collaboration",
    label: "Collaborations",
    description: "Splits, guest parts, remixes and artwork.",
  },
];
