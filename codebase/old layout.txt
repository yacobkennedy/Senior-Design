import { Outlet, Link } from "react-router-dom";
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.layoutPage}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
};

export default Layout;