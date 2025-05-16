interface File {
    id: string;
    name: string;
    createdAt: string;
    size: number;
    file: string;
    folder: Pick<Folder, "id"> | null;
}

interface Folder {
    id: string;
    createdAt: string;
    name: string;
    parentFolder: Pick<Folder, "id"> | null;
}
export { Folder, File };
