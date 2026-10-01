---
description: UX writing sample – error messages, empty states, confirmations and onboarding tooltips for a SaaS CRM, rewritten with the reasoning behind each change.
---

# UX writing: microcopy for a SaaS CRM

!!! info "Writing sample"
    Shows how I write interface text. The product is fictional and based on the kind of in-app help, tooltips and onboarding content I wrote for a SaaS CRM for insurance agencies.

**Principles I follow:** say what happened, say what to do next, use the user's words, and keep it short enough to read in one glance.

## Error messages

| Before | After | Why |
|---|---|---|
| Error 422: Unprocessable entity | **We couldn't save this client.** Add an email address or phone number, then try again. | Says what failed and how to fix it; hides the status code |
| Import failed. | **12 of 240 rows weren't imported.** Download the error report to see which rows need fixing. | Shows the scale of the problem and gives a next step |
| Invalid date | Enter the renewal date as DD/MM/YYYY. | Tells the user the expected format instead of blaming them |
| Session expired. Please login again. | **You've been signed out** to keep your account secure. Sign in again to continue – your draft is saved. | Explains why and reassures the user that work isn't lost |

## Empty states

| Screen | Copy |
|---|---|
| **Clients (no clients yet)** | **Add your first client.** Import a spreadsheet or add clients one at a time. *Buttons:* Import clients · Add client |
| **Tasks (all done)** | **You're all caught up.** New renewal and follow-up tasks will appear here. |
| **Search (no results)** | **No clients match "Sharma Insurance".** Check the spelling or search by email or policy number. |

## Confirmations

| Before | After | Why |
|---|---|---|
| Are you sure? *OK / Cancel* | **Delete 3 policies?** This can't be undone. *Buttons:* Delete policies · Keep policies | States the action and its consequence; buttons describe the outcome |
| Success! | **Renewal reminder scheduled** for 14 Oct, 9:00 AM. | Confirms exactly what happened |

## Onboarding tooltips

1. **Your pipeline at a glance** – Each column is a stage. Drag a policy card to move it forward.
2. **Never miss a renewal** – We'll remind you 30 days before a policy expires. Change this in Settings > Reminders.
3. **Talk to clients from here** – Emails you send from a client record are saved to their timeline automatically.

## Voice and terminology

| Use | Don't use | Reason |
|---|---|---|
| Sign in | Log in, login | One term everywhere |
| Client | Customer, contact, insured | Matches how agencies talk |
| Select | Click | Works for touch, mouse and keyboard |
| Can't, we'll, you're | Cannot, we will | Friendlier and easier to scan |

## Related documents

- [Knowledge base article – Importing clients from a spreadsheet](kb-article.md)
- [Release notes](release-notes.md)
