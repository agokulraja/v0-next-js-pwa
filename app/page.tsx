"use client"

import { useState, useEffect } from "react"
import { Heart, Download, ExternalLink, Wifi, WifiOff, CheckCircle } from "lucide-react"

export default function Home() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallScreen, setShowInstallScreen] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      setShowInstallScreen(false)
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Handle online/offline
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    }
  }

  if (showInstallScreen && !isInstalled && isInstallable) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 text-gray-900 font-sans">

        {/* Installation Screen */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                  Shape the Society for Better
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  DEEP Trust is committed to empowering communities through education, healthcare, livelihood support,
                  and environmental initiatives. Join us in making a meaningful difference.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Education</h3>
                    <p className="text-sm text-gray-600">Quality pre-school and educational programs</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⚕️</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Healthcare</h3>
                    <p className="text-sm text-gray-600">Health screenings and wellness initiatives</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Livelihood</h3>
                    <p className="text-sm text-gray-600">Empowering communities with sustainable income</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Environment</h3>
                    <p className="text-sm text-gray-600">Environmental conservation and sustainability</p>
                  </div>
                </div>
              </div>

              {/* Install Button */}
              <div className="pt-4 flex gap-4">
                <button
                  onClick={handleInstall}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Install App
                </button>
                <button
                  onClick={() => setShowInstallScreen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-lg font-semibold border-2 border-gray-200 hover:border-orange-500 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Skip
                </button>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-200">
                <div className="w-full aspect-square bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center text-6xl">
                  D
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-orange-100 text-center">
                  <p className="text-2xl font-bold text-orange-500">300k+</p>
                  <p className="text-xs text-gray-600">Empowered</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-100 text-center">
                  <p className="text-2xl font-bold text-orange-500">6k+</p>
                  <p className="text-xs text-gray-600">Children Educated</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-orange-200 mt-12 py-8 bg-white/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
            <p className="flex items-center justify-center gap-2">
              Made with <Heart className="w-4 h-4 text-orange-500 fill-orange-500" /> by DEEP Trust
            </p>
          </div>
        </footer>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}

      {/* Embedded Website */}
      <div className="relative w-full h-screen bg-gray-100">
        {!iframeLoaded && (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-gray-600 font-medium">Loading DEEP India...</p>
            </div>
          </div>
        )}
        <iframe
          src="https://deepindia.org"
          className="w-full h-full border-0"
          title="DEEP Trust Website"
          onLoad={() => setIframeLoaded(true)}
        />
      </div>
    </main>
  )
}
