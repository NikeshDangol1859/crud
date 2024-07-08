import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function ProductModule(props) {
    let showhide = props.showmodal
    const [image,setimages] = useState('')
    const inp_ref = useRef(null)



  useEffect(()=>{
    getEditData()


  },[showhide])

    // let [title, setTitle] = useState([])
  let [input_data,setinpData] = useState({
    Productname: '',
    image: '',
    description: '',
    price: ''
   

  })

 
 let handleImage = (e)=> {
  // console.log(e.target.files)
  // setimages(e.target.files[0])
  inp_ref.current.click()
  
 }

 let imgChange = (e)=> {

  let file = e.target.files[0]
  // console.log(file);
  setimages(file)
  
 }


    let setData=(e)=>{ 
      setinpData({...input_data, [e.target.name]:e.target.value})

    }   
    let getEditData = () => {
      if (props.getedit != "") {
        axios.get("http://localhost:3031/productlist/" + props.getedit)
          .then((res) => setinpData(res.data))
          .catch((err) => console.log(err.message))
      }
    }
  
    let saveData = () => {
      const formData = new FormData();
        formData.append('Productname', input_data.Productname);
        formData.append('image', image);
        formData.append('description', input_data.description);
        formData.append('price', input_data.price);
      if (props.getedit == "") {        
        axios.post('http://localhost:3031/productlist',input_data)
          .then((res) => {
            props.getaddpro()
            toast.success("Successfully Product Added")
          })
          .catch((e) => alert(e))
        
      }
      else {
        axios.put('http://localhost:3031/productlist/'+props.getedit,input_data)
        .then((res) => {
          props.getaddpro()
          toast.success("Successfully Product Modified")
        })
        .catch((e) => alert(e))
        
      }

      // axios.post("http://localhost:3031/user", input_data)
      // .then((res)=>{
      //   props.getaddpro()
      // })
        

    }
  return (
    <>
    <Modal show={showhide}>
        <Modal.Header closeButton onClick={()=>{props.getaddpro()}} >
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

<Modal.Body>
<div className='container p-3'>
  <label htmlFor="name" className="form-label">Product Title</label>
  <input type="text" id="uname" className="form-control" name='Productname'value={input_data.Productname} onChange={setData}/>  
  <label htmlFor="Image" className="form-label">Image</label>
  {/* <input type="file" id="image"  className="form-control" name='image'  onChange={handleImage}/> */}
  <div onClick={handleImage}>
    {image ? 
    <img src={URL.createObjectURL(image)} alt="upload Image" style={{width:'100px',height:'100px'}} />
    :
    <img src="./upload.jpg" alt="upload Image" style={{width:'50px',height:'50px'}} />
    }
  
  <input type="file" ref={inp_ref} id="image"  className="form-control" name='image' onChange={imgChange}  style={{display:"none"}}/>
    </div>  
  <label htmlFor="name" className="form-label">Product Description</label>
  <input type="text" id="uaddress" className="form-control" name='description' value={input_data.description} onChange={setData}/>  
  <label htmlFor="name" className="form-label">Product Price </label>
  <input type="text" id="uage" className="form-control" name='price' value={input_data.price} onChange={setData}/>  
   
  
</div>
</Modal.Body>
<Modal.Footer>
          <Button variant="secondary" onClick={()=>{props.getaddpro()}}>
            Close
          </Button>
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Modal>
      
    </>
  )
}

export default ProductModule
