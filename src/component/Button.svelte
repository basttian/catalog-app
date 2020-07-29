<script>
  import { tot, qty, product, cesta } from '../Store/store.js';
  import _ from 'lodash';
  import { get } from 'svelte/store';
  const arr = get(product);


  export let codigoProducto;
  export let precioProducto;
  export let cantidadProducto;

  let promise;

  const addProductToCart = async(producto, precio, cantidad) => {
    if(arr.findIndex(x => x.producto === producto) === -1 ){
    await arr.push({producto:producto,precio:precio,cantidad:cantidad,total:(cantidad*precio) });
    await cesta.update(n => n + 1);
    await product.update( u => arr );
    await qty.set(_.sumBy(arr, function(o) { return o.cantidad; }));
    await tot.set(_.sumBy(arr, function(o) { return o.total; }));
    //console.log($product);

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

 
 <a class="uk-position-absolute uk-transform-center bkg-button-cart uk-border-circle uk-text-primary" 
 style="left: 35%; top: 25%" href="javascript:void(0);" 
 uk-tooltip="Agregar al carrito" 
 on:click={() => handleClick( codigoProducto, precioProducto, isNaN(cantidadProducto)?1:cantidadProducto )} >
    <div class="uk-animation-toggle" tabindex="0">
        <div class="uk-transform-origin-top-center uk-animation-scale-up">
<span uk-icon="icon: cart;ratio:3"></span> 
   </div>
    </div>
</a>


<!-- on:click={() => addProductToCart( item.codigo, item.precio, isNaN(count_value[index])?1:count_value[index] )}  -->

<div class="uk-position-center">
    {#await promise }
      <div uk-spinner="ratio: 3"></div>
    {/await}
</div>