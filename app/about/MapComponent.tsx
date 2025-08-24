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
        zoom: 1.0,
        dragRotate: false,
        touchZoomRotate: false,
        attributionControl: false, // Hide default attribution
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
          { lngLat: [120.0843, 30.3114], popupHTML: '<h3>Zhejiang Province</h3><p>My current location - Hangzhou</p>' },
          { lngLat: [102.7100, 25.0500], popupHTML: '<h3>Yunnan Province</h3><p>Beautiful landscapes and diverse cultures</p>' },
          { lngLat: [-119.4179, 36.7783], popupHTML: '<h3>California, USA</h3><p>UC San Diego - My future study location</p>' }
        ];

        locations.forEach(loc => {
          const popup = new maplibregl.Popup({ 
            offset: 35, 
            closeButton: false,
            className: 'custom-popup'
          }).setHTML(loc.popupHTML);

          new maplibregl.Marker({
            color: 'hsl(var(--primary))',
            scale: 0.8,
            draggable: false
          })
            .setLngLat(loc.lngLat as [number, number])
            .setPopup(popup)
            .addTo(map.current!);
        });

        map.current.scrollZoom.disable();
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
      className="w-full h-[400px] rounded-lg overflow-hidden bg-muted"
      aria-label="Interactive map"
      // Add a key to force re-render on theme change to avoid style conflicts
      key={theme} 
    />
  );
}
