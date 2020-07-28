<script>
 export let id;
 export let codigo; 

</script>

<div id="modal-sections" uk-modal>
    <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
            <h2 class="uk-modal-title">Editar {codigo} </h2>
        </div>
        <div class="uk-modal-body">
            <p></p>
        </div>
        <div class="uk-modal-footer uk-text-right">
            <button class="uk-button uk-button-danger  uk-float-left"><span uk-icon="icon: trash"></span></button>
            <button class="uk-button uk-button-primary" type="button"><span uk-icon="icon: pencil"></span> Actualizar artículo</button>
        </div>
    </div>
</div>