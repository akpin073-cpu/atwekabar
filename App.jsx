import { useState } from "react";

// ── DATA ──────────────────────────────────────────────
const quotes = [
  { mm:"တစ်နေ့မှာ မင်းဟာ ပုံပြင်တွေကို ပြန်ဖတ်ဖို့ လုံလောက်တဲ့အထိ အသက်ကြီးလာလိမ့်မယ်။", en:"Some day you will be old enough to start reading fairy tales again.", book:"The Chronicles of Narnia", author:"C.S. Lewis", cat:"Life & Growth" },
  { mm:"ငါတို့ဟာ အတိတ်ရဲ့ ရလဒ်တွေဖြစ်ပေမယ့် အတိတ်ရဲ့ အကျဉ်းသားတွေ ဖြစ်နေဖို့ မလိုပါဘူး။", en:"We are products of our past, but we don't have to be prisoners of it.", book:"The Purpose Driven Life", author:"Rick Warren", cat:"Life & Growth" },
  { mm:"သင်ဖြစ်ချင်ခဲ့တဲ့သူ ဖြစ်လာဖို့ ဘယ်တော့မှ နောက်မကျပါဘူး။", en:"It is never too late to be what you might have been.", book:"Middlemarch", author:"George Eliot", cat:"Life & Growth" },
  { mm:"ကြီးပြင်းလာပြီး သင်တကယ်ဖြစ်ချင်တဲ့သူ ဖြစ်လာဖို့ဆိုတာ သတ္တိရှိဖို့လိုတယ်။", en:"It takes courage to grow up and become who you really are.", book:"Complete Poems", author:"E.E. Cummings", cat:"Courage & Fear" },
  { mm:"ကြောက်နေရင်တောင် သတ္တိရှိနိုင်သလား? ကြောက်နေတဲ့အချိန်မှသာ သတ္တိရှိနိုင်တာပါ။", en:"Can a man still be brave if he's afraid? That is the only time a man can be brave.", book:"A Game of Thrones", author:"George R.R. Martin", cat:"Courage & Fear" },
  { mm:"သတ္တိဆိုတာ ကြောက်ရွံ့မှုကို အံတုခြင်းနဲ့ ထိန်းချုပ်ခြင်းဖြစ်တယ်။", en:"Courage is resistance to fear, mastery of fear — not absence of fear.", book:"Pudd'nhead Wilson", author:"Mark Twain", cat:"Courage & Fear" },
  { mm:"ကြောက်တာက မင်းရဲ့ ခံစားချက်၊ ရဲရင့်တာက မင်းရဲ့ လုပ်ဆောင်ချက်။", en:"Scared is what you're feeling. Brave is what you're doing.", book:"Room", author:"Emma Donoghue", cat:"Courage & Fear" },
  { mm:"အနာဂတ်ဟာ သူတို့ရဲ့ အိပ်မက်တွေရဲ့ လှပမှုကို ယုံကြည်သူတွေနဲ့သာ ထိုက်တန်ပါတယ်။", en:"The future belongs to those who believe in the beauty of their dreams.", book:"The Light in the Heart", author:"Eleanor Roosevelt", cat:"Dreams & Success" },
  { mm:"အိပ်မက်တွေ တကယ်ဖြစ်လာနိုင်ခြေရှိတာက ဘဝကို စိတ်ဝင်စားစရာကောင်းစေတာပဲ။", en:"It's the possibility of having a dream come true that makes life interesting.", book:"The Alchemist", author:"Paulo Coelho", cat:"Dreams & Success" },
  { mm:"အောင်မြင်မှုက အဆုံးသတ်မဟုတ်ဘူး၊ ရှုံးနိမ့်မှုက သေလောက်အောင်မဆိုးဘူး။", en:"Success is not final, failure is not fatal: it is the courage to continue that counts.", book:"Winston Churchill: A Life", author:"Winston Churchill", cat:"Dreams & Success" },
  { mm:"စာအုပ်တွေကပဲ ငါဟာ လုံးဝတစ်ယောက်တည်း မဟုတ်ဘူးဆိုတာကို ခံစားမိစေခဲ့တာပါ။", en:"It was books that made me feel that perhaps I was not completely alone.", book:"Clockwork Prince", author:"Cassandra Clare", cat:"Loneliness & Healing" },
  { mm:"ဆင်းရဲဒုက္ခတွေရဲ့ ဝင်္ကပါထဲကနေ လွတ်မြောက်ဖို့ တစ်ခုတည်းသောနည်းလမ်းက ခွင့်လွှတ်ခြင်းပဲ။", en:"The only way out of the labyrinth of suffering is to forgive.", book:"Looking for Alaska", author:"John Green", cat:"Loneliness & Healing" },
  { mm:"မှောင်မိုက်မှုမရှိရင် ကြယ်တွေဟာ မလင်းပနိုင်ပါဘူး။", en:"Stars can't shine without darkness.", book:"The Fault in Our Stars", author:"John Green", cat:"Loneliness & Healing" },
  { mm:"မင်း ကိုယ့်ကိုယ်ကိုယ် ဘယ်လိုချစ်သလဲဆိုတာက တခြားသူတွေ မင်းကို ဘယ်လိုချစ်ရမလဲဆိုတာ သင်ပေးနေတာပဲ။", en:"How you love yourself is how you teach others to love you.", book:"Milk and Honey", author:"Rupi Kaur", cat:"Self-Love" },
  { mm:"မင်းဟာ အခုရှိနေတဲ့အတိုင်းတင် လုံလောက်နေပါပြီ။", en:"You are enough just as you are.", book:"The Gifts of Imperfection", author:"Brené Brown", cat:"Self-Love" },
  { mm:"ကိုယ့်ကိုယ်ကိုယ်ချစ်ခြင်းဟာ တစ်သက်တာလုံးအတွက် အချစ်ဇာတ်လမ်းရဲ့ အစပဲ။", en:"To love oneself is the beginning of a lifelong romance.", book:"An Ideal Husband", author:"Oscar Wilde", cat:"Self-Love" },
];

const calendar = [
  { day:1,  cat:"Life & Growth",        en:"Some day you will be old enough to start reading fairy tales again.", mm:"တစ်နေ့မှာ မင်းဟာ ပုံပြင်တွေကို ပြန်ဖတ်ဖို့ လုံလောက်တဲ့အထိ အသက်ကြီးလာလိမ့်မယ်။", book:"The Chronicles of Narnia", author:"C.S. Lewis", caption:"တစ်ခါတလေကျရင် ကလေးဘဝက ပုံပြင်တွေကို ပြန်ဖတ်ကြည့်ဖို့ လိုအပ်တယ်လို့ မထင်ဘူးလား?", time:"7:00 PM", type:"Video" },
  { day:2,  cat:"Life & Growth",        en:"Growing up is losing some illusions, in order to acquire others.", mm:"ကြီးပြင်းလာတယ်ဆိုတာ အမှားတွေကို လက်လွှတ်လိုက်ပြီး နောက်ထပ်အသစ်တွေကို ရှာဖွေတာပါပဲ။", book:"The Second Sex", author:"Virginia Woolf", caption:"ကြီးပြင်းလာတဲ့ လမ်းခရီးမှာ သင်ရော ဘယ်လို အလွဲအမှားတွေကို သင်ခန်းစာယူခဲ့လဲ?", time:"8:30 PM", type:"Quote Card" },
  { day:3,  cat:"Life & Growth",        en:"The day we fret about the future is the day we leave our childhood behind.", mm:"အနာဂတ်အတွက် စတင်စိုးရိမ်တဲ့နေ့ဟာ ကလေးဘဝကို ချန်ထားခဲ့တဲ့နေ့ပါပဲ။", book:"The Name of the Wind", author:"Patrick Rothfuss", caption:"အနာဂတ်အတွက် စိုးရိမ်နေတာထက် လက်ရှိအချိန်ကို ပျော်အောင်နေဖို့ မေ့နေပြီလား?", time:"9:00 PM", type:"Reel" },
  { day:4,  cat:"Life & Growth",        en:"Maturity is a bitter disappointment for which no remedy exists.", mm:"ရင့်ကျက်မှုဆိုတာ ခါးသီးတဲ့ စိတ်ပျက်စရာတစ်ခုပါ။", book:"Slaughterhouse-Five", author:"Kurt Vonnegut", caption:"ရင့်ကျက်မှုဆိုတာ ခါးသီးပေမယ့် အဲ့ဒီထဲကမှ ရယ်မောစရာလေးတွေ ရှာတွေ့ခဲ့လား?", time:"7:30 PM", type:"Video" },
  { day:5,  cat:"Life & Growth",        en:"We are products of our past, but we don't have to be prisoners of it.", mm:"ငါတို့ဟာ အတိတ်ရဲ့ ရလဒ်တွေဖြစ်ပေမယ့် အတိတ်ရဲ့ အကျဉ်းသားတွေ ဖြစ်နေဖို့ မလိုပါဘူး။", book:"The Purpose Driven Life", author:"Rick Warren", caption:"အတိတ်က အမှားတွေထဲမှာ ပိတ်မိမနေဘဲ အနာဂတ်သစ်ကို စတင်ဖို့ အဆင်သင့်ပဲလား?", time:"8:00 PM", type:"Quote Card" },
  { day:6,  cat:"Life & Growth",        en:"It is never too late to be what you might have been.", mm:"သင်ဖြစ်ချင်ခဲ့တဲ့သူ ဖြစ်လာဖို့ ဘယ်တော့မှ နောက်မကျပါဘူး။", book:"Middlemarch", author:"George Eliot", caption:"သင်ဖြစ်ချင်ခဲ့တဲ့သူ ဖြစ်လာဖို့ အခုကစရင်ရော နောက်ကျသွားပြီလို့ ထင်လား?", time:"7:00 PM", type:"Reel" },
  { day:7,  cat:"Courage & Fear",       en:"It takes courage to grow up and become who you really are.", mm:"ကြီးပြင်းလာပြီး သင်တကယ်ဖြစ်ချင်တဲ့သူ ဖြစ်လာဖို့ဆိုတာ သတ္တိရှိဖို့လိုတယ်။", book:"Complete Poems", author:"E.E. Cummings", caption:"ကိုယ့်ကိုယ်ကိုယ် ပိုသိလာဖို့ ဘယ်လောက်အထိ သတ္တိရှိရှိ ရင်ဆိုင်ခဲ့လဲ?", time:"8:30 PM", type:"Video" },
  { day:8,  cat:"Courage & Fear",       en:"Can a man still be brave if he's afraid? That is the only time a man can be brave.", mm:"ကြောက်နေရင်တောင် သတ္တိရှိနိုင်သလား? ကြောက်နေတဲ့အချိန်မှသာ သတ္တိရှိနိုင်တာပါ။", book:"A Game of Thrones", author:"G.R.R. Martin", caption:"ကြောက်နေတာကို သိသိကြီးနဲ့ ရင်ဆိုင်ရဲတဲ့ သတ္တိမျိုး သင့်မှာ ရှိလား?", time:"9:00 PM", type:"Quote Card" },
  { day:9,  cat:"Courage & Fear",       en:"Courage is resistance to fear, mastery of fear — not absence of fear.", mm:"သတ္တိဆိုတာ ကြောက်ရွံ့မှုကို အံတုခြင်းနဲ့ ထိန်းချုပ်ခြင်းဖြစ်တယ်။", book:"Pudd'nhead Wilson", author:"Mark Twain", caption:"ကြောက်ရွံ့မှုကို ကျော်လွှားနိုင်ဖို့ ဘယ်လိုနည်းလမ်းတွေ သုံးလေ့ရှိလဲ?", time:"7:30 PM", type:"Reel" },
  { day:10, cat:"Courage & Fear",       en:"Real courage is when you begin anyway and see it through no matter what.", mm:"တကယ့်သတ္တိဆိုတာ မစခင်ကတည်းက ရှုံးမယ်ဆိုတာ သိနေပေမယ့် ဘာပဲဖြစ်ဖြစ် စတင်တာပဲ။", book:"To Kill a Mockingbird", author:"Harper Lee", caption:"ရှုံးမယ်မှန်း သိပေမယ့် အဆုံးထိ ကြိုးစားကြည့်ဖို့ သတ္တိရှိလား?", time:"8:00 PM", type:"Video" },
  { day:11, cat:"Courage & Fear",       en:"Don't be afraid of your fears. They're there to let you know that something is worth it.", mm:"ကိုယ့်ရဲ့ကြောက်ရွံ့မှုတွေကို မကြောက်ပါနဲ့။ အဲ့ဒါတွေက တစ်ခုခုက တန်ဖိုးရှိတယ်ဆိုတာ သိစေဖို့ပါ။", book:"The Girl Who Knew Too Much", author:"C. JoyBell C.", caption:"ကြောက်ရွံ့မှုတွေက သင့်အတွက် ဘယ်လောက်အထိ တန်ဖိုးရှိတဲ့ သင်ခန်းစာတွေ ပေးခဲ့လဲ?", time:"7:00 PM", type:"Quote Card" },
  { day:12, cat:"Courage & Fear",       en:"Scared is what you're feeling. Brave is what you're doing.", mm:"ကြောက်တာက မင်းရဲ့ ခံစားချက်၊ ရဲရင့်တာက မင်းရဲ့ လုပ်ဆောင်ချက်။", book:"Room", author:"Emma Donoghue", caption:"ကြောက်တာထက် လုပ်ဆောင်ဖို့က ပိုအရေးကြီးတယ်ဆိုတာ လက်ခံလား?", time:"8:30 PM", type:"Reel" },
  { day:13, cat:"Dreams & Success",     en:"The future belongs to those who believe in the beauty of their dreams.", mm:"အနာဂတ်ဟာ သူတို့ရဲ့ အိပ်မက်တွေရဲ့ လှပမှုကို ယုံကြည်သူတွေနဲ့သာ ထိုက်တန်ပါတယ်။", book:"The Light in the Heart", author:"Eleanor Roosevelt", caption:"သင့်ရဲ့ အိပ်မက်တွေက သင့်အနာဂတ်ကို ဘယ်လောက်အထိ လှပစေမလဲ?", time:"9:00 PM", type:"Video" },
  { day:14, cat:"Dreams & Success",     en:"Don't be pushed by fears. Be led by the dreams in your heart.", mm:"စိတ်ထဲက ကြောက်ရွံ့မှုတွေရဲ့ တွန်းပို့ခြင်းကို မခံပါနဲ့။ နှလုံးသားထဲက အိပ်မက်တွေရဲ့ ဦးဆောင်မှုကို ခံယူပါ။", book:"The Light in the Heart", author:"Roy T. Bennett", caption:"နှလုံးသားရဲ့ စကားသံကို နားထောင်ပြီး ရှေ့ဆက်ဖို့ အဆင်သင့်ပဲလား?", time:"7:30 PM", type:"Quote Card" },
  { day:15, cat:"Dreams & Success",     en:"It's the possibility of having a dream come true that makes life interesting.", mm:"အိပ်မက်တွေ တကယ်ဖြစ်လာနိုင်ခြေရှိတာက ဘဝကို စိတ်ဝင်စားစရာကောင်းစေတာပဲ။", book:"The Alchemist", author:"Paulo Coelho", caption:"အိပ်မက်တွေ တကယ်ဖြစ်လာဖို့ ဘယ်လောက်အထိ စိတ်အားထက်သန်လဲ?", time:"8:00 PM", type:"Reel" },
  { day:16, cat:"Dreams & Success",     en:"Success is not final, failure is not fatal: it is the courage to continue that counts.", mm:"အောင်မြင်မှုက အဆုံးသတ်မဟုတ်ဘူး၊ ရှုံးနိမ့်မှုက သေလောက်အောင်မဆိုးဘူး။", book:"Winston Churchill: A Life", author:"Winston Churchill", caption:"ရှုံးနိမ့်မှုကနေ သင်ယူပြီး ရှေ့ဆက်ဖို့ အင်အားတွေ ရှိနေပြီလား?", time:"7:00 PM", type:"Video" },
  { day:17, cat:"Dreams & Success",     en:"Dare to live the life you have dreamed for yourself.", mm:"ကိုယ့်အတွက် စိတ်ကူးထားတဲ့ဘဝကို ရဲရဲဝံ့ဝံ့ နေထိုင်ပါ။", book:"The Conduct of Life", author:"Ralph Waldo Emerson", caption:"သင့်ဘဝကို ကိုယ်တိုင် ဖန်တီးဖို့ ရဲရဲဝံ့ဝံ့ လှမ်းကြည့်မလား?", time:"8:30 PM", type:"Quote Card" },
  { day:18, cat:"Dreams & Success",     en:"When you chase a dream, you learn about yourself.", mm:"အိပ်မက်တစ်ခုနောက်ကို လိုက်တဲ့အခါ ကိုယ့်အကြောင်းကိုယ် သိလာလိမ့်မယ်။", book:"The Last Song", author:"Nicholas Sparks", caption:"အိပ်မက်တွေနောက်ကို လိုက်ရင်း ကိုယ့်ရဲ့ ဘယ်လို စွမ်းရည်တွေကို တွေ့ရှိခဲ့လဲ?", time:"9:00 PM", type:"Reel" },
  { day:19, cat:"Loneliness & Healing", en:"It was books that made me feel that perhaps I was not completely alone.", mm:"စာအုပ်တွေကပဲ ငါဟာ လုံးဝတစ်ယောက်တည်း မဟုတ်ဘူးဆိုတာကို ခံစားမိစေခဲ့တာပါ။", book:"Clockwork Prince", author:"Cassandra Clare", caption:"စာအုပ်တွေက သင့်ရဲ့ အထီးကျန်ဆန်တဲ့ အချိန်တွေကို ဘယ်လို ကုစားပေးခဲ့လဲ?", time:"7:30 PM", type:"Video" },
  { day:20, cat:"Loneliness & Healing", en:"The only way out of the labyrinth of suffering is to forgive.", mm:"ဆင်းရဲဒုက္ခတွေရဲ့ ဝင်္ကပါထဲကနေ လွတ်မြောက်ဖို့ တစ်ခုတည်းသောနည်းလမ်းက ခွင့်လွှတ်ခြင်းပဲ။", book:"Looking for Alaska", author:"John Green", caption:"နာကျင်မှုတွေကနေ လွတ်မြောက်ဖို့ ခွင့်လွှတ်ခြင်းကို ရွေးချယ်နိုင်မလား?", time:"8:00 PM", type:"Quote Card" },
  { day:21, cat:"Loneliness & Healing", en:"Healing takes time, and asking for help is a very courageous step.", mm:"ကုစားဖို့ အချိန်လိုတယ်၊ အကူအညီတောင်းတာဟာ တကယ့်ကို သတ္တိရှိတဲ့ အဆင့်တစ်ခုပါ။", book:"The Perks of Being a Wallflower", author:"Stephen Chbosky", caption:"ကုစားဖို့ အချိန်လိုတယ်ဆိုတာကို လက်ခံပြီး အကူအညီ တောင်းဖို့ သတ္တိရှိလား?", time:"7:00 PM", type:"Reel" },
  { day:22, cat:"Loneliness & Healing", en:"Loneliness is the poverty of self; solitude is the richness of self.", mm:"အထီးကျန်ခြင်းက ကိုယ့်ကိုယ်ကိုယ် ဆင်းရဲစေတယ်၊ တစ်ယောက်တည်းနေခြင်းက ကြွယ်ဝစေတယ်။", book:"Journal of a Solitude", author:"May Sarton", caption:"တစ်ယောက်တည်း နေရတဲ့ အချိန်တွေမှာ ကိုယ့်ကိုယ်ကိုယ် ဘယ်လို ကြွယ်ဝအောင် လုပ်လဲ?", time:"8:30 PM", type:"Video" },
  { day:23, cat:"Loneliness & Healing", en:"You cannot find peace by avoiding life.", mm:"ဘဝကို ရှောင်လွှဲခြင်းဖြင့် ငြိမ်းချမ်းမှုကို ရှာမတွေ့နိုင်ပါဘူး။", book:"The Hours", author:"Virginia Woolf", caption:"ဘဝကို ရင်ဆိုင်ရင်း စစ်မှန်တဲ့ ငြိမ်းချမ်းမှုကို ရှာတွေ့ပြီလား?", time:"9:00 PM", type:"Quote Card" },
  { day:24, cat:"Loneliness & Healing", en:"Stars can't shine without darkness.", mm:"မှောင်မိုက်မှုမရှိရင် ကြယ်တွေဟာ မလင်းပနိုင်ပါဘူး။", book:"The Fault in Our Stars", author:"John Green", caption:"မှောင်မိုက်တဲ့ အချိန်တွေမှာတောင် သင့်ရဲ့ အရည်အချင်းတွေ လင်းပနိုင်တယ်ဆိုတာ ယုံကြည်လား?", time:"7:30 PM", type:"Reel" },
  { day:25, cat:"Self-Love",            en:"How you love yourself is how you teach others to love you.", mm:"မင်း ကိုယ့်ကိုယ်ကိုယ် ဘယ်လိုချစ်သလဲဆိုတာက တခြားသူတွေ မင်းကို ဘယ်လိုချစ်ရမလဲဆိုတာ သင်ပေးနေတာပဲ။", book:"Milk and Honey", author:"Rupi Kaur", caption:"ကိုယ့်ကိုယ်ကိုယ် ဘယ်လောက်အထိ တန်ဖိုးထားပြီး ချစ်ပေးနိုင်ပြီလဲ?", time:"8:00 PM", type:"Video" },
  { day:26, cat:"Self-Love",            en:"The most terrifying thing is to accept oneself completely.", mm:"အကြောက်စရာအကောင်းဆုံးအရာက ကိုယ့်ကိုယ်ကိုယ် အပြည့်အဝ လက်ခံလိုက်ဖို့ပါပဲ။", book:"The Archetypes", author:"C.G. Jung", caption:"ကိုယ့်ရဲ့ အားနည်းချက်တွေကိုရော အပြည့်အဝ လက်ခံနိုင်ပြီလား?", time:"7:00 PM", type:"Quote Card" },
  { day:27, cat:"Self-Love",            en:"If you have the ability to love, love yourself first.", mm:"မင်းမှာ ချစ်နိုင်စွမ်းရှိရင် ကိုယ့်ကိုယ်ကိုယ် အရင်ဆုံးချစ်ပါ။", book:"Love is a Dog from Hell", author:"Charles Bukowski", caption:"တခြားသူတွေကို မချစ်ခင် ကိုယ့်ကိုယ်ကိုယ် အရင်ဆုံး ချစ်ဖို့ မေ့နေပြီလား?", time:"8:30 PM", type:"Reel" },
  { day:28, cat:"Self-Love",            en:"To love oneself is the beginning of a lifelong romance.", mm:"ကိုယ့်ကိုယ်ကိုယ်ချစ်ခြင်းဟာ တစ်သက်တာလုံးအတွက် အချစ်ဇာတ်လမ်းရဲ့ အစပဲ။", book:"An Ideal Husband", author:"Oscar Wilde", caption:"ကိုယ့်ကိုယ်ကိုယ် ချစ်ခြင်းက ဘဝအတွက် ဘယ်လောက်အထိ အရေးကြီးလဲ?", time:"9:00 PM", type:"Video" },
  { day:29, cat:"Self-Love",            en:"You are enough just as you are.", mm:"မင်းဟာ အခုရှိနေတဲ့အတိုင်းတင် လုံလောက်နေပါပြီ။", book:"The Gifts of Imperfection", author:"Brené Brown", caption:"မင်းဟာ အခုရှိနေတဲ့အတိုင်းတင် လုံလောက်နေပြီဆိုတာ သိလား?", time:"7:30 PM", type:"Quote Card" },
  { day:30, cat:"Self-Love",            en:"Dare to love yourself as if you were a rainbow with gold at both ends.", mm:"ကိုယ့်ကိုယ်ကိုယ် ထိပ်နှစ်ဖက်လုံးမှာ ရွှေတွေရှိတဲ့ သက်တန့်တစ်ခုလို ရဲရဲဝံ့ဝံ့ ချစ်လိုက်ပါ။", book:"Journey through the Rainbow", author:"Aberjhani", caption:"ကိုယ့်ကိုယ်ကိုယ် သက်တန့်လေးတစ်ခုလို လှလှပပ ချစ်ပေးဖို့ အဆင်သင့်ပဲလား?", time:"8:00 PM", type:"Reel" },
];

const CC = { "Life & Growth":"#4ade80","Courage & Fear":"#f87171","Dreams & Success":"#fbbf24","Loneliness & Healing":"#818cf8","Self-Love":"#f472b6" };
const TI = { "Video":"🎬","Quote Card":"🖼️","Reel":"📱" };
const TAGS = "#MyanmarBookQuote #DarkAesthetic #MotivationalQuotes #MyanmarYouth #BookLover #DeepQuotes #LifeLessons #Healing #SelfLove #Myanmar";
const THEMES = [
  { name:"Midnight", bg:"linear-gradient(135deg,#0a0a0f,#12121f)", card:"#0f0f1eee", accent:"#c084fc", text:"#e2d9f3", sub:"#9b8ab4", border:"rgba(192,132,252,0.2)", glow:"rgba(192,132,252,0.12)", bgC:["#0a0a0f","#12121f","#0d0d1a"] },
  { name:"Crimson",  bg:"linear-gradient(135deg,#0f0808,#1a0d0d)", card:"#140a0aee", accent:"#f87171", text:"#f3e2e2", sub:"#b49a9a", border:"rgba(248,113,113,0.2)", glow:"rgba(248,113,113,0.12)", bgC:["#0f0808","#1a0d0d","#110909"] },
  { name:"Ocean",    bg:"linear-gradient(135deg,#030c14,#071220)", card:"#050f19ee", accent:"#38bdf8", text:"#e2f0f9", sub:"#8ab4c8", border:"rgba(56,189,248,0.2)",  glow:"rgba(56,189,248,0.12)",  bgC:["#030c14","#071220","#05101a"] },
  { name:"Forest",   bg:"linear-gradient(135deg,#050f07,#0a1a0d)", card:"#071209ee", accent:"#4ade80", text:"#e2f3e6", sub:"#8ab49a", border:"rgba(74,222,128,0.2)",  glow:"rgba(74,222,128,0.12)",  bgC:["#050f07","#0a1a0d","#071209"] },
];
function h2r(hex,a){const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return `rgba(${r},${g},${b},${a})`;}
function wT(ctx,t,x,y,mW,lh){const chars=t.split("");let l="",ls=[];for(const c of chars){const tt=l+c;if(ctx.measureText(tt).width>mW&&l){ls.push(l);l=c;}else l=tt;}ls.push(l);ls.forEach((ll,i)=>ctx.fillText(ll,x,y+i*lh));return ls.length;}
function wW(ctx,t,x,y,mW,lh){const ws=t.split(" ");let l="",ls=[];for(const w of ws){const tt=l+w+" ";if(ctx.measureText(tt).width>mW&&l){ls.push(l.trim());l=w+" ";}else l=tt;}ls.push(l.trim());ls.forEach((ll,i)=>ctx.fillText(ll,x,y+i*lh));return ls.length;}

// ── QUOTE CARD TAB ──────────────────────────────────
function QuoteTab() {
  const [qi,setQi]=useState(0);
  const [ti,setTi]=useState(0);
  const [cf,setCf]=useState("All");
  const [mode,setMode]=useState("browse");
  const [cMM,setCMM]=useState(""); const [cEN,setCEN]=useState(""); const [cB,setCB]=useState(""); const [cA,setCA]=useState("");
  const [copied,setCopied]=useState(false);
  const [ak,setAk]=useState(0);
  const t=THEMES[ti];
  const cats=["All","Life & Growth","Courage & Fear","Dreams & Success","Loneliness & Healing","Self-Love"];
  const fq=cf==="All"?quotes:quotes.filter(q=>q.cat===cf);
  const si=Math.min(qi,fq.length-1);
  const q=mode==="custom"&&(cMM||cEN)?{mm:cMM,en:cEN,book:cB||"?",author:cA||"?",cat:"Custom"}:fq[si];
  const go=d=>{setQi(i=>(i+d+fq.length)%fq.length);setAk(k=>k+1);};
  const copy=()=>{navigator.clipboard.writeText(`"${q.en}"\n\n${q.mm}\n\n— ${q.author}, ${q.book}`);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  const dl=()=>{
    const W=1080,H=1080,c=document.createElement("canvas");c.width=W;c.height=H;const ctx=c.getContext("2d");
    const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,t.bgC[0]);g.addColorStop(0.5,t.bgC[1]);g.addColorStop(1,t.bgC[2]);ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const g1=ctx.createRadialGradient(W*.85,H*.15,0,W*.85,H*.15,300);g1.addColorStop(0,h2r(t.accent,0.1));g1.addColorStop(1,"transparent");ctx.fillStyle=g1;ctx.fillRect(0,0,W,H);
    const p=80,cW=W-160,cH=H-160,r=32,cx=p,cy=p;
    ctx.beginPath();ctx.moveTo(cx+r,cy);ctx.lineTo(cx+cW-r,cy);ctx.quadraticCurveTo(cx+cW,cy,cx+cW,cy+r);ctx.lineTo(cx+cW,cy+cH-r);ctx.quadraticCurveTo(cx+cW,cy+cH,cx+cW-r,cy+cH);ctx.lineTo(cx+r,cy+cH);ctx.quadraticCurveTo(cx,cy+cH,cx,cy+cH-r);ctx.lineTo(cx,cy+r);ctx.quadraticCurveTo(cx,cy,cx+r,cy);ctx.closePath();
    ctx.fillStyle=t.bgC[1]+"dd";ctx.fill();ctx.strokeStyle=h2r(t.accent,0.3);ctx.lineWidth=1.5;ctx.stroke();
    const lG=ctx.createLinearGradient(cx+cW*.2,0,cx+cW*.8,0);lG.addColorStop(0,"transparent");lG.addColorStop(0.5,t.accent);lG.addColorStop(1,"transparent");ctx.strokeStyle=lG;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx+cW*.2,cy);ctx.lineTo(cx+cW*.8,cy);ctx.stroke();
    ctx.font="bold 200px Georgia";ctx.fillStyle=h2r(t.accent,0.07);ctx.textAlign="left";ctx.fillText('"',cx+40,cy+185);
    ctx.font="bold 22px monospace";ctx.fillStyle=h2r(t.accent,0.7);ctx.textAlign="center";ctx.fillText("📚  MYANMAR BOOK QUOTES",W/2,cy+80);
    const iX=cx+80,iW=cW-160;let cY=cy+140;
    if(q.en){ctx.font="italic 30px Georgia";ctx.fillStyle=t.text;ctx.textAlign="left";cY+=wW(ctx,`"${q.en}"`,iX,cY,iW,52)*52+40;}
    if(q.mm&&q.en){ctx.strokeStyle=h2r(t.accent,0.2);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(iX,cY);ctx.lineTo(iX+iW*.42,cY);ctx.stroke();ctx.beginPath();ctx.moveTo(iX+iW*.58,cY);ctx.lineTo(iX+iW,cY);ctx.stroke();ctx.font="bold 18px serif";ctx.fillStyle=t.accent;ctx.textAlign="center";ctx.fillText("✦",iX+iW/2,cY+6);cY+=50;}
    if(q.mm){ctx.font="24px Georgia";ctx.fillStyle=t.sub;ctx.textAlign="left";cY+=wT(ctx,q.mm,iX,cY,iW,46)*46+50;}
    ctx.textAlign="right";ctx.font="bold 26px Georgia";ctx.fillStyle=t.accent;ctx.fillText(`— ${q.author}`,iX+iW,cY);cY+=38;ctx.font="italic 20px Georgia";ctx.fillStyle=t.sub;ctx.fillText(q.book,iX+iW,cY);
    ctx.textAlign="center";ctx.font="16px monospace";ctx.fillStyle=h2r(t.sub,0.3);ctx.fillText("စာပေ ဆိုးဆိုး လေး ✦ Myanmar Book Quotes",W/2,H-28);
    const a=document.createElement("a");a.download=`quote-day-${Date.now()}.png`;a.href=c.toDataURL("image/png");a.click();
  };
  return (
    <div>
      <div style={{display:"flex",gap:"5px",flexWrap:"wrap",mb:12,marginBottom:"12px",justifyContent:"center"}}>
        {cats.map(c=>(
          <button key={c} onClick={()=>{setCf(c);setQi(0);setAk(k=>k+1);}} style={{padding:"4px 10px",borderRadius:"20px",border:`1px solid ${cf===c?(CC[c]||t.accent):"rgba(255,255,255,0.1)"}`,background:cf===c?`${CC[c]||t.accent}20`:"transparent",color:cf===c?(CC[c]||t.accent):t.sub,cursor:"pointer",fontSize:"10px",fontWeight:cf===c?"700":"400"}}>
            {c}
          </button>
        ))}
      </div>
      <div style={{display:"flex",background:"rgba(255,255,255,0.04)",border:`1px solid ${t.border}`,borderRadius:"10px",padding:"3px",marginBottom:"12px"}}>
        {["browse","custom"].map(m=>(
          <button key={m} onClick={()=>setMode(m)} style={{flex:1,padding:"7px",border:"none",borderRadius:"8px",background:mode===m?t.accent:"transparent",color:mode===m?"#000":t.sub,cursor:"pointer",fontSize:"11px",fontWeight:mode===m?"700":"400"}}>
            {m==="browse"?"📖 ကြည့်မယ်":"✏️ ကိုယ်တိုင်"}
          </button>
        ))}
      </div>
      <div key={ak} style={{background:t.card,border:`1px solid ${t.border}`,borderRadius:"16px",padding:"24px 20px",position:"relative",overflow:"hidden",boxShadow:`0 0 40px ${t.glow}`,animation:"fadeIn 0.4s ease"}}>
        <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:"2px",background:`linear-gradient(90deg,transparent,${t.accent},transparent)`}}/>
        <div style={{position:"absolute",top:"12px",left:"14px",fontSize:"60px",color:t.accent,opacity:0.1,lineHeight:1}}>"</div>
        <div style={{display:"inline-block",background:`${CC[q.cat]||t.accent}18`,border:`1px solid ${CC[q.cat]||t.accent}44`,borderRadius:"20px",padding:"2px 8px",marginBottom:"10px"}}>
          <span style={{color:CC[q.cat]||t.accent,fontSize:"9px"}}>{q.cat}</span>
        </div>
        {q.en&&<p style={{color:t.text,fontSize:"15px",fontStyle:"italic",lineHeight:"1.8",margin:"0 0 12px"}}>"{q.en}"</p>}
        {q.mm&&q.en&&<div style={{display:"flex",alignItems:"center",gap:"8px",margin:"10px 0"}}><div style={{flex:1,height:"1px",background:t.border}}/><span style={{color:t.accent,fontSize:"9px"}}>✦</span><div style={{flex:1,height:"1px",background:t.border}}/></div>}
        {q.mm&&<p style={{color:t.sub,fontSize:"12px",lineHeight:"1.9",margin:"0 0 16px"}}>{q.mm}</p>}
        <div style={{textAlign:"right"}}><div style={{color:t.accent,fontSize:"12px",fontWeight:"600"}}>— {q.author}</div><div style={{color:t.sub,fontSize:"10px",fontStyle:"italic",marginTop:"4px"}}>{q.book}</div></div>
      </div>
      {mode==="custom"&&(
        <div style={{marginTop:"10px",background:"rgba(255,255,255,0.03)",border:`1px solid ${t.border}`,borderRadius:"12px",padding:"14px",display:"flex",flexDirection:"column",gap:"7px"}}>
          {[["မြန်မာ quote...",cMM,setCMM],["English quote...",cEN,setCEN],["စာအုပ်",cB,setCB],["စာရေးဆရာ",cA,setCA]].map(([ph,v,s],i)=>(
            <input key={i} value={v} onChange={e=>s(e.target.value)} placeholder={ph} style={{background:"rgba(255,255,255,0.05)",border:`1px solid ${t.border}`,borderRadius:"8px",padding:"8px 10px",color:t.text,fontSize:"12px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
          ))}
        </div>
      )}
      <div style={{display:"flex",gap:"7px",marginTop:"10px"}}>
        {mode==="browse"&&<><button onClick={()=>go(-1)} style={{width:"40px",height:"40px",borderRadius:"9px",background:"rgba(255,255,255,0.05)",border:`1px solid ${t.border}`,color:t.text,cursor:"pointer",fontSize:"16px"}}>‹</button><div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:t.sub,fontSize:"10px",fontFamily:"monospace"}}>{si+1}/{fq.length}</span></div><button onClick={()=>go(1)} style={{width:"40px",height:"40px",borderRadius:"9px",background:"rgba(255,255,255,0.05)",border:`1px solid ${t.border}`,color:t.text,cursor:"pointer",fontSize:"16px"}}>›</button></>}
        <button onClick={copy} style={{flex:1,padding:"10px",borderRadius:"9px",background:copied?t.accent:"rgba(255,255,255,0.05)",border:`1px solid ${copied?t.accent:t.border}`,color:copied?"#000":t.text,cursor:"pointer",fontSize:"11px",fontWeight:"600"}}>{copied?"✓ Copied!":"📋 Copy"}</button>
      </div>
      <button onClick={dl} style={{width:"100%",marginTop:"8px",padding:"12px",borderRadius:"10px",background:`linear-gradient(135deg,${t.accent}22,${t.accent}44)`,border:`1.5px solid ${t.accent}`,color:t.accent,cursor:"pointer",fontSize:"12px",fontWeight:"700",letterSpacing:"1px"}}>⬇ PNG Download — TikTok / FB / YouTube</button>
      <div style={{display:"flex",justifyContent:"center",gap:"8px",marginTop:"14px"}}>
        {THEMES.map((th,i)=><button key={i} onClick={()=>setTi(i)} style={{width:"26px",height:"26px",borderRadius:"50%",background:th.accent,border:i===ti?"3px solid white":"3px solid transparent",cursor:"pointer",boxShadow:i===ti?`0 0 8px ${th.accent}`:"none"}}/>)}
      </div>
    </div>
  );
}

// ── CALENDAR TAB ────────────────────────────────────
function CalTab() {
  const [sel,setSel]=useState(null);
  const [copied,setCopied]=useState(false);
  const copy=d=>{navigator.clipboard.writeText(`"${d.en}"\n\n${d.mm}\n\n— ${d.author} · ${d.book}\n\n${d.caption}\n\n${TAGS} #QuoteDay${d.day}`);setCopied(true);setTimeout(()=>setCopied(false),2000);};
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"7px",marginBottom:"14px"}}>
        {Object.entries(CC).map(([cat,col])=>{const n=calendar.filter(d=>d.cat===cat).length;return(<div key={cat} style={{background:`${col}11`,border:`1px solid ${col}33`,borderRadius:"9px",padding:"8px 4px",textAlign:"center"}}><div style={{color:col,fontSize:"15px",fontWeight:"700"}}>{n}</div><div style={{color:col,fontSize:"8px",fontFamily:"monospace",opacity:0.8}}>{cat.split(" ")[0]}</div></div>);})}
      </div>
      {sel&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:"16px"}} onClick={()=>setSel(null)}>
          <div style={{background:"#12121f",border:`1px solid ${CC[sel.cat]}44`,borderRadius:"18px",padding:"22px",maxWidth:"460px",width:"100%"}} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"14px"}}>
              <div><span style={{background:`${CC[sel.cat]}22`,color:CC[sel.cat],fontSize:"9px",borderRadius:"20px",padding:"2px 8px"}}>{sel.cat}</span><div style={{color:CC[sel.cat],fontSize:"20px",fontWeight:"700",marginTop:"6px"}}>Day {sel.day}</div></div>
              <div style={{textAlign:"right"}}><div style={{color:"#9b8ab4",fontSize:"11px"}}>{TI[sel.type]} {sel.type}</div><div style={{color:CC[sel.cat],fontSize:"12px",marginTop:"4px"}}>⏰ {sel.time}</div></div>
            </div>
            <p style={{color:"#e2d9f3",fontSize:"14px",fontStyle:"italic",lineHeight:"1.75",margin:"0 0 10px"}}>"{sel.en}"</p>
            <div style={{height:"1px",background:"rgba(255,255,255,0.07)",margin:"10px 0"}}/>
            <p style={{color:"#9b8ab4",fontSize:"12px",lineHeight:"1.85",margin:"0 0 14px"}}>{sel.mm}</p>
            <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",padding:"10px",marginBottom:"10px"}}>
              <div style={{color:CC[sel.cat],fontSize:"9px",letterSpacing:"1px",marginBottom:"5px",fontFamily:"monospace"}}>📝 CAPTION</div>
              <p style={{color:"#e2d9f3",fontSize:"12px",lineHeight:"1.65",margin:0}}>{sel.caption}</p>
            </div>
            <div style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"10px",padding:"8px 10px",marginBottom:"14px"}}>
              <p style={{color:"#777",fontSize:"10px",fontFamily:"monospace",margin:0,lineHeight:"1.6"}}>{TAGS} #QuoteDay{sel.day}</p>
            </div>
            <div style={{display:"flex",gap:"7px"}}>
              <button onClick={()=>copy(sel)} style={{flex:1,padding:"10px",borderRadius:"9px",background:copied?"#c084fc":"rgba(192,132,252,0.1)",border:"1px solid rgba(192,132,252,0.3)",color:copied?"#000":"#c084fc",cursor:"pointer",fontSize:"11px",fontWeight:"600"}}>{copied?"✓ Copied!":"📋 Caption + Hashtags Copy"}</button>
              <button onClick={()=>setSel(null)} style={{padding:"10px 14px",borderRadius:"9px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"#888",cursor:"pointer",fontSize:"12px"}}>✕</button>
            </div>
          </div>
        </div>
      )}
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"7px"}}>
        {calendar.map(d=>(
          <div key={d.day} onClick={()=>setSel(d)} style={{background:`${CC[d.cat]}0d`,border:`1px solid ${CC[d.cat]}33`,borderRadius:"11px",padding:"9px 5px",textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.06)";e.currentTarget.style.boxShadow=`0 0 14px ${CC[d.cat]}44`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="none";}}>
            <div style={{color:CC[d.cat],fontSize:"15px",fontWeight:"700"}}>{d.day}</div>
            <div style={{fontSize:"12px",marginTop:"2px"}}>{TI[d.type]}</div>
            <div style={{color:CC[d.cat],fontSize:"8px",marginTop:"2px",opacity:0.7,fontFamily:"monospace"}}>{d.time}</div>
          </div>
        ))}
      </div>
      <p style={{textAlign:"center",color:"#444",fontSize:"10px",marginTop:"12px",fontFamily:"monospace"}}>Day ကိုနှိပ်ရင် detail + copy ရမည်</p>
    </div>
  );
}

// ── STRATEGY TAB ────────────────────────────────────
function StratTab() {
  const [active,setActive]=useState(0);
  const [copied,setCopied]=useState(false);
  const tabs=[
    { icon:"📊",label:"Market",color:"#c084fc",content:(
      <div style={{display:"flex",flexDirection:"column",gap:"9px"}}>
        {[["Thought Catalog","TikTok/IG","Gen Z relatability မြင့်မား"],["ReadByPaulina","TikTok","စစ်မှန်တဲ့ ဖတ်ကြောင်း ပြသမှု"],["U Aung Thin","Facebook","Myanmar market ယုံကြည်မှု"],["Dark Aesthetic Niche","TikTok/Reels","Atmospheric audio viral"],["SEA Author Spotlights","TikTok","Southeast Asian pride"]].map(([n,p,f],i)=>(
          <div key={i} style={{background:"rgba(192,132,252,0.07)",border:"1px solid rgba(192,132,252,0.2)",borderRadius:"11px",padding:"12px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}><span style={{color:"#c084fc",fontSize:"12px",fontWeight:"600"}}>{n}</span><span style={{background:"rgba(192,132,252,0.15)",color:"#c084fc",fontSize:"9px",borderRadius:"20px",padding:"2px 7px",fontFamily:"monospace"}}>{p}</span></div>
            <p style={{color:"#b0a8c4",fontSize:"11px",margin:0}}>{f}</p>
          </div>
        ))}
      </div>
    )},
    { icon:"⏰",label:"Schedule",color:"#fbbf24",content:(
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {[["7:30 PM – 9:30 PM","Prime Time","နေ့တိုင်း · Leisure peak",true],["11:00 PM – 1:00 AM","Late Night","Weekend · Healing theme",false],["10:00 AM – 12:00 PM","Morning Refresh","တနင်္ဂနွေ · Inspirational",false]].map(([t,l,d,h],i)=>(
          <div key={i} style={{background:h?"rgba(251,191,36,0.12)":"rgba(251,191,36,0.05)",border:`${h?"2px":"1px"} solid ${h?"#fbbf24":"rgba(251,191,36,0.25)"}`,borderRadius:"13px",padding:"14px",position:"relative"}}>
            {h&&<div style={{position:"absolute",top:"-8px",right:"10px",background:"#fbbf24",color:"#000",fontSize:"9px",fontWeight:"700",padding:"2px 7px",borderRadius:"8px"}}>🔥 BEST</div>}
            <div style={{color:"#fbbf24",fontSize:"17px",fontWeight:"700",fontFamily:"monospace"}}>{t}</div>
            <div style={{color:"#e2d9f3",fontSize:"12px",fontWeight:"600",marginTop:"4px"}}>{l}</div>
            <div style={{color:"#9b8ab4",fontSize:"11px",marginTop:"3px"}}>{d}</div>
          </div>
        ))}
      </div>
    )},
    { icon:"💡",label:"Strategy",color:"#4ade80",content:(
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {[["🌙","Bilingual Dark Aesthetic","English + မြန်မာ တွဲတင် — competitor မလုပ်တဲ့ edge"],["📚","Local Mentor Series","Myanmar Literary Giants — Gen Z friendly format weekly"],["🤝","Safe Space Check-in","Weekly 'ဒီတစ်ပတ် ဘယ်လိုနေလဲ?' — loyal community build"]].map(([ic,t,d],i)=>(
          <div key={i} style={{background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.22)",borderRadius:"13px",padding:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"7px"}}><span style={{fontSize:"18px"}}>{ic}</span><span style={{color:"#4ade80",fontSize:"13px",fontWeight:"700"}}>{t}</span></div>
            <p style={{color:"#b0a8c4",fontSize:"11px",lineHeight:"1.65",margin:0}}>{d}</p>
          </div>
        ))}
      </div>
    )},
    { icon:"🚀",label:"Viral",color:"#38bdf8",content:(
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        {[["🎵","Atmospheric Audio","Slowed+Reverb / Lo-fi — mood ထိရောက်မှု"],["✋","Human Touch POV","Real book မှာ hand နဲ့ highlight — authenticity"],["🔄","Cross-Platform","TikTok→Viral · FB→Community · YouTube→Search"]].map(([ic,t,d],i)=>(
          <div key={i} style={{background:"rgba(56,189,248,0.07)",border:"1px solid rgba(56,189,248,0.22)",borderRadius:"13px",padding:"14px",display:"flex",gap:"12px",alignItems:"flex-start"}}>
            <div style={{background:"rgba(56,189,248,0.15)",borderRadius:"9px",padding:"7px",fontSize:"18px",flexShrink:0}}>{ic}</div>
            <div><div style={{color:"#38bdf8",fontSize:"12px",fontWeight:"600",marginBottom:"4px"}}>{t}</div><div style={{color:"#b0a8c4",fontSize:"11px",lineHeight:"1.6"}}>{d}</div></div>
          </div>
        ))}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"5px",marginTop:"4px"}}>
          {["TikTok\nViral","→","Facebook\nCommunity","→","YouTube\nSearch"].map((a,i)=>a==="→"?<span key={i} style={{color:"#38bdf8",fontSize:"16px"}}>→</span>:<div key={i} style={{background:"rgba(56,189,248,0.1)",border:"1px solid rgba(56,189,248,0.25)",borderRadius:"8px",padding:"7px 10px",textAlign:"center"}}>{a.split("\n").map((l,j)=><div key={j} style={{color:j===0?"#38bdf8":"#9b8ab4",fontSize:j===0?"11px":"9px",fontWeight:j===0?"600":"400"}}>{l}</div>)}</div>)}
        </div>
      </div>
    )},
    { icon:"#️⃣",label:"Hashtags",color:"#f472b6",content:(
      <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
        {[["🌍 GLOBAL",["#BookTok","#DarkAesthetic","#QuoteOfTheDay","#BookQuotes","#DeepQuotes","#Motivation"]],["🇲🇲 LOCAL",["#MyanmarBookQuote","#စာအုပ်အညွှန်း","#MyanmarYouth","#MotivationalQuotes","#Myanmar","#DeepQuotesMM"]]].map(([label,tags],i)=>(
          <div key={i}>
            <div style={{color:"#f472b6",fontSize:"10px",letterSpacing:"2px",fontFamily:"monospace",marginBottom:"8px"}}>{label}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"5px",marginBottom:"8px"}}>{tags.map((h,j)=><span key={j} style={{background:"rgba(244,114,182,0.12)",border:"1px solid rgba(244,114,182,0.3)",borderRadius:"20px",padding:"3px 10px",color:"#f472b6",fontSize:"11px",fontFamily:"monospace"}}>{h}</span>)}</div>
            <button onClick={()=>{navigator.clipboard.writeText(tags.join(" "));setCopied(true);setTimeout(()=>setCopied(false),2000);}} style={{width:"100%",padding:"7px",borderRadius:"8px",background:"rgba(244,114,182,0.1)",border:"1px solid rgba(244,114,182,0.3)",color:"#f472b6",cursor:"pointer",fontSize:"10px",fontFamily:"monospace"}}>{copied?"✓ Copied!":"📋 Copy"}</button>
          </div>
        ))}
        <div style={{background:"rgba(244,114,182,0.06)",border:"1px solid rgba(244,114,182,0.2)",borderRadius:"10px",padding:"12px"}}>
          <p style={{color:"#b0a8c4",fontSize:"11px",lineHeight:"1.7",margin:0}}>💡 Caption အဆုံးမှာ <span style={{color:"#f472b6"}}>Personal Question</span> ထည့်ပါ — comment weighting algorithm trigger ဖြစ်ပြီး reach တက်မည်</p>
        </div>
      </div>
    )},
  ];
  return (
    <div>
      <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(192,132,252,0.15)",borderRadius:"12px",padding:"12px",marginBottom:"14px"}}>
        <div style={{color:"#c084fc",fontSize:"9px",letterSpacing:"2px",fontFamily:"monospace",marginBottom:"7px"}}>📋 EXECUTIVE SUMMARY · Manus AI</div>
        <p style={{color:"#b0a8c4",fontSize:"11px",lineHeight:"1.75",margin:0}}>Myanmar youth page ကို <span style={{color:"#c084fc"}}>"Mentor-Friend"</span> position ချပြီး international wisdom + local culture ပေါင်းစပ်မည်။ <span style={{color:"#c084fc"}}>Dark Aesthetic</span> strategy ဖြင့် engagement + virality အများဆုံးဖြစ်အောင် ဆောင်ရွက်မည်။</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"5px",marginBottom:"14px"}}>
        {tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{padding:"8px 3px",borderRadius:"9px",border:`1px solid ${active===i?tb.color:"rgba(255,255,255,0.08)"}`,background:active===i?`${tb.color}18`:"rgba(255,255,255,0.03)",color:active===i?tb.color:"#9b8ab4",cursor:"pointer",fontSize:"11px",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
            <span>{tb.icon}</span><span style={{fontSize:"8px",fontFamily:"monospace"}}>{tb.label}</span>
          </button>
        ))}
      </div>
      <div style={{background:"rgba(255,255,255,0.03)",border:`1px solid ${tabs[active].color}33`,borderRadius:"14px",padding:"16px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
          <span style={{fontSize:"18px"}}>{tabs[active].icon}</span>
          <div><div style={{color:tabs[active].color,fontSize:"13px",fontWeight:"600"}}>{["Market Analysis","Posting Schedule","Unique Strategy","Viral Tactics","Hashtag Strategy"][active]}</div><div style={{width:"36px",height:"2px",background:`linear-gradient(90deg,${tabs[active].color},transparent)`,marginTop:"3px"}}/></div>
        </div>
        {tabs[active].content}
      </div>
      <div style={{marginTop:"12px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(192,132,252,0.1)",borderRadius:"12px",padding:"14px"}}>
        <div style={{color:"#c084fc",fontSize:"9px",letterSpacing:"2px",fontFamily:"monospace",marginBottom:"10px"}}>✅ ACTION CHECKLIST</div>
        {["Account 3 ခုမှာ profile + bio setup","Dark Aesthetic quote card PNG download","7:30 PM posting alarm ထားပါ","Slowed + Reverb audio CapCut မှာ","Caption တိုင်း မေးခွန်းနဲ့ အဆုံးသတ်","Day 1 quote ယူပြီး ပထမဆုံး post တင်"].map((t,i)=>(
          <div key={i} style={{display:"flex",gap:"8px",alignItems:"flex-start",padding:"6px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none"}}>
            <span style={{color:"#c084fc",fontSize:"11px",flexShrink:0}}>◻</span>
            <span style={{color:"#b0a8c4",fontSize:"11px",lineHeight:"1.55"}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN APP ────────────────────────────────────────
export default function App() {
  const [tab,setTab]=useState(0);
  const tabs=[{icon:"🖼️",label:"Quote Cards"},{icon:"📅",label:"30-Day Calendar"},{icon:"📊",label:"Strategy"}];
  const bg=["linear-gradient(135deg,#0a0a0f,#12121f)","linear-gradient(135deg,#0a0a0f,#0d0d1a)","linear-gradient(135deg,#0a0a0f,#0f0f18)"];
  return (
    <div style={{minHeight:"100vh",background:bg[tab],fontFamily:"Georgia,serif",padding:"0 0 40px",color:"#e2d9f3",transition:"background 0.5s"}}>
      {/* Header */}
      <div style={{background:"rgba(0,0,0,0.4)",backdropFilter:"blur(10px)",borderBottom:"1px solid rgba(192,132,252,0.12)",padding:"16px 20px",textAlign:"center",position:"sticky",top:0,zIndex:50}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:"7px",background:"rgba(192,132,252,0.08)",border:"1px solid rgba(192,132,252,0.2)",borderRadius:"50px",padding:"4px 14px",marginBottom:"8px"}}>
          <span style={{fontSize:"12px"}}>📚</span>
          <span style={{color:"#9b8ab4",fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"monospace"}}>Myanmar Book Quotes · All-in-One</span>
        </div>
        <h1 style={{fontSize:"18px",fontWeight:"300",margin:"0 0 2px"}}>
          စာပေ ဆိုးဆိုး <span style={{color:"#c084fc",fontStyle:"italic"}}>လေး</span>
        </h1>
        <p style={{color:"#9b8ab4",fontSize:"9px",margin:0,fontFamily:"monospace"}}>Quotes · Calendar · Strategy — powered by Manus AI</p>
      </div>

      {/* Tab bar */}
      <div style={{display:"flex",gap:"0",background:"rgba(0,0,0,0.3)",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        {tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{flex:1,padding:"12px 4px",border:"none",borderBottom:tab===i?"2px solid #c084fc":"2px solid transparent",background:"transparent",color:tab===i?"#c084fc":"#9b8ab4",cursor:"pointer",fontSize:"10px",fontWeight:tab===i?"700":"400",display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",transition:"all 0.3s"}}>
            <span style={{fontSize:"16px"}}>{tb.icon}</span>
            <span style={{fontFamily:"monospace",letterSpacing:"0.5px"}}>{tb.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{padding:"16px",maxWidth:"520px",margin:"0 auto"}}>
        {tab===0&&<QuoteTab/>}
        {tab===1&&<CalTab/>}
        {tab===2&&<StratTab/>}
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}} input::placeholder{color:rgba(255,255,255,0.22)}`}</style>
    </div>
  );
}
