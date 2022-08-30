const voivodeships = [
  "zachodnio-pomorskie",
  "pomorskie",
  "warmińsko-mazurskie",
  "dolnośląskie",
  "lubuskie",
  "wielkopolskie",
  "kujawsko-pomorskie",
  "śląskie",
  "łódzkie",
  "mazowieckie",
  "świętokrzyskie",
  "podlaskie",
  "lubelskie",
  "podkarpackie",
  "opolskie",
  "małopolskie",
];
//this data is just a mock. The real data from external API will replace it.
const voivodeshipsData = [
  { id: 1, fisheries: [], voiv: "zachodnio-pomorskie" },
  { id: 2, fisheries: [], voiv: "pomorskie" },
  { id: 3, fisheries: [], voiv: "warminsko-mazurskie" },
  { id: 4, fisheries: [], voiv: "dolnoslaskie" },
  { id: 5, fisheries: [], voiv: "lubuskie" },
  {
    id: 6,
    fisheries: [
      {
        id: 215,
        name: "Jerzyn",
        slug: "Jerzyn",
        imagePath:
          "https://movyu-prod.s3.amazonaws.com/sports/fishing/location_507/images/sliders/8f58129c-ebe0-4fec-898d-c8f8b0334b0b",
        city: "Jerzyn",
        voivodeship: "Wielkopolskie",
        numberOfPegs: 12,
        priceLowest: 10,
        priceHighest: 90,
        species: ["Jesiotr", "Karp", "Okoń"],
        records: [
          {
            name: "Karp",
            weight: 55,
            size: 70,
          },
          {
            name: "Szczupak",
            weight: 30,
            size: 100,
          },
        ],
        regulations: [
          `1. Wszystkie opłaty dokonujemy u właściciela łowiska lub
      osoby upoważnionej. Marcin tel: 793-026-620, Kamil
      791-130-256, Maciek 570-510-088, Mateusz 505-973-234
      e-mail: kontakt@extra-carp.pl
    `,
          `2. Opłata za wędkowanie to 60 zł za dobę (Każdy wędkarz ma
      prawo łowić max. na 3 wędki)
    `,
          `3. W przypadku opuszczenia łowiska przez osobę wędkującą
      podczas trwania opłaconej doby opłaty za wędkowanie
      pobierane są ponownie.
    `,
          `4. Przed wjazdem na łowisko i jego opuszczeniem należy
      powiadomić właściciela lub osobę upoważnioną.
    `,
          `5. Doba na łowisku trwa od godz 12.00 do 12.00 następnego
      dnia jednak istnieje możliwość wcześniejszego przyjazdu na
      stanowisko lub późniejsze jego opuszczenie po uzgodnieniu
      z właścicielem, ale tylko w przypadku gdy na dane
      stanowisko nie ma kolejnej rezerwacji w tym terminie.
    `,
          `6. Łowisko czynne od 1 kwietnia do 31 październik, w
      miesiącu marcu i listopadzie zależności o warunków
      pogodowych.
    `,
          `7. Poza wyznaczonymi terminami obowiązuje całkowity zakaz
      wstępu na łowisko bez wiedzy właściciela.
    `,
          `8.W razie wypadków losowych i braku możliwości przyjazdu
      na łowisko zwroty zaliczki będą rozpatrywane
      indywidualnie.
    `,
          `9. Zaliczkę należy wpłacać z podaniem danych osoby
      rezerwującej, terminu przyjazdu oraz numeru
    `,
          `10. Od Karpiarzy wymagane jest posiadanie na stanowisku:
      maty karpiowej o długości przynajmniej 120 cm, szerokości
      80cm, grubości 8cm wypełnionej wewnątrz miękką-stabilną
      otuliną lub tzw. maty-kołyski, środka do dezynfekcji,
      podbieraka o rozstawie ramion 1 metr, żyłki minimum
      0,30mm. Na łowisku można stosować plecionkę, ale należy
      wtedy zastosować przypon strzałowy z żyłki mono lub
      fluocarbon min 10 m. Dopuszczone wszystkie modele haków
      zadziorowych z wyłączeniem haków typu Longshank nailer
      tzw. Bananówbr{" "}
    `,
          `11. Na łowisku obowiązuje zakaz nęcenia surowymi zbożami
    `,
          `12. Dozwolone jest wywożenie zestawów oraz nęcenie ze
      środka pływającego. Osoby poruszające się po akwenie
      środkami pływającymi obligatoryjnie muszą używać kapoków
      lub kamizelek asekuracyjnych.{" "}
    `,
          `
      13. Złowione ryby należy po delikatnym wypięciu jak
      najszybciej z powrotem wpuścić do akwenu, ryb tych nie
      wolno przetrzymywać w workach karpiowych ani też różnego
      rodzaju siatkach. Ze złowionymi rybami należy obchodzić
      się w sposób bardzo delikatny dbając o ich zdrowie i
      bezpieczeństwo, należy polewać je wodą. Złowione okazy
      można zważyć i wykonać sesję zdjęciową, która jednak nie
      może trwać dłużej niż 5 minut. Ryby o wadze powyżej 20 kg,
      muszą być zgłoszone do opiekuna.{" "}
    `,
          `
      14. Szczególnie mile będą widziani wędkarze zachowujący
      się kulturalnie, spokojnie oraz pozostawiający po sobie
      czystość i porządek. Wędkarz zobowiązany jest wysprzątać
      swoje stanowisko wędkarskie przed i po zakończeniu
      wędkowania (śmieci należy pozostawić w kontenerze
      przeznaczonym do tego celu lub zabrać z łowiska ze sobą).
      Zaśmiecanie będzie karane karą grzywny 100 zł.
    `,
          `
      15. Właściciele łowiska nie ponoszą odpowiedzialności za
      wypadki losowe oraz rzeczy pozostawione na łowisku, a
      także zastrzegają sobie prawo do zmiany regulaminu.{" "}
    `,
          `
      16. Osoby łamiące regulamin zostaną wydalone z terenu
      obiektu bez zwrotu opłat i bez możliwości ponownego
      przyjazdu. Dotyczy to także osób towarzyszących.{" "}
    `,
          `
      17. Osoby, które zostaną przyłapane na kradzieży ryb
      zostaną ukarane oraz zatrzymane do dyspozycji policji.{" "}
    `,
          `
      18. Właściciele lub osoby upoważnione mają prawo
      kontrolować osoby przebywające na łowisku oraz ich
      pojazdy.{" "}
    `,
          `
      19. Każdy przywłaszczony kilogram ryby podlega karze 1000
      zł. Nie tolerujemy tzw. \„mięsiarzy\” \– będą surowo karani.
    `,
          `
      20. Jeśli ktoś zostanie złapany na łowieniu wędkami za
      które nie została uiszczona opłata poniesie karę w
      wysokości 100 zł za każdą nieopłaconą wędkę.
    `,
          `
      21. Dopuszcza się możliwość wędkowania, rozbijania
      namiotów w obrębie stanowiska, jak również zanęcania,
      sondowania, stawiania markerów (Nie wolno znaczyć łowiska
      przedmiotami innymi niż przeznaczone do tego celu np.
      markery). Czynności te nie mogą utrudniać wędkowania
      wędkarzom przebywającym na innych stanowiskach.
    `,
          `
      22. Na łowisku obowiązuje zakaz spiningowania i łowienia
      „na żywca”. Osoby łamiące regulamin zostaną wyproszone z
      łowiska.
    `,
          `Obowiązuje metoda ZŁÓW i WYPUŚĆ „NO KILL” `,

          `Kategorycznie zabrania się: – Obowiązuje całkowity
      zakaz zabierania ryb. – Przetrzymywania ryb w siatce ,
      worku itp. – Brania ryb pod skrzela. – Całkowity zakaz
      palenia ognisk (dozwolony grill) – Kąpieli w łowisku. –
      Zanieczyszczania łowiska i zaśmiecania terenu łowiska. –
      Nadużywania alkoholu, całkowity zakaz zakłócania spokoju
      innym użytkownikom łowiska. – Niszczenia zieleni, łamania
      drzewek i niszczenia przyrody. – Puszczania psów bez
      smyczy i kagańca, poza obrębem swojego stanowiska. –
      Nakazuje się łowić na tzw. zestaw z bezpiecznym klipsem. W
      razie udaremnienia kłusownictwa na zbiorniku obowiązuje:
      Przestępstwo kłusownictwa w ustawie o rybactwie
      śródlądowym: Art. 27a. 1. Kto: 1) poławia ryby nie będąc
      uprawnionym do rybactwa (art. 4), 2) dokonuje połowu ryb
      bez upoważnienia, o którym mowa w art. 5, 3) narusza
      zakazy określone w art. 8 ust. 1 pkt 1–10 i ust. 2, z
      zastrzeżeniem art. 27 ust. 1 pkt 2, 4) narusza zakazy
      określone w art. 10 ust. 1, art. 14 ust. 2 oraz art. 19
      ust. 1 – podlega grzywnie, karze ograniczenia wolności
      albo pozbawienia wolności do lat 2. 2. W razie skazania za
      przestępstwa określone w ust. 1 orzeka się: 1) nawiązkę na
      rzecz pokrzywdzonego uprawnionego do rybactwa w wysokości
      określonej przez sąd, 2) przepadek narzędzi lub innych
      przedmiotów, które służyły lub były przeznaczone do
      popełnienia przestępstwa, a także przedmiotów pochodzących
      bezpośrednio lub pośrednio z przestępstwa. 3. Orzeczenie o
      przepadku, o którym mowa w ust. 2 pkt 2, może dotyczyć
      również przedmiotów niestanowiących własności sprawcy.
      Wejście lub wjazd na teren łowiska oznacza zgodę oraz
      akceptację regulaminu Łowiska Extra-Carp.]`,
        ],
      },
    ],
    voiv: "wielkopolskie",
  },
  {
    id: 7,
    fisheries: [
      {
        id: 107,
        name: "Uroczysko Karpiowe",
        slug: "uroczyszko-karpiowe",
        imagePath: null,
        city: "Czechowidze-Dziedzice",
        voivodeship: "Śląskie",
        numberOfPegs: null,
      },
    ],
    voiv: "slaskie",
  },
  {
    id: 8,
    fisheries: [
      {
        id: 292,
        name: "Szymanowice",
        slug: "szymanowice",
        imagePath: null,
        city: "Szymanowice",
        voivodeship: "Świętokrzyskie",
        numberOfPegs: null,
      },
    ],
    voiv: "swietokrzyskie",
  },
  {
    id: 9,
    fisheries: [
      {
        id: 90,
        name: "Wzory",
        slug: "wzory",
        imagePath: null,
        city: "Nasutów",
        voivodeship: "Lubelskie",
        numberOfPegs: null,
      },
    ],
    voiv: "lubelskie",
  },
  {
    id: 10,
    fisheries: [
      {
        id: 26,
        name: "Staw u Lomaxa",
        slug: "staw-u-lomaxa",
        imagePath: "https://i.ibb.co/H76PLN1/received-301554618657421.jpg",
        city: "Stalowa Wola",
        voivodeship: "Podkarpackie",
        numberOfPegs: 5,
      },
      {
        id: 30,
        name: "Zgoda",
        slug: "zgoda",
        imagePath:
          "https://i.ibb.co/HCK0mF9/278576123-5179840055409237-3808512376689358088-n.jpg",
        city: "unknown",
        voivodeship: "Podkarpackie",
        numberOfPegs: 123,
      },
      {
        id: 46,
        name: "Extra Carp Radymno",
        slug: "extra-carp-radymo",
        imagePath:
          "https://i.ibb.co/KVXK2G5/117714995-3471086599610855-7441530922398424970-o.jpg",
        city: "Radymno",
        voivodeship: "Podkarpackie",
        numberOfPegs: 2,
      },
      {
        id: 74,
        name: "Krzemienna nad Sanem",
        slug: "krzemienna-nad-sanem",
        imagePath: null,
        city: "Krzemienna",
        voivodeship: "Podkarpackie",
        numberOfPegs: null,
      },
      {
        id: 142,
        name: "Przystanek Stawy",
        slug: "przystanek-stawy",
        imagePath:
          "https://i.ibb.co/yYGxXWt/90645521-1571791229663500-7710748060590014464-n.jpg",
        city: "Jamnica",
        voivodeship: "Podkarpackie",
        numberOfPegs: null,
      },
      {
        id: 285,
        name: "Chwałowice",
        slug: "chwałowice",
        imagePath: null,
        city: "Chwałowice",
        voivodeship: "Podkarpackie",
        numberOfPegs: null,
      },
      {
        id: 322,
        name: "TEST",
        slug: "test",
        imagePath: null,
        city: "TEST",
        voivodeship: "Podkarpackie",
        numberOfPegs: 6,
      },
    ],
    voiv: "podkarpackie",
  },
  {
    id: 11,
    fisheries: [
      {
        id: 66,
        name: "Dzika Woda",
        slug: "dzika-woda",
        imagePath: null,
        city: "Tarnów",
        voivodeship: "Małopolskie",
        numberOfPegs: null,
      },
    ],
    voiv: "malopolskie",
  },
  { id: 12, fisheries: [], voiv: "opolskie" },
  { id: 13, fisheries: [], voiv: "mazowieckie" },
  { id: 14, fisheries: [], voiv: "lodzkie" },
  { id: 15, fisheries: [], voiv: "podlaskie" },
  { id: 16, fisheries: [], voiv: "kujawsko-pomorskie" },
];

const fetch = (...args) =>
  import(`node-fetch`).then(({ default: fetch }) => fetch(...args));

// const getDataByVoiv = async (voiv) => {
//   const result = await fetch(
//     `https://karpteam.herokuapp.com/api/lakes/woj?voivodeship=${voiv}`,
//     {
//       mode: "cors",
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       withCredentials: false,
//       credentials: "same-origin",
//       crossdomain: true,
//     }
//   );
//   return await result.json();
// };

exports.sourceNodes = async ({
  reporter,
  actions: { createNode },
  createContentDigest,
}) => {
  try {
    // const promises = voivodeships.map((voiv) => {
    //   return getDataByVoiv(voiv);
    // });

    // Promise.all(promises).then((fisheries) =>
    //   console.log("fishieries", fisheries)
    // );
    // .then -> fisheries.forEach -> createNode (fishery)

    voivodeshipsData.forEach((data) => {
      createNode({
        id: String(data.id),
        fisheries: data.fisheries,
        slug: data.voiv,
        parent: null,
        children: [],
        internal: {
          type: `Voivodeship`,
          contentDigest: createContentDigest(data),
        },
      });
      data.fisheries.forEach((fishery) => {
        const required = {
          id: String(fishery.id),
          path: `wojewodztwa/${data.voiv}/${fishery.slug}`,
          slug: fishery.slug,
        };
        const rest = { ...fishery };
        const node = Object.assign({}, rest, required, {
          parent: null,
          children: [],
          internal: {
            type: `Fishery`,
            contentDigest: createContentDigest(fishery),
          },
        });
        createNode(node);
      });
    });
  } catch (err) {
    console.log("err...", err);
    reporter.info(
      `there was a problem while fetching data for nodes creation from fishery api`
    );
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query FisheryQueryNode {
      allFishery {
        nodes {
          city
          slug
          name
          id
          path
          regulations
          voivodeship
          priceLowest
          priceHighest
          records {
            name
            weight
            size
          }
          imagePath
          numberOfPegs
        }
      }
    }
  `);
  data.allFishery.nodes.forEach((node) => {
    const myPath = node.path;
    actions.createPage({
      path: myPath,
      component: require.resolve(`./src/templates/fishery.js`),
      context: { ...node },
    });
  });
};
