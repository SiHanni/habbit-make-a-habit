export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: {userId: number; username: string};
  Settings: undefined;
  UserSettings: undefined;
  Habit: undefined;
  HabitDetail: {habitId: number; userId: number};
};

// 네비게이션의 화면과 해당 화면에서 필요한 파라미터를 정의하는 타입
// 로그인: 네비게이션 파라미터를 받지 않는다.
// 등록: 네비게이션 파라미터를 받지 않는다.
// Main: Main 화면에 넘어가기 위해선 userId와 username을 전달해야한다.
