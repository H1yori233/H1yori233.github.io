import { Project } from '@/lib/utils'
import { Book, Zap, Music, Volume2, Battery, CircuitBoard, Code, Box, Cpu } from 'lucide-react'

const project: Project = {
  slug: 'pop-up-midi',
  title: 'Pop Up MID!',
  description: 'A course project exploring interactive music education through paper engineering and conductive ink technology, developed as part of the Interactive Design course.',
  tags: ['Product Design', 'Music Education', 'Paper Engineering', 'Interactive Design'],
  content: (
    <div 
      className="w-full max-w-none space-y-16"
      style={{
        '--theme-background': 'var(--background)',
        '--theme-foreground': '#ec4899',
        '--theme-card': '#fdf2f8',
        '--theme-border': '#ec4899',
        '--theme-primary': '#ec4899',
        '--theme-primary-foreground': '#ffffff',
        '--theme-secondary': '#14b8a6',
        '--theme-secondary-foreground': '#ffffff',
        '--theme-muted': '#6b7280',
      } as React.CSSProperties}
    >
      {/* Hero Section */}
      <section className="relative w-full">
        <div className="w-full max-w-[1400px] mx-auto aspect-video rounded-lg overflow-hidden bg-gradient-to-r from-yellow-100 via-blue-100 to-purple-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
              <span className="block">POP</span>
              <span className="block">UP</span>
              <span className="block">MID!</span>
            </h1>
          </div>
          <img 
            src="/placeholder.svg?height=600&width=800" 
            alt="Pop Up MIDI product showcase" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      </section>

      {/* Introduction */}
      <section className="w-full max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">The Challenge</h2>
            <p className="text-lg text-[var(--theme-muted)]">
              Childhood is the most creative time, and children naturally want to express 
              themselves through music. However, most instruments are hard to learn and can be 
              boring, which dampens their interest. Many families also can't afford expensive 
              music lessons or instruments, so low-cost music tools can help all children enjoy music.
            </p>
            <p className="text-lg text-[var(--theme-muted)]">
              The tactile experience of playing an instrument is key to children's musical 
              development. Proper feedback helps them explore the instrument and fuels their 
              passion for learning. We aim to create an affordable music product that helps 
              children discover instruments and develop a love for music.
            </p>
          </div>
          <div className="relative aspect-square">
            <img 
              src="/placeholder.svg?height=400&width=400" 
              alt="Grand Piano" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Product Overview</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--theme-card)] rounded-xl p-6 text-center border-[var(--theme-border)]">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interactive Music Book</h3>
            <p className="text-[var(--theme-muted)]">
              A low-cost, tactile music experience designed specifically for children. Combines 
              the familiarity of a book with the excitement of musical instruments.
            </p>
          </div>

          <div className="bg-[var(--theme-card)] rounded-xl p-6 text-center border-[var(--theme-border)]">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Conductive Ink Circuits</h3>
            <p className="text-[var(--theme-muted)]">
              Innovative technology that registers user input for responsive play. Brings pages to life 
              with touch-sensitive areas that trigger sounds and interactions.
            </p>
          </div>

          <div className="bg-[var(--theme-card)] rounded-xl p-6 text-center border-[var(--theme-border)]">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Three Instruments in One</h3>
            <p className="text-[var(--theme-muted)]">
              Explore piano, drums, and accordion all within a single book. Each page unfolds into 
              a new musical adventure, encouraging diverse musical experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Research */}
      <section className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Research</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--theme-card)] rounded-xl p-6 border-[var(--theme-border)]">
            <h3 className="text-xl font-semibold mb-4">Haptic Feedback Mechanisms</h3>
            <div className="aspect-video relative mb-4">
              <img 
                src="/placeholder.svg?height=300&width=400" 
                alt="Haptic feedback mechanisms diagrams" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <p className="text-[var(--theme-muted)]">
              Four primitives of Kirigami haptic structures provide different tactile 
              responses, creating a more immersive musical experience.
            </p>
          </div>

          <div className="bg-[var(--theme-card)] rounded-xl p-6 border-[var(--theme-border)]">
            <h3 className="text-xl font-semibold mb-4">Foldable Control System</h3>
            <div className="aspect-video relative mb-4">
              <img 
                src="/placeholder.svg?height=300&width=400" 
                alt="Foldable control system technical drawings" 
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <p className="text-[var(--theme-muted)]">
              Innovative folding mechanisms enable real-time sensing and precise 
              control of musical parameters.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Structure */}
      <section className="w-full max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Internal Structure</h2>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Two-Layer Design</h3>
              
              <div className="space-y-4">
                <div className="bg-[var(--theme-card)] rounded-lg p-4 border-[var(--theme-border)]">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mt-1">
                      <Music className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Instrument Layer</h4>
                      <p className="text-[var(--theme-muted)]">
                        Top layer featuring piano, drums, and accordion interfaces. Utilizes 
                        Kirigami structures for 3D, pop-up elements. Incorporates conductive 
                        ink for touch sensitivity.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--theme-card)] rounded-lg p-4 border-[var(--theme-border)]">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                      <CircuitBoard className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Electronic Layer</h4>
                      <p className="text-[var(--theme-muted)]">
                        Bottom layer housing electronic components. Connects to the instrument 
                        layer via metal rings. Processes input and generates corresponding sounds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Key Components</h2>
            <div className="space-y-4">
              <div className="bg-[var(--theme-card)] rounded-lg p-4 border-[var(--theme-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Seeeduino Mainboard</h4>
                    <p className="text-[var(--theme-muted)]">
                      Heart of the system, processing all inputs. Manages instrument selection 
                      and sound generation. Enables MIDI connectivity for expanded functionality.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--theme-card)] rounded-lg p-4 border-[var(--theme-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <Volume2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Speaker Module</h4>
                    <p className="text-[var(--theme-muted)]">
                      High-quality, compact speaker for clear sound output. Embedded in the book's 
                      cover for portability. Balances volume and quality for optimal user experience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--theme-card)] rounded-lg p-4 border-[var(--theme-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mt-1">
                    <Battery className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Power System</h4>
                    <p className="text-[var(--theme-muted)]">
                      Rechargeable lithium battery for extended play time. Integrated charging 
                      module for easy power replenishment. Ensures the book is always ready for 
                      musical adventures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="w-full max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Implementation</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Parametric Design</h3>
                  <p className="text-[var(--theme-muted)]">
                    Using Grasshopper for precise control over paper mechanisms and structures.
                    Enables rapid prototyping and optimization of folding patterns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Arduino Integration</h3>
                  <p className="text-[var(--theme-muted)]">
                    MIDI communication and sensor processing through Arduino, enabling real-time
                    musical interaction and sound generation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <Box className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Conductive Ink Circuits</h3>
                  <p className="text-[var(--theme-muted)]">
                    Screen-printed conductive ink enables flexible, paper-based circuits for touch
                    and pressure sensing.
                  </p>
                </div>
              </div>
            </div>

            <div className="aspect-square relative rounded-lg overflow-hidden">
              <img 
                src="/placeholder.svg?height=400&width=400" 
                alt="Parametric design in Grasshopper showing circular pattern"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-6">
              <img 
                src="/placeholder.svg?height=600&width=800" 
                alt="Grasshopper interface showing folding pattern design"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="bg-[var(--theme-card)] rounded-lg p-6 border-[var(--theme-border)]">
              <h4 className="text-lg font-semibold mb-3">Design Workflow</h4>
              <ol className="space-y-3 text-[var(--theme-muted)]">
                <li className="flex items-start gap-2">
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">01</span>
                  <span>Parametric modeling of mechanical components</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">02</span>
                  <span>Integration of electronic components with paper mechanisms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">03</span>
                  <span>Testing and optimization of touch sensitivity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono bg-muted px-2 py-0.5 rounded">04</span>
                  <span>Final assembly and quality control</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
  enable: true
}

export default project

