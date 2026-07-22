async function run() {
  console.log("=== REORDERING SOCIAL SECTION AND FOOTER SO CAROUSEL SITS RIGHT BELOW TESTIMONIALS ===");

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

  // STEP 1: Clean up existing Social/Journal section(s) and FooterSection
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children) {
    const toRemove = [];
    for (const c of desktopNode.children) {
      const node = await framer.agent.getNode({ id: c.id });
      const name = (node?.name || node?.attributes?.name || "").toLowerCase();
      const text = (node?.attributes?.text || "").toLowerCase();
      // Check if social or footer
      if (
        name.includes("social") ||
        name.includes("lifestyle") ||
        name.includes("journal") ||
        name.includes("chronicle") ||
        name.includes("footer") ||
        c.id === "TDz01QmQg"
      ) {
        toRemove.push(c.id);
      }
    }
    if (toRemove.length > 0) {
      console.log(`Removing ${toRemove.length} old Social/Footer node(s) (${toRemove.join(", ")}) so we can append cleanly in exact order...`);
      await framer.removeNodes(toRemove);
    }
  }

  // STEP 2: Build SocialSection right below TestimonialsSection
  console.log("--- BUILDING SOCIAL SECTION ---");
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
      `+FrameNode SocialCard_${item.id} parent="SocialTrack";`,
      `SET SocialCard_${item.id} width="${item.w}px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="14px" fill="rgba(0,0,0,0)";`,
      
      `+FrameNode SocialImgBox_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialImgBox_${item.id} width="${item.w}px" height="${item.h}px" position="relative" fill="rgba(0,0,0,0)";`,
      
      `+FrameNode SocialImg_${item.id} parent="SocialImgBox_${item.id}";`,
      `SET SocialImg_${item.id} width="${item.w}px" height="${item.h}px" position="absolute" top="0px" left="0px" fill="${item.image}" radius="24px";`,
      
      `+FrameNode SocialBadgeBox_${item.id} parent="SocialImgBox_${item.id}";`,
      `SET SocialBadgeBox_${item.id} layout="stack" stackDirection="horizontal" stackAlignment="center" gap="6px" height="26px" padding="0px 12px" fill="rgba(44,36,32,0.75)" radius="13px" position="absolute" top="16px" left="16px";`,
      `+RichTextNode SocialBadgeText_${item.id} parent="SocialBadgeBox_${item.id}";`,
      `SET SocialBadgeText_${item.id} text="▶ ${item.duration}" fontSize="11px" fontWeight="500" textColor="#FFFFFF";`,

      `+RichTextNode SocialCardTitle_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialCardTitle_${item.id} text="${item.title}" fontName="Bodoni Moda" fontSize="16px" fontWeight="500" textColor="#2C2420";`,
      `+RichTextNode SocialCardSub_${item.id} parent="SocialCard_${item.id}";`,
      `SET SocialCardSub_${item.id} text="${item.subtitle}" fontSize="11px" fontWeight="400" textColor="#9C8B7E";`
    ].join(" ");

    await applySafe(cardDSL, "/", `Build Social Card ${item.id}`);
  }

  // STEP 3: Build FooterSection right below SocialSection at the very bottom
  console.log("--- BUILDING FOOTER SECTION BELOW SOCIAL SECTION ---");
  const footerDSL = [
    `+FrameNode FooterSection parent="${homeDesktopBp}";`,
    `SET FooterSection layout="stack" stackDirection="vertical" width="100%" padding="80px 48px" gap="56px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    
    `+FrameNode FootNewsletterBox parent="FooterSection";`,
    `SET FootNewsletterBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" padding="48px" fill="#F5F2EB" radius="24px" border="1px solid #E8E1D9";`,
    `+FrameNode FootNewsText parent="FootNewsletterBox";`,
    `SET FootNewsText layout="stack" stackDirection="vertical" gap="8px" width="560px";`,
    `+RichTextNode FootNewsTitle parent="FootNewsText";`,
    `SET FootNewsTitle text="Join Our Private Circle" fontSize="32px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode FootNewsSub parent="FootNewsText";`,
    `SET FootNewsSub text="Receive private invitations to our trunk shows, early access to limited editions, and bespoke styling advice directly to your inbox." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,
    
    `+FrameNode FootNewsForm parent="FootNewsletterBox";`,
    `SET FootNewsForm layout="stack" stackDirection="horizontal" gap="12px" stackAlignment="center";`,
    `+FrameNode FootInputBox parent="FootNewsForm";`,
    `SET FootInputBox layout="stack" stackDirection="horizontal" stackAlignment="center" width="300px" height="52px" padding="0px 22px" fill="#FFFFFF" radius="26px" border="1px solid #E8E1D9";`,
    `+RichTextNode FootInputText parent="FootInputBox";`,
    `SET FootInputText text="Enter your email address..." fontSize="13px" textColor="#8B7355";`,
    `+FrameNode FootSubBtn parent="FootNewsForm";`,
    `SET FootSubBtn layout="stack" stackDirection="horizontal" stackAlignment="center" height="52px" padding="0px 32px" fill="#3B2F2F" radius="26px";`,
    `+RichTextNode FootSubText parent="FootSubBtn";`,
    `SET FootSubText text="SUBSCRIBE" fontSize="13px" fontWeight="700" textColor="#FAF9F6" letterSpacing="2px";`,

    `+FrameNode FootColumns parent="FooterSection";`,
    `SET FootColumns layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="24px";`,
    
    `+FrameNode FootCol1 parent="FootColumns";`,
    `SET FootCol1 layout="stack" stackDirection="vertical" gap="16px" width="300px";`,
    `+RichTextNode FootBrand parent="FootCol1";`,
    `SET FootBrand text="ALORA" fontSize="36px" fontWeight="700" textColor="#3B2F2F" letterSpacing="6px";`,
    `+RichTextNode FootBrandDesc parent="FootCol1";`,
    `SET FootBrandDesc text="Exclusively tailored luxury abayas & evening gowns. Handcrafted in Riyadh with ethical Grade 6A silks and timeless modesty." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,
    
    `+FrameNode FootCol2 parent="FootColumns";`,
    `SET FootCol2 layout="stack" stackDirection="vertical" gap="12px" width="200px";`,
    `+RichTextNode FootCol2Head parent="FootCol2";`,
    `SET FootCol2Head text="THE ATELIER" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol2Links parent="FootCol2";`,
    `SET FootCol2Links text="All Dresses & Gowns\\nNew Arrivals (Monday)\\nBest Selling Creations\\nThe Collections\\nBespoke Bisht & Kaftans" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    `+FrameNode FootCol3 parent="FootColumns";`,
    `SET FootCol3 layout="stack" stackDirection="vertical" gap="12px" width="200px";`,
    `+RichTextNode FootCol3Head parent="FootCol3";`,
    `SET FootCol3Head text="CLIENT SERVICES" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol3Links parent="FootCol3";`,
    `SET FootCol3Links text="Atelier Heritage\\nBespoke Sizing Guide\\nWhite-Glove Shipping\\nReturns & Exchanges\\nPrivate Appointments" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    `+FrameNode FootCol4 parent="FootColumns";`,
    `SET FootCol4 layout="stack" stackDirection="vertical" gap="12px" width="260px";`,
    `+RichTextNode FootCol4Head parent="FootCol4";`,
    `SET FootCol4Head text="BOUTIQUE SALONS" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol4Links parent="FootCol4";`,
    `SET FootCol4Links text="Via Riyadh Flagship, KSA\\nAl Bujairi Heritage Suite, Diriyah\\nDIFC Gate Avenue, Dubai UAE\\nHarrods Private Concession, London UK" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    `+FrameNode FootCopyBox parent="FooterSection";`,
    `SET FootCopyBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="28px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode FootCopy parent="FootCopyBox";`,
    `SET FootCopy text="© 2026 ALORA ATELIER. All rights reserved. Crafted for royal distinction." fontSize="13px" textColor="#8B7355";`,
    `+RichTextNode FootPayment parent="FootCopyBox";`,
    `SET FootPayment text="🔒 Encrypted Secure Checkout   |   Apple Pay • Mada • Visa • Mastercard" fontSize="13px" fontWeight="600" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(footerDSL, "/", "Build Newsletter & Luxury Footer");

  const finalDesktop = await framer.agent.getNode({ id: homeDesktopBp });
  console.log("=== FINAL DESKTOP CHILDREN ORDER ===");
  for (let i = 0; i < finalDesktop.children.length; i++) {
    const c = finalDesktop.children[i];
    const n = await framer.agent.getNode({ id: c.id });
    console.log(`[${i}] ${n.name || n.attributes?.name || c.id}`);
  }

  return { status: "success", reordered: true, totalChildren: finalDesktop.children.length };
}

return await run();
