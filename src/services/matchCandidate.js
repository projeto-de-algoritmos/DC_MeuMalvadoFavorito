export const candidates = [
  {
    id: 1,
    name: "Ciro Gomes",
    img: "https://img.estadao.com.br/fotos/politica/eleicoes-2018/BR/FBR280000605589_div.jpg",
    party: "PDT (Partido Democrático Trabalhista)",
    vice: "Kátia Abreu (PDT)",
    governmentPlan:
      "https://static.poder360.com.br/2018/08/1533945439_ciro-gomes-proposta-governo.pdf",
    priorityList: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Jair Bolsonaro",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Jair_Bolsonaro_em_24_de_abril_de_2019_%281%29_%28cropped%29.jpg",
    party: "PSL (Partido Social Liberal)",
    vice: "Hamilton Mourão (PRTB)",
    governmentPlan:
      "https://static.poder360.com.br/2018/08/Plano-governo-Bolsonaro.pdf",
    priorityList: [1, 4, 2, 3],
  },
];

export function matchCandidate(userPriority) {
  let inversionsArr = [
    {
      id: 1,
      inversions: 0,
    },
    {
      id: 2,
      inversions: 0,
    },
  ];

  candidates.forEach((item, index) => {
    for (let i = 0; i < userPriority.length - 1; i++) {
      for (let j = 1; j < userPriority.length; j++) {
        if (i < userPriority.indexOf(item.priorityList[i])) {
          inversionsArr[index].inversions = inversionsArr[index].inversions + 1;
        }
      }
    }
  });

  inversionsArr.sort((a, b) => a.inversions - b.inversions);

  const candidate = candidates.find((item) => item.id === inversionsArr[0].id);

  return candidate;
}
