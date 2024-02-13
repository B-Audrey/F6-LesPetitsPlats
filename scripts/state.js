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
     * @param recipes
     */
    setRecipes = (recipes) => {
        this.recipes = recipes;
        this.listenersFn.recipes.forEach(fn => fn(this.recipes));
    };

    setIngredients = (ingredients) => {
        this.ingredients = ingredients.filter( u => !this.filter.ingredients.includes(u) )
        this.listenersFn.ingredients.forEach(fn => fn(this.ingredients))
    }

    setDevices = (devices) => {
        this.devices = devices.filter( u => !this.filter.utensils.includes(u) )
        this.listenersFn.devices.forEach(fn => fn(this.devices))
    }

    setUtensils = (utensils) => {
        this.utensils = utensils.filter( u => !this.filter.utensils.includes(u) )
        this.listenersFn.utensils.forEach(fn => fn(this.utensils))
    }

}