import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as HandTrack from 'handtrackjs'

import {
  FooterDiv,
  FooterTitleDiv,
  FooterTitle
} from './styles'

interface IProps extends RouteComponentProps {
  text: string
  fontSize: number
};

class AppFooter extends React.Component<IProps, {}> {
  private _VideoRef = React.createRef<HTMLVideoElement>()
  private _CanvasRef = React.createRef<HTMLCanvasElement>()

  private model: any = null
  private isVideo: boolean = false

  private prevx: number = 0
  private prevy: number = 0

  private modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.9,    // confidence threshold for predictions.
  }

  public constructor(props: IProps) {
    super(props);
    this._DetectHand = this._DetectHand.bind(this)
    this._VideoEventListener = this._VideoEventListener.bind(this)
    this._MoveHand = this._MoveHand.bind(this)
  }

  public componentDidMount(): void {
    // @ts-ignore
    HandTrack.load(this.modelParams).then(model => {
      this.model = model
      HandTrack.startVideo(this._VideoRef.current)
    })
    this._VideoRef.current?.addEventListener('playing', this._VideoEventListener, false)
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
      if (window.location.hash !== "#/menu") {
        this._DetectHand()
      } else {
        this._MoveHand()
      }
    }
  }

  private _DetectHand(): void {
    this.model.detect(this._VideoRef.current).then((predictions: any) => {
      const context = this._CanvasRef.current?.getContext('2d')
      this.model.renderPredictions(predictions, this._CanvasRef.current, context, this._VideoRef.current)

      if (predictions[0]) {
        window.location.assign('#/menu')
      }

      if (this.isVideo) {
        requestAnimationFrame(this._DetectHand)
      }
    })
  }

  private _MoveHand(): void {
    this.model.detect(this._VideoRef.current).then((predictions: any) => {
      const context = this._CanvasRef.current?.getContext('2d')
      context && this.model.renderPredictions(predictions, this._CanvasRef.current, context, this._VideoRef.current)

      if (predictions[0]) {
        const xbuffer = 150;
        const ybuffer = 100;
        const flicker = 7;
        var midx = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2);
        var midy = predictions[0].bbox[1] + (predictions[0].bbox[3] / 2);
        let videoWith = -1
        let videoHeight = -1
        if (this._VideoRef.current) {
          videoWith = this._VideoRef.current.width
          videoHeight = this._VideoRef.current.height
        }
        midx = (midx / videoWith) * window.innerWidth;
        midy = (midy / videoHeight) * window.innerHeight;
        midx = ((midx - xbuffer) / (window.innerWidth - 2 * xbuffer)) * window.innerWidth;
        midy = ((midy - ybuffer) / (window.innerHeight - 2 * ybuffer)) * window.innerHeight;

        //remove flickering			
        if (Math.abs(midx - this.prevx) > flicker) //significant change
        {
          this.prevx = midx;
        }

        if (Math.abs(midy - this.prevy) > flicker) //significant change
        {
          this.prevy = midy;
        }

        const cursor = document.getElementById("cursor_icon")
        if (cursor) {
          cursor.style.top = Math.round(this.prevy) + 'px'
          cursor.style.left = Math.round(this.prevx) + 'px'
        }
      }

      if (this.isVideo) {
        requestAnimationFrame(this._MoveHand)
      }
    })
  }
}

export default withRouter(AppFooter);