import {backService} from './back.js';

// Manage state of the view
// Use only setters to update state
export class State {
    recipes = [];
    ingredients = [];
    devices = [];
    utensils = [];
    /**
     * Filter to apply on any data
     */
    filter = {
        query: null,
        ingredients: [],
        devices: [],
        utensils: [],
        text: [],
    };
    /**
     * Listeners for each key
     * add key for each data you want to listen
     */
    listenersFn = {
        recipes: [],
        ingredients: [],
        devices: [],
        utensils: [],
    };

    /**
     * Add a listener to a key
     * @param key
     * @param listenFunction
     */
    listen = (key, listenFunction) => {
        if (!this.listenersFn[key]) this.listenersFn[key] = [];
        this.listenersFn[key].push(listenFunction);
    };

    /**
     * Set a filter and update recipes
     */
    setFilter = async (action, filter, filterType) => {
        if (action === 'add') {
            if (filterType === 'query') {
                filter.length >= 3 ? this.filter.query = filter : this.filter.query = ''
            } else if (filterType === 'text') {
                this.filter.query = ''
                this.filter.text.push(filter)
            } else {
                this.filter[filterType].push(filter)
            }
        }

        if (action === 'remove') {
            if (filterType === 'query') {
                this.filter.query = ''
            } else {
                const index = this.filter[filterType].indexOf(filter)
                if (index !== -1) this.filter[filterType].splice(index, 1)
            }
        }
        this.setRecipes(await backService.getRecipes(this.filter));
        this.setIngredients(backService.getIngredients(this.recipes))
        this.setDevices(backService.getDevices(this.recipes))
        this.setUtensils(backService.getUtensils(this.recipes))
    }
    ;

    /**
     * Set recipes and notify listeners
     */
    setRecipes = (recipes) => {
        this.recipes = recipes;
        for (let fn of this.listenersFn.recipes) {
            fn(this.recipes)
        }    };

    setIngredients = (ingredients) => {
        this.ingredients = ingredients._filter(i => !this.filter.ingredients._includesOnArray(i))
        for (let fn of this.listenersFn.ingredients) {
            fn(this.ingredients)
        }
    }

    setDevices = (devices) => {
        this.devices = devices._filter(d => !this.filter.devices._includesOnArray(d))
        for (let fn of this.listenersFn.devices) {
            fn(this.devices)
        }
    }

    setUtensils = (utensils) => {
        this.utensils = utensils._filter(u => !this.filter.utensils._includesOnArray(u))
        for (let fn of this.listenersFn.utensils) {
            fn(this.utensils)
        }
    }

}