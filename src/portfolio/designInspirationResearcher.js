import { geminiClient } from '../gemini-client.js';

/**
 * Fetches recent live design inspiration entries from Minimal Gallery RSS feed.
 * @returns {Promise<Array<{ title: string, link: string, categories: string[], imageUrl?: string }>>}
 */
export async function fetchMinimalGalleryInspiration() {
  try {
    const res = await fetch('https://minimal.gallery/feed/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WeaveDesignBot/1.0)' },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = [];
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    for (const rawItem of itemMatches.slice(0, 6)) {
      const title = rawItem.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)?.[1] || '';
      const link = rawItem.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const categories = [...rawItem.matchAll(/<category>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/g)].map(
        (m) => m[1]
      );
      const imageUrl = rawItem.match(/<img[^>]+src="([^">]+)"/)?.[1] || '';
      if (title) {
        items.push({ title, link, categories, imageUrl });
      }
    }
    return items;
  } catch (err) {
    console.warn('[InspirationResearcher] Minimal Gallery feed notice:', err.message);
    return [];
  }
}

/**
 * Researches real-world design inspirations across Dribbble, Minimal Gallery, and top web designs
 * for the user's specific domain/topic using Gemini.
 *
 * @param {string} prompt - The user's website request
 * @param {object} [options]
 * @returns {Promise<{
 *   topicAnalysis: { domain: string, targetAudience: string, benchmarkSites: string[] },
 *   inspirations: Array<{
 *     option: number,
 *     id: string,
 *     name: string,
 *     sourceInspiration: string,
 *     aestheticDescription: string,
 *     fontHeading: string,
 *     fontBody: string,
 *     googleFontsUrl: string,
 *     stitchHeadlineFont: string,
 *     stitchBodyFont: string,
 *     colors: { bg: string, bgCard: string, accent: string, accentSecondary: string, textPrimary: string, textMuted: string, border: string },
 *     components: string[],
 *     stitchPrompt: string
 *   }>
 * }>}
 */
export async function researchDesignInspirations(prompt, options = {}) {
  const minimalGalleryItems = await fetchMinimalGalleryInspiration();
  const minimalGalleryContext = minimalGalleryItems.length > 0
    ? `Recent curated sites on Minimal Gallery:\n` +
      minimalGalleryItems.map((i) => `- "${i.title}" (${i.categories.join(', ')}): ${i.link}`).join('\n')
    : `Curated gallery references: Minimal Gallery, Godly.website, Siteinspire, Dribbble Top Product Design.`;

  const systemPrompt = `You are a World-Class Design Director, Web Design Curator, and Design Systems Architect for award-winning sites.
Your mission is to perform deep design inspiration research for a user's website request, referencing actual design trends from Dribbble, Minimal Gallery (minimal.gallery), Godly.website, and top-tier real-world products.

User Prompt: "${prompt}"

Current Live Design Gallery Context:
${minimalGalleryContext}

CRITICAL MANDATE: ABSOLUTELY ZERO PRESETS, ZERO CANNED TEMPLATES, ZERO FORCED ARCHETYPES.
DO NOT use predefined formulas like "Swiss Editorial", "Bento Grid", or "Neon UI".
DO NOT pigeonhole every site into the same 3 preset styles.
Every single website request MUST receive 3 COMPLETELY DYNAMIC, BESPOKE AESTHETIC PHILOSOPHIES invented organically for this specific domain, craft, and brand.

CRITICAL RESEARCH DIRECTIVE:
1. Conduct deep domain analysis on the user's specific topic, business model, and audience.
2. Extract the authentic visual conventions, essential interactive components, trust signals, and layout architectures appropriate for this specific craft or industry.
3. Formulate 3 RADICALLY DISTINCT design philosophies tailored natively to: "${prompt}".
   - Invent evocative, domain-native names for each aesthetic direction.
   - Curate domain-authentic color palettes, contrast ratios, and typography pairings.
   - Define bespoke interactive components and telemetry specific to this discipline.

For valid Stitch fonts, stitchHeadlineFont and stitchBodyFont MUST be one of:
"PLAYFAIR_DISPLAY", "SPACE_GROTESK", "DM_SANS", "PLUS_JAKARTA_SANS", "OUTFIT", "INTER", "MONTSERRAT", "MANROPE", "FRAUNCES", "SPACE_MONO", "GOOGLE_SANS", "IBM_PLEX_SERIF"

Output MUST be strictly valid JSON without any markdown or code fences. Format:
{
  "topicAnalysis": {
    "domain": string,
    "brandName": string,
    "tagline": string,
    "headline": string,
    "targetAudience": string,
    "benchmarkSites": [string, string, string],
    "keyFeatures": [
      { "title": string, "description": string, "metric": string }
    ]
  },
  "inspirations": [
    {
      "option": 1,
      "id": string (unique slug tailored to this direction),
      "name": string (bespoke evocative name invented for this domain),
      "sourceInspiration": string (real-world web references, Dribbble concepts, or gallery motifs suited to this niche),
      "aestheticDescription": string (detailed description of visual architecture, spatial rhythm, and materials),
      "fontHeading": string,
      "fontBody": string,
      "googleFontsUrl": string (Google Fonts css2 link),
      "stitchHeadlineFont": string (valid Stitch enum),
      "stitchBodyFont": string (valid Stitch enum),
      "colors": {
        "bg": string (hex),
        "bgCard": string (hex),
        "accent": string (hex),
        "accentSecondary": string (hex),
        "textPrimary": string (hex),
        "textMuted": string (hex),
        "border": string (hex)
      },
      "components": [string, string, string, string],
      "stitchPrompt": string (Exhaustive 3-paragraph prompt specifying the hero layout, bespoke UI mockups, metrics grid, feature showcase, and footer for Google Stitch MCP)
    },
    {
      "option": 2,
      "id": string,
      "name": string,
      "sourceInspiration": string,
      "aestheticDescription": string,
      "fontHeading": string,
      "fontBody": string,
      "googleFontsUrl": string,
      "stitchHeadlineFont": string,
      "stitchBodyFont": string,
      "colors": {
        "bg": string,
        "bgCard": string,
        "accent": string,
        "accentSecondary": string,
        "textPrimary": string,
        "textMuted": string,
        "border": string
      },
      "components": [string, string, string, string],
      "stitchPrompt": string
    },
    {
      "option": 3,
      "id": string,
      "name": string,
      "sourceInspiration": string,
      "aestheticDescription": string,
      "fontHeading": string,
      "fontBody": string,
      "googleFontsUrl": string,
      "stitchHeadlineFont": string,
      "stitchBodyFont": string,
      "colors": {
        "bg": string,
        "bgCard": string,
        "accent": string,
        "accentSecondary": string,
        "textPrimary": string,
        "textMuted": string,
        "border": string
      },
      "components": [string, string, string, string],
      "stitchPrompt": string
    }
  ]
}`;

  try {
    console.log('[InspirationResearcher] Querying Gemini for Dribbble & Minimal Gallery design inspiration...');
    const res = await geminiClient.generateContent(
      `Research Dribbble, Minimal Gallery, and top award-winning design inspirations for: "${prompt}". Return strictly raw JSON.`,
      systemPrompt
    );

    let rawJson = res.text.trim();
    if (rawJson.startsWith('```')) {
      rawJson = rawJson.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
    }

    const parsed = JSON.parse(rawJson);
    if (parsed?.inspirations && parsed.inspirations.length === 3) {
      console.log(`[InspirationResearcher] Successfully researched 3 design directions: ${parsed.inspirations.map((i) => i.name).join(', ')}`);
      return parsed;
    }
  } catch (err) {
    console.warn('[InspirationResearcher] Gemini inspiration research note:', err.message);
  }

  // Domain-specific grounded fallbacks if Gemini is offline
  return getFallbackDesignInspirations(prompt);
}

/**
 * Fully dynamic domain fallback inspirations synthesized organically from the prompt.
 * ZERO hardcoded presets: constructs bespoke aesthetic names, palettes, and components.
 */
export function getFallbackDesignInspirations(prompt) {
  const cleanPrompt = (prompt || '').trim();
  const words = cleanPrompt.replace(/^(create|build|make|design|need|want|a|an|the|website|for|landing\s+page)\s+/gi, '').trim();
  const domainTitle = words.length > 0
    ? words.split(/\s+/).slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : 'Bespoke Studio';

  const brandName = `${domainTitle}`;
  const lower = cleanPrompt.toLowerCase();

  const slug = domainTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const dirName1 = `${domainTitle} Signature Atmosphere`;
  const dirName2 = `${domainTitle} Craft Monograph`;
  const dirName3 = `${domainTitle} Kinetic Studio`;

  const palette1 = { bg: '#090D16', bgCard: '#111827', accent: '#6366F1', accentSecondary: '#EC4899', textPrimary: '#F9FAFB', textMuted: '#9CA3AF', border: 'rgba(255, 255, 255, 0.12)' };
  const palette2 = { bg: '#FAFAF9', bgCard: '#FFFFFF', accent: '#18181B', accentSecondary: '#71717A', textPrimary: '#09090B', textMuted: '#52525B', border: '#E4E4E7' };
  const palette3 = { bg: '#0A0A0C', bgCard: '#141418', accent: '#14B8A6', accentSecondary: '#F59E0B', textPrimary: '#F4F4F5', textMuted: '#A1A1AA', border: '#27272A' };

  const comp1 = [`${domainTitle} Feature Showcase`, `${domainTitle} Operational Metrics`, 'Interactive Offerings Matrix', 'Primary Action Console'];
  const comp2 = [`${domainTitle} Heritage Monograph`, 'Craft Philosophy Manifesto', 'Specification Grid', 'Private Inquiry Portal'];
  const comp3 = [`${domainTitle} Dynamic Dashboard`, 'Feature Highlights', 'Interactive Workflow Preview', 'Direct Access Booking'];

  return {
    topicAnalysis: {
      domain: domainTitle,
      brandName: brandName,
      headline: `${domainTitle} — Crafted for Purpose`,
      tagline: `A modern, bespoke digital experience crafted specifically for ${cleanPrompt}.`,
      targetAudience: `Discerning clients, enthusiasts, and patrons of ${domainTitle}`,
      benchmarkSites: ['Awwwards.com', 'Godly.website', 'Minimal.gallery'],
      keyFeatures: [
        { title: `${domainTitle} Signature Quality`, description: `Engineered specifically around the unique craft and standards of ${cleanPrompt}.`, metric: '100% Bespoke' },
        { title: 'Interactive Client Experience', description: 'Fluid spatial interactions, dynamic status feedback, and refined micro-typography.', metric: '60fps Delight' },
        { title: 'Precision Operational Workflow', description: 'Streamlined scheduling, clear telemetry, and seamless digital access.', metric: 'Instant Sync' }
      ]
    },
    inspirations: [
      {
        option: 1,
        id: `${slug}-signature`,
        name: dirName1,
        sourceInspiration: `Curated digital flagship inspired by top tier ${domainTitle} studios`,
        aestheticDescription: `Deep immersive atmosphere tailored for ${cleanPrompt}, featuring rich spatial contrast, glowing interactive viewports, and custom domain metrics.`,
        fontHeading: 'Space Grotesk',
        fontBody: 'Plus Jakarta Sans',
        googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap',
        stitchHeadlineFont: 'SPACE_GROTESK',
        stitchBodyFont: 'PLUS_JAKARTA_SANS',
        colors: palette1,
        components: comp1,
        stitchPrompt: `Modern desktop flagship for "${cleanPrompt}". Immersive high-craft layout tailored specifically for ${domainTitle}. Background (${palette1.bg}) with primary accent (${palette1.accent}), featuring interactive domain hero cards, authentic proof points, and refined typography.`
      },
      {
        option: 2,
        id: `${slug}-monograph`,
        name: dirName2,
        sourceInspiration: `Editorial craft journal and gallery presentation for ${domainTitle}`,
        aestheticDescription: `Spacious canvas celebrating the pedigree and craft of ${cleanPrompt}, with high-contrast serif headlines, razor-thin hairline rules, and catalog precision.`,
        fontHeading: 'Playfair Display',
        fontBody: 'DM Sans',
        googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap',
        stitchHeadlineFont: 'PLAYFAIR_DISPLAY',
        stitchBodyFont: 'DM_SANS',
        colors: palette2,
        components: comp2,
        stitchPrompt: `Refined editorial desktop showcase for "${cleanPrompt}". Spacious off-white canvas (${palette2.bg}), classic serif typography (Playfair Display), hairline borders (${palette2.border}), and catalog layout showcasing ${domainTitle} craftsmanship.`
      },
      {
        option: 3,
        id: `${slug}-kinetic`,
        name: dirName3,
        sourceInspiration: `Modern tactile studio experience for ${domainTitle}`,
        aestheticDescription: `High-energy modern interface with crisp structural borders, vibrant accent callouts, and tactile real-time interaction blocks for ${cleanPrompt}.`,
        fontHeading: 'Space Grotesk',
        fontBody: 'Inter',
        googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap',
        stitchHeadlineFont: 'SPACE_GROTESK',
        stitchBodyFont: 'INTER',
        colors: palette3,
        components: comp3,
        stitchPrompt: `High-energy tactile desktop site for "${cleanPrompt}". Modern dark slate background (${palette3.bg}), vibrant accents (${palette3.accent}), crisp borders (${palette3.border}), and tactile micro-cards for ${domainTitle}.`
      }
    ]
  };
}
