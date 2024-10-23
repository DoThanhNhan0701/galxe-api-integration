import { buildSchema } from "graphql";

const schemaCampaign = buildSchema(`
  type Space {
    id: String,
    name: String,
    links: String,
    followersCount: Int
  }

  type Campaign {
    id: String
    name: String
    description: String
    status: String
    type: String
    space: Space
  }

  type Query {
    campaign(id: String!): Campaign
  }
`);

const schemaLeaderboard = buildSchema(`
  type Query {
    space(id: Int!): Space
  }

  type Space {
    id: String!
    name: String!
    loyaltyPointsRanks(first: Int, after: String, order: LoyaltyPointsRankOrder): LoyaltyPointsRanksConnection
  }

  type LoyaltyPointsRanksConnection {
    pageInfo: PageInfo!
    totalCount: Int!
    edges: [LoyaltyPointsRankEdge!]!
  }

  type LoyaltyPointsRankEdge {
    node: LoyaltyPointsRank!
  }

  type LoyaltyPointsRank {
    id: String!
    rank: Int!
    points: Int!
    space: Space!
    address: Address!
  }

  type Address {
    username: String
    id: String!
    avatar: String
    address: String
    solanaAddress: String
    aptosAddress: String
    seiAddress: String
    twitterUserName: String
    discordUserName: String
    displayNamePref: String
    displayTwitter: String
    displayDiscord: String
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  enum LoyaltyPointsRankOrder {
    ASC
    DESC
  }
`);

export { schemaCampaign, schemaLeaderboard };
