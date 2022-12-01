<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.PrintWriter"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>오직농구</title>
	<link href="./css/base.css?after" rel="stylesheet">
    <link href="./css/common.css?after" rel="stylesheet">
    <link href="./css/main.css?after" rel="stylesheet">
    <link href="./css/board.css?after" rel="stylesheet">
    <link href="./css/mypage.css?after" rel="stylesheet">
</head>
<body>
    <%
        String user_id = null;
        if(session.getAttribute("user_id") != null) {
            user_id = (String) session.getAttribute("user_id");
        }
    %>
	<div id="wrap">
        <!-- header -->
        <div id="header">
            <div id="gnb-top" class="bg-season"
                style="display: block; background: url('./images/logo.png') no-repeat center 0;">
                <div class="gnb-fix-area">
                    <h1 class="logo-link"><a href="./main.jsp">오직 농구 only basketball</a></h1>
                </div>
            </div>
            <!-- GNB -->
            <div id="gnb">
                <ul id="menu" class="gnb-list drop-menu">
                    <li><a href="./popular.jsp">오직인기</a></li>
                    <li><a href="./general.jsp">오직컨텐츠</a></li>
                    <li><a href="./matching.jsp">오직매칭</a></li>
                    <li><a href="./market.jsp">오직거래</a></li>
                    <li><a href="./gym.jsp">오직대관</a></li>
                </ul>
            </div>
            <!-- //GNB -->
        </div>
        <!-- //header -->
        <!-- container -->
        <div id="container">
            <!-- 본문 -->
            <div id="content-wrap">
                <script>
                    function chooseForm(radioname) {
                        var radios = document.getElementsByName(radioname);
                        for(var i = 0, length = radios.length; i < length; i++) {
                            document.getElementById(radios[i].value + '-form').style.display = 'none';
                            if(radios[i].checked) {
                                document.getElementById(radios[i].value + '-form').style.display = 'block';
                            }
                        }
                    }
                </script>
                <div class="account-body" id="step_2">
                    <div id="game-making-button">
                        <input type="radio" name="which-game" value="want-away" onclick="chooseForm(this.name)" checked="checked">어웨이팀을 원해요
                        &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                        <input type="radio" name="which-game" value="want-guest" onclick="chooseForm(this.name)">게스트를 원해요
                        &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                        <input type="radio" name="which-game" value="want-pickup" onclick="chooseForm(this.name)">픽업게임 만들기
                    </div>
                    <form id="want-away-form" method="post" action="GameWantAwayAction.jsp" >
                        <div class="section">
                            <dl class="make-game-info">
                                <dt class="essential">시합 장소</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="location" id="location" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">시합 날짜 및 시간</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="game_date" id="game_date" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 인원</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_member_count" id="home_member_count" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 나이대</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_age" id="home_age" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 유니폼 색상</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_uniform" id="home_uniform" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 어웨이 팀 인원</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="away_member_count" id="away_member_count" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 어웨이 팀 실력</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="away_level" id="away_level" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 어웨이 팀 나이대</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="away_age" id="away_age" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">샤워 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="shower" id="shower" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">주차 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="parking" id="parking" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">기타 주의 사항</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="warning" id="warning" placeholder="">
                                </span>
                                </dd>
                            </dl>
                        </div>
                        <!--버튼-->
                        <div class="btn-wrap">
                            <button type="submit" class="btn-orange-big">
                                <span>
                                    <em>등록</em>
                                </span>
                            </button>
                        </div>
                    </form>
                    <form id="want-guest-form" method="post" action="GameWantAwayAction.jsp">
                        <div class="section">
                            <dl class="make-game-info">
                                <dt class="essential">시합 장소</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="location" id="location" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">시합 날짜 및 시간</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="game_date" id="game_date" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 인원</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_member_count" id="home_member_count" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 나이대</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_age" id="home_age" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">홈 팀 유니폼 색상</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="home_uniform" id="home_uniform" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 게스트 인원</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="guest_member_count" id="guest_member_count" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 게스트 포지션</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="guest_position" id="guest_position" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">바라는 게스트 나이대</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="guest_age" id="guest_age" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">샤워 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="shower" id="shower" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">주차 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="parking" id="parking" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">기타 주의 사항</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="warning" id="warning" placeholder="">
                                </span>
                                </dd>
                            </dl>
                        </div>
                        <!--버튼-->
                        <div class="btn-wrap">
                            <button type="submit" class="btn-orange-big">
                                <span>
                                    <em>등록</em>
                                </span>
                            </button>
                        </div>
                    </form>
                    <form id="want-pickup-form" method="post" action="GameWantAwayAction.jsp">
                        <div class="section">
                            <dl class="make-game-info">
                                <dt class="essential">시합 장소</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="location" id="location" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">시합 날짜 및 시간</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="game_date" id="game_date" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">게스트 인원</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="guest_member_count" id="guest_member_count" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">게스트 나이대</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="guest_age" id="guest_age" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">유니폼 색상</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="uniform_color" id="uniform_color" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">샤워 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="shower" id="shower" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">주차 시설</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="parking" id="parking" placeholder="">
                                </span>
                                </dd>
                            </dl>
                            <dl class="make-game-info">
                                <dt class="essential">기타 주의 사항</dt>
                                <dd>
                                <span class="item-value modify-on">
                                <input type="text" name="warning" id="warning" placeholder="">
                                </span>
                                </dd>
                            </dl>
                        </div>
                        <!--버튼-->
                        <div class="btn-wrap">
                            <button type="submit" class="btn-orange-big">
                                <span>
                                    <em>등록</em>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
                <!-- 본문 끝-->           
            </div>
            <!-- aside 시작 -->
            <div id="aside-wrap">
                <div id="rightside">
                    <%
                        if(user_id == null) {
                    %>
                    <div class="login-wrap">
                        <form id="loginForm" method="post" action="loginAction.jsp" accept-charset="utf-8">
                            <div class="login-box">
                                <span>
                                    <input type="text" name="user_id" placeholder="아이디" >
                                    <input type="password" name="password" placeholder="비밀번호">
                                </span>
                                <button type="submit"><span>로그인</span></button>
                            </div>
                        </form>
                        <div class="user-util">
                            <a href="/join.jsp">회원가입</a>
                            <a href="/member/find/id">아이디·비밀번호 찾기</a>
                        </div>
                    </div>
                    <%
                        } else {
                    %>
                    <div class="logout-wrap">
                            <div class="logout-box">
                                <button type="button" onclick="location.href='./logoutAction.jsp'">내 정보</button><br>
                                <button type="button" onclick="location.href='./logoutAction.jsp'">내 팀 정보</button><br>
                                <button type="button" onclick="location.href='./logoutAction.jsp'">로그아웃</button>
                            </div>
                    </div>
                    <%
                        }
                    %>
                    <!-- //login -->
                </div>
            </div>
            <!-- aside 끝 -->
        </div>
        <!-- //container -->

        <!-- footer -->
        <div id="footer">
        </div>
        <!-- //footer -->
    </div>
</body>
</html>