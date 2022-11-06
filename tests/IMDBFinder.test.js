import { IMDBFinder } from "../index.js";

it('should parse a movie', async () => {
    expect(await (new IMDBFinder()).find({name: 'Predator', year: 1987, type: 'movie'})).toBe('tt0093773');
});

it('should parse a movie without optional arguments', async () => {
    expect(await (new IMDBFinder()).find({name: 'Predator'})).toBe('tt0093773');
});

it('should parse a tv show', async () => {
    expect(await (new IMDBFinder()).find({name: 'Chicago Med', year: 2015, type: 'series'})).toBe('tt4655480');
});

it('should parse a tvshow without optional arguments', async () => {
    expect(await (new IMDBFinder()).find({name: 'Chicago Med'})).toBe('tt4655480');
});

it('should return null if not found', async () => {
    expect(await (new IMDBFinder()).find({name: '!!!!'})).toBeNull();
});