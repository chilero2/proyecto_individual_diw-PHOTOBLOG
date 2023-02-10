import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Preferences } from '@capacitor/preferences'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Image } from './interfaces/images';
import { v4 as uuidv4 } from 'uuid';
import { Platform } from '@ionic/angular';




@Injectable({
  providedIn: 'root'
})
export class CameraServicesService {
  // public photo!: Image
  public PHOTO_STORAGE: string = 'fotos'

  constructor(private plataform: Platform) { }

  public async addNewToGallery() {
    // Proceso para tomar una foto
    // Sirve para todos los dispositivos
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
      saveToGallery: true,
    })
    return fotoCapturada
  }

  public async readAsBase64(cameraPhoto: Photo) {
    // Convertir de blog a base 64
    if (this.plataform.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: cameraPhoto.path!
      })
      return file.data
    }
    const response = await fetch(cameraPhoto.webPath!)
    const blob = await response.blob()
    return await this.convertBlobToBase64(blob) as string
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader
    reader.onerror = reject
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(blob)
  })

  /**
 * Resize a base 64 Image
 * @param {String} base64 - The base64 string (must include MIME type)
 * @param {Number} newWidth - The width of the image in pixels
 * @param {Number} newHeight - The height of the image in pixels
 */
  resizeBase64Img(base64: string, newWidth: number, newHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      var canvas = document.createElement("canvas");
      canvas.style.width = newWidth.toString() + "px";
      canvas.style.height = newHeight.toString() + "px";
      let context = canvas.getContext("2d");
      let img = document.createElement("img");
      img.src = base64;
      img.onload = () => {
        context!.scale(newWidth / img.width, newHeight / img.height);
        context!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL());
      }
    })
  }

}
