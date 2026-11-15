// Lilies of the Field - Official Numbered Content System
// As specified by Katrice Clermont: Our content runs on numbered lists because our design team builds from the numbers.

export interface NumberedItem {
  id: string
  numberLabel: string
  title: string
  fullText: string
  category?: string
  author?: string
}

export const POEMS_AND_PRAYERS_LIST: NumberedItem[] = [
  {
    id: 'poem-01',
    numberLabel: 'Poem #01',
    title: 'Psalm 23 (The Lord is My Shepherd)',
    category: 'Scripture',
    fullText: `PSALM 23

The Lord is my shepherd; I shall not want.
He maketh me to lie down in green pastures:
He leadeth me beside the still waters.
He restoreth my soul:
He leadeth me in the paths of righteousness for his name's sake.
Yea, though I walk through the valley of the shadow of death,
I will fear no evil: for thou art with me;
Thy rod and thy staff they comfort me.
Thou preparest a table before me in the presence of mine enemies:
Thou anointest my head with oil; my cup runneth over.
Surely goodness and mercy shall follow me all the days of my life:
And I will dwell in the house of the Lord for ever.`
  },
  {
    id: 'poem-02',
    numberLabel: 'Poem #02',
    title: 'The Lord’s Prayer (Our Father)',
    category: 'Scripture / Prayer',
    fullText: `THE LORD’S PRAYER

Our Father which art in heaven,
Hallowed be thy name.
Thy kingdom come.
Thy will be done in earth, as it is in heaven.
Give us this day our daily bread.
And forgive us our debts, as we forgive our debtors.
And lead us not into temptation, but deliver us from evil:
For thine is the kingdom, and the power, and the glory, for ever.
Amen.`
  },
  {
    id: 'poem-03',
    numberLabel: 'Poem #03',
    title: 'Ecclesiastes 3:1-8 (To Every Thing There Is a Season)',
    category: 'Scripture',
    fullText: `ECCLESIASTES 3:1-8

To every thing there is a season,
and a time to every purpose under the heaven:
A time to be born, and a time to die;
a time to plant, and a time to pluck up that which is planted;
A time to kill, and a time to heal;
a time to break down, and a time to build up;
A time to weep, and a time to laugh;
a time to mourn, and a time to dance;
A time to cast away stones, and a time to gather stones together;
a time to embrace, and a time to refrain from embracing;
A time to get, and a time to lose;
a time to keep, and a time to cast away;
A time to rend, and a time to sew;
a time to keep silence, and a time to speak;
A time to love, and a time to hate;
a time of war, and a time of peace.`
  },
  {
    id: 'poem-04',
    numberLabel: 'Poem #04',
    title: '2 Timothy 4:7-8 (I Have Fought the Good Fight)',
    category: 'Scripture',
    fullText: `2 TIMOTHY 4:7-8

I have fought a good fight,
I have finished my course,
I have kept the faith:
Henceforth there is laid up for me a crown of righteousness,
which the Lord, the righteous judge,
shall give me at that day:
and not to me only,
but unto all them also that love his appearing.`
  },
  {
    id: 'poem-05',
    numberLabel: 'Poem #05',
    title: 'John 14:1-3 (In My Father’s House Are Many Mansions)',
    category: 'Scripture',
    fullText: `JOHN 14:1-3

Let not your heart be troubled:
ye believe in God, believe also in me.
In my Father's house are many mansions:
if it were not so, I would have told you.
I go to prepare a place for you.
And if I go and prepare a place for you,
I will come again, and receive you unto myself;
that where I am, there ye may be also.`
  },
  {
    id: 'poem-06',
    numberLabel: 'Poem #06',
    title: 'Do Not Stand at My Grave and Weep',
    author: 'Mary Elizabeth Frye',
    category: 'Memorial Poem',
    fullText: `DO NOT STAND AT MY GRAVE AND WEEP
By Mary Elizabeth Frye

Do not stand at my grave and weep;
I am not there. I do not sleep.
I am a thousand winds that blow,
I am the diamond glints on snow,
I am the sunlight on ripened grain,
I am the gentle autumn rain.

When you awaken in the morning's hush
I am the swift uplifting rush
Of quiet birds in circled flight.
I am the soft stars that shine at night.
Do not stand at my grave and cry;
I am not there. I did not die.`
  },
  {
    id: 'poem-07',
    numberLabel: 'Poem #07',
    title: 'Footprints in the Sand',
    author: 'Margaret Fishback Powers',
    category: 'Inspirational',
    fullText: `FOOTPRINTS IN THE SAND

One night I dreamed a dream.
As I was walking along the beach with my Lord,
across the dark sky flashed scenes from my life.
For each scene, I noticed two sets of footprints in the sand,
one belonging to me and one to my Lord.

When the last scene of my life shot before me
I looked back at the footprints in the sand.
There was only one set of footprints.
I realized that this was at the lowest and saddest times of my life.

This always bothered me and I questioned the Lord about my dilemma.
"Lord, you told me when I decided to follow You,
You would walk and talk with me all the way.
But I'm aware that during the most troublesome times of my life
there is only one set of footprints.
I just don't understand why, when I need You most, You leave me."

He whispered, "My precious child, I love you and will never leave you,
never, ever, during your trials and testings.
When you saw only one set of footprints,
it was then that I carried you."`
  },
  {
    id: 'poem-08',
    numberLabel: 'Poem #08',
    title: 'Don’t Cry for Me',
    category: 'Memorial Poem',
    fullText: `DON’T CRY FOR ME

Don't cry for me, for now I'm free;
I'm following the path God laid for me.
I took His hand when I heard Him call;
I turned my back and left it all.

I could not stay another day,
To laugh, to love, to work or play.
Tasks left undone must stay that way;
I found that peace at close of day.

If my parting has left a void,
Then fill it with remembered joy.
A friendship shared, a laugh, a kiss;
Ah yes, these things I too will miss.

Be not burdened with times of sorrow;
I wish you the sunshine of tomorrow.
My life's been full, I savored much;
Good friends, good times, a loved one's touch.

Perhaps my time seemed all too brief;
Don't lengthen it now with undue grief.
Lift up your heart and share with me;
God wanted me now, He set me free.`
  },
  {
    id: 'poem-09',
    numberLabel: 'Poem #09',
    title: 'God Saw You Getting Tired',
    category: 'Memorial Poem',
    fullText: `GOD SAW YOU GETTING TIRED

God saw you getting tired,
And a cure was not to be.
So He put His arms around you
And whispered, "Come with Me."

With tearful eyes we watched you,
And saw you pass away.
Although we loved you dearly,
We could not make you stay.

A golden heart stopped beating,
Hard working hands at rest.
God broke our hearts to prove to us,
He only takes the best.`
  },
  {
    id: 'poem-10',
    numberLabel: 'Poem #10',
    title: 'I’m Free',
    category: 'Memorial Poem',
    fullText: `I’M FREE

Don't grieve for me, for now I'm free.
I'm following the path God laid for me.
I took His hand when I heard Him call,
I turned my back and left it all.

I could not stay another day,
To laugh, to love, to work or play.
If my parting has left a void,
Then fill it with remembered joy.

A friendship shared, a laugh, a kiss,
Ah yes, these things I too will miss.
My life's been full, I've savored much,
Good friends, good times, a loved one's touch.

Perhaps my time seemed all too brief,
Don't lengthen it now with undue grief.
Lift up your hearts and peace to thee,
God wanted me now; He set me free.`
  },
  {
    id: 'poem-11',
    numberLabel: 'Poem #11',
    title: 'A Life Well Lived',
    category: 'Tribute Verse',
    fullText: `A LIFE WELL LIVED

A life well lived is a precious gift,
Of hope and strength and grace,
From someone who has made our world
A brighter, better place.

It's filled with moments, sweet and sad,
With smiles and sometimes tears,
With friendships formed and good times shared,
And laughter through the years.

A life well lived is a legacy
Of joy and pride and pleasure,
A living, lasting memory
Our grateful hearts will treasure.`
  }
]

export const ACKNOWLEDGEMENTS_LIST: NumberedItem[] = [
  {
    id: 'ack-a1',
    numberLabel: 'Acknowledgement A1',
    title: 'Traditional Family Gratitude & Appreciation',
    fullText: `The family of our beloved [Loved One's Name] wishes to express our deepest gratitude and heartfelt appreciation for the many prayers, comforting telephone calls, visits, floral tributes, and generous acts of kindness shown to us during our time of bereavement. Your warmth, compassion, and sustained love have brought great solace to our hearts. May God richly bless each and every one of you.`
  },
  {
    id: 'ack-a2',
    numberLabel: 'Acknowledgement A2',
    title: 'Poetic Rhyming Expression (Perhaps you sent a lovely card...)',
    fullText: `Perhaps you sent a lovely card, or sat quietly in a chair.
Perhaps you sent a floral spray; if so, we saw it there.
Perhaps you spoke the kindest words, that any friend could say;
Perhaps you were not there at all, just thought of us today.
Whatever you did to console our hearts,
We thank you so much, whatever the part.
May God richly bless each and every one of you.`
  },
  {
    id: 'ack-a3',
    numberLabel: 'Acknowledgement A3',
    title: 'Medical Caregivers & Hospital Team Gratitude',
    fullText: `We extend our deepest gratitude to the physicians, nursing staff, hospice care team, and caregivers at [Hospital / Care Center / Home Hospice] for their exceptional compassion, gentle dignity, and tireless support provided to our beloved [Loved One's Name] and our family throughout this journey. Your kindness will never be forgotten.`
  },
  {
    id: 'ack-a4',
    numberLabel: 'Acknowledgement A4',
    title: 'Church Family, Clergy & Pastoral Care Thanks',
    fullText: `Our family extends our heartfelt appreciation to our Presiding Officiant, church clergy, deacons, choir, and congregation of [Church / Sanctuary Name] for their spiritual guidance, comforting prayers, beautiful ministry of music, and unwavering support during our time of loss. May the Lord continue to bless your sacred ministry.`
  },
  {
    id: 'ack-a5',
    numberLabel: 'Acknowledgement A5',
    title: 'Floral Tributes, Condolences & Sustained Prayer Support',
    fullText: `With sincere gratitude, the family of [Loved One's Name] acknowledges your comforting prayers, beautiful floral arrangements, cards, meals, and expressions of sympathy. Your presence and heartfelt remembrance during this difficult time have provided strength and peace to our family.`
  },
  {
    id: 'ack-a6',
    numberLabel: 'Acknowledgement A6',
    title: 'Short & Sincere Family Note of Thanks',
    fullText: `The family of [Loved One's Name] gratefully acknowledges every thoughtful gesture, prayer, and word of comfort extended to us during our bereavement. Your love has touched our hearts deeply.`
  }
]

export const ORDER_OF_SERVICE_TEMPLATES = {
  standard: `ORDER OF SERVICE

Musical Prelude ......... 
Processional ......... Clergy & Family
Opening Prayer ......... 
Scripture Readings:
  Old Testament ......... 
  New Testament ......... 
Musical Selection ......... 
Obituary Reading ......... 
Acknowledgements & Resolutions ......... 
Reflections / Words of Remembrance ......... 
Musical Selection ......... 
Eulogy ......... 
Closing Prayer ......... 
Benediction ......... 
Recessional ......... `,

  memorial_celebration: `MEMORIAL CELEBRATION ORDER OF SERVICE
(Memorial Service without casket present)

Gathering Music / Prelude ......... 
Welcome ......... 
Opening Prayer ......... 
Scripture Reading ......... 
Musical Selection ......... 
Reading of the Life Story (Obituary) ......... 
Photo / Video Tribute ......... 
Reflections & Remembrances (Family & Friends) ......... 
Favorite Poem or Reading ......... 
Eulogy / Tribute ......... 
Closing Prayer & Benediction ......... 
Recessional Music ......... `,

  funeral_mass: `ORDER OF CHRISTIAN FUNERAL MASS

Greeting & Sprinkling of the Casket with Holy Water ......... Presider
Placing of the Pall & Christian Symbols ......... Family
Entrance Hymn / Processional ......... 
Opening Prayer & Collect ......... Celebrant
Liturgy of the Word:
  First Reading (Old Testament) ......... 
  Responsorial Psalm ......... 
  Second Reading (New Testament) ......... 
  Gospel Acclamation & Holy Gospel ......... 
Homily ......... Celebrant
Prayers of the Faithful (General Intercessions) ......... 
Liturgy of the Eucharist:
  Offertory / Presentation of the Gifts ......... 
  Eucharistic Prayer & Holy Communion ......... 
Words of Remembrance (Reflections) ......... Family Representative
Final Commendation & Song of Farewell ......... 
Prayer of Commendation ......... 
Recessional Hymn ......... `,

  custom: `ORDER OF SERVICE

Musical Prelude ......... 
Processional ......... 
Opening Remarks & Invocation ......... 
Scripture Reading or Prayer ......... 
Musical Selection ......... 
Tributes & Reflections ......... 
Eulogy ......... 
Benediction & Recessional ......... `
}

