import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gptMessageEditableImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent implements AfterViewInit{
  
  @Input({required:true}) text!:string;
  @Input({required:true}) imageInfo!:{url:string, alt:string};
  @Output() onSelectedImage = new EventEmitter<string>();
  @ViewChild('canvas') canvasElement?: ElementRef<HTMLCanvasElement>;

  public originalImage = signal<HTMLImageElement|null>(null);
  
  public isDrawing = signal(false);
  public coords = signal({x:0, y:0});



  ngAfterViewInit(): void {
    if(!this.canvasElement?.nativeElement) return;

    console.log(this.canvasElement.nativeElement);
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.imageInfo.url;

    this.originalImage.set(image);
    image.onload = ()=>{
      ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }

  onMouseDown(event:MouseEvent){
    if(!this.canvasElement?.nativeElement) return;
    this.isDrawing.set(true);
    //Obtener coordenadas del mouse relativo al canvas
    const startX = event.clientX -this.canvasElement.nativeElement.getBoundingClientRect().left;
    const startY = event.clientX -this.canvasElement.nativeElement.getBoundingClientRect().top;
    console.log({startX, startY});
    this.coords.set({x:startX, y:startY})
  }

  onMouseMove(event: MouseEvent){
    if(!this.isDrawing()) return;

    const canvasRef = this.canvasElement!.nativeElement;
    const currentX = event.clientX - canvasRef.getBoundingClientRect().left;
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    const width = currentX - this.coords().x;
    const height = currentY - this.coords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;

    //Limpiar canvas
    const ctx = canvasRef.getContext('2d')!;
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ctx.drawImage(this.originalImage()!, 0,0, canvasWidth, canvasHeight)

    //ctx.fillRect(this.coords().x, this.coords().y, width,height);
    ctx.clearRect(this.coords().x, this.coords().y, width,height);
  }

  onMouseUp(){
    this.isDrawing.set(false);
    const canvas = this.canvasElement!.nativeElement;
    const url = canvas.toDataURL('image/png');
    console.log(url);

    this.onSelectedImage.emit(url);

  }

  handleClick(){
    this.onSelectedImage.emit(this.imageInfo.url);
  }
 }
