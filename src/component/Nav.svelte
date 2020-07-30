<script>
  import { product, cesta, qty, tot } from "../Store/store.js";
  import _ from 'lodash';
  /*https://ibm.github.io/carbon-icons-svelte/?ref=madewithsvelte.com*/
  import ShoppingCart32 from "carbon-icons-svelte/lib/ShoppingCart32";

  async function removeItemFromCart(item) {
    var i = $product.indexOf(item);
    if (i !== -1) {
      $product.splice(i, 1);
      product.update(u => u);
      cesta.update(n => n - 1);
       await qty.update(u=>_.sumBy( $product, function(o) { return o.cantidad; }));
       await tot.update(u=>_.sumBy( $product, function(o) { return o.total; }));
    }
  }

let pedido='';

 const consulta = (event) => {
    let arrPedido=[];
  _.forEach($product, function(value, key) {
    if(key != 0){
    arrPedido.push(value.producto,value.cantidad);
     //console.log(_.groupBy(arrPedido,[key]))
    return pedido = _.join(arrPedido,' - ');
    }
  })
   //console.log( pedido ) 
   event.stopPropagation(); 
 }
  

</script>

<div uk-sticky>
  <nav class="uk-navbar-container uk-margin boundary-align " uk-navbar>
    <div class="uk-navbar-left">
      <a
        class="uk-navbar-toggle uk-text-secondary "
        uk-toggle="target: #offcanvas-flip">
        <span uk-navbar-toggle-icon />
        <span class="uk-margin-small-left">Menú de artículos</span>
      </a>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li class="uk-parent">
          <a class="uk-float-right" href="javascript:void(0)">
            <ShoppingCart32 />
            <span class="uk-badge uk-margin-right">{isNaN($qty)?$cesta:$qty}</span>
          </a>
        </li>
      </ul>
      <div
        uk-dropdown="pos: bottom-justify; boundary: .boundary-align;
        boundary-align: true">
        <ul class="uk-nav uk-dropdown-nav">
          {#if $cesta > 0}
            {#each $product as value, i}
              {#if i != 0}
                <li>
                  <div class="uk-grid-small" uk-grid>
                      <div class="uk-width-expand" uk-leader="media: @s"><span uk-icon="icon: check"></span> {value.cantidad} {value.producto} x ${value.precio} = ${(value.precio * value.cantidad).toFixed(2)}</div>
                      <div><a class="uk-margin" href="javascript:void(0)" on:click={() => removeItemFromCart(value)} uk-icon="icon: trash"> </a></div>
                  </div>
                </li>
              {/if}
            {/each}
            <li class="uk-nav-divider" />
            <li class="uk-text-right" >Cantidad de articulos: {$qty}, Total ${Number($tot).toFixed(2)}</li>
            <li class="uk-nav-divider" />
            <li>
              <a href="https://api.whatsapp.com/send?phone=542664003830&text=Consulta:%20{pedido},%20por%20un%20Total%20de%20${$tot}" on:click={consulta} target="_blank">
                <span class="uk-margin-small-right" uk-icon="icon: whatsapp" />
                Consulta al vendedor por estos artículos.
              </a>
            </li>
          {:else}
            <li>
              <span uk-icon="icon: info" />
              El carrito esta vacio.
            </li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
</div>
<!-- https://api.whatsapp.com/send?phone=542664003830&text={pedido}%20Total${$tot}target="_blank" -->