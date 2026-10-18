// Renvoie le nombre de signataires par département (aucune adresse n'est exposée).
import { getStore } from "@netlify/blobs";

export default async () => {
  const store = getStore({ name: "signatures", consistency: "strong" });
  const deps = {};
  let total = 0;
  for await (const page of store.list({ prefix: "dep/", paginate: true })) {
    for (const b of page.blobs) {
      const code = b.key.split("/")[1];
      deps[code] = (deps[code] || 0) + 1;
      total++;
    }
  }
  return new Response(JSON.stringify({ total, deps, maj: new Date().toISOString() }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=60"
    }
  });
};

export const config = { path: "/api/compteurs" };
