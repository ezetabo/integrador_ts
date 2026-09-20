import { protegerRuta } from "../../../main";
import { Rol } from "../../../types/Rol";
import { logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { IProduct } from "../../../types/product";
import { addToCart, getCartCount } from "../../../utils/cart";

protegerRuta(Rol.Client);

const ICONOS_CATEGORIA: Record<string, string> = {
  Pizzas: "🍕",
  Hamburguesas: "🍔",
  Bebidas: "🥤",
  Postres: "🍰",
  Empanadas: "🥟",
  Ensaladas: "🥗",
};

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
const inputBuscador = document.getElementById("buscador") as HTMLInputElement;
const listaCategorias = document.getElementById("listaCategorias") as HTMLUListElement;
const grillaProductos = document.getElementById("grillaProductos") as HTMLDivElement;
const sinResultados = document.getElementById("sinResultados") as HTMLParagraphElement;
const contadorCarrito = document.getElementById("contadorCarrito") as HTMLSpanElement;

let categoriaActiva: number | "todas" = "todas";

buttonLogout.addEventListener("click", () => {
  logout();
});

const actualizarContadorCarrito = (): void => {
  contadorCarrito.textContent = `(${getCartCount()})`;
};

const renderCategorias = (): void => {
  for (const categoria of getCategories()) {
    const li = document.createElement("li");
    const boton = document.createElement("button");
    boton.className = "categoria-btn";
    boton.textContent = categoria.nombre;
    boton.dataset.id = String(categoria.id);
    li.appendChild(boton);
    listaCategorias.appendChild(li);
  }
};

const productoCoincideBusqueda = (producto: IProduct, texto: string): boolean => {
  return producto.nombre.toLowerCase().includes(texto.toLowerCase());
};

const productoCoincideCategoria = (producto: IProduct): boolean => {
  if (categoriaActiva === "todas") {
    return true;
  }

  return producto.categorias.some((categoria) => categoria.id === categoriaActiva);
};

const renderProductos = (): void => {
  const texto = inputBuscador.value.trim();

  const productosFiltrados = PRODUCTS.filter(
    (producto) =>
      !producto.eliminado &&
      productoCoincideCategoria(producto) &&
      productoCoincideBusqueda(producto, texto)
  );

  grillaProductos.innerHTML = "";
  sinResultados.hidden = productosFiltrados.length > 0;

  for (const producto of productosFiltrados) {
    const card = document.createElement("article");
    card.className = "producto-card";

    const icono = document.createElement("span");
    icono.className = "producto-icono";
    icono.textContent = ICONOS_CATEGORIA[producto.categorias[0]?.nombre ?? ""] ?? "🍽️";

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "producto-descripcion";
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "producto-precio";
    precio.textContent = `$${producto.precio.toFixed(2)}`;

    const boton = document.createElement("button");
    boton.className = "producto-agregar";
    boton.textContent = producto.disponible ? "Agregar al carrito" : "Sin stock";
    boton.disabled = !producto.disponible;

    boton.addEventListener("click", () => {
      addToCart(producto);
      actualizarContadorCarrito();
      boton.textContent = "¡Agregado!";
      setTimeout(() => {
        boton.textContent = "Agregar al carrito";
      }, 1000);
    });

    card.append(icono, nombre, descripcion, precio, boton);
    grillaProductos.appendChild(card);
  }
};

listaCategorias.addEventListener("click", (e: MouseEvent) => {
  const boton = e.target as HTMLElement;

  if (boton.tagName !== "BUTTON") {
    return;
  }

  const id = boton.dataset.id;
  categoriaActiva = id === "todas" ? "todas" : Number(id);

  listaCategorias.querySelectorAll(".categoria-btn").forEach((b) => b.classList.remove("activa"));
  boton.classList.add("activa");

  renderProductos();
});

inputBuscador.addEventListener("input", () => {
  renderProductos();
});

renderCategorias();
renderProductos();
actualizarContadorCarrito();
