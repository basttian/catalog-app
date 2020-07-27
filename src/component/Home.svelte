<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";

  let wsp ='https://api.whatsapp.com/send?phone=';
  let telefono =' 542664003830';
  let cod = 'Art.345000';
  let precio = 678;
  let url = wsp.concat(telefono,'&text=',cod,' precio $',precio.toString());

  let arr = [];

  import { product, cesta } from '../Store/store.js';

  const addProductToCart = async(producto, precio, cantidad) => {
    
    if(arr.findIndex(x => x.producto === producto) === -1 ){
    arr.push({producto:producto,precio:precio,cantidad:cantidad});
    cesta.update(n => n + 1);
    product.set(arr);
   }else if( arr.findIndex(x => x.producto === producto) > -1 ){
       //console.log(producto + ' ya se encuentra en la cesta de compras.');
        UIkit.notification({
            message: `<span uk-icon="icon: warning"></span> ${producto}, ya se encuentra en la cesta de compras.`,
            status: 'danger',
            pos: 'top-center',
            timeout: 2000
        });
   }

  /*  var index = arr.findIndex(function(element) {
        return element.producto === producto;
    }); 

    //console.log(arr[index].producto);
    var resultado = arr.find(e=>e.producto===arr[index].producto);
    //console.log(resultado.producto);
    code=arr[index].producto;
    qty=arr[index].cantidad;

     arr.map(function(dato){
        if(dato.producto == code){
           dato.cantidad = qty + cantidad;
          }
            console.log(dato);
            return dato;
        });
 */
    
}
    let count_value = [];

</script>

<svelte:head>
<title>Catalogo</title>
</svelte:head>

<FirebaseApp {firebase}>
<User let:user>
<Collection path={'productos'} let:data let:ref log>
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider>

    <ul class="uk-slider-items uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-text-center">
        {#each data as item, index}
        <li>
            <img src="https://getuikit.com/docs/images/slider1.jpg" alt="" width="400" height="600">
             <div class="uk-position-center">
                <h2>{item.nombre}</h2>
                <p>{item.descripcion}</p>
            </div>


    <a class="uk-position-absolute uk-transform-center" 
        style="left: 25%; top: 25%" href="javascript:void(0);" 
        uk-tooltip="Agregar al carrito" 
        on:click={() => addProductToCart( item.codigo, item.precio, isNaN(count_value[index])?1:count_value[index] )} >
    <span class="uk-icon-button" uk-icon="icon: cart;ratio:1.5"></span> 
    </a>


    <a class="uk-position-absolute uk-transform-center" 
        style="left: 70%; top: 20%" href="javascript:void(0);">
    <span class="uk-icon-button" uk-icon="icon: social;ratio:1.5"></span> 
    </a>

            <div uk-dropdown="pos: bottom-justify">
                <ul class="uk-nav uk-dropdown-nav">
                    <li>
                        <a href={url} target="_blank"><span uk-icon="icon: whatsapp"></span> Whatsapp</a>
                    </li>
                    <li class="uk-nav-divider"></li>
                     <li>
                        <a href="mailto:sebastianjof@gmail.com?subject=Consulta&body={cod}" target="_blank"><span uk-icon="icon: mail"></span> e-mail</a>
                    </li>
                </ul>
            </div>
            <div class="uk-position-bottom-center uk-overlay uk-panel uk-margin-top">
                <h1>${isNaN(item.precio*count_value[index])?item.precio:item.precio*count_value[index]}</h1>
                <p>{item.codigo} - Cantidad: {isNaN(count_value[index])?1:count_value[index]} </p>
                <input type=range 
                bind:value={count_value[index]} 
                min=1 
                max={item.disponibles} 
                on:change={({ target: { value } }) => {
                    if(value==item.disponibles){
                        UIkit.notification({
                            message: '<span uk-icon="icon: warning"></span> Último disponible.',
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

    <a class="uk-position-top-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
    <a class="uk-position-top-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

</div>
</Collection>
</User>
</FirebaseApp>