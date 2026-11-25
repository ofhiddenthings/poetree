POEM TREE: SETUP

FILES
  index.html   the tree (one box per poem, arrows to the poems that follow)
  poem.html    one poem, its rules, and the submission form
  style.css    all the styling
  config.js    your settings (sheet link, form link)
  data.js      reads the sheet, you don't need to edit it
  fonts/       put Inter.woff2 here (optional)

TRY IT NOW
  Open this folder with a local server (see below) or upload it to GitHub Pages.
  Sample poems appear until you connect your own sheet.

  Local server: in a terminal, from this folder, run
    python3 -m http.server 8000
  then open http://localhost:8000

CONNECT YOUR OWN POEMS
 1. Create a Google Form with these questions, in this order, all "Short answer"
    or "Paragraph": Title, Poem, Author, Rule, Parent.
 2. In the form's Responses tab, click the Sheets icon to create the sheet.
 3. In that sheet (tab "Form responses 1", rename it to Responses), the columns
    are A Timestamp, B Title, C Poem, D Author, E Rule, F Parent.
    Add G1 = id and H1 = approved.
    In G2 put:  =ARRAYFORMULA(IF(B2:B="","",ROW(B2:B)-1))
 4. Add your first poem as row 2 yourself (leave Parent empty, type yes in H2).
    Each approved poem's Parent is the id number of the poem it follows.
 5. Add a tab called Public. In A1:F1 type: id, title, poem, author, rule, parent
    In A2 put:
    =FILTER({Responses!G2:G, Responses!B2:B, Responses!C2:C, Responses!D2:D, Responses!E2:E, Responses!F2:F}, Responses!H2:H="yes")
    Then File > Share > Publish to web, choose the Public tab and CSV format,
    and copy the link into sheetCsvUrl in config.js. Never publish the
    Responses tab.
 6. To approve a poem: read it in Responses, fix typos there if you like,
    and type yes in column H. It appears on the tree after a few minutes.
 7. In the form, use the three-dot menu > Get pre-filled link. Type 123 in the
    Parent question, click Get link, and copy the link. It contains
    entry.NUMBERS=123. Put the part before ?, ending in /viewform, into formUrl,
    and the entry.NUMBERS part into formParentField in config.js.

Google can change its menus, so follow its current screens if they differ.
