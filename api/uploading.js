import axios from "axios";

export const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        const uri = image.uri;
        const type = 'image/jpeg';
        const filename = uri.substring(uri.lastIndexOf('/')+1);

        let form = new FormData();
        form.append('upload', {
            name: filename,
            type: type,
            uri: uri
        });

        /* axios({
            method: 'POST',
            url: "api url",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: form,
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                console.log("Uploading percent", loaded * 100 / total)
            },
        }) */

        setTimeout(() => {
            resolve();
        }, 2000)
    })
}