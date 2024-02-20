import {backService} from './back.js';

// Manage state of the view
// Use only setters to update state
// This is a class with methods to update state and react to updates
export class State {
    /**
     * Current data
     */
    recipes = [];
    ingredients = [];
    devices = [];
    utensils = [];
    /**
     * Filter to apply on data
     */
    filter = {
        query: null,
        ingredients: [],
        devices: [],
        utensils: [],
        text: [],
    };
    /**
     * Listeners functions stored with a unique key
     * the key for each data to know which functions to call
     * the value is an array of successive functions
     */
    listenersFn = {
        recipes: [],
        ingredients: [],
        devices: [],
        utensils: [],
    };

    //METHODS

    /**
     * Add a listener to a key
     * if the key doesn't exist, return an error
     * @param key
     * @param listenFunction
     */
    setListenFunctions = (key, listenFunction) => {
        if (!this.listenersFn[key]) console.error('you cant add a key that is not define');
        this.listenersFn[key].push(listenFunction);
    };

    /**
     * Set a filter and update recipes
     * check if data is a correct string before updating the filter object
     */
    setFilter = async (action, filter, filterType) => {
        const regEx = /^([a-z]|[A-Z]|[0-9]|à|é|è|â|'|\(|\)|\s){3,25}$/;
        const isDataValid = regEx.test(filter);
        if (!isDataValid) return;
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
     * Set recipes and notify listeners fn about recipe update
     * @param recipes
     */
    setRecipes = (recipes) => {
        this.recipes = recipes;
        for (let fn of this.listenersFn.recipes) {
            fn(this.recipes)
        }    };

    /**
     * Set ingredients :
     * remove ingredients that are in filers and notify listeners fn about ingredients update
     * @param ingredients
     */
    setIngredients = (ingredients) => {
        this.ingredients = ingredients.filter( u => !this.filter.ingredients.includes(u) )
        this.listenersFn.ingredients.forEach(fn => fn(this.ingredients))
    }

    /**
     * Set devices :
     * remove devices that are in filters and notify listeners fn about devices update
     * @param devices
     */
    setDevices = (devices) => {
        this.devices = devices.filter( u => !this.filter.devices.includes(u) )
        this.listenersFn.devices.forEach(fn => fn(this.devices))
    }

    /**
     * Set utensils
     * remove utensils that are in filters and notify listeners fn about utensil update
     * @param utensils
     */
    setUtensils = (utensils) => {
        this.utensils = utensils.filter( u => !this.filter.utensils.includes(u) )
        this.listenersFn.utensils.forEach(fn => fn(this.utensils))
    }


}
