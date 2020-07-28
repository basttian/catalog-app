<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  import { usuario } from './Store/store.js'
  
  let firebaseConfig = {
    apiKey: "AIzaSyAEwaOjWCKddfBnQKmL_dDHbxnNrPTY71E",
    authDomain: "catalog-app-393d1.firebaseapp.com",
    databaseURL: "https://catalog-app-393d1.firebaseio.com",
    projectId: "catalog-app-393d1",
    storageBucket: "catalog-app-393d1.appspot.com",
    messagingSenderId: "792884826496",
    appId: "1:792884826496:web:dedb5d4a567de2e5007165",
    measurementId: "G-7W8HJKSBY0"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      var tel = user.phoneNumber;
      usuario.set(true);
      console.log(uid);
    } else {
      usuario.set(false);
      console.log("No user in line");
    }
  });

  const Salir = () =>{
    //console.log(user)
    UIkit.modal.confirm('Esta seguro que desea salir de la aplicación...').then(function() {
    //console.log('Confirmed.')
    firebase.auth().signOut().then(resp => {
    UIkit.notification({message: '<span uk-icon=\'icon: check\'></span> Desconexión satisfactoria.', status: 'primary'});    
    });
    }, function () {
        console.log('Rejected.')
    });
  }

  import { Router, Route, Link } from 'yrv';
  import NAV from "./component/Nav.svelte";

  import home from "./component/Home.svelte";
  import admin from "./auth/Protected.svelte";
  import administracion from "./auth/Administracion.svelte";

  import catalogc from "./component/Catalogc.svelte"
  import catalogs from "./component/Catalogs.svelte"

  /* Menu */
  import DocumentSubtract24 from "carbon-icons-svelte/lib/DocumentSubtract24";
  let categoriasData, subCategoriaData;

</script>

<svelte:head>
<title>Catalog-App</title>
</svelte:head>

<NAV />
<FirebaseApp {firebase}>

<div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <h3><DocumentSubtract24 /> Menu</h3>
        <ul class="uk-nav uk-nav-default">
<Collection path={`categorias`} let:data={categoriasData} let:ref={categoriaReference} log>
<div slot="loading"><div uk-spinner></div></div>
            <li>
              <Link class="uk-text-secondary" href="/component/home"> Home</Link>
            </li>
            {#each categoriasData as values}
            <li class="uk-parent">
              <Link href="/component/catalogc/{values.id}">{values.categoria}</Link>
              <Collection path={`subcategorias`} query={ref=>ref.where('categoria','==',`${values.id}`)} let:data={subCategoriaData} let:ref={subCategoriaReference} log>
              <div slot="loading"><div uk-spinner></div></div>
              {#each subCategoriaData as item}
                 <ul class="uk-nav-sub">
                    <li><Link href="/component/catalogs/{item.id}">{item.subcategoria}</Link></li>
                </ul>
              {/each}
              </Collection>
            </li>
            {/each}
            
</Collection>
<li class="uk-nav-divider"></li>
{#if !$usuario}
    <li><Link class="uk-text-secondary" href="/auth/protected"><span uk-icon="sign-in"></span> Administración</Link></li>
{:else}
    <li class="uk-nav-header">Administracion</li>
    <li>
        <Link href="/auth/administracion"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Administración</Link>
    </li>
    <li class="uk-nav-divider"></li>
    <li><a class="uk-text-secondary" on:click={Salir} href="javascript:void(0)"><span uk-icon="sign-out"></span> Salir</a></li>
{/if}

        </ul>
    </div>
</div>

</FirebaseApp>


<div class="uk-container">
  <Router>
      <Route exact component={home}/>
      <Route exact path="/component/home" component={home}/>
      <Route exact path="/auth/protected" component={admin}/>
      <Route exact path="/auth/administracion" component={administracion}/>
      <Route path="/component/catalogc/:id" exact component={catalogc} />
      <Route path="/component/catalogs/:id" exact component={catalogs} />
  </Router>
</div>