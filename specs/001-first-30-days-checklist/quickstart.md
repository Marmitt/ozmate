# Quickstart: Validating the First 30 Days Checklist

## Prerequisites

- Project scaffold installed (`package.json`, Next.js app present — see plan.md's note on bootstrap scope).
- Dependencies installed: `npm install`.
- Dev server runnable: `npm run dev`, then open `http://localhost:3000/start`.

## Automated checks

```bash
npm run test        # Vitest + React Testing Library: storage module + checklist component logic
npm run typecheck    # or: npx tsc --noEmit
npm run lint
```

Expect all three to pass before manual validation.

## Manual validation scenarios

Run these against the running dev server. Use browser devtools' responsive mode set to ~380px width unless noted.

1. **Fresh load (User Story 1)**
   - Clear the `ozmate.checklist.v1` key in devtools → Application → Local Storage (or use a fresh private window).
   - Load `/start`. Confirm: items are grouped under visible theme headings in a stable order, every item shows a title + detail, all checkboxes are unchecked.

2. **Toggle + persistence (User Story 2)**
   - Check 2-3 items across different groups. Confirm each flips to checked immediately.
   - Reload the page. Confirm the same items remain checked, all others unchecked.
   - Fully close and reopen the browser (not just the tab), navigate back to `/start`. Confirm state still matches.
   - Uncheck one previously-checked item. Reload. Confirm it now shows unchecked.

3. **Storage unavailable (User Story 2, edge case)**
   - Open `/start` in a private/incognito window with storage blocked (or simulate via devtools storage override, if available).
   - Toggle an item. Confirm it visually updates with no thrown error or broken UI, even though it won't survive a reload.

4. **Progress summary (User Story 3)**
   - With all items unchecked, confirm the progress summary reads 0 of N.
   - Toggle items one at a time; confirm the summary updates immediately after each toggle.
   - Check every remaining item. Confirm a distinct "all done" acknowledgment appears (not just "N of N").

5. **Deep link (User Story 4)**
   - Tap an item that has a `link` (an external/official resource per the placeholder dataset). Confirm it navigates correctly (opens the destination).
   - Return to `/start` (back button). Confirm checked state and group layout are unaffected.
   - Tap an item with no `link` configured. Confirm only its detail/explanation is shown and no navigation is attempted.

6. **Stale id handling (edge case)**
   - In devtools, manually add an extra id to the stored `ozmate.checklist.v1` JSON blob that doesn't correspond to any current item (e.g. `"some-removed-item": true`).
   - Reload `/start`. Confirm no error occurs and the progress count is unaffected by the unknown id.

7. **Mobile layout (SC-003)**
   - At ~380px width, confirm no horizontal scrollbar appears and no text is clipped, across every group.
   - Spot-check a long title/detail string (temporarily edit test data if needed) to confirm text wraps rather than truncating.

8. **Offline shell (project-wide PWA requirement)**
   - Visit `/start` once online (so it's cached by the PWA service worker).
   - Go offline (devtools → Network → Offline) and reload `/start`. Confirm the page still renders from the offline shell.

## Expected outcome

All 8 scenarios pass without console errors. This satisfies spec.md's acceptance scenarios and success criteria SC-001 through SC-005 for the mechanism-only v1 scope (placeholder content, per FR-014).
