# Pre-Launch Checklist

Things that must be resolved before OZMate goes live, tracked as they're discovered during feature work. Not a replacement for the constitution or spec docs — just a running punch list of "don't forget this before shipping."

- [ ] **Replace `hello@ozmate.app` placeholder with the real OZMate contact address** before going live. Introduced in the group directory feature (`specs/003-group-directory/`) as the `mailto:` target for the "report a dead or dodgy link" action (`ReportLinkAction` component). Until swapped, the report action points at an inbox that doesn't exist, so reports silently go nowhere.
