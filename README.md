# Quiz

React JS Fundamentals Quiz (This project contains sound)

## Features

- [x] React, ReactHooks
- [x] Material-UI, chart.js, moment
- [x] @testing-library

### 필수 구현

- [x] 사용자는 '퀴즈 풀기' 버튼을 클릭하여 퀴즈 풀기를 시작할 수 있다.
- [x] 사용자는 문항에 대한 답안을 4개 보기 중에 선택할 수 있다.
- [x] 사용자는 답안을 선택하면 다음 문항을 볼 수 있다.
  - [x] 답안 선택 후 다음 문항 버튼을 볼 수 있다.
  - [x] 답안이 맞았는지 틀렸는지 바로 알 수 있다.
  - [x] 다음 문항 버튼을 클릭하여 다음 문항으로 이동할 수 있다.
- [x] 모든 문항을 다 풀면 사용자는 다음과 같은 결과 정보를 볼 수 있다.
  - [x] 퀴즈를 마칠 때까지 소요된 시간
  - [x] 정답 개수
  - [x] 오답 수

### 추가 구현

- [x] 정 오답에 대한 비율을 차트로 표기
- [x] 다시 풀기
- [x] 오답 노트

## Preview

<img src="https://user-images.githubusercontent.com/43328761/129401209-072caf9e-7dfe-40b9-b87f-add085aecef0.png" width="640" height="480">
1.퀴즈 풀기 버튼을 눌러서 시작합니다. (이 프로젝트는 사운드를 포함하고 있습니다.)
<img src="https://user-images.githubusercontent.com/43328761/129401260-04b685fe-d5c5-4e33-a824-850f3d8a44be.png" width="640" height="480">
2. API를 통해 무작위로 퀴즈를 10개 가지고 오고 보기는 4개가 있습니다.
<img src="https://user-images.githubusercontent.com/43328761/129401305-bbc27a80-5742-4152-a25e-80d2a9ab7b84.png" width="640" height="480">
3. 답안을 선택하면 다음 문항으로 넘어가는 버튼이 나타나며 정답 오답 여부를 바로 알 수 있습니다.
<img src="https://user-images.githubusercontent.com/43328761/129401356-f5e04bd9-4aa3-434f-bec2-a8530c43cdb2.png" width="640" height="480">
4. 만약, 오답을 선택한 경우 한번 더 풀어볼 수 있도록 기회를 줍니다.
<img src="https://user-images.githubusercontent.com/43328761/129401398-35a469ed-dfbc-4a5d-927c-c1efe361de65.png" width="640" height="480">
5. 그럼에도 불구하고 답이 틀리면 다음 문항으로 넘어가야 합니다.
<img src="https://user-images.githubusercontent.com/43328761/129401448-6b26e12d-5a62-4a55-ac0d-7ef5469e9e5d.png" width="640" height="480">
6. 퀴즈를 모두 풀면 소요 시간, 정답 개수, 오답 개수 정보가 나타나고 정 오답 비율의 차트와 오답노트 그리고 다시풀기 버튼이 나타납니다.<br/>
(한번에 정답을 맞추면 100%, 한번 더 기회를 얻어 맞추면 50% 그리고 두번의 기회에서 모두 맞추지 못하면 0%를 부여합니다.)<br/>
(오답노트를 선택한 경우 : 아래의 7번으로 넘어갑니다.)<br/>
(다시풀기를 선택한 경우 : 퀴즈의 1번 문제로 돌아가서 모든 문제를 다시 풀 수 있도록 합니다.)
<img src="https://user-images.githubusercontent.com/43328761/129401490-870ede41-fdc3-4e49-bfc8-94eeab0d26f9.png" width="640" height="480">
7. 사용자가 골랐던 오답과 정답을 구분하여 보여주고, 간단한 메모를 남길 수 있도록 합니다.
<img src="https://user-images.githubusercontent.com/43328761/129401526-1648e758-156f-4231-9c5b-1ee56486b0eb.png" width="640" height="480">
8. 오답노트 마지막 문항에서 저장 후 종료 버튼을 누르게 되면 퀴즈가 끝납니다.

## Try it out

`yarn`

`yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`바로가기` [https://isz01122.github.io/quiz](https://isz01122.github.io/quiz)
