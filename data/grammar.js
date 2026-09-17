// 12 個核心文法課程：對應 12 週計畫
// 每課格式：title / level / explanation（繁中說明）/ examples（3個）/ mistake（1個常見錯誤）
const GRAMMAR_DATA = [
  {
    id: 1,
    week: 1,
    level: "N5",
    title: "です／ではありません",
    subtitle: "肯定與否定的基本句型",
    explanation:
      "「です」放在名詞或形容詞後面，代表禮貌的「是」。否定形是「ではありません」（口語常說「じゃありません」）。這是日語裡最基礎、出現頻率最高的句型，幾乎每天都會用到，先把它練到反射動作，之後的文法都會輕鬆很多。",
    examples: [
      {
        jp: "わたしは たなかです。",
        reading: "Watashi wa Tanaka desu.",
        zh: "我是田中。"
      },
      {
        jp: "これは にほんの おちゃでは ありません。",
        reading: "Kore wa Nihon no ocha dewa arimasen.",
        zh: "這不是日本茶。"
      },
      {
        jp: "きょうは やすみでは ありません。",
        reading: "Kyō wa yasumi dewa arimasen.",
        zh: "今天不是放假日。"
      }
    ],
    mistake: {
      wrong: "わたし は がくせい だ です。",
      why: "「だ」跟「です」都是「是」的意思，兩個不能疊在一起用；「だ」是普通體、「です」是禮貌體，只能擇一使用。",
      correct: "わたしは がくせいです。（我是學生。）"
    }
  },
  {
    id: 2,
    week: 2,
    level: "N5",
    title: "これ／それ／あれ・この／その／あの・の",
    subtitle: "指示詞與所有格「の」",
    explanation:
      "これ／それ／あれ用來指「東西」（這個／那個／那個〈更遠〉），この／その／あの後面一定要接名詞（這個〜／那個〜）。「の」則像中文的「的」，用來連接兩個名詞，表示所屬或說明關係，例如「わたしの本」（我的書）。",
    examples: [
      {
        jp: "これは わたしの かさです。",
        reading: "Kore wa watashi no kasa desu.",
        zh: "這是我的傘。"
      },
      {
        jp: "その みせは やすくて おいしいです。",
        reading: "Sono mise wa yasukute oishii desu.",
        zh: "那間店（在你附近的那間）便宜又好吃。"
      },
      {
        jp: "あれは にほんごの ほんですか。",
        reading: "Are wa Nihongo no hon desu ka.",
        zh: "那個（遠處的）是日文書嗎？"
      }
    ],
    mistake: {
      wrong: "あの ペンは わたしのです → あのペンは わたし です。",
      why: "很多學習者會漏掉「の」，直接說「わたし」想表示「我的」，但「わたし」單獨只代表「我」這個人，一定要加「の」才是「我的」。",
      correct: "あの ペンは わたしの です。（那支筆是我的。）"
    }
  },
  {
    id: 3,
    week: 3,
    level: "N5",
    title: "動詞ます形",
    subtitle: "肯定・否定・現在・勧誘「〜ましょう」",
    explanation:
      "ます形是日語最禮貌、最常用的動詞形態，適合對長輩、陌生人或正式場合使用。否定是「〜ません」。加上「〜ましょう」可以用來邀約別人一起做某件事，非常適合旅行時使用。",
    examples: [
      {
        jp: "まいにち コーヒーを のみます。",
        reading: "Mainichi kōhī o nomimasu.",
        zh: "我每天喝咖啡。"
      },
      {
        jp: "あさは パンを たべません。",
        reading: "Asa wa pan o tabemasen.",
        zh: "早上我不吃麵包。"
      },
      {
        jp: "いっしょに しゃしんを とりましょう。",
        reading: "Issho ni shashin o torimashō.",
        zh: "一起拍張照吧。"
      }
    ],
    mistake: {
      wrong: "あした 京都へ 行くます。",
      why: "「ます」要接在動詞的「ます形詞幹」後面，不能直接加在辭書形（原形）後面；「行く」的ます形是「行き＋ます」，中間要先變化語尾。",
      correct: "あした 京都へ 行きます。（明天要去京都。）"
    }
  },
  {
    id: 4,
    week: 4,
    level: "N5",
    title: "動詞て形①",
    subtitle: "〜てください（請求）與動作連接",
    explanation:
      "て形是日語文法的「萬用接頭」，後面能接非常多句型。這週先學最實用的兩個用法：用「〜てください」有禮貌地拜託別人做某事；用「て」把兩個動作連起來，表示先後順序或同時發生。",
    examples: [
      {
        jp: "すみません、ちずを かいて ください。",
        reading: "Sumimasen, chizu o kaite kudasai.",
        zh: "不好意思，請幫我畫一下地圖。"
      },
      {
        jp: "この ボタンを おして、きっぷを かって ください。",
        reading: "Kono botan o oshite, kippu o katte kudasai.",
        zh: "請按這個按鈕，然後買票。"
      },
      {
        jp: "ホテルに ついて、シャワーを あびました。",
        reading: "Hoteru ni tsuite, shawā o abimashita.",
        zh: "到了飯店之後，洗了個澡。"
      }
    ],
    mistake: {
      wrong: "みぎに まがってください、あそこに あります。",
      why: "「〜てください」後面應該接續下一步該做的動作，而不是直接接說明句；把兩句話用「て」自然連接會更順，也更接近日本人的說話節奏。",
      correct: "みぎに まがって、まっすぐ いって ください。（請右轉，然後直走。）"
    }
  },
  {
    id: 5,
    week: 5,
    level: "N5",
    title: "動詞て形②",
    subtitle: "〜ています（進行・狀態）／〜てもいいですか（許可）",
    explanation:
      "「〜ています」除了表示「正在做」（動作進行中），也常用來表示一個持續的狀態（例如「結婚しています」＝已婚）。「〜てもいいですか」則是很好用的禮貌問句，用來詢問「可以〜嗎」，購物、拍照、試吃時都很實用。",
    examples: [
      {
        jp: "いま、レストランを さがしています。",
        reading: "Ima, resutoran o sagashite imasu.",
        zh: "我現在正在找餐廳。"
      },
      {
        jp: "この ふくを きて みても いいですか。",
        reading: "Kono fuku o kite mite mo ii desu ka.",
        zh: "可以試穿這件衣服嗎？"
      },
      {
        jp: "ここで しゃしんを とっても いいですか。",
        reading: "Koko de shashin o tottemo ii desu ka.",
        zh: "可以在這裡拍照嗎？"
      }
    ],
    mistake: {
      wrong: "わたしは にほんに すんでいます を つかいます。",
      why: "「〜ています」本身就是完整的述語，後面不需要再加「を つかいます」之類多餘的動詞；初學者常因為想強調「正在」而畫蛇添足。",
      correct: "わたしは にほんに すんでいます。（我現在住在日本。）"
    }
  },
  {
    id: 6,
    week: 6,
    level: "N5",
    title: "動詞た形／〜たことがあります",
    subtitle: "過去式與經驗表達",
    explanation:
      "た形的變化規則跟て形完全一樣（只是把て換成た），用來表示過去發生的事。加上「〜たことがあります」可以表達「曾經做過〜」的經驗，很適合聊旅行時分享自己的過往經歷。",
    examples: [
      {
        jp: "きのう おおさかじょうへ いきました。",
        reading: "Kinō Ōsaka-jō e ikimashita.",
        zh: "昨天去了大阪城。"
      },
      {
        jp: "たこやきを たべた ことが ありますか。",
        reading: "Takoyaki o tabeta koto ga arimasu ka.",
        zh: "你吃過章魚燒嗎？"
      },
      {
        jp: "ふじさんに のぼった ことが あります。",
        reading: "Fuji-san ni nobotta koto ga arimasu.",
        zh: "我爬過富士山。"
      }
    ],
    mistake: {
      wrong: "らいねん にほんへ いった ことが あります。",
      why: "「〜たことがあります」只能用來描述過去已經發生、完成的經驗，不能跟「らいねん（明年）」這種未來時間一起使用。",
      correct: "らいねん にほんへ いく つもりです。（我打算明年去日本。）"
    }
  },
  {
    id: 7,
    week: 7,
    level: "N4",
    title: "い形容詞・な形容詞",
    subtitle: "接續規則與比較句「〜より〜のほうが」",
    explanation:
      "い形容詞（如おいしい）語尾是「い」，否定要把い換成くない；な形容詞（如きれい）修飾名詞時中間要加「な」，例如「きれいな街」。比較兩者時用「AよりBのほうが〜です」，代表「比起A，B更〜」。",
    examples: [
      {
        jp: "この らーめんは あつくて おいしいです。",
        reading: "Kono rāmen wa atsukute oishii desu.",
        zh: "這碗拉麵又熱又好吃。"
      },
      {
        jp: "きょうとは しずかな まちです。",
        reading: "Kyōto wa shizuka na machi desu.",
        zh: "京都是個安靜的城市。"
      },
      {
        jp: "でんしゃより ひこうきの ほうが はやいです。",
        reading: "Densha yori hikōki no hō ga hayai desu.",
        zh: "比起電車，飛機比較快。"
      }
    ],
    mistake: {
      wrong: "きれいい ひとです／しずかい まちです。",
      why: "「きれい」「しずか」雖然結尾看起來像い形容詞，其實是な形容詞，修飾名詞時要加「な」而不是直接加「い」，這是最常見的形容詞誤用之一。",
      correct: "きれいな ひとです。しずかな まちです。（是漂亮的人。是安靜的城市。）"
    }
  },
  {
    id: 8,
    week: 8,
    level: "N4",
    title: "可能形／〜たい",
    subtitle: "表達能力與願望",
    explanation:
      "可能形用來表示「會〜／能〜」，例如「食べられます」（能吃）。「〜たい」則加在動詞ます形詞幹後面，表示「想要做〜」，是規劃行程、表達願望時非常常用的句型。",
    examples: [
      {
        jp: "すこし にほんごが はなせます。",
        reading: "Sukoshi Nihongo ga hanasemasu.",
        zh: "我會說一點點日文。"
      },
      {
        jp: "おんせんに はいりたいです。",
        reading: "Onsen ni hairitai desu.",
        zh: "我想泡溫泉。"
      },
      {
        jp: "からい ものが たべられません。",
        reading: "Karai mono ga taberaremasen.",
        zh: "我不能吃辣的東西。"
      }
    ],
    mistake: {
      wrong: "わたしは すしを たべたいを おもいます。",
      why: "「〜たい」本身已經是形容詞性質的語尾，後面不需要再加助詞「を」；如果要說「我想要吃壽司」，「たい」前面的受詞助詞維持用「が」或「を」皆可，但句尾不必再加「を」重複。",
      correct: "わたしは すしが たべたいです。（我想吃壽司。）"
    }
  },
  {
    id: 9,
    week: 9,
    level: "N4",
    title: "あげる・もらう・くれる",
    subtitle: "授受表現：誰給誰的視角差異",
    explanation:
      "這三個動詞都跟「給予」有關，差別在「說話者的立場」：あげる＝我（或跟我同一邊的人）給別人；もらう＝我從別人那裡得到；くれる＝別人給我（強調對方主動給予、帶有感謝語感）。分清楚視角是這個文法最大的關卡。",
    examples: [
      {
        jp: "わたしは ともだちに おみやげを あげました。",
        reading: "Watashi wa tomodachi ni omiyage o agemashita.",
        zh: "我送了伴手禮給朋友。"
      },
      {
        jp: "せんせいに ほんを もらいました。",
        reading: "Sensei ni hon o moraimashita.",
        zh: "我從老師那裡得到了一本書。"
      },
      {
        jp: "ともだちが わたしに おかしを くれました。",
        reading: "Tomodachi ga watashi ni okashi o kuremashita.",
        zh: "朋友給了我零食。"
      }
    ],
    mistake: {
      wrong: "ともだちは わたしに おかしを あげました。",
      why: "當「別人給我」的時候，主詞是對方、接收者是「我」，這種情況一定要用「くれる」而不是「あげる」；「あげる」的接收者不能是「我」自己。",
      correct: "ともだちは わたしに おかしを くれました。（朋友給了我零食。）"
    }
  },
  {
    id: 10,
    week: 10,
    level: "N3",
    title: "〜たら・〜ば・〜と",
    subtitle: "三種條件形的使用時機",
    explanation:
      "「〜たら」用途最廣，可以用在假設或未來實際會發生的事；「〜ば」較常用在一般性的條件或格言、且後句通常不能是命令句；「〜と」用在「一旦A就必然發生B」的自然反應或習慣性結果，後句同樣不能接命令、意志表現。這三個是很多學習者到 N3 開始混淆的重點文法。",
    examples: [
      {
        jp: "あめが ふったら、うちに いましょう。",
        reading: "Ame ga futtara, uchi ni imashō.",
        zh: "如果下雨的話，就待在家裡吧。"
      },
      {
        jp: "はやく おきれば、あさごはんを たべる じかんが あります。",
        reading: "Hayaku okireba, asagohan o taberu jikan ga arimasu.",
        zh: "只要早點起床，就有時間吃早餐。"
      },
      {
        jp: "この ボタンを おすと、ドアが あきます。",
        reading: "Kono botan o osu to, doa ga akimasu.",
        zh: "一按這個按鈕，門就會打開。"
      }
    ],
    mistake: {
      wrong: "はやく おきると、あさごはんを たべて ください。",
      why: "「〜と」表示自然、必然的結果，後句不能接「請〜」這種要求或命令句；這種帶有主觀意志、指示的句子，應該改用「〜たら」。",
      correct: "はやく おきたら、あさごはんを たべて ください。（早點起床的話，請吃早餐。）"
    }
  },
  {
    id: 11,
    week: 11,
    level: "N3",
    title: "敬語基礎",
    subtitle: "丁寧語與「〜ていただけますか」",
    explanation:
      "「です／ます」屬於最基本的丁寧語（禮貌語），適合大多數對外場合。想再更客氣一階，可以用「〜ていただけますか」拜託別人，語感比「〜てください」更謙遜、更適合對客戶、長輩或不熟的人使用，在職場與正式旅遊場合（例如飯店、機場）都很實用。",
    examples: [
      {
        jp: "しょうしょう おまちいただけますか。",
        reading: "Shōshō omachi itadakemasu ka.",
        zh: "可以請您稍等一下嗎？（較客氣的說法）"
      },
      {
        jp: "もういちど せつめいして いただけますか。",
        reading: "Mō ichido setsumei shite itadakemasu ka.",
        zh: "可以請您再說明一次嗎？"
      },
      {
        jp: "こちらに おなまえを かいて いただけますか。",
        reading: "Kochira ni onamae o kaite itadakemasu ka.",
        zh: "可以請您在這裡寫下姓名嗎？"
      }
    ],
    mistake: {
      wrong: "対「上司」說：ちょっと まって ください。",
      why: "「〜てください」語感偏中性甚至略帶指示意味，對上司、客戶或不熟的長輩使用會顯得不夠客氣；正式場合建議升級成「〜ていただけますか」，語氣會謙遜許多。",
      correct: "しょうしょう おまちいただけますか。（可以請您稍等一下嗎？）"
    }
  },
  {
    id: 12,
    week: 12,
    level: "N2",
    title: "接続詞と長文読解入門",
    subtitle: "N2 文章常見連接詞",
    explanation:
      "N2 開始會出現較長的文章，掌握連接詞是讀懂文章邏輯的關鍵：「しかし」（然而，轉折）、「そのため」（因此，因果）、「それに」（而且，補充）、「つまり」（也就是說，總結）等。看到這些詞，先判斷句子之間的邏輯關係，再讀細節，會比逐字翻譯快很多。",
    examples: [
      {
        jp: "にほんごの べんきょうは たのしいです。しかし、かんじは むずかしいです。",
        reading: "Nihongo no benkyō wa tanoshii desu. Shikashi, kanji wa muzukashii desu.",
        zh: "學日文很開心。然而，漢字很難。"
      },
      {
        jp: "しごとが いそがしかったです。そのため、りょこうの じゅんびが おくれました。",
        reading: "Shigoto ga isogashikatta desu. Sono tame, ryokō no junbi ga okuremashita.",
        zh: "工作很忙。因此，旅行的準備延遲了。"
      },
      {
        jp: "この みせは やすいです。それに、てんいんも しんせつです。",
        reading: "Kono mise wa yasui desu. Sore ni, ten'in mo shinsetsu desu.",
        zh: "這間店很便宜。而且，店員也很親切。"
      }
    ],
    mistake: {
      wrong: "把「しかし」（然而）跟「そのため」（因此）搞混，導致讀反句子之間的邏輯關係。",
      why: "N2 閱讀測驗中，選項常故意調換因果與轉折關係來混淆考生；閱讀時建議先把每個連接詞在腦中翻成中文標記（轉折／因果／補充／總結），再往下讀。",
      correct: "區分方式：しかし＝但是（轉折）；そのため／だから＝所以（因果）；それに／さらに＝而且（補充）；つまり＝也就是說（總結）。"
    }
  }
];
