"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }
  const toggleViewTransition = (event: React.MouseEvent<HTMLButtonElement>) => {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    const transition = document.startViewTransition(() => {
      toggleTheme()
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 300,
          easing: "ease-in",
          pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)"
        }
      )
    })
  }
	// const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const handleToggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
	  // if (isMobile) {
		//   toggleTheme(); // 在移动端直接切换主题
		//   return;
	  // }

	// 如果不支持 View Transition API，则直接切换主题
    const isSupport = 'startViewTransition' in document && document.startViewTransition() && !window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!isSupport) {
      toggleTheme()
      return
    }

    toggleViewTransition(event)
  }

  return (
    <Button variant="ghost" size="icon" className="rounded-full" onClick={handleToggleTheme}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
