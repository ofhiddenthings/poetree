/* Reads the poems (from your Google Sheet, or the samples) and links
   each poem to its parent. Used by both index.html and poem.html. */

function parseCSV(text) {
  const rows = []; let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else quoted = false; }
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

async function loadPoems() {
  let list = null, sample = false;
  if (CONFIG.sheetCsvUrl) {
    try {
      const res = await fetch(CONFIG.sheetCsvUrl);
      if (!res.ok) throw new Error("bad response");
      const rows = parseCSV(await res.text()).filter(r => r.some(c => c.trim()));
      const head = rows[0].map(h => h.trim().toLowerCase());
      list = rows.slice(1).map(r => {
        const o = {}; head.forEach((h, i) => { o[h] = (r[i] || "").trim(); }); return o;
      });
    } catch (e) { list = null; }
  }
  if (!list || !list.length) { list = SAMPLE_POEMS.map(p => ({...p})); sample = true; }
  list = list.filter(p => p.id && p.title);
  const byId = {};
  list.forEach(p => { p.kids = []; byId[p.id] = p; });
  list.forEach(p => { p.parentPoem = byId[p.parent] || null; if (p.parentPoem) p.parentPoem.kids.push(p); });
  return { list, byId, sample };
}
