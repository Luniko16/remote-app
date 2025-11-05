
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GamerBackground() {
  const { theme } = useTheme();
  const [isGamer, setIsGamer] = useState(false);

  useEffect(() => {
    setIsGamer(theme === "gamer");
  }, [theme]);

  if (!isGamer) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[-10] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
}
