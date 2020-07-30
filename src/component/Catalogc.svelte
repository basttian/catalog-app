<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import { Link } from "yrv";
  let count_value = [];
  export let router = {};
  let id = null;
  $: {
    id = router.params ? router.params.id : null;
  }

  $: query = (ref) => ref.where("categoria", "==", id);

  import BTN from './Button.svelte';  

</script>

<svelte:head>
<title>Articulos por categorias</title>
</svelte:head>

<FirebaseApp {firebase}>
<Collection path={'productos'} {query} let:data let:ref log>
<div slot="loading"><div uk-spinner="ratio: 3"></div></div>
<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

    <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-text-center">
        {#each data as item, index}
        <li>
            <img src={item.urlImagen} alt="" width="400" height="600"> 
             <div class="uk-position-center">
                <h2>{item.nombre}</h2>
                <p>{item.descripcion}</p>
            </div>
               
<!-- Boton -->
<BTN codigoProducto={item.codigo} precioProducto={item.precio} cantidadProducto={count_value[index]} boleambtnsendcart={item.chunk} />
<div class="uk-position-bottom-center uk-overlay uk-panel uk-margin-top">
<h1>${isNaN(item.precio*count_value[index])?(item.precio).toFixed(2):(item.precio*count_value[index]).toFixed(2)}</h1>

{#if !item.chunk}
     
<p>{item.codigo} - Cantidad: {isNaN(count_value[index])?1:count_value[index]} </p>
    <input type=range 
    bind:value={count_value[index]}
    min=1
    max={item.disponibles}
    on:change={({ target: { value } }) => {
        if(value==item.disponibles){
            UIkit.notification({
                message: `<span uk-icon="icon: warning"></span> ${item.disponibles} artículos disponibles.`,
                status: 'danger',
                pos: 'top-center',
                timeout: 1000
            });
        }
        }}
    >

{:else}

 <h4 class="bkg-aviso" >{item.codigo} - Solo por pedido.</h4>

{/if}

                </div> 

        </li>
        {/each}
    </ul>
    <a class="uk-position-top-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"> </a>
    <a class="uk-position-top-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"> </a>
</div>
</Collection>


</FirebaseApp>
