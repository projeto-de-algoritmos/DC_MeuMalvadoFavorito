import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Slider from "react-rangeslider";

import { matchCandidate } from "../../services/matchCandidate";

import "./styles.css";

export function Form() {
  const [questions] = useState([
    {
      id: 1,
      label: "Liberação do porte de armas civil.",
    },
    {
      id: 2,
      label: "Proteção dos animais.",
    },
    {
      id: 3,
      label: "Reforma dos direitos trabalhistas.",
    },
    {
      id: 4,
      label: "Reforma da previdência",
    },
    {
      id: 5,
      label: "Voto impresso.",
    },
    {
      id: 6,
      label: "Preservação do meio ambiente.",
    },
    {
      id: 7,
      label: "Diminuição da maioridade penal.",
    },
    {
      id: 8,
      label: "Cotas raciais.",
    },
    {
      id: 9,
      label: "Privatização de Instituições Públicas.",
    },
    {
      id: 10,
      label: "Proteção dos povos originários.",
    },
  ]);
  const [answers, setAnswers] = useState([
    {
      id: 1,
      label: "Liberação do porte de armas civil.",
      priority: 5,
    },
    {
      id: 2,
      label: "Proteção dos animais.",
      priority: 5,
    },
    {
      id: 3,
      label: "Reforma dos direitos trabalhistas.",
      priority: 5,
    },
    {
      id: 4,
      label: "Reforma da previdência",
      priority: 5,
    },
    {
      id: 5,
      label: "Voto impresso.",
      priority: 5,
    },
    {
      id: 6,
      label: "Preservação do meio ambiente.",
      priority: 5,
    },
    {
      id: 7,
      label: "Diminuição da maioridade penal.",
      priority: 5,
    },
    {
      id: 8,
      label: "Cotas raciais.",
      priority: 5,
    },
    {
      id: 9,
      label: "Privatização de Instituições Públicas.",
      priority: 5,
    },
    {
      id: 10,
      label: "Proteção dos povos originários.",
      priority: 5,
    },
  ]);
  const [priorityList, setPriorityList] = useState([1, 2, 3, 4]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidate, setCandidate] = useState(null);

  function handleSubmit() {
    const match = matchCandidate(priorityList);

    if (match) {
      setCandidate(match);
    }

    setIsModalOpen(true);
  }

  useEffect(() => {
    const orderedAnswers = answers.sort((a, b) => b.priority - a.priority);
    const updatedAnswers = orderedAnswers.reduce((acc, item) => {
      return [...acc, item.id];
    }, []);

    setPriorityList(updatedAnswers);
  }, [answers]);

  // useEffect(() => console.log(priorityList), [priorityList]);

  return (
    <div className="form-page">
      <h1
        style={{
          fontSize: "3.5rem",
          color: "#f15a33",
          fontFamily: "LasVegas-Jackpot",
          textAlign: "center",
        }}
      >
        MEU MALVADO FAVORITO
      </h1>
      <p
        style={{
          width: "90%",
          maxWidth: 550,
          textAlign: "center",
        }}
      >
        O propósito da nossa aplicação é coletar algumas das suas opiniões
        políticas e selecionar o presidenciável mais adequado ao seu perfil.
        <br />
        Atribua um valor de 0 a 10 para cada premissa abaixo de acordo com suas
        prioridades, sendo 0 prioridade nula a e 10 máxima prioridade.
      </p>
      <div className="questions-list">
        {questions.map((question) => {
          const answer = answers.find((item) => item.id === question.id);

          return (
            <div key={question.id} className="question-item">
              <b>
                {question.id} - {question.label}
              </b>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: 0,
                    marginRight: "0.8rem",
                  }}
                >
                  0
                </p>
                <Slider
                  min={0}
                  max={10}
                  value={answer.priority}
                  onChange={(value) => {
                    const updatedAnswers = answers.reduce((acc, item) => {
                      if (item.id === question.id) {
                        return [
                          ...acc,
                          {
                            ...item,
                            priority: value,
                          },
                        ];
                      }

                      return [...acc, item];
                    }, []);

                    setAnswers(updatedAnswers);
                  }}
                />
                <p
                  style={{
                    fontSize: "1.125rem",
                    marginBottom: 0,
                    marginLeft: "0.8rem",
                  }}
                >
                  10
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="submit-btn"
        style={{
          backgroundColor: "#f15a33",
          width: "85%",
        }}
        onClick={() => handleSubmit()}
      >
        VER MEU CANDIDATO IDEAL
      </button>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Seu Malvado Favorito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {candidate ? (
            <div className="modal-body-container">
              <img src={candidate.img} alt={candidate.name} />
              <div>
                <h2>{candidate.name}</h2>
                <b>{candidate.party}</b>
                <p>Vice: {candidate.vice}</p>
                <a
                  href={candidate.governmentPlan}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  VER PLANO DE GOVERNO
                </a>
              </div>
            </div>
          ) : (
            <h1>haha</h1>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="modal-footer-container">
            <button
              style={{ backgroundColor: "#f15a33", color: "white" }}
              onClick={() => setIsModalOpen(false)}
            >
              TENTAR NOVAMENTE
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
