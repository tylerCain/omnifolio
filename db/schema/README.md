# Omnifolio database schema

This document describes the purpose of each column in the `holdings` and
`transactions` tables. The SQL definitions are in `tables/holdings.sql` and
`tables/transactions.sql`.

## Holdings

`omnifolio.holdings` stores the current aggregate position for one asset in a
portfolio. It is the summary used to display the position; transaction rows
record how that position was entered or changed.

| Column | Purpose |
| --- | --- |
| `holding_id` | Unique database ID for this holding. Other tables use it to refer to this position. |
| `portfolio_id` | The portfolio that owns this position. Deleting the portfolio deletes its holdings. |
| `asset_type` | Asset class used when looking up the asset. Currently restricted to `stock` or `crypto`. |
| `ticker` | The asset's ticker or symbol, such as `AAPL` or `BTC`. For reliable lookup, use the exchange or provider identifier as well where needed. |
| `exchange` | The stock exchange for a share, such as `NASDAQ` or `LSE`. Required for stocks by a table constraint; optional for crypto. |
| `provider` | Name of the external data provider used to look up or price this asset, such as `coingecko`. |
| `provider_asset_id` | The provider's stable identifier for the asset, such as CoinGecko's `bitcoin` ID. This avoids relying on a potentially ambiguous ticker alone. |
| `amount` | Current quantity held. For example, `2.5` shares or `0.25` units of a cryptocurrency. Stored as `NUMERIC` to avoid floating-point rounding. |
| `purchase_price` | Total cost basis for the current position, in `currency_code` (not the unit price). The current average cost per unit is `purchase_price / amount`. |
| `currency_code` | Three-letter ISO currency code for `purchase_price`, such as `GBP`, `USD`, or `EUR`. |
| `created_at` | Time the holding row was created. This is not the date the asset was bought. |

`amount` and `purchase_price` cannot be negative. The server currently increases
both when a buy is added. Sell processing must also reduce the position and
cost basis according to the chosen accounting method.

## Transactions

`omnifolio.transactions` stores events against a holding. The transaction table
is the history; the holding row is the current aggregate. Deleting a holding
deletes its transactions.

| Column | Purpose |
| --- | --- |
| `transaction_id` | Unique database ID for this transaction. |
| `holding_id` | The holding this event affects. The portfolio and asset are reached through this relationship, so they are not repeated here. |
| `transaction_type` | What happened. Allowed values are listed below. |
| `amount` | Positive quantity involved in the event. Direction comes from `transaction_type`; amounts are not stored as negative values. |
| `unit_price` | Price per unit for the event, when applicable. It may be `NULL` for events that do not have a unit price. |
| `currency_code` | Three-letter currency code for `unit_price`. The schema currently allows this to be `NULL`. |
| `fees` | Fee amount for the event, defaulting to zero. The schema does not store a separate fee currency, so it should use the transaction's `currency_code`. |
| `occurred_at` | When the event happened. Defaults to the time the row is inserted, but can be set to an earlier trade date. |
| `created_at` | When the transaction was recorded in Omnifolio. This can differ from `occurred_at`. |

Allowed `transaction_type` values:

| Value | Meaning |
| --- | --- |
| `opening_balance` | Starting position entered without recording its earlier individual trades. |
| `buy` | Units purchased. |
| `sell` | Units sold. |
| `transfer_in` | Units transferred into the tracked account. |
| `transfer_out` | Units transferred out of the tracked account. |
| `dividend` | A dividend event. The current schema has no separate cash-amount field, so dividend handling needs a clearer representation before it is implemented. |
| `fee` | A fee event. The current schema has no separate cash-amount field, so fee handling needs a clearer representation before it is implemented. |
| `adjustment` | A manually recorded correction to the position. |

The server currently writes `opening_balance` when a holding is first created
and `buy` when more units are added. The other event types are permitted by the
table, but their processing and effects on the aggregate holding have not yet
been implemented.

## Creating the schema

Create the schema with `omnifolio.sql`, then apply the table files in dependency
order: `users.sql`, `portfolio.sql`, `holdings.sql`, and `transactions.sql`.

These files define tables for a fresh schema. `CREATE TABLE IF NOT EXISTS`
does not change an existing table; an existing database needs a migration.
