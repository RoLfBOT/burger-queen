const fingerLookupIndices = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20]
}

export const DrawKeypoints = (context: CanvasRenderingContext2D, keypoints: Array<[number, number, number]>) => {
  const keypointsArray = keypoints;  

  for (let i = 0; i < keypointsArray.length; i++) {
    const y = keypointsArray[i][0];
    const x = keypointsArray[i][1];

    DrawPoint(context, x - 2, y - 2, 3);
  }

  const fingers = Object.keys(fingerLookupIndices);
  for (let i = 0; i < fingers.length; i++) {
    const finger = fingers[i];
    const points = fingerLookupIndices[finger].map((idx: number) => keypoints[idx]);    
    DrawPath(context, points, false);
  }
}

export const DrawVideoCanvas = (canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
  canvas.width = video.width;
  canvas.height = video.height;

  const context = canvas.getContext('2d') as CanvasRenderingContext2D;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'red';
  context.fillStyle = 'red';

  context.translate(canvas.width, 0);
  context.scale(-1, 1);

  context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);
}

export const DrawPoint = (context: CanvasRenderingContext2D, y: number, x: number, r: number): void => {
  context.beginPath();
  context.arc(x * 0.5, y * 0.5, r, 0, 2 * Math.PI);
  context.fill();
}

const DrawPath = (context: CanvasRenderingContext2D, points: any, closePath: boolean): void => {
  const region = new Path2D();
  region.moveTo(points[0][0] * 0.5, points[0][1] * 0.5);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point[0] * 0.5, point[1] * 0.5);
  }

  if (closePath) {
    region.closePath();
  }
  context.stroke(region);
}

