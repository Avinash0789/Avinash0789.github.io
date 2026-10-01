---
description: A before-and-after editing sample – an SME's rough notes rewritten into a clear, task-based procedure, with notes on every change.
---

# Before and after: editing an SME draft

!!! info "Editing sample"
    This shows how I turn a subject matter expert's rough notes into documentation people can follow. The content is generic and mirrors the kind of drafts I receive at work; no internal material is used.

**The brief:** an integration developer sent notes on how to fix orders that fail to sync from the CRM to the ERP. Sales operations users needed to follow them on their own, without asking the integration team.

=== "Before – SME draft"

    > **Re: sync errors**
    >
    > so basically when the order doesnt go to netsuite its usually because of the boomi process failing. you need to check the process reporting in boomi and look at the error, most of the time its the customer not existing in NS or the subsidiary being wrong or currency mismatch. if its customer then the account sync didnt run so trigger that first (or ask us). subsidiary needs to be fixed on the SF account by sales ops, then re-trigger. Currency – the price book currency must match the account currency otherwise it fails. To retrigger you can uncheck and check the Ready to Sync flag on the order and save, it will be picked up in the next run (every 15 min). dont create the SO manually in NS!! it causes duplicates. if still failing after 2 tries raise a jira in the INT project with the order number + error screenshot.

=== "After – my rewrite"

    ## Fix an order that didn't sync to the ERP

    Use this procedure when a **Closed Won** order in the CRM has no matching sales order in the ERP after 30 minutes.

    **Who can do this:** Sales operations users with edit access to accounts and orders.

    !!! warning "Don't create the sales order manually in the ERP"
        The next sync run creates a second sales order, and both orders get invoiced.

    ### 1. Find the error

    1. In the integration platform, open **Process reporting**.
    2. Search for the order number.
    3. Open the failed run and note the error message.

    ### 2. Fix the cause

    | Error message contains | Cause | Fix |
    |---|---|---|
    | `Customer not found` | The account hasn't synced to the ERP yet | Ask the integration team to run the account sync, then go to step 3 |
    | `Invalid subsidiary` | The account has the wrong subsidiary | Correct the **Subsidiary** field on the CRM account |
    | `Currency mismatch` | The price book currency doesn't match the account currency | Change the order's price book to one in the account's currency |

    ### 3. Send the order again

    1. Open the order in the CRM.
    2. Clear the **Ready to Sync** checkbox and select **Save**.
    3. Select the **Ready to Sync** checkbox again and select **Save**.

    The order syncs in the next run. Runs happen every 15 minutes.

    ### If it still fails

    If the order fails twice, raise a Jira ticket in the **Integration (INT)** project. Include:

    - the order number
    - the error message from the failed run

## What I changed and why

| Change | Why it matters |
|---|---|
| Wrote a task-based title: **Fix an order that didn't sync to the ERP** | Readers search for the problem they have, not the system that caused it |
| Added *when to use this* and *who can do this* | Readers know straight away whether the page applies to them |
| Moved the "don't create it manually" rule to the top as a warning, with the consequence | In the draft, the most important rule was buried near the end |
| Turned the three causes into an error → cause → fix table | Readers scan for their error message instead of reading a paragraph |
| Split re-triggering into numbered steps with exact UI labels | "Uncheck and check the flag" becomes something anyone can follow |
| Removed "(or ask us)" and named the escalation path | One clear route instead of informal requests to the developer |
| Replaced the screenshot request with the error text | Text is searchable, works for AI search and doesn't go stale |

## How I validate drafts like this

- Walk through the steps with the SME to check accuracy
- Ask someone from the target audience to follow the page on a test record without help
- File the page in the right section and link it from the parent process – here, [Order-to-Cash](order-to-cash.md)
