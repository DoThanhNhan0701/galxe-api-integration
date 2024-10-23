# Galxe API Integration

This project is a Node.js application that integrates with the Galxe API using GraphQL. The application enables querying campaigns and leaderboards data from Galxe via GraphQL queries.

## Features

- GraphQL-based API for querying campaigns and leaderboards.
- Integration with the Galxe API.
- GraphiQL playground available for testing queries.

## Project Structure

    GALXE-API-INTEGRATION/
    ├── node_modules/             # Project dependencies
    ├── src/
    │   ├── graphql/
    │   │   ├── schema.ts         # Defines the GraphQL schema
    │   │   └── resolver.ts       # Contains the logic for resolving GraphQL queries
    │   ├── schemes/              # Define schemes or types used in the application
    │   └── services/
    │       └── galxeService.ts   # Contains functions that call the Galxe API
    ├── index.ts                  # Entry point of the application
    ├── package-lock.json         # Auto-generated lockfile for node modules
    ├── package.json              # Project metadata and dependencies
    └── tsconfig.json             # TypeScript configuration file
