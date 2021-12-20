import type { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";

import { Model } from "https://deno.land/x/denodb/mod.ts";

import type { Values } from "https://deno.land/x/denodb/lib/data-types.ts";

interface ApiResponse {
  status: Status;
  message: string | Map<Status, string>;

  data: Model | Model[] | Error | string[] | number[] | string | number;
}

export type { ApiResponse, RouterContext, Status, Values };
