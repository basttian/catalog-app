<script>
  import { Router, Route, Link } from 'yrv';
  import { usuario } from '../Store/store.js'
  import ProductList from './ProductList.svelte';
</script>


{#if !$usuario }
<p>Volver al catalogo</p>
{:else}
<ProductList />
{/if}



