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

/* No title given: use the poem's first line, minus punctuation at its end.
   Quotes and brackets are kept, so "Why?" becomes "Why" and (an aside.) becomes (an aside). */
function derivedTitle(poem) {
  const first = String(poem || "").split(/\r?\n/).map(s => s.trim()).find(Boolean) || "";
  const keep = /["'\u201c\u201d\u2018\u2019()\[\]{}\u00ab\u00bb\u2039\u203a]/;
  const run = (first.match(/[\s\p{P}]+$/u) || [""])[0];
  const t = first.slice(0, first.length - run.length) + [...run].filter(c => keep.test(c)).join("");
  return t.trim() || first || "Untitled";
}

function buildPoems(rows, sample, final) {
  const list = rows.filter(p => p.id).map(p => {
    const o = Object.assign({}, p);
    if (!String(o.title || "").trim()) o.title = derivedTitle(o.poem);
    if (!String(o.author || "").trim()) o.author = "anonymous";
    return o;
  });
  const byId = {};
  list.forEach(p => { p.kids = []; byId[p.id] = p; });
  list.forEach(p => { p.parentPoem = byId[p.parent] || null; if (p.parentPoem) p.parentPoem.kids.push(p); });
  return { list, byId, sample, final, sig: JSON.stringify(rows) };
}

async function fetchRows() {
  try {
    const res = await fetch(CONFIG.sheetCsvUrl);
    if (!res.ok) throw new Error("bad response");
    const rows = parseCSV(await res.text()).filter(r => r.some(c => c.trim()));
    const head = rows[0].map(h => h.trim().toLowerCase());
    const out = rows.slice(1).map(r => {
      const o = {}; head.forEach((h, i) => { o[h] = (r[i] || "").trim(); }); return o;
    });
    return out.length ? out : null;
  } catch (e) { return null; }
}

/* Calls render(data) as soon as it has something to show: first the copy saved
   in this browser from the last visit (if any), then again if the fresh copy
   from the sheet is different. data.final is false only for the saved copy. */
async function loadPoems(render) {
  if (!CONFIG.sheetCsvUrl) { render(buildPoems(SAMPLE_POEMS, true, true)); return; }

  const key = "poems:" + CONFIG.sheetCsvUrl;
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(key)); } catch (e) {}
  if (!Array.isArray(cached) || !cached.length) cached = null;
  if (cached) render(buildPoems(cached, false, false));

  const fresh = await fetchRows();
  if (fresh) {
    try { localStorage.setItem(key, JSON.stringify(fresh)); } catch (e) {}
    render(buildPoems(fresh, false, true));
  } else if (cached) {
    render(buildPoems(cached, false, true));
  } else {
    render(buildPoems(SAMPLE_POEMS, true, true));
  }
}
