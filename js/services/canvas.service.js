'use strict'

const STORAGE_KEY = 'memes'

let gMeme = {
   selectedImgIdx: 0,
   selectedLineIdx: 0,
   lines: [
      {
         txt: 'Undefined everywhere!!',
         size: '20',
         font: 'impact',
         align: 'center',
         color: 'white',
         stroke: 'black',
         rotation: 0,
         posX: 0,
         posY: 0
      }
   ]
}

let elCanvas
let gCtx

function initCanvas() {
   elCanvas = document.querySelector('#canvas')
   gCtx = elCanvas.getContext('2d')
}

function loadCurrMeme(id) {
   gMeme.selectedImgId = id
}

function resizeCanvas(img) {
   let width = (window.innerWidth < 551) ? 200 : (window.innerWidth < 768) ? 250 : img.width
   let height = (img.height * width) / img.width
   elCanvas.width = width
   elCanvas.height = height
}

function setMemeTxt() {
   gMeme.lines[gMeme.selectedLineIdx] = {
      txt: 'Undefined everywhere!!',
      size: window.innerWidth < 768 ? '30' : '50',
      font: 'impact',
      align: 'center',
      color: 'black',
      stroke: 'white',
      posX: 250,
      posY: window.innerWidth < 768 ? '20' : '50'
   }
}

const getCanvas = () => elCanvas

const getCtx = () => gCtx

const getMeme = () => gMeme