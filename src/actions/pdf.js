import {API} from '../config'
import { handleResponse } from './auth';
const queryString = require('query-string');

export const uploadFile = (token,data) =>{
    return fetch(`${API}/google-drive-upload`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            // 'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`
        },
        body : data
    }).then(response=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err))
};

export const getAllFiles = () =>{
    return fetch(`${API}/getfiles`,{
        method:"GET",
        headers:{
            Accept:'application/json',
        }
    }).then((response)=>{
        return response.json()
    }).catch(err=>console.log(err))
};

export const getFileById = (id) =>{
    // console.log(id)
    return fetch(`${API}/getfile/${id}`,{
        method:"GET",
        headers:{
            Accept:'application/json',
        }
    }).then((response)=>{
        return response.json()
    }).catch(err=>console.log(err))
};

export const searchPdf = (params) =>{
    const search = queryString.stringify(params)
    return fetch(`${API}/getpdf/search?${search}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
        }
    }).then((response)=>{
        return response.json()
    }).catch(err=>console.log(err));
}

export const getPdfByCategory = (category) =>{
    // console.log(category)
    return fetch(`${API}/getpdf-category/${category}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
        }
    }).then((response)=>{
        // console.log(response.json())
        return response.json()
    }).catch(err=>console.log(err));
}

export const downloadFile = (id) =>{

    return fetch(`${API}/download/${id}`,{
        method:'GET',
        headers:{
            Accept:'application/json',
        }
    }).then(res => res.text())
    .then(base64String => {
        return base64String;
        // const anchorTag = document.createElement('a');
        // anchorTag.href = base64String;
        // anchorTag.download = "My PDF File.pdf"; 
        // anchorTag.click();
    });

}


export const updatePdf = (id,form,token) =>{
    // console.log(JSON.stringify(form))
    // console.log(form)
    return fetch(`${API}/pdf/update/${id}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body: form
    }).then((response)=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err));
}

export const deletePdf = (token,id) =>{
    return fetch(`${API}/pdf/remove/${id}`,{
        method:'DELETE',
        headers:{
            Accept:'application/json',
            // 'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`
        },
    }).then((response)=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err));
}

// status
export const getStatus = () =>{
    return fetch(`${API}/pdf/status`,{
        method:'GET',
        headers:{
            Accept:'application/json',
            // 'Content-Type': 'application/json',
            // Authorization:`Bearer ${token}`
        },
    }).then((response)=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err));
}

export const updateStatus = (id,status) =>{
    // console.log(status)
    return fetch(`${API}/pdf/update/status/${id}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
            // Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({status,id})
    }).then((response)=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err));
}

// export const getStatusByCategory = (StatusCategory) =>{
//     return fetch(`${API}/pdf/status/${StatusCategory}`,{
//         method:'GET',
//         headers:{
//             Accept:'application/json',
//             // 'Content-Type': 'application/json',
//             // Authorization:`Bearer ${token}`
//         },
//     }).then((response)=>{
//         handleResponse(response)
//         return response.json()
//     }).catch(err=>console.log(err));
// }

//download count
export const downloadCount = (id) =>{
    return fetch(`${API}/pdf/download/count/${id}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            // 'Content-Type': 'application/json',
            // Authorization:`Bearer ${token}`
        },
    }).then((response)=>{
        handleResponse(response)
        return response.json()
    }).catch(err=>console.log(err));
}