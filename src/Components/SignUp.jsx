import React from "react";

const SignUp = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "800px" }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="../images/Todo.jpg"
            alt="SignUp Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        
        {/* Form Section */}
        <div className="col-md-6 p-4 bg-white">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form className="border p-3 rounded">
            <div className="mb-3 text-start">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" placeholder="Enter full name" required />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" required />
            </div>
            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" placeholder="Enter password" required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;