"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { LinkContent } from "@/components/link-content"
import { Sidebar } from "@/components/sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  const [showButton, setShowButton] = useState(false)
	// 监听滚动事件
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowButton(true)
			} else {
				setShowButton(false)
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// 返回顶部的函数
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth", // 平滑滚动
		})
	}

	return (
		<div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-12 2xl:px-18">
			<div className="flex">
				<div className="fixed z-20 hidden min-h-screen w-[16rem] transition-all duration-300 ease-in-out sm:block">
					<Sidebar />
				</div>
				<div className="sm:pl-[16rem]">
					<SiteHeader />
					<LinkContent />
					<SiteFooter />
				</div>
			</div>
			{/* 返回顶部按钮 */}
			<AnimatePresence>
				{showButton && (
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						onClick={scrollToTop}
						className="fixed bottom-8 right-8 z-50 p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 10l7-7m0 0l7 7m-7-7v18"
							/>
						</svg>
					</motion.button>
				)}
			</AnimatePresence>
		</div>
	)
}
