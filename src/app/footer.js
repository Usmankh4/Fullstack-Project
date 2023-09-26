import React from 'react'

function footer() {
  return (
    
    <footer class="footer p-10 bg-neutral text-neutral-content justify-center w-full  space-x-96">
        <nav >
            <header class="footer-title ">Services</header> 
            <a class="link link-hover">Branding</a>
            <a class="link link-hover">Design</a>
            <a class="link link-hover">Marketing</a>
            <a class="link link-hover">Advertisement</a>
        </nav> 
        <nav>
            <header class="footer-title">Company</header> 
            <a class="link link-hover">About us</a>
            <a class="link link-hover">Contact</a>
            <a class="link link-hover">Jobs</a>
            <a class="link link-hover">Press kit</a>
        </nav> 
        <nav>
            <header class="footer-title">Legal</header> 
            <a class="link link-hover">Terms of use</a>
            <a class="link link-hover">Privacy policy</a>
            <a class="link link-hover">Cookie policy</a>
        </nav>
    </footer>
  )
}

export default footer


/*
<footer className="footer">


 padding-left: 3%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
        <div className="container">
            <div className="row">
                <div className="footer-col">
                    <h4>Main Menu</h4>
                    <ul>
                        <a className="link link-hover">Home</a>
                        <a className="link link-hover">iPhone</a>
                        <a className="link link-hover">Samsung</a>
                        <a className="link link-hover"> Android</a>
                        <a className="link link-hover">Tablet</a>
                        <a className="link link-hover">Accessories</a>
                        <a className="link link-hover">Contact Us</a>
                        <a className="link link-hover"> Help With Checkout</a>

                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Contact Us</h4>
                    <ul>
                        <a className="link link-hover"></a>

                    </ul>
                </div>
                <div className="footer-col">
                    <h4></h4>
                    <ul>
                        <a className="link link-hover"></a>

                    </ul>
                </div>

            </div>

        </div>
    </footer>*/