'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useTheme } from 'next-themes'

export function MapLibreMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const mapStyleUrl = theme === 'dark'
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'

    // If map exists, just update the style. Otherwise, initialize.
    if (map.current) {
      map.current.setStyle(mapStyleUrl)
      return
    }
    
    if (!mapContainer.current) return

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapStyleUrl,
        // Center the map on the Pacific Ocean (longitude 180)
        center: [180, 35],
        zoom: 2.0,
        dragRotate: false,
        touchZoomRotate: false,
        attributionControl: false, // Hide default attribution
        dragPan: false,
        scrollZoom: false,
        boxZoom: false,
        doubleClickZoom: false,
        keyboard: false,
      });

      map.current.on('load', () => {
        if (!map.current) return;

        // Add a clean attribution control
        map.current.addControl(new maplibregl.AttributionControl({
            compact: true,
            customAttribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>'
        }));

        // --- Locations Data ---
        const locations = [
          { lngLat: [120.0843, 30.3114], popupHTML: '<div style="font-family: system-ui; padding: 4px 0;"><strong style="font-size: 14px; color: #111;">Hangzhou</strong><br><span style="font-size: 12px; color: #666;">Zhejiang University</span></div>' },
          { lngLat: [102.7100, 25.0500], popupHTML: '<div style="font-family: system-ui; padding: 4px 0;"><strong style="font-size: 14px; color: #111;">Yunnan</strong><br><span style="font-size: 12px; color: #666;">Hometown</span></div>' },
          { lngLat: [-119.4179, 36.7783], popupHTML: '<div style="font-family: system-ui; padding: 4px 0;"><strong style="font-size: 14px; color: #111;">California</strong><br><span style="font-size: 12px; color: #666;">UC San Diego</span></div>' }
        ];

        locations.forEach(loc => {
          const popup = new maplibregl.Popup({
            offset: 25,
            closeButton: false,
            className: 'minimal-popup'
          }).setHTML(loc.popupHTML);

          new maplibregl.Marker({
            color: '#374151',
            scale: 0.7,
            draggable: false
          })
            .setLngLat(loc.lngLat as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });

      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    };
  }, [theme]); // Rerun effect if theme changes

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg overflow-hidden bg-gray-50 border border-gray-200"
      aria-label="Interactive map showing journey from Yunnan to Hangzhou to California"
      key={theme}
    />
  );
}
