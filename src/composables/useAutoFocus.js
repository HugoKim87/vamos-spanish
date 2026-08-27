import { nextTick, onMounted, ref, watch } from 'vue';

/**
 * 주관식 입력창에 자동으로 커서를 놓는다.
 *
 * 문제가 바뀔 때마다 입력창을 다시 클릭해야 하면 키보드만으로 진행할 수 없다.
 * Enter로 채점하고 Enter로 다음 문제로 넘어가는 흐름과 맞물려,
 * 손을 마우스로 옮기지 않고 끝까지 풀 수 있게 한다.
 *
 * @param {import('vue').Ref} watchSource 문제가 바뀌는 것을 알려주는 값 (예: 현재 문항)
 * @param {() => boolean} [enabled] 지금 포커스를 줘도 되는지 (채점 중에는 주지 않는다)
 * @returns {import('vue').Ref} 입력 요소에 걸 ref
 */
export function useAutoFocus(watchSource, enabled = () => true) {
  const inputRef = ref(null);

  async function focus() {
    if (!enabled()) return;
    await nextTick();
    const el = inputRef.value;
    if (!el || typeof el.focus !== 'function') return;
    // 모바일에서 키보드가 화면을 가리며 스크롤이 튀는 것을 막는다
    el.focus({ preventScroll: true });
  }

  onMounted(focus);
  watch(watchSource, focus);

  return inputRef;
}
