
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Laptop, Gamepad2 } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isGamer = theme === "gamer"

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "gamer" : "professional";
    
    if (newTheme === "gamer" && theme !== "gamer") {
      window.dispatchEvent(new CustomEvent('show-loading-screen'));
      setTimeout(() => {
        setTheme(newTheme);
      }, 50);
    } else {
      setTheme(newTheme);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Laptop className={cn("h-5 w-5", !isGamer ? "text-primary" : "text-muted-foreground")} />
      <Switch
        checked={isGamer}
        onCheckedChange={handleThemeChange}
        aria-label="Toggle theme between professional and gamer"
      />
      <Gamepad2 className={cn("h-5 w-5", isGamer ? "text-primary" : "text-muted-foreground")} />
    </div>
  )
}
