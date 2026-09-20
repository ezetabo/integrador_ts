import type { IUserRegistro } from "../../../types/IUser";
import { Rol } from "../../../types/Rol";
import { agregarUsuario, getUsuarios } from "../../../utils/auth";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;

  const usuarios = getUsuarios();

  let yaExiste = false;
  for (const usuario of usuarios) {
    if (usuario.email === valueEmail) {
      yaExiste = true;
    }
  }

  if (yaExiste) {
    mensaje.textContent = "Ese email ya está registrado.";
    return;
  }

  const nuevoUsuario: IUserRegistro = {
    email: valueEmail,
    password: valuePassword,
    role: Rol.Client,
  };

  agregarUsuario(nuevoUsuario);

  mensaje.textContent = "Cuenta creada. Redirigiendo al login...";
  navigate("../login/login.html");
});
