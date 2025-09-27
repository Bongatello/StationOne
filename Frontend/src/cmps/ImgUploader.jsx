import { useState } from 'react'
import { uploadService } from '../services/upload.service.js'


export function ImgUploader({ onUploaded, stationImage }) {
    const [imgData, setImgData] = useState({
        imgUrl: stationImage,
        height: 500,
        width: 500,
    })
    
    const [isUploading, setIsUploading] = useState(false)


    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url, height, width } = await uploadService.uploadImg(ev)
        console.log(secure_url)
        setImgData({ imgUrl: secure_url, width, height })
        setIsUploading(false)
        onUploaded && onUploaded(secure_url)
    }



    return (
        <div className="upload-preview">
            <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload" />
        </div>
    )
}
