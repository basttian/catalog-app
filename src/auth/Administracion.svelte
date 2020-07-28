<script>
  import { FirebaseApp, User, Doc, Collection } from "sveltefire";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  const db = firebase.firestore();
  import { Router, Route, Link } from 'yrv';
  import { usuario } from '../Store/store.js'

  import catalog from "../component/Home.svelte";
  import login from "./Login.svelte";
  import administracion from "./Administracion.svelte";

/* Menu */
  import Configuracion from "./Configuracion.svelte";
  import Categoria from './Categoria.svelte';
  import Productos from './Productos.svelte';

  const menus = [
    {title: 'Configuracion' , component: Configuracion},
    {title: 'Categoria'     , component: Categoria},
    {title: 'Productos'     , component: Productos},
  ]

  let menuValue = menus[0];

/* Fin menu */

</script>

<svelte:head>
  <title>Administración</title>
</svelte:head>

<ul uk-tab>
  <li class="uk-active"><a on:click={()=>menuValue = menus[0]} href="javascript:void(0)">Administracion</a></li>
  <li><a on:click={()=>menuValue = menus[1]} href="javascript:void(0)">Categoria</a></li>
  <li><a on:click={()=>menuValue = menus[2]} href="javascript:void(0)">Productos</a></li>
</ul>

<div class="uk-container">
  <svelte:component this={menuValue.component}/>
</div>