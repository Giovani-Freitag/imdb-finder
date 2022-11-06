import IMDBMediaProvider from './Providers/IMDBMediaProvider.js';

export default class IMDBFinder{

    constructor(){

        this.providers = {
            imdb: new IMDBMediaProvider()
        };
    }

    async find({type, name, year}){
        return this.providers.imdb.find({type, name, year});
    }

}