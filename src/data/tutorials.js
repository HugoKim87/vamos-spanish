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
  {
    id: 'genero',
    emoji: '⚖️',
    title: '남성 명사와 여성 명사',
    subtitle: '¿El o la?',
    summary: '관사와 형용사가 명사의 성·수에 따라 어떻게 바뀌는지',
    sections: [
      {
        heading: '스페인어 명사에는 성이 있다',
        paragraphs: [
          '스페인어의 모든 명사는 남성이거나 여성입니다. 사람이나 동물처럼 실제 성별이 있는 경우도 있지만, 사물도 예외 없이 둘 중 하나로 정해져 있습니다.',
          '중요한 건 뜻이 아니라 문법상의 분류라는 점입니다. 책상이 남성적이어서 el escritorio인 게 아니라, 그냥 그렇게 정해져 있는 겁니다. 그래서 단어를 외울 때는 el·la를 붙여서 통째로 외우는 편이 훨씬 낫습니다.',
        ],
        examples: [
          { es: 'el trapo', note: '남성 — 걸레' },
          { es: 'la escoba', note: '여성 — 빗자루' },
          { es: 'el menú', note: '남성 — 메뉴' },
          { es: 'la cuenta', note: '여성 — 계산서' },
        ],
      },
      {
        heading: '관사 네 가지',
        paragraphs: [
          '명사의 성(남성/여성)과 수(단수/복수)에 따라 관사가 네 갈래로 갈립니다.',
          '정관사는 "그 ~"처럼 이미 아는 대상을, 부정관사는 "어떤 ~ 하나"처럼 처음 언급하는 대상을 가리킬 때 씁니다.',
        ],
        table: {
          headers: ['', '남성 단수', '여성 단수', '남성 복수', '여성 복수'],
          rows: [
            ['정관사 (그 ~)', 'el libro', 'la mesa', 'los libros', 'las mesas'],
            ['부정관사 (어떤 ~)', 'un libro', 'una mesa', 'unos libros', 'unas mesas'],
          ],
        },
      },
      {
        heading: '성을 알아보는 힌트',
        paragraphs: [
          '어미를 보면 대체로 짐작할 수 있습니다. 다만 힌트일 뿐이라 예외가 꽤 있습니다.',
        ],
        list: [
          '-o로 끝나면 대개 남성: el libro, el trapo, el vidrio',
          '-a로 끝나면 대개 여성: la mesa, la escoba, la pizza',
          '-ción, -sión, -dad, -tad로 끝나면 거의 항상 여성: la aplicación, la universidad',
          '-or, -aje로 끝나면 대개 남성: el repartidor, el garaje',
        ],
        examples: [
          { es: 'el día', note: '-a인데 남성 (자주 쓰는 예외)' },
          { es: 'la mano', note: '-o인데 여성' },
          { es: 'el problema', note: '그리스어에서 온 -ma는 남성 (el idioma, el clima도)' },
          { es: 'el agua', note: '여성 명사인데 관사는 el — 아래 설명 참고' },
        ],
      },
      {
        heading: 'el agua는 왜 el을 쓸까',
        paragraphs: [
          'agua는 분명 여성 명사인데 관사는 el을 씁니다. la agua라고 하면 [라 아구아]처럼 a 소리가 겹쳐 발음이 불편해지기 때문입니다.',
          '그래서 강세가 a에 오는 여성 단수 명사 앞에서는 관사만 el로 바꿔 씁니다. 명사 자체는 여전히 여성이라 형용사는 여성형을 그대로 씁니다.',
        ],
        examples: [
          { es: 'el agua fría', note: '관사는 el, 형용사는 여성형 fría' },
          { es: 'las aguas', note: '복수가 되면 다시 las' },
        ],
      },
      {
        heading: '형용사도 명사를 따라간다',
        paragraphs: [
          '형용사는 꾸미는 명사의 성과 수에 맞춰 모양이 바뀝니다. 스페인어에서 형용사는 보통 명사 뒤에 옵니다.',
          '-o로 끝나는 형용사는 네 가지 형태를 갖지만, -e나 자음으로 끝나면 성에 따라서는 바뀌지 않고 복수형만 만듭니다.',
        ],
        table: {
          headers: ['형용사', '남성 단수', '여성 단수', '남성 복수', '여성 복수'],
          rows: [
            ['rojo (빨간)', 'rojo', 'roja', 'rojos', 'rojas'],
            ['grande (큰)', 'grande', 'grande', 'grandes', 'grandes'],
            ['fácil (쉬운)', 'fácil', 'fácil', 'fáciles', 'fáciles'],
          ],
        },
        examples: [
          { es: 'rosas rojas', note: 'rosa가 여성 복수 → roja도 여성 복수' },
          { es: 'el pollo frito', note: 'pollo가 남성 단수 → frito' },
          { es: 'la comida rápida', note: 'comida가 여성 단수 → rápida' },
          { es: 'los tacos picantes', note: '-e로 끝나 성은 그대로, 복수 -s만 붙음' },
        ],
      },
      {
        heading: '복수형 만들기',
        paragraphs: [
          '모음으로 끝나면 -s, 자음으로 끝나면 -es를 붙입니다. 관사와 형용사도 함께 복수로 바꿔야 합니다.',
        ],
        examples: [
          { es: 'la mesa → las mesas', note: '모음으로 끝남 → -s' },
          { es: 'el profesor → los profesores', note: '자음으로 끝남 → -es' },
          { es: 'la habitación → las habitaciones', note: '복수가 되면 강세 부호가 사라짐' },
        ],
      },
      {
        heading: '부사는 바뀌지 않는다',
        paragraphs: [
          '성·수에 따라 바뀌는 건 관사와 형용사입니다. 부사는 동사나 형용사를 꾸미는 말이라 모양이 그대로입니다.',
          '같은 단어가 형용사로도 부사로도 쓰이는 경우가 있어서 헷갈리기 쉬운데, 명사를 꾸미면 형용사(변함), 동사를 꾸미면 부사(안 변함)로 구분하면 됩니다.',
        ],
        examples: [
          { es: 'Ellas hablan mucho.', note: '부사 mucho — 주어가 여성 복수여도 그대로' },
          { es: 'muchas gracias', note: '여기서는 형용사라 여성 복수 muchas' },
          { es: 'Ella corre rápido.', note: '부사 rápido — 안 바뀜' },
          { es: 'la comida rápida', note: '형용사라 여성형 rápida' },
        ],
      },
    ],
  },
  {
    id: 'conjugacion',
    emoji: '🔀',
    title: '동사 활용 규칙',
    subtitle: '¿Cómo se conjugan los verbos?',
    summary: '주어에 따라 동사가 어떻게 바뀌는지 — 규칙부터 불규칙까지',
    sections: [
      {
        heading: '동사는 주어에 따라 모양이 바뀐다',
        paragraphs: [
          '한국어는 "나는 먹는다 / 너는 먹는다"처럼 동사가 그대로지만, 스페인어는 주어에 맞춰 동사 어미가 바뀝니다. 그래서 어미만 봐도 누가 하는 행동인지 알 수 있습니다.',
          '이 덕분에 주어를 생략하는 경우가 많습니다. Yo hablo español보다 그냥 Hablo español이라고 하는 게 더 자연스럽습니다.',
        ],
        examples: [
          { es: 'hablo', note: '어미 -o → 내가 말한다 (yo가 없어도 안다)' },
          { es: 'hablas', note: '어미 -as → 네가 말한다' },
          { es: 'habla', note: '어미 -a → 그/그녀/당신이 말한다' },
        ],
      },
      {
        heading: '동사는 세 가지 어미로 나뉜다',
        paragraphs: [
          '모든 동사원형은 -ar, -er, -ir 중 하나로 끝납니다. 어느 쪽인지에 따라 붙는 어미가 달라지므로, 새 동사를 만나면 이것부터 확인하면 됩니다.',
          '-ar 동사가 압도적으로 많습니다. 이 앱에 담긴 134개 동사 중 95개가 -ar로 끝납니다.',
        ],
        examples: [
          { es: 'hablar', note: '-ar 동사 — 말하다' },
          { es: 'comer', note: '-er 동사 — 먹다' },
          { es: 'vivir', note: '-ir 동사 — 살다' },
        ],
      },
      {
        heading: '규칙 활용 — 어미만 갈아 끼우면 된다',
        paragraphs: [
          '동사원형에서 마지막 두 글자를 떼어낸 부분을 어간이라고 합니다. hablar에서 habl-이 어간입니다. 여기에 주어에 맞는 어미를 붙이면 끝입니다.',
          '-er와 -ir는 nosotros·vosotros만 다르고 나머지는 같습니다. 이 둘만 따로 기억해두면 부담이 줄어듭니다.',
        ],
        table: {
          headers: ['주어', '-ar (hablar)', '-er (comer)', '-ir (vivir)'],
          rows: [
            ['yo (나)', 'hablo', 'como', 'vivo'],
            ['tú (너)', 'hablas', 'comes', 'vives'],
            ['él/ella/usted', 'habla', 'come', 'vive'],
            ['nosotros (우리)', 'hablamos', 'comemos', 'vivimos'],
            ['vosotros (너희)', 'habláis', 'coméis', 'vivís'],
            ['ellos/ustedes', 'hablan', 'comen', 'viven'],
          ],
        },
      },
      {
        heading: '불규칙 ① 어간의 모음이 바뀐다',
        paragraphs: [
          '어미는 규칙대로인데 어간의 모음이 바뀌는 동사들이 있습니다. 바뀌는 자리는 yo·tú·él·ellos 네 곳뿐이고, nosotros·vosotros는 원래 모양 그대로입니다.',
          '표에서 바뀌는 자리만 색칠하면 구두 모양이 되어서, 영어권에서는 이런 동사를 "부츠 동사"라고 부르기도 합니다.',
        ],
        list: [
          'e → ie : querer(quiero), preferir(prefiero), recomendar(recomiendo)',
          'o → ue : poder(puedo), dormirse(me duermo), mostrar(muestro)',
          'e → i : pedir(pido), seguir(sigo)',
        ],
        table: {
          headers: ['주어', 'querer (e→ie)', 'poder (o→ue)', 'pedir (e→i)'],
          rows: [
            ['yo', 'quiero', 'puedo', 'pido'],
            ['tú', 'quieres', 'puedes', 'pides'],
            ['él/ella/usted', 'quiere', 'puede', 'pide'],
            ['nosotros', 'queremos', 'podemos', 'pedimos'],
            ['vosotros', 'queréis', 'podéis', 'pedís'],
            ['ellos/ustedes', 'quieren', 'pueden', 'piden'],
          ],
        },
      },
      {
        heading: '불규칙 ② yo 형태만 다르다',
        paragraphs: [
          '나머지 다섯 인칭은 규칙대로인데 yo만 모양이 다른 동사들입니다. yo 하나만 따로 외우면 되니 부담이 적습니다.',
          '-cer, -cir로 끝나면 대개 -zco가 되고, -ger·-gir로 끝나면 발음을 지키려고 g가 j로 바뀝니다.',
        ],
        examples: [
          { es: 'conocer → conozco', note: '알다 — 나머지는 conoces, conoce…' },
          { es: 'agradecer → agradezco', note: '감사하다' },
          { es: 'introducir → introduzco', note: '입력하다' },
          { es: 'poner → pongo', note: '놓다' },
          { es: 'hacer → hago', note: '하다' },
          { es: 'proteger → protejo', note: '보호하다 — g가 j로 (발음 유지)' },
        ],
      },
      {
        heading: '불규칙 ③ 아예 외워야 하는 동사',
        paragraphs: [
          '자주 쓰이는 동사일수록 불규칙한 경우가 많습니다. 그만큼 자주 만나게 되니 쓰다 보면 익숙해집니다.',
        ],
        table: {
          headers: ['주어', 'ser (~이다)', 'ir (가다)', 'tener (가지다)'],
          rows: [
            ['yo', 'soy', 'voy', 'tengo'],
            ['tú', 'eres', 'vas', 'tienes'],
            ['él/ella/usted', 'es', 'va', 'tiene'],
            ['nosotros', 'somos', 'vamos', 'tenemos'],
            ['vosotros', 'sois', 'vais', 'tenéis'],
            ['ellos/ustedes', 'son', 'van', 'tienen'],
          ],
        },
      },
      {
        heading: '재귀동사 — 원형이 -se로 끝나는 것들',
        paragraphs: [
          '동작이 자기 자신에게 돌아오는 동사입니다. 원형이 -se로 끝나고, 쓸 때는 이 se를 주어에 맞는 재귀대명사로 바꿔 동사 앞에 놓습니다.',
          '동사 자체는 평소대로 활용하면 되고, 앞에 대명사만 하나 더 붙는다고 생각하면 쉽습니다.',
        ],
        table: {
          headers: ['주어', '재귀대명사', 'ducharse (샤워하다)'],
          rows: [
            ['yo', 'me', 'me ducho'],
            ['tú', 'te', 'te duchas'],
            ['él/ella/usted', 'se', 'se ducha'],
            ['nosotros', 'nos', 'nos duchamos'],
            ['vosotros', 'os', 'os ducháis'],
            ['ellos/ustedes', 'se', 'se duchan'],
          ],
        },
        examples: [
          { es: 'Me levanto a las siete.', note: '나는 7시에 일어난다' },
          { es: 'Se llama Pedro.', note: '그의 이름은 페드로다' },
        ],
      },
      {
        heading: '모든 인칭을 다 쓰지는 않는 동사',
        paragraphs: [
          '뜻 때문에 특정 인칭만 쓰는 동사도 있습니다. 억지로 여섯 개를 다 외울 필요가 없습니다.',
          'gustar는 특히 주의해야 합니다. "내가 좋아한다"가 아니라 "그것이 나를 기쁘게 한다"는 구조라서, 좋아하는 대상이 주어가 됩니다.',
        ],
        examples: [
          { es: 'llueve', note: '비가 온다 — 날씨라 3인칭 단수만 쓴다' },
          { es: 'Me gusta el café.', note: '커피가 단수 → gusta' },
          { es: 'Me gustan los tacos.', note: '타코가 복수 → gustan' },
          { es: 'Me duele la cabeza.', note: 'doler도 같은 구조 — 머리가 아프게 한다' },
        ],
      },
      {
        heading: '어떻게 익히면 좋을까',
        paragraphs: [
          '한 번에 다 외우려 하면 지칩니다. 앱의 동사 활용 모드에서 한 인칭씩 답을 떠올려 보고, 틀린 것만 반복해서 만나는 방식이 효율적입니다.',
          '낱말카드에서 동사를 뒤집으면 여섯 인칭이 한눈에 나오니, 새 동사를 만날 때마다 표를 한 번씩 훑어보는 것부터 시작해 보세요.',
        ],
        list: [
          '가장 먼저: yo 형태 — 자기 이야기를 할 때 제일 많이 쓴다',
          '그다음: tú와 él — 대화 상대와 제삼자',
          'nosotros·vosotros·ellos는 문장을 읽다가 자연스럽게 익혀도 늦지 않다',
        ],
      },
    ],
  },
  {
    id: 'ser-estar',
    emoji: '🔷',
    title: 'ser와 estar',
    subtitle: '¿Ser o estar?',
    summary: '"~이다"가 두 개인 이유 — 본질과 상태를 나누는 법',
    sections: [
      {
        heading: '한국어의 "~이다"가 둘로 나뉜다',
        paragraphs: [
          '한국어는 "나는 선생님이다"와 "나는 피곤하다"에 같은 틀을 쓰지만, 스페인어는 이 둘을 다른 동사로 구분합니다.',
          '기준은 간단합니다. 잘 바뀌지 않는 성질이면 ser, 지금 그러한 상태면 estar입니다.',
        ],
        examples: [
          { es: 'Soy profesora.', note: 'ser — 직업은 쉽게 바뀌지 않는다' },
          { es: 'Estoy cansado.', note: 'estar — 피곤한 건 지금 상태다' },
        ],
      },
      {
        heading: '두 동사의 활용',
        paragraphs: [
          '둘 다 아주 자주 쓰이는 만큼 불규칙합니다. 통째로 익혀두는 편이 빠릅니다.',
        ],
        table: {
          headers: ['주어', 'ser', 'estar'],
          rows: [
            ['yo', 'soy', 'estoy'],
            ['tú', 'eres', 'estás'],
            ['él/ella/usted', 'es', 'está'],
            ['nosotros', 'somos', 'estamos'],
            ['vosotros', 'sois', 'estáis'],
            ['ellos/ustedes', 'son', 'están'],
          ],
        },
      },
      {
        heading: 'ser를 쓰는 자리',
        paragraphs: [
          '그 사람이나 사물이 "무엇인가"를 말할 때 씁니다. 시간이 지나도 웬만해선 그대로인 것들입니다.',
        ],
        list: [
          '이름·정체: Soy Silvia',
          '직업: Soy profesora de español',
          '출신·국적: Soy de Corea',
          '성질·특징: El chocolate es muy dulce',
          '시간·날짜: Son las tres',
          '무엇으로 만들어졌는지: La mesa es de madera',
        ],
        examples: [
          { es: 'Mi pasatiempo favorito es viajar.', note: '내 취미가 무엇인지 = 정체' },
          { es: 'Es un regalo de cumpleaños.', note: '이것이 무엇인지' },
          { es: 'Es para dos personas.', note: '용도·대상' },
        ],
      },
      {
        heading: 'estar를 쓰는 자리',
        paragraphs: [
          '지금 어떤 상태인지, 어디에 있는지를 말할 때 씁니다. 내일이면 달라질 수 있는 것들입니다.',
        ],
        list: [
          '위치: Estoy en el séptimo piso',
          '기분·컨디션: Estoy contento / Estoy muy cansado hoy',
          '일시적 상황: Estoy solo / Estoy con mi familia',
          '진행 중인 동작: Estoy imprimiendo un informe',
          '완료된 결과 상태: La tienda está cerrada',
        ],
        examples: [
          { es: 'Estoy de buen humor.', note: '오늘 기분이 좋은 상태' },
          { es: 'Solo estoy mirando.', note: '지금 구경하는 중 (가게에서)' },
          { es: '¿Está incluido el envío?', note: '지금 포함된 상태인지' },
        ],
      },
      {
        heading: '같은 형용사인데 뜻이 달라진다',
        paragraphs: [
          '어떤 형용사는 ser와 estar 중 무엇을 쓰느냐에 따라 뜻이 바뀝니다. 본질이냐 상태냐의 차이가 그대로 의미 차이가 되는 셈입니다.',
        ],
        table: {
          headers: ['형용사', 'ser + 형용사', 'estar + 형용사'],
          rows: [
            ['aburrido', '지루한 사람이다', '(지금) 심심하다'],
            ['listo', '똑똑하다', '준비됐다'],
            ['bueno', '좋은 사람이다', '맛있다 · 건강하다'],
            ['verde', '초록색이다', '덜 익었다'],
          ],
        },
        examples: [
          { es: 'Él es aburrido.', note: '그는 재미없는 사람이다' },
          { es: 'Él está aburrido.', note: '그는 지금 심심하다' },
        ],
      },
      {
        heading: '헷갈릴 때 던져볼 질문',
        paragraphs: [
          '규칙을 다 외우기 어렵다면, 이 한 문장만 떠올려 보세요. "내일도 그대로일까?"',
          '내일도 그대로면 ser, 내일이면 달라질 수 있으면 estar입니다. 완벽하지는 않지만 대부분의 상황을 가려냅니다.',
        ],
        examples: [
          { es: 'Soy coreano.', note: '내일도 한국인이다 → ser' },
          { es: 'Estoy enfermo.', note: '내일은 나을 수도 있다 → estar' },
          { es: 'La sopa está caliente.', note: '식으면 달라진다 → estar' },
          { es: 'La sopa es deliciosa.', note: '이 수프의 성질 → ser' },
        ],
      },
    ],
  },
  {
    id: 'preposiciones',
    emoji: '🧭',
    title: '전치사 a · en · de · para · por',
    subtitle: '¿A, en, de, para o por?',
    summary: '자주 쓰는 전치사 다섯 개를 한자리에 — 특히 para와 por의 차이',
    sections: [
      {
        heading: '전치사는 명사·동사원형 앞에 붙는다',
        paragraphs: [
          '전치사는 단어와 단어의 관계를 이어주는 짧은 말입니다. 스페인어에서는 전치사 뒤에 명사나 동사원형이 오는데, 한국어와 달리 동사를 활용하지 않고 원형 그대로 씁니다.',
          '한국어 조사와 일대일로 대응하지 않아서, 뜻으로 외우기보다 자주 쓰는 짝을 통째로 익히는 편이 빠릅니다.',
        ],
        examples: [
          { es: 'para comer', note: '먹기 위해 — 동사원형 그대로' },
          { es: 'antes de dormir', note: '자기 전에 — 여기도 원형' },
        ],
      },
      {
        heading: 'a — 목적지와 시각',
        paragraphs: [
          '어디로 가는지, 몇 시에 하는지를 나타냅니다. 뒤에 남성 정관사 el이 오면 반드시 al로 줄여 씁니다.',
        ],
        list: [
          '목적지: Voy al gimnasio (헬스장에 간다)',
          '시각: a las tres (3시에)',
          '빈도: tres veces a la semana (일주일에 세 번)',
          '사람 목적어 앞: pasear al perro (개를 산책시키다)',
        ],
        examples: [
          { es: 'Voy al quinto piso.', note: 'a + el → al (목적지)' },
          { es: 'viajar al extranjero', note: '해외로 여행 가다' },
          { es: 'Como tres veces al día.', note: '하루에 세 번' },
        ],
      },
      {
        heading: 'en — 있는 곳과 수단',
        paragraphs: [
          'a가 "~으로(이동)"라면 en은 "~에서(머묾)"입니다. 이 둘을 헷갈리기 쉬우니 짝지어 기억해 두면 좋습니다.',
        ],
        list: [
          '위치: Estoy en el séptimo piso (7층에 있다)',
          '장소에서의 행동: estudiar en la biblioteca',
          '교통수단: ir en metro (지하철을 타고 가다)',
          '계절·달: en verano, en enero',
        ],
        examples: [
          { es: 'Voy al parque.', note: '공원으로 간다 — 이동이라 a' },
          { es: 'Corro en el parque.', note: '공원에서 달린다 — 장소라 en' },
          { es: 'montar en bicicleta', note: '자전거를 타다 (수단)' },
        ],
      },
      {
        heading: 'de — 소속·재료·출발점',
        paragraphs: [
          '두 명사를 이어 "~의"를 만드는 데 가장 많이 쓰입니다. 한국어로는 대개 앞뒤를 뒤집어 옮기면 자연스럽습니다.',
          'a와 마찬가지로 남성 정관사 el을 만나면 del로 줄여 씁니다.',
        ],
        list: [
          '소속·종류: la tarjeta de crédito (신용카드)',
          '재료: la mesa de madera (나무 탁자)',
          '출신: Soy de Corea (한국에서 왔다)',
          '출발점: de nueve a seis (9시부터 6시까지)',
        ],
        examples: [
          { es: 'la sala de lectura', note: '읽기의 방 → 열람실' },
          { es: 'los gastos de envío', note: '배송의 비용 → 배송비' },
          { es: 'cerca del parque', note: 'de + el → del' },
        ],
      },
      {
        heading: 'para와 por — 가장 많이 헷갈리는 짝',
        paragraphs: [
          '둘 다 한국어로 "~를 위해"로 옮겨질 때가 있어 특히 어렵습니다. 방향을 생각하면 구분이 쉬워집니다.',
          'para는 앞을 봅니다 — 목적, 대상, 기한. por는 뒤를 봅니다 — 이유, 원인, 지나온 경로.',
        ],
        table: {
          headers: ['', 'para (→ 앞을 봄)', 'por (← 뒤를 봄)'],
          rows: [
            ['핵심', '목적 · 대상', '이유 · 원인'],
            ['예', 'Compro rosas para decorar.', 'Gracias por tu ayuda.'],
            ['한국어', '꾸미기 위해 산다', '도와줘서 고맙다'],
            ['그 밖에', '기한 · 방향 · 수신인', '경로 · 기간 · 교환'],
          ],
        },
        examples: [
          { es: 'Es un regalo para mi familia.', note: 'para — 누구를 위한 것인지 (대상)' },
          { es: 'Gracias por el regalo.', note: 'por — 무엇 때문에 고마운지 (이유)' },
          { es: 'Riego las plantas para cuidarlas.', note: 'para — 물을 주는 목적' },
          { es: 'caminar por el sendero', note: 'por — 산책로를 따라 (경로)' },
          { es: 'No como por la noche.', note: 'por — 밤이라는 시간대 동안' },
        ],
      },
      {
        heading: '통째로 외워두면 좋은 짝',
        paragraphs: [
          '규칙으로 설명하기 어렵고 그냥 굳어진 표현들입니다. 자주 쓰이니 문장째 익혀두면 편합니다.',
        ],
        examples: [
          { es: 'por favor', note: '부탁합니다' },
          { es: 'por aquí', note: '이 근처에' },
          { es: 'por la mañana', note: '아침에' },
          { es: 'para mí', note: '나에게는, 내 생각에는' },
          { es: 'antes de / después de', note: '~하기 전에 / ~한 후에' },
        ],
      },
      {
        heading: '축약은 두 가지뿐',
        paragraphs: [
          '스페인어에서 전치사와 관사가 합쳐지는 경우는 딱 두 가지입니다. 남성 단수 정관사 el을 만날 때만 일어나고, la·los·las 앞에서는 그대로 씁니다.',
        ],
        table: {
          headers: ['원래', '축약', '예'],
          rows: [
            ['a + el', 'al', 'Voy al gimnasio'],
            ['de + el', 'del', 'cerca del parque'],
            ['a + la', '(그대로)', 'Voy a la playa'],
            ['de + las', '(그대로)', 'antes de las ocho'],
          ],
        },
      },
    ],
  },
];
