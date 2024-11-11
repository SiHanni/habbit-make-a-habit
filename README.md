## Habbit - "run to your habit like a rabbit"

### nestJS 스터디용 습관 관리 앱

#### 컨셉
1. 메인 습관을 생성한다.
<img width="234" alt="스크린샷 2024-11-11 10 44 36" src="https://github.com/user-attachments/assets/23a90a62-3742-4ae7-84d6-3167b90480b9">

2. 메인 화면에서 습관을 시작한다.
<img width="234" alt="스크린샷 2024-11-11 10 44 36" src="https://github.com/user-attachments/assets/2b4a5c35-9c03-421a-90c5-50b48e26af71">

3. 습관을 생성할 때 지정해둔 데일리 루틴과 시간에 맞게 데일리 루틴을 진행하며, 습관 탭에서 각 습관의 정보를 확인가능하다.
<img width="234" alt="스크린샷 2024-11-11 10 40 58" src="https://github.com/user-attachments/assets/3beedee2-7cbb-490c-9bf5-cc02db323210">

4. 뽀모도로 화면을 통해 보다 더 데일리 루틴에 집중할 수 있게 기획했다.
<img width="234" alt="스크린샷 2024-11-11 10 44 36" src="https://github.com/user-attachments/assets/77182425-58f6-418f-a1a5-408c8723cb28">

5. 습관 탭을 길게 누르면 해당 습관 삭제기능이 활성화 된다.
<img width="234" alt="스크린샷 2024-11-11 10 50 36" src="https://github.com/user-attachments/assets/05238cd1-f2ee-406b-a07c-60de91e1c454">

#### 백엔드
프레임워크 : nestJS
ORM : typeORM
언어: typeScript (v5.5.3)
데이터베이스 : mysql
![스크린샷 2024-11-11 10 13 00](https://github.com/user-attachments/assets/aefcbdd4-4626-4450-898b-9992af74381d)

엔티티 중심으로 디렉토리 구조를 설계
##### 구현 기능
1. 유저 관련
   - 회원가입
   - 로그인
   - 로그아웃
   - 유저 정보 반환
   - 프로필 업데이트
   - 유저 삭제

2. 습관 관련
   - 습관 생성
   - 습관 시작
   - 습관 활동 정지
   - 습관 활동 종료
   - 모든 습관 정보 반환
   - 습관 정보 반환
   - 습관 삭제
   

TODO
1. 포인트 사용
2. 푸시 알림
3. 앱 화면단 습관 시작, 종료 백엔드 비즈니스 로직과 연동
4. 배포
