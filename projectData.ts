interface Project {
  applicantType: "PROJECT" | "INDIVIDUAL";
  displayName: string;
  websiteUrl: string;
  bio: string;
  contributionDescription: string;
  contributionLinks: {
    type: "CONTRACT_ADDRESS" | "GITHUB_REPO" | "OTHER";
    url: string;
    description: string;
  }[];
  impactCategory: (
    | "OP_STACK"
    | "COLLECTIVE_GOVERNANCE"
    | "DEVELOPER_ECOSYSTEM"
    | "END_USER_EXPERIENCE_AND_ADOPTION"
  )[];
  impactDescription: string;
  impactMetrics: {
    description: string;
    number: number;
    url: string;
  }[];
  fundingSources: (
    | {
        type: "GOVERNANCE_FUND" | "PARTNER_FUND" | "RETROPGF_2";
        currency: "OP";
        amount: number;
        description?: string | undefined;
      }
    | {
        type: "RETROPGF_1" | "REVENUE" | "OTHER";
        currency: "USD";
        amount: number;
        description?: string | undefined;
      }
  )[];
  payoutAddress: string;
  understoodKYCRequirements: boolean;
  understoodFundClaimPeriod: boolean;
  certifiedNotDesignatedOrSanctionedOrBlocked: boolean;
  certifiedNotSponsoredByPoliticalFigureOrGovernmentEntity: boolean;
  certifiedNotBarredFromParticipating: boolean;
}
