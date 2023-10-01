import React,{useEffect,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../index';
import axios from 'axios'
import CheckBox from '../common/CheckBox';

function ManageLibrary() {
  let [library,setLibrary] = useState([])

  let getData = async ()=>{
    // let res = await fetch(`${API_URL}`)
    // let data = await res.json()
    // setBlogs(data)
    try {
      let res = await axios.get(`${API_URL}`)
      if(res.status===200)
      {
        setLibrary(res.data)
        // toast.success("Blogs fetched Successfully!")
      }
    } catch (error) {
      alert(error)
    } 
  }

  let handleDelete = async(id)=>{
    try {
      let res = await axios.delete(`${API_URL}/${id}`)
      if(res.status===200)
      {
        getData()
      }
    } catch (error) {
      alert(error)
    }
  }

  let handleStatusChange = async (id,status)=>{
    try {
      let res = await axios.put(`${API_URL}/${id}`,{
        active_flag:status
      })
      if(res.status===200)
      {
        getData()
      }
    } catch (error) {
      alert(error)
    }
  }
  useEffect(()=>{
    getData()
  },[])
  return <>
    <div className='main-content'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{width:"5%"}}>#</th>
          <th style={{width:"10%"}}>Title</th>
          <th style={{width:"20%"}}>Description</th>
          <th style={{width:"10%"}}>Status</th>
          <th style={{width:"10%"}}>Action</th>

        </tr>
      </thead>
      <tbody>
       {
        library.map((e)=>{
          return <tr key={e.id} style={{verticalAlign:"middle"}}>
            <td>{e.id}</td>
            <td>{e.title}</td>
            <td><Author content={e.description}/></td>
            <td><CheckBox id={e.id} status={e.active_flag} onStatusChange={handleStatusChange}/></td>
            <td><Action id={e.id} onDelete={handleDelete}/></td>
          </tr>
        })
       }
        
      </tbody>
    </Table>
    </div>
  </>
}

export default ManageLibrary

function Author({content})
{
  return<> <div className='description-wrapper'>
    <div className='author'>
      {content}
    </div>
    </div>
    </>
}

function Action ({id,onDelete}){
  let navigate = useNavigate()
  return  <>
    <i className="fa-solid fa-pen" style={{color:"#052c65",cursor:"pointer"}}
    onClick={()=>navigate(`/edit/${id}`)}
    ></i>
      &nbsp;
      &nbsp;
  <i className="fa-solid fa-trash" style={{color:"#d1625a",cursor:"pointer"}}
    onClick={()=>onDelete(id)}
  ></i>
  </>
}