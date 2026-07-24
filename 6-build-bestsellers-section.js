async function run() {
  console.log("=== BUILDING EXACT 'BEST SELLERS OF THE SEASON' SECTION BELOW CATEGORIES ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, HeroSection, ArrivalsSection, or CategoriesSection!
  // We only clean up any previous/failed BestSellersSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldBestSellers = desktopNode.children.filter(c => c.name?.toLowerCase().includes("bestseller") || c.name?.toLowerCase().includes("seller") || c.name?.toLowerCase().includes("favorite"));
    if (oldBestSellers.length > 0) {
      console.log(`Cleaning up ${oldBestSellers.length} previous Best Sellers section(s)...`);
      await framer.removeNodes(oldBestSellers.map(c => c.id));
    }
  }

  async function applySafe(dsl, path, label) {
    if (!dsl || dsl.trim() === "") return;
    console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
    const result = await framer.agent.applyChanges(dsl, { pagePath: path });
    console.log(`[${label}] Result:`, JSON.stringify(result, null, 2));
    return result;
  }

  // STEP 1: Main Container, Section Header & Filter Tabs Row
  const headerDSL = [
    `+FrameNode BestSellersSection parent="${homeDesktopBp}";`,
    `SET BestSellersSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="56px" padding="110px 60px" fill="#FAF9F6";`,
    
    // Header Group
    `+FrameNode BestSellersHeader parent="BestSellersSection";`,
    `SET BestSellersHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="20px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode BestSellersEyebrow parent="BestSellersHeader";`,
    `SET BestSellersEyebrow text="CLIENT FAVORITES" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode BestSellersTitle parent="BestSellersHeader";`,
    `SET BestSellersTitle text="Best Sellers of the Season" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,
    
    // Filter Tabs Row
    `+FrameNode BestSellersTabs parent="BestSellersHeader";`,
    `SET BestSellersTabs layout="stack" stackDirection="horizontal" stackAlignment="center" gap="12px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    // Tab 1 (Active)
    `+FrameNode BSTab_All parent="BestSellersTabs";`,
    `SET BSTab_All layout="stack" stackAlignment="center" stackDistribution="center" height="36px" padding="0px 22px" fill="#2C2420" radius="18px";`,
    `+RichTextNode BSTabText_All parent="BSTab_All";`,
    `SET BSTabText_All text="ALL PIECES" fontSize="10px" letterSpacing="1.5px" fontWeight="600" textColor="#FAF9F6";`,

    // Tab 2
    `+FrameNode BSTab_Silks parent="BestSellersTabs";`,
    `SET BSTab_Silks layout="stack" stackAlignment="center" stackDistribution="center" height="36px" padding="0px 22px" fill="#F0EBE1" radius="18px";`,
    `+RichTextNode BSTabText_Silks parent="BSTab_Silks";`,
    `SET BSTabText_Silks text="EMBROIDERED SILKS" fontSize="10px" letterSpacing="1.5px" fontWeight="600" textColor="#6B5E53";`,

    // Tab 3
    `+FrameNode BSTab_Daily parent="BestSellersTabs";`,
    `SET BSTab_Daily layout="stack" stackAlignment="center" stackDistribution="center" height="36px" padding="0px 22px" fill="#F0EBE1" radius="18px";`,
    `+RichTextNode BSTabText_Daily parent="BSTab_Daily";`,
    `SET BSTabText_Daily text="DAILY MODEST" fontSize="10px" letterSpacing="1.5px" fontWeight="600" textColor="#6B5E53";`,

    // Tab 4
    `+FrameNode BSTab_Occasion parent="BestSellersTabs";`,
    `SET BSTab_Occasion layout="stack" stackAlignment="center" stackDistribution="center" height="36px" padding="0px 22px" fill="#F0EBE1" radius="18px";`,
    `+RichTextNode BSTabText_Occasion parent="BSTab_Occasion";`,
    `SET BSTabText_Occasion text="OCCASION GOWNS" fontSize="10px" letterSpacing="1.5px" fontWeight="600" textColor="#6B5E53";`,

    // Grid Container for 4 Cards (initial fixed height to avoid empty auto-height error)
    `+FrameNode BestSellersGrid parent="BestSellersSection";`,
    `SET BestSellersGrid layout="stack" stackDirection="horizontal" stackAlignment="start" stackDistribution="center" gap="24px" width="1320px" height="620px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Best Sellers Header & Tabs & Grid Container");

  // STEP 2: Best Seller Cards Data
  const bestSellersData = [
    {
      id: "BS1",
      category: "EMBROIDERED SILKS",
      stock: "(48)",
      title: "Noor Pearl-Trimmed Chiffon",
      price: "2,650 SAR",
      rating: "★ 5.0",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "BS2",
      category: "DAILY MODEST",
      stock: "(62)",
      title: "Al-Dana Pleated Crepe Abaya",
      price: "1,950 SAR",
      rating: "★ 4.9",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "BS3",
      category: "OCCASION GOWNS",
      stock: "(35)",
      title: "Sultana Gold-Embroidered...",
      price: "3,400 SAR",
      rating: "★ 5.0",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "BS4",
      category: "EMBROIDERED SILKS",
      stock: "(54)",
      title: "Lulwa Ivory Raw Silk Coat",
      price: "2,850 SAR",
      rating: "★ 4.9",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    }
  ];

  for (const bs of bestSellersData) {
    const cardDSL = [
      // Main Card Frame
      `+FrameNode BSCard_${bs.id} parent="BestSellersGrid";`,
      `SET BSCard_${bs.id} width="312px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="0px" fill="#F4F1EA" radius="18px" overflow="clip" boxShadows.0="0px 10px 30px 0px rgba(0,0,0,0.04)";`,
      
      // Image Box with Badge & Rating (pinned cleanly in single statement)
      `+FrameNode BSImgBox_${bs.id} parent="BSCard_${bs.id}";`,
      `SET BSImgBox_${bs.id} width="312px" height="420px" position="relative" fill="rgba(0,0,0,0)";`,
      `+FrameNode BSImg_${bs.id} parent="BSImgBox_${bs.id}";`,
      `SET BSImg_${bs.id} width="312px" height="420px" position="absolute" top="0px" left="0px" fill="${bs.image}";`,
      
      // Top-Left Badge
      `+FrameNode BSBadge_${bs.id} parent="BSImgBox_${bs.id}";`,
      `SET BSBadge_${bs.id} layout="stack" stackAlignment="center" stackDistribution="center" height="26px" padding="0px 12px" fill="#8C7A6B" radius="13px" position="absolute" top="16px" left="16px";`,
      `+RichTextNode BSBadgeText_${bs.id} parent="BSBadge_${bs.id}";`,
      `SET BSBadgeText_${bs.id} text="BEST SELLER" fontSize="9px" letterSpacing="1.5px" fontWeight="600" textColor="#FAF9F6";`,

      // Top-Right Rating Pill
      `+FrameNode BSRating_${bs.id} parent="BSImgBox_${bs.id}";`,
      `SET BSRating_${bs.id} layout="stack" stackAlignment="center" stackDistribution="center" height="26px" padding="0px 10px" fill="#FAF9F6" radius="13px" position="absolute" top="16px" right="16px" boxShadows.0="0px 4px 10px 0px rgba(0,0,0,0.08)";`,
      `+RichTextNode BSRatingText_${bs.id} parent="BSRating_${bs.id}";`,
      `SET BSRatingText_${bs.id} text="${bs.rating}" fontSize="10px" fontWeight="600" textColor="#2C2420";`,

      // Content Box
      `+FrameNode BSContent_${bs.id} parent="BSCard_${bs.id}";`,
      `SET BSContent_${bs.id} width="312px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="14px" padding="20px" fill="rgba(0,0,0,0)";`,
      
      // Category & Stock Row
      `+FrameNode BSCatRow_${bs.id} parent="BSContent_${bs.id}";`,
      `SET BSCatRow_${bs.id} layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      `+RichTextNode BSCatText_${bs.id} parent="BSCatRow_${bs.id}";`,
      `SET BSCatText_${bs.id} text="${bs.category}" fontSize="9px" letterSpacing="1.5px" fontWeight="600" textColor="#9C8B7E";`,
      `+RichTextNode BSStockText_${bs.id} parent="BSCatRow_${bs.id}";`,
      `SET BSStockText_${bs.id} text="${bs.stock}" fontSize="10px" fontWeight="500" textColor="#9C8B7E";`,

      // Product Title
      `+RichTextNode BSTitle_${bs.id} parent="BSContent_${bs.id}";`,
      `SET BSTitle_${bs.id} text="${bs.title}" fontName="Bodoni Moda" fontSize="18px" fontWeight="500" textColor="#2C2420";`,
      
      // Subtle Divider
      `+FrameNode BSDiv_${bs.id} parent="BSContent_${bs.id}";`,
      `SET BSDiv_${bs.id} width="100%" height="1px" fill="#E8E2D8";`,

      // Bottom Price & Action Row
      `+FrameNode BSBottomRow_${bs.id} parent="BSContent_${bs.id}";`,
      `SET BSBottomRow_${bs.id} layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      `+RichTextNode BSPriceText_${bs.id} parent="BSBottomRow_${bs.id}";`,
      `SET BSPriceText_${bs.id} text="${bs.price}" fontSize="12px" fontWeight="600" textColor="#2C2420" letterSpacing="0.5px";`,
      `+RichTextNode BSActionText_${bs.id} parent="BSBottomRow_${bs.id}";`,
      `SET BSActionText_${bs.id} text="ADD TO BAG +" fontSize="10px" letterSpacing="1.5px" fontWeight="600" textColor="#6B5E53";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Best Seller Card ${bs.title}`);
  }

  // STEP 3: Set BestSellersGrid height back to auto
  await applySafe(`SET BestSellersGrid height="auto";`, "/", "Set Best Sellers Grid Height Auto");

  console.log("=== EXACT BEST SELLERS SECTION COMPLETE ===");
  return { status: "success", bestSellersSectionBuilt: true };
}

return await run();
