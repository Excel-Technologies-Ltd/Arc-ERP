import "@/assets/css/vendors/leaflet.css";
import { createRef, useEffect } from "react";
import { initializeMap, MapConfig, LeafletElement } from "./leaflet-map-loader";
import clsx from "clsx";

export type Init = (
  callback: (
    mapConfig: MapConfig
  ) => ReturnType<typeof initializeMap> | undefined
) => void;

interface LeafletMapLoaderProps extends React.ComponentPropsWithoutRef<"div"> {
  init: Init;
  darkMode?: boolean;
}

function LeafletMapLoader({
  init = () => {},
  darkMode,
  className,
}: LeafletMapLoaderProps) {
  const mapRef = createRef<LeafletElement>();

  useEffect(() => {
    init((mapConfig) => {
      if (mapRef.current) {
        return initializeMap(mapRef.current, mapConfig);
      }
    });
  }, [init]);

  return (
    <div
      ref={mapRef}
      className={clsx([
        "border rounded-lg overflow-hidden dark:border-darkmode-700",
        !darkMode &&
          "[&_.leaflet-tile-pane]:contrast-105 [&_.leaflet-tile-pane]:grayscale",
        darkMode &&
          "[&_.leaflet-tile-pane]:contrast-[.8] [&_.leaflet-tile-pane]:grayscale [&_.leaflet-tile-pane]:invert",
        className,
      ])}
    ></div>
  );
}

export default LeafletMapLoader;
