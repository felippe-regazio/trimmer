import AboutToggler from '../AboutToggler/'
import LangToggler from '../LangToggler/'
import styled from 'styled-components'

const UpperHeaderRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  .upper-header-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 14px 0;
    justify-content: flex-end;

    > * {
      margin: 0 14px;
    }
  }
`;

export default function UpperHeader (): JSX.Element {
  return (
    <>
      <UpperHeaderRoot>
        <div className="upper-header-content">
          <LangToggler />
          <AboutToggler />
        </div>
      </UpperHeaderRoot>
    </>
  )
}