
## Architecture

TradeCraft is built with a modular architecture:

```
TradeCraft/
├── src/
│   ├── api/           # API client for PlayTradeCraft
│   ├── trader/        # Buyer and seller modules
│   ├── transfer/      # Production transfer logic
│   ├── orders/        # Order management (orphan cancellation)
│   ├── analytics/     # Market analysis tools
│   ├── profit/        # Profit calculation
│   ├── logger/        # Logging configuration
│   └── types/         # TypeScript type definitions
├── cli/               # Command-line interfaces
├── scripts/           # Utility scripts
└── public/            # Static assets
```

## Prerequisites

- [Bun](https://bun.sh) v1.3.10 or higher
- PlayTradeCraft.com account with API access
- Valid authentication cookies

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd TradeCraft
```

2. Install dependencies:

```bash
bun install
```

3. Configure environment variables:
   Create a `.env` file in the root directory with:

```env
COOKIES=your_playtradecraft_cookies_here
```

## Usage

### Starting the Trading Bot

Run the main trading system:

```bash
bun run trader
```

This starts all automated processes:

- Buyer: Runs every 1 minute
- Seller: Runs every 2 minutes
- Transfer: Runs every hour
- Orphan Order Cancellation: Runs every 5 minutes

### CLI Tools

#### Market Analytics

View real-time market analytics:

```bash
bun run analytics
```

#### Profit Analysis

Check trading profits:

```bash
bun run profit
```

#### Manual Transfer

Manually trigger production transfer:

```bash
bun run transfer
```

## Configuration

### Product Configuration

Products are configured in `src/server.ts` with the following properties:

```typescript
{
  Key: string; // Product identifier
  Id: number; // Product ID in PlayTradeCraft
  MaxInventory: number; // Maximum inventory to maintain
  KeepMinInventory: number; // Minimum inventory to keep
  // ... other properties
}
```

### Queue Configuration

Jobs are scheduled using BunQueue with cron patterns:

- Buyer: `*/1 * * * *` (every minute)
- Seller: `*/2 * * * *` (every 2 minutes)
- Transfer: `0 * * * *` (hourly)
- Orphan Orders: `*/5 * * * *` (every 5 minutes)

## Logging

TradeCraft uses structured logging with LogTape. Logs are written to:

- Console output
- `analytics.log` file

Log levels include:

- `INFO`: General operations
- `WARN`: Warning conditions
- `ERROR`: Error conditions
- `DEBUG`: Debug information (when enabled)

## API Integration

The bot interacts with PlayTradeCraft.com API endpoints:

- `/api/state`: Get game state and inventory
- `/api/orders`: Market order management
- `/api/price-range`: Price analysis
- `/api/transfer`: Production transfer

## Development

### Building from Source

```bash
# Install dependencies
bun install

# Type checking
bun run tsc --noEmit

# Run tests (if available)
bun test
```
