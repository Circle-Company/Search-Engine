export interface UserObject {
    id: number;
    username: string;
    name: string;
    verifyed: boolean;
    muted: boolean;
    blocked: boolean;
    you_follow: boolean;
    profile_picture: {
        tiny_resolution: null | string;
    };
    statistic: {
        total_followers_num: number;
    };
    weight: number;
}

export interface ReturnUserObject {
    id: number;
    username: string;
    name: string;
    verifyed: boolean;
    blocked: boolean;
    you_follow: boolean;
    profile_picture: {
        tiny_resolution: null | string;
    };
    statistic: {
        total_followers_num: number;
    };
    score: number;
}

export type SortCandidatesProps = {
    candidates_with_informations: UserObject[];
};

export function calcule_score({
    candidates_with_informations,
}: SortCandidatesProps): ReturnUserObject[] {
    return candidates_with_informations.map((candidate) => {
        const weights = require("../../database/related_candidates_weights.json");
        let totalScore = candidate.weight;

        for (const criterion in weights) {
            if (
                candidate[criterion] !== undefined &&
                weights[criterion].weight !== undefined
            ) {
                totalScore += candidate[criterion]
                    ? weights[criterion].weight
                    : 0;
            }
        }
        return {
            id: candidate.id,
            username: candidate.username,
            name: candidate.name,
            verifyed: candidate.verifyed,
            blocked: candidate.blocked,
            you_follow: candidate.you_follow,
            profile_picture: candidate.profile_picture,
            statistic: {
                total_followers_num: candidate.statistic.total_followers_num,
            },
            score: totalScore,
        };
    });
}
