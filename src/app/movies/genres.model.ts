export type Genre = {
  id: number;
  name: string;
}

export type GenreMap =  Map<number, string>;

export const toGenreMap = (genres: Genre[]): GenreMap => {
  return new Map(genres.map(({ id, name }) => [id, name]));
}

export const toGenreName = (genres: GenreMap) => (id: number) => genres.get(id)!;
