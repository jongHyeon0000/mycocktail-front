// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import MockAdapter from "axios-mock-adapter";

export function setupAuthMock(mock: MockAdapter): void {
  /*
  * 로그인 API
  * */
  mock.onPost('/api/auth/login').reply((config) => {
    // 공통 유저 데이터 (로그인 및 조회에서 공유)
    const userDataMap: { [key: number]: any } = {
      1: {
        userId: 1,
        email: "AyatsunoUni@stellive.com",
        password: "1111",
        isActive: true,
        isDeleted: false,
        createdAt: "2024-01-15T09:30:00Z",
        updatedAt: "2024-12-20T14:22:00Z",
        deactivatedAt: undefined,
        deletedAt: undefined,
        username: "아야츠노 유니",
        gender: "F",
        birthDate: "1990-05-12",
        profileNotes: "안녕하시지~~~~",
        thumbnailImage: "https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj"
      },
      2: {
        userId: 2,
        email: "tabidayo@stellive.com",
        password: "1111",
        isActive: true,
        isDeleted: false,
        createdAt: "2024-03-22T10:15:00Z",
        updatedAt: "2024-12-18T11:40:00Z",
        deactivatedAt: undefined,
        deletedAt: undefined,
        username: "아라하시 타비",
        gender: "F",
        birthDate: "1995-08-30",
        profileNotes: "뿡빵",
        thumbnailImage: "https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/082/459/727/82459727_1714360862118_1_600x600.JPG"
      },
      3: {
        userId: 3,
        email: "aokumoRin@stellive.com",
        password: "1111",
        isActive: false,
        isDeleted: false,
        createdAt: "2024-02-10T08:00:00Z",
        updatedAt: "2024-11-05T16:30:00Z",
        deactivatedAt: "2024-11-05T16:30:00Z",
        deletedAt: undefined,
        username: "아오쿠모 린",
        gender: "F",
        birthDate: "1988-12-25",
        profileNotes: "끼요옷",
        thumbnailImage: "https://i.namu.wiki/i/2q4XJfx3uT9A-CxXVEkXjT4YwhXVAWIwYnFUmB3fmjkAZTEo78qOgRZldT-KAjwFW-30KDl4kdXLEGmmcCmBjg.webp"
      }
    };

    const { email, password } = JSON.parse(config.data);

    // 1단계: email로 사용자 찾기
    const user = Object.values(userDataMap).find(u => u.email === email);

    if (!user) {
      return [401, {
        code: 'USER_NOT_FOUND',
        message: '존재하는 아이디가 없습니다.',
        data: null
      }];
    }

    // 2단계: 비밀번호 검증
    if (user.password !== password) {
      return [402, {
        code: 'UNAUTHORIZED',
        message: '비밀번호가 일치하지 않습니다.',
        data: null
      }];
    }

    // 성공: Mock JWT 토큰 생성
    const { password: _pw, ...userWithoutPassword } = user;
    const accessToken = `mock.jwt.token.${user.userId}.${Date.now()}`;

    return [200, {
      code: 'OK',
      message: '로그인에 성공했습니다.',
      data: {
        accessToken,
        user: userWithoutPassword
      }
    }];
  });

  /*
  * 유저 정보 (개별 조회)
  * */
  mock.onGet(/\/api\/userInfo\/\d+/).reply((config) => {
    // 공통 유저 데이터 (로그인 및 조회에서 공유)
    const userDataMap: { [key: number]: any } = {
      1: {
        userId: 1,
        email: "AyatsunoUni@stellive.com",
        isActive: true,
        isDeleted: false,
        createdAt: "2024-01-15T09:30:00Z",
        updatedAt: "2024-12-20T14:22:00Z",
        deactivatedAt: undefined,
        deletedAt: undefined,
        username: "아야츠노 유니",
        gender: "F",
        birthDate: "1990-05-12",
        profileNotes: "안녕하시지~~~~",
        thumbnailImage: "https://yt3.googleusercontent.com/e3_TBkHSBwuzKRSkG1Uv5uGLiHmLUBMVogjWD35MJL7Fi_iccr8DonU6q_1XSmO4djEY9Cunabo=s900-c-k-c0x00ffffff-no-rj"
      },
      2: {
        userId: 2,
        email: "tabidayo@stellive.com",
        isActive: true,
        isDeleted: false,
        createdAt: "2024-03-22T10:15:00Z",
        updatedAt: "2024-12-18T11:40:00Z",
        deactivatedAt: undefined,
        deletedAt: undefined,
        username: "아라하시 타비",
        gender: "F",
        birthDate: "1995-08-30",
        profileNotes: "뿡빵",
        thumbnailImage: "https://image.genie.co.kr/Y/IMAGE/IMG_ARTIST/082/459/727/82459727_1714360862118_1_600x600.JPG"
      },
      3: {
        userId: 3,
        email: "aokumoRin@stellive.com",
        isActive: false,
        isDeleted: false,
        createdAt: "2024-02-10T08:00:00Z",
        updatedAt: "2024-11-05T16:30:00Z",
        deactivatedAt: "2024-11-05T16:30:00Z",
        deletedAt: undefined,
        username: "아오쿠모 린",
        gender: "F",
        birthDate: "1988-12-25",
        profileNotes: "끼요옷",
        thumbnailImage: "https://i.namu.wiki/i/2q4XJfx3uT9A-CxXVEkXjT4YwhXVAWIwYnFUmB3fmjkAZTEo78qOgRZldT-KAjwFW-30KDl4kdXLEGmmcCmBjg.webp"
      }
    };

    const userId = parseInt(config.url?.split('/').pop() || '1');
    const userData = userDataMap[userId];

    if (userData) {
      return [200, {data: userData}];
    } else {
      return [404, {message: 'User not found'}];
    }
  });
}
