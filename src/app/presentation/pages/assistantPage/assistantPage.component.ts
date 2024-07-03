import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-assistant-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent
  ],
  templateUrl: './assistantPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistantPageComponent implements OnInit{
  
  public messages = signal<Message[]>([{text:"Hola mundo", isGpt:false}]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiService);
  public threadId = signal<string|undefined>(undefined);

  ngOnInit(): void {
    this.openAiService.createThread()
    .subscribe(id =>{
        this.threadId.set(id);
    });
  }

  handleMessage(question: string){
    console.log({question, threadId: this.threadId()})
    this.isLoading.set(true);
    this.messages.update(prev => [...prev, {text:question, isGpt:false}]);

    this.openAiService.postQuestion(this.threadId()!, question)
    .subscribe(replies =>{
      this.isLoading.set(false);
      for(const reply of replies){
        for(const message of reply.content){
          this.messages.update(prev =>[
            ...prev,
            {
              text:message,
              isGpt: reply.role === 'assistant'
            }
          ]);
        }
      }
    })
  }
 }
