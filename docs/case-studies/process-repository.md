---
description: Case study – documenting seven end-to-end process streams and nine enterprise applications as structured Confluence repositories used for reviews, UAT and onboarding.
---

# Case study: Building a process documentation repository

!!! abstract "60-second summary"
    - **Problem:** knowledge about how the business applications worked together was spread across people, decks, tickets and old pages.
    - **My role:** planned the structure, wrote the content with SMEs and organised it into a searchable hub.
    - **Approach:** mapped the process streams, designed one information architecture, built reusable templates and reviewed every page with SMEs.
    - **Outcome:** **7 end-to-end process streams**, each with its own Confluence repository, and **9 applications** documented – one place per stream for reviews, UAT, onboarding and knowledge transfer.

!!! info "About this case study"
    Describes my approach on a real project. Internal content, names and screenshots are left out for confidentiality.

## At a glance

| Item | Details |
|---|---|
| **Role** | Content Developer, Business Applications team |
| **Applications** | Salesforce, NetSuite, Boomi, Zuora, RevPro, Coupa, Workday, Kinaxis, Kantata |
| **Tools** | Confluence, Jira, Lucidchart |
| **Audience** | Business analysts, developers, delivery teams, new joiners |

## The problem

Knowledge about how the business applications worked together was spread across people, slide decks, tickets and old pages. Analysts and developers spent time asking around to understand a process before they could review a change, test it or onboard someone new.

## My role

I owned the repository's structure and content: mapping the streams, designing the page hierarchy and templates, writing the pages with SMEs and keeping them organised.

## My approach

### 1. Mapped the landscape

I listed the end-to-end process streams the team supported – Campaign-to-Order (hardware and software), Quote-to-Cash, Order-to-Cash, Sales Order Management, Order Fulfilment, Hire-to-Retire and Issue-to-Resolution – and the applications and integrations involved in each, including Salesforce–NetSuite integration logic for account updates, exchange rates, credit evaluation and delivery orders.

### 2. Designed the information architecture

I set up a Confluence structure organized by process stream, with a consistent hierarchy:

```text
Business Applications (space home)
├── Process streams
│   ├── Quote-to-Cash
│   │   ├── Process overview & flow
│   │   ├── Systems & integrations
│   │   └── Runbooks / FAQs
│   ├── Order-to-Cash
│   └── ...
├── Applications
│   ├── Salesforce
│   ├── NetSuite
│   └── ...
└── Templates & guidelines
```

### 3. Created reusable templates

Every process page followed the same template – overview, scope, process flow, roles, systems, integrations and related documents – so readers always knew where to look.

### 4. Worked with subject matter experts

I gathered requirements and reviewed drafts with analysts, developers and process owners, tracking each piece of work through Jira tickets linked to the Confluence pages.

### 5. Prepared content for AI search

I wrote pages so that they work for both people and AI search – one topic per page, descriptive headings and consistent terminology. This later became the foundation for an [AI knowledge agent](ai-agent.md).

## The outcome

- **7** process streams, each with a dedicated Confluence repository covering the process, applications and integrations
- **9** enterprise applications documented end to end
- Application and stream pages – including the QA and Streams sections – organised into one structured, searchable knowledge hub
- Used by business analysts, developers and testers for reviews, UAT, onboarding and knowledge transfer
- A repeatable template and structure for adding new processes

## What I'd do next

- Add page owners and review dates to every page, with a quarterly review cycle
- Use page analytics and search terms with no results to find gaps

## What I'd highlight

Good documentation is mostly **information architecture**. Once the structure and templates were right, each new page was faster to write and easier to find.

## Related documents

- [Plan-to-Implement process](../streams/plan-to-implement.md)
- [Order-to-Cash process](../samples/order-to-cash.md)
- [Case study – Creating and training an AI knowledge agent](ai-agent.md)
