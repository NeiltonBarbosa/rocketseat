import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

import api from '~/services/api';

export default function FileInput() {
  const { defaultValue, registerField } = useField('image');

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, []); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container htmlFor="image">
      <img src={preview} alt="" />

      <span>Selecione imagem</span>

      <input
        type="file"
        id="image"
        accept="image/*"
        data-file={file}
        onChange={handleChange}
        ref={ref}
      />
    </Container>
  );
}
