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

