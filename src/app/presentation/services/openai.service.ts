import { Injectable } from '@angular/core';
import { OrtographyUseCase } from '@use-cases/ortography/ortography.use-case';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrtography(prompt: string){
        return from(OrtographyUseCase(prompt));
    }
}