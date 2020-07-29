<script>
  import { product, cesta } from "../Store/store.js";

  /*https://ibm.github.io/carbon-icons-svelte/?ref=madewithsvelte.com*/
  import ShoppingCart32 from "carbon-icons-svelte/lib/ShoppingCart32";

  function removeItemFromCart(item) {
    var i = $product.indexOf(item);
    if (i !== -1) {
      $product.splice(i, 1);
      product.update(u => u);
      cesta.update(n => n - 1);
    }
  }
</script>

<div uk-sticky>
  <nav class="uk-navbar-container uk-margin boundary-align " uk-navbar>
    <div class="uk-navbar-left">
      <a
        class="uk-navbar-toggle uk-text-secondary "
        uk-toggle="target: #offcanvas-flip">
        <span uk-navbar-toggle-icon />
        <span class="uk-margin-small-left">Catálogo</span>
      </a>
    </div>
    <div class="uk-navbar-right">
      <ul class="uk-navbar-nav">
        <li class="uk-parent">
          <a class="uk-float-right" href="javascript:void(0)">
            <ShoppingCart32 />
            <span class="uk-badge uk-margin-right">{$cesta}</span>
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
                  <a
                    on:click={() => removeItemFromCart(value)}
                    href="javascript:void(0)">
                    <span class="uk-margin-small-right" uk-icon="icon: trash" />
                    {value.producto} por {value.cantidad} uni. ${(value.precio * value.cantidad).toFixed(2)}
                  </a>
                </li>
              {/if}
            {/each}
            <li class="uk-nav-divider" />
            <li>
              <a href="#">
                <span class="uk-margin-small-right" uk-icon="icon: whatsapp" />
                Contacta al vendedor por estos productos.
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
