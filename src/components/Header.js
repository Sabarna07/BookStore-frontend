import React,{useState} from 'react'
import { uploadFile } from '../actions/pdf';

const Header = () => {
    const [values, setValues] = useState({
        title:'',
        desc:'',
        file:'',
        error:'',
        success:'',
    })

    const {title, desc, file, error, success} = values

    const handleSubmit = (e) =>{
        e.preventDefault()
        setValues({...values, error:'', success:''})
        if(file){
            const formData = new FormData()
            formData.append('file',file)
            formData.append('title',title)
            formData.append('desc',desc)
            uploadFile(formData).then((data)=>{
                console.log(data)
                if(data.error){
                    setValues({...values, error:data.error.message, success:''})
                }
                else{
                    setValues({...values, success: data.message, error:'', title:'', desc:'', file:''})
                }
            })
        }

    }

    const handleChange = name => e =>{
        let value = name === 'file' ? e.target.files[0] : e.target.value 
        setValues({...values, [name] : value, error:'', success:''})
    }

    const showError = () =>(
        error && <div className="alert alert-danger">{error}</div>
    )

    const showSuccess = () =>(
        success && <div className="alert alert-success">{success}</div>
    )

    const uploadForm = () =>(
        <div>
        <h1>File Upload and download</h1>
            <div className="row" style={{margin:'0'}}>
                <div className="col-md-8 offset-2">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter Title</label>
                    <input type="title" className="form-control"  placeholder="Enter Title" onChange={handleChange('title')} value={title}  />
                </div>
                <div className="form-group">
                    <label>Enter description</label>
                    <input type="desc" className="form-control" onChange={handleChange('desc')} value={desc} placeholder="Enter description"/>
                </div>
                <div className="form-group">
                    <label className="btn btn-outline-primary ">Upload PDF
                    <input type="file" className="form-control" onChange={handleChange('file')} hidden />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
                </div>
            </div>
            </div>
    )

    const getFiles = () =>(
        <a href="/files">Get all files</a>
    )

    return (
        <div classNameName="container">
            {showError()}
            {showSuccess()}
            {uploadForm()}
            {getFiles()}
        </div>
    )
};

export default Header