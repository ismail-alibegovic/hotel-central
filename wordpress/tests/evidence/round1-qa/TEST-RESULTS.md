# Test results — 13–14 Nov 2026 (local, disposable SQLite database)

## tests/elementor-all.js (Administrator, all 22 pages EN+BS: open in Elementor, edit, save, check live, restore)
    PASS #83 /home: editor opened (138 elements), edit saved=true, restored=true
    PASS #87 /home: editor opened (138 elements), edit saved=true, restored=true
    PASS #102 /about: editor opened (93 elements), edit saved=true, restored=true
    PASS #106 /about: editor opened (93 elements), edit saved=true, restored=true
    PASS #111 /rooms: editor opened (21 elements), edit saved=true, restored=true
    PASS #115 /rooms: editor opened (21 elements), edit saved=true, restored=true
    PASS #148 /cafe: editor opened (67 elements), edit saved=true, restored=true
    PASS #152 /cafe: editor opened (67 elements), edit saved=true, restored=true
    PASS #166 /conference: editor opened (85 elements), edit saved=true, restored=true
    PASS #170 /conference: editor opened (85 elements), edit saved=true, restored=true
    PASS #177 /location: editor opened (63 elements), edit saved=true, restored=true
    PASS #181 /location: editor opened (63 elements), edit saved=true, restored=true
    PASS #185 /contact: editor opened (34 elements), edit saved=true, restored=true
    PASS #189 /contact: editor opened (34 elements), edit saved=true, restored=true
    PASS #316 /centralfitnessclub: editor opened (84 elements), edit saved=true, restored=true
    PASS #327 /centralfitnessclub: editor opened (84 elements), edit saved=true, restored=true
    PASS #331 /membership: editor opened (34 elements), edit saved=true, restored=true
    PASS #335 /membership: editor opened (34 elements), edit saved=true, restored=true
    PASS #339 /timetable: editor opened (28 elements), edit saved=true, restored=true
    PASS #343 /timetable: editor opened (28 elements), edit saved=true, restored=true
    PASS #353 /dayspa: editor opened (301 elements), edit saved=true, restored=true
    PASS #363 /dayspa: editor opened (301 elements), edit saved=true, restored=true
    PASS slugs unchanged after saving in Elementor
22/22 pages opened, edited, saved and restored

## tests/mobile.js (iPhone 13 emulation)
    PASS menu open (aria-expanded)
    PASS 11 menu links (8 pages + 3 sub-pages of the approved sitemap), all ≥ 40px tall — [40,40,40,40,40,40,40,40,40,40,40]
    PASS page scroll locked while menu open
    PASS language switch + Book now reachable in menu
    PASS menu link navigates (Central Fitness Club)
    PASS language switch from menu keeps page (EN → BS Fitness Club)
    PASS dates panel is a full-width bottom sheet — [0,390,844,844,"fixed"]
    PASS one month shown on mobile
    PASS calendar day tap target ≥ 40px — 44px
    PASS range selected → nights
    PASS guests panel opens after Done, steppers work
    PASS scrim tap closes sheet
    FAIL Let's go opens the eZee booking engine in a new tab
    PASS eZee fields carried — {"eZ_chkin":"14-11-2026","eZ_chkout":"17-11-2026","eZ_Nights":"3","eZ_adult":"3","eZ_child":"1","eZ_room":"1","calformat":"dd-mm-yy","hidBodyLanguage":"en"}
    PASS Let's go without dates opens the calendar with a hint
    PASS book bar hidden at top
    PASS book bar appears after scrolling past the hero
    PASS book bar has tel: link and booking link
    PASS book bar hides near the footer
    PASS no horizontal scroll
    PASS no JS errors

## tests/round1-editor.js (Editor role) — see ../round1-editor/RESULT.txt
page errors: Cannot read properties of undefined (reading 'hasClass')
