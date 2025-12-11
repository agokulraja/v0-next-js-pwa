"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Download, ExternalLink } from "lucide-react"

export default function Home() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallScreen, setShowInstallScreen] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [showStats, setShowStats] = useState(false)

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

    // Lazy load stats after 500ms
    const statsTimer = setTimeout(() => setShowStats(true), 500)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearTimeout(statsTimer)
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
      <main className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50 text-gray-900 font-sans">
        {/* Installation Screen */}
        <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
          <div className="space-y-10">
            {/* Logo Section */}
            <div className="flex justify-center">
              <div className="w-48 sm:w-2/4 flex items-center justify-center">
                <Image 
                  src="/DEEP Logo.png" 
                  alt="DEEP Trust" 
                  width={200} 
                  height={200}
                  priority
                  className="w-full h-full drop-shadow-lg"
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div className="space-y-3">
               
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                  Empowering communities through education, healthcare, livelihood support, and environmental initiatives. 
                  Join us in making a meaningful difference.
                </p>
              </div>
              

              

              {/* Our Work Areas */}
              <div className="space-y-3 mt-10">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">Our Work Areas</h2>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all hover:border-orange-300">
                    <div className="text-3xl sm:text-4xl mb-2">🎓</div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Education</h3>
                    <p className="text-xs text-gray-600 mt-1">Quality pre-school & programs</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all hover:border-orange-300">
                    <div className="text-3xl sm:text-4xl mb-2">⚕️</div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Healthcare</h3>
                    <p className="text-xs text-gray-600 mt-1">Screenings & wellness</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all hover:border-orange-300">
                    <div className="text-3xl sm:text-4xl mb-2">💼</div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Livelihood</h3>
                    <p className="text-xs text-gray-600 mt-1">Sustainable income</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all hover:border-orange-300">
                    <div className="text-3xl sm:text-4xl mb-2">🌱</div>
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Environment</h3>
                    <p className="text-xs text-gray-600 mt-1">Conservation & sustainability</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 ">
              <button
                onClick={handleInstall}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all active:scale-95 shadow-md"
              >
                <Download className="w-5 h-5" />
                Install App
              </button>
              <button
                onClick={() => setShowInstallScreen(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-orange-300 hover:bg-orange-50 transition-all active:scale-95"
              >
                <ExternalLink className="w-5 h-5" />
                Continue to Website
              </button>
            </div>

            {/* Impact Stats - Grid Layout */}
            {showStats && (
              <div className="animate-in fade-in duration-500">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">Our Impact</h2>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">

                  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">50k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Children Educated</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">400k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Health Beneficiaries</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">30k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Livelihood Empowered</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">20k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Environment Impact</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-orange-100 shadow-sm hover:shadow-md transition-shadow col-span-2">
                    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">65k+</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Police Screened</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-orange-200 mt-12 py-8 bg-linear-to-r from-white to-orange-50/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center text-gray-600">
            <p className="flex items-center justify-center gap-2 text-sm">
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
          <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center z-10">
            <div className="text-center space-y-4">
              <Image
                src="/deepapp_128x128.png"
                alt="DEEP Trust"
                width={128}
                height={128}
                priority
                className="w-24 h-24 mx-auto"
              />
              <div className="space-y-2">
                <p className="text-gray-600 font-medium text-sm">Loading DEEP India...</p>
                <div className="flex justify-center gap-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
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
