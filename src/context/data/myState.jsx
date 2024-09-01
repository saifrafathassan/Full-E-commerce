import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { fireDB } from '../../firebase/FirebaseConfig'

const myState = (props) => {
  const [mode, setMode] = useState('light')

  const toggleMode = () => {
    if(mode === 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "rgb(17, 24, 39)"
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = "white"
    }
  }

  const [loading, setLoading] = useState(false)

  // product info

  const [products, setProducts] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    order: '',
    brand:'',
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }
    )
  });

  // Add Products Function (Dashboard)

  const addProduct = async () => {
    if( products.title == '' || products.brand == '' || products.order == "" || products.price == '' || products.imageUrl == '' || products.category == '' || products.description == '' ) {
      return toast.error("All Fields are Required")
    }

    setLoading(true)

    try {
      const productRef = collection(fireDB, 'products')
      await addDoc(productRef, products)
      toast.success("Add Product Successfully")
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)
      getProductData();
      setLoading(false)
      
    } catch (error) {
      // console.log(error)
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([])

  const getProductData = async () => {

    setLoading(true)

    try {
      const q = query(
        collection(fireDB, 'products'),
        orderBy('time')
      )

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({...doc.data(), id: doc.id});
        });

        setProduct(productArray)
        setLoading(false)
      })

      return () => data;

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


    // Update Products Function (Dashboard)

  const edithandle = (item) => {
    setProducts(item)
  }


  const updateProduct = async () => {
    setLoading(true)
    try {
      setLoading(false)
      await setDoc(doc(fireDB, 'products', products.id), products)
      toast.success("Product Updated Successfully")
      getProductData()
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 1000)

    } catch (error) {
      // console.log(error)
      setLoading(false)
    }
  }

  // Delete Product Function (Dashboard)

  const deleteProduct = async (item) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDB, 'products', item.id))
      toast.success('Product Deleted Successfully')
      getProductData()
      setLoading(false)
    } catch (error) {
      // console.log(error)
      setLoading(false)
    }
  }

// get orders data 
const [order, setOrder] = useState([])

const getOrderData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "orders"))
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push(doc.data());
      setLoading(false);
    });
    setOrder(ordersArray);
    // console.log(ordersArray);
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

// get user data on (Dashboard)
const [user, setUser] = useState([])

const getUserData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "users"))
    const usersArray = [];
    result.forEach((doc) => {
      usersArray.push(doc.data())
      setLoading(false)
    });
    setUser(usersArray)
    // console.log(usersArray)
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

useEffect(() => {
  getProductData();
  getOrderData();
  getUserData();
}, []);

const [searchkey, setSearchkey] = useState('')

  return (
    <MyContext.Provider value={{mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, order, user, searchkey, setSearchkey}}>
      {props.children}
    </MyContext.Provider>
  )
}

export default myState