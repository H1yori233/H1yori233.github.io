'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export function MapLibreMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Return if map is already initialized
    if (!mapContainer.current) return; // Ensure container element exists

    // Initialize map
    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {
            'osm': {
              type: 'raster',
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap Contributors'
            }
          },
          layers: [
            {
              id: 'osm-tiles',
              type: 'raster',
              source: 'osm',
              minzoom: 0,
              maxzoom: 10
            }
          ]
        },
        center: [180, 30], // World view centered to show both Asia and North America
        zoom: 1.8,
        dragRotate: false, // Disable rotation for simpler interaction
        touchZoomRotate: false // Disable pinch rotation
      });

      // Add markers
      map.current.on('load', () => {
        setMapLoaded(true);
        
        if (!map.current) return;
        
        // Create custom marker elements with labels
        const createMarkerElement = (color: string, label: string) => {
          const el = document.createElement('div');
          el.className = 'marker-container';
          el.style.display = 'flex';
          el.style.flexDirection = 'column';
          el.style.alignItems = 'center';
          
          const pin = document.createElement('div');
          pin.className = 'marker-pin';
          pin.style.width = '24px';
          pin.style.height = '24px';
          pin.style.borderRadius = '50%';
          pin.style.backgroundColor = color;
          pin.style.border = '2px solid white';
          pin.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
          
          const text = document.createElement('div');
          text.className = 'marker-text';
          text.textContent = label;
          text.style.marginTop = '6px';
          text.style.color = '#000';
          text.style.padding = '2px 6px';
          text.style.borderRadius = '4px';
          text.style.fontSize = '12px';
          text.style.fontWeight = 'bold';
          text.style.whiteSpace = 'nowrap';
          
          el.appendChild(pin);
          el.appendChild(text);
          
          return el;
        };
        
        // Add Zhejiang Province marker with label
        const zhejiangMarker = new maplibregl.Marker({
          element: createMarkerElement('#4285F4', 'Zhejiang')
        })
          .setLngLat([120.0843, 30.3114])
          .addTo(map.current);
          
        // Add popup for Zhejiang
        const zhejiangPopup = new maplibregl.Popup({ offset: 25 })
          .setHTML('<h3 style="margin:0;font-weight:bold">Zhejiang Province</h3><p style="margin:5px 0 0">My current location - Hangzhou</p>');
          
        zhejiangMarker.setPopup(zhejiangPopup);
        
        // Add Yunnan Province marker with label
        const yunnanMarker = new maplibregl.Marker({
          element: createMarkerElement('#EA4335', 'Yunnan')
        })
          .setLngLat([102.7100, 25.0500])
          .addTo(map.current);
          
        // Add popup for Yunnan
        const yunnanPopup = new maplibregl.Popup({ offset: 25 })
          .setHTML('<h3 style="margin:0;font-weight:bold">Yunnan Province</h3><p style="margin:5px 0 0">Beautiful landscapes and diverse cultures</p>');
          
        yunnanMarker.setPopup(yunnanPopup);
        
        // Add California marker with label
        const californiaMarker = new maplibregl.Marker({
          element: createMarkerElement('#FBBC04', 'California')
        })
          .setLngLat([-119.4179, 36.7783])
          .addTo(map.current);
          
        // Add popup for California
        const californiaPopup = new maplibregl.Popup({ offset: 25 })
          .setHTML('<h3 style="margin:0;font-weight:bold">California, USA</h3><p style="margin:5px 0 0">UC San Diego - My future study location</p>');
          
        californiaMarker.setPopup(californiaPopup);

        // Disable map zoom when scrolling
        map.current.scrollZoom.disable();
      });
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-lg overflow-hidden shadow-xl bg-gray-100"
        aria-label="Interactive map"
      />
      {!mapLoaded && (
        <p className="text-center text-muted-foreground">Map is loading... If it doesn't appear, please check your internet connection.</p>
      )}
    </div>
  );
} 