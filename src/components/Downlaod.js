import React from 'react'
import {downloadCount, downloadFile} from '../actions/pdf'

export const Download = (id,title) => {
    downloadFile(id).then((data)=>{
        const a = document.createElement('a');
        a.href = data;
        a.download = `${title}.pdf`
        a.click()
    })
}

export const DownloadCount = (id) =>{
    downloadCount(id).then((data)=>{
        if(data.error){
            return data.error
        }
        else{
            return data;
        }
    })
}
