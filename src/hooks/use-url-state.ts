"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  type TableUrlState,
  parseUrlState,
  serializeUrlState,
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
    [router, searchParams]
  );

  return { state, setState };
}
