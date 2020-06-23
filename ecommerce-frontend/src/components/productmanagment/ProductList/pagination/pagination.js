import React,{useState} from "react";


const Pagination = (props) => {

  const [currentPage,setCurrentPage]=useState(props.currentPage);
  const [documentsPerPage,setDocumentsPerPage]=useState(props.documentsPerPage);

  const pagination=(number)=>{
    setCurrentPage(number);    
  }
  return (
    <div className="container products">
      <ul className="pagination" style={{marginBottom:60}}>
        {[
          ...Array(Math.ceil(props.totalDocs / props.documentsPerPage)).keys(),
        ].map((number) => (
          <li key={number + 1} className="page-item" onClick={      
            ()=>pagination(number)
          }>
            <a href="!#" className="page-link" >
              {number + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
