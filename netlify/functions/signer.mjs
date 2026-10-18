// Enregistre une signature : une seule par adresse e-mail.
import { getStore } from "@netlify/blobs";
import { createHash } from "node:crypto";

const CODES = new Set(["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","21","22","23","24","25","26","27","28","29","2A","2B","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95"]);

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });

export default async (req) => {
  if (req.method !== "POST") return json(405, { erreur: "Méthode non autorisée." });

  let data;
  try { data = await req.json(); } catch { return json(400, { erreur: "Requête invalide." }); }

  const email = String(data.email || "").trim().toLowerCase();
  const dep = String(data.dep || "").toUpperCase();
  if (data.site_web) return json(200, { ok: true }); // piège à robots
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return json(400, { erreur: "Adresse e-mail invalide." });
  if (!CODES.has(dep)) return json(400, { erreur: "Département invalide." });
  if (data.consentement !== true) return json(400, { erreur: "Le consentement est requis." });

  const hash = createHash("sha256").update(email).digest("hex");
  const store = getStore({ name: "signatures", consistency: "strong" });

  if (await store.get(`email/${hash}`)) {
    return json(409, { erreur: "Cette adresse a déjà signé la pétition. Merci !" });
  }

  const date = new Date().toISOString();
  await store.setJSON(`email/${hash}`, { email, dep, date });
  await store.set(`dep/${dep}/${hash}`, date);

  return json(200, { ok: true });
};

export const config = { path: "/api/signer" };
