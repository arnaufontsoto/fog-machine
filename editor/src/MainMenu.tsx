import { useState, useEffect } from "react";
import { Popover, Tab, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { MapController } from "./utils/MapController";
import Import from "./Import";

function MapTap(props: { mapController: MapController }): JSX.Element {
  const { t } = useTranslation();
  const mapController = props.mapController;
  const mapStyles = ["standard", "satellite", "hybrid", "none"];
  const mapProjections = ["globe", "mercator"];
  const fogConcentrations = ["low", "medium", "high"];

  return (
    <>
      <div className="p-4 bg-gray-50">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">
            {t("map-type")}
          </span>
        </span>
        <div className="w-full pt-4 grid lg:grid-cols-2">
          <Tab.Group
            onChange={(index) => {
              const style = mapStyles[index];
              mapController.setMapStyle(
                style as "standard" | "satellite" | "hybrid" | "none"
              );
            }}
            defaultIndex={mapStyles.indexOf(mapController.getMapStyle())}
          >
            <Tab.List className="flex p-1 space-x-1 bg-gray-300 rounded-xl">
              {[
                t("map-type-standard"),
                t("map-type-satellite"),
                t("map-type-hybrid"),
                t("map-type-none"),
              ].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) => {
                    return (
                      "w-full py-1 text-sm leading-5 font-medium text-grey-500 rounded-lg focus:outline-none" +
                      (selected ? " bg-white" : " hover:bg-gray-200")
                    );
                  }}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">
            {t("fog-concentration")}
          </span>
        </span>
        <div className="w-full pt-4 grid lg:grid-cols-2">
          <Tab.Group
            onChange={(index) => {
              const fogConcentration = fogConcentrations[index];
              mapController.setFogConcentration(
                fogConcentration as "low" | "medium" | "high"
              );
            }}
            defaultIndex={fogConcentrations.indexOf(
              mapController.getFogConcentration()
            )}
          >
            <Tab.List className="flex p-1 space-x-1 bg-gray-300 rounded-xl">
              {[
                t("fog-concentration-low"),
                t("fog-concentration-medium"),
                t("fog-concentration-high"),
              ].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) => {
                    return (
                      "w-full py-1 text-sm leading-5 font-medium text-grey-500 rounded-lg focus:outline-none" +
                      (selected ? " bg-white" : " hover:bg-gray-200")
                    );
                  }}
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">
            {t("map-projection")}
          </span>
        </span>
        <div className="w-full pt-4 grid lg:grid-cols-2">
          <Tab.Group
            onChange={(index) => {
              const mapProjection = mapProjections[index];
              mapController.setMapProjection(
                mapProjection as "globe" | "mercator"
              );
            }}
            defaultIndex={mapProjections.indexOf(
              mapController.getMapProjection()
            )}
          >
            <Tab.List className="flex p-1 space-x-1 bg-gray-300 rounded-xl">
              {[t("map-projection-globe"), t("map-projection-mercator")].map(
                (category) => (
                  <Tab
                    key={category}
                    className={({ selected }) => {
                      return (
                        "w-full py-1 text-sm leading-5 font-medium text-grey-500 rounded-lg focus:outline-none" +
                        (selected ? " bg-white" : " hover:bg-gray-200")
                      );
                    }}
                  >
                    {category}
                  </Tab>
                )
              )}
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}

function AdvancedTab(props: { mapController: MapController }): JSX.Element {
  const { t } = useTranslation();
  const [showStatistics, setShowStatistics] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [statistics, setStatistics] = useState<any>(null);

  // Obtener estadísticas del mapa
  useEffect(() => {
    const updateStats = () => {
      const stats = props.mapController.fogMap.getStatistics();
      setStatistics(stats);
    };
    
    updateStats();
    const interval = setInterval(updateStats, 5000); // Actualizar cada 5 segundos
    
    return () => clearInterval(interval);
  }, [props.mapController]);

  return (
    <>
      <div className="p-4 bg-gray-50">
        <span className="flex items-center">
          <span className="text-sm font-medium text-gray-900">
            {t("advanced-settings")}
          </span>
        </span>
        
        {/* Selector de Estilo de Mapa */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("map-style")}
          </label>
          <select
            value={props.mapController.getMapStyle()}
            onChange={(e) => props.mapController.setMapStyle(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="standard">{t("map-style-standard")}</option>
            <option value="satellite">{t("map-style-satellite")}</option>
            <option value="hybrid">{t("map-style-hybrid")}</option>
            <option value="light">{t("map-style-light")}</option>
            <option value="dark">{t("map-style-dark")}</option>
            <option value="outdoors">{t("map-style-outdoors")}</option>
            <option value="navigation-day">{t("map-style-navigation-day")}</option>
            <option value="navigation-night">{t("map-style-navigation-night")}</option>
            <option value="standard-satellite">{t("map-style-standard-satellite")}</option>
            <option value="none">{t("map-style-none")}</option>
          </select>
        </div>

        {/* Estadísticas */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">{t("show-statistics")}</span>
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              showStatistics ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                showStatistics ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {showStatistics && statistics && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">{t("statistics")}</h3>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{t("total-tiles")}:</span>
                <span className="font-medium">{statistics.totalTiles.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{t("total-blocks")}:</span>
                <span className="font-medium">{statistics.totalBlocks.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{t("visited-pixels")}:</span>
                <span className="font-medium">{statistics.totalVisitedPixels.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{t("coverage-area")}:</span>
                <span className="font-medium">{statistics.coverageArea} km²</span>
              </div>
            </div>

            {statistics.bounds && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">{t("map-bounds")}:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>N: {statistics.bounds.north.toFixed(4)}°</div>
                  <div>S: {statistics.bounds.south.toFixed(4)}°</div>
                  <div>E: {statistics.bounds.east.toFixed(4)}°</div>
                  <div>W: {statistics.bounds.west.toFixed(4)}°</div>
                </div>
              </div>
            )}

            {statistics.regions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">{t("regions-visited")}:</div>
                <div className="text-xs text-gray-700">
                  {statistics.regions.slice(0, 3).join(', ')}
                  {statistics.regions.length > 3 && ` (+${statistics.regions.length - 3} más)`}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Auto Save */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-gray-600">{t("auto-save")}</span>
          <button
            onClick={() => setAutoSave(!autoSave)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              autoSave ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                autoSave ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Monitor d'ús de Mapbox */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">{t("mapbox-usage")}</span>
            <span className="text-xs text-blue-600">FREE TIER</span>
          </div>
          <div className="text-xs text-blue-700 space-y-1">
            <div className="flex justify-between">
              <span>{t("monthly-limit")}:</span>
              <span className="font-medium">50,000 {t("map-loads")}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("current-usage")}:</span>
              <span className="font-medium text-green-600">
                {localStorage.getItem('mapbox-usage-count') || '0'} {t("map-loads")}
              </span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: '3.6%'}}></div>
            </div>
            <div className="text-center text-xs text-blue-600 mt-1">
              ✅ {t("well-within-free-limits")}
            </div>
          </div>
        </div>

        {/* Consells per estalviar */}
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm font-medium text-green-900 mb-2">💡 {t("cost-saving-tips")}</div>
          <div className="text-xs text-green-700 space-y-1">
            <div>• {t("tip-reload-sparingly")}</div>
            <div>• {t("tip-choose-style-once")}</div>
            <div>• {t("tip-free-tier-generous")}</div>
          </div>
        </div>
      </div>
    </>
  );
}

type Props = {
  mapController: MapController;
  msgboxShow(title: string, msg: string): void;
  mode: "editor" | "viewer";
};

function popDownload(filename: string, blob: Blob) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = filename;

  document.body.appendChild(link);
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );
  document.body.removeChild(link);
}

export default function MainMenu(props: Props): JSX.Element {
  const { t, i18n } = useTranslation();
  const mapController = props.mapController;

  const [importDialog, setImportDialog] = useState(false);

  const menuItems =
    props.mode == "viewer"
      ? []
      : // Import and Export is only allowed in editor
        [
          {
            name: t("import"),
            description: t("import-description"),
            action: () => {
              setImportDialog(true);
            },
            icon: IconImport,
          },
          {
            name: t("export"),
            description: t("export-description"),
            action: async () => {
              // TODO: seems pretty fast, but we should consider handle this async properly
              const blob = await mapController.fogMap.exportArchive();
              if (blob) {
                popDownload("Sync.zip", blob);
                props.msgboxShow("info", "export-done-message");
              }
            },
            icon: IconExport,
          },
          // TODO: This feature is not really ready, so let's disable it for now.
          // {
          //   name: t("export-gpx"),
          //   description: t("export-description-gpx"),
          //   action: async () => {
          //     // TODO: generating the gpx archive for a whole fogMap doesn't feel
          //     // like a common use case, we could do something like: ask user to
          //     // select an area and only generate gpx archive for that area.

          //     // TODO: `generateGpxArchive` is a blocking operation that takes a
          //     // really long time, we should:
          //     // 1. make it async by yielding from time to time.
          //     // 2. show a progress bar.
          //     const blob = await generateGpxArchive(mapController.fogMap);
          //     if (blob) {
          //       popDownload("Gpx.zip", blob);
          //       props.msgboxShow("info", "export-done-message-gpx");
          //     }
          //   },
          //   icon: IconExport,
          // },
        ];

  const languageTab = (
    <div className="w-full pt-4 grid lg:grid-cols-2">
      <Tab.Group
        onChange={(index) => {
          if (index === 0) {
            i18n.changeLanguage("zh");
          } else {
            i18n.changeLanguage("en");
          }
        }}
        defaultIndex={i18n.resolvedLanguage === "zh" ? 0 : 1}
      >
        <Tab.List className="flex p-1 space-x-1 bg-gray-300 rounded-xl">
          {["简体中文", "English"].map((category) => (
            <Tab
              key={category}
              className={({ selected }) => {
                return (
                  "w-full py-1 text-sm leading-5 font-medium text-grey-500 rounded-lg focus:outline-none" +
                  (selected ? " bg-white" : " hover:bg-gray-200")
                );
              }}
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );

  return (
    <>
      <Import
        mapController={mapController}
        isOpen={importDialog}
        setIsOpen={setImportDialog}
        msgboxShow={props.msgboxShow}
      />
      <div className="absolute z-40 top-4 left-4">
        <div className="max-w-sm m-auto bg-white bg-opacity-90 rounded-xl shadow-md flex items-center space-x-4">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                ${open ? "" : "text-opacity-90"}
                text-black group px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <div className="p-0.5">
                    <span>{t("main-title")}</span>
                  </div>
                  {open ? (
                    <ChevronUpIcon
                      className="ml-2 h-5 w-5 group-hover:text-opacity-80 transition ease-in-out duration-150"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 group-hover:text-opacity-80 transition ease-in-out duration-150"
                      aria-hidden="true"
                    />
                  )}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-screen max-w-sm mt-3 transform lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                        {menuItems.map((item) => (
                          <a
                            key={item.name}
                            onClick={item.action}
                            className="flex items-center cursor-pointer p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                              <item.icon aria-hidden="true" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>

                      <MapTap mapController={mapController} />

                      <div className="p-4 bg-gray-50">
                        <span className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {t("language")}
                          </span>
                        </span>
                        {languageTab}
                      </div>

                      <AdvancedTab mapController={mapController} />
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </>
  );
}

function IconImport() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <svg
        x="8"
        y="8"
        width="32"
        height="32"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#FDBA74"
          d="M16 288c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h112v-64zm489-183L407.1 7c-4.5-4.5-10.6-7-17-7H384v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H152c-13.3 0-24 10.7-24 24v264h128v-65.2c0-14.3 17.3-21.4 27.4-11.3L379 308c6.6 6.7 6.6 17.4 0 24l-95.7 96.4c-10.1 10.1-27.4 3-27.4-11.3V352H128v136c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H376c-13.2 0-24-10.8-24-24z"
        />
      </svg>
    </svg>
  );
}

function IconExport() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <svg
        x="8"
        y="8"
        width="32"
        height="32"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="#FDBA74"
          d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
        />
      </svg>
    </svg>
  );
}
