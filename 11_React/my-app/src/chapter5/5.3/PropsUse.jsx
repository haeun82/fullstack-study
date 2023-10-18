import Footer from "./Footer";
import Header from "./Header";
import Layout from "./Layout";
import Profile from "./Profile";

function PropsUse() {
	return (
		<>
			<Profile 
				// 키-값 쌍의 형태로 자식 컴포넌트에 props를 전달할 수 있음
				// 정수, 변수, 다른 컴포넌트 등 값을 넣을 때는 {}로 감싼다.
				// 문자열은 {} 생략 가능
				viewCount={120}
				name="하은"
				introduction="안녕하세요 반갑습니당"
			/>

			<Layout 
				width={2500}
				height={1440}
				// 프롭스로 다른 컴포넌트를 넘기는것도 가능
				header={
					<Header title="하은이의 블로그" />
				}
				footer={
					<Footer />
				}
			/>
		</>	
	);
}

export default PropsUse;