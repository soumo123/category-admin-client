import React from 'react'
import loadingImage from  '../../images/03-42-05-37_512.webp'
// import '../../css/home.css'
import '../../css/sidebar.css'

const Approved = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row wait justify-content-center text-center">
          <img src={loadingImage} className="img-fluid w-15" alt="image"/>
        <h5 className="wait">Please wait some moment ... </h5>
        <h5 className="mb-5">Let Admin Verified You</h5>

        </div>
        
      </div>

    </>
  )
}

export default Approved