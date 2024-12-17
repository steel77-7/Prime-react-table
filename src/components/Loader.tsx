import React from "react";

export default function Loader() {
  return (
    <>
        <div className="flex w-full h-screen justify-center items-center">
            <div className="border-b-8 border-teal-600 animate-spin w-72 h-72 rounded-full"></div>
        </div>
    </>
  );
}
