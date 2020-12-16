import styled from 'styled-components'

const Holder = styled.div`
  text-align: center;
`;

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

type LoadingProps = {
  label: string
};

export default function Loading (props: LoadingProps): JSX.Element {
  return (
    <Holder>
      <LoadingDonut />

      {props.label && <p>{props.label}</p>}
    </Holder>
  )
}