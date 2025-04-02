"use client";
import Image from "next/image";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { getUserList, User } from "./user";

export default function Home() {
  const parentRef = useRef(null);
  const [userList, setUserList] = useState<User[]>([]);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: userList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
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
                className="flex items-center p-2 border-b border-gray-200"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="rounded-full"
                />
                <div className="ml-3">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-500 text-sm">ID: {user.id}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
