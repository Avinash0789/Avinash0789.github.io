---
description: Case study – configuring and training a Glean AI agent on structured process documentation so business teams get source-based answers.
---

# Case study: Creating and training an AI knowledge agent

!!! abstract "60-second summary"
    - **Problem:** business users spent time hunting for answers about applications and processes, and answers weren't always consistent.
    - **My role:** configured, trained and tested the agent, and improved the documentation behind it.
    - **Approach:** defined scope, connected only trusted sources, wrote agent instructions, tested with real questions and fixed weak content.
    - **Outcome:** teams ask a process question in plain language and get a clear answer with a link to the source page.

!!! info "About this case study"
    Describes my approach on a real project. Internal content, names and screenshots are left out for confidentiality.

## At a glance

| Item | Details |
|---|---|
| **Role** | Content Developer, Business Applications team |
| **Platform** | Glean (enterprise AI search and agents) |
| **Knowledge domain** | Salesforce, NetSuite, Boomi and the business workflows that connect them |
| **Users** | Delivery teams and business users |

## The problem

Delivery teams and business users regularly needed quick answers about how the business applications and processes worked. Finding the right page – or the right person – took time, and answers weren't always consistent.

## My role

I owned the agent end to end – scoping it with stakeholders, configuring it, curating its sources, testing it and improving the documentation it learns from.

## My approach

### 1. Defined the agent's purpose

I agreed with stakeholders on who the agent was for, what questions it should answer, and what was out of scope.

### 2. Connected the right sources

I connected the agent to the curated documentation repository and other approved sources, and left out drafts and outdated content so answers came from trusted pages.

### 3. Wrote the agent instructions

I configured the agent's instructions – audience, tone, scope, and rules such as *always cite the source page* and *say when no source covers the question*.

### 4. Trained and tested it

I tested the agent with real questions from users, reviewed the answers against the source documentation, and improved both the instructions and the underlying pages where answers were weak or missing.

### 5. Rolled it out

I made the agent available to delivery teams and business users so they could get source-based answers without searching through multiple spaces.

## The outcome

- Delivery teams and business users can ask questions in plain language and get answers with links to the source documentation
- The documentation repository and the agent reinforce each other: gaps in answers show where documentation needs improving

## What I'd do next

- Track the questions the agent can't answer and turn them into a documentation backlog
- Add a regular answer-quality review with a fixed set of test questions after each major release

## What I learned

An AI agent is only as good as the content behind it. Most improvements came from **fixing and restructuring the documentation**, not from rewriting prompts. I've written up these lessons in [Writing documentation for an AI knowledge agent](../samples/ai-knowledge-base.md).

## Related documents

- [Knowledge base for an AI agent](../samples/ai-knowledge-base.md)
- [Case study – Building a process documentation repository](process-repository.md)
- [Issue-to-Resolution process](../streams/issue-to-resolution.md)
