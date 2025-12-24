// Educational content explaining key concepts for concealed carry legal protection

export interface EducationTopic {
  id: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  keyTakeaway: string;
  relatedAttributes: string[];
}

export const educationTopics: EducationTopic[] = [
  {
    id: "upfront-vs-reimbursement",
    title: "Upfront Payment vs. Reimbursement",
    shortDescription:
      "The most important difference: who pays the lawyer bills first?",
    fullContent: `
**Upfront Payment** means the provider pays your attorney directly as legal fees are incurred. You don't have to come up with cash out of pocket and wait to be reimbursed. This is how most "legal defense memberships" work.

**Reimbursement** means you pay your legal fees first, then submit receipts to the provider for reimbursement up to your policy limits. This requires you to have access to significant funds (legal fees can reach tens or hundreds of thousands of dollars) while your case is ongoing.

### Why This Matters

In a self-defense incident, you may face:
- Immediate need for an attorney (within hours)
- Bail that can reach $50,000–$500,000
- Legal fees that can exceed $100,000 before trial

If you don't have access to these funds, a reimbursement model could leave you unable to mount an effective defense—even if you have coverage.

### The Trade-off

Reimbursement plans often allow **full attorney choice** since you're paying directly. Upfront plans may require using their network attorneys or getting approval for your choice.
    `,
    keyTakeaway:
      "Upfront payment means less financial stress during a crisis; reimbursement requires you to pay first and wait.",
    relatedAttributes: ["paymentStyle"],
  },
  {
    id: "attorney-choice",
    title: "Attorney Choice: Why It Matters",
    shortDescription:
      "Can you pick your own lawyer, or must you use theirs?",
    fullContent: `
**Your Choice** means you can select any licensed attorney to represent you. The provider either pays them directly or reimburses you.

**Panel/Network Only** means you must use an attorney from the provider's pre-selected network. You cannot bring in your own lawyer.

**Panel Preferred** means the provider has a network and prefers you use it, but may approve outside attorneys in some circumstances.

### Why This Matters

Self-defense cases can be complex and high-stakes. You may:
- Already have a trusted attorney you want to use
- Need a specialist in local self-defense law
- Want someone who has defended similar cases before

If you're locked into a panel, you're trusting the provider to select qualified counsel. Some panel attorneys are excellent; others may not specialize in self-defense.

### Questions to Consider

1. Does the plan let me meet my attorney before an incident?
2. How experienced are their panel attorneys with self-defense cases?
3. What happens if I'm unhappy with my assigned attorney?
4. If I'm traveling out of state, how quickly can they provide local counsel?
    `,
    keyTakeaway:
      "Full attorney choice gives you control; panel systems may be convenient but limit your options.",
    relatedAttributes: ["attorneyChoice"],
  },
  {
    id: "coverage-limits",
    title: "Coverage Limits Explained",
    shortDescription:
      "What do the dollar amounts actually mean?",
    fullContent: `
Coverage limits define the maximum amount a plan will pay for your legal defense. You'll typically see:

**Criminal Defense Limit**: Maximum paid for defending you against criminal charges (e.g., manslaughter, assault).

**Civil Defense Limit**: Maximum paid for defending you in civil lawsuits (e.g., wrongful death lawsuit from attacker's family).

**Combined/Aggregate Limit**: Some plans have a single limit that applies to both criminal and civil.

### What's "Unlimited"?

Some providers advertise "unlimited" criminal defense coverage. This typically means:
- No pre-set dollar cap on attorney fees
- Coverage continues as long as the case requires
- Subject to terms and conditions (must be legitimate self-defense, etc.)

**Important**: "Unlimited" doesn't mean unrestricted. Read the terms carefully.

### How Much Is Enough?

Legal fees in self-defense cases can range widely:
- Simple case resolved quickly: $10,000–$30,000
- Case going to trial: $50,000–$150,000
- Complex case with appeals: $200,000+
- High-profile case: $500,000+

Civil suits can add another $100,000+ in defense costs.

### The Bottom Line

Higher limits provide more peace of mind, but "unlimited" plans may offer the most protection for complex cases.
    `,
    keyTakeaway:
      "Higher limits mean more protection; 'unlimited' can provide peace of mind but read the fine print.",
    relatedAttributes: ["coverageLimits"],
  },
  {
    id: "criminal-vs-civil",
    title: "Criminal vs. Civil Coverage",
    shortDescription:
      "You could face both criminal prosecution AND a civil lawsuit.",
    fullContent: `
After a self-defense incident, you may face **two separate legal battles**:

### Criminal Prosecution

The government (state or federal prosecutors) may charge you with crimes like:
- Murder or manslaughter
- Assault with a deadly weapon
- Illegal discharge of a firearm

Even if you acted in legitimate self-defense, prosecutors may still file charges. You'll need a criminal defense attorney to fight these charges.

### Civil Lawsuit

The person you shot (or their family) may sue you for:
- Wrongful death
- Personal injury
- Pain and suffering

You can be found **not guilty** criminally but still **lose** a civil suit (different standards of proof).

### Why You Need Both

Many early concealed carry plans only covered criminal defense. This left members vulnerable to devastating civil judgments.

**Example**: George Zimmerman was acquitted of murder but faced years of civil litigation.

Most modern plans now include both criminal and civil coverage, but verify the limits for each.
    `,
    keyTakeaway:
      "You need protection from both criminal prosecution and civil lawsuits—make sure your plan covers both.",
    relatedAttributes: ["coverageScope"],
  },
  {
    id: "exclusions-gotchas",
    title: "Common Exclusions & 'Gotchas'",
    shortDescription:
      "What these plans WON'T cover—read this before you buy.",
    fullContent: `
Every plan has exclusions—situations where coverage does NOT apply. Here are the most common:

### 1. Criminal Conviction Clawback

**What it means**: If you're ultimately convicted of a crime, some providers may demand reimbursement of all defense costs they paid.

**Why it matters**: This could leave you owing hundreds of thousands of dollars after already losing your case.

**Which plans**: USCCA has this provision. Some others do not. Check carefully.

### 2. Intoxication

**What it means**: If you were legally intoxicated (alcohol or drugs) during the incident, coverage may be denied.

**Why it matters**: Even one or two drinks could jeopardize your coverage depending on your state's legal limit.

### 3. Illegal Weapons

**What it means**: No coverage if the firearm was illegally possessed, carried without proper permits, or modified illegally.

**Why it matters**: Make sure you're fully compliant with all state and federal laws.

### 4. Non-Self-Defense Situations

**What it means**: Coverage only applies to legitimate self-defense. Aggressive action or escalation may void coverage.

**Why it matters**: The provider will investigate. If they determine you weren't acting in self-defense, they can deny coverage.

### 5. Pre-Existing Issues

**What it means**: No coverage for incidents that began before your membership started.

### 6. Geographic Limitations

**What it means**: Some plans don't cover incidents in certain states (commonly NY, NJ, WA).

**Why it matters**: If you travel or live in these states, check availability.

### Red Flags to Watch For

- Vague language about when coverage applies
- "At our discretion" clauses
- Duty to cooperate requirements that are overly broad
- Short appeal windows if coverage is denied
    `,
    keyTakeaway:
      "Every plan has exclusions. The conviction clawback and intoxication clauses are most critical to understand.",
    relatedAttributes: ["exclusions"],
  },
  {
    id: "membership-vs-insurance",
    title: "Membership vs. Insurance: What's the Difference?",
    shortDescription:
      "Is this 'real' insurance, and does it matter?",
    fullContent: `
You'll notice some providers call themselves "memberships" while others offer actual "insurance policies." Here's what that means:

### Insurance-Backed Coverage

**What it is**: An actual insurance policy underwritten by a licensed insurance company.

**Advantages**:
- Regulated by state insurance commissioners
- Claims process has legal protections
- Insurance company has financial reserves and is audited
- May offer more consumer protection

**Examples**: Right to Bear

### Legal Service Membership

**What it is**: A membership that provides access to legal services and funding, but is NOT insurance.

**Advantages**:
- May offer unlimited coverage (insurance has actuarial limits)
- Can operate in more states
- Often provides upfront payment more easily
- May include training and other benefits

**Examples**: USCCA, CCW Safe, U.S. LawShield

### Why Some States Ban These Products

New York and New Jersey (among others) have regulations that effectively ban some of these products, arguing they:
- Function as unauthorized insurance
- May encourage gun use (called "murder insurance" by critics)

This is why availability varies by state.

### Which Is Better?

Neither is inherently better. Consider:
- What coverage do you need?
- Is upfront payment important to you?
- Do you want regulatory oversight?

Both models have successfully defended members in self-defense cases.
    `,
    keyTakeaway:
      "Memberships and insurance work differently but both can provide real protection. Focus on the coverage details.",
    relatedAttributes: [],
  },
  {
    id: "what-to-do-after-incident",
    title: "What Happens After a Self-Defense Incident?",
    shortDescription:
      "Understanding the process helps you evaluate coverage.",
    fullContent: `
Knowing what happens after a self-defense incident helps you understand why certain coverage features matter.

### Immediate Aftermath (Minutes to Hours)

1. **Call 911** — Report the incident
2. **Police arrive** — You may be detained or arrested
3. **Initial questioning** — You should have an attorney present
4. **Potential arrest** — Even in clear self-defense, arrest is common

**Why coverage matters**: Plans with 24/7 hotlines and immediate attorney dispatch can get you legal counsel before you speak to police.

### First 24-72 Hours

1. **Arraignment** — Formal charges may be filed
2. **Bail hearing** — Bail can be $50,000–$500,000+
3. **Attorney meetings** — Building your defense begins
4. **Evidence collection** — Time-sensitive investigation

**Why coverage matters**: Bail bond coverage and investigation services are valuable here.

### Weeks to Months

1. **Grand jury** — May decide whether to indict
2. **Discovery** — Reviewing evidence
3. **Motions** — Legal maneuvering
4. **Plea negotiations** — Possible settlement

**Why coverage matters**: Unlimited vs. capped coverage matters for long cases.

### Trial (If No Plea)

1. **Jury selection** — Critical for self-defense cases
2. **Trial** — Can last days to weeks
3. **Verdict** — Acquittal or conviction
4. **Appeals** — If convicted, you may appeal

**Why coverage matters**: Expert witnesses, psychological support, and appeals coverage.

### Civil Suit (Can Happen Simultaneously)

The attacker's family may sue you for wrongful death. This is a separate legal battle requiring its own defense.
    `,
    keyTakeaway:
      "A self-defense incident triggers a complex legal process. Good coverage addresses each stage.",
    relatedAttributes: [],
  },
];

export const getTopicById = (id: string): EducationTopic | undefined => {
  return educationTopics.find((topic) => topic.id === id);
};
