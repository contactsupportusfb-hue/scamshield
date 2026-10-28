// All guidance here is general information, not legal or financial advice.
// Official reporting links are the authoritative source — always follow them.

// What to do right after being scammed, in order.
export const RECOVERY_STEPS = [
  { icon: 'block', title: 'Stop all contact and payments', text: 'Do not send any more money, gift cards or crypto, and stop replying. Scammers often push harder once you hesitate. Breaking contact is the first and most important step.' },
  { icon: 'account_balance', title: 'Tell your bank or card provider now', text: 'Call the number on the back of your card straight away. Ask them to stop or reverse the payment, freeze the card and watch for more charges. The sooner you call, the better the chance of recovering money.' },
  { icon: 'lock_reset', title: 'Secure your accounts', text: 'Change the passwords for any account the scammer may have reached, starting with email and banking. Turn on two-step verification. Never reuse the same password across sites.' },
  { icon: 'badge', title: 'Protect your identity', text: 'If you shared ID details (date of birth, national ID, card numbers), you may be at risk of identity theft. In the US, go to identitytheft.gov for a recovery plan and consider a free credit freeze.' },
  { icon: 'photo_library', title: 'Save the evidence', text: 'Keep screenshots, emails, texts, receipts, phone numbers, usernames and payment references. You will need them when you report, and they help investigators spot patterns.' },
  { icon: 'flag', title: 'Report it officially', text: 'Report to the real fraud authority for your country (see Where to report). This will not always get your money back, but it helps shut scams down and warns others.' },
  { icon: 'warning', title: 'Watch for a second "recovery" scam', text: 'Victims are often targeted again by people who claim they can get the lost money back for a fee. No legitimate agency charges to recover funds. Treat any such offer as a scam.' },
  { icon: 'volunteer_activism', title: 'Be kind to yourself', text: 'Scams are designed by professionals to fool anyone. Being caught is not your fault. Talk to someone you trust, and reach out to a support service if you feel overwhelmed.' },
]

// Red flags that something is a scam.
export const WARNING_SIGNS = [
  { icon: 'bolt', title: 'Pressure and urgency', text: '"Act now", "your account will be closed", "you will be arrested". Real organisations give you time; scammers manufacture panic so you cannot think.' },
  { icon: 'card_giftcard', title: 'Unusual payment methods', text: 'Requests for gift cards, cryptocurrency, wire transfers or payment apps are a major red flag. These are hard to trace and reverse, which is exactly why scammers want them.' },
  { icon: 'password', title: 'Asking for codes or passwords', text: 'No genuine bank, agency or company will ask for your password or a one-time code. Anyone who does is trying to take over your account.' },
  { icon: 'sentiment_very_satisfied', title: 'Too good to be true', text: 'Guaranteed profits, surprise lottery wins, dream jobs with little work, or a stranger who falls for you fast. If it seems too good to be true, it is.' },
  { icon: 'call', title: 'Unexpected contact', text: 'A call, text or email you were not expecting, especially one that claims to be the government, your bank or tech support. Hang up and contact the organisation using a number you find yourself.' },
  { icon: 'link_off', title: 'Odd links and details', text: 'Misspelled web addresses, public email domains pretending to be official, or links that do not match the real site. Type the address yourself instead of clicking.' },
]

// Common scam types to recognise.
export const SCAM_TYPES = [
  { icon: 'phishing', title: 'Phishing', text: 'Fake emails, texts or sites that copy a real company to steal your logins or card details.' },
  { icon: 'favorite', title: 'Romance scams', text: 'Someone builds an online relationship, then invents an emergency and asks for money.' },
  { icon: 'trending_up', title: 'Investment & crypto', text: 'Promises of high, guaranteed returns. Fake trading platforms that show fake profits until you try to withdraw.' },
  { icon: 'support_agent', title: 'Tech support', text: 'A pop-up or caller says your device is infected and asks for remote access or payment to "fix" it.' },
  { icon: 'account_balance', title: 'Impostor scams', text: 'Callers pretending to be the government, police, your bank or a well-known company to frighten you into paying.' },
  { icon: 'work', title: 'Job & task scams', text: 'Fake jobs that ask you to pay upfront, launder money, or complete "tasks" that never really pay out.' },
  { icon: 'shopping_cart', title: 'Shopping scams', text: 'Fake online shops or marketplace listings that take your money and never deliver.' },
  { icon: 'emoji_events', title: 'Prize & lottery', text: 'You "won" something you never entered, but must pay a fee or tax to claim it.' },
]

// Official reporting channels. US first, then other countries.
export const REPORT_CHANNELS = [
  {
    region: 'United States',
    items: [
      { name: 'FTC — reportfraud.ftc.gov', note: 'The main place to report scams and fraud of any kind.', href: 'https://reportfraud.ftc.gov' },
      { name: 'FBI IC3 — ic3.gov', note: 'For online crime and internet-enabled fraud.', href: 'https://www.ic3.gov' },
      { name: 'IdentityTheft.gov', note: 'If your personal information was stolen — includes a recovery plan.', href: 'https://www.identitytheft.gov' },
    ],
  },
  {
    region: 'United Kingdom',
    items: [
      { name: 'Action Fraud — actionfraud.police.uk', note: 'England, Wales & Northern Ireland. Phone 0300 123 2040.', href: 'https://www.actionfraud.police.uk' },
      { name: 'Police Scotland', note: 'In Scotland, report fraud by calling 101.', href: 'https://www.scotland.police.uk' },
    ],
  },
  {
    region: 'Canada',
    items: [
      { name: 'Canadian Anti-Fraud Centre', note: 'antifraudcentre-centreantifraude.ca · 1-888-495-8501.', href: 'https://antifraudcentre-centreantifraude.ca' },
    ],
  },
  {
    region: 'Australia',
    items: [
      { name: 'Scamwatch — scamwatch.gov.au', note: 'Report scams to the ACCC.', href: 'https://www.scamwatch.gov.au' },
      { name: 'ReportCyber — cyber.gov.au', note: 'For cybercrime and online fraud.', href: 'https://www.cyber.gov.au' },
    ],
  },
]
