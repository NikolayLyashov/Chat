import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import AuthorizationContext from '../context/AuthorizationContext';

export const Navigation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { setAuthorization } = useContext(AuthorizationContext);

  const handleClick = () => {
    setAuthorization('init');
    history.push('/login');
    localStorage.clear();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink to="/" activeClassName="navbar-brand">{t('navigation.name')}</NavLink>
        {(location.pathname === '/') ? <button type="button" className="btn btn-primary" onClick={handleClick}>{t('navigation.exit')}</button> : null}
      </div>
    </nav>
  );
};

export default Navigation;
