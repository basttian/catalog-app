<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";

  let count_value = [];
  $: query = (ref) => ref.orderBy("created","desc").limit(20);

  import BTN from './Button.svelte';

</script>

<svelte:head>
<title>Catalogo</title>
</svelte:head>


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
<BTN codigoProducto={item.codigo} precioProducto={item.precio} cantidadProducto={count_value[index]} />

                <a class="uk-position-absolute uk-transform-center bkg-button-social uk-border-circle" 
                    style="left: 70%; top: 20%" href="javascript:void(0);">
<div class="uk-animation-toggle" tabindex="0">
        <div class="uk-transform-origin-top-center uk-animation-scale-up">
            <span uk-icon="icon: social;ratio:2"></span> 
        </div>
</div>
                </a>
                <div uk-dropdown="pos: bottom-justify">
                    <ul class="uk-nav uk-dropdown-nav">
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=542664003830&text={item.codigo}%20precio${item.precio}" target="_blank"><span uk-icon="icon: whatsapp"></span> Whatsapp</a>
                        </li>
                        <li class="uk-nav-divider"></li>
                        <li>
                        <a href="https://www.messenger.com/t/diego.sebastian.0" target="_blank"><span uk-icon="icon: facebook"></span> Facebook</a>
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