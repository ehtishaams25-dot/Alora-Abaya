async function run() {
  console.log("=== BUILDING EXACT HERO, NAVBAR & ANNOUNCEMENT BAR WITH PREMIUM ICONS & BODONI MODA ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;

  async function applySafe(dsl, path, label) {
    if (!dsl || dsl.trim() === "") return;
    console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
    const result = await framer.agent.applyChanges(dsl, { pagePath: path });
    console.log(`[${label}] Result:`, JSON.stringify(result, null, 2));
  }

  // STEP 1: Wipe all children on homeDesktopBp cleanly using framer.removeNodes
  const desktopNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (desktopNode && desktopNode.children && desktopNode.children.length > 0) {
    const ids = desktopNode.children.map(c => c.id);
    console.log(`Found ${ids.length} existing child nodes on desktop breakpoint. Wiping clean using framer.removeNodes...`);
    await framer.removeNodes(ids);
    console.log("Old layout nodes removed cleanly.");
  }

  // SECTION 1: Top Announcement Bar (Exact dark bar, tracking text, discover link, right close Lucide X)
  const announceDSL = [
    `+FrameNode AnnounceBar parent="${homeDesktopBp}";`,
    `SET AnnounceBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="1440px" height="36px" fill="#1C1A18" padding="0px 24px";`,
    `+FrameNode AnnounceSpacer parent="AnnounceBar";`,
    `SET AnnounceSpacer width="24px" height="10px" fill="rgba(0,0,0,0)";`,
    `+FrameNode AnnounceCenter parent="AnnounceBar";`,
    `SET AnnounceCenter layout="stack" stackDirection="horizontal" stackAlignment="center" gap="8px" fill="rgba(0,0,0,0)" width="auto" height="auto";`,
    `+RichTextNode AnnounceText parent="AnnounceCenter";`,
    `SET AnnounceText text="NEW ARRIVALS EVERY MONDAY — EXPLORE OUR SIGNATURE ATELIER EDITION" fontSize="10px" letterSpacing="1.8px" fontWeight="500" textColor="#FAF9F6";`,
    `+RichTextNode AnnounceLink parent="AnnounceCenter";`,
    `SET AnnounceLink text="DISCOVER" fontSize="10px" letterSpacing="1.8px" fontWeight="700" textColor="#FAF9F6";`,
    `+FrameNode AnnounceCloseBox parent="AnnounceBar";`,
    `SET AnnounceCloseBox layout="stack" stackAlignment="center" stackDistribution="center" width="24px" height="24px" fill="rgba(0,0,0,0)";`,
    `+IconNode AnnounceClose set="Lucide" $control__icon="X" parent="AnnounceCloseBox";`,
    `SET AnnounceClose width="14px" height="14px" color="#FAF9F6";`
  ].join(" ");
  await applySafe(announceDSL, "/", "Build Announcement Bar");

  // SECTION 2: Navigation Bar (Exact 80px height, Bodoni Moda ALORA logo, sleek 32px pills, Lucide premium vector icons)
  const navDSL = [
    `+FrameNode NavBar parent="${homeDesktopBp}";`,
    `SET NavBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="1440px" height="80px" fill="#FAF9F6" padding="0px 36px" borderBottom="1px solid #EAE5DD";`,
    
    // Left Navigation Links
    `+FrameNode NavLeft parent="NavBar";`,
    `SET NavLeft layout="stack" stackDirection="horizontal" stackAlignment="center" gap="24px" fill="rgba(0,0,0,0)" width="auto" height="auto";`,
    `+RichTextNode Nav1 parent="NavLeft";`,
    `SET Nav1 text="ALL DRESSES" fontSize="11px" letterSpacing="2px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode Nav2 parent="NavLeft";`,
    `SET Nav2 text="NEW ARRIVALS" fontSize="11px" letterSpacing="2px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode Nav3 parent="NavLeft";`,
    `SET Nav3 text="BEST SELLERS" fontSize="11px" letterSpacing="2px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode Nav4 parent="NavLeft";`,
    `SET Nav4 text="ATELIER" fontSize="11px" letterSpacing="2px" fontWeight="500" textColor="#2C2420";`,

    // Center Logo in Bodoni Moda
    `+FrameNode NavCenter parent="NavBar";`,
    `SET NavCenter layout="stack" stackAlignment="center" stackDistribution="center" fill="rgba(0,0,0,0)" width="auto" height="auto";`,
    `+RichTextNode LogoText parent="NavCenter";`,
    `SET LogoText text="ALORA" fontName="Bodoni Moda" fontSize="34px" fontWeight="600" textColor="#2C2420" letterSpacing="9px" textAlignment="center";`,

    // Right Actions & Pills
    `+FrameNode NavRight parent="NavBar";`,
    `SET NavRight layout="stack" stackDirection="horizontal" stackAlignment="center" gap="14px" fill="rgba(0,0,0,0)" width="auto" height="auto";`,
    
    // Sleek 32px Guest Mode Pill
    `+FrameNode GuestPill parent="NavRight";`,
    `SET GuestPill layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" height="32px" padding="0px 14px" gap="6px" fill="#F4F1EA" radius="16px" border="1px solid #E6E0D6";`,
    `+FrameNode GuestDot parent="GuestPill";`,
    `SET GuestDot width="6px" height="6px" radius="3px" fill="#D4AF37";`,
    `+RichTextNode GuestText parent="GuestPill";`,
    `SET GuestText text="GUEST MODE" fontSize="10px" letterSpacing="1.2px" fontWeight="600" textColor="#6B5E53";`,

    // Sleek 32px Arabic Language Pill
    `+FrameNode LangPill parent="NavRight";`,
    `SET LangPill layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" height="32px" padding="0px 14px" fill="#FAF9F6" radius="16px" border="1px solid #E6E0D6";`,
    `+RichTextNode LangText parent="LangPill";`,
    `SET LangText text="AR / العربية" fontSize="11px" fontWeight="500" textColor="#2C2420";`,

    // Premium Vector Icons (Lucide Set)
    `+FrameNode IconSearchBox parent="NavRight";`,
    `SET IconSearchBox layout="stack" stackAlignment="center" stackDistribution="center" width="32px" height="32px" fill="rgba(0,0,0,0)";`,
    `+IconNode IconSearch set="Lucide" $control__icon="Search" parent="IconSearchBox";`,
    `SET IconSearch width="18px" height="18px" color="#2C2420";`,

    `+FrameNode IconUserBox parent="NavRight";`,
    `SET IconUserBox layout="stack" stackAlignment="center" stackDistribution="center" width="32px" height="32px" fill="rgba(0,0,0,0)";`,
    `+IconNode IconUser set="Lucide" $control__icon="User" parent="IconUserBox";`,
    `SET IconUser width="18px" height="18px" color="#2C2420";`,

    `+FrameNode IconWishBox parent="NavRight";`,
    `SET IconWishBox layout="stack" stackAlignment="center" stackDistribution="center" width="32px" height="32px" fill="rgba(0,0,0,0)";`,
    `+IconNode IconWish set="Lucide" $control__icon="Heart" parent="IconWishBox";`,
    `SET IconWish width="18px" height="18px" color="#2C2420";`,

    `+FrameNode BagBox parent="NavRight";`,
    `SET BagBox layout="stack" stackDirection="horizontal" stackAlignment="center" gap="6px" height="32px" padding="0px 4px" fill="rgba(0,0,0,0)";`,
    `+IconNode IconBag set="Lucide" $control__icon="Shopping Bag" parent="BagBox";`,
    `SET IconBag width="18px" height="18px" color="#2C2420";`,
    `+RichTextNode BagCount parent="BagBox";`,
    `SET BagCount text="(2)" fontSize="11px" fontWeight="500" textColor="#2C2420";`
  ].join(" ");
  await applySafe(navDSL, "/", "Build Navigation Bar");

  // SECTION 3: Hero Section (Exact Bodoni Moda typography, background, dark overlay, sleek horizontal pill button)
  const heroDSL = [
    `+FrameNode HeroSection parent="${homeDesktopBp}";`,
    `SET HeroSection width="1440px" height="840px" layout="stack" stackDirection="vertical" stackAlignment="center" stackDistribution="center" overflow="clip";`,
    `+FrameNode HeroBg parent="HeroSection";`,
    `SET HeroBg width="1440px" height="840px" position="absolute" fill="https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=2000&q=90";`,
    `+FrameNode HeroOverlay parent="HeroSection";`,
    `SET HeroOverlay width="1440px" height="840px" position="absolute" fill="rgba(28, 26, 24, 0.45)" layout="stack" stackDirection="vertical" stackAlignment="center" stackDistribution="center" gap="24px" padding="0px 20px";`,
    `+RichTextNode HeroEyebrow parent="HeroOverlay";`,
    `SET HeroEyebrow text="THE AUTUMN / WINTER COLLECTION" fontSize="11px" letterSpacing="3.5px" fontWeight="600" textColor="#FAF9F6" textAlignment="center";`,
    `+RichTextNode HeroTitle parent="HeroOverlay";`,
    `SET HeroTitle text="Timeless Elegance\\nCaptured in Every Fold" fontName="Bodoni Moda" fontSize="68px" fontWeight="400" textColor="#FAF9F6" textAlignment="center" width="960px" lineHeight="1.08em";`,
    `+FrameNode HeroBtn parent="HeroOverlay";`,
    `SET HeroBtn layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="240px" height="50px" fill="#FAF9F6" radius="25px" boxShadows.0="0px 12px 30px 0px rgba(0,0,0,0.3)";`,
    `+RichTextNode HeroBtnText parent="HeroBtn";`,
    `SET HeroBtnText text="EXPLORE COLLECTION" fontSize="11.5px" fontWeight="600" textColor="#1C1A18" letterSpacing="2.5px" width="auto";`
  ].join(" ");
  await applySafe(heroDSL, "/", "Build Exact Hero Section");

  console.log("=== HERO, NAVBAR & ANNOUNCEMENT BAR BUILD COMPLETE ===");
  return { status: "success", premiumIconsAndBodoniModaApplied: true };
}

run().catch(err => {
  console.error("Fatal Error:", err);
  process.exit(1);
});
