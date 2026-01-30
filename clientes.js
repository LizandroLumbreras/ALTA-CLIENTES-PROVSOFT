import { db, storage } from "./firebase.js";
import {
  collection, addDoc, getDocs, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const tabla = document.getElementById("tablaClientes");
const fileInput = document.getElementById("fileInput");
let clienteActual = null;

window.guardarCliente = async () => {
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
  cargarClientes();
};

async function cargarClientes(){
  tabla.innerHTML="";
  const snap = await getDocs(collection(db,"clientes"));
  snap.forEach(doc=>{
    const c = doc.data();
    tabla.innerHTML += `
      <tr>
        <td>${c.nombre}</td>
        <td>${c.rfc}</td>
        <td>${c.email}</td>
        <td>
          <button class="doc-btn" onclick="subirDoc('${doc.id}')">📎 Documento</button>
        </td>
      </tr>
    `;
  });
}

window.subirDoc = (id)=>{
  clienteActual = id;
  fileInput.click();
};

fileInput.onchange = async e=>{
  const file = e.target.files[0];
  if(!file || !clienteActual) return;

  const ruta = ref(storage, `clientes/${clienteActual}/documentos/${file.name}`);
  await uploadBytes(ruta, file);
  const url = await getDownloadURL(ruta);

  await addDoc(collection(db,"clientes",clienteActual,"documentos"),{
    nombre:file.name,
    url,
    creado:new Date()
  });

  alert("Documento cargado correctamente");
};

cargarClientes();
