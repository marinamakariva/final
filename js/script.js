"use strict";

const RUTA_IMG_PRODUCTOS = "img/";
const RUTA_IMG_BANNERS = "img/";


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
    categoria: "anillos",
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
    categoria: "collares",
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
    categoria: "aros",
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
    categoria: "pulseras",
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
    categoria: "relojes",
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
    categoria: "anillos",
  },
];

const productos = productosData.map(p => new Producto(p));



const bannersPorCategoria = {
  anillos: [{ imagen: "banner-anillos.webp" }],
  collares: [{ imagen: "banner-collares.webp" }],
  aros: [{ imagen: "banner-aros.webp" }],
  pulseras: [{ imagen: "banner-pulseras.webp" }],
  relojes: [{ imagen: "banner-relojes.webp" }],
};


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
    btnDetalle.addEventListener("click", () => abrirModalDetalle(producto));

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar";
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

function generarFiltrosCategorias() {
  const cont = document.getElementById("categorias");
  cont.innerHTML = "";

  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];

  const btnTodos = document.createElement("button");
  btnTodos.textContent = "Todos";
  btnTodos.classList.add("btn-primario");
  btnTodos.addEventListener("click", () => MostrarCatalogo(productos));
  cont.append(btnTodos);

  categoriasUnicas.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.classList.add("btn-primario");

    btn.addEventListener("click", () => {
      const filtrados = productos.filter(p => p.categoria === cat);
      MostrarCatalogo(filtrados); 
    });

    cont.append(btn);
  });
}


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


document.addEventListener("DOMContentLoaded", () => {
  generarFiltrosCategorias();    
  MostrarCatalogo();             
  actualizarMiniCarrito();
});
