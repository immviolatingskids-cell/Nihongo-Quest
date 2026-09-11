export const areas = [
  { id:'sakura', name:'Sakura Village', icon:'🌸', color:'#e8507f', description:'Meet people and make your first sentences.', unlock:0,
    groups:[{id:'greetings',name:'Greetings',icon:'👋',words:['ohayo','konnichiwa','arigato','sayonara']},{id:'people',name:'People',icon:'🧑‍🤝‍🧑',words:['watashi','sensei','tomodachi','namae']}] },
  { id:'market', name:'Lantern Market', icon:'🏮', color:'#ea8c2d', description:'Buy food, count things and ask politely.', unlock:120,
    groups:[{id:'food',name:'Food & drink',icon:'🍙',words:['mizu','ocha','gohan','sushi']},{id:'numbers',name:'Numbers',icon:'🔢',words:['ichi','ni','san','yon']}] },
  { id:'station', name:'Skyline Station', icon:'🚆', color:'#3286d5', description:'Find your way around town.', unlock:280,
    groups:[{id:'travel',name:'Travel',icon:'🎫',words:['eki','densha','kippu','doko']},{id:'directions',name:'Directions',icon:'🧭',words:['migi','hidari','mae','ushiro']}] },
  { id:'school', name:'Moonlight School', icon:'🌙', color:'#7656c9', description:'Talk about study and everyday routines.', unlock:480,
    groups:[{id:'schoollife',name:'School',icon:'📚',words:['gakko','hon','benkyo','nihongo']},{id:'everyday',name:'Everyday',icon:'☀️',words:['asa','yoru','taberu','iku','mainichi','okiru','nemuru','yomu']}] }
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
  v('iku','いく','行く','iku','to go','everyday',2,'school','あした、えきにいきます。','Tomorrow, I go to the station.'),
  v('mainichi','まいにち','毎日','mainichi','every day','everyday',2,'school','まいにち、にほんごをべんきょうします。','I study Japanese every day.'),
  v('okiru','おきる','起きる','okiru','to wake up','everyday',2,'school','あさ、ろくじにおきます。','I wake up at six in the morning.'),
  v('nemuru','ねむる','眠る','nemuru','to sleep','everyday',2,'school','よる、じゅうじにねむります。','I sleep at ten at night.'),
  v('yomu','よむ','読む','yomu','to read','everyday',2,'school','まいにち、ほんをよみます。','I read a book every day.')
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
 {id:'intro',area:'sakura',place:'Introductions',icon:'👋',npc:'Yuki',prompt:'はじめまして。おなまえは？',translation:'Nice to meet you. What is your name?',answers:['わたしはアレックスです','アレックスです'],model:'わたしはアレックスです。',scenes:[{prompt:'はじめまして。おなまえは？',translation:'Nice to meet you. What is your name?',answers:['わたしはアレックスです','アレックスです'],model:'わたしはアレックスです。'},{prompt:'にほんごがすきですか。',translation:'Do you like Japanese?',answers:['はい、すきです','はい'],model:'はい、にほんごがすきです。'},{prompt:'またあした！',translation:'See you tomorrow!',answers:['またあした','さようなら'],model:'またあした！'}]},
 {id:'school',area:'sakura',place:'School',icon:'🏫',npc:'Tanaka-sensei',prompt:'にほんごがすきですか。',translation:'Do you like Japanese?',answers:['はい、すきです','はい'],model:'はい、にほんごがすきです。'},
 {id:'restaurant',area:'market',place:'Restaurant',icon:'🍜',npc:'Mika',prompt:'ごちゅうもんは？',translation:'What would you like to order?',answers:['すしをください','すし'],model:'すしをください。',scenes:[{prompt:'いらっしゃいませ。',translation:'Welcome.',answers:['こんにちは','おはよう'],model:'こんにちは。'},{prompt:'ごちゅうもんは？',translation:'What would you like to order?',answers:['すしをください','すし'],model:'すしをください。'},{prompt:'おちゃもいかがですか。',translation:'Would you also like tea?',answers:['はい、おねがいします','はい'],model:'はい、おねがいします。'}]},
 {id:'shop',area:'market',place:'Shop',icon:'🛍️',npc:'Haru',prompt:'いくつですか。',translation:'How many?',answers:['ふたつください','ふたつ'],model:'ふたつください。'},
 {id:'station',area:'station',place:'Station',icon:'🚆',npc:'Sora',prompt:'どこにいきますか。',translation:'Where are you going?',answers:['がっこうにいきます','がっこう'],model:'がっこうにいきます。',scenes:[{prompt:'どこにいきますか。',translation:'Where are you going?',answers:['がっこうにいきます','がっこう'],model:'がっこうにいきます。'},{prompt:'きっぷはありますか。',translation:'Do you have a ticket?',answers:['はい、あります','はい'],model:'はい、あります。'},{prompt:'でんしゃはみぎです。',translation:'The train is to the right.',answers:['ありがとう','ありがとうございます'],model:'ありがとうございます。'}]},
 {id:'directions',area:'station',place:'Directions',icon:'🧭',npc:'Ren',prompt:'えきはどこですか。',translation:'Where is the station?',answers:['みぎです','ひだりです'],model:'みぎです。'},
 {id:'routine',area:'school',place:'Everyday chat',icon:'☀️',npc:'Aoi',prompt:'あさ、なにをしますか。',translation:'What do you do in the morning?',answers:['ごはんをたべます','べんきょうします'],model:'ごはんをたべます。'}
];

export const companions=[
 {id:'kitsune',name:'Kiko',icon:'🦊',effect:'First mistake each session keeps your combo.',unlock:0},
 {id:'tanuki',name:'Ponta',icon:'🦝',effect:'+2 coins after every correct answer.',unlock:100},
 {id:'neko',name:'Mochi',icon:'🐈',effect:'Review sessions contain one extra due word.',unlock:220}
];

export const curriculum = [
 {id:'path.kana.vowels',type:'kana',title:'First sounds',subtitle:'Read the あ-row',area:'sakura',requires:[],content:['vowels'],outcome:'Recognise the five Japanese vowels'},
 {id:'path.words.greetings',type:'vocabulary',title:'Open the gate',subtitle:'First greetings',area:'sakura',requires:['path.kana.vowels'],content:['ohayo','konnichiwa','arigato','sayonara'],outcome:'Greet someone politely'},
 {id:'path.grammar.identity',type:'grammar',title:'Say who you are',subtitle:'は + です',area:'sakura',requires:['path.words.greetings'],content:['wa','desu'],outcome:'Introduce yourself'},
 {id:'path.story.intro',type:'story',title:'A new friend',subtitle:'Talk with Yuki',area:'sakura',requires:['path.grammar.identity'],content:['intro'],outcome:'Complete an introduction'},
 {id:'path.kana.k',type:'kana',title:'Clear sounds',subtitle:'Read the か-row',area:'sakura',requires:['path.story.intro'],content:['k'],outcome:'Recognise five new kana'},
 {id:'path.words.people',type:'vocabulary',title:'People around you',subtitle:'Names and relationships',area:'sakura',requires:['path.kana.k'],content:['watashi','sensei','tomodachi','namae'],outcome:'Talk about people'},
 {id:'path.words.food',type:'vocabulary',title:'Lantern lunch',subtitle:'Food and drink',area:'market',requires:['path.words.people'],content:['mizu','ocha','gohan','sushi'],outcome:'Recognise a simple menu'},
 {id:'path.grammar.objects',type:'grammar',title:'Order politely',subtitle:'の + を',area:'market',requires:['path.words.food'],content:['no','o'],outcome:'Connect nouns and mark objects'},
 {id:'path.story.restaurant',type:'story',title:'Table for one',subtitle:'Order at Mika’s restaurant',area:'market',requires:['path.grammar.objects'],content:['restaurant'],outcome:'Order a meal'},
 {id:'path.words.travel',type:'vocabulary',title:'Catch the train',subtitle:'Station vocabulary',area:'station',requires:['path.story.restaurant'],content:['eki','densha','kippu','doko'],outcome:'Ask about station travel'},
 {id:'path.grammar.destination',type:'grammar',title:'Where and when',subtitle:'に + ます',area:'station',requires:['path.words.travel'],content:['ni','masu'],outcome:'Describe a polite action and destination'},
 {id:'path.story.station',type:'story',title:'The right platform',subtitle:'Navigate the station',area:'station',requires:['path.grammar.destination'],content:['station'],outcome:'Complete a travel exchange'},
 {id:'path.words.routine',type:'vocabulary',title:'A day in Japanese',subtitle:'Everyday routines',area:'school',requires:['path.story.station'],content:['mainichi','okiru','nemuru','yomu'],outcome:'Describe a simple daily rhythm'},
 {id:'path.story.routine',type:'story',title:'A gentle routine',subtitle:'Talk about your day',area:'school',requires:['path.words.routine'],content:['routine'],outcome:'Complete an everyday exchange'}
];

export const contentManifest={schemaVersion:1,collections:{vocabulary:'vocabulary',grammar:'grammar',kana:'kanaFamilies',scenarios:'scenarios',curriculum:'curriculum'}};
export function validateContent(){
 const issues=[],all=new Set(),wordIds=new Set(vocabulary.map(x=>x.id)),grammarIds=new Set(grammar.map(x=>x.id)),scenarioIds=new Set(scenarios.map(x=>x.id)),familyIds=new Set(kanaFamilies.map(x=>x.id));
 const unique=(kind,list)=>list.forEach((x,i)=>{if(!x.id)issues.push({level:'error',where:`${kind}[${i}]`,message:'Missing stable id'});else if(all.has(`${kind}:${x.id}`))issues.push({level:'error',where:x.id,message:'Duplicate id'});else all.add(`${kind}:${x.id}`)});
 unique('word',vocabulary);unique('grammar',grammar);unique('scenario',scenarios);unique('family',kanaFamilies);unique('node',curriculum);
 vocabulary.forEach(w=>['kana','romaji','meaning','category','area','example','exampleEn'].forEach(k=>{if(!w[k])issues.push({level:'error',where:w.id,message:`Missing ${k}`})}));
 curriculum.forEach(n=>{const valid=n.type==='vocabulary'?wordIds:n.type==='grammar'?grammarIds:n.type==='story'?scenarioIds:familyIds;n.content.forEach(id=>{if(!valid.has(id))issues.push({level:'error',where:n.id,message:`Unknown ${n.type} content: ${id}`})});n.requires.forEach(id=>{if(!curriculum.some(x=>x.id===id))issues.push({level:'error',where:n.id,message:`Unknown prerequisite: ${id}`})})});
 areas.forEach(a=>a.groups.forEach(g=>g.words.forEach(id=>{if(!wordIds.has(id))issues.push({level:'error',where:g.id,message:`Unknown word: ${id}`})})));
 return {valid:!issues.some(x=>x.level==='error'),issues,counts:{words:vocabulary.length,grammar:grammar.length,kana:kanaFamilies.reduce((n,f)=>n+f.items.length,0),scenarios:scenarios.length,nodes:curriculum.length}};
}
