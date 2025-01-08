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
			<div className="relative mb-6 flex min-h-[122px] min-w-0 cursor-pointer flex-col break-words rounded-lg border border-gray-200 p-4 shadow-md transition-all hover:-translate-y-1 hover:scale-105 hover:bg-border hover:shadow-lg xl:mb-0">
				<div className="flex items-center">
					<div className="mr-3 flex h-10 w-10 overflow-hidden rounded-full">
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
								className={`h-full w-full rounded-full ${randomColor} text-center font-bold leading-10 text-white`}
							>
                {NavLink.title[0]}
              </span>
						)}
					</div>
					<span className="text-xl font-bold text-primary truncate">{NavLink.title}</span>
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
				<div className="mb-12">
					<div className="my-4">
						<h1 className="mb-2 text-2xl font-bold text-primary/80 sm:text-3xl">联系我</h1>
					</div>
					<div>
						你可以通过
						<Link href="mailto:2020583117@qq.com" target="_blank" rel="noreferrer">
							<span className="px-3 underline decoration-wavy hover:text-purple-500">Email</span>
						</Link>
						或者
						<Link
							href="https://weixin.sogou.com/weixin?type=1&query=kk%E6%83%B3%E5%BD%93%E7%A8%8B%E5%BA%8F%E5%91%98"
							target="_blank"
							rel="noreferrer"
						>
							<span className="px-3 underline decoration-wavy hover:text-purple-500">微信公众号</span>
						</Link>
						联系我
					</div>
					<div>
						<Image src="/weixin.jpg" className="float-left md:w-1/4" alt="kk想当程序员" width={318} height={318} />
					</div>
				</div>
			</div>
		</div>
	)
}
