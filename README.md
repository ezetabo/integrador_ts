# Food Store — Evaluación 1 (Programación 3)

E-commerce de comidas desarrollado con **HTML5, CSS3 y TypeScript** (sin frameworks), sobre la base del Trabajo Práctico Integrador de TypeScript (login/registro con protección de rutas por rol). Extiende esa base con:

- **Catálogo de productos** (`src/pages/client/home`): listado dinámico por categoría, búsqueda por nombre y filtrado por categoría desde el menú lateral.
- **Carrito de compras con persistencia** (`src/pages/client/cart` + `src/utils/cart.ts`): agregar productos desde el catálogo, ver cantidad y subtotal de cada ítem, modificar cantidades, quitar ítems, vaciar el carrito y calcular el total. Todo persiste en `localStorage` bajo la clave `"cart"`.

No se implementa checkout ni conexión con backend (fuera del alcance de esta evaluación).

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador.

Para generar el build de producción:

```bash
npm run build
npm run preview
```

## Cómo probarlo

1. Registrar una cuenta nueva en la pantalla de registro (queda con rol **cliente**).
2. Iniciar sesión con esa cuenta → redirige al catálogo (`src/pages/client/home/home.html`).
3. Buscar productos por nombre, filtrar por categoría, y agregar productos al carrito.
4. Ir a "Carrito" para ver los ítems agregados, modificar cantidades, quitar productos y ver el total.
5. Recargar la página del carrito para comprobar que los datos persisten en `localStorage`.

También existe un usuario administrador semilla (`admin@foodstore.com` / `admin123`) heredado del TP Integrador, que redirige al panel de administración en lugar del catálogo.

## Estructura relevante

```
src/
├── pages/
│   └── client/
│       ├── home/    → catálogo: home.html + home.ts
│       └── cart/    → carrito: cart.html + cart.ts
├── types/
│   ├── product.ts   → interfaces IProduct e ICartItem
│   └── categoria.ts → interface ICategoria
├── data/
│   └── data.ts      → PRODUCTS y getCategories()
└── utils/
    └── cart.ts      → lógica del carrito sobre localStorage (clave "cart")
```


[Link al VIDEO](https://youtu.be/iy86sBWXhRc)
