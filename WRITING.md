# Blog Writing Guide

How to write and publish blog posts on this site.

---

## Workflow

```
1. Create a .mdx file in /content/blog/
2. Write content using Markdown + MDX
3. git commit && git push
4. Vercel auto-deploys → post goes live
```

---

## File Naming

Use lowercase, hyphen-separated filenames. The filename becomes the URL slug.

```
content/blog/raft-consensus-explained.mdx   → /blog/raft-consensus-explained
content/blog/kafka-retry-patterns.mdx       → /blog/kafka-retry-patterns
content/blog/service-mesh-tradeoffs.mdx     → /blog/service-mesh-tradeoffs
```

---

## Frontmatter (Required)

Every post must start with this YAML block:

```yaml
---
title: "Your Post Title"
description: "One or two sentence summary shown in the listing and SEO."
date: "2026-03-15"
tags: ["distributed systems", "kafka", "architecture"]
---
```

| Field         | Required | Description                                    |
|---------------|----------|------------------------------------------------|
| `title`       | Yes      | Displayed as the H1 and in the listing         |
| `description` | Yes      | Shown in listing and used as SEO description   |
| `date`        | Yes      | Format: `YYYY-MM-DD`. Used for sorting.        |
| `tags`        | No       | Array of strings. Shown as pill tags.          |

---

## Writing Content

Everything after the frontmatter is Markdown (MDX superset).

### Headings

```markdown
## Section Heading       ← appears in Table of Contents
### Subsection           ← appears in Table of Contents
#### Minor heading       ← appears in Table of Contents
```

H2–H4 headings are automatically extracted and shown in the Table of Contents sidebar on desktop.

### Code Blocks

Fenced code blocks with a language identifier get syntax highlighting:

````markdown
```go
func main() {
    fmt.Println("hello")
}
```

```java
public static void main(String[] args) {
    System.out.println("hello");
}
```

```bash
kafka-topics.sh --create --topic payments --partitions 6
```
````

Supported languages: `go`, `java`, `ts`, `tsx`, `js`, `json`, `bash`, `yaml`, `sql`, `python`, and more.

To add a filename label above the code block:

````markdown
```go title="coordinator.go"
// your code
```
````

### Images

Place images in `/public/images/` and reference them:

```markdown
![Raft leader election diagram](/images/raft-election.png)
```

The alt text is shown as a caption below the image.

### Callout Boxes

Use the `<Callout>` component for notes, warnings, and tips:

```mdx
<Callout type="note">
  This is a note — extra context that is helpful but not critical.
</Callout>

<Callout type="warning">
  This is a warning — something the reader should be careful about.
</Callout>

<Callout type="tip">
  This is a tip — a shortcut or best practice.
</Callout>
```

### Links

Internal links use Next.js routing automatically:

```markdown
[About page](/about)
[Another post](/blog/kafka-architecture-deep-dive)
```

External links open in a new tab automatically:

```markdown
[Raft paper](https://raft.github.io/raft.pdf)
```

### Horizontal Rules

```markdown
---
```

---

## Example Post Template

```mdx
---
title: "Understanding Temporal Workflows"
description: "How Temporal handles long-running workflows with durable execution, retries, and saga patterns."
date: "2026-04-01"
tags: ["temporal", "distributed systems", "workflows"]
---

Temporal is a workflow orchestration platform that provides durable execution
guarantees. Unlike message queues, Temporal persists the full workflow state,
so a workflow can survive process restarts, network failures, and infrastructure
outages.

## What Problem Temporal Solves

Traditional approaches to long-running processes rely on:

- Cron jobs + database state
- Message queues + consumer retry logic
- Manual saga implementations

All of these push the complexity of failure handling onto the application.
Temporal moves it into the platform.

## Core Concepts

### Workflows

A workflow is a durable function:

```go
func PaymentWorkflow(ctx workflow.Context, req PaymentRequest) error {
    // This function can pause, resume, retry — Temporal handles it
    err := workflow.ExecuteActivity(ctx, ChargeCard, req).Get(ctx, nil)
    if err != nil {
        return workflow.ExecuteActivity(ctx, RefundCard, req).Get(ctx, nil)
    }
    return workflow.ExecuteActivity(ctx, SendReceipt, req).Get(ctx, nil)
}
```

### Activities

Activities are the actual work units — external calls, database writes, etc.

<Callout type="note">
  Activities are retried automatically on failure. Workflows are not retried —
  they resume from the last successful activity.
</Callout>

## When to Use Temporal

Use Temporal when:
- A business process spans multiple services and takes more than a few seconds
- You need guaranteed execution even across deployments
- Saga/compensation logic is getting complex
```

---

## Post Goes Live After Push

```bash
git add content/blog/your-post.mdx
git commit -m "blog: add temporal workflows post"
git push
```

Vercel will trigger a rebuild. The post appears at `/blog/your-post` within ~1 minute.
