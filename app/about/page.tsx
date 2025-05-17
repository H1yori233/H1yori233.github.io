'use client'

import { Layout } from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/magicui/terminal'
import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

function MapLibreMap() {
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

export default function AboutPage() {
  return (
    <Layout title="About Me">
      <div className="max-w-6xl mx-auto space-y-16 py-8">
        {/* Introduction */}
        <section className="prose dark:prose-invert lg:prose-lg mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex flex-col items-center gap-3">
              <div className="flex-shrink-0 w-64 h-64 relative rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src="/images/avatar.png"
                  alt="Kaiqin Kong"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 192px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex justify-center gap-5 mt-2">
                <Link href="https://github.com" target="_blank" className="transition-transform hover:scale-110">
                  <FaGithub className="h-6 w-6" style={{ color: '#333333' }} />
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="transition-transform hover:scale-110">
                  <FaLinkedin className="h-6 w-6" style={{ color: '#0077b5' }} />
                </Link>
                <Link href="mailto:example@email.com" className="transition-transform hover:scale-110">
                  <MdEmail className="h-6 w-6" style={{ color: '#EA4335' }} />
                </Link>
              </div>
            </div>
            
            <Terminal className="flex-1 shadow-lg mx-auto max-w-4xl h-[300px]">
              <AnimatedSpan delay={200} className="block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ whoami
              </AnimatedSpan>
              
              <TypingAnimation delay={400} duration={15} className="text-emerald-400 font-semibold">
                孔楷钦 (Kaiqin Kong)
              </TypingAnimation>
              
              <AnimatedSpan delay={800} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ cat about.md
              </AnimatedSpan>
              
              <div className="whitespace-normal break-words">
                <TypingAnimation delay={1000} duration={5} className="text-gray-800 leading-relaxed block">
                  Hi there! I'm Kaiqin Kong (孔楷钦), an incoming CS graduate student at UC San Diego (CS75).
                </TypingAnimation>
                
                <TypingAnimation delay={1500} duration={5} className="text-gray-800 leading-relaxed block">
                  Prior to this, I obtained a Bachelor of Engineering in Industrial Design at Zhejiang University.
                </TypingAnimation>
                
                <TypingAnimation delay={2000} duration={5} className="text-gray-800 leading-relaxed block">
                  I'm passionate about combining technical expertise with creative design to build innovative solutions.
                </TypingAnimation>
              </div>
              
              <AnimatedSpan delay={2800} className="mt-4 block">
                <span className="text-green-500">kaichin</span>:<span className="text-blue-500">~</span>$ <span className="animate-pulse">_</span>
              </AnimatedSpan>
            </Terminal>
          </div>
        </section>

        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Gallery</h2>
        </section>

        {/* Gaming & Hobbies */}
        <section className="px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center">Hobbies</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-12"
            >
              <p className="text-lg text-center md:text-left">
                In my free time, I enjoy listening to music and playing video games. I'm particularly passionate about gaming and esports.
              </p>
              
              {/* Overwatch Section */}
              <div>
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  <div className="flex-1 space-y-3">
                    <p>I'm an avid Overwatch fan and currently serve as the manager of the ZJU Overwatch discussion group. My journey with Overwatch esports began in 2016, and I've been passionately following the competitive scene ever since.</p>
                    <p>I used to be a big fan of <span className="font-medium">Birdring</span> and the London Spitfire—especially during their championship run. After <span className="font-medium">Birdring</span>'s retirement, my favorite player became <span className="font-medium">Proper</span>, a phenomenal flex DPS whose mechanical skill and game sense never cease to impress me.</p>
                    <div className="flex flex-wrap justify-start gap-4 pt-2">
                      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden shadow-md">
                        <Image 
                          src="/images/others/london_spitfire.png" 
                          alt="London Spitfire" 
                          fill
                          style={{objectFit: 'cover'}}
                          className="transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden shadow-md">
                        <Image 
                          src="/images/others/proper.png" 
                          alt="Proper - Overwatch Player" 
                          fill
                          style={{objectFit: 'cover'}}
                          className="transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/5 lg:w-1/3 flex justify-center items-center mt-4 md:mt-0">
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src="/images/others/overwatch.png" 
                        alt="Overwatch Game" 
                        fill
                        style={{objectFit: 'cover'}}
                        className="transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Indie Games Section */}
              <div>
                <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-start">
                  <div className="flex-1 space-y-3">
                    <p>Beyond competitive games, I have a soft spot for indie titles, especially roguelikes and card-based games. For instance, Slay the Spire and Into the Breach, both of which offer deep strategy and replayability.</p>
                    <p>I'm currently exploring <span className="font-medium">ChronoArk</span>, a tactical RPG that blends roguelike progression with deck-building mechanics — right up my alley.</p>
                  </div>
                  <div className="md:w-2/5 lg:w-1/3 flex justify-center items-center mt-4 md:mt-0">
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src="/images/others/chronoark.png" 
                        alt="ChronoArk Game" 
                        fill
                        style={{objectFit: 'cover'}}
                        className="transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Music Section */}
        <section className="px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">Music That Inspires Me</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video max-w-4xl mx-auto">
              <iframe
                src="https://open.spotify.com/embed/playlist/7gRzSkYJkMPCNilm32UG6Y?utm_source=generator"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full h-full"
              />
            </div>
            <div className="p-6 bg-gradient-to-t from-background/80 to-transparent">
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                This playlist has accompanied me through countless hours of programming and design. 
                Each song carries a unique story and emotion.
              </p>
            </div>
          </div>
        </section>

        {/* Location Map Section */}
        <section className="px-4 mb-2">
          <h2 className="text-3xl font-bold tracking-tight text-center">My Journey</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
            <p className="text-lg text-center mb-6">
              I come from a small county in Yunnan Province and am proud to be the first generation in my family to attend university. Thanks to China's college entrance examination system, I was able to earn my place at a university in Hangzhou through hard work and determination. Now, I have the opportunity to study and work in California.
            </p>
            <MapLibreMap />
          </div>
        </section>
      </div>
    </Layout>
  )
}

