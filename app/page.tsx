"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Home() {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [hideLoadingScreen, setHideLoadingScreen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return
    }

    let promptTimeout: NodeJS.Timeout
    let promptReceived = false

    // Handle install prompt - redirect to install screen
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      promptReceived = true
      router.push("/install")
      clearTimeout(promptTimeout)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Timeout: if no install prompt after 1 second, stay on website
    promptTimeout = setTimeout(() => {
      if (!promptReceived) {
        // Not installable, continue with website
      }
    }, 1000)

    // Auto hide loading screen after 2 seconds
    const loadingScreenTimer = setTimeout(() => setHideLoadingScreen(true), 2000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      clearTimeout(loadingScreenTimer)
      clearTimeout(promptTimeout)
    }
  }, [router])

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}

      {/* Embedded Website */}
      <div className="relative w-full h-screen bg-gray-100">
        {!iframeLoaded && !hideLoadingScreen && (
          <div className="absolute inset-0 bg-linear-to-br from-orange-50 to-amber-50 flex items-center justify-center z-10 animate-out fade-out duration-500" style={{ animationDelay: hideLoadingScreen ? "0s" : "10s" }}>
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
