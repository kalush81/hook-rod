import React from 'react';
import styled from 'styled-components';
import { Div } from '../components/cssComponents';

const O_nas = () => {
  return (
    <Div>
      <ONasCss className='reg_form'>
        <h2>Nasza misja</h2>
        <p>
          Naszym celem jest zapewnienie wędkarzom wygodnego, szybkiego i
          efektywnego dostępu do najatrakcyjniejszych miejsc do wędkowania.
          Chcemy, aby korzystanie z naszego systemu było przyjemnością, a każda
          wędkarska wyprawa była dobrze zaplanowana i bezproblemowa.
        </p>
        <h2>Co oferujemy ?</h2>
        <ul>
          <li>
            <p>
              Łatwa rezerwacja online: Nasz system umożliwia łatwą i szybką
              rezerwację stanowisk na łowiskach wędkarskich bez konieczności
              opuszczania domu.
            </p>
          </li>
          <li>
            <p>
              Dostęp do najlepszych łowisk: Współpracujemy z renomowanymi
              łowiskami, aby zapewnić naszym użytkownikom dostęp do miejsc z
              bogatym łowiskowym potencjałem.
            </p>
          </li>
          <li>
            <p>
              Informacje o łowiskach: Dostarczamy szczegółowe informacje o
              każdym łowisku, takie jak rodzaje ryb, ilość stanowisk,
              udogodnienia oraz zasady i regulacje.
            </p>
          </li>
          <li>
            <p>
              Powiadomienia i aktualności: Informujemy naszych użytkowników o
              nowościach, promocjach i ważnych wydarzeniach dotyczących łowisk
              wędkarskich.
            </p>
          </li>
        </ul>
        <h2>Dlaczego My? </h2>
        <ul>
          <li>
            <p>
              Doświadczenie: Jesteśmy wędkarzami, którzy doskonale rozumieją
              potrzeby innych pasjonatów tego sportu.
            </p>
          </li>
          <li>
            <p>
              Przejrzystość: Nasz system działa transparentnie, a wszelkie
              informacje dotyczące łowisk są łatwo dostępne dla użytkowników.
            </p>
          </li>
          <li>
            <p>
              Wsparcie: Nasza pomoc techniczna służy wsparciem w przypadku
              wszelkich pytań czy problemów z korzystaniem z systemu.
            </p>
          </li>
        </ul>
        <i>
          Dołącz do naszego społeczności wędkarskiej i zacznij planować swoje
          wędkarskie przygody z łatwością i pewnością. Razem stworzymy
          niezapomniane chwile na łowisku!
        </i>
      </ONasCss>
    </Div>
  );
};

const ONasCss = styled.div`
  margin: 60px 0 100px 0;
  h2 {
    color: var(--yellow);
  }
  p {
    color: var(--green);
  }
`;

export default O_nas;
