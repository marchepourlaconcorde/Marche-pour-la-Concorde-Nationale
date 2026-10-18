// Export des signatures en CSV, réservé à l'administrateur.
// Usage : https://votre-site/api/export?cle=VOTRE_CLE (variable d'environnement ADMIN_CLE sur Netlify)
import { getStore } from "@netlify/blobs";

export default async (req) => {
  const cle = new URL(req.url).searchParams.get("cle");
  if (!process.env.ADMIN_CLE || cle !== process.env.ADMIN_CLE) {
    return new Response("Accès refusé.", { status: 403 });
  }
  const store = getStore({ name: "signatures", consistency: "strong" });
  const lignes = ["email;departement;date"];
  for await (const page of store.list({ prefix: "email/", paginate: true })) {
    for (const b of page.blobs) {
      const s = await store.get(b.key, { type: "json" });
      if (s) lignes.push(`${s.email};${s.dep};${s.date}`);
    }
  }
  return new Response(lignes.join("\n"), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": "attachment; filename=signatures.csv",
      "cache-control": "no-store"
    }
  });
};

export const config = { path: "/api/export" };
