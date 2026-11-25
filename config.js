/* ------------------------------------------------------------------
   SETTINGS: the only file you need to edit to connect your site.
   ------------------------------------------------------------------ */
const CONFIG = {
  /* The "Publish to web" CSV link of your Public tab (see README.txt, step 5).
     Leave empty to show the sample poems below. */
  sheetCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS44qZxrw_ab1hm1asveMD24Wd1mbZch3z3p8aBVBD11EtBmCZ0b_PolY7XCQ9zpgIaHaoaDo2Uuya3/pub?gid=354856485&single=true&output=csv",

  /* Your Google Form's link, ending in /viewform (README.txt, step 7). */
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfE2Q9Z5hmomPzjHa5MCfhGa8GeExlbuMtiPM_R9scjo2fakA/viewform",

  /* The code Google gives the "Parent" question in a pre-filled link,
     which looks like entry.123456789 */
  formParentField: "entry.1286733289"
};

/* Sample poems so you can see the site working. They disappear
   automatically once sheetCsvUrl is set and the sheet has rows. */
const SAMPLE_POEMS = [
  {id:"0", parent:"", title:"First Light", author:"The Editor",
   poem:"The kettle ticks before it sings,\nthe window pales from grey to gold.\nSome mornings begin by asking\nonly to be held.",
   rule:"Write a poem of four lines that begins with a sound."},
  {id:"0.0", parent:"0", title:"Tap, Tap", author:"A. Reader",
   poem:"Tap, tap, the rain on the tin\nlike a neighbor who wants to come in.\nI leave the latch undone\nand let the weather in.",
   rule:"Write a poem in which the weather is a visitor."},
  {id:"0.1", parent:"0", title:"Bell", author:"B. Writer",
   poem:"One bell across the harbor,\nthen the fog takes up the tune.\nThe boats lean in to listen\nlike children in a room.",
   rule:"Write a poem set at a harbor, with no verbs in the last line."},
  {id:"0.0.0", parent:"0.0", title:"Guest", author:"C. Poet",
   poem:"He stands there in his dripping coat\nand never says his name.\nWe share the bread, we share the light,\nthe storm is all the same.",
   rule:"Write a poem that ends on a question."}
];
