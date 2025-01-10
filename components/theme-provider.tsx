"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	// 添加mounted状态来处理服务端渲染和客户端渲染的差异
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	// 在客户端渲染完成前不显示内容，避免水合错误
	if (!mounted) {
		return null
	}

	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
