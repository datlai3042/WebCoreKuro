import React, { useMemo } from "react"
import { TDownloadImage } from "./index.type"
import Button from "@/app/core/Ui/Button";
import Skeleton from "@/app/core/Ui/Loading/Skeleton";
import SkeletonLine from "@/app/core/Ui/Loading/Skeleton/Line";

const DownloadImage = (props: TDownloadImage) => {
    const { url, ButtonDowload, file, content = 'Tải xuống' } = props
    const onClick = () => {
        console.log({ props })
        console.log({ "Download started...": file });
        // Thêm logic download ở đây
        if (file) {
            // Ví dụ: Tạo URL từ file và bắt đầu tải xuống
            const link = document.createElement("a");
            const urlDownload = URL.createObjectURL(file)
            link.href = urlDownload
            link.download = file.name + '.' + file.type.split('/')[1];
            link.click();
        }

    };


    const button = useMemo(() => { return !ButtonDowload ? <Button textContent={content} onClick={onClick} isFull={true} /> : React.cloneElement(ButtonDowload, { onClick }) }, [props])


    return <div className="flex flex-col gap-[1rem]">
        <div className="w-full h-[20rem]">
            <SkeletonLine />

        </div>

        {button}
    </div>

}

export default DownloadImage