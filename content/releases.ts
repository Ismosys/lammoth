import type { Release } from "@/lib/types";

/**
 * Discography.
 *
 * Titles, artists, release dates, tracklists, durations, genres and credits are
 * taken from the official Bandcamp listings. Editorial copy (intro, story) is
 * original writing for this site.
 *
 * Each theme is sampled from that release's own cover artwork, so every era
 * carries its own colour identity rather than inheriting a single site palette.
 */
export const releases: Release[] = [
  {
    slug: "onward",
    title: "Onward",
    artist: "Lammoth",
    format: "album",
    releaseDate: "2026-08-07",
    year: 2026,
    artwork: "/art/onward.jpg",
    artworkAlt:
      "Onward cover artwork by Jacob Kuddes: a laden pony standing in a meadow of buttercups beneath open sky and distant mountains, with the Lammoth logo in warm orange on a cream field.",
    bandcampUrl: "https://lammothofficial.bandcamp.com/album/onward",
    genres: [
      "Atmospheric Black Metal",
      "Blackgaze",
      "Experimental",
      "Electronic",
      "Shoegaze",
    ],
    tracks: [
      { position: 1, title: "Poor Old Half-Starved Pony", duration: 342 },
      { position: 2, title: "To Be Free (Bill)", duration: 354 },
      { position: 3, title: "A Gardener", duration: 246 },
      { position: 4, title: "Farewell, Good Beast of Burden", duration: 263 },
      {
        position: 5,
        title: "A Fox Passing Through the Woods on Business of Their Own",
        duration: 51,
      },
      { position: 6, title: "The Road to Bree", duration: 273 },
      { position: 7, title: "We Were Born to Suffer", duration: 228 },
      { position: 8, title: "Horsethieving", duration: 267 },
      { position: 9, title: "A Final Parting", duration: 276 },
    ],
    credits: [
      { role: "Music and Lyrics", name: "Lammoth" },
      { role: "Mixing", name: "Lammoth" },
      { role: "Additional Sound Effects", name: "Seth Hutchinson" },
      {
        role: "Mastering",
        name: "Angel Marcloid of Angel Hair Audio",
        url: "https://angelhairaudio.com",
      },
      {
        role: "Cover Artwork",
        name: "Jacob Kuddes",
        url: "https://www.jacobkuddes.com",
      },
    ],
    intro:
      "Nine tracks that follow a working animal from the yard to the open road, and to the place where the road stops being shared. Tremolo guitar breaks into open daylight, then falls away to almost nothing.",
    story: [
      "Onward is built around a small character rather than a large one. Not a hero, not a war, but a pack animal carrying weight for other people across country it did not choose.",
      "The record leans on the brightness that atmospheric black metal usually withholds. Distortion opens into clear air. Passages of near silence sit between the heaviest moments, and the album is happy to let them stand.",
      "It ends with a parting rather than a battle. What remains at the close is not triumph. It is the quiet after something you were carrying is finally set down.",
    ],
    theme: {
      accent: "#D98A46",
      accent2: "#8CA84A",
      ground: "#0B0C08",
      raised: "#15170F",
      paper: "#EFE8D3",
      atmosphere: "Open meadow, high sun, distant hills",
    },
    featured: true,
  },
  {
    slug: "aetherfrost-caverns",
    title: "Aetherfrost Caverns",
    artist: "Lammoth and Gonemage",
    format: "album",
    releaseDate: "2025-10-17",
    year: 2025,
    artwork: "/art/aetherfrost-caverns.jpg",
    artworkAlt:
      "Aetherfrost Caverns cover artwork: a cold subterranean scene rendered in dark teal and near black.",
    bandcampUrl: "https://lammothofficial.bandcamp.com/album/aetherfrost-caverns",
    genres: [
      "Atmospheric Black Metal",
      "Black Metal",
      "Electronic",
      "Extreme Metal",
    ],
    tracks: [
      {
        position: 1,
        title: "In the Black Winds the Stars Shall Die",
        duration: 342,
        performer: "Lammoth",
      },
      { position: 2, title: "Tyrn Gorthad", duration: 463, performer: "Lammoth" },
      {
        position: 3,
        title: "Aetherhold Embrace and the Idle Wish",
        duration: 481,
        performer: "Gonemage",
      },
      { position: 4, title: "Strange Relics", duration: 239, performer: "Gonemage" },
    ],
    credits: [
      {
        role: "Tracks 1 and 2: All Instruments, Vocals, Lyrics, Mixing",
        name: "Lammoth",
      },
      { role: "Tracks 1 and 2: Mastering", name: "Galimgim" },
      {
        role: "Tracks 3 and 4: Lead Vocals, All Instruments, Lyrics, Production, Mixing, Mastering",
        name: "Galimgim",
      },
      { role: "Additional High Vocals on Track 3", name: "Aeggnyth" },
    ],
    intro:
      "A split record shared with Gonemage. Two artists, one cavern, four descents into cold electronic black metal.",
    story: [
      "Two sides of the same underground. Lammoth takes the first half, Gonemage the second, and neither softens the handover.",
      "The palette here is colder than anything else in the catalogue. Chiptune textures sit against tremolo guitar without either backing down.",
    ],
    theme: {
      accent: "#5FA8A0",
      accent2: "#3E6E74",
      ground: "#07090A",
      raised: "#101618",
      paper: "#DCE6E5",
      atmosphere: "Deep cavern, still cold air, no horizon",
    },
  },
  {
    slug: "weeping-of-the-ainur",
    title: "Weeping of the Ainur",
    artist: "Lammoth",
    format: "single",
    releaseDate: "2025-06-17",
    year: 2025,
    artwork: "/art/weeping-of-the-ainur.jpg",
    artworkAlt:
      "Weeping of the Ainur cover artwork: a dim forest brook, after the 1855 painting by Gustave Courbet.",
    bandcampUrl: "https://lammothofficial.bandcamp.com/track/weeping-of-the-ainur",
    genres: ["Atmospheric Black Metal", "Black Metal", "Electronic", "Extreme Metal"],
    tracks: [{ position: 1, title: "Weeping of the Ainur", duration: 395 }],
    credits: [
      { role: "All Instruments and Vocals", name: "Lammoth" },
      { role: "Mixing and Mastering", name: "Lammoth" },
      {
        role: "Artwork",
        name: "Gustave Courbet, The Brooks of Les Puits-Noir (1855)",
      },
    ],
    intro:
      "A single piece, self recorded and self mastered, set against a nineteenth century painting of dark water under trees.",
    story: [
      "The shortest statement in the catalogue and the most self contained. One track, one performer, one image.",
      "Choosing a Courbet forest interior over commissioned artwork places the song in a much older tradition of landscape as feeling.",
    ],
    theme: {
      accent: "#9AA35C",
      accent2: "#5C6338",
      ground: "#080906",
      raised: "#13150D",
      paper: "#E4E3D2",
      atmosphere: "Wet forest floor, low light through leaves",
    },
  },
  {
    slug: "tales-of-treachery",
    title: "Tales of Treachery",
    artist: "Lammoth",
    format: "album",
    releaseDate: "2024-07-12",
    year: 2024,
    artwork: "/art/tales-of-treachery.jpg",
    artworkAlt:
      "Tales of Treachery cover artwork by Ramza Illustration, rendered in deep night blues.",
    bandcampUrl: "https://lammothofficial.bandcamp.com/album/tales-of-treachery",
    genres: ["Atmospheric Black Metal", "Black Metal", "Electronic", "Extreme Metal"],
    tracks: [
      { position: 1, title: "Ungoliant's Last Child", duration: 479 },
      { position: 2, title: "Lunar Tales of Fire and Magic", duration: 309 },
      { position: 3, title: "Ascending the Steps of Minas Morgul", duration: 420 },
      { position: 4, title: "Brandywine Memories", duration: 387 },
    ],
    credits: [
      { role: "All Instruments", name: "Lammoth" },
      { role: "Mixing", name: "Lammoth" },
      {
        role: "Mastering",
        name: "Angel Marcloid of Angel Hair Audio",
        url: "https://angelhairaudio.com",
      },
      { role: "Cover Art", name: "Ramza Illustration" },
    ],
    intro:
      "Four long form pieces, the most sustained writing in the catalogue. Every track past five minutes, most past seven.",
    story: [
      "The record where the project's scale arrives. Nothing here is in a hurry, and the arrangements are given room to move through several states before they resolve.",
      "It closes on Brandywine Memories, the first appearance of a thread the project keeps returning to.",
    ],
    theme: {
      accent: "#6E9BC4",
      accent2: "#3C5E85",
      ground: "#06080B",
      raised: "#101722",
      paper: "#DCE4EE",
      atmosphere: "Moonlit night, cold blue, high walls",
    },
  },
  {
    slug: "nightshade-of-mirkwood",
    title: "Nightshade of Mirkwood",
    artist: "Lammoth",
    format: "single",
    releaseDate: "2024-01-05",
    year: 2024,
    artwork: "/art/nightshade-of-mirkwood.jpg",
    artworkAlt:
      "Nightshade of Mirkwood cover artwork: a dense dark wood in deep green and black.",
    bandcampUrl:
      "https://lammothofficial.bandcamp.com/track/nightshade-of-mirkwood",
    genres: [
      "Atmospheric Black Metal",
      "Melodic Black Metal",
      "Symphonic Black Metal",
      "Electronic",
    ],
    tracks: [{ position: 1, title: "Nightshade of Mirkwood", duration: 297 }],
    credits: [{ role: "All Instruments and Vocals", name: "Lammoth" }],
    intro:
      "The earliest release in the public catalogue, and the first sketch of the sound the project would keep building on.",
    story: [
      "Where the archive currently begins. The symphonic and melodic edges are more pronounced here than on anything that follows.",
    ],
    theme: {
      accent: "#5F8A6A",
      accent2: "#37543F",
      ground: "#060807",
      raised: "#0F1611",
      paper: "#DDE6DC",
      atmosphere: "Closed canopy, deep green, no path",
    },
  },
];

export const featuredRelease = releases.find((r) => r.featured) ?? releases[0];

export function getRelease(slug: string): Release | undefined {
  return releases.find((r) => r.slug === slug);
}

/** Oldest first. Used by the archives timeline. */
export const chronological = [...releases].sort((a, b) =>
  a.releaseDate.localeCompare(b.releaseDate),
);
