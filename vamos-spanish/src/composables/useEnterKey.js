import { onMounted, onUnmounted } from 'vue';

/**
 * 화면 어디에 포커스가 있든 Enter를 받는다.
 *
 * 입력창의 @keyup.enter만 쓰면, 채점 후 input이 disabled로 바뀌는 순간
 * 키 이벤트가 아예 발생하지 않아 "엔터로 다음 문제"가 먹히지 않는다.
 * 그래서 window에 직접 건다.
 *
 * @param {() => void} handler Enter를 눌렀을 때 실행할 동작
 */
export function useEnterKey(handler) {
  function onKey(e) {
    if (e.key !== 'Enter') return;
    // 한글 입력 중 조합 확정 엔터는 무시 (두 번 넘어가는 것 방지)
    if (e.isComposing || e.keyCode === 229) return;
    e.preventDefault();
    handler();
  }
  onMounted(() => window.addEventListener('keydown', onKey));
  onUnmounted(() => window.removeEventListener('keydown', onKey));
}
