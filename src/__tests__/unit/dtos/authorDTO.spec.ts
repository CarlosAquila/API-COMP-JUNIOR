import AuthorDTO from '../../../dtos/authorDTO';

describe('AuthorDTO', () => {
  it('should create an AuthorDTO instance with valid data', () => {
    const data = { name: 'NomeDoAutor', biography: 'This is a valid biography' };
    const authorDTO = new AuthorDTO(data);
    expect(authorDTO).toBeInstanceOf(AuthorDTO);
    expect(authorDTO.name).toBe(data.name);
    expect(authorDTO.biography).toBe(data.biography);
  });

  it('should throw an error if name is not provided', () => {
    const data = { name: '', biography: 'This is a valid biography' };
    expect(() => new AuthorDTO(data)).toThrow('Name is required');
  });

  it('should throw an error if biography is too short', () => {
    const data = { name: 'NomeDoAutor', biography: 'Short bio' };
    expect(() => new AuthorDTO(data)).toThrow('Biography is too short');
  });

  it('should allow biography to be undefined', () => {
    const data = { name: 'NomeDoAutor' };
    const authorDTO = new AuthorDTO(data);
    expect(authorDTO.biography).toBeUndefined();
  });
});
