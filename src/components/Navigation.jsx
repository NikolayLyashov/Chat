import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useHistory } from 'react-router-dom';
import AuthorizationContext from '../context/AuthorizationContext';
import useAuthorizationData from '../useAuthorizationData';
import routes from '../routes.js';

export const Navigation = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { setAuthorization } = useContext(AuthorizationContext);
  const { logOut, userAuth } = useAuthorizationData();

  const handleClick = () => {
    setAuthorization('init');
    logOut();
    history.push(routes.login);
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <NavLink to="/" activeClassName="navbar-brand">{t('navigation.name')}</NavLink>
        {(userAuth) ? <button type="button" className="btn btn-primary" onClick={handleClick}>{t('navigation.exit')}</button> : null}
      </div>
    </nav>
  );
};

export default Navigation;
