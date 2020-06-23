import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './product-list.css';
import { useSelector, useDispatch } from 'react-redux';
import {listProducts} from '../../../actions/product-actions';
import ChartExample from '../../charts/chart-example';
import {useTranslation} from 'react-i18next';
import Pagination from './pagination/pagination';
import Loader from '../../Loader/Loader';
function ProductList ()
{
  const signIn=useSelector(store=>store.signIn);
  const {userInfo}=signIn;

  const [currentPage,setCurrentPage]=useState(0);
  const [documentsPerPage,setDocumentsPerPage]=useState(6);

  const { t, i18n } = useTranslation();
  const productList=useSelector(sotre=>sotre.productsList);
  const { products,totalDocs , loading ,error }=productList;
  const dispatch=useDispatch();

  useEffect(()=>{
      console.log('current page'+currentPage);
      dispatch(listProducts(currentPage,documentsPerPage));    
    return ()=>{}
  },[currentPage,dispatch,documentsPerPage]); 
  
  const printCurrentPage=()=>{
    console.log('current page'+currentPage);
  }
    const pagination=(number)=>{
      console.log('number is '+number)
      setCurrentPage(3);
      printCurrentPage();
    }

      return loading ? <Loader/>:
      error ? <h3>{error}</h3> :
      <div  className="product-container">
      {
        userInfo?.isAdmin?<ChartExample/>:
        products && <div className="container products">
        {
        products.map(product=><div className="product" key={product._id}>
          <div className="product-image">
             <Link to={'/product/'+product._id}><img src={product.image} alt='product'/></Link> 
          </div>
          <div className="product-name">
            <Link to={"/product/"+product._id}>{product.name}</Link>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-rating">{product.rate} {t('Stars.1')} ({product.numPreview} {t('Reviews.1')})</div>
        </div>)
        }


        
        <div className="container">
          <div style={{display:"block"}}>
          <ul className="pagination" style={{marginBottom:60}}>
            {[
              ...Array(Math.ceil(totalDocs / documentsPerPage)).keys(),
            ].map(number => (
              <li key={number + 1} className="page-item" >
                <a href="!#" className="page-link" onClick={      
                (e)=>{
                  e.preventDefault();
                  setCurrentPage(number)
                }
              }>
                  {number + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
      }

    </div>
}

export default ProductList;