// Motor puro: recebe somente contagens agregadas, nunca coordenadas individuais.
export function regionalMap(rows, { minimum = 5 } = {}) {
  if (!Number.isInteger(minimum) || minimum < 5) throw new Error("Invalid privacy threshold");
  const groups = new Map();
  for (const row of rows) {
    const uf = String(row.uf ?? "").trim().toUpperCase();
    const city = String(row.city ?? "").trim().normalize("NFC");
    if (!/^(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)$/.test(uf) || !city || !Number.isSafeInteger(row.count) || row.count < 0) continue;
    const key = uf + ":" + city.toLocaleLowerCase("pt-BR");
    const previous = groups.get(key);
    groups.set(key, { uf, city, count: (previous?.count ?? 0) + row.count });
  }
  return [...groups.values()].filter(x => x.count >= minimum).sort((a,b) => b.count-a.count);
}
