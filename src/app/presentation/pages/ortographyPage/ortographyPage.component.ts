import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { GptMessageOrtographyComponent } from "../../components/chat-bubbles/gptMessageOrtography/gptMessageOrtography.component";


@Component({
    selector: 'app-ortography-page',
    standalone: true,
    templateUrl: './ortographyPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ChatMessageComponent,
        MyMessageComponent,
        TypingLoaderComponent,
        TextMessageBoxComponent,
        TextMessageBoxFileComponent,
        TextMessageBoxSelectComponent,
        GptMessageOrtographyComponent
    ]
})
export default class OrtographyPageComponent { 

  public messages = signal<Message[]>([{text:"Hola mundo", isGpt:false}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string){
    console.log({prompt});
    this.isLoading.set(true);
    this.messages.update((prev)=>[
      ...prev,
      {
        isGpt: false,
        text: prompt
      }

    ]);

    this.openAiService.checkOrtography(prompt)
    .subscribe( res =>{
      this.isLoading.set(false);
      console.log(res);
      this.messages.update( prev => [
        ...prev,
        {
          isGpt: true,
          text: res.message,
          info: res
        }
      ])
    })

  }

  /* handleMessageWithFile({prompt, file}: TextMessageEvent){
    console.log({prompt, file})
  }

  handleMessageWithSelect({prompt, selectedOption}: TextMessageBoxEvent){
    console.log({prompt, selectedOption})
  } */
}
