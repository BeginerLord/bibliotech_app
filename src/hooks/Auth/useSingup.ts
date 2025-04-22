import { singup } from "@/service/Auth"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify";

export const useSingup=()=>{
    const{mutate:singupMutation,isPending}= useMutation({
        mutationKey:["singup"],
        mutationFn:singup,
        onSuccess: (data) => {
            // Notificar al usuario del éxito
            toast.success("¡Registro exitoso!");
      
            // Opcional: Redirigir al usuario o realizar otras acciones
            console.log("Datos del usuario:", data);
          },
          onError: (error) => {
            // Manejo de errores y notificación
            const errorMessage =
              error instanceof Error
                ? error.message
                : "Ocurrió un error desconocido al registrarse.";
            toast.error(errorMessage);
          },


    })

    return{signup:singupMutation,isPending}
}