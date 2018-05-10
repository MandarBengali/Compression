import { Component } from '@angular/core';
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from "ng2-image-compress";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
  
})
export class AppComponent {
  title = 'app';
  selectedImage: any;
  processedImages: any = [];
  showTitle: boolean = false;


  constructor(private imgCompressService: ImageCompressService) {

  }

  downloadAll(urls:any = []) {

  
  var link = document.createElement('a');

  link.setAttribute('download', null);
  link.style.display = 'none';

  document.body.appendChild(link);

  for (var i = 0; i < urls.length; i++) {
    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<URL is>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + urls[i].compressedImage.imageDataUrl);
    link.setAttribute('href', urls[i].compressedImage.imageDataUrl);
     link.setAttribute('download', urls[i].fileName);
    link.click();
  }

 
}



  onChange(fileInput: any) {
      

    let images: Array<IImage> = [];
    
        let count = fileInput.target.files.length;    
        let observer = ImageUtilityService.filesToSourceImages(fileInput.target.files);     
        observer.subscribe((image) => {
            images.push(image);         
        },null,()=>{
          console.log(images)
          var files:IImage[] = images;
          let image_files:IImage[] = [];
          let nonImage_files:IImage[] = [];
          for (var i = 0; i < files.length; i++) {
            if(String(files[i].imageDataUrl).toUpperCase().indexOf("DATA:IMAGE/PNG;")!== -1 ||
            String(files[i].imageDataUrl).toUpperCase().indexOf("DATA:IMAGE/JPEG;")!== -1){
              image_files.push(files[i]);
            }
            else{
              nonImage_files.push(files[i]);
            }        
         };    
          ImageCompressService.IImageListToCompressedImageSource(images).then(imagesResult=>{
            this.processedImages = imagesResult;
            this.showTitle = true; 
          
            console.log(imagesResult); 
          })
        });  

  }

}
