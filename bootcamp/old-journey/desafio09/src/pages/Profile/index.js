import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdRefresh } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Content>
        <Form initialData={profile} onSubmit={handleSubmit}>
          <Input name="name" placeholder="Nome completo" />
          <Input name="email" placeholder="Seu endereço de e-mail" />

          <hr />

          <Input
            type="password"
            name="oldPassword"
            placeholder="Sua senha atual"
          />
          <Input type="password" name="password" placeholder="Nova senha" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmação de senha"
          />

          <div>
            <button type="submit">
              <MdRefresh size={24} color="#fff" />
              Atualizar perfil
            </button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}
