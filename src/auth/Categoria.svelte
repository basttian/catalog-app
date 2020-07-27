<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();

  let categoria;
  let subcategoria;
  let selectedCategory;
  let cD, scD;


  import TBL from "./tbl_subcategoria.svelte";

  </script>
<FirebaseApp {firebase}>
    <User let:user>
        

<Collection path={'categorias'} let:data={cD} let:ref={cR} log>
<div slot="loading"><div uk-spinner></div></div>

<div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-2@s uk-text-center uk-grid-divider" uk-grid>
<div>
  <form on:submit|preventDefault={()=>console.log('SaveDataCategory')}>
    <fieldset class="uk-fieldset">
        <legend class="uk-legend">Categoria</legend>
        <div class="uk-margin">
            <input class="uk-input" type="text" bind:value={categoria} placeholder="Ingrese categoría">
        </div>
        <button class="uk-button uk-button-primary uk-margin-top" on:click={()=> cR.add({ uid: user.uid, categoria: categoria }).then(()=> categoria='' ) } disabled={!categoria}>Guardar categoría</button>
    </fieldset>
  </form>
</div>

<div>
  <table class="uk-table uk-table-hover uk-table-divider">
    <thead>
        <tr>
            <th>Categoria</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
      {#each cD as item}
        <tr>
            <td>
              <input class="uk-input uk-form-blank" type="text" bind:value={item.categoria} 
              on:keyup={()=> item.ref.update({
                uid: user.uid, categoria: item.categoria
              })}
              >
            </td>
            <td>
              <a href="javascript:void(0)" 
              class="uk-icon-link" 
              uk-icon="trash"
              uk-tooltip="title: Borrar;pos: top"
              on:click={() => item.ref.delete().then(resp=>{
                UIkit.notification({message: "<span uk-icon='icon: trash'></span> Registro eliminado.", pos: 'top-center', status: 'danger'})
                })}
              >
              </a>
            </td>
        </tr>
      {/each}
    </tbody>
</table>
</div>

</div>


<!-- Subcategoria -->
<div class="uk-grid-column-small uk-grid-row-large uk-child-width-1-2@s uk-text-center uk-grid-divider" uk-grid>

<div>
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Sub-Categoria</legend>
    <select class="uk-select uk-margin-top" bind:value={selectedCategory} >
        {#each cD as item}
            <option value={item.id} >{item.categoria}</option>
        {/each}
    </select>

    <Collection path={'subcategorias'} let:data={scD} let:ref={scR} log>
    <div slot="loading"><div uk-spinner></div></div>
        <form on:submit|preventDefault={()=>console.log('SaveDataSubCategory')} class="uk-grid-small" uk-grid>
            <div class="uk-margin-top uk-width-1-1" >
                <input class="uk-input" type="text"  bind:value={subcategoria} placeholder="Ingrese Subcategoría">
            </div>
            <div class="uk-margin uk-width-1-1">
                <button class="uk-button uk-button-primary" on:click={()=> scR.add({ categoria:selectedCategory, subcategoria: subcategoria }).then(()=> subcategoria='' ) } disabled={!subcategoria}>Guardar Sub-Categoría</button>
            </div>
        </form>
    </Collection>
  </fieldset>
</div>
  


<div class="uk-width-expand">
<TBL />
</div>


  
</div>

</Collection>
</User>
</FirebaseApp>