import { OrtographyResponse } from "@interfaces/ortography.response";
import { environment } from "environments/environment.development";

export const OrtographyUseCase  = async( prompt: string)=>{
    try{
        const resp = await fetch(`${environment.backendApi}/ortography-check`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({prompt})
        });
        if(!resp.ok) throw new Error('No se pudo realizar la correción');

        const data = await resp.json() as OrtographyResponse;

        return {
            ok: true,
            ...data,
        }
    }catch(error){
        console.log(error);
        return {
            ok: false,
            userScore: 0,
            errors: [],
            message: "No se pudo realizar la correción"
        }
    }
}