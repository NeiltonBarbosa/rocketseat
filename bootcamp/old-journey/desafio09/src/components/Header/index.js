import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Content, Profile } from './styles';

import logo from '~/assets/logo.svg';

import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="Meetapp" />
        </Link>
        <aside>
          <Profile>
            <strong>{profile.name}</strong>
            <Link to="/profile">Meu perfil</Link>
          </Profile>

          <button type="button" onClick={() => dispatch(signOut())}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
