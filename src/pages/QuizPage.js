import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import decode from "html-entities-decode";
import moment from "moment";

import Quiz from "../components/Quiz";
import { getData } from "../services/API";
import correctAudio from "../audios/correct.mp3";
import incorrectAudio from "../audios/incorrect.mp3";
import startAudio from "../audios/start.mp3";
import nextAudio from "../audios/next.mp3";
import closeAudio from "../audios/close.mp3";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [index, setIndex] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [closeQuiz, setCloseQuiz] = useState(false);
  const [isWrongAnswerMode, setIsWrongAnswerMode] = useState(false);
  const [inCorrectedQuizIds, setInCorrectedQuizIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [tempNote, setTempNote] = useState("");
  const [time, setTime] = useState({
    startedAt: null,
    endedAt: null,
    duration: null
  });

  useEffect(() => {
    getData()
      .then(response => {
        let quizzes = brushUpQuizzes(response);
        setQuizzes(quizzes);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const brushUpQuizzes = response => {
    let quizzes = response.data.results.map((quiz, index) => {
      let _quiz = {
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
    let _endedAt = moment();
    setIndex(0);
    setSelectedOption("");
    setIsFinish(true);
    setTime({
      ...time,
      endedAt: _endedAt,
      duration: _endedAt.diff(time.startedAt)
    });
    if (isWrongAnswerMode) {
      new Audio(closeAudio).play();
      setCloseQuiz(true);
      setTempNote("");
    }
  };

  const handleOnceMorePress = () => {
    new Audio(nextAudio).play();
    setSelectedOption("");
    let _quizzes = quizzes.map((quiz, idx) => {
      if (idx === index) {
        quiz.isOnceMore = true;
      }
      return quiz;
    });
    setQuizzes(_quizzes);
  };

  const handleNextPress = () => {
    new Audio(nextAudio).play();
    setIndex(index + 1);
    setSelectedOption("");
    if (isWrongAnswerMode) {
      setTempNote("");
    }
  };

  const handleWrongAnswerNotePress = () => {
    new Audio(nextAudio).play();
    let _index = quizzes.filter(q => q.isCorrect === false).map(q => q.id);
    if (_index.length > 0) {
      setInCorrectedQuizIds(_index);
      setIsWrongAnswerMode(true);
    } else {
      alert("오답이 없습니다.");
    }
  };

  const handleWrongAnswerNoteTextChange = (e, quiz) => {
    let _quizzes = quizzes.map(q => {
      if (q.id === quiz.id) {
        q.note = e.target.value;
      }
      return q;
    });
    setTempNote(e.target.value);
    setQuizzes(_quizzes);
  };

  const handleRestartPress = () => {
    new Audio(nextAudio).play();
    setIndex(0);
    setSelectedOption("");
    setIsFinish(false);
    setTime({
      ...time,
      startedAt: moment(),
      endedAt: null,
      duration: null
    });

    let _quizzes = quizzes.map(quiz => {
      quiz.isCorrect = false;
      quiz.isOnceMore = false;
      return quiz;
    });
    setQuizzes(_quizzes);
  };

  const handleOptionChange = e => {
    let correctAnswer = quizzes[index].correct_answer;
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

  const buildUpQuizzes = ids => {
    let _quizzes = quizzes.filter(q => ids.includes(q.id));
    return _quizzes;
  };

  return (
    <div className="main-container" data-testid={"quiz-1"}>
      {isStart && (
        <Quiz
          isWrongAnswerMode={isWrongAnswerMode}
          quizzes={
            isWrongAnswerMode ? buildUpQuizzes(inCorrectedQuizIds) : quizzes
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
          onWrongAnswerNotePress={handleWrongAnswerNotePress}
          onWrongAnswerNoteTextChange={(e, quiz) =>
            handleWrongAnswerNoteTextChange(e, quiz)
          }
          tempNote={tempNote}
          closeQuiz={closeQuiz}
        />
      )}
      {!isStart && (
        <Button
          className="quiz-start"
          variant="contained"
          onClick={handleQuizStartPress}
          disabled={quizzes.length === 0}
        >
          {quizzes.length === 0 ? <CircularProgress /> : "퀴즈 풀기"}
        </Button>
      )}
    </div>
  );
};

export default QuizPage;
