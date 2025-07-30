/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string
  readonly BASE_URL: string
  readonly PROD: boolean
  readonly DEV: boolean
  // 더 많은 환경 변수를 여기에 추가할 수 있습니다
  // readonly VITE_SOME_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
