
<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();

  let e,p;

  let promise;

  async function ingresar(email,password){
	  await firebase.auth().signInWithEmailAndPassword(email, password)
	   .then(function(){
	  	UIkit.notification({
	  		message: "<span uk-icon='icon: check'></span> Ingreso satisfactorio.", 
	  		status: 'primary',
	  		timeout: 1000
	  	});
	  	e='';
	  	p='';
	  	//console.log("Login success");
	  })
	  .catch(function(error) {
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	UIkit.notification({
	  		message: `<span uk-icon='icon: warning'></span> ${errorMessage}.`, 
	  		status: 'danger',
	  		timeout: 2000
	  	});
	  //console.log(errorCode, errorMessage);
		})
  }


function handleClick(e,p) {
    promise = ingresar(e,p);
  }

</script>


<svelte:head>
<title>Login</title>
</svelte:head>

<div class="uk-overlay uk-overlay-default">
<div class="uk-box-shadow-large uk-padding">
<h1>Ingresar</h1>
<form on:submit|preventDefault={()=>{handleClick(e,p)}}>
    <div class="uk-margin">
        <div class="uk-inline">
            <span class="uk-form-icon" uk-icon="icon: user"></span>
            <input bind:value={e} class="uk-input" type="email">
        </div>
    </div>
    <div class="uk-margin">
        <div class="uk-inline">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
            <input bind:value={p} class="uk-input" type="password">
        </div>
    </div>
<button class="uk-button uk-button-secondary" disabled={!e || !p}>Ingesar</button>
</form>
</div>
</div>
<div class="uk-position-center">
    {#await promise }
      <div uk-spinner="ratio: 3"></div>
    {/await}
</div>