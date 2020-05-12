import styled from '../../config/styled-components';
import { IProgressIndicatorStyles } from '@fluentui/react/lib/ProgressIndicator'

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px;
`

export const ItemDisplayImage = styled.img`
  max-width: 80%;
`

export const ItemDisplayContainer = styled.div`
  position: relative;
  width: 270px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #F7F7F7;
  border-radius: 25px 25px 0 0;
`

export const ProgressStyle: IProgressIndicatorStyles = {
  itemName: {},
  itemDescription: {},
  progressBar: {
    height: 11,
    borderRadius: '0 2px 2px 0',
    backgroundColor: "#F31818"
  },
  progressTrack: {
    height: 11,
    borderRadius: '0 2px 2px 0'    
  },
  itemProgress: {
    padding: 0,
    height: 11,
    borderRadius: '0 2px 2px 0'
  },
  root: {
    borderRadius: '0 2px 2px 0'
  }
};

export const ItemName = styled.p`
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
  color: #000;
  margin-top: 20px;
`