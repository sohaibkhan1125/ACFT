import React, { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import TitleManagement from './TitleManagement';
import FooterManagement from './FooterManagement';
import HomePageContactManagement from './HomePageContactManagement';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Overview and analytics'
    },
    {
      id: 'general',
      label: 'General Settings',
      icon: '⚙️',
      description: 'Maintenance mode and settings'
    },
    {
      id: 'title-management',
      label: 'Title Management',
      icon: '📝',
      description: 'Manage website title'
    },
    {
      id: 'footer-management',
      label: 'Footer Management',
      icon: '🔗',
      description: 'Manage footer social links'
    },
    {
      id: 'homepage-contact',
      label: 'HomePage Contact Management',
      icon: '📞',
      description: 'Manage homepage contact content'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
              <p className="text-gray-600">Welcome to the ACFT Calculator Admin Panel</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Website Status</h3>
                    <p className="text-sm text-gray-600">Currently Online</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Maintenance Mode</h3>
                    <p className="text-sm text-gray-600">Manage site availability</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-600">View usage statistics</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('general')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">⚙️</span>
                    <div>
                      <h4 className="font-medium text-gray-900">General Settings</h4>
                      <p className="text-sm text-gray-600">Configure maintenance mode and other settings</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('title-management')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📝</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Title Management</h4>
                      <p className="text-sm text-gray-600">Update website title and branding</p>
                    </div>
                  </div>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <h4 className="font-medium text-gray-900">View Analytics</h4>
                      <p className="text-sm text-gray-600">Check website usage and performance</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'general':
        return <GeneralSettings />;
      case 'title-management':
        return <TitleManagement />;
      case 'footer-management':
        return <FooterManagement />;
      case 'homepage-contact':
        return <HomePageContactManagement />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-400 rounded-lg mr-3">
                  <span className="text-white text-lg">⚡</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    ACFT Calculator Admin
                  </h1>
                  <p className="text-sm text-gray-500">Administration Panel</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                System Online
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
          <nav className="mt-8">
            <div className="px-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Navigation
              </h2>
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-yellow-50 text-yellow-700 border-l-4 border-yellow-400 shadow-sm'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{item.icon}</span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          
          {/* Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>ACFT Calculator v1.0</p>
              <p>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
