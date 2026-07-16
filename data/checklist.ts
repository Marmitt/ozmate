export interface ChecklistItem {
  id: string;
  group: string;
  title: string;
  detail: string;
  link?: string;
  order: number;
}

export const checklistItems: ChecklistItem[] = [
  // Documents
  {
    id: "get-a-tax-file-number",
    group: "documents",
    title: "Get a Tax File Number (TFN)",
    detail:
      "A TFN identifies you to the Australian Tax Office and is needed before most employers can pay you correctly. Applying is free, directly with the ATO.",
    link: "https://www.ato.gov.au/individuals-and-families/tax-file-number",
    order: 1,
  },
  {
    id: "save-digital-copies-of-your-id",
    group: "documents",
    title: "Save digital copies of your ID documents",
    detail:
      "Keep photos or scans of your passport, visa grant letter, and any other key ID somewhere accessible offline, in case originals are lost or needed quickly.",
    order: 2,
  },
  {
    id: "check-your-visa-conditions",
    group: "documents",
    title: "Check your visa conditions",
    detail:
      "Visa conditions — work rights, study rights, length of stay — vary by visa subclass. Confirm your specific conditions on the official visa checker rather than assuming from general advice.",
    order: 3,
  },

  // Money
  {
    id: "open-an-australian-bank-account",
    group: "money",
    title: "Open an Australian bank account",
    detail:
      "Most employers pay wages directly into a bank account. Major banks let newly arrived visa holders open an account online, often with just a passport.",
    order: 1,
  },
  {
    id: "learn-how-super-works",
    group: "money",
    title: "Learn how superannuation works",
    detail:
      "Superannuation (\"super\") is retirement savings your employer must pay on top of your wages. Understanding the basics helps you spot if it's being paid correctly.",
    link: "https://moneysmart.gov.au/how-super-works",
    order: 2,
  },
  {
    id: "set-a-starter-budget",
    group: "money",
    title: "Set a starter budget",
    detail:
      "Costs like a rental bond, the first weeks of rent, and set-up basics (phone, transport card) tend to land all at once. A rough first-month budget helps avoid running short.",
    order: 3,
  },

  // Phone
  {
    id: "get-a-local-sim-or-esim",
    group: "phone",
    title: "Get a local SIM or eSIM",
    detail:
      "A local number makes it easier to sign up for things like bank accounts and job applications. Prepaid SIMs are available at the airport, supermarkets, and phone shops with no contract.",
    order: 1,
  },
  {
    id: "compare-prepaid-phone-plans",
    group: "phone",
    title: "Compare prepaid phone plans",
    detail:
      "Providers and resellers vary a lot in price for similar data allowances. It's worth comparing a couple of options before committing to a plan.",
    order: 2,
  },
  {
    id: "save-emergency-and-key-contacts",
    group: "phone",
    title: "Save emergency and key contacts",
    detail:
      "Add 000 (police/fire/ambulance), your employer, your accommodation contact, and your country's local consulate to your phone before you need them.",
    order: 3,
  },

  // Transport
  {
    id: "get-a-public-transport-smart-card",
    group: "transport",
    title: "Get a public transport smart card",
    detail:
      "Sydney's Opal card (and equivalents in other cities) is tapped on and off buses, trains, ferries, and light rail. Cards are available at stations, newsagents, and some supermarkets.",
    order: 1,
  },
  {
    id: "install-your-citys-transport-app",
    group: "transport",
    title: "Install your city's transport app",
    detail:
      "Live departure times and route planners make it much easier to navigate an unfamiliar public transport network in the first few weeks.",
    order: 2,
  },
  {
    id: "check-if-you-need-to-convert-your-licence",
    group: "transport",
    title: "Check if you need to convert your driver's licence",
    detail:
      "Rules on how long you can drive on an overseas licence, and whether you need to convert it, vary by state and licence type. Confirm the rule for your state directly.",
    link: "https://www.service.nsw.gov.au/transaction/transfer-your-overseas-drivers-licence",
    order: 3,
  },

  // Health
  {
    id: "check-your-medicare-eligibility",
    group: "health",
    title: "Check your Medicare eligibility",
    detail:
      "Medicare access depends on your visa type and whether your country has a reciprocal health care agreement with Australia. Confirm your eligibility before assuming what's covered.",
    link: "https://www.servicesaustralia.gov.au/medicare-enrolment-for-visitors-from-reciprocal-countries",
    order: 1,
  },
  {
    id: "check-if-private-health-cover-is-required",
    group: "health",
    title: "Check if private health cover is required",
    detail:
      "Some visa subclasses require proof of private health insurance as a condition of the visa, separate from Medicare. Check what your specific visa requires.",
    order: 2,
  },
  {
    id: "find-your-nearest-gp-and-pharmacy",
    group: "health",
    title: "Find your nearest GP and pharmacy",
    detail:
      "Locating a local doctor (GP) and pharmacy before you need one makes it much faster to get care for everyday illnesses or to refill a prescription.",
    order: 3,
  },
];
