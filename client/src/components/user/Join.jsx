import React, { useState } from 'react'

import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



const Join = () => {

    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassC, setYouPassC] = useState("");
    const [flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const JoinFunc = async (e) => {
        setFlag(true);
        e.preventDefault()

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.")
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 다릅니다.")
        }

        // 개인정보 -> firebase 전달(firebase에 위에는 이메일과 패스워드 밖에 못 전달 시켜서 아래에 이름을 추가로 전달해줌)
        let createdUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass);

        await createdUser.user.updateProfile({
            displayName: youName,
        })

        console.log(createdUser.user)

        // 개인정 -> 몽고디비(mongodb) 전달
        let body = {
            email: createdUser.user.multiFactor.user.email,
            displayName: createdUser.user.multiFactor.user.displayName,
            uid: createdUser.user.multiFactor.user.uid,
        }
        axios.post("/api/user/join", body)
            .then((respone) => {
                setFlag(false);
                if (respone.data.success) {
                    alert("회원가입을 성공했습니다.");
                    navigate("/login");
                } else {
                    return alert("회원가입이 실패하였습니다.")
                }
            })
    }

    return (
        <div>
            <div className='join__wrap'>
                <div className='join__header'>
                    <h2> 회원가입 </h2>
                </div>
                <form>
                    <fieldset>
                        <legend className="blind">로그인 영역</legend>
                        <div>
                            <label htmlFor="youName" className="required blind">이름</label>
                            <input
                                type="text"
                                id="youName"
                                name="youName"
                                placeholder="이름"
                                className="input__style"
                                required
                                autoComplete="off"
                                value={youName}
                                onChange={(e) => setYouName(e.currentTarget.value)} />
                        </div>
                        <div>
                            <label htmlFor="youEmail" className="required blind">이메일</label>
                            <input
                                type="email"
                                id="youEmail"
                                name="youEmail"
                                placeholder="이메일"
                                className="input__style"
                                autoComplete="off"
                                required
                                value={youEmail}
                                onChange={(e) => setYouEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="youPass" className="required blind">비밀번호</label>
                            <input
                                type="text"
                                id="youPass"
                                name="youPass"
                                placeholder="비밀번호"
                                autoComplete="off"
                                className="input__style"
                                required
                                minLength={8}
                                value={youPass}
                                onChange={(e) => setYouPass(e.currentTarget.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="youPassC" className="required blind">비밀번호 확인</label>
                            <input
                                type="text"
                                id="youPassC"
                                name="youPassC"
                                placeholder="다시 한번 비밀번호를 적어주세요!"
                                className="input__style"
                                autoComplete="off"
                                required
                                minLength={8}
                                value={youPassC}
                                onChange={(e) => setYouPassC(e.currentTarget.value)}
                            />
                        </div>
                        <button disabled={flag} type="submit" className="join__btn mt30" onClick={(e) => JoinFunc(e)}>회원가입</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default Join
