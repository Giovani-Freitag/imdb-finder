import { IMDBFinder } from "../index.js";

it('should parse a movie', async () => {
    expect(await (new IMDBFinder()).find({name: 'Predator', year: 1987, type: 'movie'})).toEqual({ id: 'tt0093773', release: 1987, type: 'movie' });
});

it('should parse a movie without optional arguments', async () => {
    expect(await (new IMDBFinder()).find({name: 'Predator'})).toEqual({ id: 'tt0093773', release: 1987, type: 'movie' });
});

it('should parse a tv show', async () => {
    expect(await (new IMDBFinder()).find({name: 'Chicago Med', year: 2015, type: 'series'})).toEqual({ id: 'tt4655480', release: 2015, type: 'series' });
});

it('should parse a tvshow without optional arguments', async () => {
    expect(await (new IMDBFinder()).find({name: 'Chicago Med'})).toEqual({ id: 'tt4655480', release: 2015, type: 'series' });
});