async function run() {
  console.log("=== BUILDING EXACT 'VOICES OF OUR PRIVATE CLIENTS' SECTION BELOW WHY CHOOSE ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  // IMPORTANT: We do NOT touch AnnounceBar, NavBar, HeroSection, ArrivalsSection, CategoriesSection, BestSellersSection, or WhyChooseSection!
  // We only clean up any previous/failed TestimonialsSection before adding our clean one.
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const oldTestimonials = desktopNode.children.filter(c => c.name?.toLowerCase().includes("testimonial") || c.name?.toLowerCase().includes("voice") || c.name?.toLowerCase().includes("client"));
    if (oldTestimonials.length > 0) {
      console.log(`Cleaning up ${oldTestimonials.length} previous Testimonials section(s)...`);
      await framer.removeNodes(oldTestimonials.map(c => c.id));
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
    `+FrameNode TestimonialsSection parent="${homeDesktopBp}";`,
    `SET TestimonialsSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="56px" padding="110px 60px" fill="#FAF9F6";`,
    
    // Header Group
    `+FrameNode TestimonialsHeader parent="TestimonialsSection";`,
    `SET TestimonialsHeader layout="stack" stackDirection="vertical" stackAlignment="center" gap="16px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
    
    `+RichTextNode TestimonialsEyebrow parent="TestimonialsHeader";`,
    `SET TestimonialsEyebrow text="VIP TESTIMONIALS" fontSize="11px" letterSpacing="3px" fontWeight="600" textColor="#9C8B7E" textAlignment="center";`,
    
    `+RichTextNode TestimonialsTitle parent="TestimonialsHeader";`,
    `SET TestimonialsTitle text="Voices of Our Private Clients" fontName="Bodoni Moda" fontSize="48px" fontWeight="400" textColor="#2C2420" textAlignment="center";`,

    // Grid Container for 4 VIP Testimonial Cards (initial fixed height to avoid empty auto-height error)
    `+FrameNode TestimonialsGrid parent="TestimonialsSection";`,
    `SET TestimonialsGrid layout="stack" stackDirection="horizontal" stackAlignment="start" stackDistribution="center" gap="24px" width="1320px" height="420px" fill="rgba(0,0,0,0)";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Build Testimonials Header & Grid Container");

  // STEP 2: VIP Testimonials Data
  const testimonialsData = [
    {
      id: "T1",
      quote: "“Finding high-end evening wear that maintains true modesty without feeling heavy was always a struggle until Alora. Being handcrafted right here in Riyadh makes the custom atelier fit feel effortless and truly royal.”",
      name: "Princess Reema Al-Saud",
      loc: "RIYADH, KSA",
      mono: "P"
    },
    {
      id: "T2",
      quote: "“The fabric quality of the Royal Silk Bisht is extraordinary. I ordered from Riyadh and it arrived in Dubai with such effortless grace. The subtle embroidery truly embodies luxury.”",
      name: "Fatima Al-Maktoum",
      loc: "DUBAI, UAE",
      mono: "F"
    },
    {
      id: "T3",
      quote: "“I ordered for a gala in London and the express shipping arrived in just 3 days beautifully boxed. Every time I wear this abaya I receive endless compliments.”",
      name: "Lady Sarah Jenkins",
      loc: "LONDON, UK",
      mono: "L"
    },
    {
      id: "T4",
      quote: "“The customer service via WhatsApp and the attention to detail in the stitching proves this is a genuine luxury house. Truly exquisite craftsmanship.”",
      name: "Sheikha Maryam Al-Thani",
      loc: "DOHA, QATAR",
      mono: "S"
    }
  ];

  for (const t of testimonialsData) {
    const cardDSL = [
      // Main Card Frame (space-between vertical layout for exact top stars, middle quote, and bottom client profile)
      `+FrameNode TestCard_${t.id} parent="TestimonialsGrid";`,
      `SET TestCard_${t.id} width="312px" height="420px" layout="stack" stackDirection="vertical" stackAlignment="start" stackDistribution="space-between" padding="36px 28px" fill="#F4F1EA" radius="20px" boxShadows.0="0px 10px 30px 0px rgba(0,0,0,0.03)";`,
      
      // Top Rating Row (★★★★★ and VERIFIED VIP CLIENT badge)
      `+FrameNode TestTopRow_${t.id} parent="TestCard_${t.id}";`,
      `SET TestTopRow_${t.id} layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      `+RichTextNode TestStars_${t.id} parent="TestTopRow_${t.id}";`,
      `SET TestStars_${t.id} text="★★★★★" fontSize="12px" letterSpacing="3px" textColor="#BA9B74";`,
      `+FrameNode TestBadge_${t.id} parent="TestTopRow_${t.id}";`,
      `SET TestBadge_${t.id} layout="stack" stackAlignment="center" stackDistribution="center" height="24px" padding="0px 10px" fill="#FAF9F6" radius="12px" border="1px solid #E6DFD5";`,
      `+RichTextNode TestBadgeText_${t.id} parent="TestBadge_${t.id}";`,
      `SET TestBadgeText_${t.id} text="VERIFIED VIP CLIENT" fontSize="8px" letterSpacing="1.2px" fontWeight="600" textColor="#3B5A40";`,

      // Middle Quote (Italic Bodoni Moda / Serif style)
      `+RichTextNode TestQuote_${t.id} parent="TestCard_${t.id}";`,
      `SET TestQuote_${t.id} text="${t.quote}" fontName="Bodoni Moda" fontStyle="italic" fontSize="14px" fontWeight="400" textColor="#2C2420";`,

      // Bottom Client Row (Name/Location + Monogram Circle)
      `+FrameNode TestClientRow_${t.id} parent="TestCard_${t.id}";`,
      `SET TestClientRow_${t.id} layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="auto" fill="rgba(0,0,0,0)";`,
      
      // Client Name & Location
      `+FrameNode TestClientInfo_${t.id} parent="TestClientRow_${t.id}";`,
      `SET TestClientInfo_${t.id} layout="stack" stackDirection="vertical" stackAlignment="start" gap="4px" width="auto" height="auto" fill="rgba(0,0,0,0)";`,
      `+RichTextNode TestClientName_${t.id} parent="TestClientInfo_${t.id}";`,
      `SET TestClientName_${t.id} text="${t.name}" fontName="Bodoni Moda" fontSize="15px" fontWeight="500" textColor="#2C2420";`,
      `+RichTextNode TestClientLoc_${t.id} parent="TestClientInfo_${t.id}";`,
      `SET TestClientLoc_${t.id} text="${t.loc}" fontSize="9px" letterSpacing="1.5px" fontWeight="600" textColor="#9C8B7E";`,

      // Monogram Circle
      `+FrameNode TestMonoBox_${t.id} parent="TestClientRow_${t.id}";`,
      `SET TestMonoBox_${t.id} width="34px" height="34px" radius="17px" fill="#FAF9F6" border="1px solid #E8E2D8" layout="stack" stackAlignment="center" stackDistribution="center";`,
      `+RichTextNode TestMonoText_${t.id} parent="TestMonoBox_${t.id}";`,
      `SET TestMonoText_${t.id} text="${t.mono}" fontName="Bodoni Moda" fontSize="13px" fontWeight="500" textColor="#6B5E53";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Testimonial Card ${t.name}`);
  }

  // STEP 3: Set TestimonialsGrid height back to auto
  await applySafe(`SET TestimonialsGrid height="auto";`, "/", "Set Testimonials Grid Height Auto");

  console.log("=== EXACT VOICES OF OUR PRIVATE CLIENTS SECTION COMPLETE ===");
  return { status: "success", testimonialsSectionBuilt: true };
}

return await run();
