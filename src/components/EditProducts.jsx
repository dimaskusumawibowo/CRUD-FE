import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";




const EditProducts = () => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [code,setCode] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const getProductById = async () => {
            const response = await axios.get(`http://localhost:5000/products/${id}`)
            setName(response.data.name);
            setPrice(response.data.price);
            setCode(response.data.code);
        };
        getProductById();
    },[id])

    const updateProduct = async(e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/products/${id}`,{
            name: name,
            price: parseInt(price),
            code: code
        })

        const fetch = async() => {
            const response = await axios.get(`http://localhost:5000/products/${id}`)
            return response.fetch
        }
        
        navigate("/")
    }
    
  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <form onSubmit={updateProduct} style={{ fontSize:'15px'}} className='my-0'><strong><h1 style={{fontFamily:'monospace', fontSize:'20px'}}>Update Data Produk<hr style={{height:'3px',width:'200px',color:'gray',backgroundColor:'gray'}}/></h1></strong>
            <div className="flex flex-col">
                <div className="mb-5 my-10">
                    <label className="font-bold text-slate-700"> Product Name </label>
                    <input value={name} onChange= {(e)=> setName (e.target.value)} type="text" placeholder="Masukkan Nama Produk Yang di Update" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>

                <div className="mb-5">
                    <label className="font-bold text-slate-700"> Price </label>
                    <input type="text" value={price} onChange= {(e)=> setPrice (e.target.value)} placeholder="Masukkan Harga Produk Yang di Update" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>

                <div className="mb-5">
                    <label className="font-bold text-slate-700"> Product Code </label>
                    <input value={code} onChange= {(e)=> setCode (e.target.value)} type="text" placeholder="Masukkan Kode Produk Yang di Update" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>

                <button className="w-full p-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border border-indigo-500 hover:shadow" type="submit"> Update Produk </button>
            </div>
        </form>
    </div>
  )
}

export default EditProducts