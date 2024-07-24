interface UserObject {
    user: {
        username: string;
        id: number;
    };
    weight: number;
}

type SortCandidatesProps = {
    search_term: string;
    candidates_without_duplication: UserObject[];
};
export function filter_candidates({
    search_term,
    candidates_without_duplication,
}: SortCandidatesProps): UserObject[] {
    return candidates_without_duplication.filter((item) =>
        item.user.username.includes(search_term)
    );
}
