import { search_mixer } from "./src/modules/search_mixer";

type SearchEngineProps = {
    search_term: string;
    user_id: number;
};

export async function UsersSearchEngine({
    user_id,
    search_term,
}: SearchEngineProps): Promise<any> {
    return await search_mixer({ user_id, search_term });
}
