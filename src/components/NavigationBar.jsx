import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  ChevronDown, 
  Users, 
  Utensils, 
  BadgePercent, 
  LayoutDashboard, 
  Home 
} from 'lucide-react';

const NavigationBar = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns instantly when clicking anywhere outside of the navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns instantly whenever a new route path fires up
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActive = (path) => location.pathname === path;
  const isDropdownActive = (keyword) => location.pathname.includes(keyword);

  const styles = {
    navbar: {
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 2rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    navContainer: {
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative'
    },
    brandZone: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      textDecoration: 'none',
      color: '#0f172a',
      fontWeight: '700',
      fontSize: '1.05rem',
      letterSpacing: '-0.02em'
    },
    brandIconFrame: {
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    staticLink: (path) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
      padding: '0.5rem 0.85rem',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: isActive(path) ? '#0f172a' : '#475569',
      backgroundColor: isActive(path) ? '#f1f5f9' : 'transparent',
      transition: 'all 0.15s ease'
    }),
    dropdownTrigger: (keyword) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      padding: '0.5rem 0.85rem',
      borderRadius: '6px',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: isDropdownActive(keyword) ? '#0f172a' : '#475569',
      backgroundColor: isDropdownActive(keyword) ? '#f1f5f9' : 'transparent',
      border: 'none',
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.15s ease'
    }),
    dropdownMenu: {
      position: 'absolute',
      top: '44px',
      right: 0,
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.05)',
      padding: '0.5rem',
      minWidth: '180px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      zIndex: 1010
    },
    dropdownItem: (path) => ({
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      textDecoration: 'none',
      fontSize: '0.825rem',
      fontWeight: '500',
      color: isActive(path) ? '#0f172a' : '#475569',
      backgroundColor: isActive(path) ? '#f8fafc' : 'transparent',
      transition: 'all 0.15s ease',
      textAlign: 'left'
    })
  };

  return (
    <div style={styles.navbar} ref={navRef}>
      <div style={styles.navContainer}>
        
        {/* Brand Core Identity */}
        <Link to="/" style={styles.brandZone}>
          <div style={styles.brandIconFrame}>
            <Building2 size={16} />
          </div>
          <span>Campus Cafeteria Management</span>
        </Link>

        {/* Structural Interactive Links */}
        <div style={styles.navLinks}>
          <Link to="/" style={styles.staticLink('/')}>
            <Home size={15} /> Hub
          </Link>

          <Link to="/dashboard" style={styles.staticLink('/dashboard')}>
            <LayoutDashboard size={15} /> Analytics
          </Link>

          {/* Dropdown Module: Students */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => toggleDropdown('students')} 
              style={styles.dropdownTrigger('students')}
            >
              <Users size={15} /> <span>Students</span>
              <ChevronDown size={12} style={{ opacity: 0.7, transform: activeDropdown === 'students' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>
            {activeDropdown === 'students' && (
              <div style={styles.dropdownMenu}>
                <Link to="/students-add" style={styles.dropdownItem('/students-add')}>Register Student</Link>
                <Link to="/students-view" style={styles.dropdownItem('/students-view')}>View Directory</Link>
              </div>
            )}
          </div>

          {/* Dropdown Module: Menu */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => toggleDropdown('menu')} 
              style={styles.dropdownTrigger('menu')}
            >
              <Utensils size={15} /> <span>Inventory</span>
              <ChevronDown size={12} style={{ opacity: 0.7, transform: activeDropdown === 'menu' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>
            {activeDropdown === 'menu' && (
              <div style={styles.dropdownMenu}>
                <Link to="/menu-add" style={styles.dropdownItem('/menu-add')}>Add Menu Provision</Link>
                <Link to="/menu-view" style={styles.dropdownItem('/menu-view')}>Inspect Catalog</Link>
              </div>
            )}
          </div>

          {/* Dropdown Module: Campaigns */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => toggleDropdown('offers')} 
              style={styles.dropdownTrigger('offers')}
            >
              <BadgePercent size={15} /> <span>Campaigns</span>
              <ChevronDown size={12} style={{ opacity: 0.7, transform: activeDropdown === 'offers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>
            {activeDropdown === 'offers' && (
              <div style={styles.dropdownMenu}>
                <Link to="/offers-add" style={styles.dropdownItem('/offers-add')}>Deploy Incentive</Link>
                <Link to="/offers-view" style={styles.dropdownItem('/offers-view')}>Track Active Offers</Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default NavigationBar;