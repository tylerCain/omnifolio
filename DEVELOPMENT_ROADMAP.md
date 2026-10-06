# Cryptfolio development plan

This roadmap sequences work from validating a global, multi-asset proposition to operating a small paid product. “All assets” is the long-term direction: listed shares and funds, crypto, cash, property, and user-defined assets are examples of the breadth. The MVP should choose a narrow, researched first set while keeping the model extensible. It is outcome-based; estimates should be added after choosing capacity and reviewing each milestone.

## Stage 0 — Product discovery

**Outcome:** evidence that a defined user group has this problem and wants to try the proposed simple tracker.

- Write an interview script and speak with 8–12 target users.
- Capture current tools, painful tasks, trust concerns, and must-have outcomes.
- Show the current prototype or a clickable flow; observe users setting up a sample portfolio.
- Identify the first customer segment, asset classes, account types, reporting currencies, and markets to support.
- Learn whether users need a quick current-balance start, transaction history from day one, or both; assess when account import/sync becomes necessary.
- Define an initial success measure and recruit 5–10 pilot users.

**Gate:** proceed when several users commit to trying the pilot and the same core problem appears independently.

## Stage 1 — Define the MVP

**Outcome:** one coherent, testable product slice and clear data rules.

- Specify onboarding, portfolio dashboard, starting-balance entry, dated activity entry, empty/loading/error states, and account deletion.
- Decide cost-basis rules, how opening balances and later activity interact, which transaction types to support first, how custom/unpriced assets work, and which quote/reporting currencies are supported first.
- Define valuation and FX freshness, provider failure behaviour, rounding, asset identifiers, and currency conversion rules.
- Sketch responsive screens and write acceptance criteria before feature work.
- Keep the first release to one portfolio and manual entry, with a limited supported asset set, explicit opening balances, a small useful set of dated transactions, and one or more researched reporting currencies, unless discovery contradicts that choice.

## Stage 2 — Secure product foundation

**Outcome:** users can safely have separate persistent portfolios.

- Add authentication and user records; replace all fixed IDs and the database's default user ID.
- Enforce portfolio ownership in every API query and mutation; validate inputs server-side.
- Add schema migrations, constraints, and appropriate numeric precision for quantities and monetary values; model asset class, identifier, quote currency, valuation source, and dated activity explicitly.
- Decide and document the source of truth: opening positions plus subsequent events should reconcile to current quantity and cost basis. Avoid separately editable totals that can drift from the activity ledger.
- Add server-side configuration/secrets handling, environment-based client API URL, and deployment setup.
- Add privacy notice, terms, account deletion, and basic operational logging before external pilot access.

**Gate:** verify that one account cannot read or alter another account's portfolio and that deletion removes or anonymises its data as documented.

## Stage 3 — Complete the core portfolio loop

**Outcome:** a pilot user can create, maintain, and understand their portfolio without developer help.

- Build sign-up/sign-in and first-use onboarding.
- Replace the incomplete holding form with asset-class-aware search/input and validated opening-balance inputs; support a user-valued custom asset when no market feed is available.
- Implement dated activity entry for the first validated transaction types (likely buy, sell, income, fee, and balance adjustment), with edit/delete and clear confirmation/recovery.
- Show an activity history and explain how opening positions and later events produce current quantity and cost basis.
- Calculate total value, cost basis, absolute/percentage gain or loss, and per-asset allocation consistently, with clear treatment of income, fees, transfers, and missing history.
- Let users select a reporting currency; show native quote currency, conversion, and last-updated time where relevant.
- Handle unavailable asset prices without silently treating them as zero; allow an explicitly labelled manual valuation where appropriate.
- Format numbers, dates, and currency according to user preference/locale independently of the reporting currency.

## Stage 4 — Price data and reliability

**Outcome:** portfolio values and currency conversions are useful, fresh enough, and resilient to provider/API limits.

- Review market-price and FX provider terms, rate limits, coverage, attribution, and caching requirements for the chosen initial asset set and markets.
- Move provider calls behind server-side adapters; cache and rate-limit requests appropriately.
- Add timeouts, retries where safe, monitoring for stale prices/FX, and understandable unavailable-data states.
- Review calculations for decimal precision and edge cases across openings, buys, partial sales, fees, income, transfers, and currency conversion; manually verify representative examples.
- Provide a supported-asset list/search strategy that does not depend on arbitrary user-entered IDs, while making unsupported/custom asset entry understandable.

## Stage 5 — Closed pilot and learning

**Outcome:** learn whether users complete setup, return, and trust the product.

- Invite 5–10 users and help them onboard; observe without steering.
- Instrument only necessary product events with a privacy-conscious approach.
- Review setup completion, time to first value, week-four return use, errors, and support questions.
- Prioritise the biggest observed friction; avoid building speculative premium features.
- Decide whether to iterate, narrow the audience, add import/sync, or stop.

## Stage 6 — Monetisation experiment

**Outcome:** test a paid value proposition before committing to a full billing system.

- Ask retained users which recurring problem a paid feature would solve.
- Choose one bounded candidate (for example, longer history or export) and describe the benefit plainly.
- Test a real price and upgrade proposition with a small cohort.
- If conversion evidence supports it, add a payment provider, subscription state, billing portal, cancellation, receipts, and entitlement checks.
- Make free-versus-paid limits explicit and ensure core data access is not held hostage by billing issues.

## Stage 7 — Public launch and operations

**Outcome:** a small service can be operated responsibly.

- Set up production database backups and restore rehearsal, alerting, dependency updates, and incident handling.
- Publish support and privacy contact routes; document data retention and deletion.
- Confirm provider terms, privacy/cookie obligations, and legal/accounting advice for the initial launch jurisdictions and intended claims/features.
- Launch gradually, review retention and support burden, then decide whether to expand features or acquisition.

## Suggested first backlog

1. Document the user and cost-basis assumptions; conduct discovery interviews.
2. Remove hard-coded portfolio ID from the client/API flow and design ownership around authenticated users.
3. Finalise schema for users, portfolios, and precise holding values.
4. Complete holding CRUD and portfolio summary UX.
5. Put market data behind a server adapter and define stale/error behaviour.
6. Run the closed pilot and use observed results to choose the next feature.

## Explicitly defer until evidence supports them

Broad worldwide asset/market coverage, exchange and broker integrations, automated activity imports, tax reports, investment advice, mobile apps, social/sharing features, and complex subscription tiers. Manual dated activity is part of the core product direction; automatic imports and jurisdiction-specific tax-lot accounting are later scope. Each expands data, security, support, or compliance needs; revisit as evidence arrives.
