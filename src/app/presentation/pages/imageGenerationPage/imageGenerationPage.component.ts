import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
    selector: 'app-image-generation-page',
    standalone: true,
    templateUrl: './imageGenerationPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        ChatMessageComponent,
        TextMessageBoxComponent,
        MyMessageComponent,
        TypingLoaderComponent
    ]
})
export default class ImageGenerationPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  handleMessage(prompt: string){
    console.log({prompt})
    this.isLoading.set(true);
    this.messages.update(prev  =>[...prev, {isGpt:false, text:prompt}]);

    this.openAiService.imageGeneration(prompt)
    .subscribe(resp =>{
      this.isLoading.set(false);
        if(!resp) return;

        this.messages.update(prev =>[
          ...prev,
          {
            isGpt: true,
            text: resp.alt,
            imageInfo : resp
          }
        ])
    })
  }
 }
