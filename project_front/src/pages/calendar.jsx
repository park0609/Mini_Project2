import { useState, useEffect, useMemo } from 'react'
// import './App.css'
import "react-calendar"
import axios from 'axios'
import './calendar.css'

function Calendar() {
  const ToDay = new Date()
  const ToDayYear = new Date().getFullYear()
  const ToDayMonth = new Date().getMonth()
  const [month, setMonth] = useState(ToDayMonth)
  const [year, setYear] = useState(ToDayYear)
  const dayStartMonth = new Date(year, month, 1).getDay()
  const dayEndMonth = new Date(year, (month + 1), 0).getDate()

  // 월 증가 버튼 핸들러
  const changeMonthPrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  // 월 감소 버튼 핸들러
  const changeMonthNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }
  // 달력 초기 설정 만들기
  const SetCalendar = () => {
    const cells = [];
    for (let i = 0; i < dayStartMonth; i++) {
      cells.push(null);
    }
    for (let i = 1; i <= dayEndMonth; i++) {
      cells.push(i)
    }
    while (cells.length < 42) {
      cells.push(null);
    }
    return cells
  }
  const calendar = SetCalendar()
  const weeks = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(calendar.slice(i * 7, i * 7 + 7));
  }

  // 일정표
  const [schedule, setSchedule] = useState("접수")
  const [data, setData] = useState([])
  const stripTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Oracle에 있는 값 받아오기
  useEffect(() => {
    axios.get("/api/data")
      .then(response => {
        setData(response.data);
      })
  }, [])


  return (
    <>

      <div className='cal-layout'>
        <div className="calendar-header">
          <button className="arrow-btn" onClick={changeMonthPrev}>⬅️</button>
          <div className="calendar-title">{`${year}년 ${month + 1}월`}</div>
          <button className="arrow-btn" onClick={changeMonthNext}>➡️</button>
        </div>
        <table className='cal'>
          <thead>
            <tr >
              <th>일</th>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, id) => (
              <tr key={id}>
                {week.map((day, i) => {
                  const isToday =
                    day === ToDay.getDate() &&
                    month === ToDay.getMonth() &&
                    year === ToDay.getFullYear()

                  // 날짜 객체로 변환 (빈 셀은 null임)
                  const thisDate = day !== null ? new Date(year, month, day) : null

                  // 해당 날짜에 포함되는 일정만 필터
                  const matchedSchedules = thisDate
                    ? data.filter(v => {
                      const start = stripTime(new Date(v.START_DATE));
                      const end = stripTime(new Date(v.END_DATE));
                      const ThisDate = stripTime(thisDate)
                      return (
                        start.getTime() <= ThisDate.getTime() &&
                        ThisDate.getTime() <= end.getTime() &&
                        (schedule === '접수' ? v.QUALI_TYPE.includes("접수") || v.QUALI_TYPE.includes("제출") : schedule === '시험'
                          ? v.QUALI_TYPE.includes("시험") : v.QUALI_TYPE.includes("결과") || v.QUALI_TYPE.includes("발표")))
                    }) : []
                  return (
                    <td key={i} className={isToday ? 'today' : ''}>
                      {day || ''}
                      <div className="bars">
                        {matchedSchedules.map((_, idx) => (
                          <div key={idx} className="bar" />
                        ))}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className='sche'>
          <div className='sche-title'>
            <a className={schedule === "접수" ? 'active' : ""}
              onClick={() => setSchedule("접수")}
            >접수</a> | {" "}
            <a className={schedule === "시험" ? 'active' : ""}
              onClick={() => setSchedule("시험")}
            >시험</a> | {" "}
            <a className={schedule === "결과" ? 'active' : ""}
              onClick={() => setSchedule("결과")}
            >결과</a>
          </div>
          <div>
            {schedule === '접수' && <div>
              {data.filter((v => {
                const StDate = stripTime(new Date(v.START_DATE))
                const EnDate = stripTime(new Date(v.END_DATE))
                return (
                  (((StDate.getFullYear() === year && StDate.getMonth() === month) || (EnDate.getFullYear() === year && EnDate.getMonth() === month)) && (v.QUALI_TYPE.includes("접수") || v.QUALI_TYPE.includes("제출")))
                )
              }))
                .map((v, i) => (
                  <div key={i} className="schedule-block">
                    {v.ROUND}회 {v.QUALI_NAME} {v.QUALI_TYPE}<br />
                    {new Date(v.START_DATE).toLocaleDateString('ko-KR')} ~ {new Date(v.END_DATE).toLocaleDateString('ko-KR')}
                  </div>)
                )}
            </div>}
            {schedule === '시험' && <div>
              {data.filter((v => {
                const StDate = stripTime(new Date(v.START_DATE))
                const EnDate = stripTime(new Date(v.END_DATE))
                return (
                  (((StDate.getFullYear() === year && StDate.getMonth() === month) || (EnDate.getFullYear() === year && EnDate.getMonth() === month)) && v.QUALI_TYPE.includes("시험"))
                )
              }))
                .map((v, i) => (
                  <div key={i} className="schedule-block">
                    {v.ROUND}회 {v.QUALI_NAME} {v.QUALI_TYPE}<br />
                    {new Date(v.START_DATE).toLocaleDateString('ko-KR')} ~ {new Date(v.END_DATE).toLocaleDateString('ko-KR')}
                  </div>)
                )}
            </div>}
            {schedule === '결과' && <div>
              {data.filter((v => {
                const StDate = stripTime(new Date(v.START_DATE))
                const EnDate = stripTime(new Date(v.END_DATE))
                return (
                  (((StDate.getFullYear() === year && StDate.getMonth() === month) || (EnDate.getFullYear() === year && EnDate.getMonth() === month)) && (v.QUALI_TYPE.includes("결과") || v.QUALI_TYPE.includes("발표")))
                )
              }))
                .map((v, i) => (
                  <div key={i} className="schedule-block">
                    {v.ROUND}회 {v.QUALI_NAME} {v.QUALI_TYPE}<br />
                    {new Date(v.START_DATE).toLocaleDateString('ko-KR')} ~ {new Date(v.END_DATE).toLocaleDateString('ko-KR')}
                  </div>)
                )}
            </div>}

          </div>
        </div>
      </div>

    </>
  )
}

export default Calendar
