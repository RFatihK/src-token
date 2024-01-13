

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Token from './Token';

describe('Token Komponenti Testleri', () => {
  it('Başlangıç durumuyla Token komponentini render eder', () => {
    const { getByText } = render(<Token />);
    
    // Başlangıç durumunun doğru bir şekilde render edildiğini doğrula
    expect(getByText('Tec Token Bağış Ekranı')).toBeInTheDocument();
    expect(getByText('Token Adı:')).toBeInTheDocument();
    expect(getByText('Token Sembolü:')).toBeInTheDocument();
    expect(getByText('Bağış Adresimiz:')).toBeInTheDocument();
  });

  it('Cüzdan bağlanır ve durum güncellenir', async () => {
    const { getByText } = render(<Token />);
    
    fireEvent.click(getByText('Cüzdana Bağlan'));

    // Asenkron işlemi simüle et (örneğin, cüzdan bağlama)
    await waitFor(() => {
      expect(getByText('Cüzdana Bağlan')).toBeInTheDocument();
      expect(getByText('Adres:')).toBeInTheDocument();
      expect(getByText('Miktar:')).toBeInTheDocument();
    });
  });

  it('Token transferi yapılır ve durum güncellenir', async () => {
    const { getByText, getByPlaceholderText } = render(<Token />);
    
    fireEvent.change(getByPlaceholderText('Adresinizi giriniz'), { target: { value: 'ornekAdres' } });
    fireEvent.change(getByPlaceholderText('Göndermek istediğiniz TEC miktarını giriniz'), { target: { value: 10 } });

    fireEvent.click(getByText("Bağış Token'ını Gönder"));

    // Asenkron işlemi simüle et (örneğin, token transferi)
    await waitFor(() => {
      expect(getByText('Transfer başarılı, bağışınız için çok teşekkürler!')).toBeInTheDocument();
      // Durum güncellendikçe daha fazla doğrulama ekle
    });
  });
});
