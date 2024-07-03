import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageEvent, TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
    selector: 'app-audio-to-text-page',
    standalone: true,
    templateUrl: './audioToTextPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        TextMessageBoxFileComponent
    ]
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  /* handleMessage(prompt: string){
    console.log({prompt})
  } */

  handleMessageWithFile({prompt, file}: TextMessageEvent){
    console.log({prompt, file})
    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update(prev =>[...prev, {isGpt:false, text:text}]);
    this.openAiService.audioToText(file,text)
    .subscribe(resp => this.handleResponse(resp))
  }

  handleResponse(resp: AudioToTextResponse | null){
    this.isLoading.set(false);
    if(!resp) return

    const text = `## Transcripción:
    __Duración:__ ${Math.round(resp.duration)} segundos.
    ## El texto es:
    ${resp.text}  
    `;
    this.messages.update(prev =>[...prev, {isGpt:true, text:text}]);
    for(const seg of resp.segments){
      const segmentsMessage = `__De ${Math.round(seg.start)} a ${Math.round(seg.end)} segundos.__
      ${seg.text}
      `;

      this.messages.update(prev =>[...prev, {isGpt:true, text:segmentsMessage}]);
    }
  } 

  /* handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    console.log({prompt, selectedOption})
  } */
 }
