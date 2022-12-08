//홈게임 생성
exports.newGame = (req,res) => {
    return res.send("New Game ☕");
}

//홈게임 조회
exports.getGame = (req,res) => {
    return res.send("Get Game ☕");
}

//홈게임 검색
exports.getGames = (req,res) => {
    return res.send("Get Games ☕");
}

//홈게임 수정
exports.edit = (req,res) => {
    return res.send("Edit Game ☕");
}

//홈게임 삭제
exports.remove = (req,res) => {
    return res.send("Delete Game ☕");
}