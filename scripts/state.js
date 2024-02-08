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
        remove: [],
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
                this.filter.text.push(filter)
                this.filter.query = '';
            } else if (filterType === 'ingredients') this.filter.ingredients.push(filter);
            else if (filterType === 'devices') this.filter.devices.push(filter);
            else if (filterType === 'utensils') this.filter.utensils.push(filter);
            else console.log('filtre non rempli')

        }
        if (action === 'remove') {
            if (filterType === 'query') {
                this.filter.query = ''
            } else if (filterType === 'text') {
                const index = this.filter.text.indexOf(filter)
                if (index !== -1) this.filter.text.splice(index, 1)
            } else if (filterType === 'ingredients') {
                const index = this.filter.ingredients.indexOf(filter)
                if (index !== -1) this.filter.ingredients.splice(index, 1)
            }
            else if (filterType === 'devices') {
                const index = this.filter.devices.indexOf(filter)
                if (index !== -1) this.filter.devices.splice(index, 1)
            }
            else if (filterType === 'utensils') {
                const index = this.filter.utensils.indexOf(filter)
                if (index !== -1) this.filter.utensils.splice(index, 1)
            }
            else console.log('filtre non rempli')
        }

        console.log(this.filter)
        this.setRecipes(await backService.getRecipes(this.filter));
        this.setIngredients(backService.getIngredients(this.recipes))
        this.setDevices(backService.getDevices(this.recipes))
        this.setUtensils(backService.getUtensils(this.recipes))
        this.listenersFn.remove.forEach(fn => fn())
    };

    /**
     * Set recipes and notify listeners
     * @param recipes
     */
    setRecipes = (recipes) => {
        this.recipes = recipes;
        this.listenersFn.recipes.forEach(fn => fn(this.recipes));
    };

    setIngredients = (ingredients) => {
        this.filter.ingredients.forEach(i => {
            const index = ingredients.indexOf(i);
            if (index !== -1) ingredients.splice(index, 1);

        })
        this.ingredients = ingredients
        this.listenersFn.ingredients.forEach(fn => fn(this.ingredients))
    }

    setDevices = (devices) => {
        this.filter.devices.forEach(d => {
            const index = devices.indexOf(d)
            if (index !== -1) devices.splice(index, 1)
        })
        this.devices = devices
        this.listenersFn.devices.forEach(fn => fn(this.devices))
    }

    setUtensils = (utensils) => {
        this.filter.utensils.forEach(u => {
            const index = utensils.indexOf(u)
            if (index !== -1) utensils.splice(index, 1)
        })
        this.utensils = utensils
        this.listenersFn.utensils.forEach(fn => fn(this.utensils))
    }

}