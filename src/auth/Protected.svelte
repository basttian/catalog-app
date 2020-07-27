<script>
  import { Router, Route, Link } from 'yrv';
  import { usuario } from '../Store/store.js'
  import LOGIN from "./Login.svelte";
  import ADMINISTRACION from "./Administracion.svelte";
</script>

{#if !$usuario }
<LOGIN/>
{:else}
<ADMINISTRACION />
{/if}