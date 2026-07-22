async function run() {
  console.log("=== BUILDING EXACT 'WHY CHOOSE OUR ATELIER' SECTION BELOW BEST SELLERS ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, HeroSection, ArrivalsSection, CategoriesSection, or BestSellersSection!
  // We only clean up any previous/failed WhyChooseSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldWhyChoose = desktopNode.children.filter(c => c.name?.toLowerCase().includes("whychoose") || c.name?.toLowerCase().includes("atelierstandard") || c.name?.toLowerCase().includes("standard"));
    if (oldWhyChoose.length > 0) {
      console.log(`Cleaning up ${oldWhyChoose.length} previous Why Choose section(s)...`);
      await framer.removeNodes(oldWhyChoose.map(c => c.id));
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
    `+FrameNode WhyChooseSection parent="${homeDesktopBp}";`,
    `SET WhyChooseSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="56px" padding="110px 60px" fill="#FAF9F6";`,
    
    // Header Group
    `+FrameNode WhyChooseHeader parent="WhyChooseSection";`,
    `SET WhyChooseHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="16px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode WhyChooseEyebrow parent="WhyChooseHeader";`,
    `SET WhyChooseEyebrow text="THE ALORA STANDARD" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode WhyChooseTitle parent="WhyChooseHeader";`,
    `SET WhyChooseTitle text="Why Choose Our Atelier" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,

    // Grid Container for 4 Value Cards (initial fixed height to avoid empty auto-height error)
    `+FrameNode WhyChooseGrid parent="WhyChooseSection";`,
    `SET WhyChooseGrid layout="stack" stackDirection="horizontal" stackAlignment="start" stackDistribution="center" gap="24px" width="1320px" height="440px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Why Choose Header & Grid Container");

  // STEP 2: Value Cards Data
  const valueCardsData = [
    {
      id: "Val1",
      icon: "✦",
      title: "Premium Grade A+\nFabrics",
      desc: "We source authentic Japanese Grade-A Nidha, Korean Mulberry silks, and double-layered French chiffons that breathe effortlessly across seasons.",
      num: "01"
    },
    {
      id: "Val2",
      icon: "📐",
      title: "Custom Atelier Lengths",
      desc: "Every abaya is tailored to your exact height and shoulder drape, complete with seamless French finishes that resist fraying and wear.",
      num: "02"
    },
    {
      id: "Val3",
      icon: "🌐",
      title: "Express Saudi & GCC\nShipping",
      desc: "Delivered via express courier within 24 hours across Saudi Arabia (Riyadh, Jeddah, Al Khobar) and 48 hours across UAE, Qatar, and Kuwait, with express worldwide VIP customs handling.",
      num: "03"
    },
    {
      id: "Val4",
      icon: "💬",
      title: "Private Stylist Concierge",
      desc: "Complimentary consultation with our in-house stylists via WhatsApp for sizing advice, custom adjustments, and private salon appointments.",
      num: "04"
    }
  ];

  for (const v of valueCardsData) {
    const cardDSL = [
      // Main Card Frame
      `+FrameNode ValCard_${v.id} parent="WhyChooseGrid";`,
      `SET ValCard_${v.id} width="312px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" stackDistribution="start" padding="38px 28px" fill="#F4F1EA" radius="20px" boxShadows.0="0px 10px 30px 0px rgba(0,0,0,0.03)";`,
      
      // Top Group (Icon + Title + Description)
      `+FrameNode ValTop_${v.id} parent="ValCard_${v.id}";`,
      `SET ValTop_${v.id} layout="stack" stackDirection="vertical" stackAlignment="start" gap="20px" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      
      // Icon Squircle Box
      `+FrameNode ValIconBox_${v.id} parent="ValTop_${v.id}";`,
      `SET ValIconBox_${v.id} width="46px" height="46px" radius="15px" fill="#EAE3D2" layout="stack" stackAlignment="center" stackDistribution="center";`,
      `+RichTextNode ValIconText_${v.id} parent="ValIconBox_${v.id}";`,
      `SET ValIconText_${v.id} text="${v.icon}" fontSize="18px" textColor="#6B5E53";`,

      // Title in Bodoni Moda
      `+RichTextNode ValTitle_${v.id} parent="ValTop_${v.id}";`,
      `SET ValTitle_${v.id} text="${v.title}" fontName="Bodoni Moda" fontSize="22px" fontWeight="500" textColor="#2C2420";`,

      // Description
      `+RichTextNode ValDesc_${v.id} parent="ValTop_${v.id}";`,
      `SET ValDesc_${v.id} text="${v.desc}" fontSize="13px" fontWeight="400" textColor="#6B5E53";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Value Card ${v.num}`);
  }

  // STEP 3: Set WhyChooseGrid height back to auto
  await applySafe(`SET WhyChooseGrid height="auto";`, "/", "Set Why Choose Grid Height Auto");

  console.log("=== EXACT WHY CHOOSE OUR ATELIER SECTION COMPLETE ===");
  return { status: "success", whyChooseSectionBuilt: true };
}

return await run();
