import User from "../../../../models/user/user-model.js";
import { findUserFollow } from "../../functions/set_interactions/find_user_follow";
import { complete_candidates_informations } from "./complete_candidates_informations";

// Mock the models and functions
jest.mock("../../../../models/user/profilepicture-model.js");
jest.mock("../../../../models/user/statistic-model.js");
jest.mock("../../../../models/user/user-model.js");
jest.mock("../../functions/set_interactions/find_user_follow");

describe("complete_candidates_informations", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return complete candidate information", async () => {
        const user_id = 1;
        const filtered_candidates = [
            { user: { username: "user1", id: 1 }, weight: 10 },
            { user: { username: "user2", id: 2 }, weight: 20 },
        ];

        // Mock the responses from the models and functions
        User.findOne
            .mockResolvedValueOnce({
                id: 1,
                username: "user1",
                verifyed: true,
                name: "User One",
                muted: false,
                blocked: false,
                profile_pictures: { tiny_resolution: "url1" },
                statistics: { total_followers_num: 100 },
            })
            .mockResolvedValueOnce({
                id: 2,
                username: "user2",
                verifyed: false,
                name: "User Two",
                muted: true,
                blocked: true,
                profile_pictures: { tiny_resolution: "url2" },
                statistics: { total_followers_num: 200 },
            });

        (findUserFollow as jest.Mock).mockResolvedValueOnce(true);

        const result = await complete_candidates_informations({
            user_id,
            filtered_candidates,
        });

        const expected = [
            {
                id: 1,
                username: "user1",
                verifyed: true,
                name: "User One",
                muted: false,
                blocked: false,
                you_follow: true,
                profile_picture: { tiny_resolution: "url1" },
                statistic: { total_followers_num: 100 },
                weight: 10,
            },
            {
                id: 2,
                username: "user2",
                verifyed: false,
                name: "User Two",
                muted: true,
                blocked: true,
                you_follow: false,
                profile_picture: { tiny_resolution: "url2" },
                statistic: { total_followers_num: 200 },
                weight: 20,
            },
        ];

        expect(result).toEqual(expected);
    });
});
