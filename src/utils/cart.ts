import type { ICartItem, IProduct } from "../types/product";

const CLAVE_CARRITO = "cart";

export const getCartItems = (): ICartItem[] => {
  const carritoGuardado = localStorage.getItem(CLAVE_CARRITO);

  if (!carritoGuardado) {
    return [];
  }

  return JSON.parse(carritoGuardado) as ICartItem[];
};

const guardarCarrito = (items: ICartItem[]): void => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
};

export const addToCart = (producto: IProduct): void => {
  const items = getCartItems();
  const itemExistente = items.find((item) => item.id === producto.id);

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    items.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  guardarCarrito(items);
};

export const removeFromCart = (id: number): void => {
  const items = getCartItems().filter((item) => item.id !== id);
  guardarCarrito(items);
};

export const updateCantidad = (id: number, cantidad: number): void => {
  if (cantidad <= 0) {
    removeFromCart(id);
    return;
  }

  const items = getCartItems();
  const item = items.find((item) => item.id === id);

  if (item) {
    item.cantidad = cantidad;
    guardarCarrito(items);
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CLAVE_CARRITO);
};

export const getCartTotal = (): number => {
  return getCartItems().reduce((total, item) => total + item.precio * item.cantidad, 0);
};

export const getCartCount = (): number => {
  return getCartItems().reduce((total, item) => total + item.cantidad, 0);
};
