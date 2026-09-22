import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

/**
 * base 경로 설정
 * - GitHub Pages는 https://아이디.github.io/저장소명/ 형태라 base가 필요합니다.
 * - Actions가 넘겨주는 GITHUB_REPOSITORY 환경변수로 자동 계산합니다.
 * - Netlify/Vercel 등 루트 배포나 로컬에서는 './'가 그대로 쓰입니다.
 */
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : './';

export default defineConfig({
  plugins: [vue()],
  base,
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
});
