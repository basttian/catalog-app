<script>
	import { count } from '../Store/store.js';

	function decrement() {
        count.update(n => n - 1);
    }
    function increment() {
		count.update(n => n + 1);
    }
    function reset() {
		count.set(1);
    }
    
</script>

<button class="uk-margin" on:click={decrement} disabled={$count <= 1} uk-icon="icon: minus-circle"></button>
<button class="uk-margin" on:click={increment} uk-icon="icon: plus-circle"></button>
<button class="uk-margin" on:click={reset} uk-icon="icon: refresh"></button>

