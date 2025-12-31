# ClassAction Admin Training Guide

Welcome to the ClassAction platform administration guide. This document explains how to manage the platform, review submissions, and maintain security.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Dashboard Overview](#dashboard-overview)
3. [Reviewing Case Submissions](#reviewing-case-submissions)
4. [Managing Service Providers](#managing-service-providers)
5. [Contract Approvals](#contract-approvals)
6. [Security & Access Control](#security--access-control)
7. [Common Scenarios](#common-scenarios)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Admin Panel

1. Navigate to `/admin` on the website
2. Enter the password (configured in Netlify dashboard)
3. You will be logged in and the controlling admin will receive an email notification

**Important**: Every admin login triggers an email to the controlling administrator for security purposes.

### First-Time Setup Checklist

- [ ] Verify your admin password is set in Netlify
- [ ] Confirm email notifications are working
- [ ] Review any pending submissions in the queue
- [ ] Familiarize yourself with the approval workflow

---

## Dashboard Overview

The admin dashboard shows:

| Section | Purpose |
|---------|---------|
| **Pending Reviews** | New submissions awaiting your review |
| **Approved Cases** | Cases that are live and accepting pledges |
| **Rejected Cases** | Cases that did not meet criteria |
| **Service Providers** | Registered law firms, investigators, etc. |
| **Contracts** | Agreements between parties pending approval |

### Status Meanings

- **PENDING**: Newly submitted, awaiting admin review
- **UNDER_REVIEW**: Admin is actively reviewing
- **APPROVED**: Passed review, now live on platform
- **REJECTED**: Did not meet criteria (reason provided to submitter)
- **ON_HOLD**: Needs additional information from submitter

---

## Reviewing Case Submissions

### What to Check

When reviewing a case submission, verify:

1. **Title**: Clear, descriptive, appropriate
2. **Summary**: Detailed enough to understand the case
3. **Jurisdiction**: Valid location with reasonable explanation
4. **Funding Goal**: Realistic amount for the case type
5. **Desired Outcome**: Clear, achievable objectives
6. **Contact Info**: Valid email and name provided

### Approval Criteria

**Approve** if:
- The case describes a legitimate legal matter
- The jurisdiction explanation is reasonable
- The funding goal is appropriate for the case type
- No prohibited content (hate speech, threats, etc.)

**Reject** if:
- The submission is spam or nonsensical
- Contains prohibited or illegal content
- Appears to be fraudulent
- Insufficient information to evaluate

### How to Approve/Reject

1. Click on a pending submission
2. Review all details carefully
3. Click **Approve** or **Reject**
4. If rejecting, provide a clear reason (the submitter will see this)
5. The submitter receives an email notification of the decision

### Step-by-Step: Changing Submission Status

**To move from PENDING to UNDER_REVIEW:**
1. Open the submission from the pending queue
2. Click the "Start Review" button
3. Status changes to UNDER_REVIEW (visible to submitter)

**To APPROVE a submission:**
1. While in UNDER_REVIEW status, click "Approve"
2. Confirm the approval in the popup
3. Case goes live on the platform immediately
4. Submitter receives approval email

**To REJECT a submission:**
1. While in UNDER_REVIEW status, click "Reject"
2. Enter a clear reason (required) - the submitter sees this
3. Click "Confirm Rejection"
4. Submitter receives rejection email with your reason

**To place ON_HOLD:**
1. Click "Request More Info" button
2. Enter what information you need
3. Submitter receives email with your request
4. Wait for response before final decision

**To MESSAGE a submitter:**
1. Click "Send Message" on any submission
2. Type your message
3. Submitter receives email notification
4. Their reply appears in submission history

---

## Managing Service Providers

### Provider Types

The platform supports these service provider categories:

| Type | Description |
|------|-------------|
| **Law Firms** | Licensed legal practices |
| **Private Investigators** | Licensed investigation services |
| **IT Forensics** | Digital evidence and cybersecurity experts |
| **Physical Forensics** | Physical evidence analysis |
| **Security Consultants** | Security assessment professionals |

### Onboarding Process

**All service provider registrations require manual approval.**

1. Provider submits registration with credentials
2. Submission appears in your "Service Providers" queue
3. Verify their licensing/credentials externally if needed
4. Approve or reject with reason

### Verification Checklist

Before approving a service provider:

- [ ] Verify business name matches registration
- [ ] Check for valid licensing (if applicable)
- [ ] Review website/references provided
- [ ] No red flags in online presence

---

## Contract Approvals

### What is a Contract?

A contract on the platform represents an agreement between:
- A case submitter (person needing services)
- A service provider (law firm, investigator, etc.)

**All contracts require manual approval before becoming active.**

### Contract Review Process

1. Both parties agree to terms
2. Contract is submitted for admin review
3. Review the terms for:
   - Fairness to both parties
   - Compliance with platform rules
   - Reasonable scope and pricing
4. Approve or request modifications

### Why Manual Approval?

Manual contract approval protects:
- **Users**: From predatory or unfair terms
- **Service Providers**: From unrealistic expectations
- **Platform**: From liability issues

---

## Security & Access Control

### Login Notifications

Every time an admin logs in:
1. The system records the login
2. An email is sent to the controlling administrator
3. The email includes timestamp and IP address

If you receive a notification for a login you didn't make, immediately:
1. Change the admin password in Netlify
2. Review recent admin actions for unauthorized activity
3. Contact other administrators

### Incident Response Checklist

If you suspect unauthorized access:

- [ ] **Step 1**: Change Netlify admin password immediately
- [ ] **Step 2**: Log into Netlify and review "Site settings > Access control"
- [ ] **Step 3**: Review all admin actions in the past 24-48 hours
- [ ] **Step 4**: Check for any unusual approvals/rejections
- [ ] **Step 5**: Notify the controlling administrator
- [ ] **Step 6**: Document what happened and when
- [ ] **Step 7**: If user data may be compromised, consult legal counsel

**Note for Demo Environment**: The current demo does not persist data between sessions. In production with Supabase, you would also need to review database audit logs.

### Password Security

- Admin password is set in Netlify dashboard
- Change password regularly (recommended: every 90 days)
- Never share the password via email
- Use a password manager

### Access Levels (Future)

Currently, all admins have full access. Future versions may include:
- Super Admin (full access + settings)
- Moderator (review cases only)
- Viewer (read-only access)

---

## Common Scenarios

### Scenario 1: Incomplete Submission

**Situation**: A case submission is missing important details.

**Action**:
1. Set status to "ON_HOLD"
2. Send message to submitter requesting additional information
3. Wait for response before making final decision

### Scenario 2: Suspicious Service Provider

**Situation**: A service provider's credentials seem questionable.

**Action**:
1. Do NOT approve immediately
2. Research the business independently
3. Request additional verification documents
4. Escalate to controlling admin if uncertain

### Scenario 3: Dispute Between Parties

**Situation**: A case submitter and service provider have a disagreement.

**Action**:
1. Review all communications
2. Check contract terms (if applicable)
3. Mediate if possible
4. Escalate to legal counsel if necessary

---

## Troubleshooting

### "I can't log in"

- Verify you're using the correct password
- Check if password was recently changed
- Clear your browser cache and cookies
- Try a different browser or incognito/private window
- Contact the controlling admin

### "Notifications aren't sending"

- **Check Netlify settings**: Go to Site settings > Forms > Form notifications
- Verify the notification email address is correct
- Check spam/junk folders for notifications
- Test by submitting a dummy case
- Review email service status (if using third-party like SendGrid)

### "A submission disappeared"

- Check the "Rejected" section
- Look in "Approved" section
- Use the search/filter function with the submission title
- Contact another admin who may have reviewed it

### "Changes aren't showing on the site"

- The site may be cached - wait 2-5 minutes
- Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely
- In production: Check Netlify deploy status

### "I see old data after refresh"

**Demo Environment**: Data resets on page refresh (by design)
**Production**: Check Supabase connection status

### Escalation Path

If you cannot resolve an issue:

1. **Level 1**: Check this troubleshooting guide
2. **Level 2**: Contact controlling administrator
3. **Level 3**: Contact technical support (email TBD)
4. **Level 4**: For urgent security issues, call emergency contact (TBD)

---

## Quick Reference

### Keyboard Shortcuts (Future)

| Key | Action |
|-----|--------|
| `A` | Approve selected |
| `R` | Reject selected |
| `N` | Next item |
| `P` | Previous item |

### Contact

For urgent issues, contact:
- Platform Owner: [Configure email]
- Technical Support: [Configure email]

---

## Version History

| Date | Version | Changes |
|------|---------|---------|
| Oct 2025 | 1.0 | Initial training guide |

---

*This document should be reviewed and updated as platform features evolve.*
