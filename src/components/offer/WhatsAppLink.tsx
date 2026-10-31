"use client";

import { Suspense } from "react";
import { buildWhatsAppUrl, WhatsAppIntent } from "@/config/offer-config";
import { useClientName } from "./ClientName";

interface WhatsAppLinkProps {
  intent?: WhatsAppIntent;
  className?: string;
  children: React.ReactNode;
}

function LinkInner({ intent, className, children }: WhatsAppLinkProps) {
  const name = useClientName();
  return (
    <a href={buildWhatsAppUrl(name, intent)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

// Müştəri adı və seçilmiş paketlə hazır WhatsApp mesajı açır
export function WhatsAppLink(props: WhatsAppLinkProps) {
  const fallback = (
    <a href={buildWhatsAppUrl(null, props.intent)} target="_blank" rel="noopener noreferrer" className={props.className}>
      {props.children}
    </a>
  );
  return (
    <Suspense fallback={fallback}>
      <LinkInner {...props} />
    </Suspense>
  );
}
