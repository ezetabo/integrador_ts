import './style.css'
import { Rol } from './types/Rol'
import { getUser } from './utils/auth'
import { navigate } from './utils/navigate'

const RUTA_LOGIN = '/src/pages/auth/login/login.html'
const RUTA_ADMIN = '/src/pages/admin/home/home.html'
const RUTA_CLIENTE = '/src/pages/client/home/home.html'

const rutaPorRol = (rol: Rol): string => {
  return rol === Rol.Admin ? RUTA_ADMIN : RUTA_CLIENTE
}

export const protegerRuta = (rolRequerido: Rol): void => {
  const usuario = getUser()

  if (!usuario || !usuario.loggedIn) {
    navigate(RUTA_LOGIN)
    return
  }

  if (usuario.role !== rolRequerido) {
    navigate(rutaPorRol(usuario.role))
  }
}
