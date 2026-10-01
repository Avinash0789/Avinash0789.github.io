# Case study: Building a process documentation repository

!!! info "About this case study"
    Describes my approach on a real project. Internal content, names and screenshots are left out for confidentiality.

## At a glance

| Item | Details |
|---|---|
| **Role** | Technical Content Developer, G&A IT Business Systems team |
| **Applications** | Salesforce, NetSuite, Boomi, Zuora, RevPro, Coupa, Workday |
| **Tools** | Confluence, Jira |
| **Audience** | Business analysts, developers, delivery teams, new joiners |

## The problem

Knowledge about how the business applications worked together was spread across people, slide decks, tickets and old pages. Analysts and developers spent time asking around to understand a process before they could review a change, test it or onboard someone new.

## My approach

### 1. Mapped the landscape

I listed the end-to-end process streams the team supported – including Campaign-to-Order, Quote-to-Cash, Order-to-Cash, Procure-to-Pay, Plan-to-Produce, Issue-to-Resolution and HR processes – and the applications and integrations involved in each.

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

- A single, structured repository for the team's process documentation
- Used by analysts and developers for reviews, UAT and onboarding
- A repeatable template and structure for adding new processes

## What I'd highlight

Good documentation is mostly **information architecture**. Once the structure and templates were right, each new page was faster to write and easier to find.
