"use strict";

/*  Ruta de las imágenes */

const RUTA_IMG_PRODUCTOS = "img/";
const RUTA_IMG_BANNERS = "img/";

/* --- Clase producto ---empieza---*/
class Producto {
  constructor({ id, nombre, descripcion, descripcionLarga, precio, imagenes, categoria }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.descripcionLarga = descripcionLarga;
    this.precio = precio;
    this.imagenes = imagenes;
    this.categoria = categoria;
  }
}
/* --- Clase producto ---termina---*/


/* --- Base de datos de los productos---empieza---*/
const productosData = [
  {
    id: 1,
    nombre: "Serpenti Viper Anillo",
    descripcion: "Anillo en oro blanco con pavé de diamantes",
    descripcionLarga: "Inspirado en la elegancia hipnótica de la serpiente, elaborado en oro blanco de 18 quilates.",
    precio: 800000,
    imagenes: [
      "producto-SerpentiViperAnillo.webp",
      "producto-SerpentiViperAnillo02.webp",
      "producto-SerpentiViperAnillo03.webp"
    ],
    categoria: "ANILLOS",
  },
  {
    id: 2,
    nombre: "B.zero1 Collar",
    descripcion: "Minicolgante B.zero1 en oro blanco",
    descripcionLarga: "Obra maestra del diseño contemporáneo, armonía entre innovación y tradición.",
    precio: 900000,
    imagenes: [
      "producto-B.zero1Collar.webp",
      "producto-B.zero1Collar02.webp",
      "producto-B.zero1Collar03.webp"
    ],
    categoria: "COLLARES",
  },
  {
    id: 3,
    nombre: "Serpenti Viper Pendientes",
    descripcion: "Pendientes en oro blanco con pavé integral",
    descripcionLarga: "Forma fluida y brillante fabricada en oro blanco de 18 quilates.",
    precio: 505000,
    imagenes: [
      "producto-SerpentiViperPendientes.webp",
      "producto-SerpentiViperPendientes02.webp",
      "producto-SerpentiViperPendientes03.webp"
    ],
    categoria: "AROS",
  },
  {
    id: 4,
    nombre: "Serpenti Viper Pulsera",
    descripcion: "Pulsera en oro amarillo con diamantes",
    descripcionLarga: "Fusión de sensualidad y precisión en oro amarillo de 18 quilates.",
    precio: 980000,
    imagenes: [
      "producto-SerpentiViperPulsera.webp",
      "producto-SerpentiViperPulsera02.webp",
      "producto-SerpentiViperPulsera03.webp"
    ],
    categoria: "PULSERAS",
  },
  {
    id: 5,
    nombre: "Reloj Monete",
    descripcion: "Reloj secreto Monete Catene en oro amarillo",
    descripcionLarga: "Joyería clásica con micromovimiento de precisión.",
    precio: 12200000,
    imagenes: [
      "producto-RelojMonete.webp",
      "producto-RelojMonete02.webp",
      "producto-RelojMonete03.webp"
    ],
    categoria: "RELOJES",
  },
  {
    id: 6,
    nombre: "Divas Dream Anillo",
    descripcion: "Anillo en oro rosa con malaquita",
    descripcionLarga: "Captura la esencia de la feminidad italiana inspirada en mosaicos clásicos.",
    precio: 1500000,
    imagenes: [
      "producto-DivasDreamAnillo.webp",
      "producto-DivasDreamAnillo02.webp",
      "producto-DivasDreamAnillo03.webp"
    ],
    categoria: "ANILLOS",
  },
];

const productos = productosData.map(p => new Producto(p));

/* --- Base de datos de los productos--- termina ---*/


/*--- Banners por categoría ---empieza ---*/
const bannersPorCategoria = {
  ANILLOS: [{ imagen: "banner-anillos.webp" }],
  COLLARES: [{ imagen: "banner-collares.webp" }],
  AROS: [{ imagen: "banner-aros.webp" }],
  PULSERAS: [{ imagen: "banner-pulseras.webp" }],
  RELOJES: [{ imagen: "banner-relojes.webp" }],
};
/*--- Banners por categoría --- termina ---*/

/*---  Carrito de compras--- empieza ---*/
class ItemCarrito {
  constructor(producto, cantidad = 1) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
}

class CarritoDeCompras {
  constructor() {
    this.items = [];
  }

  agregar(producto) {
    const item = this.items.find(i => i.producto.id === producto.id);
    if (item) item.cantidad++;
    else this.items.push(new ItemCarrito(producto));

    this.guardar();
    actualizarMiniCarrito();
  }

  eliminarUnidad(id) {
    const item = this.items.find(i => i.producto.id === id);
    if (!item) return;

    item.cantidad--;
    if (item.cantidad <= 0) this.items = this.items.filter(i => i.producto.id !== id);

    this.guardar();
    actualizarMiniCarrito();
  }

  quitarProducto(id) {
    this.items = this.items.filter(i => i.producto.id !== id);
    this.guardar();
    actualizarMiniCarrito();
  }

  vaciar() {
    this.items = [];
    this.guardar();
    actualizarMiniCarrito();
  }

  total() {
    return this.items.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  cantidadTotal() {
    return this.items.reduce((acc, item) => acc + item.cantidad, 0);
  }

  guardar() {
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  cargar() {
    const data = JSON.parse(localStorage.getItem("carrito"));
    if (data) {
      this.items = data.map(i => new ItemCarrito(
        productos.find(p => p.id === i.producto.id),
        i.cantidad
      ));
    }
  }
}

const carrito = new CarritoDeCompras();
/*---  Carrito de compras--- termina ---*/

/* --- FUNCIÓN: actualizarMiniCarrito() --- empieza ---*/
function actualizarMiniCarrito() {
  const cantidadSpan = document.getElementById("mini-cantidad");
  const totalSpan = document.getElementById("mini-total");

  if (!cantidadSpan || !totalSpan) return;

  cantidadSpan.textContent = carrito.cantidadTotal();
  totalSpan.textContent = carrito.total();
}
/* --- FUNCIÓN: actualizarMiniCarrito() --- termina ---*/

/* --- FUNCIÓN: MostrarCatalogo() --- empieza --- */

function MostrarCatalogo(productosRecorrer = productos) {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productosRecorrer.forEach(producto => {
    const li = document.createElement("li");

    const img = document.createElement("img");
    img.src = RUTA_IMG_PRODUCTOS + producto.imagenes[0];
    img.alt = producto.nombre;

    const div = document.createElement("div");
    div.classList.add("producto-info");

    const h2 = document.createElement("h3");
    h2.textContent = producto.nombre;
    h2.classList.add("producto-nombre");


    const descripcion = document.createElement("p");
    descripcion.textContent = producto.descripcion;
    descripcion.classList.add("producto-descripcion");

    const precio = document.createElement("p");
    precio.textContent = `$${producto.precio}`;
    precio.classList.add("producto-precio");

    const categoria = document.createElement("p");
    categoria.textContent = producto.categoria;
    categoria.classList.add("producto-categoria");

    const footer = document.createElement("footer");

    const btnDetalle = document.createElement("button");
    btnDetalle.textContent = "Ver detalle";
    btnDetalle.classList.add("btn-secundario");
    btnDetalle.addEventListener("click", () => abrirModalDetalle(producto));

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
    btnAgregar.classList.add("btn-primario");
    btnAgregar.addEventListener("click", () => {
      carrito.agregar(producto);
      actualizarMiniCarrito();
    });

    footer.append(btnDetalle, btnAgregar);
    div.append(h2, descripcion, precio, categoria, footer);


    li.append(img, div);
    contenedor.append(li);
  });
}
/* --- FUNCIÓN: MostrarCatalogo() --- termina ---*/

/*  --- FUNCIÓN: generarFiltrosCategorias()--- empieza --- */

function generarFiltrosCategorias() {
  const cont = document.getElementById("categorias");
  cont.innerHTML = "";

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];

  const btnTodos = document.createElement("button");
  btnTodos.textContent = "TODOS";
  btnTodos.classList.add("btn-secundario");
  btnTodos.addEventListener("click", () => MostrarCatalogo(productos));
  cont.append(btnTodos);

  categoriasUnicas.forEach(cat => {
    const btn = document.createElement("button");
    btn.classList.add("btn-secundario");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      const filtrados = productos.filter(p => p.categoria === cat);
      MostrarCatalogo(filtrados);
      mostrarBannerOferta(cat); 
    });

    cont.append(btn);
  });
}
/*  --- FUNCIÓN: generarFiltrosCategorias()--- termina --- */

/*  ---FUNCIÓN: mostrarBannerOferta()--- empieza --- */

function mostrarBannerOferta(categoria) {
  const viejo = document.querySelector("dialog.banner-dialog");
  if (viejo) {
    viejo.close();
    viejo.remove();
  }

  let datosBanner = bannersPorCategoria[categoria];

  const rutaBanner = RUTA_IMG_BANNERS + datosBanner[0].imagen;

  const dlg = document.createElement("dialog");
  dlg.classList.add("banner-dialog");

  const img = document.createElement("img");
  img.src = rutaBanner;
  img.alt = "Oferta especial";
  img.classList.add("banner-dialog-img");

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("banner-close");
  btnCerrar.innerHTML = "&times;";

  dlg.append(img, btnCerrar);
  document.body.append(dlg);
  dlg.showModal();

  function cerrarConFade() {
    dlg.classList.add("fade-out");

    setTimeout(() => {
      if (dlg.open) dlg.close();
      dlg.remove();
    }, 400);
  }

  const timerId = setTimeout(() => cerrarConFade(), 10000);

  btnCerrar.addEventListener("click", () => {
    clearTimeout(timerId);
    cerrarConFade();
  });

  dlg.addEventListener("close", () => dlg.remove());
}
/*  ---FUNCIÓN: mostrarBannerOferta()--- termina --- */

/* ---  FUNCIÓN: abrirModalDetalle() --- empieza ---*/

function abrirModalDetalle(producto) {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.classList.add("modal-close");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => modal.close());

  const contenido = document.createElement("div");
  contenido.classList.add("detalle-layout");

  const media = document.createElement("div");
  media.classList.add("detalle-media");

  const imgPrincipal = document.createElement("img");
  imgPrincipal.src = RUTA_IMG_PRODUCTOS + producto.imagenes[0];
  imgPrincipal.alt = producto.nombre;
  imgPrincipal.classList.add("detalle-img-principal");

  const thumbs = document.createElement("div");
  thumbs.classList.add("detalle-thumbs");

  producto.imagenes.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = RUTA_IMG_PRODUCTOS + src;
    thumb.alt = producto.nombre;
    thumb.classList.add("detalle-thumb");

    if (index === 0) {
      thumb.classList.add("detalle-thumb--activa");
    }

    thumb.addEventListener("click", () => {
      imgPrincipal.src = RUTA_IMG_PRODUCTOS + src;

      document
        .querySelectorAll(".detalle-thumb")
        .forEach(t => t.classList.remove("detalle-thumb--activa"));

      thumb.classList.add("detalle-thumb--activa");
    });

    thumbs.append(thumb);
  });

  media.append(thumbs, imgPrincipal);

  const info = document.createElement("div");
  info.classList.add("detalle-info");

  const titulo = document.createElement("h2");
  titulo.textContent = producto.nombre;
  titulo.classList.add("producto-nombre");

  const descripcion = document.createElement("p");
  descripcion.textContent = producto.descripcionLarga || producto.descripcion;
  descripcion.classList.add("producto-descripcion");

  const precio = document.createElement("p");
  precio.textContent = `$${producto.precio}`;
  precio.classList.add("producto-precio");

  const categoria = document.createElement("p");
  categoria.textContent = producto.categoria;
  categoria.classList.add("producto-categoria");

  const btnAgregar = document.createElement("button");
  btnAgregar.type = "button";
  btnAgregar.textContent = "Agregar";
  btnAgregar.classList.add("btn-primario");
  btnAgregar.addEventListener("click", () => {
    carrito.agregar(producto);
    actualizarMiniCarrito();
    modal.close();
  });

  info.append(titulo, descripcion, precio, categoria, btnAgregar);

  contenido.append(media, info);
  modal.append(closeBtn, contenido);

  document.body.append(modal);
  modal.showModal();

  modal.addEventListener("close", () => modal.remove());
}
/* ---  FUNCIÓN: abrirModalDetalle() --- termina ---*/

/* ---  FUNCIÓN: abrirModalCarrito() --- empieza ---*/
function abrirModalCarrito() {
  const modal = document.createElement("dialog");
  modal.classList.add("modal");

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.classList.add("modal-close");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => modal.close());

  const contenedor = document.createElement("div");
  contenedor.classList.add("detalle-layout"); 
  
  const contenido = document.createElement("div");
  contenido.classList.add("detalle-info");

  const titulo = document.createElement("h2");
  titulo.textContent = "Tu carrito";

  contenido.append(titulo);

  if (carrito.items.length === 0) {
    
    const mensajeVacio = document.createElement("p");
    mensajeVacio.textContent = "Tu carrito está vacío. Agregá productos para comenzar tu compra.";
    contenido.append(mensajeVacio);
  } else {
    
    const lista = document.createElement("ul");

    carrito.items.forEach(item => {
      const li = document.createElement("li");

      const nombre = document.createElement("p");
      nombre.textContent = item.producto.nombre;

      const cantidad = document.createElement("p");
      cantidad.textContent = `Cantidad: ${item.cantidad}`;

      const subtotal = document.createElement("p");
      subtotal.textContent = `Subtotal: $${item.producto.precio * item.cantidad}`;

     
      const accionesItem = document.createElement("div");

      const btnRestar = document.createElement("button");
      btnRestar.type = "button";
      btnRestar.classList.add("btn-secundario");
      btnRestar.textContent = "-";
      btnRestar.addEventListener("click", () => {
        carrito.eliminarUnidad(item.producto.id);
        modal.close();
        abrirModalCarrito();
      });

      const btnSumar = document.createElement("button");
      btnSumar.type = "button";
      btnSumar.classList.add("btn-secundario");
      btnSumar.textContent = "+";
      btnSumar.addEventListener("click", () => {
        carrito.agregar(item.producto);
        modal.close();
        abrirModalCarrito();
      });

      const btnQuitar = document.createElement("button");
      btnQuitar.type = "button";
      btnQuitar.classList.add("btn-secundario");
      btnQuitar.textContent = "Quitar producto";
      btnQuitar.addEventListener("click", () => {
        carrito.quitarProducto(item.producto.id);
        modal.close();
        abrirModalCarrito();
      });

      accionesItem.append(btnRestar, btnSumar, btnQuitar);
      li.append(nombre, cantidad, subtotal, accionesItem);
      lista.append(li);
    });

    contenido.append(lista);

   
    const total = document.createElement("p");
    total.classList.add("carrito-total");
    total.textContent = `Total: $${carrito.total()}`;
    contenido.append(total);

  
    const accionesCarrito = document.createElement("div");
    accionesCarrito.classList.add("acciones-carrito");

    const btnVaciar = document.createElement("button");
    btnVaciar.type = "button";
    btnVaciar.classList.add("btn-secundario");
    btnVaciar.textContent = "Vaciar carrito";
    btnVaciar.addEventListener("click", () => {
      carrito.vaciar();
      modal.close();
      abrirModalCarrito();
    });

    const btnCheckout = document.createElement("button");
    btnCheckout.type = "button";
    btnCheckout.classList.add("btn-primario");
    btnCheckout.textContent = "Finalizar compra";
    btnCheckout.addEventListener("click", () => {
      modal.close();
      abrirModalCheckout();
    });

   
    accionesCarrito.append(btnVaciar, btnCheckout);
    contenido.append(accionesCarrito);
  }

  contenedor.append(contenido);
  modal.append(closeBtn, contenedor);

  document.body.prepend(modal);
  modal.showModal();

  modal.addEventListener("close", () => modal.remove());
}

/* ---  FUNCIÓN: abrirModalCarrito() ---termina---*/

/* ---  FUNCIÓN: abrirModalCheckout() --- empieza ---*/
function abrirModalCheckout() {
  
  const modal = document.createElement("dialog");
  modal.id = "modal-checkout";
  modal.classList.add("modal");

  
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.classList.add("modal-close");
  closeBtn.setAttribute("aria-label", "Cerrar");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => modal.close());

  
  const contenido = document.createElement("div");
  contenido.id = "modal-detalle-contenido";

  
  const form = document.createElement("form");
  form.id = "form-checkout";
  form.addEventListener("submit", manejarSubmitCheckout);

  
  const titulo = document.createElement("h2");
  titulo.textContent = "Finalizar compra";
  form.appendChild(titulo);

  
  const campos = [
    { id: "chk-nombre", label: "Nombre:", type: "text", required: true },
    { id: "chk-telefono", label: "Teléfono:", type: "tel", required: true },
    { id: "chk-email", label: "Email:", type: "email", required: true },
    { id: "chk-lugar", label: "Lugar de entrega:", type: "text", required: true },
    { id: "chk-fecha", label: "Fecha de entrega:", type: "date", required: true }
  ];

  campos.forEach(campo => {
    const label = document.createElement("label");
    label.setAttribute("for", campo.id);
    label.textContent = campo.label;

    const input = document.createElement("input");
    input.id = campo.id;
    input.type = campo.type;
    if (campo.required) input.required = true;

    form.append(label, input);
  });

  
  const labelMetodo = document.createElement("label");
  labelMetodo.setAttribute("for", "chk-metodo");
  labelMetodo.textContent = "Método de pago:";

  const selectMetodo = document.createElement("select");
  selectMetodo.id = "chk-metodo";
  selectMetodo.required = true;

  const opcionesMetodo = [
    { value: "", text: "Seleccionar..." },
    { value: "tarjeta", text: "Tarjeta de crédito" },
    { value: "debito", text: "Tarjeta de débito" },
    { value: "transferencia", text: "Transferencia" }
  ];

  opcionesMetodo.forEach(op => {
    const opt = document.createElement("option");
    opt.value = op.value;
    opt.textContent = op.text;
    selectMetodo.appendChild(opt);
  });

  form.append(labelMetodo, selectMetodo);

 
  const labelCuotas = document.createElement("label");
  labelCuotas.setAttribute("for", "chk-cuotas");
  labelCuotas.textContent = "Cuotas:";

  const selectCuotas = document.createElement("select");
  selectCuotas.id = "chk-cuotas";

  const opcionesCuotas = ["1", "3", "6"];
  opcionesCuotas.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = `${c} cuota${c !== "1" ? "s" : ""}`;
    selectCuotas.appendChild(opt);
  });

  form.append(labelCuotas, selectCuotas);

 
  const acciones = document.createElement("div");
  acciones.classList.add("modal-carrito-actions");

  const btnCancelar = document.createElement("button");
  btnCancelar.type = "button";
  btnCancelar.classList.add("btn-secundario");
  btnCancelar.textContent = "Seguir comprando";
  btnCancelar.addEventListener("click", () => modal.close());

  const btnConfirmar = document.createElement("button");
  btnConfirmar.type = "submit";
  btnConfirmar.classList.add("btn-primario");
  btnConfirmar.textContent = "Confirmar compra";

  acciones.append(btnCancelar, btnConfirmar);
  form.append(acciones);
  contenido.append(form);
  modal.append(closeBtn, contenido);
  document.body.append(modal);
  modal.showModal();

  
  modal.addEventListener("close", () => modal.remove());
}

/* ---  FUNCIÓN: abrirModalCheckout() --- termina ---*/

/*--- FUNCIÓN: manejarSubmitCheckout() --- empieza ---*/

function manejarSubmitCheckout(evento) {
  evento.preventDefault();

  const nombreInput = document.getElementById("chk-nombre");
  const nombreValor = nombreInput ? nombreInput.value.trim() : "";

  carrito.vaciar();
  actualizarMiniCarrito();

  const dlg = document.getElementById("modal-checkout");
  if (dlg instanceof HTMLDialogElement) {
    dlg.close();
  }

  const mensaje = document.createElement("dialog");
  mensaje.classList.add("modal");

  const texto = document.createElement("p");
  texto.textContent = nombreValor
    ? `¡Gracias por tu compra, ${nombreValor}!`
    : "¡Gracias por tu compra!";

  const btnCerrar = document.createElement("button");
  btnCerrar.type = "button";
  btnCerrar.classList.add("btn-primario");
  btnCerrar.textContent = "Cerrar";
  btnCerrar.addEventListener("click", () => mensaje.close());

  mensaje.append(texto, btnCerrar);
  document.body.prepend(mensaje);
  mensaje.showModal();

  mensaje.addEventListener("close", () => mensaje.remove());
}

/*--- FUNCIÓN: manejarSubmitCheckout() --- termina ---*/


/*--- Inicialización del DOM --- empieza ---*/
document.addEventListener("DOMContentLoaded", () => {
  generarFiltrosCategorias();
  MostrarCatalogo();
  actualizarMiniCarrito();

  const btnVerCarrito = document.querySelector("#mini-carrito button");
  btnVerCarrito.addEventListener("click", abrirModalCarrito);

});

/*--- Inicialización del DOM  --- termina ---*/





