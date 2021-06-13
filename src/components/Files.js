import React, { useState,useEffect } from 'react'
import {getAllFiles, downloadFile} from '../actions/pdf'

const Files = () => {
    const [file,setFiles] = useState([])
    const [values,setValues] = useState({
        error:'',
        success:''
    })

    useEffect(() => {
        initFiles();
    },[])

    const initFiles = () =>{
        getAllFiles().then((data)=>{
            if(data.error){
                setValues({...values, error:data.error, success:''})
            }
            else{
                setValues({...values,error:''})
                setFiles(data)
            }
        })
    }

    const handleDownload = (e,title) =>{
        console.log(e)
        downloadFile(e).then((data)=>{
            // console.log(data)
            const a = document.createElement('a');
            a.href = data;
            a.download = `${title}.pdf`
            a.click();
        })
    }

    const showFiles = () =>(
        <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Download</th>
    </tr>
  </thead>
  <tbody>
     {
         file.map(
             ({_id, title, desc, file_path, file_type})=>(
                 <tr key={_id}>
                     <td>{title}</td>
                     <td>{desc}</td>
                     <td>
                        <a href="#" onClick={()=>handleDownload(_id,title)}>Download</a>

                        {/* <p> {`http://localhost:8000/${file_path.replace('\\','/')}`} </p> */}
                     </td>
                 </tr>
             )
         )
     }
    </tbody>
</table> 
)

    return (
        <div>
           {showFiles()}
        </div>
    )
}

export default Files
