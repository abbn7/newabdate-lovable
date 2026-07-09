"use client";
import { WhatsAppFab } from "./whatsapp-fab";
import { DevModeButton } from "./dev-mode";

export function FabStack() {
  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 safe-bottom">
      <WhatsAppFab />
      <DevModeButton />
    </div>
  );
}
