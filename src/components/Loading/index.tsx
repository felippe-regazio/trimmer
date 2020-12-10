import styled from 'styled-components'

const LoadingDonut = styled.div`
  width: 5rem;
  height: 5rem;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  border: 0.3rem solid #f1f1f1;
  border-top-color: var(--primary-color);
  animation: 1.5s spin infinite linear;
  border-bottom-color: var(--primary-color);

  @keyframes spin {
    to { transform: rotate(360deg) }
  }  
`;

export default function Loading (): JSX.Element {
  return <LoadingDonut />
}