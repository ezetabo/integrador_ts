import { protegerRuta } from "../../../main";
import { Rol } from "../../../types/Rol";
import { logout } from "../../../utils/auth";
import { getCartItems, updateCantidad, removeFromCart, clearCart, getCartTotal } from "../../../utils/cart";

protegerRuta(Rol.Client);

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
const tablaCarrito = document.getElementById("tablaCarrito") as HTMLTableElement;
const cuerpoCarrito = document.getElementById("cuerpoCarrito") as HTMLTableSectionElement;
const carritoVacio = document.getElementById("carritoVacio") as HTMLParagraphElement;
const totalCarrito = document.getElementById("totalCarrito") as HTMLElement;
const buttonVaciar = document.getElementById("vaciarCarrito") as HTMLButtonElement;

buttonLogout.addEventListener("click", () => {
  logout();
});

const renderCarrito = (): void => {
  const items = getCartItems();

  cuerpoCarrito.innerHTML = "";
  tablaCarrito.hidden = items.length === 0;
  carritoVacio.hidden = items.length > 0;

  for (const item of items) {
    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = item.nombre;

    const celdaPrecio = document.createElement("td");
    celdaPrecio.textContent = `$${item.precio.toFixed(2)}`;

    const celdaCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.value = String(item.cantidad);
    inputCantidad.className = "input-cantidad";
    inputCantidad.addEventListener("change", () => {
      updateCantidad(item.id, Number(inputCantidad.value));
      renderCarrito();
    });
    celdaCantidad.appendChild(inputCantidad);

    const celdaSubtotal = document.createElement("td");
    celdaSubtotal.textContent = `$${(item.precio * item.cantidad).toFixed(2)}`;

    const celdaAcciones = document.createElement("td");
    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "Quitar";
    botonQuitar.className = "boton-quitar";
    botonQuitar.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCarrito();
    });
    celdaAcciones.appendChild(botonQuitar);

    fila.append(celdaNombre, celdaPrecio, celdaCantidad, celdaSubtotal, celdaAcciones);
    cuerpoCarrito.appendChild(fila);
  }

  totalCarrito.textContent = `$${getCartTotal().toFixed(2)}`;
};

buttonVaciar.addEventListener("click", () => {
  clearCart();
  renderCarrito();
});

renderCarrito();
