import React from 'react';
import styled from 'styled-components';
import { Div, PageContainer } from '../components/cssComponents/index';

const Frequently_asked = () => {
  return (
    <PageContainer>
      <Div>
        <FAQCss className='reg_form'>
          <div className='main-box'>
            <h1>Najczęściej Zadawane Pytania (FAQ)</h1>
            <p>
              Witaj w sekcji FAQ, gdzie odpowiemy na najczęściej zadawane
              pytania dotyczące naszego systemu rezerwacji stanowisk na
              łowiskach wędkarskich. Jeśli masz wątpliwości lub potrzebujesz
              dodatkowych informacji, jesteś we właściwym miejscu!
            </p>
            <ol>
              <li>
                <h2>Jak mogę zarezerwować stanowisko na łowisku?</h2>
                <p>
                  Aby zarezerwować stanowisko, wystarczy przejść do naszej
                  strony głównej, wybrać preferowane łowisko, wybrać datę i
                  czas, a następnie postępować zgodnie z instrukcjami rezerwacji
                  online. Proces jest prosty i intuicyjny.
                </p>
              </li>
              <li>
                <h2>Jakie informacje znajdę na stronie każdego łowiska?</h2>
                <p>
                  Dla każdego łowiska udostępniamy szczegółowe informacje, takie
                  jak rodzaje ryb dostępnych na tym obszarze, ilość stanowisk,
                  udogodnienia, regulacje oraz opinie innych wędkarzy.
                </p>
              </li>
              <li>
                <h2>Czy otrzymam potwierdzenie rezerwacji?</h2>
                <p>
                  Tak, po dokonaniu rezerwacji otrzymasz potwierdzenie drogą
                  elektroniczną, zawierające wszelkie istotne informacje
                  dotyczące Twojej rezerwacji, w tym datę, czas, numer
                  rezerwacji oraz dane kontaktowe.
                </p>
              </li>
              <li>
                <h2>Jakie są akceptowane metody płatności?</h2>
                <p>
                  Akceptujemy różne metody płatności online, takie jak karty
                  kredytowe i płatności elektroniczne. Wszelkie dane finansowe
                  są szyfrowane, aby zapewnić bezpieczeństwo transakcji.
                </p>
              </li>
              <li>
                <h2>Czy mogę uzyskać pomoc w razie problemów z rezerwacją?</h2>
                <p>
                  Oczywiście! Nasz zespół wsparcia jest dostępny, aby pomóc w
                  razie wszelkich pytań, problemów technicznych czy potrzeby
                  dodatkowych informacji. Skontaktuj się z nami poprzez
                  formularz kontaktowy na stronie.
                </p>
              </li>
              <li>
                <h2>
                  Jakie są zasady dotyczące bezpieczeństwa i ochrony środowiska?
                </h2>
                <p>
                  Wszystkie łowiska partnerskie przestrzegają ścisłych zasad
                  dotyczących bezpieczeństwa i ochrony środowiska. Prosimy o
                  przestrzeganie regulaminów łowisk oraz zasad etyki
                  wędkarskiej.
                </p>
              </li>
            </ol>
          </div>
        </FAQCss>
      </Div>
      {/* <video
        autoPlay={true}
        muted
        loop
        src='https://mysticparkfestival.my.canva.site/videos/6061270209f37a46695eaf9868b05d30.mp4'
        type='video/webm'></video> */}
    </PageContainer>
  );
};

const FAQCss = styled.div`
  h1 {
    text-align: center;
  }
  h2 {
    color: var(--yellow);
  }
  p {
    color: var(--green);
  }
`;

export default Frequently_asked;
