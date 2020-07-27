<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();

  let cD, scD;

</script>   


<Collection path={'categorias'} let:data={cD} let:ref={cR} log>
<div slot="loading"><div uk-spinner></div></div>
<Collection path={'subcategorias'} let:data={scD} let:ref={scR} log>
<div slot="loading"><div uk-spinner></div></div>
<div class="uk-overflow-auto">
<table class="uk-table uk-table-hover uk-table-divider">
  <thead>
      <tr>
        <th>Categoría</th>
        <th>Sub-categoría</th>
        <th>Acciones</th>
      </tr>
  </thead>
  <tbody>
      {#each scD as item}
        <tr>
            <td>

              <select class="uk-select" bind:value={item.categoria} on:change={() => item.ref.update({ categoria: item.categoria })}>
                  {#each cD as cat}
                    {#if item.categoria===cat.id}
                      <option value={cat.id} >{cat.categoria}</option>
                    {:else}
                      <option value={cat.id} >{cat.categoria}</option>
                    {/if}
                  {/each}
              </select>
      
            </td>
            <td>

              <input class="uk-input uk-form-blank" type="text" bind:value={item.subcategoria} on:keyup={()=> item.ref.update({ subcategoria: item.subcategoria })} >

            </td>
            <td>
              <a href="javascript:void(0)" 
              class="uk-icon-link" 
              uk-icon="trash"
              uk-tooltip="title: Borrar;pos: top"
              on:click={() => item.ref.delete().then(resp=>{
                UIkit.notification({message: "<span uk-icon='icon: trash'></span> Sub-Categoria eliminada.", pos: 'top-center', status: 'danger'})
                })}
              >
              </a>
            </td>
        </tr>
      {/each}
  </tbody>
</table>
</div>

</Collection>
</Collection>