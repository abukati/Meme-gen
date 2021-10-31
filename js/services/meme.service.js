'use strict'

const gKeywords = { 'politics': 3, 'man': 5, 'pets': 3,
   'cute': 3, 'kid': 3, 'funny': 8, 'tv': 7, 'epic': 4 }

const gImages = [
   { id: 1, url: './misc/meme-imgs/1.jpg', keywords: ['politics', 'man'] },
   { id: 2, url: './misc/meme-imgs/2.jpg', keywords: ['pets', 'cute'] },
   { id: 3, url: './misc/meme-imgs/3.jpg', keywords: ['pets', 'cute'] },
   { id: 4, url: './misc/meme-imgs/4.jpg', keywords: ['pets', 'cute'] },
   { id: 5, url: './misc/meme-imgs/5.jpg', keywords: ['kid', 'funny'] },
   { id: 6, url: './misc/meme-imgs/6.jpg', keywords: ['funny', 'epic'] },
   { id: 7, url: './misc/meme-imgs/7.jpg', keywords: ['kid', 'funny'] },
   { id: 8, url: './misc/meme-imgs/8.jpg', keywords: ['tv', 'funny'] },
   { id: 9, url: './misc/meme-imgs/9.jpg', keywords: ['kid', 'funny'] },
   { id: 10, url: './misc/meme-imgs/10.jpg', keywords: ['politics', 'man'] },
   { id: 11, url: './misc/meme-imgs/11.jpg', keywords: ['man', 'funny'] },
   { id: 12, url: './misc/meme-imgs/12.jpg', keywords: ['tv', 'man'] },
   { id: 13, url: './misc/meme-imgs/13.jpg', keywords: ['tv', 'epic'] },
   { id: 14, url: './misc/meme-imgs/14.jpg', keywords: ['tv', 'epic'] },
   { id: 15, url: './misc/meme-imgs/15.jpg', keywords: ['tv', 'epic'] },
   { id: 16, url: './misc/meme-imgs/16.jpg', keywords: ['tv', 'funny'] },
   { id: 17, url: './misc/meme-imgs/17.jpg', keywords: ['politics', 'man'] },
   { id: 18, url: './misc/meme-imgs/18.jpg', keywords: ['tv', 'funny'] },
]

const gSavedMemes = []

// _loadMemes()

const getImages = () => gImages

const getSavedMemes = () => gSavedMemes

function _loadMemes() {
   let memes = loadFromStorage(STORAGE_KEY)
   return memes
}