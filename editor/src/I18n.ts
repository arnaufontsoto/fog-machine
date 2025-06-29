import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          "main-title": "FogMachine",
          import: "Import",
          "import-description": "Import data from [Fog of World]",
          export: "Export",
          "export-gpx": "Export Gpx",
          "export-description": "Export data in [Fog of World] format",
          "export-description-gpx":
            "Export data in [GPX] format. [Experimental]",
          language: "Language",
          error: "Error",
          "error-already-imported":
            "You already imported data from [Fog of World]. Refresh the page if you want to start over.",
          "error-invalid-format": "Invalid format.",
          "error-failed-to-load-snapshot": "Failed to load snapshot.",
          "import-dialog-description":
            'All your data will be handled locally.\n\nAccept data format:\n- The "Sync" folder.\n- Files in the "Sync" folder.\n- A zip archive contains the "Sync" folder.\n\n',
          "import-dialog-drag-and-drop":
            "drag and drop [Fog of World] sync data",
          "import-dialog-select": "Select manually",
          info: "Info",
          "export-done-message":
            'Exported successfully.\n\nPlease use the "Sync" folder in the exported zip archive to replace the original folder. You also need to reset the [Fog of World] app to remove the existing data.',
          "export-done-message-gpx": "Exported successfully.",
          "map-type": "Map type",
          "map-type-standard": "Standard",
          "map-type-satellite": "Satellite",
          "map-type-hybrid": "Hybrid",
          "map-type-none": "None",
          "map-projection": "Projection",
          // TODO: Why beta? This is a known bug[1] causing we render things accross meridian wrongly
          // in globe projection. We could workaround it by not rendering things across meridian
          // (e.g. having two canvas sources, one for each side).
          // But for now, I'm too lazy to do it, I'd rather wait for upstream's
          // fix or do it later and in a different PR.
          // [1] https://github.com/mapbox/mapbox-gl-js/issues/12758
          "map-projection-globe": "Globe[BETA]",
          "map-projection-mercator": "Mercator",
          "fog-concentration": "Fog concentration",
          "fog-concentration-low": "Low",
          "fog-concentration-medium": "Medium",
          "fog-concentration-high": "High",
          "tool-brush": "Brush tool",
          "tool-select": "Selection tool",
          "tool-eraser": "Eraser tool",
          "tool-line": "Line tool",
          "advanced-settings": "Advanced Settings",
          "show-statistics": "Show Statistics",
          "auto-save": "Auto Save",
          statistics: "Statistics",
          "total-tiles": "Total Tiles",
          "coverage-area": "Coverage Area",
          "last-edit": "Last Edit",
          active: "Active",
          "tool-undo": "Undo (Ctrl+Z)",
          "tool-redo": "Redo (Ctrl+Shift+Z)",
          "map-style-standard": "Standard (3D)",
          "map-style-satellite": "Satellite",
          "map-style-hybrid": "Satellite Streets",
          "map-style-light": "Light",
          "map-style-dark": "Dark",
          "map-style-outdoors": "Outdoors",
          "map-style-navigation-day": "Navigation Day",
          "map-style-navigation-night": "Navigation Night",
          "map-style-standard-satellite": "Standard Satellite (3D)",
          "map-style-none": "None",
          "map-style": "Map Style",
          "total-blocks": "Total Blocks",
          "visited-pixels": "Visited Pixels",
          "map-bounds": "Map Bounds",
          "regions-visited": "Regions Visited",
          "mapbox-usage": "Mapbox Usage Monitor",
          "monthly-limit": "Monthly Limit",
          "map-loads": "map loads",
          "current-usage": "Your Current Usage",
          "well-within-free-limits": "Well within FREE limits!",
          "cost-saving-tips": "Cost Saving Tips",
          "tip-reload-sparingly": "Don't reload the app unnecessarily",
          "tip-choose-style-once":
            "Choose your preferred map style and stick with it",
          "tip-free-tier-generous":
            "Mapbox free tier is very generous for personal use",
          "usage-warning": "Approaching Mapbox Usage Limit",
          "consider-reducing-usage": "Consider reducing map reloads",
          "processing-files": "Processing files",
          "reading-files": "Reading files",
          "creating-map": "Creating map",
          "reading-zip": "Reading ZIP file",
          "extracting-zip": "Extracting ZIP file",
          "import-complete": "Import complete",
          "please-wait": "Please wait, do not close the browser",
          "error-import-failed": "Import failed. Please check the file format.",
        },
      },
      zh: {
        translation: {
          "main-title": "迷雾机器",
          import: "导入",
          "import-description": "从 [世界迷雾] 中导入数据。",
          export: "导出",
          "export-gpx": "导出 GPX",
          "export-description": "以 [世界迷雾] 的格式导出数据。",
          "export-description-gpx": "以 [GPX] 的格式导出数据。[实验性功能]",
          language: "语言",
          error: "错误",
          "error-already-imported":
            "无法多次导入 [世界迷雾] 数据。可通过刷新页面重置。",
          "error-invalid-format": "无效文件格式。",
          "error-failed-to-load-snapshot": "载入快照失败。",
          "import-dialog-description":
            '你的数据将完全在本地处理。\n\n接受的数据格式:\n- "Sync" 文件夹\n-  "Sync" 文件夹中的全部文件\n- 包含 "Sync" 文件夹的 zip 压缩包\n\n',
          "import-dialog-drag-and-drop": "拖入 [世界迷雾] 同步数据",
          "import-dialog-select": "手动选择",
          info: "提示",
          "export-done-message":
            '导出成功。\n\n请使用导出的 zip 压缩包中的 "Sync" 文件夹替换原有文件夹，并重置 [世界迷雾] app 以清除已有数据。',
          "export-done-message-gpx": "导出成功。",
          "map-type": "地图模式",
          "map-type-standard": "标准",
          "map-type-satellite": "卫星",
          "map-type-hybrid": "混合",
          "map-type-none": "无",
          "map-projection": "投影模式",
          "map-projection-globe": "球面[BETA]",
          "map-projection-mercator": "平面",
          "fog-concentration": "迷雾浓度",
          "fog-concentration-low": "低",
          "fog-concentration-medium": "中",
          "fog-concentration-high": "高",
          "processing-files": "处理文件中",
          "reading-files": "读取文件中",
          "creating-map": "创建地图中",
          "reading-zip": "读取ZIP文件中",
          "extracting-zip": "解压ZIP文件中",
          "import-complete": "导入完成",
          "please-wait": "请稍候，请勿关闭浏览器",
          "error-import-failed": "导入失败，请检查文件格式。",
        },
      },
    },
  });
export default i18n;
