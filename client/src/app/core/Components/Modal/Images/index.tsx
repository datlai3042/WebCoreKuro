import resloveErroUiInstance from "@/app/core/Helpers/ClientError";
import useDisableScrollBody from "@/app/core/Hooks/Ui/useDisableScrollBody";
import http from "@/app/core/Http";
import { memo, useEffect, useState } from "react";
import Overlay from "../../Overlay";
import { ModalImagesProps } from "./types/modalImages.type";
import Functions from "./ui/Functions";
import ImageActive from "./ui/Images";
import DownloadImage from "./ui/download";

const FUNCTIONS = [
  {
    title: "",
  },
];

const ModalImages = (props: ModalImagesProps) => {
  const { list, onClick, keyActive, onSetActive, onClose } = props;
  const [files, setFile] = useState<File[]>([]);

  const [arrayUrl, setArrayUrl] = useState<{ url: string, file: File }[]>([]);
  const [imageActive, setImageActive] = useState<{ url: string, file: File } | null>(null);

  useDisableScrollBody();
  console.log("re-render");

  const downloadImage = (e) => {
    e.preventDefault();

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
      const res = await http.get<any>("/v1/api/tasks/get-images", {});

      if (!res || res.code > 200) {
        resloveErroUiInstance.catchError(res, onClose);
        return;
      }
      const { images } = res?.metadata;
      const urls: { url: string, file: File }[] = [];
      images


        .forEach((img) => {
          const data = img?.data?.data;
          const extend = `image/${img?.name.split(".")[1]}`
          const blob = new Blob([new Uint8Array(data)], {
            type: extend,
          }); // Thay 'image/jpeg' nếu ảnh là PNG hoặc GIF
          const file = new File([blob], img?.name.split(".")[0], { type: extend })
          console.log({file})
          const url = URL.createObjectURL(blob); // Tạo URL tạm thời từ Blob
          urls.push({ url, file });
        });
      setImageActive(urls[1]);
      setArrayUrl(urls);
    };
    callApi();
  }, []);

  const onSetImageActive = ({url, file}: {url: string, file: File}) => {
    setImageActive({url, file});
  };
console.log({imageActive})
  ;
  return (
    <Overlay
      onClickOverlay={onClick}
      customOverlay={{ backgroundColor: "rgba(10, 21, 47, .8)" }}
    >
      <div className="ani-scale w-[1250px] h-[90vh] xl:h-[95.5vh] max-h-max bg-[#fff] rounded-lg flex flex-col xl:flex-row gap-[1rem] xl:gap-[3rem] overflow-y-auto p-[0_1.6rem] xl:p-[1.6rem]">
        <div className="sticky  top-0 py-[1.6rem] xl-p-0 min-h-[6rem] xl:min-h-full w-full xl:w-[10rem]  rounded-md flex-col">
          <Functions
            listImage={arrayUrl}
            origin={imageActive?.url as string}
            onSetImageActive={onSetImageActive}
          />
        </div>
        <div className="min-h-[20rem] h-[90vh] flex-1 py-[1rem] xl:py-[7rem] ">
          <div className=" h-full rounded-md flex">
            <ImageActive url={imageActive?.url as string} />
          </div>
        </div>
        <div className="min-h-[20rem] xl:min-h-full w-full xl:w-[34rem]  rounded-md"><DownloadImage url={imageActive?.url || ''} file={imageActive?.file} /></div>
      </div>
    </Overlay>
  );
};

export default memo(ModalImages);
