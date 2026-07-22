async function run() {
  console.log("=== BUILDING EXACT 'NEW ARRIVALS AT THE ATELIER' SECTION BELOW HERO ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, or HeroSection!
  // We only clean up any previous failed/duplicate ArrivalsSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldArrivals = desktopNode.children.filter(c => c.name?.toLowerCase().includes("arrival"));
    if (oldArrivals.length > 0) {
      console.log(`Cleaning up ${oldArrivals.length} previous Arrivals section(s)...`);
      await framer.removeNodes(oldArrivals.map(c => c.id));
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
    `+FrameNode ArrivalsSection parent="${homeDesktopBp}";`,
    `SET ArrivalsSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="56px" padding="100px 60px" fill="#FAF9F6";`,
    
    // Header Group
    `+FrameNode ArrivalsHeader parent="ArrivalsSection";`,
    `SET ArrivalsHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="16px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode ArrivalsEyebrow parent="ArrivalsHeader";`,
    `SET ArrivalsEyebrow text="CURATED SEASONAL DROPS" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode ArrivalsTitle parent="ArrivalsHeader";`,
    `SET ArrivalsTitle text="New Arrivals at the Atelier" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,
    
    `+FrameNode ArrivalsLinkBox parent="ArrivalsHeader";`,
    `SET ArrivalsLinkBox layout="stack" stackDirection="vertical" stackAlignment="center" gap="6px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode ArrivalsLinkText parent="ArrivalsLinkBox";`,
    `SET ArrivalsLinkText text="VIEW ALL COLLECTION →" fontSize="11px" letterSpacing="2.5px" fontWeight="600" textColor="#2C2420";`,
    
    `+FrameNode ArrivalsUnderline parent="ArrivalsLinkBox";`,
    `SET ArrivalsUnderline width="170px" height="1px" fill="#2C2420";`,

    // Grid Container for 4 Cards (with fixed initial height to avoid empty auto-height error)
    `+FrameNode ArrivalsGrid parent="ArrivalsSection";`,
    `SET ArrivalsGrid layout="stack" stackDirection="horizontal" stackAlignment="start" stackDistribution="center" gap="24px" width="1320px" height="620px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Arrivals Header & Grid Container");

  // STEP 2: Product Cards Data
  const cardsData = [
    {
      id: "C1",
      title: "Royal Silk Bisht Abaya",
      price: "2,450 SAR",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      swatches: ["#1C1A18", "#3A3836", "#B89B72"]
    },
    {
      id: "C2",
      title: "Midnight Velvet Gilded Abaya",
      price: "3,100 SAR",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
      swatches: ["#1C1A18", "#3A4B3C"]
    },
    {
      id: "C3",
      title: "Desert Sand Double Nidha",
      price: "1,850 SAR",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      swatches: ["#E8DEC8", "#D4B2A7", "#7D5F4D"]
    },
    {
      id: "C4",
      title: "Emerald Silk Organza Set",
      price: "2,800 SAR",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      swatches: ["#1C1A18", "#1C3B2B"]
    }
  ];

  for (const c of cardsData) {
    const cardDSL = [
      // Main Card Frame
      `+FrameNode Card_${c.id} parent="ArrivalsGrid";`,
      `SET Card_${c.id} width="312px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="0px" fill="#F4F1EA" radius="18px" overflow="clip" boxShadows.0="0px 10px 30px 0px rgba(0,0,0,0.04)";`,
      
      // Image Box with Badge (pinned cleanly in single statement)
      `+FrameNode CardImgBox_${c.id} parent="Card_${c.id}";`,
      `SET CardImgBox_${c.id} width="312px" height="420px" position="relative" fill="rgba(0,0,0,0)";`,
      `+FrameNode CardImg_${c.id} parent="CardImgBox_${c.id}";`,
      `SET CardImg_${c.id} width="312px" height="420px" position="absolute" top="0px" left="0px" fill="${c.image}";`,
      `+FrameNode CardBadge_${c.id} parent="CardImgBox_${c.id}";`,
      `SET CardBadge_${c.id} layout="stack" stackAlignment="center" stackDistribution="center" height="26px" padding="0px 12px" fill="rgba(28, 26, 24, 0.75)" radius="13px" position="absolute" top="16px" left="16px";`,
      `+RichTextNode CardBadgeText_${c.id} parent="CardBadge_${c.id}";`,
      `SET CardBadgeText_${c.id} text="NEW ARRIVAL" fontSize="9px" letterSpacing="1.5px" fontWeight="600" textColor="#FAF9F6";`,

      // Content Box
      `+FrameNode CardContent_${c.id} parent="Card_${c.id}";`,
      `SET CardContent_${c.id} width="312px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="14px" padding="20px" fill="rgba(0,0,0,0)";`,
      
      // Info (Title + Price)
      `+FrameNode CardInfo_${c.id} parent="CardContent_${c.id}";`,
      `SET CardInfo_${c.id} layout="stack" stackDirection="vertical" stackAlignment="start" gap="6px" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      `+RichTextNode CardTitle_${c.id} parent="CardInfo_${c.id}";`,
      `SET CardTitle_${c.id} text="${c.title}" fontName="Bodoni Moda" fontSize="18px" fontWeight="500" textColor="#2C2420";`,
      `+RichTextNode CardPrice_${c.id} parent="CardInfo_${c.id}";`,
      `SET CardPrice_${c.id} text="${c.price}" fontSize="12px" fontWeight="600" textColor="#6B5E53" letterSpacing="0.5px";`,
      
      // Subtle Divider
      `+FrameNode CardDiv_${c.id} parent="CardContent_${c.id}";`,
      `SET CardDiv_${c.id} width="100%" height="1px" fill="#E8E2D8";`,

      // Swatches Row
      `+FrameNode CardSwatches_${c.id} parent="CardContent_${c.id}";`,
      `SET CardSwatches_${c.id} width="100%" height="auto" layout="stack" stackDirection="horizontal" stackAlignment="center" gap="8px" fill="rgba(0,0,0,0)";`,
      `+RichTextNode SwatchLabel_${c.id} parent="CardSwatches_${c.id}";`,
      `SET SwatchLabel_${c.id} text="COLORS AVAILABLE:" fontSize="9px" letterSpacing="1px" fontWeight="600" textColor="#9C8B7E";`
    ];

    // Add swatch dots
    c.swatches.forEach((color, sIdx) => {
      cardDSL.push(`+FrameNode Swatch_${c.id}_${sIdx} parent="CardSwatches_${c.id}";`);
      cardDSL.push(`SET Swatch_${c.id}_${sIdx} width="12px" height="12px" radius="6px" fill="${color}" border="1px solid rgba(0,0,0,0.1)";`);
    });

    await applySafe(cardDSL.join(" "), "/", `Build Card ${c.title}`);
  }

  // STEP 3: Now that cards are inside, set ArrivalsGrid height back to auto so it hugs the 4 cards
  await applySafe(`SET ArrivalsGrid height="auto";`, "/", "Set Grid Height Auto");

  console.log("=== EXACT NEW ARRIVALS SECTION COMPLETE ===");
  return { status: "success", newArrivalsBuilt: true };
}

return await run();
