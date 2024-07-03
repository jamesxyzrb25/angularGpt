import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { GptMessageEditableImageComponent } from "../../components/chat-bubbles/gptMessageEditableImage/gptMessageEditableImage.component";

@Component({
  selector: 'app-image-tunning-page',
  standalone: true,
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent
  ]
})
export default class ImageTunningPageComponent {


  public messages = signal<Message[]>([
    {
      isGpt:true,
      text:'Dummy Image',
      imageInfo:{
        alt: 'Dummy Image',
        url:'http://localhost:3000/gpt/image-generation/1711156649197.png'
      }
    }
  ]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);

  public originalImage = signal<string | undefined>(undefined);
  public maskImage = signal<string | undefined>(undefined);


  handleMessage(prompt: string) {
    console.log({ prompt })
    this.isLoading.set(true);
    this.messages.update(prev => [...prev, { isGpt: false, text: prompt }]);

    this.openAiService.imageGeneration(prompt, this.originalImage(), this.maskImage())
      .subscribe(resp => {
        this.isLoading.set(false);
        if (!resp) return;

        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.alt,
            imageInfo: resp
          }
        ])
      })
  }

  generateVariation() {
    this.isLoading.set(true);
    this.openAiService.imageVariation(this.originalImage()!)
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

  handleImageChange(newImage: string, originalImage:string) {
    this.originalImage.set(originalImage);
    this.maskImage.set(newImage);

    console.log({newImage, originalImage});
  }
}
//http://localhost:3000/gpt/image-generation/1711073856159.png
// http://localhost:3000/gpt/image-generation/1711156649197.png