import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddProduct = () => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [code,setCode] = useState('')
    const navigate = useNavigate();

    const saveProduct = async(e) => {
        e.preventDefault();
        await axios.post(`http://localhost:5000/products`,{
            name: name,
            price: parseInt(price),
            code: code
        });
        navigate("/")
    }
    

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
        <form onSubmit={saveProduct} style={{ fontSize:'15px'}} className='my-6'><h1 style={{fontFamily:'monospace', fontSize:'20px'}}><storng>Tambah Data Produk</storng><hr style={{height:'3px',width:'200px',color:'gray',backgroundColor:'gray'}}/></h1>
            <div className="flex flex-col">
                <div className="mb-5 my-10">
                    <label className="font-bold text-slate-700"> Product Name </label>
                    <input value={name} onChange= {(e)=> setName (e.target.value)} type="text" placeholder="Masukkan Nama Produk" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>

                <div className="mb-5">
                    <label className="font-bold text-slate-700"> Price </label>
                    <input type="text" value={price} onChange= {(e)=> setPrice (e.target.value)} placeholder="Masukkan Harga Produk" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>

                <div className="mb-5">
                    <label className="font-bold text-slate-700"> Product Code </label>
                    <input type="text" value={code} onChange= {(e)=> setCode (e.target.value)} placeholder="Masukkan Kode Produk" className = "w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus-border-slate-500 hover:shadow"></input>
                </div>
                <button className="w-full p-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border border-indigo-500 hover:shadow" type="submit"> Tambah Produk </button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct