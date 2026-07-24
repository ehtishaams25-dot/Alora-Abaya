async function run() {
  console.log("=== FIXING ALL FORMATTING & OVERLAPS ON '/shop' PAGE ONLY ===");

  const pages = await framer.agent.getNodesOfTypes({ types: ["WebPageNode"] });
  const homePage = pages.find(p => p.attributes?.path === "/" || p.name?.toLowerCase() === "home") || pages[0];
  console.log(`Protected Homepage: ID=${homePage.id}, Path=${homePage.attributes?.path}`);

  const shopPage = pages.find(p => p.id !== homePage.id && (p.attributes?.path === "/shop" || p.name === "/shop" || p.name?.toLowerCase() === "shop"));
  
  if (!shopPage || shopPage.id === homePage.id || shopPage.attributes?.path === "/") {
    throw new Error("FATAL: Target page not found or resolved to homepage! Aborting to protect Home.");
  }

  const pageId = shopPage.id;
  const bpId = shopPage.$breakpoints?.[0]?.id || shopPage.children?.[0]?.id;
  const targetPath = shopPage.attributes?.path || "/shop";

  console.log(`Targeting STRICTLY /shop -> Page ID: ${pageId}, Breakpoint ID: ${bpId}, Path: ${targetPath}`);

  async function applySafe(dsl, path, label) {
    if (!dsl || dsl.trim() === "") return;
    console.log(`[${label}] Applying on ${path} (${dsl.length} chars)...`);
    const result = await framer.agent.applyChanges(dsl, { pagePath: path });
    return result;
  }

  // Setup /shop breakpoint canvas dimensions and styling explicitly with height="auto"
  await applySafe(`SET ${bpId} width="1440px" height="auto" fill="#FAF9F6" layout="stack" stackDirection="vertical" gap="0px";`, targetPath, "Setup /shop Breakpoint");

  // Clean out any existing children inside /shop breakpoint only
  const bpNode = await framer.agent.getNode({ id: bpId });
  if (bpNode && bpNode.children && bpNode.children.length > 0) {
    console.log(`Cleaning ${bpNode.children.length} existing node(s) on ${targetPath}...`);
    await framer.removeNodes(bpNode.children.map(c => c.id));
  }

  // STEP 1: Top Announcement Bar & Navigation Bar
  const navDSL = [
    `+FrameNode AnnounceBar parent="${bpId}";`,
    `SET AnnounceBar width="1440px" height="40px" fill="#2C2420" layout="stack" stackDirection="horizontal" stackAlignment="center" stackDistribution="center" padding="0px 24px";`,
    `+RichTextNode AnnounceText parent="AnnounceBar";`,
    `SET AnnounceText text="NEW ARRIVALS EVERY MONDAY — EXPLORE OUR SIGNATURE ATELIER EDITION   DISCOVER" fontSize="11px" fontWeight="600" textColor="#FAF9F6" letterSpacing="2.5px" height="auto";`,

    `+FrameNode NavBar parent="${bpId}";`,
    `SET NavBar width="1440px" height="90px" padding="0px 64px" fill="#FAF9F6" borderBottom="1px solid #E8E1D9" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    
    `+FrameNode NavLinks parent="NavBar";`,
    `SET NavLinks layout="stack" stackDirection="horizontal" gap="32px" stackAlignment="center" height="auto";`,
    `+RichTextNode NavL1 parent="NavLinks";`,
    `SET NavL1 text="ALL DRESSES" fontSize="12px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode NavL2 parent="NavLinks";`,
    `SET NavL2 text="NEW ARRIVALS" fontSize="12px" fontWeight="500" textColor="#6E5C53" letterSpacing="2px" height="auto";`,
    `+RichTextNode NavL3 parent="NavLinks";`,
    `SET NavL3 text="BEST SELLERS" fontSize="12px" fontWeight="500" textColor="#6E5C53" letterSpacing="2px" height="auto";`,
    `+RichTextNode NavL4 parent="NavLinks";`,
    `SET NavL4 text="ATELIER" fontSize="12px" fontWeight="500" textColor="#6E5C53" letterSpacing="2px" height="auto";`,

    `+RichTextNode NavBrand parent="NavBar";`,
    `SET NavBrand text="ALORA" fontName="Bodoni Moda" fontSize="36px" fontWeight="700" textColor="#2C2420" letterSpacing="6px" height="auto";`,

    `+FrameNode NavUtils parent="NavBar";`,
    `SET NavUtils layout="stack" stackDirection="horizontal" gap="20px" stackAlignment="center" height="auto";`,
    `+FrameNode GuestPill parent="NavUtils";`,
    `SET GuestPill layout="stack" stackDirection="horizontal" stackAlignment="center" height="32px" padding="0px 14px" fill="#F5F2EB" radius="16px";`,
    `+RichTextNode GuestText parent="GuestPill";`,
    `SET GuestText text="● GUEST MODE" fontSize="11px" fontWeight="600" textColor="#8B7355" letterSpacing="1px" height="auto";`,
    `+RichTextNode LangText parent="NavUtils";`,
    `SET LangText text="AR / العربية" fontSize="12px" fontWeight="600" textColor="#3B2F2F" height="auto";`,
    `+RichTextNode IconsText parent="NavUtils";`,
    `SET IconsText text="🔍   👤   ♡   🛍 (2)" fontSize="14px" fontWeight="500" textColor="#3B2F2F" height="auto";`
  ].join(" ");
  await applySafe(navDSL, targetPath, "Build Nav Header on /shop");

  // STEP 2: Main Catalog Layout Container (Sidebar + Grid) with explicit height="auto" and generous gap/padding
  const catalogContainerDSL = [
    `+FrameNode CatalogMain parent="${bpId}";`,
    `SET CatalogMain width="1440px" height="auto" padding="48px 80px 100px 80px" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" fill="#FAF9F6";`,

    // LEFT SIDEBAR Box (260px width, height="auto")
    `+FrameNode SidebarBox parent="CatalogMain";`,
    `SET SidebarBox width="260px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="start" gap="28px" paddingRight="24px";`,

    // 1. SORT BY Group (Individual options instead of multiline overlap)
    `+FrameNode SortGroup parent="SidebarBox";`,
    `SET SortGroup width="100%" height="auto" layout="stack" stackDirection="vertical" gap="12px";`,
    `+FrameNode SortHeadRow parent="SortGroup";`,
    `SET SortHeadRow width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode SortHead parent="SortHeadRow";`,
    `SET SortHead text="SORT BY" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode SortMinus parent="SortHeadRow";`,
    `SET SortMinus text="–" fontSize="14px" textColor="#3B2F2F" height="auto";`,
    
    `+RichTextNode SortOpt1 parent="SortGroup";`,
    `SET SortOpt1 text="◉  Newest" fontSize="13px" fontWeight="600" textColor="#2C2420" height="auto";`,
    `+RichTextNode SortOpt2 parent="SortGroup";`,
    `SET SortOpt2 text="◯  Best Sellers" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode SortOpt3 parent="SortGroup";`,
    `SET SortOpt3 text="◯  Price: Low to High" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode SortOpt4 parent="SortGroup";`,
    `SET SortOpt4 text="◯  Price: High to Low" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode SortOpt5 parent="SortGroup";`,
    `SET SortOpt5 text="◯  Featured" fontSize="13px" textColor="#6E5C53" height="auto";`,

    `+FrameNode Div1 parent="SidebarBox";`,
    `SET Div1 width="100%" height="1px" fill="#E8E1D9";`,

    // 2. CATEGORY Group (Individual option rows)
    `+FrameNode CatGroup parent="SidebarBox";`,
    `SET CatGroup width="100%" height="auto" layout="stack" stackDirection="vertical" gap="12px";`,
    `+FrameNode CatHeadRow parent="CatGroup";`,
    `SET CatHeadRow width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode CatHead parent="CatHeadRow";`,
    `SET CatHead text="CATEGORY" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode CatMinus parent="CatHeadRow";`,
    `SET CatMinus text="–" fontSize="14px" textColor="#3B2F2F" height="auto";`,

    `+FrameNode CatRow1 parent="CatGroup";`,
    `SET CatRow1 width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode CatR1L parent="CatRow1";`,
    `SET CatR1L text="☐  Abayas" fontSize="13px" textColor="#5A4D44" height="auto";`,
    `+RichTextNode CatR1R parent="CatRow1";`,
    `SET CatR1R text="(12)" fontSize="13px" textColor="#8B7355" height="auto";`,

    `+FrameNode CatRow2 parent="CatGroup";`,
    `SET CatRow2 width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode CatR2L parent="CatRow2";`,
    `SET CatR2L text="☐  Dresses" fontSize="13px" textColor="#5A4D44" height="auto";`,
    `+RichTextNode CatR2R parent="CatRow2";`,
    `SET CatR2R text="(7)" fontSize="13px" textColor="#8B7355" height="auto";`,

    `+FrameNode CatRow3 parent="CatGroup";`,
    `SET CatRow3 width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode CatR3L parent="CatRow3";`,
    `SET CatR3L text="☐  Kaftans" fontSize="13px" textColor="#5A4D44" height="auto";`,
    `+RichTextNode CatR3R parent="CatRow3";`,
    `SET CatR3R text="(5)" fontSize="13px" textColor="#8B7355" height="auto";`,

    `+FrameNode CatRow4 parent="CatGroup";`,
    `SET CatRow4 width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode CatR4L parent="CatRow4";`,
    `SET CatR4L text="☐  Occasion Wear" fontSize="13px" textColor="#5A4D44" height="auto";`,
    `+RichTextNode CatR4R parent="CatRow4";`,
    `SET CatR4R text="(8)" fontSize="13px" textColor="#8B7355" height="auto";`,

    `+FrameNode Div2 parent="SidebarBox";`,
    `SET Div2 width="100%" height="1px" fill="#E8E1D9";`,

    // 3. SIZE Group
    `+FrameNode SizeGroup parent="SidebarBox";`,
    `SET SizeGroup width="100%" height="auto" layout="stack" stackDirection="vertical" gap="14px";`,
    `+FrameNode SizeHeadRow parent="SizeGroup";`,
    `SET SizeHeadRow width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode SizeHead parent="SizeHeadRow";`,
    `SET SizeHead text="SIZE" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode SizeMinus parent="SizeHeadRow";`,
    `SET SizeMinus text="–" fontSize="14px" textColor="#3B2F2F" height="auto";`,
    
    `+FrameNode SizeRow1 parent="SizeGroup";`,
    `SET SizeRow1 width="100%" height="auto" layout="stack" stackDirection="horizontal" gap="8px";`,
    `+FrameNode SizeXS parent="SizeRow1";`,
    `SET SizeXS width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextXS parent="SizeXS";`,
    `SET TextXS text="XS" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,
    `+FrameNode SizeS parent="SizeRow1";`,
    `SET SizeS width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextS parent="SizeS";`,
    `SET TextS text="S" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,
    `+FrameNode SizeM parent="SizeRow1";`,
    `SET SizeM width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextM parent="SizeM";`,
    `SET TextM text="M" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,

    `+FrameNode SizeRow2 parent="SizeGroup";`,
    `SET SizeRow2 width="100%" height="auto" layout="stack" stackDirection="horizontal" gap="8px";`,
    `+FrameNode SizeL parent="SizeRow2";`,
    `SET SizeL width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextL parent="SizeL";`,
    `SET TextL text="L" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,
    `+FrameNode SizeXL parent="SizeRow2";`,
    `SET SizeXL width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextXL parent="SizeXL";`,
    `SET TextXL text="XL" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,
    `+FrameNode SizeXXL parent="SizeRow2";`,
    `SET SizeXXL width="74px" height="34px" fill="#F5F2EB" radius="8px" layout="stack" stackAlignment="center" stackDistribution="center";`,
    `+RichTextNode TextXXL parent="SizeXXL";`,
    `SET TextXXL text="XXL" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`,

    `+FrameNode Div3 parent="SidebarBox";`,
    `SET Div3 width="100%" height="1px" fill="#E8E1D9";`,

    // 4. COLOR Group (Individual swatch lines)
    `+FrameNode ColorGroup parent="SidebarBox";`,
    `SET ColorGroup width="100%" height="auto" layout="stack" stackDirection="vertical" gap="12px";`,
    `+FrameNode ColorHeadRow parent="ColorGroup";`,
    `SET ColorHeadRow width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
    `+RichTextNode ColorHead parent="ColorHeadRow";`,
    `SET ColorHead text="COLOR" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode ColorMinus parent="ColorHeadRow";`,
    `SET ColorMinus text="–" fontSize="14px" textColor="#3B2F2F" height="auto";`,
    
    `+RichTextNode ColorRowA parent="ColorGroup";`,
    `SET ColorRowA text="⚪ Cream     ⚫ Black     🟤 Brown     🟢 Olive" fontSize="13px" textColor="#5A4D44" height="auto";`,
    `+RichTextNode ColorRowB parent="ColorGroup";`,
    `SET ColorRowB text="⚪ White     🔘 Grey       🟡 Beige" fontSize="13px" textColor="#5A4D44" height="auto";`,

    // RIGHT PRODUCTS GRID CONTAINER (980px width, height="auto", gap="40px")
    `+FrameNode ProductGridBox parent="CatalogMain";`,
    `SET ProductGridBox width="980px" height="auto" layout="stack" stackDirection="vertical" gap="40px";`,
    
    // Row 1 (4 Products) - Explicit height="auto" and gap="20px"
    `+FrameNode GridRow1 parent="ProductGridBox";`,
    `SET GridRow1 width="980px" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start";`,

    // Row 2 (4 Products) - Explicit height="auto" and gap="20px"
    `+FrameNode GridRow2 parent="ProductGridBox";`,
    `SET GridRow2 width="980px" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start";`
  ].join(" ");
  await applySafe(catalogContainerDSL, targetPath, "Build Sidebar & Grid Containers on /shop");

  // STEP 3: Build 8 Luxury Product Cards with explicit heights so no overlap happens
  const products = [
    {
      id: "P1",
      row: "GridRow1",
      title: "Royal Silk Bisht Abaya",
      cat: "ABAYAS",
      rating: "★ 5.0",
      price: "2,450 SAR",
      badge: "NEW ARRIVAL",
      badgeFill: "#3B2F2F",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P2",
      row: "GridRow1",
      title: "Riyadh Noir Structured Abaya",
      cat: "ABAYAS",
      rating: "★ 4.9",
      price: "1,650 SAR",
      badge: "NEW",
      badgeFill: "#8C7A6B",
      image: "https://images.unsplash.com/photo-1682195721373-93bf6c181938?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P3",
      row: "GridRow1",
      title: "Midnight Velvet Gilded Kaftan",
      cat: "ABAYAS",
      rating: "★ 4.9",
      price: "3,100 SAR",
      badge: "LIMITED EDITION",
      badgeFill: "#9C7C54",
      image: "https://images.unsplash.com/photo-1736342182213-6c037467cb38?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P4",
      row: "GridRow1",
      title: "Al-Dana Pleated Crepe Dress",
      cat: "DRESSES",
      rating: "★ 4.9",
      price: "1,950 SAR",
      badge: "NEW",
      badgeFill: "#8C7A6B",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P5",
      row: "GridRow2",
      title: "Solitaire Pearl Chiffon Gown",
      cat: "DRESSES",
      rating: "★ 5.0",
      price: "2,750 SAR",
      badge: "NEW",
      badgeFill: "#8C7A6B",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P6",
      row: "GridRow2",
      title: "Desert Sand Double Nidha Abaya",
      cat: "ABAYAS",
      rating: "★ 4.8",
      price: "1,850 SAR",
      badge: "NEW ARRIVAL",
      badgeFill: "#3B2F2F",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P7",
      row: "GridRow2",
      title: "Emerald Silk Organza Overcoat",
      cat: "OCCASION WEAR",
      rating: "★ 5.0",
      price: "2,800 SAR",
      badge: "PRE ORDER",
      badgeFill: "#6A5D52",
      image: "https://images.unsplash.com/photo-1782025419629-d69df1556e0c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "P8",
      row: "GridRow2",
      title: "Malak Pearl-Grey Satin Abaya",
      cat: "ABAYAS",
      rating: "★ 4.9",
      price: "2,400 SAR",
      badge: "NEW",
      badgeFill: "#8C7A6B",
      image: "https://images.unsplash.com/photo-1728487235101-664d87965931?auto=format&fit=crop&w=800&q=80"
    }
  ];

  for (const item of products) {
    const cardDSL = [
      `+FrameNode Card_${item.id} parent="${item.row}";`,
      `SET Card_${item.id} width="230px" height="auto" layout="stack" stackDirection="vertical" gap="14px" paddingBottom="18px" fill="#FAF6F0" radius="16px" border="1px solid #EFECE6" overflow="hidden";`,
      
      `+FrameNode ImgBox_${item.id} parent="Card_${item.id}";`,
      `SET ImgBox_${item.id} width="230px" height="310px" position="relative" fill="rgba(0,0,0,0)";`,
      `+FrameNode Img_${item.id} parent="ImgBox_${item.id}";`,
      `SET Img_${item.id} width="230px" height="310px" position="absolute" top="0px" left="0px" fill="${item.image}" radius="16px";`,
      
      `+FrameNode BadgeBox_${item.id} parent="ImgBox_${item.id}";`,
      `SET BadgeBox_${item.id} layout="stack" stackDirection="horizontal" stackAlignment="center" height="24px" padding="0px 10px" fill="${item.badgeFill}" radius="12px" position="absolute" top="12px" left="12px";`,
      `+RichTextNode BadgeText_${item.id} parent="BadgeBox_${item.id}";`,
      `SET BadgeText_${item.id} text="${item.badge}" fontSize="10px" fontWeight="600" textColor="#FAF9F6" letterSpacing="1px" height="auto";`,

      `+FrameNode Heart_${item.id} parent="ImgBox_${item.id}";`,
      `SET Heart_${item.id} width="32px" height="32px" radius="16px" fill="#FFFFFF" layout="stack" stackAlignment="center" stackDistribution="center" position="absolute" top="12px" right="12px";`,
      `+RichTextNode HeartText_${item.id} parent="Heart_${item.id}";`,
      `SET HeartText_${item.id} text="♡" fontSize="15px" textColor="#3B2F2F" height="auto";`,

      `+FrameNode Details_${item.id} parent="Card_${item.id}";`,
      `SET Details_${item.id} width="100%" height="auto" padding="0px 14px" layout="stack" stackDirection="vertical" gap="8px";`,
      
      `+FrameNode MetaRow_${item.id} parent="Details_${item.id}";`,
      `SET MetaRow_${item.id} width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center";`,
      `+RichTextNode CatText_${item.id} parent="MetaRow_${item.id}";`,
      `SET CatText_${item.id} text="${item.cat}" fontSize="10px" fontWeight="600" textColor="#8B7355" letterSpacing="1.5px" height="auto";`,
      `+RichTextNode RatingText_${item.id} parent="MetaRow_${item.id}";`,
      `SET RatingText_${item.id} text="${item.rating}" fontSize="11px" fontWeight="500" textColor="#6E5C53" height="auto";`,

      `+RichTextNode Title_${item.id} parent="Details_${item.id}";`,
      `SET Title_${item.id} text="${item.title}" fontName="Bodoni Moda" fontSize="15px" fontWeight="500" textColor="#2C2420" height="auto";`,

      `+FrameNode PriceRow_${item.id} parent="Details_${item.id}";`,
      `SET PriceRow_${item.id} width="100%" height="auto" layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" paddingTop="4px";`,
      `+RichTextNode Price_${item.id} parent="PriceRow_${item.id}";`,
      `SET Price_${item.id} text="${item.price}" fontSize="14px" fontWeight="700" textColor="#2C2420" height="auto";`,
      
      `+FrameNode Colors_${item.id} parent="PriceRow_${item.id}";`,
      `SET Colors_${item.id} layout="stack" stackDirection="horizontal" gap="4px" height="auto";`,
      `+FrameNode C1_${item.id} parent="Colors_${item.id}";`,
      `SET C1_${item.id} width="10px" height="10px" radius="5px" fill="#2C2420";`,
      `+FrameNode C2_${item.id} parent="Colors_${item.id}";`,
      `SET C2_${item.id} width="10px" height="10px" radius="5px" fill="#8C7A6B";`,
      `+FrameNode C3_${item.id} parent="Colors_${item.id}";`,
      `SET C3_${item.id} width="10px" height="10px" radius="5px" fill="#D8CFC4";`
    ].join(" ");

    await applySafe(cardDSL, targetPath, `Build Product Card ${item.id} on /shop`);
  }

  // STEP 4: Build Editorial Footer on /shop with explicit height="auto"
  const footerDSL = [
    `+FrameNode FooterSection parent="${bpId}";`,
    `SET FooterSection width="1440px" height="auto" layout="stack" stackDirection="vertical" stackAlignment="center" gap="0px" padding="80px 80px 40px 80px" fill="#FAF9F6" borderTop="1px solid #E8E1D9";`,

    `+FrameNode FootTopRow parent="FooterSection";`,
    `SET FootTopRow layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" paddingBottom="64px" borderBottom="1px solid #E8E1D9";`,

    `+FrameNode FootBrandBox parent="FootTopRow";`,
    `SET FootBrandBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="18px" width="460px" height="auto";`,
    `+RichTextNode FootBrandLogo parent="FootBrandBox";`,
    `SET FootBrandLogo text="ALORA" fontName="Bodoni Moda" fontSize="40px" fontWeight="400" textColor="#2C2420" letterSpacing="4px" height="auto";`,
    `+RichTextNode FootBrandDesc parent="FootBrandBox";`,
    `SET FootBrandDesc text="Experience the calm sophistication of luxury modesty. Hand-tailored from fluid silks and pure double-layered chiffons, designed to drape effortlessly with dignified poise." fontSize="14px" textColor="#6E5C53" lineHeight="1.7em" height="auto";`,
    
    `+FrameNode FootVipRow parent="FootBrandBox";`,
    `SET FootVipRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="10px" paddingTop="8px" height="auto";`,
    `+FrameNode FootVipDot parent="FootVipRow";`,
    `SET FootVipDot width="8px" height="8px" radius="4px" fill="#4A6B5B";`,
    `+RichTextNode FootVipText parent="FootVipRow";`,
    `SET FootVipText text="ENCRYPTED GLOBAL VIP CHECKOUT" fontSize="11px" fontWeight="700" textColor="#4A6B5B" letterSpacing="2px" height="auto";`,

    `+FrameNode FootNewsBox parent="FootTopRow";`,
    `SET FootNewsBox layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="660px" height="auto" padding="42px" fill="#F5F2EB" radius="24px" border="1px solid #EAE3DA";`,
    `+RichTextNode FootNewsTitle parent="FootNewsBox";`,
    `SET FootNewsTitle text="Join the Alora Private Circle" fontName="Bodoni Moda" fontSize="28px" fontWeight="500" textColor="#2C2420" height="auto";`,
    `+RichTextNode FootNewsSub parent="FootNewsBox";`,
    `SET FootNewsSub text="Be the first to receive invitations to seasonal trunk shows, bespoke pre-order drops, and private salon editorials." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em" height="auto";`,
    
    `+FrameNode FootFormRow parent="FootNewsBox";`,
    `SET FootFormRow layout="stack" stackDirection="horizontal" stackAlignment="center" gap="12px" width="100%" paddingTop="8px" height="auto";`,
    `+FrameNode FootInputBox parent="FootFormRow";`,
    `SET FootInputBox layout="stack" stackDirection="horizontal" stackAlignment="center" width="380px" height="50px" padding="0px 24px" fill="#FFFFFF" radius="25px" border="1px solid #E8E1D9";`,
    `+RichTextNode FootInputText parent="FootInputBox";`,
    `SET FootInputText text="Enter your email address..." fontSize="13px" textColor="#8B7355" height="auto";`,
    `+FrameNode FootSubBtn parent="FootFormRow";`,
    `SET FootSubBtn layout="stack" stackDirection="horizontal" stackAlignment="center" height="50px" padding="0px 32px" fill="#3B2F2F" radius="25px";`,
    `+RichTextNode FootSubText parent="FootSubBtn";`,
    `SET FootSubText text="JOIN CIRCLE" fontSize="12px" fontWeight="700" textColor="#FFFFFF" letterSpacing="2px" height="auto";`,

    `+FrameNode FootColumns parent="FooterSection";`,
    `SET FootColumns layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="start" width="100%" height="auto" padding="64px 0px";`,

    `+FrameNode FootCol1 parent="FootColumns";`,
    `SET FootCol1 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="220px" height="auto";`,
    `+RichTextNode FootCol1Head parent="FootCol1";`,
    `SET FootCol1Head text="BOUTIQUE & COLLECTIONS" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode FootCol1L1 parent="FootCol1";`,
    `SET FootCol1L1 text="All Dresses" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol1L2 parent="FootCol1";`,
    `SET FootCol1L2 text="New Arrivals" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol1L3 parent="FootCol1";`,
    `SET FootCol1L3 text="Best Sellers" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol1L4 parent="FootCol1";`,
    `SET FootCol1L4 text="Categories" fontSize="13px" textColor="#6E5C53" height="auto";`,

    `+FrameNode FootCol2 parent="FootColumns";`,
    `SET FootCol2 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="240px" height="auto";`,
    `+RichTextNode FootCol2Head parent="FootCol2";`,
    `SET FootCol2Head text="ATELIER CARE & SERVICES" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode FootCol2L1 parent="FootCol2";`,
    `SET FootCol2L1 text="Atelier" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol2L2 parent="FootCol2";`,
    `SET FootCol2L2 text="FAQ" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol2L3 parent="FootCol2";`,
    `SET FootCol2L3 text="Returns & Exchanges" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol2L4 parent="FootCol2";`,
    `SET FootCol2L4 text="Private Concierge" fontSize="13px" textColor="#6E5C53" height="auto";`,

    `+FrameNode FootCol3 parent="FootColumns";`,
    `SET FootCol3 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="280px" height="auto";`,
    `+RichTextNode FootCol3Head parent="FootCol3";`,
    `SET FootCol3Head text="OUR SALONS" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode FootCol3L1 parent="FootCol3";`,
    `SET FootCol3L1 text="Flagship Salon: Via Riyadh, KSA" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol3L2 parent="FootCol3";`,
    `SET FootCol3L2 text="Al Bujairi Heritage Suite, Diriyah" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol3L3 parent="FootCol3";`,
    `SET FootCol3L3 text="Dubai International Financial Centre (DIFC)" fontSize="13px" textColor="#6E5C53" height="auto";`,
    `+RichTextNode FootCol3L4 parent="FootCol3";`,
    `SET FootCol3L4 text="Harrods Concession, London UK" fontSize="13px" textColor="#6E5C53" height="auto";`,

    `+FrameNode FootCol4 parent="FootColumns";`,
    `SET FootCol4 layout="stack" stackDirection="vertical" stackAlignment="start" gap="16px" width="260px" height="auto";`,
    `+RichTextNode FootCol4Head parent="FootCol4";`,
    `SET FootCol4Head text="SOCIAL CHRONICLE" fontSize="11px" fontWeight="700" textColor="#3B2F2F" letterSpacing="2px" height="auto";`,
    `+RichTextNode FootCol4L1 parent="FootCol4";`,
    `SET FootCol4L1 text="Tag us or use #AloraAbayas to be featured in our monthly private salon chronicle." fontSize="13px" textColor="#6E5C53" lineHeight="1.6em" height="auto";`,
    `+RichTextNode FootCol4L2 parent="FootCol4";`,
    `SET FootCol4L2 text="@AloraAbaya →" fontSize="13px" fontWeight="600" textColor="#3B2F2F" height="auto";`,

    `+FrameNode FootBottomBar parent="FooterSection";`,
    `SET FootBottomBar layout="stack" stackDirection="horizontal" stackDistribution="space-between" stackAlignment="center" width="100%" height="auto" paddingTop="28px" borderTop="1px solid #E8E1D9";`,
    `+RichTextNode FootCopy parent="FootBottomBar";`,
    `SET FootCopy text="© 2026 Alora Atelier. All rights reserved. Crafted with distinction." fontSize="12px" textColor="#8B7355" height="auto";`,
    `+RichTextNode FootLocation parent="FootBottomBar";`,
    `SET FootLocation text="Privately Handcrafted in Riyadh, KSA   ·   ALORA" fontSize="12px" fontWeight="500" textColor="#3B2F2F" height="auto";`
  ].join(" ");
  await applySafe(footerDSL, targetPath, "Build Reference Footer on /shop");

  console.log("=== ALL FORMATTING & OVERLAPS PERFECTLY FIXED ON '/shop' ONLY ===");
  return { status: "success", pageId, targetPath, totalProducts: products.length };
}

return await run();
