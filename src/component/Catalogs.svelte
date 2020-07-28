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

  $: query = (ref) => ref.where("subcategoria", "==", id);

    import { product, cesta } from '../Store/store.js';

  let arr = [];
  let promise;

  const addProductToCart = async(producto, precio, cantidad) => {
    if(arr.findIndex(x => x.producto === producto) === -1 ){
    await arr.push({producto:producto,precio:precio,cantidad:cantidad});
    await cesta.update(n => n + 1);
    await product.update( u => arr );

   }else if( arr.findIndex(x => x.producto === producto) > -1 ){
       //console.log(producto + ' ya se encuentra en la cesta de compras.');
        UIkit.notification({
            message: `<span uk-icon="icon: warning"></span> ${producto}, ya se encuentra en la cesta de compras.`,
            status: 'danger',
            pos: 'top-center',
            timeout: 2000
        });
    }
  } 

function handleClick(c,p,cc) {
    promise = addProductToCart(c,p,cc);
  }

</script>

<svelte:head>
<title>Articulos por sub-categorias</title>
</svelte:head>

<div class="uk-position-center">
    {#await promise }
      <div uk-spinner="ratio: 3"></div>
    {/await}
</div>

<FirebaseApp {firebase}>
<Collection path={'productos'} {query} let:data let:ref log>
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

    <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-text-center">
        {#each data as item, index}
        <li>
            <img src={item.urlImagen} alt="" width="400" height="600"> 
             <div class="uk-position-center">
                <h2>{item.nombre}</h2>
                <p>{item.descripcion}</p>
            </div>
               
<!-- Botn add CArt -->
<a class="uk-position-absolute uk-transform-center" 
 style="left: 25%; top: 25%" href="javascript:void(0);" 
 uk-tooltip="Agregar al carrito" 
 on:click={() => handleClick( item.codigo, item.precio, isNaN(count_value[index])?1:count_value[index] )} >
<span class="uk-icon-button" uk-icon="icon: cart;ratio:1.5"></span> 
</a>

                <a class="uk-position-absolute uk-transform-center" 
                    style="left: 70%; top: 20%" href="javascript:void(0);">
                <span class="uk-icon-button" uk-icon="icon: social;ratio:1.5"></span> 
                </a>
                <div uk-dropdown="pos: bottom-justify">
                    <ul class="uk-nav uk-dropdown-nav">
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=542664003830&text={item.codigo}%20precio${item.precio}" target="_blank"><span uk-icon="icon: whatsapp"></span> Whatsapp</a>
                        </li>
                        <li class="uk-nav-divider"></li>
                        <li>
                            <a href="mailto:sebastianjof@gmail.com?subject=Consulta&body={item.codigo}" target="_blank"><span uk-icon="icon: mail"></span> e-mail</a>
                        </li>
                    </ul>
                </div>
                <div class="uk-position-bottom-center uk-overlay uk-panel uk-margin-top">
                    <h1>${isNaN(item.precio*count_value[index])?(item.precio).toFixed(2):(item.precio*count_value[index]).toFixed(2)}</h1>
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
                </div> 
        </li>
        {/each}
    </ul>
    <a class="uk-position-top-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"> </a>
    <a class="uk-position-top-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"> </a>
</div>
</Collection>


</FirebaseApp>
