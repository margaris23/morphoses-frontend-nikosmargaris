import { Genre, toGenreMap, toGenreName } from "./genres.model"

describe('Genres Model', () => {
  const genres: Genre[] = [{ id: 1, name: 'Action' }, { id: 2, name: 'History' }]

  it('should convert to genre map', () => {
    const map = toGenreMap(genres);
    expect(map.get(1)).toEqual('Action');
    expect(map.get(3)).toBeUndefined();
  });

  it('should ge genre name', () => {
    expect(toGenreName(toGenreMap(genres))(2)).toEqual('History');
  });
});

