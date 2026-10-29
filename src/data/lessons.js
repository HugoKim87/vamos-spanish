/**
 * 학습 데이터 (원본) — Day 단위로 누적 기록합니다.
 * ---------------------------------------------------------------
 * ⚠️ 새 Day 추가는 이 파일에만 하세요.
 *    테마 분류 · 카드 유형 · 통계 · 화면 문구는 전부 자동 계산됩니다.
 *
 * lesson 형식:
 *   { id, day, theme, emoji, title, subtitle, cards: [{ es, ko }] }
 *   - theme: taxonomy.js의 THEMES 키 중 하나
 *   - cards의 유형(단어/표현/문장/패턴)은 classifyCard()가 자동 판별
 */

export const lessons = [
  {
    id: 'day1',
    day: 1,
    theme: 'work',
    emoji: '🏢',
    title: '사무실',
    subtitle: '¿Qué hago en mi oficina?',
    cards: [
      {
        es: 'la oficina',
        ko: '사무실'
      },
      {
        es: 'el documento',
        ko: '문서'
      },
      {
        es: 'el informe',
        ko: '보고서'
      },
      {
        es: 'la solicitud',
        ko: '신청서'
      },
      {
        es: 'el formulario',
        ko: '양식, 서식'
      },
      {
        es: 'preparar',
        ko: '준비하다'
      },
      {
        es: 'imprimir',
        ko: '인쇄하다'
      },
      {
        es: 'firmar',
        ko: '서명하다'
      },
      {
        es: 'revisar',
        ko: '검토하다'
      },
      {
        es: 'enviar',
        ko: '보내다'
      },
      {
        es: 'archivar',
        ko: '문서를 보관하다, 철하다'
      },
      {
        es: 'rellenar',
        ko: '(양식을) 작성하다'
      },
      {
        es: 'Tengo que preparar el documento.',
        ko: '나는 문서를 준비해야 한다.'
      },
      {
        es: 'Estoy imprimiendo un informe.',
        ko: '나는 보고서를 인쇄하고 있다.'
      },
      {
        es: 'Voy a enviar el documento.',
        ko: '나는 문서를 보낼 것이다.'
      },
      {
        es: 'Puedo rellenar el formulario.',
        ko: '나는 양식을 작성할 수 있다.'
      }
    ]
  },
  {
    id: 'day2',
    day: 2,
    theme: 'food',
    emoji: '☕',
    title: '카페',
    subtitle: '¿Qué hago en la cafetería?',
    cards: [
      {
        es: 'la cafetería',
        ko: '카페'
      },
      {
        es: 'el café con leche',
        ko: '카페라떼'
      },
      {
        es: 'el té',
        ko: '차'
      },
      {
        es: 'el zumo',
        ko: '주스'
      },
      {
        es: 'la tarta',
        ko: '케이크, 타르트'
      },
      {
        es: 'la carta',
        ko: '메뉴판'
      },
      {
        es: 'la cuenta',
        ko: '계산서'
      },
      {
        es: 'la terraza',
        ko: '테라스'
      },
      {
        es: 'pedir un café',
        ko: '커피를 주문하다'
      },
      {
        es: 'elegir de la carta',
        ko: '메뉴판에서 고르다'
      },
      {
        es: 'tomar algo',
        ko: '뭔가를 마시다'
      },
      {
        es: 'sentarse en la terraza',
        ko: '테라스에 앉다'
      },
      {
        es: 'pagar la cuenta',
        ko: '계산하다'
      },
      {
        es: 'Voy a pedir un café con leche.',
        ko: '나는 카페라떼를 주문할 것이다.'
      },
      {
        es: 'Quiero sentarme cerca de la ventana.',
        ko: '나는 창가에 앉고 싶다.'
      },
      {
        es: '¿Me trae la carta, por favor?',
        ko: '메뉴판 좀 가져다주시겠어요?'
      }
    ]
  },
  {
    id: 'day3',
    day: 3,
    theme: 'leisure',
    emoji: '🌳',
    title: '공원',
    subtitle: '¿Qué hago en el parque?',
    cards: [
      {
        es: 'el parque',
        ko: '공원'
      },
      {
        es: 'el sendero',
        ko: '산책로, 오솔길'
      },
      {
        es: 'el perro',
        ko: '개'
      },
      {
        es: 'el picnic',
        ko: '피크닉'
      },
      {
        es: 'el aire libre',
        ko: '야외, 바깥 공기'
      },
      {
        es: 'caminar por el sendero',
        ko: '산책로를 따라 걷다'
      },
      {
        es: 'pasear al perro',
        ko: '개를 산책시키다'
      },
      {
        es: 'escuchar música',
        ko: '음악을 듣다'
      },
      {
        es: 'hacer ejercicio',
        ko: '운동하다'
      },
      {
        es: 'comer al aire libre',
        ko: '야외에서 먹다'
      },
      {
        es: 'hacer un picnic',
        ko: '피크닉을 하다'
      },
      {
        es: 'tomar una selfie',
        ko: '셀카를 찍다'
      },
      {
        es: 'andar',
        ko: '걷다'
      },
      {
        es: 'Voy a caminar por el sendero del parque.',
        ko: '나는 공원 산책로를 따라 걸을 것이다.'
      },
      {
        es: 'Tengo que pasear al perro en el parque.',
        ko: '나는 공원에서 개를 산책시켜야 한다.'
      },
      {
        es: 'Quiero hacer un picnic en el parque.',
        ko: '나는 공원에서 피크닉을 하고 싶다.'
      }
    ]
  },
  {
    id: 'day4',
    day: 4,
    theme: 'work',
    emoji: '📚',
    title: '도서관',
    subtitle: '¿Qué hago en la biblioteca?',
    cards: [
      {
        es: 'la biblioteca',
        ko: '도서관'
      },
      {
        es: 'el libro',
        ko: '책'
      },
      {
        es: 'el estante',
        ko: '책장, 서가'
      },
      {
        es: 'el carné',
        ko: '회원증, 카드'
      },
      {
        es: 'la sala de lectura',
        ko: '열람실'
      },
      {
        es: 'el silencio',
        ko: '정숙, 조용함'
      },
      {
        es: 'buscar un libro',
        ko: '책을 찾다'
      },
      {
        es: 'pedir prestado un libro',
        ko: '책을 대출하다'
      },
      {
        es: 'devolver el libro',
        ko: '책을 반납하다'
      },
      {
        es: 'leer en silencio',
        ko: '조용히 읽다'
      },
      {
        es: 'estudiar',
        ko: '공부하다'
      },
      {
        es: 'tomar apuntes',
        ko: '필기하다'
      },
      {
        es: 'guardar silencio',
        ko: '정숙을 지키다'
      },
      {
        es: 'Tengo que devolver el libro hoy.',
        ko: '나는 오늘 책을 반납해야 한다.'
      },
      {
        es: 'Voy a estudiar en la sala de lectura.',
        ko: '나는 열람실에서 공부할 것이다.'
      },
      {
        es: 'Hay que guardar silencio en la biblioteca.',
        ko: '도서관에서는 정숙해야 한다.'
      }
    ]
  },
  {
    id: 'day5',
    day: 5,
    theme: 'health',
    emoji: '🏋️',
    title: '헬스장',
    subtitle: '¿Qué hago en el gimnasio?',
    cards: [
      {
        es: 'la mochila',
        ko: '가방'
      },
      {
        es: 'las pesas',
        ko: '덤벨, 웨이트'
      },
      {
        es: 'la bicicleta estática',
        ko: '실내 자전거'
      },
      {
        es: 'la cinta',
        ko: '러닝머신'
      },
      {
        es: 'la ropa deportiva',
        ko: '운동복'
      },
      {
        es: 'la ducha',
        ko: '샤워, 샤워실'
      },
      {
        es: 'levantar pesas',
        ko: '덤벨을 들다'
      },
      {
        es: 'correr en la cinta',
        ko: '러닝머신에서 달리다'
      },
      {
        es: 'estirar el cuerpo',
        ko: '스트레칭하다'
      },
      {
        es: 'ducharse',
        ko: '샤워하다'
      },
      {
        es: 'Me gusta entrenar con pesas.',
        ko: '나는 웨이트 운동을 좋아한다.'
      }
    ]
  },
  {
    id: 'day6',
    day: 6,
    theme: 'work',
    emoji: '💻',
    title: '컴퓨터/사무',
    subtitle: '¿Qué hago con mi computadora?',
    cards: [
      {
        es: 'la computadora',
        ko: '컴퓨터'
      },
      {
        es: 'el correo electrónico',
        ko: '이메일'
      },
      {
        es: 'el documento',
        ko: '문서'
      },
      {
        es: 'el archivo',
        ko: '파일'
      },
      {
        es: 'encender / apagar',
        ko: '켜다 / 끄다'
      },
      {
        es: 'guardar',
        ko: '저장하다'
      },
      {
        es: 'enviar',
        ko: '보내다'
      },
      {
        es: 'adjuntar',
        ko: '첨부하다'
      },
      {
        es: 'descargar',
        ko: '다운로드하다'
      },
      {
        es: 'responder el correo',
        ko: '이메일에 답장하다'
      },
      {
        es: 'navegar por internet',
        ko: '인터넷을 검색하다'
      }
    ]
  },
  {
    id: 'day7',
    day: 7,
    theme: 'food',
    emoji: '🥕',
    title: '채소 손질',
    subtitle: '¿Qué hago con las verduras? 1',
    cards: [
      {
        es: 'la verdura',
        ko: '채소'
      },
      {
        es: 'la cebolla',
        ko: '양파'
      },
      {
        es: 'la zanahoria',
        ko: '당근'
      },
      {
        es: 'la patata',
        ko: '감자'
      },
      {
        es: 'la lechuga',
        ko: '상추'
      },
      {
        es: 'lavar',
        ko: '씻다'
      },
      {
        es: 'pelar',
        ko: '껍질을 벗기다'
      },
      {
        es: 'cortar',
        ko: '자르다'
      },
      {
        es: 'picar',
        ko: '잘게 다지다'
      },
      {
        es: 'cortar en tiras',
        ko: '채썰다'
      },
      {
        es: 'guardar en la nevera',
        ko: '냉장고에 넣다'
      }
    ]
  },
  {
    id: 'day8',
    day: 8,
    theme: 'food',
    emoji: '🍳',
    title: '주방/요리',
    subtitle: '¿Qué hago con las verduras? 2',
    cards: [
      {
        es: 'la sartén',
        ko: '후라이팬'
      },
      {
        es: 'la olla',
        ko: '냄비'
      },
      {
        es: 'el horno',
        ko: '오븐'
      },
      {
        es: 'la sal',
        ko: '소금'
      },
      {
        es: 'el aceite',
        ko: '기름'
      },
      {
        es: 'freír',
        ko: '튀기다, 볶다'
      },
      {
        es: 'saltear',
        ko: '살짝 볶다'
      },
      {
        es: 'hervir',
        ko: '삶다, 끓이다'
      },
      {
        es: 'hornear',
        ko: '오븐에 굽다'
      },
      {
        es: 'mezclar',
        ko: '섞다'
      },
      {
        es: 'Empiezo a cocinar.',
        ko: '나는 요리를 시작한다.'
      }
    ]
  },
  {
    id: 'day9',
    day: 9,
    theme: 'home',
    emoji: '🎒',
    title: '소지품 (일상)',
    subtitle: '¿Qué tengo en mi bolso?',
    cards: [
      {
        es: 'el bolso',
        ko: '가방'
      },
      {
        es: 'las llaves',
        ko: '열쇠'
      },
      {
        es: 'el móvil',
        ko: '휴대폰'
      },
      {
        es: 'la cartera',
        ko: '지갑'
      },
      {
        es: 'los auriculares',
        ko: '이어폰'
      },
      {
        es: 'el paraguas',
        ko: '우산'
      },
      {
        es: 'el libro',
        ko: '책'
      },
      {
        es: 'las gafas',
        ko: '안경'
      },
      {
        es: 'la botella',
        ko: '물병'
      },
      {
        es: 'el pañuelo',
        ko: '손수건'
      },
      {
        es: 'el bolígrafo',
        ko: '볼펜'
      },
      {
        es: 'el espejo',
        ko: '거울'
      }
    ]
  },
  {
    id: 'day10',
    day: 10,
    theme: 'travel',
    emoji: '👜',
    title: '소지품 (여행)',
    subtitle: '¿Qué llevo en mi maleta?',
    cards: [
      {
        es: 'el pasaporte',
        ko: '여권'
      },
      {
        es: 'el DNI',
        ko: '신분증'
      },
      {
        es: 'el efectivo',
        ko: '현금'
      },
      {
        es: 'la tarjeta de crédito',
        ko: '신용카드'
      },
      {
        es: 'la tarjeta de embarque',
        ko: '탑승권'
      },
      {
        es: 'el mapa',
        ko: '지도'
      },
      {
        es: 'la guía',
        ko: '가이드북'
      },
      {
        es: 'el cargador',
        ko: '충전기'
      },
      {
        es: 'la maleta',
        ko: '캐리어'
      },
      {
        es: 'el billete',
        ko: '티켓, 표'
      },
      {
        es: 'la cámara',
        ko: '카메라'
      },
      {
        es: 'el seguro de viaje',
        ko: '여행자 보험'
      }
    ]
  },
  {
    id: 'day11',
    day: 11,
    theme: 'travel',
    emoji: '✈️',
    title: '공항',
    subtitle: '¿Qué hago en el aeropuerto?',
    cards: [
      {
        es: 'el aeropuerto',
        ko: '공항'
      },
      {
        es: 'el vuelo',
        ko: '비행'
      },
      {
        es: 'el equipaje',
        ko: '수하물, 짐'
      },
      {
        es: 'la puerta de embarque',
        ko: '탑승구'
      },
      {
        es: 'facturar el equipaje',
        ko: '수하물을 부치다'
      },
      {
        es: 'embarcar',
        ko: '탑승하다'
      },
      {
        es: 'recoger el equipaje',
        ko: '수하물을 찾다'
      },
      {
        es: 'hacer cola',
        ko: '줄을 서다'
      },
      {
        es: 'pasar el control',
        ko: '보안 검색을 통과하다'
      },
      {
        es: 'aterrizar',
        ko: '착륙하다'
      },
      {
        es: 'despegar',
        ko: '이륙하다'
      }
    ]
  },
  {
    id: 'day12',
    day: 12,
    theme: 'travel',
    emoji: '🏖️',
    title: '해변',
    subtitle: '¿Qué hago en la playa?',
    cards: [
      {
        es: 'la playa',
        ko: '해변'
      },
      {
        es: 'el mar',
        ko: '바다'
      },
      {
        es: 'el sol',
        ko: '태양'
      },
      {
        es: 'la arena',
        ko: '모래'
      },
      {
        es: 'nadar en la playa',
        ko: '해변에서 수영하다'
      },
      {
        es: 'tomar el sol',
        ko: '일광욕하다'
      },
      {
        es: 'tomar fotos',
        ko: '사진을 찍다'
      },
      {
        es: 'meterse en el agua',
        ko: '물에 들어가다'
      },
      {
        es: 'protegerse',
        ko: '자신을 보호하다'
      },
      {
        es: 'secarse',
        ko: '몸을 말리다'
      },
      {
        es: 'la sombrilla',
        ko: '파라솔'
      },
      {
        es: 'el protector solar',
        ko: '선크림'
      }
    ]
  },
  {
    id: 'day13',
    day: 13,
    theme: 'shopping',
    emoji: '🛒',
    title: '마트',
    subtitle: '¿Qué hago en el supermercado?',
    cards: [
      {
        es: 'el supermercado',
        ko: '슈퍼마켓'
      },
      {
        es: 'el carrito',
        ko: '카트'
      },
      {
        es: 'la lista de compras',
        ko: '쇼핑 리스트'
      },
      {
        es: 'el pasillo',
        ko: '진열대 통로'
      },
      {
        es: 'la caja',
        ko: '계산대'
      },
      {
        es: 'comprar',
        ko: '사다'
      },
      {
        es: 'pagar',
        ko: '결제하다'
      },
      {
        es: 'devolver',
        ko: '반품하다'
      },
      {
        es: 'la oferta',
        ko: '할인, 행사'
      },
      {
        es: 'la bolsa',
        ko: '봉투'
      },
      {
        es: 'el recibo',
        ko: '영수증'
      },
      {
        es: 'hacer la compra',
        ko: '장을 보다'
      }
    ]
  },
  {
    id: 'day14',
    day: 14,
    theme: 'health',
    emoji: '🏥',
    title: '병원',
    subtitle: '¿Qué hago en el hospital?',
    cards: [
      {
        es: 'el hospital',
        ko: '병원'
      },
      {
        es: 'el médico',
        ko: '의사'
      },
      {
        es: 'la enfermera',
        ko: '간호사'
      },
      {
        es: 'el síntoma',
        ko: '증상'
      },
      {
        es: 'la receta',
        ko: '처방전'
      },
      {
        es: 'la cita',
        ko: '예약, 진료 약속'
      },
      {
        es: 'estar enfermo',
        ko: '아프다'
      },
      {
        es: 'tomar la temperatura',
        ko: '체온을 재다'
      },
      {
        es: 'examinar',
        ko: '진찰하다'
      },
      {
        es: 'recetar',
        ko: '처방하다'
      },
      {
        es: 'la sala de espera',
        ko: '대기실'
      },
      {
        es: 'pedir cita',
        ko: '진료 예약을 하다'
      }
    ]
  },
  {
    id: 'day15',
    day: 15,
    theme: 'leisure',
    emoji: '☕',
    title: '주말',
    subtitle: '¿Qué hago el fin de semana?',
    cards: [
      {
        es: 'el fin de semana',
        ko: '주말'
      },
      {
        es: 'la cafetería',
        ko: '카페'
      },
      {
        es: 'el parque',
        ko: '공원'
      },
      {
        es: 'descansar',
        ko: '쉬다'
      },
      {
        es: 'quedar con amigos',
        ko: '친구와 만나기로 하다'
      },
      {
        es: 'tomar un café',
        ko: '커피 한 잔 마시다'
      },
      {
        es: 'dar un paseo',
        ko: '산책하다'
      },
      {
        es: 'ver una película',
        ko: '영화를 보다'
      },
      {
        es: 'salir a cenar',
        ko: '저녁 먹으러 나가다'
      },
      {
        es: 'pasar tiempo en casa',
        ko: '집에서 시간을 보내다'
      },
      {
        es: 'dormir hasta tarde',
        ko: '늦잠을 자다'
      },
      {
        es: 'hacer las tareas del hogar',
        ko: '집안일을 하다'
      }
    ]
  },
  {
    id: 'day16',
    day: 16,
    theme: 'people',
    emoji: '👨‍👩‍👧',
    title: '가족',
    subtitle: '¿Quiénes son mi familia?',
    cards: [
      {
        es: 'el padre',
        ko: '아버지'
      },
      {
        es: 'la madre',
        ko: '어머니'
      },
      {
        es: 'el hermano',
        ko: '남자 형제'
      },
      {
        es: 'la hermana',
        ko: '여자 형제'
      },
      {
        es: 'el hijo',
        ko: '아들'
      },
      {
        es: 'la hija',
        ko: '딸'
      },
      {
        es: 'el novio',
        ko: '남자친구'
      },
      {
        es: 'la novia',
        ko: '여자친구'
      },
      {
        es: 'el amigo',
        ko: '친구 (남)'
      },
      {
        es: 'la pareja',
        ko: '연인, 파트너'
      },
      {
        es: 'el abuelo',
        ko: '할아버지'
      },
      {
        es: 'la abuela',
        ko: '할머니'
      }
    ]
  },
  {
    id: 'day17',
    day: 17,
    theme: 'people',
    emoji: '🤗',
    title: '누구랑?',
    subtitle: '¿Con quién estoy?',
    cards: [
      {
        es: 'Estoy con mi familia.',
        ko: '나는 가족과 함께 있다.'
      },
      {
        es: 'Estoy con mis amigos.',
        ko: '나는 친구들과 함께 있다.'
      },
      {
        es: 'Estoy con mi pareja.',
        ko: '나는 연인과 함께 있다.'
      },
      {
        es: 'Estoy solo.',
        ko: '나는 혼자이다. (남)'
      },
      {
        es: 'Estoy sola.',
        ko: '나는 혼자이다. (여)'
      },
      {
        es: 'Voy con mi hermano.',
        ko: '나는 형/오빠와 함께 간다.'
      },
      {
        es: 'Hablo con mi madre.',
        ko: '나는 어머니와 이야기한다.'
      },
      {
        es: 'Vivo con mis padres.',
        ko: '나는 부모님과 산다.'
      },
      {
        es: 'Trabajo con mi jefe.',
        ko: '나는 상사와 일한다.'
      },
      {
        es: 'Salgo con mis amigos.',
        ko: '나는 친구들과 외출한다.'
      },
      {
        es: 'Estudio con mi compañero.',
        ko: '나는 동료와 공부한다.'
      },
      {
        es: 'Como con mi familia.',
        ko: '나는 가족과 함께 식사한다.'
      }
    ]
  },
  {
    id: 'day18',
    day: 18,
    theme: 'travel',
    emoji: '🌴',
    title: '휴가',
    subtitle: '¿Qué hago en las vacaciones?',
    cards: [
      {
        es: 'las vacaciones',
        ko: '휴가, 방학'
      },
      {
        es: 'el extranjero',
        ko: '해외'
      },
      {
        es: 'el senderismo',
        ko: '하이킹, 등산'
      },
      {
        es: 'viajar al extranjero',
        ko: '해외여행을 가다'
      },
      {
        es: 'visitar una ciudad',
        ko: '도시를 방문하다'
      },
      {
        es: 'sacar fotos',
        ko: '사진을 찍다'
      },
      {
        es: 'descansar en la playa',
        ko: '해변에서 쉬다'
      },
      {
        es: 'hacer senderismo',
        ko: '하이킹하다'
      },
      {
        es: 'relajarse',
        ko: '휴식을 취하다'
      },
      {
        es: 'quedarse en casa',
        ko: '집에 머무르다'
      },
      {
        es: 'reservar un hotel',
        ko: '호텔을 예약하다'
      },
      {
        es: 'hacer turismo',
        ko: '관광하다'
      }
    ]
  },
  {
    id: 'day19',
    day: 19,
    theme: 'home',
    emoji: '🏦',
    title: '은행',
    subtitle: '¿Qué hago en el banco?',
    cards: [
      {
        es: 'el banco',
        ko: '은행'
      },
      {
        es: 'la cuenta',
        ko: '계좌'
      },
      {
        es: 'el cajero automático',
        ko: 'ATM'
      },
      {
        es: 'la tarjeta',
        ko: '카드'
      },
      {
        es: 'el dinero',
        ko: '돈'
      },
      {
        es: 'depositar',
        ko: '입금하다'
      },
      {
        es: 'retirar',
        ko: '출금하다'
      },
      {
        es: 'cambiar dinero',
        ko: '환전하다'
      },
      {
        es: 'transferir',
        ko: '송금하다'
      },
      {
        es: 'abrir una cuenta',
        ko: '계좌를 개설하다'
      },
      {
        es: 'la comisión',
        ko: '수수료'
      },
      {
        es: 'consultar el saldo',
        ko: '잔액을 조회하다'
      }
    ]
  },
  {
    id: 'day20',
    day: 20,
    theme: 'leisure',
    emoji: '🎬',
    title: '영화관',
    subtitle: '¿Qué hago en el cine?',
    cards: [
      {
        es: 'el cine',
        ko: '영화관'
      },
      {
        es: 'la entrada',
        ko: '티켓'
      },
      {
        es: 'la pantalla',
        ko: '스크린'
      },
      {
        es: 'las palomitas',
        ko: '팝콘'
      },
      {
        es: 'la bebida',
        ko: '음료'
      },
      {
        es: 'el asiento',
        ko: '좌석'
      },
      {
        es: 'comprar una entrada',
        ko: '티켓을 사다'
      },
      {
        es: 'reservar una entrada',
        ko: '티켓을 예매하다'
      },
      {
        es: 'ver una película',
        ko: '영화를 보다'
      },
      {
        es: 'sentarse en el asiento',
        ko: '좌석에 앉다'
      },
      {
        es: 'salir del cine',
        ko: '영화관에서 나오다'
      }
    ]
  },
  {
    id: 'day21',
    day: 21,
    theme: 'shopping',
    emoji: '👗',
    title: '옷가게',
    subtitle: '¿Qué hago en la tienda de ropa?',
    cards: [
      {
        es: 'la ropa',
        ko: '옷'
      },
      {
        es: 'la talla',
        ko: '사이즈'
      },
      {
        es: 'el probador',
        ko: '탈의실'
      },
      {
        es: 'el espejo',
        ko: '거울'
      },
      {
        es: 'el dependiente',
        ko: '직원 (남)'
      },
      {
        es: 'probarse la ropa',
        ko: '옷을 입어보다'
      },
      {
        es: 'pagar con tarjeta',
        ko: '카드로 결제하다'
      },
      {
        es: 'pagar en efectivo',
        ko: '현금으로 결제하다'
      },
      {
        es: 'Me queda bien.',
        ko: '잘 맞아요.'
      },
      {
        es: 'Me queda grande.',
        ko: '사이즈가 커요.'
      },
      {
        es: '¿Qué talla usas?',
        ko: '무슨 사이즈 입으세요?'
      },
      {
        es: 'Solo estoy mirando.',
        ko: '그냥 구경 중이에요.'
      }
    ]
  },
  {
    id: 'day22',
    day: 22,
    theme: 'health',
    emoji: '💊',
    title: '약국',
    subtitle: '¿Qué hago en la farmacia?',
    cards: [
      {
        es: 'la farmacia',
        ko: '약국'
      },
      {
        es: 'el medicamento',
        ko: '약'
      },
      {
        es: 'la pastilla',
        ko: '알약'
      },
      {
        es: 'el jarabe',
        ko: '시럽 (물약)'
      },
      {
        es: 'la pomada',
        ko: '연고'
      },
      {
        es: 'la tirita',
        ko: '일회용 밴드'
      },
      {
        es: 'el dolor de cabeza',
        ko: '두통'
      },
      {
        es: 'el dolor de garganta',
        ko: '인후통'
      },
      {
        es: 'la tos',
        ko: '기침'
      },
      {
        es: 'la fiebre',
        ko: '열'
      },
      {
        es: 'Tengo dolor de cabeza.',
        ko: '나는 머리가 아파요.'
      },
      {
        es: '¿Tiene algo para la tos?',
        ko: '기침에 듣는 약 있나요?'
      }
    ]
  },
  {
    id: 'day23',
    day: 23,
    theme: 'travel',
    emoji: '🏨',
    title: '호텔',
    subtitle: '¿Qué hago en el hotel?',
    cards: [
      {
        es: 'el hotel',
        ko: '호텔'
      },
      {
        es: 'la recepción',
        ko: '리셉션'
      },
      {
        es: 'la habitación',
        ko: '객실'
      },
      {
        es: 'la reserva',
        ko: '예약'
      },
      {
        es: 'la llave',
        ko: '열쇠, 카드키'
      },
      {
        es: 'el desayuno',
        ko: '조식'
      },
      {
        es: 'hacer el check-in',
        ko: '체크인하다'
      },
      {
        es: 'hacer el check-out',
        ko: '체크아웃하다'
      },
      {
        es: 'dejar el equipaje',
        ko: '짐을 맡기다'
      },
      {
        es: 'No funciona.',
        ko: '작동이 안돼요.'
      },
      {
        es: 'Quisiera otra habitación.',
        ko: '다른 객실을 원합니다.'
      }
    ]
  },
  {
    id: 'day24',
    day: 24,
    theme: 'shopping',
    emoji: '🥩',
    title: '정육점',
    subtitle: '¿Qué hago en la carnicería?',
    cards: [
      {
        es: 'la carne de res',
        ko: '소고기'
      },
      {
        es: 'la carne de cerdo',
        ko: '돼지고기'
      },
      {
        es: 'el pollo',
        ko: '닭고기'
      },
      {
        es: 'la pechuga',
        ko: '닭가슴살'
      },
      {
        es: 'el muslo',
        ko: '닭 허벅지'
      },
      {
        es: 'las costillas',
        ko: '갈비'
      },
      {
        es: 'la carne picada',
        ko: '다진 고기'
      },
      {
        es: 'tierna',
        ko: '연한'
      },
      {
        es: 'dura',
        ko: '질긴'
      },
      {
        es: 'un kilo de carne',
        ko: '고기 1kg'
      },
      {
        es: 'medio kilo',
        ko: '500g, 반 킬로'
      },
      {
        es: 'Deme pechuga de pollo.',
        ko: '닭가슴살 주세요.'
      }
    ]
  },
  {
    id: 'day25',
    day: 25,
    theme: 'shopping',
    emoji: '👠',
    title: '신발가게',
    subtitle: '¿Qué hago en la zapatería?',
    cards: [
      {
        es: 'los zapatos',
        ko: '구두'
      },
      {
        es: 'los tenis',
        ko: '운동화'
      },
      {
        es: 'las sandalias',
        ko: '샌들'
      },
      {
        es: 'las botas',
        ko: '부츠'
      },
      {
        es: 'las bailarinas',
        ko: '플랫슈즈'
      },
      {
        es: 'el tacón',
        ko: '굽'
      },
      {
        es: 'el tacón alto',
        ko: '하이힐, 높은 굽'
      },
      {
        es: 'zapatos planos',
        ko: '굽이 없는 신발'
      },
      {
        es: 'el número',
        ko: '사이즈 (신발)'
      },
      {
        es: 'probarse los zapatos',
        ko: '신발을 신어보다'
      },
      {
        es: 'Me quedan bien.',
        ko: '잘 맞아요.'
      },
      {
        es: 'Me quedan grandes.',
        ko: '사이즈가 커요.'
      },
      {
        es: 'Son cómodos.',
        ko: '편해요.'
      },
      {
        es: '¿Qué número usa?',
        ko: '사이즈가 어떻게 되세요?'
      },
      {
        es: 'Busco zapatos de tacón medio.',
        ko: '중간 굽 신발을 찾고 있어요.'
      }
    ]
  },
  {
    id: 'day26',
    day: 26,
    theme: 'shopping',
    emoji: '💍',
    title: '보석점',
    subtitle: '¿Qué hago en la joyería?',
    cards: [
      {
        es: 'la joya',
        ko: '보석'
      },
      {
        es: 'el anillo',
        ko: '반지'
      },
      {
        es: 'el collar',
        ko: '목걸이'
      },
      {
        es: 'los pendientes',
        ko: '귀걸이 (항상 복수)'
      },
      {
        es: 'la pulsera',
        ko: '팔찌'
      },
      {
        es: 'el oro',
        ko: '금'
      },
      {
        es: 'la plata',
        ko: '은'
      },
      {
        es: 'el diamante',
        ko: '다이아몬드'
      },
      {
        es: 'el regalo',
        ko: '선물'
      },
      {
        es: 'un anillo de oro',
        ko: '금반지'
      },
      {
        es: 'regalar joyas',
        ko: '보석을 선물하다'
      },
      {
        es: 'Le voy a regalar joyas.',
        ko: '그(녀)에게 보석을 선물할 것이다.'
      },
      {
        es: 'Me gustan los pendientes con diamantes.',
        ko: '다이아 박힌 귀걸이를 좋아한다.'
      }
    ]
  },
  {
    id: 'day27',
    day: 27,
    theme: 'leisure',
    emoji: '🎬',
    title: '영화 장르',
    subtitle: '¿Qué tipo de película te gusta?',
    cards: [
      {
        es: 'películas de acción',
        ko: '액션 영화'
      },
      {
        es: 'películas de comedia',
        ko: '코미디 영화'
      },
      {
        es: 'películas románticas',
        ko: '로맨스 영화'
      },
      {
        es: 'películas de terror',
        ko: '공포 영화'
      },
      {
        es: 'películas de ciencia ficción',
        ko: 'SF 영화'
      },
      {
        es: 'películas de animación',
        ko: '애니메이션 영화'
      },
      {
        es: 'Me gusta la comedia.',
        ko: '나는 코미디를 좋아한다. (단수)'
      },
      {
        es: 'Me gustan las películas de acción.',
        ko: '나는 액션 영화들을 좋아한다. (복수)'
      },
      {
        es: 'porque son emocionantes',
        ko: '흥미진진해서'
      },
      {
        es: 'porque son divertidas',
        ko: '재미있어서'
      },
      {
        es: '¿Te gustan las películas de terror?',
        ko: '공포 영화 좋아해?'
      },
      {
        es: 'No me gustan las películas de terror.',
        ko: '나는 공포 영화를 좋아하지 않는다.'
      }
    ]
  },
  {
    id: 'day28',
    day: 28,
    theme: 'leisure',
    emoji: '🎵',
    title: '음악 장르',
    subtitle: '¿Qué tipo de música escuchas?',
    cards: [
      {
        es: 'el pop',
        ko: '팝'
      },
      {
        es: 'el rock',
        ko: '락'
      },
      {
        es: 'el hip-hop',
        ko: '힙합'
      },
      {
        es: 'la música clásica',
        ko: '클래식 음악'
      },
      {
        es: 'el jazz',
        ko: '재즈'
      },
      {
        es: 'el reggaetón',
        ko: '레게톤'
      },
      {
        es: 'la música electrónica',
        ko: '전자 음악'
      },
      {
        es: 'el K-pop',
        ko: '케이팝'
      },
      {
        es: 'Escucho música.',
        ko: '나는 음악을 듣는다.'
      },
      {
        es: 'Me encanta la música clásica.',
        ko: '나는 클래식 음악을 정말 좋아한다.'
      },
      {
        es: 'Me encantan las comedias.',
        ko: '나는 코미디를 정말 좋아한다. (복수)'
      },
      {
        es: 'Escucho jazz cuando estudio.',
        ko: '공부할 때 재즈를 듣는다.'
      },
      {
        es: 'Escucho música cuando trabajo.',
        ko: '일할 때 음악을 듣는다.'
      }
    ]
  },
  {
    id: 'day29',
    day: 29,
    theme: 'food',
    emoji: '😋',
    title: '맛/풍미',
    subtitle: '¿Qué sabor tiene?',
    cards: [
      {
        es: 'dulce',
        ko: '달콤한'
      },
      {
        es: 'salado',
        ko: '짠'
      },
      {
        es: 'ácido',
        ko: '신'
      },
      {
        es: 'amargo',
        ko: '쓴'
      },
      {
        es: 'picante',
        ko: '매운'
      },
      {
        es: 'fresco',
        ko: '신선한, 상쾌한'
      },
      {
        es: 'ligero',
        ko: '가벼운, 부담없는'
      },
      {
        es: 'suave',
        ko: '부드러운'
      },
      {
        es: 'crujiente',
        ko: '바삭한'
      },
      {
        es: 'rico',
        ko: '맛있다'
      },
      {
        es: 'riquísimo',
        ko: '정말 맛있다 (최상급)'
      },
      {
        es: 'delicioso',
        ko: '맛있다 (격식)'
      },
      {
        es: 'exquisito',
        ko: '풍미가 훌륭한'
      },
      {
        es: 'Está delicioso.',
        ko: '맛있어요. (지금)'
      },
      {
        es: 'El chocolate es muy dulce.',
        ko: '초콜릿은 매우 달다. (본질)'
      }
    ]
  },
  {
    id: 'day30',
    day: 30,
    theme: 'health',
    emoji: '💪',
    title: '건강 관리',
    subtitle: '¿Qué hago para mi salud?',
    cards: [
      {
        es: 'la salud',
        ko: '건강'
      },
      {
        es: 'sano',
        ko: '건강한 (남)'
      },
      {
        es: 'la comida rápida',
        ko: '패스트푸드'
      },
      {
        es: 'la rutina',
        ko: '루틴'
      },
      {
        es: 'hacer ejercicio',
        ko: '운동하다'
      },
      {
        es: 'ir al gimnasio',
        ko: '헬스장에 가다'
      },
      {
        es: 'hacer yoga',
        ko: '요가하다'
      },
      {
        es: 'comer sano',
        ko: '건강하게 먹다'
      },
      {
        es: 'beber mucha agua',
        ko: '물을 많이 마시다'
      },
      {
        es: 'evitar comida rápida',
        ko: '패스트푸드를 피하다'
      },
      {
        es: 'dormir bien',
        ko: '잘 자다'
      },
      {
        es: 'cuidarse',
        ko: '자기 건강을 챙기다'
      },
      {
        es: 'para mi salud',
        ko: '나의 건강을 위해'
      },
      {
        es: 'Me cuido mucho.',
        ko: '나는 건강을 많이 챙긴다.'
      }
    ]
  },
  {
    id: 'day31',
    day: 31,
    theme: 'home',
    emoji: '😴',
    title: '자기 전 루틴',
    subtitle: '¿Qué hago antes de dormir?',
    cards: [
      {
        es: 'la cara',
        ko: '얼굴'
      },
      {
        es: 'los dientes',
        ko: '치아'
      },
      {
        es: 'el pijama',
        ko: '잠옷'
      },
      {
        es: 'lavarse la cara',
        ko: '세수하다'
      },
      {
        es: 'cepillarse los dientes',
        ko: '양치하다'
      },
      {
        es: 'ducharse',
        ko: '샤워하다'
      },
      {
        es: 'ponerse el pijama',
        ko: '잠옷을 입다'
      },
      {
        es: 'acostarse',
        ko: '잠자리에 들다'
      },
      {
        es: 'dormirse',
        ko: '잠들어 버리다'
      },
      {
        es: 'usar el móvil',
        ko: '휴대폰을 사용하다'
      },
      {
        es: 'ver videos',
        ko: '영상을 보다'
      },
      {
        es: 'antes de dormir',
        ko: '자기 전에'
      },
      {
        es: 'Me lavo la cara antes de dormir.',
        ko: '나는 자기 전에 세수한다.'
      },
      {
        es: 'Siempre me ducho antes de dormir.',
        ko: '나는 항상 자기 전에 샤워한다.'
      }
    ]
  },
  {
    id: 'day32',
    day: 32,
    theme: 'food',
    emoji: '🍔',
    title: '배고플 때',
    subtitle: '¿Qué compro cuando tengo hambre?',
    cards: [
      {
        es: 'una hamburguesa',
        ko: '햄버거'
      },
      {
        es: 'las patatas fritas',
        ko: '감자튀김'
      },
      {
        es: 'el pollo frito',
        ko: '치킨'
      },
      {
        es: 'una pizza',
        ko: '피자'
      },
      {
        es: 'un sándwich',
        ko: '샌드위치'
      },
      {
        es: 'un perrito caliente',
        ko: '핫도그'
      },
      {
        es: 'una ensalada',
        ko: '샐러드'
      },
      {
        es: 'un croissant',
        ko: '크로아상'
      },
      {
        es: 'el pan',
        ko: '빵'
      },
      {
        es: 'un pastel',
        ko: '케이크'
      },
      {
        es: 'ramen',
        ko: '라면'
      },
      {
        es: 'Tengo hambre.',
        ko: '나는 배고프다.'
      },
      {
        es: 'Tengo sed.',
        ko: '나는 목마르다.'
      },
      {
        es: 'Tengo sueño.',
        ko: '나는 졸리다.'
      },
      {
        es: 'saltarse el desayuno',
        ko: '아침을 거르다'
      },
      {
        es: 'Cuando tengo hambre, compro pizza.',
        ko: '배고플 때 피자를 산다.'
      }
    ]
  },
  {
    id: 'day33',
    day: 33,
    theme: 'leisure',
    emoji: '🎨',
    title: '취미',
    subtitle: '¿Cuál es mi pasatiempo favorito?',
    cards: [
      {
        es: 'el pasatiempo',
        ko: '취미'
      },
      {
        es: 'la música',
        ko: '음악'
      },
      {
        es: 'los libros',
        ko: '책 (복수)'
      },
      {
        es: 'los deportes',
        ko: '운동, 스포츠'
      },
      {
        es: 'los videojuegos',
        ko: '비디오 게임'
      },
      {
        es: 'escuchar música',
        ko: '음악을 듣다'
      },
      {
        es: 'ver películas',
        ko: '영화를 보다'
      },
      {
        es: 'leer libros',
        ko: '책을 읽다'
      },
      {
        es: 'viajar',
        ko: '여행하다'
      },
      {
        es: 'cocinar',
        ko: '요리하다'
      },
      {
        es: 'bailar',
        ko: '춤추다'
      },
      {
        es: 'hacer ejercicio',
        ko: '운동하다'
      },
      {
        es: 'jugar videojuegos',
        ko: '게임을 하다'
      },
      {
        es: 'divertido',
        ko: '재미있는'
      },
      {
        es: 'relajante',
        ko: '편안한, 마음이 차분해지는'
      },
      {
        es: 'interesante',
        ko: '흥미로운'
      },
      {
        es: 'emocionante',
        ko: '신나는, 흥분되는'
      },
      {
        es: 'Mi pasatiempo favorito es escuchar música.',
        ko: '내가 가장 좋아하는 취미는 음악 듣기이다.'
      },
      {
        es: 'Mi pasatiempo favorito es viajar.',
        ko: '내가 가장 좋아하는 취미는 여행이다.'
      },
      {
        es: 'Mi pasatiempo favorito es cocinar.',
        ko: '내가 가장 좋아하는 취미는 요리이다.'
      },
      {
        es: 'Mi pasatiempo favorito es leer libros.',
        ko: '내가 가장 좋아하는 취미는 독서이다.'
      },
      {
        es: 'Mi pasatiempo favorito es viajar porque es divertido.',
        ko: '내가 가장 좋아하는 취미는 여행인데, 재미있기 때문이다.'
      },
      {
        es: 'Mi pasatiempo favorito es cocinar porque es relajante.',
        ko: '내가 가장 좋아하는 취미는 요리인데, 편안하기 때문이다.'
      },
      {
        es: '¿Cuál es tu pasatiempo favorito?',
        ko: '너의 취미는 무엇이야?'
      }
    ]
  },
  {
    id: 'day34',
    day: 34,
    theme: 'leisure',
    emoji: '📺',
    title: '유튜브',
    subtitle: '¿Qué veo en YouTube?',
    cards: [
      {
        es: 'el canal',
        ko: '채널'
      },
      {
        es: 'el video',
        ko: '영상'
      },
      {
        es: 'los videos musicales',
        ko: '뮤직비디오'
      },
      {
        es: 'los videos de conciertos',
        ko: '콘서트 영상'
      },
      {
        es: 'los videos de cocina',
        ko: '요리 영상'
      },
      {
        es: 'los videos de recetas',
        ko: '레시피 영상'
      },
      {
        es: 'los videos de viajes',
        ko: '여행 영상, 여행 브이로그'
      },
      {
        es: 'los videos en español',
        ko: '스페인어 영상'
      },
      {
        es: 'los videos educativos',
        ko: '교육 영상'
      },
      {
        es: 'los videos de maquillaje',
        ko: '메이크업 영상'
      },
      {
        es: 'los videos de moda',
        ko: '패션 영상'
      },
      {
        es: 'ver',
        ko: '보다'
      },
      {
        es: 'buscar',
        ko: '찾다, 검색하다'
      },
      {
        es: 'seguir un canal',
        ko: '채널을 구독하다'
      },
      {
        es: 'suscribirse',
        ko: '구독하다'
      },
      {
        es: 'aprender',
        ko: '배우다'
      },
      {
        es: 'Veo videos musicales en YouTube.',
        ko: '나는 유튜브에서 뮤직비디오를 본다.'
      },
      {
        es: 'Veo videos de moda en YouTube.',
        ko: '나는 유튜브에서 패션 영상을 본다.'
      },
      {
        es: 'Aprendo español en YouTube.',
        ko: '나는 유튜브에서 스페인어를 배운다.'
      },
      {
        es: 'Voy a ver videos de maquillaje en YouTube.',
        ko: '나는 유튜브에서 메이크업 영상을 볼 것이다.'
      },
      {
        es: 'Me gusta ver videos educativos en YouTube.',
        ko: '나는 유튜브에서 교육 영상 보는 것을 좋아한다.'
      },
      {
        es: 'Quiero ver videos musicales en YouTube.',
        ko: '나는 유튜브에서 뮤직비디오를 보고 싶다.'
      },
      {
        es: 'Sigo un canal de cocina.',
        ko: '나는 요리 채널을 구독한다.'
      },
      {
        es: '¿Qué ves en YouTube?',
        ko: '너는 유튜브에서 뭘 봐?'
      }
    ]
  },
  {
    id: 'day35',
    day: 35,
    theme: 'travel',
    emoji: '🛗',
    title: '층/엘리베이터',
    subtitle: '¿A qué piso voy?',
    cards: [
      {
        es: 'el piso',
        ko: '층, 바닥; 아파트'
      },
      {
        es: 'la planta',
        ko: '층 (스페인에서 자주 씀)'
      },
      {
        es: 'el ascensor',
        ko: '엘리베이터'
      },
      {
        es: 'las escaleras',
        ko: '계단'
      },
      {
        es: 'la habitación',
        ko: '방'
      },
      {
        es: 'subir',
        ko: '올라가다'
      },
      {
        es: 'bajar',
        ko: '내려가다'
      },
      {
        es: 'ir',
        ko: '가다'
      },
      {
        es: 'trabajar',
        ko: '일하다'
      },
      {
        es: 'esperar',
        ko: '기다리다'
      },
      {
        es: 'tomar el ascensor',
        ko: '엘리베이터를 타다'
      },
      {
        es: 'el primer piso',
        ko: '1층 (primero→primer)'
      },
      {
        es: 'el segundo piso',
        ko: '2층'
      },
      {
        es: 'el tercer piso',
        ko: '3층 (tercero→tercer)'
      },
      {
        es: 'el cuarto piso',
        ko: '4층'
      },
      {
        es: 'el quinto piso',
        ko: '5층'
      },
      {
        es: 'el sexto piso',
        ko: '6층'
      },
      {
        es: 'el séptimo piso',
        ko: '7층'
      },
      {
        es: 'el octavo piso',
        ko: '8층'
      },
      {
        es: 'el noveno piso',
        ko: '9층'
      },
      {
        es: 'el décimo piso',
        ko: '10층'
      },
      {
        es: 'once',
        ko: '11'
      },
      {
        es: 'doce',
        ko: '12'
      },
      {
        es: 'trece',
        ko: '13'
      },
      {
        es: 'catorce',
        ko: '14'
      },
      {
        es: 'quince',
        ko: '15'
      },
      {
        es: 'dieciséis',
        ko: '16'
      },
      {
        es: 'veinte',
        ko: '20'
      },
      {
        es: 'treinta',
        ko: '30'
      },
      {
        es: 'cien',
        ko: '100'
      },
      {
        es: '¿A qué piso voy?',
        ko: '나는 몇 층으로 가지?'
      },
      {
        es: 'Voy al tercer piso.',
        ko: '나는 3층으로 간다.'
      },
      {
        es: 'Trabajo en el séptimo piso.',
        ko: '나는 7층에서 일한다.'
      },
      {
        es: 'Voy al piso once.',
        ko: '나는 11층으로 간다. (기수는 piso 뒤)'
      },
      {
        es: 'La cafetería está en el noveno piso.',
        ko: '카페는 9층에 있다.'
      },
      {
        es: 'Mi habitación está en el piso veinte.',
        ko: '내 방은 20층에 있다.'
      }
    ]
  },
  {
    id: 'day36',
    day: 36,
    theme: 'travel',
    emoji: '🛗',
    title: '층 이동 표현',
    subtitle: '¿A qué piso voy? (a vs en)',
    cards: [
      {
        es: 'la planta baja',
        ko: '1층, 지상층 (스페인)'
      },
      {
        es: 'el sótano',
        ko: '지하'
      },
      {
        es: 'subir en ascensor',
        ko: '엘리베이터를 타고 올라가다'
      },
      {
        es: 'usar las escaleras',
        ko: '계단을 이용하다'
      },
      {
        es: 'esperar el ascensor',
        ko: '엘리베이터를 기다리다'
      },
      {
        es: 'subo',
        ko: '나는 올라간다 (subir 1인칭)'
      },
      {
        es: 'bajo',
        ko: '나는 내려간다 (bajar 1인칭)'
      },
      {
        es: 'a + 층',
        ko: '~층으로 (목적지)'
      },
      {
        es: 'en + 층',
        ko: '~층에서 (위치/지점)'
      },
      {
        es: 'Voy al quinto piso.',
        ko: '나는 5층으로 간다. (a: 목적지)'
      },
      {
        es: 'Subo al sexto piso.',
        ko: '나는 6층으로 올라간다.'
      },
      {
        es: 'Bajo al tercer piso.',
        ko: '나는 3층으로 내려간다. (어디로 가는지)'
      },
      {
        es: 'Bajo al primer piso.',
        ko: '나는 1층으로 내려간다. (primero→primer)'
      },
      {
        es: 'Trabajo en el piso veinte.',
        ko: '나는 20층에서 일한다. (en: 위치)'
      },
      {
        es: 'Bajo en el tercer piso.',
        ko: '나는 3층에서 내린다. (내리는 지점)'
      },
      {
        es: 'Estoy en el séptimo piso.',
        ko: '나는 7층에 있다.'
      },
      {
        es: 'Voy al piso de la cafetería.',
        ko: '카페가 있는 층으로 간다.'
      },
      {
        es: 'Voy al piso del hotel.',
        ko: '호텔이 있는 층으로 간다.'
      },
      {
        es: 'Tomo el ascensor.',
        ko: '나는 엘리베이터를 탄다.'
      },
      {
        es: 'Espero el ascensor.',
        ko: '나는 엘리베이터를 기다린다.'
      },
      {
        es: 'El ascensor sube.',
        ko: '엘리베이터가 올라간다.'
      },
      {
        es: 'El ascensor baja.',
        ko: '엘리베이터가 내려간다.'
      },
      {
        es: 'El ascensor está aquí.',
        ko: '엘리베이터가 여기 있다.'
      },
      {
        es: 'Subo al sexto piso en ascensor.',
        ko: '엘리베이터를 타고 6층으로 올라간다. (en: 수단)'
      },
      {
        es: 'Voy a subir al quinto piso en ascensor.',
        ko: '엘리베이터를 타고 5층으로 올라갈 것이다.'
      },
      {
        es: '¿A qué piso vas?',
        ko: '너는 몇 층으로 가?'
      },
      {
        es: '¿A qué piso vas a ir?',
        ko: '너는 몇 층으로 갈 거야?'
      }
    ]
  },
  {
    id: 'day37',
    day: 37,
    theme: 'work',
    emoji: '💼',
    title: '직업',
    subtitle: '¿A qué me dedico?',
    cards: [
      {
        es: 'el trabajo',
        ko: '일, 직업'
      },
      {
        es: 'la profesión',
        ko: '직업, 전문직'
      },
      {
        es: 'el médico / la médica',
        ko: '의사'
      },
      {
        es: 'el enfermero / la enfermera',
        ko: '간호사'
      },
      {
        es: 'el abogado / la abogada',
        ko: '변호사'
      },
      {
        es: 'el profesor / la profesora',
        ko: '선생님, 교수'
      },
      {
        es: 'el dependiente / la dependienta',
        ko: '판매원, 매장 직원'
      },
      {
        es: 'el cajero / la cajera',
        ko: '계산원'
      },
      {
        es: 'el camarero / la camarera',
        ko: '웨이터, 종업원'
      },
      {
        es: 'el cocinero / la cocinera',
        ko: '요리사'
      },
      {
        es: 'el chef',
        ko: '셰프'
      },
      {
        es: 'el barista',
        ko: '바리스타 (양성 명사)'
      },
      {
        es: 'el conductor / la conductora',
        ko: '운전기사'
      },
      {
        es: 'el repartidor / la repartidora',
        ko: '배달 기사'
      },
      {
        es: 'el programador / la programadora',
        ko: '프로그래머'
      },
      {
        es: 'el diseñador gráfico / la diseñadora gráfica',
        ko: '그래픽 디자이너'
      },
      {
        es: 'el editor de video / la editora de video',
        ko: '영상 편집자'
      },
      {
        es: 'el influencer',
        ko: '인플루언서'
      },
      {
        es: 'el youtuber / la youtuber',
        ko: '유튜버'
      },
      {
        es: 'el creador de contenido / la creadora de contenido',
        ko: '콘텐츠 크리에이터'
      },
      {
        es: 'el fotógrafo / la fotógrafa',
        ko: '사진작가'
      },
      {
        es: 'el artista / la artista',
        ko: '예술가 (양성 명사)'
      },
      {
        es: 'el dentista / la dentista',
        ko: '치과 의사 (양성 명사)'
      },
      {
        es: 'el farmacéutico / la farmacéutica',
        ko: '약사'
      },
      {
        es: 'el veterinario / la veterinaria',
        ko: '수의사'
      },
      {
        es: 'el psicólogo / la psicóloga',
        ko: '심리 상담가'
      },
      {
        es: 'el empleado de oficina / la empleada de oficina',
        ko: '회사원'
      },
      {
        es: 'el guía turístico / la guía turística',
        ko: '관광 가이드'
      },
      {
        es: 'Soy + 직업',
        ko: '나는 ~이다 (직업)'
      },
      {
        es: 'Trabajo como + 직업',
        ko: '나는 ~로(서) 일한다'
      },
      {
        es: 'Trabajo en + 장소',
        ko: '나는 ~에서 일한다'
      },
      {
        es: 'Me dedico a + 분야',
        ko: '나는 ~에 종사한다'
      },
      {
        es: 'Soy profesora.',
        ko: '저는 선생님이에요.'
      },
      {
        es: 'Trabajo como diseñadora.',
        ko: '저는 디자이너로 일해요.'
      },
      {
        es: 'Soy influencer.',
        ko: '저는 인플루언서예요.'
      },
      {
        es: 'Trabajo de medio tiempo en la cafetería.',
        ko: '저는 카페에서 아르바이트를 해요.'
      },
      {
        es: '¿A qué te dedicas?',
        ko: '너는 무슨 일을 해?'
      }
    ]
  },
  {
    id: 'day38',
    day: 38,
    theme: 'work',
    emoji: '🧑‍💼',
    title: '직업 소개 표현',
    subtitle: '¿A qué me dedico? (동사 연결)',
    cards: [
      {
        es: 'el trabajo de medio tiempo',
        ko: '파트타임 일, 아르바이트'
      },
      {
        es: 'el trabajo temporal',
        ko: '단기 아르바이트'
      },
      {
        es: 'ser',
        ko: '~이다'
      },
      {
        es: 'trabajar',
        ko: '일하다'
      },
      {
        es: 'dedicarse a',
        ko: '~에 종사하다'
      },
      {
        es: 'como',
        ko: '~로서 (직업 연결)'
      },
      {
        es: 'hacer un trabajo de medio tiempo',
        ko: '아르바이트를 하다'
      },
      {
        es: 'Soy + 직업 (관사 없이)',
        ko: '나는 ~이다 (직업 앞 정관사 생략!)'
      },
      {
        es: 'Soy médico.',
        ko: '나는 의사이다. (el 안 씀)'
      },
      {
        es: 'Soy enfermera.',
        ko: '나는 간호사이다.'
      },
      {
        es: 'Trabajo como programador.',
        ko: '나는 프로그래머로 일한다.'
      },
      {
        es: 'Trabajo como barista.',
        ko: '나는 바리스타로 일한다.'
      },
      {
        es: 'Trabajo en el hospital.',
        ko: '나는 병원에서 일한다. (en + 장소)'
      },
      {
        es: 'Trabajo en una oficina.',
        ko: '나는 사무실에서 일한다.'
      },
      {
        es: 'Me dedico al diseño gráfico.',
        ko: '나는 그래픽 디자인업에 종사한다.'
      },
      {
        es: 'Me dedico a la educación.',
        ko: '나는 교육업에 종사한다.'
      },
      {
        es: 'Tengo un trabajo de medio tiempo.',
        ko: '나는 파트타임 일을 하고 있다.'
      },
      {
        es: 'Busco un trabajo temporal.',
        ko: '나는 단기 아르바이트를 찾고 있다.'
      },
      {
        es: 'Hago un trabajo de medio tiempo en la cafetería.',
        ko: '나는 카페에서 아르바이트를 한다.'
      },
      {
        es: 'Soy médico y trabajo en el hospital.',
        ko: '나는 의사이고 병원에서 일한다.'
      },
      {
        es: 'Trabajo como abogado.',
        ko: '나는 변호사로 일한다.'
      },
      {
        es: 'Soy editor de video.',
        ko: '나는 영상 편집자이다.'
      },
      {
        es: 'Soy dependiente en la tienda de ropa.',
        ko: '나는 옷가게 판매원이다.'
      },
      {
        es: '¿Cuál es tu trabajo?',
        ko: '너의 직업은 뭐야?'
      }
    ]
  },
  {
    id: 'day39',
    day: 39,
    theme: 'basics',
    emoji: '🌤️',
    title: '날씨',
    subtitle: '¿Qué tiempo hace hoy?',
    cards: [
      {
        es: 'el tiempo',
        ko: '날씨'
      },
      {
        es: 'el clima',
        ko: '기후'
      },
      {
        es: 'la lluvia',
        ko: '비'
      },
      {
        es: 'la nieve',
        ko: '눈'
      },
      {
        es: 'el viento',
        ko: '바람'
      },
      {
        es: 'la nube',
        ko: '구름'
      },
      {
        es: 'la temperatura',
        ko: '기온'
      },
      {
        es: 'el grado',
        ko: '도 (온도 단위)'
      },
      {
        es: 'llover',
        ko: '비가 오다'
      },
      {
        es: 'nevar',
        ko: '눈이 오다'
      },
      {
        es: 'Hace + 명사',
        ko: '날씨가 ~하다 (무인칭 표현)'
      },
      {
        es: 'Está + 형용사/현재분사',
        ko: '지금 ~한 상태이다'
      },
      {
        es: 'Hace calor.',
        ko: '덥다.'
      },
      {
        es: 'Hace frío.',
        ko: '춥다.'
      },
      {
        es: 'Hace sol.',
        ko: '해가 난다.'
      },
      {
        es: 'Hace viento.',
        ko: '바람이 분다.'
      },
      {
        es: 'Hace buen tiempo.',
        ko: '날씨가 좋다.'
      },
      {
        es: 'Hace mal tiempo.',
        ko: '날씨가 나쁘다.'
      },
      {
        es: 'Está nublado.',
        ko: '흐리다.'
      },
      {
        es: 'Está lloviendo.',
        ko: '비가 오고 있다.'
      },
      {
        es: 'Está nevando.',
        ko: '눈이 오고 있다.'
      },
      {
        es: 'Hoy hace mucho calor.',
        ko: '오늘은 매우 덥다.'
      },
      {
        es: 'Cuando llueve, no salgo.',
        ko: '비가 올 때 나는 나가지 않는다.'
      },
      {
        es: '¿Qué tiempo hace hoy?',
        ko: '오늘 날씨 어때?'
      }
    ]
  },
  {
    id: 'day40',
    day: 40,
    theme: 'basics',
    emoji: '🍂',
    title: '계절과 달',
    subtitle: '¿Cuál es mi estación favorita?',
    cards: [
      {
        es: 'la estación',
        ko: '계절'
      },
      {
        es: 'la primavera',
        ko: '봄'
      },
      {
        es: 'el verano',
        ko: '여름'
      },
      {
        es: 'el otoño',
        ko: '가을'
      },
      {
        es: 'el invierno',
        ko: '겨울'
      },
      {
        es: 'el mes',
        ko: '달, 월'
      },
      {
        es: 'enero',
        ko: '1월'
      },
      {
        es: 'febrero',
        ko: '2월'
      },
      {
        es: 'marzo',
        ko: '3월'
      },
      {
        es: 'abril',
        ko: '4월'
      },
      {
        es: 'mayo',
        ko: '5월'
      },
      {
        es: 'junio',
        ko: '6월'
      },
      {
        es: 'julio',
        ko: '7월'
      },
      {
        es: 'agosto',
        ko: '8월'
      },
      {
        es: 'septiembre',
        ko: '9월'
      },
      {
        es: 'octubre',
        ko: '10월'
      },
      {
        es: 'noviembre',
        ko: '11월'
      },
      {
        es: 'diciembre',
        ko: '12월'
      },
      {
        es: 'en + 계절/달',
        ko: '~에 (계절·달 앞 전치사)'
      },
      {
        es: 'en verano',
        ko: '여름에'
      },
      {
        es: 'en marzo',
        ko: '3월에'
      },
      {
        es: 'Mi estación favorita es el otoño.',
        ko: '내가 가장 좋아하는 계절은 가을이다.'
      },
      {
        es: 'En invierno hace mucho frío.',
        ko: '겨울에는 매우 춥다.'
      },
      {
        es: '¿Cuál es tu estación favorita?',
        ko: '네가 가장 좋아하는 계절은 뭐야?'
      }
    ]
  },
  {
    id: 'day41',
    day: 41,
    theme: 'travel',
    emoji: '🚇',
    title: '교통수단',
    subtitle: '¿Cómo voy al trabajo?',
    cards: [
      {
        es: 'el transporte',
        ko: '교통, 교통수단'
      },
      {
        es: 'el metro',
        ko: '지하철'
      },
      {
        es: 'el autobús',
        ko: '버스'
      },
      {
        es: 'el tren',
        ko: '기차'
      },
      {
        es: 'el taxi',
        ko: '택시'
      },
      {
        es: 'el coche',
        ko: '자동차'
      },
      {
        es: 'la bicicleta',
        ko: '자전거'
      },
      {
        es: 'la parada',
        ko: '정류장'
      },
      {
        es: 'la estación de metro',
        ko: '지하철역'
      },
      {
        es: 'la tarjeta de transporte',
        ko: '교통카드'
      },
      {
        es: 'ir en + 교통수단',
        ko: '~를 타고 가다'
      },
      {
        es: 'ir a pie',
        ko: '걸어서 가다'
      },
      {
        es: 'tomar el autobús',
        ko: '버스를 타다'
      },
      {
        es: 'bajarse',
        ko: '내리다'
      },
      {
        es: 'hacer transbordo',
        ko: '환승하다'
      },
      {
        es: 'tardar',
        ko: '(시간이) 걸리다'
      },
      {
        es: 'Voy al trabajo en metro.',
        ko: '나는 지하철로 출근한다.'
      },
      {
        es: 'Voy a casa a pie.',
        ko: '나는 걸어서 집에 간다.'
      },
      {
        es: 'Tardo treinta minutos.',
        ko: '나는 30분 걸린다.'
      },
      {
        es: 'Hago transbordo en la estación central.',
        ko: '나는 중앙역에서 환승한다.'
      },
      {
        es: '¿Cómo vas al trabajo?',
        ko: '너는 어떻게 출근해?'
      }
    ]
  },
  {
    id: 'day42',
    day: 42,
    theme: 'travel',
    emoji: '🧭',
    title: '길 묻기',
    subtitle: '¿Cómo llego allí?',
    cards: [
      {
        es: 'la calle',
        ko: '거리, 길'
      },
      {
        es: 'la esquina',
        ko: '모퉁이'
      },
      {
        es: 'el semáforo',
        ko: '신호등'
      },
      {
        es: 'la plaza',
        ko: '광장'
      },
      {
        es: 'el cruce',
        ko: '교차로'
      },
      {
        es: 'seguir recto',
        ko: '직진하다'
      },
      {
        es: 'girar a la derecha',
        ko: '오른쪽으로 돌다'
      },
      {
        es: 'girar a la izquierda',
        ko: '왼쪽으로 돌다'
      },
      {
        es: 'cruzar la calle',
        ko: '길을 건너다'
      },
      {
        es: 'estar cerca',
        ko: '가깝다'
      },
      {
        es: 'estar lejos',
        ko: '멀다'
      },
      {
        es: 'al lado de',
        ko: '~옆에'
      },
      {
        es: 'enfrente de',
        ko: '~맞은편에'
      },
      {
        es: 'entre',
        ko: '~사이에'
      },
      {
        es: '¿Dónde está...?',
        ko: '~은 어디에 있어요?'
      },
      {
        es: '¿Cómo llego a...?',
        ko: '~에 어떻게 가요?'
      },
      {
        es: 'Está muy cerca de aquí.',
        ko: '여기서 아주 가까워요.'
      },
      {
        es: 'Está a cinco minutos.',
        ko: '5분 거리예요.'
      },
      {
        es: 'Siga recto y gire a la derecha.',
        ko: '직진하다가 오른쪽으로 도세요.'
      },
      {
        es: 'Perdone, ¿hay una farmacia por aquí?',
        ko: '실례합니다, 이 근처에 약국이 있나요?'
      }
    ]
  },
  {
    id: 'day43',
    day: 43,
    theme: 'food',
    emoji: '🍽️',
    title: '식당',
    subtitle: '¿Qué pido en el restaurante?',
    cards: [
      {
        es: 'el restaurante',
        ko: '식당'
      },
      {
        es: 'el menú del día',
        ko: '오늘의 메뉴'
      },
      {
        es: 'el plato',
        ko: '요리, 접시'
      },
      {
        es: 'el primer plato',
        ko: '전채 요리'
      },
      {
        es: 'el segundo plato',
        ko: '메인 요리'
      },
      {
        es: 'el postre',
        ko: '디저트'
      },
      {
        es: 'la mesa',
        ko: '테이블'
      },
      {
        es: 'el vino',
        ko: '와인'
      },
      {
        es: 'la propina',
        ko: '팁'
      },
      {
        es: 'pedir',
        ko: '주문하다'
      },
      {
        es: 'reservar una mesa',
        ko: '테이블을 예약하다'
      },
      {
        es: 'traer',
        ko: '가져다주다'
      },
      {
        es: 'recomendar',
        ko: '추천하다'
      },
      {
        es: 'Para mí, ...',
        ko: '저는 ~로 할게요'
      },
      {
        es: '¿Qué me recomienda?',
        ko: '뭘 추천해 주시겠어요?'
      },
      {
        es: 'Quiero pedir el menú del día.',
        ko: '오늘의 메뉴를 주문하고 싶어요.'
      },
      {
        es: 'La cuenta, por favor.',
        ko: '계산서 주세요.'
      },
      {
        es: 'Está muy rico.',
        ko: '아주 맛있어요.'
      },
      {
        es: '¿Qué vas a pedir?',
        ko: '너는 뭘 주문할 거야?'
      }
    ]
  },
  {
    id: 'day44',
    day: 44,
    theme: 'people',
    emoji: '🙂',
    title: '기분/감정',
    subtitle: '¿Cómo me siento hoy?',
    cards: [
      {
        es: 'el estado de ánimo',
        ko: '기분, 심리 상태'
      },
      {
        es: 'sentirse',
        ko: '(기분을) 느끼다'
      },
      {
        es: 'contento',
        ko: '기쁜, 만족한'
      },
      {
        es: 'triste',
        ko: '슬픈'
      },
      {
        es: 'cansado',
        ko: '피곤한'
      },
      {
        es: 'nervioso',
        ko: '긴장한, 불안한'
      },
      {
        es: 'enfadado',
        ko: '화난'
      },
      {
        es: 'preocupado',
        ko: '걱정하는'
      },
      {
        es: 'aburrido',
        ko: '지루한'
      },
      {
        es: 'emocionado',
        ko: '설레는, 감격한'
      },
      {
        es: 'tranquilo',
        ko: '차분한, 평온한'
      },
      {
        es: 'estar + 감정 형용사',
        ko: '(지금) ~한 상태이다'
      },
      {
        es: 'Estoy contento.',
        ko: '나는 기쁘다.'
      },
      {
        es: 'Estoy muy cansado hoy.',
        ko: '나는 오늘 매우 피곤하다.'
      },
      {
        es: 'Me siento bien.',
        ko: '나는 기분이 좋다.'
      },
      {
        es: 'Me siento mal.',
        ko: '나는 기분이 안 좋다.'
      },
      {
        es: 'Estoy de buen humor.',
        ko: '나는 기분이 좋은 상태다.'
      },
      {
        es: 'Estoy de mal humor.',
        ko: '나는 기분이 안 좋은 상태다.'
      },
      {
        es: '¿Cómo te sientes?',
        ko: '너는 기분이 어때?'
      },
      {
        es: '¿Por qué estás triste?',
        ko: '너는 왜 슬퍼?'
      }
    ]
  },
  {
    id: 'day45',
    day: 45,
    theme: 'home',
    emoji: '🏠',
    title: '집/방',
    subtitle: '¿Qué hay en mi casa?',
    cards: [
      {
        es: 'la casa',
        ko: '집'
      },
      {
        es: 'el apartamento',
        ko: '아파트'
      },
      {
        es: 'el salón',
        ko: '거실'
      },
      {
        es: 'el dormitorio',
        ko: '침실'
      },
      {
        es: 'la cocina',
        ko: '부엌'
      },
      {
        es: 'el baño',
        ko: '욕실, 화장실'
      },
      {
        es: 'el balcón',
        ko: '발코니'
      },
      {
        es: 'los muebles',
        ko: '가구'
      },
      {
        es: 'el sofá',
        ko: '소파'
      },
      {
        es: 'la silla',
        ko: '의자'
      },
      {
        es: 'la cama',
        ko: '침대'
      },
      {
        es: 'la nevera',
        ko: '냉장고'
      },
      {
        es: 'la lavadora',
        ko: '세탁기'
      },
      {
        es: 'la ventana',
        ko: '창문'
      },
      {
        es: 'hay',
        ko: '~이 있다 (단수·복수 모두)'
      },
      {
        es: 'Hay un sofá en el salón.',
        ko: '거실에 소파가 하나 있다.'
      },
      {
        es: 'Hay dos ventanas en mi dormitorio.',
        ko: '내 침실에는 창문이 두 개 있다.'
      },
      {
        es: 'No hay lavadora en casa.',
        ko: '집에 세탁기가 없다.'
      },
      {
        es: 'Vivo en un apartamento pequeño.',
        ko: '나는 작은 아파트에 산다.'
      },
      {
        es: '¿Qué hay en tu casa?',
        ko: '너희 집에는 뭐가 있어?'
      }
    ]
  },
  {
    id: 'day46',
    day: 46,
    theme: 'basics',
    emoji: '⏰',
    title: '시간/하루 일과',
    subtitle: '¿A qué hora hago las cosas?',
    cards: [
      {
        es: 'la hora',
        ko: '시간, ~시'
      },
      {
        es: 'el minuto',
        ko: '분'
      },
      {
        es: 'el horario',
        ko: '시간표, 일정'
      },
      {
        es: 'temprano',
        ko: '일찍'
      },
      {
        es: 'tarde',
        ko: '늦게'
      },
      {
        es: 'y media',
        ko: '30분 (반)'
      },
      {
        es: 'y cuarto',
        ko: '15분'
      },
      {
        es: 'menos cuarto',
        ko: '15분 전'
      },
      {
        es: 'de la mañana',
        ko: '오전의'
      },
      {
        es: 'de la tarde',
        ko: '오후의'
      },
      {
        es: 'de la noche',
        ko: '밤의'
      },
      {
        es: 'levantarse',
        ko: '일어나다'
      },
      {
        es: 'desayunar',
        ko: '아침을 먹다'
      },
      {
        es: 'almorzar',
        ko: '점심을 먹다'
      },
      {
        es: 'cenar',
        ko: '저녁을 먹다'
      },
      {
        es: '¿Qué hora es?',
        ko: '몇 시예요?'
      },
      {
        es: 'Es la una.',
        ko: '1시입니다. (1시만 Es)'
      },
      {
        es: 'Son las tres.',
        ko: '3시입니다. (2시부터 Son)'
      },
      {
        es: 'Son las siete y media.',
        ko: '7시 30분입니다.'
      },
      {
        es: 'a las + 시간',
        ko: '~시에'
      },
      {
        es: 'Me levanto a las siete.',
        ko: '나는 7시에 일어난다.'
      },
      {
        es: 'Trabajo de nueve a seis.',
        ko: '나는 9시부터 6시까지 일한다.'
      },
      {
        es: '¿A qué hora te levantas?',
        ko: '너는 몇 시에 일어나?'
      }
    ]
  },
  {
    id: 'day47',
    day: 47,
    theme: 'shopping',
    emoji: '🛍️',
    title: '다이소 쇼핑',
    subtitle: '¿Qué compro en Daiso?',
    cards: [
      {
        es: 'el cuaderno',
        ko: '공책'
      },
      {
        es: 'el bolígrafo',
        ko: '볼펜 (줄여서 el boli)'
      },
      {
        es: 'el lápiz',
        ko: '연필'
      },
      {
        es: 'la goma de borrar',
        ko: '지우개'
      },
      {
        es: 'el rotulador',
        ko: '사인펜, 마커 (= el marcador)'
      },
      {
        es: 'las tijeras',
        ko: '가위 (항상 복수)'
      },
      {
        es: 'los artículos de papelería',
        ko: '문구류'
      },
      {
        es: 'la caja de almacenamiento',
        ko: '수납 상자'
      },
      {
        es: 'las perchas',
        ko: '옷걸이'
      },
      {
        es: 'el espejo',
        ko: '거울'
      },
      {
        es: 'las velas',
        ko: '양초'
      },
      {
        es: 'la bolsa organizadora',
        ko: '정리 파우치'
      },
      {
        es: 'el candado',
        ko: '자물쇠'
      },
      {
        es: 'el cable USB',
        ko: 'USB 케이블'
      },
      {
        es: 'el cable de carga',
        ko: '충전 케이블'
      },
      {
        es: 'el cable de extensión',
        ko: '연장 케이블 (= el alargador)'
      },
      {
        es: 'el cargador',
        ko: '충전기'
      },
      {
        es: 'las pilas',
        ko: '건전지'
      },
      {
        es: 'la bombilla',
        ko: '전구'
      },
      {
        es: 'la lámpara LED',
        ko: 'LED 램프'
      },
      {
        es: 'la linterna',
        ko: '손전등'
      },
      {
        es: 'los cubiertos',
        ko: '식기류 (수저·포크 등)'
      },
      {
        es: 'los palillos',
        ko: '젓가락'
      },
      {
        es: 'la cuchara',
        ko: '숟가락'
      },
      {
        es: 'la taza',
        ko: '컵, 머그잔'
      },
      {
        es: 'el recipiente',
        ko: '밀폐용기, 보관 용기'
      },
      {
        es: 'los utensilios de cocina',
        ko: '주방용품'
      },
      {
        es: 'la escoba',
        ko: '빗자루'
      },
      {
        es: 'la esponja',
        ko: '스펀지, 수세미'
      },
      {
        es: 'los guantes de limpieza',
        ko: '청소 장갑'
      },
      {
        es: 'el cepillo de dientes',
        ko: '칫솔'
      },
      {
        es: 'el cepillo de dientes eléctrico',
        ko: '전동 칫솔'
      },
      {
        es: 'el peine',
        ko: '빗'
      },
      {
        es: 'la botella de viaje',
        ko: '여행용 물병'
      },
      {
        es: 'la almohada de viaje',
        ko: '여행용 목베개'
      },
      {
        es: 'comprar',
        ko: '사다'
      },
      {
        es: 'elegir',
        ko: '고르다'
      },
      {
        es: 'organizar',
        ko: '정리하다'
      },
      {
        es: 'guardar',
        ko: '보관하다'
      },
      {
        es: 'usar',
        ko: '사용하다'
      },
      {
        es: 'útil',
        ko: '유용한'
      },
      {
        es: 'barato',
        ko: '저렴한'
      },
      {
        es: 'los productos de limpieza',
        ko: '청소용품'
      },
      {
        es: 'el armario',
        ko: '옷장'
      },
      {
        es: 'para + 명사',
        ko: '~을 위한'
      },
      {
        es: 'para + 동사원형',
        ko: '~하기 위해 (동사원형 그대로!)'
      },
      {
        es: 'Compro artículos de papelería.',
        ko: '나는 문구류를 산다.'
      },
      {
        es: 'Compro recipientes para guardar comida.',
        ko: '음식을 보관할 용기를 산다.'
      },
      {
        es: 'Compro perchas para organizar mi armario.',
        ko: '옷장을 정리하기 위해 옷걸이를 산다.'
      },
      {
        es: 'Compro productos de limpieza para la casa.',
        ko: '집을 위한 청소용품을 산다.'
      },
      {
        es: 'Compro cajas para organizar.',
        ko: '나는 정리하기 위해 상자를 산다.'
      },
      {
        es: 'También compro cables de carga y pilas.',
        ko: '나는 충전 케이블과 건전지도 산다.'
      },
      {
        es: 'Me gusta Daiso porque tiene productos útiles y baratos.',
        ko: '다이소는 유용하고 저렴한 제품이 있어서 좋다.'
      },
      {
        es: 'Cuando voy a Daiso, compro cuadernos y bolígrafos.',
        ko: '다이소에 가면 공책과 볼펜을 산다.'
      },
      {
        es: '¿Qué compras en Daiso?',
        ko: '너는 다이소에서 뭘 사?'
      },
      {
        es: '¿Qué compraste en Daiso?',
        ko: '너는 다이소에서 뭘 샀어? (과거)'
      },
      {
        es: '¿Cuál es el producto más útil?',
        ko: '가장 유용한 제품은 뭐야?'
      }
    ]
  },
  {
    id: 'day48',
    day: 48,
    theme: 'home',
    emoji: '💄',
    title: '화장품',
    subtitle: '¿Qué uso para maquillarme?',
    cards: [
      {
        es: 'el maquillaje',
        ko: '화장, 메이크업'
      },
      {
        es: 'la base de maquillaje',
        ko: '파운데이션'
      },
      {
        es: 'el corrector',
        ko: '컨실러'
      },
      {
        es: 'los polvos',
        ko: '파우더'
      },
      {
        es: 'el protector solar',
        ko: '선크림'
      },
      {
        es: 'la crema hidratante',
        ko: '수분크림'
      },
      {
        es: 'la sombra de ojos',
        ko: '아이섀도'
      },
      {
        es: 'el delineador de ojos',
        ko: '아이라이너'
      },
      {
        es: 'la máscara de pestañas',
        ko: '마스카라'
      },
      {
        es: 'las pestañas postizas',
        ko: '인조 속눈썹'
      },
      {
        es: 'la barra de labios',
        ko: '립스틱'
      },
      {
        es: 'el lápiz labial',
        ko: '립스틱, 립펜슬'
      },
      {
        es: 'el brillo de labios',
        ko: '립글로스'
      },
      {
        es: 'la brocha',
        ko: '화장 브러시'
      },
      {
        es: 'la esponja de maquillaje',
        ko: '메이크업 스펀지'
      },
      {
        es: 'maquillarse',
        ko: '화장하다'
      },
      {
        es: 'desmaquillarse',
        ko: '화장을 지우다'
      },
      {
        es: 'ponerse',
        ko: '바르다, 착용하다'
      },
      {
        es: 'aplicarse',
        ko: '바르다, 도포하다'
      },
      {
        es: 'mirarse en el espejo',
        ko: '거울을 보다'
      },
      {
        es: 'me + 동사 (재귀대명사)',
        ko: '나 스스로에게 하는 행동'
      },
      {
        es: 'para + 재귀동사원형',
        ko: '~하기 위해 (대명사를 인칭에 맞춰 붙임)'
      },
      {
        es: 'después de + 동사원형',
        ko: '~한 후에'
      },
      {
        es: 'Me maquillo todos los días.',
        ko: '나는 매일 화장한다.'
      },
      {
        es: 'Me pongo lápiz labial rojo.',
        ko: '나는 빨간 립스틱을 바른다.'
      },
      {
        es: 'Uso base de maquillaje.',
        ko: '나는 파운데이션을 사용한다.'
      },
      {
        es: 'Me aplico crema hidratante.',
        ko: '나는 수분크림을 바른다.'
      },
      {
        es: 'Para maquillarme uso protector solar.',
        ko: '화장하기 위해 나는 선크림을 사용한다.'
      },
      {
        es: 'Después de maquillarme, me miro en el espejo.',
        ko: '화장한 후에 나는 거울을 본다.'
      },
      {
        es: 'Antes de dormir, me desmaquillo y me lavo la cara.',
        ko: '자기 전에 나는 화장을 지우고 세수한다.'
      },
      {
        es: '¿Qué usas para maquillarte?',
        ko: '너는 화장할 때 뭘 써?'
      },
      {
        es: '¿Qué usaste para maquillarte?',
        ko: '너는 화장할 때 뭘 썼어? (과거)'
      }
    ]
  },
  {
    id: 'day49',
    day: 49,
    theme: 'shopping',
    emoji: '🛋️',
    title: '이케아 쇼핑',
    subtitle: '¿Qué compro en IKEA?',
    cards: [
      {
        es: 'el mueble',
        ko: '가구 (한 점)'
      },
      {
        es: 'los artículos para el hogar',
        ko: '생활용품, 홈 인테리어 용품'
      },
      {
        es: 'la lámpara',
        ko: '조명, 스탠드'
      },
      {
        es: 'los cojines',
        ko: '쿠션'
      },
      {
        es: 'los almohadones',
        ko: '큰 쿠션, 방석'
      },
      {
        es: 'la mesita de noche',
        ko: '협탁, 침대 옆 탁자'
      },
      {
        es: 'la estantería',
        ko: '책장, 선반장'
      },
      {
        es: 'el escritorio',
        ko: '책상'
      },
      {
        es: 'el cuadro',
        ko: '그림 액자, 사진 액자'
      },
      {
        es: 'los platos',
        ko: '접시'
      },
      {
        es: 'los vasos',
        ko: '컵, 유리잔'
      },
      {
        es: 'las tazas',
        ko: '머그잔'
      },
      {
        es: 'la maceta',
        ko: '화분'
      },
      {
        es: 'montar',
        ko: '조립하다'
      },
      {
        es: 'montar los muebles',
        ko: '가구를 조립하다'
      },
      {
        es: 'decorar',
        ko: '꾸미다, 장식하다'
      },
      {
        es: 'gustar',
        ko: '좋아하다 (Me gusta ~)'
      },
      {
        es: 'comprar + 물건 + para + 명사',
        ko: '~을 위한 ~을 사다'
      },
      {
        es: 'comprar + 물건 + para + 동사원형',
        ko: '~하기 위해 ~을 사다'
      },
      {
        es: 'Compro una estantería para mis libros.',
        ko: '책을 위해 책장을 산다.'
      },
      {
        es: 'Compro una lámpara para el salón.',
        ko: '거실용 스탠드를 산다.'
      },
      {
        es: 'Compro platos y vasos para la cocina.',
        ko: '주방용 접시와 컵을 산다.'
      },
      {
        es: 'Me gusta comprar lámparas y cojines.',
        ko: '나는 스탠드와 쿠션 사는 걸 좋아한다.'
      },
      {
        es: 'Monto los muebles cuando llego a casa.',
        ko: '나는 집에 도착하면 가구를 조립한다.'
      },
      {
        es: 'Después decoro mi casa.',
        ko: '그러고 나서 나는 집을 꾸민다.'
      },
      {
        es: 'Cuando voy a IKEA, compro muebles.',
        ko: '나는 이케아에 가면 가구를 산다.'
      },
      {
        es: '¿Qué compras en IKEA?',
        ko: '너는 이케아에서 뭘 사?'
      },
      {
        es: '¿Qué vas a comprar en IKEA?',
        ko: '너는 이케아에서 뭘 살 거야?'
      }
    ]
  },
  {
    id: 'day50',
    day: 50,
    theme: 'health',
    emoji: '🤒',
    title: '아플 때',
    subtitle: '¿Qué hago cuando estoy enfermo?',
    cards: [
      {
        es: 'enfermo',
        ko: '아픈, 병든'
      },
      {
        es: 'el dolor',
        ko: '통증, 아픔'
      },
      {
        es: 'la garganta',
        ko: '목, 목구멍'
      },
      {
        es: 'la cabeza',
        ko: '머리'
      },
      {
        es: 'el estómago',
        ko: '배, 위'
      },
      {
        es: 'los ojos',
        ko: '눈'
      },
      {
        es: 'las piernas',
        ko: '다리'
      },
      {
        es: 'la sopa',
        ko: '수프, 국'
      },
      {
        es: 'los medicamentos',
        ko: '약'
      },
      {
        es: 'doler',
        ko: '아프다 (me duele / me duelen)'
      },
      {
        es: 'estornudar',
        ko: '재채기하다'
      },
      {
        es: 'vomitar',
        ko: '토하다'
      },
      {
        es: 'el reposo',
        ko: '휴식, 안정'
      },
      {
        es: 'recuperarse',
        ko: '회복하다'
      },
      {
        es: 'ir al médico',
        ko: '병원에 가다, 의사에게 가다'
      },
      {
        es: 'guardar cama',
        ko: '몸져눕다, 앓아눕다'
      },
      {
        es: 'tomar medicamentos',
        ko: '약을 먹다'
      },
      {
        es: 'me duele + 단수 신체부위',
        ko: '나는 ~이 아프다 (한 곳)'
      },
      {
        es: 'me duelen + 복수 신체부위',
        ko: '나는 ~이 아프다 (여러 곳)'
      },
      {
        es: 'Me duele la garganta.',
        ko: '나는 목이 아프다.'
      },
      {
        es: 'Me duele la cabeza.',
        ko: '나는 머리가 아프다.'
      },
      {
        es: 'Me duele el estómago.',
        ko: '나는 배가 아프다.'
      },
      {
        es: 'Me duelen los ojos.',
        ko: '나는 눈이 아프다.'
      },
      {
        es: 'Me duelen las piernas.',
        ko: '나는 다리가 아프다.'
      },
      {
        es: 'Estoy enfermo.',
        ko: '나는 아프다.'
      },
      {
        es: 'Descanso mucho y me quedo en casa.',
        ko: '나는 많이 쉬고 집에 있는다.'
      },
      {
        es: 'Bebo mucha agua y duermo bastante.',
        ko: '나는 물을 많이 마시고 충분히 잔다.'
      },
      {
        es: 'Si tengo fiebre, voy al médico.',
        ko: '열이 나면 나는 병원에 간다.'
      },
      {
        es: 'Tomo sopa caliente para recuperarme.',
        ko: '나는 회복하려고 따뜻한 수프를 먹는다.'
      },
      {
        es: 'Cuando estoy enfermo, descanso mucho.',
        ko: '나는 아플 때 많이 쉰다.'
      },
      {
        es: '¿Qué haces cuando estás enfermo?',
        ko: '너는 아플 때 뭘 해?'
      },
      {
        es: '¿Qué hiciste cuando estabas enfermo?',
        ko: '너는 아팠을 때 뭘 했어? (과거)'
      }
    ]
  },
  {
    id: 'day51',
    day: 51,
    theme: 'health',
    emoji: '💊',
    title: '약국 쇼핑',
    subtitle: '¿Qué compro en la farmacia?',
    cards: [
      {
        es: 'el medicamento para el resfriado',
        ko: '감기약'
      },
      {
        es: 'el antipirético',
        ko: '해열제'
      },
      {
        es: 'el analgésico',
        ko: '진통제'
      },
      {
        es: 'el antiinflamatorio',
        ko: '소염제'
      },
      {
        es: 'el jarabe para la tos',
        ko: '기침 시럽'
      },
      {
        es: 'las pastillas para la garganta',
        ko: '목 사탕, 인후정'
      },
      {
        es: 'el descongestionante nasal',
        ko: '코막힘 완화제'
      },
      {
        es: 'el spray nasal',
        ko: '코 스프레이'
      },
      {
        es: 'el antiácido',
        ko: '제산제'
      },
      {
        es: 'el medicamento para la diarrea',
        ko: '지사제'
      },
      {
        es: 'las vitaminas',
        ko: '비타민'
      },
      {
        es: 'los productos de higiene',
        ko: '위생용품'
      },
      {
        es: 'la venda',
        ko: '붕대'
      },
      {
        es: 'el alcohol',
        ko: '소독용 알코올'
      },
      {
        es: 'el desinfectante',
        ko: '소독제'
      },
      {
        es: 'el termómetro',
        ko: '체온계'
      },
      {
        es: 'la mascarilla',
        ko: '마스크'
      },
      {
        es: 'el repelente de mosquitos',
        ko: '모기 기피제'
      },
      {
        es: 'la pasta de dientes',
        ko: '치약'
      },
      {
        es: 'el hilo dental',
        ko: '치실'
      },
      {
        es: 'el bálsamo labial',
        ko: '립밤'
      },
      {
        es: 'el botiquín',
        ko: '구급상자'
      },
      {
        es: 'ponerse una tirita',
        ko: '반창고를 붙이다 (me pongo)'
      },
      {
        es: 'aplicarse una pomada',
        ko: '연고를 바르다 (me aplico)'
      },
      {
        es: 'medirse la temperatura',
        ko: '체온을 재다 (me mido)'
      },
      {
        es: 'desinfectar una herida',
        ko: '상처를 소독하다'
      },
      {
        es: 'me/te/se + 동사 (재귀)',
        ko: '자기 자신에게 ~하다'
      },
      {
        es: 'Me pongo una tirita.',
        ko: '나는 반창고를 붙인다.'
      },
      {
        es: 'Me aplico una pomada.',
        ko: '나는 연고를 바른다.'
      },
      {
        es: 'Me mido la temperatura.',
        ko: '나는 체온을 잰다.'
      },
      {
        es: 'Si tengo fiebre, compro un antipirético.',
        ko: '열이 나면 해열제를 산다.'
      },
      {
        es: 'Si me duele la cabeza, compro un analgésico.',
        ko: '머리가 아프면 진통제를 산다.'
      },
      {
        es: 'En verano compro repelente de mosquitos.',
        ko: '여름에는 모기 기피제를 산다.'
      },
      {
        es: 'Para el botiquín de casa, siempre tengo tiritas y vendas.',
        ko: '집 구급상자용으로 항상 반창고와 붕대를 둔다.'
      },
      {
        es: '¿Qué compras en la farmacia?',
        ko: '너는 약국에서 뭘 사?'
      },
      {
        es: '¿Qué comprarás en la farmacia?',
        ko: '너는 약국에서 뭘 살 거야? (미래)'
      }
    ]
  },
  {
    id: 'day52',
    day: 52,
    theme: 'shopping',
    emoji: '📚',
    title: '서점 쇼핑',
    subtitle: '¿Qué compro en la librería?',
    cards: [
      {
        es: 'la librería',
        ko: '서점'
      },
      {
        es: 'la novela',
        ko: '소설'
      },
      {
        es: 'el cómic',
        ko: '만화책'
      },
      {
        es: 'el diccionario',
        ko: '사전'
      },
      {
        es: 'el libro de texto',
        ko: '교재, 교과서'
      },
      {
        es: 'el libro de español',
        ko: '스페인어 교재'
      },
      {
        es: 'el libro de cocina',
        ko: '요리책'
      },
      {
        es: 'la revista',
        ko: '잡지'
      },
      {
        es: 'el periódico',
        ko: '신문'
      },
      {
        es: 'el marcador',
        ko: '형광펜, 마커'
      },
      {
        es: 'la carpeta',
        ko: '파일, 폴더'
      },
      {
        es: 'el estuche',
        ko: '필통'
      },
      {
        es: 'las pegatinas',
        ko: '스티커'
      },
      {
        es: 'los post-it',
        ko: '포스트잇'
      },
      {
        es: 'los apuntes',
        ko: '노트 필기'
      },
      {
        es: 'el idioma',
        ko: '언어'
      },
      {
        es: 'la frase',
        ko: '문장'
      },
      {
        es: 'leer',
        ko: '읽다, 독서하다'
      },
      {
        es: 'estudiar idiomas',
        ko: '언어를 공부하다'
      },
      {
        es: 'escribir',
        ko: '쓰다'
      },
      {
        es: 'subrayar',
        ko: '밑줄을 긋다'
      },
      {
        es: 'organizar mis apuntes',
        ko: '내 노트를 정리하다'
      },
      {
        es: 'cuando + 현재형, 현재형',
        ko: '~할 때 ~한다 (습관 표현)'
      },
      {
        es: 'cuando + 접속법 현재',
        ko: '~할 때 (미래·불확실)'
      },
      {
        es: 'Cuando voy a la librería, compro libros.',
        ko: '서점에 가면 나는 책을 산다. (습관)'
      },
      {
        es: 'Cuando estudio, uso marcadores.',
        ko: '나는 공부할 때 형광펜을 쓴다.'
      },
      {
        es: 'Cuando leo, subrayo las frases importantes.',
        ko: '나는 읽을 때 중요한 문장에 밑줄을 긋는다.'
      },
      {
        es: 'Cuando tenga tiempo, voy a estudiar.',
        ko: '시간이 생기면 공부할 거야. (접속법 tenga)'
      },
      {
        es: 'Me gusta comprar novelas y libros de español.',
        ko: '나는 소설과 스페인어 책 사는 걸 좋아한다.'
      },
      {
        es: 'Me encanta leer y estudiar idiomas.',
        ko: '나는 독서와 언어 공부를 정말 좋아한다.'
      },
      {
        es: 'Compro post-it para organizar mis apuntes.',
        ko: '노트를 정리하려고 포스트잇을 산다.'
      },
      {
        es: '¿Qué compras en la librería?',
        ko: '너는 서점에서 뭘 사?'
      },
      {
        es: '¿Qué has comprado en la librería?',
        ko: '너는 서점에서 뭘 샀어? (현재완료)'
      }
    ]
  },
  {
    id: 'day53',
    day: 53,
    theme: 'leisure',
    emoji: '🎧',
    title: '음악 감상',
    subtitle: '¿Qué música escucho?',
    cards: [
      {
        es: 'la música latina',
        ko: '라틴 음악'
      },
      {
        es: 'la salsa',
        ko: '살사'
      },
      {
        es: 'la bachata',
        ko: '바차타'
      },
      {
        es: 'el merengue',
        ko: '메렝게'
      },
      {
        es: 'el flamenco',
        ko: '플라멩코'
      },
      {
        es: 'la música romántica',
        ko: '로맨틱 음악'
      },
      {
        es: 'la música relajante',
        ko: '힐링 음악, 편안한 음악'
      },
      {
        es: 'el ritmo',
        ko: '리듬, 박자'
      },
      {
        es: 'la banda',
        ko: '밴드, 그룹'
      },
      {
        es: 'la canción',
        ko: '노래, 곡'
      },
      {
        es: 'el álbum',
        ko: '앨범'
      },
      {
        es: 'la lista de reproducción',
        ko: '재생목록, 플레이리스트'
      },
      {
        es: 'cantar',
        ko: '노래하다'
      },
      {
        es: 'poner música',
        ko: '음악을 틀다'
      },
      {
        es: 'descubrir música nueva',
        ko: '새로운 음악을 발견하다'
      },
      {
        es: 'mientras + 동사',
        ko: '~하는 동안, ~하면서'
      },
      {
        es: 'Escucho música todos los días.',
        ko: '나는 매일 음악을 듣는다.'
      },
      {
        es: 'Escucho K-pop mientras hago ejercicio.',
        ko: '나는 운동하면서 케이팝을 듣는다.'
      },
      {
        es: 'Escucho música mientras cocino.',
        ko: '나는 요리하면서 음악을 듣는다.'
      },
      {
        es: 'Canto mientras me ducho.',
        ko: '나는 샤워하면서 노래한다.'
      },
      {
        es: 'Mientras estudio, pongo música.',
        ko: '나는 공부하면서 음악을 튼다.'
      },
      {
        es: 'Me gusta el reguetón porque tiene mucho ritmo.',
        ko: '나는 리듬이 강해서 레게톤을 좋아한다.'
      },
      {
        es: 'Escucho música relajante para relajarme.',
        ko: '나는 쉬려고 편안한 음악을 듣는다.'
      },
      {
        es: 'Normalmente uso Spotify para escuchar mis canciones favoritas.',
        ko: '나는 보통 좋아하는 노래를 들으려고 스포티파이를 쓴다.'
      },
      {
        es: '¿Qué música escuchas?',
        ko: '너는 어떤 음악을 들어?'
      },
      {
        es: '¿Qué música escucharás?',
        ko: '너는 어떤 음악을 들을 거야? (미래)'
      }
    ]
  },
  {
    id: 'day54',
    day: 54,
    theme: 'shopping',
    emoji: '🍎',
    title: '과일가게',
    subtitle: '¿Qué compro en la frutería?',
    cards: [
      {
        es: 'la frutería',
        ko: '과일가게'
      },
      {
        es: 'la fruta',
        ko: '과일'
      },
      {
        es: 'la manzana',
        ko: '사과'
      },
      {
        es: 'el plátano',
        ko: '바나나'
      },
      {
        es: 'la naranja',
        ko: '오렌지'
      },
      {
        es: 'la mandarina',
        ko: '귤'
      },
      {
        es: 'la pera',
        ko: '배'
      },
      {
        es: 'las uvas',
        ko: '포도'
      },
      {
        es: 'la fresa',
        ko: '딸기'
      },
      {
        es: 'el arándano',
        ko: '블루베리'
      },
      {
        es: 'la frambuesa',
        ko: '라즈베리'
      },
      {
        es: 'la sandía',
        ko: '수박'
      },
      {
        es: 'el melón',
        ko: '멜론'
      },
      {
        es: 'el melocotón',
        ko: '복숭아'
      },
      {
        es: 'la ciruela',
        ko: '자두'
      },
      {
        es: 'el mango',
        ko: '망고'
      },
      {
        es: 'la piña',
        ko: '파인애플 (중남미: el ananá)'
      },
      {
        es: 'el kiwi',
        ko: '키위'
      },
      {
        es: 'el aguacate',
        ko: '아보카도 (중남미: la palta)'
      },
      {
        es: 'el coco',
        ko: '코코넛'
      },
      {
        es: 'el limón',
        ko: '레몬'
      },
      {
        es: 'la lima',
        ko: '라임'
      },
      {
        es: 'la cereza',
        ko: '체리'
      },
      {
        es: 'pesar',
        ko: '무게를 재다'
      },
      {
        es: 'jugoso',
        ko: '과즙이 많은'
      },
      {
        es: 'maduro',
        ko: '잘 익은'
      },
      {
        es: 'verde',
        ko: '덜 익은; 초록색의'
      },
      {
        es: 'refrescante',
        ko: '시원한, 상쾌한'
      },
      {
        es: 'un kilo de manzanas',
        ko: '사과 1킬로'
      },
      {
        es: 'dos kilos de plátanos',
        ko: '바나나 2킬로'
      },
      {
        es: 'antes de + 동사원형',
        ko: '~하기 전에'
      },
      {
        es: 'Lavo la fruta antes de comerla.',
        ko: '나는 먹기 전에 과일을 씻는다.'
      },
      {
        es: 'Pelo la fruta antes de cortarla.',
        ko: '나는 자르기 전에 과일 껍질을 벗긴다.'
      },
      {
        es: 'Me lavo los dientes después de comer.',
        ko: '나는 식사 후에 양치한다.'
      },
      {
        es: 'Deme un kilo de manzanas, por favor.',
        ko: '사과 1킬로 주세요.'
      },
      {
        es: 'Esta sandía está dulce.',
        ko: '이 수박은 달아요.'
      },
      {
        es: '¿Cuánto cuesta?',
        ko: '이거 얼마예요?'
      },
      {
        es: 'Siempre intento elegir fruta fresca y madura.',
        ko: '나는 항상 신선하고 잘 익은 과일을 고르려고 한다.'
      },
      {
        es: 'En verano compro sandía porque es refrescante.',
        ko: '여름에는 시원해서 수박을 산다.'
      },
      {
        es: '¿Qué compras en la frutería?',
        ko: '너는 과일가게에서 뭘 사?'
      }
    ]
  },
  {
    id: 'day55',
    day: 55,
    theme: 'shopping',
    emoji: '💐',
    title: '꽃집',
    subtitle: '¿Qué compro en la floristería?',
    cards: [
      {
        es: 'la floristería',
        ko: '꽃집'
      },
      {
        es: 'la flor',
        ko: '꽃'
      },
      {
        es: 'la rosa',
        ko: '장미'
      },
      {
        es: 'el tulipán',
        ko: '튤립'
      },
      {
        es: 'el girasol',
        ko: '해바라기'
      },
      {
        es: 'la margarita',
        ko: '데이지'
      },
      {
        es: 'la orquídea',
        ko: '난초'
      },
      {
        es: 'el clavel',
        ko: '카네이션'
      },
      {
        es: 'la hortensia',
        ko: '수국'
      },
      {
        es: 'la lavanda',
        ko: '라벤더'
      },
      {
        es: 'un ramo de flores',
        ko: '꽃다발'
      },
      {
        es: 'un ramo de rosas',
        ko: '장미 꽃다발'
      },
      {
        es: 'la planta',
        ko: '식물'
      },
      {
        es: 'la maceta',
        ko: '화분 (용기)'
      },
      {
        es: 'la planta de interior',
        ko: '실내 식물'
      },
      {
        es: 'el cactus',
        ko: '선인장'
      },
      {
        es: 'la suculenta',
        ko: '다육식물'
      },
      {
        es: 'el jarrón',
        ko: '꽃병'
      },
      {
        es: 'la tarjeta',
        ko: '카드'
      },
      {
        es: 'el papel de regalo',
        ko: '포장지'
      },
      {
        es: 'el lazo',
        ko: '리본'
      },
      {
        es: 'el regalo',
        ko: '선물'
      },
      {
        es: 'comprar',
        ko: '사다'
      },
      {
        es: 'regalar',
        ko: '선물하다'
      },
      {
        es: 'recibir',
        ko: '받다'
      },
      {
        es: 'decorar',
        ko: '장식하다, 꾸미다'
      },
      {
        es: 'poner',
        ko: '놓다, 꽂다'
      },
      {
        es: 'regar',
        ko: '물을 주다 (불규칙)'
      },
      {
        es: 'cuidar',
        ko: '돌보다'
      },
      {
        es: 'querer',
        ko: '원하다, 바라다 (불규칙)'
      },
      {
        es: 'rosas rojas',
        ko: '빨간 장미'
      },
      {
        es: 'rosas blancas',
        ko: '흰 장미'
      },
      {
        es: 'rosas amarillas',
        ko: '노란 장미'
      },
      {
        es: 'plantas en maceta',
        ko: '화분에 심은 식물'
      },
      {
        es: 'para + 동사원형',
        ko: '~하기 위해'
      },
      {
        es: 'para + 명사',
        ko: '~를 위한, ~를 위해'
      },
      {
        es: 'para vs por',
        ko: 'para는 목적(~를 위해), por는 이유(~때문에)'
      },
      {
        es: 'Es un regalo para mi familia.',
        ko: '가족을 위한 선물이에요.'
      },
      {
        es: 'Riego las plantas para cuidarlas bien.',
        ko: '식물을 잘 돌보기 위해 물을 줘요.'
      },
      {
        es: 'Compro rosas para decorar mi casa.',
        ko: '집을 꾸미기 위해 장미를 사요.'
      },
      {
        es: 'Quiero un ramo de flores, por favor.',
        ko: '꽃다발 하나 주세요.'
      },
      {
        es: 'Quiero comprar unas rosas para mi madre.',
        ko: '어머니께 드릴 장미를 사고 싶어요.'
      },
      {
        es: 'Es un regalo de cumpleaños.',
        ko: '생일 선물이에요.'
      },
      {
        es: 'Pongo las flores en un jarrón.',
        ko: '나는 꽃을 꽃병에 꽂는다.'
      },
      {
        es: 'Riego las plantas todos los días.',
        ko: '나는 매일 식물에 물을 준다.'
      },
      {
        es: 'Cuido las plantas.',
        ko: '나는 식물을 돌본다.'
      },
      {
        es: 'Me gustan los girasoles porque son muy bonitos.',
        ko: '해바라기는 아주 예뻐서 좋아해요.'
      },
      {
        es: 'Cuando voy a la floristería, compro flores y plantas.',
        ko: '꽃집에 가면 나는 꽃과 식물을 산다.'
      },
      {
        es: 'Me gustan las rosas, los tulipanes y los girasoles.',
        ko: '나는 장미, 튤립, 해바라기를 좋아한다.'
      },
      {
        es: 'A veces compro un ramo de flores para regalar a mi familia.',
        ko: '가끔 가족에게 선물하려고 꽃다발을 산다.'
      },
      {
        es: 'También compro plantas para decorar mi casa.',
        ko: '집을 꾸미려고 식물도 산다.'
      },
      {
        es: '¿Qué compras en la floristería?',
        ko: '너는 꽃집에서 뭘 사?'
      },
      {
        es: '¿Qué compraste en la floristería?',
        ko: '너는 꽃집에서 뭘 샀어?'
      }
    ]
  },
  {
    id: 'day56',
    day: 56,
    theme: 'health',
    emoji: '🥗',
    title: '다이어트',
    subtitle: '¿Qué hago para adelgazar?',
    cards: [
      {
        es: 'adelgazar',
        ko: '살을 빼다'
      },
      {
        es: 'bajar de peso',
        ko: '체중을 줄이다'
      },
      {
        es: 'perder grasa',
        ko: '지방을 빼다'
      },
      {
        es: 'ganar músculo',
        ko: '근육을 늘리다'
      },
      {
        es: 'mantener un peso saludable',
        ko: '건강한 체중을 유지하다'
      },
      {
        es: 'el peso',
        ko: '체중, 무게'
      },
      {
        es: 'la grasa',
        ko: '지방'
      },
      {
        es: 'el músculo',
        ko: '근육'
      },
      {
        es: 'un estilo de vida saludable',
        ko: '건강한 생활 방식'
      },
      {
        es: 'caminar',
        ko: '걷다'
      },
      {
        es: 'correr',
        ko: '달리다'
      },
      {
        es: 'nadar',
        ko: '수영하다'
      },
      {
        es: 'montar en bicicleta',
        ko: '자전거를 타다'
      },
      {
        es: 'hacer senderismo',
        ko: '등산하다, 트레킹하다'
      },
      {
        es: 'comer sano',
        ko: '건강하게 먹다'
      },
      {
        es: 'las verduras',
        ko: '채소'
      },
      {
        es: 'las proteínas',
        ko: '단백질'
      },
      {
        es: 'los carbohidratos',
        ko: '탄수화물'
      },
      {
        es: 'el azúcar',
        ko: '설탕'
      },
      {
        es: 'los dulces',
        ko: '단것, 과자류'
      },
      {
        es: 'los refrescos',
        ko: '탄산음료'
      },
      {
        es: 'la comida rápida',
        ko: '패스트푸드'
      },
      {
        es: 'la comida basura',
        ko: '정크푸드 (basura = 쓰레기)'
      },
      {
        es: 'evitar',
        ko: '피하다'
      },
      {
        es: 'reducir',
        ko: '줄이다 (불규칙)'
      },
      {
        es: 'controlar',
        ko: '조절하다, 관리하다'
      },
      {
        es: 'intentar',
        ko: '시도하다, ~하려고 하다'
      },
      {
        es: 'picar entre horas',
        ko: '끼니 사이에 군것질하다'
      },
      {
        es: 'descansar',
        ko: '쉬다'
      },
      {
        es: 'controlar las porciones',
        ko: '양(1인분)을 조절하다'
      },
      {
        es: 'reducir el azúcar',
        ko: '설탕을 줄이다'
      },
      {
        es: 'reducir los carbohidratos',
        ko: '탄수화물을 줄이다'
      },
      {
        es: 'evitar la comida rápida',
        ko: '패스트푸드를 피하다'
      },
      {
        es: 'evitar los dulces',
        ko: '단것을 피하다'
      },
      {
        es: 'comer más verduras',
        ko: '채소를 더 먹다'
      },
      {
        es: 'beber mucha agua',
        ko: '물을 많이 마시다'
      },
      {
        es: 'cocinar en casa',
        ko: '집에서 요리하다'
      },
      {
        es: 'no comer por la noche',
        ko: '밤에 먹지 않다'
      },
      {
        es: 'dormir bien',
        ko: '잘 자다'
      },
      {
        es: '횟수 vez/veces + a + 기간',
        ko: '~기간에 몇 번 (빈도 표현)'
      },
      {
        es: 'una vez al día',
        ko: '하루에 한 번'
      },
      {
        es: 'dos veces al día',
        ko: '하루에 두 번'
      },
      {
        es: 'tres veces a la semana',
        ko: '일주일에 세 번'
      },
      {
        es: 'todas las semanas',
        ko: '매주 (todo + 복수형)'
      },
      {
        es: 'Hago ejercicio cinco veces a la semana.',
        ko: '나는 일주일에 다섯 번 운동해요.'
      },
      {
        es: 'Como tres veces al día.',
        ko: '나는 하루에 세 번 식사해요.'
      },
      {
        es: 'Hago yoga una vez al día.',
        ko: '나는 하루에 한 번 요가해요.'
      },
      {
        es: 'Estoy intentando bajar de peso.',
        ko: '나는 체중을 줄이려고 하는 중이에요.'
      },
      {
        es: 'Bebo dos litros de agua al día.',
        ko: '나는 하루에 물 2리터를 마셔요.'
      },
      {
        es: 'Como verduras y fruta.',
        ko: '나는 채소와 과일을 먹어요.'
      },
      {
        es: 'Evito la comida rápida y los dulces.',
        ko: '나는 패스트푸드와 단것을 피해요.'
      },
      {
        es: 'Intento dormir bien.',
        ko: '나는 잘 자려고 노력해요.'
      },
      {
        es: 'Para adelgazar, hago ejercicio y camino todos los días.',
        ko: '살을 빼기 위해 나는 운동하고 매일 걸어요.'
      },
      {
        es: 'Como más verduras, fruta y proteínas.',
        ko: '나는 채소, 과일, 단백질을 더 먹어요.'
      },
      {
        es: 'También intento no comer por la noche.',
        ko: '밤에 먹지 않으려고도 노력해요.'
      },
      {
        es: '¿Qué haces para adelgazar?',
        ko: '너는 살을 빼려고 뭘 해?'
      },
      {
        es: '¿Qué harás para adelgazar?',
        ko: '너는 살을 빼려고 뭘 할 거야?'
      }
    ]
  },
  {
    id: 'day57',
    day: 57,
    theme: 'food',
    emoji: '📞',
    title: '식당 예약',
    subtitle: '¿Cómo se reserva una mesa en un restaurante?',
    cards: [
      {
        es: 'la reserva',
        ko: '예약'
      },
      {
        es: 'hacer una reserva',
        ko: '예약하다'
      },
      {
        es: 'reservar una mesa',
        ko: '테이블을 예약하다'
      },
      {
        es: 'cancelar una reserva',
        ko: '예약을 취소하다'
      },
      {
        es: 'confirmar una reserva',
        ko: '예약을 확인하다'
      },
      {
        es: 'cambiar una reserva',
        ko: '예약을 변경하다'
      },
      {
        es: 'el número de personas',
        ko: '인원수'
      },
      {
        es: 'el número de teléfono',
        ko: '전화번호'
      },
      {
        es: 'con antelación',
        ko: '미리, 사전에'
      },
      {
        es: 'por teléfono',
        ko: '전화로'
      },
      {
        es: 'por Internet',
        ko: '인터넷으로'
      },
      {
        es: 'reservar',
        ko: '예약하다'
      },
      {
        es: 'cancelar',
        ko: '취소하다'
      },
      {
        es: 'confirmar',
        ko: '확인하다'
      },
      {
        es: 'cambiar',
        ko: '바꾸다, 변경하다'
      },
      {
        es: 'llamar',
        ko: '전화하다, 부르다'
      },
      {
        es: 'esperar',
        ko: '기다리다'
      },
      {
        es: 'llegar',
        ko: '도착하다'
      },
      {
        es: 'seguir',
        ko: '계속하다, 따라가다 (불규칙)'
      },
      {
        es: 'preferir',
        ko: '선호하다 (불규칙)'
      },
      {
        es: 'poder',
        ko: '~할 수 있다 (불규칙)'
      },
      {
        es: 'disfrutar de la comida',
        ko: '식사를 즐기다'
      },
      {
        es: 'sin esperar mucho',
        ko: '많이 기다리지 않고'
      },
      {
        es: '조건법: 동사원형 + ía/ías/ía/íamos/íais/ían',
        ko: '정중하게 부탁·조언할 때 쓰는 시제'
      },
      {
        es: 'me gustaría + 동사원형',
        ko: '나는 ~하고 싶습니다 (정중한 표현)'
      },
      {
        es: 'hablaría',
        ko: '말하고 싶다/말할 텐데 (hablar 조건법)'
      },
      {
        es: 'comería',
        ko: '먹고 싶다/먹을 텐데 (comer 조건법)'
      },
      {
        es: 'viviría',
        ko: '살고 싶다/살 텐데 (vivir 조건법)'
      },
      {
        es: 'Me gustaría hacer una reserva.',
        ko: '예약하고 싶습니다.'
      },
      {
        es: 'Me gustaría reservar una mesa para hoy a las ocho de la tarde.',
        ko: '오늘 저녁 8시에 테이블을 예약하고 싶습니다.'
      },
      {
        es: 'Es para dos personas.',
        ko: '두 명입니다.'
      },
      {
        es: 'Tengo una reserva a nombre de Hugo.',
        ko: '후고 이름으로 예약했습니다.'
      },
      {
        es: '¿Tienen una mesa libre?',
        ko: '빈 자리 있나요?'
      },
      {
        es: 'Quiero cancelar mi reserva.',
        ko: '예약을 취소하고 싶어요.'
      },
      {
        es: 'Quiero cambiar la hora de mi reserva.',
        ko: '예약 시간을 변경하고 싶어요.'
      },
      {
        es: 'Buenas noches. Tengo una reserva.',
        ko: '안녕하세요(저녁 인사). 예약했습니다.'
      },
      {
        es: '¿Podemos pasar?',
        ko: '들어가도 될까요?'
      },
      {
        es: 'Reservo una mesa antes de ir al restaurante.',
        ko: '나는 식당에 가기 전에 테이블을 예약한다.'
      },
      {
        es: 'Cuando quiero ir a un restaurante, hago una reserva con antelación.',
        ko: '식당에 가고 싶을 때 나는 미리 예약을 한다.'
      },
      {
        es: 'Llamo por teléfono o reservo por Internet.',
        ko: '나는 전화를 하거나 인터넷으로 예약한다.'
      },
      {
        es: 'Digo mi nombre, el número de personas y la hora.',
        ko: '나는 이름, 인원수, 시간을 말한다.'
      },
      {
        es: 'Así puedo disfrutar de la comida sin esperar mucho.',
        ko: '그래서 오래 기다리지 않고 식사를 즐길 수 있다.'
      },
      {
        es: '¿Cómo se reserva una mesa en un restaurante?',
        ko: '식당에서 테이블은 어떻게 예약하나요?'
      }
    ]
  },
  {
    id: 'day58',
    day: 58,
    theme: 'people',
    emoji: '🙏',
    title: '감사 표현',
    subtitle: '¿Cómo doy las gracias?',
    cards: [
      {
        es: 'dar las gracias',
        ko: '감사 인사를 하다'
      },
      {
        es: 'las gracias',
        ko: '감사, 감사 인사'
      },
      {
        es: 'Muchas gracias.',
        ko: '정말 감사합니다.'
      },
      {
        es: 'Muchísimas gracias.',
        ko: '정말 너무 감사합니다.'
      },
      {
        es: 'Te lo agradezco mucho.',
        ko: '정말 고맙습니다. (반말 상대)'
      },
      {
        es: 'Se lo agradezco mucho.',
        ko: '정말 감사드립니다. (존댓말 상대)'
      },
      {
        es: 'Gracias por tu ayuda.',
        ko: '도와줘서 고마워요.'
      },
      {
        es: 'Gracias por tu tiempo.',
        ko: '시간 내줘서 고마워요.'
      },
      {
        es: 'Gracias por el regalo.',
        ko: '선물 고마워요.'
      },
      {
        es: 'De nada.',
        ko: '천만에요.'
      },
      {
        es: 'No hay de qué.',
        ko: '별말씀을요.'
      },
      {
        es: 'Es un placer.',
        ko: '기꺼이요, 제 기쁨입니다.'
      },
      {
        es: 'Ha sido un placer.',
        ko: '정말 기뻤습니다.'
      },
      {
        es: 'agradecer',
        ko: '감사하다 (불규칙)'
      },
      {
        es: 'ayudar',
        ko: '돕다'
      },
      {
        es: 'invitar',
        ko: '초대하다, 대접하다'
      },
      {
        es: 'mostrar',
        ko: '보여주다 (불규칙)'
      },
      {
        es: 'creer',
        ko: '믿다, ~라고 생각하다'
      },
      {
        es: 'la invitación',
        ko: '초대'
      },
      {
        es: 'el detalle',
        ko: '(마음 쓴) 작은 성의, 배려'
      },
      {
        es: 'los pequeños detalles',
        ko: '작은 배려들'
      },
      {
        es: 'el respeto',
        ko: '존중'
      },
      {
        es: 'la amabilidad',
        ko: '친절'
      },
      {
        es: 'sencillo',
        ko: '간단한, 소박한'
      },
      {
        es: '1인칭 단수(yo)만 불규칙인 동사',
        ko: 'yo 형태만 모양이 바뀌고 나머지는 규칙'
      },
      {
        es: 'agradecer → agradezco',
        ko: '감사하다 → 나는 감사한다'
      },
      {
        es: 'dar → doy',
        ko: '주다 → 나는 준다'
      },
      {
        es: 'hacer → hago',
        ko: '하다 → 나는 한다'
      },
      {
        es: 'conducir → conduzco',
        ko: '운전하다 → 나는 운전한다'
      },
      {
        es: 'salir → salgo',
        ko: '나가다 → 나는 나간다'
      },
      {
        es: 'saber → sé',
        ko: '알다 → 나는 안다'
      },
      {
        es: 'Siempre doy las gracias cuando alguien me ayuda.',
        ko: '누군가 나를 도와주면 나는 항상 감사 인사를 한다.'
      },
      {
        es: 'También agradezco los pequeños detalles.',
        ko: '나는 작은 배려에도 감사한다.'
      },
      {
        es: 'Agradezco un regalo o una invitación.',
        ko: '나는 선물이나 초대에 감사한다.'
      },
      {
        es: 'Decir "gracias" es una forma sencilla de mostrar respeto.',
        ko: '"고맙다"고 말하는 것은 존중을 표현하는 간단한 방법이다.'
      },
      {
        es: 'Creo que la amabilidad es importante.',
        ko: '나는 친절이 중요하다고 생각한다.'
      },
      {
        es: '¿Cómo das las gracias?',
        ko: '너는 어떻게 감사를 표현해?'
      },
      {
        es: '¿Cómo darás las gracias?',
        ko: '너는 어떻게 감사를 표현할 거야?'
      }
    ]
  },
  {
    id: 'day59',
    day: 59,
    theme: 'home',
    emoji: '🧹',
    title: '집 청소',
    subtitle: '¿Cómo limpio la casa?',
    cards: [
      {
        es: 'la escoba',
        ko: '빗자루'
      },
      {
        es: 'el recogedor',
        ko: '쓰레받기'
      },
      {
        es: 'la aspiradora',
        ko: '진공청소기'
      },
      {
        es: 'la fregona',
        ko: '대걸레'
      },
      {
        es: 'el cubo',
        ko: '양동이'
      },
      {
        es: 'el trapo',
        ko: '걸레'
      },
      {
        es: 'la bayeta',
        ko: '행주'
      },
      {
        es: 'el plumero',
        ko: '먼지떨이'
      },
      {
        es: 'el detergente',
        ko: '세제'
      },
      {
        es: 'el limpiador',
        ko: '세정제'
      },
      {
        es: 'el desinfectante',
        ko: '소독제'
      },
      {
        es: 'el polvo',
        ko: '먼지'
      },
      {
        es: 'los muebles',
        ko: '가구'
      },
      {
        es: 'el suelo',
        ko: '바닥'
      },
      {
        es: 'la basura',
        ko: '쓰레기'
      },
      {
        es: 'el papel',
        ko: '종이'
      },
      {
        es: 'el plástico',
        ko: '플라스틱'
      },
      {
        es: 'el vidrio',
        ko: '유리'
      },
      {
        es: 'el salón',
        ko: '거실'
      },
      {
        es: 'el dormitorio',
        ko: '침실'
      },
      {
        es: 'el balcón',
        ko: '발코니'
      },
      {
        es: 'las ventanas',
        ko: '창문'
      },
      {
        es: 'barrer',
        ko: '쓸다'
      },
      {
        es: 'fregar',
        ko: '닦다, 문지르다 (불규칙)'
      },
      {
        es: 'aspirar',
        ko: '진공청소하다'
      },
      {
        es: 'ordenar',
        ko: '정리하다'
      },
      {
        es: 'desinfectar',
        ko: '소독하다'
      },
      {
        es: 'tirar',
        ko: '버리다'
      },
      {
        es: 'reciclar',
        ko: '분리수거하다'
      },
      {
        es: 'sacar',
        ko: '꺼내다, 내놓다'
      },
      {
        es: 'quitar',
        ko: '없애다, 치우다'
      },
      {
        es: 'barrer el suelo',
        ko: '바닥을 쓸다'
      },
      {
        es: 'pasar la aspiradora',
        ko: '진공청소기를 돌리다'
      },
      {
        es: 'fregar el suelo',
        ko: '바닥을 닦다'
      },
      {
        es: 'quitar el polvo',
        ko: '먼지를 털다'
      },
      {
        es: 'limpiar las ventanas',
        ko: '창문을 닦다'
      },
      {
        es: 'ordenar la habitación',
        ko: '방을 정리하다'
      },
      {
        es: 'sacar la basura',
        ko: '쓰레기를 내놓다'
      },
      {
        es: 'reciclar el papel',
        ko: '종이를 분리수거하다'
      },
      {
        es: 'limpia',
        ko: '깨끗한'
      },
      {
        es: 'ordenada',
        ko: '정돈된'
      },
      {
        es: 'primero',
        ko: '먼저, 첫 번째로'
      },
      {
        es: 'después',
        ko: '그 다음에'
      },
      {
        es: 'por último',
        ko: '마지막으로'
      },
      {
        es: 'al final',
        ko: '끝으로, 마지막에'
      },
      {
        es: 'Primero, barro el suelo.',
        ko: '먼저 바닥을 쓸어요.'
      },
      {
        es: 'Después, paso la aspiradora.',
        ko: '그 다음, 진공청소기를 돌려요.'
      },
      {
        es: 'Por último, friego el suelo.',
        ko: '마지막으로 바닥을 닦아요.'
      },
      {
        es: 'Paso la aspiradora en el salón y en los dormitorios.',
        ko: '거실과 침실에 진공청소기를 돌려요.'
      },
      {
        es: 'Después de cocinar, limpio la cocina.',
        ko: '요리한 뒤에 부엌을 청소해요.'
      },
      {
        es: 'Ordeno mi habitación todos los días.',
        ko: '나는 매일 내 방을 정리해요.'
      },
      {
        es: 'Saco la basura por la noche.',
        ko: '나는 밤에 쓰레기를 내놓아요.'
      },
      {
        es: 'Quito el polvo de los muebles.',
        ko: '나는 가구의 먼지를 털어요.'
      },
      {
        es: 'Normalmente limpio la casa los fines de semana.',
        ko: '나는 보통 주말에 집을 청소해요.'
      },
      {
        es: 'Reciclo el papel, el plástico y el vidrio.',
        ko: '나는 종이, 플라스틱, 유리를 분리수거해요.'
      },
      {
        es: 'Me gusta tener la casa limpia y ordenada.',
        ko: '나는 집이 깨끗하고 정돈된 게 좋아요.'
      },
      {
        es: '¿Cómo limpias la casa?',
        ko: '너는 집을 어떻게 청소해?'
      },
      {
        es: '¿Cómo limpiaste la casa?',
        ko: '너는 집을 어떻게 청소했어?'
      }
    ]
  },
  {
    id: 'day60',
    day: 60,
    theme: 'people',
    emoji: '👋',
    title: '자기소개',
    subtitle: '¿Cómo me presento?',
    cards: [
      {
        es: 'llamarse',
        ko: '이름이 ~이다 (재귀동사)'
      },
      {
        es: 'presentarse',
        ko: '자기소개하다 (재귀동사)'
      },
      {
        es: 'tener',
        ko: '가지다, 있다 (불규칙)'
      },
      {
        es: 'vivir',
        ko: '살다'
      },
      {
        es: 'conocer',
        ko: '알다, 알게 되다 (불규칙)'
      },
      {
        es: 'aprender',
        ko: '배우다'
      },
      {
        es: 'enseñar',
        ko: '가르치다'
      },
      {
        es: 'el idioma',
        ko: '언어'
      },
      {
        es: 'la cultura',
        ko: '문화'
      },
      {
        es: 'el tiempo libre',
        ko: '여가 시간'
      },
      {
        es: 'el profesor',
        ko: '선생님 (남)'
      },
      {
        es: 'la profesora',
        ko: '선생님 (여)'
      },
      {
        es: 'el estudiante',
        ko: '학생'
      },
      {
        es: 'llamarse + 재귀대명사 (me/te/se/nos/os/se)',
        ko: '재귀동사라 재귀대명사와 함께 쓴다'
      },
      {
        es: 'me llamo + 이름',
        ko: '제 이름은 ~입니다'
      },
      {
        es: 'Me llamo Hugo.',
        ko: '제 이름은 후고입니다.'
      },
      {
        es: '¿Cómo te llamas?',
        ko: '이름이 뭐예요?'
      },
      {
        es: 'Se llama Pedro.',
        ko: '그의 이름은 페드로예요.'
      },
      {
        es: 'Soy Hugo.',
        ko: '저는 후고입니다.'
      },
      {
        es: 'Soy de Corea.',
        ko: '저는 한국에서 왔습니다.'
      },
      {
        es: 'Vengo de Corea.',
        ko: '저는 한국에서 왔어요.'
      },
      {
        es: 'Tengo veinte años.',
        ko: '저는 스무 살입니다.'
      },
      {
        es: 'Vivo en Seúl.',
        ko: '저는 서울에 살아요.'
      },
      {
        es: 'Soy profesor de español.',
        ko: '저는 스페인어 선생님입니다.'
      },
      {
        es: 'Soy estudiante.',
        ko: '저는 학생입니다.'
      },
      {
        es: 'Trabajo en una escuela.',
        ko: '저는 학교에서 일해요.'
      },
      {
        es: 'Estudio español.',
        ko: '저는 스페인어를 공부해요.'
      },
      {
        es: 'Me gusta viajar.',
        ko: '저는 여행을 좋아해요.'
      },
      {
        es: 'Me gusta leer.',
        ko: '저는 독서를 좋아해요.'
      },
      {
        es: 'Me gusta hacer ejercicio.',
        ko: '저는 운동하는 걸 좋아해요.'
      },
      {
        es: 'Me gusta enseñar idiomas.',
        ko: '저는 언어 가르치는 걸 좋아해요.'
      },
      {
        es: 'Me gusta aprender idiomas.',
        ko: '저는 언어 배우는 걸 좋아해요.'
      },
      {
        es: 'Me gusta conocer nuevas culturas.',
        ko: '저는 새로운 문화를 아는 걸 좋아해요.'
      },
      {
        es: 'En mi tiempo libre me gusta leer.',
        ko: '여가 시간에는 독서를 좋아해요.'
      },
      {
        es: 'Mucho gusto.',
        ko: '만나서 반갑습니다.'
      },
      {
        es: 'Encantado.',
        ko: '반갑습니다. (남자가 말할 때)'
      },
      {
        es: 'Encantada.',
        ko: '반갑습니다. (여자가 말할 때)'
      },
      {
        es: 'Espero conocerte mejor.',
        ko: '더 알아가게 되길 바라요.'
      },
      {
        es: '¿Cómo te presentas?',
        ko: '너는 자기소개를 어떻게 해?'
      },
      {
        es: '¿Cómo te vas a presentar?',
        ko: '너는 자기소개를 어떻게 할 거야?'
      }
    ]
  },
  {
    id: 'day61',
    day: 61,
    theme: 'food',
    emoji: '🛵',
    title: '음식 배달',
    subtitle: '¿Cómo se pide comida a domicilio?',
    cards: [
      {
        es: 'la comida a domicilio',
        ko: '배달 음식'
      },
      {
        es: 'una aplicación de reparto',
        ko: '배달 앱'
      },
      {
        es: 'el pedido',
        ko: '주문, 주문한 음식'
      },
      {
        es: 'el menú',
        ko: '메뉴'
      },
      {
        es: 'el carrito',
        ko: '장바구니'
      },
      {
        es: 'la dirección de entrega',
        ko: '배송 주소'
      },
      {
        es: 'el repartidor',
        ko: '배달 기사 (남)'
      },
      {
        es: 'la repartidora',
        ko: '배달 기사 (여)'
      },
      {
        es: 'los gastos de envío',
        ko: '배송비'
      },
      {
        es: 'el método de pago',
        ko: '결제 수단'
      },
      {
        es: 'el código de descuento',
        ko: '할인 코드'
      },
      {
        es: 'la hamburguesa',
        ko: '햄버거'
      },
      {
        es: 'el sushi',
        ko: '초밥'
      },
      {
        es: 'la comida china',
        ko: '중국 음식'
      },
      {
        es: 'los tacos',
        ko: '타코'
      },
      {
        es: 'pedir',
        ko: '주문하다 (불규칙)'
      },
      {
        es: 'añadir',
        ko: '추가하다, 담다'
      },
      {
        es: 'introducir',
        ko: '입력하다 (불규칙)'
      },
      {
        es: 'seleccionar',
        ko: '선택하다'
      },
      {
        es: 'entregar',
        ko: '배달하다, 전달하다'
      },
      {
        es: 'comprobar',
        ko: '확인하다 (불규칙)'
      },
      {
        es: 'abrir',
        ko: '열다'
      },
      {
        es: 'mirar',
        ko: '보다'
      },
      {
        es: 'usar',
        ko: '사용하다'
      },
      {
        es: 'tardar',
        ko: '(시간이) 걸리다'
      },
      {
        es: 'hacer un pedido',
        ko: '주문을 넣다'
      },
      {
        es: 'añadir al carrito',
        ko: '장바구니에 담다'
      },
      {
        es: 'introducir la dirección',
        ko: '주소를 입력하다'
      },
      {
        es: 'seleccionar el método de pago',
        ko: '결제 수단을 선택하다'
      },
      {
        es: 'confirmar el pedido',
        ko: '주문을 확정하다'
      },
      {
        es: 'cancelar el pedido',
        ko: '주문을 취소하다'
      },
      {
        es: 'usar un código de descuento',
        ko: '할인 코드를 사용하다'
      },
      {
        es: 'pagar con tarjeta',
        ko: '카드로 결제하다'
      },
      {
        es: 'se + 3인칭 단수 동사',
        ko: '비인칭 se — (일반적으로) ~한다'
      },
      {
        es: 'Se elige un restaurante.',
        ko: '음식점을 고른다.'
      },
      {
        es: 'Se mira el menú.',
        ko: '메뉴를 본다.'
      },
      {
        es: 'Se añade la comida al carrito.',
        ko: '음식을 장바구니에 담는다.'
      },
      {
        es: 'Hoy no tengo ganas de cocinar.',
        ko: '오늘은 요리하고 싶지 않아요.'
      },
      {
        es: 'Abro una aplicación de reparto.',
        ko: '나는 배달 앱을 연다.'
      },
      {
        es: 'Elijo una pizza y una ensalada.',
        ko: '나는 피자와 샐러드를 고른다.'
      },
      {
        es: 'Introduzco mi dirección y pago con tarjeta.',
        ko: '나는 주소를 입력하고 카드로 결제한다.'
      },
      {
        es: 'Confirmo el pedido.',
        ko: '나는 주문을 확정한다.'
      },
      {
        es: 'Tardará unos treinta minutos.',
        ko: '30분 정도 걸릴 거예요.'
      },
      {
        es: 'Llega el repartidor.',
        ko: '배달 기사가 도착한다.'
      },
      {
        es: 'Recibo mi pedido y compruebo que está todo.',
        ko: '나는 주문한 음식을 받고 빠진 게 없는지 확인한다.'
      },
      {
        es: '¿Está incluido el envío?',
        ko: '배송비가 포함되어 있나요?'
      },
      {
        es: 'Mi pedido todavía no ha llegado.',
        ko: '제 주문이 아직 도착하지 않았어요.'
      },
      {
        es: '¿Cómo se pide comida a domicilio?',
        ko: '음식 배달은 어떻게 시키나요?'
      },
      {
        es: '¿Cómo se pedirá comida a domicilio?',
        ko: '음식 배달은 어떻게 시키게 될까요?'
      }
    ]
  },
  {
    id: 'day62',
    day: 62,
    theme: 'home',
    emoji: '♻️',
    title: '분리수거',
    subtitle: '¿Cómo se recicla la basura?',
    cards: [
      {
        es: 'el residuo',
        ko: '폐기물'
      },
      {
        es: 'el contenedor',
        ko: '수거함, 분리수거통'
      },
      {
        es: 'el cartón',
        ko: '골판지, 종이상자'
      },
      {
        es: 'el envase',
        ko: '포장 용기'
      },
      {
        es: 'la lata',
        ko: '캔'
      },
      {
        es: 'la bolsa',
        ko: '봉투, 비닐봉지'
      },
      {
        es: 'la pila',
        ko: '건전지'
      },
      {
        es: 'los restos de comida',
        ko: '음식물 쓰레기'
      },
      {
        es: 'el medioambiente',
        ko: '환경'
      },
      {
        es: 'el contenedor amarillo',
        ko: '노란 수거함 (플라스틱·캔·용기)'
      },
      {
        es: 'el contenedor azul',
        ko: '파란 수거함 (종이·골판지)'
      },
      {
        es: 'el contenedor verde',
        ko: '초록 수거함 (유리)'
      },
      {
        es: 'el contenedor marrón',
        ko: '갈색 수거함 (음식물)'
      },
      {
        es: 'reciclar',
        ko: '재활용하다, 분리수거하다'
      },
      {
        es: 'separar',
        ko: '분리하다'
      },
      {
        es: 'reutilizar',
        ko: '재사용하다'
      },
      {
        es: 'reducir',
        ko: '줄이다 (불규칙)'
      },
      {
        es: 'clasificar',
        ko: '분류하다'
      },
      {
        es: 'llevar',
        ko: '가져가다, 나르다'
      },
      {
        es: 'producir',
        ko: '만들어내다, 배출하다 (불규칙)'
      },
      {
        es: 'cuidar',
        ko: '돌보다, 아끼다'
      },
      {
        es: 'separar la basura',
        ko: '쓰레기를 분리하다'
      },
      {
        es: 'tirar el vidrio',
        ko: '유리를 버리다'
      },
      {
        es: 'usar menos plástico',
        ko: '플라스틱을 덜 쓰다'
      },
      {
        es: 'producir menos basura',
        ko: '쓰레기를 덜 배출하다'
      },
      {
        es: 'cuidar el medioambiente',
        ko: '환경을 아끼다'
      },
      {
        es: 'cada tipo de residuo',
        ko: '각 폐기물 종류'
      },
      {
        es: 'intentar + 동사원형',
        ko: '~하려고 노력하다'
      },
      {
        es: 'Intento usar menos plástico.',
        ko: '플라스틱을 덜 사용하려고 노력해요.'
      },
      {
        es: 'Intento reciclar todos los días.',
        ko: '매일 재활용하려고 노력해요.'
      },
      {
        es: 'Intento reducir la basura en casa.',
        ko: '집에서 쓰레기를 줄이려고 노력해요.'
      },
      {
        es: 'Intentamos reutilizar las bolsas.',
        ko: '우리는 봉투를 재사용하려고 노력해요.'
      },
      {
        es: 'Separo la basura en casa.',
        ko: '나는 집에서 쓰레기를 분리해요.'
      },
      {
        es: '¿Dónde se tira esta botella?',
        ko: '이 병은 어디에 버리나요?'
      },
      {
        es: 'El papel se tira al contenedor azul.',
        ko: '종이는 파란 수거함에 버려요.'
      },
      {
        es: 'El vidrio se tira al contenedor verde.',
        ko: '유리는 초록 수거함에 버려요.'
      },
      {
        es: 'Ponemos el papel y el cartón juntos.',
        ko: '우리는 종이와 골판지를 함께 모아요.'
      },
      {
        es: 'Separamos el vidrio y los envases.',
        ko: '우리는 유리와 포장 용기를 분리해요.'
      },
      {
        es: 'Llevamos cada residuo a su contenedor.',
        ko: '우리는 각 폐기물을 해당 수거함으로 가져가요.'
      },
      {
        es: 'En casa separamos la basura todos los días.',
        ko: '집에서 우리는 매일 쓰레기를 분리해요.'
      },
      {
        es: 'Así producimos menos basura.',
        ko: '그렇게 해서 쓰레기를 덜 배출해요.'
      },
      {
        es: '¿Cómo se recicla la basura?',
        ko: '쓰레기는 어떻게 분리수거하나요?'
      },
      {
        es: '¿Cómo se reciclará la basura?',
        ko: '쓰레기는 어떻게 분리수거하게 될까요?'
      }
    ]
  },
  {
    id: 'day63',
    day: 63,
    theme: 'home',
    emoji: '📦',
    title: '택배 보내기',
    subtitle: '¿Cómo se envía un paquete?',
    cards: [
      {
        es: 'el paquete',
        ko: '소포, 택배'
      },
      {
        es: 'la caja',
        ko: '상자'
      },
      {
        es: 'el sobre',
        ko: '봉투 (서류용)'
      },
      {
        es: 'la dirección',
        ko: '주소'
      },
      {
        es: 'el remitente',
        ko: '보내는 사람'
      },
      {
        es: 'el destinatario',
        ko: '받는 사람'
      },
      {
        es: 'el código postal',
        ko: '우편번호'
      },
      {
        es: 'la etiqueta',
        ko: '라벨, 스티커'
      },
      {
        es: 'el comprobante',
        ko: '영수증, 접수증'
      },
      {
        es: 'el número de seguimiento',
        ko: '운송장 번호'
      },
      {
        es: 'Correos',
        ko: '우체국 (스페인 우편공사)'
      },
      {
        es: 'enviar',
        ko: '보내다 (불규칙)'
      },
      {
        es: 'empaquetar',
        ko: '포장하다'
      },
      {
        es: 'meter',
        ko: '넣다'
      },
      {
        es: 'cerrar',
        ko: '닫다, 봉하다 (불규칙)'
      },
      {
        es: 'pesar',
        ko: '무게를 재다'
      },
      {
        es: 'costar',
        ko: '값이 나가다 (불규칙)'
      },
      {
        es: 'comprobar',
        ko: '확인하다 (불규칙)'
      },
      {
        es: 'enviar un paquete',
        ko: '택배를 보내다'
      },
      {
        es: 'meter el regalo en una caja',
        ko: '선물을 상자에 넣다'
      },
      {
        es: 'escribir la dirección',
        ko: '주소를 쓰다'
      },
      {
        es: 'pagar los gastos de envío',
        ko: '배송비를 내다'
      },
      {
        es: 'tardar + 시간 + en + 동사원형',
        ko: '~하는 데 (시간이) 걸리다'
      },
      {
        es: '¿Cuánto tarda en llegar?',
        ko: '도착하는 데 얼마나 걸리나요?'
      },
      {
        es: 'Tarda tres días en llegar.',
        ko: '도착하는 데 3일 걸려요.'
      },
      {
        es: '¿Cuánto tardas en llegar?',
        ko: '너 도착하는 데 얼마나 걸려?'
      },
      {
        es: 'Tardo veinte minutos en llegar.',
        ko: '나 도착하는 데 20분 걸려.'
      },
      {
        es: 'Quiero enviar esto a Corea.',
        ko: '이걸 한국으로 보내고 싶어요.'
      },
      {
        es: '¿Cuánto cuestan los gastos de envío?',
        ko: '배송비가 얼마인가요?'
      },
      {
        es: 'Se mete el regalo en una caja.',
        ko: '선물을 상자에 넣어요.'
      },
      {
        es: 'Se escribe el nombre del destinatario.',
        ko: '받는 사람 이름을 써요.'
      },
      {
        es: 'Se lleva el paquete a Correos.',
        ko: '소포를 우체국으로 가져가요.'
      },
      {
        es: 'Allí se pesa el paquete.',
        ko: '거기서 소포 무게를 재요.'
      },
      {
        es: 'Se pagan los gastos de envío.',
        ko: '배송비를 내요.'
      },
      {
        es: 'Se recibe un comprobante.',
        ko: '접수증을 받아요.'
      },
      {
        es: 'Se puede comprobar por Internet.',
        ko: '인터넷으로 확인할 수 있어요.'
      },
      {
        es: '¿Cómo se envía un paquete?',
        ko: '택배는 어떻게 보내나요?'
      },
      {
        es: '¿Cómo se envió un paquete?',
        ko: '택배는 어떻게 보냈나요?'
      }
    ]
  },
  {
    id: 'day64',
    day: 64,
    theme: 'travel',
    emoji: '🚇',
    title: '지하철 이용',
    subtitle: '¿Cómo se usa el metro?',
    cards: [
      {
        es: 'el metro',
        ko: '지하철'
      },
      {
        es: 'la estación de metro',
        ko: '지하철역'
      },
      {
        es: 'el billete',
        ko: '표, 승차권'
      },
      {
        es: 'la tarjeta de transporte',
        ko: '교통카드'
      },
      {
        es: 'la máquina expendedora',
        ko: '자동판매기'
      },
      {
        es: 'el torno',
        ko: '개찰구'
      },
      {
        es: 'el andén',
        ko: '승강장'
      },
      {
        es: 'la línea',
        ko: '노선, 호선'
      },
      {
        es: 'el transbordo',
        ko: '환승'
      },
      {
        es: 'la salida',
        ko: '출구'
      },
      {
        es: 'la próxima estación',
        ko: '다음 역'
      },
      {
        es: 'recargar',
        ko: '충전하다'
      },
      {
        es: 'pasar',
        ko: '지나가다, 통과하다'
      },
      {
        es: 'subir',
        ko: '올라타다'
      },
      {
        es: 'bajarse',
        ko: '내리다 (재귀동사)'
      },
      {
        es: 'recargar la tarjeta',
        ko: '카드를 충전하다'
      },
      {
        es: 'pasar el torno',
        ko: '개찰구를 통과하다'
      },
      {
        es: 'buscar el andén',
        ko: '승강장을 찾다'
      },
      {
        es: 'subir al metro',
        ko: '지하철을 타다'
      },
      {
        es: 'bajarse del metro',
        ko: '지하철에서 내리다'
      },
      {
        es: 'hacer transbordo',
        ko: '환승하다'
      },
      {
        es: 'buscar la salida',
        ko: '출구를 찾다'
      },
      {
        es: 'más cercana',
        ko: '가장 가까운'
      },
      {
        es: 'tener que + 동사원형',
        ko: '~해야 한다 (의무·필요)'
      },
      {
        es: '¿Qué línea tengo que tomar?',
        ko: '몇 호선을 타야 하나요?'
      },
      {
        es: '¿Dónde tengo que hacer transbordo?',
        ko: '어디서 환승해야 하나요?'
      },
      {
        es: 'Tienes que bajar en la próxima estación.',
        ko: '다음 역에서 내려야 해요.'
      },
      {
        es: 'Tenemos que comprar un billete primero.',
        ko: '먼저 표를 사야 해요.'
      },
      {
        es: '¿En qué estación me bajo?',
        ko: '어느 역에서 내리나요?'
      },
      {
        es: '¿Cuál es la salida?',
        ko: '출구가 어디인가요?'
      },
      {
        es: 'Se busca la estación de metro más cercana.',
        ko: '가장 가까운 지하철역을 찾아요.'
      },
      {
        es: 'Se compra un billete.',
        ko: '표를 사요.'
      },
      {
        es: 'Se usa una tarjeta de transporte.',
        ko: '교통카드를 사용해요.'
      },
      {
        es: 'Después se pasa el torno.',
        ko: '그다음 개찰구를 통과해요.'
      },
      {
        es: 'Se busca el andén correcto.',
        ko: '맞는 승강장을 찾아요.'
      },
      {
        es: 'Si es necesario, se hace transbordo.',
        ko: '필요하면 환승해요.'
      },
      {
        es: 'Al llegar a la estación, se baja del metro.',
        ko: '역에 도착하면 지하철에서 내려요.'
      },
      {
        es: '¿Cómo se usa el metro?',
        ko: '지하철은 어떻게 이용하나요?'
      },
      {
        es: '¿Cómo se usaba el metro?',
        ko: '지하철은 어떻게 이용했나요?'
      }
    ]
  },
  {
    id: 'day65',
    day: 65,
    theme: 'travel',
    emoji: '🚗',
    title: '렌터카 이용',
    subtitle: '¿Cómo se alquila un coche?',
    cards: [
      {
        es: 'el coche de alquiler',
        ko: '렌터카'
      },
      {
        es: 'la empresa de alquiler',
        ko: '렌터카 회사, 렌트 업체'
      },
      {
        es: 'el carnet de conducir',
        ko: '운전면허증'
      },
      {
        es: 'el pasaporte',
        ko: '여권'
      },
      {
        es: 'la tarjeta de crédito',
        ko: '신용카드'
      },
      {
        es: 'el seguro',
        ko: '보험'
      },
      {
        es: 'el contrato',
        ko: '계약서'
      },
      {
        es: 'las llaves',
        ko: '열쇠 (복수)'
      },
      {
        es: 'el depósito de combustible',
        ko: '연료 탱크'
      },
      {
        es: 'la gasolina',
        ko: '휘발유'
      },
      {
        es: 'los documentos',
        ko: '서류, 증빙 서류'
      },
      {
        es: 'el viaje',
        ko: '여행, 여정'
      },
      {
        es: 'el total',
        ko: '총액, 합계'
      },
      {
        es: 'alquilar',
        ko: '빌리다, 렌트하다'
      },
      {
        es: 'presentar',
        ko: '제시하다, 제출하다'
      },
      {
        es: 'contratar',
        ko: '계약하다, 가입하다'
      },
      {
        es: 'recoger',
        ko: '수령하다, 찾아오다'
      },
      {
        es: 'llenar',
        ko: '채우다, 가득 채우다'
      },
      {
        es: 'necesitar',
        ko: '필요하다'
      },
      {
        es: 'salir',
        ko: '나가다, 출발하다'
      },
      {
        es: 'alquilar un coche',
        ko: '차를 렌트하다'
      },
      {
        es: 'reservar un coche por Internet',
        ko: '인터넷으로 차를 예약하다'
      },
      {
        es: 'presentar el carnet de conducir',
        ko: '운전면허증을 제시하다'
      },
      {
        es: 'firmar el contrato',
        ko: '계약서에 서명하다'
      },
      {
        es: 'contratar un seguro',
        ko: '보험에 가입하다'
      },
      {
        es: 'recoger las llaves',
        ko: '열쇠를 수령하다'
      },
      {
        es: 'recoger el coche',
        ko: '차를 인수하다'
      },
      {
        es: 'devolver el coche',
        ko: '차를 반납하다'
      },
      {
        es: 'revisar el coche',
        ko: '차를 점검하다'
      },
      {
        es: 'llenar el depósito',
        ko: '연료를 가득 채우다'
      },
      {
        es: 'pagar el total',
        ko: '총액을 결제하다'
      },
      {
        es: 'se + 3인칭 동사',
        ko: '무인칭 표현 — 누구나 (보통) ~한다'
      },
      {
        es: 'al + 동사원형',
        ko: '~할 때, ~하자마자'
      },
      {
        es: 'antes de + 동사원형',
        ko: '~하기 전에'
      },
      {
        es: 'Primero / Después / Al final',
        ko: '먼저 / 그다음 / 마지막에'
      },
      {
        es: 'Primero se reserva un coche por Internet.',
        ko: '먼저 인터넷으로 차를 예약해요.'
      },
      {
        es: 'Al llegar a la oficina, se presenta el carnet de conducir y una tarjeta de crédito.',
        ko: '사무실에 도착하면 운전면허증과 신용카드를 제시해요.'
      },
      {
        es: 'Después se firma el contrato y se recogen las llaves.',
        ko: '그다음 계약서에 서명하고 열쇠를 받아요.'
      },
      {
        es: 'Antes de salir, se revisa el coche.',
        ko: '출발하기 전에 차를 점검해요.'
      },
      {
        es: 'Al final del viaje, se devuelve el coche a la empresa de alquiler.',
        ko: '여행이 끝나면 렌터카 회사에 차를 반납해요.'
      },
      {
        es: 'Al devolver el coche, se paga el total.',
        ko: '차를 반납할 때 총금액을 결제해요.'
      },
      {
        es: '¿Qué documentos necesito para alquilar un coche?',
        ko: '차를 렌트하려면 어떤 서류가 필요한가요?'
      },
      {
        es: '¿Dónde se recoge el coche?',
        ko: '차는 어디에서 인수하나요?'
      },
      {
        es: '¿Dónde se devuelve el coche?',
        ko: '차는 어디에 반납하나요?'
      },
      {
        es: 'Quiero alquilar un coche para tres días.',
        ko: '사흘 동안 차를 렌트하고 싶어요.'
      },
      {
        es: '¿Está incluido el seguro?',
        ko: '보험이 포함되어 있나요?'
      },
      {
        es: 'El depósito de combustible está lleno.',
        ko: '연료 탱크가 가득 차 있어요.'
      },
      {
        es: 'En el futuro, se alquilará un coche sin llaves.',
        ko: '앞으로는 열쇠 없이 차를 렌트하게 될 거예요.'
      },
      {
        es: '¿Cómo se alquila un coche?',
        ko: '차는 어떻게 렌트하나요?'
      },
      {
        es: '¿Cómo se alquilará un coche?',
        ko: '차는 어떻게 렌트하게 될까요? (미래)'
      }
    ]
  },
  {
    id: 'day66',
    day: 66,
    theme: 'food',
    emoji: '🧾',
    title: '계산서 요청',
    subtitle: '¿Cómo se pide la cuenta?',
    cards: [
      {
        es: 'la cuenta',
        ko: '계산서'
      },
      {
        es: 'el camarero',
        ko: '종업원, 웨이터 (남)'
      },
      {
        es: 'la camarera',
        ko: '종업원, 웨이트리스 (여)'
      },
      {
        es: 'la propina',
        ko: '팁'
      },
      {
        es: 'el recibo',
        ko: '영수증'
      },
      {
        es: 'pedir',
        ko: '요청하다, 주문하다 (불규칙)'
      },
      {
        es: 'cobrar',
        ko: '계산하다, (돈을) 받다'
      },
      {
        es: 'dejar',
        ko: '남기다, 두다'
      },
      {
        es: 'dividir',
        ko: '나누다'
      },
      {
        es: 'invitar',
        ko: '한턱내다, 초대하다'
      },
      {
        es: 'traer',
        ko: '가져오다, 가져다주다 (불규칙)'
      },
      {
        es: 'poder',
        ko: '~할 수 있다 (불규칙)'
      },
      {
        es: 'preguntar',
        ko: '묻다, 물어보다'
      },
      {
        es: 'pedir la cuenta',
        ko: '계산서를 요청하다'
      },
      {
        es: 'traer la cuenta a la mesa',
        ko: '계산서를 테이블로 가져오다'
      },
      {
        es: 'pagar con tarjeta',
        ko: '카드로 계산하다'
      },
      {
        es: 'pagar en efectivo',
        ko: '현금으로 계산하다'
      },
      {
        es: 'pagar por separado',
        ko: '따로 계산하다'
      },
      {
        es: 'dividir la cuenta',
        ko: '계산서를 나누다, 더치페이하다'
      },
      {
        es: 'dejar propina',
        ko: '팁을 남기다'
      },
      {
        es: 'pedir el recibo',
        ko: '영수증을 요청하다'
      },
      {
        es: 'invitar a alguien',
        ko: '누군가에게 한턱내다'
      },
      {
        es: 'después de cenar',
        ko: '저녁 식사 후에'
      },
      {
        es: 'salir del restaurante',
        ko: '식당에서 나가다'
      },
      {
        es: 'con tarjeta / en efectivo',
        ko: '카드로 / 현금으로 — 전치사가 서로 다르다'
      },
      {
        es: '¿Se puede + 동사원형?',
        ko: '~할 수 있나요? (무인칭 가능 여부)'
      },
      {
        es: 'Prefiero + 동사원형',
        ko: '~하는 편이 좋아요 (선호 표현)'
      },
      {
        es: '¿Me trae la cuenta, por favor?',
        ko: '계산서 좀 가져다주시겠어요?'
      },
      {
        es: '¿Me cobra, por favor?',
        ko: '계산해 주시겠어요?'
      },
      {
        es: '¿Se puede pagar con tarjeta?',
        ko: '카드로 결제할 수 있나요?'
      },
      {
        es: 'Pago con tarjeta.',
        ko: '카드로 계산할게요.'
      },
      {
        es: 'Pago en efectivo.',
        ko: '현금으로 계산할게요.'
      },
      {
        es: 'Prefiero pagar en efectivo.',
        ko: '현금으로 계산하는 편이 좋아요.'
      },
      {
        es: 'Podemos pagar por separado.',
        ko: '따로 계산할 수 있어요.'
      },
      {
        es: 'Hoy invito yo.',
        ko: '오늘은 제가 낼게요.'
      },
      {
        es: 'Después de cenar, pedimos la cuenta.',
        ko: '저녁을 먹은 후에 계산서를 요청해요.'
      },
      {
        es: 'El camarero trae la cuenta a la mesa.',
        ko: '종업원이 계산서를 테이블로 가져와요.'
      },
      {
        es: 'Preguntamos si se puede pagar con tarjeta.',
        ko: '카드로 결제할 수 있는지 물어봐요.'
      },
      {
        es: 'Pagamos con tarjeta y dejamos una pequeña propina.',
        ko: '카드로 계산하고 약간의 팁을 남겨요.'
      },
      {
        es: 'Después salimos del restaurante.',
        ko: '그다음 식당에서 나와요.'
      },
      {
        es: '¿Cómo se pide la cuenta?',
        ko: '계산서는 어떻게 요청하나요?'
      },
      {
        es: '¿Cómo se pedía la cuenta?',
        ko: '계산서는 어떻게 요청했나요? (과거)'
      }
    ]
  },
  {
    id: 'day67',
    day: 67,
    theme: 'food',
    emoji: '🍰',
    title: '수량 표현',
    subtitle: '¿Cuánto(s) quiere?',
    cards: [
      {
        es: 'el trozo',
        ko: '조각, 덩어리'
      },
      {
        es: 'la loncha',
        ko: '(햄처럼 얇게 썬) 한 장'
      },
      {
        es: 'la rebanada',
        ko: '(빵처럼 잘라낸) 한 쪽'
      },
      {
        es: 'la porción',
        ko: '한 조각, 한 몫'
      },
      {
        es: 'la ración',
        ko: '한 접시 (스페인 식당의 1접시)'
      },
      {
        es: 'la docena',
        ko: '한 다스, 12개'
      },
      {
        es: 'la tarta',
        ko: '케이크'
      },
      {
        es: 'el queso',
        ko: '치즈'
      },
      {
        es: 'el jamón',
        ko: '하몽, 햄'
      },
      {
        es: 'la pizza',
        ko: '피자'
      },
      {
        es: 'la paella',
        ko: '빠에야'
      },
      {
        es: 'las croquetas',
        ko: '크로켓'
      },
      {
        es: 'los calamares',
        ko: '오징어 튀김'
      },
      {
        es: 'querer',
        ko: '원하다, 바라다 (불규칙)'
      },
      {
        es: 'dar',
        ko: '주다 (불규칙)'
      },
      {
        es: 'poner',
        ko: '놓다, 담아 주다 (불규칙)'
      },
      {
        es: 'cortar',
        ko: '자르다, 썰다'
      },
      {
        es: 'un trozo de + 음식',
        ko: '~ 한 조각'
      },
      {
        es: 'una loncha de + 음식',
        ko: '(햄처럼 얇게 썬) ~ 한 장'
      },
      {
        es: 'una rebanada de + 음식',
        ko: '(빵처럼 잘라낸) ~ 한 쪽'
      },
      {
        es: 'una porción de + 음식',
        ko: '~ 한 조각, 한 몫 — 항상 1인분은 아니다'
      },
      {
        es: 'una ración de + 음식',
        ko: '~ 한 접시 — 1인분과 다를 수 있다'
      },
      {
        es: 'para + 숫자 + personas',
        ko: 'N인분'
      },
      {
        es: 'Póngame + 수량',
        ko: '(존칭) 나에게 ~ 주세요'
      },
      {
        es: 'Ponme + 수량',
        ko: '(편한 사이) 나한테 ~ 줘'
      },
      {
        es: 'un trozo de tarta',
        ko: '케이크 한 조각'
      },
      {
        es: 'dos trozos de queso',
        ko: '치즈 두 조각'
      },
      {
        es: 'un trozo de carne',
        ko: '고기 한 조각'
      },
      {
        es: 'una loncha de jamón',
        ko: '하몽 한 장'
      },
      {
        es: 'seis lonchas de jamón',
        ko: '하몽 여섯 장'
      },
      {
        es: 'cortar en lonchas finas',
        ko: '얇게 썰다'
      },
      {
        es: 'una rebanada de pan',
        ko: '빵 한 쪽'
      },
      {
        es: 'una porción de pizza',
        ko: '피자 한 조각'
      },
      {
        es: 'una ración de calamares',
        ko: '오징어 튀김 한 접시'
      },
      {
        es: 'una ración de croquetas',
        ko: '크로켓 한 접시'
      },
      {
        es: 'para una persona',
        ko: '1인분'
      },
      {
        es: 'para dos personas',
        ko: '2인분'
      },
      {
        es: '¿Cuántos quiere?',
        ko: '몇 개 드릴까요?'
      },
      {
        es: 'Quiero tres.',
        ko: '세 개 주세요.'
      },
      {
        es: 'Quiero un trozo de tarta.',
        ko: '케이크 한 조각 주세요.'
      },
      {
        es: 'Póngame dos trozos de queso.',
        ko: '치즈 두 조각 주세요.'
      },
      {
        es: 'Póngame seis lonchas de jamón.',
        ko: '하몽 여섯 장 주세요.'
      },
      {
        es: 'Quiero dos rebanadas de pan.',
        ko: '빵 두 쪽 주세요.'
      },
      {
        es: 'Quiero una porción de pizza.',
        ko: '피자 한 조각 주세요.'
      },
      {
        es: 'Póngame una ración de croquetas.',
        ko: '크로켓 한 접시 주세요.'
      },
      {
        es: 'Quiero paella para dos personas.',
        ko: '빠에야 2인분 주세요.'
      },
      {
        es: 'Queremos carne para cuatro personas.',
        ko: '고기 4인분 주세요.'
      },
      {
        es: '¿Hay paella para una persona?',
        ko: '빠에야 1인분도 있나요?'
      },
      {
        es: '¿Para cuántas personas es?',
        ko: '몇 인분인가요?'
      },
      {
        es: '¿Para cuántas personas es una ración?',
        ko: '한 접시는 몇 명이 먹을 수 있나요?'
      },
      {
        es: '¿Cuántos quiso?',
        ko: '몇 개 원하셨나요? (과거)'
      }
    ]
  },
  {
    id: 'day68',
    day: 68,
    theme: 'food',
    emoji: '⚖️',
    title: '무게와 분수 표현',
    subtitle: '¿Cuánto quiere?',
    cards: [
      {
        es: 'el gramo',
        ko: '그램'
      },
      {
        es: 'el kilo',
        ko: '킬로그램'
      },
      {
        es: 'la mitad',
        ko: '절반'
      },
      {
        es: 'un cuarto',
        ko: '4분의 1'
      },
      {
        es: 'tres cuartos',
        ko: '4분의 3'
      },
      {
        es: 'media ración',
        ko: '반 접시, 작은 사이즈'
      },
      {
        es: 'el mercado',
        ko: '시장'
      },
      {
        es: 'la panadería',
        ko: '빵집'
      },
      {
        es: 'comprar',
        ko: '사다, 구입하다'
      },
      {
        es: 'ir',
        ko: '가다 (불규칙)'
      },
      {
        es: 'estar',
        ko: '~에 있다, ~한 상태이다 (불규칙)'
      },
      {
        es: 'pedir',
        ko: '요청하다, 부탁하다 (불규칙)'
      },
      {
        es: 'compartir',
        ko: '나누다, 함께 쓰다'
      },
      {
        es: 'medio / media + 명사',
        ko: '반 ~ — 뒤에 오는 명사의 성에 맞춘다'
      },
      {
        es: 'un cuarto de + 단위',
        ko: '4분의 1의 ~'
      },
      {
        es: 'tres cuartos de + 단위',
        ko: '4분의 3의 ~'
      },
      {
        es: 'media ración de + 음식',
        ko: '~ 반 접시'
      },
      {
        es: 'una botella de + 음식',
        ko: '~ 한 병'
      },
      {
        es: 'una lata de + 음식',
        ko: '~ 한 캔'
      },
      {
        es: 'un paquete de + 음식',
        ko: '~ 한 팩'
      },
      {
        es: 'una bolsa de + 음식',
        ko: '~ 한 봉지'
      },
      {
        es: 'una caja de + 음식',
        ko: '~ 한 상자'
      },
      {
        es: 'cien gramos',
        ko: '100그램'
      },
      {
        es: 'doscientos gramos',
        ko: '200그램'
      },
      {
        es: 'un cuarto de kilo',
        ko: '250그램 (4분의 1킬로)'
      },
      {
        es: 'medio kilo',
        ko: '500그램 (반 킬로)'
      },
      {
        es: 'tres cuartos de kilo',
        ko: '750그램 (4분의 3킬로)'
      },
      {
        es: 'un kilo y medio',
        ko: '1.5킬로'
      },
      {
        es: 'media docena',
        ko: '반 다스, 6개'
      },
      {
        es: 'media barra',
        ko: '빵 반 개'
      },
      {
        es: 'media botella',
        ko: '반 병'
      },
      {
        es: 'una barra de pan',
        ko: '바게트 빵 한 개'
      },
      {
        es: 'una botella de agua',
        ko: '물 한 병'
      },
      {
        es: 'una lata de refresco',
        ko: '탄산음료 한 캔'
      },
      {
        es: 'un paquete de galletas',
        ko: '과자 한 팩'
      },
      {
        es: 'una caja de chocolates',
        ko: '초콜릿 한 상자'
      },
      {
        es: 'un cartón de leche',
        ko: '우유 한 팩'
      },
      {
        es: 'un bote de mermelada',
        ko: '잼 한 병'
      },
      {
        es: 'un frasco de perfume',
        ko: '향수 한 병'
      },
      {
        es: 'medio kilo de carne',
        ko: '고기 반 킬로'
      },
      {
        es: 'media ración de jamón',
        ko: '하몽 반 접시'
      },
      {
        es: '¿Cuánto quiere?',
        ko: '얼마나 드릴까요?'
      },
      {
        es: '¿Cuánto le pongo?',
        ko: '얼마나 담아 드릴까요?'
      },
      {
        es: '¿Cuántas lonchas quiere?',
        ko: '몇 장 드릴까요?'
      },
      {
        es: '¿Algo más?',
        ko: '더 필요하신 거 있으세요?'
      },
      {
        es: '¿Así está bien?',
        ko: '이 정도면 괜찮으세요?'
      },
      {
        es: '¿Se puede pedir media ración?',
        ko: '반 접시로 주문할 수 있나요?'
      },
      {
        es: 'Solo quiero la mitad.',
        ko: '절반만 주세요.'
      },
      {
        es: 'Quiero media barra de pan.',
        ko: '빵 반 개 주세요.'
      },
      {
        es: 'Quiero medio kilo de carne.',
        ko: '고기 반 킬로 주세요.'
      },
      {
        es: 'Un cuarto de kilo de queso.',
        ko: '치즈 250그램 주세요.'
      },
      {
        es: 'Un poco más, por favor.',
        ko: '조금 더 주세요.'
      },
      {
        es: 'Un poco menos, por favor.',
        ko: '조금 덜 주세요.'
      },
      {
        es: 'Hoy voy al mercado.',
        ko: '오늘은 시장에 간다.'
      },
      {
        es: 'Primero compro medio kilo de carne y doscientos gramos de jamón.',
        ko: '먼저 고기 반 킬로와 하몽 200그램을 산다.'
      },
      {
        es: 'Le digo al dependiente: «Póngame seis lonchas de jamón, por favor».',
        ko: '직원에게 "하몽 여섯 장 주세요"라고 말한다.'
      },
      {
        es: 'En la panadería compro una barra de pan y pido que me la corten en rebanadas.',
        ko: '빵집에서는 빵 한 개를 사고 얇게 썰어 달라고 한다.'
      },
      {
        es: '¿Cuánto quería?',
        ko: '얼마나 원하셨나요? (과거)'
      }
    ]
  },
  {
    id: 'day69',
    day: 69,
    theme: 'home',
    emoji: '👕',
    title: '오늘의 옷차림',
    subtitle: '¿Qué me pongo hoy?',
    cards: [
      {
        es: 'la camiseta',
        ko: '티셔츠'
      },
      {
        es: 'la camisa',
        ko: '셔츠'
      },
      {
        es: 'la blusa',
        ko: '블라우스'
      },
      {
        es: 'el jersey',
        ko: '스웨터 (= el suéter)'
      },
      {
        es: 'la sudadera',
        ko: '맨투맨 티셔츠'
      },
      {
        es: 'el cárdigan',
        ko: '가디건'
      },
      {
        es: 'el chaleco',
        ko: '조끼'
      },
      {
        es: 'los pantalones',
        ko: '바지 (단수 un pantalón도 쓴다)'
      },
      {
        es: 'los vaqueros',
        ko: '청바지'
      },
      {
        es: 'los pantalones cortos',
        ko: '반바지'
      },
      {
        es: 'la falda',
        ko: '치마'
      },
      {
        es: 'la minifalda',
        ko: '미니스커트'
      },
      {
        es: 'los leggings',
        ko: '레깅스'
      },
      {
        es: 'el vestido',
        ko: '원피스, 드레스'
      },
      {
        es: 'el traje',
        ko: '정장, 슈트'
      },
      {
        es: 'la chaqueta',
        ko: '재킷'
      },
      {
        es: 'la cazadora',
        ko: '짧은 재킷, 점퍼'
      },
      {
        es: 'el abrigo',
        ko: '코트, 외투'
      },
      {
        es: 'la gabardina',
        ko: '트렌치코트'
      },
      {
        es: 'el plumífero',
        ko: '패딩'
      },
      {
        es: 'la parka',
        ko: '파카'
      },
      {
        es: 'las zapatillas',
        ko: '운동화'
      },
      {
        es: 'los botines',
        ko: '앵클부츠'
      },
      {
        es: 'los tacones',
        ko: '하이힐'
      },
      {
        es: 'las chanclas',
        ko: '플립플롭, 쪼리'
      },
      {
        es: 'el cinturón',
        ko: '벨트'
      },
      {
        es: 'la bufanda',
        ko: '목도리, 머플러'
      },
      {
        es: 'la gorra',
        ko: '캡모자'
      },
      {
        es: 'las gafas de sol',
        ko: '선글라스'
      },
      {
        es: 'los guantes',
        ko: '장갑'
      },
      {
        es: 'negro',
        ko: '검은색'
      },
      {
        es: 'blanco',
        ko: '흰색'
      },
      {
        es: 'gris',
        ko: '회색'
      },
      {
        es: 'azul',
        ko: '파란색'
      },
      {
        es: 'rojo',
        ko: '빨간색'
      },
      {
        es: 'rosa',
        ko: '분홍색'
      },
      {
        es: 'ponerse',
        ko: '입다, 신다 — 입는 동작 (재귀동사)'
      },
      {
        es: 'llevar',
        ko: '입고 있다 — 착용 상태'
      },
      {
        es: 'quedar',
        ko: '어울리다, 맞다 — 옷이 나에게 맞는 상태'
      },
      {
        es: 'hacer',
        ko: '하다, 만들다 (불규칙)'
      },
      {
        es: 'de manga corta',
        ko: '반팔의'
      },
      {
        es: 'de manga larga',
        ko: '긴팔의'
      },
      {
        es: 'sin mangas',
        ko: '민소매의'
      },
      {
        es: 'de rayas',
        ko: '줄무늬의'
      },
      {
        es: 'de cuadros',
        ko: '체크무늬의'
      },
      {
        es: 'de lunares',
        ko: '물방울무늬의'
      },
      {
        es: 'de flores',
        ko: '꽃무늬의'
      },
      {
        es: 'Me pongo + 옷',
        ko: '~을 입다 — 입는 동작을 말할 때'
      },
      {
        es: 'Llevo + 옷',
        ko: '~을 입고 있다 — 착용 상태를 말할 때'
      },
      {
        es: 'Me queda + 형용사',
        ko: '나에게 ~하게 맞다·어울리다'
      },
      {
        es: 'una camiseta de manga corta',
        ko: '반팔 티셔츠'
      },
      {
        es: 'una sudadera con capucha',
        ko: '후드티'
      },
      {
        es: 'una cazadora de cuero',
        ko: '가죽 재킷'
      },
      {
        es: 'una cazadora vaquera',
        ko: '청재킷'
      },
      {
        es: 'Me pongo una chaqueta.',
        ko: '재킷을 입어요.'
      },
      {
        es: 'Me pongo las botas.',
        ko: '부츠를 신어요.'
      },
      {
        es: 'Hoy me pongo una camiseta de manga corta.',
        ko: '오늘은 반팔 티셔츠를 입어요.'
      },
      {
        es: 'Hoy me pongo unos vaqueros y una camisa blanca.',
        ko: '오늘은 청바지와 흰 셔츠를 입어요.'
      },
      {
        es: 'Para la cena me pongo un vestido negro.',
        ko: '저녁 약속에는 검은색 원피스를 입어요.'
      },
      {
        es: 'Hace frío, así que me pongo un abrigo largo.',
        ko: '추워서 롱코트를 입어요.'
      },
      {
        es: 'Me pongo unas zapatillas porque voy a caminar mucho.',
        ko: '많이 걸을 거라 운동화를 신어요.'
      },
      {
        es: 'Llevo una chaqueta negra.',
        ko: '검은색 재킷을 입고 있어요.'
      },
      {
        es: 'Esta chaqueta me queda bien.',
        ko: '이 재킷은 저한테 잘 어울려요.'
      },
      {
        es: 'Estos pantalones me quedan grandes.',
        ko: '이 바지는 저한테 커요.'
      },
      {
        es: '¿Qué me pongo hoy?',
        ko: '오늘 뭐 입지?'
      },
      {
        es: '¿Qué te pusiste?',
        ko: '뭐 입었어요? (과거)'
      }
    ]
  },
  {
    id: 'day70',
    day: 70,
    theme: 'home',
    emoji: '👖',
    title: '옷 기장과 핏',
    subtitle: '¿Qué me pongo hoy? (largo y corte)',
    cards: [
      {
        es: 'la ropa',
        ko: '옷, 의류'
      },
      {
        es: 'la rodilla',
        ko: '무릎'
      },
      {
        es: 'el tobillo',
        ko: '발목'
      },
      {
        es: 'el suelo',
        ko: '바닥'
      },
      {
        es: 'el bajo',
        ko: '바짓단, 바지 기장'
      },
      {
        es: 'el corte',
        ko: '재단, 핏'
      },
      {
        es: 'largo/a',
        ko: '긴'
      },
      {
        es: 'corto/a',
        ko: '짧은'
      },
      {
        es: 'ajustado/a',
        ko: '몸에 붙는'
      },
      {
        es: 'holgado/a',
        ko: '여유 있는'
      },
      {
        es: 'ancho/a',
        ko: '넓은'
      },
      {
        es: 'recto/a',
        ko: '일자로 떨어지는'
      },
      {
        es: 'oversize',
        ko: '품이 아주 큰, 오버사이즈'
      },
      {
        es: 'cómodo',
        ko: '편한'
      },
      {
        es: 'preferir',
        ko: '더 좋아하다, 선호하다 (불규칙)'
      },
      {
        es: 'llegar',
        ko: '도착하다, 닿다 — 옷이 ~까지 오다'
      },
      {
        es: 'gustar',
        ko: '마음에 들다 — 옷이 주어가 된다'
      },
      {
        es: 'vestirse',
        ko: '옷을 입다 — 의류만 (재귀동사, 불규칙)'
      },
      {
        es: 'quitarse',
        ko: '벗다 (재귀동사)'
      },
      {
        es: 'probarse',
        ko: '입어보다, 착용해 보다 (재귀동사, 불규칙)'
      },
      {
        es: 'combinar',
        ko: '코디하다, 조합하다, 어울리다'
      },
      {
        es: 'de largo medio',
        ko: '중간 길이의'
      },
      {
        es: 'hasta la rodilla',
        ko: '무릎까지 오는'
      },
      {
        es: 'por encima de la rodilla',
        ko: '무릎 위까지 오는'
      },
      {
        es: 'por debajo de la rodilla',
        ko: '무릎 아래까지 오는'
      },
      {
        es: 'hasta los tobillos',
        ko: '발목까지 오는'
      },
      {
        es: 'hasta el suelo',
        ko: '바닥까지 오는'
      },
      {
        es: 'de tiro alto',
        ko: '하이웨이스트'
      },
      {
        es: 'de tiro medio',
        ko: '미드라이즈'
      },
      {
        es: 'de tiro bajo',
        ko: '로우라이즈'
      },
      {
        es: 'de corte recto',
        ko: '스트레이트 핏'
      },
      {
        es: 'de pierna ancha',
        ko: '와이드 핏'
      },
      {
        es: 'una falda midi',
        ko: '미디스커트'
      },
      {
        es: 'una falda larga',
        ko: '롱스커트'
      },
      {
        es: 'un vestido corto',
        ko: '짧은 원피스'
      },
      {
        es: 'un vestido midi',
        ko: '미디 원피스'
      },
      {
        es: 'un vestido largo',
        ko: '롱 원피스'
      },
      {
        es: 'pantalones largos',
        ko: '긴 바지'
      },
      {
        es: 'pantalones capri',
        ko: '카프리팬츠'
      },
      {
        es: 'una chaqueta corta',
        ko: '짧은 재킷'
      },
      {
        es: 'un bolso pequeño',
        ko: '작은 가방'
      },
      {
        es: 'Me llega hasta + 신체부위',
        ko: '(옷이) 나에게 ~까지 온다'
      },
      {
        es: 'Me queda demasiado + 형용사',
        ko: '나에게 너무 ~하다'
      },
      {
        es: 'Prefiero + 명사',
        ko: '~을 더 좋아한다'
      },
      {
        es: 'Me gusta / Me gustan + 명사',
        ko: '~이 마음에 든다 — 옷이 주어라 수에 맞춘다'
      },
      {
        es: 'queda / quedan',
        ko: '옷이 주어라 3인칭 단수·복수만 쓴다'
      },
      {
        es: 'ponerse vs vestirse',
        ko: 'ponerse는 신발·액세서리까지, vestirse는 의류에만'
      },
      {
        es: 'Prefiero las faldas midi.',
        ko: '미디스커트를 더 좋아해요.'
      },
      {
        es: 'Este vestido me llega hasta los tobillos.',
        ko: '이 원피스는 발목까지 와요.'
      },
      {
        es: 'Prefiero los pantalones de tiro alto.',
        ko: '하이웨이스트 바지를 선호해요.'
      },
      {
        es: 'Estos pantalones me quedan demasiado largos.',
        ko: '이 바지는 저한테 너무 길어요.'
      },
      {
        es: '¿Me pueden hacer el bajo?',
        ko: '바지 기장을 줄여 주실 수 있나요?'
      },
      {
        es: 'No me gusta la ropa demasiado ajustada.',
        ko: '너무 몸에 붙는 옷은 좋아하지 않아요.'
      },
      {
        es: 'Prefiero la ropa un poco holgada.',
        ko: '조금 여유 있는 옷을 선호해요.'
      },
      {
        es: 'Me gustan los pantalones de pierna ancha.',
        ko: '와이드팬츠를 좋아해요.'
      },
      {
        es: 'Me queda un poco largo.',
        ko: '저한테 조금 길어요.'
      },
      {
        es: 'Te queda muy bien.',
        ko: '너한테 정말 잘 어울려.'
      },
      {
        es: 'Esta camisa combina bien con estos pantalones.',
        ko: '이 셔츠는 이 바지와 잘 어울려요.'
      },
      {
        es: 'No sé qué ponerme.',
        ko: '뭘 입을지 모르겠어요.'
      },
      {
        es: 'Hoy hace frío, así que me pongo unos vaqueros y un jersey.',
        ko: '오늘은 추워서 청바지와 스웨터를 입어요.'
      },
      {
        es: 'Encima llevo una chaqueta corta.',
        ko: '그 위에 짧은 재킷을 입어요.'
      },
      {
        es: 'Los pantalones me llegan hasta los tobillos.',
        ko: '바지는 발목까지 와요.'
      },
      {
        es: 'Me pongo unas zapatillas porque son cómodas.',
        ko: '편해서 운동화를 신어요.'
      },
      {
        es: 'También llevo un bolso pequeño.',
        ko: '작은 가방도 들어요.'
      },
      {
        es: '¡Ya estoy lista para salir!',
        ko: '이제 외출 준비 끝! (남성은 listo)'
      },
      {
        es: '¿Qué vas a ponerte?',
        ko: '뭐 입을 거예요? (미래)'
      }
    ]
  },
  {
    id: 'day71',
    day: 71,
    theme: 'travel',
    emoji: '🌉',
    title: '징검다리 연휴',
    subtitle: '¿Qué hago durante el puente?',
    cards: [
      {
        es: 'el puente',
        ko: '징검다리 연휴 (원래 뜻은 다리)'
      },
      {
        es: 'el día laborable',
        ko: '평일, 근무일'
      },
      {
        es: 'el día festivo',
        ko: '공휴일'
      },
      {
        es: 'el festivo nacional',
        ko: '국가 공휴일'
      },
      {
        es: 'el festivo local',
        ko: '지역 공휴일'
      },
      {
        es: 'el día libre',
        ko: '쉬는 날, 휴가일'
      },
      {
        es: 'el día de descanso',
        ko: '휴무일'
      },
      {
        es: 'el fin de semana largo',
        ko: '긴 주말 연휴'
      },
      {
        es: 'la escapada',
        ko: '짧은 여행, 짧은 휴가'
      },
      {
        es: 'las vacaciones',
        ko: '휴가, 방학 (항상 복수)'
      },
      {
        es: 'aprovechar',
        ko: '활용하다, 유익하게 쓰다'
      },
      {
        es: 'tomarse',
        ko: '(시간을) 내다, 쓰다 (재귀동사)'
      },
      {
        es: 'pedirse',
        ko: '(자기 몫으로) 신청하다 (재귀동사, 불규칙)'
      },
      {
        es: 'irse',
        ko: '떠나다, 가 버리다 (재귀동사, 불규칙)'
      },
      {
        es: 'coger',
        ko: '잡다, (휴가를) 내다 — 스페인에서 많이 쓴다'
      },
      {
        es: 'quedarse',
        ko: '머무르다, 남다 (재귀동사)'
      },
      {
        es: 'visitar',
        ko: '방문하다'
      },
      {
        es: 'viajar',
        ko: '여행하다'
      },
      {
        es: 'días seguidos',
        ko: '~일 연속으로'
      },
      {
        es: 'visitar a + 사람',
        ko: '사람을 목적어로 쓸 때는 전치사 a를 붙인다'
      },
      {
        es: 'tomarse / pedirse + 휴가',
        ko: '재귀형을 쓰면 내가 내 몫으로 낸다는 뉘앙스'
      },
      {
        es: 'aprovechar + 기간 + para + 동사원형',
        ko: '~를 이용해서 …하다'
      },
      {
        es: 'irse de + 명사',
        ko: '~하러 떠나다 (irse de viaje, irse de escapada)'
      },
      {
        es: 'hacer puente',
        ko: '징검다리로 쉬다'
      },
      {
        es: 'cuatro días seguidos',
        ko: '4일 연속'
      },
      {
        es: 'cinco días libres seguidos',
        ko: '5일 연속 휴무'
      },
      {
        es: 'tomarse un día libre',
        ko: '하루 휴가를 내다'
      },
      {
        es: 'tomarse unos días libres',
        ko: '며칠 휴가를 내다'
      },
      {
        es: 'pedirse el lunes libre',
        ko: '월요일에 휴가를 신청하다'
      },
      {
        es: 'coger vacaciones',
        ko: '휴가를 내다'
      },
      {
        es: 'hacer una escapada',
        ko: '짧은 여행을 다녀오다'
      },
      {
        es: 'irse de viaje',
        ko: '여행을 떠나다'
      },
      {
        es: 'irse de escapada',
        ko: '짧게 여행을 떠나다'
      },
      {
        es: 'quedarse en casa',
        ko: '집에 머무르다'
      },
      {
        es: 'visitar a la familia',
        ko: '가족을 방문하다'
      },
      {
        es: 'salir con los amigos',
        ko: '친구들과 놀러 나가다'
      },
      {
        es: 'reservar un hotel',
        ko: '호텔을 예약하다'
      },
      {
        es: 'aprovechar el puente',
        ko: '징검다리 연휴를 활용하다'
      },
      {
        es: '¡Hago puente!',
        ko: '징검다리로 쭉 쉬어요!'
      },
      {
        es: 'Este lunes hago puente.',
        ko: '이번 월요일은 징검다리로 쉬어요.'
      },
      {
        es: '¿Haces puente este viernes?',
        ko: '이번 금요일 징검다리로 쉬어요?'
      },
      {
        es: 'Mañana es festivo, así que hacemos puente.',
        ko: '내일이 공휴일이라서 징검다리로 쉬어요.'
      },
      {
        es: 'Tenemos cuatro días seguidos de descanso.',
        ko: '나흘 연속으로 쉬어요.'
      },
      {
        es: 'Tengo cinco días libres seguidos.',
        ko: '5일 연속으로 쉬어요.'
      },
      {
        es: 'Me tomo el viernes libre.',
        ko: '금요일에 휴가를 낼 거예요.'
      },
      {
        es: 'Me pedí el lunes libre.',
        ko: '월요일에 휴가를 신청했어요. (과거)'
      },
      {
        es: 'Voy a aprovechar el puente para viajar.',
        ko: '징검다리 연휴를 이용해서 여행할 거예요.'
      },
      {
        es: 'Vamos a hacer una escapada a Sevilla.',
        ko: '세비야로 짧은 여행을 다녀올 거예요.'
      },
      {
        es: 'Nos vamos de escapada este puente.',
        ko: '이번 연휴에 짧게 여행을 떠나요.'
      },
      {
        es: 'Me quedo en casa y descanso.',
        ko: '집에 머물면서 쉬어요.'
      },
      {
        es: '¿Qué haces durante el puente?',
        ko: '연휴 동안 뭐 해요?'
      },
      {
        es: '¿Qué harás durante el puente?',
        ko: '연휴 동안 뭐 할 거예요? (미래)'
      }
    ]
  },
  {
    id: 'day72',
    day: 72,
    theme: 'travel',
    emoji: '🧳',
    title: '연휴 계획 말하기',
    subtitle: '¿Qué hago durante el puente? (planes)',
    cards: [
      {
        es: 'el tráfico',
        ko: '교통, 교통량'
      },
      {
        es: 'el atasco',
        ko: '교통체증, 정체'
      },
      {
        es: 'la carretera',
        ko: '도로, 국도'
      },
      {
        es: 'el turista',
        ko: '관광객'
      },
      {
        es: 'el precio',
        ko: '가격'
      },
      {
        es: 'alto',
        ko: '높은'
      },
      {
        es: 'haber',
        ko: '완료시제 조동사 (불규칙) — 비인칭 hay는 별도'
      },
      {
        es: 'soler',
        ko: '보통 ~하다, ~하는 편이다 (불규칙)'
      },
      {
        es: 'subir',
        ko: '오르다, 올라가다 — 가격이 오를 때도 쓴다'
      },
      {
        es: 'pasar',
        ko: '보내다, 지내다 — 시간을 보낼 때'
      },
      {
        es: 'encantar',
        ko: '정말 좋아하다 (gustar형 — 좋아하는 대상이 주어)'
      },
      {
        es: 'habrá + 명사',
        ko: '~이 있을 것이다 — hay의 미래형, 미래 추측'
      },
      {
        es: 'soler + 동사원형',
        ko: '보통 ~한다, ~하는 편이다'
      },
      {
        es: 'Me encanta / Me encantan + 명사',
        ko: '~이 정말 좋다 — 뒤 명사의 수에 맞춘다'
      },
      {
        es: 'Como + 이유 문장',
        ko: '~하니까, ~라서 (문장 맨 앞에서 이유를 말할 때)'
      },
      {
        es: 'un puente de + 숫자 + días',
        ko: 'N일 연휴'
      },
      {
        es: 'festivo · día libre · puente · vacaciones',
        ko: '공휴일 하루 / 개인적으로 쉬는 날 / 공휴일과 주말을 이은 연휴 / 비교적 긴 휴가'
      },
      {
        es: 'mucho tráfico',
        ko: '심한 교통량, 차가 많음'
      },
      {
        es: 'los hoteles llenos',
        ko: '만실인 호텔'
      },
      {
        es: 'los precios más altos',
        ko: '더 비싼 가격'
      },
      {
        es: 'un puente de tres días',
        ko: '3일 연휴'
      },
      {
        es: 'pasar una noche en un hotel',
        ko: '호텔에서 하룻밤을 보내다'
      },
      {
        es: 'viajar con la familia',
        ko: '가족과 여행하다'
      },
      {
        es: 'salir temprano',
        ko: '일찍 출발하다'
      },
      {
        es: 'descansar en casa',
        ko: '집에서 쉬다'
      },
      {
        es: '¿Trabajas este viernes?',
        ko: '이번 금요일에 일해요?'
      },
      {
        es: 'No, hago puente.',
        ko: '아니요, 징검다리로 쉬어요.'
      },
      {
        es: '¡Qué bien!',
        ko: '좋겠네요!'
      },
      {
        es: '¿Cuántos días tienes libres?',
        ko: '며칠 쉬어요?'
      },
      {
        es: '¿Vas a viajar?',
        ko: '여행 가요?'
      },
      {
        es: '¿A dónde vas este puente?',
        ko: '이번 연휴에 어디 가요?'
      },
      {
        es: '¿Te quedas en casa o te vas de viaje?',
        ko: '집에 있어요, 아니면 여행 가요?'
      },
      {
        es: 'Vamos a aprovechar el puente para hacer una escapada.',
        ko: '연휴를 이용해서 짧은 여행을 다녀올 거예요.'
      },
      {
        es: 'Hay mucho tráfico porque es puente.',
        ko: '연휴라서 차가 많아요.'
      },
      {
        es: 'Los hoteles están llenos.',
        ko: '호텔이 꽉 찼어요.'
      },
      {
        es: 'Los precios suelen subir durante el puente.',
        ko: '연휴 기간에는 가격이 오르는 편이에요.'
      },
      {
        es: 'Hay muchos turistas.',
        ko: '관광객이 많아요.'
      },
      {
        es: 'Este viernes es festivo.',
        ko: '이번 금요일은 공휴일이에요.'
      },
      {
        es: 'Me he pedido el lunes libre.',
        ko: '월요일에 휴가를 신청했어요. (현재완료)'
      },
      {
        es: 'Este fin de semana es largo.',
        ko: '이번 주말은 연휴예요.'
      },
      {
        es: 'Este viernes es festivo, así que tenemos un puente de tres días.',
        ko: '이번 금요일은 공휴일이라 3일 연휴예요.'
      },
      {
        es: 'Voy a aprovechar el puente para descansar y hacer una escapada.',
        ko: '연휴를 이용해서 쉬고 짧은 여행을 다녀올 거예요.'
      },
      {
        es: 'Voy a viajar con mi familia y pasar una noche en un hotel.',
        ko: '가족과 여행을 가서 호텔에서 하룻밤을 보낼 거예요.'
      },
      {
        es: 'Como habrá mucho tráfico, vamos a salir temprano.',
        ko: '교통체증이 심할 테니 일찍 출발할 거예요.'
      },
      {
        es: 'El último día quiero quedarme en casa y descansar.',
        ko: '마지막 날에는 집에서 쉬고 싶어요.'
      },
      {
        es: '¡Me encantan los puentes!',
        ko: '저는 이런 연휴가 정말 좋아요!'
      },
      {
        es: '¿Qué hiciste durante el puente?',
        ko: '연휴 동안 뭐 했어요? (과거)'
      }
    ]
  },
  {
    id: 'day73',
    day: 73,
    theme: 'people',
    emoji: '😟',
    title: '신경 쓰이는 것',
    subtitle: '¿Qué me preocupa?',
    cards: [
      {
        es: 'el examen',
        ko: '시험'
      },
      {
        es: 'el futuro',
        ko: '미래'
      },
      {
        es: 'el ruido',
        ko: '소음'
      },
      {
        es: 'el olor',
        ko: '냄새'
      },
      {
        es: 'la gente',
        ko: '사람들 (단수 취급)'
      },
      {
        es: 'los demás',
        ko: '다른 사람들, 남들'
      },
      {
        es: 'los hijos',
        ko: '자녀, 아이들'
      },
      {
        es: 'el correo',
        ko: '이메일, 우편'
      },
      {
        es: 'preocupar',
        ko: '신경 쓰이게 하다, 걱정시키다 (gustar형)'
      },
      {
        es: 'molestar',
        ko: '거슬리다, 귀찮게 하다 (gustar형)'
      },
      {
        es: 'importar',
        ko: '중요하다, 신경 쓰이다 (gustar형)'
      },
      {
        es: 'pensar',
        ko: '생각하다 (불규칙)'
      },
      {
        es: 'decir',
        ko: '말하다 (불규칙)'
      },
      {
        es: 'intentar',
        ko: '시도하다, ~하려고 하다'
      },
      {
        es: '간접목적대명사 + 3인칭 동사',
        ko: '역구조 — 신경 쓰게 만드는 것이 주어라 동사는 3인칭'
      },
      {
        es: 'Me preocupa + 단수명사 / 동사원형',
        ko: '~이 신경 쓰인다, ~할까 봐 걱정된다'
      },
      {
        es: 'Me preocupan + 복수명사',
        ko: '~들이 신경 쓰인다 — 주어의 수에 맞춘다'
      },
      {
        es: 'preocupar · molestar · importar',
        ko: '걱정돼서 / 거슬려서 / 중요해서 신경 쓰인다'
      },
      {
        es: 'lo que + 동사',
        ko: '~하는 것'
      },
      {
        es: 'Me molesta que + 접속법',
        ko: '다른 사람이 ~하는 게 거슬린다'
      },
      {
        es: 'No me importa lo que + 접속법',
        ko: '남들이 ~하든 신경 쓰지 않는다'
      },
      {
        es: 'estar pendiente de + 명사',
        ko: '~을 계속 신경 쓰고 챙기다'
      },
      {
        es: 'intentar + 동사원형',
        ko: '~하려고 하다'
      },
      {
        es: 'últimamente',
        ko: '요즘, 최근에'
      },
      {
        es: 'llegar tarde',
        ko: '늦다, 지각하다'
      },
      {
        es: 'darle vueltas',
        ko: '계속 곱씹다, 자꾸 생각하다'
      },
      {
        es: 'no darle tantas vueltas',
        ko: '너무 곱씹지 않다'
      },
      {
        es: 'hacer caso',
        ko: '신경 쓰다, 상대해 주다'
      },
      {
        es: 'estar pendiente del móvil',
        ko: '휴대폰을 계속 신경 쓰고 있다'
      },
      {
        es: 'lo que piensan los demás',
        ko: '다른 사람들이 생각하는 것'
      },
      {
        es: 'Me preocupa el examen.',
        ko: '시험이 신경 쓰여요.'
      },
      {
        es: 'Me preocupa mi futuro.',
        ko: '내 미래가 걱정돼요.'
      },
      {
        es: 'Me preocupa llegar tarde.',
        ko: '늦을까 봐 신경 쓰여요.'
      },
      {
        es: 'Me preocupa lo que piensa la gente.',
        ko: '사람들이 어떻게 생각하는지 신경 쓰여요.'
      },
      {
        es: 'Me preocupan mis hijos.',
        ko: '아이들이 걱정돼요.'
      },
      {
        es: 'Me molesta mucho el olor.',
        ko: '그 냄새가 너무 거슬려요.'
      },
      {
        es: 'Me molesta que la gente hable tan alto.',
        ko: '사람들이 너무 크게 말하는 게 신경 쓰여요. (접속법)'
      },
      {
        es: 'No me importa lo que digan los demás.',
        ko: '사람들이 뭐라고 하든 신경 안 써요. (접속법)'
      },
      {
        es: 'No me importa.',
        ko: '상관없어요. 신경 안 써요.'
      },
      {
        es: 'No le hagas caso.',
        ko: '신경 쓰지 마. 상대하지 마.'
      },
      {
        es: 'Estoy pendiente de los niños.',
        ko: '아이들을 계속 신경 쓰며 보고 있어요.'
      },
      {
        es: 'Tengo que estar pendiente del correo.',
        ko: '이메일을 계속 확인하고 있어야 해요.'
      },
      {
        es: 'Últimamente hay varias cosas que me preocupan.',
        ko: '요즘 신경 쓰이는 게 몇 가지 있어요.'
      },
      {
        es: 'Me preocupa llegar tarde al trabajo.',
        ko: '회사에 늦을까 봐 신경 쓰여요.'
      },
      {
        es: 'También me molesta mucho el ruido cuando trabajo.',
        ko: '일할 때 소음도 많이 신경 쓰여요.'
      },
      {
        es: 'A veces me importa demasiado lo que piensan los demás.',
        ko: '가끔 다른 사람들이 어떻게 생각하는지 너무 신경 써요.'
      },
      {
        es: 'Pero intento no darle tantas vueltas.',
        ko: '하지만 너무 곱씹지 않으려고 해요.'
      },
      {
        es: 'Últimamente estoy un poco preocupada.',
        ko: '요즘 조금 신경 쓰이는 게 있어요. (남성은 preocupado)'
      },
      {
        es: '¿Qué te preocupa?',
        ko: '뭐가 신경 쓰여요?'
      },
      {
        es: '¿Qué te preocupó?',
        ko: '뭐가 신경 쓰였어요? (과거)'
      }
    ]
  },
  {
    id: 'day74',
    day: 74,
    theme: 'people',
    emoji: '👀',
    title: '~해 보여',
    subtitle: '¿Cómo se ve?',
    cards: [
      {
        es: 'la pinta',
        ko: '겉모습, 보기'
      },
      {
        es: 'el plan',
        ko: '계획, 약속'
      },
      {
        es: 'la película',
        ko: '영화'
      },
      {
        es: 'la comida',
        ko: '음식, 식사'
      },
      {
        es: 'feliz',
        ko: '행복한'
      },
      {
        es: 'joven',
        ko: '젊은, 어린'
      },
      {
        es: 'cansado/a',
        ko: '피곤한'
      },
      {
        es: 'preocupado/a',
        ko: '걱정하는'
      },
      {
        es: 'nervioso/a',
        ko: '긴장한'
      },
      {
        es: 'ocupado/a',
        ko: '바쁜'
      },
      {
        es: 'enfermo/a',
        ko: '아픈'
      },
      {
        es: 'parecer',
        ko: '~해 보이다, ~인 것 같다 (불규칙)'
      },
      {
        es: 'ver',
        ko: '보다 (불규칙)'
      },
      {
        es: 'parecer + 형용사',
        ko: '~해 보이다 — 보이는 대상의 인칭에 맞춰 활용한다'
      },
      {
        es: 'Parece nervioso / nerviosa',
        ko: '형용사는 대상의 성·수에 맞춘다'
      },
      {
        es: 'te queda + 형용사 / 부사',
        ko: '너한테 ~하게 어울린다'
      },
      {
        es: 'más + 형용사 + de lo que + 동사',
        ko: '실제보다 더 ~한'
      },
      {
        es: 'tener buena pinta',
        ko: '좋아 보이다, 맛있어 보이다 — 사물·음식·장소·계획에 두루 쓴다'
      },
      {
        es: 'tener mala cara',
        ko: '안색이 안 좋다'
      },
      {
        es: 'quedar genial',
        ko: '아주 잘 어울리다'
      },
      {
        es: 'quedar mejor',
        ko: '더 잘 어울리다'
      },
      {
        es: 'parecer más joven',
        ko: '더 어려 보이다'
      },
      {
        es: 'Este restaurante tiene buena pinta.',
        ko: '이 식당 괜찮아 보여요.'
      },
      {
        es: 'Ese plan tiene buena pinta.',
        ko: '그 계획 괜찮아 보여요.'
      },
      {
        es: 'La película tiene buena pinta.',
        ko: '그 영화 재미있어 보여요.'
      },
      {
        es: 'Esta comida tiene muy buena pinta.',
        ko: '이 음식 정말 맛있어 보여요.'
      },
      {
        es: 'Ese vestido te queda genial.',
        ko: '그 원피스 너한테 정말 잘 어울려.'
      },
      {
        es: 'Te queda mejor el negro.',
        ko: '검은색이 너한테 더 잘 어울려.'
      },
      {
        es: 'Pareces feliz.',
        ko: '행복해 보여.'
      },
      {
        es: 'Pareces cansado. / Pareces cansada.',
        ko: '피곤해 보여. (남 / 여)'
      },
      {
        es: 'Pareces preocupado. / Pareces preocupada.',
        ko: '걱정 있어 보여. (남 / 여)'
      },
      {
        es: 'Pareces nervioso. / Pareces nerviosa.',
        ko: '긴장해 보여. (남 / 여)'
      },
      {
        es: 'Pareces ocupado. / Pareces ocupada.',
        ko: '바빠 보여. (남 / 여)'
      },
      {
        es: 'Pareces enfermo. / Pareces enferma.',
        ko: '아파 보여. (남 / 여)'
      },
      {
        es: 'Pareces triste.',
        ko: '슬퍼 보여.'
      },
      {
        es: 'Tienes mala cara.',
        ko: '안색이 안 좋아 보여.'
      },
      {
        es: 'Pareces más joven.',
        ko: '더 어려 보여.'
      },
      {
        es: 'Pareces más joven de lo que eres.',
        ko: '실제 나이보다 어려 보여.'
      },
      {
        es: 'Hoy pareces cansada.',
        ko: '오늘 피곤해 보여.'
      },
      {
        es: '¿Estás bien? Pareces preocupada.',
        ko: '괜찮아? 걱정이 있어 보여.'
      },
      {
        es: '¿Cómo se ve?',
        ko: '어때 보여요?'
      },
      {
        es: '¿Cómo se veía?',
        ko: '어때 보였어요? (과거)'
      }
    ]
  },
  {
    id: 'day75',
    day: 75,
    theme: 'people',
    emoji: '🪞',
    title: '인상 말하기',
    subtitle: '¿Cómo se ve? (verse)',
    cards: [
      {
        es: 'el lugar',
        ko: '장소, 곳'
      },
      {
        es: 'la fiesta',
        ko: '파티'
      },
      {
        es: 'la persona',
        ko: '사람'
      },
      {
        es: 'caro/a',
        ko: '비싼'
      },
      {
        es: 'difícil',
        ko: '어려운'
      },
      {
        es: 'fácil',
        ko: '쉬운'
      },
      {
        es: 'divertido/a',
        ko: '재미있는'
      },
      {
        es: 'simpático/a',
        ko: '친절한, 상냥한'
      },
      {
        es: 'guapo/a',
        ko: '잘생긴, 예쁜'
      },
      {
        es: 'elegante',
        ko: '우아한, 세련된'
      },
      {
        es: 'natural',
        ko: '자연스러운'
      },
      {
        es: 'nuevo/a',
        ko: '새로운'
      },
      {
        es: 'delicioso/a',
        ko: '맛있는'
      },
      {
        es: 'verse',
        ko: '~해 보이다 (재귀동사)'
      },
      {
        es: 'probar',
        ko: '맛보다, 시험해 보다 (불규칙)'
      },
      {
        es: 'verse + 형용사',
        ko: '~해 보이다 — 인칭에 따라 재귀대명사가 바뀐다'
      },
      {
        es: 'Te ves / Se ve + 형용사',
        ko: '너는 / 그는 ~해 보여'
      },
      {
        es: 'Se ve guapo / guapa',
        ko: '형용사는 주어의 성·수에 맞춘다'
      },
      {
        es: 'parecer vs verse',
        ko: '스페인은 parecer·estar·quedar, 중남미는 verse를 많이 쓴다'
      },
      {
        es: 'parecer + 명사',
        ko: '~인 것 같다 — 명사가 올 때도 쓴다'
      },
      {
        es: 'quedar muy bien',
        ko: '아주 잘 어울리다'
      },
      {
        es: 'no quedar bien',
        ko: '잘 어울리지 않다'
      },
      {
        es: 'buena persona',
        ko: '좋은 사람'
      },
      {
        es: 'una tarta de chocolate',
        ko: '초콜릿 케이크'
      },
      {
        es: 'Te ves muy bien.',
        ko: '아주 좋아 보여.'
      },
      {
        es: 'Te ves muy guapa.',
        ko: '너 정말 예뻐 보여.'
      },
      {
        es: 'Hoy te ves genial.',
        ko: '오늘 정말 멋져 보여.'
      },
      {
        es: 'Te ves muy elegante.',
        ko: '아주 우아해 보여.'
      },
      {
        es: 'Se ve feliz.',
        ko: '그는 행복해 보여.'
      },
      {
        es: 'Se ve muy natural.',
        ko: '아주 자연스러워 보여.'
      },
      {
        es: 'Parece muy caro.',
        ko: '아주 비싸 보여.'
      },
      {
        es: 'Parece más caro de lo que es.',
        ko: '실제 가격보다 비싸 보여.'
      },
      {
        es: 'Parece difícil.',
        ko: '어려워 보여.'
      },
      {
        es: 'Parece fácil.',
        ko: '쉬워 보여.'
      },
      {
        es: 'El examen parece difícil.',
        ko: '그 시험 어려워 보여.'
      },
      {
        es: 'Parece más fácil de lo que pensaba.',
        ko: '생각했던 것보다 쉬워 보여.'
      },
      {
        es: 'Parece divertido.',
        ko: '재미있어 보여.'
      },
      {
        es: 'La fiesta parece divertida.',
        ko: '파티가 재미있어 보여.'
      },
      {
        es: '¡Qué divertido parece!',
        ko: '정말 재미있어 보인다!'
      },
      {
        es: 'Parece simpático.',
        ko: '친절해 보여.'
      },
      {
        es: 'Parece buena persona.',
        ko: '좋은 사람 같아.'
      },
      {
        es: 'Hoy voy a una cafetería nueva.',
        ko: '오늘 새로운 카페에 가요.'
      },
      {
        es: 'El lugar tiene muy buena pinta.',
        ko: '카페가 정말 좋아 보여요.'
      },
      {
        es: 'Pido una tarta de chocolate que parece deliciosa.',
        ko: '맛있어 보이는 초콜릿 케이크를 주문해요.'
      },
      {
        es: 'Mi amiga lleva un vestido nuevo y le queda muy bien.',
        ko: '친구는 새 원피스를 입었는데 아주 잘 어울려요.'
      },
      {
        es: 'Pero parece un poco cansada.',
        ko: '그런데 조금 피곤해 보여요.'
      },
      {
        es: '¡La tarta tiene muy buena pinta! Vamos a probarla.',
        ko: '케이크 정말 맛있어 보여! 먹어 보자.'
      },
      {
        es: '¿Cómo se verá?',
        ko: '어때 보일까요? (미래)'
      }
    ]
  }
];
