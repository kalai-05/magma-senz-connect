# Matching Engine

The matching engine runs when a product or demand is created/updated.

## Scoring
- Category exact match (case-insensitive): +40
- Location includes match (normalized): +20
- Quantity (demand.qty <= product.qty): +20
- Price overlap between product and demand ranges: +20

Scores >= 60 create a match with `status = pending`.

## Deduplication
A unique index is enforced on `(productId, demandId)`.
