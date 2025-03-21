"use client"

import { useEffect, useState } from "react"

import { NavData } from "@/config/site"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const [activeTabId, setActiveTabId] = useState(0)

  const scroll = (activeTabId: number) => {
    const ele = document.getElementById(String(activeTabId))
    if (ele) {
      const elePosition = ele.getBoundingClientRect().top
      const offsetPosition = elePosition + window.scrollY - 99
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  const scrollUpdate = () => {
    const ele = document.getElementById("main")
    if (ele) {
      const childElements = Array.from(ele.children)
      for (let children of childElements) {
        const top = children.getBoundingClientRect().top
        if (top < 100) {
          setActiveTabId(Number(children.id))
        }
      }
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior
    })
    window.addEventListener("scroll", scrollUpdate)
    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener("scroll", scrollUpdate)
    }
  }, [])
  return (
    <nav className="block h-[calc(100vh-65px)] w-60 flex-row flex-nowrap bg-gray-50 font-semibold sm:bg-background sm:px-6 sm:pb-6 overflow-hidden">
      <div className="mx-6 hidden h-14 flex-col items-center justify-center sm:flex"></div>
      <div className="flex-start relative z-40 flex h-[calc(100vh-125px)] w-full flex-1 flex-col overflow-y-auto overflow-x-hidden rounded pt-4 opacity-100">
        <div className="flex list-none flex-col md:min-w-full md:flex-col">
          <div className={cn("flex-none pb-12", "")}>
            <div className="space-y-4 pb-4">
              <div className="py-2">
                <div className="space-y-1">
                  {NavData.map((category, index) => {
                    return (
                      <div
                        className={`block cursor-pointer rounded-lg hover:bg-gray-100 hover:text-purple-500 ${
                          activeTabId === index ? "bg-gray-100 text-purple-500" : "text-primary"
                        }`}
                        key={index}
                        onClick={() => scroll(index)}
                      >
                        <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                          <span className="truncate text-sm">{category.title}</span>
                        </div>
                      </div>
                    )
                  })}
                  {/* 添加联系我选项 */}
                  <div
                    className={`block cursor-pointer rounded-lg hover:bg-gray-100 hover:text-purple-500 ${
                      activeTabId === NavData.length ? "bg-gray-100 text-purple-500" : "text-primary"
                    }`}
                    onClick={() => scroll(NavData.length)}
                  >
                    <div className="scale relative mb-2 flex items-center gap-2 rounded-r-lg p-2 transition-colors ease-in-out before:transition-colors hover:no-underline sm:border-l-0 sm:pl-6 sm:before:absolute sm:before:left-[-5px] sm:before:top-[2px] sm:before:h-[calc(100%-4px)] sm:before:w-[10px] sm:before:rounded-full sm:before:transition-colors">
                      <span className="truncate text-sm">🐟 联系我</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
