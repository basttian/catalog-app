<script>
 import { FirebaseApp, User, Doc, Collection } from "sveltefire";
 import firebase from "firebase/app";
 export let id;
 export let codigo; 
 let pData;

let cod,nombre,precio,disponibles,descripcion,imagen;

</script>


<div id="modal-sections" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
<FirebaseApp {firebase}>
<User let:user let:auth on:user>
<Doc path={`productos/${id}`} let:data={pData} let:ref log >
<div slot="loading"><div uk-spinner></div></div>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">Editar {codigo} </h2>
        </div>
        <div class="uk-modal-body">
        <form class="uk-grid-small" uk-grid on:submit|preventDefault>
        
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-s">Cod. Artículo</label>
            <input class="uk-input" value={pData.codigo} bind:this={cod} id="form-s" type="text" >
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-text">Nombre del Artículo</label>
            <input class="uk-input" value={pData.nombre} bind:this={nombre} id="form-s" type="text" >
        </div>
            <div class="uk-width-1-4@s">
            <label class="uk-form-label" for="form-s">$ Precio</label>
            <input class="uk-input" value={pData.precio} bind:this={precio} id="form-s" type="text" >
        </div>
        <div class="uk-width-1-4@s">
            <label class="uk-form-label" for="form-s">Disponibles</label>
            <input class="uk-input" value={pData.disponibles} bind:this={disponibles} id="form-s" type="number" min="1" >
        </div>
        <div class="uk-width-1-2@s">
            <label class="uk-form-label" for="form-stacked-text">Descripción</label>
            <textarea class="uk-textarea" id="form-s" rows="3" bind:this={descripcion} >{pData.descripcion}</textarea>
        </div>
        <div class="uk-width-1-1">
            <div class="uk-inline">
                <a class="uk-form-icon uk-form-icon-flip" href="https://imgur.com/" target="_blank" uk-tooltip="title: Imgur" uk-icon="icon: image"></a>
            <input class="uk-input uk-form-width-large" value={pData.urlImagen} bind:this={imagen} id="form-s" type="text" >
            </div>
        </div>
        </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-default uk-float-left"
            on:click={() => {
                UIkit.modal.confirm('Esta seguro que desea eliminar este artículo!').then(function() {
                    ref.delete().then(()=>{
                    UIkit.notification({message: `<span uk-icon='icon: trash'></span> Artículo eliminado éxitosamente.`, pos: 'top-center', status: 'primary'})
                    })
                }, function () {
                    UIkit.notification({message: "<span uk-icon='icon: warning'></span> Operación cancelada.", pos: 'top-center', status: 'danger'})
                })
            }}
            ><span uk-icon="icon: trash"></span></button>
            <button class="uk-button uk-button-default" type="button"
            on:click={() => {
               ref.update({
                codigo:cod.value,
                nombre:nombre.value,
                precio:Number(precio.value),
                disponibles:Number(disponibles.value),
                descripcion:descripcion.value,
                urlImagem:imagen.value.trim()
                }).then(()=>{
                UIkit.modal("#modal-sections").hide();
                UIkit.notification({message: "<span uk-icon='icon: check'></span> Artículo actualizado con éxito.", pos: 'top-center', status: 'primary'})
                });
            }}
            ><span uk-icon="icon: pencil"></span> Actualizar artículo</button>
        </div>
</Doc>
</User>
</FirebaseApp>

    </div>
</div>

