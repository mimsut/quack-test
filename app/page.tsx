"use client"

import { useState, useEffect } from "react"
import ResultPage from "@/components/result-page"
import * as gtag from "@/lib/gtag"

// Duck personality types data (same as before)
const duckTypes = {
  가창오리: {
    name: "가창오리",
    tags: ["차분함", "관찰자"],
    description:
      "가창오리는 카페에서도 구석자리를 선호하는 조용한 관찰자입니다. 다른 사람들이 떠들썩하게 이야기할 때도 묵묵히 듣고만 있다가, 정말 중요한 순간에 한 마디로 핵심을 찌르는 타입이에요. '말이 적다'고 오해받지만 사실은 머릿속에서 모든 상황을 분석하고 있는 중이랍니다. 실수를 극도로 싫어해서 완벽할 때까지 준비하고 또 준비하죠. 친구들은 가창오리를 '믿음직한 조언자'라고 부르지만, 정작 본인은 '내가 뭘 안다고...'라며 겸손해합니다.",
    strengths: ["세심함", "침착함", "관찰력", "인내심", "배려심"],
    weaknesses: ["과도한 신중함", "결정 미룸", "표현력 부족", "기회 상실", "타인의 시선 과의식"],
    compatible: ["홍머리오리", "청둥오리"],
    incompatible: ["쇠오리", "발구지"],
  },
  고방오리: {
    name: "고방오리",
    tags: ["논리적", "계획형"],
    description:
      "고방오리는 플래너 없이는 못 사는 완벽주의자입니다. 여행을 가도 1시간 단위로 일정을 짜고, 맛집도 미리 예약해두는 타입이에요. '계획대로 되지 않으면 불안해 죽겠다'가 입버릇이지만, 덕분에 주변 사람들은 항상 안전하고 체계적인 경험을 할 수 있죠. 친구들이 '너 때문에 우리가 편하게 산다'고 고마워하면 뿌듯해하면서도 '당연한 거 아니야?'라고 쿨하게 답합니다. 하지만 갑작스러운 변화에는 당황하며 '이건 계획에 없었는데...'라고 중얼거려요.",
    strengths: ["철저함", "계획성", "분석력", "책임감", "집중력"],
    weaknesses: ["융통성 부족", "완벽주의", "스트레스 민감", "변화 적응력 부족", "우유부단함"],
    compatible: ["발구지", "흰뺨오리"],
    incompatible: ["호사비오리", "청머리오리"],
  },
  발구지: {
    name: "발구지",
    tags: ["자유", "즉흥형"],
    description:
      "발구지는 '인생은 즉흥이지!'를 외치며 사는 자유로운 영혼입니다. 계획? 그게 뭔가요? 오늘 갑자기 제주도 가자고 해도 1시간 만에 짐 싸고 출발하는 타입이에요. 새로운 도전을 두려워하지 않고, 실패해도 '그래도 재밌었잖아!'라며 웃어넘깁니다. 하지만 루틴한 일상이 계속되면 답답해서 못 견디고, 갑자기 머리를 자르거나 새로운 취미를 시작하죠. 친구들은 발구지와 함께 있으면 '인생이 드라마틱해진다'고 말하지만, 가끔은 '좀 진정해...'라고 말리기도 해요.",
    strengths: ["적응력", "모험심", "사교성", "추진력", "도전정신"],
    weaknesses: ["지속력 부족", "충동성", "감정 기복", "계획 부족", "고집"],
    compatible: ["비오리", "원앙"],
    incompatible: ["고방오리", "알락오리"],
  },
  비오리: {
    name: "비오리",
    tags: ["감성적", "섬세함"],
    description:
      "비오리는 감정의 온도계 같은 존재입니다. 상대방의 기분이 조금만 안 좋아도 바로 알아채고 '괜찮아? 무슨 일 있어?'라고 물어보죠. 친구가 힘들어하면 밤새 전화를 받아주고, 기뻐하면 함께 기뻐해주는 천사 같은 존재예요. 하지만 루틴한 일상이 계속되면 답답해서 못 견디고, 갑자기 머리를 자르거나 새로운 취미를 시작하죠. 친구들은 발구지와 함께 있으면 '인생이 드라마틱해진다'고 말하지만, 가끔은 '좀 진정해...'라고 말리기도 해요.",
    strengths: ["공감력", "배려심", "섬세함", "경청", "조율능력"],
    weaknesses: ["감정 기복", "우울감", "자기희생", "소심함", "스트레스에 취약"],
    compatible: ["청둥오리", "점무늬오리"],
    incompatible: ["홍머리오리", "쇠오리"],
  },
  바다비오리: {
    name: "바다비오리",
    tags: ["논리", "전략가"],
    description:
      "바다비오리는 모든 것을 논리적으로 분석하는 냉철한 전략가입니다. 감정보다는 팩트와 데이터를 중시하고, '그게 합리적인 선택이야?'가 입버릇이에요. 친구들의 고민 상담을 들어줄 때도 감정적 위로보다는 현실적인 해결책을 제시하죠. '울지 말고 이렇게 해봐'라고 말하지만, 정작 본인도 속으로는 '내가 너무 차갑게 말한 건 아닐까?' 걱정합니다. 토론을 좋아하고 새로운 지식을 습득하는 걸 즐기지만, 가끔 '인간미가 부족하다'는 소리를 들어서 서운해해요.",
    strengths: ["논리적 사고", "분석력", "설득력", "집중력", "문제해결력"],
    weaknesses: ["감정표현 부족", "융통성 부족", "사회적 거리감", "완고함", "고립감"],
    compatible: ["알락오리", "혹부리오리"],
    incompatible: ["비오리", "호사비오리"],
  },
  호사비오리: {
    name: "호사비오리",
    tags: ["낭만", "열정파"],
    description:
      "호사비오리는 일상 속에서도 로맨스를 찾는 감성 충만한 예술가 타입입니다. 카페에서 라떼 아트를 보고 감동하고, 노을을 보면 사진을 찍어 SNS에 올리며 시 같은 글을 써요. 관심 있는 것에는 미친 듯이 빠져들지만, 흥미가 떨어지면 금세 다른 것으로 넘어가죠. '이번엔 진짜야!'라고 말하며 새로운 취미를 시작하지만, 3개월 후엔 또 다른 걸 하고 있어요. 친구들은 호사비오리의 열정적인 모습을 부러워하지만, 가끔은 '좀 현실적으로 생각해봐'라고 조언하기도 합니다.",
    strengths: ["몰입력", "창의성", "표현력", "열정", "예술적 감각"],
    weaknesses: ["감정기복", "산만함", "지속력 부족", "충동성", "계획 부족"],
    compatible: ["원앙", "흰뺨검둥오리"],
    incompatible: ["바다비오리", "고방오리"],
  },
  원앙: {
    name: "원앙",
    tags: ["사교적", "중재자"],
    description:
      "원앙은 어디서든 인기 만점인 사교계의 스타입니다. 파티에 가면 모든 사람과 친해지고, 어색한 분위기를 순식간에 화기애애하게 만드는 마법사예요. '우리 다 친구야!'라는 마음으로 사람들을 대하고, 갈등이 생기면 중간에서 조율하려고 노력하죠. 하지만 혼자 있는 시간이 길어지면 불안해하고, 모든 사람에게 좋은 사람이 되려다 보니 가끔 자신을 잃어버리기도 해요. 친구들은 원앙 덕분에 새로운 사람들을 많이 만나게 되지만, 가끔은 '너도 좀 쉬어'라고 걱정해줍니다.",
    strengths: ["사교성", "중재력", "활발함", "친근함", "네트워킹"],
    weaknesses: ["고독 회피", "과도한 사교", "감정 기복", "자기비판", "일관성 부족"],
    compatible: ["홍머리오리", "청머리오리"],
    incompatible: ["가창오리", "흰죽지"],
  },
  쇠오리: {
    name: "쇠오리",
    tags: ["열정적", "리더형"],
    description:
      "쇠오리는 타고난 리더로, '하면 된다!'를 외치며 앞장서는 추진력의 화신입니다. 목표를 정하면 반드시 달성하려고 하고, 팀 프로젝트에서는 자연스럽게 리더 역할을 맡아요. '포기'라는 단어는 사전에 없고, 어려움이 닥쳐도 '것도 극복할 수 있어!'라며 긍정적으로 생각하죠. 하지만 가끔 너무 성급하게 밀어붙여서 팀원들이 부담스러워하기도 해요. '왜 이렇게 안 되지?'라며 답답해하지만, 결국엔 모든 걸 해내는 대단한 실행력을 가지고 있습니다.",
    strengths: ["추진력", "결단력", "리더십", "책임감", "목표지향"],
    weaknesses: ["배려 부족", "완고함", "독선", "감정 조절 부족", "협력 부족"],
    compatible: ["가창오리", "점무늬오리"],
    incompatible: ["비오리", "넓적부리"],
  },
  청둥오리: {
    name: "청둥오리",
    tags: ["유연함", "적응력"],
    description:
      "청둥오리는 물 흐르듯 자연스럽게 살아가는 적응의 달인입니다. 계획이 틀어져도 '뭐 어때, 이것도 나름 재밌네!'라며 웃어넘기고, 새로운 환경에도 금세 적응해. 스트레스를 받아도 하룻밤 자고 나면 언제 그랬냐는 듯 회복하는 놀라운 회복력을 가지고 있죠. 하지만 너무 유연해서 가끔은 '네 의견은 뭐야?'라는 질문에 당황하기도 해요. 친구들은 청둥오리와 함께 으면 편안하다고 하지만, 가끔은 '좀 더 확실한 입장을 가져봐'라고 조언하기도 합니다.",
    strengths: ["적응력", "유연성", "회복력", "대인관계능력", "낙천성"],
    weaknesses: ["우유부단함", "집중력 부족", "반복에 취약", "산만함", "책임 회피"],
    compatible: ["점무늬오리", "홍머리오리"],
    incompatible: ["혹부리오리", "알락오리"],
  },
  청머리오리: {
    name: "청머리오리",
    tags: ["창의적", "아이디어"],
    description:
      "청머리오리는 아이디어 뱅크 같은 존재로, 하루에도 수십 가지 새로운 생각을 쏟아내는 창의력의 소유자입니다. '이거 어때? 저거는 어때?'라며 끊임없이 새로운 제안을 하고, 기존의 틀을 깨는 걸 좋아해요. 브레인스토밍 시간에는 없어서는 안 될 존재이지만, 정작 실행 단계에서는 '음... 이건 좀 복잡하네'라며 뒤로 빠지기도 하죠. 친구들은 청머리오리의 기발한 아이디어에 감탄하지만, 가끔은 '이번엔 끝까지 해봐'라고 응원해줍니다.",
    strengths: ["창의성", "혁신성", "다양성 추구", "아이디어력", "호기심"],
    weaknesses: ["실행력 부족", "계획성 부족", "산만함", "집중력 부재", "변덕"],
    compatible: ["흰뺨오리", "알락오리"],
    incompatible: ["고방오리", "바다비오리"],
  },
  홍머리오리: {
    name: "홍머리오리",
    tags: ["직설적", "솔직함"],
    description:
      "홍머리오리는 '솔직함이 최고야!'를 신조로 사는 직설적인 화법의 소유자입니다. 생각나는 대로 말하고, 좋은 건 좋다, 싫은 건 싫다고 분명하게 표현해요. 친구가 이상한 옷을 입고 나오면 '그거 별로야'라고 바로 말하지만, 덕분에 친구들은 홍머리오리 앞에서만큼은 가식 없이 지낼 수 있죠. 하지만 가끔 너무 직설적인 말로 상대방에게 상처를 주기도 해서, 나중에 '내가 너무 심했나?'라며 후회하기도 합니다. 그래도 진심이 느껴지는 조언을 해주는 믿음직한 친구예요.",
    strengths: ["솔직함", "투명함", "결단력", "직관력", "용기"],
    weaknesses: ["과격함", "감정폭발", "융통성 부족", "공격성", "사회적 긴장"],
    compatible: ["원앙", "점무늬오리"],
    incompatible: ["비오리", "가창오리"],
  },
  알락오리: {
    name: "알락오리",
    tags: ["분석적", "세심함"],
    description:
      "알락오리는 디테일의 신으로, 남들이 놓치는 작은 부분까지 꼼꼼히 챙기는 완벽주의자입니다. 보고서를 쓸 때도 오타 하나까지 체크하고, 여행 계획을 세울 때도 날씨부터 교통편까지 모든 걸 미리 조사해요. '혹시 모르니까'가 입버릇이고, 실수를 극도로 싫어해서 몇 번이고 검토하죠. 친구들은 알락오리 덕분에 실수 없는 완벽한 결과를 얻지만, 가끔은 '너무 스트레스 받지 마'라고 걱정해줍니다. 하지만 알락오리는 '이게 내 스타일이야'라며 자신만의 방식을 고수해요.",
    strengths: ["꼼꼼함", "정확성", "분석력", "개선의지", "철저함"],
    weaknesses: ["완벽주의", "속도 저하", "유연성 부족", "고집", "실패 두려움"],
    compatible: ["청머리오리", "혹부리오리"],
    incompatible: ["발구지", "청둥오리"],
  },
  점무늬오리: {
    name: "점무늬오리",
    tags: ["온화함", "협력형"],
    description:
      "점무늬오리는 평화를 사랑하는 온화한 중재자로, '다들 사이좋게 지내면 안 될까?'라는 마음으로 살아갑니다. 갈등이 생기면 양쪽 의견을 다 들어보고 합리적인 해결책을 찾으려고 노력하고, 누구와도 잘 어울리는 친화력을 가지고 있어요. 하지만 자신의 의견을 강하게 주장하는 걸 어려워해서, 가끔 '네 생각은 뭐야?'라는 질문에 당황하기도 하죠. 친구들은 점무늬오리와 함께 있으면 마음이 편안해진다고 하지만, 가끔은 '좀 더 적극적으로 의견을 말해봐'라고 격려해줍니다.",
    strengths: ["협력", "배려", "경청", "평화유지", "신뢰"],
    weaknesses: ["자기표현 부족", "우유부단", "결정 지연", "소극성", "스트레스 축적"],
    compatible: ["청둥오리", "흰뺨검둥오리"],
    incompatible: ["홍머리오리", "쇠오리"],
  },
  혹부리오리: {
    name: "혹부리오리",
    tags: ["리더십", "결단력"],
    description:
      "혹부리오리는 카리스마 넘치는 천상 리더로, '내가 책임질게!'라며 앞장서는 결단력의 소유자입니다. 복잡한 상황에서도 빠르게 판단하고 방향을 제시하며, 팀원들을 이끌어가는 능력이 뛰어나요. 하지만 가끔 너무 독단적으로 결정해서 팀원들의 의견을 충분히 듣지 않기도 하죠. '빨리빨리'가 입버릇이고, 답답한 상황을 못 견뎌해요. 친구들은 혹부리오리의 추진력에 의존하지만, 가끔은 '우리 의견도 좀 들어봐'라고 말하기도 합니다.",
    strengths: ["결단력", "리더십", "추진력", "목표 집중", "책임감"],
    weaknesses: ["독단적 태도", "타협 부족", "강압적 언행", "감정 제어 어려움", "협력 부족"],
    compatible: ["알락오리", "바다비오리"],
    incompatible: ["청둥오리", "점무늬오리"],
  },
  황오리: {
    name: "황오리",
    tags: ["낙천", "긍정형"],
    description:
      "황오리는 걸어 다니는 비타민 같은 존재로, 어디서든 밝은 에너지를 발산하는 긍정의 아이콘입니다. '괜찮아, 다 잘 될 거야!'가 입버릇이고, 힘든 일이 있어도 '이것도 추억이지 뭐!'라며 웃어넘겨요. 친구들이 우울해할 때 나타나서 분위기를 띄워주는 무드메이커이지만, 가끔 너무 낙관적이어서 현실을 간과하기도 하죠. 계획 세우는 걸 귀찮아하고 '그때 가서 생각하지 뭐'라고 말하지만, 결국엔 운 좋게 잘 풀리는 경우가 많아요.",
    strengths: ["긍정성", "낙천성", "에너지", "격려능력", "유연함"],
    weaknesses: ["책임감 부족", "산만함", "집중력 저하", "충동성", "일관성 부족"],
    compatible: ["흰등오리", "발구지"],
    incompatible: ["알락오리", "고방오리"],
  },
  흰등오리: {
    name: "흰등오리",
    tags: ["중립", "안정형"],
    description:
      "흰등오리는 감정의 파도가 잔잔한 호수 같은 존재로, 언제나 차분하고 안정적인 모습을 보여줍니다. 친구들이 흥분해서 떠들어도 '그래, 그래'라며 조용히 듣고, 갈등 상황에서도 중립을 지키려고 노력해요. 감정 기폭이 거의 없어서 주변 사람들에게 안정감을 주지만, 가끔은 '네 진짜 감정은 뭐야?'라는 질문을 받기도 하죠. 자신의 의견을 강하게 표현하는 걸 어려워하지만, 조용히 모든 걸 지켜보며 필요할 때 현명한 조언을 해주는 든든한 존재예요.",
    strengths: ["안정감", "일관성", "신뢰성", "차분함", "문제해결능력"],
    weaknesses: ["소극성", "표현 부족", "결단력 부족", "리더십 부족", "자기주장 부족"],
    compatible: ["황오리", "점무늬오리"],
    incompatible: ["쇠오리", "홍머리오리"],
  },
  흰뺨검둥오리: {
    name: "흰뺨검둥오리",
    tags: ["공감", "친절형"],
    description:
      "흰뺨검둥오리는 따뜻한 마음을 가진 천사 같은 존재로, 누구에게든 친절하고 다정하게 대해줍니다. 상대방의 이야기를 진심으로 들어주고, '힘들었겠다'라며 공감해주는 능력이 뛰어나요. 친구가 힘들어하면 밤새 곁에 있어주고, 기뻐하면 함께 기뻐해주는 진정한 친구예요. 하지만 남을 위해 자신을 희생하는 경우가 많아서, 가끔 친구들이 '너도 좀 챙겨'라고 걱정해줍니다. '나는 괜찮아'라고 말하지만, 사실은 가장 따뜻한 위로가 필요한 사람이기도 해요.",
    strengths: ["경청", "공감", "친절", "배려", "다정함"],
    weaknesses: ["자기희생", "감정소진", "우울감", "자기표현 부족", "결단력 부족"],
    compatible: ["점무늬오리", "비오리"],
    incompatible: ["홍머리오리", "혹부리오리"],
  },
  흰뺨오리: {
    name: "흰뺨오리",
    tags: ["창의", "아이디어형"],
    description:
      "흰뺨오리는 상상력이 풍부한 크리에이터로, 평범한 일상에서도 특별한 것을 발견하는 예술가적 감성을 가지고 있습니다. '이거 재밌을 것 같은데?'라며 새로운 시도를 좋아하고, 남들과는 다른 독특한 관점으로 세상을 바라봐요. 아이디어는 넘쳐나지만 실행하는 건 또 다른 문제라서, 가끔 '이번엔 정말 해볼 거야!'라고 다짐하지만 며칠 후엔 또 다른 아이디어에 빠져있죠. 친구들은 흰뺨오리의 창의적인 발상에 감탄하지만, 가끔은 '하나라도 끝까지 해봐'라고 조언해줍니다.",
    strengths: ["창의성", "상상력", "발산적 사고", "도전정신", "다양성"],
    weaknesses: ["실행력 부족", "계획성 부족", "산만함", "집중력 저하", "현실감 부족"],
    compatible: ["청머리오리", "호사비오리"],
    incompatible: ["바다비오리", "알락오리"],
  },
  흰죽지: {
    name: "흰죽지",
    tags: ["독립", "자기주도형"],
    description:
      "흰죽지는 '내 인생은 내가 책임진다'는 철학으로 사는 독립적인 개인주의자입니다. 남에게 의존하는 걸 싫어하고, 자신만의 방식으로 문제를 해결하려고 해요. 팀 프로젝트보다는 개인 작업을 선호하고, '혼자 하는 게 더 편해'라고 말하죠. 하지만 가끔 너무 혼자서만 해결하려다가 더 어려워지는 경우도 있어요. 친구들은 흰죽지의 독립적인 모습을 부러워하지만, 가끔은 '도움이 필요하면 말해'라고 손을 내밀어줍니다.",
    strengths: ["자율성", "추진력", "자기주도성", "독창성", "결단력"],
    weaknesses: ["고집", "협력 부족", "타인과 거리감", "융통성 부족", "스트레스 회피"],
    compatible: ["고방오리", "혹부리오리"],
    incompatible: ["원앙", "흰뺨검둥오리"],
  },
  넓적부리: {
    name: "넓적부리",
    tags: ["여유", "평화형"],
    description:
      "넓적부리는 '급하게 살 필요 없어'라는 마음으로 여유롭게 살아가는 평화주의자입니다. 경쟁하는 걸 싫어하고, 갈등이 생기면 '뭐 그런 걸로 싸워'라며 피하려고 해요. 스트레스를 받는 상황에서도 '어떻게든 되겠지'라며 태연하게 넘어가는 대범함을 가지고 있죠. 하지만 가끔 너무 소극적이어서 기회를 놓치기도 하고, 친구들이 '좀 더 적극적으로 해봐'라고 격려해주기도 해요. 그래도 넓적부리와 함께 있으면 마음이 편안해지는 건 사실이에요.",
    strengths: ["평화유지", "안정감", "여유", "중재능력", "부드러움"],
    weaknesses: ["소극성", "결단력 부족", "책임 회피", "존재감 부족", "자기주장 부족"],
    compatible: ["흰등오리", "점무늬오리"],
    incompatible: ["쇠오리", "혹부리오리"],
  },
}

const duckImages: { [key: string]: string } = {
  가창오리: "/images/ducks/가창오리.png",
  고방오리: "/images/ducks/고방오리.png",
  발구지: "/images/ducks/발구지.png",
  비오리: "/images/ducks/비오리.png",
  바다비오리: "/images/ducks/바다비오리.png",
  호사비오리: "/images/ducks/호사비오리.png",
  원앙: "/images/ducks/원앙.png",
  쇠오리: "/images/ducks/쇠오리.png",
  청둥오리: "/images/ducks/청둥오리.png",
  청머리오리: "/images/ducks/청머리오리.png",
  홍머리오리: "/images/ducks/홍머리오리.png",
  알락오리: "/images/ducks/알락오리.png",
  점무늬오리: "/images/ducks/점무늬오리.png",
  혹부리오리: "/images/ducks/혹부리오리.png",
  황오리: "/images/ducks/황오리.png",
  흰등오리: "/images/ducks/흰등오리.png",
  흰뺨검둥오리: "/images/ducks/흰뺨검둥오리.png",
  흰뺨오리: "/images/ducks/흰뺨오리.png",
  흰죽지: "/images/ducks/흰죽지.png",
  넓적부리: "/images/ducks/넓적부리.png",
}

// Updated Questions data - 20개 새로운 문항
const questions = [
  {
    id: 1,
    question: "중요한 발표를 앞두면 나는?",
    options: [
      { text: "완벽히 준비하며 스스로 점검한다.", type: "고방오리" },
      { text: "준비는 적당히 하고 마음을 비운다.", type: "넓적부리" },
      { text: "할 일을 미루다가 전날 몰아서 한다.", type: "발구지" },
      { text: "뭔가 잘못될 것 같아 불안해한다.", type: "비오리" },
    ],
  },
  {
    id: 2,
    question: "힘든 일이 생겼을 때 나는?",
    options: [
      { text: "누군가에게 이야기한다.", type: "원앙" },
      { text: "혼자서 해결하려 한다.", type: "흰죽지" },
      { text: "아무것도 하지 않고 그냥 누워있다.", type: "넓적부리" },
      { text: "회피하려 다른 일에 몰두한다.", type: "청머리오리" },
    ],
  },
  {
    id: 3,
    question: "친구와 갈등이 생겼을 때 나는?",
    options: [
      { text: "먼저 사과하려 한다.", type: "흰뺨검둥오리" },
      { text: "상대방이 연락할 때까지 기다린다.", type: "가창오리" },
      { text: "대화 없이 관계를 끊는다.", type: "흰죽지" },
      { text: "감정적으로 따진다.", type: "홍머리오리" },
    ],
  },
  {
    id: 4,
    question: "잠들기 전 나는?",
    options: [
      { text: "내일 일정을 점검한다.", type: "고방오리" },
      { text: "SNS나 영상을 보며 시간을 보낸다.", type: "황오리" },
      { text: "아무 생각 없이 곧 잠든다.", type: "흰등오리" },
      { text: "오늘 한 말과 행동을 계속 곱씹는다.", type: "비오리" },
    ],
  },
  {
    id: 5,
    question: "예상치 못한 일이 생기면 나는?",
    options: [
      { text: "침착하게 우선순위를 다시 세운다.", type: "바다비오리" },
      { text: "화가 난다.", type: "홍머리오리" },
      { text: "무기력해져 아무것도 못 한다.", type: "비오리" },
      { text: "다른 사람에게 바로 도움을 요청한다.", type: "원앙" },
    ],
  },
  {
    id: 6,
    question: "기분이 우울할 때 나는?",
    options: [
      { text: "일단 밖으로 나가 움직인다.", type: "쇠오리" },
      { text: "집에 틀어박혀 생각에 빠진다.", type: "가창오리" },
      { text: "좋아하는 음식을 먹는다.", type: "황오리" },
      { text: "자기계발 콘텐츠를 본다.", type: "바다비오리" },
    ],
  },
  {
    id: 7,
    question: "일상에서 기분이 좋을 때 나는?",
    options: [
      { text: "주변 사람들에게 연락해 즐거움을 나눈다.", type: "원앙" },
      { text: "계획을 세우며 에너지를 쓴다.", type: "고방오리" },
      { text: "충동구매하거나 하고 싶던 일을 한다.", type: "발구지" },
      { text: "혼자만의 시간을 즐긴다.", type: "가창오리" },
    ],
  },
  {
    id: 8,
    question: "내 감정을 표현할 때 나는?",
    options: [
      { text: "솔직하게 말한다.", type: "홍머리오리" },
      { text: "적당히 돌려서 말한다.", type: "청둥오리" },
      { text: "감추고 속으로 삭인다.", type: "가창오리" },
      { text: "표현한 감정을 글로 적거나 메모한다.", type: "알락오리" },
    ],
  },
  {
    id: 9,
    question: "예상보다 일이 길어질 때 나는?",
    options: [
      { text: "계획을 수정해 맞춘다.", type: "청둥오리" },
      { text: "스트레스를 받는다.", type: "비오리" },
      { text: "대충하고 끝내버린다.", type: "황오리" },
      { text: "포기하고 다른 것에 집중한다.", type: "발구지" },
    ],
  },
  {
    id: 10,
    question: "중요한 결정을 할 때 나는?",
    options: [
      { text: "논리적으로 장단점을 비교한다.", type: "바다비오리" },
      { text: "직감에 따른다.", type: "호사비오리" },
      { text: "주변의 의견을 따른다.", type: "점무늬오리" },
      { text: "결정을 미루고 미루다 상황에 맡긴다.", type: "넓적부리" },
    ],
  },
  {
    id: 11,
    question: "갑자기 약속이 취소되면 나는?",
    options: [
      { text: "마음의 여유가 생겨 좋다.", type: "흰등오리" },
      { text: "기분이 상한다.", type: "비오리" },
      { text: "신경 쓰지 않는다.", type: "청둥오리" },
      { text: "뭔가 잘못했나 불안해한다.", type: "흰뺨검둥오리" },
    ],
  },
  {
    id: 12,
    question: "우울할 때 주로 드는 생각은?",
    options: [
      { text: "금방 괜찮아질 거야.", type: "황오리" },
      { text: "나만 이런 걸까?", type: "비오리" },
      { text: "아무 의미 없는 하루야.", type: "넓적부리" },
      { text: "나보다 더 힘든 사람도 있겠지.", type: "흰뺨검둥오리" },
    ],
  },
  {
    id: 13,
    question: "SNS에 즐거운 모습을 올린 뒤 나는?",
    options: [
      { text: "반응을 신경 쓰지 않는다.", type: "흰죽지" },
      { text: "좋아요나 댓글을 확인하며 기분이 달라진다.", type: "원앙" },
      { text: "모습을 올린 자신이 부끄럽고 후회된다.", type: "가창오리" },
      { text: "반응이 없으면 기분이 가라앉는다.", type: "비오리" },
    ],
  },
  {
    id: 14,
    question: "하루 중 가장 힘든 시간은?",
    options: [
      { text: "아침, 일어나기가 어렵다.", type: "넓적부리" },
      { text: "오후, 집중력이 떨어진다.", type: "청머리오리" },
      { text: "저녁, 외로움이 몰려온다.", type: "비오리" },
      { text: "특별히 힘든 시간은 없다.", type: "흰등오리" },
    ],
  },
  {
    id: 15,
    question: "힘든 하루 후 나는?",
    options: [
      { text: "친구에게 전화한다.", type: "원앙" },
      { text: "취미나 운동으로 기분을 전환한다.", type: "쇠오리" },
      { text: "아무것도 하지 않고 누워있다.", type: "넓적부리" },
      { text: "인터넷 커뮤니티에 고민글을 쓴다.", type: "청머리오리" },
    ],
  },
  {
    id: 16,
    question: "주변 사람이 나를 어떻게 보길 바라나?",
    options: [
      { text: "책임감 있고 믿음직한 사람", type: "고방오리" },
      { text: "재밌고 밝은 사람", type: "황오리" },
      { text: "따뜻하고 친절한 사람", type: "흰뺨검둥오리" },
      { text: "똑똑하고 능력 있는 사람", type: "바다비오리" },
    ],
  },
  {
    id: 17,
    question: "내 감정의 기복은?",
    options: [
      { text: "거의 일정하다.", type: "흰등오리" },
      { text: "작은 일에도 오르내린다.", type: "비오리" },
      { text: "평소엔 안정적이지만 한 번 기복이 오면 크다.", type: "홍머리오리" },
      { text: "스스로도 모르겠다.", type: "청머리오리" },
    ],
  },
  {
    id: 18,
    question: "하루가 예상과 달랐을 때 나는?",
    options: [
      { text: "그냥 적응한다.", type: "청둥오리" },
      { text: "계속 불만이 남는다.", type: "고방오리" },
      { text: "스트레스가 쌓여 감정이 폭발한다.", type: "쇠오리" },
      { text: "내 계획이 틀어졌다고 자책한다.", type: "알락오리" },
    ],
  },
  {
    id: 19,
    question: "좋아하는 사람이 연락이 없으면 나는?",
    options: [
      { text: "바쁜가 보다 하고 넘긴다.", type: "흰죽지" },
      { text: "계속 확인하며 신경 쓴다.", type: "원앙" },
      { text: "먼저 연락할까 고민만 한다.", type: "가창오리" },
      { text: "마음이 불안해 다른 일에 집중이 안 된다.", type: "비오리" },
    ],
  },
  {
    id: 20,
    question: "기분이 좋지 않은 날 나는?",
    options: [
      { text: "이유를 곱씹으며 원인을 찾는다.", type: "알락오리" },
      { text: "기분 전환하려 억지로 활동한다.", type: "발구지" },
      { text: "그저 누워서 아무것도 하지 않는다.", type: "넓적부리" },
      { text: "감정이 나아질 때까지 스스로를 격려한다.", type: "혹부리오리" },
    ],
  },
]

// Question image mapping - each image appears in 5 random questions
const questionImageMapping: { [key: number]: string } = {
  1: "/images/questions/question1.png",
  4: "/images/questions/question1.png",
  7: "/images/questions/question1.png",
  10: "/images/questions/question1.png",
  16: "/images/questions/question1.png",

  2: "/images/questions/question2.png",
  6: "/images/questions/question2.png",
  9: "/images/questions/question2.png",
  14: "/images/questions/question2.png",
  18: "/images/questions/question2.png",

  3: "/images/questions/question3.png",
  8: "/images/questions/question3.png",
  12: "/images/questions/question3.png",
  15: "/images/questions/question3.png",
  19: "/images/questions/question3.png",

  5: "/images/questions/question4.png",
  11: "/images/questions/question4.png",
  13: "/images/questions/question4.png",
  17: "/images/questions/question4.png",
  20: "/images/questions/question4.png",
}

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [testStarted, setTestStarted] = useState(false)
  const [showAllTypes, setShowAllTypes] = useState(false)
  const [username, setUsername] = useState("")
  const [showNicknameInput, setShowNicknameInput] = useState(false)
  const [selectedDuckDetail, setSelectedDuckDetail] = useState<string | null>(null)

  // Track page views
  useEffect(() => {
    gtag.pageview(window.location.pathname)
  }, [])

  const handleAnswer = (answerType: string) => {
    // Track answer selection
    gtag.event({
      action: "answer_question",
      category: "quiz",
      label: `question_${currentQuestion + 1}_${answerType}`,
      value: currentQuestion + 1,
    })

    const newAnswers = [...answers, answerType]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Track quiz completion
      gtag.event({
        action: "complete_quiz",
        category: "quiz",
        label: "quiz_completed",
        value: questions.length,
      })

      // 마지막 질문 완료 - 바로 결과 페이지로 이동
      setTimeout(() => {
        setShowResult(true)
      }, 500) // 약간의 딜레이 후 결과 표시
    }
  }

  const handleRestart = () => {
    // Track restart action
    gtag.event({
      action: "restart_quiz",
      category: "navigation",
      label: "restart_button",
    })

    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setTestStarted(false)
    setShowAllTypes(false)
  }

  const handleStartTest = () => {
    // Track test start
    gtag.event({
      action: "start_quiz",
      category: "engagement",
      label: "start_button",
    })

    setShowNicknameInput(true)
  }

  const handleNicknameSubmit = () => {
    if (username.trim()) {
      // Track nickname submission
      gtag.event({
        action: "submit_nickname",
        category: "form",
        label: "nickname_form",
      })

      setTestStarted(true)
      setShowNicknameInput(false)
    }
  }

  const handleViewAllTypes = () => {
    // Track view all types action
    gtag.event({
      action: "view_all_types",
      category: "navigation",
      label: "view_all_types_button",
    })

    setShowAllTypes(true)
  }

  const handleGoBack = () => {
    // Track back navigation
    gtag.event({
      action: "go_back",
      category: "navigation",
      label: `question_${currentQuestion + 1}`,
    })

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setAnswers(answers.slice(0, -1))
    } else {
      setTestStarted(false)
    }
  }

  const getResult = () => {
    // Enhanced scoring system with weighted questions
    const typeScores: { [key: string]: number } = {}

    // Initialize all duck types with 0 score
    Object.keys(duckTypes).forEach((type) => {
      typeScores[type] = 0
    })

    // Weight certain questions more heavily based on their importance
    const questionWeights = [
      1.2, // Question 1: Important presentation behavior
      1.5, // Question 2: Problem-solving approach (very important)
      1.3, // Question 3: Conflict resolution
      1.0, // Question 4: Evening routine
      1.4, // Question 5: Unexpected situations (important)
      1.1, // Question 6: Dealing with sadness
      1.0, // Question 7: When feeling good
      1.3, // Question 8: Emotional expression (important)
      1.1, // Question 9: When things take longer
      1.5, // Question 10: Decision making (very important)
      1.0, // Question 11: Cancelled plans
      1.2, // Question 12: Thoughts when depressed
      1.0, // Question 13: Social media behavior
      1.0, // Question 14: Difficult time of day
      1.1, // Question 15: After difficult day
      1.2, // Question 16: How others see you
      1.3, // Question 17: Emotional fluctuation (important)
      1.1, // Question 18: When day goes differently
      1.2, // Question 19: When someone doesn't contact
      1.1, // Question 20: Bad mood days
    ]

    // Calculate weighted scores
    answers.forEach((answer, index) => {
      const weight = questionWeights[index] || 1.0
      typeScores[answer] = (typeScores[answer] || 0) + weight
    })

    // Find the type with highest score
    let resultType = "청둥오리" // default fallback
    let maxScore = 0

    Object.entries(typeScores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score
        resultType = type
      }
    })

    // If there's a tie, use secondary characteristics to break it
    if (maxScore > 0) {
      const tiedTypes = Object.entries(typeScores)
        .filter(([_, score]) => score === maxScore)
        .map(([type, _]) => type)

      if (tiedTypes.length > 1) {
        // Use personality trait compatibility to break ties
        const traitPreferences = {
          social: 0,
          analytical: 0,
          creative: 0,
          stable: 0,
          leadership: 0,
        }

        // Analyze answers for trait preferences
        answers.forEach((answer, index) => {
          const question = questions[index]
          const selectedOption = question.options.find((opt) => opt.type === answer)

          if (selectedOption) {
            // Categorize answers by traits
            if (answer === "원앙" || answer === "쇠오리" || answer === "홍머리오리") {
              traitPreferences.social += 1
            }
            if (answer === "바다비오리" || answer === "알락오리" || answer === "고방오리") {
              traitPreferences.analytical += 1
            }
            if (answer === "청머리오리" || answer === "흰뺨오리" || answer === "호사비오리") {
              traitPreferences.creative += 1
            }
            if (answer === "흰등오리" || answer === "넓적부리" || answer === "점무늬오리") {
              traitPreferences.stable += 1
            }
            if (answer === "혹부리오리" || answer === "쇠오리") {
              traitPreferences.leadership += 1
            }
          }
        })

        // Select the tied type that best matches dominant traits
        const dominantTrait = Object.entries(traitPreferences).sort(([, a], [, b]) => b - a)[0][0]

        const traitTypeMap = {
          social: ["원앙", "쇠오리", "홍머리오리"],
          analytical: ["바다비오리", "알락오리", "고방오리"],
          creative: ["청머리오리", "흰뺨오리", "호사비오리"],
          stable: ["흰등오리", "넓적부리", "점무늬오리"],
          leadership: ["혹부리오리", "쇠오리"],
        }

        const preferredTypes = traitTypeMap[dominantTrait as keyof typeof traitTypeMap]
        const matchingType = tiedTypes.find((type) => preferredTypes.includes(type))

        if (matchingType) {
          resultType = matchingType
        }
      }
    }

    const result = duckTypes[resultType as keyof typeof duckTypes] || duckTypes["청둥오리"]

    // Track quiz result
    gtag.event({
      action: "quiz_result",
      category: "quiz",
      label: result.name,
    })

    return result
  }

  const handleDuckClick = (duckName: string) => {
    // Track duck detail view
    gtag.event({
      action: "view_duck_detail",
      category: "navigation",
      label: duckName,
    })

    setSelectedDuckDetail(duckName)
  }

  const handleBackToAllTypes = () => {
    // Track back to all types
    gtag.event({
      action: "back_to_all_types",
      category: "navigation",
      label: "back_button",
    })

    setSelectedDuckDetail(null)
  }

  const handlePreorderClick = () => {
    // Track preorder button click
    gtag.event({
      action: "click_preorder",
      category: "conversion",
      label: "preorder_button",
    })
  }

  // Show individual duck detail
  if (selectedDuckDetail) {
    const duck = duckTypes[selectedDuckDetail as keyof typeof duckTypes]
    return (
      <div className="min-h-screen px-4 py-6" style={{ backgroundColor: "#749665" }}>
        <div className="max-w-sm mx-auto">
          <div className="mb-4">
            <button
              onClick={handleBackToAllTypes}
              className="bg-white/30 hover:bg-white/50 text-white px-4 py-2 rounded-lg"
            >
              ← 모든 유형으로 돌아가기
            </button>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg">
            <div className="text-center mb-4">
              <img
                src={duckImages[duck.name] || "/placeholder.svg"}
                alt={duck.name}
                className="w-32 h-32 mx-auto mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{duck.name}</h1>
              <div className="flex justify-center gap-2 mb-4">
                {duck.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border-black border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-gray-700 text-sm leading-relaxed mb-6">{duck.description}</div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2">장점</h3>
              <div className="flex flex-wrap gap-2">
                {duck.strengths.map((strength, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-gray-800 mb-2">주의할 점</h3>
              <div className="flex flex-wrap gap-2">
                {duck.weaknesses.map((weakness, index) => (
                  <span key={index} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                    {weakness}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show all types view
  if (showAllTypes) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">모든 오리 유형</h1>
            <button
              onClick={() => setShowAllTypes(false)}
              className="bg-[#779966] hover:bg-[#6a8659] text-white px-6 py-2 rounded-lg"
            >
              돌아가기
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(duckTypes).map((duck) => (
              <div
                key={duck.name}
                className="bg-white rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleDuckClick(duck.name)}
              >
                <div className="text-center mb-4">
                  <img
                    src={duckImages[duck.name] || "/placeholder.svg"}
                    alt={duck.name}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <h3 className="text-xl font-bold text-gray-800">{duck.name}</h3>
                  <div className="flex justify-center gap-2 mt-2">
                    {duck.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 rounded-full text-sm text-green-800 bg-green-50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{duck.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Show nickname input
  if (showNicknameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8F5E8] to-[#D4E8D4] px-4 py-8 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">닉네임을 입력해주세요</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="닉네임을 입력하세요"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-lg mb-6 focus:border-[#779966] focus:outline-none"
              maxLength={10}
            />
            <div className="space-y-3">
              <button
                onClick={handleNicknameSubmit}
                disabled={!username.trim()}
                className="w-full bg-[#779966] hover:bg-[#6a8659] text-white py-3 text-lg rounded-full font-bold disabled:opacity-50"
              >
                테스트 시작하기
              </button>
              <button
                onClick={() => setShowNicknameInput(false)}
                className="w-full text-gray-600 py-3 text-lg rounded-full font-bold hover:bg-gray-100"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show question page
  if (testStarted && !showResult) {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100
    const questionImage = questionImageMapping[question.id]

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E8F5E8] to-[#D4E8D4] px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header with back button */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <button onClick={handleGoBack} className="p-2 hover:bg-[#779966]/20 rounded-lg">
                <svg className="w-6 h-6 text-[#779966]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#779966] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="font-bold text-gray-800 mb-6 text-center text-lg">{question.question}</h2>

            {/* Question Image */}
            {questionImage && (
              <div className="flex justify-center mb-6 px-0 mx-auto flex-row size-full h-fit w-fit">
                <img
                  src={questionImage || "/placeholder.svg"}
                  alt="Question illustration"
                  className="w-auto h-48 object-contain"
                />
              </div>
            )}

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full text-left justify-start h-auto py-4 px-4 border-2 border-gray-200 hover:border-[#779966] hover:bg-[#779966]/10 text-gray-700 hover:text-gray-800 rounded-lg transition-all"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show result page
  if (showResult) {
    return (
      <ResultPage
        duckType={getResult()}
        username={username}
        onRestart={handleRestart}
        onViewAllTypes={handleViewAllTypes}
      />
    )
  }

  // Show cover page
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-start min-h-screen px-4 py-8">
        {/* Header with logo */}
        <div className="text-center mb-4">
          <img src="/images/symple-logo.png" alt="SYMPLE" className="h-4 mx-auto opacity-60" />
        </div>

        {/* Title Section */}
        <div className="flex items-center justify-center mb-1">
          <img src="/images/title-new.png" alt="내안의" className="h-20 mr-4" />
          <img src="/images/quack-new.png" alt="꽥" className="h-24 bounce-animation" />
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8">
          <p className="font-medium text-base text-slate-500 pb-[33px]">꽥꽥이로 알아보는 멘탈 방어 유형</p>
        </div>

        {/* Speech Bubble */}
        <div className="relative mb-8">
          <div className="bg-gray-400 text-white rounded-full font-medium my-0 opacity-100 text-sm px-[17px] py-2.5">
            너는 어떤 꽥이야?
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-l-transparent border-r-transparent border-t-gray-400 my-0 py-[px0]"></div>
          </div>
        </div>

        {/* Duck Characters */}
        <div className="flex justify-center items-center mb-[3px] mt-[-30px]">
          <img src="/images/duck-group-new.png" alt="Duck Characters" className="h-48" />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleStartTest}
            className="w-full hover:bg-[#6a8659] text-white py-4 px-6 rounded-full text-lg font-bold border-2 border-white shadow-lg transition-all duration-300 bg-[#779966] hover:shadow-xl hover:scale-105"
          >
            내 안의 꽥 찾으러 가기
          </button>

          <button
            onClick={() => {
              handlePreorderClick()
              window.open("https://forms.gle/9Y5PbUNNr4KujFtb7", "_blank")
            }}
            className="w-full hover:bg-[#86A276] text-white py-4 px-6 rounded-full text-lg font-bold border-2 border-white shadow-lg transition-all duration-300 bg-[#9BB88A] hover:shadow-xl hover:scale-105"
          >
            멘탈케어 게임 오리의 꿈 사전예약
          </button>
        </div>
      </div>
    </div>
  )
}
