import { Injectable } from '@angular/core';
import { createThreadUseCase } from '@use-cases/assinstant/create-thread.use-case';
import { postQuestionUseCase } from '@use-cases/assinstant/post-question.use-case';
import { AudioToTextUseCase } from '@use-cases/audios/audio-to-text.use-case';
import { TextToAudioUseCase } from '@use-cases/audios/text-to-audio.use-case';
import { imageGenerationUseCase } from '@use-cases/image-generation/image-generation.use-case';
import { imageVariationUseCase } from '@use-cases/image-generation/image-variation.use-case';
import { OrtographyUseCase } from '@use-cases/ortography/ortography.use-case';
import { ProsConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { ProsConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { TranslateTextUseCase } from '@use-cases/translate/translate-text.use-case';
import { Observable, from, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrtography(prompt: string){
        return from(OrtographyUseCase(prompt));
    }

    prosConsDiscuss(prompt: string){
        return from(ProsConsUseCase(prompt));
    }

    prosConsStreamDiscuss(prompt: string, abortSignal: AbortSignal){
        return ProsConsStreamUseCase(prompt, abortSignal);
    }

    translateText(prompt:string, lang: string){
        return from(TranslateTextUseCase(prompt, lang));
    }

    textToAudio(prompt:string, voice: string){
        return from(TextToAudioUseCase(prompt, voice));
    }

    audioToText(file:File, prompt?:string){
        return from(AudioToTextUseCase(file, prompt));
    }

    imageGeneration(prompt: string, originalImage?:string, maskImage?:string){
        return from(imageGenerationUseCase(prompt, originalImage, maskImage));
    }

    imageVariation(originalImage:string){
        return from(imageVariationUseCase(originalImage))
    }

    createThread():Observable<string>{
        if(localStorage.getItem('thread')){
            return of(localStorage.getItem('thread')!);
        }
        return from(createThreadUseCase())
        .pipe(
            tap((thread)=>{
                console.log({thread});
                localStorage.setItem('thread', thread)
            })
        );
    }

    postQuestion(threadId: string, question:string){
        return from(postQuestionUseCase(threadId, question));
    }
}