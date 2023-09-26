import './globals.css';

import phones from './phones.json';

import Link from 'next/link';


export default function Header() {

  return (
    <div className="navbar bg-neutral-focus">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden bg-base-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral-focus  rounded-box w-52 text-base-100">
        <li className='text-base-100' ><a>Home</a></li>
        <li className='text-base-100'><a>Apple</a></li>
        <li className='text-base-100'><a>Samsung</a></li>
        <li className='text-base-100'><a>Contact us</a></li>

      </ul>
    </div>
    <a className="btn btn-ghost normal-case text-xl text-base-100">Zain Wireless</a>
  </div>
  <div className="navbar-center hidden lg:flex " >
    <ul className="menu menu-horizontal px-1 ">
      <li><a className='text-base-300'>Home</a></li>
      <li className='text-base-100'><a>Apple</a></li>
      <li className='text-base-100'><a>Samsung</a></li>
      <li className='text-base-100'><a>Contact us</a></li>
      
    </ul>
  </div>
  
  <div className="navbar-end gap-2">
  <div className="flex-none bg-base-300">
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-primary ">
        <div className="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body ">
          <span className="font-bold text-lg ">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    </div>


    <div class="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>

  </div>
</div>
  );
}

/*
<div>

      <div className=" bg-neutral-focus">

        <div className="pl-[3%]  max-w-[1200px] ml-auto mr-auto pt-[20px] pb-[10px] flex ">
          
          <div className="flex[80%] text-base-100">
            <h2>Zain Wireless</h2>
          </div>
          <div className="form-control ">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          
          
          <div className="headerTopRight">
              <svg className="svgIcon" width="20" height="20">
                  <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
                </svg> 
                <svg className="svgIconShop" width="20" height="20">
							<path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
						</svg>
               
          </div>
         
        </div>

        <hr color="#2f2f2f"/>

        <div className="headerBottom">
        
        <ul>
          <li className="activeLink"><a href="/">Home</a></li>
          <li className='link'><Link href="/phones/iphone">Apple</Link></li>
          <li className="link"><Link href="/samsung">Samsung</Link></li>
          <li className="link"><Link href="/contactus">Contact Us</Link></li>
      </ul>


        </div>

        

      </div>


     
      
    </div>
*/