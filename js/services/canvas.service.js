'use strict'


const MEDIUM_BREAKPOINT = 768
const SMALL_BREAKPOINT = 551

const STORAGE_KEY = 'memes'
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

const gMeme = {
   selectedImgId: 0,
   selectedLineIdx: -1,
   lines: [
      {
         txt: 'Undefined everywhere!',
         size: window.innerWidth < MEDIUM_BREAKPOINT ? 15 : 40,
         font: 'impact',
         align: 'center',
         color: 'white',
         stroke: 'black',
         rotation: 0,
         posX: window.innerWidth < MEDIUM_BREAKPOINT ? '100' : '250',
         posY: window.innerWidth < MEDIUM_BREAKPOINT ? '30' : '50'
      }
   ]
}

let elCanvas
let gCtx
let isDragging = false


function initCanvas() {
   elCanvas = document.querySelector('#canvas')
   gCtx = elCanvas.getContext('2d')

   loadCanvasListeners()
}

function loadCurrMeme(id) {
   gMeme.selectedImgId = id
}

function resizeCanvas(img) {
   let width = (window.innerWidth < SMALL_BREAKPOINT) ? 200 : (window.innerWidth < MEDIUM_BREAKPOINT) ? 250 : img.width
   let height = (img.height * width) / img.width
   elCanvas.width = width
   elCanvas.height = height
}

function memeTxtChange(txt = 'Undefined everywhere!') {
   return {
      txt,
      size: window.innerWidth < MEDIUM_BREAKPOINT ? 15 : 40,
      font: 'impact',
      align: 'center',
      color: 'white',
      stroke: 'black',
      rotation: 0,
      posX: elCanvas.width / 2,
      posY: gMeme.lines.length >= 2 
         ? elCanvas.height / 2 
         : !gMeme.lines.length 
         ? '30'
         : elCanvas.height - 10
   }
}

const getCanvas = () => elCanvas

const getCtx = () => gCtx

const getMeme = () => gMeme

const toggleDragging = () => isDragging = !isDragging


const pressLine = (ev) => {
   selectedLine(ev)
   if (gMeme.selectedLineIdx !== -1) {
      elCanvas.style.cursor = 'grabbing'
      toggleDragging()
   }
}

const releaseLine = () => {
   elCanvas.style.cursor = 'auto'
   toggleDragging()
}

const dragLine = (ev) => {
   if (isDragging && gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      let currPos = getClickedPos(ev)
      selectedLine.posX = currPos.posX
      selectedLine.posY = currPos.posY
      renderCanvas()
   }
}

function touchStart(ev) {
   pressLine(ev)
   dragLine(ev)
}

function touchEnd(ev) {
   releaseLine(ev.changedTouches[0])
}

function touchMove(ev) {
   dragLine(ev)
}

const txtInput = (ev) => {
   let txt = ev.target.value
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.txt = txt
      renderCanvas()
   }
}

const addTxt = () => {
   const elTxtInput = document.querySelector('.text-input')
   if (!elTxtInput.value) return
   let newTxt = memeTxtChange(elTxtInput.value)
   gMeme.lines.push(newTxt)
   resetInputs()
   renderCanvas()
}

const removeTxt = () => {
   if (gMeme.selectedLineIdx !== -1) {
      gMeme.lines.splice(gMeme.selectedLineIdx, 1)
      if (!gMeme.lines.length) gMeme.selectedLineIdx = -1
      renderCanvas()
   }
}

const increaseFontSize = () => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.size++
      renderCanvas()
   }
}

const decreaseFontSize = () => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.size--
      renderCanvas()
   }
}

const txtAlignLeft = () => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.align = 'right'
      renderCanvas()
   }
}

const txtAlignCenter = () => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.align = 'center'
      renderCanvas()
   }
}

const txtAlignRight = () => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.align = 'left'
      renderCanvas()
   }
}

const fontFamChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.font = ev.target.value
      renderCanvas()
   }
}

const strokeChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.stroke = ev.target.value
      renderCanvas()
   }
}

const fillChange = (ev) => {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.color = ev.target.value
      renderCanvas()
   }
}

function switchLine() {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : gMeme.selectedLineIdx + 1
      let elTxtInput = document.querySelector('.text-input')
      elTxtInput.value = selectedLine.txt
      renderCanvas()
   }
}

function moveLineUp() {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.posY--
      renderCanvas()
   }
}

function moveLineDown() {
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      selectedLine.posY++
      renderCanvas()
   }
}

function selectAllTxt(ev) {
   ev.target.select()
}

function selectedLine(ev) {
   let clicked = getClickedPos(ev)
   let elTxtInput = document.querySelector('.text-input')
   gMeme.selectedLineIdx = gMeme.lines.findIndex(line => {
      let txtLength = gCtx.measureText(line.txt)
      let half = txtLength.width / 2
      let height = txtLength.fontBoundingBoxAscent + txtLength.fontBoundingBoxDescent
      return ( clicked.posY < line.posY
            && clicked.posY > line.posY - height
            && clicked.posX < line.posX + half )
   })
   if (gMeme.selectedLineIdx !== -1) {
      let selectedLine = _getClickedLine()
      elTxtInput.value = selectedLine.txt
   }
   renderCanvas()
}

function getClickedPos(ev) {
   let pos = { posX: ev.offsetX, posY: ev.offsetY }
   if (ev.type === 'touchstart' || ev.type === 'touchmove') {
      ev = ev.changedTouches[0]
      pos = {
         posX: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
         posY: ev.pageY - ev.target.offsetTop
      }
   }
   return pos
}

function saveMemeToStorage() {
   gSavedMemes.push(elCanvas.toDataURL())
   saveToStorage(STORAGE_KEY, gSavedMemes)
}

function _getClickedLine() {
   return gMeme.lines[gMeme.selectedLineIdx]
}