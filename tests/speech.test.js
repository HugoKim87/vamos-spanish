/**
 * 읽기 속도 설정 검증
 * 헤더에서 고른 속도가 실제 음성 재생에 반영되는지 확인한다.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import {
  useSpeech, speechRate, setSpeechRate, cycleSpeechRate, SPEECH_RATES,
} from '@/composables/useSpeech.js';
import SpeakButton from '@/components/SpeakButton.vue';
import AppHeader from '@/components/AppHeader.vue';
import { routes } from '@/router.js';

beforeEach(() => {
  setActivePinia(createPinia());
  localStorage.clear();
  setSpeechRate(0.8);
  globalThis.__lastUtterance = null;
});

describe('읽기 속도', () => {
  it('기본값은 원어민 속도(1.0)보다 느리다', () => {
    expect(speechRate.value).toBeLessThan(1.0);
  });

  it('고른 속도가 실제 재생에 반영된다', () => {
    const { speak } = useSpeech();
    for (const r of SPEECH_RATES) {
      setSpeechRate(r.value);
      speak('hola');
      expect(globalThis.__lastUtterance.rate, `${r.label} 미반영`).toBe(r.value);
    }
  });

  it('버튼을 누르면 다음 속도로 순환한다', () => {
    setSpeechRate(SPEECH_RATES[0].value);
    for (let i = 1; i <= SPEECH_RATES.length; i++) {
      cycleSpeechRate();
      expect(speechRate.value).toBe(SPEECH_RATES[i % SPEECH_RATES.length].value);
    }
  });

  it('고른 속도가 저장된다', () => {
    setSpeechRate(0.6);
    expect(localStorage.getItem('vamos.speechRate')).toBe('0.6');
  });

  it('발음 버튼도 고른 속도를 따른다', async () => {
    setSpeechRate(0.6);
    const w = mount(SpeakButton, { props: { text: 'gracias' } });
    await w.find('button').trigger('click');
    expect(globalThis.__lastUtterance.rate).toBe(0.6);
  });

  it('헤더 버튼을 누르면 속도가 바뀐다', async () => {
    const router = createRouter({ history: createWebHashHistory(), routes });
    const w = mount(AppHeader, { global: { plugins: [createPinia(), router] } });
    await w.vm.$nextTick();

    const btn = w.find('.auth-btn.rate');
    expect(btn.exists(), '속도 버튼이 없음').toBe(true);
    const before = speechRate.value;
    await btn.trigger('click');
    expect(speechRate.value, '눌러도 속도가 그대로').not.toBe(before);
  });
});
