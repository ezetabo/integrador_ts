import type { IUser, IUserRegistro } from "../types/IUser";
import { Rol } from "../types/Rol";
import { navigate } from "./navigate";

const CLAVE_SESION = "userData";
const CLAVE_USUARIOS = "users";

const USUARIO_ADMIN_SEMILLA: IUserRegistro = {
  email: "admin@foodstore.com",
  password: "admin123",
  role: Rol.Admin,
};

export const saveUser = (user: IUser): void => {
  localStorage.setItem(CLAVE_SESION, JSON.stringify(user));
};

export const getUser = (): IUser | null => {
  const usuarioGuardado = localStorage.getItem(CLAVE_SESION);

  if (!usuarioGuardado) {
    return null;
  }

  return JSON.parse(usuarioGuardado) as IUser;
};

export const removeUser = (): void => {
  localStorage.removeItem(CLAVE_SESION);
};

export const getUsuarios = (): IUserRegistro[] => {
  const usuariosGuardados = localStorage.getItem(CLAVE_USUARIOS);

  if (!usuariosGuardados) {
    const usuariosIniciales: IUserRegistro[] = [USUARIO_ADMIN_SEMILLA];
    guardarUsuarios(usuariosIniciales);
    return usuariosIniciales;
  }

  return JSON.parse(usuariosGuardados) as IUserRegistro[];
};

export const guardarUsuarios = (usuarios: IUserRegistro[]): void => {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
};

export const agregarUsuario = (usuario: IUserRegistro): void => {
  const usuarios = getUsuarios();
  usuarios.push(usuario);
  guardarUsuarios(usuarios);
};

export const logout = (): void => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};
