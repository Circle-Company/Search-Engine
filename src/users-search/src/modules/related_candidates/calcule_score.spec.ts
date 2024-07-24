import { ReturnUserObject, UserObject, calcule_score } from "./calcule_score";

// Mock the JSON file
jest.mock("../../database/related_candidates_weights.json", () => ({
    verifyed: { weight: 10 },
    muted: { weight: -5 },
    blocked: { weight: -20 },
    you_follow: { weight: 15 },
    profile_picture: { weight: 5 },
    statistic: { weight: 2 },
}));

describe("calcule_score", () => {
    it("should correctly calculate the score for candidates", () => {
        const candidates_with_informations: UserObject[] = [
            {
                id: 1,
                username: "user1",
                name: "User One",
                verifyed: true,
                muted: false,
                blocked: false,
                you_follow: true,
                profile_picture: { tiny_resolution: null },
                statistic: { total_followers_num: 100 },
                weight: 50,
            },
            {
                id: 2,
                username: "user2",
                name: "User Two",
                verifyed: false,
                muted: true,
                blocked: false,
                you_follow: false,
                profile_picture: { tiny_resolution: "url/to/pic" },
                statistic: { total_followers_num: 200 },
                weight: 30,
            },
        ];

        const expectedScores: ReturnUserObject[] = [
            {
                id: 1,
                username: "user1",
                name: "User One",
                verifyed: true,
                blocked: false,
                you_follow: true,
                profile_picture: { tiny_resolution: null },
                statistic: { total_followers_num: 100 },
                score: 82, // weight + verifyed + you_follow
            },
            {
                id: 2,
                username: "user2",
                name: "User Two",
                verifyed: false,
                blocked: false,
                you_follow: false,
                profile_picture: { tiny_resolution: "url/to/pic" },
                statistic: { total_followers_num: 200 },
                score: 32,
            },
        ];

        const scores = calcule_score({ candidates_with_informations });

        expect(scores).toEqual(expectedScores);
    });
});
