import PropTypes from 'prop-types';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, EnvironmentOutlined, AppstoreOutlined, FileTextOutlined, TagsOutlined, BookOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard'
    },
    {
      key: '/dashboard/polaruang',
      icon: <AppstoreOutlined />,
      label: 'Pola Ruang'
    },
    {
      key: '/dashboard/rtrw',
      icon: <FileTextOutlined />,
      label: 'Dokumen RTRW'
    },
    {
      key: '/dashboard/klasifikasi',
      icon: <TagsOutlined />,
      label: 'Klasifikasi'
    },
    {
      key: '/dashboard/berita',
      icon: <BookOutlined />,
      label: 'Berita'
    }
  ];

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      navigate('/login');
    } else {
      navigate(key);
    }
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Layout className="min-h-screen">
      {/* Mobile Overlay */}
      {mobileMenuOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>}

      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={0}
        className={`fixed z-50 h-screen bg-gradient-to-b from-gray-900 to-gray-800 md:relative ${mobileMenuOpen ? 'left-0' : '-left-full md:left-0'} transition-all duration-300`}
        width={260}
      >
        <div className="flex items-center justify-center gap-2 border-b border-gray-700 p-3 sm:gap-3 sm:p-4">
          <div className="rounded-lg bg-primary-100 p-1.5 text-primary-600 sm:p-2">
            <EnvironmentOutlined className="text-xl sm:text-2xl" />
          </div>
          {!collapsed && (
            <div className="text-white">
              <h2 className="font-display text-base font-bold sm:text-lg">RTRW</h2>
              <p className="text-xs text-gray-400">Gorontalo</p>
            </div>
          )}
        </div>

        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} onClick={handleMenuClick} items={menuItems} className="mt-4 border-r-0 bg-transparent" />

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 transition-colors duration-300 hover:bg-red-500/10">
            <LogoutOutlined />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </Sider>

      <Layout className="w-full">
        {/* Header */}
        <Header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 shadow-sm sm:px-6">
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setMobileMenuOpen(!mobileMenuOpen);
              } else {
                setCollapsed(!collapsed);
              }
            }}
            className="text-xl text-gray-600 transition-colors hover:text-primary-600 sm:text-2xl"
          >
            {collapsed || !mobileMenuOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600 sm:h-10 sm:w-10 sm:text-base">A</div>
          </div>
        </Header>

        {/* Content */}
        <Content className="m-3 min-h-[calc(100vh-140px)] rounded-xl bg-gray-50 p-4 sm:m-4 sm:p-5 md:m-6 md:rounded-2xl md:p-6">{children}</Content>
      </Layout>
    </Layout>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout;
