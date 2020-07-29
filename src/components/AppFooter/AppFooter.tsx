import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as tmImage from '@teachablemachine/image';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle
} from './styles'

import { DrawKeypoints, DrawVideoCanvas } from '../../utils/CanvasHelper';

interface IAnnotatedPrediction {
  annotations: {
    [key: string]: Array<[number, number, number]>;
  };
  handInViewConfidence: number;
  landmarks: Array<[number, number, number]>;
  boundingBox: {
    topLeft: [number, number];
    bottomRight: [number, number];
  };
}

interface IGesturePrediction {
  className: string
  probability: number
}

interface IProps extends RouteComponentProps {
  text: string
  fontSize: number
  isOrderOpen: boolean
  thumbsStatusUpdate: any
};

class AppFooter extends React.Component<IProps, {}> {
  private _VideoRef = React.createRef<HTMLVideoElement>()
  private _CanvasRef = React.createRef<HTMLCanvasElement>()

  private model: any = null
  private isVideo: boolean = false

  private prevx: number = 0
  private prevy: number = 0
  private xCordinateIdx = 1;
  private yCordinateIdx = 0;

  private _SetRouteTimeout = true;

  private handGestureModel: tmImage.CustomMobileNet | null;

  public constructor(props: IProps) {
    super(props);
    this._DetectHand = this._DetectHand.bind(this)
    this._VideoEventListener = this._VideoEventListener.bind(this)
    this._MoveHand = this._MoveHand.bind(this)
    this._InitHandtrack = this._InitHandtrack.bind(this)
    this.handGestureModel = null
  }

  public componentDidMount(): void {
    const gestureModelURL = "https://devsangamstorageaccount.blob.core.windows.net/sanray/gesture_model.json";
    const gestureMetadataURL = "https://devsangamstorageaccount.blob.core.windows.net/sanray/gesture_metadata.json";
    tmImage.load(gestureModelURL, gestureMetadataURL).then((model: tmImage.CustomMobileNet) => {
      this.handGestureModel = model;
    });

    console.log('CDM');
    this._InitHandtrack();
  }

  public componentDidUpdate(): void {
    console.log('CDU');
  }

  public componentWillUnmount(): void {
    console.log('CWU');
  }

  public render(): JSX.Element {
    const { pathname } = this.props.location
    const { text, fontSize } = this.props

    return (
      <FooterDiv absolute={pathname !== '/menu'}>
        <video ref={this._VideoRef} className="video-container" autoPlay id="uservideo"></video>
        <canvas ref={this._CanvasRef} className="main-canvas" id="videocanvas"></canvas>
        <FooterTitleDiv>
          <FooterTitle
            fontSize={fontSize}
          >
            {text}
          </FooterTitle>
        </FooterTitleDiv>
      </FooterDiv>
    )
  }

  private async _InitHandtrack(): Promise<void> {
    await tf.setBackend('webgl');
    this.model = await handpose.load();

    await this._SetupCamera();
  }

  private async _SetupCamera(): Promise<void> {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
    }

    const video = this._VideoRef.current as HTMLVideoElement;
    const stream = await navigator.mediaDevices.getUserMedia({
      'audio': false,
      'video': {
        facingMode: 'user',
        width: { exact: 720 },
        height: { exact: 720 },
      },
    });
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.addEventListener('playing', this._VideoEventListener, false)
      video.play();
    }
  }

  private _VideoEventListener(): any {
    if (this._VideoRef.current?.videoWidth === 0) {
      console.error('videoWidth is 0. Camera not connected?');
    }
    else {
      if (this._VideoRef.current) {
        this._VideoRef.current.width = this._VideoRef.current.videoWidth * 0.5
        this._VideoRef.current.height = this._VideoRef.current.videoHeight * 0.5
      }

      this.isVideo = true;
      if (this.props.location.pathname !== "/menu") {
        this._DetectHand()
      } else {
        this._MoveHand()
      }
    }
  }

  private async _DetectHand(): Promise<void> {
    const video = this._VideoRef.current as HTMLVideoElement;
    const canvas = this._CanvasRef.current as HTMLCanvasElement;
    let prediction: IAnnotatedPrediction[] = [];

    if (canvas) {
      DrawVideoCanvas(canvas, video);
    }

    if (this.isVideo) prediction = await this.model.estimateHands(video);

    // hand is detected
    if (prediction[0]) {
      DrawKeypoints(canvas.getContext('2d') as CanvasRenderingContext2D, prediction[0].landmarks);
      if (this._SetRouteTimeout) {
        setTimeout(() => {
          this.isVideo = false;
          this.props.location.pathname !== '/menu' && this.props.history.push('/menu')
        }, 2000);
      }
      this._SetRouteTimeout = false;
    }

    if (this.isVideo) {
      requestAnimationFrame(this._DetectHand)
    }
  }

  private async _MoveHand(): Promise<void> {
    const video = this._VideoRef.current as HTMLVideoElement;
    const canvas = this._CanvasRef.current as HTMLCanvasElement;

    if (canvas) {
      DrawVideoCanvas(canvas, video);
    }

    const prediction: IAnnotatedPrediction[] = await this.model.estimateHands(video);

    if (prediction[0]) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      DrawKeypoints(context, prediction[0].landmarks);

      const minThreshold = 15, maxThreshold = 1440;
      const xbuffer = 150;
      const ybuffer = 100;

      let pointerX = prediction[0].landmarks[8][this.yCordinateIdx],
        pointerY = prediction[0].landmarks[8][this.xCordinateIdx];

      pointerX = (pointerX / (2 * video.width)) * window.innerWidth;
      pointerY = ((pointerY + ybuffer) / (2 * video.height)) * window.innerHeight;

      pointerX = ((pointerX - xbuffer) / (window.innerWidth - 2 * xbuffer)) * window.innerWidth;
      pointerY = ((pointerY - ybuffer) / (window.innerHeight - 2 * ybuffer)) * window.innerHeight;

      if (
        Math.abs(pointerX - this.prevx) > minThreshold &&
        Math.abs(pointerX - this.prevx) < maxThreshold
      ) {
        this.prevx = pointerX;
      }
      if (
        Math.abs(pointerY - this.prevy) > minThreshold &&
        Math.abs(pointerY - this.prevy) < maxThreshold
      ) {
        this.prevy = pointerY;
      }

      const cursor = document.getElementById("cursor_icon")
      if (!this.props.isOrderOpen && cursor) {
        cursor.style.top = Math.round(this.prevy) + 'px';
        cursor.style.right = Math.round(this.prevx) + 'px';
      }

      if (this.props.isOrderOpen && context && this._VideoRef.current) {
        context.beginPath();
        if (context) {
          let imgData = context.getImageData(0, 0, 720, 720);

          let tcanvas = document.createElement('canvas');
          tcanvas.width = 720;
          tcanvas.height = 720;
          let tcontext = tcanvas.getContext("2d") as CanvasRenderingContext2D;
          tcontext.putImageData(imgData, 0, 0);
          this.handGestureModel?.predict(tcanvas).then((pred: IGesturePrediction[]) => {
            if (pred[0].probability > 0.5) {
              this.props.thumbsStatusUpdate(true);
            } else {
              this.props.thumbsStatusUpdate(false);
            }
          });
        }
      }    
    }
    if (this.isVideo) {
      requestAnimationFrame(this._MoveHand);
    }
  }
}

export default withRouter(AppFooter);