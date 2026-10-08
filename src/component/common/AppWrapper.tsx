import React from "react";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className=" h-full max-h-[calc(100vh-100px)] 
        overflow-auto"
      >
        {children}
      </div>
    </>
  );
}
