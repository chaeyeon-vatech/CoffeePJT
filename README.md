

# 📁 CoffeePJT




## I. Contributor
#### • 박채연: FrontEnd
#### • 김영호: BackEnd

<br>

## II. 프로젝트 설명
### <strong> 커피 단체 주문 Board <br> </strong>
업무 스택과 익숙해지기 위한 Apollo + GraphQL + MongoDB + React 미니 프로젝트

<br><br>

## III. 주요 기술스택

![Generic badge](https://img.shields.io/badge/platform-Web-brightgreen.svg) ![Generic badge](https://img.shields.io/badge/library-React-blue.svg) ![Generic badge](https://img.shields.io/badge/library-Apollo-green.svg)
![Generic badge](https://img.shields.io/badge/database-MongoDB-yellow.svg) ![Generic badge](https://img.shields.io/badge/language-JavaScript,GraphQL,MaterialUI-important.svg)
<br><br>

## IV. Page 개요

### 1. 주문자 페이지 <br>
- 미주문자/주문자/취소자 수 게시<br>
- Task CRUD 사용자 게시판 <br>
- 주문자 현황 기록 <br>
- 메뉴 선택/주문하기/주문포기 기능 구현<br>

### 2. 결제자 페이지
- 메뉴 별 누적 잔 수/금액/미주문자 확인 기능 구현 <br>
- 미주문자가 없을 시 초기화 버튼 사용해 재사용 가능하게 구현<br>

### 3. 사용자 페이지/Authorization<br>
- Login/Logout/Sign up 구현<br>
- 사용자의 주문 내역/주문 취소 구현<br>
- 사용자 이름/이메일/소속 확인 가능하게 구현<br>
- Private/Public Route 나누어 구현 <br>


### 4. 최종 실행 화면(▶ 클릭)

<details>
<summary>1. 주문자 페이지</summary>
<div markdown="1">
  <img width="1440" alt="결제자 페이지" src="https://user-images.githubusercontent.com/75648425/103402985-efc5f080-4b91-11eb-8c60-f9cea2195b71.jpg"> 

![주문자 페이지](https://user-images.githubusercontent.com/75648425/103402985-efc5f080-4b91-11eb-8c60-f9cea2195b71.jpg)
</div>
</details>

<details>
<summary>2. 결제자 페이지</summary>
<div markdown="1">
  
<img width="1440" alt="결제자 페이지" src="https://user-images.githubusercontent.com/75648425/103402473-8abdcb00-4b90-11eb-9287-149e125422e1.png"> 
</div>
</details>

<details>
<summary>3. 로그인/회원가입 페이지</summary>
<div markdown="1">
<img width="1440" alt="결제자 페이지" src="https://user-images.githubusercontent.com/75648425/103402983-ee94c380-4b91-11eb-9aaa-e83e204e7363.JPG"> 
</div>
</details>
<details>
<summary>4. 유저 페이지</summary>
<div markdown="1">
  
<img width="1440" alt="유저페이지" src="https://user-images.githubusercontent.com/75648425/103402469-8a253480-4b90-11eb-9670-e24313bf5dfc.png"> 
 
</div>
</details>

<br>
</div>

<br>

## V. 프로젝트 구조

### Project Structure

    .
    ├── client                  # Client folder
            ├── components              # Button/Cards/Header/Icons/Loading/Sidebar/Table
            ├── resources               # Responsive/Link/Theme/Utilities(Material-UI)
            ├── routes                  # Auth/Orderboard/Paymentboard/Userboard 페이지 구성
            └── graphql                 # Graphql, hooks, mutation문 작성
    ├── server                  # Server folder
            ├── models                  # Model folder
            ├── schema                  # Schema folder
            └── server                  # server.js file
<br>


