"use client";
import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { getUserList, User, Status } from "./user";

export default function Home() {
  const parentRef = useRef(null);
  const [userList, setUserList] = useState<User[]>([]);

  const handleDelete = (index: number) => {
    setUserList(prev => prev.filter((_, i) => i !== index));
  };

  const handleStatusChange = (index: number) => {
    setUserList(prev => prev.map((user, i) => 
      i === index 
        ? { ...user, status: user.status === Status.ACTIVE ? Status.INACTIVE : Status.ACTIVE }
        : user
    ));
  };

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: userList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 30, // 增加预加载元素数量
    initialRect: { width: 0, height: 0 }, // 优化初始渲染
    scrollPaddingStart: 0,
    scrollPaddingEnd: 0,
  });

  useEffect(() => {
    getUserList().then((res) => {
      if (res.code === 0) {
        setUserList(res.data);
      }
    });
  }, []);
  return (
    <div
      ref={parentRef}
      style={{
        height: `100vh`,
        overflow: "auto", // Make it scroll!
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const user = userList[virtualItem.index];

          return (
            user && (
              <div
                key={virtualItem.key}
                className="flex items-center px-4 h-[72px] border-b border-black/10"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={44}
                  height={44}
                  loading="lazy"
                  className="rounded-l"
                />
                <div className="ml-3 flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">ID: {user.id}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(virtualItem.index)}
                    className={`w-[71px] h-[32px] rounded border ${
                      user.status === Status.ACTIVE
                        ? "border-none text-[#669900]"
                        : "border-[#ebebeb] text-black"
                    }`}
                  >
                    {user.status === Status.ACTIVE ? "Accepted" : "Accept"}
                  </button>
                  <button
                    onClick={() => handleDelete(virtualItem.index)}
                    className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4L4 12M4 4L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
