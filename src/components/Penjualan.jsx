import React from 'react'
import { Link } from 'react-router-dom'
import axios  from 'axios'
import useSWR,{useSWRConfig} from 'swr'
import { FaHome, FaPlus, FaMinus} from "react-icons/fa";


const ProductList = () => {
    const {mutate} = useSWRConfig();
    const fetch = async() => {
        const response = await axios.get(`http://localhost:5000/products`);
        return response.data;
    }

    const {data} = useSWR('products',fetch);
    if(!data) return <h2> Loading ...</h2>

    const deleteProduct = async(productId) => {
        await axios.delete(`http://localhost:5000/products/${productId}`)
        mutate('products')
    }

    return (
        
        <div className="flex flex-col mt-5">
            <h1 style={{padding:'5px',fontWeight:'bolder', marginBottom:'20px',marginTop:'20px', fontSize:'18px'}}> Silahkan Tambahkan Item <strong> Kedalam Keranjang </strong></h1>
            <div className='w-full'>
                <div className='relative shadow rounded-lg mb-8'>
                    <table className='w-full text-sm text-left text-grey-500'>
                        <thead className='text-xs text-gray-800 uppercase bg-gray-200'>
                            <tr>
                                <th className='py-3 px-1 text-center'> No </th>
                                <th className='py-3 px-6'> Product Name </th>
                                <th className='py-3 px-6 text-left'> Price </th>
                                <th className='py-3 px-6 text-left'> Product Code </th>
                                <th className='py-3 px-9 text-center'> Action </th>
                                <th className='py-3 px-6 text-left'> Total </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product,index)=> (
                                <tr className='bg-grey border-b' key={product.id}>
                                <td className='py-3 px-1 text-center'>{index + 1}</td>
                                <td className='py-3 px-6 font-medium text-gray-90'>{product.name}</td>
                                <td className='py-3 px-6 text-left'>{product.price}</td>
                                <td className='py-3 px-6 font-medium text-gray-90'>{product.code}</td>
                                <td className='text-center py-3 px-2'>
                                    <Link to={`edit/${product.id}`}><button className='font-medium bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded text-white mr-1 text-center'> <FaPlus size={'1.5rem'}/></button></Link>
                                    <Link><button onClick={()=> deleteProduct (product.id)} className='font-medium bg-red-400 hover:bg-red-500 px-3 py-2 rounded text-white mr-1 text-center'><FaMinus size={'1.5rem'}/></button></Link>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        
                    </div>
                </div>
                <Link to={`/`}><button className='bg-green-500 hover:bg-green-500 rounded-lg py-3 px-2 font-bold border border-slate-200 text-white'><FaHome size={`3rem`}/></button></Link>
            </div>
        </div>
    )
}

export default ProductList