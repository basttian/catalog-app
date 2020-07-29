import { derived,  readable, writable } from 'svelte/store'


//I Love
export const usuario =  writable(false);
export const cesta =  writable(0);	
export let product =  writable([{}]);
    
export let qty = writable(0);
export let tot = writable(0);