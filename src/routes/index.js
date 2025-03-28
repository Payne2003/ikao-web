import BlogsPage from '@/pages/client/BlogsPage/BlogsPage'
import LoginForm from '@/components/entry/LoginForm'
import RegisterForm from '@/components/entry/RegisterForm'
import ProductDetail from '@/pages/client/ProductsPage/ProductDetail'
import LayoutClient from '@/components/layout/layoutClient/LayoutClient'
import HomePage from '@/pages/client/HomePage/HomePage'
import LayoutAdmin from '@/components/layout/layoutAdmin/LayoutAdmin'
import ProductsPage from '@/pages/client/ProductsPage/ProductsPage'
import AddProduct from '@/pages/admin/Product/AddProduct'
import Dashboard from '@/pages/admin/DashBoard/Dashboard'
import AddDirectory from '@/pages/admin/Directory/AddDirectory'
import ListProducts from '@/pages/admin/Product/ListProducts'
import AddOrder from '@/pages/admin/Order/AddOrder'
import ListOrder from '@/pages/admin/Order/ListOrder'
import AddUser from '@/pages/admin/User/AddUser'
import ListUser from '@/pages/admin/User/ListUser'
import AddBlog from '@/pages/admin/Blogs/AddBlog'
import ListBlogs from '@/pages/admin/Blogs/ListBlogs'
import ListDirectory from '@/pages/admin/Directory/ListDirectory'
import CheckOutPage from '@/pages/client/CheckOutPage/CheckOutPage'
import Profile from '@/pages/client/Profile/Profile'
import PrivateRoute from '@/routes/PrivateRoute'
// import ProfilePage from '@/pages/client/ProfilePage/ProfilePage'
// import PrivateRoute from '@/routes/PrivateRoute'
// import AdminRoute from '@/routes/AdminRoute'

const routes = [
  {
    path: '',
    layout: LayoutClient,
    children: [
      { path: '/', component: HomePage },
      { path: '/products', component: ProductsPage },
      { path: '/products/:category/:name/:id', component: ProductDetail },
      { path: '/blogs', component: BlogsPage },
      { path: '/checkout', component: CheckOutPage, wrapper: PrivateRoute },
      { path: '/login', component: LoginForm },
      { path: '/register', component: RegisterForm },
      {
        path: '/profile',
        component: Profile,
        wrapper: PrivateRoute // Chỉ người dùng đăng nhập mới vào được
      }
    ]
  },
  {
    path: '/admin',
    layout: LayoutAdmin,
    // wrapper: AdminRoute, // Chỉ Admin mới vào được
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'add-product', component: AddProduct },
      { path: 'list-product', component: ListProducts },
      { path: 'add-directory', component: AddDirectory },
      { path: 'list-directory', component: ListDirectory },
      { path: 'add-order', component: AddOrder },
      { path: 'list-order', component: ListOrder },
      { path: 'add-user', component: AddUser },
      { path: 'list-user', component: ListUser },
      { path: 'add-blog', component: AddBlog },
      { path: 'list-blogs', component: ListBlogs }
    ]
  }
]

export { routes }
