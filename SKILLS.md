
## 🔁 **Pull Request Negotiations & Code Review Best Practices**

### ✅ Best Practices:

* **Review with empathy**: Focus on the code, not the coder.
* **Give constructive, actionable feedback**.
* **Ask questions rather than make demands**:
  *“What was your thinking behind this approach?”*
* **Follow a checklist**: architecture, readability, test coverage, performance, security.
* **Praise good work** too — not just criticisms.
* **Small, atomic PRs** are easier to review and merge.

### 🔒 Preventing Conflicts During Review:

* Establish **team-wide code style guidelines** (e.g., ESLint, Prettier).
* Use tools like **Husky**, **lint-staged**, **CI checks** to enforce quality before review.
* Agree on **what is subjective and what is not** (e.g., naming vs. architectural anti-patterns).
* Rotate reviewers to avoid personality conflicts.

---

## 🤝 **Disagreement During Code Review: How to Handle**

* **Listen first**: Clarify their rationale before pushing your own.
* **Support your view with references**: links to MDN, Angular docs, OWASP, performance benchmarks.
* **Propose alternatives** instead of blocking:
  *“I suggest this approach due to X; if you prefer another way, can we test both or benchmark?”*
* If unresolved, **escalate respectfully** to a team lead or architect to make the final call.
* Keep discussion **in the thread**, not personal — **focus on the outcome**.

---

## 🧑‍💼 **Customer Communication Best Practices**

* Communicate in **clear, concise, non-technical** language (unless speaking to a technical stakeholder).
* Always **confirm understanding**:
  *“Just to clarify, you want the report filtered by department, right?”*
* Use **status updates** (e.g., "Today we finished X, tomorrow we plan Y").
* Be **proactive, not reactive** — inform about blockers before they become critical.
* Keep a **traceable record** (e.g., emails, meeting notes, Jira).

---

## 😡 **Dealing with Angry Customers**

1. **Stay calm and professional**.
2. Acknowledge their frustration without blaming:
   *“I understand how frustrating that must be.”*
3. Focus on **solutions, not excuses**.
4. Clearly state what steps you're taking and **timeline for follow-up**.
5. Escalate internally if it's beyond your control.

---

## 📅 **Customer Adding Tasks Mid-Sprint (Scope Creep)**

### How to Respond:

* Acknowledge request and **thank them for input**.
* Politely explain the impact:
  *“To maintain sprint goals, we’ll need to either postpone another task or move this to the next sprint.”*
* Offer compromise:
  *“We can fit this in if we drop X, or implement MVP version now and complete next sprint.”*
* If pressure persists: escalate to **Product Owner or Scrum Master**.

---

## 🔺 **How to Escalate Problems to Customer**

* First try solving within the team.
* If unresolved:

  * Document the problem clearly: what, when, impact.
  * Offer options or proposals.
  * Keep tone neutral and fact-based.
  * Use escalation matrix: e.g., Dev → PM → Account Manager → Client Stakeholder.

---

## 🛠️ **Escalation Principle (Problem Solving)**

* **Solve at the lowest level possible**.
* Escalate only when:

  * Blocking issue
  * Exceeds time/cost constraints
  * Conflict of priorities or unclear decision authority
* Follow structured communication:

  * What is the issue?
  * What was tried?
  * What decision is needed?

---

## 🎯 **How Do You Prepare for Project Interviews?**

* Research the **business domain**, product, and industry.
* Clarify the **role expectations** and **stack**.
* Prepare **key architecture patterns** relevant to the project.
* Review your past **similar project experience** to draw examples from.
* Have **questions prepared** (e.g., about team setup, release process, communication tools).
* Prepare **demo environments** or **code samples** if asked.

---

## 📧 **Email Correspondence Best Practices**

* Use **clear subject lines**.
* Keep emails **brief and structured** (Intro, Body, Next Steps).
* Use bullet points for clarity.
* Avoid slang and emoji in formal communication.
* Always **proofread** for clarity and professionalism.
* Use CC/BCC wisely (e.g., don’t CC everyone unnecessarily).

---

## 🕒 **Time Management Techniques**

### 1. **Pomodoro Technique**

* Work for 25 mins, break for 5.
* After 4 cycles, take a longer 15–30 min break.
* Prevents burnout, enhances focus.

### 2. **Time Blocking**

* Reserve calendar slots for coding, meetings, reviews.
* Helps avoid context-switching.

### 3. **Eisenhower Matrix**

* Categorize tasks as:
  Urgent + Important → Do
  Important, Not Urgent → Schedule
  Urgent, Not Important → Delegate
  Not Urgent, Not Important → Eliminate

### 4. **Task Batching**

* Group similar tasks (e.g., PR reviews, testing) and do them together.

### 5. **80/20 Rule (Pareto)**

* Identify 20% of tasks that yield 80% of value.

---

## 🤜🤛 **Conflict with Customer-Side Developer**

* Stay **professional and solution-focused**.
* Try to understand their **constraints, pressures, or cultural context**.
* Escalate only if:

  * Deadlock affects deliverables.
  * There’s repeated hostility or sabotage.
* Always involve **team leads or PMs** early.
* Propose written documentation to align on decisions.
