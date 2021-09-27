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
  {
    id: 3,
    name: "Fernando Haddad",
    img: "https://www.epsjv.fiocruz.br/sites/default/files/images/fernando%20haddad.jpg",
    party: "PT (Partido dos Trabalhadores)",
    vice: "Manuela D’Ávila (PCdoB)",
    governmentPlan:
      "https://static.poder360.com.br/2018/08/programa_de_governo_6_final-1.pdf",
    priorityList: [2, 1, 4, 3],
  },
  {
    id: 4,
    name: "Marina Silva",
    img: "https://pbs.twimg.com/profile_images/1380251902559019011/rRqCfhnc_400x400.jpg",
    party: "REDE (Rede Sustentabilidade)",
    vice: "Eduardo Jorge (PV)",
    governmentPlan:
      "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2018/BR/BR/2022802018/280000622171//proposta_1534349620464.pdf",
    priorityList: [2, 4, 3, 1],
  },
  {
    id: 5,
    name: "Guilherme Boulos",
    img: "https://img.r7.com/images/guilherme-boulos-21042021140644300?dimensions=677x677&resize=677x677&crop=482x482+0+0",
    party: "PSOL (Partido Socialismo e Liberdade)",
    vice: "Sônia Guajajara (PSOL)",
    governmentPlan:
      "https://divulgacandcontas.tse.jus.br/candidaturas/oficial/2018/BR/BR/2022802018/280000601016//proposta_1533565462424.pdf",
    priorityList: [2, 1, 3, 4],
  },
];

export function setup(userPriority, candidatePriority) {
  var array = [];
  var tmp = Array(userPriority.length);
  console.log(userPriority);

  for (var index = 0; index < userPriority.length; index++) {
    tmp[userPriority[index] - 1] = index + 1;
  }
  userPriority = tmp;

  for (var i in candidatePriority) {
    array.push(userPriority[candidatePriority[i] - 1]);
  }
  // console.log(userPriority);
  // console.log(array);
  return array;
}

export function mergeAndCount(a, b) {
  var array = [];
  var i = a.length;
  var j = b.length;
  var r = 0;

  while (i !== 0 || j !== 0) {
    if (j !== 0 && (i === 0 || b[b.length - j] < a[a.length - i])) {
      array.push(b[b.length - j]);
      j -= 1;
      r += i;
    } else {
      array.push(a[a.length - i]);
      i -= 1;
    }
  }
  return [r, array];
}

export function sortAndCount(userPriority) {
  var rb, ra, r;
  if (userPriority.length === 1) {
    return [0, userPriority];
  }

  var a = userPriority.slice(0, Math.floor(userPriority.length / 2));
  var b = userPriority.slice(
    Math.floor(userPriority.length / 2),
    userPriority.length
  );

  [ra, a] = sortAndCount(a);
  [rb, b] = sortAndCount(b);
  [r, userPriority] = mergeAndCount(a, b);

  return [r + ra + rb, userPriority];
}

export function matchCandidate(userPriority) {
  var match;
  var min = Infinity;

  candidates.forEach((cadidate, index) => {
    var [inversions] = sortAndCount(setup(userPriority, cadidate.priorityList));
    console.log(inversions);

    if (inversions < min) {
      min = inversions;
      match = cadidate;
    }
  });

  return match;
}
