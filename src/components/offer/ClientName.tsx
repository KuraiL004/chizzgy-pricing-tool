"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OFFER } from "@/config/offer-config";

// Linkdəki ?ad=... parametrindən müştəri adını oxuyur
export function useClientName(): string | null {
  const value = useSearchParams().get(OFFER.clientParam)?.trim();
  return value ? value.slice(0, 60) : null;
}

function NameInner({ fallback, suffix = "" }: { fallback: string; suffix?: string }) {
  const name = useClientName();
  return <>{name ? `${name}${suffix}` : fallback}</>;
}

// Müştəri adı (yoxdursa fallback). useSearchParams Suspense içində olmalıdır.
export function ClientName({ fallback, suffix }: { fallback: string; suffix?: string }) {
  return (
    <Suspense fallback={fallback}>
      <NameInner fallback={fallback} suffix={suffix} />
    </Suspense>
  );
}
