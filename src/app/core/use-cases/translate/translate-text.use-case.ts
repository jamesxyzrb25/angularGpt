import { TranslateTextResponse } from "@interfaces/translate-text.response";
import { environment } from "environments/environment.development";

export const TranslateTextUseCase  = async( prompt: string, lang:string)=>{
    try{
        const resp = await fetch(`${environment.backendApi}/translate`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({prompt, lang})
        });
        if(!resp.ok) throw new Error('No se pudo realizar la traducción');

        const data = await resp.json() as TranslateTextResponse;

        return {
            ok: true,
            ...data,
        }
    }catch(error){
        console.log(error);
        return {
            ok: false,
            role: '',
            content: 'No se pudo realizar la traducción'
        }
    }
}