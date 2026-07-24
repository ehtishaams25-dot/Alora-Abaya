async function run() {
  console.log("=== BUILDING PIXEL-PERFECT EDITORIAL FOOTER EXACTLY LIKE REFERENCE SCREENSHOT ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  async function applySafe(dsl, path, label) {
    if (!dsl || dsl.trim() === "") return;
    console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
    const result = await framer.agent.applyChanges(dsl, { pagePath: path });
    console.log(`[${label}] Result:`, JSON.stringify(result, null, 2));
    return result;
  }

  // STEP 1: Clean up any existing Footer nodes so we build fresh at the very bottom
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const toRemove = [];
    for (const c of desktopNode.children) {
      const node = await framer.agent.getNode({ id: c.id });
      const name = (node?.name || node?.attributes?.name || "").toLowerCase();
      if (name.includes("footer") || c.id === "xML_y0aWb" || c.id === "TDz01QmQg") {
        toRemove.push(c.id);
      }
    }
    if (toRemove.length > 0) {
      console.log(`Removing ${toRemove.length} previous footer node(s) (${toRemove.join(", ")})...`);
      await framer.removeNodes(toRemove);
    }
  }

  // STEP 2: Main Footer Section Container
  const mainDSL = [
    `+FrameNode FooterSection parent="${homeDesktopBp}";`,
    `SET FooterSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="0px" padding="80px 80px 40px 80px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,

    // TOP DIVIDER AREA: Brand Info (Left) & Private Circle Box (Right)
    `+FrameNode FootTopRow parent="FooterSection";`,
    `SET FootTopRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" paddingBottom="64px" borderBottom="1px solid #E8E1D9";`,

    // Left Side: Brand & Description
    `+FrameNode FootBrandBox parent="FootTopRow";`,
    `SET FootBrandBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="18px" width="460px" height="auto";`,
    `+RichTextNode FootBrandLogo parent="FootBrandBox";`,
    `SET FootBrandLogo text="ALORA" fontName="Bodoni Moda" fontSize="40px" fontWeight="400" textColor="#2C2420" letterSpacing="4px";`,
    `+RichTextNode FootBrandDesc parent="FootBrandBox";`,
    `SET FootBrandDesc text="Experience the calm sophistication of luxury modesty. Hand-tailored from fluid silks and pure double-layered chiffons, designed to drape effortlessly with dignified poise." fontSize="14px" textColor="#6E5C53" lineHeight="1.7em";`,
    
    // VIP Badge row inside Left Side
    `+FrameNode FootVipRow parent="FootBrandBox";`,
    `SET FootVipRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="10px" paddingTop="8px";`,
    `+FrameNode FootVipDot parent="FootVipRow";`,
    `SET FootVipDot width="8px" height="8px" radius="4px" fill="#4A6B5B";`,
    `+RichTextNode FootVipText parent="FootVipRow";`,
    `SET FootVipText text="ENCRYPTED GLOBAL VIP CHECKOUT" fontSize="11px" fontWeight="700" textColor="#4A6B5B" letterSpacing="2px";`,

    // Right Side: Private Circle Newsletter Box
    `+FrameNode FootNewsBox parent="FootTopRow";`,
    `SET FootNewsBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="660px" height="auto" padding="42px" fill="#F5F2EB" radius="24px" border="1px solid #EAE3DA";`,
    `+RichTextNode FootNewsTitle parent="FootNewsBox";`,
    `SET FootNewsTitle text="Join the Alora Private Circle" fontName="Bodoni Moda" fontSize="28px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode FootNewsSub parent="FootNewsBox";`,
    `SET FootNewsSub text="Be the first to receive invitations to seasonal trunk shows, bespoke pre-order drops, and private salon editorials." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em";`,
    
    // Form Input & Button Row
    `+FrameNode FootFormRow parent="FootNewsBox";`,
    `SET FootFormRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="12px" width="100%" paddingTop="8px";`,
    `+FrameNode FootInputBox parent="FootFormRow";`,
    `SET FootInputBox layout="stack" stackDirection="horizontal" stackAlignment="center" width="380px" height="50px" padding="0px 24px" fill="#FFFFFF" radius="25px" border="1px solid #E8E1D9";`,
    `+RichTextNode FootInputText parent="FootInputBox";`,
    `SET FootInputText text="Enter your email address..." fontSize="13px" textColor="#8B7355";`,
    `+FrameNode FootSubBtn parent="FootFormRow";`,
    `SET FootSubBtn layout="stack" stackDirection="horizontal" stackAlignment="center" height="50px" padding="0px 32px" fill="#3B2F2F" radius="25px";`,
    `+RichTextNode FootSubText parent="FootSubBtn";`,
    `SET FootSubText text="JOIN CIRCLE" fontSize="12px" fontWeight="700" textColor="#FFFFFF" letterSpacing="2px";`
  ].join(" ");
  await applySafe(mainDSL, "/", "Build Footer Top Row (Brand & Newsletter)");

  // STEP 3: Middle 4 Columns (Separate nodes per link for 0 clipping and perfect vertical spacing)
  const columnsDSL = [
    `+FrameNode FootColumns parent="FooterSection";`,
    `SET FootColumns layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" padding="64px 0px";`,

    // Column 1: BOUTIQUE & COLLECTIONS
    `+FrameNode FootCol1 parent="FootColumns";`,
    `SET FootCol1 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="220px" height="auto";`,
    `+RichTextNode FootCol1Head parent="FootCol1";`,
    `SET FootCol1Head text="BOUTIQUE & COLLECTIONS" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol1L1 parent="FootCol1";`,
    `SET FootCol1L1 text="All Dresses" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol1L2 parent="FootCol1";`,
    `SET FootCol1L2 text="New Arrivals" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol1L3 parent="FootCol1";`,
    `SET FootCol1L3 text="Best Sellers" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol1L4 parent="FootCol1";`,
    `SET FootCol1L4 text="Categories" fontSize="13px" textColor="#6E5C53";`,

    // Column 2: ATELIER CARE & SERVICES
    `+FrameNode FootCol2 parent="FootColumns";`,
    `SET FootCol2 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="240px" height="auto";`,
    `+RichTextNode FootCol2Head parent="FootCol2";`,
    `SET FootCol2Head text="ATELIER CARE & SERVICES" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol2L1 parent="FootCol2";`,
    `SET FootCol2L1 text="Atelier" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol2L2 parent="FootCol2";`,
    `SET FootCol2L2 text="FAQ" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol2L3 parent="FootCol2";`,
    `SET FootCol2L3 text="Returns & Exchanges" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol2L4 parent="FootCol2";`,
    `SET FootCol2L4 text="Private Concierge" fontSize="13px" textColor="#6E5C53";`,

    // Column 3: OUR SALONS
    `+FrameNode FootCol3 parent="FootColumns";`,
    `SET FootCol3 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="280px" height="auto";`,
    `+RichTextNode FootCol3Head parent="FootCol3";`,
    `SET FootCol3Head text="OUR SALONS" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol3L1 parent="FootCol3";`,
    `SET FootCol3L1 text="Flagship Salon: Via Riyadh, KSA" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol3L2 parent="FootCol3";`,
    `SET FootCol3L2 text="Al Bujairi Heritage Suite, Diriyah" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol3L3 parent="FootCol3";`,
    `SET FootCol3L3 text="Dubai International Financial Centre (DIFC)" fontSize="13px" textColor="#6E5C53";`,
    `+RichTextNode FootCol3L4 parent="FootCol3";`,
    `SET FootCol3L4 text="Harrods Concession, London UK" fontSize="13px" textColor="#6E5C53";`,

    // Column 4: SOCIAL CHRONICLE
    `+FrameNode FootCol4 parent="FootColumns";`,
    `SET FootCol4 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="260px" height="auto";`,
    `+RichTextNode FootCol4Head parent="FootCol4";`,
    `SET FootCol4Head text="SOCIAL CHRONICLE" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol4L1 parent="FootCol4";`,
    `SET FootCol4L1 text="Tag us or use #AloraAbayas to be featured in our monthly private salon chronicle." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em";`,
    `+RichTextNode FootCol4L2 parent="FootCol4";`,
    `SET FootCol4L2 text="@AloraAbaya →" fontSize="13px" fontWeight="600" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(columnsDSL, "/", "Build Footer 4 Columns");

  // STEP 4: Bottom Copyright & Location Bar
  const bottomDSL = [
    `+FrameNode FootBottomBar parent="FooterSection";`,
    `SET FootBottomBar layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" height="auto" paddingTop="28px" borderTop="1px solid #E8E1D9";`,
    
    `+RichTextNode FootCopy parent="FootBottomBar";`,
    `SET FootCopy text="© 2026 Alora Atelier. All rights reserved. Crafted with distinction." fontSize="12px" textColor="#8B7355";`,
    
    `+RichTextNode FootLocation parent="FootBottomBar";`,
    `SET FootLocation text="Privately Handcrafted in Riyadh, KSA   ·   ALORA" fontSize="12px" fontWeight="500" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(bottomDSL, "/", "Build Footer Bottom Copyright Bar");

  console.log("=== PIXEL-PERFECT EDITORIAL FOOTER COMPLETE ===");
  return { status: "success", footerComplete: true };
}

return await run();
