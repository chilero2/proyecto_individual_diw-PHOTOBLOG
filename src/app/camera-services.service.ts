import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera'
import { Preferences } from '@capacitor/preferences'
import { Filesystem, Directory } from '@capacitor/filesystem'
import { Foto } from './interfaces/photo';
import { Image } from './interfaces/images';
import { v4 as uuidv4 } from 'uuid';




@Injectable({
  providedIn: 'root'
})
export class CameraServicesService {

  public photo!: Image
  private PHOTO_STORAGE: string = 'fotos'

  constructor() { }

  public async addNewToGallery(user: string) {
    // Proceso para tomar una foto
    // Sirve para todos los dispositivos
    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })

    const savedImageFile = await this.savePicture(fotoCapturada, user)


    this.photo = savedImageFile

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photo)
    })
  }

  public async savePicture(cameraPhoto: Photo, user: string): Promise<Image> {

    //Convertir la foto a formato base64
    const base64Data = await this.readAsBase64(cameraPhoto)
    //Escribir la foto en el directorio
    const fileName = new Date().getTime() + '.jpg'
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })
    console.log(cameraPhoto.webPath)

    return {
      id: uuidv4(),
      name: fileName,
      user_id: user,
      url: cameraPhoto.webPath || '',
      date: new Date().toLocaleDateString('en-US'),
      comment: ''
    }

  }

  public async readAsBase64(cameraPhoto: Photo) {
    // Convertir de blog a base 64
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

  public async loadSave() {
    // Recuperar las fotos de la cache
    const listaFotos = await Preferences.get({
      key: this.PHOTO_STORAGE
    })
    this.photo = JSON.parse(listaFotos.value!) || []

    // Desplejar las fotos leidas en formato base64
    // for (let foto of this.photos) {
    // leer cada foto almacenada en el sistema de archivos
    const readfile = await Filesystem.readFile({
      path: this.photo.name,
      directory: Directory.Data
    })


    // Sólo para plataformas web: cargar las fotos en base 64
    this.photo.url = `data:image/jpg;base64,${readfile.data}`
    console.log(this.photo)


  }
}
// }
