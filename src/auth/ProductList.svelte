<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();
  import { Router, Route, Link } from "yrv";
  import { usuario } from "../Store/store.js";

  /* Variables */
  let productCategorie, productSubcategorie;
  let productData = [];
  let idCat, idSubCat;
  $: idCat = '';
  $: idSubCat = '';

  let query = (ref) => ref.orderBy('created','desc');

  async function getAllProduct(){
    query =  (ref) => ref.orderBy('created','desc');
  }

  async function getProduct(id) {
    query =  (ref) => ref.where('categoria','==',`${id}`);
  }

  /* Filter */
  import {filterName} from './tabla.js';
  import MODALEDIT from './ModalEdit.svelte';
  let _id;
  let _codigo;
  function OpenModal(id,cod){
      _id = id;
      _codigo = cod;
      UIkit.modal("#modal-sections").show();
  }


</script>


<form class="uk-search uk-search-navbar" on:submit|preventDefault={()=>{filterName}}>
    <span uk-search-icon></span>
    <input class="uk-search-input" type="search" on:keyup={filterName} placeholder="Buscar articulo..." id="myInput" >
</form>
<hr>

<FirebaseApp {firebase}>
<Collection path={`categorias`} let:data={productCategorie} log>
<div>
    <ul class="uk-subnav uk-subnav-pill" uk-margin>
            <li><a class="uk-link-heading" href="javascript:void(0);" on:click={()=> getAllProduct() } >Todas las categorías</a></li>
        {#each productCategorie as value}
            <li><a class="uk-link-heading" href="javascript:void(0);" on:click={()=> getProduct(value.id) } >{value.categoria}</a></li>
        {/each}
    </ul>
</div>
</Collection>

  <Collection
    path={`productos`}
    {query}
    let:data={productData}
    let:ref={productRef}
    log>
    <div slot="loading">
      <div uk-spinner />
    </div>
    <div class="uk-overflow-auto">
      <table class="uk-table uk-table-striped uk-table-hover" id="myTable"> 
        <caption></caption>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Disponibles</th>
            <th>Descripcion</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
            {#each productData as item}
                
                <tr class="hand" on:click={()=> {OpenModal(item.id, item.codigo )}} >
                    <td>{item.codigo}</td>
                    <td>{item.nombre}</td>
                    <td>{item.precio}</td>
                    <td>{item.disponibles}</td>
                    <td>{item.descripcion}</td>
                    <td><img src={item.urlImagen} width="50" height="50" alt={item.nombre} ></td>
                </tr>
               
            {/each}
        </tbody>
      </table>
    </div>
 <p>Viendo {productData.length} articulos.</p>
  </Collection>
</FirebaseApp>

<MODALEDIT id={_id} codigo={_codigo} />

<div class="uk-grid-match uk-grid-small uk-text-center" uk-grid>
    <div class="uk-width-1-12@m">
        <div class="uk-card uk-card-default uk-card-body"><a href="#" uk-totop uk-scroll> </a></div>
    </div>
</div>