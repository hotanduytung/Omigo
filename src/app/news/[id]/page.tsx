import React from "react";
import NewsDetailClient from "./NewsDetailClient";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <NewsDetailClient id={resolvedParams.id} />;
}
