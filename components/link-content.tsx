"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react" // 引入 useState

import { NavData, type NavLink } from "@/config/site"

// 生成随机颜色的函数
const getRandomColor = () => {
	const colors = [
		"bg-red-500",
		"bg-blue-500",
		"bg-green-500",
		"bg-yellow-500",
		"bg-purple-500",
		"bg-pink-500",
		"bg-indigo-500",
		"bg-teal-500",
		"bg-orange-500",
	]
	const randomIndex = Math.floor(Math.random() * colors.length)
	return colors[randomIndex]
}

export function LinkItem({ NavLink }: { NavLink: NavLink }) {
	const [iconError, setIconError] = useState(false)
	const randomColor = getRandomColor() // 为每个图标生成随机颜色

	return (
		<Link href={NavLink.link} target="_blank">
			<div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105  hover:shadow-underline xl:mb-0">
				<div className="flex items-center">
					{/* 使用 flex-shrink-0 确保 icon 不会缩小 */}
					<div className="mr-3 flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
						{NavLink.icon && !iconError ? (
							<Image
								src={NavLink.icon}
								className="object-fill"
								alt=""
								width={40}
								height={40}
								onError={() => setIconError(true)}
							/>
						) : (
							<span
								className={`h-full w-full rounded-full ${randomColor} flex items-center justify-center text-white font-bold text-xl`}
							>
                {NavLink.title[0]}
              </span>
						)}
					</div>
					{/* 使用 flex-grow 和 truncate 来确保 title 不会超出容器 */}
					<span className="text-xl font-bold text-primary truncate flex-grow">{NavLink.title}</span>
				</div>
				<div className="mt-2 line-clamp-2 text-sm text-primary">{NavLink.desc}</div>
			</div>
		</Link>
	)
}

export function LinkContent() {
	return (
		<div className="w-full pb-96 pt-4">
			<div id="main" className="mx-auto w-full px-4 md:px-6">
				{NavData.map((category, index) => {
					return (
						<div id={String(index)} key={index} className="mb-12">
							<div className="my-4">
								<h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">{category.title}</h1>
							</div>
							<div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
								{category.items.map((item) => (
									<LinkItem NavLink={item} key={item.title} />
								))}
							</div>
						</div>
					)
				})}
				<div id={String(NavData.length)} key="contact" className="mb-12">
					<div className="my-4">
						<h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">🐟 联系我</h1>
					</div>
					<div>
						你可以通过
						<Link href="mailto:1732804469@qq.com" target="_blank" rel="noreferrer">
							<span className="px-3 underline decoration-wavy hover:text-purple-500">Email</span>
						</Link>
						或者
						<Link
							href="https://cai2.wang"
							target="_blank"
							rel="noreferrer"
						>
							<span className="px-3 underline decoration-wavy hover:text-purple-500">我的主页</span>
						</Link>
						联系我
					</div>
					<div>
						<Image src="/homepage.png" className="float-left md:w-1/4" alt="Kiro" width={318} height={318} />
					</div>
				</div>
			</div>
		</div>
	)
}
