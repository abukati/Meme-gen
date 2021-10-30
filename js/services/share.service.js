'use strict'

const getURL = (type) => elCanvas.toDataURL(type)

function downloadMeme(ev) {
   let link = getURL('image/png')
   ev.href = link
}


function shareMemeFB(ev) {
   ev.preventDefault()
   let link = getURL('image/png')

   function onSuccess(url) {
      let uploadedURL = encodeURIComponent(url)
      document.querySelector('.fb-share').innerHTML = `<a class="btn btn-fb-share" 
            href="https://www.facebook.com/sharer/sharer.php?u=${uploadedURL}&t=${uploadedURL}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}'); return false;">
                     <img src="misc/images/facebook.svg" alt="fb-share" />
                  </a>`
   }

   doUploadImg(link, onSuccess)
}


async function webShare(ev) {
   let shareData = {
      title: 'My meme',
      url: getURL('image/png')
   }

   try {
      await navigator.share(shareData)
   } catch (e) {
      console.error(e)
   }
}


function doUploadImg(url, onSuccess) {
   let formData = new FormData()
   formData.append('img', url)

   fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData,
   })
   .then(res => res.text())
   .then(url => onSuccess(url))
   .catch(err => console.error(err))
}