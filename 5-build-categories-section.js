async function run() {
  console.log("=== BUILDING EXACT 'EXPLORE BY CATEGORY' SECTION BELOW NEW ARRIVALS ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, HeroSection, or ArrivalsSection!
  // We only clean up any previous/failed CategoriesSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldCategories = desktopNode.children.filter(c => c.name?.toLowerCase().includes("categor") || c.name?.toLowerCase().includes("silhouett"));
    if (oldCategories.length > 0) {
      console.log(`Cleaning up ${oldCategories.length} previous Categories section(s)...`);
      await framer.removeNodes(oldCategories.map(c => c.id));
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
    `+FrameNode CategoriesSection parent="${homeDesktopBp}";`,
    `SET CategoriesSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="56px" padding="110px 60px" fill="#FAF9F6";`,
    
    // Header Group
    `+FrameNode CategoriesHeader parent="CategoriesSection";`,
    `SET CategoriesHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="16px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode CategoriesEyebrow parent="CategoriesHeader";`,
    `SET CategoriesEyebrow text="SILHOUETTES & STYLES" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode CategoriesTitle parent="CategoriesHeader";`,
    `SET CategoriesTitle text="Explore by Category" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,

    // Grid Container for 4 Cards (with initial fixed height to avoid empty auto-height error)
    `+FrameNode CategoriesGrid parent="CategoriesSection";`,
    `SET CategoriesGrid layout="stack" stackDirection="horizontal" stackAlignment="start" stackDistribution="center" gap="24px" width="1320px" height="520px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Categories Header & Grid Container");

  // STEP 2: Category Cards Data
  const categoriesData = [
    {
      id: "Cat1",
      count: "24 PIECES",
      title: "Daily Modest Abayas",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "Cat2",
      count: "18 PIECES",
      title: "Occasion & Evening Gowns",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "Cat3",
      count: "15 PIECES",
      title: "Bespoke Bisht & Kaftans",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "Cat4",
      count: "32 PIECES",
      title: "Luxury Daily Dresses",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  for (const cat of categoriesData) {
    const cardDSL = [
      // Main Category Card Frame
      `+FrameNode CatCard_${cat.id} parent="CategoriesGrid";`,
      `SET CatCard_${cat.id} width="312px" height="520px" position="relative" radius="20px" overflow="clip" fill="#E6DFD5" boxShadows.0="0px 14px 35px 0px rgba(0,0,0,0.12)";`,
      
      // Background Image (pinned absolute top/left)
      `+FrameNode CatImg_${cat.id} parent="CatCard_${cat.id}";`,
      `SET CatImg_${cat.id} width="312px" height="520px" position="absolute" top="0px" left="0px" fill="${cat.image}";`,

      // Dark Shading Overlay to make white text pop (pinned absolute top/left)
      `+FrameNode CatOverlay_${cat.id} parent="CatCard_${cat.id}";`,
      `SET CatOverlay_${cat.id} width="312px" height="520px" position="absolute" top="0px" left="0px" fill="rgba(20, 18, 16, 0.45)";`,

      // Bottom Content Stack (pinned absolute bottom/left)
      `+FrameNode CatContent_${cat.id} parent="CatCard_${cat.id}";`,
      `SET CatContent_${cat.id} width="312px" height="auto" position="absolute" bottom="0px" left="0px" layout="stack" stackDirection="vertical" stackAlignment="center" stackDistribution="end" gap="10px" padding="36px 20px" fill="rgba(0,0,0,0)";`,
      
      // Piece Count Eyebrow
      `+RichTextNode CatCount_${cat.id} parent="CatContent_${cat.id}";`,
      `SET CatCount_${cat.id} text="${cat.count}" fontSize="10px" letterSpacing="2.5px" fontWeight="600" textColor="#E6DFD5" textAlignment="center";`,

      // Category Title in Bodoni Moda
      `+RichTextNode CatTitle_${cat.id} parent="CatContent_${cat.id}";`,
      `SET CatTitle_${cat.id} text="${cat.title}" fontName="Bodoni Moda" fontSize="22px" fontWeight="500" textColor="#FAF9F6" textAlignment="center";`,

      // Gold/Bronze Accent Line below title
      `+FrameNode CatLine_${cat.id} parent="CatContent_${cat.id}";`,
      `SET CatLine_${cat.id} width="24px" height="2px" fill="#D4AF37" radius="1px";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Category Card ${cat.title}`);
  }

  // STEP 3: Set CategoriesGrid height back to auto
  await applySafe(`SET CategoriesGrid height="auto";`, "/", "Set Categories Grid Height Auto");

  console.log("=== EXACT EXPLORE BY CATEGORY SECTION COMPLETE ===");
  return { status: "success", categoriesSectionBuilt: true };
}

return await run();
