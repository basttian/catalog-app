<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();

    let pData,cData,scData; /* Collection Data */
    let categoria; /* Select Categoria */
    let subcategoria; /* Select SubCategoria */
    let nombreArticulo;
    let descripcionArticulo;
    let precioArticulo;
    let codigoArticulo;
    let disponibles;
    let urlImagenArticulo ='';

    /*https://ibm.github.io/carbon-icons-svelte/?ref=madewithsvelte.com*/
    import Product32 from "carbon-icons-svelte/lib/Product32";

</script>

<FirebaseApp {firebase}>
<User let:user>
<Collection path={'productos'} let:data={pData} let:ref={pRef} log>
<div slot="loading"><div uk-spinner></div></div>


<fieldset class="uk-fieldset">
    <legend class="uk-legend"><Product32 /> Añadir nuevo producto</legend>
<form on:submit|preventDefault={()=>{console.log("Send..")}} class="uk-grid-small uk-margin" uk-grid >
    <div class="uk-width-1-1">
        <label class="uk-form-label" for="form-stacked-text">Cod. Articulo</label>
        <div class="uk-form-controls">
            <input class="uk-input" bind:value={codigoArticulo} id="form-stacked-text" type="text" placeholder="Art. R00.000...">
        </div>
    </div>
<Collection path={`categorias`} query={ (ref) => ref.orderBy("categoria", "asc") }  let:data={cData} let:ref={cRef} log >
<div slot="loading"><div uk-spinner></div></div>
            <div class="uk-width-1-2@s">
                <label class="uk-form-label" for="form-stacked-text">Categoria</label>
                <select class="uk-select" bind:value={categoria}>
                    {#each cData as ItemCategoria}
                         <option value={ItemCategoria.id}>{ItemCategoria.categoria}</option>
                    {/each}
                </select>
            </div>
<Collection path={`subcategorias`} query={ (ref) => ref.where("categoria", "==", `${categoria}`) } let:data={scData} let:ref={scRef} log >
<div slot="loading"><div uk-spinner></div></div>
            <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-text">Sub-Categoria</label>
                <select class="uk-select" bind:value={subcategoria}>
                    {#each scData as ItemSubCategoria}
                        <option value={ItemSubCategoria.id}>{ItemSubCategoria.subcategoria}</option>
                    {/each}
                </select>
            </div>
</Collection>
</Collection>
            <div class="uk-width-1-2@s">
                <input class="uk-input" type="text" bind:value={nombreArticulo} placeholder="Nombre del artículo*">
            </div>
            <div class="uk-width-1-2@s">
                <textarea class="uk-textarea" bind:value={descripcionArticulo} rows="5" placeholder="Descripcion Corta*"></textarea>
            </div>
            <div class="uk-width-1-2@s">
                <input class="uk-input" bind:value={urlImagenArticulo} type="text" placeholder="https:// url.imagen 400x600 px">
            </div>
              <div class="uk-width-1-4@s">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: star"></span>
                    <input class="uk-input" bind:value={disponibles} type="number" min="1" placeholder="Disponibles">
                </div>
            </div>
            <div class="uk-width-1-4@s">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: credit-card"></span>
                    <input class="uk-input" bind:value={precioArticulo} type="number" min="1" placeholder="Precio*">
                </div>
            </div>
            <div class="uk-width-1-1">
            <button class="uk-button uk-button-secondary uk-width-1-1" 
            on:click={()=> pRef.add({
                created: new Date().getTime(),
                categoria: categoria,
                subcategoria: subcategoria,
                nombre: nombreArticulo,
                descripcion: descripcionArticulo,
                codigo: codigoArticulo,
                precio: precioArticulo,
                disponibles: disponibles,
                urlImagen: urlImagenArticulo.trim(),
            }).then(()=>{
                //console.log("Articulo Agregado con exito")
                categoria='';
                subcategoria='';
                nombreArticulo='';
                descripcionArticulo='';
                codigoArticulo='';
                precioArticulo='';
                disponibles='';
                urlImagenArticulo='';
                UIkit.notification({message: "<span uk-icon='icon: check'></span> Artículo agregado correctamente.", pos: 'top-center', status: 'primary',timeout: 1000 })
            }).catch((error)=>{console.log(error)})}
            disabled={!nombreArticulo || !precioArticulo || !descripcionArticulo }>Guardar</button>
            </div>
</form>   
</fieldset>



</Collection>
</User>
</FirebaseApp>