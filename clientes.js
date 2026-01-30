import { db, storage } from "./firebase.js";
import {
  collection, addDoc, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

window.guardarCliente = async function () {
  const data = {
    nombre: nombre.value,
    rfc: rfc.value,
    regimen: regimen.value,
    email: email.value,
    telefono: telefono.value,
    calle: calle.value,
    numExterior: numExt.value,
    colonia: colonia.value,
    municipio: municipio.value,
    estado: estado.value,
    cp: cp.value,
    pais: pais.value,
    creado: serverTimestamp()
  };

  await addDoc(collection(db, "clientes"), data);
  alert("Cliente guardado");
};
