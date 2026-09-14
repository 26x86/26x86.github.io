const I18N = {
  en: {
    locale: "en",
    title: "NextCore",
    description: "Experimental UEFI project for macOS on x86. Public EFI picker, EFI folder generator, and USB writer. macos_boot_verified is false.",
    nav: { start: "Getting Started", status: "Status", repos: "Repositories", github: "GitHub" },
    theme: "Theme",
    menu: "Menu",
    lang: "Language",
    kicker: "Experimental project",
    h1: "NextCore",
    lede: "An experimental UEFI project for macOS boot paths on x86. It is not a finished operating-system port and not a supported installer.",
    ctaStart: "Getting Started",
    ctaRepo: "Public repository",
    whatTitle: "What this is",
    whatBody: "26x86 develops NextCore as an experiment: a prebuilt x86_64 UEFI picker, an EFI folder generator that downloads official OpenCore, and a Windows script that writes that folder to a USB ESP. Source code and research remain in the private monorepo.",
    notTitle: "What this is not",
    notItems: [
      "Not a verified macOS boot. macos_boot_verified is false.",
      "Not Apple Recovery. A BaseSystem.dmg copied onto exFAT is a file, not a Recovery volume.",
      "Not a hardware support list. The 15IGL7 profile documents Gemini Lake (no AVX2, no macOS 26 GPU driver).",
      "Not OpenCore itself. OpenCore is downloaded from acidanthera/OpenCorePkg at build time."
    ],
    startTitle: "Getting Started",
    startLede: "Requires Python 3.9+ and, on Windows, an elevated PowerShell 5.1+ session.",
    startSteps: [
      "Clone https://github.com/26x86/NextCore.git",
      "python tools/make_efi.py --profile 15igl7 --out out/15igl7",
      "In elevated PowerShell: .\\tools\\make-usb.ps1 -List",
      ".\\tools\\make-usb.ps1 -Profile 15igl7 -DiskNumber <N> -Force"
    ],
    startNote: "Replace SystemSerialNumber, MLB, SystemUUID, and ROM in EFI/OC/config.plist before use. The macOS Recovery picker entry is disabled until an APFS Recovery volume exists.",
    toolsTitle: "Public tools",
    cards: [
      { h: "BOOTX64.EFI", p: "Prebuilt picker (apfs-jumpstart, console-control).", more: "bin/NEXTCORE/BOOTX64.EFI" },
      { h: "make_efi.py", p: "Downloads OpenCore, generates config.plist, runs ocvalidate, builds EFI/.", more: "tools/make_efi.py" },
      { h: "make-usb.ps1", p: "Creates a FAT32 ESP on a USB disk and copies EFI/ with hash verification.", more: "tools/make-usb.ps1" }
    ],
    statusTitle: "Status",
    statusLede: "Values below are the current public record. They are not a roadmap.",
    meters: [
      { dt: "x86 UEFI load", v: "partial" },
      { dt: "OpenCore chain-load", v: "staged" },
      { dt: "macOS Recovery volume", v: "absent on exFAT" },
      { dt: "macos_boot_verified", v: "false" }
    ],
    fine: "Version 1.0.0 is a packaging release. Version 2.0.0 is reserved until UART evidence shows target-matching XNU and userspace.",
    reposTitle: "Repositories",
    reposLede: "The public consumer repository is NextCore. Other Nextcore-* repositories are module exports.",
    mods: [
      ["NextCore", "Picker binary, EFI generator, USB writer"],
      ["26x86", "Private monorepo (source, research)"],
      ["Nextcore-EFI", "UEFI application"],
      ["Nextcore-Core", "Configuration and codecs"],
      ["Nextcore-HAL", "ACPI, PCI, SMBIOS, DeviceTree"],
      ["Nextcore-ISE", "ARM64e instruction runtime"],
      ["Nextcore-GPU", "GPU policy"],
      ["Nextcore-APLS", "AArch64 recovery runner"],
      ["Nextcore-Tool", "CLI orchestration"]
    ],
    identityTitle: "Identity",
    identity: "Official marks from NextCore-Brand-Kit: symbol, wordmark, and a dark navigation example.",
    footer: "© 2026 26x86. NextCore is an experimental project. macos_boot_verified = false.",
    heroAlt: "NextCore lockup",
    boardAlt: "NextCore brand board"
  },
  ko: {
    locale: "ko",
    title: "NextCore",
    description: "x86 macOS 부트 경로를 위한 실험용 UEFI 프로젝트. 공개 EFI 피커, EFI 폴더 생성기, USB 기록기. macos_boot_verified는 false입니다.",
    nav: { start: "시작하기", status: "상태", repos: "저장소", github: "GitHub" },
    theme: "테마",
    menu: "메뉴",
    lang: "언어",
    kicker: "실험 프로젝트",
    h1: "NextCore",
    lede: "x86에서 macOS 부트 경로를 다루는 실험용 UEFI 프로젝트입니다. 완성된 OS 포트가 아니며, 지원되는 설치 프로그램도 아닙니다.",
    ctaStart: "시작하기",
    ctaRepo: "공개 저장소",
    whatTitle: "범위",
    whatBody: "26x86은 NextCore를 실험으로 개발합니다. 미리 빌드된 x86_64 UEFI 피커, 공식 OpenCore를 받는 EFI 폴더 생성기, 그 폴더를 USB ESP에 쓰는 Windows 스크립트를 공개합니다. 소스 코드와 연구는 비공개 모노레포에 있습니다.",
    notTitle: "해당하지 않는 것",
    notItems: [
      "검증된 macOS 부트가 아닙니다. macos_boot_verified는 false입니다.",
      "Apple Recovery가 아닙니다. exFAT에 복사한 BaseSystem.dmg는 파일이며 Recovery 볼륨이 아닙니다.",
      "하드웨어 지원 목록이 아닙니다. 15IGL7 프로파일은 Gemini Lake(AVX2 없음, macOS 26 GPU 드라이버 없음)를 기록합니다.",
      "OpenCore 본체가 아닙니다. OpenCore는 빌드 시 acidanthera/OpenCorePkg에서 내려받습니다."
    ],
    startTitle: "시작하기",
    startLede: "Python 3.9+가 필요합니다. Windows USB 기록은 관리자 PowerShell 5.1+가 필요합니다.",
    startSteps: [
      "git clone https://github.com/26x86/NextCore.git",
      "python tools/make_efi.py --profile 15igl7 --out out/15igl7",
      "관리자 PowerShell: .\\tools\\make-usb.ps1 -List",
      ".\\tools\\make-usb.ps1 -Profile 15igl7 -DiskNumber <N> -Force"
    ],
    startNote: "사용 전에 EFI/OC/config.plist에서 SystemSerialNumber, MLB, SystemUUID, ROM을 교체하십시오. macOS Recovery 항목은 APFS Recovery 볼륨이 있을 때까지 비활성입니다.",
    toolsTitle: "공개 도구",
    cards: [
      { h: "BOOTX64.EFI", p: "미리 빌드된 피커 (apfs-jumpstart, console-control).", more: "bin/NEXTCORE/BOOTX64.EFI" },
      { h: "make_efi.py", p: "OpenCore를 받고 config.plist를 생성한 뒤 ocvalidate를 실행하고 EFI/를 만듭니다.", more: "tools/make_efi.py" },
      { h: "make-usb.ps1", p: "USB에 FAT32 ESP를 만들고 EFI/를 복사한 다음 해시를 검증합니다.", more: "tools/make-usb.ps1" }
    ],
    statusTitle: "상태",
    statusLede: "아래 값은 현재 공개 기록입니다. 로드맵이 아닙니다.",
    meters: [
      { dt: "x86 UEFI 로드", v: "partial" },
      { dt: "OpenCore 체인로드", v: "staged" },
      { dt: "macOS Recovery 볼륨", v: "exFAT에 없음" },
      { dt: "macos_boot_verified", v: "false" }
    ],
    fine: "1.0.0은 패키징 릴리스입니다. 2.0.0은 UART로 대상 XNU와 유저스페이스가 확인될 때까지 예약됩니다.",
    reposTitle: "저장소",
    reposLede: "공개 소비자 저장소는 NextCore입니다. 나머지 Nextcore-*는 모듈 내보내기입니다.",
    mods: [
      ["NextCore", "피커 바이너리, EFI 생성기, USB 기록기"],
      ["26x86", "비공개 모노레포 (소스, 연구)"],
      ["Nextcore-EFI", "UEFI 애플리케이션"],
      ["Nextcore-Core", "설정 및 코덱"],
      ["Nextcore-HAL", "ACPI, PCI, SMBIOS, DeviceTree"],
      ["Nextcore-ISE", "ARM64e 명령 런타임"],
      ["Nextcore-GPU", "GPU 정책"],
      ["Nextcore-APLS", "AArch64 복구 러너"],
      ["Nextcore-Tool", "CLI 오케스트레이션"]
    ],
    identityTitle: "로고",
    identity: "NextCore-Brand-Kit의 공식 마크: 심벌, 워드마크, 다크 내비게이션 예시.",
    footer: "© 2026 26x86. NextCore는 실험 프로젝트입니다. macos_boot_verified = false.",
    heroAlt: "NextCore 로고",
    boardAlt: "NextCore 브랜드 보드"
  },
  ja: {
    locale: "ja",
    title: "NextCore",
    description: "x86 上の macOS ブート経路向けの実験的 UEFI プロジェクト。公開 EFI ピッカー、EFI フォルダ生成、USB 書き込み。macos_boot_verified は false。",
    nav: { start: "始める", status: "状態", repos: "リポジトリ", github: "GitHub" },
    theme: "テーマ",
    menu: "メニュー",
    lang: "言語",
    kicker: "実験プロジェクト",
    h1: "NextCore",
    lede: "x86 上の macOS ブート経路を扱う実験的 UEFI プロジェクトです。完成した OS ポートではなく、サポート対象のインストーラでもありません。",
    ctaStart: "始める",
    ctaRepo: "公開リポジトリ",
    whatTitle: "対象範囲",
    whatBody: "26x86 は NextCore を実験として開発しています。事前ビルドの x86_64 UEFI ピッカー、公式 OpenCore を取得する EFI フォルダ生成器、そのフォルダを USB ESP に書く Windows スクリプトを公開します。ソースコードと研究は非公開モノレポにあります。",
    notTitle: "対象外",
    notItems: [
      "検証済み macOS ブートではありません。macos_boot_verified は false です。",
      "Apple Recovery ではありません。exFAT にコピーした BaseSystem.dmg はファイルであり Recovery ボリュームではありません。",
      "ハードウェアサポート一覧ではありません。15IGL7 プロファイルは Gemini Lake（AVX2 なし、macOS 26 GPU ドライバなし）を記録します。",
      "OpenCore 本体ではありません。OpenCore はビルド時に acidanthera/OpenCorePkg から取得します。"
    ],
    startTitle: "始める",
    startLede: "Python 3.9+ が必要です。Windows の USB 書き込みには管理者の PowerShell 5.1+ が必要です。",
    startSteps: [
      "git clone https://github.com/26x86/NextCore.git",
      "python tools/make_efi.py --profile 15igl7 --out out/15igl7",
      "管理者 PowerShell: .\\tools\\make-usb.ps1 -List",
      ".\\tools\\make-usb.ps1 -Profile 15igl7 -DiskNumber <N> -Force"
    ],
    startNote: "使用前に EFI/OC/config.plist の SystemSerialNumber、MLB、SystemUUID、ROM を置き換えてください。macOS Recovery 項目は APFS Recovery ボリュームがあるまで無効です。",
    toolsTitle: "公開ツール",
    cards: [
      { h: "BOOTX64.EFI", p: "事前ビルドピッカー (apfs-jumpstart, console-control)。", more: "bin/NEXTCORE/BOOTX64.EFI" },
      { h: "make_efi.py", p: "OpenCore を取得し config.plist を生成し ocvalidate のあと EFI/ を組み立てます。", more: "tools/make_efi.py" },
      { h: "make-usb.ps1", p: "USB に FAT32 ESP を作り EFI/ をコピーしてハッシュを検証します。", more: "tools/make-usb.ps1" }
    ],
    statusTitle: "状態",
    statusLede: "以下は現在の公開記録です。ロードマップではありません。",
    meters: [
      { dt: "x86 UEFI ロード", v: "partial" },
      { dt: "OpenCore チェーンロード", v: "staged" },
      { dt: "macOS Recovery ボリューム", v: "exFAT 上にない" },
      { dt: "macos_boot_verified", v: "false" }
    ],
    fine: "1.0.0 はパッケージングリリースです。2.0.0 は UART で対象 XNU とユーザースペースが確認されるまで予約されます。",
    reposTitle: "リポジトリ",
    reposLede: "公開コンシューマリポジトリは NextCore です。他の Nextcore-* はモジュールエクスポートです。",
    mods: [
      ["NextCore", "ピッカーバイナリ、EFI 生成、USB 書き込み"],
      ["26x86", "非公開モノレポ（ソース、研究）"],
      ["Nextcore-EFI", "UEFI アプリケーション"],
      ["Nextcore-Core", "設定とコーデック"],
      ["Nextcore-HAL", "ACPI、PCI、SMBIOS、DeviceTree"],
      ["Nextcore-ISE", "ARM64e 命令ランタイム"],
      ["Nextcore-GPU", "GPU 方針"],
      ["Nextcore-APLS", "AArch64 復旧ランナー"],
      ["Nextcore-Tool", "CLI 編成"]
    ],
    identityTitle: "Identity",
    identity: "NextCore-Brand-Kit の公式マーク：シンボル、ワードマーク、ダークナビゲーション例。",
    footer: "© 2026 26x86. NextCore は実験プロジェクトです。macos_boot_verified = false。",
    heroAlt: "NextCore ロゴ",
    boardAlt: "NextCore ブランドボード"
  },
  zh: {
    locale: "zh-Hans",
    title: "NextCore",
    description: "面向 x86 上 macOS 启动路径的实验性 UEFI 项目。公开 EFI 选择器、EFI 目录生成器和 USB 写入工具。macos_boot_verified 为 false。",
    nav: { start: "开始", status: "状态", repos: "仓库", github: "GitHub" },
    theme: "配色",
    menu: "菜单",
    lang: "语言",
    kicker: "实验项目",
    h1: "NextCore",
    lede: "面向 x86 上 macOS 启动路径的实验性 UEFI 项目。不是完整的操作系统移植，也不是受支持的安装程序。",
    ctaStart: "开始",
    ctaRepo: "公开仓库",
    whatTitle: "范围",
    whatBody: "26x86 将 NextCore 作为实验开发：预构建的 x86_64 UEFI 选择器、下载官方 OpenCore 的 EFI 目录生成器，以及把该目录写入 USB ESP 的 Windows 脚本。源码与研究留在私有单体仓库。",
    notTitle: "不在范围内",
    notItems: [
      "不是已验证的 macOS 启动。macos_boot_verified 为 false。",
      "不是 Apple Recovery。复制到 exFAT 的 BaseSystem.dmg 是文件，不是 Recovery 卷。",
      "不是硬件支持列表。15IGL7 配置记录的是 Gemini Lake（无 AVX2，无 macOS 26 GPU 驱动）。",
      "不是 OpenCore 本身。OpenCore 在构建时从 acidanthera/OpenCorePkg 下载。"
    ],
    startTitle: "开始",
    startLede: "需要 Python 3.9+。在 Windows 上写入 USB 需要管理员 PowerShell 5.1+。",
    startSteps: [
      "git clone https://github.com/26x86/NextCore.git",
      "python tools/make_efi.py --profile 15igl7 --out out/15igl7",
      "管理员 PowerShell: .\\tools\\make-usb.ps1 -List",
      ".\\tools\\make-usb.ps1 -Profile 15igl7 -DiskNumber <N> -Force"
    ],
    startNote: "使用前请替换 EFI/OC/config.plist 中的 SystemSerialNumber、MLB、SystemUUID 和 ROM。在存在 APFS Recovery 卷之前，macOS Recovery 项保持禁用。",
    toolsTitle: "公开工具",
    cards: [
      { h: "BOOTX64.EFI", p: "预构建选择器（apfs-jumpstart、console-control）。", more: "bin/NEXTCORE/BOOTX64.EFI" },
      { h: "make_efi.py", p: "获取 OpenCore，生成 config.plist，运行 ocvalidate，组装 EFI/。", more: "tools/make_efi.py" },
      { h: "make-usb.ps1", p: "在 USB 上创建 FAT32 ESP，复制 EFI/ 并校验哈希。", more: "tools/make-usb.ps1" }
    ],
    statusTitle: "状态",
    statusLede: "以下为当前公开记录，不是路线图。",
    meters: [
      { dt: "x86 UEFI 加载", v: "partial" },
      { dt: "OpenCore 链式加载", v: "staged" },
      { dt: "macOS Recovery 卷", v: "exFAT 上不存在" },
      { dt: "macos_boot_verified", v: "false" }
    ],
    fine: "1.0.0 是打包发布。2.0.0 保留到 UART 证明匹配目标的 XNU 与用户空间。",
    reposTitle: "仓库",
    reposLede: "公开消费者仓库是 NextCore。其余 Nextcore-* 为模块导出。",
    mods: [
      ["NextCore", "选择器二进制、EFI 生成器、USB 写入"],
      ["26x86", "私有单体仓库（源码、研究）"],
      ["Nextcore-EFI", "UEFI 应用"],
      ["Nextcore-Core", "配置与编解码"],
      ["Nextcore-HAL", "ACPI、PCI、SMBIOS、DeviceTree"],
      ["Nextcore-ISE", "ARM64e 指令运行时"],
      ["Nextcore-GPU", "GPU 策略"],
      ["Nextcore-APLS", "AArch64 恢复运行器"],
      ["Nextcore-Tool", "CLI 编排"]
    ],
    identityTitle: "标识",
    identity: "NextCore-Brand-Kit 的官方标志：符号、字标、深色导航示例。",
    footer: "© 2026 26x86。NextCore 是实验项目。macos_boot_verified = false。",
    heroAlt: "NextCore 标志",
    boardAlt: "NextCore 品牌看板"
  }
};

const LANGS = [
  { id: "en", label: "English" },
  { id: "ko", label: "한국어" },
  { id: "ja", label: "日本語" },
  { id: "zh", label: "简体中文" }
];

function detectLang() {
  const fromUrl = new URLSearchParams(location.search).get("lang");
  if (fromUrl && I18N[fromUrl]) return fromUrl;
  const saved = localStorage.getItem("nc-lang");
  if (saved && I18N[saved]) return saved;
  const nav = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").toLowerCase();
  if (nav.startsWith("ko")) return "ko";
  if (nav.startsWith("ja")) return "ja";
  if (nav.startsWith("zh")) return "zh";
  return "en";
}

function applyLang(id) {
  const pack = I18N[id] || I18N.en;
  document.documentElement.lang = pack.locale;
  document.title = pack.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", pack.description);
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const parts = node.getAttribute("data-i18n").split(".");
    let value = pack;
    for (const key of parts) value = value?.[key];
    if (typeof value === "string") node.textContent = value;
  });
  pack.notItems.forEach((text, index) => {
    const node = document.querySelector(`[data-not="${index}"]`);
    if (node) node.textContent = text;
  });
  pack.startSteps.forEach((text, index) => {
    const node = document.querySelector(`[data-step="${index}"]`);
    if (node) node.textContent = text;
  });
  pack.cards.forEach((item, index) => {
    const root = document.querySelector(`[data-card="${index}"]`);
    if (!root) return;
    const name = root.querySelector(".name");
    const desc = root.querySelector(".desc");
    const more = root.querySelector(".more");
    if (name) name.textContent = item.h;
    if (desc) desc.textContent = item.p;
    if (more) more.textContent = item.more;
  });
  pack.meters.forEach((item, index) => {
    const root = document.querySelector(`[data-meter="${index}"]`);
    if (!root) return;
    const label = root.querySelector("th");
    const value = root.querySelector("td");
    if (label) label.textContent = item.dt;
    if (value) value.textContent = item.v;
  });
  pack.mods.forEach((item, index) => {
    const node = document.querySelector(`[data-mod="${index}"]`);
    if (node) node.textContent = item[1];
  });
  const hero = document.querySelector("[data-alt-hero]");
  const board = document.querySelector("[data-alt-board]");
  if (hero) hero.alt = pack.heroAlt;
  if (board) board.alt = pack.boardAlt;
  localStorage.setItem("nc-lang", id);
  const url = new URL(location.href);
  url.searchParams.set("lang", id);
  history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

window.NextCoreI18n = { I18N, LANGS, detectLang, applyLang };
