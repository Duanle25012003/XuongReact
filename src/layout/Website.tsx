import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function WebsiteLayout() {
        const [user, setUser] = useState(sessionStorage.getItem('user'));

        function Logout(){
            localStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setUser('');
        }

        return(
            <>
            <header>
            <div className="bg-green-400">
  <nav className="flex justify-between items-center p-4">
    <ul className="flex items-center space-x-6 text-[#46494F]">
      <li>
        <Link className="" to="/">Trang chủ</Link>
      </li>
      <li>
        <Link className="" to="/products">Sản phẩm</Link>
      </li>
      <li>
        <Link className="" to="/contact">Liên hệ</Link>
      </li>
      <li>
        <Link className="" to="/cart">Giỏ hàng</Link>
      </li>
    </ul>

    <ul className="flex items-center space-x-6 text-[#46494F]">
      {user ? 
        <>
          <li>
            <Link className="" aria-current="layput" to="/">Xin chào {user}</Link>
          </li>
          <li>
            <Link onClick={Logout} className="" aria-current="layout" to="/">Đăng Xuất</Link>
          </li>
        </>
       : 
        <>
          <li>
            <Link className="" aria-current="layout" to="/register">Đăng Kí</Link>
          </li>
          <li>
            <Link className="" aria-current="layout" to="/login">Đăng Nhập</Link>
          </li>
        </>
      }
    </ul>
  </nav>
</div>

    </header>
    <main>
                <Outlet/>
            </main>
            <footer>
                Footer
            </footer>
            </>
        )
}
export default WebsiteLayout