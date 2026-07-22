async function run() {
  console.log("=== BUILDING EXACT 'LIFESTYLE & JOURNAL @ALORAABAYA' SECTION BELOW TESTIMONIALS ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, HeroSection, ArrivalsSection, CategoriesSection, BestSellersSection, WhyChooseSection, or TestimonialsSection!
  // We only clean up any previous/failed SocialSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldSocial = desktopNode.children.filter(c => c.name?.toLowerCase().includes("social") || c.name?.toLowerCase().includes("lifestyle") || c.name?.toLowerCase().includes("journal") || c.name?.toLowerCase().includes("instagram") || c.name?.toLowerCase().includes("chronicle"));
    if (oldSocial.length > 0) {
      console.log(`Cleaning up ${oldSocial.length} previous Social/Journal section(s)...`);
      await framer.removeNodes(oldSocial.map(c => c.id));
    }
  }

  async function applySafe(dsl, path, label) {
    if (!dsl || dsl.trim() === "") return;
    console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
    const result = await framer.agent.applyChanges(dsl, { pagePath: path });
    console.log(`[${label}] Result:`, JSON.stringify(result, null, 2));
    return result;
  }

  // STEP 1: Main Container & Section Header
  const headerDSL = [
    `+FrameNode SocialSection parent="${homeDesktopBp}";`,
    `SET SocialSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="48px" padding="110px 0px" fill="#FAF9F6" overflow="hidden";`,
    
    // Header Group
    `+FrameNode SocialHeader parent="SocialSection";`,
    `SET SocialHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="16px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode SocialEyebrow parent="SocialHeader";`,
    `SET SocialEyebrow text="✦ SOCIAL CHRONICLE" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode SocialTitle parent="SocialHeader";`,
    `SET SocialTitle text="Lifestyle & Journal @AloraAbaya" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,

    `+RichTextNode SocialSub parent="SocialHeader";`,
    `SET SocialSub text="Tag us or use #AloraAbayas to be featured in our monthly private salon chronicle." fontSize="14px" fontWeight="400" textColor="#6B5E53" textAlignment="center";`,

    // Horizontal Scrolling Track Container (exact 1912px sum of cards+gaps centered inside 1440px section for infinite row bleed)
    `+FrameNode SocialTrack parent="SocialSection";`,
    `SET SocialTrack layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" gap="28px" width="1912px" height="420px" padding="0px 0px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Social Header & Track Container");

  // STEP 2: 5 Alternating Ratio Cards (Exact from InstagramGallerySection.tsx & Screenshot)
  const socialCardsData = [
    {
      id: "S1",
      w: 280,
      h: 380,
      image: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=800&q=80",
      duration: "0:42",
      title: "Velvet & Silk Abaya Walk",
      subtitle: "Salon Runway"
    },
    {
      id: "S2",
      w: 440,
      h: 280,
      image: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=1000&q=80",
      duration: "1:15",
      title: "Milano Cathedral Shoot Behind The Scenes",
      subtitle: "Horizontal · Cinematic BTS Film"
    },
    {
      id: "S3",
      w: 340,
      h: 340,
      image: "https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=800&q=80",
      duration: "0:28",
      title: "Bespoke Silk Embroidery & Crystals Detail",
      subtitle: "Square · Atelier Craftsmanship"
    },
    {
      id: "S4",
      w: 320,
      h: 420,
      image: "https://images.unsplash.com/photo-1736342182642-e2042084f47c?auto=format&fit=crop&w=800&q=80",
      duration: "0:54",
      title: "Evening Gala Double-Layered Drape",
      subtitle: "Vertical · Evening Collection"
    },
    {
      id: "S5",
      w: 420,
      h: 260,
      image: "https://images.unsplash.com/photo-1782025419629-d69df1556e0c?auto=format&fit=crop&w=1000&q=80",
      duration: "1:30",
      title: "Alora Private Trunk Show — London Mayfair",
      subtitle: "Horizontal · Event Chronicle"
    }
  ];

  for (const item of socialCardsData) {
    const cardDSL = [
      // Card Frame (Vertical stack, fixed width, auto height)
      `+FrameNode SocialCard_${item.id} parent="SocialTrack";`,
      `SET SocialCard_${item.id} width="${item.w}px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="14px" fill="rgba(0,0,0,0)";`,
      
      // Image Box (relative position so image and badge pin cleanly inside)
      `+FrameNode SocialImgBox_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialImgBox_${item.id} width="${item.w}px" height="${item.h}px" position="relative" fill="rgba(0,0,0,0)";`,
      
      `+FrameNode SocialImg_${item.id} parent="SocialImgBox_${item.id}";`,
      `SET SocialImg_${item.id} width="${item.w}px" height="${item.h}px" position="absolute" top="0px" left="0px" fill="${item.image}" radius="24px";`,
      
      // Duration Pill Badge (top-right inside image box)
      `+FrameNode SocialBadgeBox_${item.id} parent="SocialImgBox_${item.id}";`,
      `SET SocialBadgeBox_${item.id} layout="stack" stackDirection="horizontal" stackAlignment="center" gap="6px" height="26px" padding="0px 12px" fill="rgba(44,36,32,0.75)" radius="13px" position="absolute" top="16px" left="16px";`,
      `+RichTextNode SocialBadgeText_${item.id} parent="SocialBadgeBox_${item.id}";`,
      `SET SocialBadgeText_${item.id} text="▶ ${item.duration}" fontSize="11px" fontWeight="500" textColor="#FFFFFF";`,

      // Title & Subtitle below image
      `+RichTextNode SocialCardTitle_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialCardTitle_${item.id} text="${item.title}" fontName="Bodoni Moda" fontSize="16px" fontWeight="500" textColor="#2C2420";`,
      `+RichTextNode SocialCardSub_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialCardSub_${item.id} text="${item.subtitle}" fontSize="11px" fontWeight="400" textColor="#9C8B7E";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Social Card ${item.id}`);
  }

  console.log("=== EXACT LIFESTYLE & JOURNAL @ALORAABAYA SECTION COMPLETE ===");
  return { status: "success", socialSectionBuilt: true };
}

return await run();
