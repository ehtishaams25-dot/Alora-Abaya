async function run() {
  console.log("=== EXECUTING EXACT PIXEL-PERFECT ALORA ABAYA HOMEPAGE REPLICA ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase().includes("home")) || pages[0];
  if (!homePage) {
    throw new Error("No home page found in Framer project.");
  }

  const homeDesktopBp = homePage.$breakpoints?.find(b => !b.name?.toLowerCase().includes("phone"))?.id || homePage.children?.[0]?.id;
  if (!homeDesktopBp) {
    throw new Error("No desktop breakpoint found on home page.");
  }

  async function applySafe(dsl, path = "/", label = "") {
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

  // Set Home Desktop layout & background
  await applySafe(`SET ${homeDesktopBp} layout="stack" stackDirection="vertical" width="1200px" height="auto" gap="0px" fill="#FAF9F6" overflow="clip";`, "/", "Setup Home Desktop");

  // PART 1: Top Announcement Bar & Navigation Header (With Centered ALORA Logo exactly like Homepage.png)
  const navDSL = [
    // Announcement Bar
    `+FrameNode AnnounceBar parent="${homeDesktopBp}";`,
    `SET AnnounceBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="100%" height="40px" fill="#1A1817" padding="8px 24px" gap="16px";`,
    `+RichTextNode AnnounceText parent="AnnounceBar";`,
    `SET AnnounceText text="NEW ARRIVALS EVERY MONDAY — EXPLORE OUR SIGNATURE ATELIER EDITION" fontSize="11px" fontWeight="500" textColor="#FAF9F6" letterSpacing="2px";`,
    `+FrameNode AnnounceBtn parent="AnnounceBar";`,
    `SET AnnounceBtn layout="stack" stackDirection="horizontal" padding="4px 12px" fill="#8B7355" radius="12px";`,
    `+RichTextNode AnnounceBtnText parent="AnnounceBtn";`,
    `SET AnnounceBtnText text="EXPLORE" fontSize="10px" fontWeight="700" textColor="#FAF9F6" letterSpacing="1px";`,

    // Sticky Header Navigation
    `+FrameNode NavBar parent="${homeDesktopBp}";`,
    `SET NavBar layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="space-between" width="100%" height="86px" fill="#FAF9F6" padding="0px 48px" borderBottom="1px solid #E8E1D9";`,
    
    // Left: Nav Links
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

    // Center: ALORA Brand Logo
    `+FrameNode BrandLogoBox parent="NavBar";`,
    `SET BrandLogoBox layout="stack" stackDirection="vertical" stackAlignment="center" width="300px" gap="2px";`,
    `+RichTextNode BrandLogoMain parent="BrandLogoBox";`,
    `SET BrandLogoMain text="ALORA" fontSize="32px" fontWeight="700" textColor="#3B2F2F" letterSpacing="6px" textAlignment="center";`,
    `+RichTextNode BrandLogoSub parent="BrandLogoBox";`,
    `SET BrandLogoSub text="ABAYA & GOWNS" fontSize="9px" fontWeight="600" textColor="#8B7355" letterSpacing="4px" textAlignment="center";`,

    // Right: Nav Actions & Language
    `+FrameNode NavActionsBox parent="NavBar";`,
    `SET NavActionsBox layout="stack" stackDirection="horizontal" gap="20px" stackAlignment="center" stackDistribution="end" width="380px";`,
    `+RichTextNode NavLang parent="NavActionsBox";`,
    `SET NavLang text="EN / AR" fontSize="12px" fontWeight="600" textColor="#6E5C53";`,
    `+RichTextNode NavSearch parent="NavActionsBox";`,
    `SET NavSearch text="🔍 SEARCH" fontSize="12px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode NavWish parent="NavActionsBox";`,
    `SET NavWish text="♡ WISHLIST" fontSize="12px" fontWeight="600" textColor="#3B2F2F";`,
    `+FrameNode NavBagPill parent="NavActionsBox";`,
    `SET NavBagPill layout="stack" stackDirection="horizontal" padding="8px 18px" fill="#3B2F2F" radius="20px";`,
    `+RichTextNode NavBagText parent="NavBagPill";`,
    `SET NavBagText text="BAG (0)" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`
  ].join(" ");
  await applySafe(navDSL, "/", "Build Announcement Bar & Navbar");

  // PART 2: Hero Section matching Homepage.png exactly
  const heroDSL = [
    `+FrameNode HeroSection parent="${homeDesktopBp}";`,
    `SET HeroSection layout="stack" stackDirection="vertical" stackAlignment="center" stackDistribution="center" width="100%" height="780px" fill="https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=2000&q=90" fillImagePositionX="center" fillImagePositionY="center" overflow="clip" position="relative";`,
    
    // Dark Vignette Overlay
    `+FrameNode HeroOverlay parent="HeroSection";`,
    `SET HeroOverlay layout="stack" stackDirection="vertical" stackAlignment="center" stackDistribution="center" width="100%" height="100%" fill="rgba(44, 36, 32, 0.50)" padding="80px 48px" gap="28px";`,
    
    `+RichTextNode HeroEyebrow parent="HeroOverlay";`,
    `SET HeroEyebrow text="SIGNATURE ATELIER EDITION" fontSize="12px" fontWeight="600" textColor="#FAF9F6" letterSpacing="5px" textAlignment="center";`,
    
    `+RichTextNode HeroTitle parent="HeroOverlay";`,
    `SET HeroTitle text="Timeless Elegance Captured in Every Fold" fontSize="68px" fontWeight="400" textColor="#FAF9F6" textAlignment="center" width="920px" lineHeight="1.15em";`,
    
    `+RichTextNode HeroSubtext parent="HeroOverlay";`,
    `SET HeroSubtext text="Editorial Abayas & Evening Gowns of Royal Distinction" fontSize="18px" fontWeight="400" textColor="#E8E1D9" textAlignment="center";`,
    
    `+FrameNode HeroBtn parent="HeroOverlay";`,
    `SET HeroBtn layout="stack" stackDirection="horizontal" stackAlignment="center" padding="18px 44px" fill="#FAF9F6" radius="30px" boxShadows.0="0px 10px 25px 0px rgba(0,0,0,0.25)";`,
    `+RichTextNode HeroBtnText parent="HeroBtn";`,
    `SET HeroBtnText text="EXPLORE COLLECTION" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="3px";`
  ].join(" ");
  await applySafe(heroDSL, "/", "Build Exact Hero Section");

  // PART 3: New Arrivals at the Atelier (4 Cards with Badges & Pricing)
  const arrivalsDSL = [
    `+FrameNode ArrivalsSection parent="${homeDesktopBp}";`,
    `SET ArrivalsSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#FAF9F6";`,
    
    // Header
    `+FrameNode ArrivalsHeader parent="ArrivalsSection";`,
    `SET ArrivalsHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode ArrivalsEyebrow parent="ArrivalsHeader";`,
    `SET ArrivalsEyebrow text="EXCLUSIVELY CRAFTED" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode ArrivalsTitle parent="ArrivalsHeader";`,
    `SET ArrivalsTitle text="New Arrivals at the Atelier" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    `+RichTextNode ArrivalsLink parent="ArrivalsHeader";`,
    `SET ArrivalsLink text="VIEW ALL 42 CREATIONS →" fontSize="13px" fontWeight="600" textColor="#8B7355" letterSpacing="1.5px";`,
    
    // Grid
    `+FrameNode ArrivalsGrid parent="ArrivalsSection";`,
    `SET ArrivalsGrid layout="stack" stackDirection="horizontal" width="100%" gap="24px";`,
    
    // Card 1
    `+FrameNode Card1 parent="ArrivalsGrid";`,
    `SET Card1 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Card1Img parent="Card1";`,
    `SET Card1Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1772474511860-9cef46d98ea6?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Card1Body parent="Card1";`,
    `SET Card1Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Card1Badge parent="Card1Body";`,
    `SET Card1Badge text="LIMITED EDITION" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Card1Name parent="Card1Body";`,
    `SET Card1Name text="Noor Pearl-Trimmed Mulberry Silk Abaya" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Card1Ar parent="Card1Body";`,
    `SET Card1Ar text="عباية نور من حرير التوت مزينة باللؤلؤ" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Card1PriceBox parent="Card1Body";`,
    `SET Card1PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Card1Price parent="Card1PriceBox";`,
    `SET Card1Price text="2,650 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Card1Swatches parent="Card1PriceBox";`,
    `SET Card1Swatches text="● ● ●" fontSize="14px" textColor="#8B7355";`,

    // Card 2
    `+FrameNode Card2 parent="ArrivalsGrid";`,
    `SET Card2 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Card2Img parent="Card2";`,
    `SET Card2Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1772474557170-4818d01d7bca?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Card2Body parent="Card2";`,
    `SET Card2Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Card2Badge parent="Card2Body";`,
    `SET Card2Badge text="NEW ARRIVAL" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Card2Name parent="Card2Body";`,
    `SET Card2Name text="Al-Dana Pleated Crepe Evening Gown" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Card2Ar parent="Card2Body";`,
    `SET Card2Ar text="فستان سهرة الدانة من الكريب بكسرات أنيقة" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Card2PriceBox parent="Card2Body";`,
    `SET Card2PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Card2Price parent="Card2PriceBox";`,
    `SET Card2Price text="1,950 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Card2Swatches parent="Card2PriceBox";`,
    `SET Card2Swatches text="● ●" fontSize="14px" textColor="#8B7355";`,

    // Card 3
    `+FrameNode Card3 parent="ArrivalsGrid";`,
    `SET Card3 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Card3Img parent="Card3";`,
    `SET Card3Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1772474587292-08b3e8932acd?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Card3Body parent="Card3";`,
    `SET Card3Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Card3Badge parent="Card3Body";`,
    `SET Card3Badge text="LIMITED EDITION" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Card3Name parent="Card3Body";`,
    `SET Card3Name text="Sultana Gold-Embroidered Royal Bisht" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Card3Ar parent="Card3Body";`,
    `SET Card3Ar text="بشت سلطانة مطرز بالزري الذهبي الملكي" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Card3PriceBox parent="Card3Body";`,
    `SET Card3PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Card3Price parent="Card3PriceBox";`,
    `SET Card3Price text="3,400 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Card3Swatches parent="Card3PriceBox";`,
    `SET Card3Swatches text="● ● ●" fontSize="14px" textColor="#8B7355";`,

    // Card 4
    `+FrameNode Card4 parent="ArrivalsGrid";`,
    `SET Card4 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Card4Img parent="Card4";`,
    `SET Card4Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1762376128087-bc29c6df08c0?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Card4Body parent="Card4";`,
    `SET Card4Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Card4Badge parent="Card4Body";`,
    `SET Card4Badge text="BEST SELLER" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Card4Name parent="Card4Body";`,
    `SET Card4Name text="Lulwa Ivory Raw Silk Coat & Kaftan" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Card4Ar parent="Card4Body";`,
    `SET Card4Ar text="قفطان ومعطف لولوة من الحرير الخام العاجي" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Card4PriceBox parent="Card4Body";`,
    `SET Card4PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Card4Price parent="Card4PriceBox";`,
    `SET Card4Price text="2,850 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Card4Swatches parent="Card4PriceBox";`,
    `SET Card4Swatches text="●" fontSize="14px" textColor="#8B7355";`
  ].join(" ");
  await applySafe(arrivalsDSL, "/", "Build New Arrivals Section");

  // PART 4: Explore by Category (4 Large Visual Cards exactly matching screenshot)
  const categoriesDSL = [
    `+FrameNode CategoriesSection parent="${homeDesktopBp}";`,
    `SET CategoriesSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#F5F2EB" borderTop="1px solid #E8E1D9" borderBottom="1px solid #E8E1D9";`,
    
    `+FrameNode CatHeader parent="CategoriesSection";`,
    `SET CatHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode CatEyebrow parent="CatHeader";`,
    `SET CatEyebrow text="CURATED COLLECTIONS" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode CatTitle parent="CatHeader";`,
    `SET CatTitle text="Explore by Category" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    
    `+FrameNode CatGrid parent="CategoriesSection";`,
    `SET CatGrid layout="stack" stackDirection="horizontal" width="100%" gap="24px";`,
    
    // Cat 1
    `+FrameNode CatCard1 parent="CatGrid";`,
    `SET CatCard1 layout="stack" stackDirection="vertical" stackDistribution="end" width="23.5%" height="460px" fill="https://images.unsplash.com/photo-1752794673269-dc356838c5fd?auto=format&fit=crop&w=800&q=85" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode CatCard1Overlay parent="CatCard1";`,
    `SET CatCard1Overlay layout="stack" stackDirection="vertical" stackAlignment="center" gap="6px" width="100%" padding="30px" fill="rgba(44, 36, 32, 0.80)";`,
    `+RichTextNode CatCard1Count parent="CatCard1Overlay";`,
    `SET CatCard1Count text="24 PIECES" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode CatCard1Name parent="CatCard1Overlay";`,
    `SET CatCard1Name text="Daily Modest Abayas" fontSize="22px" fontWeight="600" textColor="#FAF9F6" textAlignment="center";`,

    // Cat 2
    `+FrameNode CatCard2 parent="CatGrid";`,
    `SET CatCard2 layout="stack" stackDirection="vertical" stackDistribution="end" width="23.5%" height="460px" fill="https://images.unsplash.com/photo-1767469697194-ac997d70b1ee?auto=format&fit=crop&w=800&q=85" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode CatCard2Overlay parent="CatCard2";`,
    `SET CatCard2Overlay layout="stack" stackDirection="vertical" stackAlignment="center" gap="6px" width="100%" padding="30px" fill="rgba(44, 36, 32, 0.80)";`,
    `+RichTextNode CatCard2Count parent="CatCard2Overlay";`,
    `SET CatCard2Count text="18 PIECES" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode CatCard2Name parent="CatCard2Overlay";`,
    `SET CatCard2Name text="Occasion & Evening Gowns" fontSize="22px" fontWeight="600" textColor="#FAF9F6" textAlignment="center";`,

    // Cat 3
    `+FrameNode CatCard3 parent="CatGrid";`,
    `SET CatCard3 layout="stack" stackDirection="vertical" stackDistribution="end" width="23.5%" height="460px" fill="https://images.unsplash.com/photo-1762605135012-56a59a059e60?auto=format&fit=crop&w=800&q=85" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode CatCard3Overlay parent="CatCard3";`,
    `SET CatCard3Overlay layout="stack" stackDirection="vertical" stackAlignment="center" gap="6px" width="100%" padding="30px" fill="rgba(44, 36, 32, 0.80)";`,
    `+RichTextNode CatCard3Count parent="CatCard3Overlay";`,
    `SET CatCard3Count text="15 PIECES" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode CatCard3Name parent="CatCard3Overlay";`,
    `SET CatCard3Name text="Bespoke Bisht & Kaftans" fontSize="22px" fontWeight="600" textColor="#FAF9F6" textAlignment="center";`,

    // Cat 4
    `+FrameNode CatCard4 parent="CatGrid";`,
    `SET CatCard4 layout="stack" stackDirection="vertical" stackDistribution="end" width="23.5%" height="460px" fill="https://images.unsplash.com/photo-1772474569781-2fb1c6539f8c?auto=format&fit=crop&w=800&q=85" fillImagePositionX="center" fillImagePositionY="center" radius="20px" overflow="clip";`,
    `+FrameNode CatCard4Overlay parent="CatCard4";`,
    `SET CatCard4Overlay layout="stack" stackDirection="vertical" stackAlignment="center" gap="6px" width="100%" padding="30px" fill="rgba(44, 36, 32, 0.80)";`,
    `+RichTextNode CatCard4Count parent="CatCard4Overlay";`,
    `SET CatCard4Count text="32 PIECES" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode CatCard4Name parent="CatCard4Overlay";`,
    `SET CatCard4Name text="Luxury Daily Dresses" fontSize="22px" fontWeight="600" textColor="#FAF9F6" textAlignment="center";`
  ].join(" ");
  await applySafe(categoriesDSL, "/", "Build Explore by Category Section");

  // PART 5: Best Sellers of the Season (With Filter Tabs above Grid)
  const bestSellersDSL = [
    `+FrameNode BestSellersSection parent="${homeDesktopBp}";`,
    `SET BestSellersSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#FAF9F6";`,
    
    `+FrameNode BestHeader parent="BestSellersSection";`,
    `SET BestHeader layout="stack" stackDirection="vertical" gap="12px" stackAlignment="center" width="100%";`,
    `+RichTextNode BestEyebrow parent="BestHeader";`,
    `SET BestEyebrow text="CLIENT FAVORITES" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode BestTitle parent="BestHeader";`,
    `SET BestTitle text="Best Sellers of the Season" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    
    // Filter Tabs
    `+FrameNode BestTabs parent="BestHeader";`,
    `SET BestTabs layout="stack" stackDirection="horizontal" gap="16px" paddingTop="8px";`,
    `+FrameNode Tab1 parent="BestTabs";`,
    `SET Tab1 layout="stack" stackDirection="horizontal" padding="8px 24px" fill="#3B2F2F" radius="20px";`,
    `+RichTextNode Tab1Text parent="Tab1";`,
    `SET Tab1Text text="ALL PIECES" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`,
    `+FrameNode Tab2 parent="BestTabs";`,
    `SET Tab2 layout="stack" stackDirection="horizontal" padding="8px 24px" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Tab2Text parent="Tab2";`,
    `SET Tab2Text text="EMBROIDERED" fontSize="12px" fontWeight="600" textColor="#6E5C53";`,
    `+FrameNode Tab3 parent="BestTabs";`,
    `SET Tab3 layout="stack" stackDirection="horizontal" padding="8px 24px" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Tab3Text parent="Tab3";`,
    `SET Tab3Text text="SILK & CREPE" fontSize="12px" fontWeight="600" textColor="#6E5C53";`,
    `+FrameNode Tab4 parent="BestTabs";`,
    `SET Tab4 layout="stack" stackDirection="horizontal" padding="8px 24px" fill="#F5F2EB" radius="20px";`,
    `+RichTextNode Tab4Text parent="Tab4";`,
    `SET Tab4Text text="WINTER EDITION" fontSize="12px" fontWeight="600" textColor="#6E5C53";`,
    
    `+FrameNode BestGrid parent="BestSellersSection";`,
    `SET BestGrid layout="stack" stackDirection="horizontal" width="100%" gap="24px";`,
    
    // Best 1
    `+FrameNode Best1 parent="BestGrid";`,
    `SET Best1 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Best1Img parent="Best1";`,
    `SET Best1Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1760083545495-b297b1690672?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Best1Body parent="Best1";`,
    `SET Best1Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Best1Badge parent="Best1Body";`,
    `SET Best1Badge text="BEST SELLER" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Best1Name parent="Best1Body";`,
    `SET Best1Name text="Desert Sand Double Nidha Silhouette" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Best1Ar parent="Best1Body";`,
    `SET Best1Ar text="عباية ندا مزدوجة بلون رمال الصحراء" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Best1PriceBox parent="Best1Body";`,
    `SET Best1PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Best1Price parent="Best1PriceBox";`,
    `SET Best1Price text="1,850 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Best1Rating parent="Best1PriceBox";`,
    `SET Best1Rating text="★ 4.8 (39)" fontSize="13px" textColor="#8B7355";`,

    // Best 2
    `+FrameNode Best2 parent="BestGrid";`,
    `SET Best2 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Best2Img parent="Best2";`,
    `SET Best2Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1762605135326-5c4bcc5ef006?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Best2Body parent="Best2";`,
    `SET Best2Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Best2Badge parent="Best2Body";`,
    `SET Best2Badge text="BEST SELLER" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Best2Name parent="Best2Body";`,
    `SET Best2Name text="Emerald Silk Organza Evening Ensemble" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Best2Ar parent="Best2Body";`,
    `SET Best2Ar text="طقم أورجانزا حريري بلون الزمرد المسائي" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Best2PriceBox parent="Best2Body";`,
    `SET Best2PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Best2Price parent="Best2PriceBox";`,
    `SET Best2Price text="2,800 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Best2Rating parent="Best2PriceBox";`,
    `SET Best2Rating text="★ 5.0 (28)" fontSize="13px" textColor="#8B7355";`,

    // Best 3
    `+FrameNode Best3 parent="BestGrid";`,
    `SET Best3 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Best3Img parent="Best3";`,
    `SET Best3Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1767469697194-ac997d70b1ee?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Best3Body parent="Best3";`,
    `SET Best3Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Best3Badge parent="Best3Body";`,
    `SET Best3Badge text="BEST SELLER" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Best3Name parent="Best3Body";`,
    `SET Best3Name text="Opaline Satin Draped Kaftan" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Best3Ar parent="Best3Body";`,
    `SET Best3Ar text="قفطان ساتان أوبال بتموجات انسيابية" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Best3PriceBox parent="Best3Body";`,
    `SET Best3PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Best3Price parent="Best3PriceBox";`,
    `SET Best3Price text="2,200 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Best3Rating parent="Best3PriceBox";`,
    `SET Best3Rating text="★ 4.9 (44)" fontSize="13px" textColor="#8B7355";`,

    // Best 4
    `+FrameNode Best4 parent="BestGrid";`,
    `SET Best4 layout="stack" stackDirection="vertical" width="23.5%" height="auto" fill="#F5F2EB" radius="16px" overflow="clip" border="1px solid #E8E1D9";`,
    `+FrameNode Best4Img parent="Best4";`,
    `SET Best4Img width="100%" height="370px" fill="https://images.unsplash.com/photo-1752794673269-dc356838c5fd?auto=format&fit=crop&w=1000&q=88" fillImagePositionX="center" fillImagePositionY="top";`,
    `+FrameNode Best4Body parent="Best4";`,
    `SET Best4Body layout="stack" stackDirection="vertical" padding="22px" gap="8px" width="100%";`,
    `+RichTextNode Best4Badge parent="Best4Body";`,
    `SET Best4Badge text="BEST SELLER" fontSize="10px" fontWeight="700" textColor="#8B7355" letterSpacing="2px";`,
    `+RichTextNode Best4Name parent="Best4Body";`,
    `SET Best4Name text="Cinnamon Linen Minimalist Daily Dress" fontSize="18px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Best4Ar parent="Best4Body";`,
    `SET Best4Ar text="فستان كتان قرفة بتصميم يومي بسيط" fontSize="14px" textColor="#6E5C53";`,
    `+FrameNode Best4PriceBox parent="Best4Body";`,
    `SET Best4PriceBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="12px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode Best4Price parent="Best4PriceBox";`,
    `SET Best4Price text="1,450 AED" fontSize="16px" fontWeight="700" textColor="#3B2F2F";`,
    `+RichTextNode Best4Rating parent="Best4PriceBox";`,
    `SET Best4Rating text="★ 4.9 (68)" fontSize="13px" textColor="#8B7355";`
  ].join(" ");
  await applySafe(bestSellersDSL, "/", "Build Best Sellers Section");

  // PART 6: Why Choose Our Atelier (The Alora Standards - White Cards on Cream)
  const standardsDSL = [
    `+FrameNode StandardsSection parent="${homeDesktopBp}";`,
    `SET StandardsSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#F5F2EB" borderTop="1px solid #E8E1D9";`,
    
    `+FrameNode StdHeader parent="StandardsSection";`,
    `SET StdHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode StdEyebrow parent="StdHeader";`,
    `SET StdEyebrow text="THE ALORA STANDARDS" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode StdTitle parent="StdHeader";`,
    `SET StdTitle text="Why Choose Our Atelier" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    
    `+FrameNode StdGrid parent="StandardsSection";`,
    `SET StdGrid layout="stack" stackDirection="horizontal" width="100%" gap="24px";`,
    
    // Std 1
    `+FrameNode Std1 parent="StdGrid";`,
    `SET Std1 layout="stack" stackDirection="vertical" gap="16px" width="23.5%" height="300px" padding="30px" fill="#FFFFFF" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Std1Icon parent="Std1";`,
    `SET Std1Icon layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="48px" height="48px" fill="#F5F2EB" radius="24px";`,
    `+RichTextNode Std1IconTxt parent="Std1Icon";`,
    `SET Std1IconTxt text="✂️" fontSize="20px";`,
    `+RichTextNode Std1Title parent="Std1";`,
    `SET Std1Title text="Handcrafted in Riyadh" fontSize="20px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Std1Desc parent="Std1";`,
    `SET Std1Desc text="Every garment is tailored individually in our Riyadh atelier with exquisite seam precision and hidden French finishing." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,

    // Std 2
    `+FrameNode Std2 parent="StdGrid";`,
    `SET Std2 layout="stack" stackDirection="vertical" gap="16px" width="23.5%" height="300px" padding="30px" fill="#FFFFFF" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Std2Icon parent="Std2";`,
    `SET Std2Icon layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="48px" height="48px" fill="#F5F2EB" radius="24px";`,
    `+RichTextNode Std2IconTxt parent="Std2Icon";`,
    `SET Std2IconTxt text="✨" fontSize="20px";`,
    `+RichTextNode Std2Title parent="Std2";`,
    `SET Std2Title text="Grade 6A Mulberry Silk" fontSize="20px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Std2Desc parent="Std2";`,
    `SET Std2Desc text="We source only 100% natural mulberry silks, Japanese crepe, and breathable Korean Nidha for enduring luxury." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,

    // Std 3
    `+FrameNode Std3 parent="StdGrid";`,
    `SET Std3 layout="stack" stackDirection="vertical" gap="16px" width="23.5%" height="300px" padding="30px" fill="#FFFFFF" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Std3Icon parent="Std3";`,
    `SET Std3Icon layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="48px" height="48px" fill="#F5F2EB" radius="24px";`,
    `+RichTextNode Std3IconTxt parent="Std3Icon";`,
    `SET Std3IconTxt text="📏" fontSize="20px";`,
    `+RichTextNode Std3Title parent="Std3";`,
    `SET Std3Title text="Bespoke Tailoring & Sizing" fontSize="20px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Std3Desc parent="Std3";`,
    `SET Std3Desc text="Select standard sizing or request custom length and sleeve measurements at no extra charge directly from our master tailors." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,

    // Std 4
    `+FrameNode Std4 parent="StdGrid";`,
    `SET Std4 layout="stack" stackDirection="vertical" gap="16px" width="23.5%" height="300px" padding="30px" fill="#FFFFFF" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Std4Icon parent="Std4";`,
    `SET Std4Icon layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" width="48px" height="48px" fill="#F5F2EB" radius="24px";`,
    `+RichTextNode Std4IconTxt parent="Std4Icon";`,
    `SET Std4IconTxt text="🎁" fontSize="20px";`,
    `+RichTextNode Std4Title parent="Std4";`,
    `SET Std4Title text="Express Global Delivery" fontSize="20px" fontWeight="600" textColor="#3B2F2F";`,
    `+RichTextNode Std4Desc parent="Std4";`,
    `SET Std4Desc text="Complimentary royal gift box presentation, velvet garment bag, and express white-glove shipping right to your door." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`
  ].join(" ");
  await applySafe(standardsDSL, "/", "Build Why Choose Our Atelier Section");

  // PART 7: Voices of Our Private Clients & Lifestyle Journal @AloraAbaya
  const clientsAndJournalDSL = [
    // Voices of Our Private Clients
    `+FrameNode ClientsSection parent="${homeDesktopBp}";`,
    `SET ClientsSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#FAF9F6";`,
    `+FrameNode CliHeader parent="ClientsSection";`,
    `SET CliHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode CliEyebrow parent="CliHeader";`,
    `SET CliEyebrow text="PRIVATE CLIENTS" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode CliTitle parent="CliHeader";`,
    `SET CliTitle text="Voices of Our Private Clients" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    
    `+FrameNode CliGrid parent="ClientsSection";`,
    `SET CliGrid layout="stack" stackDirection="horizontal" width="100%" gap="24px";`,
    
    `+FrameNode Cli1 parent="CliGrid";`,
    `SET Cli1 layout="stack" stackDirection="vertical" stackDistribution="space-between" width="23.5%" height="280px" padding="28px" fill="#F5F2EB" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Cli1Top parent="Cli1";`,
    `SET Cli1Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli1Stars parent="Cli1Top";`,
    `SET Cli1Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli1Quote parent="Cli1Top";`,
    `SET Cli1Quote text="“The Noor Pearl abaya is truly museum quality. The silk drape and hand-embroidered pearls exceeded every expectation.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli1Author parent="Cli1";`,
    `SET Cli1Author text="— Sheikha A., Dubai, UAE" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli2 parent="CliGrid";`,
    `SET Cli2 layout="stack" stackDirection="vertical" stackDistribution="space-between" width="23.5%" height="280px" padding="28px" fill="#F5F2EB" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Cli2Top parent="Cli2";`,
    `SET Cli2Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli2Stars parent="Cli2Top";`,
    `SET Cli2Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli2Quote parent="Cli2Top";`,
    `SET Cli2Quote text="“Wore the Al-Dana evening gown to a royal wedding in Riyadh. Absolutely breathtaking knife pleats and regal weight.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli2Author parent="Cli2";`,
    `SET Cli2Author text="— Princess M., Riyadh, KSA" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli3 parent="CliGrid";`,
    `SET Cli3 layout="stack" stackDirection="vertical" stackDistribution="space-between" width="23.5%" height="280px" padding="28px" fill="#F5F2EB" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Cli3Top parent="Cli3";`,
    `SET Cli3Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli3Stars parent="Cli3Top";`,
    `SET Cli3Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli3Quote parent="Cli3Top";`,
    `SET Cli3Quote text="“The custom sizing service is flawless. Arrived in London within 3 days in a gorgeous velvet presentation bag.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli3Author parent="Cli3";`,
    `SET Cli3Author text="— Lady H., London, UK" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    `+FrameNode Cli4 parent="CliGrid";`,
    `SET Cli4 layout="stack" stackDirection="vertical" stackDistribution="space-between" width="23.5%" height="280px" padding="28px" fill="#F5F2EB" radius="16px" border="1px solid #E8E1D9";`,
    `+FrameNode Cli4Top parent="Cli4";`,
    `SET Cli4Top layout="stack" stackDirection="vertical" gap="12px";`,
    `+RichTextNode Cli4Stars parent="Cli4Top";`,
    `SET Cli4Stars text="★★★★★   VERIFIED BUYER" fontSize="11px" fontWeight="600" textColor="#8B7355";`,
    `+RichTextNode Cli4Quote parent="Cli4Top";`,
    `SET Cli4Quote text="“The Sultana Bisht is a masterpiece of gold zari work. I felt magnificent from the moment I put it on.”" fontSize="15px" textColor="#3B2F2F" fontStyle="italic" lineHeight="1.6em";`,
    `+RichTextNode Cli4Author parent="Cli4";`,
    `SET Cli4Author text="— Noura S., Doha, Qatar" fontSize="13px" fontWeight="700" textColor="#3B2F2F";`,

    // Lifestyle & Journal @AloraAbaya
    `+FrameNode JournalSection parent="${homeDesktopBp}";`,
    `SET JournalSection layout="stack" stackDirection="vertical" width="100%" padding="90px 48px" gap="44px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    `+FrameNode JourHeader parent="JournalSection";`,
    `SET JourHeader layout="stack" stackDirection="vertical" gap="8px" stackAlignment="center" width="100%";`,
    `+RichTextNode JourEyebrow parent="JourHeader";`,
    `SET JourEyebrow text="ATELIER JOURNAL" fontSize="12px" fontWeight="600" textColor="#8B7355" letterSpacing="3px";`,
    `+RichTextNode JourTitle parent="JourHeader";`,
    `SET JourTitle text="Lifestyle & Journal @AloraAbaya" fontSize="42px" fontWeight="500" textColor="#3B2F2F";`,
    
    `+FrameNode JourGrid parent="JournalSection";`,
    `SET JourGrid layout="stack" stackDirection="horizontal" width="100%" gap="20px";`,
    
    `+FrameNode Jour1 parent="JourGrid";`,
    `SET Jour1 layout="stack" stackDirection="vertical" stackDistribution="end" width="19%" height="340px" fill="https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
    `+FrameNode Jour1Box parent="Jour1";`,
    `SET Jour1Box layout="stack" stackDirection="vertical" padding="16px" fill="rgba(44, 36, 32, 0.75)" width="100%";`,
    `+RichTextNode Jour1Text parent="Jour1Box";`,
    `SET Jour1Text text="▶ Velvet Walk" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`,

    `+FrameNode Jour2 parent="JourGrid";`,
    `SET Jour2 layout="stack" stackDirection="vertical" stackDistribution="end" width="19%" height="340px" fill="https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
    `+FrameNode Jour2Box parent="Jour2";`,
    `SET Jour2Box layout="stack" stackDirection="vertical" padding="16px" fill="rgba(44, 36, 32, 0.75)" width="100%";`,
    `+RichTextNode Jour2Text parent="Jour2Box";`,
    `SET Jour2Text text="▶ Cathedral BTS" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`,

    `+FrameNode Jour3 parent="JourGrid";`,
    `SET Jour3 layout="stack" stackDirection="vertical" stackDistribution="end" width="19%" height="340px" fill="https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
    `+FrameNode Jour3Box parent="Jour3";`,
    `SET Jour3Box layout="stack" stackDirection="vertical" padding="16px" fill="rgba(44, 36, 32, 0.75)" width="100%";`,
    `+RichTextNode Jour3Text parent="Jour3Box";`,
    `SET Jour3Text text="▶ Silk Details" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`,

    `+FrameNode Jour4 parent="JourGrid";`,
    `SET Jour4 layout="stack" stackDirection="vertical" stackDistribution="end" width="19%" height="340px" fill="https://images.unsplash.com/photo-1736342182642-e2042084f47c?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
    `+FrameNode Jour4Box parent="Jour4";`,
    `SET Jour4Box layout="stack" stackDirection="vertical" padding="16px" fill="rgba(44, 36, 32, 0.75)" width="100%";`,
    `+RichTextNode Jour4Text parent="Jour4Box";`,
    `SET Jour4Text text="▶ Evening Gala" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`,

    `+FrameNode Jour5 parent="JourGrid";`,
    `SET Jour5 layout="stack" stackDirection="vertical" stackDistribution="end" width="19%" height="340px" fill="https://images.unsplash.com/photo-1762605135376-ae5af70a5628?auto=format&fit=crop&w=600&q=80" fillImagePositionX="center" fillImagePositionY="center" radius="16px" overflow="clip";`,
    `+FrameNode Jour5Box parent="Jour5";`,
    `SET Jour5Box layout="stack" stackDirection="vertical" padding="16px" fill="rgba(44, 36, 32, 0.75)" width="100%";`,
    `+RichTextNode Jour5Text parent="Jour5Box";`,
    `SET Jour5Text text="▶ Riyadh Salon" fontSize="12px" fontWeight="600" textColor="#FAF9F6";`
  ].join(" ");
  await applySafe(clientsAndJournalDSL, "/", "Build Private Clients & Journal");

  // PART 8: Join Our Private Circle Newsletter & ALORA Footer
  const footerDSL = [
    `+FrameNode FooterSection parent="${homeDesktopBp}";`,
    `SET FooterSection layout="stack" stackDirection="vertical" width="100%" padding="80px 48px" gap="56px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,
    
    // Top Box: Newsletter Banner (Soft Cream #F5F2EB rounded box exactly like screenshot)
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

    // Middle Box: 4 Column Links
    `+FrameNode FootColumns parent="FooterSection";`,
    `SET FootColumns layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="24px";`,
    
    // Col 1: ALORA Logo & Description
    `+FrameNode FootCol1 parent="FootColumns";`,
    `SET FootCol1 layout="stack" stackDirection="vertical" gap="16px" width="300px";`,
    `+RichTextNode FootBrand parent="FootCol1";`,
    `SET FootBrand text="ALORA" fontSize="36px" fontWeight="700" textColor="#3B2F2F" letterSpacing="6px";`,
    `+RichTextNode FootBrandDesc parent="FootCol1";`,
    `SET FootBrandDesc text="Exclusively tailored luxury abayas & evening gowns. Handcrafted in Riyadh with ethical Grade 6A silks and timeless modesty." fontSize="14px" textColor="#6E5C53" lineHeight="1.6em";`,
    
    // Col 2: THE ATELIER
    `+FrameNode FootCol2 parent="FootColumns";`,
    `SET FootCol2 layout="stack" stackDirection="vertical" gap="12px" width="200px";`,
    `+RichTextNode FootCol2Head parent="FootCol2";`,
    `SET FootCol2Head text="THE ATELIER" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol2Links parent="FootCol2";`,
    `SET FootCol2Links text="All Dresses & Gowns\nNew Arrivals (Monday)\nBest Selling Creations\nThe Collections\nBespoke Bisht & Kaftans" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    // Col 3: CLIENT SERVICES
    `+FrameNode FootCol3 parent="FootColumns";`,
    `SET FootCol3 layout="stack" stackDirection="vertical" gap="12px" width="200px";`,
    `+RichTextNode FootCol3Head parent="FootCol3";`,
    `SET FootCol3Head text="CLIENT SERVICES" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol3Links parent="FootCol3";`,
    `SET FootCol3Links text="Atelier Heritage\nBespoke Sizing Guide\nWhite-Glove Shipping\nReturns & Exchanges\nPrivate Appointments" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    // Col 4: BOUTIQUE SALONS
    `+FrameNode FootCol4 parent="FootColumns";`,
    `SET FootCol4 layout="stack" stackDirection="vertical" gap="12px" width="260px";`,
    `+RichTextNode FootCol4Head parent="FootCol4";`,
    `SET FootCol4Head text="BOUTIQUE SALONS" fontSize="13px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px";`,
    `+RichTextNode FootCol4Links parent="FootCol4";`,
    `SET FootCol4Links text="Via Riyadh Flagship, KSA\nAl Bujairi Heritage Suite, Diriyah\nDIFC Gate Avenue, Dubai UAE\nHarrods Private Concession, London UK" fontSize="14px" textColor="#6E5C53" lineHeight="2.2em";`,

    // Bottom Box: Copyright & Payment Icons
    `+FrameNode FootCopyBox parent="FooterSection";`,
    `SET FootCopyBox layout="stack" stackDirection="horizontal" stackDistribution="space-between" width="100%" paddingTop="28px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode FootCopy parent="FootCopyBox";`,
    `SET FootCopy text="© 2026 ALORA ATELIER. All rights reserved. Crafted for royal distinction." fontSize="13px" textColor="#8B7355";`,
    `+RichTextNode FootPayment parent="FootCopyBox";`,
    `SET FootPayment text="🔒 Encrypted Secure Checkout   |   Apple Pay • Mada • Visa • Mastercard" fontSize="13px" fontWeight="600" textColor="#3B2F2F";`
  ].join(" ");
  await applySafe(footerDSL, "/", "Build Newsletter & Luxury Footer");

  console.log("=== ALORA HOMEPAGE PIXEL-PERFECT BUILD COMPLETE ===");
  return JSON.stringify({ status: "success", homepageComplete: true }, null, 2);
}
return await run();
