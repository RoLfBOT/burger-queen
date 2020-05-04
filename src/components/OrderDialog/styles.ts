import { mergeStyleSets } from '@fluentui/react'
import styled from '../../config/styled-components'
import { IButtonStyles } from '@fluentui/react/lib/Button'

export const contentStyles = mergeStyleSets({
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    borderRadius: 30,
    marginLeft: 64,
    marginRight: 64,
    width: 'calc(100% - 64px)'
  },
  header: [
    // tslint:disable-next-line:deprecation
    {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: 50,
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
});

export const DialogTitle = styled.h1`
  font-family: Montserrat;
  font-size: 50px;
  font-weight: 600;
  line-height: 50px;
  color: #FBB01B;
`

export const DialogSubHeader = styled.h2`
  font-family: Montserrat;
  font-size: 30px;
  font-weight: 600;
  line-height: 30px;
  color: #AAA3A3;
  margin-top: 20px;
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
`

export const ActionBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

export const SuccessButtonStyles: Partial<IButtonStyles> = {
  root: {
    marginLeft: 12,
    backgroundColor: "#1BCF8E",
    color: "#fff",
    borderRadius: 17,
    fontFamily: "Montserrat",
    fontWeight: 600,
    lineHeight: 35,
    fontSize: 37,
    height: 110,
    flex: 1
  }
}

export const DangerButtonStyles: Partial<IButtonStyles> = {
  root: {
    marginRight: 12,
    backgroundColor: "#CD3232",
    color: "#fff",
    borderRadius: 17,
    fontFamily: "Montserrat",
    fontWeight: 600,
    lineHeight: 35,
    fontSize: 37,
    height: 110,
    flex: 1
  }
}