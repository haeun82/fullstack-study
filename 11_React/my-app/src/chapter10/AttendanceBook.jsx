const students = [
  {
    id: '1',
    name: '김재현',
    email: 'geoblo@naver.com'
  },
  {
    id: '2',
    name: '유재석',
    email: 'you@example.com'
  },
  {
    id: '3',
    name: '이이경',
    email: '22kyung@example.com'
  },
  {
    id: '4',
    name: '이미주',
    email: 'joo@example.com'
  }
];

// 출석부 컴포넌트
function AttendanceBook(params) {
	return (
		// Quiz: 배열을 반복 랜더링 해보기
		<ul>
			{students.map((student) => {
				return <li key={student.id}>{student.name} ({student.email})</li>
			})}

			{students.map(student => <li key={student.id}>{student.name} ({student.email})</li>)}
		</ul>
	);
}

export default AttendanceBook;