import React from "react";
import HomeClient from "../HomeClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return <HomeClient initialSection="services" defaultLang="vi" />;
}
