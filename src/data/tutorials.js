/**
 * 튜토리얼 데이터 (원본)
 * ---------------------------------------------------------------
 * lessons.js(단어 카드)와는 다른 콘텐츠 타입입니다.
 * "학습 세트를 구성해 반복 연습"하는 게 아니라, "읽고 이해하는" 문법/발음 설명 글입니다.
 *
 * ⚠️ 새 튜토리얼 추가는 이 파일에만 하세요.
 *
 * tutorial 형식:
 *   { id, emoji, title, subtitle, summary, sections: [section, ...] }
 *
 * section에 넣을 수 있는 블록 (전부 선택, 필요한 것만 조합):
 *   heading     : 섹션 제목 (string)
 *   paragraphs  : 설명 문단 (string[])
 *   alphabet    : 알파벳 카드 — 글자·이름·대표 단어를 발음 듣기와 함께 표시
 *                 [{ letter, name, say, note, words: [{ es, read, ko }] }]
 *                 say  = 글자 이름을 스페인어로 읽은 철자 (음성 재생용)
 *                 read = 한국어 근사 발음
 *   table       : { headers: string[], rows: (string[])[] }
 *   list        : 불릿 목록 (string[])
 *   examples    : 스페인어 예문 카드 — 발음 듣기 버튼 포함 [{ es, note }]
 */

export const tutorials = [
  {
    id: 'alfabeto',
    emoji: '🔤',
    title: '알파베또와 발음',
    subtitle: '¿Cómo se pronuncia el español?',
    summary: '스페인어 알파벳부터 음절·강세 규칙까지 — 첫걸음 튜토리얼',
    sections: [
      {
        heading: '스페인어 알파벳 (El Alfabeto)',
        paragraphs: [
          '스페인어 알파벳은 총 27자입니다. 영어 알파벳 26자에 스페인어 고유의 Ñ(에녜)이 하나 더 있습니다.',
          '한글 발음은 어디까지나 근사치입니다. 🔊 버튼을 눌러 실제 소리를 들으면서 익히는 걸 추천합니다.',
        ],
        alphabet: [
          {
            letter: 'A a', name: '아', say: 'a',
            words: [
              { es: 'agua', read: '아구아', ko: '물' },
              { es: 'amigo', read: '아미고', ko: '친구' },
            ],
          },
          {
            letter: 'B b', name: '베', say: 'be',
            note: 'V와 소리 차이가 거의 없습니다',
            words: [
              { es: 'boca', read: '보까', ko: '입' },
              { es: 'bueno', read: '부에노', ko: '좋은' },
            ],
          },
          {
            letter: 'C c', name: '쎄', say: 'ce',
            note: 'e·i 앞에서는 [ㅆ], 그 외에는 [ㄲ]',
            words: [
              { es: 'casa', read: '까사', ko: '집' },
              { es: 'cena', read: '쎄나', ko: '저녁 식사' },
            ],
          },
          {
            letter: 'D d', name: '데', say: 'de',
            words: [
              { es: 'día', read: '디아', ko: '날, 하루' },
              { es: 'dedo', read: '데도', ko: '손가락' },
            ],
          },
          {
            letter: 'E e', name: '에', say: 'e',
            words: [
              { es: 'escuela', read: '에스꾸엘라', ko: '학교' },
              { es: 'elefante', read: '엘레판떼', ko: '코끼리' },
            ],
          },
          {
            letter: 'F f', name: '에페', say: 'efe',
            words: [
              { es: 'flor', read: '플로르', ko: '꽃' },
              { es: 'fuego', read: '푸에고', ko: '불' },
            ],
          },
          {
            letter: 'G g', name: '헤', say: 'ge',
            note: 'e·i 앞에서는 목 안쪽의 [ㅎ], 그 외에는 [ㄱ]',
            words: [
              { es: 'gato', read: '가또', ko: '고양이' },
              { es: 'gente', read: '헨떼', ko: '사람들' },
            ],
          },
          {
            letter: 'H h', name: '아체', say: 'hache',
            note: '항상 묵음 — 소리가 나지 않습니다',
            words: [
              { es: 'hola', read: '올라', ko: '안녕' },
              { es: 'hospital', read: '오스삐딸', ko: '병원' },
            ],
          },
          {
            letter: 'I i', name: '이', say: 'i',
            words: [
              { es: 'isla', read: '이슬라', ko: '섬' },
              { es: 'invierno', read: '임비에르노', ko: '겨울' },
            ],
          },
          {
            letter: 'J j', name: '호따', say: 'jota',
            note: '목 안쪽에서 나는 강한 [ㅎ]',
            words: [
              { es: 'jamón', read: '하몬', ko: '햄' },
              { es: 'joven', read: '호벤', ko: '젊은' },
            ],
          },
          {
            letter: 'K k', name: '까', say: 'ka',
            note: '외래어에만 씁니다',
            words: [
              { es: 'kilo', read: '낄로', ko: '킬로' },
              { es: 'koala', read: '꼬알라', ko: '코알라' },
            ],
          },
          {
            letter: 'L l', name: '엘레', say: 'ele',
            words: [
              { es: 'luna', read: '루나', ko: '달' },
              { es: 'libro', read: '리브로', ko: '책' },
            ],
          },
          {
            letter: 'M m', name: '에메', say: 'eme',
            words: [
              { es: 'mano', read: '마노', ko: '손' },
              { es: 'mesa', read: '메사', ko: '탁자' },
            ],
          },
          {
            letter: 'N n', name: '에네', say: 'ene',
            words: [
              { es: 'noche', read: '노체', ko: '밤' },
              { es: 'nada', read: '나다', ko: '아무것도' },
            ],
          },
          {
            letter: 'Ñ ñ', name: '에녜', say: 'eñe',
            note: '스페인어 고유 글자 — [니] 계열 콧소리',
            words: [
              { es: 'niño', read: '니뇨', ko: '아이' },
              { es: 'España', read: '에스빠냐', ko: '스페인' },
            ],
          },
          {
            letter: 'O o', name: '오', say: 'o',
            words: [
              { es: 'ojo', read: '오호', ko: '눈' },
              { es: 'otoño', read: '오또뇨', ko: '가을' },
            ],
          },
          {
            letter: 'P p', name: '뻬', say: 'pe',
            words: [
              { es: 'perro', read: '뻬로', ko: '개' },
              { es: 'padre', read: '빠드레', ko: '아버지' },
            ],
          },
          {
            letter: 'Q q', name: '꾸', say: 'cu',
            note: '항상 u와 함께 쓰여 que·qui는 [께]·[끼]',
            words: [
              { es: 'queso', read: '께소', ko: '치즈' },
              { es: 'química', read: '끼미까', ko: '화학' },
            ],
          },
          {
            letter: 'R r', name: '에레', say: 'erre',
            note: '단어 첫머리나 rr은 혀를 굴리는 소리',
            words: [
              { es: 'rojo', read: '로호', ko: '빨강' },
              { es: 'pero', read: '뻬로', ko: '그러나' },
            ],
          },
          {
            letter: 'S s', name: '에세', say: 'ese',
            words: [
              { es: 'sol', read: '솔', ko: '해' },
              { es: 'silla', read: '시야', ko: '의자' },
            ],
          },
          {
            letter: 'T t', name: '떼', say: 'te',
            words: [
              { es: 'tarde', read: '따르데', ko: '오후' },
              { es: 'tiempo', read: '띠엠뽀', ko: '시간, 날씨' },
            ],
          },
          {
            letter: 'U u', name: '우', say: 'u',
            words: [
              { es: 'uno', read: '우노', ko: '하나' },
              { es: 'universidad', read: '우니베르시닫', ko: '대학' },
            ],
          },
          {
            letter: 'V v', name: '우베', say: 'uve',
            note: 'B와 소리 차이가 거의 없습니다',
            words: [
              { es: 'vino', read: '비노', ko: '와인' },
              { es: 'verde', read: '베르데', ko: '초록' },
            ],
          },
          {
            letter: 'W w', name: '우베 도블레', say: 'uve doble',
            note: '외래어에만 씁니다',
            words: [
              { es: 'wifi', read: '위피', ko: '와이파이' },
              { es: 'whisky', read: '위스끼', ko: '위스키' },
            ],
          },
          {
            letter: 'X x', name: '에끼스', say: 'equis',
            note: '보통 [ㄱㅅ]이지만 México처럼 [ㅎ]로 읽는 예외가 있습니다',
            words: [
              { es: 'examen', read: '엑사멘', ko: '시험' },
              { es: 'México', read: '메히꼬', ko: '멕시코' },
            ],
          },
          {
            letter: 'Y y', name: '예', say: 'ye',
            note: '지역에 따라 [ㅑ]~[ㅈ]~[sh]로 갈립니다',
            words: [
              { es: 'yo', read: '요', ko: '나' },
              { es: 'playa', read: '쁠라야', ko: '해변' },
            ],
          },
          {
            letter: 'Z z', name: '쎄따', say: 'zeta',
            note: '스페인은 영어 th에 가깝고, 중남미는 [ㅆ]',
            words: [
              { es: 'zapato', read: '사빠또', ko: '신발' },
              { es: 'azul', read: '아술', ko: '파랑' },
            ],
          },
        ],
      },
      {
        heading: '모음: 강모음과 약모음',
        paragraphs: [
          '스페인어 모음은 a, e, i, o, u 5개뿐이고, 영어처럼 발음이 여러 갈래로 갈리지 않아 항상 같은 소리로 읽힙니다.',
          '음절을 나누거나 강세 규칙을 이해하려면 모음을 입이 크게 열리는 "강모음"과 상대적으로 덜 열리는 "약모음"으로 구분할 줄 알아야 합니다.',
        ],
        list: [
          '강모음: a, e, o',
          '약모음: i, u',
        ],
      },
      {
        heading: '음절 나누기',
        paragraphs: [
          '스페인어는 자음이 아무리 붙어 있어도 모음의 개수만큼 음절이 나뉩니다.',
          '두 모음이 이웃해 있을 때 규칙이 갈립니다 — 약모음이 하나라도 섞여 있으면 두 모음이 한 음절로 묶이고, 강모음끼리 만나면 각자 다른 음절이 됩니다.',
        ],
        examples: [
          { es: 'viuda', note: 'viu-da · 약+약 → 한 음절 (2음절 단어)' },
          { es: 'agua', note: 'a-gua · 강+약 → 한 음절 (2음절 단어)' },
          { es: 'aire', note: 'ai-re · 약+강 → 한 음절 (2음절 단어)' },
          { es: 'aeropuerto', note: 'a-e-ro-puer-to · 강+강(a-e)은 따로 (5음절 단어)' },
          { es: 'tarea', note: 'ta-re-a · 강+강(e-a)은 따로 (3음절 단어)' },
        ],
      },
      {
        heading: 'LL과 Y 발음',
        paragraphs: [
          '두 글자 모두 영어의 [y]와 [j] 중간쯤 되는 소리로, 지역마다 편차가 꽤 큽니다.',
          '스페인·중남미 대부분에서는 영어 y와 비슷하게 들리지만, 아르헨티나·우루과이 쪽에서는 [sh]에 가깝게 발음하는 경우가 많습니다.',
          '어느 발음이 "정답"인 건 아니라서, 자신에게 편한 발음 하나를 기준으로 삼아 꾸준히 연습하는 걸 추천합니다.',
        ],
      },
      {
        heading: '강세 규칙',
        paragraphs: [
          '스페인어는 강세 자리가 정해진 규칙을 따르기 때문에, 규칙만 알면 처음 보는 단어도 어디에 힘을 줘야 할지 바로 알 수 있습니다.',
          '규칙에서 벗어나는 단어는 예외적으로 모음 위에 강세 표시(´)를 붙여 알려줍니다 — 이 표시가 있으면 무조건 그 음절에 강세가 옵니다.',
        ],
        list: [
          '① 모음, n, s로 끝나는 단어 → 뒤에서 두 번째 음절에 강세',
          '② 그 외 자음으로 끝나는 단어 → 마지막 음절에 강세',
          '③ 강세가 오는 음절에 모음이 두 개면 → 강모음 쪽에 강세',
          '④ 약모음 두 개가 한 음절을 이루면 → 뒤쪽 모음에 강세',
        ],
        examples: [
          { es: 'joven', note: '자음(n)으로 끝나지만 n은 예외 → jo-ven (규칙 ①)' },
          { es: 'martes', note: 'ㅁar-tes (규칙 ①)' },
          { es: 'autor', note: 'r로 끝남 → au-tor (규칙 ②)' },
          { es: 'piano', note: 'pi-a-no · 강모음 a에 강세 (규칙 ③)' },
          { es: 'viuda', note: 'viu-da · 뒤쪽 모음 u에 강세 (규칙 ④)' },
          { es: 'María', note: '규칙에서 벗어나 강세 표시(í)로 알려줌' },
        ],
      },
      {
        heading: '강세 표시로 뜻이 갈리는 단어',
        paragraphs: [
          '한 음절짜리 단어는 원래 강세를 표시하지 않지만, 철자가 같은 다른 단어와 구분하기 위해 예외적으로 표시하는 경우가 있습니다.',
        ],
        table: {
          headers: ['강세 있음', '뜻', '강세 없음', '뜻'],
          rows: [
            ['tú', '너 (인칭대명사)', 'tu', '너의 (소유형용사)'],
            ['él', '그 (인칭대명사)', 'el', '그 (정관사)'],
          ],
        },
      },
    ],
  },
];
