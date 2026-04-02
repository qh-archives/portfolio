import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import VectorTitle from "./VectorTitle";
import GlassCursor from "./GlassCursor";
import PullString from "./PullString";
import LampImage from "./LampImage";
import ProjectPage from "./ProjectPage";
import PlayPage from "./PlayPage";
import LoadingScreen from "./LoadingScreen";

function isTouchTablet() {
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;
  return hasTouch && window.innerWidth < 1400;
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint || isTouchTablet());
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint || isTouchTablet());
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [breakpoint]);
  return isMobile;
}

/**
 * Computes a uniform scale factor so strip content (max bottom extent ~810px)
 * always fits within the viewport height. Returns a value ≤ 1.
 */
function useVScale() {
  const TARGET_H = 840; // max(marginTop=350 + cardH=450) + 30px top-pad + 10px breath
  const [scale, setScale] = useState(() => Math.min(1, (window.innerHeight - 30) / TARGET_H));
  useEffect(() => {
    const update = () => setScale(Math.min(1, (window.innerHeight - 30) / TARGET_H));
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

const projects = [
  {
    title: "Uber",
    year: "2025",
    image: "/images/case-studies/uber/uber.gif",
    imageStyle: { objectPosition: "center center" },
    description: "Surfacing pricing insights to help consumers understand grocery value on Uber Eats.",
    meta: [
      { label: "Timeline", value: "May - August 2025" },
      { label: "Role", value: "Product Design" },
      { label: "Org", value: "Uber Eats\nGrocery and\nRetail Team" },
      { label: "Tool", value: "Figma\nOrigami\ndScout" },
    ],
    caseStudy: [
      { type: "hero", image: "/images/case-studies/uber/uber.gif", height: "auto", heroAspect: "16 / 9" },
      {
        type: "two-column",
        layout: "stacked",
        leftHeading: "The Mission",
        leftBody: "Surfacing pricing insights to help consumers understand grocery value on\u00A0Uber\u00A0Eats.",
        rightBody: "As the sole design intern on Uber Eats' grocery and retail team in NYC, I had the opportunity to own the end-to-end design of a consumer-facing pricing\u00A0feature.\n\nWorking closely with engineers, product managers, and data analysts, I led early research and concept exploration, translated insights into interactive prototypes, and collaborated through engineering implementation to bring the work to\u00A0life.\n\nThe experience pushed me to think rigorously about how small design decisions shape the way millions of people perceive value — and left me deeply grateful for the PMs, engineers, and fellow designers who challenged and elevated my work every step of the\u00A0way.",
      },
      {
        type: "polaroid-spread",
        images: [
          { src: "https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/first-day_tzrxmp.jpg", name: "First Day at Uber!" },
          { src: "https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/team-breakfast_pqqfvw.jpg", name: "Design Team Breakfast" },
          { src: "https://res.cloudinary.com/dugdaifzh/image/upload/v1775165345/tech-social_rek0gh.jpg", name: "Uber Tech Social" },
        ],
      },
      {
        type: "text",
        locked: true,
        heading: "The Problem",
        body: "Consumers perceive groceries on Uber Eats as overpriced due to the lack of clear price\u00A0benchmarks.",
        subtext: "This perception creates a significant barrier to adoption and trust, even in cases where Uber Eats prices are aligned with or lower than\u00A0competitors.",
      },
      {
        type: "columns",
        locked: true,
        heading: "The Challenge",
        items: [
          { title: "Data Accuracy &\u00A0Availability", description: "Price comparisons depend on real-time and historical data across multiple\u00A0stores." },
          { title: "Brand\u00A0Transparency", description: "We couldn't legally show many of the brands name and logo, making it challenging to show\u00A0comparison." },
          { title: "UI Real Estate &\u00A0Density", description: "Adding a \"Low Price\" or \"Great Price\" badge had to be visually lightweight but still\u00A0noticeable." },
          { title: "Market Regional\u00A0Differences", description: "Insights had to scale across different\u00A0marketplaces." },
        ],
      },
      {
        type: "two-column-video",
        locked: true,
        leftHeading: "The Solution",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145424/slow-final_eblntl.mp4",
        rightHeading: "Surface market comparison features to help consumers confidently recognize\u00A0value.",
        rightBody: "By highlighting when an item is priced lower than usual or compared to nearby stores, the feature reduces second-guessing, builds trust, and supports smarter\u00A0decision-making.",
      },
      {
        type: "framework-cards",
        locked: true,
        heading: "Messaging Framework",
        body: "Messaging framework was the biggest\u00A0challenge.",
        subtext: "I collaborated with content design to refine terminology like Low Price and Great Price so they felt clear and trustworthy, while also helping define which pricing strategies users actually wanted to see. Through multiple rounds of testing and iteration, we created a framework that paired the right message with the right logic that users wanted to see when comparing\u00A0prices.",
        cards: [
          {
            title: "Historical Store Comparison",
            subtitle: "Same Item, Same Store",
            badge: "Great Price",
            badgeColor: "#1B8C4E",
            messages: [
              "Lowest price in X amount of\u00A0days.",
              "Item lower than average price in the past X\u00A0days.",
            ],
          },
          {
            title: "Market Comparison",
            subtitle: "Same Item, Different Store",
            badge: "Low Price",
            badgeColor: "#1B8C4E",
            messages: [
              "Lowest price compared to stores\u00A0nearby.",
              "X% cheaper than average price of stores\u00A0nearby.",
            ],
          },
        ],
      },
      {
        type: "concept-collage",
        locked: true,
        heading: "Develop Concept",
        body: "Two price insights, two concept models and each required distinct design\u00A0approaches.",
        subtext: "Early in the process, we defined two key messaging pillars: \"Low Price\", which highlighted items cheaper than nearby stores, and \"Great Price\", which surfaced products priced lower than usual. While the underlying goal was the same — to build trust and drive purchases through price transparency. We realized that each message represented a different user mindset. This led us to design two distinct concepts with tailored data visualizations: one that compared across locations, and one that compared across\u00A0time.",
        images: [
          { src: "/images/case-studies/uber/concept/1234.png", name: "User Flow Overview" },
          { src: "/images/case-studies/uber/concept/group-16.png", name: "Flow Detail" },
          { src: "/images/case-studies/uber/concept/3.png", name: "Price Comparison" },
          { src: "/images/case-studies/uber/concept/6.png", name: "Market View" },
          { src: "/images/case-studies/uber/concept/7.png", name: "Historical View" },
          { src: "/images/case-studies/uber/concept/8.png", name: "Price Insight" },
          { src: "https://res.cloudinary.com/dugdaifzh/image/upload/v1775165498/5_jftcuc.png", name: "Concepts", desktopOnly: true },
          { src: "https://res.cloudinary.com/dugdaifzh/image/upload/v1775165498/2_gxkkgu.png", name: "Concepts", desktopOnly: true },
        ],
      },
      {
        type: "two-column-video",
        locked: true,
        leftHeading: "Adding Motion",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145421/vid_d8zz1c.mp4",
        videoSide: "right",
        videoFrame: true,
        videoRadius: 12,
        rightHeading: "After validation, delightful UX was introduced through\u00A0animations.",
        rightBody: "Subtle animations created moments of delight while staying functional. Balancing clarity with a click glance for a seamless shopping\u00A0experience.",
      },
      {
        type: "two-column-video",
        locked: true,
        leftHeading: "How It Works",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145421/uberfinal_qmqq7l.mp4",
        videoFrame: true,
        videoRadius: 12,
        rightHeading: "Compare your grocery prices with other stores within your\u00A0vicinity.",
        rightBody: "The final designs introduce market comparison, allowing users to see how Uber Eats grocery prices stack up against nearby stores — tackling the perception of higher costs, building trust, and encouraging more confident purchasing\u00A0decisions.",
      },
      {
        type: "reflection",
        locked: true,
        heading: "Reflection",
        cards: [
          {
            icon: "/images/shared/icons/icon-growth-black.png",
            iconDark: "/images/shared/icons/icon-growth.png",
            title: "Growth in\u00A0design",
            points: [
              "Learned to navigate ambiguity and ask questions early\u00A0on.",
              "Thinking through all the contexts and use cases across different product categories, made our design solution\u00A0stronger.",
            ],
          },
          {
            icon: "/images/shared/icons/icon-collab-black.png",
            iconDark: "/images/shared/icons/icon-collab.png",
            title: "Collaborating with cross-functional\u00A0teams",
            points: [
              "Design ideas can come from early Jam sessions with cross-functional partners, not just design\u00A0partners.",
              "Use quick mock-ups to explore trade-offs in real time when communicating with cross-functional\u00A0teams.",
            ],
          },
          {
            icon: "/images/shared/icons/icon-advocate-black.png",
            iconDark: "/images/shared/icons/icon-advocate.png",
            title: "Advocating for\u00A0myself",
            points: [
              "Continuing to check in after handoff and speaking up when something feels off, to ensure the final product stays true to the design\u00A0vision.",
              "Standing by my design decisions with clear reasoning, while staying open to feedback and new\u00A0perspectives.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Dandi",
    year: "2026",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775146464/hero_ty418e.mp4",
    description: "A bio-smart ear cuff and companion app for PCOS.",
    meta: [
      { label: "Timeline", value: "March 7 - 9, 2026" },
      { label: "Role", value: "Product Designer\nVideo Editor\nProduct Builder" },
      { label: "Team Members", value: "Beverly Yip\nJackie Nam\nJenn Choi" },
      { label: "Award", value: "FigBuild 2026 Winner\nMost Impact" },
    ],
    caseStudy: [
      { type: "hero", video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775146464/hero_ty418e.mp4", height: "auto", heroAspect: "16 / 9" },
      {
        type: "persona",
        heading: "The Problem",
        body: "Jackie has always had irregular periods, stubborn acne, and a little extra hair where she didn\u2019t want\u00A0it. She sensed something was wrong but assumed, \"This is just how my body\u00A0is.\"",
        images: [
          { light: "/images/case-studies/dandi/persona-painpoints/dark-1.png", dark: "/images/case-studies/dandi/persona-painpoints/light-1.png" },
          { light: "/images/case-studies/dandi/persona-painpoints/dark-2.png", dark: "/images/case-studies/dandi/persona-painpoints/light-2.png" },
          { light: "/images/case-studies/dandi/persona-painpoints/dark-3.png", dark: "/images/case-studies/dandi/persona-painpoints/light-3.png" },
        ],
        flower: {
          light: "/images/case-studies/dandi/flower/light.png",
          dark: "/images/case-studies/dandi/flower/dark.png",
          heading: "It wasn\u2019t until a routine checkup that a doctor mentioned PCOS almost in passing, handed her a pamphlet, and sent her on her\u00A0way.",
          text: "She left with a diagnosis but still no real understanding of what it meant or why she had been feeling this way her whole\u00A0life.",
        },
      },
      {
        type: "stats",
        heading: "The Research",
        cards: [
          {
            bg: "/images/case-studies/dandi/stats/stats-bg-1.png",
            bgStyle: { width: 696, height: 705, left: -135, top: -124 },
            illustration: "/images/case-studies/dandi/stats/stats-illus-1.png",
            illustrationStyle: { width: 206, height: 230, left: 88, top: 78 },
            text: "As of 2021, there are approximately <strong>65.77\u00A0million women</strong> living with diagnosed and undiagnosed PCOS.",
          },
          {
            bg: "/images/case-studies/dandi/stats/stats-bg-2.png",
            bgStyle: { width: 696, height: 705, left: -122, top: -11 },
            illustration: "/images/case-studies/dandi/stats/stats-illus-2.png",
            illustrationStyle: { width: 241, height: 227, left: 70, top: 52 },
            text: "<strong>70% of women</strong> with PCOS have insulin resistance and don\u2019t know it.",
          },
          {
            bg: "/images/case-studies/dandi/stats/stats-bg-3.png",
            bgStyle: { width: 696, height: 705, left: -187, top: -102 },
            illustration: "/images/case-studies/dandi/stats/stats-illus-3.png",
            illustrationStyle: { width: 237, height: 237, left: 72, top: 74 },
            text: "<strong>1 in 2 women</strong> see 3+ doctors before ever getting a diagnosis.",
          },
        ],
      },
      { type: "text", heading: "The Solution" },
      {
        type: "solution-cards",
        timelineHidden: true,
        marginTop: -80,
        decorImages: [
          { src: "/images/case-studies/dandi/solution/solution-green-flower.png", style: { width: 202, height: 217, left: 195, top: -86 } },
          { src: "/images/case-studies/dandi/solution/solution-flower3.png", style: { width: 362, height: 248, left: -24, top: 384 } },
        ],
        items: [
          "Have exactly what her body needs <strong>delivered instantly</strong>",
          "See every <strong>hormone, stress level, and sleep</strong> pattern in one\u00A0place",
          "<strong>Track her glucose levels</strong> and know what\u2019s been missing all\u00A0along",
        ],
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Your Supplements, Delivered\u00A0Hands-Free",
        body: "Dandi reads your body and delivers what it needs. No pills. No\u00A0thinking.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145393/connect_1_yh0zzl.mp4",
        mobileVideoBg: "#f4e7d8",
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Care that Adapts to\u00A0You",
        body: "AI assistant that learns your body\u2019s patterns and adjusts your supplement schedule in real\u00A0time.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145397/realtime-data_lxx93f.mp4",
        mobileVideoBg: "#eef2f8",
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "You\u2019re Not\u00A0Alone",
        body: "Connect with your community, get expert-backed answers, and find support for what you\u2019re going\u00A0through.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145396/community_vclcws.mp4",
        mobileVideoBg: "#f5ede8",
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Share With Your\u00A0Provider",
        body: "All of your health data shared, walk into an appointment backed with evidence instead of \u201CI just feel\u00A0off.\u201D",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145392/share_qkgfln.mp4",
        mobileVideoBg: "#eaf3ee",
      },
      {
        type: "safeguards",
        heading: "Safeguards & Considerations",
        items: [
          {
            question: "Her body, her data. No exceptions",
            answer: "All health data is encrypted and stored locally on her device by\u00A0default.",
            image: "/images/case-studies/dandi/safeguards/high-five.png",
            imagePosition: "right",
          },
          {
            question: "What if someone pressures her to wear it or share her\u00A0data?",
            answer: "Hidden gesture silently disables all features. Nothing leaves the device without her explicit\u00A0action.",
            image: "/images/case-studies/dandi/safeguards/shield.png",
            imagePosition: "left",
          },
          {
            question: "What if something goes wrong mid-dose?",
            answer: "Allergy screening at onboarding, intentional \"slide to administer\" gesture, and a 3 doses/day firmware limit that can\u2019t be\u00A0overridden.",
            image: "/images/case-studies/dandi/safeguards/hugging.png",
            imagePosition: "right",
          },
          {
            question: "What if tracking becomes its own source of\u00A0anxiety?",
            answer: "Patterns are only surfaced after enough data to be meaningful. No premature labels, no calories, no\u00A0weight.",
            image: "/images/case-studies/dandi/safeguards/flower-hand.png",
            imagePosition: "left",
          },
        ],
      },
      {
        type: "text",
        heading: "The Result",
        body: "Won Most Impact at FigBuild\u00A02026",
        subtext: "Out of 680 projects and 2184 participants, we were one of the 13 winners to win. The judges praised our highly researched and impactful\u00A0solution.",
        image: "/images/case-studies/dandi/won.png",
      },
      {
        type: "what-if",
        heading: "Reflection",
        title: "",
        items: [
          "Building at the intersection of feminine technology, biosensing hardware, and UX forced us to confront how little mainstream health tech centers the female\u00A0body.",
          "We learned that trust is a major design challenge, especially for users who have often felt dismissed by medical\u00A0systems.",
          "Designing for empathy and clarity became just as important as the technology\u00A0itself.",
        ],
      },
      { type: "image", image: "/images/case-studies/dandi/process.png", timelineHidden: true, marginTop: 30 },
      {
        type: "try-it",
        heading: "Try It",
        label: "Try Dandi Out",
        url: "https://figbuild-2026-dandi.vercel.app/",
      },
      {
        type: "video-embed",
        heading: "Video Demo",
        url: "https://www.youtube.com/embed/ARy32Mv2iKg",
      },
    ],
  },
  {
    title: "Lume",
    year: "2025",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145474/lume-card_sftzqm.mp4",
    imageStyle: { objectPosition: "center 40%" },
    description: "Helping fashion designers gain visibility and reach the right audience organically.",
    meta: [
      { label: "Timeline", value: "January - February 2025" },
      { label: "Role", value: "Product Designer\nUX Researcher" },
      { label: "Team Member", value: "Michelle Xu" },
      { label: "Tool", value: "Figma\nFigJam" },
    ],
    caseStudy: [
      { type: "hero", video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145445/hero_ht0jkz.mp4", height: "auto", heroAspect: "16 / 9" },
      { type: "text", heading: "The Problem", body: "Finding the right audience is hard\u2026", subtext: "Independent fashion designers struggle to gain visibility in a saturated market and without the same resources, marketing power, or established platforms as larger brands, their work often goes unseen by potential\u00A0customers." },
      {
        type: "stats",
        grid: true,
        timelineHidden: true,
        marginTop: -80,
        stats: [
          { number: "90%", text: "of new brands fail within the first five years due to lack of visibility and customer engagement. (Forbes.com)", color: "#FF522A" },
          { number: "85%", text: "of fashion shoppers rely on visual platforms for style inspiration (arinside.co)", color: "#FF522A" },
          { number: "70%", text: "of online shoppers are more likely to purchase brands they discover through curated recommendations. (Mckinsey.com)", color: "#FF522A" },
        ],
      },
      {
        type: "text",
        heading: "The Research",
        body: "What has been the hardest part about growing your brand or reaching your\u00A0audience?",
        subtext: "Independent designers struggle most with discoverability and platform barriers. On major marketplaces like Etsy and Shopify, designers feel \u201Cburied\u201D without paying for ads, and these platforms\u2019 high commissions and pay-to-be-seen models discourage scaling and undermine independent creators\u2019\u00A0autonomy.",
      },
      {
        type: "two-column",
        timelineHidden: true,
        marginTop: -80,
        leftImage: "/images/case-studies/lume/assets/research-interview.png",
        rightHeading: "80%",
        rightBody: "of independent designers say getting discovered is their biggest challenge when starting\u00A0out.",
      },
      {
        type: "insight-cards",
        timelineHidden: true,
        marginTop: -80,
        title: "More Specifically...",
        cards: [
          {
            title: "Visibility Gap",
            body: "Designers feel lost in mainstream platforms where algorithms prioritize large brands.",
            icon: "/visibility.png",
          },
          {
            title: "Community & Support",
            body: "Like platforms that feel curated and intentional.",
            icon: "/images/case-studies/lume/assets/community-icon.png",
          },
          {
            title: "Performance Insight",
            body: "Designers often lack visibility into how their work is being received.",
            icon: "/images/case-studies/lume/assets/lightbulb-icon.png",
          },
        ],
      },
      {
        type: "persona-cards",
        heading: "Personas",
        cards: [
          {
            image: "/images/case-studies/lume/personas/seller.png",
            name: "Mariko Toguchi",
            role: "Seller",
            details: "27 Years Old\nApparel Designer\nNew York, NY",
            pointsLabel: "Frustrations",
            points: [
              "Hard to gain visibility without paid ads due to weak organic discovery and limited exposure.",
              "Difficult to express her brand due to little performance insight into how the brand is actually doing.",
              "Feels like her brand hasn\u2019t grown even though she consistently puts good work out.",
            ],
          },
          {
            image: "/images/case-studies/lume/personas/buyer.png",
            name: "Aiden Park",
            role: "Buyer",
            details: "24 Years Old\nFashion Enthusiast\nLos Angeles, CA",
            pointsLabel: "Frustrations",
            points: [
              "Hard to discover unique, independent designers without sifting through mass-market brands.",
              "Wants to support small creators but doesn\u2019t know where to find them.",
              "Feels disconnected from the story behind the clothes he buys.",
            ],
          },
        ],
      },
      {
        type: "feature-grid",
        heading: "KEY FEATURES",
        kicker: "KEY FEATURES",
        introHeading: "Four capabilities shaped how Lume supports designers and\u00A0shoppers.",
        introBody:
          "From Mariko and Aiden\u2019s pain points I landed on core features: a social feed for tagging designers, performance metrics for sellers, stylized keyword discovery, and moodboards so exploration feels fun and personal—the foundation of Lume\u2019s\u00A0experience.",
        cards: [
          {
            title: "Search with stylized themes",
            body: "Categorize pieces by aesthetic, mood, or silhouette.",
          },
          {
            title: "Shop, Post & Tag Designers",
            body: "Post outfits, tag designers, and find inspiration through a social feed.",
          },
          {
            title: "Introduce Moodboards",
            body: "Encourage playful exploration by allowing shared style creation.",
          },
          {
            title: "Performance Insights",
            body: "Give clear metrics on how a brand is growing.",
          },
        ],
      },
      { type: "text", heading: "The Solution" },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -80,
        heading: "Easily discover designers from style\u00A0tags.",
        body: "Filter and narrow through by material, color, or concept to find niche and aligned styles. For You works like a social media feed \u2014 post your outfits, tag your designers and explore\u00A0styles.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145443/style-tags_shj4sm.mp4",
        mobileVideoBg: "#f5ede8",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Post your style creation and tag\u00A0designers.",
        body: "Post your style creations, tag designers and stylized keywords for easier searching. A social media feed to explore and get\u00A0inspired.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145439/post_vhzfwl.mp4",
        mobileVideoBg: "#f0ece8",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Create moodboards and get\u00A0inspired.",
        body: "Turn inspiration into action with shoppable, style-matched suggestions. Create custom moodboards and pin your favorite pieces to organize and share your style\u00A0vision.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145436/moodboard_u5ts0q.mp4",
        mobileVideoBg: "#ede8f0",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -35,
        heading: "Simplify sales and track\u00A0performances.",
        body: "Monitor orders and revenue in real-time, identify your best-selling styles at a glance and get insights to improve and grow your\u00A0brand.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145432/insights_oyq156.mp4",
        mobileVideoBg: "#e8edf0",
        mobileMarginTop: 0,
      },
      {
        type: "text",
        heading: "Validating",
        body: "After testing with 16 users, they found the app to be curated and designed for\u00A0creatives.",
        subtext: "One designer noted, \u201CThis is the first time I\u2019ve felt a platform actually supports my brand, not just my products.\u201D Another emphasized, \u201CEverything feels intentional. It doesn\u2019t overwhelm me, but it still feels creative.\u201D Shoppers were particularly enthusiastic about the moodboards, with one saying, \u201CI\u2019d use this just for the moodboards alone. They\u2019re like Pinterest, but\u00A0shoppable.\u201D",
      },
      {
        type: "text",
        marginTop: -80,
        heading: "Reflection",
        body: "Scope down to go\u00A0deep",
        subtext: "Designing for everyone diluted the experience\u2014so I narrowed Lume\u2019s focus to fashion designers. This shift allowed me to build features that truly matter: brand storytelling tools, inventory tracking, and visual merchandising. Focusing on one creative field made the platform more intentional, impactful, and\u00A0tailored.",
      },
      {
        type: "text",
        marginTop: -80,
        heading: "Next Steps",
        body: "Personalize, polish, and\u00A0test",
        subtext: "My next steps for Lume are to integrate more personalization tools, perfect the UI for a smoother user experience, and expand user testing to gather deeper insights. These improvements will help ensure the platform feels truly tailored to both designers and shoppers, setting the stage for stronger engagement and future\u00A0growth.",
      },
    ],
  },
  {
    title: "Flow-Fi",
    year: "2025",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145461/flowfi_xv31eg.mp4",
    imageStyle: { objectPosition: "center center" },
    description: "AI-powered DeFi platform that automates liquidity management.",
    meta: [
      { label: "Timeline", value: "24 Hours" },
      { label: "Role", value: "Lead Product Designer" },
      { label: "Team Member", value: "Michelle Xu\nBeverly Yip\nJenn Choi" },
      { label: "Tool", value: "Spline\nFigma" },
    ],
    caseStudy: [
      { type: "hero", video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145415/Flowfi_1_sfj20o.mp4", height: "auto", heroAspect: "16 / 9" },
      { type: "text", heading: "The Problem", body: "DeFi users struggle with complex platforms and manual capital management, leading to costly mistakes and missed\u00A0opportunities.", subtext: "Managing liquidity across multiple protocols requires constant monitoring, rebalancing, and risk assessment\u2014tasks that are time-consuming and error-prone. Even experienced users often face impermanent loss, inefficient capital allocation, or missed yield opportunities due to the manual nature of the\u00A0process." },
      { type: "text", heading: "The Challenge" },
      { type: "image", image: "https://res.cloudinary.com/dugdaifzh/image/upload/q_auto,f_auto/v1775145412/keychallenges_gbcpmt.png", timelineHidden: true, marginTop: -80 },
      { type: "text", heading: "The Solution", body: "Flow-Fi automates the entire process. An AI agent handles rebalancing and capital allocation in real time, so users never have\u00A0to." },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -80,
        heading: "A landing page built to convert Flow-Fi\u2019s Web3-native design leads with\u00A0clarity",
        body: "A clean, futuristic interface with two focused CTAs that get users oriented and moving fast, without overwhelming them on\u00A0arrival.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145415/Flowfi_1_sfj20o.mp4",
        mobileVideoBg: "#e8ecf5",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -48,
        heading: "Onboarding built for\u00A0first-timers",
        body: "A guided tutorial and \u201CFirst-Time User\u201D mode breaks down DeFi jargon into plain language, walking new users through key concepts step by step. Investing feels approachable from the very first\u00A0tap.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145416/FlowfiOnboarding_rzgsgl.mp4",
        mobileVideoBg: "#eaebf5",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -48,
        heading: "Personalized risk\u00A0preferences",
        body: "Users choose their own risk level \u2014 low, medium, or high \u2014 giving the AI a clear lens to optimize liquidity strategies in real time. It keeps users in control while letting the automation do the heavy\u00A0lifting.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145412/FlowfiPersonalizeRisk_lcbd0w.mp4",
        mobileVideoBg: "#ebebf5",
        mobileMarginTop: 0,
      },
      {
        type: "text-with-video",
        timelineHidden: true,
        marginTop: -48,
        heading: "AI-powered liquidity\u00A0recommendations",
        body: "Live market data from CoinGecko, Alchemy, and DeFi Llama is processed and surfaced as clear, actionable guidance \u2014 so users always know what\u2019s happening with their positions without needing to read raw pool\u00A0data.",
        video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145415/AIOptimizedFlowfi_v3m7ee.mp4",
        mobileVideoBg: "#e8eef5",
        mobileMarginTop: 0,
      },
      { type: "text", heading: "Next Steps", body: "Focus on deeper liquidity optimization, seamless automation, and more reliable data\u00A0integrations.", subtext: "We plan to explore more reliable API solutions to ensure seamless, accurate data fetching while continuing to refine the UI/UX for clearer insights into liquidity pools. Finally, we aim to expand AI-driven recommendations, empowering users with smarter, more personalized\u00A0decision-making." },
    ],
  },
  {
    title: "Hand Gesture Carousel",
    year: "2026",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145464/hands_nnhfnf.mp4",
    imageStyle: { objectPosition: "center 75%" },
    description: "Coded with Three.JS and React",
    externalUrl: "https://project21-zeta.vercel.app/",
    meta: [
      { label: "Timeline", value: "2025" },
      { label: "Role", value: "Product Design" },
    ],
    caseStudy: [],
  },
  {
    title: "Liquid Glass Cursor",
    year: "2025",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145464/project-4_wmxpf4.mp4",
    imageStyle: { objectPosition: "center center" },
    externalUrl: "https://refractionlens-sb1g.vercel.app/",
    description: "Coded with React Three Fiber",
    meta: [
      { label: "Timeline", value: "2025" },
      { label: "Role", value: "Product Design" },
    ],
    caseStudy: [
      { type: "hero", image: "/images/case-studies/flow-fi/hero.jpg", height: "auto", heroAspect: "16 / 9" },
      { type: "text", heading: "Overview", body: "Case study content coming soon." },
    ],
  },
  {
    title: "Digital Inspo Diary",
    year: "2026",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145470/inspo_xyejpx.mp4",
    imageStyle: { objectPosition: "center center" },
    externalUrl: "https://queenieinspo.com/",
    description: "Try it out at queenieinspo.com",
    meta: [
      { label: "Timeline", value: "2025" },
      { label: "Role", value: "Product Design" },
    ],
    caseStudy: [
      { type: "hero", image: "/images/case-studies/flow-fi/hero.jpg", height: "auto", heroAspect: "16 / 9" },
      { type: "text", heading: "Overview", body: "Case study content coming soon." },
    ],
  },
  {
    title: "Gravity Letters",
    year: "2025",
    video: "https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145465/gravity_kruj0k.mp4",
    imageStyle: { objectPosition: "center center" },
    externalUrl: "https://day15new.vercel.app/",
    description: "Coded with Three.JS",
    meta: [
      { label: "Timeline", value: "2025" },
      { label: "Role", value: "Product Design" },
    ],
    caseStudy: [
      { type: "hero", image: "/images/case-studies/flow-fi/hero.jpg", height: "auto", heroAspect: "16 / 9" },
      { type: "text", heading: "Overview", body: "Case study content coming soon." },
    ],
  },
];

function LazyVideo({ src, className, style, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      src={src}
      preload="auto"
      {...props}
    />
  );
}

const navLinks = ["home", "projects", "play", "about"];

const ease = [0.22, 1, 0.36, 1];

function Navbar({ darkMode, onToggleDark }) {
  return (
    <motion.nav
      className="w-full flex items-center justify-between overflow-visible"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.85, ease }}
    >
      <motion.p
        className="font-normal text-lg tracking-[-0.36px] leading-[1.2] cursor-none"
        style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#666", transition: "color 0.2s ease", fontFamily: "'Tilt Warp', sans-serif" }}
        whileHover={{ color: darkMode ? "white" : "black" }}
        transition={{ duration: 0.2 }}
      >
        QUEENIE HSIAO
      </motion.p>
      <div className="flex items-center gap-2">
        <motion.div
          className="absolute top-[-55px] pointer-events-none"
          style={{ right: "0px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
        >
          <LampImage
            darkMode={darkMode}
            className="h-[450px] w-auto"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6, ease }}
          style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, pointerEvents: "none" }}
        >
          <PullString
            darkMode={darkMode}
            onPull={onToggleDark}
            style={{
              position: "absolute",
              top: "330px",
              right: "570px",
              zIndex: 51,
              overflow: "visible",
              pointerEvents: "auto",
            }}
          />
        </motion.div>
        {navLinks.map((link, i) => (
          <motion.a
            key={link}
            href={`#${link}`}
            className="text-lg tracking-[-0.36px] leading-[1.2] px-2 py-1 relative no-underline flex items-center justify-center w-[70px]"
            style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#666", transition: "color 0.2s ease" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.08,
              ease,
            }}
            whileHover={{ color: darkMode ? "white" : "black" }}
          >
            {link}
          </motion.a>
        ))}
        </div>
    </motion.nav>
  );
}

const navStyles = [
  { width: 225, rotate: -10 },
  { width: 220, rotate: -8 },
  { width: 240, rotate: -2 },
  { width: 210, rotate: 8 },
];

function HorizontalNavLinks({ darkMode, skipIntro = false }) {
  const borderColor = darkMode ? "white" : "black";
  return (
    <div className="relative mt-4" style={{ width: 260, height: 260 }}>
      {navLinks.map((link, i) => {
        const centerY = 120;
        const finalY = i * 50;
        return (
          <motion.a
            key={link}
            href={`#${link}`}
            onClick={(e) => {
              e.preventDefault();
              history.replaceState(null, "", `${window.location.pathname}#${link}`);
              window.dispatchEvent(new HashChangeEvent("hashchange"));
            }}
            className="text-[16px] font-bold tracking-[-0.32px] leading-[1.4] no-underline flex items-center justify-center absolute"
            style={{
              backgroundColor: darkMode ? "#0F0F0F" : "#F7F7F7",
              border: `2px dashed ${borderColor}`,
              width: navStyles[i].width,
              padding: "8px 0",
              left: 0,
              transformOrigin: "center center",
            }}
            initial={
              skipIntro
                ? {
                    opacity: 1,
                    top: finalY,
                    rotate: navStyles[i].rotate,
                    color: darkMode ? "white" : "black",
                  }
                : {
                    opacity: 0,
                    top: centerY,
                    rotate: 0,
                    color: darkMode ? "white" : "black",
                  }
            }
            animate={{
              opacity: 1,
              top: finalY,
              rotate: navStyles[i].rotate,
              color: darkMode ? "white" : "black",
            }}
            transition={skipIntro ? { duration: 0 } : { duration: 0.65, delay: 0.1, ease }}
            whileHover={{ color: "#0055FF" }}
          >
            {link}
          </motion.a>
        );
      })}
    </div>
  );
}

/** Top ruler: lives in the flex-column flow above the scroll container. Tick strip slides with scroll. */
function StickyTopRuler({ darkMode, scrollRef, skipIntro = false }) {
  const innerRef = useRef(null);
  useEffect(() => {
    const container = scrollRef?.current;
    if (!container) return;
    const onScroll = () => {
      if (innerRef.current) innerRef.current.style.transform = `translateX(-${container.scrollLeft}px)`;
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [scrollRef]);

  const W = typeof window !== "undefined" ? window.innerWidth : 1440;
  const totalWidth = Math.max(W * 20, 30000);
  const tickSpacing = 10;
  const tickCount = Math.ceil(totalWidth / tickSpacing);
  const color = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const labelColor = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  return (
    <div className="w-full shrink-0 pointer-events-none overflow-hidden" style={{ height: 32, zIndex: 10, position: "relative" }}>
      <motion.div
        ref={innerRef}
        style={{ width: totalWidth, height: "100%", position: "absolute", top: 0, left: 0, transformOrigin: "left top" }}
        initial={skipIntro ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={skipIntro ? { duration: 0 } : { duration: 1.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: tickCount + 1 }, (_, i) => {
          const x = i * tickSpacing;
          const isMajor = i % 10 === 0;
          const isMid = i % 5 === 0 && !isMajor;
          const h = isMajor ? 18 : isMid ? 12 : 6;
          return (
            <div key={i} className="absolute" style={{ left: x, top: 0 }}>
              <div style={{ width: 1, height: h, backgroundColor: color }} />
              {isMajor && (
                <span className="absolute text-[9px]" style={{ top: h + 1, left: 2, color: labelColor, fontFamily: "'SF Mono','Menlo',monospace", whiteSpace: "nowrap", lineHeight: 1 }}>
                  {x}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

/** Left ruler: normal flex item at the start of scroll content — scrolls away as you scroll right. */
function StickyLeftRuler({ darkMode, skipIntro = false }) {
  const tickSpacing = 10;
  const H = typeof window !== "undefined" ? window.innerHeight : 900;
  const tickCount = Math.ceil(H / tickSpacing);
  const color = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const labelColor = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
  return (
    <div
      className="shrink-0 pointer-events-none relative"
      style={{ width: 32, height: "100%", zIndex: 10, alignSelf: "stretch" }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformOrigin: "left top" }}
        initial={skipIntro ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={skipIntro ? { duration: 0 } : { duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {Array.from({ length: tickCount + 1 }, (_, i) => {
          const y = i * tickSpacing;
          const isMajor = i % 10 === 0;
          const isMid = i % 5 === 0 && !isMajor;
          const w = isMajor ? 18 : isMid ? 12 : 6;
          return (
            <div key={i} className="absolute" style={{ top: y, left: 0 }}>
              <div style={{ height: 1, width: w, backgroundColor: color }} />
              {isMajor && (
                <span className="absolute text-[8px]" style={{ left: w + 2, top: 2, color: labelColor, whiteSpace: "nowrap", fontFamily: "'SF Mono','Menlo',monospace" }}>
                  {i}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function RulerMarks({ darkMode, totalWidth, skipIntro = false }) {
  const tickSpacing = 10;
  // Always cover at least the scroll content width
  const effectiveWidth = Math.max(totalWidth, typeof window !== "undefined" ? window.innerWidth : 1440);
  const tickCount = Math.ceil(effectiveWidth / tickSpacing);
  const color = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const labelColor = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";

  const verticalTickCount = Math.ceil(900 / tickSpacing);
  const rulerTransition = skipIntro
    ? { duration: 0 }
    : { duration: 1.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] };
  return (
    <>
      <div className="absolute top-0 left-0 pointer-events-none" style={{ zIndex: 1, width: effectiveWidth, height: 32, overflow: "visible" }}>
        <motion.div
          className="h-full"
          style={{ width: effectiveWidth, transformOrigin: "left top" }}
          initial={skipIntro ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={rulerTransition}
        >
          {Array.from({ length: tickCount + 1 }, (_, i) => {
            const x = i * tickSpacing;
            const isMajor = i % 10 === 0;
            const isMid = i % 5 === 0 && !isMajor;
            const h = isMajor ? 18 : isMid ? 12 : 6;
            return (
              <div key={i} className="absolute" style={{ left: x, top: 0 }}>
                <div style={{ width: 1, height: h, backgroundColor: color }} />
                {isMajor && (
                  <span
                    className="absolute text-[8px]"
                    style={{ left: 3, top: h + 2, color: labelColor, whiteSpace: "nowrap", fontFamily: "'SF Mono', 'Menlo', monospace" }}
                  >
                    {i}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 pointer-events-none" style={{ zIndex: 1, width: 32, height: "100%", overflow: "visible" }}>
        <motion.div
          className="w-full"
          style={{ height: "100%", transformOrigin: "left top" }}
          initial={skipIntro ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={
            skipIntro
              ? { duration: 0 }
              : { duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {Array.from({ length: verticalTickCount + 1 }, (_, i) => {
            const y = i * tickSpacing;
            const isMajor = i % 10 === 0;
            const isMid = i % 5 === 0 && !isMajor;
            const w = isMajor ? 18 : isMid ? 12 : 6;
            return (
              <div key={i} className="absolute" style={{ top: y, left: 0 }}>
                <div style={{ height: 1, width: w, backgroundColor: color }} />
                {isMajor && (
                  <span
                    className="absolute text-[8px]"
                    style={{ left: w + 2, top: 2, color: labelColor, whiteSpace: "nowrap", fontFamily: "'SF Mono', 'Menlo', monospace" }}
                  >
                    {i}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </>
  );
}

function AnchorCorners({ darkMode }) {
  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.8)";
  const bgFill = darkMode ? "#1a1a1a" : "#F7F7F7";
  const s = 14;
  const o = -7;
  return (
    <>
      <div className="absolute" style={{ top: o, left: o, width: s, height: s, border: `2px solid ${borderColor}`, backgroundColor: bgFill, zIndex: 2 }} />
      <div className="absolute" style={{ top: o, right: o, width: s, height: s, border: `2px solid ${borderColor}`, backgroundColor: bgFill, zIndex: 2 }} />
      <div className="absolute" style={{ bottom: o, left: o, width: s, height: s, border: `2px solid ${borderColor}`, backgroundColor: bgFill, zIndex: 2 }} />
      <div className="absolute" style={{ bottom: o, right: o, width: s, height: s, border: `2px solid ${borderColor}`, backgroundColor: bgFill, zIndex: 2 }} />
    </>
  );
}

const bioLines = [
  "Product designer with a love for creative tools, tiny",
  "delightful moments, and bringing motion to life.",
  "Awarded by Figma, designing at Uber.",
];

function HeroSection({ darkMode }) {
  return (
    <section className="w-full flex flex-col gap-[60px] items-start">
      <p
        className="text-[32px] tracking-[-0.64px] leading-[1.4] w-[797px] max-w-full"
        style={{ color: darkMode ? "white" : "black", transition: "color 0.2s ease" }}
      >
        {bioLines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.6,
                delay: 0.7 + i * 0.08,
                ease,
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </p>

      <VectorTitle darkMode={darkMode} />

      <motion.div
        className="w-full flex justify-center mt-[-70px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease }}
      >
        <motion.svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12 4L12 20M12 20L5 13M12 20L19 13"
            stroke={darkMode ? "white" : "black"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: "stroke 0.2s ease" }}
          />
        </motion.svg>
      </motion.div>
      </section>
  );
}

function BusinessCardStack({ darkMode }) {
  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "black";
  const cardBg = darkMode ? "#1a1a1a" : "white";
  return (
    <div className="relative" style={{ width: 340, height: 240 }}>
      <div
        className="absolute"
        style={{
          width: 310, height: 190, top: 25, left: 20,
          backgroundColor: cardBg, border: `1.5px solid ${borderColor}`,
          transform: "rotate(-3deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 310, height: 190, top: 20, left: 25,
          backgroundColor: cardBg, border: `1.5px solid ${borderColor}`,
          transform: "rotate(7deg)",
        }}
      />
      <div
        className="absolute overflow-hidden"
        style={{
          width: 310, height: 190, top: 25, left: 30,
          backgroundColor: cardBg, border: `1.5px solid ${borderColor}`,
          transform: "rotate(-1.5deg)",
        }}
      >
        <div className="px-6 pt-3" style={{ marginTop: 6 }}>
          <p className="text-[7px] uppercase tracking-[0.1em] leading-[1.6]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>
            If you like my work, contact me!
          </p>
          <div className="flex gap-2" style={{ marginTop: "5px" }}>
            <a href="https://instagram.com/hsiao_archive" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill={darkMode ? "white" : "black"} stroke="none" /></svg>
            </a>
            <a href="https://x.com/queenie_hsiao" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill={darkMode ? "white" : "black"}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/queenie-hsiao/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M11 13v4m0-4c0-2 1.5-3 3.5-3S18 11 18 13v4" /><circle cx="7" cy="7" r="1" fill={darkMode ? "white" : "black"} stroke="none" /></svg>
            </a>
          </div>
          <a
            href="https://drive.google.com/file/d/1dxF8eWEmR0KLBCvMBKlGLBwY-DnP-jw8/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 text-[10px] hover:opacity-60 transition-opacity"
            style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#666", textDecoration: "underline" }}
          >
            Download Resume ↓
          </a>
          <a
            href="mailto:queenie2000824@gmail.com"
            className="block text-[10px] mt-0.5 underline underline-offset-[2px] hover:opacity-60 transition-opacity"
            style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "black" }}
          >
            queenie2000824@gmail.com
          </a>
        </div>
        <p
          className="absolute leading-[1]"
          style={{
            bottom: 10, left: 0, right: 0,
            padding: "0 20px 0 20px",
            fontSize: "clamp(60px, 25vw, 88px)",
            fontWeight: 300,
            color: "#05f",
            fontFamily: "'Mantou Sans', sans-serif",
            transform: "rotate(-0.8deg)",
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {"蕭書映".split("").map((ch, i) => <span key={i}>{ch}</span>)}
        </p>
      </div>
    </div>
  );
}

function HeroSectionHorizontal({ darkMode, skipIntro = false }) {
  const [vw, setVw] = useState(() => window.innerWidth);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const s = vw / 1800; // scale factor relative to design width (1800 → 0.8× at 1440px)

  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "black";
  const pathTransition = skipIntro
    ? { duration: 0 }
    : { duration: 0.6, delay: 1.2, ease };
  const cardTransition = (delay) =>
    skipIntro ? { duration: 0 } : { duration: 0.5, delay: 1.2 + delay, ease };
  const lineTransition = skipIntro
    ? { duration: 0 }
    : { duration: 0.7, delay: 1.2, ease };
  const cornerTransition = (ci) =>
    skipIntro ? { duration: 0 } : { duration: 0.3, delay: 1.4 + ci * 0.04, ease };
  const tagTransition = (delay) =>
    skipIntro ? { duration: 0 } : { duration: 0.5, delay: 0.55 + delay, ease };
  return (
    <div className="shrink-0 relative scroll-mt-0" style={{ width: "100vw", height: "100%" }}>
      {/* Canvas guide lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <line x1="50%" y1="0" x2="50%" y2="100%" stroke={darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" strokeDasharray="4 8" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke={darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth="1" strokeDasharray="4 8" />
        <line x1="25%" y1="0" x2="25%" y2="100%" stroke={darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} strokeWidth="1" strokeDasharray="2 12" />
        <line x1="75%" y1="0" x2="75%" y2="100%" stroke={darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} strokeWidth="1" strokeDasharray="2 12" />
        {/* Crosshair at center */}
        <circle cx="50%" cy="50%" r="4" fill="none" stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="1" />
        <line x1="calc(50% - 10)" y1="50%" x2="calc(50% + 10)" y2="50%" stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="1" />
        <line x1="50%" y1="calc(50% - 10)" x2="50%" y2="calc(50% + 10)" stroke={darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"} strokeWidth="1" />
          </svg>

      {/* Scattered dimension labels */}
      <span className="absolute pointer-events-none text-[9px]" style={{ top: "48%", left: "51%", color: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", fontFamily: "'SF Mono', 'Menlo', monospace" }}>1440 × 900</span>
      <span className="absolute pointer-events-none text-[8px]" style={{ top: 38, right: 60, color: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)", fontFamily: "'SF Mono', 'Menlo', monospace" }}>x: 1440</span>
      <span className="absolute pointer-events-none text-[8px]" style={{ bottom: 30, left: 35, color: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)", fontFamily: "'SF Mono', 'Menlo', monospace" }}>y: 900</span>

      {/* Small alignment crosshairs scattered */}
      {[{ x: "20%", y: "30%" }, { x: "80%", y: "25%" }, { x: "65%", y: "70%" }, { x: "35%", y: "75%" }].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: pos.x, top: pos.y }}>
          <div style={{ width: 8, height: 1, backgroundColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", position: "absolute", top: 0, left: -4 }} />
          <div style={{ width: 1, height: 8, backgroundColor: darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", position: "absolute", top: -4, left: 0 }} />
        </div>
      ))}

      <div className="fixed" style={{ top: Math.round(70 * s), left: Math.round(-50 * s), zIndex: 9999, transformOrigin: "top left", transform: `scale(${s * 1.1})` }}>
        <HorizontalNavLinks darkMode={darkMode} skipIntro={skipIntro} />
      </div>

      <div id="about-hero-card" className="absolute scroll-mt-0" style={{ left: Math.round(860 * s), top: Math.round(120 * s), zIndex: 10 }}>
        <div
          className="relative"
          style={{ width: 456, height: 312, padding: 10, transformOrigin: "top left", transform: `scale(${1.254 * s}) rotate(-3deg)` }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <motion.path
              d={`M 0 0 L 456 0 L 456 312`}
              fill="none"
              stroke={borderColor}
              strokeWidth="3"
              initial={skipIntro ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={pathTransition}
            />
            <motion.path
              d={`M 0 0 L 0 312 L 456 312`}
              fill="none"
              stroke={borderColor}
              strokeWidth="3"
              initial={skipIntro ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={lineTransition}
            />
          </svg>
          {[
            { top: 29, left: 24, rotate: -8, delay: 0.32 },
            { top: 31, left: 22, rotate: 8, delay: 0.52 },
            { top: 36, left: 26, rotate: -3, delay: 0.72 },
          ].map((card, ci) => (
            <motion.div
              key={ci}
              className="absolute overflow-hidden"
              style={{
                width: 396, height: 240, top: card.top, left: card.left,
                backgroundColor: darkMode ? "#1a1a1a" : "white",
                border: `1.5px solid ${borderColor}`,
              }}
              initial={skipIntro ? false : { opacity: 0, y: -40, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: card.rotate }}
              transition={cardTransition(card.delay)}
            >
              <div className="px-6 pt-3">
                <p className="text-[9px] uppercase tracking-[0.1em] leading-[1.6] mb-0" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999", marginTop: 16 }}>
                  If you like my work, contact me!
                </p>
                <div className="flex gap-2" style={{ marginTop: "7.2px" }}>
                  <a href="https://instagram.com/hsiao_archive" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill={darkMode ? "white" : "black"} stroke="none" /></svg>
                  </a>
                  <a href="https://x.com/queenie_hsiao" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={darkMode ? "white" : "black"}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/queenie-hsiao/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={darkMode ? "white" : "black"} strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M11 13v4m0-4c0-2 1.5-3 3.5-3S18 11 18 13v4" /><circle cx="7" cy="7" r="1" fill={darkMode ? "white" : "black"} stroke="none" /></svg>
                  </a>
                </div>
                <a
                  href="https://drive.google.com/file/d/1dxF8eWEmR0KLBCvMBKlGLBwY-DnP-jw8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-[13px] hover:opacity-60 transition-opacity"
                  style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#666", textDecoration: "underline" }}
                >
                  Download Resume ↓
                </a>
                <a
                  href="mailto:queenie2000824@gmail.com"
                  className="block text-[13px] mt-1 transition-colors duration-200"
                  style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "black" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#aaa"}
                  onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? "rgba(255,255,255,0.5)" : "black"}
                >
                  queenie2000824@gmail.com
                </a>
              </div>
              <p
                className="absolute leading-[1] pointer-events-none"
                style={{
                  bottom: 6, left: 0, right: 0,
                  textAlign: "center",
                  color: "#0055FF",
                  fontFamily: "'Mantou Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: 120,
                  transform: "rotate(-0.8deg)",
                  whiteSpace: "nowrap",
                }}
              >
                蕭書映
              </p>
            </motion.div>
          ))}
          {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, ci) => (
            <motion.span
              key={ci}
              className="absolute"
              style={{ ...pos, width: 12, height: 12, border: `1.5px solid ${borderColor}`, backgroundColor: darkMode ? "#0F0F0F" : "#F7F7F7", zIndex: 6 }}
              initial={skipIntro ? false : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={cornerTransition(ci)}
            />
          ))}
        </div>
      </div>

      {/* Text + VectorTitle stacked so text always sits directly above the name */}
      <div className="absolute left-[10px] bottom-[10px] pointer-events-none" style={{ width: "calc(100vw - 50px)" }}>
        <div
          style={{
            fontSize: "clamp(20px, 2.4vw, 40px)",
            lineHeight: 1.4,
            letterSpacing: "-0.03em",
            color: darkMode ? "white" : "black",
            transition: "color 0.2s ease",
            marginBottom: "0.5em",
            marginLeft: "30px",
          }}
        >
          <span className="block" style={{ padding: "4px 0", clipPath: "inset(-4px -8px)" }}>
            <motion.span
              className="block"
              initial={skipIntro ? false : { y: "120%" }}
              animate={{ y: "0%" }}
              transition={tagTransition(0.18)}
            >
              <span
                className="relative inline-block pointer-events-auto"
                style={{ backgroundColor: "#0055ff", color: "white", padding: "2px 6px", fontWeight: "bold" }}
              >
                I think, then I build.
                <motion.span className="absolute" initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tagTransition(0.18)} style={{ top: -5, left: -5, width: 10, height: 10, border: "1.5px solid black", backgroundColor: "#F7F7F7" }} />
                <motion.span className="absolute" initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tagTransition(0.18)} style={{ top: -5, right: -5, width: 10, height: 10, border: "1.5px solid black", backgroundColor: "#F7F7F7" }} />
                <motion.span className="absolute" initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tagTransition(0.18)} style={{ bottom: -5, left: -5, width: 10, height: 10, border: "1.5px solid black", backgroundColor: "#F7F7F7" }} />
                <motion.span className="absolute" initial={skipIntro ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={tagTransition(0.18)} style={{ bottom: -5, right: -5, width: 10, height: 10, border: "1.5px solid black", backgroundColor: "#F7F7F7" }} />
              </span>
            </motion.span>
          </span>
          <span className="block overflow-hidden" style={{ padding: "4px 0" }}>
            <motion.span
              className="block"
              initial={skipIntro ? false : { y: "120%" }}
              animate={{ y: "0%" }}
              transition={tagTransition(0.3)}
            >
              Awarded by Figma, designing at Uber.
            </motion.span>
          </span>
        </div>
        <div style={{ transform: "scale(0.98)", transformOrigin: "bottom left", pointerEvents: "auto" }}>
          <VectorTitle darkMode={darkMode} skipIntro={skipIntro} />
        </div>
      </div>

      <motion.div
        className="absolute flex items-center gap-2 pointer-events-none"
        style={{ right: Math.round(100 * s), bottom: Math.round(280 * s) }}
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[12px] tracking-[0.1em] uppercase" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontFamily: "'SF Mono', 'Menlo', monospace" }}>scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 5l7 7-7 7" stroke={darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
      </motion.div>

        </div>
  );
}

function ProjectCard({ project, index, darkMode, onClick }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.05, 1, 1.05]
  );

  return (
    <div className="w-[calc(50%-20px)] group" onClick={onClick}>
    <motion.div
      ref={cardRef}
      className="relative w-full h-[400px] 2xl:h-[480px] rounded-[19px] overflow-hidden cursor-none"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{
        duration: 0.45,
        delay: index % 2 === 0 ? 0 : 0.1,
        ease,
      }}
      whileHover={{ scale: 0.99 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: imageScale }}
      >
        {project.video ? (
          <LazyVideo
            className="w-full h-full object-cover"
            src={project.video}
            style={project.imageStyle}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            alt={project.title}
            className="w-full h-full object-cover"
            src={project.image}
            style={project.imageStyle}
          />
        )}
      </motion.div>

      {!project.externalUrl && !project.hidePill && (
        <motion.div
          className="absolute left-4 bottom-4 rounded-[93px] px-[18px] py-3 flex items-center gap-2 scale-[0.7] origin-bottom-left"
          style={{ backgroundColor: "white" }}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{
            duration: 0.3,
            delay: 0.15 + (index % 2 === 0 ? 0 : 0.1),
            ease,
          }}
        >
          <span
            className="text-2xl tracking-[-0.48px] leading-[1.2] font-medium"
            style={{ color: "black", fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {project.title}
          </span>
          <span className="w-[6px] h-[6px] rounded-full inline-block shrink-0 bg-black" />
          <span
            className="text-2xl text-[#676060] tracking-[-0.48px] leading-[1.2]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {project.year}
          </span>
        </motion.div>
      )}
    </motion.div>
    <p
      className="text-lg tracking-[-0.36px] leading-[1.4] mt-3 pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2"
      style={{ color: darkMode ? "rgba(255,255,255,0.5)" : "#999", fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {project.description}
      {project.externalUrl && (
        <>
          <span className="w-[6px] h-[6px] rounded-full inline-block shrink-0" style={{ backgroundColor: darkMode ? "white" : "black" }} />
          <span style={{ color: darkMode ? "white" : "black" }}>Try it Out!</span>
        </>
      )}
          </p>
        </div>
  );
}

function ProjectsGrid({ darkMode, onSelectProject }) {
  return (
    <section
      id="work"
      className="w-full flex flex-wrap gap-x-[20px] gap-y-[30px] items-start"
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} darkMode={darkMode} onClick={() => onSelectProject(project)} />
      ))}
      </section>
  );
}

const cardOffsets = [
  { top: 170, width: 700, marginLeft: 0 },
  { top: 320, width: 700, marginLeft: 0 },
  { top: 100, width: 700, marginLeft: 120 },
  { top: 300, width: 700, marginLeft: 120 },
  { top: 100, width: 700, marginLeft: 120 },
  { top: 230, width: 700, marginLeft: 120 },
  { top: 60, width: 700, marginLeft: 120 },
  { top: 350, width: 700, marginLeft: 120 },
];

/** Same outer dimensions as `HorizontalProjectCard` (`offset.width * 0.9` × `450`; widths are 700). */
const PROJECT_CARD_FRAME_W = 700 * 0.9;
const PROJECT_CARD_FRAME_H = 450;

/** 1.mp4 / 7.mp4 frames: drop in with horizontal scroll; dashed line pivots like a string. */
function HangingScrollVideo({
  src,
  darkMode,
  top,
  left,
  width,
  height,
  zIndex = 0,
}) {
  const border = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.8)";

  return (
    <div
      className="absolute"
      style={{ top, left, width, height, zIndex }}
    >
      <AnchorCorners darkMode={darkMode} />
      <div className="w-full h-full overflow-hidden" style={{ border: `2px solid ${border}` }}>
        <LazyVideo className="w-full h-full object-cover" src={src} autoPlay loop muted playsInline />
      </div>
    </div>
  );
}

function HorizontalProjectCard({
  project,
  index,
  darkMode,
  onClick,
  skipIntro = false,
  scrollContainerRef = null,
  vScale = 1,
}) {
  const offset = cardOffsets[index % cardOffsets.length];
  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.8)";
  const [hovered, setHovered] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const targetRef = useRef(null);
  const w = offset.width * 0.9 * vScale;
  const h = PROJECT_CARD_FRAME_H * vScale;

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef ?? undefined,
    target: targetRef,
    axis: "x",
    offset: ["start end", "end start"],
  });

  const scrollReveal = Boolean(scrollContainerRef) && !skipIntro;
  const scrollOpacity = useTransform(scrollXProgress, [0, 0.28], [0, 1]);
  const scrollX = useTransform(scrollXProgress, [0, 0.38], [56, 0]);

  return (
    <motion.div
      ref={targetRef}
      id={getProjectCardDomId(project.title)}
      className="shrink-0 cursor-pointer group relative"
      style={
        scrollReveal
          ? {
              width: w,
              marginTop: offset.top * vScale,
              marginLeft: (offset.marginLeft || 0) * vScale,
              willChange: animDone ? "auto" : "transform, opacity",
              opacity: scrollOpacity,
              x: scrollX,
            }
          : {
              width: w,
              marginTop: offset.top * vScale,
              marginLeft: (offset.marginLeft || 0) * vScale,
              willChange: animDone ? "auto" : "transform, opacity",
            }
      }
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={scrollReveal ? false : skipIntro ? false : { opacity: 0, x: 40 }}
      animate={scrollReveal ? undefined : { opacity: 1, x: 0 }}
      transition={
        scrollReveal ? undefined : skipIntro ? { duration: 0 } : { duration: 0.5, delay: 0.2 + index * 0.08, ease }
      }
      onAnimationComplete={() => setAnimDone(true)}
    >
      <span
        style={{ position: "absolute", fontSize: Math.round(12 * vScale), letterSpacing: "-0.32px", lineHeight: 1, top: Math.round(-18 * vScale), left: 8, color: darkMode ? "rgba(255,255,255,0.3)" : "#999" }}
      >
        Frame {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative w-full" style={{ height: h }}>
        {/* Static border - always visible */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: `2px solid ${borderColor}` }}
        />
        {/* Animated blue border - two paths growing from top-left */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 3 }}>
          {/* Top-left → top-right → bottom-right */}
          <path
            d={`M 1 1 L ${w - 1} 1 L ${w - 1} ${h - 1}`}
            fill="none"
            stroke="#0055FF"
            strokeWidth="2"
            strokeDasharray={w + h - 2}
            strokeDashoffset={hovered ? 0 : w + h - 2}
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
          {/* Top-left → bottom-left → bottom-right */}
          <path
            d={`M 1 1 L 1 ${h - 1} L ${w - 1} ${h - 1}`}
            fill="none"
            stroke="#0055FF"
            strokeWidth="2"
            strokeDasharray={w + h - 2}
            strokeDashoffset={hovered ? 0 : w + h - 2}
            style={{ transition: "stroke-dashoffset 1.2s ease" }}
          />
        </svg>
        {/* Corner squares */}
        {[{ top: -7, left: -7 }, { top: -7, right: -7 }, { bottom: -7, left: -7 }, { bottom: -7, right: -7 }].map((pos, i) => (
          <div
            key={i}
            className="absolute transition-all duration-300"
            style={{
              ...pos,
              width: 14,
              height: 14,
              border: `2px solid ${hovered ? "#0055FF" : borderColor}`,
              backgroundColor: darkMode ? "#1a1a1a" : "#F7F7F7",
              zIndex: 4,
            }}
          />
        ))}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ border: `2px solid transparent` }}
        >
          <div className="w-full" style={{ height: Math.round(350 * vScale) }}>
            {project.video ? (
              <LazyVideo
                className="w-full h-full object-cover"
                src={project.video}
                style={project.imageStyle}
                autoPlay loop muted playsInline
              />
            ) : (
              <img
                alt={project.title}
                className="w-full h-full object-cover"
                src={project.image}
                style={project.imageStyle}
              />
            )}
          </div>
          <div className="px-5 flex flex-col justify-center" style={{ height: Math.round(100 * vScale) }}>
            <div className="flex items-center gap-1">
              <span
                style={{ fontSize: Math.round(24 * vScale), letterSpacing: "-0.64px", lineHeight: 1.2, color: darkMode ? "white" : "black" }}
              >
                {project.title}
              </span>
              {project.year && (
                <>
                  <span
                    style={{ width: Math.round(4 * vScale), height: Math.round(4 * vScale), borderRadius: "50%", display: "inline-block", margin: `0 ${Math.round(4 * vScale)}px`, backgroundColor: darkMode ? "rgba(255,255,255,0.4)" : "#676767" }}
                  />
                  <span
                    style={{ fontSize: Math.round(24 * vScale), letterSpacing: "-0.64px", lineHeight: 1.2, color: darkMode ? "rgba(255,255,255,0.4)" : "#676767" }}
                  >
                    {project.year}
                  </span>
                </>
              )}
            </div>
            {project.description && (
              <p
                style={{ fontSize: Math.round(15 * vScale), letterSpacing: "-0.32px", lineHeight: 1.4, marginTop: Math.round(4 * vScale), color: darkMode ? "rgba(255,255,255,0.5)" : "black" }}
              >
                {project.description}
              </p>
            )}
          </div>
        </div>
        <div
          className="absolute flex items-center justify-center pointer-events-none transition-all duration-300"
          style={{
            bottom: -28,
            left: 0,
            right: 0,
            backgroundColor: "#0055FF",
            color: "white",
            fontSize: 11,
            fontFamily: "'SF Mono', 'Menlo', monospace",
            padding: "3px 8px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            width: "fit-content",
            margin: "0 auto",
            opacity: hovered ? 1 : 0,
            transform: `translateY(${hovered ? 0 : -4}px)`,
            zIndex: 5,
          }}
        >
          {Math.round(w)} × {h}
        </div>
      </div>
    </motion.div>
  );
}

function VerticalLine({ darkMode, height, style }) {
  return (
    <div
      className="shrink-0"
      style={{
        width: 1,
        height: height || 500,
        backgroundColor: darkMode ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)",
        alignSelf: "flex-start",
        ...style,
      }}
    />
  );
}

function SmallPhotoFrame({ darkMode, src, width, height, top, rotation }) {
  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.8)";
  return (
    <div
      className="shrink-0 relative"
      style={{ width, marginTop: top || 0, transform: rotation ? `rotate(${rotation}deg)` : undefined }}
    >
      <div
        className="relative overflow-hidden"
        style={{ width, height: height || 280, border: `2px solid ${borderColor}` }}
      >
        <AnchorCorners darkMode={darkMode} />
        {src ? (
          <img src={src} alt="" className="w-full h-full object-cover" style={{ padding: 6 }} />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: darkMode ? "#1a1a1a" : "#eee" }} />
        )}
      </div>
    </div>
  );
}


function FigJamPostIt({ rotate = -2, width = 420, scrollContainerRef, isMobile = false }) {
  const handleBackToHome = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className="shrink-0 relative"
      style={{
        width,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(2px 6px 16px rgba(0,0,0,0.10))",
      }}
    >
      <img
        src="/images/post it.png"
        alt="Post-it note"
        className="w-full h-auto pointer-events-none select-none"
        draggable={false}
      />
      {/* Email link overlay — positioned over "queenie2000824@gmail.com" */}
      <a
        href="mailto:queenie2000824@gmail.com"
        className="absolute"
        style={{
          top: "55%",
          left: "8%",
          width: "84%",
          height: "12%",
          cursor: "pointer",
          opacity: 0,
        }}
        aria-label="Email queenie2000824@gmail.com"
      />
      {/* Back to Home overlay — positioned over "BACK TO HOME." */}
      <button
        onClick={handleBackToHome}
        className="absolute"
        style={{
          top: "78%",
          left: "20%",
          width: "60%",
          height: "10%",
          cursor: "pointer",
          opacity: 0,
          background: "none",
          border: "none",
          padding: 0,
        }}
        aria-label="Back to home"
      />
    </div>
  );
}

/** Figma node 332:119 — purple frame + corner handles, four-panel about layout. */
const ABOUT_ACCENT_LIGHT = "#8a38f5";
const ABOUT_MUTED = "#676767";

/** Same corner geometry as HorizontalProjectCard: 14×14 @ ±7 so squares sit on the frame corners. */
function AboutFrameCorners({ accent, tl, tr, bl, br }) {
  const s = 14;
  const o = -7;
  const base = {
    position: "absolute",
    width: s,
    height: s,
    border: `2px solid ${accent}`,
    boxSizing: "border-box",
    pointerEvents: "none",
    zIndex: 4,
  };
  return (
    <>
      <div style={{ ...base, top: o, left: o, background: tl }} aria-hidden />
      <div style={{ ...base, top: o, right: o, background: tr }} aria-hidden />
      <div style={{ ...base, bottom: o, left: o, background: bl }} aria-hidden />
      <div style={{ ...base, bottom: o, right: o, background: br }} aria-hidden />
    </>
  );
}

function AboutPhotoPanel({ title, src, alt, accent, paper, darkMode, marginTop = 0, marginLeft = 0, zIndex = 0, vScale = 1 }) {
  /** Scaled-up frames (base 268px wide); height follows 644:429. */
  const w = Math.round(268 * 1.5 * vScale);
  const h = Math.round((644 / 429) * w);
  return (
    <div className="relative shrink-0" style={{ width: w, marginTop: marginTop * vScale, marginLeft: marginLeft * vScale, zIndex }}>
      <span
        className="absolute text-[12px] tracking-[-0.32px] leading-[1]"
        style={{ top: -18, left: 8, color: darkMode ? "rgba(255,255,255,0.3)" : "#999" }}
      >
        {title}
      </span>
      <div className="relative overflow-visible" style={{ width: w, height: h }}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            border: `2px solid ${accent}`,
            background: darkMode ? "#111" : "#fff",
          }}
        >
          <img src={src} alt={alt} className="pointer-events-none size-full object-cover" draggable={false} />
        </div>
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          <AboutFrameCorners accent={accent} tl={paper} tr={paper} bl={paper} br={paper} />
        </div>
      </div>
    </div>
  );
}

/** Purple text panels: same outer size as project cards (`PROJECT_CARD_FRAME_W` × `PROJECT_CARD_FRAME_H`). */
function AboutTextPanel({ accent, paperA, paperB, bg, children, marginTop = 0, marginLeft = 0, vScale = 1 }) {
  return (
    <div
      className="relative shrink-0 overflow-visible"
      style={{
        width: PROJECT_CARD_FRAME_W * vScale,
        marginTop: marginTop * vScale,
        marginLeft: marginLeft * vScale,
        zoom: 1.2 * vScale,
      }}
    >
      <div
        className="relative z-0 box-border flex flex-col justify-center overflow-x-hidden px-5 py-[30px]"
        style={{
          border: `2px solid ${accent}`,
          background: bg,
        }}
      >
        {children}
      </div>
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-visible">
        <AboutFrameCorners accent={accent} tl={paperA} tr={paperA} bl={paperB} br={paperB} />
      </div>
    </div>
  );
}

function AboutResumeRow({ leftBold, leftMuted, date, fg, muted }) {
  const row = "text-[14px] tracking-[-0.32px] leading-[1.4]";
  const [boldPart, ...rest] = leftBold.split("|");
  const afterPipe = rest.join("|");
  return (
    <div className="flex w-full flex-row flex-wrap items-start justify-between gap-x-4 gap-y-1">
      <p className={`min-w-0 flex-1 ${row}`} style={{ color: fg, fontFamily: "'Instrument Sans', sans-serif" }}>
        <span style={{ color: fg }}>{boldPart.trim()}</span>
        {afterPipe !== undefined && <span style={{ color: muted }}>{" | "}</span>}
        <span style={{ color: muted }}>{afterPipe.trim()}{leftMuted}</span>
      </p>
      <p className={`shrink-0 whitespace-nowrap ${row}`} style={{ color: muted, fontFamily: "'Instrument Sans', sans-serif" }}>
        {date}
      </p>
    </div>
  );
}

function AboutMeStripSection({ darkMode, skipIntro = false, scrollContainerRef, mobile = false, vScale = 1, id }) {
  const accent = darkMode ? "#a78bfa" : ABOUT_ACCENT_LIGHT;
  const muted = darkMode ? "rgba(255,255,255,0.55)" : ABOUT_MUTED;
  const fg = darkMode ? "#fff" : "#000";
  const bg = darkMode ? "#141414" : "#fff";
  const paper = darkMode ? "#1f1f1f" : "#f7f7f7";
  const paperAlt = darkMode ? "#0a0a0a" : "#fff";
  const font = "'Instrument Sans', sans-serif";
  const PURPLE = "#8A38F5";

  if (mobile) {
    const corners = [
      { top: -6, left: -6 },
      { top: -6, right: -6 },
      { bottom: -6, left: -6 },
      { bottom: -6, right: -6 },
    ];
    const cornerStyle = {
      position: "absolute",
      width: 12,
      height: 12,
      border: `1.5px solid ${PURPLE}`,
      backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7",
      zIndex: 2,
      pointerEvents: "none",
    };

    return (
      <section id={id} style={{ padding: "40px 24px 64px", fontFamily: font, backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7" }}>
        <div className="relative" style={{ border: `1.5px solid ${PURPLE}`, backgroundColor: bg, padding: "28px 24px" }}>
          {corners.map((pos, i) => (
            <span key={i} className="absolute" style={{ ...cornerStyle, ...pos }} />
          ))}
          <div className="flex flex-col gap-8">
            {/* Bio */}
            <div className="flex flex-col gap-3">
              <p className="text-lg tracking-[-0.36px] leading-[1.2]" style={{ color: fg }}>Hello (: I&apos;m Queenie.</p>
              <div className="text-sm tracking-[-0.28px] leading-[1.6]" style={{ color: fg }}>
                <p className="mb-2">I&apos;m an interdisciplinary designer with a love for motion, creative tools, and the small moments that make a product feel delightful.</p>
                <p className="mb-2">I&apos;m currently pursuing my Master&apos;s in HCI at NYU and I&apos;ve brought my craft to companies like Uber, designing experiences that connect people and culture.</p>
                <p className="mb-1">Outside of design I&apos;m:</p>
                <ul className="list-disc pl-5 flex flex-col gap-0.5">
                  <li>Sending problems up a bouldering wall</li>
                  <li>Chasing the perfect matcha</li>
                  <li>Building interactive worlds with code</li>
                  <li>Finding beauty in things that move me</li>
                </ul>
                <p className="mt-4">
                  Say hello at{" "}
                  <a href="mailto:queenie2000824@gmail.com" className="underline underline-offset-[3px]" style={{ color: fg }}>queenie2000824@gmail.com</a>
                  {" "}or via{" "}
                  <a href="https://www.linkedin.com/in/queenie-hsiao/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px]" style={{ color: fg }}>LinkedIn</a>.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: PURPLE, opacity: 0.2 }} />

            {/* Experience / Education */}
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>Experience</p>
                <div className="flex flex-col gap-2">
                  <AboutResumeRow leftBold="Uber | " leftMuted="Product Designer" date="2026 - Present" fg={fg} muted={muted} />
                  <AboutResumeRow leftBold="Uber | " leftMuted="Product Designer Intern" date="Summer 2025" fg={fg} muted={muted} />
                  <AboutResumeRow leftBold="NYU Tisch | " leftMuted="UX Course Teaching Assistant" date="Spring 2025" fg={fg} muted={muted} />
                  <AboutResumeRow leftBold="Jason Wu | " leftMuted="Design Intern" date="Summer 2023" fg={fg} muted={muted} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>Community</p>
                <AboutResumeRow leftBold="UXC NYU |" leftMuted=" Co-Founder & President" date="Fall 2024 - Present" fg={fg} muted={muted} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.1em]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>Education</p>
                <div className="flex flex-col gap-2">
                  <AboutResumeRow leftBold="New York University | " leftMuted="MPS @ ITP" date="2024 - 2026" fg={fg} muted={muted} />
                  <AboutResumeRow leftBold="Parsons School of Design | " leftMuted="BFA Fashion Design" date="2018 - 2023" fg={fg} muted={muted} />
                  <AboutResumeRow leftBold="Waseda University | " leftMuted="Accelerated Course in Business" date="Summer 2019" fg={fg} muted={muted} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className="box-border shrink-0 scroll-mt-0"
      style={{
        width: "fit-content",
        maxWidth: "100%",
        marginLeft: Math.round(220 * vScale),
        minHeight: "100%",
        padding: `28px 300px 56px 32px`,
      }}
      initial={skipIntro ? false : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease }}
    >
      <div className="flex w-max max-w-none flex-row flex-nowrap items-start" style={{ gap: Math.round(16 * vScale) }}>
        <AboutPhotoPanel
          title="My Home, Taipei"
          src="/images/about/taipei.jpg"
          alt="Taipei cityscape"
          accent={accent}
          paper={paper}
          darkMode={darkMode}
          marginTop={170}
          vScale={vScale}
        />
        <AboutPhotoPanel
          title="Queenie Hsiao"
          src="/images/about/portrait.jpg"
          alt="Queenie Hsiao"
          accent={accent}
          paper={paper}
          darkMode={darkMode}
          marginTop={20}
          marginLeft={-44}
          zIndex={1}
          vScale={vScale}
        />

        <AboutTextPanel accent={accent} paperA={paper} paperB={paperAlt} bg={bg} marginTop={240} marginLeft={120} vScale={vScale}>
          <div className="flex w-full max-w-full flex-col gap-3" style={{ fontFamily: font }}>
            <p className="w-full text-lg tracking-[-0.36px] leading-[1.2]" style={{ color: fg }}>
              Hello (: I&apos;m Queenie.
            </p>
            <div className="w-full text-[14px] tracking-[-0.32px] leading-[1.4]" style={{ color: fg }}>
              <p className="mb-0">
                I&apos;m an interdisciplinary designer with a love for motion, creative tools, and the small moments that make a
                product feel delightful.
              </p>
              <p className="mb-2 mt-2">
                I&apos;m currently pursuing my Master&apos;s in HCI at NYU and I&apos;ve brought my craft to companies like Uber,
                designing experiences that connect people and culture.
              </p>
              <p className="mb-0 mt-4">Outside of design I&apos;m:</p>
              <ul className="mb-0 mt-1 list-disc pl-6">
                <li>
                  <span>Sending problems up a bouldering wall</span>
                </li>
                <li>
                  <span>Chasing the perfect matcha</span>
                </li>
                <li>
                  <span>Building interactive worlds with code</span>
                </li>
                <li>
                  <span>Finding beauty in things that move me</span>
                </li>
              </ul>
              <p className="mt-4">
                You can see more of my work on{" "}
                <a href="https://x.com/queenie_hsiao" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] hover:opacity-70" style={{ color: fg }}>
                  X
                </a>{" "}
                or{" "}
                <a href="https://instagram.com/hsiao_archive" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] hover:opacity-70" style={{ color: fg }}>
                  Instagram
                </a>
                . Say hello at{" "}
                <a href="mailto:queenie2000824@gmail.com" className="underline underline-offset-[3px] hover:opacity-70" style={{ color: fg }}>
                  queenie2000824@gmail.com
                </a>{" "}
                or via{" "}
                <a href="https://www.linkedin.com/in/queenie-hsiao/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px] hover:opacity-70" style={{ color: fg }}>
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>
        </AboutTextPanel>

        <AboutTextPanel accent={accent} paperA={paper} paperB={paperAlt} bg={bg} marginLeft={60} marginTop={100} vScale={vScale}>
          <div className="flex w-full max-w-full flex-col gap-8" style={{ fontFamily: font }}>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>
                Experience
              </p>
              <div className="flex flex-col gap-2">
                <AboutResumeRow
                  leftBold="Uber | "
                  leftMuted="Product Designer"
                  date="2026 - Present"
                  fg={fg}
                  muted={muted}
                />
                <AboutResumeRow
                  leftBold="Uber | "
                  leftMuted="Product Designer Intern"
                  date="Summer 2025"
                  fg={fg}
                  muted={muted}
                />
                <AboutResumeRow
                  leftBold="NYU Tisch | "
                  leftMuted="UX Course Teaching Assistant"
                  date="Spring 2025"
                  fg={fg}
                  muted={muted}
                />
                <AboutResumeRow
                  leftBold="Jason Wu | "
                  leftMuted="Design Intern"
                  date="Summer 2023"
                  fg={fg}
                  muted={muted}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>
                Community
              </p>
              <AboutResumeRow
                leftBold="UXC NYU |"
                leftMuted=" Co-Founder & President"
                date="Fall 2024 - Present"
                fg={fg}
                muted={muted}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.1em] leading-[1.3]" style={{ color: darkMode ? "rgba(255,255,255,0.4)" : "#999" }}>
                Education
              </p>
              <div className="flex flex-col gap-2">
                <AboutResumeRow
                  leftBold="New York University | "
                  leftMuted="MPS @ ITP"
                  date="2024 - 2026"
                  fg={fg}
                  muted={muted}
                />
                <AboutResumeRow
                  leftBold="Parsons School of Design | "
                  leftMuted="BFA Fashion Design"
                  date="2018 - 2023"
                  fg={fg}
                  muted={muted}
                />
                <AboutResumeRow
                  leftBold="Waseda University | "
                  leftMuted="Accelerated Course in Business"
                  date="Summer 2019"
                  fg={fg}
                  muted={muted}
                />
              </div>
            </div>
          </div>
        </AboutTextPanel>

        <div className="shrink-0 self-center" style={{ marginLeft: Math.round(300 * vScale) }}>
          <FigJamPostIt scrollContainerRef={scrollContainerRef} />
        </div>
      </div>
    </motion.section>
  );
}

function HorizontalProjectsStrip({ darkMode, onSelectProject, skipIntro = false, scrollContainerRef }) {
  const vScale = useVScale();
  const sc = (v) => Math.round(v * vScale);
  return (
    <div className="flex items-start" style={{ gap: sc(60) }}>
      {projects.map((project, i) => (
        <React.Fragment key={project.title}>
          <HorizontalProjectCard
            project={project}
            index={i}
            darkMode={darkMode}
            onClick={() => onSelectProject(project)}
            skipIntro={skipIntro}
            scrollContainerRef={scrollContainerRef}
            vScale={vScale}
          />
          {i === 1 && (
            <div className="shrink-0 relative" style={{ width: sc(400), height: sc(520) }}>
              <HangingScrollVideo
                src="https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4"
                darkMode={darkMode}
                scrollContainerRef={scrollContainerRef}
                skipIntro={skipIntro}
                top={sc(80)}
                left={sc(0)}
                width={sc(276)}
                height={sc(370)}
              />
              <HangingScrollVideo
                src="https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145368/7_jpicnc.mp4"
                darkMode={darkMode}
                scrollContainerRef={scrollContainerRef}
                skipIntro={skipIntro}
                top={sc(220)}
                left={sc(210)}
                width={sc(230)}
                height={sc(288)}
                zIndex={2}
              />
            </div>
          )}
          {project.title === "Gravity Letters" && (
            <div className="shrink-0 relative" style={{ width: sc(632), minHeight: sc(640), marginLeft: sc(8) }}>
              <HangingScrollVideo
                src="https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145379/track_lscvkf.mp4"
                darkMode={darkMode}
                scrollContainerRef={scrollContainerRef}
                skipIntro={skipIntro}
                top={sc(130)}
                left={sc(24)}
                width={sc(280)}
                height={sc(360)}
                zIndex={1}
              />
              <HangingScrollVideo
                src="https://res.cloudinary.com/dugdaifzh/video/upload/q_auto,f_auto/v1775145369/5_rrdttw.mp4"
                darkMode={darkMode}
                scrollContainerRef={scrollContainerRef}
                skipIntro={skipIntro}
                top={sc(270)}
                left={sc(328)}
                width={sc(280)}
                height={sc(360)}
                zIndex={2}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

const footerNavLinks = [
  { href: "#home", label: "home" },
  { href: "#projects", label: "projects" },
  { href: "#play", label: "play" },
  { href: "#about", label: "about" },
];

/** Bump when you ship meaningful site changes */
const FOOTER_LAST_UPDATED = "March 30, 2026";

function FooterNyTime({ muted }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const timeStr = now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <div className="flex flex-col gap-0.5">
      <span className="tabular-nums text-sm" style={{ color: muted }}>
        {timeStr}
      </span>
      <span className="text-[11px] uppercase tracking-[0.08em]" style={{ color: muted, opacity: 0.85 }}>
        New York
      </span>
    </div>
  );
}

export function MobileTopNav({ darkMode, onBack }) {
  const bg = darkMode ? "#0F0F0F" : "#f7f7f7";
  const fg = darkMode ? "#fff" : "#000";
  const border = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "home", hash: "#home" },
    { label: "projects", hash: "#projects" },
    { label: "play", hash: "#play" },
    { label: "about", hash: "#about" },
  ];

  const handleNav = (hash) => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
    window.location.hash = hash;
    onBack();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: bg, borderBottom: `1px solid ${border}`, backdropFilter: "blur(12px)", fontFamily: "'Instrument Sans', sans-serif" }}
      >
        <button
          onClick={() => handleNav("#home")}
          style={{ fontFamily: "'Tilt Warp', sans-serif", fontSize: 15, color: fg, background: "none", border: "none", padding: 0, cursor: "auto" }}
        >
          Queenie Hsiao
        </button>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center justify-center p-1"
          style={{ width: 28, height: 28 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <span style={{ fontSize: 18, lineHeight: 1, color: fg }}>✕</span>
          ) : (
            <span className="flex flex-col gap-[5px] items-end">
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: 20, height: 0, borderTop: `1.5px solid ${fg}` }} />
              ))}
            </span>
          )}
        </button>
      </div>
      {menuOpen && (
        <div
          className="fixed left-0 right-0 z-[49]"
          style={{ top: 57, backgroundColor: bg, fontFamily: "'Instrument Sans', sans-serif" }}
        >
          <div className="flex flex-col items-end px-5 py-6 gap-4">
            {navItems.map(({ label, hash }) => (
              <button
                key={label}
                onClick={() => handleNav(hash)}
                className="text-[28px] tracking-[-0.5px] leading-[1.1]"
                style={{ color: fg, background: "none", border: "none", padding: 0, cursor: "auto" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export function Footer({ darkMode }) {
  const muted = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const accent = darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)";
  const dim = darkMode ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";
  const line = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const iconFill = darkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.4)";

  const socialLinks = [
    { href: "https://www.linkedin.com/in/queenie-hsiao/", label: "LinkedIn" },
    { href: "https://x.com/queenie_hsiao", label: "Twitter (X)" },
    { href: "https://instagram.com/hsiao_archive", label: "Instagram" },
  ];

  return (
    <footer
      className="w-full mt-24"
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      <div style={{ borderTop: `1px solid ${line}` }} />

      {/* Mobile layout */}
      <div className="flex flex-col gap-5 py-10 lg:hidden">
        <p className="text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: accent }}>
          Queenie Hsiao
        </p>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Footer">
          {footerNavLinks.map(({ href, label }, i) => (
            <React.Fragment key={href}>
              {i > 0 && <span className="text-[10px] mx-1 select-none" style={{ color: dim }}>·</span>}
              <a href={href} className="text-[13px] tracking-[0.02em] transition-opacity duration-200 active:opacity-60" style={{ color: accent, textDecoration: "none" }}>
                {label}
              </a>
            </React.Fragment>
          ))}
        </nav>
        <a
          href="mailto:queenie2000824@gmail.com"
          className="text-[13px] transition-opacity duration-200 active:opacity-70"
          style={{ color: iconFill, textDecoration: "none" }}
        >
          queenie2000824@gmail.com
        </a>
        <div className="flex flex-row gap-5">
          {socialLinks.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="text-[13px] tracking-[0.02em] transition-opacity duration-200 active:opacity-60"
              style={{ color: iconFill, textDecoration: "none" }}>
              {label}
            </a>
          ))}
        </div>
        <FooterNyTime muted={dim} />
        <div className="flex flex-col gap-1">
          <p className="text-[11px] tracking-[0.02em]" style={{ color: dim }}>Last updated {FOOTER_LAST_UPDATED}</p>
          <p className="text-[11px] tracking-[0.04em]" style={{ color: dim }}>Built with React, Tailwind CSS, Framer Motion &amp; Vite</p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:grid grid-cols-3 py-10 gap-y-8">
        <div className="flex flex-col gap-3">
          <p className="text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: accent }}>Queenie Hsiao</p>
          <a href="mailto:queenie2000824@gmail.com" className="cursor-none text-[13px] transition-opacity duration-200 hover:opacity-70" style={{ color: muted, textDecoration: "none" }}>
            queenie2000824@gmail.com
          </a>
          <FooterNyTime muted={dim} />
        </div>
        <div className="flex flex-col items-center justify-between">
          <nav className="flex items-center gap-1" aria-label="Footer">
            {footerNavLinks.map(({ href, label }, i) => (
              <React.Fragment key={href}>
                {i > 0 && <span className="text-[10px] mx-1 select-none" style={{ color: dim }}>·</span>}
                <a href={href} className="cursor-none text-[13px] tracking-[0.02em] transition-opacity duration-200 hover:opacity-60" style={{ color: accent, textDecoration: "none" }}>{label}</a>
              </React.Fragment>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-1">
            <p className="text-[11px] tracking-[0.02em]" style={{ color: dim }}>Last updated {FOOTER_LAST_UPDATED}</p>
            <p className="text-[11px] tracking-[0.04em]" style={{ color: dim }}>Built with React, Tailwind CSS, Framer Motion &amp; Vite</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          {socialLinks.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="cursor-none text-[13px] tracking-[0.02em] transition-opacity duration-200 hover:opacity-60" style={{ color: iconFill, textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function ExternalOverlay({ url, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center cursor-none"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative overflow-hidden"
        style={{
          boxShadow: isFullscreen ? "none" : "0 25px 60px rgba(0,0,0,0.4)",
          borderRadius: isFullscreen ? 0 : 16,
        }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          width: isFullscreen ? "100%" : "80%",
          height: isFullscreen ? "100%" : "80%",
        }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
          onClick={() => setIsFullscreen((f) => !f)}
        >
          {isFullscreen ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5,1 5,5 1,5" />
              <polyline points="9,13 9,9 13,9" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1,5 1,1 5,1" />
              <polyline points="13,9 13,13 9,13" />
            </svg>
          )}
        </button>
        <button
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-none"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>
        <iframe
          src={url}
          className="w-full h-full"
          style={{ border: "none" }}
          title="External project"
          allow="camera; microphone; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
        />
      </motion.div>
    </motion.div>
  );
}

function CanvasContextMenu({ darkMode }) {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const handleContext = (e) => {
      e.preventDefault();
      setMenu({ x: e.clientX, y: e.clientY });
    };
    const handleClose = () => setMenu(null);
    window.addEventListener("contextmenu", handleContext);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose, true);
    return () => {
      window.removeEventListener("contextmenu", handleContext);
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose, true);
    };
  }, []);

  if (!menu) return null;

  const bg = darkMode ? "#2c2c2c" : "#ffffff";
  const border = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textColor = darkMode ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
  const dimColor = darkMode ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";
  const hoverBg = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
  const separatorColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const items = [
    { label: "Copy", shortcut: "⌘C" },
    { label: "Paste here", shortcut: "⌘V" },
    { label: "Copy as SVG", shortcut: "⌘⇧C" },
    null,
    { label: "Select All", shortcut: "⌘A" },
    { label: "Group Selection", shortcut: "⌘G" },
    null,
    { label: "Bring to Front", shortcut: "⌘]" },
    { label: "Send to Back", shortcut: "⌘[" },
    null,
    { label: "Add Auto Layout", shortcut: "⇧A" },
    { label: "Create Component", shortcut: "⌘⌥K" },
  ];

  const maxY = window.innerHeight - items.length * 30 - 20;
  const maxX = window.innerWidth - 220;
  const x = Math.min(menu.x, maxX);
  const y = Math.min(menu.y, maxY);

  return (
    <motion.div
      className="fixed"
      style={{
        left: x,
        top: y,
        zIndex: 20000,
        minWidth: 200,
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderRadius: 8,
        padding: "4px 0",
        boxShadow: darkMode
          ? "0 8px 30px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.3)"
          : "0 8px 30px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.06)",
        backdropFilter: "blur(20px)",
        cursor: "default",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item === null ? (
          <div key={i} style={{ height: 1, backgroundColor: separatorColor, margin: "4px 0" }} />
        ) : (
          <div
            key={i}
            className="flex items-center justify-between px-3 py-[5px] transition-colors duration-100"
            style={{
              color: textColor,
              fontSize: 13,
              fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              borderRadius: 4,
              margin: "0 4px",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverBg}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            onClick={() => setMenu(null)}
          >
            <span>{item.label}</span>
            <span style={{ color: dimColor, fontSize: 12, marginLeft: 24 }}>{item.shortcut}</span>
          </div>
        )
      )}
    </motion.div>
  );
}

function FloatingDot({ darkMode }) {
  return (
    <motion.div
      className="fixed bottom-8 right-8 w-3 h-3 rounded-full z-50"
      style={{ backgroundColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function getPageFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith("#project/")) {
    const slug = decodeURIComponent(hash.replace("#project/", ""));
    const project = projects.find((p) => p.title.toLowerCase() === slug.toLowerCase()) || null;
    if (project) return { page: "project", project };
  }
  if (hash === "#play") return { page: "play" };
  return { page: "home" };
}

const SS_SCROLL_TO_PROJECT = "portfolio:scrollToProjectCard";

/** Stable id for horizontal project frames (matches case study `project.title`). */
function getProjectCardDomId(title) {
  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `project-card-${slug || "project"}`;
}

/** Scroll overflow-x container so `el` (e.g. a project card) aligns to the left viewport. */
function scrollStripElementIntoView(container, el, behavior = "auto") {
  if (!container || !el) return;
  const cRect = container.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const delta = eRect.left - cRect.left + container.scrollLeft;
  const padding = 24;
  container.scrollTo({
    left: Math.max(0, delta - padding),
    behavior,
  });
}

/** Scroll the horizontal home strip so #home / #projects / #about align inside the overflow-x container. */
function scrollHomeStripToHash(container, hashId, behavior = "smooth") {
  const h = (String(hashId || "").replace(/^#/, "") || "home");
  if (h === "play") return;
  const allowed = new Set(["home", "projects", "about"]);
  if (!allowed.has(h)) return;
  if (!container) return;
  if (h === "home") {
    container.scrollTo({ left: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(h);
  if (!el) return;
  const cRect = container.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const delta = eRect.left - cRect.left + container.scrollLeft;
  const padding = 24;
  container.scrollTo({
    left: Math.max(0, delta - padding),
    behavior,
  });
}

const CARD_NATIVE_W = 340;
const CARD_NATIVE_H = 240;

function MobileBusinessCard({ darkMode, bg }) {
  const [scale, setScale] = useState(() => {
    const w = window.innerWidth - 40;
    return w / CARD_NATIVE_W;
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth - 40;
      setScale(w / CARD_NATIVE_W);
    };
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const frameH = Math.round(CARD_NATIVE_H * scale);
  const borderColor = darkMode ? "rgba(255,255,255,0.3)" : "black";

  return (
    <div
      className="mt-8 relative w-full"
      style={{ border: `1.5px solid ${borderColor}`, height: frameH, overflow: "visible" }}
    >
      {/* Corner squares — same spec as case study cards: 12×12 at -6px */}
      {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
        <span key={i} style={{ position: "absolute", ...pos, width: 12, height: 12, border: `1.5px solid ${borderColor}`, backgroundColor: bg, zIndex: 6, pointerEvents: "none" }} />
      ))}
      {/* Inner clip so the rotated cards don't bleed outside the frame */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div
          style={{
            width: CARD_NATIVE_W,
            height: CARD_NATIVE_H,
            transformOrigin: "top left",
            transform: `scale(${scale}) translateX(-12px)`,
          }}
        >
          <BusinessCardStack darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function MobileHomePage({ darkMode, toggleDark, selectProject }) {
  const bg = darkMode ? "#0F0F0F" : "#f7f7f7";
  const fg = darkMode ? "#fff" : "#000";
  const muted = darkMode ? "rgba(255,255,255,0.45)" : "#676767";
  const border = darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  const accent = "#0055FF";
  const font = "'Instrument Sans', sans-serif";
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "home", href: "#home" },
    { label: "projects", href: "#projects" },
    { label: "play", href: "#play" },
    { label: "about", href: "#about" },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden flex flex-col"
      style={{
        backgroundColor: bg,
        backgroundImage: darkMode
          ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
          : "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        fontFamily: font,
        transition: "background-color 0.2s ease",
      }}
    >
      {/* ── Top nav ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{ backgroundColor: bg, borderBottom: `1px solid ${border}`, backdropFilter: "blur(12px)" }}
      >
        <a href="#home" className="text-[15px] tracking-[-0.3px]" style={{ color: fg, fontFamily: "'Tilt Warp', sans-serif", textDecoration: "none" }}>Queenie Hsiao</a>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center justify-center p-1"
          style={{ width: 28, height: 28 }}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? (
            <span className="text-[18px] leading-none" style={{ color: fg }}>✕</span>
          ) : (
            <span className="flex flex-col gap-[5px] items-end">
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: "block", width: 20, height: 0, borderTop: `1.5px solid ${fg}` }} />
              ))}
            </span>
          )}
        </button>
      </div>

      {/* ── Fixed dropdown menu ── */}
      {menuOpen && (
        <div
          className="fixed left-0 right-0 z-[49] flex flex-col items-end px-5 py-6 gap-4"
          style={{ top: 57, backgroundColor: bg, fontFamily: font }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[28px] tracking-[-0.5px] leading-[1.1]"
              style={{ color: fg, textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {label.toLowerCase()}
            </a>
          ))}
        </div>
      )}

      {/* ── Hero ── */}
      <div className="px-5 pb-10" style={{ paddingTop: "calc(57px + 40px)" }}>
        <div
          className="text-[20px] leading-[1.5] tracking-[-0.4px]"
          style={{ color: fg }}
        >
          <span className="relative inline-block px-2 py-0.5 font-bold" style={{ backgroundColor: "#0055ff", color: "white" }}>
            I think, then I build.
            <span className="absolute" style={{ top: -3, left: -3, width: 6, height: 6, border: "1.5px solid black", backgroundColor: bg }} />
            <span className="absolute" style={{ top: -3, right: -3, width: 6, height: 6, border: "1.5px solid black", backgroundColor: bg }} />
            <span className="absolute" style={{ bottom: -3, left: -3, width: 6, height: 6, border: "1.5px solid black", backgroundColor: bg }} />
            <span className="absolute" style={{ bottom: -3, right: -3, width: 6, height: 6, border: "1.5px solid black", backgroundColor: bg }} />
          </span>
          <br />
          <span style={{ display: "block", marginTop: 4 }}>Awarded by Figma, designing at Uber.</span>
        </div>
        <MobileBusinessCard darkMode={darkMode} bg={bg} />
      </div>

      {/* ── Projects ── */}
      <div className="px-5 pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.1em] mb-6" style={{ color: muted }}>Work</p>
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <button
              key={project.title}
              onClick={() => {
                if (project.externalUrl) {
                  window.open(project.externalUrl, "_blank", "noopener,noreferrer");
                } else {
                  selectProject(project);
                }
              }}
              className="text-left w-full rounded-none group relative"
              style={{ border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.5)" : "black"}`, background: "none" }}
            >
              {/* corner squares */}
              {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
                <span key={i} className="absolute pointer-events-none" style={{ ...pos, width: 12, height: 12, border: `1.5px solid ${darkMode ? "rgba(255,255,255,0.5)" : "black"}`, backgroundColor: bg, zIndex: 2 }} />
              ))}
              {(project.video || project.image) && (
                <div className="w-full overflow-hidden" style={{ aspectRatio: "3/2", backgroundColor: darkMode ? "#1a1a1a" : "#eee" }}>
                  {project.video ? (
                    <LazyVideo
                      src={project.video}
                      className="w-full h-full object-cover"
                      style={project.imageStyle}
                      autoPlay loop muted playsInline
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={project.imageStyle}
                    />
                  )}
                </div>
              )}
              <div className="px-4 py-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-[16px] tracking-[-0.3px] leading-[1.2]" style={{ color: fg }}>{project.title}</p>
                  {project.description && (
                    <p className="text-[12px] mt-1 leading-[1.4]" style={{ color: muted }}>{project.description}</p>
                  )}
                </div>
                {project.year && <span className="text-[12px] shrink-0" style={{ color: muted }}>{project.year}</span>}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── About ── */}
      <div className="px-5 pb-10 pt-10" style={{ overflow: "visible" }}>
        <img src="/images/about/me.png" alt="Queenie" className="w-full object-contain mb-4" />
        <div className="relative" style={{ border: "1.5px solid #8A38F5", backgroundColor: darkMode ? "#141414" : "#fff", padding: "24px", overflow: "visible" }}>
          {[{ top: -6, left: -6 }, { top: -6, right: -6 }, { bottom: -6, left: -6 }, { bottom: -6, right: -6 }].map((pos, i) => (
            <span key={i} className="absolute pointer-events-none" style={{ ...pos, width: 12, height: 12, border: "1.5px solid #8A38F5", backgroundColor: bg, zIndex: 2 }} />
          ))}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[18px] tracking-[-0.3px] leading-[1.3] mb-3" style={{ color: fg }}>Hello (: I'm Queenie.</p>
              <p className="text-[14px] leading-[1.6]" style={{ color: fg }}>
                I'm an interdisciplinary designer with a love for motion, creative tools, and the small moments that make a product feel delightful.
              </p>
              <p className="text-[14px] leading-[1.6] mt-2" style={{ color: fg }}>
                I'm currently pursuing my Master's in HCI at NYU and I've brought my craft to companies like Uber, designing experiences that connect people and culture.
              </p>
              <p className="text-[14px] leading-[1.6] mt-2" style={{ color: fg }}>Outside of design I'm: sending problems up a bouldering wall, chasing the perfect matcha, building interactive worlds with code, and finding beauty in things that move me.</p>
              <p className="text-[14px] leading-[1.6] mt-3" style={{ color: fg }}>
                You can see more of my work on{" "}
                <a href="https://x.com/queenie_hsiao" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px]" style={{ color: fg }}>X</a>
                {" "}or{" "}
                <a href="https://instagram.com/hsiao_archive" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px]" style={{ color: fg }}>Instagram</a>
                . Say hello at{" "}
                <a href="mailto:queenie2000824@gmail.com" className="underline underline-offset-[3px]" style={{ color: fg }}>queenie2000824@gmail.com</a>
                {" "}or via{" "}
                <a href="https://www.linkedin.com/in/queenie-hsiao/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-[3px]" style={{ color: fg }}>LinkedIn</a>.
              </p>
            </div>

            {/* Resume rows */}
            <div className="flex flex-col gap-5 mt-4">
            {[
              { section: "Experience", rows: [
                { role: "Product Designer", company: "Uber", date: "2026 – Present" },
                { role: "Product Designer Intern", company: "Uber", date: "Summer 2025" },
                { role: "UX Course Teaching Assistant", company: "NYU Tisch", date: "Spring 2025" },
                { role: "Design Intern", company: "Jason Wu", date: "Summer 2023" },
              ]},
              { section: "Community", rows: [
                { role: "Co-Founder & President", company: "UXC NYU", date: "Fall 2024 – Present" },
              ]},
              { section: "Education", rows: [
                { role: "MPS @ ITP", company: "New York University", date: "2024 – 2026" },
                { role: "BFA Fashion Design", company: "Parsons School of Design", date: "2018 – 2023" },
                { role: "Accelerated Course in Business", company: "Waseda University", date: "Summer 2019" },
              ]},
            ].map(({ section, rows }) => (
              <div key={section}>
                <p className="text-[10px] font-medium uppercase tracking-[0.1em] mb-2" style={{ color: muted }}>{section}</p>
                <div className="flex flex-col gap-1.5">
                  {rows.map(({ role, company, date }) => (
                    <div key={role} className="flex items-start justify-between gap-2">
                      <p className="text-[11px] leading-[1.4]" style={{ color: fg }}>
                        <span className="font-medium">{company}</span>
                        <span style={{ color: muted }}> | {role}</span>
                      </p>
                      <span className="text-[10px] shrink-0" style={{ color: muted }}>{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Post-it ── */}
      <div className="px-5 flex-1 flex items-center justify-center py-16">
        <FigJamPostIt rotate={-1.5} width={Math.min(320, window.innerWidth - 40)} isMobile={true} />
      </div>

      {/* ── Footer ── */}
      <div className="mt-auto px-5">
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default function App() {
  const homeHorizontalScrollRef = useRef(null);
  const isMobile = useIsMobile();
  const vScale = useVScale();

  const [showLoader, setShowLoader] = useState(() => getPageFromHash().page === "home");
  const [revealContent, setRevealContent] = useState(() => getPageFromHash().page !== "home");
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(getPageFromHash);
  const [externalOverlay, setExternalOverlay] = useState(null);
  /** When true, home remounts without hero / VectorTitle / ruler entrance (return from Play). */
  const [skipHomeHeroIntro, setSkipHomeHeroIntro] = useState(false);
  const toggleDark = useCallback(() => setDarkMode((d) => !d), []);

  /**
   * After the first in-app navigation away from home (or if the document did not load on home),
   * skip ruler / VectorTitle / Chinese card / product-designer lines on subsequent home views.
   * First full entry on the home URL still plays everything (with loader).
   */
  const [suppressLandingIntro, setSuppressLandingIntro] = useState(
    () => getPageFromHash().page !== "home"
  );

  useEffect(() => {
    if (currentPage.page !== "home") {
      setSuppressLandingIntro(true);
    }
  }, [currentPage.page]);

  const skipLandingAnimations = skipHomeHeroIntro || suppressLandingIntro;

  const selectProject = useCallback((project) => {
    if (project.externalUrl) {
      setExternalOverlay(project.externalUrl);
      return;
    }
    setCurrentPage({ page: "project", project });
    window.location.hash = `project/${encodeURIComponent(project.title.toLowerCase())}`;
  }, []);

  /**
   * Case study back: optional `fromProject` scrolls the strip to that project’s frame.
   * Play back: call with no args (only #projects strip).
   */
  const goHome = useCallback((fromProject) => {
    setSkipHomeHeroIntro(true);
    try {
      if (fromProject?.title) {
        sessionStorage.setItem(SS_SCROLL_TO_PROJECT, fromProject.title);
      } else {
        sessionStorage.removeItem(SS_SCROLL_TO_PROJECT);
      }
    } catch {
      /* ignore */
    }
    setCurrentPage({ page: "home" });
    history.replaceState(null, "", `${window.location.pathname}#projects`);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const next = getPageFromHash();
      setCurrentPage(next);
      if (next.page === "play") {
        setSkipHomeHeroIntro(false);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  /** Scroll horizontal strip: focused project frame (back from case study) or #home / #projects / #about. */
  useLayoutEffect(() => {
    if (currentPage.page !== "home" || !revealContent) return;

    const hash = window.location.hash || "";
    const section = (hash.replace(/^#/, "") || "home").toLowerCase();
    if (!["home", "projects", "about"].includes(section)) return;

    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return false;
      const container = homeHorizontalScrollRef.current;
      if (!container) return false;

      let focusTitle = null;
      try {
        focusTitle = sessionStorage.getItem(SS_SCROLL_TO_PROJECT);
      } catch {
        /* ignore */
      }

      if (focusTitle) {
        const card = document.getElementById(getProjectCardDomId(focusTitle));
        if (card) {
          scrollStripElementIntoView(container, card, "auto");
          try {
            sessionStorage.removeItem(SS_SCROLL_TO_PROJECT);
          } catch {
            /* ignore */
          }
          return true;
        }
      }

      const el = document.getElementById(section);
      if (!el) return false;
      scrollHomeStripToHash(container, hash || `#${section}`, "auto");
      return true;
    };

    if (tryScroll()) {
      return () => {
        cancelled = true;
      };
    }

    let attempts = 0;
    const rafLoop = () => {
      if (cancelled) return;
      if (tryScroll()) return;
      if (attempts++ < 120) {
        requestAnimationFrame(rafLoop);
        return;
      }
      let stuck = null;
      try {
        stuck = sessionStorage.getItem(SS_SCROLL_TO_PROJECT);
      } catch {
        /* ignore */
      }
      if (stuck && homeHorizontalScrollRef.current) {
        try {
          sessionStorage.removeItem(SS_SCROLL_TO_PROJECT);
        } catch {
          /* ignore */
        }
        scrollHomeStripToHash(homeHorizontalScrollRef.current, "#projects", "auto");
      }
    };
    requestAnimationFrame(rafLoop);

    const t = window.setTimeout(() => {
      if (!cancelled) tryScroll();
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [currentPage.page, revealContent]);

  const scrollHomeToHashFromUrl = useCallback(() => {
    try {
      sessionStorage.removeItem(SS_SCROLL_TO_PROJECT);
    } catch {
      /* ignore */
    }
    const hash = window.location.hash || "";
    const section = (hash.replace(/^#/, "") || "home").toLowerCase();
    if (!["home", "projects", "about"].includes(section)) return;
    const container = homeHorizontalScrollRef.current;
    if (container) {
      scrollHomeStripToHash(container, hash || `#${section}`, "smooth");
    }
  }, []);

  useEffect(() => {
    if (currentPage.page !== "home") return;
    const onHashChange = () => scrollHomeToHashFromUrl();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [currentPage.page, scrollHomeToHashFromUrl]);

  return (
    <>
      {showLoader && (
        <LoadingScreen
          onDone={() => {
            setShowLoader(false);
            setRevealContent(true);
          }}
        />
      )}
    <AnimatePresence mode="wait">
      {currentPage.page === "project" ? (
        <ProjectPage
          key="project-page"
          project={currentPage.project}
          darkMode={darkMode}
          onBack={goHome}
        />
      ) : currentPage.page === "play" ? (
        <PlayPage
          key="play-page"
          darkMode={darkMode}
          onBack={goHome}
        />
      ) : revealContent && isMobile ? (
        <MobileHomePage
          key="home-mobile"
          darkMode={darkMode}
          toggleDark={toggleDark}
          selectProject={selectProject}
        />
      ) : revealContent ? (
        <motion.div
          id="home"
          key="home-page"
          className={isMobile ? "min-h-screen flex flex-col overflow-y-auto" : "h-screen min-h-0 flex flex-col"}
          style={{
            backgroundColor: darkMode ? "#0F0F0F" : "#f7f7f7",
            backgroundImage: darkMode
              ? "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"
              : "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            transition: "background-color 0.2s ease",
          }}
          initial={skipLandingAnimations ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97, y: -20 }}
          transition={{
            duration: skipLandingAnimations ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <StickyTopRuler darkMode={darkMode} scrollRef={homeHorizontalScrollRef} skipIntro={skipLandingAnimations} />
          <div
            ref={homeHorizontalScrollRef}
            className={isMobile ? "w-full overflow-x-auto overflow-y-hidden" : "flex-1 min-h-0 w-full overflow-x-auto overflow-y-hidden"}
            style={{ overscrollBehavior: "none", ...(isMobile ? { height: "100svh" } : {}) }}
            onWheel={(e) => {
              if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
          >
            <div
              className="relative flex items-stretch gap-0 pr-[30px] pt-[30px] pb-0"
              style={{ height: "100%", width: "max-content", minWidth: "100vw" }}
            >
              <StickyLeftRuler darkMode={darkMode} skipIntro={skipLandingAnimations} />

              <HeroSectionHorizontal darkMode={darkMode} skipIntro={skipLandingAnimations} />

              <div id="projects" className="scroll-mt-0" style={{ marginLeft: 60 }}>
                <HorizontalProjectsStrip
                  darkMode={darkMode}
                  onSelectProject={selectProject}
                  skipIntro={skipLandingAnimations}
                  scrollContainerRef={homeHorizontalScrollRef}
                />
              </div>

              {!isMobile && <AboutMeStripSection id="about" mobile={false} darkMode={darkMode} skipIntro={skipLandingAnimations} scrollContainerRef={homeHorizontalScrollRef} vScale={vScale} />}

            </div>
          </div>

          {isMobile && <AboutMeStripSection id="about" mobile={true} darkMode={darkMode} skipIntro={skipLandingAnimations} scrollContainerRef={homeHorizontalScrollRef} />}

          <GlassCursor darkMode={darkMode} />
          <CanvasContextMenu darkMode={darkMode} />
          <AnimatePresence>
            {externalOverlay && (
              <ExternalOverlay
                key="external-overlay"
                url={externalOverlay}
                onClose={() => setExternalOverlay(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
