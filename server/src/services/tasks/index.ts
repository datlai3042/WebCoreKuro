import { NextFunction, Response } from "express";
import path from "path";
import { Http } from "~/type";
import fs from 'fs'
import { AuthFailedError } from "~/core/http";

const lists = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }

]


const chapter = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }

]


const music = [
  { name: 'Code', isComplete: false, author: 'Kuro' },
  { name: 'Sleep', isComplete: false, author: 'Đạt' },
  { name: 'Eat', isComplete: false, author: 'Kuro' },
  { name: 'Alive', isComplete: false, author: 'Kuro' }

]
const imageDirectory = path.join(__dirname, '../../resources/images');



class TasksService {
  static async getList(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { lists }
  }


  static async getChapter(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { chapter }
  }


  static async getMusic(req: Http.RequestCutome, res: Response, next: NextFunction) {
    return { music }
  }


  static async getImages(req: Http.RequestCutome, res: Response, next: NextFunction) {
    console.log({imageDirectory})
    fs.readdir(imageDirectory, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        console.log({err})
        throw new AuthFailedError({metadata: 'lỗi filed'})
      }
      console.log({files})
      // Trả về danh sách ảnh

      return { images: files }
    });
  }
}



export default TasksService