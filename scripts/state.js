import {backService} from './back.js';

export class State {
    /**
     * current data
     */
    recipes = [];
    ingredients = [];
    devices = [];
    utensils = [];

    /**
     * filters to store search params
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
     * @param key : string
     * @param listenFunction
     */
    setListenFunctions = (key, listenFunction) => {
        if (!this.listenersFn[key]) console.error('unvalid key');
        this.listenersFn[key].push(listenFunction);
    };


    /**
     * set filters to add or remove data on filter current object
     * when filters are set, recipes, ingredients, devices and utensils are recalculated
     * @param action
     * @param filter
     * @param filterType
     * @returns {Promise<void>}
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
     * Set recipes and notify listeners fn about recipe update
     * @param recipes
     */
    setRecipes = (recipes) => {
        this.recipes = recipes;
        this.listenersFn.recipes.forEach(fn => fn(this.recipes));
    };

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