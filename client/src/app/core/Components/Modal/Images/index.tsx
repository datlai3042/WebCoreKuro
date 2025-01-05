import React, { useEffect, useState } from "react";
import Overlay from "../../Overlay";
import { ModalImagesProps } from "./modalImages.type";
import styles from "./styles.module.scss";
import http from "@/app/core/Http";
const ModalImages = (props: ModalImagesProps) => {
  const { list, onClick, keyActive, onSetActive } = props;
  const [files, setFile] = useState<File[]>([])
  const downloadImage = (e) => {
    e.preventDefault(); // Ngừng hành động mặc định của thẻ <a>

    const imageUrl =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCpoEEdCLYs62sDKwTLi88GFzlVFm4Y0S_g&s";
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Tạo URL cho blob
        const a = document.createElement("a"); // Tạo thẻ <a> ảo
        a.href = url;
        a.download = "image.jpg"; // Tên file khi tải về
        a.click(); // Kích hoạt tải xuống
        window.URL.revokeObjectURL(url); // Giải phóng URL sau khi tải xong
      })
      .catch((error) => console.error("Tải hình ảnh thất bại:", error));
  };

  useEffect(() => {
    const callApi = async () => {
      const res = await http.get<any>('/v1/api/tasks/get-images' , {})
      console.log({res})
      const {images} = res?.metadata
      images.forEach((img) => {
        const data = img?.data?.data
        console.log({img})
        const blob = new Blob([new Uint8Array(data)], { type: `image/${img?.name?.name.split('.')[1]}` }); // Thay 'image/jpeg' nếu ảnh là PNG hoặc GIF
        const url =  URL.createObjectURL(blob); // Tạo URL tạm thời từ Blob
        console.log({url, type: `image/${img?.name?.name.split('/')[1]}` , img})
        const imgs = new Image()
        imgs.src = url
        imgs.style.objectFit = 'contain'
        document.body.appendChild(imgs)
      })
    }
    callApi()
  }, [])


  useEffect(() => {
    if(files.length === 0) return
    files.forEach(file => {
      const content = file?.content;
      if (content) {
        // Chuyển stream thành Blob
        const blob = new Blob([content], {type: 'image/jpg'})
        const url = URL.createObjectURL(blob)
        console.log({url, content})
      }
  
    })
  }, [files])

  return (
    <Overlay
      onClickOverlay={onClick}
      customOverlay={{ backgroundColor: "rgba(10, 21, 47, .8)" }}
    >
      <div className="w-[1250px] h-[90vh] xl:h-[95.5vh] max-h-max bg-[#fff] rounded-xl flex flex-col xl:flex-row gap-[1rem] xl:gap-[3rem] overflow-y-auto p-[3rem_2rem]">
            <div className="min-h-[20rem] xl:min-h-full w-full xl:w-[10rem] bg-red-300 rounded-md"></div>
            <div className="min-h-[20rem] xl:min-h-full flex-1 py-[1rem] xl:py-[7rem] ">
                <div className="bg-blue-200 min-h-full rounded-md"></div>
            </div>
            <div className="min-h-[20rem] xl:min-h-full w-full xl:w-[34rem] bg-yellow-400 rounded-md"></div>

      </div>
    </Overlay>
  );
};

export default ModalImages;
