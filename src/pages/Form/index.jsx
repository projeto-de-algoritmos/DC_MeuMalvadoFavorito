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
      label: "Cotas raciais.",
    },
    {
      id: 3,
      label: "Criminalização da homofobia.",
    },
    {
      id: 4,
      label: "Reforma dos direitos trabalhistas.",
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
      label: "Cotas raciais.",
      priority: 5,
    },
    {
      id: 3,
      label: "Criminalização da homofobia.",
      priority: 5,
    },
    {
      id: 4,
      label: "Reforma dos direitos trabalhistas.",
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
      <h1>Formulário</h1>
      <p
        style={{
          width: "90%",
          maxWidth: 550,
          textAlign: "center",
        }}
      >
        Escolha o seu nível de prioridade em relação a cada assunto do
        formulário (sendo 0 quando for totalmente contra, 5 neutro e 10 quando
        for totalmente a favor) para que possamos encontrar o seu candidato
        ideal.
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
          backgroundColor: "#7cb342",
          width: "85%",
        }}
        onClick={() => handleSubmit()}
      >
        VER MEU CANDIDATO IDEAL
      </button>
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Seu Candidato</Modal.Title>
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
              style={{ backgroundColor: "white" }}
              onClick={() => setIsModalOpen(false)}
            >
              TENTAR NOVAMENTE
            </button>
            <button style={{ backgroundColor: "red" }}>
              VER TODOS CANDIDATOS
            </button>
            <a style={{ backgroundColor: "green" }} href="/">
              VOLTAR A PÁGINA INICIAL
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
