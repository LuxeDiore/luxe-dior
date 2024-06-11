"use client";

import { useState } from "react";

export default function Home() {
  const [latestPerfumes, setLatestPerfumes] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  return (
    <div>
      {/* Latest Products */}
      <div></div>

      {/* Best Sellers */}
      <div></div>
    </div>
  );
}
