# Collaboration and Organizations

This specification details the user accounts, organizational hierarchies, sharing permission levels, and collaboration models of the **Timelines** application.

---

## 1. Identity and Tenant Structure

The system supports two main types of account tenants: **Individual Users** and **Organizations**.

### Individual Users
- Standard personal accounts.
- Direct ownership of timelines and events.
- Ability to share specific timelines with other individual users via email or username.

### Organizations
An **Organization** represents a collection of users working within a shared workspace (e.g., a school, a classroom, a historical society, or a corporate research group).
- **Workspace Isolation**: Organizations have their own workspace libraries.
- **SSO Integration**: Organizations can enforce Single Sign-On (SSO) via standard protocols (OIDC, SAML).
  - *Education Exemption*: SSO integrations are free for recognized academic institutions (schools, universities).
  - *Enterprise / Commercial*: SSO is a premium feature for businesses.

---

## 2. Roles and Permissions

Within an Organization, members are assigned roles that determine their level of access to organizational timelines, shared events, and settings.

| Role | Permissions |
|:---|:---|
| **Owner** | Full workspace management, billing control, SSO configurations, and deletion capabilities. |
| **Admin** | Manage users/members, change member roles, create/delete all timelines in the organization. |
| **Editor / Contributor** | Create, edit, and delete events. Create new timelines and add events to them. |
| **Viewer / Reader** | Read-only access to organization timelines. Cannot add/modify events. |

---

## 3. Classroom Workflows (Educational Features)

To support classroom usage (e.g., a history teacher and 30 students):
- **Assignment Timelines**: A teacher (Admin/Editor) can create a timeline template containing "Blank Nodes" (e.g., placeholders indicating "Find the battle that occurred on this date and fill in the details").
- **Student Submissions**: Students work on their copy of the timeline. They submit their timeline to the teacher.
- **Review Drawer**: The teacher's view of the timeline displays a comparison between the student's submission and the template key, allowing quick evaluation of event accuracy.

---

## 4. Creative Expansions

### A. Timeline Forking and Pull Requests (Merge Proposals)
Similar to version control systems like Git, timelines can support **Forking**:
- **Forking**: A user can click "Fork" on any public timeline (e.g., "History of Space Flight"). This copies the timeline structure and links to their personal workspace. They can then add, remove, or edit events.
- **Merge Proposals (Pull Requests)**: If a user improves a forked timeline (e.g., correcting a date or adding a missing event), they can submit a **Timeline Merge Proposal** back to the original author.
- The original author receives a diff view showing:
  - *Green (Added events)*
  - *Red (Removed events)*
  - *Yellow (Modified dates/descriptions)*
- The author can click "Accept" to merge those changes back into the master timeline, crowdsourcing historical accuracy.

```
[Master Timeline] <-------- (Merge Proposal) -------- [Forked Timeline]
      |                                                    ^
      +--------------------- (Fork) -----------------------+
```

### B. Real-Time Collaborative Presence ("Multiplayer")
- **Live Cursors**: When multiple editors are working on a timeline concurrently, they can see each other's mouse cursor positions or active nodes in real-time.
- **Conflict Resolution (Locks)**: To avoid duplicate editing conflicts, clicking "Edit" on an Event node locks that event for other users in the organization for a brief window, showing a lock icon (e.g., "Ms. Smith is editing this event").
- **Live Chat / Sticky Notes**: Collaborators can place virtual "Sticky Notes" at specific dates on the timeline to discuss placement (e.g., "Should we move this event back to 1492 or keep it at 1493?").
