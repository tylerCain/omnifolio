# Cryptfolio business plan

*Working hypothesis, 4 October 2026. This is a plan to validate, not a claim that demand or pricing has been proven.*

## Executive summary

Cryptfolio is a lightweight, global portfolio tracker for people who want a clear view of their assets and how they are performing. Users should be able to start quickly by entering current holdings, then record additions, sales, income, and other changes over time. The long-term product should cover assets across classes and regions, with a user-selected reporting currency. The first release should support a deliberately bounded set of asset types and markets, plus manually valued custom assets where suitable pricing data is unavailable.

The first commercial model to test is freemium: a useful free tracker, with a paid personal plan for deeper history and convenience features. The near-term goal is not maximising revenue; it is finding a specific audience that returns to the product and is willing to pay for a clearly valuable benefit.

## Customer and problem

### Initial customer hypothesis

Individuals with investments and other assets spread across accounts, providers, or currencies, who currently use spreadsheets or find transaction-level portfolio tools too demanding. The product should not assume a UK location, crypto-only holdings, or GBP as the user's home currency. Initial customer research should still focus on a reachable first segment and geography rather than claiming to serve everyone immediately.

### Problem hypothesis

Keeping an understandable view of holdings across asset types, providers, and currencies is tedious. Existing workflows can require complete transaction reconstruction before showing anything useful, or leave users maintaining spreadsheets. Cryptfolio's proposed advantage is letting users start from today's balances while also keeping a useful activity history as they go.

### What must be validated

- Do target users experience this problem often enough to try a new tool?
- Which asset classes do target users actually need in one view, and which can wait?
- Do users want to begin from current balances, enter historical transactions, or use both approaches?
- Which transaction types and history detail are essential for the first useful experience?
- Is manual entry a welcome simplification, or does it feel like extra work compared with account connections/imports?
- Which home/reporting currencies and regions are needed by the first customer segment?
- Which summary or history feature would make a user return weekly?
- Will users trust a new product with portfolio data, and what security/privacy expectations do they have?
- Will any meaningful group pay, and at what price? Do not treat example pricing as validated.

## Product and positioning

**Positioning draft:** “Your whole portfolio, in one clear view.”

The long-term product should bring together assets such as listed shares and funds, crypto, cash, property, and other user-defined holdings. Users should be able to add a current balance as a starting position, then record dated activity such as buys, sells, income, transfers, fees, and manual balance adjustments. This avoids making historical reconstruction a condition of getting started while allowing the portfolio to become more accurate over time. The product should support private accounts, portfolios, supported-asset search, reliable valuations where data is available, cost basis and performance summaries, and transparent data timestamps. Users should choose a reporting currency independently of where they live. For the MVP, define a small supported asset/market set and transaction types based on research; allow custom assets with user-entered valuations when automated pricing is unavailable. Make the scope explicit: this is a tracking tool, not an exchange, custodian, tax adviser, or source of investment recommendations.

## Business model hypothesis

Begin with a generous free tier to remove adoption friction. Test a paid individual tier only after recurring use is visible. Candidate paid benefits include more asset/portfolio capacity, longer performance history, alerts, exports, and tax-oriented reports. Prioritise only the features users request and that can be delivered accurately and supportably.

Possible later revenue paths are a subscription and, if users request it, carefully disclosed partner referrals. Avoid relying on ads or trading referrals in the initial product; they may weaken trust and distract from the core use case.

## Go-to-market experiments

1. Interview 8–12 people matching the first customer segment. Include people with different asset classes and home currencies. Ask about current behaviour, pain, and past workarounds; avoid leading questions about the proposed solution.
2. Put a simple landing page in front of the prototype with one clear promise and a waitlist or demo request.
3. Run a small, guided pilot with 5–10 users. Observe first portfolio setup and ask what they use the product for afterward.
4. Test one paid feature concept and a real price with interested users before investing in it. A stated “would you pay?” response alone is weak evidence; seek a signup, pre-order where appropriate, or repeated engagement with the feature.

## Success measures

Track a small funnel: landing-page-to-signup conversion, completed first portfolio, time to first useful valuation, week-four active use, retention, and paid conversion after a real offer. Also track price and foreign-exchange data freshness/errors, unsupported asset requests, support requests, and account deletion/data export completion. Set target thresholds after the first baseline cohort rather than inventing benchmarks now.

## Key risks and responses

- **Trust and privacy:** implement account isolation, secure authentication, minimal data collection, deletion/export, and clear privacy terms before inviting real users.
- **Price coverage, provider limits, and attribution:** different assets and markets need different data sources. Verify each provider's current terms, rate limits, caching rules, coverage, and attribution requirements; isolate pricing and FX behind server-side adapters.
- **Incorrect portfolio maths:** define transaction, cost-basis, income, fee, transfer, and adjustment rules; store precise decimal values; convert values using a stated FX timestamp/rate; handle missing/stale prices; and label estimates and timestamps. Do not imply tax-lot or realised-gain accuracy until those rules are designed and reviewed for each launch jurisdiction.
- **Scope and internationalisation:** broad asset coverage, currencies, number/date formats, and tax rules can expand quickly. Start with a researched region and asset set while designing the data model to grow beyond it.
- **Regulatory and tax expectations:** keep the initial product informational; get qualified advice before marketing tax calculations or personalised recommendations.
- **Weak willingness to pay:** keep fixed costs low and validate retention and paid intent before adding complex integrations or a broad feature set.

## Current status

The repository contains a React interface and a small Express/Postgres API. The portfolio screen reads portfolio ID 2; the database defaults every portfolio to user ID 1; there is no authentication or ownership enforcement. A holding currently has a crypto coin ID, amount, and purchase price, while GBP market data is fetched directly by the browser from CoinGecko. There is no dated activity ledger yet. The current schema and UI are crypto/GBP-specific and need broader asset, valuation, currency, and transaction models. These are prototype foundations, not a launch-ready service.

## Decision gates

- **Continue discovery** if interviews reveal repeated cross-asset portfolio pain and users agree to try the workflow.
- **Build the private MVP** if pilot users complete setup and return to check their portfolio.
- **Add paid features** only when the specific benefit is repeatedly requested and users demonstrate credible willingness to pay.
- **Revisit sequencing** if users primarily require account sync, specific asset classes, or local-market coverage; those needs should shape the first supported segment and operational scope.
