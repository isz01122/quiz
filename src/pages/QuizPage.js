import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import decode from "html-entities-decode";
import moment from "moment";

import Quiz from "../components/Quiz";
import {
  correctAudio,
  incorrectAudio,
  startAudio,
  nextAudio,
  closeAudio
} from "../audios";
import API from "../services/API";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [index, setIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [isWrongAnswerMode, setIsWrongAnswerMode] = useState(false);
  const [inCorrectedQuizIds, setInCorrectedQuizIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [time, setTime] = useState({
    startedAt: null,
    endedAt: null,
    duration: null
  });

  useEffect(() => {
    API.getQuizzes()
      .then(response => {
        const quizzes = brushUpQuizzes(response);
        setQuizzes(quizzes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const brushUpQuizzes = response => {
    const quizzes = response.data.results.map((quiz, index) => {
      const _quiz = {
        ...quiz,
        id: index,
        question: decode(quiz.question),
        correct_answer: decode(quiz.correct_answer),
        incorrect_answers: quiz.incorrect_answers.map(option => decode(option)),
        options: [quiz.correct_answer, ...quiz.incorrect_answers]
          .sort(() => Math.random() - 0.5)
          .map(option => decode(option)),
        isCorrect: false,
        isOnceMore: false,
        note: null,
        selectedOption: null
      };
      return _quiz;
    });
    return quizzes;
  };

  const handleQuizStartPress = () => {
    new Audio(startAudio).play();
    setIsStart(true);
    setTime({
      ...time,
      startedAt: moment()
    });
  };

  const handleFinishPress = () => {
    const _endedAt = moment();
    if (isWrongAnswerMode) {
      new Audio(closeAudio).play();
    }
    setIndex(0);
    setSelectedOption("");
    setIsFinish(true);
    setTime({
      ...time,
      endedAt: _endedAt,
      duration: _endedAt.diff(time.startedAt)
    });
  };

  const handleOnceMorePress = () => {
    new Audio(nextAudio).play();
    const _quizzes = quizzes.map((quiz, idx) => {
      if (idx === index) {
        quiz.isOnceMore = true;
      }
      return quiz;
    });
    setSelectedOption("");
    setQuizzes(_quizzes);
  };

  const handleNextPress = () => {
    new Audio(nextAudio).play();
    setIndex(index + 1);
    setSelectedOption("");
  };

  const handleWrongAnswerNotePress = () => {
    new Audio(nextAudio).play();
    const _incorrectedIds = quizzes
      .filter(quiz => quiz.isCorrect === false)
      .map(quiz => quiz.id);
    if (_incorrectedIds.length > 0) {
      setInCorrectedQuizIds(_incorrectedIds);
      setIsWrongAnswerMode(true);
      setIsFinish(false);
    } else {
      alert("오답이 없습니다.");
    }
  };

  const handleWrongAnswerNoteTextChange = (e, _quiz) => {
    const _quizzes = quizzes.map(quiz => {
      if (quiz.id === _quiz.id) {
        quiz.note = e.target.value;
      }
      return quiz;
    });
    setQuizzes(_quizzes);
  };

  const handleRestartPress = () => {
    new Audio(nextAudio).play();
    let _quizzes = quizzes.map(quiz => {
      quiz.isCorrect = false;
      quiz.isOnceMore = false;
      return quiz;
    });
    setIndex(0);
    setSelectedOption("");
    setIsFinish(false);
    setTime({
      ...time,
      startedAt: moment(),
      endedAt: null,
      duration: null
    });
    setQuizzes(_quizzes);
  };

  const handleOptionChange = e => {
    const correctAnswer = quizzes[index].correct_answer;
    let seletedAnswer = e.target.value;
    let _quizzes = [];
    if (seletedAnswer === correctAnswer) {
      new Audio(correctAudio).play();
      _quizzes = quizzes.map((quiz, idx) => {
        if (idx === index) {
          quiz.isCorrect = true;
          quiz.selectedOption = seletedAnswer;
        }
        return quiz;
      });
    } else {
      new Audio(incorrectAudio).play();
      _quizzes = quizzes.map((quiz, idx) => {
        if (idx === index) {
          quiz.isCorrect = false;
          quiz.selectedOption = seletedAnswer;
        }
        return quiz;
      });
    }
    setQuizzes(_quizzes);
    setSelectedOption(seletedAnswer);
  };

  const buildQuizList = ids => {
    const _quizzes = quizzes.filter(quiz => ids.includes(quiz.id));
    return _quizzes;
  };

  return (
    <div className="main-container" data-testid={"quiz-page"}>
      {isStart && (
        <Quiz
          quizzes={
            isWrongAnswerMode ? buildQuizList(inCorrectedQuizIds) : quizzes
          }
          onFinishPress={handleFinishPress}
          onNextPress={handleNextPress}
          index={index}
          onOptionChange={e => handleOptionChange(e)}
          selectedOption={selectedOption}
          isFinish={isFinish}
          time={time}
          onRestartPress={handleRestartPress}
          onOnceMorePress={handleOnceMorePress}
          isWrongAnswerMode={isWrongAnswerMode}
          onWrongAnswerNotePress={handleWrongAnswerNotePress}
          onWrongAnswerNoteTextChange={(e, quiz) =>
            handleWrongAnswerNoteTextChange(e, quiz)
          }
        />
      )}
      {!isStart && (
        <Button
          className="quiz-start"
          variant="contained"
          onClick={handleQuizStartPress}
          disabled={quizzes.length === 0}
          data-testid={"quiz-start-button"}
        >
          {quizzes.length === 0 ? (
            <CircularProgress className="loading-spinner" size={50} />
          ) : (
            "퀴즈 풀기"
          )}
        </Button>
      )}
    </div>
  );
};

export default QuizPage;
