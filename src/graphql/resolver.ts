import { getCampaignById, getLeaderboard } from "../services/galxeService";

interface SpaceProps {
  id: number;
  after?: string;
  pageSize?: number;
  order?: string;
}

interface CampaignProps {
  id: string;
}

const root = {
  campaign: async ({ id }: CampaignProps) => {
    try {
      const campaignData = await getCampaignById(id);
      return campaignData;
    } catch (error) {
      throw new Error("Failed to fetch campaign data");
    }
  },

  space: async ({ id, after, pageSize, order }: SpaceProps) => {
    try {
      const leaderboardData = await getLeaderboard(id, after, pageSize, order);
      return leaderboardData;
    } catch (error) {
      console.log(error);

      throw new Error("Failed to fetch leaderboard data");
    }
  },
};

export default root;
