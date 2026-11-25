/* ------------------------------------------------------------------
   SETTINGS: the only file you need to edit to connect your site.
   ------------------------------------------------------------------ */
const CONFIG = {
  /* The "Publish to web" CSV link of your Public tab (see README.txt, step 5).
     Leave empty to show the sample poems below. */
  sheetCsvUrl: "",

  /* Your Google Form's link, ending in /viewform (README.txt, step 7). */
  formUrl: "",

  /* The code Google gives the "Parent" question in a pre-filled link,
     which looks like entry.123456789 */
  formParentField: ""
};

/* Sample poems so you can see the site working. They disappear
   automatically once sheetCsvUrl is set and the sheet has rows. */
const SAMPLE_POEMS = [
  {id:"1", parent:"", title:"First Light", author:"The Editor",
   poem:"The kettle ticks before it sings,\nthe window pales from grey to gold.\nSome mornings begin by asking\nonly to be held.",
   rule:"Write a poem of four lines that begins with a sound."},
  {id:"2", parent:"1", title:"Tap, Tap", author:"A. Reader",
   poem:"Tap, tap, the rain on the tin\nlike a neighbor who wants to come in.\nI leave the latch undone\nand let the weather in.",
   rule:"Write a poem in which the weather is a visitor."},
  {id:"3", parent:"1", title:"Bell", author:"B. Writer",
   poem:"One bell across the harbor,\nthen the fog takes up the tune.\nThe boats lean in to listen\nlike children in a room.",
   rule:"Write a poem set at a harbor, with no verbs in the last line."},
  {id:"4", parent:"2", title:"Guest", author:"C. Poet",
   poem:"He stands there in his dripping coat\nand never says his name.\nWe share the bread, we share the light,\nthe storm is all the same.",
   rule:"Write a poem that ends on a question."}
];
