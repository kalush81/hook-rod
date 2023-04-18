# hookrod-gatsby

aplikacja sluzaca do dokonywania rezerwacji poszczegolnych stanowisk na wybranuch lowiskach prywatnych

# Wazne !!!
-Rezerwujący widząc "transakcja oczekująca" powinien wiedziez , ze ten czas trwa jedyne 15 minut w celu aby go zachecic do poczekania. 
- Rezerwujący mogą rządać faktury.

# Na kiedyś... 
Wlascicielom łowisk trzeba dobrze przedstawic korzysci płynace z korzystania 
rezerwatora. 
- Organizacja 
- Odpowiedzialnosc za prawidlowy przebieg rezerwacji
- Prowadzenie dokumentacja zwiazanej z rezerwacjami
- Spadek kosztow zwiazany z niezatrudnianiem osob 


- Dac odczuć wlascicielowi łowiska ze platnosc 100% online  jest najbezpieczniejsza, klient wówczas musi przyjechac albo traci pieniądze..
 Ale zdrugiej strony potencjalnym klientom tez trzeba dac jakiś gwarant, zdobyć ich zaufanie. Na przykłąd łowiska powinny zachęcac klientow do korzystania z naszej aplikacji, dając im tym poczucie gwarancji. 
- Silny argument to fakt ze "by default" łowisko otrzymuje swoją stronę z własnymi google-keywords i opisem co optymalizuje ich SEO;
- Nagrać reklamę video na Youtube;
- Załoyc konto firmowe na facebook i cos w rodzaju obsluga klienta


######################### EXTRA ###############################

Pomysly na modernizacje aplikacji ale dopiero gdy juz bedzie "dobrze" dzialac i bedzie wdrozonych przynajmniej kilka zaprzyjaznionych łowisk:

-Przepisanie aplikacji  na Next.js / frontend
    pozwoli to jeszcze na szybsze dzialanie apki i na usprawnienie jej maintance i unowoczesnienie;

-Wprowadzic i18n czyli internationalization, np jezyk angielski;     

-Zaprogramowanie apki na telefon, android i iOS ( React Native );

-Łowiskom ktore generuja najwyszszy przychód zaproponowac strone internetowa typu landing page - wizytowka ( oczywiscie tam musi sie znalezc link do naszego rezerwatora ); Z templatek bootstrapa moge je postawić za FREE.

-Zlecic wykonania PRO design-u, uwzgledniajac konkretny UX;

-mMze zatrudnic na krotki czas jakiegos przedstawiciela
ktory pomoze zdobyc wiecej klientow wykorzystujac ich te sztuczki psychologiczno - marketingowe;

Oplacic reklamę na google-ach w celu lepszego pozycjonowania aplikacji; Wykupic na jakis okres Facebook Adds w celach promocyjnych



#############################################################


# wazne TODO , na juz
- po kliknieciu w przycisk "rezerwuje i place" uzytkwonik powinien otrzymac info
 ze "za chwile nastąpi przekierowanie do strony platniczej". Mozna dac jakiegoś spina.
 przycisk "rezerwuje i place powinien zostac zdezaktywowany aby uniemozliwic wielokrotne nacisniecia . Albo debouncer albo zwykly prop na butonie "disabled". Odbieranie multirequesta czyli ten wywolany nacisnieciem przycisku powinno byc zablokowane przwede wszystkim na backendzie.
-  wykonac dwie podstrony dla success i failed. Linki przekazac Dawidowi na backend.
- przebudowac blokowanie dat w TimeTable w ten sposob aby korzystalo z biblioteki dayjs.
- zoptymalizowac grafiki/zdjecia na homepage i partnerzy
- usunac icony z fontawesome and react-icons
