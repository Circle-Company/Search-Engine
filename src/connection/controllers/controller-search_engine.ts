import { Request, Response } from "express";
import { UsersSearchEngine } from "../../users-search";

export async function getUsers(req: Request, res: Response) {
    const { userId } = req.body;
    const { searchTerm } = req.params;
    const searchResult = await UsersSearchEngine({
        search_term: searchTerm,
        user_id: userId,
    });

    res.status(200).json(searchResult);
}

export const searchEngine = {
    getUsers,
};
