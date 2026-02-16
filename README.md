# TradeCraft - Automated Trading System for PlayTradeCraft

TradeCraft is an automated trading bot designed for the PlayTradeCraft.com economic simulation game. It automates various trading operations including buying, selling, production transfer, orphan order cancellation, and market analytics.

## Features

### 🛒 Automated Trading

- **Buyer Module**: Automatically purchases products based on market conditions and inventory limits
- **Seller Module**: Sells products to the best available market offers
- **Smart Inventory Management**: Respects maximum inventory limits and keeps minimum stock levels

### 🏭 Production Management

- **Automatic Transfer**: Transfers production from factories to warehouse/deposit
- **Region Monitoring**: Monitors multiple regions (1-6) for production capacity
- **Efficiency Tracking**: Only transfers when storage reaches optimal levels

### 📊 Market Analytics

- **Real-time Analytics**: CLI interface for monitoring market conditions
- **Profit Analysis**: Track profit margins and trading performance
- **Order Management**: View and analyze active orders

### 🔧 Maintenance Operations

- **Orphan Order Cancellation**: Automatically cancels abandoned or stuck orders
- **Queue-based Processing**: Reliable job scheduling using BunQueue
- **Comprehensive Logging**: Structured logging with LogTape

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

### Project Structure

- **TypeScript**: Full type safety throughout
- **ES Modules**: Modern JavaScript modules
- **React**: Used for CLI interfaces (via Ink)
- **BunQueue**: Reliable job scheduling

## Security Considerations

1. **Authentication**: Store cookies securely in environment variables
2. **Rate Limiting**: Built-in delays between API calls
3. **Error Handling**: Graceful degradation on API failures
4. **Logging**: No sensitive data in logs

## Monitoring

Monitor the bot through:

1. Console output
2. Log files (`analytics.log`)
3. PlayTradeCraft.com game interface
4. CLI analytics tools

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify cookies are valid and not expired
   - Check `.env` file configuration

2. **API Rate Limiting**
   - The bot includes built-in delays
   - Check PlayTradeCraft API limits

3. **Inventory Issues**
   - Verify product configuration in `src/server.ts`
   - Check maximum/minimum inventory settings

### Log Analysis

Check `analytics.log` for detailed error information and operational logs.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes with proper TypeScript types
4. Add tests if applicable
5. Submit a pull request

## License

[Add appropriate license information]

## Disclaimer

This bot is designed for educational purposes and use with the PlayTradeCraft.com game. Use responsibly and in accordance with PlayTradeCraft's terms of service. The developers are not responsible for any consequences resulting from the use of this software.

## Support

For issues and feature requests:

1. Check the troubleshooting section
2. Review existing issues
3. Create a new issue with detailed information

---

**Note**: This project is independent and not affiliated with PlayTradeCraft.com. All game-related trademarks belong to their respective owners.
