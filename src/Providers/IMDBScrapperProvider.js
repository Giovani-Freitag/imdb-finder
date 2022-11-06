import Provider from "./Provider.js";
import fetch from "node-fetch";
import * as Cheerio from 'cheerio';

export default class IMDBScrapperProvider extends Provider{

    constructor(){
        super();

        this.url = 'https://www.imdb.com/';

        this.regexID = /(tt[\d]+)/;
        this.regexRelease = /\(([\d]+)\)/;
        this.regextvShow = /\((TV Series)\)/;
    }

    async find({type, name, year}){

        let params = new URLSearchParams({s: 'tt', q: name});

        let req = await fetch(`${this.url}find?${params}`);
        let html = await req.text();

        let res = this.parseResult(html);

        return res.filter(stream => {
            return (!type || stream.type == type) && (!year || stream.release == year);
        })[0];
    }

    parseResult(html, first){

        if(!html)
            throw new Error('Empty body');

        let $ = Cheerio.load(html);

        if($('body').hasClass('fixed'))
            return this.parseResultTable($, first);
        else
            return this.parseResultList($, first);
    }

    parseResultTable($){

        return $(`.result_text`)
            .map(function(){
                return {
                    id: $(this).find('a').attr('href'),
                    text: $(this).text()
                };
            })
            .get()
            .map(stream => ({
                id:        this.regexID.exec(stream.id)?.[1],
                release:   +this.regexRelease.exec(stream.text)?.[1],
                type:      this.regextvShow.exec(stream.text)?.[1] == 'TV Series' ? 'series' : 'movie'
            }));
    }

    
    parseResultList($){

        return $(`.find-result-item`)
            .map(function(){

                return {
                    id: $(this).find('a').attr('href'),
                    release: $(this).find('.ipc-metadata-list-summary-item__tl .ipc-inline-list__item:nth-child(1)').text(),
                    type: $(this).find('.ipc-metadata-list-summary-item__tl .ipc-inline-list__item:nth-child(2)').text()
                };
            })
            .get()
            .map(stream => ({
                id:        this.regexID.exec(stream.id)?.[1],
                release:   Number.parseInt(stream.release),
                type:      stream.type == 'TV Series' ? 'series' : 'movie'
            }));
    }
}