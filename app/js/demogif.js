/**
 * Source from Matt Way https://github.com/matt-way/gifuct-js 
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Matt Way
 */
function renderGIF(frames, c, ctx) {
  // full gif canvas
  var gifCanvas = document.createElement('canvas');
  var gifCtx = gifCanvas.getContext('2d');

  // c.width = frames[0].dims.width;
  // c.height = frames[0].dims.height;

  gifCanvas.width = c.width;
  gifCanvas.height = c.height;

  gifCtx.clearRect(0, 0, c.width, c.height);
  gifCtx.scale(c.width/frames[0].dims.width, c.height/frames[0].dims.height);
  // draw the patch
  drawPatch(frames[0], gifCtx, gifCanvas);

  var imageData = gifCtx.getImageData(0, 0, gifCanvas.width, gifCanvas.height);
  var other = gifCtx.createImageData(gifCanvas.width, gifCanvas.height);

  // do pixelation
  var pixelsX = c.width;
  var pixelsY = c.height;

  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(c, 0, 0, c.width, c.height, 0, 0, pixelsX, pixelsY);
  ctx.drawImage(c, 0, 0, pixelsX, pixelsY, 0, 0, c.width, c.height);
}

function drawPatch(frame, gifCtx, gifCanvas) {
  var dims = frame.dims;
  var tempCanvas = document.createElement('canvas');
  var tempCtx = tempCanvas.getContext('2d');
  var frameImageData;
  if (!frameImageData || dims.width != frameImageData.width || dims.height != frameImageData.height) {
    tempCanvas.width = dims.width;
    tempCanvas.height = dims.height;
    tempCtx.scale(gifCanvas.width/dims.width, gifCanvas.height/dims.height)
    frameImageData = tempCtx.createImageData(dims.width, dims.height);
  }

  // set the patch data as an override
  frameImageData.data.set(frame.patch);

  // draw the patch back over the canvas
  tempCtx.putImageData(frameImageData, 0, 0);

  gifCtx.drawImage(tempCanvas, dims.left, dims.top);
}
