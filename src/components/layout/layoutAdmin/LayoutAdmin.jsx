import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import { Button, Layout, Menu, theme } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { TbPackages } from 'react-icons/tb'
import { FaToggleOn, FaToggleOff, FaOpencart, FaUserCog, FaBlog } from 'react-icons/fa'
import { UserOutlined } from '@ant-design/icons'
import { GoFileDirectoryFill } from 'react-icons/go'
import { LucideClipboardList } from 'lucide-react'
import { RxDashboard } from 'react-icons/rx'
const { Header, Sider, Content } = Layout

// eslint-disable-next-line react/prop-types
const LayoutAdmin = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()
  const navigate = useNavigate()
  return (
    <Layout className='w-full'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical " />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          style={{ height: '110vh' }}
          onClick={({ key }) => {
            if (key === 'signout') {
              localStorage.removeItem('token')
              navigate('/login')
            } else {
              navigate(key)
            }
          }}
          items={[
            {
              key: 'admin',
              icon: <UserOutlined size={20} />,
              label: 'IKAO',
              className: 'text-2xl text-primary'
            },
            {
              key: 'dashboard',
              icon: <RxDashboard />,
              label: 'Dashboard',
              className: 'text-2xl text-primary'
            },
            {
              key: 'directory',
              icon: <GoFileDirectoryFill />,
              label: 'Ngành Hàng',
              children: [
                {
                  key: 'add-directory',
                  icon: <IoMdAddCircle />,
                  label: 'Thêm mới'
                },
                {
                  key: 'list-directory',
                  icon: <LucideClipboardList size={14} />,
                  label: 'Danh sách'
                }
              ]
            },
            // { key: "2", icon: <VideoCameraOutlined />, label: "nav 2" },
            {
              key: '/order',
              icon: <TbPackages />,
              label: 'Hàng Hóa',
              children: [
                {
                  key: 'add-product',
                  icon: <IoMdAddCircle />,
                  label: 'Thêm mới'
                },
                {
                  key: 'list-product',
                  icon: <LucideClipboardList size={14} />,
                  label: 'Danh sách'
                }
              ]
            },
            {
              key: 'order',
              icon: <FaOpencart />,
              label: 'Đơn Hàng',
              children: [
                {
                  key: 'add-order',
                  icon: <IoMdAddCircle />,
                  label: 'Thêm mới'
                },
                {
                  key: 'list-order',
                  icon: <LucideClipboardList size={14} />,
                  label: 'Danh sách'
                }
              ]
            },
            {
              key: 'users',
              icon: <FaUserCog />,
              label: 'User',
              children: [
                {
                  key: 'add-user',
                  icon: <IoMdAddCircle />,
                  label: 'Thêm mới'
                },
                {
                  key: 'list-user',
                  icon: <LucideClipboardList size={14} />,
                  label: 'Danh sách'
                }
              ]
            },
            {
              key: 'blogs',
              icon: <FaBlog />,
              label: 'Blog',
              children: [
                {
                  key: 'add-blog',
                  icon: <IoMdAddCircle />,
                  label: 'Thêm mới'
                },
                {
                  key: 'list-blogs',
                  icon: <LucideClipboardList size={14} />,
                  label: 'Danh sách'
                }
              ]
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            background: colorBgContainer
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <FaToggleOff /> : <FaToggleOn />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              marginRight: "4px"
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 0',
            width: '100%',
            padding: 24,
            paddingRight: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutAdmin
