interface User {
    user: {
        username: string;
        id: number;
    };
    weight: number;
}

type RemoveDuplicatesProps = {
    finded_candidates: User[];
};

export function remove_duplicates({
    finded_candidates,
}: RemoveDuplicatesProps): User[] {
    const idsSet = new Set<number>();
    const uniqueUsers: User[] = [];

    for (const user of finded_candidates) {
        if (!idsSet.has(user.user.id)) {
            // Adiciona o ID ao conjunto para rastrear duplicatas
            idsSet.add(user.user.id);

            // Adiciona o usuário único à nova lista
            uniqueUsers.push(user);
        }
    }

    return uniqueUsers;
}
