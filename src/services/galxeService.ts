import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getCampaignById(id: string) {
  try {
    const response = await axios.post(
      String(process.env.GALXE_GRAPHQL_URL),
      {
        query: `
          query {
            campaign(id: "${id}") {
              id
              name
              description
              status
              type
              space {
                id
                name
                links
                followersCount
              }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data.campaign;
  } catch (error) {
    throw new Error("Failed to fetch campaign data");
  }
}

export async function getLeaderboard(
  spaceId: number,
  after?: string,
  pageSize?: number,
  order?: string
) {
  try {
    const response = await axios.post(
      String(process.env.GALXE_GRAPHQL_URL),
      {
        query: `
          query SpaceLeaderboard($id: Int!, $after: String, $pageSize: Int, $order: LoyaltyPointsRankOrder) {
            space(id: $id) {
              id
              name
              loyaltyPointsRanks(first: $pageSize, after: $after, order: $order) {
                pageInfo {
                  startCursor
                  endCursor
                  hasNextPage
                  hasPreviousPage
                }
                totalCount
                edges {
                  node {
                    id
                    rank
                    points
                    space {
                      name
                    }
                    address {
                      username
                      id
                      avatar
                      address
                      solanaAddress
                      aptosAddress
                      seiAddress
                      twitterUserName
                      discordUserName
                      displayNamePref
                      displayTwitter
                      displayDiscord
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: spaceId,
          after,
          pageSize,
          order,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const space = response.data.data;

    if (!space) {
      throw new Error(`No data returned for space with id: ${spaceId}`);
    }

    return space.space;
  } catch (error: any) {
    console.error("Error fetching leaderboard:", error.message);
    throw new Error("Failed to fetch leaderboard data");
  }
}
