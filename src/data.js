export const areas = [
  { id:'sakura', name:'Sakura Village', icon:'🌸', color:'#e8507f', description:'Meet people and make your first sentences.', unlock:0,
    groups:[{id:'greetings',name:'Greetings',icon:'👋',words:['ohayo','konnichiwa','arigato','sayonara']},{id:'people',name:'People',icon:'🧑‍🤝‍🧑',words:['watashi','sensei','tomodachi','namae']}] },
  { id:'market', name:'Lantern Market', icon:'🏮', color:'#ea8c2d', description:'Buy food, count things and ask politely.', unlock:120,
    groups:[{id:'food',name:'Food & drink',icon:'🍙',words:['mizu','ocha','gohan','sushi']},{id:'numbers',name:'Numbers',icon:'🔢',words:['ichi','ni','san','yon']}] },
  { id:'station', name:'Skyline Station', icon:'🚆', color:'#3286d5', description:'Find your way around town.', unlock:280,
    groups:[{id:'travel',name:'Travel',icon:'🎫',words:['eki','densha','kippu','doko']},{id:'directions',name:'Directions',icon:'🧭',words:['migi','hidari','mae','ushiro']}] },
  { id:'school', name:'Moonlight School', icon:'🌙', color:'#7656c9', description:'Talk about study and everyday routines.', unlock:480,
    groups:[{id:'schoollife',name:'School',icon:'📚',words:['gakko','hon','benkyo','nihongo']},{id:'everyday',name:'Everyday',icon:'☀️',words:['asa','yoru','taberu','iku']}] }
];

const v=(id,kana,kanji,romaji,meaning,category,difficulty,area,example,exampleEn)=>({id,kana,kanji,romaji,meaning,category,difficulty,area,example,exampleEn});
export const vocabulary = [
  v('ohayo','おはよう','お早う','ohayō','good morning','greetings',1,'sakura','おはよう、せんせい。','Good morning, teacher.'),
  v('konnichiwa','こんにちは','今日は','konnichiwa','hello','greetings',1,'sakura','こんにちは、ゆきさん。','Hello, Yuki.'),
  v('arigato','ありがとう','有難う','arigatō','thank you','greetings',1,'sakura','どうもありがとう。','Thank you very much.'),
  v('sayonara','さようなら','左様なら','sayōnara','goodbye','greetings',1,'sakura','せんせい、さようなら。','Goodbye, teacher.'),
  v('watashi','わたし','私','watashi','I / me','people',1,'sakura','わたしはあきです。','I am Aki.'),
  v('sensei','せんせい','先生','sensei','teacher','people',1,'sakura','たなかさんはせんせいです。','Tanaka is a teacher.'),
  v('tomodachi','ともだち','友達','tomodachi','friend','people',1,'sakura','ゆきさんはともだちです。','Yuki is a friend.'),
  v('namae','なまえ','名前','namae','name','people',1,'sakura','おなまえはなんですか。','What is your name?'),
  v('mizu','みず','水','mizu','water','food',1,'market','みずをください。','Water, please.'),
  v('ocha','おちゃ','お茶','ocha','tea','food',1,'market','おちゃをのみます。','I drink tea.'),
  v('gohan','ごはん','ご飯','gohan','rice / meal','food',1,'market','ごはんをたべます。','I eat rice.'),
  v('sushi','すし','寿司','sushi','sushi','food',1,'market','すしがすきです。','I like sushi.'),
  v('ichi','いち','一','ichi','one','numbers',1,'market','りんごをひとつください。','One apple, please.'),
  v('ni','に','二','ni','two','numbers',1,'market','きっぷはにまいです。','There are two tickets.'),
  v('san','さん','三','san','three','numbers',1,'market','さんにんです。','There are three people.'),
  v('yon','よん','四','yon','four','numbers',1,'market','よじです。','It is four o’clock.'),
  v('eki','えき','駅','eki','station','travel',2,'station','えきはどこですか。','Where is the station?'),
  v('densha','でんしゃ','電車','densha','train','travel',2,'station','でんしゃでいきます。','I go by train.'),
  v('kippu','きっぷ','切符','kippu','ticket','travel',2,'station','きっぷをかいます。','I buy a ticket.'),
  v('doko','どこ','何処','doko','where','travel',1,'station','トイレはどこですか。','Where is the toilet?'),
  v('migi','みぎ','右','migi','right','directions',2,'station','みぎにまがってください。','Please turn right.'),
  v('hidari','ひだり','左','hidari','left','directions',2,'station','えきはひだりです。','The station is on the left.'),
  v('mae','まえ','前','mae','front / before','directions',2,'station','えきのまえです。','It is in front of the station.'),
  v('ushiro','うしろ','後ろ','ushiro','behind','directions',2,'station','がっこうのうしろです。','It is behind the school.'),
  v('gakko','がっこう','学校','gakkō','school','schoollife',2,'school','がっこうにいきます。','I go to school.'),
  v('hon','ほん','本','hon','book','schoollife',1,'school','これはにほんごのほんです。','This is a Japanese book.'),
  v('benkyo','べんきょう','勉強','benkyō','study','schoollife',2,'school','にほんごをべんきょうします。','I study Japanese.'),
  v('nihongo','にほんご','日本語','nihongo','Japanese language','schoollife',1,'school','にほんごがすきです。','I like Japanese.'),
  v('asa','あさ','朝','asa','morning','everyday',1,'school','あさごはんをたべます。','I eat breakfast.'),
  v('yoru','よる','夜','yoru','night','everyday',1,'school','よるにべんきょうします。','I study at night.'),
  v('taberu','たべる','食べる','taberu','to eat','everyday',2,'school','まいにちごはんをたべます。','I eat rice every day.'),
  v('iku','いく','行く','iku','to go','everyday',2,'school','あした、えきにいきます。','Tomorrow, I go to the station.')
];

export const kanaFamilies = [
  {id:'vowels',name:'あ-row',items:[['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']]},
  {id:'k',name:'か-row',items:[['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']]},
  {id:'s',name:'さ-row',items:[['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']]},
  {id:'t',name:'た-row',items:[['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']]},
  {id:'n',name:'な-row',items:[['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']]},
  {id:'h',name:'は-row',items:[['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']]}
];
export const confusionPairs = [['ぬ','め','nu','me'],['れ','ね','re','ne'],['シ','ツ','shi','tsu'],['ソ','ン','so','n']];

export const grammar = [
 {id:'desu',title:'です',level:1,summary:'Polite “is / am / are”',pattern:'A は B です',example:'わたしはあきです。',exampleEn:'I am Aki.'},
 {id:'wa',title:'は',level:1,summary:'Marks the topic',pattern:'[topic] は …',example:'これはほんです。',exampleEn:'This is a book.'},
 {id:'no',title:'の',level:2,summary:'Connects nouns; often possession',pattern:'A の B',example:'にほんごのほんです。',exampleEn:'It is a Japanese book.'},
 {id:'o',title:'を',level:2,summary:'Marks the object of an action',pattern:'[object] を [verb]',example:'おちゃをのみます。',exampleEn:'I drink tea.'},
 {id:'ni',title:'に',level:3,summary:'Marks a destination or time',pattern:'[place/time] に [verb]',example:'えきにいきます。',exampleEn:'I go to the station.'},
 {id:'masu',title:'ます',level:3,summary:'Polite present verb ending',pattern:'[verb stem] ます',example:'にほんごをべんきょうします。',exampleEn:'I study Japanese.'}
];

export const scenarios = [
 {id:'intro',area:'sakura',place:'Introductions',icon:'👋',npc:'Yuki',prompt:'はじめまして。おなまえは？',translation:'Nice to meet you. What is your name?',answers:['わたしはアレックスです','アレックスです'],model:'わたしはアレックスです。'},
 {id:'school',area:'sakura',place:'School',icon:'🏫',npc:'Tanaka-sensei',prompt:'にほんごがすきですか。',translation:'Do you like Japanese?',answers:['はい、すきです','はい'],model:'はい、にほんごがすきです。'},
 {id:'restaurant',area:'market',place:'Restaurant',icon:'🍜',npc:'Mika',prompt:'ごちゅうもんは？',translation:'What would you like to order?',answers:['すしをください','すし'],model:'すしをください。'},
 {id:'shop',area:'market',place:'Shop',icon:'🛍️',npc:'Haru',prompt:'いくつですか。',translation:'How many?',answers:['ふたつください','ふたつ'],model:'ふたつください。'},
 {id:'station',area:'station',place:'Station',icon:'🚆',npc:'Sora',prompt:'どこにいきますか。',translation:'Where are you going?',answers:['がっこうにいきます','がっこう'],model:'がっこうにいきます。'},
 {id:'directions',area:'station',place:'Directions',icon:'🧭',npc:'Ren',prompt:'えきはどこですか。',translation:'Where is the station?',answers:['みぎです','ひだりです'],model:'みぎです。'},
 {id:'routine',area:'school',place:'Everyday chat',icon:'☀️',npc:'Aoi',prompt:'あさ、なにをしますか。',translation:'What do you do in the morning?',answers:['ごはんをたべます','べんきょうします'],model:'ごはんをたべます。'}
];

export const companions=[
 {id:'kitsune',name:'Kiko',icon:'🦊',effect:'First mistake each session keeps your combo.',unlock:0},
 {id:'tanuki',name:'Ponta',icon:'🦝',effect:'+2 coins after every correct answer.',unlock:100},
 {id:'neko',name:'Mochi',icon:'🐈',effect:'Review sessions contain one extra due word.',unlock:220}
];
