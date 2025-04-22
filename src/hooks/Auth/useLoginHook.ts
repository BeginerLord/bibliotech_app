import { login } from "@/service/Auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useLoginHook = () => {
  const { mutate: loginMutation, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,

    onSuccess: (data) => {
      // Notificar al usuario del éxito
      toast.success("¡Inicio de sesión exitoso!");

      // Opcional: Redirigir al usuario o realizar otras acciones
      console.log("Datos del usuario:", data);
    },

    onError: (error) => {
      // Manejo de errores y notificación
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error desconocido al iniciar sesión.";
      toast.error(errorMessage);
    },
  });

  return { login:loginMutation, isPending };
};
