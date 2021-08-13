import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Bar } from "react-chartjs-2";
import decode from "html-entities-decode";
import moment from "moment";

import { getData } from "../services/API";
import correctAudio from "../audios/correct.mp3";
import incorrectAudio from "../audios/incorrect.mp3";
import startAudio from "../audios/start.mp3";
import nextAudio from "../audios/next.mp3";

const Quiz = ({
  quizzes,
  onFinishPress,
  onNextPress,
  index,
  onOptionChange,
  selectedOption,
  finish,
  time,
  onRestartPress,
  onOnceMorePress,
  onWrongAnswerNotePress
}) => {
  const classes = useStyles();
  let quiz = quizzes[index];
  let isLast = index === quizzes.length - 1 ? true : false;
  let dataColor = [];
  let _data = quizzes.map((q, i) => {
    if (q.isCorrect && !q.isOnceMore) {
      dataColor.push("#66DE93");
      return 100;
    } else if (q.isCorrect && q.isOnceMore) {
      dataColor.push("#FF616D");
      return 50;
    } else {
      dataColor.push("");
      return 0;
    }
  });
  const options = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontSize: 20,
            fontStyle: "bold",
            fontColor: "#000"
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 100,
            beginAtZero: true,
            stepSize: 50,
            fontSize: 20,
            fontStyle: "bold",
            fontColor: "#000",
            callback: function (value) {
              return `${value}%`;
            }
          }
        }
      ]
    },
    maintainAspectRatio: true
  };
  const data = {
    labels: quizzes.map((q, i) => `${i + 1}번`),
    datasets: [
      {
        maxBarThickness: 30,
        label: "정답률",
        backgroundColor: dataColor,
        hoverBackgroundColor: "#dadada",
        data: _data
      }
    ]
  };

  return !finish ? (
    <div className="quiz-container">
      <div className="quiz-form">
        <div>
          <div className="text-title">{`Q${index + 1}. ${quiz.question}`}</div>
          <form>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="quiz"
                name="quiz"
                value={selectedOption}
                onChange={onOptionChange}
              >
                {quiz.options.map((option, index) => {
                  return (
                    <FormControlLabel
                      className="h-50 font-size-md option"
                      key={index}
                      value={option}
                      control={<Radio style={{ color: "black" }} />}
                      label={option}
                      style={
                        selectedOption
                          ? selectedOption === option
                            ? option === quiz.correct_answer
                              ? {
                                  backgroundColor: "#66DE93",
                                  pointerEvents: "none"
                                }
                              : {
                                  backgroundColor: "#FF616D",
                                  pointerEvents: "none"
                                }
                            : { pointerEvents: "none" }
                          : null
                      }
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </form>
        </div>
        {selectedOption && (
          <div className="f-d j-sb">
            <FormHelperText className="text-helper">
              {quiz.isCorrect ? "정답입니다!" : "오답입니다!"}
            </FormHelperText>
            <div className="f-d">
              {!quiz.isCorrect && !quiz.isOnceMore && (
                <Button
                  className="normal-btn mr-20"
                  variant="contained"
                  onClick={onOnceMorePress}
                >
                  {"한번 더!"}
                </Button>
              )}
              <Button
                className="normal-btn"
                variant="contained"
                onClick={isLast ? onFinishPress : onNextPress}
              >
                {isLast ? "종료" : "다음"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="quiz-container">
      <div className="result-form">
        <div className="f-d j-sb">
          <div className="wd-30">
            <div className="text-title mb-30">{"<결과>"}</div>
            <div className="text-title mb-10">{`소요 시간 : ${moment
              .utc(time.duration)
              .format("HH:mm:ss")}`}</div>
            <div className="text-title mb-10">{`정답 개수 : ${
              quizzes.filter(quiz => quiz.isCorrect).length
            }개`}</div>
            <div className="text-title">{`오답 개수 : ${
              quizzes.filter(quiz => !quiz.isCorrect).length
            }개`}</div>
          </div>
          <div className="wd-70">
            <div className="text-title mb-30">{"<정 오답 비율>"}</div>
            <Bar data={data} width={300} height={100} options={options} />
          </div>
        </div>
        <div className="f-d j-fe a-c">
          <Button
            className="normal-btn mr-20"
            variant="contained"
            onClick={onWrongAnswerNotePress}
          >
            {"오답노트"}
          </Button>
          <Button
            className="normal-btn"
            variant="contained"
            onClick={onRestartPress}
          >
            {"다시풀기"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const QuizStart = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
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
    let quizzes = response.data.results.map(quiz => {
      let _quiz = {
        ...quiz,
        options: [quiz.correct_answer, ...quiz.incorrect_answers]
          .sort(() => Math.random() - 0.5)
          .map(option => decode(option)),
        isCorrect: false,
        isOnceMore: false,
        question: decode(quiz.question),
        note: null
      };
      return _quiz;
    });
    return quizzes;
  };

  const handleQuizStartPress = () => {
    new Audio(startAudio).play();
    setStart(true);
    setTime({
      ...time,
      startedAt: moment()
    });
  };

  const handleFinishPress = () => {
    let _endedAt = moment();
    setIndex(0);
    setSelectedOption("");
    setFinish(true);
    setTime({
      ...time,
      endedAt: _endedAt,
      duration: _endedAt.diff(time.startedAt)
    });
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
  };

  const handleWrongAnswerNotePress = () => {
    new Audio(nextAudio).play();
  };

  const handleRestartPress = () => {
    new Audio(nextAudio).play();
    setIndex(0);
    setSelectedOption("");
    setFinish(false);
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
    if (seletedAnswer === correctAnswer) {
      new Audio(correctAudio).play();
      let _quizzes = quizzes.map((quiz, idx) => {
        if (idx === index) {
          quiz.isCorrect = true;
        }
        return quiz;
      });
      setQuizzes(_quizzes);
    } else {
      new Audio(incorrectAudio).play();
    }
    setSelectedOption(seletedAnswer);
  };

  return start ? (
    <div className="main-container">
      <Quiz
        quizzes={quizzes}
        onFinishPress={handleFinishPress}
        onNextPress={handleNextPress}
        index={index}
        onOptionChange={e => handleOptionChange(e)}
        selectedOption={selectedOption}
        finish={finish}
        time={time}
        onRestartPress={handleRestartPress}
        onOnceMorePress={handleOnceMorePress}
        onWrongAnswerNotePress={handleWrongAnswerNotePress}
      />
    </div>
  ) : (
    <div className="main-container">
      <Button
        className="quiz-start"
        variant="contained"
        onClick={handleQuizStartPress}
        disabled={quizzes.length === 0}
      >
        {quizzes.length === 0 ? <CircularProgress /> : "퀴즈 풀기"}
      </Button>
    </div>
  );
};

export default QuizStart;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
    marginLeft: 10,
    width: "100%"
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0)
  }
}));
