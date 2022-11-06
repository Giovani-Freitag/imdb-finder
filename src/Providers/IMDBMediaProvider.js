import Provider from "./Provider.js";
import fetch from "node-fetch";

export default class IMDBMediaProvider extends Provider{

    constructor(){
        super();

        this.url = 'https://v2.sg.media-imdb.com/';
    }

    async find({type, name, year}){

        let req = await fetch(`${this.url}suggestion/0/${encodeURIComponent(name)}.json`);
        let json = await req.json();

        let findType = this.getFindType(type);

        return json.d.filter(media => this.filter(media, findType, year))?.[0]?.id ?? null;
    }

    filter(media, type, year){
        return (!type || media.qid == type) && (!year || media.y == year);
    }

    getFindType(type){

        if(!type)
            return null;

        return type == 'series' ? 'tvSeries' : 'movie';
    }
}