"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  parseUrlState,
  serializeUrlState,
  type TableUrlState,
} from "@/lib/url-state";

export function useUrlState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const state = parseUrlState(searchParams);

  const setState = useCallback(
    (update: Partial<TableUrlState>) => {
      const current = parseUrlState(searchParams);
      const merged = { ...current, ...update };
      const params = serializeUrlState(merged);
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    },
    [router, searchParams],
  );

  return { state, setState };
}
