import { http, HttpResponse, delay } from 'msw'

const userDataMap: { [key: number]: any } = {
  1: {
    userUuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
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
    userUuid: 'b2c3d4e5-f6a7-8901-bcde-f01234567891',
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
    userUuid: 'c3d4e5f6-a7b8-9012-cdef-012345678902',
    userId: 3,
    email: "aokumoRin@stellive.com",
    password: "1111",
    isActive: true,
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
}

export const authHandlers = [
  /*
   * 로그인 API
   */
  http.post('/api/auth/login', async ({ request }) => {
    await delay(1000)
    const { email, password } = await request.json() as { email: string; password: string }

    const user = Object.values(userDataMap).find(u => u.email === email)

    if (!user) {
      return HttpResponse.json({
        code: 'USER_NOT_FOUND',
        message: '존재하는 아이디가 없습니다.',
        data: null
      }, { status: 401 })
    }

    if (user.password !== password) {
      return HttpResponse.json({
        code: 'UNAUTHORIZED',
        message: '비밀번호가 일치하지 않습니다.',
        data: null
      }, { status: 402 })
    }

    const { password: _pw, ...userWithoutPassword } = user
    const accessToken = `mock.jwt.token.${user.userId}.${Date.now()}`

    return HttpResponse.json({
      code: 'OK',
      message: '로그인에 성공했습니다.',
      data: {
        accessToken,
        user: userWithoutPassword
      }
    })
  }),

  /*
   * 현재 로그인한 유저 정보 조회 (토큰 기반)
   */
  http.get('/api/auth/me', async ({ request }) => {
    await delay(1000)
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    const userId = parseInt(token?.split('.')[3] ?? '')
    const userData = userDataMap[userId]

    if (!userData) {
      return HttpResponse.json(
        { code: 'UNAUTHORIZED', message: '유효하지 않은 토큰입니다.', data: null },
        { status: 401 }
      )
    }

    const { password: _pw, ...userWithoutPassword } = userData
    return HttpResponse.json({ code: 'OK', message: '성공', data: userWithoutPassword })
  }),

  /*
   * 유저 정보 수정
   */
  http.post('/api/userInfo', async ({ request }) => {
    await delay(800)
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')
    const userId = parseInt(token?.split('.')[3] ?? '')
    const userData = userDataMap[userId]

    if (!userData) {
      return HttpResponse.json(
        { code: 'UNAUTHORIZED', message: '유효하지 않은 토큰입니다.', data: null },
        { status: 401 }
      )
    }

    const body = await request.json() as Record<string, unknown>

    userDataMap[userId] = {
      ...userData,
      ...body,
      userUuid: userData.userUuid,
      userId: userData.userId,
      email: userData.email,
      isActive: userData.isActive,
      isDeleted: userData.isDeleted,
      createdAt: userData.createdAt,
      deactivatedAt: userData.deactivatedAt,
      deletedAt: userData.deletedAt,
      updatedAt: new Date().toISOString(),
    }

    const { password: _pw, ...userWithoutPassword } = userDataMap[userId]
    return HttpResponse.json({ code: 'OK', message: '회원정보가 수정되었습니다.', data: userWithoutPassword })
  }),
]
