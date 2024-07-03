import { OrtographyResponse } from "@interfaces/ortography.response";
import { environment } from "environments/environment.development";

export const TextToAudioUseCase  = async( prompt: string, voice: string)=>{
    try{
        const resp = await fetch(`${environment.backendApi}/text-to-audio`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({prompt})
        });
        if(!resp.ok) throw new Error('No se pudo generar el audio');
        
        const audioFile = await resp.blob();
        const audioUrl = URL.createObjectURL(audioFile)

        //const data = await resp.json() as OrtographyResponse;

        return {
            ok: true,
            message: prompt,
            audioUrl : audioUrl
        }
    }catch(error){
        console.log(error);
        return {
            ok: false,
            message: "No se pudo generar el audio",
            audioUrl: ""
        }
    }
}