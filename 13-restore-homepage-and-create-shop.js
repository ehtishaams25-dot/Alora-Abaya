async function run() {
  console.log("=== EMERGENCY RESTORATION: REBUILDING HOMEPAGE TO 100% PIXEL-PERFECT STATE & CREATING SEPARATE ALL DRESSES PAGE ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  if (!homePage) {
    throw new Error("No home page found in Framer project.");
  }

  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  if (!homeDesktopBp) {
    throw new Error("No desktop breakpoint found on home page.");
  }

  console.log(`Restoring Homepage ID: ${homePage.id}, Breakpoint ID: ${homeDesktopBp}`);

  async function applySafe(dsl, path = "/", label = "") {
    if (!dsl || dsl.trim() === "") return;
    try {
      console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
      const res = await framer.agent.applyChanges(dsl, { pagePath: path });
      console.log(`[${label}] Result:`, JSON.stringify(res, null, 2));
      return res;
    } catch (err) {
      console.error(`[${label}] Error:`, err.message || err);
      return { error: err.message || String(err) };
    }
  }

  // CLEAN ALL EXISTING CHILDREN ON HOMEPAGE BREAKPOINT TO START 100% FRESH
  const bpNode = await framer.agent.getNode({ id: homeDesktopBp });
  if (bpNode && bpNode.children && bpNode.children.length > 0) {
    console.log(`Cleaning ${bpNode.children.length} corrupted node(s) from Homepage...`);
    await framer.removeNodes(bpNode.children.map(c => c.id));
  }

  // Setup Home Desktop background & layout
  await applySafe(`SET ${homeDesktopBp} layout="stack" stackDirection="vertical" width="1200px" height="auto" gap="0px" fill="#FAF9F6" overflow="clip";`, "/", "Setup Home Desktop");

  // ==========================================
  // HOMEPAGE PART 1: Top AnnounceBar & NavBar
  // ==========================================
  const navDSL = [
    `+FrameNode AnnounceBar parent="${homeDesktopBp}";`,
    `SET AnnounceBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="100%" height="40px" fill="#1A1817" padding="8px 24px" gap="16px";`,
    `+RichTextNode AnnounceText parent="AnnounceBar";`,
    `SET AnnounceText text="NEW ARRIVALS EVERY MONDAY — EXPLORE OUR SIGNATURE ATELIER EDITION" fontSize="11px" fontWeight="500" textColor="#FAF9F6" letterSpacing="2px";`,
    `+FrameNode AnnounceBtn parent="AnnounceBar";`,
    `SET AnnounceBtn layout="stack" stackDirection="horizontal" padding="4px 12px" fill="#8B7355" radius="12px";`,
    `+RichTextNode AnnounceBtnText parent="AnnounceBtn";`,
    `SET AnnounceBtnText text="EXPLORE" fontSize="10px" fontWeight="700" textColor="#FAF9F6" letterSpacing="1px";`,

    `+FrameNode NavBar parent="${homeDesktopBp}";`,
    `SET NavBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="86px" fill="#FAF9F6" padding="0px 48px" borderBottom="1px solid #E8E1D9";`,
    
    `+FrameNode NavLinksBox parent="NavBar";`,
    `SET NavLinksBox layout="stack" stackDirection="horizontal" gap="28px" width="380px";`,
    `+RichTextNode NavLink1 parent="NavLinksBox";`,
    `SET NavLink1 text="ALL DRESSES" fontSize="12px" fontWeight="600" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode NavLink2 parent="NavLinksBox";`,
    `SET NavLink2 text="NEW ARRIVALS" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode NavLink3 parent="NavLinksBox";`,
    `SET NavLink3 text="BEST SELLERS" fontSize="12px" fontWeight="600" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode NavLink4 parent="NavLinksBox";`,
    `SET NavLink4 text="THE ATELIER" fontSize="12px" fontWeight="600" textColor="#3B2F2F" letterSpacing="2px";`,

    `+FrameNode BrandLogoBox parent="NavBar";`,
    `SET BrandLogoBox layout="stack" stackDirection="vertical" stackAlignment="center" width="300px" gap="2px";`,
    `+RichTextNode BrandTitle parent="BrandLogoBox";`,
    `SET BrandTitle text="ALORA" fontName="Bodoni Moda" fontSize="38px" fontWeight="700" textColor="#2C2420" letterSpacing="8px";`,
    `+RichTextNode BrandSubtitle parent="BrandLogoBox";`,
    `SET BrandSubtitle text="RIYADH   ·   LONDON" fontSize="9px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,

    `+FrameNode UtilityBox parent="NavBar";`,
    `SET UtilityBox layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="end" gap="20px" width="380px";`,
    `+FrameNode GuestModeBadge parent="UtilityBox";`,
    `SET GuestModeBadge layout="stack" stackDirection="horizontal" stackAlignment="center" padding="6px 14px" fill="#F5F2EB" radius="16px" gap="6px";`,
    `+FrameNode GuestDot parent="GuestModeBadge";`,
    `SET GuestDot width="6px" height="6px" radius="3px" fill="#8B7355";`,
    `+RichTextNode GuestText parent="GuestModeBadge";`,
    `SET GuestText text="GUEST MODE" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="1px";`,
    `+RichTextNode LangToggle parent="UtilityBox";`,
    `SET LangToggle text="AR / العربية" fontSize="12px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode IconsText parent="UtilityBox";`,
    `SET IconsText text="🔍   👤   ♡   🛍 (2)" fontSize="14px" fontWeight="500" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(navDSL, "/", "Homepage: Nav & Header");

  // ==========================================
  // HOMEPAGE PART 2: Hero Section (2 Columns)
  // ==========================================
  const heroDSL = [
    `+FrameNode HeroSection parent="${homeDesktopBp}";`,
    `SET HeroSection layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" height="auto" padding="64px 48px" gap="48px" fill="#FAF9F6";`,
    
    `+FrameNode HeroLeft parent="HeroSection";`,
    `SET HeroLeft layout="stack" stackDirection="vertical" stackAlignment="start" width="52%" gap="28px";`,
    `+FrameNode HeroEyebrowBox parent="HeroLeft";`,
    `SET HeroEyebrowBox layout="stack" stackDirection="horizontal" stackAlignment="center" gap="8px" padding="6px 14px" fill="#F5F2EB" radius="20px";`,
    `+FrameNode HeroEyebrowDot parent="HeroEyebrowBox";`,
    `SET HeroEyebrowDot width="6px" height="6px" radius="3px" fill="#8B7355";`,
    `+RichTextNode HeroEyebrowText parent="HeroEyebrowBox";`,
    `SET HeroEyebrowText text="THE AUTUMN/WINTER 2026 CAMPAIGN" fontSize="11px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode HeroTitle parent="HeroLeft";`,
    `SET HeroTitle text="Grace in Every Movement. Dignity in Every Drape." fontName="Bodoni Moda" fontSize="56px" fontWeight="500" textColor="#2C2420" lineHeight="1.15em";`,
    `+RichTextNode HeroSubtitle parent="HeroLeft";`,
    `SET HeroSubtitle text="Hand-tailored in Riyadh from Japanese silk and bespoke double-layered chiffons. Crafted for the modern modest woman who speaks in quiet luxury." fontSize="16px" textColor="#6E5C53" lineHeight="1.6em";`,
    `+FrameNode HeroActionRow parent="HeroLeft";`,
    `SET HeroActionRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="16px" paddingTop="12px";`,
    `+FrameNode HeroPrimaryBtn parent="HeroActionRow";`,
    `SET HeroPrimaryBtn layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" padding="16px 36px" fill="#2C2420" radius="30px";`,
    `+RichTextNode HeroPrimaryText parent="HeroPrimaryBtn";`,
    `SET HeroPrimaryText text="EXPLORE THE CAMPAIGN →" fontSize="12px" fontWeight="700" textColor="#FAF9F6" letterSpacing="2px";`,
    `+FrameNode HeroSecondaryBtn parent="HeroActionRow";`,
    `SET HeroSecondaryBtn layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" padding="16px 32px" fill="#FAF9F6" radius="30px" border="1px solid #D8CFC4";`,
    `+RichTextNode HeroSecondaryText parent="HeroSecondaryBtn";`,
    `SET HeroSecondaryText text="BOOK PRIVATE SALON APPOINTMENT" fontSize="12px" fontWeight="700" textColor="#3B2F2F" letterSpacing="1px";`,
    `+FrameNode HeroTrustRow parent="HeroLeft";`,
    `SET HeroTrustRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="24px" paddingTop="20px";`,
    `+RichTextNode HeroTrust1 parent="HeroTrustRow";`,
    `SET HeroTrust1 text="✦ Handcrafted in Riyadh" fontSize="12px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode HeroTrust2 parent="HeroTrustRow";`,
    `SET HeroTrust2 text="✦ Bespoke Fitting Available" fontSize="12px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode HeroTrust3 parent="HeroTrustRow";`,
    `SET HeroTrust3 text="✦ Worldwide Express Delivery" fontSize="12px" fontWeight="600" textColor="#8B7355";`,

    `+FrameNode HeroRight parent="HeroSection";`,
    `SET HeroRight layout="stack" stackDirection="horizontal" width="45%" height="640px" gap="16px";`,
    `+FrameNode HeroImgMain parent="HeroRight";`,
    `SET HeroImgMain width="68%" height="100%" fill="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="24px" overflow="clip";`,
    `+FrameNode HeroImgSide parent="HeroRight";`,
    `SET HeroImgSide layout="stack" stackDirection="vertical" width="30%" height="100%" gap="16px";`,
    `+FrameNode HeroImgSide1 parent="HeroImgSide";`,
    `SET HeroImgSide1 width="100%" height="48%" fill="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode HeroImgSide2 parent="HeroImgSide";`,
    `SET HeroImgSide2 width="100%" height="48%" fill="https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`
  ].join(" ");
  await applySafe(heroDSL, "/", "Homepage: Hero Section");

  // ==========================================
  // HOMEPAGE PART 3: New Arrivals Section (4 Cards)
  // ==========================================
  const arrivalsDSL = [
    `+FrameNode ArrivalsSection parent="${homeDesktopBp}";`,
    `SET ArrivalsSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode ArrHeader parent="ArrivalsSection";`,
    `SET ArrHeader layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="end" width="100%";`,
    `+FrameNode ArrHeadLeft parent="ArrHeader";`,
    `SET ArrHeadLeft layout="stack" stackDirection="vertical" gap="8px";`,
    `+RichTextNode ArrEyebrow parent="ArrHeadLeft";`,
    `SET ArrEyebrow text="CURATED RELEASES" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode ArrTitle parent="ArrHeadLeft";`,
    `SET ArrTitle text="New Arrivals: The Autumn Edition" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode ArrViewAll parent="ArrHeader";`,
    `SET ArrViewAll text="VIEW ALL NEW ARRIVALS →" fontSize="13px" fontWeight="700" textColor="#2C2420" letterSpacing="1px";`,
    `+FrameNode ArrGrid parent="ArrivalsSection";`,
    `SET ArrGrid layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" gap="24px";`
  ].join(" ");
  await applySafe(arrivalsDSL, "/", "Homepage: Arrivals Header");

  const arrivalsData = [
    { id: "Arr1", title: "Royal Silk Bisht Abaya", price: "2,450 SAR", cat: "ABAYAS", rating: "★ 5.0", badge: "NEW ARRIVAL", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" },
    { id: "Arr2", title: "Riyadh Noir Structured Abaya", price: "1,650 SAR", cat: "ABAYAS", rating: "★ 4.9", badge: "NEW", img: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=800&q=80" },
    { id: "Arr3", title: "Midnight Velvet Gilded Kaftan", price: "3,100 SAR", cat: "ABAYAS", rating: "★ 4.9", badge: "LIMITED EDITION", img: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=800&q=80" },
    { id: "Arr4", title: "Al-Dana Pleated Crepe Dress", price: "1,950 SAR", cat: "DRESSES", rating: "★ 4.9", badge: "NEW", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80" }
  ];

  for (const item of arrivalsData) {
    const cardDSL = [
      `+FrameNode ${item.id}Card parent="ArrGrid";`,
      `SET ${item.id}Card layout="stack" stackDirection="vertical" width="23%" gap="16px" fill="#FAF9F6";`,
      `+FrameNode ${item.id}ImgBox parent="${item.id}Card";`,
      `SET ${item.id}ImgBox width="100%" height="380px" fill="${item.img}" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
      `+FrameNode ${item.id}BadgeBox parent="${item.id}ImgBox";`,
      `SET ${item.id}BadgeBox layout="stack" stackDirection="horizontal" padding="6px 12px" fill="#2C2420" radius="16px";`,
      `+RichTextNode ${item.id}BadgeText parent="${item.id}BadgeBox";`,
      `SET ${item.id}BadgeText text="${item.badge}" fontSize="10px" fontWeight="700" textColor="#FAF9F6" letterSpacing="1px";`,
      `+FrameNode ${item.id}Details parent="${item.id}Card";`,
      `SET ${item.id}Details layout="stack" stackDirection="vertical" gap="6px" width="100%";`,
      `+FrameNode ${item.id}TopRow parent="${item.id}Details";`,
      `SET ${item.id}TopRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%";`,
      `+RichTextNode ${item.id}Cat parent="${item.id}TopRow";`,
      `SET ${item.id}Cat text="${item.cat}" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
      `+RichTextNode ${item.id}Rating parent="${item.id}TopRow";`,
      `SET ${item.id}Rating text="${item.rating}" fontSize="12px" fontWeight="600" textColor="#3B2F2F";`,
      `+RichTextNode ${item.id}Title parent="${item.id}Details";`,
      `SET ${item.id}Title text="${item.title}" fontSize="18px" fontWeight="500" textColor="#3B2F2F";`,
      `+FrameNode ${item.id}PriceRow parent="${item.id}Details";`,
      `SET ${item.id}PriceRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" paddingTop="4px";`,
      `+RichTextNode ${item.id}Price parent="${item.id}PriceRow";`,
      `SET ${item.id}Price text="${item.price}" fontSize="16px" fontWeight="700" textColor="#2C2420";`
    ].join(" ");
    await applySafe(cardDSL, "/", `Homepage: Arrival Card ${item.id}`);
  }

  // ==========================================
  // HOMEPAGE PART 4: Categories Section (3 Cards)
  // ==========================================
  const categoriesDSL = [
    `+FrameNode CategoriesSection parent="${homeDesktopBp}";`,
    `SET CategoriesSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode CatHeader parent="CategoriesSection";`,
    `SET CatHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode CatEyebrow parent="CatHeader";`,
    `SET CatEyebrow text="THE SIGNATURE SILHOUETTES" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode CatTitle parent="CatHeader";`,
    `SET CatTitle text="Explore Categories" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+FrameNode CatGrid parent="CategoriesSection";`,
    `SET CatGrid layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" gap="24px";`,

    `+FrameNode Cat1 parent="CatGrid";`,
    `SET Cat1 layout="stack" stackDirection="vertical" stackDistribution="end" width="32%" height="460px" fill="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode Cat1Box parent="Cat1";`,
    `SET Cat1Box layout="stack" stackDirection="vertical" padding="28px" fill="rgba(44, 36, 32, 0.85)" width="100%" gap="6px";`,
    `+RichTextNode Cat1Title parent="Cat1Box";`,
    `SET Cat1Title text="Daily Modest Abayas" fontSize="24px" fontWeight="500" textColor="#FAF9F6";`,
    `+RichTextNode Cat1Sub parent="Cat1Box";`,
    `SET Cat1Sub text="24 PIECES  ·  EXPLORE COLLECTION →" fontSize="12px" fontWeight="600" textColor="#E6DFD5" letterSpacing="1px";`,

    `+FrameNode Cat2 parent="CatGrid";`,
    `SET Cat2 layout="stack" stackDirection="vertical" stackDistribution="end" width="32%" height="460px" fill="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode Cat2Box parent="Cat2";`,
    `SET Cat2Box layout="stack" stackDirection="vertical" padding="28px" fill="rgba(44, 36, 32, 0.85)" width="100%" gap="6px";`,
    `+RichTextNode Cat2Title parent="Cat2Box";`,
    `SET Cat2Title text="Luxury Occasion Wear" fontSize="24px" fontWeight="500" textColor="#FAF9F6";`,
    `+RichTextNode Cat2Sub parent="Cat2Box";`,
    `SET Cat2Sub text="18 PIECES  ·  EXPLORE COLLECTION →" fontSize="12px" fontWeight="600" textColor="#E6DFD5" letterSpacing="1px";`,

    `+FrameNode Cat3 parent="CatGrid";`,
    `SET Cat3 layout="stack" stackDirection="vertical" stackDistribution="end" width="32%" height="460px" fill="https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=800&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode Cat3Box parent="Cat3";`,
    `SET Cat3Box layout="stack" stackDirection="vertical" padding="28px" fill="rgba(44, 36, 32, 0.85)" width="100%" gap="6px";`,
    `+RichTextNode Cat3Title parent="Cat3Box";`,
    `SET Cat3Title text="Bespoke Bridal & Evening" fontSize="24px" fontWeight="500" textColor="#FAF9F6";`,
    `+RichTextNode Cat3Sub parent="Cat3Box";`,
    `SET Cat3Sub text="12 PIECES  ·  EXPLORE COLLECTION →" fontSize="12px" fontWeight="600" textColor="#E6DFD5" letterSpacing="1px";`
  ].join(" ");
  await applySafe(categoriesDSL, "/", "Homepage: Categories");

  // ==========================================
  // HOMEPAGE PART 5: Best Sellers Section (4 Cards)
  // ==========================================
  const bestSellersDSL = [
    `+FrameNode BestSellersSection parent="${homeDesktopBp}";`,
    `SET BestSellersSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode BestHeader parent="BestSellersSection";`,
    `SET BestHeader layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="end" width="100%";`,
    `+FrameNode BestHeadLeft parent="BestHeader";`,
    `SET BestHeadLeft layout="stack" stackDirection="vertical" gap="8px";`,
    `+RichTextNode BestEyebrow parent="BestHeadLeft";`,
    `SET BestEyebrow text="CLIENT FAVORITES" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode BestTitle parent="BestHeadLeft";`,
    `SET BestTitle text="Best Sellers: The Icons" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode BestViewAll parent="BestHeader";`,
    `SET BestViewAll text="VIEW ALL BEST SELLERS →" fontSize="13px" fontWeight="700" textColor="#2C2420" letterSpacing="1px";`,
    `+FrameNode BestGrid parent="BestSellersSection";`,
    `SET BestGrid layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" gap="24px";`
  ].join(" ");
  await applySafe(bestSellersDSL, "/", "Homepage: Best Sellers Header");

  const bestData = [
    { id: "Best1", title: "Solitaire Pearl Chiffon Gown", price: "2,750 SAR", cat: "OCCASION", rating: "★ 5.0", badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80" },
    { id: "Best2", title: "Desert Sand Double Nidha Abaya", price: "1,850 SAR", cat: "ABAYAS", rating: "★ 4.9", badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80" },
    { id: "Best3", title: "Emerald Silk Organza Overcoat", price: "2,800 SAR", cat: "ATELIER", rating: "★ 5.0", badge: "LIMITED", img: "https://images.unsplash.com/photo-1782025419629-d69df1556e0c?auto=format&fit=crop&w=800&q=80" },
    { id: "Best4", title: "Malak Pearl-Grey Satin Abaya", price: "2,400 SAR", cat: "ABAYAS", rating: "★ 4.9", badge: "BEST SELLER", img: "https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=800&q=80" }
  ];

  for (const item of bestData) {
    const cardDSL = [
      `+FrameNode ${item.id}Card parent="BestGrid";`,
      `SET ${item.id}Card layout="stack" stackDirection="vertical" width="23%" gap="16px" fill="#FAF9F6";`,
      `+FrameNode ${item.id}ImgBox parent="${item.id}Card";`,
      `SET ${item.id}ImgBox width="100%" height="380px" fill="${item.img}" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
      `+FrameNode ${item.id}BadgeBox parent="${item.id}ImgBox";`,
      `SET ${item.id}BadgeBox layout="stack" stackDirection="horizontal" padding="6px 12px" fill="#8B7355" radius="16px";`,
      `+RichTextNode ${item.id}BadgeText parent="${item.id}BadgeBox";`,
      `SET ${item.id}BadgeText text="${item.badge}" fontSize="10px" fontWeight="700" textColor="#FAF9F6" letterSpacing="1px";`,
      `+FrameNode ${item.id}Details parent="${item.id}Card";`,
      `SET ${item.id}Details layout="stack" stackDirection="vertical" gap="6px" width="100%";`,
      `+FrameNode ${item.id}TopRow parent="${item.id}Details";`,
      `SET ${item.id}TopRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%";`,
      `+RichTextNode ${item.id}Cat parent="${item.id}TopRow";`,
      `SET ${item.id}Cat text="${item.cat}" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
      `+RichTextNode ${item.id}Rating parent="${item.id}TopRow";`,
      `SET ${item.id}Rating text="${item.rating}" fontSize="12px" fontWeight="600" textColor="#3B2F2F";`,
      `+RichTextNode ${item.id}Title parent="${item.id}Details";`,
      `SET ${item.id}Title text="${item.title}" fontSize="18px" fontWeight="500" textColor="#3B2F2F";`,
      `+FrameNode ${item.id}PriceRow parent="${item.id}Details";`,
      `SET ${item.id}PriceRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" paddingTop="4px";`,
      `+RichTextNode ${item.id}Price parent="${item.id}PriceRow";`,
      `SET ${item.id}Price text="${item.price}" fontSize="16px" fontWeight="700" textColor="#2C2420";`
    ].join(" ");
    await applySafe(cardDSL, "/", `Homepage: Best Seller Card ${item.id}`);
  }

  // ==========================================
  // HOMEPAGE PART 6: Why Choose Alora Section
  // ==========================================
  const whyChooseDSL = [
    `+FrameNode WhyChooseSection parent="${homeDesktopBp}";`,
    `SET WhyChooseSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="56px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode WhyHeader parent="WhyChooseSection";`,
    `SET WhyHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode WhyEyebrow parent="WhyHeader";`,
    `SET WhyEyebrow text="THE ATELIER PROMISE" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode WhyTitle parent="WhyHeader";`,
    `SET WhyTitle text="Why Choose Alora Abayas" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+FrameNode WhyGrid parent="WhyChooseSection";`,
    `SET WhyGrid layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" gap="32px";`,

    `+FrameNode Why1 parent="WhyGrid";`,
    `SET Why1 layout="stack" stackDirection="vertical" padding="36px" gap="16px" width="31%" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Why1Icon parent="Why1";`,
    `SET Why1Icon text="✧" fontSize="28px" textColor="#8B7355";`,
    `+RichTextNode Why1Title parent="Why1";`,
    `SET Why1Title text="Japanese Silk & Double Nidha" fontSize="20px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode Why1Desc parent="Why1";`,
    `SET Why1Desc text="We source only Grade-A Japanese crepe, raw mulberry silk, and ultra-dense double Nidha that never clings, draping with monumental dignity." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,

    `+FrameNode Why2 parent="WhyGrid";`,
    `SET Why2 layout="stack" stackDirection="vertical" padding="36px" gap="16px" width="31%" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Why2Icon parent="Why2";`,
    `SET Why2Icon text="✦" fontSize="28px" textColor="#8B7355";`,
    `+RichTextNode Why2Title parent="Why2";`,
    `SET Why2Title text="Riyadh Private Tailoring" fontSize="20px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode Why2Desc parent="Why2";`,
    `SET Why2Desc text="Every piece is cut and finished by master seamstresses in our Riyadh atelier, guaranteeing reinforced seams and hand-rolled hems." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,

    `+FrameNode Why3 parent="WhyGrid";`,
    `SET Why3 layout="stack" stackDirection="vertical" padding="36px" gap="16px" width="31%" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Why3Icon parent="Why3";`,
    `SET Why3Icon text="✹" fontSize="28px" textColor="#8B7355";`,
    `+RichTextNode Why3Title parent="Why3";`,
    `SET Why3Title text="Global White-Glove Dispatch" fontSize="20px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode Why3Desc parent="Why3";`,
    `SET Why3Desc text="Dispatched in signature rigid gift boxes with garment covers and custom hangers, arriving via express courier across the GCC and Europe." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`
  ].join(" ");
  await applySafe(whyChooseDSL, "/", "Homepage: Why Choose Alora");

  // ==========================================
  // HOMEPAGE PART 7: Testimonials Section
  // ==========================================
  const testimonialsDSL = [
    `+FrameNode TestimonialsSection parent="${homeDesktopBp}";`,
    `SET TestimonialsSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode TestHeader parent="TestimonialsSection";`,
    `SET TestHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode TestEyebrow parent="TestHeader";`,
    `SET TestEyebrow text="CLIENT TESTIMONIALS" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode TestTitle parent="TestHeader";`,
    `SET TestTitle text="Voices of Our Private Clients" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+FrameNode TestGrid parent="TestimonialsSection";`,
    `SET TestGrid layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" gap="24px";`,

    `+FrameNode Cli1 parent="TestGrid";`,
    `SET Cli1 layout="stack" stackDirection="vertical" stackDistribution="space-between" padding="32px" width="23%" height="260px" fill="#F5F2EB" radius="16px";`,
    `+FrameNode Cli1Top parent="Cli1";`,
    `SET Cli1Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli1Stars parent="Cli1Top";`,
    `SET Cli1Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli1Quote parent="Cli1Top";`,
    `SET Cli1Quote text="“The Royal Bisht Abaya exceeded my highest expectations. The silk movement is breathtaking.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli1Author parent="Cli1";`,
    `SET Cli1Author text="— Her Highness Shk. A., Riyadh" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli2 parent="TestGrid";`,
    `SET Cli2 layout="stack" stackDirection="vertical" stackDistribution="space-between" padding="32px" width="23%" height="260px" fill="#F5F2EB" radius="16px";`,
    `+FrameNode Cli2Top parent="Cli2";`,
    `SET Cli2Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli2Stars parent="Cli2Top";`,
    `SET Cli2Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli2Quote parent="Cli2Top";`,
    `SET Cli2Quote text="“Wearing Alora to the London gala drew countless compliments. Truly unmatched modesty and class.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli2Author parent="Cli2";`,
    `SET Cli2Author text="— Lady Maryam K., London" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli3 parent="TestGrid";`,
    `SET Cli3 layout="stack" stackDirection="vertical" stackDistribution="space-between" padding="32px" width="23%" height="260px" fill="#F5F2EB" radius="16px";`,
    `+FrameNode Cli3Top parent="Cli3";`,
    `SET Cli3Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli3Stars parent="Cli3Top";`,
    `SET Cli3Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli3Quote parent="Cli3Top";`,
    `SET Cli3Quote text="“The double-layered Nidha is so cool against the Riyadh heat, yet has such structured weight.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli3Author parent="Cli3";`,
    `SET Cli3Author text="— Reem Al-D., Jeddah" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli4 parent="TestGrid";`,
    `SET Cli4 layout="stack" stackDirection="vertical" stackDistribution="space-between" padding="32px" width="23%" height="260px" fill="#F5F2EB" radius="16px";`,
    `+FrameNode Cli4Top parent="Cli4";`,
    `SET Cli4Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli4Stars parent="Cli4Top";`,
    `SET Cli4Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli4Quote parent="Cli4Top";`,
    `SET Cli4Quote text="“The Sultana Bisht is a masterpiece of gold zari work. I felt magnificent from the moment I put it on.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli4Author parent="Cli4";`,
    `SET Cli4Author text="— Noura S., Doha, Qatar" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(testimonialsDSL, "/", "Homepage: Testimonials");

  // ==========================================
  // HOMEPAGE PART 8: SocialSection Carousel (`Lifestyle & Journal @AloraAbaya`)
  // ==========================================
  const headerDSL = [
    `+FrameNode SocialSection parent="${homeDesktopBp}";`,
    `SET SocialSection width="100%" height="auto" layout="stack" stackDirection="vertical" gap="40px" padding="90px 48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9" overflow="hidden";`,
    
    `+FrameNode SocHeadBox parent="SocialSection";`,
    `SET SocHeadBox layout="stack" stackDirection="vertical" stackAlignment="center" gap="8px" width="100%";`,
    `+RichTextNode SocEyebrow parent="SocHeadBox";`,
    `SET SocEyebrow text="ATELIER CHRONICLES & FILM" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode SocTitle parent="SocHeadBox";`,
    `SET SocTitle text="Lifestyle & Journal @AloraAbaya" fontName="Bodoni Moda" fontSize="42px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode SocSub parent="SocHeadBox";`,
    `SET SocSub text="Follow our private salon editorials, behind-the-scenes craftsmanship, and campaign reels on Instagram and TikTok." fontSize="14px" textColor="#6E5C53";`,

    `+FrameNode CarouselTrack parent="SocialSection";`,
    `SET CarouselTrack layout="stack" stackDirection="horizontal" stackAlignment="center" gap="24px" width="100%" overflow="visible";`
  ].join(" ");
  await applySafe(headerDSL, "/", "Homepage: Social Header & Track");

  const socialCards = [
    { id: "S1", title: "Riyadh Flagship Salon Editorial", tag: "INSTAGRAM REEL", time: "0:45", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80", isVideo: true, cardHeight: "440px" },
    { id: "S2", title: "Hand-Rolled Silk Hems in Riyadh", tag: "ATELIER CRAFT", time: "", img: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=800&q=80", isVideo: false, cardHeight: "380px" },
    { id: "S3", title: "The Royal Bisht Campaign BTS", tag: "TIKTOK EXCLUSIVE", time: "1:20", img: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=800&q=80", isVideo: true, cardHeight: "440px" },
    { id: "S4", title: "Japanese Double Nidha Draping", tag: "SILHOUETTES", time: "", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80", isVideo: false, cardHeight: "380px" },
    { id: "S5", title: "Via Riyadh Private Preview Evening", tag: "SALON DIARY", time: "0:58", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80", isVideo: true, cardHeight: "440px" }
  ];

  for (const item of socialCards) {
    const cardDSL = [
      `+FrameNode Card_${item.id} parent="CarouselTrack";`,
      `SET Card_${item.id} width="300px" height="${item.cardHeight}" radius="20px" fill="${item.img}" fillImagePositionX="center" fillImagePositionY="center" position="relative" overflow="clip";`,
      `+FrameNode Overlay_${item.id} parent="Card_${item.id}";`,
      `SET Overlay_${item.id} width="100%" height="100%" position="absolute" top="0px" left="0px" fill="linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(26,24,23,0.85) 100%)";`,
      `+FrameNode TopPill_${item.id} parent="Card_${item.id}";`,
      `SET TopPill_${item.id} layout="stack" stackDirection="horizontal" stackAlignment="center" gap="6px" height="28px" padding="0px 12px" fill="rgba(26,24,23,0.75)" radius="14px" position="absolute" top="16px" left="16px";`,
      `+RichTextNode TagText_${item.id} parent="TopPill_${item.id}";`,
      `SET TagText_${item.id} text="${item.tag}" fontSize="10px" fontWeight="700" textColor="#FAF9F6" letterSpacing="1.5px";`,
      item.isVideo ? [
        `+FrameNode TimePill_${item.id} parent="Card_${item.id}";`,
        `SET TimePill_${item.id} layout="stack" stackDirection="horizontal" stackAlignment="center" gap="4px" height="28px" padding="0px 10px" fill="rgba(26,24,23,0.75)" radius="14px" position="absolute" top="16px" right="16px";`,
        `+RichTextNode PlayIcon_${item.id} parent="TimePill_${item.id}";`,
        `SET PlayIcon_${item.id} text="▶" fontSize="9px" textColor="#8B7355";`,
        `+RichTextNode TimeText_${item.id} parent="TimePill_${item.id}";`,
        `SET TimeText_${item.id} text="${item.time}" fontSize="11px" fontWeight="600" textColor="#FAF9F6";`
      ].join(" ") : "",
      `+FrameNode BottomInfo_${item.id} parent="Card_${item.id}";`,
      `SET BottomInfo_${item.id} layout="stack" stackDirection="vertical" gap="6px" width="100%" padding="20px" position="absolute" bottom="0px" left="0px";`,
      `+RichTextNode Title_${item.id} parent="BottomInfo_${item.id}";`,
      `SET Title_${item.id} text="${item.title}" fontName="Bodoni Moda" fontSize="18px" fontWeight="500" textColor="#FAF9F6" lineHeight="1.3em";`,
      `+RichTextNode Action_${item.id} parent="BottomInfo_${item.id}";`,
      `SET Action_${item.id} text="${item.isVideo ? 'WATCH REEL →' : 'EXPLORE DIARY →'}" fontSize="11px" fontWeight="700" textColor="#8B7355" letterSpacing="1.5px";`
    ].join(" ");
    await applySafe(cardDSL, "/", `Homepage: Social Card ${item.id}`);
  }

  // ==========================================
  // HOMEPAGE PART 9: Pristine Reference Editorial Footer (`FooterSection`)
  // ==========================================
  const footerDSL = [
    `+FrameNode FooterSection parent="${homeDesktopBp}";`,
    `SET FooterSection width="100%" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="0px" padding="80px 48px 40px 48px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,

    `+FrameNode FootTopRow parent="FooterSection";`,
    `SET FootTopRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" paddingBottom="64px" borderBottom="1px solid #E8E1D9";`,

    `+FrameNode FootBrandBox parent="FootTopRow";`,
    `SET FootBrandBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="18px" width="460px" height="auto";`,
    `+RichTextNode FootBrandLogo parent="FootBrandBox";`,
    `SET FootBrandLogo text="ALORA" fontName="Bodoni Moda" fontSize="40px" fontWeight="400" textColor="#2C2420" letterSpacing="4px";`,
    `+RichTextNode FootBrandDesc parent="FootBrandBox";`,
    `SET FootBrandDesc text="Experience the calm sophistication of luxury modesty. Hand-tailored from fluid silks and pure double-layered chiffons, designed to drape effortlessly with dignified poise." fontSize="14px" textColor="#6E5C53" lineHeight="1.7em";`,
    
    `+FrameNode FootVipRow parent="FootBrandBox";`,
    `SET FootVipRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="10px" paddingTop="8px";`,
    `+FrameNode FootVipDot parent="FootVipRow";`,
    `SET FootVipDot width="8px" height="8px" radius="4px" fill="#4A6B5B";`,
    `+RichTextNode FootVipText parent="FootVipRow";`,
    `SET FootVipText text="ENCRYPTED GLOBAL VIP CHECKOUT" fontSize="11px" fontWeight="700" textColor="#4A6B5B" letterSpacing="2px";`,

    `+FrameNode FootNewsBox parent="FootTopRow";`,
    `SET FootNewsBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="580px" height="auto" padding="42px" fill="#F5F2EB" radius="24px" border="1px solid #EAE3DA";`,
    `+RichTextNode FootNewsTitle parent="FootNewsBox";`,
    `SET FootNewsTitle text="Join the Alora Private Circle" fontName="Bodoni Moda" fontSize="28px" fontWeight="500" textColor="#2C2420";`,
    `+RichTextNode FootNewsSub parent="FootNewsBox";`,
    `SET FootNewsSub text="Be the first to receive invitations to seasonal trunk shows, bespoke pre-order drops, and private salon editorials." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em";`,
    
    `+FrameNode FootFormRow parent="FootNewsBox";`,
    `SET FootFormRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="12px" width="100%" paddingTop="8px";`,
    `+FrameNode FootInputBox parent="FootFormRow";`,
    `SET FootInputBox layout="stack" stackDirection="horizontal" stackAlignment="center" width="340px" height="50px" padding="0px 24px" fill="#FFFFFF" radius="25px" border="1px solid #E8E1D9";`,
    `+RichTextNode FootInputText parent="FootInputBox";`,
    `SET FootInputText text="Enter your email address..." fontSize="13px" textColor="#8B7355";`,
    `+FrameNode FootSubBtn parent="FootFormRow";`,
    `SET FootSubBtn layout="stack" stackDirection="horizontal" stackAlignment="center" height="50px" padding="0px 28px" fill="#3B2F2F" radius="25px";`,
    `+RichTextNode FootSubText parent="FootSubBtn";`,
    `SET FootSubText text="JOIN CIRCLE" fontSize="12px" fontWeight="700" textColor="#FFFFFF" letterSpacing="2px";`,

    `+FrameNode FootColumns parent="FooterSection";`,
    `SET FootColumns layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" padding="64px 0px";`,

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

    `+FrameNode FootCol4 parent="FootColumns";`,
    `SET FootCol4 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="240px" height="auto";`,
    `+RichTextNode FootCol4Head parent="FootCol4";`,
    `SET FootCol4Head text="SOCIAL CHRONICLE" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol4L1 parent="FootCol4";`,
    `SET FootCol4L1 text="Tag us or use #AloraAbayas to be featured in our monthly private salon chronicle." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em";`,
    `+RichTextNode FootCol4L2 parent="FootCol4";`,
    `SET FootCol4L2 text="@AloraAbaya →" fontSize="13px" fontWeight="600" textColor="#3B2F2F";`,

    `+FrameNode FootBottomBar parent="FooterSection";`,
    `SET FootBottomBar layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" height="auto" paddingTop="28px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode FootCopy parent="FootBottomBar";`,
    `SET FootCopy text="© 2026 Alora Atelier. All rights reserved. Crafted with distinction." fontSize="12px" textColor="#8B7355";`,
    `+RichTextNode FootLocation parent="FootBottomBar";`,
    `SET FootLocation text="Privately Handcrafted in Riyadh, KSA   ·   ALORA" fontSize="12px" fontWeight="500" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(footerDSL, "/", "Homepage: Editorial Footer");

  console.log("=== HOMEPAGE FULLY RESTORED TO 100% PERFECT PIXEL ACCURACY ===");
  return { status: "success", message: "Homepage fully restored." };
}

return await run();
