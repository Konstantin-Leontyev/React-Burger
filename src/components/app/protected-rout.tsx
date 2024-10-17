import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsAuthChecked, getUser } from '../services/auth/reducers';

type TProtectedProps = {
  component: React.JSX.Element;
  onlyUnAuth?: boolean;
};

function Protected({ component, onlyUnAuth = false }: TProtectedProps): React.JSX.Element {
  const isAuthChecked = useSelector(getIsAuthChecked);
  const user = useSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка</p>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: {pathname: '/'}};
    return <Navigate to={from} />;
  }

  return component;
}

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: { component: React.JSX.Element }): React.JSX.Element => (
  <Protected component={component} onlyUnAuth={true} />
)
