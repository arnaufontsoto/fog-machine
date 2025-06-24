import { ControlMode, MapController } from "./utils/MapController";
import { useEffect, useState } from "react";
import Mousetrap from "mousetrap";
import MainMenu from "./MainMenu";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/outline";

type Props = {
  setLoaded(isLoaded: boolean): void;
  mapController: MapController;
  msgboxShow(title: string, msg: string): void;
};

function Editor(props: Props): JSX.Element {
  const mapController = props.mapController;
  const [controlMode, setControlMode] = useState(ControlMode.View);
  const { t } = useTranslation();

  useEffect(() => {
    mapController.setControlMode(controlMode);
  }, [controlMode]);

  const [historyStatus, setHistoryStatus] = useState({
    canRedo: false,
    canUndo: false,
  });

  useEffect(() => {
    mapController.registerOnChangeCallback("editor", () => {
      setHistoryStatus({
        canRedo: mapController.historyManager.canRedo(),
        canUndo: mapController.historyManager.canUndo(),
      });
    });
    props.setLoaded(true);

    return function cleanup() {
      mapController.unregisterOnChangeCallback("editor");
    };
  }, []);

  Mousetrap.bind(["mod+z"], (_) => {
    mapController.undo();
  });
  Mousetrap.bind(["mod+shift+z"], (_) => {
    mapController.redo();
  });

  // Nuevos atajos de teclado
  Mousetrap.bind(["e"], (_) => {
    setControlMode(
      controlMode === ControlMode.Eraser ? ControlMode.View : ControlMode.Eraser
    );
  });
  Mousetrap.bind(["l"], (_) => {
    setControlMode(
      controlMode === ControlMode.DrawLine
        ? ControlMode.View
        : ControlMode.DrawLine
    );
  });
  Mousetrap.bind(["b"], (_) => {
    setControlMode(
      controlMode === ControlMode.DrawBrush
        ? ControlMode.View
        : ControlMode.DrawBrush
    );
  });
  Mousetrap.bind(["s"], (_) => {
    setControlMode(
      controlMode === ControlMode.Select ? ControlMode.View : ControlMode.Select
    );
  });
  Mousetrap.bind(["escape"], (_) => {
    setControlMode(ControlMode.View);
  });

  const toolButtons = [
    {
      key: "undo",
      icon: iconUndo,
      clickable: historyStatus.canUndo,
      enabled: false,
      onClick: () => {
        mapController.undo();
      },
    },
    {
      key: "redo",
      icon: iconRedo,
      clickable: historyStatus.canRedo,
      enabled: false,
      onClick: () => {
        mapController.redo();
      },
    },
    null,
    {
      key: "eraser",
      icon: iconEraserSolid,
      clickable: true,
      enabled: controlMode === ControlMode.Eraser,
      onClick: () => {
        if (controlMode === ControlMode.Eraser) {
          setControlMode(ControlMode.View);
        } else {
          setControlMode(ControlMode.Eraser);
        }
      },
    },
    {
      key: "line",
      icon: iconLine,
      clickable: true,
      enabled: controlMode === ControlMode.DrawLine,
      onClick: () => {
        if (controlMode === ControlMode.DrawLine) {
          setControlMode(ControlMode.View);
        } else {
          setControlMode(ControlMode.DrawLine);
        }
      },
    },
    {
      key: "brush",
      icon: iconBrush,
      clickable: true,
      enabled: controlMode === ControlMode.DrawBrush,
      onClick: () => {
        if (controlMode === ControlMode.DrawBrush) {
          setControlMode(ControlMode.View);
        } else {
          setControlMode(ControlMode.DrawBrush);
        }
      },
    },
    {
      key: "select",
      icon: iconSelect,
      clickable: true,
      enabled: controlMode === ControlMode.Select,
      onClick: () => {
        if (controlMode === ControlMode.Select) {
          setControlMode(ControlMode.View);
        } else {
          setControlMode(ControlMode.Select);
        }
      },
    },
  ];

  // Añadir estado para el selector de estilos
  const [showStyleSelector, setShowStyleSelector] = useState(false);

  const mapStyles = [
    { key: "light", name: "Light", preview: "☀️" },
    { key: "dark", name: "Dark", preview: "🌙" },
    { key: "satellite", name: "Satellite", preview: "🛰️" },
    { key: "hybrid", name: "Satellite Streets", preview: "🗺️" },
    { key: "outdoors", name: "Outdoors", preview: "🏔️" },
    { key: "standard", name: "Streets", preview: "🌍" },
    { key: "none", name: "No Map", preview: "⚫" },
  ];

  // Añadir después del estado showStyleSelector
  const [usageCount, setUsageCount] = useState(() => {
    const saved = localStorage.getItem("mapbox-usage-count");
    return saved ? parseInt(saved) : 0;
  });

  // Añadir useEffect para trackear el uso
  useEffect(() => {
    // Incrementar contador al inicializar
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("mapbox-usage-count", newCount.toString());

    // Reset contador cada mes
    const lastReset = localStorage.getItem("usage-reset-date");
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${now.getMonth()}`;

    if (lastReset !== thisMonth) {
      setUsageCount(1);
      localStorage.setItem("mapbox-usage-count", "1");
      localStorage.setItem("usage-reset-date", thisMonth);
    }
  }, []);

  // Función para trackear cambios de estilo
  const handleStyleChange = (styleKey: string) => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("mapbox-usage-count", newCount.toString());
    mapController.setMapStyle(
      styleKey as
        | "standard"
        | "satellite"
        | "hybrid"
        | "none"
        | "light"
        | "dark"
        | "outdoors"
    );
    setShowStyleSelector(false);
  };

  return (
    <>
      <MainMenu
        mapController={mapController}
        msgboxShow={props.msgboxShow}
        mode="editor"
      />

      <div className="absolute bottom-0 pb-4 z-10 pointer-events-none flex justify-center w-full">
        <div className="flex flex-wrap justify-center max-w-md bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
          {toolButtons.map((toolButton) =>
            toolButton !== null ? (
              <button
                key={toolButton.key}
                title={t(`tool-${toolButton.key}`) as string}
                className={
                  "flex items-center justify-center mx-1 my-1 w-12 h-12 p-2 bg-white shadow-md rounded-lg hover:bg-gray-200 active:bg-gray-400 transition-all duration-200" +
                  (toolButton.enabled
                    ? " ring-2 ring-blue-500 bg-blue-50"
                    : "") +
                  (toolButton.clickable
                    ? " pointer-events-auto transform hover:scale-105"
                    : " text-gray-300 opacity-40")
                }
                onClick={() => {
                  if (toolButton.clickable) {
                    toolButton.onClick();
                  }
                }}
              >
                {toolButton.icon}
              </button>
            ) : (
              <div
                key="|"
                className="flex items-center justify-center rounded mx-2 w-1 h-12 bg-gray-300 shadow-sm"
              />
            )
          )}
        </div>

        {controlMode !== ControlMode.View && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {t(`tool-${Object.keys(ControlMode)[controlMode].toLowerCase()}`)}{" "}
            {t("active")}
          </div>
        )}
      </div>

      {/* Alerta de límit d'ús */}
      {usageCount > 40000 && (
        <div className="absolute top-16 left-4 right-4 z-30">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <span className="text-lg mr-2">⚠️</span>
              <div>
                <div className="font-medium">{t("usage-warning")}</div>
                <div className="text-sm">
                  {usageCount.toLocaleString()}/50,000 {t("map-loads")} -{" "}
                  {t("consider-reducing-usage")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selector rápido de estilos de mapa */}
      <div className="absolute top-4 right-20 z-20">
        <div className="relative">
          <button
            onClick={() => setShowStyleSelector(!showStyleSelector)}
            className="bg-white/90 backdrop-blur-sm hover:bg-white/95 text-gray-700 p-3 rounded-lg shadow-lg border border-gray-200/50 transition-all duration-200 hover:shadow-xl group"
            title={t("map-style") as string}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">🗺️</span>
              <span className="text-sm font-medium hidden md:block">
                {mapStyles.find((s) => s.key === mapController.getMapStyle())
                  ?.name || "Map"}
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform duration-200 ${
                  showStyleSelector ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {showStyleSelector && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 overflow-hidden z-30">
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 py-1 mb-2">
                  {t("map-style")}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {mapStyles.map((style) => (
                    <button
                      key={style.key}
                      onClick={() => handleStyleChange(style.key)}
                      className={`p-3 rounded-lg text-left transition-all duration-200 hover:bg-blue-50 border ${
                        mapController.getMapStyle() === style.key
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{style.preview}</span>
                        <div>
                          <div className="text-xs font-medium">
                            {style.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Editor;

const iconEraserSolid = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="eraser"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"
    ></path>
  </svg>
);

const iconRedo = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="redo"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"
    ></path>
  </svg>
);

const iconUndo = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="undo"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"
    ></path>
  </svg>
);

// const iconPaint = <p>P</p>;
const iconLine = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="redo"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
    />
  </svg>
);

const iconBrush = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
    />
  </svg>
);

const iconSelect = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className="w-full h-full"
  >
    <path
      fill="currentColor"
      d="M0 358.2V480c0 17.7 14.3 32 32 32h121.8c8.5 0 16.6-3.4 22.6-9.4L346.9 332.1c12.5-12.5 12.5-32.8 0-45.3l-121.8-121.8c-12.5-12.5-32.8-12.5-45.3 0L9.4 335.5C3.4 341.6 0 349.7 0 358.2z"
    />
  </svg>
);
